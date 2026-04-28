// Questions can be a bare string (legacy) or { q, companies?: string[] } (new).
// Use these helpers everywhere a question is rendered so both shapes work.

export function questionText(q) {
  return typeof q === 'string' ? q : q?.q ?? ''
}

export function questionCompanies(q) {
  return typeof q === 'string' ? [] : (q?.companies ?? [])
}

export function questionKey(q) {
  return questionText(q)
}
