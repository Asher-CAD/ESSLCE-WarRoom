import { JSONFilePreset } from 'lowdb/node'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dataDir = path.join(__dirname, '..', 'data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const defaultData = {
  subjects: [
    { id: 1, name: 'Mathematics', color: '#ff4d4d', priority: 'HIGH', grades: 'Grade 9-12' },
    { id: 2, name: 'Physics', color: '#ff6b35', priority: 'HIGH', grades: 'Grade 9-12' },
    { id: 3, name: 'Chemistry', color: '#ff9900', priority: 'HIGH', grades: 'Grade 10 Focus' },
    { id: 4, name: 'Biology', color: '#00cc66', priority: 'STANDARD', grades: 'Grade 9-12' },
    { id: 5, name: 'English', color: '#4d79ff', priority: 'STANDARD', grades: 'Grade 9-12' },
    { id: 6, name: 'SAT (Aptitude)', color: '#b44dff', priority: 'MEDIUM', grades: 'General' }
  ],
  books: [],
  chapters: [],
  sections: [],
  quiz_results: [],
  study_sessions: [],
  mistakes: [],
  nextId: { books: 1, sections: 1, quiz_results: 1, study_sessions: 1, mistakes: 1 }
}

const CHAPTERS = [
  // MATHEMATICS
  { id: 1001, sid: 1, g: 9, n: 1, t: 'Further on Sets' },
  { id: 1002, sid: 1, g: 9, n: 2, t: 'The Real Number System' },
  { id: 1003, sid: 1, g: 9, n: 3, t: 'Solving Equations' },
  { id: 1004, sid: 1, g: 9, n: 4, t: 'Solving Inequalities' },
  { id: 1005, sid: 1, g: 9, n: 5, t: 'Introduction to Trigonometry' },
  { id: 1006, sid: 1, g: 9, n: 6, t: 'Regular Polygons' },
  { id: 1007, sid: 1, g: 9, n: 7, t: 'Congruency and Similarity' },
  { id: 1008, sid: 1, g: 9, n: 8, t: 'Vectors in Two Dimensions' },
  { id: 1009, sid: 1, g: 9, n: 9, t: 'Statistics and Probability' },
  { id: 1010, sid: 1, g: 10, n: 1, t: 'Relations and Functions' },
  { id: 1011, sid: 1, g: 10, n: 2, t: 'Polynomial Functions' },
  { id: 1012, sid: 1, g: 10, n: 3, t: 'Exponential and Logarithmic Functions' },
  { id: 1013, sid: 1, g: 10, n: 4, t: 'Trigonometric Functions' },
  { id: 1014, sid: 1, g: 10, n: 5, t: 'Circles' },
  { id: 1015, sid: 1, g: 10, n: 6, t: 'Solid Geometry' },
  { id: 1016, sid: 1, g: 10, n: 7, t: 'Coordinate Geometry' },
  { id: 1017, sid: 1, g: 11, n: 1, t: 'Sequences and Series' },
  { id: 1018, sid: 1, g: 11, n: 2, t: 'Limits and Continuity' },
  { id: 1019, sid: 1, g: 11, n: 3, t: 'Introduction to Differential Calculus' },
  { id: 1020, sid: 1, g: 11, n: 4, t: 'Introduction to Integral Calculus' },
  { id: 1021, sid: 1, g: 11, n: 5, t: 'Vectors in 2D and 3D' },
  { id: 1022, sid: 1, g: 11, n: 6, t: 'Mathematical Proofs' },
  { id: 1023, sid: 1, g: 11, n: 7, t: 'Statistics and Probability' },
  { id: 1024, sid: 1, g: 12, n: 1, t: 'Complex Numbers' },
  { id: 1025, sid: 1, g: 12, n: 2, t: 'Application of Differential Calculus' },
  { id: 1026, sid: 1, g: 12, n: 3, t: 'Application of Integral Calculus' },
  { id: 1027, sid: 1, g: 12, n: 4, t: 'Solid Figures and 3D Coordinate Geometry' },
  { id: 1028, sid: 1, g: 12, n: 5, t: 'Mathematical Applications in Business and Sciences' },

  // PHYSICS
  { id: 2001, sid: 2, g: 9, n: 1, t: 'Physics and Human Society' },
  { id: 2002, sid: 2, g: 9, n: 2, t: 'Physical Quantities and Measurement' },
  { id: 2003, sid: 2, g: 9, n: 3, t: 'Motion in a Straight Line' },
  { id: 2004, sid: 2, g: 9, n: 4, t: 'Force, Work, Energy, and Power' },
  { id: 2005, sid: 2, g: 9, n: 5, t: 'Simple Machines' },
  { id: 2006, sid: 2, g: 9, n: 6, t: 'Fluid Statics' },
  { id: 2007, sid: 2, g: 9, n: 7, t: 'Heat and Temperature' },
  { id: 2008, sid: 2, g: 10, n: 1, t: 'Electromagnetic Waves and Geometrical Optics' },
  { id: 2009, sid: 2, g: 10, n: 2, t: 'Wave Motion and Sound' },
  { id: 2010, sid: 2, g: 10, n: 3, t: 'Introduction to Electronics' },
  { id: 2011, sid: 2, g: 10, n: 4, t: 'Electromagnetism' },
  { id: 2012, sid: 2, g: 10, n: 5, t: 'Electric Current and Circuit' },
  { id: 2013, sid: 2, g: 10, n: 6, t: 'Electromagnetic Induction' },
  { id: 2014, sid: 2, g: 11, n: 1, t: 'Measurement and Practical Physics' },
  { id: 2015, sid: 2, g: 11, n: 2, t: 'Vector Quantities' },
  { id: 2016, sid: 2, g: 11, n: 3, t: 'Kinematics' },
  { id: 2017, sid: 2, g: 11, n: 4, t: 'Dynamics' },
  { id: 2018, sid: 2, g: 11, n: 5, t: 'Heat and Thermodynamics' },
  { id: 2019, sid: 2, g: 11, n: 6, t: 'Electrostatics' },
  { id: 2020, sid: 2, g: 12, n: 1, t: 'Electric Current and Magnetic Field' },
  { id: 2021, sid: 2, g: 12, n: 2, t: 'Electromagnetic Induction and AC Circuits' },
  { id: 2022, sid: 2, g: 12, n: 3, t: 'Atomic and Nuclear Physics' },
  { id: 2023, sid: 2, g: 12, n: 4, t: 'Relativistic Mechanics' },
  { id: 2024, sid: 2, g: 12, n: 5, t: 'Astrophysics' },

  // CHEMISTRY
  { id: 3001, sid: 3, g: 9, n: 1, t: 'Chemistry and Society' },
  { id: 3002, sid: 3, g: 9, n: 2, t: 'Measurements and Units in Chemistry' },
  { id: 3003, sid: 3, g: 9, n: 3, t: 'Atomic Structure' },
  { id: 3004, sid: 3, g: 9, n: 4, t: 'Periodic Classification of Elements' },
  { id: 3005, sid: 3, g: 9, n: 5, t: 'Chemical Bonding' },
  { id: 3006, sid: 3, g: 10, n: 1, t: 'Introduction to Organic Chemistry' },
  { id: 3007, sid: 3, g: 10, n: 2, t: 'Energy Changes and Electrochemistry' },
  { id: 3008, sid: 3, g: 10, n: 3, t: 'Rate of Chemical Reaction and Chemical Equilibrium' },
  { id: 3009, sid: 3, g: 10, n: 4, t: 'Some Important Industry and Environmental Chemistry' },
  { id: 3010, sid: 3, g: 11, n: 1, t: 'Atomic Structure and Periodic Table' },
  { id: 3011, sid: 3, g: 11, n: 2, t: 'Chemical Bonding and Structure' },
  { id: 3012, sid: 3, g: 11, n: 3, t: 'Physical States of Matter' },
  { id: 3013, sid: 3, g: 11, n: 4, t: 'Chemical Kinetics' },
  { id: 3014, sid: 3, g: 11, n: 5, t: 'Chemical Equilibrium and Phase Equilibrium' },
  { id: 3015, sid: 3, g: 11, n: 6, t: 'Carboxylic Acids, Esters, Fats and Oils' },
  { id: 3016, sid: 3, g: 12, n: 1, t: 'Solutions' },
  { id: 3017, sid: 3, g: 12, n: 2, t: 'Acid-Base Equilibrium' },
  { id: 3018, sid: 3, g: 12, n: 3, t: 'Electrochemistry' },
  { id: 3019, sid: 3, g: 12, n: 4, t: 'Industrial Chemistry' },
  { id: 3020, sid: 3, g: 12, n: 5, t: 'Polymers' },

  // BIOLOGY
  { id: 4001, sid: 4, g: 9, n: 1, t: 'Introduction to Biology' },
  { id: 4002, sid: 4, g: 9, n: 2, t: 'Cell Biology' },
  { id: 4003, sid: 4, g: 9, n: 3, t: 'Classification of Organisms' },
  { id: 4004, sid: 4, g: 9, n: 4, t: 'Human Biology and Health' },
  { id: 4005, sid: 4, g: 9, n: 5, t: 'Microorganisms and Diseases' },
  { id: 4006, sid: 4, g: 10, n: 1, t: 'Biotechnology' },
  { id: 4007, sid: 4, g: 10, n: 2, t: 'Ecology and Conservation of Natural Resources' },
  { id: 4008, sid: 4, g: 10, n: 3, t: 'Genetics and Heredity' },
  { id: 4009, sid: 4, g: 10, n: 4, t: 'Cell Division and Reproduction' },
  { id: 4010, sid: 4, g: 10, n: 5, t: 'Human Body Systems' },
  { id: 4011, sid: 4, g: 11, n: 1, t: 'Science of Biology' },
  { id: 4012, sid: 4, g: 11, n: 2, t: 'Biochemical Molecules' },
  { id: 4013, sid: 4, g: 11, n: 3, t: 'Enzymes and Cellular Respiration' },
  { id: 4014, sid: 4, g: 11, n: 4, t: 'Cell Structure and Photosynthesis' },
  { id: 4015, sid: 4, g: 11, n: 5, t: 'Plants and Ecology' },
  { id: 4016, sid: 4, g: 12, n: 1, t: 'Microorganisms' },
  { id: 4017, sid: 4, g: 12, n: 2, t: 'Ecology' },
  { id: 4018, sid: 4, g: 12, n: 3, t: 'Genetics and Evolution' },
  { id: 4019, sid: 4, g: 12, n: 4, t: 'Behavior and Homeostasis' },

  // ENGLISH
  { id: 5001, sid: 5, g: 9, n: 1, t: 'Education' },
  { id: 5002, sid: 5, g: 10, n: 1, t: 'Tourism and Culture' },
  { id: 5003, sid: 5, g: 11, n: 1, t: 'National Pride and Heritage' },
  { id: 5004, sid: 5, g: 12, n: 1, t: 'ESSLCE Grammar and Vocabulary Mastery' },

  // SAT
  { id: 6001, sid: 6, g: 0, n: 1, t: 'Number Theory and Advanced Arithmetic' },
  { id: 6002, sid: 6, g: 0, n: 2, t: 'Algebra, Equations and Word Problems' },
  { id: 6003, sid: 6, g: 0, n: 3, t: 'Geometry and Spatial Reasoning' },
  { id: 6004, sid: 6, g: 0, n: 4, t: 'Data Analysis, Graphs and Statistics' },
  { id: 6005, sid: 6, g: 0, n: 5, t: 'Logical, Abstract and Verbal Reasoning' }
]

// NOTE: intentionally no hardcoded absolute drive paths here (e.g. old
// "D:\ENTRANCE 2019\Textbooks"-style locations). The project has moved
// before and will likely move again, so every candidate below is derived
// either from an explicit env var or from the project's own folder — i.e.
// wherever ESSLCE-WarRoom itself currently lives on disk.
const FOLDER_MAP = { 1: 'Math', 2: 'Physics', 3: 'Chemistry', 4: 'Biology', 5: 'English' }

function uniquePaths(paths) {
  return [...new Set(paths.filter(Boolean).map(p => path.resolve(p)))]
}

// This is the ONE place textbook root candidates are defined. Both the
// server's DB init (below) and every PDF-serving route in server/index.js
// call into this same module instead of keeping their own copy — two
// independent copies is exactly what caused a stale hardcoded path to
// survive in one of them after the project moved.
export function getTextbookRoots() {
  const projectRoot = path.resolve(__dirname, '..')
  const envRoot = process.env.ESSLCE_TEXTBOOKS_PATH || process.env.TEXTBOOKS_PATH || ''
  return uniquePaths([
    envRoot,                                          // explicit override, always wins
    path.join(projectRoot, 'Textbooks'),               // Textbooks/ inside the project folder
    path.join(projectRoot, 'textbooks'),
    path.join(projectRoot, 'data', 'Textbooks'),
    path.join(projectRoot, '..', 'Textbooks'),         // Textbooks/ as a sibling of the project folder
    path.join(projectRoot, '..', 'textbooks')
  ])
}

let textbookIndexCache = null

// Fallback index: walk every discovered root (recursively, so grade
// subfolders etc. are covered) and index every PDF by filename and by
// filename-without-extension. Used only when the fast subject-folder path
// below doesn't find an exact match, e.g. because a file was renamed or the
// folder layout changed along with the move.
function buildTextbookIndex() {
  if (textbookIndexCache) return textbookIndexCache
  const byName = new Map()
  const byStem = new Map()
  const seenDirs = new Set()
  const stack = [...getTextbookRoots()]
  while (stack.length) {
    const dir = stack.pop()
    if (!dir || seenDirs.has(dir)) continue
    seenDirs.add(dir)
    if (!fs.existsSync(dir)) continue
    let entries = []
    try { entries = fs.readdirSync(dir, { withFileTypes: true }) } catch { continue }
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) { stack.push(full); continue }
      if (!/\.pdf$/i.test(entry.name)) continue
      const nameKey = entry.name.toLowerCase()
      const stemKey = path.basename(entry.name, path.extname(entry.name)).toLowerCase()
      if (!byName.has(nameKey)) byName.set(nameKey, full)
      if (!byStem.has(stemKey)) byStem.set(stemKey, full)
    }
  }
  textbookIndexCache = { byName, byStem }
  return textbookIndexCache
}

function findTextbookFile(subjectFolder, fileName) {
  const target = String(fileName || '').trim()
  if (!target) return null
  for (const root of getTextbookRoots()) {
    const candidate = path.join(root, subjectFolder, target)
    if (fs.existsSync(candidate)) return candidate
  }
  return null
}

export function resolveBookFilePath(filePath, subjectId = null, bookTitle = null) {
  const raw = String(filePath || '').trim()
  if (raw && fs.existsSync(raw)) return path.resolve(raw)

  const subjectFolder = FOLDER_MAP[Number(subjectId)]
  const fileName = raw ? raw.split(/[\\/]/).pop() : ''

  if (subjectFolder && fileName) {
    const found = findTextbookFile(subjectFolder, fileName)
    if (found) return found
  }

  // Last resort: match by filename anywhere under any discovered root,
  // regardless of subject-folder layout.
  const index = buildTextbookIndex()
  if (fileName) {
    const nameKey = fileName.toLowerCase()
    if (index.byName.has(nameKey)) return index.byName.get(nameKey)
    const stemKey = path.basename(fileName, path.extname(fileName)).toLowerCase()
    if (index.byStem.has(stemKey)) return index.byStem.get(stemKey)
  }
  if (bookTitle) {
    const stemKey = String(bookTitle).trim().toLowerCase()
    if (index.byStem.has(stemKey)) return index.byStem.get(stemKey)
  }
  return null
}

function detectGrade(filename) {
  for (const p of [/G(\d+)-/i, /Grade\s*(\d+)/i]) {
    const m = filename.match(p)
    if (m) return parseInt(m[1])
  }
  return 0
}

let db = null

export async function initDB() {
  db = await JSONFilePreset(path.join(dataDir, 'warroom.json'), defaultData)

  // 1. Ensure db.data and all collections exist safely regardless of what was loaded from disk
  if (!db.data) db.data = { ...defaultData }
  if (!Array.isArray(db.data.subjects) || db.data.subjects.length === 0) db.data.subjects = [...defaultData.subjects]
  if (!Array.isArray(db.data.books)) db.data.books = []
  if (!Array.isArray(db.data.chapters)) db.data.chapters = []
  if (!Array.isArray(db.data.sections)) db.data.sections = []
  if (!Array.isArray(db.data.quiz_results)) db.data.quiz_results = []
  if (!Array.isArray(db.data.study_sessions)) db.data.study_sessions = []
  if (!Array.isArray(db.data.mistakes)) db.data.mistakes = []
  // AI-output cache: keyed by exactly what defines the request (subject/grade/
  // unit/section/type/question/count). Same key -> serve the saved result
  // instead of calling an AI provider again. This is purely additive to the
  // existing schema and never deletes/overwrites anything else in the file.
  if (!db.data.ai_cache || typeof db.data.ai_cache !== 'object' || Array.isArray(db.data.ai_cache)) db.data.ai_cache = {}
 if (!db.data.nextId || typeof db.data.nextId !== 'object') {
  db.data.nextId = {}
}

if (!Number.isInteger(db.data.nextId.books) || db.data.nextId.books < 1) {
  db.data.nextId.books = 1
}

if (!Number.isInteger(db.data.nextId.sections) || db.data.nextId.sections < 1) {
  db.data.nextId.sections = 1
}

if (!Number.isInteger(db.data.nextId.quiz_results) || db.data.nextId.quiz_results < 1) {
  db.data.nextId.quiz_results = 1
}

if (!Number.isInteger(db.data.nextId.study_sessions) || db.data.nextId.study_sessions < 1) {
  db.data.nextId.study_sessions = 1
}

if (!Number.isInteger(db.data.nextId.mistakes) || db.data.nextId.mistakes < 1) {
  db.data.nextId.mistakes = 1
}
  // 2. Safe migration from older `units` format if present on disk
  if (Array.isArray(db.data.units) && db.data.units.length > 0 && db.data.chapters.length === 0) {
    console.log('🔄 Migrating existing units to chapters schema...')
    db.data.chapters = db.data.units.map(u => ({
      id: u.id,
      subject_id: u.subject_id,
      grade: u.grade,
      chapter_number: u.unit_number || u.chapter_number || 1,
      title: u.title,
      book_id: u.book_id || null,
      start_page: u.start_page || null,
      end_page: u.end_page || null,
      status: u.status || 'not-started',
      esslce_importance: u.esslce_importance || 'medium',
      estimated_study_hours: u.estimated_study_hours || 6
    }))
  }

    // 3. Normalize the curriculum by stable key.
  // Stable key = subject + grade + chapter number.
  //
  // The current database contains two copies of every chapter:
  // old IDs 1-100 and newer IDs 1001-6005.
  // We keep ONE record for each real curriculum chapter.

  const chapterByKey = new Map()
  const duplicateChapterIds = new Set()

  for (const ch of db.data.chapters) {
    const key = `${ch.subject_id}_${ch.grade}_${ch.chapter_number}`

    if (!chapterByKey.has(key)) {
      chapterByKey.set(key, ch)
    } else {
      const existing = chapterByKey.get(key)

      // Prefer the record that already contains useful data.
      const existingScore =
        Number(Boolean(existing.book_id)) +
        Number(Boolean(existing.start_page)) +
        Number(Boolean(existing.end_page)) +
        Number(Boolean(existing.extracted_text))

      const currentScore =
        Number(Boolean(ch.book_id)) +
        Number(Boolean(ch.start_page)) +
        Number(Boolean(ch.end_page)) +
        Number(Boolean(ch.extracted_text))

      if (currentScore > existingScore) {
        duplicateChapterIds.add(existing.id)
        chapterByKey.set(key, ch)
      } else {
        duplicateChapterIds.add(ch.id)
      }
    }
  }

  // Preserve references from sections before removing duplicate chapters.
  const keptChapterByKey = new Map()

  for (const ch of chapterByKey.values()) {
    keptChapterByKey.set(
      `${ch.subject_id}_${ch.grade}_${ch.chapter_number}`,
      ch
    )
  }

  // Remap sections belonging to duplicate chapters to the surviving chapter.
  for (const sec of db.data.sections) {
    if (!duplicateChapterIds.has(sec.chapter_id)) continue

    const duplicate = db.data.chapters.find(c => c.id === sec.chapter_id)

    if (duplicate) {
      const key = `${duplicate.subject_id}_${duplicate.grade}_${duplicate.chapter_number}`
      const survivor = keptChapterByKey.get(key)

      if (survivor) {
        sec.chapter_id = survivor.id
      }
    }
  }

  // Never delete legacy curriculum records.  Old quiz results, study sessions
  // and mistakes may still reference them.  Archive them and retain an explicit
  // pointer to the canonical chapter instead; API queries only expose canonical
  // records to learners.
  for (const duplicate of db.data.chapters) {
    if (!duplicateChapterIds.has(duplicate.id)) continue
    const key = `${duplicate.subject_id}_${duplicate.grade}_${duplicate.chapter_number}`
    const canonical = keptChapterByKey.get(key)
    duplicate.archived = true
    duplicate.canonical_chapter_id = canonical?.id || null
  }

  for (const chapter of chapterByKey.values()) {
    chapter.archived = false
    chapter.canonical_chapter_id = null
  }

  if (duplicateChapterIds.size > 0) {
    console.log(`🗂️ Archived ${duplicateChapterIds.size} legacy duplicate chapters safely.`)
  }

  // 4. Repair section IDs.
  //
  // Existing database sections currently have null IDs.
  // Every section needs a stable numeric ID because the AI,
  // quiz and progress APIs use sectionId.

  const usedSectionIds = new Set()
  let nextSectionId = 1

  for (const sec of db.data.sections) {
    if (
      Number.isInteger(sec.id) &&
      sec.id > 0 &&
      !usedSectionIds.has(sec.id)
    ) {
      usedSectionIds.add(sec.id)

      if (sec.id >= nextSectionId) {
        nextSectionId = sec.id + 1
      }
    } else {
      while (usedSectionIds.has(nextSectionId)) {
        nextSectionId++
      }

      sec.id = nextSectionId
      usedSectionIds.add(nextSectionId)
      nextSectionId++
    }
  }

  db.data.nextId.sections = nextSectionId

  // 5. Only create a fallback section when a chapter genuinely has
  // no section at all.
  //
  // This is temporary structural data. It must NOT pretend to be
  // textbook analysis.

  for (const ch of db.data.chapters.filter(chapter => !chapter.archived)) {
    const hasSections = db.data.sections.some(
      s => s.chapter_id === ch.id
    )

    if (!hasSections) {
      db.data.sections.push({
        id: db.data.nextId.sections++,
        chapter_id: ch.id,
        section_number: `${ch.chapter_number}.1`,
        title: ch.title,
        pdf_start_page: ch.start_page || null,
        pdf_end_page: ch.end_page || null,
        page_reference: ch.start_page
          ? String(ch.start_page)
          : null,
        extracted_text: '',
        content_status: 'awaiting_textbook_mapping'
      })
    }
  }
  // 4. Ensure every chapter has at least one foundational section if none exist
  for (const ch of db.data.chapters.filter(chapter => !chapter.archived)) {
    const hasSections = db.data.sections.some(s => s.chapter_id === ch.id)
    if (!hasSections) {
      db.data.sections.push({
        id: db.data.nextId.sections++,
        chapter_id: ch.id,
        section_number: `${ch.chapter_number}.1`,
        title: `${ch.title} - Core Concepts`,
        pdf_start_page: ch.start_page || 1,
        pdf_end_page: ch.end_page || null,
        page_reference: ch.start_page ? String(ch.start_page) : '1',
        extracted_text: ''
      })
    }
  }

  // 5. Repair/migrate persisted textbook paths from older project locations.
  //    The project may have moved while the PDFs stayed elsewhere.
  for (const book of db.data.books) {
    const resolved = resolveBookFilePath(book.file_path, book.subject_id, book.title)
    if (resolved && resolved !== book.file_path) {
      console.log(`🔧 Repaired textbook path: ${book.title} → ${resolved}`)
      book.file_path = resolved
    }
  }

  // 6. Register books from every discovered textbook root and link to chapters.
  for (const [sidStr, folder] of Object.entries(FOLDER_MAP)) {
    const sid = parseInt(sidStr)
    const seenFiles = new Set()
    for (const root of getTextbookRoots()) {
      const dir = path.join(root, folder)
      if (!fs.existsSync(dir)) continue

      const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.pdf'))
      for (const file of files) {
        const grade = detectGrade(file)
        const filePath = path.resolve(path.join(dir, file))
        if (seenFiles.has(filePath.toLowerCase())) continue
        seenFiles.add(filePath.toLowerCase())

        let book = db.data.books.find(b =>
          Number(b.subject_id) === sid &&
          String(path.basename(b.file_path || '')).toLowerCase() === file.toLowerCase()
        )
        if (!book) {
          const subj = db.data.subjects.find(s => s.id === sid)
          book = {
            id: db.data.nextId.books++,
            subject_id: sid,
            grade,
            title: `${subj?.name || 'Unknown'} Grade ${grade}`,
            file_path: filePath,
            total_pages: 0
          }
          db.data.books.push(book)
          console.log(`📄 Registered: ${book.title}`)
        } else if (book.file_path !== filePath) {
          book.file_path = filePath
          if (!book.grade || Number(book.grade) === 0) book.grade = grade
        }

        // Link chapters to this book
        for (const ch of db.data.chapters) {
          if (ch.subject_id === sid && ch.grade === grade && !ch.book_id) {
            ch.book_id = book.id
          }
        }
      }
    }
  }

  const availableRoots = getTextbookRoots().filter(root => fs.existsSync(root))
  console.log(`📚 Textbook roots: ${availableRoots.length ? availableRoots.join(' | ') : 'none found'}`)

  await db.write()
  console.log(`✅ DB ready: ${db.data.chapters.length} chapters, ${db.data.sections.length} sections, ${db.data.books.length} books`)
  return db
}

export function getDB() {
  return db
}

// ============================================================
// AI OUTPUT CACHE
// A record of previously AI-generated guides/answers/quizzes, keyed by
// exactly what defines the request. Lets the server reuse a saved result
// instead of calling an AI provider again for the same subject/grade/unit/
// section/question — saves API quota and works even if providers are
// temporarily unavailable, since a cache hit needs no network call at all.
// ============================================================
export function getAiCacheEntry(key) {
  if (!key || !db?.data?.ai_cache) return null
  return db.data.ai_cache[key] || null
}

export async function setAiCacheEntry(key, value) {
  if (!key || !db?.data) return
  db.data.ai_cache[key] = { value, createdAt: new Date().toISOString() }
  try { await db.write() } catch (e) { console.warn('⚠️ AI cache write failed:', e.message) }
}

export function getAiCacheStats() {
  const entries = Object.values(db?.data?.ai_cache || {})
  return { total: entries.length }
}

export function validateDatabase() {
  const errors = []
  if (!db || !db.data) {
    return ['Database not initialized']
  }
  const seen = new Set()
  const chapters = Array.isArray(db.data.chapters) ? db.data.chapters : []
  const sections = Array.isArray(db.data.sections) ? db.data.sections : []
  const books = Array.isArray(db.data.books) ? db.data.books : []

  for (const ch of chapters.filter(chapter => !chapter.archived)) {
    if (!ch.id) errors.push(`Chapter missing ID`)
    if (!ch.title) errors.push(`Chapter ${ch.id} missing title`)
    const key = `${ch.subject_id}_${ch.grade}_${ch.chapter_number}`
    if (seen.has(key)) errors.push(`Duplicate chapter: ${key}`)
    seen.add(key)
    if (ch.book_id) {
      const book = books.find(b => b.id === ch.book_id)
      if (!book) errors.push(`Chapter ${ch.id} → missing book ${ch.book_id}`)
      else if (!fs.existsSync(book.file_path)) errors.push(`Chapter ${ch.id} → file missing: ${book.file_path}`)
    }
  }
  for (const sec of sections) {
    if (!sec.chapter_id) errors.push(`Section ${sec.id} missing chapter_id`)
    const ch = chapters.find(c => c.id === sec.chapter_id)
    if (!ch) errors.push(`Section ${sec.id} → missing chapter ${sec.chapter_id}`)
  }
  return errors
}
