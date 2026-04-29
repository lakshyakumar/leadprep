import { useState, useEffect, lazy, Suspense } from 'react'
import Nav from './components/Nav'
import Home from './components/Home'
import Scratchpad from './components/Scratchpad'
import Footer from './components/Footer'
import { useUrlSection } from './utils/urlState'

// Lazy-load SearchModal — pulls in data.js via the search index, so deferring this
// keeps data.js out of the initial bundle.
const SearchModal = lazy(() => import('./components/SearchModal'))

// Lazy-load every section that isn't the landing page.
// Each becomes its own chunk; first visit downloads only Home + nav + footer.
const Calendar    = lazy(() => import('./components/Calendar'))
const Roadmap     = lazy(() => import('./components/Roadmap'))
const Challenges  = lazy(() => import('./components/Challenges'))
const Standards   = lazy(() => import('./components/Standards'))
const Pairing     = lazy(() => import('./components/Pairing'))
const Leadership  = lazy(() => import('./components/Leadership'))
const Playbook    = lazy(() => import('./components/Playbook'))
const Companies   = lazy(() => import('./components/Companies'))
const Progress    = lazy(() => import('./components/Progress'))
const Mock        = lazy(() => import('./components/Mock'))
const Career      = lazy(() => import('./components/Career'))

// Primary nav: daily-use sections. Stays visible at all widths.
const SECTIONS = [
  { id: 'home', label: 'Overview' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'mock', label: 'Mock' },
  { id: 'progress', label: 'Progress' },
  { id: 'companies', label: 'Companies' },
  { id: 'leadership', label: 'Behavioral' },
  { id: 'career', label: 'Career' },
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
  career: Career,
  standards: Standards,
  pairing: Pairing,
  leadership: Leadership,
  playbook: Playbook,
}

export default function App() {
  const [activeSection, setUrlSection] = useUrlSection('home')
  const [navIntent, setNavIntent] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)

  // If hash points at an unknown section, fall back to home (avoids blank page)
  const safeSection = SECTION_COMPONENTS[activeSection] ? activeSection : 'home'
  const ActiveComponent = SECTION_COMPONENTS[safeSection]

  const navigate = (sectionId, intent = null) => {
    // Translate a navIntent into URL params for the destination section.
    // Currently only Challenges consumes intent; other sections get clean URLs.
    const params = {}
    if (sectionId === 'challenges' && intent) {
      if (intent.category) params.cat = intent.category
      if (intent.diff) params.diff = intent.diff
      if (intent.challengeId && intent.lang) params.q = `${intent.lang}-${intent.challengeId}`
    }
    setUrlSection(sectionId, params)
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
        <Suspense fallback={<div className="section-loading">Loading…</div>}>
          <ActiveComponent onNavigate={navigate} navIntent={activeSection === 'challenges' ? navIntent : null} clearNavIntent={() => setNavIntent(null)} />
        </Suspense>
      </main>
      <Footer />
      <Scratchpad />
      {searchOpen && (
        <Suspense fallback={null}>
          <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={navigate} />
        </Suspense>
      )}
    </>
  )
}
