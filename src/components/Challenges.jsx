import { useState } from 'react'
import {
  jsChallenges, goChallenges, pythonChallenges, rustChallenges,
  reactChallenges, devopsChallenges, designChallenges,
  tsChallenges, securityChallenges, sqlChallenges, archChallenges,
  solidityChallenges, dynamicProgrammingChallenges,
  puzzleChallenges, algoChallenges, dbAdvancedChallenges,
  codingChallenges
} from '../data/data'

const ALL = [
  ...codingChallenges, ...dynamicProgrammingChallenges,
  ...jsChallenges, ...goChallenges, ...pythonChallenges, ...rustChallenges,
  ...tsChallenges, ...reactChallenges, ...devopsChallenges,
  ...designChallenges, ...securityChallenges, ...sqlChallenges, ...archChallenges,
  ...solidityChallenges, ...puzzleChallenges, ...algoChallenges, ...dbAdvancedChallenges
]

const GROUPS = [
  {
    label: 'Coding', items: [
      { id: 'coding', label: 'Coding Problems', icon: '💻', count: codingChallenges.length, data: codingChallenges },
      { id: 'dp',     label: 'Dynamic Programming', icon: '🧠', count: dynamicProgrammingChallenges.length, data: dynamicProgrammingChallenges },
      { id: 'algo',   label: 'Advanced Algorithms', icon: '📐', count: algoChallenges.length, data: algoChallenges },
    ]
  },
  {
    label: 'Languages', items: [
      { id: 'js',     label: 'JavaScript', icon: '🟨', count: jsChallenges.length,     data: jsChallenges },
      { id: 'ts',     label: 'TypeScript', icon: '🔷', count: tsChallenges.length,     data: tsChallenges },
      { id: 'react',  label: 'React',      icon: '⚛️', count: reactChallenges.length,  data: reactChallenges },
      { id: 'python', label: 'Python',     icon: '🐍', count: pythonChallenges.length, data: pythonChallenges },
      { id: 'go',     label: 'Golang',     icon: '🔵', count: goChallenges.length,     data: goChallenges },
      { id: 'rust',   label: 'Rust',       icon: '🦀', count: rustChallenges.length,   data: rustChallenges },
    ]
  },
  {
    label: 'Engineering', items: [
      { id: 'devops',   label: 'DevOps',      icon: '⚙️',  count: devopsChallenges.length,   data: devopsChallenges },
      { id: 'security', label: 'Security',    icon: '🔒',  count: securityChallenges.length,  data: securityChallenges },
      { id: 'sql',      label: 'SQL & DB',    icon: '🗄️', count: sqlChallenges.length,       data: sqlChallenges },
      { id: 'dbadv',    label: 'DB Advanced', icon: '🔬',  count: dbAdvancedChallenges.length, data: dbAdvancedChallenges },
      { id: 'arch',     label: 'Architecture',icon: '🏗️', count: archChallenges.length,      data: archChallenges },
      { id: 'design',   label: 'System Design',icon: '📋', count: designChallenges.length,    data: designChallenges },
    ]
  },
  {
    label: 'Emerging Tech', items: [
      { id: 'solidity', label: 'Solidity', icon: '💎', count: solidityChallenges.length, data: solidityChallenges },
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
          color: '#e2e8f0',
        }}>{para}</pre>
      )
    }
    return (
      <p key={i} style={{ margin: '4px 0', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{para}</p>
    )
  })
}

function ChallengeItem({ ch }) {
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(() => {
    try {
      return localStorage.getItem(`challenge-done-${ch.lang}-${ch.id}`) === 'true'
    } catch {
      return false
    }
  })

  const toggleDone = (e) => {
    e.stopPropagation()
    const newVal = !done
    setDone(newVal)
    try {
      if (newVal) localStorage.setItem(`challenge-done-${ch.lang}-${ch.id}`, 'true')
      else localStorage.removeItem(`challenge-done-${ch.lang}-${ch.id}`)
    } catch (err) {}
  }

  const diffClass = ch.diff === 'easy' ? 'badge-easy' : ch.diff === 'medium' ? 'badge-medium' : 'badge-hard'
  const langMap = {
    JS:'badge-accent',Go:'badge-green',Python:'badge-python',Rust:'badge-rust',
    TS:'badge-ts',ZK:'badge-zk',DevOps:'badge-devops',
    Design:'badge-design',Security:'badge-security',SQL:'badge-sql',Arch:'badge-arch',
    Solidity:'badge-solidity', DP: 'badge-accent',
    Puzzle: 'badge-medium', Algo: 'badge-ts',
    MongoDB: 'badge-green', React: 'badge-accent', Code: 'badge-accent'
  }
  return (
    <div className={`challenge-item${open?' expanded':''}${done?' done':''}`} style={{ opacity: done ? 0.7 : 1, transition: 'opacity 0.2s' }}>
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
            <div style={{gridColumn: '1/-1', marginBottom: '8px'}}>
              <div className="ch-detail-label" style={{fontSize:'12px', color:'var(--accent)', fontWeight:'700'}}>Problem Statement</div>
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
                <div className="ch-detail-val" style={{fontFamily: 'monospace', whiteSpace: 'pre-wrap', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '6px', fontSize: '13px', lineHeight: '1.5'}}>{ch.examples}</div>
              </div>
            )}
            {ch.testInputs && (
              <div style={{gridColumn:'1/-1', marginTop: '4px'}}>
                <div className="ch-detail-label" style={{color: 'var(--accent4)'}}>Test Inputs, Answers & Edge Cases</div>
                <div className="ch-detail-val" style={{fontFamily: 'monospace', whiteSpace: 'pre-wrap', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '6px', fontSize: '13px', lineHeight: '1.5'}}>{ch.testInputs}</div>
              </div>
            )}
            {ch.explanation && (
              <div style={{gridColumn:'1/-1', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px'}}>
                <div className="ch-detail-label" style={{color: '#a0aec0'}}>Key Takeaway / Explanation</div>
                <div className="ch-detail-val" style={{color: '#e2e8f0', fontSize: '14px', lineHeight: '1.5'}}>{renderText(ch.explanation)}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Challenges() {
  const [active, setActive] = useState('all')
  const [diff, setDiff] = useState('all')

  const dataset = active === 'all' ? ALL : GROUPS.flatMap(g=>g.items).find(i=>i.id===active)?.data || []
  const filtered = diff === 'all' ? dataset : dataset.filter(c=>c.diff===diff)

  return (
    <div>
      <div className="section-title">Engineering Challenges</div>
      <div className="section-subtitle">{ALL.length} challenges across 12 topics · Click a category to filter</div>

      {/* ALL button */}
      <div style={{marginBottom:'8px'}}>
        <button
          className={`tab-btn${active==='all'?' active':''}`}
          style={{fontSize:'13px',padding:'6px 18px'}}
          onClick={()=>setActive('all')}
        >
          🌐 All {ALL.length}
        </button>
      </div>

      {/* Grouped category pills */}
      <div className="cat-groups">
        {GROUPS.map(g=>(
          <div key={g.label} className="cat-group">
            <div className="cat-group-label">{g.label}</div>
            <div className="cat-group-items">
              {g.items.map(item=>(
                <button
                  key={item.id}
                  className={`cat-pill${active===item.id?' active':''}`}
                  onClick={()=>setActive(item.id)}
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

      {/* Difficulty filter */}
      <div className="filter-bar" style={{marginTop:'16px'}}>
        {['all','easy','medium','hard'].map(f=>(
          <button key={f} className={`filter-btn${diff===f?' active':''}`} onClick={()=>setDiff(f)}>
            {f.charAt(0).toUpperCase()+f.slice(1)}
            {f!=='all' && <span style={{marginLeft:'4px',opacity:.6,fontSize:'11px'}}>
              ({dataset.filter(c=>c.diff===f).length})
            </span>}
          </button>
        ))}
      </div>

      <div style={{color:'var(--text-muted)',fontSize:'13px',marginBottom:'12px'}}>
        Showing {filtered.length} challenge{filtered.length!==1?'s':''}
      </div>

      <div className="challenge-list">
        {filtered.map(ch=><ChallengeItem key={`${ch.lang}-${ch.id}`} ch={ch}/>)}
      </div>
    </div>
  )
}
