import { useState } from 'react'
import { roadmapData } from '../data/data'
import { questionText, questionCompanies, questionKey } from '../utils/renderQ'
import { COMPANY_LABELS } from '../data/companies'
import { useRole } from '../context/RoleContext'

function RoadmapItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`roadmap-item${open ? ' open' : ''}`} style={{borderLeftColor: item.accent}} onClick={() => setOpen(o => !o)}>
      <div className="roadmap-header">
        <div className="roadmap-title">{item.title}</div>
        <div className="roadmap-toggle">+</div>
      </div>
      <div className="roadmap-body">
        <div className="roadmap-grid">
          <div><div className="roadmap-sub-label">What's Evaluated</div><div className="roadmap-sub-body">{item.evaluated}</div></div>
          <div><div className="roadmap-sub-label">How to Prepare</div><div className="roadmap-sub-body">{item.prepare}</div></div>
          <div><div className="roadmap-sub-label">Common Mistakes</div><div className="roadmap-sub-body">{item.mistakes}</div></div>
          <div><div className="roadmap-sub-label">Excellent Answers</div><div className="roadmap-sub-body">{item.excellent}</div></div>
        </div>
        <div className="roadmap-sub-label" style={{marginBottom:8}}>Common Questions</div>
        <ul className="qs-list">{item.questions.map(q => (
          <li key={questionKey(q)}>
            {questionText(q)}
            {questionCompanies(q).map(co => (
              <span key={co} className={`badge company-${co}`} style={{marginLeft:6}}>{COMPANY_LABELS[co] ?? co}</span>
            ))}
          </li>
        ))}</ul>
      </div>
    </div>
  )
}

export default function Roadmap() {
  const { role } = useRole()
  const [showAll, setShowAll] = useState(false)
  const visible = (role === 'all' || showAll)
    ? roadmapData
    : roadmapData.filter(it => !it.roles || it.roles.includes(role))
  const hiddenCount = roadmapData.length - visible.length
  return (
    <div>
      <div className="section-title">Interview Preparation Roadmap</div>
      <div className="section-subtitle">
        {visible.length} categor{visible.length === 1 ? 'y' : 'ies'} · Click each to expand
        {hiddenCount > 0 && (
          <button
            className="role-pill"
            style={{marginLeft: 12}}
            onClick={() => setShowAll(s => !s)}
          >
            {showAll ? 'Hide leadership tracks' : `Show ${hiddenCount} more`}
          </button>
        )}
      </div>
      {visible.map((item, i) => <RoadmapItem key={i} item={item} />)}
    </div>
  )
}
