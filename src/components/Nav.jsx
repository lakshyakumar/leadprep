import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useRole, ROLES, ROLE_LABELS } from '../context/RoleContext'
import { useTheme } from '../context/ThemeContext'
import LogoMark from './LogoMark'

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}

function MoreMenu({ sections, activeSection, onNavigate }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const triggerRef = useRef(null)
  const menuRef = useRef(null)
  const activeInMore = sections.some(s => s.id === activeSection)

  useEffect(() => {
    if (!open) return
    if (triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect()
      setPos({ top: r.bottom + 6, left: r.left })
    }
    const onDocClick = (e) => {
      if (triggerRef.current?.contains(e.target)) return
      if (menuRef.current?.contains(e.target)) return
      setOpen(false)
    }
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onEsc)
    }
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        className={`nav-btn nav-more${activeInMore ? ' active' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        More <span className="nav-more-chevron">{open ? '▴' : '▾'}</span>
      </button>
      {open && createPortal(
        <div
          ref={menuRef}
          className="more-menu"
          role="menu"
          style={{ top: pos.top, left: pos.left }}
        >
          {sections.map(s => (
            <button
              key={s.id}
              role="menuitem"
              className={`more-menu-item${activeSection === s.id ? ' active' : ''}`}
              onClick={() => { onNavigate(s.id); setOpen(false) }}
            >
              {s.label}
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  )
}

function RoleDropdown() {
  const { role, setRole } = useRole()
  const [open, setOpen] = useState(false)
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 })
  const triggerRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return
    if (triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect()
      setMenuPos({ top: r.bottom + 6, right: window.innerWidth - r.right })
    }
    const onDocClick = (e) => {
      if (triggerRef.current?.contains(e.target)) return
      if (menuRef.current?.contains(e.target)) return
      setOpen(false)
    }
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onEsc)
    }
  }, [open])

  return (
    <div className="role-dropdown">
      <button
        ref={triggerRef}
        className={`role-trigger${open ? ' open' : ''}`}
        onClick={() => setOpen(o => !o)}
        title="Filter content for your role"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="role-trigger-label">Role</span>
        <span className="role-trigger-value">{ROLE_LABELS[role]}</span>
        <span className="role-trigger-chevron">{open ? '▴' : '▾'}</span>
      </button>
      {open && createPortal(
        <div
          ref={menuRef}
          className="role-menu"
          role="listbox"
          style={{ top: menuPos.top, right: menuPos.right }}
        >
          {ROLES.map(r => (
            <button
              key={r}
              role="option"
              aria-selected={role === r}
              className={`role-menu-item${role === r ? ' active' : ''}`}
              onClick={() => { setRole(r); setOpen(false) }}
            >
              {ROLE_LABELS[r]}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  )
}

export default function Nav({ sections, moreSections = [], activeSection, onNavigate, onOpenSearch }) {
  const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform)
  return (
    <nav className="nav">
      <div className="nav-brand">
        <LogoMark size={22} className="nav-brand-mark" />
        <span className="nav-brand-text">CRACKED</span>
      </div>
      {sections.map(s => (
        <button
          key={s.id}
          className={`nav-btn${activeSection === s.id ? ' active' : ''}`}
          onClick={() => onNavigate(s.id)}
        >
          {s.label}
        </button>
      ))}
      {moreSections.length > 0 && (
        <MoreMenu sections={moreSections} activeSection={activeSection} onNavigate={onNavigate} />
      )}
      <button
        className="nav-search-btn"
        onClick={onOpenSearch}
        title={`Search (${isMac ? '⌘K' : 'Ctrl+K'} or /)`}
        aria-label="Open search"
      >
        <span className="nav-search-icon">🔎</span>
        <kbd className="nav-search-kbd">/</kbd>
      </button>
      <ThemeToggle />
      <RoleDropdown />
    </nav>
  )
}
