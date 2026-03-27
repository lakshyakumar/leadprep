import { useState } from 'react'
import { roadmapData } from '../data/data'

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
        <ul className="qs-list">{item.questions.map(q => <li key={q}>{q}</li>)}</ul>
      </div>
    </div>
  )
}

export default function Roadmap() {
  return (
    <div>
      <div className="section-title">Interview Preparation Roadmap</div>
      <div className="section-subtitle">8 categories · Click each to expand</div>
      {roadmapData.map((item, i) => <RoadmapItem key={i} item={item} />)}
    </div>
  )
}
