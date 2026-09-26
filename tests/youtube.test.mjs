import test from 'node:test'
import assert from 'node:assert/strict'
process.env.YOUTUBE_API_KEY = 'yt-key'
const yt = await import('../server/youtube.js')

// Fake YouTube API: two channels return a mix of relevant and unrelated uploads.
const catalog = {
  UCEWpbFLzoYGPfuWUMFPSaoA: [ // organic chemistry tutor
    { id: 'v1', title: 'Bernoulli\'s Equation - Fluid Flow Explained', tags: ['fluid flow'], views: 900000 },
    { id: 'v2', title: 'How To Study For Exams - The Best Way', tags: [], views: 5000000 },
    { id: 'v3', title: 'The Fluid Mosaic Model of the Cell Membrane', tags: [], views: 100 },   // shares "fluid" only
  ],
  UC4a: [
    { id: 'v4', title: 'Introduction to the Periodic Table of Elements', tags: [], views: 800000 },
    { id: 'v5', title: 'Fluid flow and continuity equation', tags: [], views: 2000 },
  ]
}
globalThis.fetch = async (url) => {
  const u = new URL(url); const j = b => new Response(JSON.stringify(b), { status: 200, headers: { 'content-type': 'application/json' } })
  if (u.pathname.endsWith('/channels')) return j({ items: [{ id: u.searchParams.get('id') || 'UC4a', contentDetails: { relatedPlaylists: { uploads: 'UU' } } }] })
  if (u.pathname.endsWith('/search')) return j({ items: (catalog[u.searchParams.get('channelId')] || catalog.UC4a).map(v => ({ id: { videoId: v.id }, snippet: { title: v.title, description: '', channelTitle: 'C', thumbnails: {} } })) })
  if (u.pathname.endsWith('/videos')) {
    const all = Object.values(catalog).flat(); const ids = u.searchParams.get('id').split(',')
    return j({ items: ids.map(id => { const v = all.find(x => x.id === id); return { id, snippet: { title: v.title, description: '', tags: v.tags, channelTitle: 'C', thumbnails: {} }, status: { embeddable: id !== 'v5x' }, statistics: { viewCount: String(v.views) } } }) })
  }
  if (u.pathname.endsWith('/playlistItems')) return j({ items: [] })
  return new Response('{}', { status: 404 })
}

test('unrelated uploads from approved channels are rejected; only topical ones survive', async () => {
  const r = await yt.searchYouTube({ subject: 'Chemistry', chapter: 'Fluids', section: '3.4 Fluid flow', limit: 10, refresh: true })
  const ids = r.videos.map(v => v.videoId)
  assert.ok(ids.includes('v1') && ids.includes('v5'), 'topical videos kept: ' + ids)
  assert.ok(!ids.includes('v2'), 'study-tips video from approved channel must be dropped')
  assert.ok(!ids.includes('v4'), 'periodic table video must be dropped')
  assert.ok(!ids.includes('v3'), 'shares only "fluid" (1 of 2 topic words, no phrase) -> "fluid mosaic" must be dropped')
})

test('generic words alone ("the", "introduction") never make a video relevant', async () => {
  const r = await yt.searchYouTube({ subject: 'Chemistry', chapter: 'x', section: 'Introduction to the Periodic Table', limit: 10, refresh: true })
  const ids = r.videos.map(v => v.videoId)
  assert.deepEqual(ids.filter(i => i !== 'v4'), [], 'only the periodic-table video may match, got ' + ids)
})

test('nothing relevant -> empty list with an honest message (no filler)', async () => {
  const r = await yt.searchYouTube({ subject: 'Mathematics', chapter: 'Complex Numbers', section: 'De Moivre theorem', limit: 10, refresh: true })
  assert.equal(r.videos.length, 0); assert.match(r.error, /No sufficiently relevant/)
})

test('AccurateEnglish is an approved English channel; MIT OCW is not in Physics', () => {
  const ch = yt.getYouTubeSubjectChannels()
  assert.ok(ch.English.includes('Accurate English'))
  assert.ok(!ch.Physics.some(n => /MIT/i.test(n)))
})
