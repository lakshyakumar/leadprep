import {
  jsChallenges, goChallenges, pythonChallenges, rustChallenges,
  reactChallenges, devopsChallenges, designChallenges,
  tsChallenges, securityChallenges, sqlChallenges, archChallenges,
  solidityChallenges, dynamicProgrammingChallenges,
  puzzleChallenges, algoChallenges, dbAdvancedChallenges,
  codingChallenges, codingQuestions, debuggingChallenges,
  bashChallenges, mathChallenges, aiChallenges, mpcChallenges,
  apiDesignChallenges, incidentChallenges, patternsChallenges,
  roadmapData, leadershipQuestions, leadershipTopics, icBehavioralQuestions,
} from '../data/data'

// Maps a challenge `lang` value to the category id used by Challenges.jsx GROUPS.
// Keep in sync with Challenges.jsx GROUPS array.
export const LANG_TO_CATEGORY = {
  Code: 'coding', DSA: 'dsa', DP: 'dp', Algo: 'algo',
  JS: 'js', TS: 'ts', React: 'react',
  Python: 'python', Go: 'go', Rust: 'rust',
  DevOps: 'devops', Bash: 'bash',
  Security: 'security', SQL: 'sql', MongoDB: 'dbadv',
  Arch: 'arch', Design: 'design', Debugging: 'debugging',
  'Math/ML': 'math', API: 'apidesign', OnCall: 'oncall',
  Pattern: 'patterns',
  Solidity: 'solidity', AI: 'ai', MPC: 'mpc',
  Puzzle: 'puzzle',
}

const CHALLENGE_ARRAYS = [
  codingChallenges, codingQuestions, dynamicProgrammingChallenges, algoChallenges,
  jsChallenges, tsChallenges, reactChallenges, pythonChallenges, goChallenges, rustChallenges,
  devopsChallenges, bashChallenges, securityChallenges, sqlChallenges,
  dbAdvancedChallenges, archChallenges, designChallenges, debuggingChallenges,
  mathChallenges, apiDesignChallenges, incidentChallenges, patternsChallenges,
  solidityChallenges, aiChallenges, mpcChallenges, puzzleChallenges,
]

function questionText(q) { return typeof q === 'string' ? q : q?.q ?? '' }

let cachedIndex = null

export function getSearchIndex() {
  if (cachedIndex) return cachedIndex
  const items = []

  for (const arr of CHALLENGE_ARRAYS) {
    for (const ch of arr) {
      items.push({
        kind: 'challenge',
        id: ch.id,
        lang: ch.lang,
        diff: ch.diff,
        title: ch.title,
        concepts: ch.concepts ?? '',
        category: LANG_TO_CATEGORY[ch.lang] ?? null,
        companies: ch.companies ?? [],
      })
    }
  }

  for (const item of roadmapData) {
    for (const q of item.questions ?? []) {
      items.push({
        kind: 'roadmap',
        title: questionText(q),
        section: item.title,
      })
    }
  }

  for (const cat of leadershipQuestions) {
    for (const q of cat.qs ?? []) {
      items.push({
        kind: 'behavioral',
        title: questionText(q),
        section: `Leadership · ${cat.category}`,
      })
    }
  }

  for (const topic of leadershipTopics) {
    for (const q of topic.questions ?? []) {
      items.push({
        kind: 'behavioral',
        title: questionText(q),
        section: `Leadership Topics · ${topic.topic}`,
      })
    }
  }

  for (const cat of icBehavioralQuestions) {
    for (const q of cat.qs ?? []) {
      items.push({
        kind: 'behavioral',
        title: questionText(q),
        section: `IC Behavioral · ${cat.category}`,
      })
    }
  }

  cachedIndex = items
  return items
}

export function search(query, limit = 25) {
  if (!query || query.trim().length < 2) return []
  const q = query.toLowerCase().trim()
  const tokens = q.split(/\s+/).filter(Boolean)
  const index = getSearchIndex()

  const scored = []
  for (const item of index) {
    const title = (item.title ?? '').toLowerCase()
    const concepts = (item.concepts ?? '').toLowerCase()
    const haystack = `${title} ${concepts}`

    // every token must appear somewhere
    let allMatch = true
    let score = 0
    for (const t of tokens) {
      if (!haystack.includes(t)) { allMatch = false; break }
      if (title.includes(t)) score += 10
      if (title.startsWith(t)) score += 8
      if (concepts.includes(t)) score += 3
    }
    if (!allMatch) continue

    // exact-phrase bonus
    if (title.includes(q)) score += 15
    if (title === q) score += 30

    scored.push({ item, score })
  }

  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map(s => s.item)
}
