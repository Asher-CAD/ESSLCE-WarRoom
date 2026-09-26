import { readFileSync } from 'fs'

let GEMINI_API_KEY = ''
try {
  const envFile = readFileSync('.env', 'utf8')
  const apiKeyMatch = envFile.match(/VITE_GEMINI_API_KEY=(.+)/)
  GEMINI_API_KEY = apiKeyMatch ? apiKeyMatch[1].trim() : ''
} catch (e) {
  console.error('⚠️ Could not read .env file:', e.message)
}

const ACTIVE_MODELS = [
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest'
]

let lastRequestTime = 0
const MIN_WAIT_MS = 2000

async function waitForRateLimit() {
  const now = Date.now()
  const timeSinceLastRequest = now - lastRequestTime
  if (timeSinceLastRequest < MIN_WAIT_MS) {
    const waitTime = MIN_WAIT_MS - timeSinceLastRequest
    await new Promise(resolve => setTimeout(resolve, waitTime))
  }
  lastRequestTime = Date.now()
}

async function askGemini(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is missing from .env file')
  }

  let lastError = null

  for (const modelName of ACTIVE_MODELS) {
    await waitForRateLimit()

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      })

      const data = await response.json()

      if (data.error) {
        if (data.error.code === 429 || data.error.code === 503 || data.error.message?.includes('quota') || data.error.message?.includes('demand')) {
          console.log(`⏳ Model [${modelName}] is busy. Trying next...`)
          lastError = data.error.message
          await new Promise(resolve => setTimeout(resolve, 1500))
          continue
        }
        throw new Error(data.error.message)
      }

      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.log(`✅ Success via [${modelName}]`)
        return data.candidates[0].content.parts[0].text
      }
    } catch (err) {
      console.log(`⚠️ Failed on [${modelName}]: ${err.message}`)
      lastError = err.message
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  throw new Error(`Google AI servers are busy. Please retry! (${lastError})`)
}

export async function analyzeBookContent(subject, grade, extractedText) {
  const prompt = `You are analyzing an Ethiopian Grade ${grade} ${subject} textbook for ESSLCE exam preparation.

Extracted text:
${extractedText.substring(0, 8000)}

Return a JSON object with this structure:
{
  "units": [
    {
      "number": 1,
      "title": "Unit title",
      "subtopics": [
        {
          "title": "Subtopic title",
          "key_concepts": ["concept1", "concept2"],
          "page_reference": "page number"
        }
      ],
      "esslce_importance": "high/medium/low",
      "estimated_study_hours": 3
    }
  ]
}

Include ALL units and subtopics. Return ONLY the JSON.`

  const result = await askGemini(prompt)
  try {
    const jsonMatch = result.match(/\{[\s\S]*\}/)
    if (jsonMatch) return JSON.parse(jsonMatch[0])
    return null
  } catch (e) {
    return null
  }
}

export async function generateStudyContent(subject, unit, textbookContent) {
  const prompt = `You are an expert ESSLCE tutor helping an Ethiopian student target National Rank #1.

Subject: ${subject}
Unit: ${unit}
Textbook Content:
${textbookContent ? textbookContent.substring(0, 6000) : ''}

Create a comprehensive study guide:

## 🧱 Foundation
Prerequisite knowledge needed.

## 📖 Main Content
Complete explanation based on the textbook.

## 🎯 ESSLCE Exam Patterns
How this topic appears in the national exam.

## ⚡ Tricks & Shortcuts
Fast solving methods. Only mathematically valid shortcuts.

## ❌ Common Mistakes
What students get wrong and how to avoid it.

## 📝 Practice Questions
5 ESSLCE-style questions with full solutions.

## 🌍 SAT Connection
How this topic connects to aptitude thinking.`

  return await askGemini(prompt)
}

export async function generateQuiz(subject, unit, textbookContent, difficulty) {
  const prompt = `You are an expert examiner for the Ethiopian ESSLCE National Exam.
Generate 5 high-yield multiple choice questions for:
Subject: ${subject}
Unit: ${unit}
Difficulty Level: ${difficulty}
Textbook Context:
${textbookContent ? textbookContent.substring(0, 3000) : 'General Ethiopian Curriculum'}

STRICT FORMATTING RULE: 
- Do NOT use raw HTML tags (like <sup>, <sub>, <i>, <br>, <b>).
- For fractions, exponents, variables, equations, or any math notation, use standard LaTeX ($...$ for inline and $$...$$ for block formulas).
- Example inline math: $x^2 + 2x + 1 = 0$ or $\\frac{a}{b}$.
- Every option MUST start with its letter, like "A) ", "B) ", "C) ", "D) ".

Return ONLY a valid JSON array of 5 objects with NO markdown formatting, backticks, or other text outside the JSON. Format exactly like this:
[
  {
    "question": "Question text here (use LaTeX $...$ for any math)",
    "options": [
      "A) First choice",
      "B) Second choice",
      "C) Third choice",
      "D) Fourth choice"
    ],
    "answer": "B",
    "explanation": "Clear step-by-step solution explaining why B is correct."
  }
]`

  const raw = await askGemini(prompt)
  try {
    const cleaned = raw.replace(/```json|```/g, '').trim()
    const match = cleaned.match(/\[[\s\S]*\]/)
    if (match) {
      return JSON.parse(match[0])
    }
  } catch (err) {
    console.error('⚠️ JSON parse error on quiz:', err.message)
  }

  return [
    {
      question: `Which of the following is a fundamental concept in ${unit}?`,
      options: [
        "A) Core definition and properties",
        "B) Unrelated constant values",
        "C) Non-standard notation",
        "D) Disproven conjecture"
      ],
      answer: "A",
      explanation: `Mastering the core definitions and properties is essential for ${unit} in ESSLCE.`
    }
  ]
}

export async function askTutor(subject, unit, textbookContent, question) {
  const prompt = `You are an expert tutor helping an Ethiopian Grade 12 student prepare for ESSLCE to score TOP 1ST nationally.

Subject: ${subject}
Topic: ${unit}
Relevant textbook content:
${textbookContent ? textbookContent.substring(0, 4000) : 'Not available'}

FORMATTING RULES:
- Do NOT use raw HTML tags.
- Use proper markdown
- Use ## for main headers
- Use **bold** for key terms
- For ALL math use LaTeX: inline $formula$ and block $$formula$$
- Show step by step solutions
- Always connect to ESSLCE exam patterns

Student question: ${question}`

  return await askGemini(prompt)
}