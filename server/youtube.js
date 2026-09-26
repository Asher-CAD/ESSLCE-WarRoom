import fs from 'node:fs'
import path from 'node:path'

// Tries every env var name in order. A missing/blank one is simply skipped —
// this powers multi-key rotation below, not just a single fallback name.
function readEnv(name) {
  if (process.env[name]) return String(process.env[name]).trim()
  const envPath = path.resolve(process.cwd(), '.env.youtube')
  if (!fs.existsSync(envPath)) return ''
  const line = fs.readFileSync(envPath, 'utf8').split(/\r?\n/).find(row => row.trim().startsWith(`${name}=`))
  if (!line) return ''
  return line.split('=').slice(1).join('=').trim().replace(/^['"]|['"]$/g, '')
}

const YOUTUBE_API_KEY_ENV_NAMES = ['YOUTUBE_API_KEY', 'YOUTUBE_API_KEY_1', 'YOUTUBE_API_KEY_2', 'YOUTUBE_API_KEY_3']

function getConfiguredYouTubeKeys() {
  return [...new Set(YOUTUBE_API_KEY_ENV_NAMES.map(readEnv).filter(Boolean))]
}

// Keys that hit their daily quota this server run. Cleared on restart, which
// lines up with when Google resets daily quota anyway.
const exhaustedYoutubeKeys = new Set()

async function fetchJson(url, timeoutMs = 20000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { accept: 'application/json' } })
    const text = await response.text()
    let data = null
    try { data = text ? JSON.parse(text) : null } catch { data = null }
    if (!response.ok) {
      const reason = data?.error?.errors?.[0]?.reason || ''
      const message = data?.error?.message || `YouTube API returned HTTP ${response.status}`
      const err = new Error(message)
      err.status = response.status
      err.quotaExceeded = response.status === 403 && (reason === 'quotaExceeded' || reason === 'dailyLimitExceeded' || /quota/i.test(message))
      throw err
    }
    return data || {}
  } finally {
    clearTimeout(timer)
  }
}

// Calls the YouTube Data API, trying each of the (up to 3) configured API
// keys in turn. A key that comes back quota-exceeded is marked exhausted for
// the rest of this server run and the next key is tried automatically — this
// is exactly what having YOUTUBE_API_KEY_1/2/3 in .env.youtube is for.
// `buildUrl(key)` must return the full request URL for that key.
async function fetchYouTubeApi(buildUrl) {
  const keys = getConfiguredYouTubeKeys()
  if (!keys.length) {
    throw new Error('YOUTUBE_API_KEY (or YOUTUBE_API_KEY_1/2/3) is missing from .env.youtube')
  }
  let lastError = null
  for (const key of keys) {
    if (exhaustedYoutubeKeys.has(key)) continue
    try {
      return await fetchJson(buildUrl(key))
    } catch (error) {
      if (error.quotaExceeded) {
        exhaustedYoutubeKeys.add(key)
        console.warn(`⚠️ A YouTube API key hit its daily quota — switching to the next configured key.`)
        lastError = error
        continue
      }
      throw error
    }
  }
  throw lastError || new Error('All configured YouTube API keys have hit their daily quota.')
}

// HARD RULE: every subject owns a separate explicit channel allow-list.
// Search requests always carry channelId, so results cannot leak across subjects.
const SUBJECT_CHANNELS = Object.freeze({
  Chemistry: [
    ['The Organic Chemistry Tutor', { channelId: 'UCEWpbFLzoYGPfuWUMFPSaoA' }],
    ['Khan Academy', { channelId: 'UC4a-Gbdw7vOaccHmFo40b9g' }],
    ['Professor Dave Explains', { channelId: 'UC0cd_-e49hZpWLH3UIwoWRA' }],
    ['Z Secret Training Institute', '@zsecrettraininginstitute'],
    ['Math and Science', { channelId: 'UCYgL81lc7DOLNhnel1_J6Vg' }],
  ],
  Mathematics: [
    ['Khan Academy', { channelId: 'UC4a-Gbdw7vOaccHmFo40b9g' }],
    ['3Blue1Brown', { channelId: 'UCYO_jab_esuFRV4b17AJtAw' }],
    ['Professor Leonard', { channelId: 'UCoHhuummRZaIVX7bD4t2czg' }],
    ['Professor Brian McLogan', { channelId: 'UCQv3dpUXUWvDFQarHrS5P9A' }],
    ['Z Secret Training Institute', '@zsecrettraininginstitute'],
    ['Math and Science', { channelId: 'UCYgL81lc7DOLNhnel1_J6Vg' }],
  ],
  Biology: [
    ['Khan Academy', { channelId: 'UC4a-Gbdw7vOaccHmFo40b9g' }],
    ['Bozeman Science', { channelId: 'UCEik-U3T6u6JA0XiHLbNbOw' }],
    ['CrashCourse Biology', { channelId: 'UCX6b17PVsYBQ0ip5gyeme-Q' }],
    ['AK Lectures', '@AKLECTURES'],
    ['Z Secret Training Institute', '@zsecrettraininginstitute'],
    ['Math and Science', { channelId: 'UCYgL81lc7DOLNhnel1_J6Vg' }],
  ],
  Physics: [
    ['Michel van Biezen', { channelId: 'UCiGxYawhEp4QyFcX0R60YdQ' }],
    ['Physics Videos by Eugene Khutoryansky', '@EugeneKhutoryansky'],
    ['Z Secret Training Institute', '@zsecrettraininginstitute'],
    ['Math and Science', { channelId: 'UCYgL81lc7DOLNhnel1_J6Vg' }],
  ],
  English: [
    ['BBC Learning English', '@bbclearningenglish'],
    ['English with Lucy', '@EnglishwithLucy'],
    ['EnglishClass101.com', '@EnglishClass101'],
    ['Accurate English', '@AccurateEnglish'],
    ['Z Secret Training Institute', '@zsecrettraininginstitute'],
    ['Math and Science', { channelId: 'UCYgL81lc7DOLNhnel1_J6Vg' }],
  ],
  'SAT (Aptitude)': [
    ['Z Secret Training Institute', '@zsecrettraininginstitute'],
    ['The Organic Chemistry Tutor', { channelId: 'UCEWpbFLzoYGPfuWUMFPSaoA' }],
    ['Khan Academy', { channelId: 'UC4a-Gbdw7vOaccHmFo40b9g' }],
  ],
})

const channelCache = new Map()

function normalizeSubject(subject) {
  const value = String(subject || '').trim().toLowerCase()
  if (value === 'math' || value === 'maths' || value === 'mathematics') return 'Mathematics'
  if (value === 'sat' || value === 'aptitude' || value === 'sat (aptitude)') return 'SAT (Aptitude)'
  if (value === 'english language' || value === 'english') return 'English'
  if (value === 'bio' || value === 'biology') return 'Biology'
  if (value === 'chem' || value === 'chemistry') return 'Chemistry'
  if (value === 'physics') return 'Physics'
  return Object.keys(SUBJECT_CHANNELS).find(k => k.toLowerCase() === value) || String(subject || '').trim()
}

function stripNumbering(value) {
  return String(value || '')
    .replace(/^\s*\d+[A-Za-z]?(?:\.\d+)*\s*/i, '')
    .replace(/^\s*\d+[A-Za-z]?\s*[-–:]\s*/i, '')
    .trim()
}

function cleanPhrase(value) {
  return stripNumbering(value)
    .replace(/\bGrade\s*\d+\b/gi, ' ')
    .replace(/\b(Unit|Chapter|Section)\s*\d+[A-Za-z]?\b/gi, ' ')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
}

// Words that carry no topic information. A title that merely contains "the"
// or "introduction" is not evidence that a video is about the selected topic.
const STOPWORDS = new Set([
  'a','an','and','or','the','of','to','in','on','for','with','from','by','at','as','is','are','be','into','using','use','how',
  'what','why','about','vs','part','unit','chapter','lesson','topic','section','introduction','intro','basic','basics','general',
  'overview','review','revision','skills','skill','development','activity','study','studies','grade','class','textbook',
  'english','physics','chemistry','biology','mathematics','maths','math'
])

function stem(word) {
  let w = String(word || '').toLowerCase()
  if (w.length > 5 && w.endsWith('ing')) w = w.slice(0, -3)
  else if (w.length > 4 && w.endsWith('es')) w = w.slice(0, -2)
  else if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) w = w.slice(0, -1)
  return w
}

function words(text) {
  return String(text || '').toLowerCase().replace(/[^a-z0-9+' -]+/g, ' ').replace(/'/g, '').split(/[\s-]+/).filter(Boolean)
}

// All tokens of the query (kept for the fallback when a query is nothing but
// generic words) and the significant ones that actually identify the topic.
function tokens(text) {
  return [...new Set(words(cleanPhrase(text)).filter(t => t.length >= 2))]
}

function significantTokens(text) {
  const all = tokens(text)
  const significant = all.filter(t => !STOPWORDS.has(t))
  return significant.length ? significant : all
}

function buildSearchQuery({ subject, chapter, section, query }) {
  const raw = cleanPhrase(query || section || chapter || subject)
  const sectionText = cleanPhrase(section)
  const chapterText = cleanPhrase(chapter)
  let topic = raw || sectionText || chapterText || subject

  // YouTube's q parameter is a normal query string, not an OR expression.
  // Keep it concise so the channelId filter does the channel restriction and
  // YouTube can use synonyms/semantic matching within that channel.
  if (topic.length > 90) topic = topic.slice(0, 90).trim()

  const lower = `${topic} ${sectionText}`.toLowerCase()
  if (subject === 'English') {
    const skill = [
      ['listening', 'English listening'],
      ['speaking', 'English speaking'],
      ['reading', 'English reading'],
      ['vocabulary', 'English vocabulary'],
      ['grammar', 'English grammar'],
      ['writing', 'English writing'],
    ].find(([needle]) => lower.includes(needle))
    if (skill && !lower.includes(skill[1].toLowerCase())) {
      topic = `${topic} ${skill[1]}`.trim()
    }
  }

  return topic.replace(/\s+/g, ' ').trim()
}

// Scores how strongly a video is about the requested topic and reports the
// evidence, so callers can require real topical overlap — not just "the video
// belongs to an approved channel".
function assessRelevance(video, query, channelRank = 0) {
  const topicTokens = significantTokens(query)
  const titleWords = words(video?.title)
  const titleStems = new Set(titleWords.map(stem))
  const tagWords = new Set((Array.isArray(video?.tags) ? video.tags : []).flatMap(words).map(stem))
  const descWords = new Set(words(String(video?.description || '').slice(0, 400)).map(stem))
  const matches = (stems, t) => {
    const st = stem(t)
    if (stems.has(st)) return true
    // prefix match for longer stems ("photosynthes" ~ "photosynthesis")
    return st.length >= 6 && [...stems].some(w => w.length >= 6 && (w.startsWith(st) || st.startsWith(w)))
  }

  let score = 0
  let strong = 0 // tokens found in title or tags
  for (const token of topicTokens) {
    if (matches(titleStems, token)) { score += 6; strong += 1 }
    else if (matches(tagWords, token)) { score += 3; strong += 1 }
    else if (matches(descWords, token)) score += 1
  }
  const phrase = tokens(query).join(' ')
  const titleLine = titleWords.join(' ')
  const phraseHit = phrase.length >= 5 && titleLine.includes(phrase)
  if (phraseHit) score += 8
  const coverage = topicTokens.length ? strong / topicTokens.length : 0
  // Small, bounded tie-breakers; can never outweigh a genuine topic match.
  score += Math.max(0, 0.25 - channelRank * 0.02)
  score += Math.min(1.5, Math.log10(1 + (Number(video?.viewCount) || 0)) / 4)

  // Eligible only with real topical evidence: the phrase itself, or enough of
  // the significant topic words in the title/tags. Short queries need every
  // word ("fluid flow" must not accept "The Fluid Mosaic Model"); longer ones
  // need at least half.
  const need = topicTokens.length <= 2 ? topicTokens.length : Math.ceil(topicTokens.length * 0.5)
  const eligible = phraseHit || (need > 0 && strong >= need)
  return { score, coverage, strong, eligible }
}

function relevanceScore(video, query, channelRank = 0) {
  return assessRelevance(video, query, channelRank).score
}

// A video needs at least this much relevance evidence before it is eligible
// to be shown at all, in addition to the coverage rule in assessRelevance().
const MIN_RELEVANCE_SCORE = 3

async function resolveChannel(channelName, reference) {
  const cacheKey = `${channelName}|${typeof reference === 'string' ? reference : reference.channelId}`
  if (channelCache.has(cacheKey)) return channelCache.get(cacheKey)

  if (reference && typeof reference === 'object' && reference.channelId) {
    const data = await fetchYouTubeApi(key =>
      `https://www.googleapis.com/youtube/v3/channels?${new URLSearchParams({ part: 'id,contentDetails', id: reference.channelId, key })}`
    )
    const channel = data.items?.[0]
    const value = { channelId: reference.channelId, uploadsPlaylistId: channel?.contentDetails?.relatedPlaylists?.uploads || null }
    channelCache.set(cacheKey, value)
    return value
  }

  const handle = String(reference || '').trim().replace(/^@/, '')
  if (!handle) throw new Error(`No YouTube handle configured for ${channelName}`)

  const data = await fetchYouTubeApi(key =>
    `https://www.googleapis.com/youtube/v3/channels?${new URLSearchParams({ part: 'id,contentDetails', forHandle: handle, key })}`
  )
  const channel = data.items?.[0]
  if (!channel?.id) throw new Error(`Could not resolve YouTube channel handle @${handle}`)

  const value = {
    channelId: channel.id,
    uploadsPlaylistId: channel.contentDetails?.relatedPlaylists?.uploads || null,
  }
  channelCache.set(cacheKey, value)
  return value
}

function toVideo(channelName, item, detail = null) {
  const snippet = detail?.snippet || item?.snippet || {}
  const status = detail?.status
  if (status?.embeddable === false) return null
  const videoId = detail?.id || item?.id?.videoId || item?.contentDetails?.videoId
  if (!videoId) return null
  return {
    videoId,
    title: snippet.title || 'Untitled video',
    description: snippet.description || '',
    tags: detail?.snippet?.tags || [],
    viewCount: Number(detail?.statistics?.viewCount) || 0,
    publishedAt: snippet.publishedAt || '',
    channelTitle: snippet.channelTitle || channelName,
    thumbnail: snippet.thumbnails?.medium?.url || snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || '',
    embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`,
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
    approvedChannel: channelName,
  }
}

async function fetchVideoDetails(ids) {
  if (!ids.length) return new Map()
  // "statistics" adds viewCount, used as a small popularity/quality signal in
  // relevanceScore below — real relevance still dominates the ranking.
  const data = await fetchYouTubeApi(key =>
    `https://www.googleapis.com/youtube/v3/videos?${new URLSearchParams({ part: 'snippet,status,statistics', id: ids.join(','), key })}`
  )
  return new Map((data.items || []).map(v => [v.id, v]))
}

async function searchChannelVideos(channelName, channelInfo, searchQuery, perChannel = 8) {
  const baseParams = {
    part: 'snippet',
    type: 'video',
    channelId: channelInfo.channelId,
    maxResults: String(Math.min(10, Math.max(1, perChannel))),
    q: searchQuery,
  }

  let searchItems = []

  // First pass: ask YouTube directly for embeddable videos in THIS channel.
  try {
    const data = await fetchYouTubeApi(key =>
      `https://www.googleapis.com/youtube/v3/search?${new URLSearchParams({ ...baseParams, videoEmbeddable: 'true', key })}`
    )
    searchItems = data.items || []
  } catch (error) {
    console.warn(`YouTube channel search failed for ${channelName}: ${error.message}`)
  }

  // Second pass: same exact channel, but without the embeddable search filter.
  // We then inspect videos.list(status) ourselves. This catches videos that
  // search.list may omit while still preventing non-embeddable videos from UI.
  if (searchItems.length === 0) {
    try {
      const data = await fetchYouTubeApi(key =>
        `https://www.googleapis.com/youtube/v3/search?${new URLSearchParams({ ...baseParams, key })}`
      )
      searchItems = data.items || []
    } catch (error) {
      console.warn(`YouTube unfiltered channel search failed for ${channelName}: ${error.message}`)
    }
  }

  let details = await fetchVideoDetails(searchItems.map(i => i.id?.videoId).filter(Boolean))
  let videos = searchItems
    .map(item => toVideo(channelName, item, details.get(item.id?.videoId)))
    .filter(Boolean)

  // Final fallback: inspect this channel's own uploads playlist only.
  if (videos.length === 0 && channelInfo.uploadsPlaylistId) {
    try {
      const playlistData = await fetchYouTubeApi(key =>
        `https://www.googleapis.com/youtube/v3/playlistItems?${new URLSearchParams({ part: 'snippet,contentDetails', playlistId: channelInfo.uploadsPlaylistId, maxResults: '50', key })}`
      )
      const ids = (playlistData.items || [])
        .map(item => item.contentDetails?.videoId)
        .filter(Boolean)
      details = await fetchVideoDetails(ids)
      const fallback = (playlistData.items || [])
        .map(item => toVideo(channelName, item, details.get(item.contentDetails?.videoId)))
        .filter(Boolean)
      fallback.sort((a, b) => relevanceScore(b, searchQuery) - relevanceScore(a, searchQuery))
      videos = fallback
    } catch (error) {
      console.warn(`Uploads fallback failed for ${channelName}: ${error.message}`)
    }
  }

  const seen = new Set()
  return videos.filter(video => {
    if (seen.has(video.videoId)) return false
    seen.add(video.videoId)
    return true
  }).slice(0, 8)
}

// ------------------------------------------------------------
// Result cache. Each topic search costs ~100 quota units per approved channel,
// so identical searches are served from a small file-backed cache instead of
// spending the daily quota again. Only successful, non-empty results are cached.
// ------------------------------------------------------------
const CACHE_FILE = path.resolve(process.cwd(), 'data', 'youtube-cache.json')
const CACHE_TTL_MS = 3 * 24 * 3600 * 1000
const CACHE_MAX = 300
let resultCache = null

function loadCache() {
  if (resultCache) return resultCache
  resultCache = new Map()
  try {
    const raw = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'))
    for (const [key, entry] of Object.entries(raw || {})) if (entry?.at && Date.now() - entry.at < CACHE_TTL_MS) resultCache.set(key, entry)
  } catch { /* no cache yet */ }
  return resultCache
}

function saveCache() {
  try {
    const entries = [...loadCache().entries()].sort((a, b) => b[1].at - a[1].at).slice(0, CACHE_MAX)
    fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true })
    fs.writeFileSync(CACHE_FILE, JSON.stringify(Object.fromEntries(entries)))
  } catch (error) { console.warn(`YouTube cache write failed: ${error.message}`) }
}

export async function searchYouTube(params = {}) {
  const subject = normalizeSubject(params.subject)
  const q = buildSearchQuery({ subject, chapter: params.chapter, section: params.section, query: params.query })
  const key = `${subject}|${q.toLowerCase()}|${Math.min(18, Math.max(1, Number(params.limit) || 6))}`
  const cache = loadCache()
  const hit = cache.get(key)
  if (hit && Date.now() - hit.at < CACHE_TTL_MS && !params.refresh) return { ...hit.result, cached: true }
  const result = await searchYouTubeUncached(params)
  if (result.success && result.videos?.length) {
    cache.set(key, { at: Date.now(), result })
    saveCache()
  }
  return result
}

async function searchYouTubeUncached({ subject, grade, chapter, section, query, limit = 6 } = {}) {
  const configuredKeys = getConfiguredYouTubeKeys()
  const normalizedSubject = normalizeSubject(subject)
  const approved = SUBJECT_CHANNELS[normalizedSubject] || []
  const searchQuery = buildSearchQuery({ subject: normalizedSubject, chapter, section, query })

  if (!configuredKeys.length) {
    return { success: false, configured: false, query: searchQuery, channels: approved.map(([name]) => name), videos: [], error: 'YOUTUBE_API_KEY (or YOUTUBE_API_KEY_1/2/3) is missing from .env.youtube' }
  }
  if (!approved.length) {
    return { success: false, configured: true, query: searchQuery, channels: [], videos: [], error: `No approved YouTube channels are configured for ${normalizedSubject || 'this subject'}` }
  }
  if (!searchQuery) {
    return { success: false, configured: true, query: '', channels: approved.map(([name]) => name), videos: [], error: 'No video topic was supplied' }
  }

  const maxResults = Math.min(18, Math.max(1, Number(limit) || 6))
  const channelDiagnostics = []
  const buckets = await Promise.all(approved.map(async ([channelName, channelReference], channelRank) => {
    try {
      const channelInfo = await resolveChannel(channelName, channelReference)
      const videos = await searchChannelVideos(channelName, channelInfo, searchQuery, 8)
      const scored = videos.map(video => {
        const assessed = assessRelevance(video, searchQuery, channelRank)
        return { ...video, relevance: assessed.score, eligible: assessed.eligible }
      })
      channelDiagnostics.push({ channel: channelName, resolvedChannelId: channelInfo.channelId, count: scored.length })
      return { channelName, channelRank, videos: scored }
    } catch (error) {
      console.warn(`YouTube channel failed for ${channelName}: ${error.message}`)
      channelDiagnostics.push({ channel: channelName, error: error.message, count: 0 })
      return { channelName, channelRank, videos: [] }
    }
  }))

  // Pool every approved channel's videos together and rank by actual topic
  // relevance — NOT one-per-channel round robin. A channel with nothing
  // relevant to this topic simply contributes nothing; channel approval only
  // decides which videos were eligible to be searched, never which ones get
  // shown. Anything below MIN_RELEVANCE_SCORE (no real topic-token match) is
  // dropped entirely rather than shown as filler.
  const seen = new Set()
  const selected = buckets
    .flatMap(bucket => bucket.videos)
    .filter(video => video.eligible && video.relevance >= MIN_RELEVANCE_SCORE)
    .sort((a, b) => b.relevance - a.relevance)
    .filter(video => {
      if (seen.has(video.videoId)) return false
      seen.add(video.videoId)
      return true
    })
    .slice(0, maxResults)

  return {
    success: true,
    configured: true,
    query: searchQuery,
    subject: normalizedSubject,
    channels: approved.map(([name]) => name),
    diagnostics: channelDiagnostics,
    videos: selected.map(({ relevance, eligible, tags, ...video }) => video),
    error: selected.length ? null : 'No sufficiently relevant, embeddable videos were found on the approved channels for this exact topic.',
  }
}

export function getYouTubeSubjectChannels() {
  return Object.fromEntries(Object.entries(SUBJECT_CHANNELS).map(([subject, channels]) => [subject, channels.map(([name]) => name)]))
}
