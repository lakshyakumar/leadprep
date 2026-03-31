import {
  jsChallenges, goChallenges, pythonChallenges, rustChallenges,
  tsChallenges, aiChallenges, zkChallenges, devopsChallenges,
  designChallenges, securityChallenges, sqlChallenges, archChallenges,
  solidityChallenges, dynamicProgrammingChallenges, puzzleChallenges, algoChallenges
} from '../data/data'

const totalChallenges = 
  jsChallenges.length + goChallenges.length + pythonChallenges.length + rustChallenges.length +
  tsChallenges.length + aiChallenges.length + zkChallenges.length + devopsChallenges.length +
  designChallenges.length + securityChallenges.length + sqlChallenges.length + archChallenges.length +
  solidityChallenges.length + dynamicProgrammingChallenges.length + puzzleChallenges.length + algoChallenges.length

const features = [
  { icon: '📅', title: '7-Day Calendar', body: 'Day-by-day schedule with morning, afternoon, and evening sessions. Highest-ROI topics first.', section: 'calendar' },
  { icon: '🗺️', title: 'Interview Roadmap', body: '8 interview categories broken down: what\'s evaluated, questions asked, how to answer excellently.', section: 'roadmap' },
  { icon: '⚡', title: `${totalChallenges} Coding Challenges`, body: 'JavaScript, Golang, Python, Rust, TS, Solidity, Security, DevOps, Architecture, and more. Organized by difficulty.', section: 'challenges' },
  { icon: '📐', title: 'Coding Standards', body: 'Clean Code, SOLID, DRY/KISS/YAGNI, JS best practices, idiomatic Go, API design.', section: 'standards' },
  { icon: '🤝', title: 'Pair Programming', body: 'How to communicate, clarify, structure solutions aloud, handle feedback, recover when stuck.', section: 'pairing' },
  { icon: '👔', title: 'Leadership Prep', body: 'STAR stories, team leadership, technical decisions, conflict resolution, hiring, and culture.', section: 'leadership' },
  { icon: '🚨', title: 'Emergency Shortlists', body: 'Top 20 challenges only · 2-hour/day compressed plan · Interview-day playbook.', section: 'calendar' },
  { icon: '🎯', title: 'Interview-Day Strategy', body: 'Hour-by-hour playbook for the day of the interview. Mental prep, logistics, execution.', section: 'playbook' },
]

export default function Home({ onNavigate }) {
  return (
    <div>
      <div className="hero">
        <div className="hero-label">Engineering Leadership Interview Prep</div>
        <h1>7-Day Mastery Plan</h1>
        <p>A complete, execution-focused preparation system for Engineering Leadership interviews. Covering technical depth, architecture breadth, and leadership maturity.</p>
        <div className="hero-stats">
          <div className="stat"><div className="stat-num">7</div><div className="stat-label">Days</div></div>
          <div className="stat"><div className="stat-num">{totalChallenges}</div><div className="stat-label">Challenges</div></div>
          <div className="stat"><div className="stat-num">8</div><div className="stat-label">Interview Types</div></div>
          <div className="stat"><div className="stat-num">50+</div><div className="stat-label">STAR Stories</div></div>
        </div>
      </div>

      <div className="section-title" style={{ marginTop: 32 }}>What's Inside</div>
      <div className="section-subtitle">Click any card to jump to that section</div>

      <div className="principles-grid">
        {features.map(f => (
          <div
            className="principle-card feature-card"
            key={f.title}
            onClick={() => onNavigate(f.section)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onNavigate(f.section)}
          >
            <div className="principle-icon">{f.icon}</div>
            <div className="principle-title">{f.title}</div>
            <div className="principle-body">{f.body}</div>
            <div className="feature-card-arrow">→</div>
          </div>
        ))}
      </div>
    </div>
  )
}
