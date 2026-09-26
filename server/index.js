import express from 'express'
import cors from 'cors'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { initDB, getDB, validateDatabase, resolveBookFilePath, getTextbookRoots, getAiCacheEntry, setAiCacheEntry } from './database.js'
import { askTutor, generateQuiz, generateSubtopicGuide, getAiStatus } from './gemini.js'
import { buildPlan } from './planner.js'
import {
  getKnowledgeBooks,
  getKnowledgeBookBySubjectGrade,
  getKnowledgeStatus,
  getKnowledgePage,
  getKnowledgePageRange,
  getKnowledgePrintedPageRange,
  resolvePrintedPage,
  searchKnowledge,
  searchKnowledgeCandidates,
  getKnowledgeCoverage,
  buildKnowledgeContext,
  validateKnowledgeDatabase,
  getKnowledgeDatabasePath
} from './knowledge.js'
import {
  getCurriculumForSubject,
  getCurriculumGrades,
  findCurriculumTopic
} from '../shared/curriculumMap.js'
import { searchYouTube } from './youtube.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const PORT = Number(process.env.PORT || 3001)

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use((req, res, next) => {
  console.log(`📡 ${new Date().toLocaleTimeString()} ${req.method} ${req.url}`)
  next()
})

function int(value, fallback = null) {
  const n = Number(value)
  return Number.isInteger(n) ? n : fallback
}

function normalizeSubjectName(name) {
  const v = String(name || '').trim().toLowerCase()
  return ({ math:'Mathematics', maths:'Mathematics', mathematics:'Mathematics', physics:'Physics', chemistry:'Chemistry', biology:'Biology', english:'English' })[v] || String(name || '').trim()
}

function findSubjectById(subjectId) {
  return getDB().data.subjects.find(s => Number(s.id) === Number(subjectId)) || null
}

function findLegacyChapterForTopic({ subjectId, grade, unitTitle }) {
  const db = getDB()
  const sid = int(subjectId)
  const g = int(grade)
  const title = String(unitTitle || '').trim().toLowerCase()
  return (db.data.chapters || []).find(ch =>
    Number(ch.subject_id) === sid && Number(ch.grade) === g &&
    String(ch.title || '').trim().toLowerCase() === title
  ) || null
}

function safeJson(res, status, payload) {
  return res.status(status).json(payload)
}

// Textbook path resolution lives in ONE place: database.js's
// resolveBookFilePath()/getTextbookRoots(). This used to be duplicated here
// with its own hardcoded root list (including a literal old absolute path),
// which is exactly how it went stale after the project moved and
// server/index.js kept using the wrong copy. Every route below now delegates
// to the shared resolver so there is nothing left here to go stale.
async function repairBookFilePath(book, subject = null) {
  const resolved = resolveBookFilePath(book.file_path, book.subject_id, book.title)
  if (!resolved) return null
  if (String(book.file_path || '') !== resolved) {
    book.file_path = resolved
    try { await getDB().write() } catch {}
  }
  return resolved
}

// Builds a stable cache key for the AI output cache from exactly the
// parameters that define a request (nothing else — no timestamps, no
// request-specific noise), so the same subject/grade/unit/section/question
// always maps to the same saved result.
function aiCacheKey(...parts) {
  return parts.map(p => String(p ?? '').trim().toLowerCase()).join('|')
}

async function resolveStudyContext(body = {}) {
  const subject = normalizeSubjectName(body.subject)
  const grade = int(body.grade)
  if (!subject || !grade) throw new Error('Subject and grade are required for textbook-grounded AI.')

  const target = findCurriculumTopic(subject, grade, {
    unitId: body.unitId || body.chapterId || body.unit_id,
    sectionId: body.sectionId || body.section_id,
    unitTitle: body.unitTitle || body.chapter,
    chapterTitle: body.chapter,
    sectionTitle: body.section
  })
  if (!target) throw new Error(`No curriculum mapping exists for ${subject}, Grade ${grade}.`)

  const scope = body.scope === 'unit' || body.scope === 'chapter' ? 'unit' : 'topic'
  const start = int(scope === 'unit' ? target.unit.startPage : body.pageStart, null) || target.startPage
  const end = int(scope === 'unit' ? target.unit.endPage : body.pageEnd, null) || target.endPage
  const kbBookId = target.knowledgeBookId
  const pages = kbBookId ? await getKnowledgePrintedPageRange({ bookId: kbBookId, startPage: start, endPage: end, maxPages: scope === 'unit' ? 48 : 28 }) : []
  const contextText = buildKnowledgeContext(pages, scope === 'unit' ? 24000 : 18000)
  const unavailable = pages.filter(p => !String(p.text_final || p.text_raw || '').trim())
  const selectedTitle = target.section?.title || target.unit.title
  const englishSkill = subject === 'English' && target.section?.title
    ? (String(target.section.title).match(/(Listening|Speaking|Reading|Vocabulary|Grammar|Writing)/i)?.[1] || null)
    : null
  const englishDetails = subject === 'English' && scope === 'topic' && Array.isArray(target.section?.details)
    ? target.section.details.map(d => ({ number: d.number, title: d.title, page: d.page }))
    : []
  const englishFocus = subject === 'English'
    ? (englishSkill
      ? `English skill focus: ${englishSkill}. Teach and practice this skill in the selected topic${englishDetails.length ? `, specifically: ${englishDetails.map(d => d.title).join('; ')}` : ''}.`
      : 'English skill focus: cover the relevant listening, speaking, reading, vocabulary, grammar, and writing dimensions of the selected unit without drifting to another unit.')
    : null
  const sourceBlock = [
    `SOURCE: supplied Ethiopian textbook knowledge base`,
    `Subject: ${subject}`,
    `Grade: ${grade}`,
    `Selected Unit: ${target.unit.title}`,
    `Selected Topic: ${selectedTitle}`,
    `AI Scope: ${scope === 'unit' ? 'selected unit' : 'selected topic'}`,
    englishFocus,
    `Printed pages: ${start}${end && end !== start ? `-${end}` : ''}`,
    `Knowledge book ID: ${kbBookId}`,
    `FOCUS RULE: The selected unit/topic above is authoritative. Use nearby textbook text only to clarify that exact selection; do not silently substitute another topic from the same unit or a generic topic.`,
    unavailable.length ? `Some mapped pages have no recoverable text; never invent missing textbook content.` : 'Use the retrieved textbook text as the primary source.'
  ].filter(Boolean).join('\n')
  const context = `${sourceBlock}\n\n${contextText || '[No recoverable text for the mapped pages.]'}`
  const extra = subject === 'English' && scope === 'topic' ? { englishSkill, englishDetails } : {}
  return { subject, grade, target, scope, start, end, pages, context, unavailable, extra }
}

app.get('/api/health', async (_req, res) => {
  try {
    const db = getDB()
    const knowledgeErrors = await validateKnowledgeDatabase()
    const textbookRoots = getTextbookRoots().map(root => ({ root, exists: fs.existsSync(root) }))
    const booksMissing = (db.data.books || []).filter(b => !(b.file_path && fs.existsSync(b.file_path))).length
    res.json({ success:true, server:true, db:!!db, knowledgeDb:getKnowledgeDatabasePath(), knowledgeValid:knowledgeErrors.length===0, knowledgeErrors, textbookRoots, booksTotal:(db.data.books || []).length, booksMissing })
  } catch (e) {
    safeJson(res, 500, { success:false, error:e.message })
  }
})

app.get('/api/subjects', (_req,res) => {
  try { res.json(getDB().data.subjects || []) }
  catch(e) { safeJson(res,500,{error:e.message}) }
})

// Legacy routes remain only for old pages/progress compatibility. The curriculum UI does not consume them.
app.get('/api/chapters/:subjectId', (req,res) => {
  try {
    const sid=int(req.params.subjectId)
    const chapters=(getDB().data.chapters||[]).filter(c=>Number(c.subject_id)===sid).sort((a,b)=>Number(a.grade)-Number(b.grade)||Number(a.chapter_number)-Number(b.chapter_number))
    res.json(chapters)
  } catch(e) { safeJson(res,500,{error:e.message}) }
})

app.get('/api/sections/:chapterId', (req,res) => {
  try {
    const id=int(req.params.chapterId)
    const sections=(getDB().data.sections||[]).filter(s=>Number(s.chapter_id)===id).sort((a,b)=>String(a.section_number||'').localeCompare(String(b.section_number||'')))
    res.json(sections)
  } catch(e) { safeJson(res,500,{error:e.message}) }
})

app.get('/api/curriculum/:subjectName', (req,res) => {
  try { res.json({success:true,subject:normalizeSubjectName(req.params.subjectName),grades:getCurriculumGrades(req.params.subjectName),curriculum:getCurriculumForSubject(req.params.subjectName)}) }
  catch(e) { safeJson(res,500,{success:false,error:e.message}) }
})

app.get('/api/book-for-curriculum', async (req,res) => {
  try {
    const subjectRecord=findSubjectById(req.query.subjectId)
    const subject=normalizeSubjectName(subjectRecord?.name || req.query.subject)
    const grade=int(req.query.grade)
    if(!subject || !grade) return safeJson(res,400,{success:false,error:'subjectId/subject and grade are required'})
    const db=getDB()
    const books=(db.data.books||[]).filter(b=>Number(b.grade)===grade && Number(b.subject_id)===Number(subjectRecord?.id))
    const mappedTitle=getCurriculumForSubject(subject)?.[grade]?.bookTitle || ''
    const desiredName=path.basename(mappedTitle).toLowerCase()
    let book=books.find(b=>path.basename(b.file_path||'').toLowerCase()===desiredName) || books[0]
    if(!book) return safeJson(res,404,{success:false,error:`No textbook record for ${subject}, Grade ${grade}.`,subject,grade})
    const resolved=await repairBookFilePath(book, subject)
    if(!resolved) return safeJson(res,404,{success:false,error:`Textbook PDF is not available for ${subject}, Grade ${grade}. Checked configured/current textbook roots.`,subject,grade,book:book.title||null,storedPath:book.file_path||null})
    const knowledgeBook = await getKnowledgeBookBySubjectGrade(subject, grade)
    res.json({success:true,bookId:book.id,knowledgeBookId:knowledgeBook?.id || null,title:book.title,totalPages:book.total_pages||0,subject,grade,filePath:resolved})
  } catch(e) { safeJson(res,500,{success:false,error:e.message}) }
})

app.get('/api/book-for-chapter/:chapterId', async (req,res)=>{
  try {
    const ch=(getDB().data.chapters||[]).find(c=>Number(c.id)===int(req.params.chapterId))
    if(!ch) return safeJson(res,404,{success:false,error:'Chapter not found'})
    const book=(getDB().data.books||[]).find(b=>Number(b.id)===Number(ch.book_id))
    if(!book) return safeJson(res,404,{success:false,error:'Book record missing'})
    const subject=findSubjectById(book.subject_id)?.name || ch.subject_name || ''
    const resolved=await repairBookFilePath(book, subject)
    if(!resolved) return safeJson(res,404,{success:false,error:'Textbook PDF is not available on disk',title:book.title||null,storedPath:book.file_path||null})
    res.json({success:true,bookId:book.id,title:book.title,totalPages:book.total_pages||0,startPage:ch.start_page||1,filePath:resolved})
  } catch(e) { safeJson(res,500,{success:false,error:e.message}) }
})

app.get('/api/pdf-bytes/:bookId', async (req,res)=>{
  try {
    const book=(getDB().data.books||[]).find(b=>Number(b.id)===int(req.params.bookId))
    if(!book) return res.status(404).type('text/plain').send('Book not found')
    const subject=findSubjectById(book.subject_id)?.name || book.subject_name || ''
    const resolved=await repairBookFilePath(book, subject)
    if(!resolved || !fs.existsSync(resolved)) return res.status(404).type('text/plain').send(`PDF missing. Stored path: ${book.file_path || 'none'}`)
    const stat=fs.statSync(resolved)
    if(!stat.isFile()) return res.status(404).type('text/plain').send('PDF path is not a file')
    res.set({
      'Content-Type':'application/octet-stream',
      'Content-Length':String(stat.size),
      'Cache-Control':'no-store',
      'Content-Disposition':'inline',
      'X-Content-Type-Options':'nosniff',
      'Access-Control-Expose-Headers':'Content-Length'
    })
    return fs.createReadStream(resolved).pipe(res)
  } catch(e) {
    return res.status(500).type('text/plain').send(e.message)
  }
})

app.get('/api/pdf-raw/:bookId', async (req,res)=>{
  try {
    const book=(getDB().data.books||[]).find(b=>Number(b.id)===int(req.params.bookId))
    if(!book) return res.status(404).type('text/plain').send('Book not found')
    const subject=findSubjectById(book.subject_id)?.name || book.subject_name || ''
    const resolved=await repairBookFilePath(book, subject)
    if(!resolved || !fs.existsSync(resolved)) return res.status(404).type('text/plain').send(`PDF missing. Stored path: ${book.file_path || 'none'}`)
    const stat=fs.statSync(resolved)
    if(!stat.isFile()) return res.status(404).type('text/plain').send('PDF path is not a file')
    // IMPORTANT: stream manually instead of res.sendFile(), and don't advertise
    // this as a PDF. Two things were making download managers like IDM grab
    // this response even though it's only ever requested via fetch():
    //  1) Content-Type: application/pdf + a Content-Disposition filename
    //     ending in .pdf is exactly the signature IDM's browser hook watches
    //     for on ANY network response, not just clicked links/navigations.
    //  2) res.sendFile() (Express's `send` module) unconditionally adds its
    //     own Accept-Ranges/ETag/Last-Modified headers on top of whatever we
    //     set here — the standard "large resumable file" fingerprint IDM is
    //     built to accelerate.
    // A generic octet-stream with no filename and no range/caching metadata,
    // streamed manually, doesn't trip that detection. The frontend only ever
    // reads this via fetch().arrayBuffer() for PDF.js — it never needs Range
    // support, and PdfPanel's content-type check in App.jsx already accepts
    // octet-stream, so nothing on the frontend needs to change.
    res.set({
      'Content-Type':'application/octet-stream',
      'Content-Disposition':'inline',
      'Content-Length':String(stat.size),
      'Cache-Control':'no-store',
      'X-Content-Type-Options':'nosniff'
    })
    return fs.createReadStream(resolved).pipe(res)
  } catch(e) { return res.status(500).type('text/plain').send(e.message) }
})

// Dedicated endpoint for the in-app PDF.js viewer. Unlike /api/pdf-bytes and
// /api/pdf-raw above (kept only for compatibility — the React viewer no
// longer calls either), this never sends anything that looks like a
// downloadable file over the wire. It's a POST that returns an ordinary
// application/json body with the PDF bytes base64-encoded inside it, so
// the response is indistinguishable from any other API call to a network
// monitor/download manager: no application/pdf or octet-stream Content-Type,
// no Content-Disposition, no Accept-Ranges/ETag/Last-Modified.
app.post('/api/pdf-data/:bookId', async (req,res)=>{
  try {
    const book=(getDB().data.books||[]).find(b=>Number(b.id)===int(req.params.bookId))
    if(!book) return res.status(404).json({success:false,error:'Book not found'})
    const subject=findSubjectById(book.subject_id)?.name || book.subject_name || ''
    const resolved=await repairBookFilePath(book, subject)
    if(!resolved || !fs.existsSync(resolved)) return res.status(404).json({success:false,error:`PDF missing. Stored path: ${book.file_path || 'none'}`})
    const stat=fs.statSync(resolved)
    if(!stat.isFile()) return res.status(404).json({success:false,error:'PDF path is not a file'})
    // fs.promises.readFile (not readFileSync) so a large textbook doesn't
    // block the event loop while other requests are in flight.
    const buffer=await fs.promises.readFile(resolved)
    res.set({ 'Content-Type':'application/json', 'Cache-Control':'no-store' })
    return res.json({ success:true, bytes:stat.size, data:buffer.toString('base64') })
  } catch(e) { return res.status(500).json({success:false,error:e.message}) }
})

// Knowledge API
app.get('/api/knowledge/books', async (_req,res)=>{ try{res.json({success:true,books:await getKnowledgeBooks()})}catch(e){safeJson(res,500,{success:false,error:e.message})} })
app.get('/api/knowledge/status/:bookId', async (req,res)=>{ try{const status=await getKnowledgeStatus(req.params.bookId); if(!status)return safeJson(res,404,{success:false,error:'Knowledge book not found'}); res.json({success:true,...status})}catch(e){safeJson(res,500,{success:false,error:e.message})} })
app.get('/api/knowledge/coverage', async (_req,res)=>{ try{res.json({success:true,...await getKnowledgeCoverage()})}catch(e){safeJson(res,500,{success:false,error:e.message})} })
app.get('/api/knowledge/page/:bookId/:pageNumber', async (req,res)=>{ try{const page=await getKnowledgePage(req.params.bookId,req.params.pageNumber);if(!page)return safeJson(res,404,{success:false,error:'Page not found'});res.json({success:true,page})}catch(e){safeJson(res,500,{success:false,error:e.message})} })
app.get('/api/knowledge/printed-page/:bookId/:pageNumber', async (req,res)=>{ try{const mapped=await resolvePrintedPage(req.params.bookId,req.params.pageNumber);if(!mapped)return safeJson(res,404,{success:false,error:'Printed textbook page could not be mapped to a PDF page'});res.json({success:true,...mapped})}catch(e){safeJson(res,500,{success:false,error:e.message})} })
app.post('/api/knowledge/printed-pages-range', async (req,res)=>{ try{const pages=await getKnowledgePrintedPageRange(req.body||{});res.json({success:true,pages})}catch(e){safeJson(res,500,{success:false,error:e.message})} })
app.post('/api/knowledge/pages-range', async (req,res)=>{ try{const pages=await getKnowledgePageRange(req.body||{});res.json({success:true,pages})}catch(e){safeJson(res,500,{success:false,error:e.message})} })
app.post('/api/knowledge/search', async (req,res)=>{ try{const results=await searchKnowledge(req.body||{});res.json({success:true,results})}catch(e){safeJson(res,500,{success:false,error:e.message})} })
app.post('/api/knowledge/candidates', async (req,res)=>{ try{res.json({success:true,results:await searchKnowledgeCandidates(req.body||{})})}catch(e){safeJson(res,500,{success:false,error:e.message})} })
app.post('/api/knowledge/context', async (req,res)=>{ try{const pages=await getKnowledgePageRange(req.body||{});res.json({success:true,pages,context:buildKnowledgeContext(pages,Number(req.body?.maxCharacters)||18000)})}catch(e){safeJson(res,500,{success:false,error:e.message})} })
app.get('/api/knowledge/validate', async (_req,res)=>{ try{const errors=await validateKnowledgeDatabase();res.json({success:true,errors,isValid:errors.length===0})}catch(e){safeJson(res,500,{success:false,error:e.message})} })

app.post('/api/ask', async (req,res)=>{
  try {
    const study=await resolveStudyContext(req.body)
    const question=String(req.body.question||'').trim()
    const cacheKey=aiCacheKey('ask',study.subject,study.grade,study.scope,study.target.unit.title,study.target.section?.title||'',question.toLowerCase().replace(/\s+/g,' '))
    let answer=req.body.refresh?null:getAiCacheEntry(cacheKey)?.value
    let cached=Boolean(answer)
    if(!answer){
      answer=await askTutor(study.subject,study.target.unit.title,study.target.section?.title||'',study.context,question,study.extra)
      await setAiCacheEntry(cacheKey,answer)
    }
    res.json({success:true,answer,cached,scope:study.scope,subject:study.subject,grade:study.grade,chapter:study.target.unit.title,section:study.target.section?.title||null,pageStart:study.start,pageEnd:study.end,bookId:study.target.knowledgeBookId,pages:study.pages.map(p=>({page:p.page,pdf_page:p.pdf_page,status:p.content_status}))})
  } catch(e) { console.error('AI:',e); safeJson(res,500,{success:false,error:e.message}) }
})

app.post('/api/study-guide', async (req,res)=>{
  try {
    const study=await resolveStudyContext(req.body)
    const selectedSection =
      study.target.section?.title ||
      'Full Unit'

    const cacheKey=aiCacheKey('guide',study.subject,study.grade,study.scope,study.target.unit.title,selectedSection)
    let guide=req.body.refresh?null:getAiCacheEntry(cacheKey)?.value
    let cached=Boolean(guide)
    if(!guide){
      guide = await generateSubtopicGuide(
        study.subject,
        study.target.unit.title,
        selectedSection,
        study.context,
        study.extra
      )
      await setAiCacheEntry(cacheKey,guide)
    }
    res.json({success:true,guide,cached,scope:study.scope,pageStart:study.start,pageEnd:study.end})
  } catch(e) { console.error('Guide:',e); safeJson(res,500,{success:false,error:e.message}) }
})

app.post('/api/quiz', async (req,res)=>{
  try {
    const study=await resolveStudyContext(req.body)
    const count=Math.min(20,Math.max(1,int(req.body.count,5)))
    const cacheKey=aiCacheKey('quiz',study.subject,study.grade,study.scope,study.target.unit.title,study.target.section?.title||'',String(count))
    let questions=req.body.refresh?null:getAiCacheEntry(cacheKey)?.value
    let cached=Boolean(questions)
    if(!questions){
      questions=await generateQuiz(study.subject,study.target.unit.title,study.target.section?.title||'',study.context,count,study.extra)
      await setAiCacheEntry(cacheKey,questions)
    }
    res.json({success:true,questions,cached,scope:study.scope,pageStart:study.start,pageEnd:study.end})
  } catch(e) { console.error('Quiz:',e); safeJson(res,500,{success:false,error:e.message}) }
})

app.post('/api/youtube/search', async (req,res)=>{
  try { res.json({success:true,...await searchYouTube(req.body||{})}) }
  catch(e) { console.error('YouTube:',e); safeJson(res,500,{success:false,error:e.message}) }
})
app.get('/api/youtube/search', async (req,res)=>{
  try { res.json({success:true,...await searchYouTube(req.query||{})}) }
  catch(e) { console.error('YouTube:',e); safeJson(res,500,{success:false,error:e.message}) }
})

app.post('/api/quiz-result', async (req,res)=>{
  try {
    const db=getDB();
    const body=req.body||{}
    const score=Number(body.score)||0, total=Math.max(0,Number(body.total)||0)
    const pct=total ? (score/total)*100 : 0
    if(!Array.isArray(db.data.quiz_results)) db.data.quiz_results=[]
    db.data.quiz_results.push({
      id:db.data.nextId.quiz_results++, subject_name:body.subject||'General', grade:int(body.grade,0),
      unit_id:body.unitId||null, unit_title:body.chapter||body.unitTitle||'General',
      section_id:body.sectionId||null, section_title:body.sectionTitle||body.section||'',
      chapter_id:body.chapterId||null, score,total,percentage:pct,scope:body.scope||'topic',created_at:new Date().toISOString()
    })
    if(Array.isArray(body.mistakes)){
      if(!Array.isArray(db.data.mistakes)) db.data.mistakes=[]
      for(const m of body.mistakes){
        db.data.mistakes.push({
          id:db.data.nextId.mistakes++, subject_id:int(body.subjectId), subject_name:body.subject||'General', grade:int(body.grade,0),
          chapter_id:body.chapterId||null, chapter_title:body.chapter||body.unitTitle||'General', unit_id:body.unitId||null, unit_title:body.chapter||body.unitTitle||'General',
          section_id:body.sectionId||null, section_title:m.sectionTitle||body.section||'', question:m.question||'', options:m.options||[],
          user_choice:m.userChoice||'', correct_choice:m.correctChoice||'', explanation:m.explanation||'', created_at:new Date().toISOString()
        })
      }
    }
    await db.write()
    res.json({success:true,percentage:pct,status:pct>=80?'passed':'in-progress'})
  } catch(e) { safeJson(res,500,{success:false,error:e.message}) }
})

app.get('/api/mistakes',(req,res)=>{try{res.json(getDB().data.mistakes||[])}catch(e){safeJson(res,500,{error:e.message})}})
app.delete('/api/mistakes/:id',async(req,res)=>{try{const db=getDB();const id=int(req.params.id);db.data.mistakes=(db.data.mistakes||[]).filter(m=>Number(m.id)!==id);await db.write();res.json({success:true})}catch(e){safeJson(res,500,{success:false,error:e.message})}})
app.post('/api/mistakes/clear-all',async(_req,res)=>{try{const db=getDB();db.data.mistakes=[];await db.write();res.json({success:true})}catch(e){safeJson(res,500,{success:false,error:e.message})}})

// A retest never deletes a mistake. It only records how the student did, so
// the planner can treat a mistake answered correctly twice in a row as mastered.
app.post('/api/mistakes/:id/retest',async(req,res)=>{
  try{
    const db=getDB(); const id=int(req.params.id)
    const m=(db.data.mistakes||[]).find(x=>Number(x.id)===id)
    if(!m)return safeJson(res,404,{success:false,error:'Mistake not found'})
    const correct=Boolean(req.body?.correct)
    m.retest_count=(Number(m.retest_count)||0)+1
    m.retest_streak=correct?(Number(m.retest_streak)||0)+1:0
    if(correct)m.retest_correct=(Number(m.retest_correct)||0)+1; else m.retest_wrong=(Number(m.retest_wrong)||0)+1
    m.last_retested_at=new Date().toISOString()
    m.mastered=m.retest_streak>=2
    await db.write()
    res.json({success:true,mastered:m.mastered,retest_streak:m.retest_streak})
  }catch(e){safeJson(res,500,{success:false,error:e.message})}
})

app.get('/api/quiz-results',(req,res)=>{
  try{
    const limit=Math.min(200,Math.max(1,int(req.query.limit,40)))
    const rows=[...(getDB().data.quiz_results||[])].sort((a,b)=>String(b.created_at).localeCompare(String(a.created_at))).slice(0,limit)
    res.json({success:true,results:rows})
  }catch(e){safeJson(res,500,{success:false,error:e.message})}
})

app.get('/api/plan',(req,res)=>{
  try{ res.json({success:true,...buildPlan(getDB().data,{grade:int(req.query.grade,null)})}) }
  catch(e){console.error('Plan:',e);safeJson(res,500,{success:false,error:e.message})}
})

app.get('/api/ai/status',(_req,res)=>res.json({success:true,...getAiStatus()}))

app.post('/api/study-session',async(req,res)=>{
  try{
    const db=getDB(); const duration=Math.max(0,Number(req.body?.durationSeconds)||0)
    if(!duration)return res.json({success:true,skipped:true})
    db.data.study_sessions.push({
      id:db.data.nextId.study_sessions++, subject_id:int(req.body?.subjectId), grade:int(req.body?.grade,0),
      chapter_id:req.body?.chapterId||null, section_id:req.body?.sectionId||null,
      unit_id:req.body?.unitId||null, duration_seconds:duration,
      date:new Date().toISOString().split('T')[0], created_at:new Date().toISOString()
    })
    await db.write(); res.json({success:true})
  }catch(e){safeJson(res,500,{success:false,error:e.message})}
})

app.get('/api/progress',(req,res)=>{
  try{
    const db=getDB(); const today=new Date().toISOString().split('T')[0]
    const sessions=db.data.study_sessions||[]
    const todayTotal=sessions.filter(s=>s.date===today).reduce((a,s)=>a+Number(s.duration_seconds||0),0)
    const results=db.data.quiz_results||[]
    const subjects=(db.data.subjects||[]).map(subj=>{
      const curriculum=getCurriculumForSubject(subj.name)
      const units=Object.values(curriculum).flatMap(g=>g.units||[])
      const keys=new Map()
      for(const r of results){
        if(String(r.subject_name||'').toLowerCase()!==String(subj.name).toLowerCase())continue
        const key=`${r.grade}|${r.unit_id||r.unit_title}`
        const prev=keys.get(key)
        if(!prev || String(r.created_at)>String(prev.created_at)) keys.set(key,r)
      }
      let passed=0
      for(const [g,data] of Object.entries(curriculum)) for(const u of data.units||[]) {
        const key=`${g}|${u.id}`
        const byId=keys.get(key)
        const byTitle=keys.get(`${g}|${u.title}`)
        if((byId||byTitle)?.percentage>=80)passed++
      }
      const allSubj=sessions.filter(s=>Number(s.subject_id)===Number(subj.id))
      const subjSec=allSubj.reduce((a,s)=>a+Number(s.duration_seconds||0),0)
      const todaySec=allSubj.filter(s=>s.date===today).reduce((a,s)=>a+Number(s.duration_seconds||0),0)
      return {...subj,total_units:units.length,passed_units:passed,percentage:units.length?Math.round(passed/units.length*100):0,study_time_seconds:subjSec,today_seconds:todaySec,grades:getCurriculumGrades(subj.name)}
    })
    res.json({subjects,today_total_seconds:todayTotal,mistakes_count:(db.data.mistakes||[]).length,open_mistakes_count:(db.data.mistakes||[]).filter(m=>!m.mastered).length})
  }catch(e){safeJson(res,500,{error:e.message})}
})

app.get('/api/validate',async(_req,res)=>{
  try{
    const db=getDB(); const errors=validateDatabase(); const knowledgeErrors=await validateKnowledgeDatabase()
    res.json({total_chapters:(db.data.chapters||[]).length,total_sections:(db.data.sections||[]).length,total_books:(db.data.books||[]).length,legacyErrors:errors,knowledgeErrors,is_valid:errors.length===0&&knowledgeErrors.length===0})
  }catch(e){safeJson(res,500,{success:false,error:e.message})}
})

async function start(){
  await initDB()
  const dbErrors=validateDatabase()
  if(dbErrors.length) console.log(`⚠️ Legacy DB warnings: ${dbErrors.length}`)
  try { const ke=await validateKnowledgeDatabase(); if(ke.length) console.log(`⚠️ Knowledge warnings: ${ke.join(' | ')}`); else console.log('✅ Knowledge DB validation passed.') } catch(e){ console.log(`⚠️ Knowledge DB check failed: ${e.message}`) }
  app.listen(PORT,()=>console.log(`\n🚀 ESSLCE WAR ROOM ONLINE — http://localhost:${PORT}\n   Knowledge DB: ${getKnowledgeDatabasePath()}\n`))
}

start().catch(error=>{console.error('❌ Server failed to start:',error);process.exitCode=1})

export default app
