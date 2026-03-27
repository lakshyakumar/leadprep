import { useState } from 'react'
import {
  jsChallenges, goChallenges, pythonChallenges, rustChallenges,
  aiChallenges, zkChallenges, devopsChallenges, designChallenges,
  tsChallenges, securityChallenges, sqlChallenges, archChallenges,
  solidityChallenges, mathChallenges
} from '../data/data'

const ALL = [
  ...jsChallenges, ...goChallenges, ...pythonChallenges, ...rustChallenges,
  ...tsChallenges, ...aiChallenges, ...zkChallenges, ...devopsChallenges,
  ...designChallenges, ...securityChallenges, ...sqlChallenges, ...archChallenges,
  ...solidityChallenges, ...mathChallenges
]

const GROUPS = [
  {
    label: 'Languages', items: [
      { id: 'js',     label: 'JavaScript', icon: '🟨', count: jsChallenges.length,     data: jsChallenges },
      { id: 'ts',     label: 'TypeScript', icon: '🔷', count: tsChallenges.length,     data: tsChallenges },
      { id: 'python', label: 'Python',     icon: '🐍', count: pythonChallenges.length, data: pythonChallenges },
      { id: 'go',     label: 'Golang',     icon: '🔵', count: goChallenges.length,     data: goChallenges },
      { id: 'rust',   label: 'Rust',       icon: '🦀', count: rustChallenges.length,   data: rustChallenges },
    ]
  },
  {
    label: 'Engineering', items: [
      { id: 'devops',    label: 'DevOps',       icon: '⚙️',  count: devopsChallenges.length,  data: devopsChallenges },
      { id: 'security',  label: 'Security',     icon: '🔒',  count: securityChallenges.length, data: securityChallenges },
      { id: 'sql',       label: 'SQL & DB',     icon: '🗄️', count: sqlChallenges.length,      data: sqlChallenges },
      { id: 'arch',      label: 'Architecture', icon: '📐',  count: archChallenges.length,     data: archChallenges },
    ]
  },
  {
    label: 'Emerging Tech', items: [
      { id: 'math',   label: 'Math & ML',      icon: '∑',  count: mathChallenges.length,  data: mathChallenges },
      { id: 'solidity',label: 'Solidity',      icon: '💎', count: solidityChallenges.length,  data: solidityChallenges },
      { id: 'ai',     label: 'AI & Prompts',   icon: '🤖', count: aiChallenges.length,    data: aiChallenges },
      { id: 'zk',     label: 'ZK Proofs',      icon: '🔐', count: zkChallenges.length,    data: zkChallenges },
      { id: 'design', label: 'System Design',  icon: '🏗️', count: designChallenges.length, data: designChallenges },
    ]
  },
]

function ChallengeItem({ ch }) {
  const [open, setOpen] = useState(false)
  const diffClass = ch.diff === 'easy' ? 'badge-easy' : ch.diff === 'medium' ? 'badge-medium' : 'badge-hard'
  const langMap = {
    JS:'badge-accent',Go:'badge-green',Python:'badge-python',Rust:'badge-rust',
    TS:'badge-ts',AI:'badge-ai',ZK:'badge-zk',DevOps:'badge-devops',
    Design:'badge-design',Security:'badge-security',SQL:'badge-sql',Arch:'badge-arch',
    Solidity:'badge-solidity', 'Math/ML':'badge-math'
  }
  return (
    <div className={`challenge-item${open?' expanded':''}`} onClick={() => setOpen(v=>!v)}>
      <div className="ch-row">
        <span className="ch-num">#{ch.id}</span>
        <span className="ch-title">{ch.title}</span>
        <span className={`badge ${langMap[ch.lang]||'badge-accent'}`}>{ch.lang}</span>
        <span className={`badge ${diffClass}`}>{ch.diff}</span>
      </div>
      {open && (
        <div className="ch-detail show">
          <div className="ch-detail-grid">
            <div><div className="ch-detail-label">Challenge</div><div className="ch-detail-val">{ch.problem}</div></div>
            <div>
              <div className="ch-detail-label">Concepts</div>
              <div className="ch-detail-val">{ch.concepts.split(', ').map(c=><span key={c} className="tag">{c}</span>)}</div>
            </div>
            <div style={{gridColumn:'1/-1'}}><div className="ch-detail-label">Why It Matters</div><div className="ch-detail-val">{ch.why}</div></div>
            {ch.examples && (
              <div style={{gridColumn:'1/-1', marginTop: '12px'}}>
                <div className="ch-detail-label">Examples / Test Scenarios</div>
                <div className="ch-detail-val" style={{fontFamily: 'monospace', whiteSpace: 'pre-wrap', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '6px', fontSize: '13px', lineHeight: '1.5'}}>{ch.examples}</div>
              </div>
            )}
            {ch.testInputs && (
              <div style={{gridColumn:'1/-1', marginTop: '12px'}}>
                <div className="ch-detail-label">Test Inputs & Answers</div>
                <div className="ch-detail-val" style={{fontFamily: 'monospace', whiteSpace: 'pre-wrap', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '6px', fontSize: '13px', lineHeight: '1.5'}}>{ch.testInputs}</div>
              </div>
            )}
            {ch.explanation && (
              <div style={{gridColumn:'1/-1', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px'}}>
                <div className="ch-detail-label" style={{color: '#a0aec0'}}>Key Takeaway / Explanation</div>
                <div className="ch-detail-val" style={{color: '#e2e8f0', fontStyle: 'italic', fontSize: '14px', lineHeight: '1.5'}}>{ch.explanation}</div>
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
        {filtered.map(ch=><ChallengeItem key={ch.id} ch={ch}/>)}
      </div>
    </div>
  )
}
