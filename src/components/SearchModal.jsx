import { useState, useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { search } from '../utils/search'

const KIND_LABELS = {
  challenge: 'Challenge',
  roadmap: 'Roadmap',
  behavioral: 'Behavioral',
}

export default function SearchModal({ open, onClose, onNavigate }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const results = useMemo(() => search(query, 30), [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  useEffect(() => { setActive(0) }, [query])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)) }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)) }
      else if (e.key === 'Enter' && results[active]) { e.preventDefault(); selectResult(results[active]) }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, results, active])

  useEffect(() => {
    if (!listRef.current) return
    const item = listRef.current.querySelector(`[data-idx="${active}"]`)
    item?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const selectResult = (r) => {
    if (r.kind === 'challenge') {
      onNavigate('challenges', { category: r.category, challengeId: r.id, lang: r.lang })
    } else if (r.kind === 'roadmap') {
      onNavigate('roadmap', null)
    } else if (r.kind === 'behavioral') {
      onNavigate('leadership', null)
    }
    onClose()
  }

  if (!open) return null

  return createPortal(
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-input-wrap">
          <span className="search-icon">🔎</span>
          <input
            ref={inputRef}
            className="search-input"
            placeholder="Search 700+ challenges, roadmap & behavioral questions…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            spellCheck={false}
            autoComplete="off"
          />
          <span className="search-shortcut">esc</span>
        </div>

        {query.length < 2 && (
          <div className="search-hint">
            Tip: type two or more characters · arrow keys to navigate · enter to open
          </div>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="search-hint">No matches for &ldquo;{query}&rdquo;</div>
        )}

        {results.length > 0 && (
          <div ref={listRef} className="search-results">
            {results.map((r, i) => (
              <button
                key={`${r.kind}-${r.id ?? r.title}-${i}`}
                data-idx={i}
                className={`search-result${i === active ? ' active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => selectResult(r)}
              >
                <span className={`search-kind kind-${r.kind}`}>{KIND_LABELS[r.kind]}</span>
                <span className="search-title">{r.title}</span>
                <span className="search-meta">
                  {r.kind === 'challenge' ? `${r.lang} · ${r.diff}` : (r.section ?? '')}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="search-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>,
    document.body
  )
}
