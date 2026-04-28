import { useState, useEffect, useRef } from 'react'

// Hardcoded so Home.jsx doesn't pull in data.js at initial load.
// Update when adding new challenge categories. Eyeball-accurate is fine — it's a vibe stat.
const TOTAL_CHALLENGES = 1150

function CountUp({ target, suffix = '', duration = 1800 }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const isNumeric = typeof target === 'number'
          if (!isNumeric) { setDisplay(target); return }
          const start = performance.now()
          const tick = (now) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            setDisplay(Math.round(ease * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{display}{suffix}</span>
}

const totalChallenges = TOTAL_CHALLENGES

const features = [
  { icon: '📅', title: '7-Day Calendar', body: 'Day-by-day schedule with morning, afternoon, and evening sessions. Highest-ROI topics first.', section: 'calendar' },
  { icon: '🗺️', title: 'Interview Roadmap', body: '8 interview categories broken down: what\'s evaluated, questions asked, how to answer excellently.', section: 'roadmap' },
  { icon: '⚡', title: `${totalChallenges} Coding Challenges`, body: 'JavaScript, Golang, Python, Rust, TS, Solidity, Security, DevOps, Architecture, and more. Organized by difficulty.', section: 'challenges' },
  { icon: '📐', title: 'Coding Standards', body: 'Clean Code, SOLID, DRY/KISS/YAGNI, JS best practices, idiomatic Go, API design.', section: 'standards' },
  { icon: '🤝', title: 'Pair Programming', body: 'How to communicate, clarify, structure solutions aloud, handle feedback, recover when stuck.', section: 'pairing' },
  { icon: '👔', title: 'Behavioral & Leadership', body: 'STAR stories for ICs and managers — ownership, conflict, decision-making, hiring (when relevant).', section: 'leadership' },
  { icon: '🎯', title: 'Mock Interview Mode', body: 'Random question, timer, reveal-on-click. Filter by category, difficulty, and target FAANG company.', section: 'mock' },
  { icon: '📊', title: 'Progress Dashboard', body: 'See completion per category, FAANG-tagged progress, weakest categories to drill next.', section: 'progress' },
  { icon: '💼', title: 'Career — End-to-End', body: 'Recruiter screens, negotiation scripts, first-90-days plan. The parts of job-hunting most prep sites skip.', section: 'career' },
  { icon: '🏢', title: 'FAANG Playbooks', body: 'Per-company guides: what Meta optimizes for, Amazon LP framework, Google\'s "Googleyness", and more.', section: 'companies' },
  { icon: '🚨', title: 'Emergency Shortlists', body: 'Top 20 challenges only · 2-hour/day compressed plan · Interview-day playbook.', section: 'calendar' },
  { icon: '🎯', title: 'Interview-Day Strategy', body: 'Hour-by-hour playbook for the day of the interview. Mental prep, logistics, execution.', section: 'playbook' },
]

export default function Home({ onNavigate }) {
  return (
    <div>
      <div className="hero">
        <div className="hero-label">Engineer Interview Prep</div>
        <h1>Interview prep for every engineering level</h1>
        <p>Coding, system design, behavioral, and leadership prep — covering IC, Senior, Staff, Lead, and EM rounds. Filter by role and target company.</p>
        <div className="hero-stats">
          <button className="stat stat-link" onClick={() => onNavigate('calendar')} title="Open 7-Day Plan">
            <div className="stat-num"><CountUp target={7} /></div>
            <div className="stat-label">Day Plan →</div>
          </button>
          <button className="stat stat-link" onClick={() => onNavigate('challenges')} title="Open Challenges">
            <div className="stat-num"><CountUp target={totalChallenges} suffix="+" /></div>
            <div className="stat-label">Question Bank →</div>
          </button>
          <button className="stat stat-link" onClick={() => onNavigate('roadmap')} title="Open Roadmap">
            <div className="stat-num"><CountUp target={8} /></div>
            <div className="stat-label">Interview Types →</div>
          </button>
        </div>
        <div className="hero-stats-note">
          The <button className="hero-inline-link" onClick={() => onNavigate('calendar')}>7-day plan</button> picks a curated handful from the bank — enough to get you interview-ready in a week. The full <button className="hero-inline-link" onClick={() => onNavigate('challenges')}>{totalChallenges}+ bank</button> is yours for ongoing prep beyond that.
        </div>
      </div>

      <div className="start-here">
        <div className="start-here-label">Start Here · 5 minutes</div>
        <div className="start-here-title">New to CRACKED? Try this 3-step flow</div>
        <div className="start-here-steps">
          <button className="start-here-step" onClick={() => onNavigate('companies')}>
            <span className="start-here-step-num">1</span>
            <span className="start-here-step-title">Pick a target company</span>
            <span className="start-here-step-body">Read the FAANG playbook for the company you&apos;re prepping for. Different companies want different things.</span>
          </button>
          <button className="start-here-step" onClick={() => onNavigate('mock')}>
            <span className="start-here-step-num">2</span>
            <span className="start-here-step-title">Run a mock round</span>
            <span className="start-here-step-body">Filter by your target + difficulty. Solve out loud, then reveal hints. Marks done automatically.</span>
          </button>
          <button className="start-here-step" onClick={() => onNavigate('progress')}>
            <span className="start-here-step-num">3</span>
            <span className="start-here-step-title">Track + return</span>
            <span className="start-here-step-body">Progress shows your weakest categories and what&apos;s due for review. Iterate daily.</span>
          </button>
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
