import { useState, useEffect, useRef } from 'react'
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
} from '../data/data'
import { COMPANIES, COMPANY_LABELS, describeSource } from '../data/companies'
import { getSolution } from '../data/solutions'
import { readDoneState, markDone, markUndone } from '../data/categories'
import { useUrlParam, buildShareUrl } from '../utils/urlState'

const ALL = [
  ...codingChallenges, ...codingQuestions, ...dynamicProgrammingChallenges,
  ...jsChallenges, ...goChallenges, ...pythonChallenges, ...rustChallenges,
  ...tsChallenges, ...reactChallenges, ...devopsChallenges,
  ...designChallenges, ...securityChallenges, ...sqlChallenges, ...archChallenges,
  ...solidityChallenges, ...puzzleChallenges, ...algoChallenges, ...dbAdvancedChallenges,
  ...debuggingChallenges, ...bashChallenges, ...mathChallenges,
  ...aiChallenges, ...mpcChallenges,
  ...apiDesignChallenges, ...incidentChallenges, ...patternsChallenges,
  ...backendChallenges, ...frontendChallenges, ...fullstackChallenges, ...nodeChallenges,
]

const GROUPS = [
  {
    label: 'Coding', items: [
      { id: 'coding', label: 'Coding Problems', icon: '💻', count: codingChallenges.length, data: codingChallenges },
      { id: 'dsa',    label: 'DSA Patterns', icon: '🧩', count: codingQuestions.length, data: codingQuestions },
      { id: 'dp',     label: 'Dynamic Programming', icon: '🧠', count: dynamicProgrammingChallenges.length, data: dynamicProgrammingChallenges },
      { id: 'algo',   label: 'Advanced Algorithms', icon: '📐', count: algoChallenges.length, data: algoChallenges },
    ]
  },
  {
    label: 'Languages', items: [
      { id: 'js',     label: 'JavaScript', icon: '🟨', count: jsChallenges.length,     data: jsChallenges },
      { id: 'ts',     label: 'TypeScript', icon: '🔷', count: tsChallenges.length,     data: tsChallenges },
      { id: 'node',   label: 'Node.js',    icon: '🟩', count: nodeChallenges.length,   data: nodeChallenges },
      { id: 'react',  label: 'React',      icon: '⚛️', count: reactChallenges.length,  data: reactChallenges },
      { id: 'python', label: 'Python',     icon: '🐍', count: pythonChallenges.length, data: pythonChallenges },
      { id: 'go',     label: 'Golang',     icon: '🔵', count: goChallenges.length,     data: goChallenges },
      { id: 'rust',   label: 'Rust',       icon: '🦀', count: rustChallenges.length,   data: rustChallenges },
    ]
  },
  {
    label: 'Specializations', items: [
      { id: 'backend',   label: 'Backend Dev',   icon: '🛠️', count: backendChallenges.length,   data: backendChallenges },
      { id: 'frontend',  label: 'Frontend Dev',  icon: '🎨', count: frontendChallenges.length,  data: frontendChallenges },
      { id: 'fullstack', label: 'Fullstack Dev', icon: '🔁', count: fullstackChallenges.length, data: fullstackChallenges },
    ]
  },
  {
    label: 'Engineering', items: [
      { id: 'devops',    label: 'DevOps',       icon: '⚙️',  count: devopsChallenges.length,   data: devopsChallenges },
      { id: 'bash',      label: 'Bash & Shell', icon: '🐚',  count: bashChallenges.length,      data: bashChallenges },
      { id: 'security',  label: 'Security',     icon: '🔒',  count: securityChallenges.length,  data: securityChallenges },
      { id: 'sql',       label: 'SQL & DB',     icon: '🗄️', count: sqlChallenges.length,        data: sqlChallenges },
      { id: 'dbadv',     label: 'DB Advanced',  icon: '🔬',  count: dbAdvancedChallenges.length, data: dbAdvancedChallenges },
      { id: 'arch',      label: 'Architecture', icon: '🏗️', count: archChallenges.length,      data: archChallenges },
      { id: 'design',    label: 'System Design',icon: '📋',  count: designChallenges.length,    data: designChallenges },
      { id: 'apidesign', label: 'API Design',   icon: '🌐',  count: apiDesignChallenges.length, data: apiDesignChallenges },
      { id: 'patterns',  label: 'Design Patterns', icon: '🎨', count: patternsChallenges.length, data: patternsChallenges },
      { id: 'oncall',    label: 'On-Call / Incidents', icon: '🚨', count: incidentChallenges.length, data: incidentChallenges },
      { id: 'debugging', label: 'Debugging',    icon: '🐛',  count: debuggingChallenges.length, data: debuggingChallenges },
      { id: 'math',      label: 'Math & ML',    icon: '🔢',  count: mathChallenges.length,      data: mathChallenges },
    ]
  },
  {
    label: 'Emerging Tech', items: [
      { id: 'solidity', label: 'Solidity', icon: '💎', count: solidityChallenges.length, data: solidityChallenges },
      { id: 'ai',       label: 'AI / Prompting', icon: '🤖', count: aiChallenges.length, data: aiChallenges },
      { id: 'mpc',      label: 'MPC & Distributed', icon: '🔗', count: mpcChallenges.length, data: mpcChallenges },
      { id: 'puzzle',   label: 'Logic Puzzles', icon: '🧩', count: puzzleChallenges.length, data: puzzleChallenges },
    ]
  },
]

function looksLikeCode(text) {
  const codePatterns = [
    /^\s*(function|const|let|var|class|import|export|for|if|while|return|async|await)\b/m,
    /[{};]\s*$/m,
    /=>/,
    /\w+\s*\(.*\)\s*[{;]/,
    /^\s{2,}/m,
  ]
  return codePatterns.some(p => p.test(text))
}

// Render inline code: backtick spans, .method(), Type(), and common code tokens
function renderInline(text) {
  const parts = []
  // Match: `backtick content`, .method(), standalone() calls, PascalCase types, snake_case
  const re = /`([^`]+)`|(\.[a-zA-Z_]\w*\(\w*\))|([A-Za-z_]\w*\(\))|(\b(?:async|await|null|undefined|true|false|this|new|typeof|instanceof|void|delete|in|of|const|let|var|function|class|return|throw|try|catch|finally|import|export|default|extends|implements|interface|type|enum|public|private|protected|static|readonly|override|abstract|super)\b)/g
  let last = 0, m
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const matched = m[1] ?? m[2] ?? m[3] ?? m[4]
    parts.push(
      <code key={m.index} style={{
        fontFamily: 'monospace',
        fontSize: '0.88em',
        background: 'rgba(124,106,255,0.15)',
        color: 'var(--accent)',
        borderRadius: '3px',
        padding: '1px 5px',
        border: '1px solid rgba(124,106,255,0.2)',
      }}>{matched}</code>
    )
    last = re.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function renderText(text) {
  if (!text) return null
  const paragraphs = text.split(/\n\n+/)
  return paragraphs.map((para, i) => {
    if (looksLikeCode(para)) {
      return (
        <pre key={i} style={{
          background: 'rgba(0,0,0,0.35)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '6px',
          padding: '10px 14px',
          fontFamily: 'monospace',
          fontSize: '13px',
          lineHeight: '1.6',
          whiteSpace: 'pre-wrap',
          overflowX: 'auto',
          margin: '8px 0',
          color: 'var(--text)',
        }}>{para}</pre>
      )
    }
    return (
      <p key={i} style={{ margin: '4px 0', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{renderInline(para)}</p>
    )
  })
}

function ChallengeItem({ ch, forceOpen, onOpened }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const rowRef = useRef(null)
  useEffect(() => {
    if (forceOpen) {
      setOpen(true)
      rowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      onOpened?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceOpen])
  const [done, setDone] = useState(() => !!readDoneState(ch))

  const copyLink = (e) => {
    e.stopPropagation()
    const url = buildShareUrl('challenges', { q: `${ch.lang}-${ch.id}` })
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }).catch(() => {})
    }
  }

  const toggleDone = (e) => {
    e.stopPropagation()
    const newVal = !done
    setDone(newVal)
    if (newVal) markDone(ch)
    else markUndone(ch)
  }

  const diffClass = ch.diff === 'easy' ? 'badge-easy' : ch.diff === 'medium' ? 'badge-medium' : 'badge-hard'
  const langMap = {
    JS:'badge-accent',Go:'badge-green',Python:'badge-python',Rust:'badge-rust',
    TS:'badge-ts',ZK:'badge-zk',DevOps:'badge-devops',
    Design:'badge-design',Security:'badge-security',SQL:'badge-sql',Arch:'badge-arch',
    Solidity:'badge-solidity', DP: 'badge-accent',
    Puzzle: 'badge-medium', Algo: 'badge-ts',
    MongoDB: 'badge-green', React: 'badge-accent', Code: 'badge-accent',
    AI: 'badge-ai', 'Math/ML': 'badge-math', MPC: 'badge-zk',
    DSA: 'badge-accent', Debugging: 'badge-security', Bash: 'badge-devops',
    API: 'badge-design', OnCall: 'badge-security', Pattern: 'badge-arch',
    Backend: 'badge-arch', Frontend: 'badge-design', Fullstack: 'badge-accent', Node: 'badge-green',
  }
  return (
    <div ref={rowRef} className={`challenge-item${open?' expanded':''}${done?' done':''}${forceOpen?' highlighted':''}`} style={{ opacity: done ? 0.7 : 1, transition: 'opacity 0.2s' }}>
      <div className="ch-row" onClick={() => setOpen(v=>!v)} style={{ cursor: 'pointer' }}>
        <div 
          onClick={toggleDone}
          style={{
            marginRight: '12px',
            width: '22px',
            height: '22px',
            borderRadius: '6px',
            border: done ? '2px solid #10b981' : '2px solid rgba(255,255,255,0.2)',
            background: done ? '#10b981' : 'rgba(0,0,0,0.2)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'all 0.2s',
            flexShrink: 0
          }}
          title={done ? "Mark as incomplete" : "Mark as done"}
          onMouseEnter={(e) => { if(!done) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)' }}
          onMouseLeave={(e) => { if(!done) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
        >
          {done ? '✓' : ''}
        </div>
        <span className="ch-num" style={{ textDecoration: done ? 'line-through' : 'none' }}>#{ch.id}</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0 }}>
          <span className="ch-title" style={{ textDecoration: done ? 'line-through' : 'none' }}>{ch.title}</span>
          {ch.lang === 'Puzzle' && !open && (
            <span style={{ fontSize: '12px', color: 'var(--text2)', lineHeight: '1.4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {ch.problem.length > 120 ? ch.problem.slice(0, 120) + '…' : ch.problem}
            </span>
          )}
        </div>
        <span className={`badge ${langMap[ch.lang]||'badge-accent'}`}>{ch.lang}</span>
        <span className={`badge ${diffClass}`}>{ch.diff}</span>
        {ch.companies?.length > 0 && (
          <span style={{display:'flex', gap:'4px', flexWrap:'wrap'}}>
            {ch.companies.map(co => (
              <span key={co} className={`badge company-${co}`} title={`${COMPANY_LABELS[co] ?? co}\nSource: ${describeSource(ch.source)}`}>{COMPANY_LABELS[co] ?? co}</span>
            ))}
          </span>
        )}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text2)', fontFamily: 'monospace' }}>
            ⏱ {ch.diff === 'easy' ? '15m' : ch.diff === 'medium' ? '30m' : '45m'}
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text2)' }}>
            {open ? '▲' : '▼'}
          </span>
        </div>
      </div>
      {open && (
        <div className="ch-detail show">
          <div className="ch-detail-grid">
            <div style={{gridColumn: '1/-1', marginBottom: '8px', display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap: '12px'}}>
              <div className="ch-detail-label" style={{fontSize:'12px', color:'var(--accent)', fontWeight:'700'}}>Problem Statement</div>
              <button
                className="ch-share-btn"
                onClick={copyLink}
                title="Copy a shareable link to this challenge"
              >
                {copied ? '✓ Copied' : '🔗 Copy link'}
              </button>
            </div>
            <div style={{gridColumn: '1/-1', marginBottom: '8px'}}>
              <div className="ch-detail-val" style={{fontSize:'15px', lineHeight:'1.6', marginTop:'4px'}}>{renderText(ch.problem)}</div>
            </div>
            <div>
              <div className="ch-detail-label">Concepts</div>
              <div className="ch-detail-val">{ch.concepts.split(', ').map(c=><span key={c} className="tag">{c}</span>)}</div>
            </div>
            <div style={{gridColumn:'1/-1'}}><div className="ch-detail-label">Why It Matters</div><div className="ch-detail-val">{ch.why}</div></div>
            {ch.examples && (
              <div style={{gridColumn:'1/-1', marginTop: '4px'}}>
                <div className="ch-detail-label" style={{color: 'var(--accent3)'}}>Examples, Edge Cases & Test Scenarios</div>
                <div className="ch-detail-val" style={{fontFamily: 'monospace', whiteSpace: 'pre-wrap', background: 'var(--code-bg)', padding: '12px', borderRadius: '6px', fontSize: '13px', lineHeight: '1.5'}}>{ch.examples}</div>
              </div>
            )}
            {ch.testInputs && (
              <div style={{gridColumn:'1/-1', marginTop: '4px'}}>
                <div className="ch-detail-label" style={{color: 'var(--accent4)'}}>Test Inputs, Answers & Edge Cases</div>
                <div className="ch-detail-val" style={{fontFamily: 'monospace', whiteSpace: 'pre-wrap', background: 'var(--code-bg)', padding: '12px', borderRadius: '6px', fontSize: '13px', lineHeight: '1.5'}}>{ch.testInputs}</div>
              </div>
            )}
            {ch.explanation && (
              <div style={{gridColumn:'1/-1', marginTop: '12px', borderTop: '1px solid var(--border)', paddingTop: '12px'}}>
                <div className="ch-detail-label" style={{color: 'var(--text-muted)'}}>Key Takeaway / Explanation</div>
                <div className="ch-detail-val" style={{color: 'var(--text)', fontSize: '14px', lineHeight: '1.5'}}>{renderText(ch.explanation)}</div>
              </div>
            )}
            {(() => {
              const solution = getSolution(ch)
              if (!solution) return null
              return (
                <div style={{gridColumn:'1/-1', marginTop: '12px', borderTop: '1px solid var(--border)', paddingTop: '12px'}}>
                  <div className="ch-detail-label" style={{color: 'var(--easy)'}}>Reference Implementation (JavaScript)</div>
                  <pre style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '12.5px',
                    lineHeight: '1.55',
                    background: 'var(--code-bg)',
                    border: '1px solid var(--border)',
                    padding: '14px 16px',
                    borderRadius: '6px',
                    overflowX: 'auto',
                    whiteSpace: 'pre',
                    color: 'var(--text)',
                    margin: '8px 0 0',
                  }}>{solution}</pre>
                </div>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Challenges({ navIntent, clearNavIntent }) {
  const [active, setActive] = useUrlParam('cat', 'all')
  const [diff, setDiff] = useUrlParam('diff', 'all')
  const [company, setCompany] = useUrlParam('co', 'all')
  const [qParam, setQParam] = useUrlParam('q', '')
  const [catOpen, setCatOpen] = useState(false)
  const [coOpen, setCoOpen] = useState(false)
  const [hasScrolledToQ, setHasScrolledToQ] = useState(false)

  // Parse `q=Lang-Id` into a target challenge for auto-expand.
  const targetChallenge = (() => {
    if (!qParam || hasScrolledToQ) return null
    const sepIdx = qParam.indexOf('-')
    if (sepIdx === -1) return null
    const lang = qParam.slice(0, sepIdx)
    const id = parseInt(qParam.slice(sepIdx + 1), 10)
    if (Number.isNaN(id)) return null
    return { id, lang }
  })()

  const activeCatItem = active === 'all' ? null : GROUPS.flatMap(g => g.items).find(i => i.id === active)

  // Legacy nav-intent path (still used if anything pushes intent without going through URL).
  // Now mostly redundant since SearchModal navigation writes URL params via App.navigate.
  useEffect(() => {
    if (!navIntent) return
    if (navIntent.category) setActive(navIntent.category)
    if (navIntent.diff) setDiff(navIntent.diff)
    clearNavIntent?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navIntent])

  // q stays in the URL after auto-scroll for shareability.
  // hasScrolledToQ prevents re-scrolling on every render after the initial open.

  const dataset = active === 'all' ? ALL : GROUPS.flatMap(g=>g.items).find(i=>i.id===active)?.data || []
  const filtered = dataset
    .filter(c => diff === 'all' || c.diff === diff)
    .filter(c => {
      if (company === 'all') return true
      if (company === 'untagged') return !c.companies?.length
      return c.companies?.includes(company)
    })

  const taggedTotal = ALL.reduce((n,c) => n + (c.companies?.length ? 1 : 0), 0)

  const companyLabelForChip =
    company === 'all' ? null :
    company === 'untagged' ? 'Untagged' :
    COMPANY_LABELS[company]
  const anyFilterActive = active !== 'all' || diff !== 'all' || company !== 'all'

  return (
    <div>
      <div className="section-title">Engineering Challenges</div>
      <div className="section-subtitle">{ALL.length} challenges across {GROUPS.reduce((n,g)=>n+g.items.length,0)} topics</div>

      {/* Compact filter bar — single row by default */}
      <div className="cmp-filter-bar">
        <button
          className={`cmp-chip${active==='all' && !catOpen ? ' active' : ''}`}
          onClick={() => { setActive('all'); setCatOpen(false) }}
          title="Show all challenges"
        >
          🌐 All {ALL.length}
        </button>

        {activeCatItem ? (
          <button
            className="cmp-chip cmp-chip-active"
            onClick={() => setActive('all')}
            title="Clear category filter"
          >
            <span>{activeCatItem.icon}</span>
            <span>{activeCatItem.label}</span>
            <span className="cmp-chip-count">{activeCatItem.count}</span>
            <span className="cmp-chip-x">✕</span>
          </button>
        ) : (
          <button
            className={`cmp-chip${catOpen ? ' open' : ''}`}
            onClick={() => setCatOpen(o => !o)}
          >
            🎯 Browse categories <span className="cmp-chip-chevron">{catOpen ? '▴' : '▾'}</span>
          </button>
        )}

        <span className="cmp-divider" />

        <span className="cmp-label">Difficulty</span>
        {['all','easy','medium','hard'].map(f => (
          <button
            key={f}
            className={`cmp-pill${diff === f ? ' active' : ''}`}
            onClick={() => setDiff(f)}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}

        <span className="cmp-divider" />

        {company !== 'all' ? (
          <button
            className="cmp-chip cmp-chip-active"
            onClick={() => setCompany('all')}
            title="Clear company filter"
          >
            <span>🏢 {companyLabelForChip}</span>
            <span className="cmp-chip-x">✕</span>
          </button>
        ) : (
          <button
            className={`cmp-chip${coOpen ? ' open' : ''}`}
            onClick={() => setCoOpen(o => !o)}
          >
            🏢 Company <span className="cmp-chip-chevron">{coOpen ? '▴' : '▾'}</span>
          </button>
        )}

        {anyFilterActive && (
          <button
            className="cmp-reset"
            onClick={() => { setActive('all'); setDiff('all'); setCompany('all'); setCatOpen(false); setCoOpen(false) }}
          >
            Reset
          </button>
        )}
      </div>

      {/* Expandable category panel */}
      {catOpen && (
        <div className="cat-groups cmp-expand">
          {GROUPS.map(g => (
            <div key={g.label} className="cat-group">
              <div className="cat-group-label">{g.label}</div>
              <div className="cat-group-items">
                {g.items.map(item => (
                  <button
                    key={item.id}
                    className={`cat-pill${active === item.id ? ' active' : ''}`}
                    onClick={() => { setActive(item.id); setCatOpen(false) }}
                  >
                    <span className="cat-pill-icon">{item.icon}</span>
                    <span className="cat-pill-name">{item.label}</span>
                    <span className="cat-pill-count">{item.count}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Expandable company panel */}
      {coOpen && company === 'all' && (
        <div className="cmp-expand cmp-company-row">
          {COMPANIES.map(co => {
            const count = dataset.filter(c => c.companies?.includes(co)).length
            return (
              <button
                key={co}
                className="cmp-pill"
                onClick={() => { setCompany(co); setCoOpen(false) }}
              >
                {COMPANY_LABELS[co]} <span className="cmp-pill-count">{count}</span>
              </button>
            )
          })}
          <button
            className="cmp-pill"
            onClick={() => { setCompany('untagged'); setCoOpen(false) }}
          >
            Untagged <span className="cmp-pill-count">{dataset.filter(c => !c.companies?.length).length}</span>
          </button>
        </div>
      )}

      <div className="cmp-summary">
        Showing <strong>{filtered.length}</strong> challenge{filtered.length!==1?'s':''} · {taggedTotal} of {ALL.length} questions have a company citation
      </div>

      <div className="challenge-list">
        {filtered.map(ch => {
          const matched = targetChallenge && targetChallenge.id === ch.id && targetChallenge.lang === ch.lang
          return (
            <ChallengeItem
              key={`${ch.lang}-${ch.id}`}
              ch={ch}
              forceOpen={matched}
              onOpened={matched ? () => setHasScrolledToQ(true) : undefined}
            />
          )
        })}
      </div>
    </div>
  )
}
