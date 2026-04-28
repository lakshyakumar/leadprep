export const COMPANIES = ['meta', 'google', 'amazon', 'apple', 'netflix', 'microsoft', 'other']

export const COMPANY_LABELS = {
  meta: 'Meta',
  google: 'Google',
  amazon: 'Amazon',
  apple: 'Apple',
  netflix: 'Netflix',
  microsoft: 'Microsoft',
  other: 'Other',
}

// Human-readable label for the `source` field on a tagged challenge.
// Used in tooltips so users can see WHY a question is tagged with a given company.
export function describeSource(source) {
  if (!source) return 'No source cited yet'
  if (source === 'community') return 'Community-known: aggregated from LeetCode company tags + Glassdoor / Blind / levels.fyi reports'
  if (source === 'manual')    return 'Manually verified from a specific interview report'
  if (source === 'leetcode')  return 'Tagged via LeetCode company tag page'
  if (source === 'glassdoor') return 'From a Glassdoor interview report'
  if (source === 'blind')     return 'From a Blind interview report'
  if (typeof source === 'string' && source.startsWith('http')) return source
  return source
}
