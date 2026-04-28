import { useState, useEffect, useMemo, useRef } from 'react'
import { CHALLENGE_GROUPS, ALL_CHALLENGES, challengeDoneKey } from '../data/categories'
import { COMPANIES, COMPANY_LABELS } from '../data/companies'

const DIFFS = ['any', 'easy', 'medium', 'hard']
const TIME_BUDGET = { easy: 15 * 60, medium: 30 * 60, hard: 45 * 60 }

function fmtTime(s) {
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${r.toString().padStart(2, '0')}`
}

function pickRandom(pool, exceptKey) {
  if (pool.length === 0) return null
  if (pool.length === 1) return pool[0]
  // try to avoid repeating the immediately-previous one
  for (let i = 0; i < 5; i++) {
    const next = pool[Math.floor(Math.random() * pool.length)]
    if (`${next.lang}-${next.id}` !== exceptKey) return next
  }
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function Mock() {
  const [category, setCategory] = useState('any')
  const [diff, setDiff] = useState('any')
  const [company, setCompany] = useState('any')

  const [current, setCurrent] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)

  const [history, setHistory] = useState([]) // {challenge, seconds, marked: 'done'|'skip'}
  const tickRef = useRef(null)

  const allCategoryItems = useMemo(() => CHALLENGE_GROUPS.flatMap(g => g.items.map(i => ({ ...i, group: g.label }))), [])

  const pool = useMemo(() => {
    let p = ALL_CHALLENGES
    if (category !== 'any') p = p.filter(c => allCategoryItems.find(i => i.id === category)?.data.includes(c))
    if (diff !== 'any') p = p.filter(c => c.diff === diff)
    if (company !== 'any') p = p.filter(c => c.companies?.includes(company))
    return p
  }, [category, diff, company, allCategoryItems])

  useEffect(() => {
    if (!running) return
    tickRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => { if (tickRef.current) clearInterval(tickRef.current) }
  }, [running])

  const start = () => {
    const c = pickRandom(pool, null)
    if (!c) return
    setCurrent(c)
    setRevealed(false)
    setSeconds(0)
    setRunning(true)
  }

  const next = (markedAs) => {
    if (current) {
      setHistory(h => [...h, { challenge: current, seconds, marked: markedAs }])
      if (markedAs === 'done') {
        try { localStorage.setItem(challengeDoneKey(current), 'true') } catch {}
      }
    }
    const c = pickRandom(pool, current ? `${current.lang}-${current.id}` : null)
    setCurrent(c)
    setRevealed(false)
    setSeconds(0)
    setRunning(!!c)
  }

  const endSession = () => {
    if (current) {
      setHistory(h => [...h, { challenge: current, seconds, marked: revealed ? 'done' : 'skip' }])
    }
    setCurrent(null)
    setRunning(false)
    setSeconds(0)
  }

  const togglePause = () => setRunning(r => !r)

  const budget = current ? TIME_BUDGET[current.diff] ?? 30 * 60 : 0
  const overtime = budget && seconds > budget

  // --- Setup screen ---
  if (!current) {
    return (
      <div>
        <div className="section-title">Mock Interview Mode</div>
        <div className="section-subtitle">Random question · timer · reveal-on-click. Like a real interview round.</div>

        <div className="card" style={{marginBottom: 18, background: 'rgba(124,106,255,0.06)', borderColor: 'rgba(124,106,255,0.25)'}}>
          <div className="card-title">📌 How it works</div>
          <div className="card-body">
            Pick filters → click <strong>Start</strong> → the app shows a random question and starts a timer. Solve it (out loud, on paper, or in your IDE), then click <strong>Reveal solution</strong> to compare. Mark it done or skip to the next one.
          </div>
        </div>

        <div className="mock-setup">
          <div className="mock-setup-row">
            <label>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="mock-select">
              <option value="any">Any category</option>
              {CHALLENGE_GROUPS.map(g => (
                <optgroup key={g.label} label={g.label}>
                  {g.items.map(i => <option key={i.id} value={i.id}>{i.icon} {i.label} ({i.data.length})</option>)}
                </optgroup>
              ))}
            </select>
          </div>
          <div className="mock-setup-row">
            <label>Difficulty</label>
            <div className="mock-pill-group">
              {DIFFS.map(d => (
                <button key={d} className={`mock-pill${diff === d ? ' active' : ''}`} onClick={() => setDiff(d)}>{d === 'any' ? 'Any' : d}</button>
              ))}
            </div>
          </div>
          <div className="mock-setup-row">
            <label>Company</label>
            <div className="mock-pill-group">
              <button className={`mock-pill${company === 'any' ? ' active' : ''}`} onClick={() => setCompany('any')}>Any</button>
              {COMPANIES.filter(c => c !== 'other').map(co => (
                <button key={co} className={`mock-pill${company === co ? ' active' : ''}`} onClick={() => setCompany(co)}>{COMPANY_LABELS[co]}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="mock-pool">
          <span className="mock-pool-count">{pool.length}</span> question{pool.length === 1 ? '' : 's'} match your filters
        </div>

        <button className="mock-start" onClick={start} disabled={pool.length === 0}>
          ▶ Start Mock Round
        </button>

        {history.length > 0 && (
          <div className="mock-history">
            <div className="roadmap-sub-label" style={{marginBottom: 8}}>Last session ({history.length} questions)</div>
            <ul className="qs-list">
              {history.map((h, i) => (
                <li key={i}>
                  <span className={`badge ${h.marked === 'done' ? 'badge-easy' : 'badge-medium'}`} style={{marginRight: 8}}>{h.marked}</span>
                  {h.challenge.title} <span style={{color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: 12}}>· {h.challenge.lang} · {fmtTime(h.seconds)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  // --- Question screen ---
  return (
    <div>
      <div className="mock-header">
        <div>
          <div className="section-title" style={{marginBottom: 4}}>Mock Round</div>
          <div className="section-subtitle">Question {history.length + 1} · {pool.length} in pool</div>
        </div>
        <div className={`mock-timer${overtime ? ' overtime' : ''}`}>
          <div className="mock-timer-label">{overtime ? 'overtime' : 'elapsed'}</div>
          <div className="mock-timer-value">{fmtTime(seconds)}</div>
          <div className="mock-timer-budget">budget {fmtTime(budget)}</div>
        </div>
      </div>

      <div className="mock-question">
        <div className="mock-q-meta">
          <span className="badge badge-accent">{current.lang}</span>
          <span className={`badge ${current.diff === 'easy' ? 'badge-easy' : current.diff === 'medium' ? 'badge-medium' : 'badge-hard'}`}>{current.diff}</span>
          {current.companies?.map(co => (
            <span key={co} className={`badge company-${co}`}>{COMPANY_LABELS[co] ?? co}</span>
          ))}
        </div>
        <h2 className="mock-q-title">{current.title}</h2>
        {current.concepts && (
          <div className="mock-q-concepts">{current.concepts.split(', ').map(c => <span key={c} className="tag">{c}</span>)}</div>
        )}
        <div className="mock-q-problem">
          <div className="ch-detail-label" style={{color: 'var(--accent)', fontSize: 12, marginBottom: 6}}>Problem</div>
          <pre style={{whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: 15, lineHeight: 1.7, margin: 0, color: 'var(--text)'}}>{current.problem}</pre>
        </div>
      </div>

      {!revealed && (
        <>
          <div className="mock-think-prompt">
            Try to solve it first — out loud, on paper, or in your IDE. Then reveal hints, worked examples, and edge cases to compare your approach.
          </div>
          <div className="mock-actions">
            <button className="mock-reveal" onClick={() => setRevealed(true)}>💡 Show hints &amp; examples</button>
            <button className="mock-skip" onClick={() => next('skip')}>⤳ Skip · next question</button>
            <button className="mock-pause" onClick={togglePause}>{running ? '⏸ Pause' : '▶ Resume'}</button>
            <button className="mock-end" onClick={endSession}>■ End session</button>
          </div>
        </>
      )}

      {revealed && (
        <>
          <div className="mock-reveal-banner">
            <strong>Hints &amp; worked examples below.</strong> No reference implementation — write your own and compare against the approach + edge cases.
          </div>
          <div className="mock-solution">
            {current.why && (
              <div className="mock-solution-block">
                <div className="ch-detail-label">Why It Matters</div>
                <div className="ch-detail-val">{current.why}</div>
              </div>
            )}
            {current.examples && (
              <div className="mock-solution-block">
                <div className="ch-detail-label" style={{color: 'var(--accent3)'}}>Worked Examples</div>
                <pre style={{fontFamily: 'monospace', fontSize: 13, whiteSpace: 'pre-wrap', background: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 6, lineHeight: 1.5}}>{current.examples}</pre>
              </div>
            )}
            {current.testInputs && (
              <div className="mock-solution-block">
                <div className="ch-detail-label" style={{color: 'var(--accent4)'}}>Edge Cases to Consider</div>
                <pre style={{fontFamily: 'monospace', fontSize: 13, whiteSpace: 'pre-wrap', background: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 6, lineHeight: 1.5}}>{current.testInputs}</pre>
              </div>
            )}
            {current.explanation && (
              <div className="mock-solution-block">
                <div className="ch-detail-label" style={{color: '#a0aec0'}}>Approach / Key Takeaway</div>
                <div className="ch-detail-val">{current.explanation}</div>
              </div>
            )}
          </div>

          <div className="mock-actions">
            <button className="mock-done" onClick={() => next('done')}>✓ Mark done · next question</button>
            <button className="mock-skip" onClick={() => next('skip')}>⤳ Skip · next question</button>
            <button className="mock-end" onClick={endSession}>■ End session</button>
          </div>
        </>
      )}
    </div>
  )
}
