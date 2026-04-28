import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Home from './components/Home'
import Calendar from './components/Calendar'
import Roadmap from './components/Roadmap'
import Challenges from './components/Challenges'
import Standards from './components/Standards'
import Pairing from './components/Pairing'
import Leadership from './components/Leadership'
import Playbook from './components/Playbook'
import Companies from './components/Companies'
import Progress from './components/Progress'
import Mock from './components/Mock'
import Scratchpad from './components/Scratchpad'
import Footer from './components/Footer'
import SearchModal from './components/SearchModal'

// Primary nav: daily-use sections. Stays visible at all widths.
const SECTIONS = [
  { id: 'home', label: 'Overview' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'mock', label: 'Mock' },
  { id: 'progress', label: 'Progress' },
  { id: 'companies', label: 'Companies' },
  { id: 'leadership', label: 'Behavioral' },
]

// Secondary nav: planning + reference. Lives under a "More" dropdown.
const MORE_SECTIONS = [
  { id: 'calendar', label: '7-Day Plan' },
  { id: 'playbook', label: 'Playbook' },
  { id: 'standards', label: 'Standards' },
  { id: 'pairing', label: 'Pairing' },
]

const SECTION_COMPONENTS = {
  home: Home,
  calendar: Calendar,
  roadmap: Roadmap,
  challenges: Challenges,
  mock: Mock,
  progress: Progress,
  companies: Companies,
  standards: Standards,
  pairing: Pairing,
  leadership: Leadership,
  playbook: Playbook,
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [navIntent, setNavIntent] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const ActiveComponent = SECTION_COMPONENTS[activeSection]

  const navigate = (sectionId, intent = null) => {
    setActiveSection(sectionId)
    setNavIntent(intent)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/') {
        const tag = (e.target?.tagName || '').toLowerCase()
        const editable = tag === 'input' || tag === 'textarea' || e.target?.isContentEditable
        if (editable) return
        e.preventDefault()
        setSearchOpen(true)
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <Nav sections={SECTIONS} moreSections={MORE_SECTIONS} activeSection={activeSection} onNavigate={navigate} onOpenSearch={() => setSearchOpen(true)} />
      <main className={`section active`}>
        <ActiveComponent onNavigate={navigate} navIntent={activeSection === 'challenges' ? navIntent : null} clearNavIntent={() => setNavIntent(null)} />
      </main>
      <Footer />
      <Scratchpad />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={navigate} />
    </>
  )
}
