import { useState } from 'react'
import { leadershipTopics, leadershipQuestions, icBehavioralQuestions } from '../data/data'
import { questionText, questionCompanies, questionKey } from '../utils/renderQ'
import { COMPANY_LABELS } from '../data/companies'
import { useRole } from '../context/RoleContext'

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
        <ul className="qs-list">{item.questions.map(q => (
          <li key={questionKey(q)}>
            {questionText(q)}
            {questionCompanies(q).map(co => (
              <span key={co} className={`badge company-${co}`} style={{marginLeft:6}}>{COMPANY_LABELS[co] ?? co}</span>
            ))}
          </li>
        ))}</ul>
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
  {
    prompt: 'A technical decision you made that had significant impact (positive or negative)',
    hints: [
      'Pick something with a clear binary or tradeoff: build vs buy, monolith vs micro, sync vs async, SQL vs NoSQL.',
      'Quantify both options up-front: cost, latency, time-to-market, risk. Rough numbers beat no numbers.',
      'Show your decision framework — what data did you collect, who did you consult, what would have changed your mind?',
      'End with the outcome AND what you learned. A reversed-and-fixed decision is often more compelling than a clean win.'
    ]
  },
  {
    prompt: 'A time you managed an underperformer — what you did and how it ended',
    hints: [
      'Lead with the early signals you noticed and how you confirmed it (specific behaviors, not vibes).',
      'Walk through your intervention: SBI feedback, written expectations, check-in cadence, when HR got involved.',
      'Show empathy AND accountability. Don\'t paint yourself as either too soft or too harsh.',
      'Outcome can be: turnaround, role change, exit, or PIP — all valid. Discuss what you\'d do earlier next time.'
    ]
  },
  {
    prompt: 'A major incident you led — how you handled pressure and the post-mortem',
    hints: [
      'Set the stakes in 2 sentences (revenue impact, user count, duration). Skip system internals.',
      'Walk the timeline: detection → triage decisions → mitigation → resolution. Highlight YOUR specific calls.',
      'Discuss the post-mortem: root cause, action items, blameless framing, what shipped to prevent recurrence.',
      'Avoid hero-narrative. The best answer shows you stayed calm AND made the team feel safe to surface info.'
    ]
  },
  {
    prompt: 'A time you pushed back on a product or business decision technically',
    hints: [
      'Frame the pushback as protecting the business outcome, not protecting engineering.',
      'Show you brought options, not just objections: "we can do A risky-fast, B safe-slow, or C — I recommend C."',
      'Demonstrate that you understood the product/business pressure even while disagreeing.',
      'Either outcome (you persuaded them, or disagreed-and-committed) is valid — show the principle.'
    ]
  },
  {
    prompt: 'A cross-functional conflict you resolved — between eng and product, or eng and eng',
    hints: [
      'Name the underlying interests (not positions): "PM wanted velocity, eng wanted quality" → real conflict was misaligned incentives.',
      'Show how you separated the people from the problem.',
      'Describe the structured process: 1:1s, written proposal, neutral facilitator, escalation path.',
      'End with the durable fix (process, ritual, or principle) — not just "they made up."'
    ]
  },
  {
    prompt: 'A delivery that was at risk — how you recovered it',
    hints: [
      'Set the risk dimension: scope-too-big, missing dependency, talent gap, customer scope creep.',
      'Show how you re-plan: descope first, parallelize second, add people only as last resort (Brooks\'s Law).',
      'Discuss the communication side: what did you tell the customer/exec, when, with what alternatives?',
      'Quantify the recovery (shipped on time, shipped 2 weeks late but with X scope, etc.) and the lesson.'
    ]
  },
  {
    prompt: 'A time you influenced a team or org without authority',
    hints: [
      'Pick a story where you weren\'t the manager — peer influence is the high-value signal.',
      'Show the ladder: 1:1 conversations → small proof of concept → wider doc/RFC → org-level rollout.',
      'Highlight whose buy-in was hardest and how you got it (data, demo, finding their hidden constraint).',
      'Quantify the spread: "convinced 3 ICs → 1 team → 4 teams → org standard."'
    ]
  },
  {
    prompt: 'A time you set or changed engineering culture/practices',
    hints: [
      'Pick something with a measurable behavior change: code review SLA, on-call runbook discipline, post-mortem cadence.',
      'Show the diagnosis: what specific symptom told you the culture was broken? (e.g., 3-day code review delays, repeating incidents).',
      'Walk through the change: pilot → measure → roll out → enforce. Bottom-up always beats top-down mandates.',
      'Quantify before/after — and acknowledge the people who pushed back, and how you brought them along.'
    ]
  },
  {
    prompt: 'Your biggest technical mistake and what you learned',
    hints: [
      'Pick a real mistake with real impact — small bugs are not the right answer here.',
      'Own it cleanly: "I shipped X without Y, which caused Z." No "we" deflection, no blame on the team.',
      'Show what you knew at the time vs what you missed — humility is the signal, not self-flagellation.',
      'Tie the lesson to a specific behavior change (now I always do X before Y). Avoid vague "I learned to be careful."'
    ]
  },
  {
    prompt: 'A time you hired someone great (or made a hiring mistake)',
    hints: [
      'For a great hire: what signals did you screen for that the rubric missed? What rubric change did this drive?',
      'For a mistake: what signal did you miss, and how did you change your loop afterward?',
      'Talk about the loop, not just the candidate: how did you calibrate, who was the bar raiser, how did you handle splits?',
      'Avoid trash-talking the bad hire. Frame as a process gap that you fixed.'
    ]
  },
  {
    prompt: 'A time you had to prioritize ruthlessly — what got cut and why',
    hints: [
      'Set the constraint clearly (deadline, headcount, budget). Vague pressure is a weak setup.',
      'Show the prioritization framework: RICE, ICE, opportunity cost, customer impact.',
      'Be specific about WHAT got cut and what conversation it took with the owner of the cut work.',
      'End with how you communicated the cut up and out — exec summary, customer messaging, sunset plan.'
    ]
  },
  {
    prompt: 'A time you mentored or grew an engineer significantly',
    hints: [
      'Pick someone whose level/scope changed measurably (junior → mid, senior IC → tech lead, etc.).',
      'Show your model of growth: stretch assignments, sponsorship vs mentorship, feedback cadence, exposure.',
      'Identify the inflection point — the conversation or assignment that unlocked them.',
      'Quantify the outcome (promotion, project shipped, presented at all-hands) and your continued relationship.'
    ]
  },
]

export default function Leadership() {
  const { role } = useRole()
  const isLeadAudience = role === 'all' || role === 'lead' || role === 'em' || role === 'staff'
  const allTabs = [
    { id: 'star', label: 'STAR Framework', leadOnly: false },
    { id: 'ic', label: 'IC Behavioral', leadOnly: false },
    { id: 'questions', label: 'Leadership Q Bank', leadOnly: true },
    { id: 'topics', label: 'Leadership Topics', leadOnly: true },
    { id: 'advanced', label: 'Advanced Areas', leadOnly: true },
  ]
  const visibleTabs = allTabs.filter(t => !t.leadOnly || isLeadAudience)
  const [tab, setTab] = useState('star')
  const activeTab = visibleTabs.find(t => t.id === tab) ? tab : visibleTabs[0].id
  return (
    <div>
      <div className="section-title">Behavioral & Leadership</div>
      <div className="section-subtitle">STAR stories · Common questions · Answer frameworks · Works for ICs and managers</div>
      <div className="tab-bar">
        {visibleTabs.map(t => (
          <button key={t.id} className={`tab-btn${activeTab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {activeTab === 'topics' && leadershipTopics.map(t => <ExpandItem key={t.topic} item={t} />)}

      {activeTab === 'star' && (
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
            <div className="card-body" style={{paddingBottom: 4}}>Click any prompt to see hints on what to cover and what pitfalls to avoid.</div>
            <div className="star-stories">
              {mustPrepare.map(s => (
                <details className="star-story" key={s.prompt}>
                  <summary>{s.prompt}</summary>
                  <ul className="hint-list">
                    {s.hints.map(h => <li key={h}>{h}</li>)}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ic' && (
        <div>
          <div className="card" style={{marginBottom:14, background:'rgba(124,106,255,0.06)', borderColor:'rgba(124,106,255,0.25)'}}>
            <div className="card-title">📌 IC-targeted behavioral questions</div>
            <div className="card-body">For IC and Senior interviews. Frame answers around individual ownership, code-level decisions, and direct collaboration — not org-level outcomes. Use STAR.</div>
          </div>
          {icBehavioralQuestions.map(cat => (
            <div className="card" style={{marginBottom:14}} key={cat.category}>
              <div className="card-title">{cat.category}</div>
              <ul className="qs-list">{cat.qs.map(q => (
                <li key={questionKey(q)}>
                  {questionText(q)}
                  {questionCompanies(q).map(co => (
                    <span key={co} className={`badge company-${co}`} style={{marginLeft:6}}>{COMPANY_LABELS[co] ?? co}</span>
                  ))}
                </li>
              ))}</ul>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'questions' && (
        <div>
          {leadershipQuestions.map(cat => (
            <div className="card" style={{marginBottom:14}} key={cat.category}>
              <div className="card-title">{cat.category}</div>
              <ul className="qs-list">{cat.qs.map(q => (
                <li key={questionKey(q)}>
                  {questionText(q)}
                  {questionCompanies(q).map(co => (
                    <span key={co} className={`badge company-${co}`} style={{marginLeft:6}}>{COMPANY_LABELS[co] ?? co}</span>
                  ))}
                </li>
              ))}</ul>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'advanced' && (
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
