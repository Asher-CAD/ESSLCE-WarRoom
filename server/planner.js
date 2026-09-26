import { getCurriculumForSubject, getRelatedTopics } from '../shared/curriculumMap.js'

// ============================================================
// Adaptive study planner — fully deterministic.
//
// It reads only what the app already stores (quiz_results, mistakes,
// study_sessions) plus the shared curriculum, and turns that evidence into a
// short, ranked list of next actions. No AI is involved, so the dashboard
// keeps working when every AI provider is down.
// ============================================================

const PASS_PCT = 80          // same threshold /api/progress uses for a "passed" unit
const WEAK_PCT = 60
const DAY_MS = 24 * 3600 * 1000
const CORE_SUBJECTS = ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology']

const lc = v => String(v ?? '').trim().toLowerCase()
const dayKey = d => new Date(d).toISOString().split('T')[0] // matches how study_sessions.date is stored

function daysSince(iso, now) {
  const t = Date.parse(iso)
  return Number.isFinite(t) ? Math.max(0, (now.getTime() - t) / DAY_MS) : Infinity
}

function unitKey(subject, grade, unitId) { return `${lc(subject)}|${grade}|${unitId}` }

function newest(a, b) { return String(a || '') >= String(b || '') ? a : b }

export function buildPlan(data = {}, { grade = null, now = new Date() } = {}) {
  const subjects = data.subjects || []
  const results = data.quiz_results || []
  const allMistakes = data.mistakes || []
  const sessions = data.study_sessions || []
  const openMistakes = allMistakes.filter(m => !m.mastered)
  const todayKey = dayKey(now)

  // ---------- curriculum index (order matters for "next topic") ----------
  const units = [] // { subject, grade, unit, order }
  const byKey = new Map()
  for (const subj of subjects) {
    const curriculum = getCurriculumForSubject(subj.name)
    for (const [g, gd] of Object.entries(curriculum || {})) {
      ;(gd.units || []).forEach((unit, order) => {
        const row = { subject: subj.name, subjectId: subj.id, grade: Number(g), unit, order }
        units.push(row)
        byKey.set(unitKey(subj.name, g, unit.id), row)
        byKey.set(`${lc(subj.name)}|${g}|t:${lc(unit.title)}`, row) // legacy records store the title only
      })
    }
  }
  const resolveUnit = (subjectName, g, unitId, unitTitle) =>
    byKey.get(unitKey(subjectName, g, unitId)) || byKey.get(`${lc(subjectName)}|${g}|t:${lc(unitTitle)}`) || null

  // ---------- per-unit evidence ----------
  const stat = new Map()
  const get = row => {
    const k = unitKey(row.subject, row.grade, row.unit.id)
    if (!stat.has(k)) stat.set(k, { row, seconds: 0, lastSession: null, lastSectionId: null, results: [], lastResult: null, open: [], lastActivity: null })
    return stat.get(k)
  }

  for (const s of sessions) {
    const subj = subjects.find(x => Number(x.id) === Number(s.subject_id))
    const row = subj && resolveUnit(subj.name, s.grade, s.unit_id, '')
    if (!row) continue
    const st = get(row)
    st.seconds += Number(s.duration_seconds) || 0
    if (!st.lastSession || String(s.created_at) >= String(st.lastSession)) { st.lastSession = s.created_at; if (s.section_id) st.lastSectionId = s.section_id }
    st.lastActivity = newest(st.lastActivity, s.created_at)
  }
  for (const r of results) {
    const row = resolveUnit(r.subject_name, r.grade, r.unit_id, r.unit_title)
    if (!row) continue
    const st = get(row)
    st.results.push(r)
    if (!st.lastResult || String(r.created_at) >= String(st.lastResult.created_at)) st.lastResult = r
    st.lastActivity = newest(st.lastActivity, r.created_at)
  }
  for (const m of openMistakes) {
    const row = resolveUnit(m.subject_name, m.grade, m.unit_id, m.unit_title || m.chapter_title)
    if (!row) continue
    get(row).open.push(m)
  }

  const statusOf = st => {
    if (st.lastResult) {
      const pct = Number(st.lastResult.percentage) || 0
      return pct >= PASS_PCT ? 'passed' : pct < WEAK_PCT ? 'weak' : 'in_progress'
    }
    return st.seconds > 0 ? 'in_progress' : 'not_started'
  }

  const unitStatus = {}
  for (const [k, st] of stat) {
    unitStatus[k] = {
      status: statusOf(st),
      lastPct: st.lastResult ? Math.round(Number(st.lastResult.percentage) || 0) : null,
      bestPct: st.results.length ? Math.round(Math.max(...st.results.map(r => Number(r.percentage) || 0))) : null,
      attempts: st.results.length,
      openMistakes: st.open.length,
      studySeconds: st.seconds,
      lastActivity: st.lastActivity
    }
  }

  // ---------- helpers to build actions ----------
  const target = (st, extra = {}) => ({
    subject: st.row.subject, subjectId: st.row.subjectId, grade: st.row.grade,
    unitId: st.row.unit.id, unitTitle: st.row.unit.title, unitNumber: st.row.unit.number ?? null,
    sectionId: null, sectionTitle: null, ...extra
  })
  const sectionFor = st => {
    const id = st.lastSectionId || st.lastResult?.section_id
    const section = id ? (st.row.unit.sections || []).find(s => String(s.id) === String(id)) : null
    return section ? { sectionId: section.id, sectionTitle: section.title } : {}
  }
  const label = st => st.row.unit.number ? `Unit ${st.row.unit.number}: ${st.row.unit.title}` : st.row.unit.title
  const actions = []
  const push = a => actions.push({ ...a, id: `${a.kind}:${unitKey(a.subject, a.grade, a.unitId)}` })

  const hasEvidence = stat.size > 0

  for (const st of stat.values()) {
    const status = statusOf(st)
    const idle = daysSince(st.lastActivity, now)
    const t = target(st, sectionFor(st))
    const pct = st.lastResult ? Math.round(Number(st.lastResult.percentage) || 0) : null

    // continue where the student stopped
    if (status !== 'passed' && idle <= 14) {
      push({ kind: 'continue', priority: 88 - Math.min(30, idle * 4), title: `Continue ${label(st)}`,
        reason: idle < 1 ? 'You studied this today and have not passed it yet.' : `You last worked on this ${Math.round(idle)} day${Math.round(idle) === 1 ? '' : 's'} ago and have not passed it yet.`,
        cta: 'Continue studying', mode: 'study', ...t })
    }
    // returning after a long break: still offer the way back in
    if (status !== 'passed' && idle > 14 && idle !== Infinity) {
      push({ kind: 'resume', priority: 50 - Math.min(20, (idle - 14) / 3), title: `Pick up ${label(st)}`,
        reason: `It has been ${Math.round(idle)} days since you worked on this. Start with a quick re-read of the textbook pages.`, cta: 'Resume', mode: 'study', ...t })
    }
    // weak result
    if (status === 'weak') {
      push({ kind: 'weak', priority: 80 + (WEAK_PCT - pct) / 6, title: `Revisit ${label(st)}`,
        reason: `Your last quiz score here was ${pct}%. Re-read the textbook pages, then try again.`, cta: 'Review topic', mode: 'study', ...target(st, sectionFor(st)) })
    }
    // studied but never checked
    if (!st.lastResult && st.seconds >= 600 && idle <= 14) {
      push({ kind: 'quiz', priority: 66, title: `Check yourself: ${label(st)}`,
        reason: `You have studied this for ${Math.round(st.seconds / 60)} minutes but have no quiz result yet.`, cta: 'Take a quiz', mode: 'quiz', ...t })
    }
    // mistakes
    const n = st.open.length
    if (n) {
      const questions = new Map()
      for (const m of st.open) questions.set(lc(m.question), (questions.get(lc(m.question)) || 0) + 1)
      const repeated = [...questions.values()].some(c => c > 1)
      if (n >= 3 || repeated) {
        push({ kind: 'mistakes', priority: 72 + Math.min(18, n * 2) + (repeated ? 6 : 0), title: `Retry ${n} mistake${n === 1 ? '' : 's'} in ${label(st)}`,
          reason: repeated ? 'Some of these questions have gone wrong more than once — targeted review will help most.' : 'Your saved mistakes here are ready to be retried.',
          cta: 'Retry mistakes', mode: 'mistakes', ...target(st) })
      }
    }
    // spaced review for passed units that have gone quiet
    if (status === 'passed' && idle >= 14 && idle !== Infinity) {
      push({ kind: 'review', priority: 40 + Math.min(20, (idle - 14) / 2), title: `Refresh ${label(st)}`,
        reason: `You passed this ${Math.round(idle)} days ago — a quick review keeps it fresh.`, cta: 'Quick review', mode: 'study', ...t })
    }
  }

  // foundations of the weakest units (explicit, source-backed relations only)
  const weakest = [...stat.values()].filter(st => statusOf(st) === 'weak').sort((a, b) => (a.lastResult.percentage - b.lastResult.percentage)).slice(0, 3)
  for (const st of weakest) {
    let related = []
    try { related = getRelatedTopics(st.row.subject, st.row.grade, st.row.unit.title, null) } catch { related = [] }
    for (const rel of related.filter(r => r.navigable && r.similarityScore === 100 && /prereq|foundation|earlier|builds/i.test(`${r.relationship} ${r.reason}`)).slice(0, 1)) {
      const row = byKey.get(unitKey(rel.targetSubject, rel.targetGrade, rel.targetUnitId))
      if (!row) continue
      const tst = stat.get(unitKey(row.subject, row.grade, row.unit.id))
      if (tst && statusOf(tst) === 'passed') continue
      push({ kind: 'prerequisite', priority: 74, title: `Revisit a foundation: ${row.subject} Grade ${row.grade}, ${row.unit.title}`,
        reason: `It supports ${st.row.unit.title}, where your last score was ${Math.round(st.lastResult.percentage)}%. ${rel.reason || ''}`.trim(), cta: 'Open foundation', mode: 'study',
        subject: row.subject, subjectId: row.subjectId, grade: row.grade, unitId: row.unit.id, unitTitle: row.unit.title, sectionId: null, sectionTitle: null })
    }
  }

  // next section in the curriculum: continue the subject/grade the student touched most recently
  const recent = [...stat.values()].filter(st => st.lastActivity).sort((a, b) => String(b.lastActivity).localeCompare(String(a.lastActivity)))[0]
  if (recent) {
    const list = units.filter(u => u.subject === recent.row.subject && u.grade === recent.row.grade).sort((a, b) => a.order - b.order)
    const next = list.find(u => u.order > recent.row.order && statusOf(stat.get(unitKey(u.subject, u.grade, u.unit.id)) || { seconds: 0, results: [], lastResult: null }) !== 'passed')
    if (next && statusOf(recent) === 'passed') {
      const nst = stat.get(unitKey(next.subject, next.grade, next.unit.id)) || { row: next, seconds: 0, results: [], open: [] }
      push({ kind: 'next', priority: 60, title: `Start ${label(nst)}`, reason: `You passed ${recent.row.unit.title}. This is the next unit in ${next.subject}, Grade ${next.grade}.`,
        cta: 'Start unit', mode: 'study', ...target(nst) })
    }
  }

  // brand-new student: gentle starting points, no invented history
  if (!hasEvidence) {
    const g = Number(grade) || 9
    for (const name of CORE_SUBJECTS) {
      const subj = subjects.find(s => s.name === name)
      const first = subj && units.filter(u => u.subject === name && u.grade === g).sort((a, b) => a.order - b.order)[0]
      if (!first) continue
      push({ kind: 'start', priority: 50 - CORE_SUBJECTS.indexOf(name), title: `Begin ${name}, Grade ${g}`,
        reason: `Start with Unit ${first.unit.number ?? 1}: ${first.unit.title}. Read the textbook pages, then take a short quiz.`, cta: 'Start studying', mode: 'study',
        subject: name, subjectId: first.subjectId, grade: g, unitId: first.unit.id, unitTitle: first.unit.title, sectionId: null, sectionTitle: null })
    }
  }

  // ---------- pick a manageable list ----------
  actions.sort((a, b) => b.priority - a.priority)
  const seen = new Set()
  const picked = []
  for (const a of actions) {
    const group = `${a.mode === 'mistakes' ? 'm' : 's'}|${unitKey(a.subject, a.grade, a.unitId)}`
    if (seen.has(group)) continue
    seen.add(group)
    picked.push({ ...a, priority: Math.round(a.priority) })
    if (picked.length >= 4) break
  }

  // ---------- study time, streak, mission ----------
  const perDay = {}
  for (const s of sessions) perDay[s.date] = (perDay[s.date] || 0) + (Number(s.duration_seconds) || 0)
  const todaySeconds = perDay[todayKey] || 0
  const weekly = Array.from({ length: 7 }, (_, i) => {
    const key = dayKey(now.getTime() - (6 - i) * DAY_MS)
    return { date: key, seconds: perDay[key] || 0 }
  })
  let streak = 0
  for (let i = todaySeconds >= 300 ? 0 : 1; i < 400; i += 1) {
    if ((perDay[dayKey(now.getTime() - i * DAY_MS)] || 0) >= 300) streak += 1
    else break
  }
  const quizzesToday = results.filter(r => String(r.created_at).startsWith(todayKey)).length
  const retestsToday = allMistakes.filter(m => String(m.last_retested_at || '').startsWith(todayKey)).length
  const passedUnits = [...stat.values()].filter(st => statusOf(st) === 'passed').length
  const totalSeconds = sessions.reduce((a, s) => a + (Number(s.duration_seconds) || 0), 0)

  const mission = [
    { id: 'study', label: 'Study for 20 minutes', done: todaySeconds >= 1200, progress: Math.min(1, todaySeconds / 1200) },
    { id: 'practice', label: 'Complete a quiz', done: quizzesToday > 0, progress: quizzesToday > 0 ? 1 : 0 },
    openMistakes.length || retestsToday
      ? { id: 'review', label: 'Retry your mistakes', done: retestsToday > 0, progress: retestsToday > 0 ? 1 : 0 }
      : { id: 'review', label: 'Study one new section', done: todaySeconds >= 2400, progress: Math.min(1, todaySeconds / 2400) }
  ]

  const step = (value, ladder) => ladder.find(x => x > value) ?? null
  const milestones = [
    { id: 'hours', unit: 'hours studied', value: totalSeconds / 3600, next: step(totalSeconds / 3600, [1, 5, 10, 25, 50, 100, 200]) },
    { id: 'units', unit: 'units passed', value: passedUnits, next: step(passedUnits, [1, 3, 5, 10, 20, 40]) },
    { id: 'streak', unit: 'day streak', value: streak, next: step(streak, [3, 7, 14, 30, 60]) }
  ]

  return {
    generatedAt: now.toISOString(),
    isNewStudent: !hasEvidence,
    actions: picked,
    mission,
    streak,
    today_seconds: todaySeconds,
    weekly,
    stats: { totalSeconds, passedUnits, quizzes: results.length, openMistakes: openMistakes.length, masteredMistakes: allMistakes.length - openMistakes.length },
    milestones,
    unitStatus
  }
}
