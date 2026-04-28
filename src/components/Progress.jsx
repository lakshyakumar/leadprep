import { useMemo } from 'react'
import { CHALLENGE_GROUPS, ALL_CHALLENGES, challengeDoneKey } from '../data/categories'

function readDone() {
  const map = {}
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && k.startsWith('challenge-done-') && localStorage.getItem(k) === 'true') {
        map[k] = true
      }
    }
  } catch {}
  return map
}

function ProgressBar({ pct, accent = 'var(--accent)' }) {
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${Math.round(pct * 100)}%`, background: accent }} />
    </div>
  )
}

export default function Progress({ onNavigate }) {
  const done = useMemo(readDone, [])

  const groupStats = useMemo(() => CHALLENGE_GROUPS.map(g => {
    const items = g.items.map(item => {
      const total = item.data.length
      const doneCount = item.data.filter(ch => done[challengeDoneKey(ch)]).length
      return { ...item, total, done: doneCount, pct: total ? doneCount / total : 0 }
    })
    const total = items.reduce((n, i) => n + i.total, 0)
    const doneCount = items.reduce((n, i) => n + i.done, 0)
    return { ...g, items, total, done: doneCount, pct: total ? doneCount / total : 0 }
  }), [done])

  const overallTotal = ALL_CHALLENGES.length
  const overallDone = ALL_CHALLENGES.filter(ch => done[challengeDoneKey(ch)]).length
  const overallPct = overallTotal ? overallDone / overallTotal : 0

  const taggedItems = ALL_CHALLENGES.filter(ch => ch.companies?.length > 0)
  const taggedDone = taggedItems.filter(ch => done[challengeDoneKey(ch)]).length
  const taggedPct = taggedItems.length ? taggedDone / taggedItems.length : 0

  // Weakest categories (have content, 0 done, sorted by size desc)
  const allItems = groupStats.flatMap(g => g.items)
  const weakest = allItems.filter(i => i.total > 0 && i.done === 0).sort((a, b) => b.total - a.total).slice(0, 5)
  const strongest = allItems.filter(i => i.total > 0 && i.pct > 0).sort((a, b) => b.pct - a.pct || b.done - a.done).slice(0, 5)

  return (
    <div>
      <div className="section-title">Your Progress</div>
      <div className="section-subtitle">Tracked locally · Click any category to jump back to it</div>

      <div className="progress-summary">
        <div className="progress-summary-card">
          <div className="progress-summary-label">Overall</div>
          <div className="progress-summary-num">{overallDone} <span className="progress-summary-total">/ {overallTotal}</span></div>
          <ProgressBar pct={overallPct} />
          <div className="progress-summary-pct">{Math.round(overallPct * 100)}% complete</div>
        </div>
        <div className="progress-summary-card">
          <div className="progress-summary-label">FAANG-tagged</div>
          <div className="progress-summary-num">{taggedDone} <span className="progress-summary-total">/ {taggedItems.length}</span></div>
          <ProgressBar pct={taggedPct} accent="var(--accent3)" />
          <div className="progress-summary-pct">{Math.round(taggedPct * 100)}% of company-tagged questions</div>
        </div>
      </div>

      {(weakest.length > 0 || strongest.length > 0) && (
        <div className="progress-callouts">
          {strongest.length > 0 && (
            <div className="progress-callout">
              <div className="progress-callout-title">💪 Strongest</div>
              <ul className="progress-callout-list">
                {strongest.map(i => (
                  <li key={i.id}>
                    <button className="progress-link" onClick={() => onNavigate('challenges', { category: i.id })}>
                      {i.icon} {i.label}
                    </button>
                    <span className="progress-callout-meta">{i.done}/{i.total} · {Math.round(i.pct * 100)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {weakest.length > 0 && (
            <div className="progress-callout">
              <div className="progress-callout-title">📉 Untouched (start here)</div>
              <ul className="progress-callout-list">
                {weakest.map(i => (
                  <li key={i.id}>
                    <button className="progress-link" onClick={() => onNavigate('challenges', { category: i.id })}>
                      {i.icon} {i.label}
                    </button>
                    <span className="progress-callout-meta">{i.total} questions</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="progress-groups">
        {groupStats.map(g => (
          <div className="progress-group" key={g.label}>
            <div className="progress-group-header">
              <span className="progress-group-label">{g.label}</span>
              <span className="progress-group-meta">{g.done}/{g.total} · {Math.round(g.pct * 100)}%</span>
            </div>
            <div className="progress-rows">
              {g.items.map(i => (
                <button
                  key={i.id}
                  className="progress-row"
                  onClick={() => onNavigate('challenges', { category: i.id })}
                  title="Jump to this category"
                >
                  <span className="progress-row-icon">{i.icon}</span>
                  <span className="progress-row-label">{i.label}</span>
                  <span className="progress-row-meta">{i.done}/{i.total}</span>
                  <ProgressBar pct={i.pct} />
                  <span className="progress-row-pct">{Math.round(i.pct * 100)}%</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
