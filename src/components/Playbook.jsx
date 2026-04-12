import { useState, useEffect } from 'react'
import { technicalChecklist, leadershipChecklist, interviewDayTimeline } from '../data/data'

function ChecklistItem({ item, id, checked, onToggle }) {
  return (
    <li>
      <input 
        type="checkbox" 
        id={id} 
        checked={checked} 
        onChange={e => onToggle(id, e.target.checked)} 
      />
      <label htmlFor={id}>{item}</label>
    </li>
  )
}

const engLeaderQuestions = [
  "What does engineering excellence look like on this team today vs where you want it to be?",
  "How does the team balance delivery speed with technical quality?",
  "What's the biggest technical challenge the team is facing in the next 6 months?",
  "How do you support engineering leaders in developing their teams?",
  "What does a successful first 90 days look like in this role?",
  "How does engineering work with product on roadmap prioritization?",
]
const icQuestions = [
  "What's something you wish leadership understood better about the team's day-to-day challenges?",
  "How do decisions get made between engineering and product?",
  "What does career growth look like for engineers here?",
  "What are you most proud of that this team has shipped?",
  "If you could change one thing about the engineering culture here, what would it be?",
  "How does the team handle technical debt vs feature work tension?",
]

export default function Playbook() {
  const [tab, setTab] = useState('checklist')
  const [checks, setChecks] = useState(() => {
    const saved = localStorage.getItem('playbook_checks')
    return saved ? JSON.parse(saved) : {}
  })

  const toggleCheck = (id, isChecked) => {
    const newChecks = { ...checks, [id]: isChecked }
    setChecks(newChecks)
    localStorage.setItem('playbook_checks', JSON.stringify(newChecks))
  }

  return (
    <div>
      <div className="section-title">Final Playbook & Interview-Day Strategy</div>
      <div className="section-subtitle">Condensed checklists + hour-by-hour interview day guide</div>
      <div className="tab-bar">
        {[{id:'checklist',label:'Must-Do Checklist'},{id:'day',label:'Interview Day'},{id:'questions',label:'Your Questions to Ask'}].map(t => (
          <button key={t.id} className={`tab-btn${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {tab === 'checklist' && (
        <div>
          <div className="card" style={{marginBottom:20}}>
            <div className="card-title">✅ Must-Do in 7 Days — Master Checklist</div>
          </div>
          <div className="two-col">
            <div>
              <div className="roadmap-sub-label" style={{marginBottom:8}}>Technical</div>
              <ul className="checklist">
                {technicalChecklist.map((item, i) => {
                  const id = `tech-${i}`
                  return <ChecklistItem key={id} item={item} id={id} checked={!!checks[id]} onToggle={toggleCheck} />
                })}
              </ul>
            </div>
            <div>
              <div className="roadmap-sub-label" style={{marginBottom:8}}>Leadership & Behavioral</div>
              <ul className="checklist">
                {leadershipChecklist.map((item, i) => {
                  const id = `lead-${i}`
                  return <ChecklistItem key={id} item={item} id={id} checked={!!checks[id]} onToggle={toggleCheck} />
                })}
              </ul>
            </div>
          </div>
        </div>
      )}

      {tab === 'day' && (
        <div>
          <div className="card" style={{marginBottom:20,background:'rgba(124,106,255,0.08)',borderColor:'rgba(124,106,255,0.3)'}}>
            <div className="card-title" style={{color:'var(--accent)'}}>🎯 Interview Day — Hour by Hour</div>
            <div className="card-body">This is your operating procedure. Follow it exactly.</div>
          </div>
          <div className="timeline">
            {interviewDayTimeline.map((item, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-time">{item.time}</div>
                <div className="timeline-title">{item.title}</div>
                <div className="timeline-body">{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'questions' && (
        <div>
          <div className="card" style={{marginBottom:16}}>
            <div className="card-title">❓ Questions to Ask Your Interviewers</div>
            <div className="card-body">Asking smart questions signals leadership maturity. Prepare 2–3 per interviewer type.</div>
          </div>
          <div className="two-col">
            <div>
              <div className="roadmap-sub-label" style={{marginBottom:8}}>For Engineering Leaders</div>
              <ul className="qs-list">{engLeaderQuestions.map(q => <li key={q}>{q}</li>)}</ul>
            </div>
            <div>
              <div className="roadmap-sub-label" style={{marginBottom:8}}>For ICs / Future Reports</div>
              <ul className="qs-list">{icQuestions.map(q => <li key={q}>{q}</li>)}</ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
