import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROJECT_ROOT = path.resolve(__dirname, '..')
const KNOWLEDGE_DIR = path.join(PROJECT_ROOT, 'data', 'knowledge')

const DETAIL_FILE = path.join(
  KNOWLEDGE_DIR,
  'grounded_master_reference.md'
)

const PAGE_CORPUS_FILE = path.join(
  KNOWLEDGE_DIR,
  'textbook_pages.jsonl'
)

let cache = null

function normalizeText(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeSubject(value) {
  const subject = normalizeText(value)

  if (subject.includes('math')) return 'mathematics'
  if (subject.includes('phys')) return 'physics'
  if (subject.includes('chem')) return 'chemistry'
  if (subject.includes('bio')) return 'biology'
  if (subject.includes('english')) return 'english'

  return subject
}

function parseGrade(value) {
  const match = String(value ?? '').match(/\d+/)
  return match ? Number(match[0]) : null
}

function fileExists(filePath) {
  try {
    return fs.existsSync(filePath)
  } catch {
    return false
  }
}

function parseDetailedAnalysis(markdown) {
  const books = []

  const textbookHeaderRegex =
    /^## TEXTBOOK:\s*(.+?)\n- \*\*Source File Name\*\*:\s*`([^`]+)`\n- \*\*Total Pages\*\*:\s*(\d+)/gm

  const matches = [...markdown.matchAll(textbookHeaderRegex)]

  for (let i = 0; i < matches.length; i += 1) {
    const match = matches[i]
    const start = match.index
    const end =
      i + 1 < matches.length
        ? matches[i + 1].index
        : markdown.length

    const block = markdown.slice(start, end)

    const title = match[1].trim()
    const sourceFile = match[2].trim()
    const totalPages = Number(match[3])

    const pages = []

    const pageRegex =
      /### Page\s+(\d+)\s+->\s*(.+?)\n([\s\S]*?)(?=\n### Page\s+\d+\s+->|\n---|$)/g

    for (const pageMatch of block.matchAll(pageRegex)) {
      const pageNumber = Number(pageMatch[1])
      const location = pageMatch[2].trim()
      const body = pageMatch[3].trim()

      const statusMatch = body.match(
        /- \*\*Status\*\*:\s*(.+)/i
      )

      const knowledgeMatch = body.match(
        /- \*\*Extracted knowledge\*\*:\s*([\s\S]*)/i
      )

      pages.push({
        sourceType: 'DETAILED_ANALYSIS',
        grade: parseGrade(title),
        subject: normalizeSubject(title),
        textbook: title,
        sourceFile,
        page: pageNumber,
        unitSection: location,
        status: statusMatch
          ? statusMatch[1].trim()
          : 'UNKNOWN',
        knowledge: knowledgeMatch
          ? knowledgeMatch[1].trim()
          : '',
      })
    }

    books.push({
      sourceType: 'DETAILED_ANALYSIS',
      grade: parseGrade(title),
      subject: normalizeSubject(title),
      textbook: title,
      sourceFile,
      totalPages,
      pages,
    })
  }

  return books
}

function parsePageCorpus(jsonl) {
  const pages = []
  const lines = jsonl.split(/\r?\n/)

  for (const line of lines) {
    if (!line.trim()) continue

    try {
      const row = JSON.parse(line)

      pages.push({
        sourceType: 'PAGE_CORPUS',
        grade: parseGrade(row.grade),
        subject: normalizeSubject(row.subject),
        textbook: row.title || '',
        sourceFile: row.path || '',
        page: Number(row.page) || null,
        pdfPage: row.pdf_page ?? null,
        text: row.text || '',
        charCount: Number(row.char_count) || 0,
        imageCount: Number(row.image_count) || 0,
        ocrNeeded: Boolean(row.ocr_needed),
      })
    } catch {
      // Ignore malformed lines rather than destroying the whole corpus.
    }
  }

  return pages
}

function buildIndexes(detailBooks, pageCorpus) {
  const pagesByKey = new Map()

  for (const page of pageCorpus) {
    const key = [
      normalizeSubject(page.subject),
      page.grade,
      normalizeText(page.textbook),
      page.page,
    ].join('|')

    pagesByKey.set(key, page)
  }

  const detailByKey = new Map()

  for (const book of detailBooks) {
    for (const page of book.pages) {
      const key = [
        normalizeSubject(page.subject),
        page.grade,
        normalizeText(page.sourceFile),
        page.page,
      ].join('|')

      detailByKey.set(key, page)
    }
  }

  return {
    pagesByKey,
    detailByKey,
  }
}

function scoreText(queryWords, text) {
  const normalized = normalizeText(text)
  let score = 0

  for (const word of queryWords) {
    if (!word) continue

    if (normalized.includes(word)) {
      score += 1
    }

    const occurrences = normalized.split(word).length - 1
    if (occurrences > 1) {
      score += Math.min(occurrences - 1, 4) * 0.25
    }
  }

  return score
}

function loadKnowledge() {
  if (cache) return cache

  if (!fileExists(DETAIL_FILE)) {
    throw new Error(
      `Missing detailed knowledge file:\n${DETAIL_FILE}`
    )
  }

  if (!fileExists(PAGE_CORPUS_FILE)) {
    throw new Error(
      `Missing textbook page corpus:\n${PAGE_CORPUS_FILE}`
    )
  }

  const detailMarkdown = fs.readFileSync(
    DETAIL_FILE,
    'utf8'
  )

  const pageCorpusText = fs.readFileSync(
    PAGE_CORPUS_FILE,
    'utf8'
  )

  const detailBooks = parseDetailedAnalysis(detailMarkdown)
  const pageCorpus = parsePageCorpus(pageCorpusText)

  const indexes = buildIndexes(detailBooks, pageCorpus)

  cache = {
    detailBooks,
    pageCorpus,
    ...indexes,
    loadedAt: new Date().toISOString(),
  }

  return cache
}

export function getKnowledgeManifest() {
  const data = loadKnowledge()

  const bookMap = new Map()

  for (const page of data.pageCorpus) {
    const key = [
      page.subject,
      page.grade,
      page.textbook,
    ].join('|')

    if (!bookMap.has(key)) {
      bookMap.set(key, {
        subject: page.subject,
        grade: page.grade,
        textbook: page.textbook,
        pages: 0,
      })
    }

    bookMap.get(key).pages += 1
  }

  return {
    detailAnalysisBooks: data.detailBooks.map(book => ({
      subject: book.subject,
      grade: book.grade,
      textbook: book.textbook,
      sourceFile: book.sourceFile,
      totalPages: book.totalPages,
      analyzedPages: book.pages.length,
    })),

    pageCorpusBooks: [...bookMap.values()],

    totals: {
      detailedAnalysisPages:
        data.detailBooks.reduce(
          (sum, book) => sum + book.pages.length,
          0
        ),
      textbookCorpusPages: data.pageCorpus.length,
    },

    loadedAt: data.loadedAt,
  }
}

export function getPage({
  subject,
  grade,
  textbook,
  page,
} = {}) {
  const data = loadKnowledge()

  const wantedSubject = normalizeSubject(subject)
  const wantedGrade =
    grade === null || grade === undefined
      ? null
      : Number(grade)
  const wantedPage = Number(page)

  const corpusPage = data.pageCorpus.find(item => {
    if (wantedSubject && item.subject !== wantedSubject) {
      return false
    }

    if (wantedGrade !== null && item.grade !== wantedGrade) {
      return false
    }

    if (wantedPage && item.page !== wantedPage) {
      return false
    }

    if (textbook) {
      const bookText = normalizeText(item.textbook)
      const wantedText = normalizeText(textbook)

      if (!bookText.includes(wantedText) && !wantedText.includes(bookText)) {
        return false
      }
    }

    return true
  })

  if (!corpusPage) {
    return null
  }

  const matchingDetail = data.detailBooks
    .flatMap(book => book.pages)
    .find(detail => {
      if (detail.page !== corpusPage.page) {
        return false
      }

      if (detail.grade !== corpusPage.grade) {
        return false
      }

      if (detail.subject !== corpusPage.subject) {
        return false
      }

      return normalizeText(detail.sourceFile).endsWith(
        normalizeText(path.basename(corpusPage.sourceFile))
      )
    })

  return {
    corpus: corpusPage,
    detailedAnalysis: matchingDetail || null,
  }
}

export function searchKnowledge({
  query = '',
  subject = null,
  grade = null,
  textbook = null,
  limit = 12,
} = {}) {
  const data = loadKnowledge()

  const wantedSubject = normalizeSubject(subject)
  const wantedGrade =
    grade === null || grade === undefined
      ? null
      : Number(grade)

  const words = normalizeText(query)
    .split(/\s+/)
    .filter(word => word.length >= 2)

  const candidates = []

  for (const page of data.pageCorpus) {
    if (wantedSubject && page.subject !== wantedSubject) {
      continue
    }

    if (wantedGrade !== null && page.grade !== wantedGrade) {
      continue
    }

    if (textbook) {
      const bookText = normalizeText(page.textbook)
      const wantedBook = normalizeText(textbook)

      if (
        !bookText.includes(wantedBook) &&
        !wantedBook.includes(bookText)
      ) {
        continue
      }
    }

    const detailed = data.detailBooks
      .flatMap(book => book.pages)
      .find(detail =>
        detail.page === page.page &&
        detail.grade === page.grade &&
        detail.subject === page.subject &&
        normalizeText(detail.sourceFile).endsWith(
          normalizeText(path.basename(page.sourceFile))
        )
      )

    const searchableText = [
      page.text,
      detailed?.unitSection || '',
      detailed?.status || '',
      detailed?.knowledge || '',
    ].join(' ')

    const score =
      words.length === 0
        ? 0
        : scoreText(words, searchableText)

    if (words.length > 0 && score <= 0) {
      continue
    }

    candidates.push({
      ...page,
      score,
      detailedAnalysis: detailed || null,
    })
  }

  candidates.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score
    }

    return (a.page || 0) - (b.page || 0)
  })

  return candidates.slice(0, Math.min(Number(limit) || 12, 50))
}

export function buildAIContext(results = [], maxCharacters = 12000) {
  let context = ''

  for (const result of results) {
    const textbookText = result.text?.trim() || ''
    const analysisText =
      result.detailedAnalysis?.knowledge?.trim() || ''

    if (!textbookText && !analysisText) {
      continue
    }

    const block = [
      'SOURCE: Ethiopian Ministry of Education textbook corpus',
      `Subject: ${result.subject || 'Unknown'}`,
      `Grade: ${result.grade || 'Unknown'}`,
      `Textbook: ${result.textbook || 'Unknown'}`,
      `Page: ${result.page ?? 'Unknown'}`,
      result.detailedAnalysis?.unitSection
        ? `Mapped location: ${result.detailedAnalysis.unitSection}`
        : '',
      '',
      analysisText
        ? `PREVIOUSLY ANALYZED KNOWLEDGE:\n${analysisText}`
        : '',
      textbookText
        ? `ACTUAL TEXTBOOK PAGE:\n${textbookText}`
        : '',
      '\n--------------------------------------------------\n',
    ]
      .filter(Boolean)
      .join('\n')

    if (context.length + block.length > maxCharacters) {
      break
    }

    context += block
  }

  return context.trim()
}

export function validateKnowledgeSource() {
  const data = loadKnowledge()

  return {
    valid: true,
    detailedAnalysisBooks: data.detailBooks.length,
    detailedAnalysisPages: data.detailBooks.reduce(
      (sum, book) => sum + book.pages.length,
      0
    ),
    textbookCorpusPages: data.pageCorpus.length,
    subjects: [
      ...new Set(
        data.pageCorpus.map(page => page.subject).filter(Boolean)
      ),
    ],
    grades: [
      ...new Set(
        data.pageCorpus.map(page => page.grade).filter(Boolean)
      ),
    ].sort((a, b) => a - b),
    files: {
      detailedAnalysis: DETAIL_FILE,
      textbookCorpus: PAGE_CORPUS_FILE,
    },
  }
}

export function clearKnowledgeCache() {
  cache = null
}
