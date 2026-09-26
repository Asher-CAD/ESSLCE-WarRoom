// Builds shared/englishDetails.js: the specific sub-headings the English
// textbooks actually print inside each generic section ("1.4 Grammar" ->
// "1.4.1 Degrees of Comparison", "1.4.2 Simple Present Tense and Present
// Perfect", ...). Every entry is copied from the textbook text stored in the
// knowledge database — nothing is written by AI and nothing is invented.
//
// Usage:  npm run build:english
//         node scripts/build-english-details.mjs [path/to/knowledge_base.sqlite]
//
// Grades whose textbook has no recoverable text in the knowledge DB (scanned
// images, e.g. Grade 9 and Grade 11 English) simply get no details until that
// text is OCR'd into the DB; the app handles that gracefully.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CURRICULUM_MAP } from '../shared/curriculumMap.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dbPath = path.resolve(process.argv[2] || path.join(root, 'data', 'knowledge', 'knowledge_base.sqlite'))
const outPath = path.join(root, 'shared', 'englishDetails.js')

// --- printed-page offsets: read the single source of truth in server/knowledge.js
function readOffsets() {
  const src = fs.readFileSync(path.join(root, 'server', 'knowledge.js'), 'utf8')
  const body = /PRINTED_PAGE_OFFSETS\s*=\s*Object\.freeze\(\{([\s\S]*?)\}\)/.exec(src)?.[1] || ''
  const map = {}
  for (const m of body.matchAll(/(\d+)\s*:\s*(\d+)/g)) map[Number(m[1])] = Number(m[2])
  return map
}

// --- DB access: node:sqlite (Node >= 22.5, no dependencies) or the project's sqlite3
async function openDb(file) {
  try {
    const { DatabaseSync } = await import('node:sqlite')
    const db = new DatabaseSync(file, { readOnly: true })
    return { all: async (sql, params = []) => db.prepare(sql).all(...params), close: () => db.close() }
  } catch {
    const sqlite3 = (await import('sqlite3')).default
    const { open } = await import('sqlite')
    const db = await open({ filename: file, driver: sqlite3.Database, mode: sqlite3.OPEN_READONLY })
    return { all: (sql, params = []) => db.all(sql, params), close: () => db.close() }
  }
}

const NUMERIC = /^[ \t]*(\d{1,2})\.(\d{1,2})\.(\d{1,2})(?:\.\d{1,2})?[ \t]*[.:)\-–]?[ \t]+([A-Z][^\n]{2,110}?)[ \t]*$/gm // 1.4.2  Title
const LETTERED = /^[ \t]*(\d{1,2})([A-F])\.?(\d{1,2})[ \t]*[.:)\-–]?[ \t]+([A-Z][^\n]{2,110}?)[ \t]*$/gm          // 3E.1  Title

export function cleanTitle(raw) {
  return String(raw || '')
    .replace(/\.{3,}\s*\d*\s*$/, '')       // dot leaders + page number (table of contents)
    .replace(/\s+\d{1,3}\s*$/, m => (/\D/.test(raw.trim().slice(0, 3)) ? '' : m))
    .replace(/[\s\u00a0]+/g, ' ')
    .replace(/[.:;,\s]+$/, '')
    .trim()
}

function looksLikeHeading(title) {
  if (title.length < 3 || title.length > 95) return false
  const wordCount = title.split(/\s+/).length
  if (wordCount > 14) return false
  if (/[.?!]$/.test(title) && wordCount > 6) return false // a sentence, not a heading
  return /[A-Za-z]{3}/.test(title)
}

// section title -> the code its sub-headings are numbered with
export function sectionCode(sectionTitle) {
  const t = String(sectionTitle || '')
  let m = /^\s*(\d{1,2})\s*\.\s*(\d{1,2})\b/.exec(t)
  if (m) return { kind: 'numeric', unit: Number(m[1]), key: String(Number(m[2])) }
  m = /^\s*(\d{1,2})\s*([A-F])\b/.exec(t)
  if (m) return { kind: 'lettered', unit: Number(m[1]), key: m[2] }
  return null
}

export function extractHeadings(pages, offset, unit) {
  const found = new Map() // "kind|unit|key" -> Map(number -> detail)
  const lo = Number(unit?.startPage) - 1
  const hi = Number(unit?.endPage) + 2
  for (const row of pages) {
    const text = String(row.text_final || row.text_raw || '')
    if (!text) continue
    const printed = Number(row.page) - offset
    if (Number.isFinite(lo) && Number.isFinite(hi) && (printed < lo || printed > hi)) continue // TOC / other units
    for (const [re, kind] of [[NUMERIC, 'numeric'], [LETTERED, 'lettered']]) {
      re.lastIndex = 0
      for (const m of text.matchAll(re)) {
        const title = cleanTitle(kind === 'numeric' ? m[4] : m[4])
        if (!looksLikeHeading(title)) continue
        const key = kind === 'numeric' ? String(Number(m[2])) : m[2]
        const number = kind === 'numeric' ? `${m[1]}.${m[2]}.${m[3]}` : `${m[1]}${m[2]}.${m[3]}`
        const bucket = `${kind}|${Number(m[1])}|${key}`
        if (!found.has(bucket)) found.set(bucket, new Map())
        if (!found.get(bucket).has(number)) found.get(bucket).set(number, { number, title, page: printed })
      }
    }
  }
  return found
}

async function main() {
  if (!fs.existsSync(dbPath)) throw new Error(`Knowledge database not found: ${dbPath}`)
  const offsets = readOffsets()
  const db = await openDb(dbPath)
  const details = {}
  const coverage = {}

  for (const [grade, gradeData] of Object.entries(CURRICULUM_MAP.English || {})) {
    const bookId = gradeData.bookId
    const offset = offsets[bookId] ?? 0
    const pages = await db.all('SELECT page, text_final, text_raw FROM pages WHERE book_id = ? ORDER BY page', [bookId])
    const withText = pages.filter(p => String(p.text_final || p.text_raw || '').trim().length > 40).length
    let sections = 0, withDetails = 0
    for (const unit of gradeData.units || []) {
      const found = extractHeadings(pages, offset, unit)
      for (const section of unit.sections || []) {
        sections += 1
        const code = sectionCode(section.title)
        if (!code || code.unit !== Number(unit.number)) continue
        const list = [...(found.get(`${code.kind}|${code.unit}|${code.key}`)?.values() || [])]
          .sort((a, b) => a.number.localeCompare(b.number, undefined, { numeric: true }))
        if (list.length) { details[section.id] = list; withDetails += 1 }
      }
    }
    coverage[grade] = { bookId, pagesWithText: withText, totalPages: pages.length, sections, sectionsWithDetails: withDetails }
    console.log(`Grade ${grade}: ${withDetails}/${sections} sections have textbook sub-headings (${withText}/${pages.length} pages have text)`)
  }
  db.close()

  const js = `// AUTO-GENERATED by scripts/build-english-details.mjs — do not edit by hand.
// Sub-headings copied from the English textbook text in the knowledge database.
// Regenerate with: npm run build:english
export const ENGLISH_DETAILS = ${JSON.stringify(details, null, 1)}

export const ENGLISH_DETAILS_META = ${JSON.stringify({ generatedAt: new Date().toISOString().slice(0, 10), source: 'data/knowledge/knowledge_base.sqlite', grades: coverage }, null, 1)}
`
  fs.writeFileSync(outPath, js)
  console.log(`Wrote ${path.relative(root, outPath)} (${Object.keys(details).length} sections)`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error('❌', error.message); process.exitCode = 1 })
}
