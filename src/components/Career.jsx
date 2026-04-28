import { useState } from 'react'
import { careerContent } from '../data/data'

const TABS = [
  { id: 'pipeline',     label: 'Recruiter & Pipeline', icon: '📞', items: careerContent.pipeline },
  { id: 'negotiation',  label: 'Negotiation',          icon: '💰', items: careerContent.negotiation },
  { id: 'first90days',  label: 'First 90 Days',        icon: '🌱', items: careerContent.first90Days },
]

const TAB_INTROS = {
  pipeline: "Before the onsite. Recruiter screens, comp expectations, take-home etiquette, pre-onsite logistics, and the questions YOU should be asking.",
  negotiation: "After the offer arrives. Counter-offer scripts, levels.fyi reading, when to walk away. Most candidates leave 10-30% on the table here.",
  first90days: "After you accept. Week 1 reconnaissance, your first PR, the 30/60/90 milestones, and how to avoid the new-hire credibility traps.",
}

function Topic({ item }) {
  const [open, setOpen] = useState(false)
  // Render bold + italic + line breaks from a simple markdown subset.
  const renderBody = (text) => {
    return text.split('\n\n').map((para, i) => (
      <p key={i} style={{margin: '8px 0', whiteSpace: 'pre-wrap', lineHeight: 1.65, color: 'var(--text2)'}}>
        {renderInline(para)}
      </p>
    ))
  }
  const renderInline = (text) => {
    const parts = []
    const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g
    let last = 0, m
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) parts.push(text.slice(last, m.index))
      if (m[1]) parts.push(<strong key={m.index} style={{color: 'var(--text)'}}>{m[1]}</strong>)
      else if (m[2]) parts.push(<em key={m.index}>{m[2]}</em>)
      last = re.lastIndex
    }
    if (last < text.length) parts.push(text.slice(last))
    return parts
  }
  return (
    <details className="career-topic" open={open} onToggle={e => setOpen(e.currentTarget.open)}>
      <summary>
        <div className="career-topic-summary">
          <div className="career-topic-title">{item.title}</div>
          <div className="career-topic-summary-text">{item.summary}</div>
        </div>
      </summary>
      <div className="career-topic-body">
        {renderBody(item.body)}
      </div>
    </details>
  )
}

export default function Career() {
  const [tab, setTab] = useState('pipeline')
  const active = TABS.find(t => t.id === tab)
  return (
    <div>
      <div className="section-title">Career — End-to-End</div>
      <div className="section-subtitle">Before, during, after the offer · The parts of job-hunting that most prep sites skip</div>

      <div className="tab-bar">
        {TABS.map(t => (
          <button key={t.id} className={`tab-btn${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>
            <span style={{marginRight: 6}}>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      <div className="career-intro">{TAB_INTROS[tab]}</div>

      <div className="career-topics">
        {active.items.map(item => <Topic key={item.title} item={item} />)}
      </div>
    </div>
  )
}
