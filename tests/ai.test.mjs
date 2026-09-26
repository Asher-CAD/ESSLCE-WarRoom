import test from 'node:test'
import assert from 'node:assert/strict'

process.env.GROQ_API_KEY = 'k1'; process.env.GEMINI_API_KEY = 'k2'; process.env.OPENROUTER_API_KEY = 'k3'
const ai = await import('../server/gemini.js')
import { beforeEach } from 'node:test'
beforeEach(() => ai.resetAiCooldowns())

const jsonResp = (status, body, headers = {}) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } })
const chat = (content, finish = 'stop') => ({ choices: [{ message: { content }, finish_reason: finish }] })
const goodQuiz = n => JSON.stringify({ questions: Array.from({ length: n }, (_, i) => ({ question: `Q${i} $\\frac{1}{2}$?`, options: ['one', 'two', 'three', 'four'], answer: 'B', explanation: 'because' })) })

test('validateQuiz normalises labels, letters and repairs swallowed LaTeX escapes', () => {
  const out = ai.validateQuiz({ questions: [
    { question: 'Find \x0crac{1}{2} \x08eta', options: ['A) 1', 'B. 2', '(C) 3', 'D) 4'], answer: 'b) 2', explanation: 'x' },
    { question: 'dup', options: ['1', '1', '2', '3'], answer: 'A', explanation: 'x' },      // duplicate options -> dropped
    { question: 'bad', options: ['1', '2', '3'], answer: 'A', explanation: 'x' }           // 3 options -> dropped
  ] }, 1)
  assert.equal(out.length, 1)
  assert.equal(out[0].question, 'Find \\frac{1}{2} \\beta')
  assert.deepEqual(out[0].options, ['A) 1', 'B) 2', 'C) 3', 'D) 4'])
  assert.equal(out[0].answer, 'B')
})

test('validateQuiz accepts a top-level array and answer given as option text; rejects too-short sets', () => {
  const arr = [{ question: 'q', options: ['a1', 'b1', 'c1', 'd1'], answer: 'c1', explanation: 'e' }]
  assert.equal(ai.validateQuiz(arr, 1)[0].answer, 'C')
  assert.throws(() => ai.validateQuiz(arr, 5), /valid questions/)
})

test('quiz request: Groq gets an OBJECT-root strict schema (the original failure), and succeeds on first model', async () => {
  const seen = []
  globalThis.fetch = async (url, init) => { seen.push({ url, body: JSON.parse(init.body) }); return jsonResp(200, chat(goodQuiz(3))) }
  const q = await ai.generateQuiz('Physics', 'Fluids', '3.4 Fluid flow', 'ctx', 3)
  assert.equal(q.length, 3)
  const rf = seen[0].body.response_format
  assert.equal(rf.type, 'json_schema'); assert.equal(rf.json_schema.strict, true)
  assert.equal(rf.json_schema.schema.type, 'object')
  assert.deepEqual(rf.json_schema.schema.required, ['questions'])
  assert.equal(rf.json_schema.schema.additionalProperties, false)
  assert.equal(seen.length, 1)
})

test('pool walk: 404 model gets cooled down, next model answers, cooled model is NOT called again', async () => {
  const calls = []
  globalThis.fetch = async (url, init) => {
    const body = JSON.parse(init.body); calls.push(body.model || url)
    if (body.model === 'openai/gpt-oss-120b') return jsonResp(404, { error: { message: 'The model `openai/gpt-oss-120b` does not exist or you do not have access to it.' } })
    return jsonResp(200, chat('hello tutor'))
  }
  const a = await ai.askTutor('Physics', 'U', 'S', 'ctx', 'why?')
  assert.equal(a, 'hello tutor')
  calls.length = 0
  await ai.askTutor('Physics', 'U', 'S', 'ctx', 'again?')
  assert.ok(!calls.includes('openai/gpt-oss-120b'), 'retired model must be skipped during cooldown: ' + calls)
  const st = ai.getAiStatus().models.find(m => m.model === 'openai/gpt-oss-120b')
  assert.equal(st.available, false); assert.match(st.reason, /unavailable/)
})

test('429 on one model does not retry that model and falls through the pool (no retry storm)', async () => {
  const calls = []
  globalThis.fetch = async (url, init) => {
    const body = JSON.parse(init.body); calls.push(body.model)
    if (body.model === 'qwen/qwen3.8-27b') return jsonResp(429, { error: { message: 'Rate limit reached' } }, { 'retry-after': '20' })
    return jsonResp(200, chat('ok'))
  }
  await ai.generateSubtopicGuide('Physics', 'U', 'S', 'ctx')   // guide prefers qwen first
  assert.equal(calls.filter(m => m === 'qwen/qwen3.8-27b').length, 1)
  calls.length = 0
  await ai.generateSubtopicGuide('Physics', 'U', 'S2', 'ctx')
  assert.equal(calls.filter(m => m === 'qwen/qwen3.8-27b').length, 0)
})

test('400 about reasoning/response_format triggers exactly one reduced attempt on the same model', async () => {
  const bodies = []
  globalThis.fetch = async (url, init) => {
    const body = JSON.parse(init.body)
    if (body.model !== 'qwen/qwen3.8-27b') return jsonResp(503, { error: { message: 'overloaded' } })
    bodies.push(body)
    if (body.response_format?.type === 'json_schema') return jsonResp(400, { error: { message: 'invalid JSON schema for response_format' } })
    return jsonResp(200, chat(goodQuiz(2)))
  }
  const q = await ai.generateQuiz('Biology', 'U', 'S', 'ctx', 2)
  assert.equal(q.length, 2); assert.equal(bodies.length, 2)
  assert.equal(bodies[1].response_format.type, 'json_object')
})

test('everything cooling down -> fast, explicit error instead of hammering providers', async () => {
  let n = 0
  globalThis.fetch = async () => { n++; return jsonResp(429, { error: { message: 'Rate limit reached' } }, { 'retry-after': '30' }) }
  await assert.rejects(() => ai.askTutor('Math', 'U', 'S', 'c', 'q'), /failed|rate-limited/)
  const before = n
  await assert.rejects(() => ai.askTutor('Math', 'U', 'S', 'c', 'q'), /rate-limited or unavailable/)
  assert.equal(n, before, 'no provider calls while all models are cooling down')
})
