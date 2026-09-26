import fs from 'node:fs'
import path from 'node:path'

// ============================================================
// ESSLCE WarRoom — server-side AI layer
//
// Providers (all called from the server; keys never reach the browser):
//   1. Groq        — a POOL of models, each tried at most once per request
//   2. Gemini      — a small pool of Flash models
//   3. OpenRouter  — free-tier fallback pool
//
// Resilience rules:
//   * one attempt per model per request — never a retry loop on the same model
//   * a model that answered 429 / 5xx / "does not exist" goes into a cooldown
//     and is skipped by later requests until the cooldown expires, so one
//     exhausted or retired model can't burn the whole request budget
//   * a deterministic parameter error (400 about reasoning / response_format)
//     gets ONE reduced-parameter attempt on the same model, nothing more
// Model ids are configurable from .env (GROQ_MODELS, GEMINI_MODELS,
// OPENROUTER_MODELS — comma-separated) so a provider retiring a model never
// requires a code change.
// ============================================================

const ROOT_ENV = path.resolve(process.cwd(), '.env')

function readEnvValue(name) {
  if (process.env[name]) return String(process.env[name]).trim()
  if (!fs.existsSync(ROOT_ENV)) return ''
  const line = fs.readFileSync(ROOT_ENV, 'utf8').split(/\r?\n/).find(row => row.trim().startsWith(`${name}=`))
  if (!line) return ''
  return line.slice(line.indexOf('=') + 1).trim().replace(/^['"]|['"]$/g, '').replace(/\r/g, '').trim()
}

function readList(name, fallback) {
  const raw = readEnvValue(name)
  const list = raw ? raw.split(',').map(s => s.trim()).filter(Boolean) : []
  return list.length ? list : fallback
}

// GEMINI_API_KEY is preferred. VITE_GEMINI_API_KEY is still read so an
// existing .env keeps working — but a VITE_-prefixed name is the Vite
// convention for values that are meant to be bundled into browser code, so
// rename it to GEMINI_API_KEY when convenient.
const GEMINI_API_KEY = readEnvValue('GEMINI_API_KEY') || readEnvValue('VITE_GEMINI_API_KEY')
const GROQ_API_KEY = readEnvValue('GROQ_API_KEY')
const OPENROUTER_API_KEY = readEnvValue('OPENROUTER_API_KEY')

// Verified against Groq's deprecations page (Sept 2026): qwen/qwen3-32b was
// shut down on 2026-07-17 and qwen/qwen3.6-27b on 2026-09-14; qwen/qwen3.8-27b
// is the current Qwen model. All three support Structured Outputs.
const GROQ_MODELS = readList('GROQ_MODELS', ['openai/gpt-oss-20b', 'openai/gpt-oss-120b', 'qwen/qwen3.8-27b'])
const GEMINI_MODELS = readList('GEMINI_MODELS', ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-3.5-flash-lite'])
const OPENROUTER_MODELS = readList('OPENROUTER_MODELS', ['qwen/qwen3.8-27b:free', 'openai/gpt-oss-120b:free'])

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GEMINI_URL = model => `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const PROVIDER_TIMEOUT_MS = 60000

console.log(`🟢 Groq pool: ${GROQ_API_KEY ? GROQ_MODELS.join(' → ') : 'not configured'}`)
console.log(`🔑 Gemini: ${GEMINI_API_KEY ? GEMINI_MODELS.join(' → ') : 'not configured'}`)
console.log(`🔁 OpenRouter: ${OPENROUTER_API_KEY ? OPENROUTER_MODELS.join(' → ') : 'not configured'}`)

// ============================================================
// HELPERS
// ============================================================

async function fetchJson(url, options = {}, timeoutMs = PROVIDER_TIMEOUT_MS) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { ...options, signal: controller.signal })
    const contentType = response.headers.get('content-type') || ''
    const data = contentType.includes('application/json') ? await response.json() : { raw: await response.text() }
    return { response, data }
  } catch (error) {
    if (error?.name === 'AbortError') throw new Error(`Request timed out after ${Math.round(timeoutMs / 1000)}s`)
    throw error
  } finally {
    clearTimeout(timer)
  }
}

function stripThinking(text) {
  return String(text || '').replace(/<think>[\s\S]*?<\/think>/gi, '').trim()
}

function extractGeminiText(data) {
  return (data?.candidates?.[0]?.content?.parts || [])
    .filter(part => typeof part?.text === 'string' && !part.thought)
    .map(part => part.text).join('').trim()
}

function extractChatText(data) {
  const content = data?.choices?.[0]?.message?.content
  if (typeof content === 'string') return stripThinking(content)
  if (Array.isArray(content)) return stripThinking(content.map(p => (typeof p?.text === 'string' ? p.text : '')).join(''))
  return ''
}

function estimateTokens(text) { return Math.ceil(String(text || '').length / 4) }

// Keep prompt + completion inside the small per-request budgets of free tiers.
function safeMaxTokens(prompt, requested) {
  const room = Math.max(700, 7200 - estimateTokens(prompt))
  return Math.max(700, Math.min(Number(requested) || 3500, room))
}

function makeProviderError(provider, model, message, code = 0, retryAfter = 0) {
  const error = new Error(String(message || `${provider} request failed`))
  error.provider = provider
  error.model = model
  error.code = Number(code) || 0
  error.retryAfter = Number(retryAfter) || 0
  return error
}

// ------------------------------------------------------------
// Cooldown registry (circuit breaker), one entry per provider/model.
// ------------------------------------------------------------
const cooldowns = new Map()
const lastSuccess = { provider: null, model: null, at: null }

function cooldownFor(error) {
  const msg = String(error.message || '').toLowerCase()
  if (error.code === 404 || /does not exist|not found|decommission|deprecat|no longer|unavailable for free|not available/.test(msg)) {
    return { ms: 6 * 3600 * 1000, reason: 'model unavailable' }
  }
  if (error.code === 401 || error.code === 403) return { ms: 10 * 60 * 1000, reason: 'authentication/permission problem' }
  if (error.code === 429 || /rate limit|quota|too many/.test(msg)) {
    const perDay = /per day|daily|tpd|rpd/.test(msg)
    const wait = error.retryAfter > 0 ? error.retryAfter * 1000 : (perDay ? 30 * 60 * 1000 : 60 * 1000)
    return { ms: Math.min(Math.max(wait, 5000), 60 * 60 * 1000), reason: 'rate limited' }
  }
  if (error.code >= 500 || /overloaded|high demand|temporarily/.test(msg)) return { ms: 30 * 1000, reason: 'provider overloaded' }
  return null // request-specific problem: don't punish the model
}

function coolDown(key, error) {
  const rule = cooldownFor(error)
  if (!rule) return
  cooldowns.set(key, { until: Date.now() + rule.ms, reason: rule.reason })
}

function cooldownLeft(key) {
  const entry = cooldowns.get(key)
  if (!entry) return 0
  const left = entry.until - Date.now()
  if (left <= 0) { cooldowns.delete(key); return 0 }
  return left
}

export function resetAiCooldowns() { cooldowns.clear() }

export function getAiStatus() {
  const rows = []
  const add = (provider, models, configured) => {
    for (const model of models) {
      const left = cooldownLeft(`${provider}:${model}`)
      rows.push({ provider, model, configured, available: configured && left === 0, cooldownSeconds: Math.ceil(left / 1000), reason: left ? cooldowns.get(`${provider}:${model}`)?.reason : null })
    }
  }
  add('groq', GROQ_MODELS, Boolean(GROQ_API_KEY))
  add('gemini', GEMINI_MODELS, Boolean(GEMINI_API_KEY))
  add('openrouter', OPENROUTER_MODELS, Boolean(OPENROUTER_API_KEY))
  return { models: rows, lastSuccess }
}

// ------------------------------------------------------------
// JSON helpers
// ------------------------------------------------------------
export function parseJsonLoose(raw) {
  if (typeof raw !== 'string') return raw
  const cleaned = stripThinking(raw).replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
  try { return JSON.parse(cleaned) } catch (_) { /* fall through */ }
  const pairs = [['{', '}'], ['[', ']']]
    .map(([a, b]) => [cleaned.indexOf(a), cleaned.lastIndexOf(b)])
    .filter(([s, e]) => s >= 0 && e > s)
    .sort((x, y) => x[0] - y[0])
  for (const [s, e] of pairs) {
    try { return JSON.parse(cleaned.slice(s, e + 1)) } catch (_) { /* try next */ }
  }
  throw new Error('AI returned invalid JSON')
}

// A model that writes LaTeX inside JSON with a single backslash produces
// valid JSON whose escapes silently swallow the command: \frac -> form feed,
// \beta -> backspace, \times -> tab, \rho -> carriage return. Put them back.
function repairLatexEscapes(value) {
  return String(value ?? '').replace(/\x0c/g, '\\f').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\r/g, '\\r')
}

// ============================================================
// PROVIDER CALLS — each performs exactly one request
// ============================================================

const TUTOR_SYSTEM = 'You are a rigorous Ethiopian secondary-school tutor. Use the supplied textbook context as primary evidence. Follow the selected topic exactly. Do not invent textbook-specific facts. Use valid LaTeX for mathematics.'

async function callGroq(prompt, options, model) {
  if (!GROQ_API_KEY) throw makeProviderError('Groq', model, 'GROQ_API_KEY is missing from .env', 401)
  const isOss = model.startsWith('openai/gpt-oss')
  const build = variant => {
    const body = {
      model,
      messages: [{ role: 'system', content: TUTOR_SYSTEM }, { role: 'user', content: prompt }],
      temperature: options.temperature ?? 0.2,
      max_tokens: safeMaxTokens(prompt, options.maxTokens || 3500)
    }
    // gpt-oss spends part of max_tokens on reasoning, so keep it short.
    if (isOss && variant === 'full') body.reasoning_effort = options.reasoningEffort || 'low'
    if (options.jsonMode) {
      body.response_format = variant === 'full'
        ? { type: 'json_schema', json_schema: { name: options.schemaName || 'response', strict: true, schema: options.schema } }
        : { type: 'json_object' }
    }
    return body
  }

  const attempt = async variant => {
    const { response, data } = await fetchJson(GROQ_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(build(variant))
    })
    if (!response.ok || data?.error) {
      throw makeProviderError('Groq', model, data?.error?.message || `Groq HTTP ${response.status}`, response.status, response.headers.get('retry-after'))
    }
    return data
  }

  let data
  try {
    data = await attempt('full')
  } catch (error) {
    // Deterministic parameter rejection -> exactly one reduced attempt.
    if (error.code === 400 && /reasoning|response_format|json_schema|schema|strict/i.test(error.message)) {
      console.warn(`ℹ️ Groq ${model} rejected request parameters (${error.message.slice(0, 120)}); one reduced attempt`)
      data = await attempt('reduced')
    } else {
      throw error
    }
  }

  const choice = data?.choices?.[0]
  const text = extractChatText(data)
  if (!text) throw makeProviderError('Groq', model, `Groq returned an empty response (${choice?.finish_reason || 'no reason'})`, 502)
  if (choice?.finish_reason === 'length' && options.jsonMode) throw makeProviderError('Groq', model, 'Groq output was cut off before the JSON completed', 502)
  return text
}

async function callGemini(prompt, options, model) {
  if (!GEMINI_API_KEY) throw makeProviderError('Gemini', model, 'GEMINI_API_KEY is missing from .env', 401)
  const build = withThinking => {
    const generationConfig = {
      temperature: options.temperature ?? 0.2,
      maxOutputTokens: Math.max(2048, (Number(options.maxTokens) || 3500) + 2000)
    }
    // Structured output is requested as JSON mime type only; the schema is
    // described in the prompt and validated server-side. This avoids
    // schema-dialect differences between Gemini model generations.
    if (options.jsonMode) generationConfig.responseMimeType = 'application/json'
    if (withThinking && !/lite/.test(model)) generationConfig.thinkingConfig = { thinkingLevel: options.reasoningEffort === 'high' ? 'high' : 'low' }
    return { systemInstruction: { parts: [{ text: TUTOR_SYSTEM }] }, contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig }
  }
  const attempt = async withThinking => {
    const { response, data } = await fetchJson(GEMINI_URL(model), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY },
      body: JSON.stringify(build(withThinking))
    })
    if (!response.ok || data?.error) throw makeProviderError('Gemini', model, data?.error?.message || `Gemini HTTP ${response.status}`, data?.error?.code || response.status)
    return data
  }
  let data
  try {
    data = await attempt(true)
  } catch (error) {
    if (error.code === 400 && /thinking/i.test(error.message)) data = await attempt(false)
    else throw error
  }
  const text = extractGeminiText(data)
  if (!text) throw makeProviderError('Gemini', model, data?.promptFeedback?.blockReason || data?.candidates?.[0]?.finishReason || 'Gemini returned an empty response', 502)
  return text
}

async function callOpenRouter(prompt, options, model) {
  if (!OPENROUTER_API_KEY) throw makeProviderError('OpenRouter', model, 'OPENROUTER_API_KEY is missing from .env', 401)
  const body = {
    model,
    messages: [{ role: 'system', content: TUTOR_SYSTEM }, { role: 'user', content: prompt }],
    temperature: options.temperature ?? 0.2,
    max_tokens: safeMaxTokens(prompt, options.maxTokens || 3500)
  }
  if (options.jsonMode) body.response_format = { type: 'json_object' }
  const { response, data } = await fetchJson(OPENROUTER_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${OPENROUTER_API_KEY}`, 'Content-Type': 'application/json', 'HTTP-Referer': 'http://localhost:5173', 'X-Title': 'ESSLCE War Room' },
    body: JSON.stringify(body)
  })
  if (!response.ok || data?.error) throw makeProviderError('OpenRouter', model, data?.error?.message || `OpenRouter HTTP ${response.status}`, data?.error?.code || response.status, response.headers.get('retry-after'))
  const text = extractChatText(data)
  if (!text) throw makeProviderError('OpenRouter', model, 'OpenRouter returned an empty response', 502)
  return text
}

// ============================================================
// callAI — walk the pool once, skipping models that are cooling down
// ============================================================

function buildCandidates(options) {
  const preferred = Array.isArray(options.preferredModels) ? options.preferredModels : []
  const groq = [...preferred.filter(m => GROQ_MODELS.includes(m)), ...GROQ_MODELS.filter(m => !preferred.includes(m))]
  return [
    ...(GROQ_API_KEY ? groq.map(model => ({ provider: 'Groq', model, call: callGroq })) : []),
    ...(GEMINI_API_KEY ? GEMINI_MODELS.map(model => ({ provider: 'Gemini', model, call: callGemini })) : []),
    ...(OPENROUTER_API_KEY ? OPENROUTER_MODELS.map(model => ({ provider: 'OpenRouter', model, call: callOpenRouter })) : [])
  ]
}

async function callAI(prompt, options = {}) {
  const candidates = buildCandidates(options)
  if (!candidates.length) {
    throw new Error('No AI provider is configured. Add GROQ_API_KEY (and optionally GEMINI_API_KEY / OPENROUTER_API_KEY) to .env and restart the server.')
  }
  const failures = []
  const skipped = []
  let soonest = Infinity

  for (const candidate of candidates) {
    const key = `${candidate.provider.toLowerCase()}:${candidate.model}`
    const left = cooldownLeft(key)
    if (left > 0) { skipped.push(`${candidate.provider} ${candidate.model} (cooling down ${Math.ceil(left / 1000)}s)`); soonest = Math.min(soonest, left); continue }
    try {
      const text = await candidate.call(prompt, options, candidate.model)
      // A JSON request must actually parse + validate before we call it a
      // success; otherwise fall through to the next model.
      const result = options.jsonMode && typeof options.validate === 'function' ? options.validate(text) : text
      lastSuccess.provider = candidate.provider; lastSuccess.model = candidate.model; lastSuccess.at = new Date().toISOString()
      console.log(`✅ ${candidate.provider} ${candidate.model} answered`)
      return result
    } catch (error) {
      failures.push(`${candidate.provider} ${candidate.model}: ${error.message}`)
      console.warn(`⚠️ ${candidate.provider} ${candidate.model} failed: ${error.message}`)
      coolDown(key, error)
    }
  }

  if (!failures.length && skipped.length) {
    throw new Error(`Every AI model is briefly rate-limited or unavailable. Try again in about ${Math.ceil(soonest / 1000)}s. (${skipped.join('; ')})`)
  }
  throw new Error(`All configured AI models failed. ${failures.join(' | ')}${skipped.length ? ` | Skipped: ${skipped.join('; ')}` : ''}`)
}

// ============================================================
// PROMPT PIECES
// ============================================================

const MATH_RULES = `
MATHEMATICS FORMATTING RULES:
- Write every mathematical expression in LaTeX.
- Inline math: $...$        Display math: $$...$$
- Never use \\( \\) or \\[ \\] delimiters and never output LaTeX without dollar delimiters.
- Fractions $\\frac{a}{b}$, roots $\\sqrt{x}$, powers $x^2$, repeating decimals $0.2\\overline{35}$.
- Do not substitute corrupted Unicode symbols for mathematical notation.
`

const SCOPE_RULE = 'SCOPE RULE:\nTreat the selected unit/topic above as the exact study target. Do not drift to a different topic merely because nearby textbook pages mention it. Use the supplied pages only as evidence for this exact selection.'

function textbookBlock(context, limit) {
  return context ? String(context).substring(0, limit) : 'No textbook excerpt is available.'
}

function englishBlock(extra = {}) {
  const lines = []
  if (extra.englishSkill) lines.push(`ENGLISH SKILL: ${extra.englishSkill}`)
  const details = Array.isArray(extra.englishDetails) ? extra.englishDetails : []
  if (details.length) {
    lines.push('TEXTBOOK SUB-HEADINGS INSIDE THIS SECTION (source-backed; these are what the section actually teaches):')
    for (const d of details.slice(0, 12)) lines.push(`- ${d.number ? `${d.number} ` : ''}${d.title}`)
  }
  return lines.length ? `\n${lines.join('\n')}\n` : ''
}

const ENGLISH_GUIDE_HEADINGS = {
  grammar: ['🎯 What This Section Teaches', '📚 Rules & Forms', '✍️ Examples', '⚠️ Common Mistakes', '🧪 Practice Items (with answers)', '🎓 ESSLCE Relevance', '⭐ Quick Recall'],
  vocabulary: ['🎯 What This Section Teaches', '📚 Key Words & Meanings', '🧩 Word Formation & Usage', '✍️ Examples in Sentences', '⚠️ Common Mistakes', '🧪 Practice Items (with answers)', '⭐ Quick Recall'],
  reading: ['🎯 What This Section Teaches', '📖 Reading Strategy', '🔑 Key Ideas of the Text', '🧩 Question Types & How to Answer', '⚠️ Common Traps', '🧪 Practice Items (with answers)', '⭐ Quick Recall'],
  writing: ['🎯 What This Section Teaches', '📝 Structure & Steps', '✍️ Model Example', '⚠️ Common Mistakes', '🧪 Practice Task (with feedback checklist)', '⭐ Quick Recall'],
  speaking: ['🎯 What This Section Teaches', '🗣️ Useful Expressions', '🎭 Sample Dialogue', '🔊 Pronunciation & Fluency Tips', '🧪 Practice Task', '⭐ Quick Recall'],
  listening: ['🎯 What This Section Teaches', '👂 Listening Strategy', '🔑 What to Listen For', '🧩 Question Types & How to Answer', '🧪 Practice Task', '⭐ Quick Recall']
}

const SCIENCE_GUIDE_HEADINGS = ['📌 Prerequisites', '🎯 Core Idea', '📖 Clear Explanation', '🔑 Definitions & Formulas', '🧠 How to Understand', '💾 How to Memorize', '🌍 Applications', '✍️ Worked Examples', '🎓 ESSLCE Relevance', '⚡ Exam Appearance', '⚠️ Common Traps', '💡 Exam Tricks', '⭐ Quick Recall']

// ============================================================
// AI TUTOR
// ============================================================

export async function askTutor(subject, chapter, section, context, question, extra = {}) {
  const prompt = `
You are an expert tutor for an Ethiopian secondary-school student preparing for the ESSLCE.

SUBJECT: ${subject}
SELECTED UNIT: ${chapter}
SELECTED TOPIC: ${section || chapter}
${englishBlock(extra)}
${SCOPE_RULE}

AUTHORITATIVE TEXTBOOK CONTEXT:
${textbookBlock(context, 9000)}

STUDENT QUESTION:
${question}

TASK:
Answer the student's question directly and rigorously.
Use the supplied textbook context whenever relevant, and do not pretend a statement came from the textbook if it is not in the supplied context.
Explain difficult ideas step by step. For mathematics and science, show valid reasoning and calculations.
If the question is unrelated to the selected topic, answer briefly and steer the student back to the selected topic.
${MATH_RULES}
Use clean Markdown (short paragraphs, lists and tables where they help).
`
  return callAI(prompt, {
    temperature: 0.25,
    maxTokens: 3000,
    reasoningEffort: 'medium',
    preferredModels: ['openai/gpt-oss-120b', 'qwen/qwen3.8-27b', 'openai/gpt-oss-20b']
  })
}

// ============================================================
// SUBTOPIC STUDY GUIDE
// ============================================================

export async function generateSubtopicGuide(subject, chapter, section, context, extra = {}) {
  const skill = String(extra.englishSkill || '').toLowerCase()
  const headings = subject === 'English' && ENGLISH_GUIDE_HEADINGS[skill] ? ENGLISH_GUIDE_HEADINGS[skill] : SCIENCE_GUIDE_HEADINGS
  const prompt = `
Create a rigorous, focused study guide for an Ethiopian ESSLCE student.

SUBJECT: ${subject}
SELECTED UNIT: ${chapter}
SELECTED TOPIC: ${section || chapter}
${englishBlock(extra)}
${SCOPE_RULE}

AUTHORITATIVE TEXTBOOK SOURCE:
${textbookBlock(context, 9000)}

Return clean Markdown using exactly these level-2 headings, in this order:
${headings.map(h => `## ${h}`).join('\n')}

Ground textbook-specific statements in the supplied source.
Do not invent textbook page numbers, examples, definitions, laws or facts that are not supported by the source.
${subject === 'English' ? 'For English, teach the specific language points named in the sub-headings above (and found in the source), not a generic overview of the skill.' : ''}
${MATH_RULES}
`
  return callAI(prompt, {
    temperature: 0.3,
    maxTokens: 4200,
    reasoningEffort: 'medium',
    preferredModels: ['qwen/qwen3.8-27b', 'openai/gpt-oss-120b', 'openai/gpt-oss-20b']
  })
}

// Accepts both the legacy (subject, chapter, context) call and the current
// (subject, chapter, section, context, extra) call.
export async function generateStudyGuide(subject, chapter, sectionOrContext, maybeContext, extra) {
  if (maybeContext === undefined) return generateSubtopicGuide(subject, chapter, 'Full Unit', sectionOrContext, {})
  return generateSubtopicGuide(subject, chapter, sectionOrContext, maybeContext, extra || {})
}

// ============================================================
// QUIZ
// ============================================================

// Groq strict structured outputs need: an OBJECT at the root, every property
// listed in "required", additionalProperties:false on every object, and no
// minItems/maxItems. (The previous root-level array schema was rejected by
// Groq with "schema must have type 'object'".) Count is enforced in validateQuiz.
const QUIZ_SCHEMA = {
  type: 'object',
  properties: {
    questions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          question: { type: 'string' },
          options: { type: 'array', items: { type: 'string' } },
          answer: { type: 'string', enum: ['A', 'B', 'C', 'D'] },
          explanation: { type: 'string' }
        },
        required: ['question', 'options', 'answer', 'explanation'],
        additionalProperties: false
      }
    }
  },
  required: ['questions'],
  additionalProperties: false
}

const LETTERS = ['A', 'B', 'C', 'D']

function stripOptionLabel(option) {
  return String(option ?? '').trim().replace(/^\(?\s*[A-Da-d]\s*[).:\-]\s+/, '').trim()
}

export function validateQuiz(data, expectedCount) {
  const list = Array.isArray(data) ? data : (Array.isArray(data?.questions) ? data.questions : null)
  if (!list) throw new Error('AI quiz response has no questions array')

  const cleaned = []
  for (const item of list) {
    const question = repairLatexEscapes(item?.question).trim()
    const bare = (Array.isArray(item?.options) ? item.options : []).slice(0, 4).map(o => repairLatexEscapes(stripOptionLabel(o)))
    if (!question || bare.length !== 4 || bare.some(o => !o)) continue
    if (new Set(bare.map(o => o.toLowerCase())).size !== 4) continue // duplicate options make a broken question

    const answer = String(item?.answer ?? '').trim()
    let letter = /^\(?([A-Da-d])\b/.exec(answer)?.[1]?.toUpperCase() || ''
    if (!letter) {
      const at = bare.findIndex(o => o.toLowerCase() === stripOptionLabel(answer).toLowerCase())
      if (at >= 0) letter = LETTERS[at]
    }
    const explanation = repairLatexEscapes(item?.explanation).trim()
    if (!letter || !explanation) continue
    cleaned.push({ question, options: bare.map((o, i) => `${LETTERS[i]}) ${o}`), answer: letter, explanation })
  }

  // Accept a slightly short set (>= 60%) instead of failing the whole request.
  const minimum = Math.max(1, Math.ceil(expectedCount * 0.6))
  if (cleaned.length < minimum) throw new Error(`AI returned ${cleaned.length} valid questions; expected ${expectedCount}`)
  return cleaned.slice(0, expectedCount)
}

export async function generateQuiz(subject, chapter, section, context, count = 5, extra = {}) {
  const n = Math.min(20, Math.max(1, parseInt(count, 10) || 5))
  const prompt = `
Generate exactly ${n} high-quality ESSLCE-style multiple-choice questions.

SUBJECT: ${subject}
SELECTED UNIT: ${chapter}
SELECTED TOPIC: ${section || chapter}
${englishBlock(extra)}
${SCOPE_RULE}

TEXTBOOK SOURCE:
${textbookBlock(context, 8000)}

QUESTION REQUIREMENTS:
- Exactly ${n} questions, each with exactly four DIFFERENT options and only one correct answer.
- Put option text only in "options" (no "A)" prefix); put the correct letter A, B, C or D in "answer".
- Explanations must justify the answer clearly.
- Test understanding, application, calculation, reasoning or exam traps at Ethiopian secondary-school ESSLCE level.
${subject === 'English' ? '- For English, test the specific language points named above (grammar rule, vocabulary, reading skill, etc.), using short example sentences or passages.' : ''}
- Do not invent textbook-specific claims unsupported by the supplied source.
${MATH_RULES}
JSON RULES: return ONLY a JSON object of the form {"questions":[{"question":"...","options":["...","...","...","..."],"answer":"B","explanation":"..."}]}. Inside JSON strings write every LaTeX backslash doubled (for example "$\\\\frac{1}{2}$").
`
  return callAI(prompt, {
    jsonMode: true,
    schema: QUIZ_SCHEMA,
    schemaName: 'esslce_quiz',
    temperature: 0.25,
    maxTokens: Math.min(4500, Math.max(2200, n * 380)),
    reasoningEffort: 'low',
    preferredModels: ['openai/gpt-oss-20b', 'openai/gpt-oss-120b', 'qwen/qwen3.8-27b'],
    // Parsing + validation happen inside the pool walk, so a model that
    // returns broken JSON is skipped in favour of the next one.
    validate: raw => validateQuiz(parseJsonLoose(raw), n)
  })
}
