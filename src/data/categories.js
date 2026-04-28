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
      { id: 'react',  label: 'React',      icon: '⚛️', data: reactChallenges },
      { id: 'python', label: 'Python',     icon: '🐍', data: pythonChallenges },
      { id: 'go',     label: 'Golang',     icon: '🔵', data: goChallenges },
      { id: 'rust',   label: 'Rust',       icon: '🦀', data: rustChallenges },
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
