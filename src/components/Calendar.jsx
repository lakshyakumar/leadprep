import { useState } from 'react'

const days = [
  {
    num: 1, theme: 'Foundation Sprint', sub: 'DSA + Behavioral Setup',
    sessions: [
      { time: '☀️ Morning · 8–10am', content: <><strong>DSA Refresh:</strong> Arrays, Strings, HashMaps, Two Pointers. Solve 5 Easy coding challenges. Review Big-O notation basics.</> },
      { time: '🌤 Afternoon · 12–2pm', content: <><strong>Behavioral Framework:</strong> Write 10 STAR stories from your career. Cover leadership wins, failures, conflict, hiring decisions, delivery crises.</> },
      { time: '🌙 Evening · 7–9pm', content: <><strong>Language Fundamentals:</strong> Collections, error handling, and concurrency basics. Solve 5 Easy coding challenges. Review idiomatic language patterns.</> },
    ]
  },
  {
    num: 2, theme: 'Architecture Day', sub: 'System Design Depth',
    sessions: [
      { time: '☀️ Morning · 8–10am', content: <><strong>System Design Framework:</strong> Study RESHADED method. Practice URL Shortener + Chat System. Capacity estimation drills.</> },
      { time: '🌤 Afternoon · 12–2pm', content: <><strong>Distributed Systems:</strong> CAP theorem, consistency models, partitioning, replication, eventual consistency. Study Kafka, Redis, PostgreSQL tradeoffs.</> },
      { time: '🌙 Evening · 7–9pm', content: <><strong>Coding:</strong> 5 Medium challenges (Stacks, Queues, Sliding Window). Practice explaining solutions out loud (pair programming mindset).</> },
    ]
  },
  {
    num: 3, theme: 'Trees & Graphs', sub: 'DSA Mid-Difficulty',
    sessions: [
      { time: '☀️ Morning · 8–10am', content: <><strong>Trees + Graphs:</strong> BFS, DFS, binary trees, BST, trie basics. Solve 5 Medium tree problems. Draw solutions on paper first.</> },
      { time: '🌤 Afternoon · 12–2pm', content: <><strong>Leadership Deep Dive:</strong> Underperformer management, mentoring frameworks (SBI feedback), delegation model, performance reviews. Prepare 5 leadership stories.</> },
      { time: '🌙 Evening · 7–9pm', content: <><strong>Medium Challenges:</strong> 5 Medium problems (trees, linked lists, sorting). Review language-specific features (e.g., async, interfaces, generics).</> },
    ]
  },
  {
    num: 4, theme: 'Design + Strategy', sub: 'Architecture + Execution',
    sessions: [
      { time: '☀️ Morning · 8–10am', content: <><strong>Advanced System Design:</strong> Design a search autocomplete + rate limiter + notification system. Focus on tradeoff articulation.</> },
      { time: '🌤 Afternoon · 12–2pm', content: <><strong>Execution & Delivery:</strong> OKRs, sprint planning, technical roadmaps, incident management (DORA metrics), post-mortems. Prepare execution story.</> },
      { time: '🌙 Evening · 7–9pm', content: <><strong>DP + Recursion:</strong> 5 Medium dynamic programming challenges (fibonacci, knapsack, LCS). Focus on memoization pattern.</> },
    ]
  },
  {
    num: 5, theme: 'Hard Mode', sub: 'Advanced DSA + Go Concurrency',
    sessions: [
      { time: '☀️ Morning · 8–10am', content: <><strong>Hard Challenges:</strong> 5 Hard problems (Heaps, advanced DP, graphs). Strict 25-min per problem. Time pressure training.</> },
      { time: '🌤 Afternoon · 12–2pm', content: <><strong>Concurrency & Systems:</strong> Threads, mutexes, async/await, worker pools, pipeline patterns. Solve 3 concurrency challenges.</> },
      { time: '🌙 Evening · 7–9pm', content: <><strong>Pair Programming Practice:</strong> Full mock pair session. Code out loud for 60 mins. Review coding standards, clean code principles.</> },
    ]
  },
  {
    num: 6, theme: 'Mock Interview Day', sub: 'Simulate Real Conditions',
    sessions: [
      { time: '☀️ Morning · 9–11am', content: <><strong>Mock System Design:</strong> Full 45-min timed session. Design Twitter feed or YouTube. Self-evaluate on structure, tradeoffs, depth.</> },
      { time: '🌤 Afternoon · 1–3pm', content: <><strong>Mock Behavioral:</strong> Record yourself answering 10 leadership questions. Review for specificity, conciseness, impact quantification.</> },
      { time: '🌙 Evening · 6–8pm', content: <><strong>Weak Area Patch:</strong> Identify 3 weak areas from mocks. Focus 60 min on each. Review hard challenges.</> },
    ]
  },
  {
    num: 7, theme: 'Integration & Rest', sub: 'Polish + Mindset',
    sessions: [
      { time: '☀️ Morning · 9–10:30am', content: <><strong>Final Review:</strong> Skim all STAR stories. Quick pass on system design framework. Review top 20 challenges. No new topics.</> },
      { time: '🌤 Afternoon · 12–1pm', content: <><strong>Mindset + Logistics:</strong> Review interview-day playbook. Prepare your 5 questions to ask. Confirm interview format, tools, and setup.</> },
      { time: '🌙 Evening · Rest', content: <><strong>No Coding.</strong> Light reading only. Sleep by 10pm. Trust the prep. You're ready.</> },
    ]
  },
]

const compressedRows = [
  { day: 'Day 1', focus: '🔴 STAR Stories', what: 'Write 8 STAR stories covering: leadership win, failure recovery, conflict, delivery crisis, mentoring, hiring, scope creep, cross-team alignment' },
  { day: 'Day 2', focus: '🏗️ System Design', what: 'Learn RESHADED framework. Practice designing 1 large system from scratch (URL shortener or Chat App). Focus on tradeoffs.' },
  { day: 'Day 3', focus: '💻 Coding Basics', what: 'Solve 8 coding challenges: 4 Easy + 3 Medium + 1 Hard. Speak solutions aloud. Time yourself at 20 min per problem.' },
  { day: 'Day 4', focus: '🦫 Advanced Coding', what: 'Solve 8 advanced challenges: 4 Easy + 3 Medium + 1 Hard. Review language-specific error handling and concurrency basics.' },
  { day: 'Day 5', focus: '👔 Leadership Depth', what: 'Prepare 5 more STAR stories. Study: underperformer management, delegation, technical vision, hiring bar, OKRs.' },
  { day: 'Day 6', focus: '🎭 Mock Round', what: 'Full 45-min mock system design. Record yourself. Then 45-min behavioral mock with 5 questions. Self-score both.' },
  { day: 'Day 7', focus: '🧘 Integration', what: 'Skim all notes. Review playbook. Prepare your questions to ask. Rest.' },
]

function Tabs({ tabs, active, onSelect }) {
  return (
    <div className="tab-bar">
      {tabs.map(t => (
        <button key={t.id} className={`tab-btn${active === t.id ? ' active' : ''}`} onClick={() => onSelect(t.id)}>{t.label}</button>
      ))}
    </div>
  )
}

export default function Calendar() {
  const [tab, setTab] = useState('full')
  return (
    <div>
      <div className="section-title">7-Day Preparation Calendar</div>
      <div className="section-subtitle">Each day is themed. Sessions are 90–120 min each.</div>
      <Tabs tabs={[{id:'full',label:'Full Plan'},{id:'compressed',label:'2hr/Day Version'},{id:'emergency',label:'Emergency (Top 20)'}]} active={tab} onSelect={setTab} />

      {tab === 'full' && (
        <div className="day-grid">
          {days.map(d => (
            <div className="day-card" key={d.num}>
              <div className="day-header">
                <div className="day-num">{d.num}</div>
                <div>
                  <div className="day-theme">{d.theme}</div>
                  <div style={{fontSize:'11px',color:'var(--accent)',fontFamily:"'JetBrains Mono',monospace"}}>{d.sub}</div>
                </div>
              </div>
              <div className="day-body">
                {d.sessions.map((s, i) => (
                  <div className="session" key={i}>
                    <div className="session-time">{s.time}</div>
                    <div className="session-content">{s.content}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'compressed' && (
        <div>
          <div className="card">
            <div className="card-title">⚡ 2-Hour/Day Compressed Plan</div>
            <div className="card-body">For those with limited time. One focused session per day.</div>
          </div>
          <table className="compressed-table" style={{background:'var(--surface)',borderRadius:'10px',overflow:'hidden'}}>
            <thead><tr><th>Day</th><th>Focus</th><th>What to Do</th></tr></thead>
            <tbody>
              {compressedRows.map(r => (
                <tr key={r.day}><td>{r.day}</td><td>{r.focus}</td><td>{r.what}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'emergency' && (
        <div className="emergency-box">
          <div className="emergency-title">🚨 Emergency Mode: Top 20 Coding Challenges Only</div>
          <div className="card-body" style={{marginBottom:14}}>If you have minimal time, solve these 20 challenges — they cover the highest-frequency patterns seen in engineering leadership interviews.</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
            <div>
              <div className="roadmap-sub-label">Core Concepts (10)</div>
              <ul className="qs-list">
                {['Two Sum (Hash Map)','Valid Parentheses (Stack)','Longest Substring Without Repeat','Merge Intervals','LRU Cache','Binary Tree Level Order Traversal','Clone Graph','Coin Change (DP)','Word Break','Design Rate Limiter'].map(q => <li key={q}>{q}</li>)}
              </ul>
            </div>
            <div>
              <div className="roadmap-sub-label">Advanced/Systems (10)</div>
              <ul className="qs-list">
                {['Reverse Linked List','Find Kth Largest Element (Heap)','Number of Islands (BFS/DFS)','Implement a Stack with Min','Concurrent Web Crawler','Product of Array Except Self','Jump Game (Greedy)','Serialize/Deserialize Binary Tree','Trie: Insert and Search','Worker Pool Pattern'].map(q => <li key={q}>{q}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
