import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const KNOWLEDGE_DB_PATH = path.resolve(__dirname, '..', 'data', 'knowledge', 'knowledge_base.sqlite')

let dbPromise = null

function toInt(value, fallback = null) {
  const n = Number(value)
  return Number.isInteger(n) ? n : fallback
}

export async function getKnowledgeDB() {
  if (!fs.existsSync(KNOWLEDGE_DB_PATH)) {
    throw new Error(`Knowledge database not found: ${KNOWLEDGE_DB_PATH}`)
  }
  if (!dbPromise) {
    dbPromise = open({ filename: KNOWLEDGE_DB_PATH, driver: sqlite3.Database })
  }
  return dbPromise
}

export function getKnowledgeDatabasePath() {
  return KNOWLEDGE_DB_PATH
}

export async function getKnowledgeBooks() {
  const db = await getKnowledgeDB()
  return db.all(`
    SELECT id, grade, subject, title, pages, source_status
    FROM books
    ORDER BY subject, grade
  `)
}

export async function getKnowledgeBookBySubjectGrade(subject, grade) {
  const db = await getKnowledgeDB()
  return db.get(`
    SELECT id, grade, subject, title, pages, source_status
    FROM books
    WHERE lower(subject) = lower(?) AND grade = ?
    LIMIT 1
  `, [String(subject || '').trim(), toInt(grade, 0)])
}

export async function getKnowledgeStatus(bookId) {
  const db = await getKnowledgeDB()
  const id = toInt(bookId)
  if (!id) throw new Error('Invalid knowledge book ID')
  const book = await db.get(`SELECT * FROM books WHERE id = ?`, [id])
  if (!book) return null
  const counts = await db.get(`
    SELECT
      COUNT(*) AS total_pages,
      SUM(CASE WHEN COALESCE(text_final, text_raw, '') <> '' THEN 1 ELSE 0 END) AS pages_with_text,
      SUM(CASE WHEN content_status = 'IMAGE_UNRECOVERED' THEN 1 ELSE 0 END) AS image_unrecovered,
      SUM(CASE WHEN ocr_used = 1 THEN 1 ELSE 0 END) AS ocr_pages,
      COALESCE(SUM(char_count_final), 0) AS total_characters
    FROM pages
    WHERE book_id = ?
  `, [id])
  return { book, counts }
}

export async function getKnowledgePage(bookId, pageNumber) {
  const db = await getKnowledgeDB()
  const id = toInt(bookId)
  const page = toInt(pageNumber)
  if (!id || !page) throw new Error('Invalid book/page')
  return db.get(`
    SELECT
      p.id, p.book_id, p.page, p.pdf_page,
      p.text_raw, p.text_final,
      p.char_count_raw, p.char_count_final,
      p.image_count, p.ocr_used, p.ocr_status,
      p.blank, p.content_status,
      b.grade, b.subject, b.title AS book_title, b.pages AS book_pages
    FROM pages p
    JOIN books b ON b.id = p.book_id
    WHERE p.book_id = ? AND p.page = ?
    LIMIT 1
  `, [id, page])
}

export async function getKnowledgePageRange({ bookId, startPage, endPage, maxPages = 80 } = {}) {
  const db = await getKnowledgeDB()
  const id = toInt(bookId)
  if (!id) throw new Error('Invalid knowledge book ID')
  const start = Math.max(1, toInt(startPage, 1))
  const requestedEnd = Math.max(start, toInt(endPage, start))
  const safeEnd = Math.min(requestedEnd, start + Math.max(1, Number(maxPages) || 80) - 1)
  return db.all(`
    SELECT
      p.id, p.book_id, p.page, p.pdf_page,
      p.text_raw, p.text_final,
      p.char_count_raw, p.char_count_final,
      p.image_count, p.ocr_used, p.ocr_status,
      p.blank, p.content_status,
      b.grade, b.subject, b.title AS book_title, b.pages AS book_pages
    FROM pages p
    JOIN books b ON b.id = p.book_id
    WHERE p.book_id = ? AND p.page BETWEEN ? AND ?
    ORDER BY p.page
  `, [id, start, safeEnd])
}


// Printed textbook pages are NOT the same thing as PDF page indexes.
// These offsets were established from the supplied textbook files/knowledge base.
// Value = PDF page index minus the printed page number.
const PRINTED_PAGE_OFFSETS = Object.freeze({
  1: 5,   // G9 Biology
  2: 7,   // G9 Chemistry
  3: 9,   // G9 Mathematics
  4: 6,   // G9 Physics
  5: 7,   // G10 Biology
  6: 6,   // G10 Chemistry
  7: 9,   // G10 Mathematics
  8: 6,   // G10 Physics
  9: 10,  // G11 Biology
  10: 10, // G11 Chemistry
  11: 6,  // G11 Physics
  12: 4,  // G12 Biology
  13: 8,  // G12 Chemistry
  14: 6,  // G12 Physics
  15: 12, // G11 Mathematics
  16: 10, // G12 Mathematics
  17: 13, // G9 English
  18: 10, // G10 English
  19: 6,  // G11 English
  20: 6   // G12 English
})

const printedOffsetCache = new Map()

async function getPrintedPageOffset(bookId) {
  const id = toInt(bookId)
  if (!id) throw new Error('Invalid knowledge book ID')
  if (printedOffsetCache.has(id)) return printedOffsetCache.get(id)

  // The current supplied 20-book knowledge database has stable IDs.
  if (Object.prototype.hasOwnProperty.call(PRINTED_PAGE_OFFSETS, id)) {
    const offset = PRINTED_PAGE_OFFSETS[id]
    printedOffsetCache.set(id, offset)
    return offset
  }

  // Defensive fallback for a future/reindexed database.
  const db = await getKnowledgeDB()
  const rows = await db.all(`
    SELECT page, text_final, text_raw
    FROM pages
    WHERE book_id = ? AND page <= 80
    ORDER BY page
  `, [id])

  const scores = new Map()
  for (const row of rows) {
    const text = String(row.text_final || row.text_raw || '')
    const nums = [...text.matchAll(/(?:^|[\s\f])([1-9]\d{0,2})(?=[\s\f]|$)/g)]
      .map(m => Number(m[1]))
      .filter(n => n >= 1 && n <= 999 && n !== 1900 && n !== 2000)
    for (const printed of nums) {
      const offset = Number(row.page) - printed
      const item = scores.get(offset) || { count: 0, values: new Set() }
      item.count += 1
      item.values.add(printed)
      scores.set(offset, item)
    }
  }

  let bestOffset = 0
  let bestScore = -1
  for (const [offset, item] of scores) {
    const score = item.count + Math.min(item.values.size, 12) * 2
    if (score > bestScore) {
      bestScore = score
      bestOffset = offset
    }
  }

  printedOffsetCache.set(id, bestOffset)
  return bestOffset
}

export async function resolvePrintedPage(bookId, printedPage) {
  const db = await getKnowledgeDB()
  const id = toInt(bookId)
  const printed = Math.max(1, toInt(printedPage, 1))
  if (!id) throw new Error('Invalid knowledge book ID')

  const book = await db.get(`SELECT id, grade, subject, title, pages FROM books WHERE id = ? LIMIT 1`, [id])
  if (!book) return null

  const offset = await getPrintedPageOffset(id)
  const pdfPage = printed + offset
  if (pdfPage < 1 || pdfPage > Number(book.pages || 0)) return null

  const page = await db.get(`
    SELECT
      p.id, p.book_id, p.page, p.pdf_page,
      p.text_raw, p.text_final,
      p.char_count_raw, p.char_count_final,
      p.image_count, p.ocr_used, p.ocr_status,
      p.blank, p.content_status
    FROM pages p
    WHERE p.book_id = ? AND p.page = ?
    LIMIT 1
  `, [id, pdfPage])

  return {
    book_id: id,
    printed_page: printed,
    pdf_page: Number(page?.pdf_page || pdfPage),
    knowledge_page: Number(page?.page || pdfPage),
    printed_offset: offset,
    printed_total_pages: Math.max(1, Number(book.pages || pdfPage) - offset),
    book_pages: Number(book.pages || 0),
    subject: book.subject,
    grade: book.grade,
    book_title: book.title,
    page: page || null
  }
}

export async function getKnowledgePrintedPageRange({ bookId, startPage, endPage, maxPages = 80 } = {}) {
  const db = await getKnowledgeDB()
  const id = toInt(bookId)
  if (!id) throw new Error('Invalid knowledge book ID')

  const start = Math.max(1, toInt(startPage, 1))
  const requestedEnd = Math.max(start, toInt(endPage, start))
  const safeEnd = Math.min(requestedEnd, start + Math.max(1, Number(maxPages) || 80) - 1)
  const offset = await getPrintedPageOffset(id)
  const physicalStart = start + offset
  const physicalEnd = safeEnd + offset

  const rows = await db.all(`
    SELECT
      p.id, p.book_id, p.page, p.pdf_page,
      p.text_raw, p.text_final,
      p.char_count_raw, p.char_count_final,
      p.image_count, p.ocr_used, p.ocr_status,
      p.blank, p.content_status,
      b.grade, b.subject, b.title AS book_title, b.pages AS book_pages
    FROM pages p
    JOIN books b ON b.id = p.book_id
    WHERE p.book_id = ? AND p.page BETWEEN ? AND ?
    ORDER BY p.page
  `, [id, physicalStart, physicalEnd])

  return rows.map(page => ({
    ...page,
    printed_page: Number(page.page) - offset,
    pdf_page: Number(page.pdf_page ?? page.page)
  }))
}

export async function searchKnowledge({ bookId, grade, subject, query, limit = 12 } = {}) {
  const db = await getKnowledgeDB()
  const q = String(query || '').trim()
  if (!q) return []
  const safeLimit = Math.min(50, Math.max(1, Number(limit) || 12))
  const params = []
  const where = ['p.text_final <> \'\'']
  if (bookId) { where.push('p.book_id = ?'); params.push(toInt(bookId, 0)) }
  if (grade) { where.push('b.grade = ?'); params.push(toInt(grade, 0)) }
  if (subject) { where.push('lower(b.subject) = lower(?)'); params.push(String(subject).trim()) }
  params.push(`%${q}%`, safeLimit)
  return db.all(`
    SELECT
      p.book_id, p.page, p.pdf_page, b.grade, b.subject, b.title AS book_title,
      p.content_status, p.text_final, p.char_count_final,
      instr(lower(p.text_final), lower(?)) AS match_position
    FROM pages p
    JOIN books b ON b.id = p.book_id
    WHERE ${where.join(' AND ')}
      AND lower(p.text_final) LIKE lower(?)
    ORDER BY CASE WHEN instr(lower(p.text_final), lower(?)) > 0 THEN 0 ELSE 1 END, b.grade, p.page
    LIMIT ?
  `, [q, ...params.slice(0, -1), q, safeLimit])
}

export async function searchKnowledgeCandidates({ bookId, query, limit = 20 } = {}) {
  const db = await getKnowledgeDB()
  const q = String(query || '').trim()
  if (!q) return []
  const safeLimit = Math.min(100, Math.max(1, Number(limit) || 20))
  const params = [`%${q}%`]
  let where = `lower(match || context || '') LIKE lower(?)`
  if (bookId) { where += ' AND book_id = ?'; params.push(toInt(bookId, 0)) }
  params.push(safeLimit)
  return db.all(`
    SELECT id, book_id, page, kind, match, context, confidence, source
    FROM knowledge_candidates
    WHERE ${where}
    ORDER BY confidence DESC, page
    LIMIT ?
  `, params)
}

export async function getKnowledgeCoverage() {
  const db = await getKnowledgeDB()
  const totals = await db.get(`
    SELECT COUNT(*) AS total_pages, COALESCE(SUM(char_count_final),0) AS total_characters
    FROM pages
  `)
  const books = await db.all(`
    SELECT b.id, b.grade, b.subject, b.title, b.pages,
      COUNT(p.id) AS indexed_pages,
      COALESCE(SUM(CASE WHEN p.content_status = 'IMAGE_UNRECOVERED' THEN 1 ELSE 0 END),0) AS image_unrecovered,
      COALESCE(SUM(CASE WHEN p.ocr_used = 1 THEN 1 ELSE 0 END),0) AS ocr_pages,
      COALESCE(SUM(p.char_count_final),0) AS characters
    FROM books b
    LEFT JOIN pages p ON p.book_id = b.id
    GROUP BY b.id
    ORDER BY b.subject, b.grade
  `)
  const candidates = await db.get(`SELECT COUNT(*) AS total_candidates FROM knowledge_candidates`)
  return { totals, books, candidates }
}

export function buildKnowledgeContext(pages, maxCharacters = 18000) {
  let remaining = Math.max(1000, Number(maxCharacters) || 18000)
  const out = []
  for (const page of pages || []) {
    if (remaining <= 0) break
    const text = String(page.text_final || page.text_raw || '').replace(/\r/g, '').trim()
    if (!text) continue
    const printed = page.printed_page ?? page.page
    const header = `\n\n[TEXTBOOK PRINTED PAGE ${printed} | PDF PAGE ${page.pdf_page ?? page.page} | STATUS ${page.content_status || 'UNKNOWN'}]\n`
    const slice = text.slice(0, Math.max(0, remaining - header.length))
    if (!slice) break
    out.push(header + slice)
    remaining -= header.length + slice.length
  }
  return out.join('\n')
}

export async function validateKnowledgeDatabase() {
  const db = await getKnowledgeDB()
  const errors = []
  const tables = await db.all(`SELECT name FROM sqlite_master WHERE type='table'`)
  const names = new Set(tables.map(t => t.name))
  for (const required of ['books','pages','knowledge_candidates']) {
    if (!names.has(required)) errors.push(`Missing table: ${required}`)
  }
  if (errors.length) return errors
  const bookCount = await db.get(`SELECT COUNT(*) AS n FROM books`)
  const pageCount = await db.get(`SELECT COUNT(*) AS n FROM pages`)
  if (!bookCount?.n) errors.push('Knowledge DB contains no books')
  if (!pageCount?.n) errors.push('Knowledge DB contains no pages')
  return errors
}
