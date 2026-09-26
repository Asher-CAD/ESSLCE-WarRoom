import test from 'node:test'
import assert from 'node:assert/strict'
import { buildPlan } from '../server/planner.js'
import { getCurriculumForSubject } from '../shared/curriculumMap.js'

const NOW = new Date('2026-09-24T10:00:00Z')
const ago = d => new Date(NOW.getTime() - d * 86400000).toISOString()
const subjects = ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology'].map((name, i) => ({ id: i + 1, name }))
const unitsOf = (name, g) => getCurriculumForSubject(name)[String(g)].units
const M = unitsOf('Mathematics', 10), P = unitsOf('Physics', 10)
let id = 1
const session = (subj, g, unit, secs, daysAgo, section = null) => ({ id: id++, subject_id: subjects.find(s => s.name === subj).id, grade: g, unit_id: unit.id, section_id: section, duration_seconds: secs, date: ago(daysAgo).split('T')[0], created_at: ago(daysAgo) })
const result = (subj, g, unit, pct, daysAgo) => ({ id: id++, subject_name: subj, grade: g, unit_id: unit.id, unit_title: unit.title, score: pct / 10, total: 10, percentage: pct, created_at: ago(daysAgo) })
const mistake = (subj, g, unit, q, extra = {}) => ({ id: id++, subject_name: subj, grade: g, unit_id: unit.id, unit_title: unit.title, question: q, created_at: ago(1), ...extra })
const plan = (data, opts) => buildPlan({ subjects, quiz_results: [], mistakes: [], study_sessions: [], ...data }, { now: NOW, ...opts })

test('new student: starting points only, no invented history', () => {
  const p = plan({}, { grade: 9 })
  assert.equal(p.isNewStudent, true)
  assert.ok(p.actions.length >= 3 && p.actions.every(a => a.kind === 'start' && a.grade === 9))
  assert.equal(p.streak, 0); assert.equal(p.today_seconds, 0)
})

test('recently studied, unfinished topic -> "continue" leads; the quiz nudge for the same unit is deduplicated', () => {
  const p = plan({ study_sessions: [session('Mathematics', 10, M[0], 1200, 0, M[0].sections?.[1]?.id)] })
  assert.equal(p.actions[0].kind, 'continue'); assert.equal(p.actions[0].unitId, M[0].id)
  assert.equal(p.actions[0].sectionId, M[0].sections?.[1]?.id ?? null)
  assert.equal(p.actions.filter(a => a.unitId === M[0].id).length, 1)
  assert.equal(p.unitStatus[`mathematics|10|${M[0].id}`].status, 'in_progress')
})

test('studied 15+ min but never quizzed, a few days ago -> quiz suggested when nothing more urgent', () => {
  const p = plan({ study_sessions: [session('Physics', 10, P[0], 900, 3)] })
  assert.ok(p.actions.some(a => a.kind === 'quiz' || a.kind === 'continue'))
})

test('weak student: low score is flagged, marked weak, and outranks a fresh start', () => {
  const p = plan({ quiz_results: [result('Mathematics', 10, M[0], 30, 2)], study_sessions: [session('Mathematics', 10, M[0], 900, 2)] })
  assert.equal(p.unitStatus[`mathematics|10|${M[0].id}`].status, 'weak')
  assert.ok(p.actions.some(a => a.kind === 'weak' || a.kind === 'continue'))
  assert.ok(p.actions[0].priority >= 80)
})

test('repeated mistakes -> targeted retry action; mastered mistakes stop counting', () => {
  const ms = [mistake('Physics', 10, P[1], 'What is Q?'), mistake('Physics', 10, P[1], 'what is q?'), mistake('Physics', 10, P[1], 'Other')]
  const p = plan({ mistakes: ms })
  const a = p.actions.find(x => x.kind === 'mistakes'); assert.ok(a); assert.equal(a.mode, 'mistakes'); assert.match(a.reason, /more than once/)
  const mastered = plan({ mistakes: ms.map(m => ({ ...m, mastered: true })) })
  assert.ok(!mastered.actions.some(x => x.kind === 'mistakes')); assert.equal(mastered.stats.openMistakes, 0)
})

test('completed topic: passed today -> next unit offered; passed long ago -> spaced review', () => {
  const fresh = plan({ quiz_results: [result('Mathematics', 10, M[0], 92, 0)], study_sessions: [session('Mathematics', 10, M[0], 1500, 0)] })
  const next = fresh.actions.find(a => a.kind === 'next'); assert.ok(next); assert.equal(next.unitId, M[1].id)
  assert.equal(fresh.unitStatus[`mathematics|10|${M[0].id}`].status, 'passed')
  const old = plan({ quiz_results: [result('Mathematics', 10, M[0], 92, 30)] })
  assert.ok(old.actions.some(a => a.kind === 'review'))
})

test('returning student after a long break is offered a way back in (not an empty dashboard)', () => {
  const p = plan({ study_sessions: [session('Physics', 10, P[0], 900, 25)] })
  assert.equal(p.actions[0].kind, 'resume')
})

test('legacy quiz results that only stored the unit title still map to the unit', () => {
  const r = { ...result('Mathematics', 10, M[0], 85, 1), unit_id: null }
  assert.equal(plan({ quiz_results: [r] }).unitStatus[`mathematics|10|${M[0].id}`].status, 'passed')
})

test('streak, weekly time and mission come from sessions/quizzes', () => {
  const p = plan({ study_sessions: [session('Mathematics', 10, M[0], 1300, 0), session('Mathematics', 10, M[0], 600, 1), session('Mathematics', 10, M[0], 600, 2), session('Mathematics', 10, M[0], 10, 4)],
                   quiz_results: [result('Mathematics', 10, M[0], 70, 0)] })
  assert.equal(p.streak, 3)
  assert.equal(p.weekly.length, 7); assert.equal(p.weekly[6].seconds, 1300)
  assert.equal(p.mission.find(m => m.id === 'study').done, true)
  assert.equal(p.mission.find(m => m.id === 'practice').done, true)
  assert.ok(p.actions.length <= 4)
})
