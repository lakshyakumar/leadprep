import { useState } from 'react'
import Nav from './components/Nav'
import Home from './components/Home'
import Calendar from './components/Calendar'
import Roadmap from './components/Roadmap'
import Challenges from './components/Challenges'
import Standards from './components/Standards'
import Pairing from './components/Pairing'
import Leadership from './components/Leadership'
import Playbook from './components/Playbook'
import Scratchpad from './components/Scratchpad'

const SECTIONS = [
  { id: 'home', label: 'Overview' },
  { id: 'calendar', label: '7-Day Plan' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'standards', label: 'Standards' },
  { id: 'pairing', label: 'Pair Programming' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'playbook', label: 'Playbook' },
]

const SECTION_COMPONENTS = {
  home: Home,
  calendar: Calendar,
  roadmap: Roadmap,
  challenges: Challenges,
  standards: Standards,
  pairing: Pairing,
  leadership: Leadership,
  playbook: Playbook,
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const ActiveComponent = SECTION_COMPONENTS[activeSection]

  return (
    <>
      <Nav sections={SECTIONS} activeSection={activeSection} onNavigate={setActiveSection} />
      <div className={`section active`}>
        <ActiveComponent onNavigate={setActiveSection} />
      </div>
      <Scratchpad />
    </>
  )
}
