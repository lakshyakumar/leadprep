const pairingCards = [
  { icon: '🗣️', title: 'Narrate Your Thinking', body: "Never code in silence. Say what you're considering: \"I'm thinking a HashMap here because lookups would be O(1)…\" Talk through trade-offs before typing." },
  { icon: '❓', title: 'Clarify First', body: 'Always spend 2–3 minutes clarifying: input types, edge cases, constraints, expected output format. Ask: "Can the input be null? What\'s the max size?" Shows engineering maturity.' },
  { icon: '📐', title: 'Structure Before Code', body: 'Write a plan in comments first: // Step 1: Validate input // Step 2: Build the map // Step 3: Traverse. This anchors both you and the interviewer.' },
  { icon: '🔄', title: 'Iterative Approach', body: 'Start with a brute force. Say "I\'ll start naive then optimize." Then improve. Shows you can ship working code and then refine — exactly what seniors do.' },
  { icon: '🤝', title: 'Receive Feedback Gracefully', body: "If the interviewer hints, say \"That's a good point — I think you're suggesting X, let me try that.\" Never be defensive. They're testing collaboration, not just code." },
  { icon: '🔧', title: 'Recovery Protocol', body: 'When stuck: pause, re-read the problem, consider edge cases, try a smaller example. Say "Let me think about a simpler version first." Silence for 30 sec is fine.' },
  { icon: '✅', title: 'Test Your Code', body: 'After writing, trace through with an example input. Test edge cases (empty array, single element, max value). Say "Let me verify this with the example given."' },
  { icon: '⚡', title: 'Production Mindset', body: 'Name variables meaningfully. Handle errors. Add comments. Ask: "Should I add logging here?" Shows you think about code that runs in production, not just passes tests.' },
]

const templates = [
  { label: 'Opening a problem', text: '"Before I start coding, let me make sure I understand the problem correctly... [restate]. Is that right? And are there constraints on the input size? Should I handle null inputs?"' },
  { label: 'Starting to code', text: '"I\'m going to start with a brute force approach first — O(n²) — just to have something working, then I\'ll optimize. Does that sound okay?"' },
  { label: 'When stuck', text: '"I\'m not immediately seeing the optimal path here. Let me think about what structure would help... A sliding window maybe? Or could this be a two-pointer approach?"' },
  { label: 'After finishing', text: '"Let me trace through with the example: input is [2,7,11,15], target 9... we\'d find 2, look for 7 in the map, it\'s there... returns [0,1]. Looks correct. Time complexity is O(n), space O(n). Any edge cases you want me to handle?"' },
]

export default function Pairing() {
  return (
    <div>
      <div className="section-title">Pair Programming Preparation</div>
      <div className="section-subtitle">How to think, communicate, and code like a senior engineer in a live session</div>
      <div className="principles-grid" style={{marginBottom:24}}>
        {pairingCards.map(c => (
          <div className="principle-card" key={c.title}>
            <div className="principle-icon">{c.icon}</div>
            <div className="principle-title">{c.title}</div>
            <div className="principle-body">{c.body}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-title">🎙️ Verbal Templates for Pair Programming</div>
        <div className="card-body">
          {templates.map(t => (
            <div key={t.label}>
              <div className="roadmap-sub-label" style={{marginBottom:8}}>{t.label}</div>
              <div style={{background:'var(--surface2)',padding:'12px',borderRadius:'8px',fontFamily:"'JetBrains Mono',monospace",fontSize:'12px',color:'var(--accent3)',marginBottom:12}}>
                {t.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
