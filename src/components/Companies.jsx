import { useState } from 'react'
import { companyPlaybooks } from '../data/data'
import { COMPANY_GROUPS } from '../data/companies'

export default function Companies() {
  const [open, setOpen] = useState(null)

  const groups = COMPANY_GROUPS.map(g => ({
    label: g.label,
    items: g.ids.map(id => companyPlaybooks.find(p => p.id === id)).filter(Boolean),
  }))

  const renderCard = co => (
    <div
      className={`principle-card${open === co.id ? ' open' : ''}`}
      key={co.id}
      style={{cursor:'pointer', borderLeft: `3px solid ${co.accent}`}}
      onClick={() => setOpen(open === co.id ? null : co.id)}
    >
      <div className="principle-icon">{co.icon}</div>
      <div className="principle-title" style={{color: co.accent}}>{co.name}</div>
      <div className="principle-body" style={{fontSize: 13}}>{co.optimizes}</div>

      {open === co.id && (
        <div style={{marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 12}}>
          <div>
            <div className="roadmap-sub-label">Interview Format</div>
            <div className="roadmap-sub-body">{co.format}</div>
          </div>
          <div>
            <div className="roadmap-sub-label">Signature Topics</div>
            <div className="roadmap-sub-body">{co.signature}</div>
          </div>
          <div>
            <div className="roadmap-sub-label">Behavioral Framework</div>
            <div className="roadmap-sub-body">{co.behavioral}</div>
          </div>
          <div>
            <div className="roadmap-sub-label">Top Tips</div>
            <ul className="qs-list" style={{marginTop: 4}}>
              {co.tips.map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>
      )}
      <div style={{marginTop: 10, fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace'}}>
        {open === co.id ? '▲ Collapse' : '▼ Expand for format · topics · tips'}
      </div>
    </div>
  )

  return (
    <div>
      <div className="section-title">Company Playbooks</div>
      <div className="section-subtitle">MAANG + tier-1 startups · What each optimizes for · Interview format · Signature topics · Behavioral framework</div>

      <div className="card" style={{marginBottom:20, background:'rgba(124,106,255,0.06)', borderColor:'rgba(124,106,255,0.25)'}}>
        <div className="card-title">📌 How to use this</div>
        <div className="card-body">
          Each card summarizes widely-reported public knowledge about how the company interviews. Pair with the company filter on the Challenges page to drill the specific patterns each company asks. None of this replaces talking to people who recently interviewed — it's a starting framework, not the truth.
        </div>
      </div>

      {groups.map(g => (
        <div key={g.label} style={{marginBottom: 28}}>
          <div className="company-group-label">{g.label}</div>
          <div className="principles-grid">
            {g.items.map(renderCard)}
          </div>
        </div>
      ))}
    </div>
  )
}
