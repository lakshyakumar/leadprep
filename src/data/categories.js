// Shared category structure used by Challenges, Progress, and Mock.
// Single source of truth for "which arrays make up which user-facing groups."

import {
  jsChallenges, goChallenges, pythonChallenges, rustChallenges,
  reactChallenges, devopsChallenges, designChallenges,
  tsChallenges, securityChallenges, sqlChallenges, archChallenges,
  solidityChallenges, dynamicProgrammingChallenges,
  puzzleChallenges, algoChallenges, dbAdvancedChallenges,
  codingChallenges, codingQuestions, debuggingChallenges,
  bashChallenges, mathChallenges, aiChallenges, mpcChallenges,
  apiDesignChallenges, incidentChallenges, patternsChallenges,
  backendChallenges, frontendChallenges, fullstackChallenges, nodeChallenges,
} from './data'

export const CHALLENGE_GROUPS = [
  {
    label: 'Coding', items: [
      { id: 'coding', label: 'Coding Problems',     icon: '💻', data: codingChallenges },
      { id: 'dsa',    label: 'DSA Patterns',        icon: '🧩', data: codingQuestions },
      { id: 'dp',     label: 'Dynamic Programming', icon: '🧠', data: dynamicProgrammingChallenges },
      { id: 'algo',   label: 'Advanced Algorithms', icon: '📐', data: algoChallenges },
    ],
  },
  {
    label: 'Languages', items: [
      { id: 'js',     label: 'JavaScript', icon: '🟨', data: jsChallenges },
      { id: 'ts',     label: 'TypeScript', icon: '🔷', data: tsChallenges },
      { id: 'node',   label: 'Node.js',    icon: '🟩', data: nodeChallenges },
      { id: 'react',  label: 'React',      icon: '⚛️', data: reactChallenges },
      { id: 'python', label: 'Python',     icon: '🐍', data: pythonChallenges },
      { id: 'go',     label: 'Golang',     icon: '🔵', data: goChallenges },
      { id: 'rust',   label: 'Rust',       icon: '🦀', data: rustChallenges },
    ],
  },
  {
    label: 'Specializations', items: [
      { id: 'backend',    label: 'Backend Dev',    icon: '🛠️', data: backendChallenges },
      { id: 'frontend',   label: 'Frontend Dev',   icon: '🎨', data: frontendChallenges },
      { id: 'fullstack',  label: 'Fullstack Dev',  icon: '🔁', data: fullstackChallenges },
    ],
  },
  {
    label: 'Engineering', items: [
      { id: 'devops',    label: 'DevOps',              icon: '⚙️',  data: devopsChallenges },
      { id: 'bash',      label: 'Bash & Shell',         icon: '🐚',  data: bashChallenges },
      { id: 'security',  label: 'Security',             icon: '🔒',  data: securityChallenges },
      { id: 'sql',       label: 'SQL & DB',             icon: '🗄️', data: sqlChallenges },
      { id: 'dbadv',     label: 'DB Advanced',          icon: '🔬',  data: dbAdvancedChallenges },
      { id: 'arch',      label: 'Architecture',         icon: '🏗️', data: archChallenges },
      { id: 'design',    label: 'System Design',        icon: '📋',  data: designChallenges },
      { id: 'apidesign', label: 'API Design',           icon: '🌐',  data: apiDesignChallenges },
      { id: 'patterns',  label: 'Design Patterns',      icon: '🎨',  data: patternsChallenges },
      { id: 'oncall',    label: 'On-Call / Incidents',  icon: '🚨',  data: incidentChallenges },
      { id: 'debugging', label: 'Debugging',            icon: '🐛',  data: debuggingChallenges },
      { id: 'math',      label: 'Math & ML',            icon: '🔢',  data: mathChallenges },
    ],
  },
  {
    label: 'Emerging Tech', items: [
      { id: 'solidity', label: 'Solidity',           icon: '💎', data: solidityChallenges },
      { id: 'ai',       label: 'AI / Prompting',     icon: '🤖', data: aiChallenges },
      { id: 'mpc',      label: 'MPC & Distributed',  icon: '🔗', data: mpcChallenges },
      { id: 'puzzle',   label: 'Logic Puzzles',      icon: '🧩', data: puzzleChallenges },
    ],
  },
]

// Flat array of all challenges, used by "All" filter and search.
export const ALL_CHALLENGES = CHALLENGE_GROUPS.flatMap(g => g.items.flatMap(i => i.data))

// Flat list of all category items, used to look up a category by id.
export const ALL_CATEGORIES = CHALLENGE_GROUPS.flatMap(g => g.items.map(i => ({ ...i, group: g.label })))

// localStorage key for tracking done state, kept here so producers + consumers agree.
export function challengeDoneKey(ch) {
  return `challenge-done-${ch.lang}-${ch.id}`
}

// Storage format:
//   - new entries: numeric timestamp as string, e.g. "1700000000000"
//   - legacy entries: literal "true" (no timestamp; treated as ancient)
// Both shapes mean "done"; only the timestamp lets us compute review staleness.

export function readDoneState(ch) {
  try {
    const v = localStorage.getItem(challengeDoneKey(ch))
    if (!v) return null
    if (v === 'true') return { done: true, doneAt: 0 }      // legacy — eligible for review
    const n = parseInt(v, 10)
    if (Number.isNaN(n)) return null
    return { done: true, doneAt: n }
  } catch {
    return null
  }
}

export function markDone(ch) {
  try { localStorage.setItem(challengeDoneKey(ch), String(Date.now())) } catch {}
}

export function markUndone(ch) {
  try { localStorage.removeItem(challengeDoneKey(ch)) } catch {}
}

// Snapshot of all done states. Returns { 'challenge-done-X-Y': {done, doneAt} }.
export function readAllDoneStates() {
  const map = {}
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (!k || !k.startsWith('challenge-done-')) continue
      const v = localStorage.getItem(k)
      if (!v) continue
      if (v === 'true') { map[k] = { done: true, doneAt: 0 }; continue }
      const n = parseInt(v, 10)
      if (!Number.isNaN(n)) map[k] = { done: true, doneAt: n }
    }
  } catch {}
  return map
}

// A challenge is "due for review" if it was completed >= REVIEW_THRESHOLD_MS ago.
// Legacy entries (doneAt === 0) are always due, since we don't know when they were done.
export const REVIEW_THRESHOLD_MS = 7 * 24 * 60 * 60 * 1000   // 7 days
export function isDueForReview(state, now = Date.now()) {
  if (!state || !state.done) return false
  return (now - state.doneAt) >= REVIEW_THRESHOLD_MS
}
