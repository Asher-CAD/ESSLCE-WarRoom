// ESSLCE-WarRoom FULL App.jsx RESET — syntax-clean base with PDF.js, exact AI scope, related-topic cleanup, and stable Tutor layout
import { useState, useEffect, useRef, useCallback } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import 'pdfjs-dist/web/pdf_viewer.css'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import './App.css'
import { getCurriculumForSubject, getCurriculumGrades, getRelatedTopics, findCurriculumTopic } from '../shared/curriculumMap.js'

const API_BASE = 'http://localhost:3001/api'
const DAILY_TARGET_SECONDS = 6 * 3600


function renderCleanMath(rawInput) {
  if (!rawInput) return ''
  let text = String(rawInput).trim()

  const optMatch = text.match(/^([A-D]\)\s*)(.*)$/s)
  let prefix = ''
  if (optMatch) {
    prefix = optMatch[1]
    text = optMatch[2].trim()
  }

  if (text.startsWith('$') && text.endsWith('$') && !text.slice(1, -1).includes('$')) {
    text = text.slice(1, -1).trim()
  }

  if (!text.includes('$') && /\\(frac|sqrt|overline|bar|pm|cdot|times|div|neq|le|ge|alpha|beta|theta|pi|implies)/.test(text)) {
    try {
      return prefix + katex.renderToString(text, { displayMode: false, output: 'html', throwOnError: false })
    } catch (e) {
      return prefix + escapeHtml(text)
    }
  }

  if (text.includes('$')) {
    const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$)/g)
    const html = parts.map(part => {
      if (!part) return ''
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const math = part.slice(2, -2).trim()
        try {
          return katex.renderToString(math, { displayMode: true, output: 'html', throwOnError: false })
        } catch (e) {
          return escapeHtml(math)
        }
      } else if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1).trim()
        try {
          return katex.renderToString(math, { displayMode: false, output: 'html', throwOnError: false })
        } catch (e) {
          return escapeHtml(math)
        }
      } else {
        return escapeHtml(part)
  .replace(/## (.*?)\n/g, '<h3 style="color:#00cc66;margin-top:12px;">$1</h3>')
  .replace(/# (.*?)\n/g, '<h2 style="color:#FFD700;margin-top:12px;">$1</h2>')
  .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#fff;">$1</strong>')
  .replace(/\*(.*?)\*/g, '<em style="color:#aaa;">$1</em>')
  .replace(/^- (.*?)\n/gm, '<li>$1</li>')
  .replace(/\n/g, '<br/>')
      }
    }).join('')
    return prefix + html
  }

  return prefix + escapeHtml(text)
    .replace(/## (.*?)\n/g, '<h3 style="color:#00cc66;margin-top:12px;">$1</h3>')
    .replace(/# (.*?)\n/g, '<h2 style="color:#FFD700;margin-top:12px;">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#fff;">$1</strong>')
    .replace(/^- (.*?)\n/gm, '<li>$1</li>')
    .replace(/\n/g, '<br/>')
}

function base64ToUint8Array(base64) {
  const binary = window.atob(base64)
  const len = binary.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function MathView({ text, style, className }) {
  try {
    return (
      <span
        className={className}
        style={style}
        dangerouslySetInnerHTML={{ __html: renderCleanMath(text) }}
      />
    )
  } catch (err) {
    return <span className={className} style={style}>{String(text || '')}</span>
  }
}

// AI tutor replies and study guides are full Markdown (headings, lists,
// tables, bold) plus LaTeX — renderCleanMath's hand-written regexes could
// not reliably cover both at once (a heading with no trailing newline, a
// nested list, a table all fell through to raw text). This renders the
// actual Markdown AST instead of pattern-matching the source text, so every
// construct the AI produces displays correctly.
// remark-math/rehype-katex read the same $...$ / $$...$$ delimiters the AI
// prompts already require (see MATH_RULES in server/gemini.js).
function AiMarkdown({ text, className }) {
  const safe = String(text ?? '')
  if (!safe.trim()) return null
  try {
    return (
      <div className={className}>
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
          {safe}
        </ReactMarkdown>
      </div>
    )
  } catch (err) {
    // A malformed AI response should never blank the panel.
    return <div className={className} style={{ whiteSpace: 'pre-wrap' }}>{safe}</div>
  }
}

// ============================================================
// AUTHORITATIVE CANVAS PDF VIEWER
// ============================================================
function PdfPanel({ subjectId, subjectName, grade, topicStartPage, topicEndPage, jumpToPage, setJumpToPage }) {
  const [bookInfo, setBookInfo] = useState(null)
  const [knowledgeBookId, setKnowledgeBookId] = useState(null)
  const [pdfDoc, setPdfDoc] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [inputPage, setInputPage] = useState('1')
  const [scale, setScale] = useState(1)
  const [loadingBook, setLoadingBook] = useState(true)
  const [loadingPdf, setLoadingPdf] = useState(false)
  const [error, setError] = useState('')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [pageNote, setPageNote] = useState('')
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)
  const pdfRef = useRef(null)
  const renderTaskRef = useRef(null)
  const renderIdRef = useRef(0)

  useEffect(() => {
    let cancelled = false
    async function getBook() {
      setLoadingBook(true); setError(''); setBookInfo(null); setPdfDoc(null); setTotalPages(0); setPageNote('')
      if (!subjectId || !grade) { setError('This topic has no subject/grade textbook mapping.'); setLoadingBook(false); return }
      try {
        const r = await fetch(`${API_BASE}/book-for-curriculum?subjectId=${encodeURIComponent(subjectId)}&grade=${encodeURIComponent(grade)}`)
        const type = r.headers.get('content-type') || ''
        const d = type.includes('application/json') ? await r.json() : { error: await r.text() }
        if (!r.ok || !d.success) throw new Error(d.error || `Textbook lookup failed (${r.status})`)
        if (cancelled) return
        setBookInfo({ bookId:d.bookId, title:d.title || `${subjectName} Grade ${grade}`, totalPages:d.totalPages || 0 })
      } catch(e) { if(!cancelled) setError(e.message || 'Could not locate textbook') }
      finally { if(!cancelled) setLoadingBook(false) }
    }
    getBook()
    return () => { cancelled=true }
  }, [subjectId, subjectName, grade])

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()
    let loadingTask = null

    async function loadPdf() {
      if (!bookInfo?.bookId) return
      setLoadingPdf(true)
      setError('')
      try {
        // Fetched as JSON (base64-encoded PDF bytes) instead of a raw
        // PDF/octet-stream HTTP response — see /api/pdf-data on the server.
        // Header-level tricks (Content-Type/Content-Disposition/Accept-Ranges/
        // sendFile vs stream) weren't enough to stop IDM from grabbing this
        // response, so the response itself no longer looks like a file at
        // all: it's an ordinary application/json API call.
        const response = await fetch(`${API_BASE}/pdf-data/${bookInfo.bookId}`, {
          method: 'POST',
          cache: 'no-store',
          signal: controller.signal,
          headers: { Accept: 'application/json' }
        })
        const contentType = String(response.headers.get('content-type') || '').toLowerCase()
        if (!contentType.includes('json')) {
          const preview = await response.text()
          throw new Error(`The textbook endpoint did not return JSON (${contentType}${preview ? `: ${preview.slice(0, 120)}` : ''})`)
        }
        const payload = await response.json()
        if (!response.ok || !payload.success) {
          throw new Error(payload.error || `PDF request failed (${response.status})`)
        }
        if (cancelled) return
        const bytes = base64ToUint8Array(payload.data)

        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/build/pdf.worker.min.mjs',
          import.meta.url
        ).toString()

        // Keep this on the classic canvas path (ImageDecoder/OffscreenCanvas
        // stay disabled — that's an unrelated browser WebCodecs path, not the
        // cause of missing images).
        //
        // The missing-image bug was caused by useWasm being turned OFF with no
        // wasmUrl configured. Since pdfjs-dist v5, the OpenJPEG (JPEG2000) and
        // JBIG2 image decoders, plus ICC color-profile handling, live in
        // separate .wasm files that PDF.js only loads if useWasm stays on AND
        // wasmUrl points at them. Scanned textbook pages are very often
        // JPX/JBIG2-encoded, so without this, those images were silently
        // dropped while text/vector content rendered fine. The wasm files are
        // served from public/pdfjs/wasm/ (Vite serves public/ at the site root).
        loadingTask = pdfjsLib.getDocument({
          data: bytes,
          useSystemFonts: true,
          disableAutoFetch: true,
          disableStream: true,
          useWasm: true,
          wasmUrl: new URL('/pdfjs/wasm/', window.location.origin).toString(),
          isImageDecoderSupported: false,
          isOffscreenCanvasSupported: false
        })

        const doc = await loadingTask.promise
        if (cancelled) {
          try { await doc.destroy() } catch {}
          return
        }
        pdfRef.current = doc
        setPdfDoc(doc)
        setTotalPages(doc.numPages)
        setCurrentPage(1)
        setInputPage('1')
      } catch (e) {
        if (!cancelled && e?.name !== 'AbortError') {
          setError(`The textbook PDF could not be loaded: ${e.message || 'unknown PDF error'}`)
        }
      } finally {
        if (!cancelled) setLoadingPdf(false)
      }
    }

    loadPdf()

    return () => {
      cancelled = true
      controller.abort()
      if (loadingTask) {
        try { loadingTask.destroy() } catch {}
      }
      if (renderTaskRef.current) {
        try { renderTaskRef.current.cancel() } catch {}
        renderTaskRef.current = null
      }
      const old = pdfRef.current
      pdfRef.current = null
      if (old) old.destroy().catch(() => {})
    }
  }, [bookInfo?.bookId])

  useEffect(() => {
    if (!pdfDoc || !topicStartPage) return
    const fallback = Math.max(1, Math.min(pdfDoc.numPages, Number(topicStartPage) || 1))
    setCurrentPage(fallback)
    setInputPage(String(fallback))
    setPageNote(`Opening mapped printed p. ${topicStartPage}`)
  }, [pdfDoc, topicStartPage])

  useEffect(() => {
    let cancelled=false
    async function mapPrintedPage() {
      if(!pdfDoc || !knowledgeBookId || !topicStartPage) return
      try {
        const r=await fetch(`${API_BASE}/knowledge/printed-page/${knowledgeBookId}/${topicStartPage}`)
        if(!r.ok) return
        const d=await r.json(); const mapped=Number(d?.pdf_page)
        if(!cancelled && Number.isFinite(mapped) && mapped>0) { setCurrentPage(Math.min(mapped,pdfDoc.numPages)); setInputPage(String(Math.min(mapped,pdfDoc.numPages))); setPageNote(`Printed p. ${topicStartPage} → PDF page ${mapped}`) }
      } catch {}
    }
    mapPrintedPage(); return ()=>{cancelled=true}
  }, [pdfDoc, knowledgeBookId, topicStartPage])

  useEffect(() => {
    let cancelled=false
    async function discoverKnowledgeBook() {
      if(!grade || !subjectName) { setKnowledgeBookId(null); return }
      try {
        const r=await fetch(`${API_BASE}/knowledge/books`); const d=await r.json()
        const normalized=String(subjectName).trim().toLowerCase()
        const b=(d.books||[]).find(x=>Number(x.grade)===Number(grade)&&String(x.subject||'').trim().toLowerCase()===normalized)
        if(!cancelled) setKnowledgeBookId(b?.id || null)
      } catch { if(!cancelled) setKnowledgeBookId(null) }
    }
    discoverKnowledgeBook(); return ()=>{cancelled=true}
  }, [subjectName,grade])

  const renderPage=useCallback(async(pageNumber,zoom=scale)=>{
    const doc=pdfRef.current
    if(!doc||!canvasRef.current||!containerRef.current) return
    const safe=Math.max(1,Math.min(doc.numPages,Number(pageNumber)||1))
    if(renderTaskRef.current){try{renderTaskRef.current.cancel()}catch{};renderTaskRef.current=null}
    const rid=++renderIdRef.current
    try {
      const page=await doc.getPage(safe); if(rid!==renderIdRef.current) return
      const box=containerRef.current; const available=Math.max(320,box.clientWidth-32)
      const base=page.getViewport({scale:1}); const fit=available/base.width; const finalScale=Math.max(.4,Math.min(3,fit*zoom)); const viewport=page.getViewport({scale:finalScale})
      const dpr=window.devicePixelRatio||1; const canvas=canvasRef.current; const ctx=canvas.getContext('2d',{alpha:false})
      canvas.width=Math.ceil(viewport.width*dpr); canvas.height=Math.ceil(viewport.height*dpr); canvas.style.width=`${Math.ceil(viewport.width)}px`; canvas.style.height=`${Math.ceil(viewport.height)}px`
      ctx.setTransform(dpr,0,0,dpr,0,0); ctx.fillStyle='#fff'; ctx.fillRect(0,0,viewport.width,viewport.height)
      const task=page.render({canvasContext:ctx,viewport}); renderTaskRef.current=task; await task.promise
      if(rid===renderIdRef.current) renderTaskRef.current=null
    } catch(e){ if(e?.name!=='RenderingCancelledException') console.error('PDF render:',e) }
  },[scale])

  useEffect(()=>{ if(pdfDoc&&currentPage) renderPage(currentPage) },[pdfDoc,currentPage,renderPage])
  useEffect(()=>{
    if(!containerRef.current||!pdfDoc) return
    let timer=null
    const ro=new ResizeObserver(()=>{clearTimeout(timer);timer=setTimeout(()=>renderPage(currentPage),120)})
    ro.observe(containerRef.current); return ()=>{ro.disconnect();clearTimeout(timer)}
  },[pdfDoc,currentPage,renderPage])
  useEffect(()=>{
    if(jumpToPage&&pdfDoc){ goToPage(jumpToPage); setJumpToPage(null) }
  },[jumpToPage,pdfDoc])
  useEffect(()=>{ const f=()=>setIsFullscreen(Boolean(document.fullscreenElement)); document.addEventListener('fullscreenchange',f); return()=>document.removeEventListener('fullscreenchange',f)},[])

  function goToPage(value){ const n=Math.max(1,Math.min(totalPages||1,parseInt(value,10)||1)); setCurrentPage(n); setInputPage(String(n)) }
  function changeZoom(delta){setScale(s=>Math.max(.65,Math.min(2.5,s+delta)))}
  async function toggleFullscreen(){try{if(!document.fullscreenElement) await wrapperRef.current?.requestFullscreen(); else await document.exitFullscreen()}catch{}}

  if(loadingBook||loadingPdf) return <div className="study-panel"><div style={{textAlign:'center',padding:'40px',color:'#888'}}>⏳ {loadingBook?'Finding textbook...':'Loading PDF...'}</div></div>
  if(error) return <div className="study-panel"><div style={{padding:'28px',textAlign:'center'}}><div style={{color:'#ff9900',fontWeight:700,marginBottom:8}}>📖 Textbook viewer error</div><div style={{color:'#777',fontSize:12,lineHeight:1.5}}>{error}</div></div></div>

  return <div ref={wrapperRef} className={`study-panel pdf-panel ${isFullscreen?'fullscreen-mode':''}`}>
    <div className="pdf-toolbar">
      <div><div style={{color:'#4d79ff',fontSize:12,fontWeight:700}}>📖 {bookInfo?.title}</div><div style={{color:'#888',fontSize:11,marginTop:3}}>PDF page {currentPage} of {totalPages}{topicStartPage?` • Printed topic range: p. ${topicStartPage}${topicEndPage&&topicEndPage!==topicStartPage?`–${topicEndPage}`:''}`:''}{pageNote?` • ${pageNote}`:''}</div></div>
      <div className="pdf-controls"><button className="pdf-btn" onClick={()=>goToPage(currentPage-1)} disabled={currentPage<=1}>◀ Prev</button><input className="pdf-page-input" type="number" min="1" max={totalPages} value={inputPage} onChange={e=>setInputPage(e.target.value)} onKeyDown={e=>e.key==='Enter'&&goToPage(inputPage)}/><button className="pdf-btn" onClick={()=>goToPage(inputPage)}>Go</button><button className="pdf-btn" onClick={()=>goToPage(currentPage+1)} disabled={currentPage>=totalPages}>Next ▶</button><button className="pdf-btn" onClick={()=>changeZoom(.15)}>+</button><button className="pdf-btn" onClick={()=>changeZoom(-.15)}>−</button><button className="pdf-btn" onClick={toggleFullscreen} style={{background:'#FFD700',color:'#000',fontWeight:700}}>{isFullscreen?'Exit':'⛶ Full'}</button></div>
    </div>
    <div ref={containerRef} className="pdf-render-wrap"><canvas ref={canvasRef} className="pdf-canvas"/></div>
  </div>
}

function AiPanel({ subjectName, grade, unitId, chapterTitle, sectionTitle, sectionId, chapterId, pageStart, pageEnd, unitStart, unitEnd }) {
  const [msgs,setMsgs]=useState([]),[input,setInput]=useState(''),[loading,setLoading]=useState(false),[guide,setGuide]=useState(''),[guideLoading,setGuideLoading]=useState(false)
  const endRef=useRef(null)
  const scope=sectionId?'topic':'unit'
  const selectedTitle=sectionId?(sectionTitle||chapterTitle):chapterTitle
  const selectedStart=scope==='unit'?unitStart:pageStart
  const selectedEnd=scope==='unit'?unitEnd:pageEnd

  useEffect(()=>{
    const pageText=selectedStart?(selectedEnd&&selectedEnd!==selectedStart?`printed pages ${selectedStart}–${selectedEnd}`:`printed page ${selectedStart}`):'the selected mapped pages'
    setMsgs([{role:'ai',text:`Welcome. I am scoped to **${selectedTitle}**, ${pageText}. Ask about this exact selection.`}])
    setGuide('')
  },[selectedTitle,selectedStart,selectedEnd,scope])

  useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'})},[msgs])

  function payload(){
    return {subject:subjectName,grade,unitId,chapter:chapterTitle,section:sectionTitle,sectionId,chapterId,pageStart:selectedStart,pageEnd:selectedEnd,scope}
  }

  async function ask(custom){
    const q=(custom||input).trim();if(!q||loading)return
    setInput('');setMsgs(p=>[...p,{role:'user',text:q}]);setLoading(true)
    try{
      const c=new AbortController();const t=setTimeout(()=>c.abort(),90000)
      const r=await fetch(`${API_BASE}/ask`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...payload(),question:q}),signal:c.signal})
      clearTimeout(t)
      const type=r.headers.get('content-type')||''
      const d=type.includes('application/json')?await r.json():{error:await r.text()}
      setMsgs(p=>[...p,{role:'ai',text:r.ok&&d.success?d.answer:`⚠️ ${d.error||'Tutor request failed'}`}])
    }catch(e){setMsgs(p=>[...p,{role:'ai',text:`⚠️ ${e.name==='AbortError'?'Request timed out.':'Tutor server offline.'}`}])}
    finally{setLoading(false)}
  }

  async function genGuide(){
    setGuideLoading(true);setGuide('⏳ Building a textbook-grounded study guide for the selected topic...')
    try{
      const c=new AbortController();const t=setTimeout(()=>c.abort(),120000)
      const r=await fetch(`${API_BASE}/study-guide`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload()),signal:c.signal})
      clearTimeout(t)
      const d=await r.json()
      setGuide(r.ok&&d.success?d.guide:`⚠️ ${d.error||'Guide failed'}`)
    }catch(e){setGuide(`⚠️ ${e.name==='AbortError'?'Request timed out.':'Server error.'}`)}
    finally{setGuideLoading(false)}
  }

  return <div className="study-panel ai-panel">
    <div className="ai-guide-section">
      <div className="ai-guide-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8,borderBottom:'1px solid #222',paddingBottom:10,marginBottom:10,flexWrap:'wrap'}}>
        <span style={{color:'#00cc66',fontWeight:700,fontSize:12}}>📝 Study Guide — {selectedTitle}</span>
        <button className="pdf-btn" style={{background:'#00cc66',color:'#000',fontWeight:700,fontSize:11}} onClick={genGuide} disabled={guideLoading}>{guideLoading?'⏳...':'⚡ Generate'}</button>
      </div>
      {guide&&<AiMarkdown className="ai-guide-content markdown-body" text={guide}/>}
    </div>
    <div className="ai-chat-section">
      <div className="ai-chat-header" style={{flex:'0 0 auto',paddingBottom:6}}><span style={{color:'#4d79ff',fontWeight:700,fontSize:12}}>💬 AI Tutor</span></div>
      <div className="ai-chat-messages">{msgs.map((m,i)=><div key={i} className={m.role==='user'?'message-user':'message-ai'}>{m.role==='user'?<span>{m.text}</span>:<AiMarkdown className="markdown-body" text={m.text}/>}</div>)}{loading&&<div className="thinking"><span/><span/><span/></div>}<div ref={endRef}/></div>
      <div className="chat-input-row"><input className="chat-input" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&ask()} placeholder="Ask about this selected topic..." disabled={loading}/><button className="chat-send-btn" onClick={()=>ask()} disabled={loading}>{loading?'...':'Ask'}</button></div>
    </div>
  </div>
}

function RelatedPanel({ unitTitle, subjectName, grade, sectionId, relatedTopics=[], onOpenRelated }) {
  return <div className="study-panel related-panel"><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><span style={{color:'#b44dff',fontWeight:700,fontSize:13}}>🔗 Related Topics</span></div>{relatedTopics.length===0?<div style={{color:'#666',fontSize:12,lineHeight:1.6}}>No additional mapped connection is stored for this topic.</div>:<div style={{display:'flex',flexDirection:'column',gap:8}}>{relatedTopics.map((topic,index)=><button type="button" className="related-link" key={`${topic.id||topic.title}-${index}`} onClick={()=>topic.navigable&&onOpenRelated?.(topic)} disabled={!topic.navigable} title={topic.navigable?'Open this topic':'Not navigable'}><div style={{color:'#eee',fontSize:12,fontWeight:700}}>{topic.title}</div></button>)}</div>}</div>
}

function VideoPanel({
  subjectName,
  grade,
  chapterTitle,
  sectionTitle
}) {
  const [query, setQuery] = useState(
    sectionTitle || chapterTitle || ''
  )

  const [videos, setVideos] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [approvedChannels, setApprovedChannels] = useState([])

  async function runSearch() {
    const topic = String(query || '').trim()

    if (!topic) {
      setError('Enter a topic to search.')
      return
    }

    setLoading(true)
    setError('')
    setSelected(null)
    setVideos([])

    try {
      const response = await fetch(
        `${API_BASE}/youtube/search`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            subject: subjectName,
            grade,
            chapter: chapterTitle,
            section: sectionTitle,
            query: topic,
            limit: 12
          })
        }
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || 'YouTube search failed.'
        )
      }

      setApprovedChannels(data.channels || [])
      setVideos(data.videos || [])

      if (!(data.videos || []).length) {
        setError(data.error || 'No suitable embeddable videos were returned for this topic.')
      }
    } catch (err) {
      console.error('Video search error:', err)
      setApprovedChannels([])
      setVideos([])
      setSelected(null)
      setError(
        err.message || 'Video search failed.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="study-panel-wide video-panel">

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 8,
          flexWrap: 'wrap',
          marginBottom: 8
        }}
      >
        <span
          style={{
            color: '#FFD700',
            fontWeight: 700,
            fontSize: 12
          }}
        >
          📺 Topic Video Search
        </span>

      </div>

      <div
        style={{
          display: 'flex',
          gap: 6,
          marginBottom: 8
        }}
      >
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              runSearch()
            }
          }}
          placeholder="Search this topic..."
          style={{
            flex: 1,
            minWidth: 180,
            background: '#111',
            color: '#fff',
            border: '1px solid #333',
            borderRadius: 6,
            padding: '9px 10px',
            fontSize: 12,
            outline: 'none'
          }}
        />

        <button
          className="pdf-btn"
          onClick={runSearch}
          disabled={loading}
          style={{
            background: '#FFD700',
            color: '#000',
            fontWeight: 700,
            minWidth: 90
          }}
        >
          {loading ? '⏳ Search' : '🔍 Search'}
        </button>
      </div>

      {approvedChannels.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 5,
            marginBottom: 10
          }}
        >
          {approvedChannels.map(channel => (
            <span
              key={channel}
              style={{
                fontSize: 9,
                color: '#aaa',
                background: '#181818',
                border: '1px solid #292929',
                borderRadius: 999,
                padding: '4px 7px'
              }}
            >
              {channel}
            </span>
          ))}
        </div>
      )}

      {error && (
        <div
          className="video-note"
          style={{
            color: '#ffb15c',
            marginBottom: 10
          }}
        >
          {error}
        </div>
      )}

      {selected && (
        <>
          <div className="video-embed-wrap">
            <iframe
              className="video-embed"
              src={selected.embedUrl}
              title={selected.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div
            style={{
              marginTop: 8,
              color: '#fff',
              fontSize: 13,
              fontWeight: 700
            }}
          >
            {selected.title}
          </div>

          <div
            style={{
              marginTop: 4,
              color: '#777',
              fontSize: 10
            }}
          >
            {selected.channelTitle}
          </div>
        </>
      )}

      {videos.length > 0 && (
        <div
          className="video-result-grid"
          style={{
            marginTop: 12
          }}
        >
          {videos.map(video => (
            <button
              type="button"
              key={video.videoId}
              className={`video-result ${
                selected?.videoId === video.videoId
                  ? 'active'
                  : ''
              }`}
              onClick={() => setSelected(video)}
              style={{
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              <img
                src={video.thumbnail}
                alt=""
                style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  objectFit: 'cover',
                  borderRadius: 6,
                  display: 'block',
                  marginBottom: 7
                }}
              />

              <div
                style={{
                  color: '#eee',
                  fontSize: 11,
                  fontWeight: 700,
                  lineHeight: 1.35
                }}
              >
                {video.title}
              </div>

              <div
                style={{
                  color: '#777',
                  fontSize: 10,
                  marginTop: 5
                }}
              >
                {video.channelTitle}
              </div>
            </button>
          ))}
        </div>
      )}

      {!selected &&
        videos.length > 0 && (
          <div
            className="video-note"
            style={{
              marginTop: 10
            }}
          >
            Select a video above to play it here.
          </div>
        )}
    </div>
  )
}

function QuizPanel({ subjectName, subjectId, grade, unitId, chapterTitle, sectionTitle, sectionId, chapterId, pageStart, pageEnd, unitStart, unitEnd, onResult }) {
  const [loading,setL]=useState(false),[count,setC]=useState(5),[active,setA]=useState(false),[qs,setQs]=useState([]),[qi,setQi]=useState(0),[sel,setSel]=useState(null),[answers,setAn]=useState([]),[showE,setSE]=useState(false),[score,setSc]=useState(0),[done,setD]=useState(false),[time,setT]=useState(600),[err,setErr]=useState('')
  const scope=sectionId?'topic':'unit'
  const selectedTitle=sectionId?(sectionTitle||chapterTitle):chapterTitle
  const selectedStart=scope==='unit'?unitStart:pageStart
  const selectedEnd=scope==='unit'?unitEnd:pageEnd

  useEffect(()=>{if(!active||done)return;const t=setInterval(()=>setT(p=>p<=1?0:p-1),1000);return()=>clearInterval(t)},[active,done])
  const fmt=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`
  const payload={subject:subjectName,subjectId,grade,unitId,chapterTitle,chapter:chapterTitle,section:selectedTitle,sectionId,chapterId,pageStart:selectedStart,pageEnd:selectedEnd,scope,count}

  async function start(){
    setL(true);setErr('');setD(false);setQi(0);setSel(null);setSE(false);setSc(0);setAn([]);setT(count*120)
    try{
      const r=await fetch(`${API_BASE}/quiz`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
      const d=await r.json();if(!r.ok||!d.success)throw new Error(d.error||'Failed to generate quiz');if(!d.questions?.length)throw new Error('No quiz questions were returned');setQs(d.questions);setA(true)
    }catch(e){setErr(e.message||'Quiz failed')}finally{setL(false)}
  }

  function check(){
    if(!sel||showE)return
    const q=qs[qi];const cor=String(q?.answer||'A').replace(/[^A-D]/gi,'').toUpperCase()
    const item={question:q?.question||'',options:q?.options||[],userChoice:sel,correctChoice:cor,explanation:q?.explanation||'',isCorrect:sel===cor,sectionTitle:selectedTitle}
    setSc(s=>s+(sel===cor?1:0));setAn(p=>[...p,item]);setSE(true)
  }

  async function next(){
    const q=qs[qi];const cor=String(q?.answer||'A').replace(/[^A-D]/gi,'').toUpperCase()
    const current={question:q?.question||'',options:q?.options||[],userChoice:sel,correctChoice:cor,explanation:q?.explanation||'',isCorrect:sel===cor,sectionTitle:selectedTitle}
    const nextAnswers=[...answers,current];const nextScore=score+(sel===cor?1:0)
    if(qi<qs.length-1){setAn(nextAnswers);setSc(nextScore);setQi(qi+1);setSel(null);setSE(false);return}
    setAn(nextAnswers);setSc(nextScore);setD(true)
    try{await fetch(`${API_BASE}/quiz-result`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({subject:subjectName,subjectId,grade,unitId,chapter:chapterTitle,unitTitle:chapterTitle,section:selectedTitle,sectionId,chapterId,score:nextScore,total:qs.length,scope,mistakes:nextAnswers.filter(a=>!a.isCorrect)})})}catch{}
    onResult?.()
  }

  return <div className="study-panel-wide quiz-panel">
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8,flexWrap:'wrap'}}>
      <span style={{color:'#4d79ff',fontWeight:700,fontSize:12}}>🛡️ Quiz — {selectedTitle}</span>
    </div>
    {active?<div><div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}><span style={{color:'#4d79ff',fontSize:12}}>Q {qi+1}/{qs.length}</span><div className="quiz-countdown-container">⏱️ {fmt(time)}</div></div>{!done?<div><div style={{fontSize:14,color:'#fff',marginBottom:10}}><MathView text={qs[qi]?.question}/></div><div style={{display:'flex',flexDirection:'column',gap:6}}>{(qs[qi]?.options||[]).map((opt,i)=>{const l=String(opt).trim().charAt(0).toUpperCase();const cor=String(qs[qi]?.answer||'').replace(/[^A-D]/gi,'').toUpperCase();let s={background:'#1a1a1a',border:'1px solid #333',color:'#eee',padding:'10px',borderRadius:'6px',textAlign:'left',cursor:'pointer',fontSize:'13px'};if(sel===l){s.border='1px solid #4d79ff';s.background='#1e3a8a33'}if(showE&&l===cor){s.border='1px solid #00cc66';s.background='#064e3b44';s.color='#00cc66'}else if(showE&&sel===l){s.border='1px solid #ff4d4d';s.background='#7f1d1d44';s.color='#ff4d4d'}return <button key={i} style={s} onClick={()=>!showE&&setSel(l)}><MathView text={opt}/></button>})}</div>{!showE?<button className="quiz-btn" style={{marginTop:10,background:sel?'#00cc66':'#333',padding:8}} onClick={check} disabled={!sel}>Verify</button>:<div style={{marginTop:10,background:'#161616',padding:10,borderRadius:6}}><p style={{color:sel===String(qs[qi]?.answer||'').replace(/[^A-D]/gi,'').toUpperCase()?'#00cc66':'#ff4d4d',fontWeight:700,fontSize:13}}>{sel===String(qs[qi]?.answer||'').replace(/[^A-D]/gi,'').toUpperCase()?'✓ Correct':'❌ Wrong'}</p><div style={{fontSize:12,color:'#ccc',lineHeight:1.5,marginTop:4}}><MathView text={qs[qi]?.explanation}/></div><button className="quiz-btn" style={{marginTop:8,background:'#4d79ff',padding:8}} onClick={next}>{qi<qs.length-1?'Next ➔':'Finish'}</button></div>}</div>:<div style={{textAlign:'center'}}><h3 style={{color:'#fff'}}>Done!</h3><div style={{fontSize:36,color:'#00cc66'}}>{score}/{qs.length}</div><button className="quiz-btn" style={{marginTop:8}} onClick={()=>setA(false)}>Close</button></div>}</div>:<div>{err&&<p style={{color:'#ff4d4d',fontSize:12}}>{err}</p>}<div style={{display:'flex',gap:6,marginBottom:10,flexWrap:'wrap'}}>{[3,5,10,15].map(c=><button key={c} className="pdf-btn" style={{background:count===c?'#4d79ff':'#222',color:'#fff',padding:'6px 10px',fontSize:12}} onClick={()=>setC(c)}>{c}Q</button>)}</div><button className="quiz-btn" style={{background:'#00cc66',color:'#000',fontWeight:700,padding:8}} onClick={start} disabled={loading}>{loading?'⏳ Generating...':'⚡ Start Test'}</button></div>}
  </div>
}

function KnowledgeLibrary() {
  const [books, setBooks] = useState([])
  const [totals, setTotals] = useState(null)

  const [searchText, setSearchText] = useState('')
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState([])

  const [error, setError] = useState('')
  const [expandedBook, setExpandedBook] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadKnowledge() {
      try {
        const [booksResponse, coverageResponse] =
          await Promise.all([
            fetch(`${API_BASE}/knowledge/books`),
            fetch(`${API_BASE}/knowledge/coverage`)
          ])

        const booksData = await booksResponse.json()
        const coverageData = await coverageResponse.json()

        if (cancelled) return

        if (!booksData.success) {
          throw new Error(
            booksData.error || 'Could not load textbook list'
          )
        }

        if (!coverageData.success) {
          throw new Error(
            coverageData.error || 'Could not load knowledge coverage'
          )
        }

        setBooks(booksData.books || [])

        setTotals({
          pages: coverageData.totals?.total_pages || 0,
          characters:
            coverageData.totals?.total_characters || 0,
          candidates:
            coverageData.candidates?.total_candidates || 0
        })
      } catch (err) {
        console.error('Knowledge library error:', err)
        setError(err.message)
      }
    }

    loadKnowledge()

    return () => {
      cancelled = true
    }
  }, [])

  async function handleSearch(event) {
    event?.preventDefault()

    const query = searchText.trim()

    if (!query) {
      setResults([])
      return
    }

    setSearching(true)
    setError('')

    try {
      const response = await fetch(
        `${API_BASE}/knowledge/search`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query,
            limit: 12
          })
        }
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || 'Knowledge search failed'
        )
      }

      setResults(data.results || [])
    } catch (err) {
      console.error('Knowledge search error:', err)
      setError(err.message)
      setResults([])
    } finally {
      setSearching(false)
    }
  }

  function formatNumber(value) {
    return Number(value || 0).toLocaleString()
  }

  function getStatusLabel(book) {
    if (!book.source_status) {
      return 'SOURCE AVAILABLE'
    }

    return String(book.source_status)
      .replaceAll('_', ' ')
      .toUpperCase()
  }

  function getSnippet(text, query) {
    if (!text) return ''

    const clean = String(text)
      .replace(/\s+/g, ' ')
      .trim()

    if (!query) {
      return clean.substring(0, 420)
    }

    const lowerText = clean.toLowerCase()
    const lowerQuery = query.toLowerCase()

    const index = lowerText.indexOf(lowerQuery)

    if (index === -1) {
      return clean.substring(0, 420)
    }

    const start = Math.max(0, index - 160)
    const end = Math.min(
      clean.length,
      index + lowerQuery.length + 260
    )

    let snippet = clean.substring(start, end)

    if (start > 0) {
      snippet = '... ' + snippet
    }

    if (end < clean.length) {
      snippet += ' ...'
    }

    return snippet
  }

  const groupedBooks = books.reduce((groups, book) => {
    const subject =
      book.subject || 'Unknown Subject'

    if (!groups[subject]) {
      groups[subject] = []
    }

    groups[subject].push(book)

    return groups
  }, {})

  return (
    <section
      style={{
        marginTop: '28px',
        marginBottom: '30px',
        padding: '22px',
        borderRadius: '18px',
        background: '#11151c',
        border: '1px solid #293140',
        boxShadow: '0 12px 35px rgba(0,0,0,0.22)'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '20px',
          flexWrap: 'wrap'
        }}
      >
        <div>
          <div
            style={{
              color: '#4d79ff',
              fontSize: '12px',
              fontWeight: '800',
              letterSpacing: '1.5px',
              textTransform: 'uppercase'
            }}
          >
            📚 REAL TEXTBOOK KNOWLEDGE
          </div>

          <h2
            style={{
              margin: '7px 0 5px',
              color: '#ffffff',
              fontSize: '24px'
            }}
          >
            Your Ethiopian Curriculum Knowledge Base
          </h2>

          <p
            style={{
              margin: 0,
              color: '#8f98a8',
              lineHeight: 1.5
            }}
          >
            This section reads the actual textbook knowledge
            stored in Arena's knowledge layer.
          </p>
        </div>

        {totals && (
          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap'
            }}
          >
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '12px',
                background: '#171d27',
                border: '1px solid #293140'
              }}
            >
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#ffffff'
                }}
              >
                {formatNumber(books.length)}
              </div>

              <div
                style={{
                  color: '#7f8999',
                  fontSize: '11px'
                }}
              >
                TEXTBOOKS
              </div>
            </div>

            <div
              style={{
                padding: '10px 14px',
                borderRadius: '12px',
                background: '#171d27',
                border: '1px solid #293140'
              }}
            >
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#ffffff'
                }}
              >
                {formatNumber(totals.pages)}
              </div>

              <div
                style={{
                  color: '#7f8999',
                  fontSize: '11px'
                }}
              >
                PAGES
              </div>
            </div>

            <div
              style={{
                padding: '10px 14px',
                borderRadius: '12px',
                background: '#171d27',
                border: '1px solid #293140'
              }}
            >
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#ffffff'
                }}
              >
                {formatNumber(totals.candidates)}
              </div>

              <div
                style={{
                  color: '#7f8999',
                  fontSize: '11px'
                }}
              >
                KNOWLEDGE RECORDS
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div
          style={{
            marginTop: '18px',
            padding: '12px 14px',
            borderRadius: '10px',
            background: '#3a1818',
            border: '1px solid #6d2c2c',
            color: '#ff9d9d'
          }}
        >
          Knowledge error: {error}
        </div>
      )}

      <form
        onSubmit={handleSearch}
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: '20px'
        }}
      >
        <input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="Search the actual textbooks..."
          style={{
            flex: 1,
            minWidth: '180px',
            padding: '13px 15px',
            borderRadius: '10px',
            border: '1px solid #343d4c',
            background: '#0c1016',
            color: '#ffffff',
            outline: 'none',
            fontSize: '14px'
          }}
        />

        <button
          type="submit"
          disabled={searching}
          style={{
            padding: '0 20px',
            border: 'none',
            borderRadius: '10px',
            background: '#4d79ff',
            color: '#ffffff',
            fontWeight: '700',
            cursor: searching ? 'wait' : 'pointer'
          }}
        >
          {searching ? 'Searching...' : 'Search'}
        </button>
      </form>

      {searchText.trim() && results.length > 0 && (
        <div style={{ marginTop: '22px' }}>
          <div
            style={{
              color: '#dbe2ef',
              fontSize: '14px',
              fontWeight: '700',
              marginBottom: '10px'
            }}
          >
            Search results for "{searchText.trim()}"
          </div>

          <div
            style={{
              display: 'grid',
              gap: '10px'
            }}
          >
            {results.map((result, index) => (
              <div
                key={`${result.book_id}-${result.page}-${index}`}
                style={{
                  padding: '15px',
                  borderRadius: '12px',
                  background: '#171d27',
                  border: '1px solid #293140'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '12px',
                    flexWrap: 'wrap'
                  }}
                >
                  <strong
                    style={{
                      color: '#ffffff'
                    }}
                  >
                    {result.subject} • Grade {result.grade}
                  </strong>

                  <span
                    style={{
                      color: '#4d79ff',
                      fontWeight: '700'
                    }}
                  >
                    Page {result.page}
                  </span>
                </div>

                <div
                  style={{
                    color: '#7f8999',
                    fontSize: '12px',
                    marginTop: '4px'
                  }}
                >
                  {result.book_title}
                </div>

                <p
                  style={{
                    color: '#c6cedb',
                    lineHeight: 1.6,
                    margin: '10px 0 0'
                  }}
                >
                  {getSnippet(
                    result.text_final ||
                      result.text_raw,
                    searchText
                  )}
                </p>

                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    marginTop: '10px',
                    color: '#697487',
                    fontSize: '11px'
                  }}
                >
                  <span>
                    Source: {result.content_status}
                  </span>

                  <span>
                    Characters:{' '}
                    {formatNumber(result.char_count_final)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchText.trim() &&
        !searching &&
        results.length === 0 &&
        !error && (
          <div
            style={{
              marginTop: '18px',
              padding: '18px',
              borderRadius: '12px',
              background: '#171d27',
              color: '#8f98a8'
            }}
          >
            No matching textbook pages were found.
          </div>
        )}

      <div style={{ marginTop: '24px' }}>
        {Object.entries(groupedBooks).map(
          ([subject, subjectBooks]) => (
            <div
              key={subject}
              style={{
                marginBottom: '22px'
              }}
            >
              <div
                style={{
                  color: '#ffffff',
                  fontSize: '17px',
                  fontWeight: '800',
                  marginBottom: '10px'
                }}
              >
                {subject}
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '10px'
                }}
              >
                {subjectBooks
                  .sort(
                    (a, b) =>
                      Number(a.grade) -
                      Number(b.grade)
                  )
                  .map(book => {
                    const isOpen =
                      expandedBook === book.id

                    return (
                      <div
                        key={book.id}
                        style={{
                          borderRadius: '12px',
                          border: '1px solid #293140',
                          background: '#171d27',
                          overflow: 'hidden'
                        }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedBook(
                              isOpen ? null : book.id
                            )
                          }
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            border: 'none',
                            background: 'transparent',
                            color: '#ffffff',
                            padding: '14px',
                            cursor: 'pointer'
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent:
                                'space-between',
                              gap: '12px'
                            }}
                          >
                            <strong>
                              Grade {book.grade}
                            </strong>

                            <span
                              style={{
                                color: '#4d79ff',
                                fontSize: '12px',
                                fontWeight: '700'
                              }}
                            >
                              {book.pages} pages
                            </span>
                          </div>

                          <div
                            style={{
                              color: '#c4ccda',
                              marginTop: '7px',
                              lineHeight: 1.4
                            }}
                          >
                            {book.title}
                          </div>

                          <div
                            style={{
                              color: '#687385',
                              fontSize: '11px',
                              marginTop: '7px'
                            }}
                          >
                            {getStatusLabel(book)}
                          </div>
                        </button>

                        {isOpen && (
                          <div
                            style={{
                              borderTop:
                                '1px solid #293140',
                              padding: '14px'
                            }}
                          >
                            <div
                              style={{
                                display: 'grid',
                                gap: '7px',
                                color: '#9ba5b5',
                                fontSize: '12px'
                              }}
                            >
                              <div>
                                <strong
                                  style={{
                                    color:
                                      '#dce2ed'
                                  }}
                                >
                                  Book ID:
                                </strong>{' '}
                                {book.id}
                              </div>

                              <div>
                                <strong
                                  style={{
                                    color:
                                      '#dce2ed'
                                  }}
                                >
                                  Grade:
                                </strong>{' '}
                                {book.grade}
                              </div>

                              <div>
                                <strong
                                  style={{
                                    color:
                                      '#dce2ed'
                                  }}
                                >
                                  Subject:
                                </strong>{' '}
                                {book.subject}
                              </div>

                              <div>
                                <strong
                                  style={{
                                    color:
                                      '#dce2ed'
                                  }}
                                >
                                  Pages:
                                </strong>{' '}
                                {formatNumber(
                                  book.pages
                                )}
                              </div>

                              <div
                                style={{
                                  wordBreak:
                                    'break-word'
                                }}
                              >
                                <strong
                                  style={{
                                    color:
                                      '#dce2ed'
                                  }}
                                >
                                  Source:
                                </strong>{' '}
                                {book.path}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}
// === PAGES ===
function MistakeBankPage({ onBack, onOpenTopic }) {
  const [mistakes,setMistakes]=useState([]),[loading,setLoading]=useState(true),[filter,setFilter]=useState('open')
  const load=()=>{setLoading(true);fetch(`${API_BASE}/mistakes`).then(r=>r.json()).then(d=>setMistakes(Array.isArray(d)?d:[])).catch(()=>setMistakes([])).finally(()=>setLoading(false))}
  useEffect(load,[])
  async function remove(id){try{await fetch(`${API_BASE}/mistakes/${id}`,{method:'DELETE'});load()}catch{}}
  async function clearAll(){if(!mistakes.length)return;try{await fetch(`${API_BASE}/mistakes/clear-all`,{method:'POST'});load()}catch{}}
  // A retest never deletes the mistake — it records another attempt so the
  // adaptive planner can tell "answered wrong once" from "still struggling",
  // and marks it mastered only after two correct retests in a row.
  async function retest(m,correct){
    try{
      const r=await fetch(`${API_BASE}/mistakes/${m.id}/retest`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({correct})})
      const d=await r.json()
      setMistakes(prev=>prev.map(x=>x.id===m.id?{...x,mastered:d.mastered,retest_streak:d.retest_streak}:x))
    }catch{}
  }
  const visible=mistakes.filter(m=>filter==='all'?true:filter==='mastered'?m.mastered:!m.mastered)
  return <div><button className="back-btn" onClick={onBack}>◀ Back</button><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:10,marginBottom:16,flexWrap:'wrap'}}><h1 style={{color:'#ff4d4d',margin:0}}>🔴 Mistakes Bank</h1><button className="pdf-btn" onClick={clearAll} disabled={!mistakes.length}>Clear all</button></div><div style={{display:'flex',gap:6,marginBottom:16}}>{[['open','Open'],['mastered','Mastered'],['all','All']].map(([k,label])=><button key={k} className="pdf-btn" style={{background:filter===k?'#4d79ff':'#222',color:'#fff'}} onClick={()=>setFilter(k)}>{label}</button>)}</div>{loading?<div className="content-section" style={{textAlign:'center',padding:40,color:'#888'}}>Loading...</div>:visible.length===0?<div className="content-section" style={{textAlign:'center',padding:40}}><p style={{color:'#888'}}>{filter==='mastered'?'No mastered mistakes yet — retest a mistake twice correctly to master it.':'Clean sheet.'}</p></div>:visible.map(m=><div key={m.id} className="mistake-item" style={m.mastered?{opacity:0.6}:undefined}><div className="mistake-header"><span><strong>{m.subject_name}</strong> • Grade {m.grade||'?'} • {m.chapter_title} • {m.section_title||'Unit'}{m.mastered&&<span style={{color:'#00cc66',marginLeft:8}}>✓ Mastered</span>}</span><div style={{display:'flex',gap:6}}>{m.unit_id&&<button className="pdf-btn" onClick={()=>onOpenTopic?.(m)}>Review</button>}<button className="pdf-btn" onClick={()=>remove(m.id)}>Delete</button></div></div><div className="mistake-q"><MathView text={m.question}/></div><div className="mistake-choices"><span className="choice-wrong">Your: {m.user_choice}</span><span className="choice-right">Correct: {m.correct_choice}</span></div>{m.explanation&&<div style={{color:'#888',fontSize:11,marginTop:8}}><MathView text={m.explanation}/></div>}{!m.mastered&&<div style={{display:'flex',gap:6,marginTop:10,alignItems:'center'}}><span style={{color:'#666',fontSize:11}}>Retry this question:</span><button className="pdf-btn" style={{background:'#00cc66',color:'#000'}} onClick={()=>retest(m,true)}>Got it right</button><button className="pdf-btn" onClick={()=>retest(m,false)}>Still wrong</button>{m.retest_streak>0&&<span style={{color:'#00cc66',fontSize:11}}>{m.retest_streak}/2 correct streak</span>}</div>}</div>)}</div>
}
function PlanWidget({ onOpenAction }) {
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let cancelled = false
    fetch(`${API_BASE}/plan`).then(r => r.json()).then(d => { if (!cancelled && d?.success) setPlan(d) }).finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])
  if (loading) return <div className="plan-widget" style={{ padding: 16, color: '#888', fontSize: 12 }}>Loading your plan…</div>
  if (!plan || !plan.actions?.length) return null
  return (
    <div className="plan-widget" style={{ background: '#141414', border: '1px solid #262626', borderRadius: 12, padding: 16, marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
        <span style={{ color: '#00cc66', fontWeight: 700, fontSize: 13 }}>🧭 What should I study now?</span>
        {plan.streak > 0 && <span style={{ color: '#ff9900', fontSize: 12, fontWeight: 700 }}>🔥 {plan.streak}-day streak</span>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {plan.actions.map(a => (
          <button key={a.id} onClick={() => onOpenAction(a)} style={{ textAlign: 'left', background: '#1c1c1c', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 12px', cursor: 'pointer', color: '#eee' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{a.title}</div>
            <div style={{ fontSize: 11, color: '#999', marginTop: 3 }}>{a.reason}</div>
          </button>
        ))}
      </div>
      {plan.mission?.length > 0 && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #222', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {plan.mission.map(m => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: m.done ? '#00cc66' : '#888' }}>
              <span>{m.done ? '✅' : '⬜'}</span><span>{m.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Dashboard({ onSelectSubject, onOpenMistakes, onOpenAction, onOpenAbout, todaySeconds, mistakesCount }) {
  const [subjects, setS] = useState([])
  const [loading, setL] = useState(true)
  const [off, setOff] = useState(false)
  useEffect(() => { fetch(`${API_BASE}/progress`).then(r => r.json()).then(d => { if (d?.subjects?.length > 0) setS(d.subjects); setL(false) }).catch(() => { setOff(true); setL(false) }) }, [todaySeconds])
  const fT = s => `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m ${s % 60}s`
  const pct = Math.min(100, Math.round((todaySeconds / DAILY_TARGET_SECONDS) * 100))
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6 }}>
        <button className="pdf-btn" style={{ background: 'transparent', color: '#666' }} onClick={onOpenAbout}>ℹ️ About</button>
      </div>
      <PlanWidget onOpenAction={onOpenAction} />
      {off && <div style={{ background: '#ff990022', border: '1px solid #ff9900', color: '#ff9900', padding: '10px', borderRadius: '10px', marginBottom: '15px', fontSize: '13px', textAlign: 'center' }}>⚠️ Server Offline</div>}
      <div className="daily-mission-card"><div className="daily-mission-header"><span className="daily-mission-title">🎯 6-Hour Target</span><span className="daily-mission-status">{pct}%</span></div><div className="daily-time-display">{fT(todaySeconds)} <span>/ 6h</span></div><div className="mission-progress-bar"><div className="mission-progress-fill" style={{ width: `${pct}%` }} /></div></div>
      <div className="mistake-bank-card" onClick={onOpenMistakes}><div><div className="mistake-bank-title">🔴 Mistakes</div><div className="mistake-bank-count">{mistakesCount}</div></div><button className="quiz-btn" style={{ width: 'auto', padding: '8px 16px', background: '#ff4d4d', margin: 0 }}>Open ➔</button></div>
      <p className="section-title">📂 Choose a Subject</p>
      {loading ? <div style={{ textAlign: 'center', color: '#888', padding: '40px' }}>Loading...</div> :
        subjects.map(s => (
          <div key={s.id} className="subject-card" style={{ borderLeftColor: s.color }} onClick={() => onSelectSubject(s)}>
            <div style={{ flex: 1 }}>
              <div className="subject-name">{s.name}</div>
              <div className="subject-grades">{s.grades} • {s.total_units} chapters</div>
              <div className="subject-progress">{s.passed_units || 0}/{s.total_units} passed</div>
              <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: `${s.percentage || 0}%`, backgroundColor: s.color }} /></div>
            </div>
            <span className="badge" style={{ backgroundColor: s.color }}>{s.priority}</span>
          </div>
        ))
      }
    </div>
  )
}

// ============================================================
// SUBJECT CURRICULUM TREE
// Grade → Unit/Chapter → Section/Subtopic
// ============================================================
function SubjectPage({ subject, onBack, onSelectUnit }) {
  const curriculum = getCurriculumForSubject(subject?.name)
  const grades = getCurriculumGrades(subject?.name)
  const [selectedGrade, setSelectedGrade] = useState(grades[0] ?? null)
  const [expandedUnits, setExpandedUnits] = useState({})

  useEffect(() => {
    setSelectedGrade(grades[0] ?? null)
    setExpandedUnits({})
  }, [subject?.name])

  const gradeData =
    selectedGrade != null ? curriculum[selectedGrade] : null
  const units = gradeData?.units || []

  function openItem(unit, section = null) {
    const topicStartPage = Number(
      section?.startPage ?? unit?.startPage
    ) || null
    const topicEndPage = Number(
      section?.endPage ?? unit?.endPage
    ) || null

    const item = {
      id: section?.id || unit.id,
      grade: selectedGrade,
      subject_name: subject?.name || '',
      subject_id: subject?.id ?? null,
      unitId: unit.id,
      unit_number: unit.number,
      unit_title: unit.title,
      chapter_id: null,
      chapter_title: unit.title,
      section_id: section?.id || null,
      section_title: section?.title || null,
      sectionId: section?.id || null,
      sectionTitle: section?.title || null,
      topic_start_page: topicStartPage,
      topic_end_page: topicEndPage,
      start_page: Number(unit?.startPage) || null,
      end_page: Number(unit?.endPage) || null,
      curriculum_unit: unit,
      curriculum_section: section,
      knowledge_book_id: gradeData?.bookId ?? null,
      curriculum_source: 'shared/curriculumMap.js'
    }

    onSelectUnit(item, null)
  }

  return (
    <div className="app">
      <div className="topbar">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>

        <div>
          <h1 style={{ margin: 0 }}>{subject.name}</h1>
          <p style={{ marginTop: 6, color: '#888' }}>
            
          </p>
        </div>
      </div>

      {grades.length === 0 ? (
        <div
          className="content-section"
          style={{ padding: 30, color: '#888', lineHeight: 1.6 }}
        >
          No supplied curriculum mapping is available for {subject.name}.
        </div>
      ) : (
        <div>
          <div
            className="content-section"
            style={{ marginBottom: 18 }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1,
                color: '#888',
                marginBottom: 10,
                textTransform: 'uppercase'
              }}
            >
              Grade
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10
              }}
            >
              {grades.map(grade => (
                <button
                  type="button"
                  key={grade}
                  onClick={() => {
                    setSelectedGrade(grade)
                    setExpandedUnits({})
                  }}
                  style={{
                    padding: '12px 20px',
                    borderRadius: 10,
                    border:
                      Number(selectedGrade) === Number(grade)
                        ? `2px solid ${subject.color || '#4d79ff'}`
                        : '1px solid #333',
                    background:
                      Number(selectedGrade) === Number(grade)
                        ? '#161c2b'
                        : '#111',
                    color:
                      Number(selectedGrade) === Number(grade)
                        ? '#fff'
                        : '#888',
                    cursor: 'pointer',
                    fontWeight: 700
                  }}
                >
                  Grade {grade}
                </button>
              ))}
            </div>
          </div>

          <div
            className="content-section"
            style={{
              padding: '10px 0',
              background: 'transparent'
            }}
          >

            {units.map(unit => {
              const open = !!expandedUnits[unit.id]

              return (
                <div
                  key={unit.id}
                  style={{
                    border: '1px solid #252525',
                    background: '#111',
                    borderRadius: 10,
                    marginBottom: 10,
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '13px 15px'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedUnits(prev => ({
                          ...prev,
                          [unit.id]: !open
                        }))
                      }
                      style={{
                        flex: 1,
                        border: 'none',
                        background: 'transparent',
                        color: '#fff',
                        textAlign: 'left',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 800,
                          fontSize: 14
                        }}
                      >
                        Unit {unit.number}: {unit.title}
                      </div>
                      <div
                        style={{
                          color: '#777',
                          fontSize: 11,
                          marginTop: 4
                        }}
                      >
                        pp. {unit.startPage}–{unit.endPage}
                      </div>
                    </button>

                    <button
                      type="button"
                      className="pdf-btn"
                      onClick={() => openItem(unit)}
                    >
                      Open
                    </button>

                    <span
                      style={{
                        color: '#777',
                        width: 20,
                        textAlign: 'center'
                      }}
                    >
                      {open ? '▾' : '▸'}
                    </span>
                  </div>

                  {open && (
                    <div
                      style={{
                        borderTop: '1px solid #252525',
                        background: '#0d0d0d',
                        padding: '8px 12px 12px 28px'
                      }}
                    >
                      {(unit.sections || []).length === 0 ? (
                        <div
                          style={{
                            color: '#777',
                            fontSize: 12,
                            padding: '10px 6px'
                          }}
                        >
                          This unit has no separate subtopics — use "Open" above to study the whole unit.
                        </div>
                      ) : (unit.sections || []).map(section => (
                          <div
                            key={section.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              padding: '10px 6px',
                              borderBottom: '1px solid #171717'
                            }}
                          >
                            <div
                              style={{
                                flex: 1,
                                minWidth: 0
                              }}
                            >
                              <div
                                style={{
                                  color: '#ddd',
                                  fontSize: 13
                                }}
                              >
                                {section.title}
                              </div>
                              {Number.isFinite(
                                Number(section.startPage)
                              ) && (
                                <div
                                  style={{
                                    color: '#666',
                                    fontSize: 11,
                                    marginTop: 3
                                  }}
                                >
                                  pp. {section.startPage}–
                                  {section.endPage || unit.endPage}
                                </div>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => openItem(unit, section)}
                              style={{
                                border: '1px solid #333',
                                background: '#151515',
                                color: '#aaa',
                                borderRadius: 7,
                                padding: '6px 9px',
                                cursor: 'pointer',
                                fontSize: 12
                              }}
                            >
                              Study
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
function UnitPage({ unit, chapter, subject, onBack, onQuizResult, onOpenRelated }) {
  const [leftCollapsed,setLeftCollapsed]=useState(false),[rightCollapsed,setRightCollapsed]=useState(false),[jumpToPage,setJumpToPage]=useState(null)
  const subjectName=subject?.name||unit?.subject_name||'General', subjectId=subject?.id||unit?.subject_id||null
  const grade=Number(unit?.grade??chapter?.grade??0)||null
  const chapterTitle=unit?.chapter_title||unit?.unit_title||unit?.curriculum_unit?.title||'Unknown Unit'
  const sectionTitle=unit?.section_title||unit?.sectionTitle||unit?.curriculum_section?.title||unit?.curriculum_unit?.title||'Unit'
  const sectionId=unit?.section_id||unit?.sectionId||unit?.curriculum_section?.id||null
  const unitId=unit?.unitId||unit?.curriculum_unit?.id||unit?.chapter_id||null
  const topicStartPage=Number(unit?.topic_start_page??unit?.curriculum_section?.startPage??unit?.curriculum_unit?.startPage??unit?.start_page)||null
  const topicEndPage=Number(unit?.topic_end_page??unit?.curriculum_section?.endPage??unit?.curriculum_unit?.endPage??unit?.end_page)||null
  const unitStart=Number(unit?.start_page??unit?.curriculum_unit?.startPage??topicStartPage)||topicStartPage
  const unitEnd=Number(unit?.end_page??unit?.curriculum_unit?.endPage??topicEndPage)||topicEndPage
  const related=getRelatedTopics(subjectName,grade,unit?.curriculum_unit?.title||chapterTitle,sectionId)
  function openRelated(topic){onOpenRelated?.(topic)}
  return <div className="study-room"><div className="study-room-header"><button className="back-btn" style={{margin:0}} onClick={onBack}>◀ Back to Subject</button><div style={{flex:1,textAlign:'center'}}><h2 style={{color:subject?.color||'#fff',margin:0,fontSize:18}}>{sectionTitle}</h2><p style={{color:'#888',fontSize:11,margin:'2px 0 0'}}>{grade?`Grade ${grade}`:'General'} • {chapterTitle}{topicStartPage?` • Printed pp. ${topicStartPage}${topicEndPage&&topicEndPage!==topicStartPage?`–${topicEndPage}`:''}`:''}</p></div><div style={{display:'flex',gap:6}}><button className="pdf-btn" onClick={()=>setLeftCollapsed(v=>!v)}>{leftCollapsed?'▶ Related':'◀ Hide Related'}</button><button className="pdf-btn" onClick={()=>setRightCollapsed(v=>!v)}>{rightCollapsed?'◀ AI Tutor':'▶ Hide AI'}</button></div></div><div className={`study-room-grid ${leftCollapsed?'left-collapsed':''} ${rightCollapsed?'right-collapsed':''}`}>{!leftCollapsed&&<RelatedPanel unitTitle={sectionTitle} subjectName={subjectName} grade={grade} sectionId={sectionId} relatedTopics={related} onOpenRelated={openRelated}/>}<PdfPanel subjectId={subjectId} subjectName={subjectName} grade={grade} topicStartPage={topicStartPage} topicEndPage={topicEndPage} jumpToPage={jumpToPage} setJumpToPage={setJumpToPage}/>{!rightCollapsed&&<AiPanel subjectName={subjectName} grade={grade} unitId={unitId} chapterTitle={chapterTitle} sectionTitle={sectionTitle} sectionId={sectionId} chapterId={unit?.chapter_id||null} pageStart={topicStartPage} pageEnd={topicEndPage} unitStart={unitStart} unitEnd={unitEnd}/>}</div><VideoPanel subjectName={subjectName} grade={grade} chapterTitle={chapterTitle} sectionTitle={sectionTitle}/><QuizPanel subjectName={subjectName} subjectId={subjectId} grade={grade} unitId={unitId} chapterTitle={chapterTitle} sectionTitle={sectionTitle} sectionId={sectionId} chapterId={unit?.chapter_id||null} pageStart={topicStartPage} pageEnd={topicEndPage} unitStart={unitStart} unitEnd={unitEnd} onResult={onQuizResult}/></div>
}

// ============================================================
// ABOUT PAGE
// Everything in [brackets] is a placeholder — replace it with your own
// details. Nothing here was invented about any specific person; these are
// editable placeholders as requested, not filled-in biography.
// ============================================================
function AboutPage({ onBack }) {
  return (
    <div className="content-section" style={{ maxWidth: 720, margin: '0 auto', padding: '20px 16px' }}>
      <button className="back-btn" onClick={onBack}>◀ Back</button>
      <h1 style={{ color: '#00cc66', marginTop: 20 }}>About ESSLCE WarRoom</h1>

      <h2 style={{ color: '#fff', fontSize: 16, marginTop: 24 }}>What it is</h2>
      <p style={{ color: '#bbb', lineHeight: 1.6 }}>
        ESSLCE WarRoom is a local study environment for Ethiopian students preparing for the ESSLCE,
        built around the real Grades 9–12 textbooks. Every topic connects a student to the exact
        textbook page it comes from, then adds contextual AI help, practice quizzes, mistake tracking,
        supplemental videos and a personal study plan on top of that original source material.
      </p>

      <h2 style={{ color: '#fff', fontSize: 16, marginTop: 24 }}>Why it exists</h2>
      <p style={{ color: '#bbb', lineHeight: 1.6 }}>[Mission / Vision — why you built this, in your own words]</p>

      <h2 style={{ color: '#fff', fontSize: 16, marginTop: 24 }}>Who it's for</h2>
      <p style={{ color: '#bbb', lineHeight: 1.6 }}>
        Ethiopian secondary-school students in Grades 9 through 12 who want to study directly from
        their real textbooks rather than generic, disconnected material — with AI, video and practice
        tools scoped to the exact unit and topic they are studying.
      </p>

      <h2 style={{ color: '#fff', fontSize: 16, marginTop: 24 }}>What students can do here</h2>
      <ul style={{ color: '#bbb', lineHeight: 1.8 }}>
        <li>Read the original textbook, page by page, inside the app</li>
        <li>Ask an AI tutor questions scoped to the exact selected topic</li>
        <li>Generate a focused study guide for that topic</li>
        <li>Watch relevant supplemental videos from approved educational channels</li>
        <li>Practice with a scoped quiz and review explanations</li>
        <li>Save and retry mistakes until they're mastered</li>
        <li>Track study time, streaks and progress across every subject</li>
        <li>See a personalized "what to study next" plan on the dashboard</li>
      </ul>

      <h2 style={{ color: '#fff', fontSize: 16, marginTop: 24 }}>Creator</h2>
      <p style={{ color: '#bbb', lineHeight: 1.6 }}>[Your Name]</p>
      <p style={{ color: '#bbb', lineHeight: 1.6 }}>[Short Biography]</p>
      <p style={{ color: '#bbb', lineHeight: 1.6 }}>[Contact Link — email, website, or social profile]</p>
    </div>
  )
}

export default function App() {
  const [page,setPage]=useState('dashboard'),[selSubject,setSelSubject]=useState(null),[selUnit,setSelUnit]=useState(null),[selChapter,setSelChapter]=useState(null),[gSec,setGSec]=useState(0),[gRun,setGRun]=useState(false),[mCount,setMCount]=useState(0)
  const accRef=useRef(0)
  const sync=useCallback(()=>{fetch(`${API_BASE}/progress`).then(r=>r.json()).then(d=>{if(Number.isFinite(Number(d?.today_total_seconds)))setGSec(Number(d.today_total_seconds)||0);setMCount(Number(d?.mistakes_count)||0)}).catch(()=>{})},[])
  useEffect(()=>{sync()},[sync])
  useEffect(()=>{const t=setInterval(()=>{if(gRun&&!document.hidden&&selSubject){setGSec(p=>p+1);accRef.current+=1;if(accRef.current>=30){const duration=accRef.current;accRef.current=0;fetch(`${API_BASE}/study-session`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({subjectId:selSubject.id,grade:selUnit?.grade||selChapter?.grade||null,unitId:selUnit?.unitId||null,chapterId:selChapter?.id||null,sectionId:selUnit?.section_id||null,durationSeconds:duration})}).catch(()=>{})}}},1000);return()=>clearInterval(t)},[gRun,selSubject,selUnit,selChapter])
  function flush(){if(accRef.current>0&&selSubject){const duration=accRef.current;accRef.current=0;fetch(`${API_BASE}/study-session`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({subjectId:selSubject.id,grade:selUnit?.grade||selChapter?.grade||null,unitId:selUnit?.unitId||null,chapterId:selChapter?.id||null,sectionId:selUnit?.section_id||null,durationSeconds:duration})}).finally(sync)}}
  function selectRelated(topic){const target=findCurriculumTopic(topic.targetSubject,topic.targetGrade,{unitId:topic.targetUnitId,sectionId:topic.targetSectionId,unitTitle:topic.title});if(!target)return;const s=(selSubject&&selSubject.name===topic.targetSubject)?selSubject:{id:{Mathematics:1,Physics:2,Chemistry:3,Biology:4,English:5}[topic.targetSubject],name:topic.targetSubject,color:{Mathematics:'#ff4d4d',Physics:'#ff6b35',Chemistry:'#ff9900',Biology:'#00cc66',English:'#4d79ff'}[topic.targetSubject],priority:'',grades:`Grade ${topic.targetGrade}`};const item={id:target.section?.id||target.unit.id,grade:target.grade,subject_name:target.subject,subject_id:s.id,unitId:target.unit.id,unit_number:target.unit.number,unit_title:target.unit.title,chapter_id:null,chapter_title:target.unit.title,section_id:target.section?.id||null,section_title:target.section?.title||null,sectionId:target.section?.id||null,sectionTitle:target.section?.title||null,topic_start_page:target.startPage,topic_end_page:target.endPage,start_page:target.unit.startPage,end_page:target.unit.endPage,curriculum_unit:target.unit,curriculum_section:target.section,knowledge_book_id:target.knowledgeBookId};setSelSubject(s);setSelUnit(item);setSelChapter(null);setPage('unit');setGRun(true)}
  const fmt=s=>`${String(Math.floor(s/3600)).padStart(2,'0')}:${String(Math.floor((s%3600)/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`
  // Plan actions carry {subject, grade, unitId, sectionId, unitTitle, mode}.
  // "mistakes" mode sends the student to the Mistake Bank; everything else
  // opens the Study Room already scoped to that unit/topic, exactly like
  // opening a related topic.
  function openPlanAction(a) {
    if (a.mode === 'mistakes') { setPage('mistakes'); return }
    selectRelated({ targetSubject: a.subject, targetGrade: a.grade, targetUnitId: a.unitId, targetSectionId: a.sectionId || null, title: a.unitTitle })
  }

  function openMistake(m){const target=findCurriculumTopic(m.subject_name,m.grade,{unitId:m.unit_id,sectionId:m.section_id,unitTitle:m.unit_title||m.chapter_title,sectionTitle:m.section_title});if(!target)return;const s={id:m.subject_id||({Mathematics:1,Physics:2,Chemistry:3,Biology:4,English:5}[m.subject_name]||null),name:m.subject_name,color:{Mathematics:'#ff4d4d',Physics:'#ff6b35',Chemistry:'#ff9900',Biology:'#00cc66',English:'#4d79ff'}[m.subject_name]||'#4d79ff',priority:'',grades:`Grade ${m.grade}`};selectRelated({targetSubject:m.subject_name,targetGrade:m.grade,targetUnitId:target.unit.id,targetSectionId:target.section?.id||null,title:target.unit.title});void s}
  return <div>{selSubject&&<div className="global-session-header"><div className="global-session-title">📚 <span style={{color:selSubject.color}}>{selSubject.name}</span></div><div style={{display:'flex',gap:10,alignItems:'center'}}><span className="global-session-time">{fmt(gSec)}</span><button className="timer-btn" style={{padding:'3px 10px',fontSize:12,background:gRun?'#ff4d4d':'#00cc66',color:'#fff',margin:0}} onClick={()=>setGRun(v=>!v)}>{gRun?'⏸':'⚡'}</button></div></div>}<div className={page==='unit'?'app-wide':'app'}>{page==='dashboard'&&<Dashboard todaySeconds={gSec} mistakesCount={mCount} onSelectSubject={s=>{setSelSubject(s);setGRun(true);setPage('subject')}} onOpenMistakes={()=>setPage('mistakes')} onOpenAction={openPlanAction} onOpenAbout={()=>setPage('about')}/>} {page==='about'&&<AboutPage onBack={()=>setPage('dashboard')}/>} {page==='mistakes'&&<MistakeBankPage onBack={()=>{flush();setPage('dashboard')}} onOpenTopic={openMistake}/>} {page==='subject'&&selSubject&&<SubjectPage subject={selSubject} onBack={()=>{flush();setSelSubject(null);setGRun(false);setPage('dashboard')}} onSelectUnit={(u,c)=>{setSelUnit(u);setSelChapter(c);setPage('unit')}}/>} {page==='unit'&&selUnit&&selSubject&&<UnitPage unit={selUnit} chapter={selChapter} subject={selSubject} onBack={()=>{flush();setSelUnit(null);setSelChapter(null);setPage('subject')}} onQuizResult={sync} onOpenRelated={selectRelated}/>} {page==='unit'&&(!selUnit||!selSubject)&&<div className="content-section" style={{textAlign:'center',padding:40}}><p style={{color:'#ff9900'}}>⚠️ Study room selection was lost.</p><button className="back-btn" onClick={()=>{setSelUnit(null);setSelSubject(null);setPage('dashboard')}}>Dashboard</button></div>}</div></div>
}

