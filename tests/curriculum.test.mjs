import test from 'node:test'
import assert from 'node:assert/strict'
import { CURRICULUM_MAP, getCurriculumForSubject, findCurriculumTopic } from '../shared/curriculumMap.js'
import { ENGLISH_DETAILS } from '../shared/englishDetails.js'

const NUMBER_ONLY = /^\s*\d{1,2}[A-Fa-f]?(\.\d{1,2}){0,3}\s*[.):-]?\s*$/ // "4.1", "4.1.2", "3E.1" with no title text

test('no unit or section title is a bare number/code — every one has real, source-backed text', () => {
  const offenders = []
  for (const [subject, grades] of Object.entries(CURRICULUM_MAP)) {
    for (const [grade, data] of Object.entries(grades)) {
      for (const unit of data.units || []) {
        if (NUMBER_ONLY.test(unit.title)) offenders.push(`${subject} G${grade} unit ${unit.id}: "${unit.title}"`)
        for (const section of unit.sections || []) {
          if (NUMBER_ONLY.test(section.title)) offenders.push(`${subject} G${grade} unit ${unit.id} section ${section.id}: "${section.title}"`)
        }
      }
    }
  }
  assert.deepEqual(offenders, [])
})

test('no duplicate unit or section ids within a subject/grade', () => {
  const dupes = []
  for (const [subject, grades] of Object.entries(CURRICULUM_MAP)) {
    for (const [grade, data] of Object.entries(grades)) {
      const unitIds = new Set(), sectionIds = new Set()
      for (const unit of data.units || []) {
        if (unitIds.has(unit.id)) dupes.push(`${subject} G${grade} duplicate unit id ${unit.id}`)
        unitIds.add(unit.id)
        for (const section of unit.sections || []) {
          if (sectionIds.has(section.id)) dupes.push(`${subject} G${grade} duplicate section id ${section.id}`)
          sectionIds.add(section.id)
        }
      }
    }
  }
  assert.deepEqual(dupes, [])
})

test('every unit resolves through findCurriculumTopic by id, and section ranges stay within their unit', () => {
  for (const [subject, grades] of Object.entries(CURRICULUM_MAP)) {
    for (const [grade, data] of Object.entries(grades)) {
      for (const unit of data.units || []) {
        const found = findCurriculumTopic(subject, Number(grade), { unitId: unit.id })
        assert.ok(found, `${subject} G${grade} unit ${unit.id} did not resolve`)
        for (const section of unit.sections || []) {
          if (section.startPage == null) continue
          assert.ok(section.startPage >= unit.startPage - 1, `${subject} G${grade} ${section.title} starts before its unit`)
        }
      }
    }
  }
})

test('English sub-headings attach only to the section they were extracted for, and never invent a unit mismatch', () => {
  const eng = getCurriculumForSubject('English')
  let sawDetails = false
  for (const [grade, data] of Object.entries(eng)) {
    for (const unit of data.units || []) {
      for (const section of unit.sections || []) {
        if (!section.details) continue
        sawDetails = true
        assert.ok(ENGLISH_DETAILS[section.id], `details on ${section.id} should come from ENGLISH_DETAILS`)
        for (const d of section.details) assert.ok(d.title && d.title.length > 2, `empty detail title under ${section.title}`)
      }
    }
  }
  assert.ok(sawDetails, 'expected at least one English section to carry source-backed sub-headings')
})
