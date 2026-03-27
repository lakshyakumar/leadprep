import { useState } from 'react'
import { leadershipTopics, leadershipQuestions } from '../data/data'

const advancedCards = [
  { icon: '📡', title: 'Executive Communication', body: 'BLUF (Bottom Line Up Front). Speak in outcomes, not activities. Know how to present engineering health to non-technical leaders. Status = Green/Yellow/Red with context.' },
  { icon: '📊', title: 'Engineering KPIs', body: 'DORA metrics. Cycle time. Bug escape rate. Test coverage trends. On-call burden. Tech debt ratio. Developer happiness (eNPS). Know which matter most for your stage.' },
  { icon: '⚖️', title: 'Tradeoff Communication', body: 'Always present options, not just recommendations. "We can do X (fast, risky) or Y (slower, safer). I recommend X because..." Show you think in tradeoffs, not absolutes.' },
  { icon: '🔭', title: 'Technical Vision', body: 'Can you articulate a 1–3 year technical direction? What\'s your team\'s "north star" architecture? How do you align it with business goals? How do you communicate it to ICs?' },
  { icon: '⚠️', title: 'Risk Management', body: 'Identify, assess, and mitigate technical risk. RAID log (Risks, Assumptions, Issues, Dependencies). Know when to escalate vs absorb risk. Risk is the job, not the problem.' },
  { icon: '🎯', title: 'Prioritization', body: 'RICE, ICE, MoSCoW. Opportunity cost thinking. How to say no well. The difference between urgent and important. Backlog health as a leadership responsibility.' },
  { icon: '🏗️', title: 'Platform Thinking', body: 'When to build a platform vs a product. Internal developer experience. API-first. Golden paths. Paved roads. Reusable components vs bespoke solutions.' },
  { icon: '🔑', title: 'Ownership Mindset', body: "Leaders own outcomes, not tasks. You own what happens on your watch — including what you didn't do. The difference between accountability and responsibility in a team context." },
  { icon: '🔬', title: 'Operational Excellence', body: 'SLOs/SLAs/SLIs. Error budgets. Toil reduction. Automation as a leadership goal. Sustainable on-call. Capacity planning. Runbook culture.' },
]

function ExpandItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`roadmap-item${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="roadmap-header">
        <div className="roadmap-title">{item.topic}</div>
        <div className="roadmap-toggle">+</div>
      </div>
      <div className="roadmap-body">
        <div className="roadmap-sub-label" style={{marginBottom:8}}>Key Questions</div>
        <ul className="qs-list">{item.questions.map(q => <li key={q}>{q}</li>)}</ul>
        <div className="roadmap-sub-label" style={{margin:'12px 0 6px'}}>Preparation Tips</div>
        <div className="roadmap-sub-body">{item.tips}</div>
      </div>
    </div>
  )
}

const starBlocks = [
  { letter: 'S', word: 'Situation', hint: 'Set the context in 1–2 sentences. Team size, company stage, what was the environment?' },
  { letter: 'T', word: 'Task', hint: 'What was YOUR specific responsibility? Not the team\'s — yours. What were you accountable for?' },
  { letter: 'A', word: 'Action', hint: 'What did YOU specifically do? 3–5 concrete actions. Use "I" not "we". Show your decision-making.' },
  { letter: 'R', word: 'Result', hint: 'Quantify the outcome. Reduced latency by X%. Delivered Y on time. Promoted Z engineers. Business impact?' },
]

const mustPrepare = [
  'A technical decision you made that had significant impact (positive or negative)',
  'A time you managed an underperformer — what you did and how it ended',
  'A major incident you led — how you handled pressure and the post-mortem',
  'A time you pushed back on a product or business decision technically',
  'A cross-functional conflict you resolved — between eng and product, or eng and eng',
  'A delivery that was at risk — how you recovered it',
  'A time you influenced a team or org without authority',
  'A time you set or changed engineering culture/practices',
  'Your biggest technical mistake and what you learned',
  'A time you hired someone great (or made a hiring mistake)',
  'A time you had to prioritize ruthlessly — what got cut and why',
  'A time you mentored or grew an engineer significantly',
]

export default function Leadership() {
  const [tab, setTab] = useState('topics')
  return (
    <div>
      <div className="section-title">Engineering Leadership Interview Prep</div>
      <div className="section-subtitle">STAR stories · Common questions · Answer frameworks</div>
      <div className="tab-bar">
        {[{id:'topics',label:'Key Topics'},{id:'star',label:'STAR Framework'},{id:'questions',label:'150 Questions'},{id:'advanced',label:'Advanced Areas'}].map(t => (
          <button key={t.id} className={`tab-btn${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {tab === 'topics' && leadershipTopics.map(t => <ExpandItem key={t.topic} item={t} />)}

      {tab === 'star' && (
        <div>
          <div className="card">
            <div className="card-title" style={{color:'var(--accent4)'}}>⭐ STAR Framework for Leadership Stories</div>
            <div className="card-body">Use STAR for every behavioral question. Aim for 90-second answers. Quantify impact always.</div>
          </div>
          <div className="star-card">
            <div className="star-grid">
              {starBlocks.map(b => (
                <div key={b.letter}>
                  <div className="star-letter">{b.letter}</div>
                  <div className="star-word">{b.word}</div>
                  <div className="star-hint">{b.hint}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-title">📝 12 Must-Prepare STAR Stories</div>
            <div className="card-body">
              <ul className="qs-list">{mustPrepare.map(s => <li key={s}>{s}</li>)}</ul>
            </div>
          </div>
        </div>
      )}

      {tab === 'questions' && (
        <div>
          {leadershipQuestions.map(cat => (
            <div className="card" style={{marginBottom:14}} key={cat.category}>
              <div className="card-title">{cat.category}</div>
              <ul className="qs-list">{cat.qs.map(q => <li key={q}>{q}</li>)}</ul>
            </div>
          ))}
        </div>
      )}

      {tab === 'advanced' && (
        <div className="principles-grid">
          {advancedCards.map(c => (
            <div className="principle-card" key={c.title}>
              <div className="principle-icon">{c.icon}</div>
              <div className="principle-title">{c.title}</div>
              <div className="principle-body">{c.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
