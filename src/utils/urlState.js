// Hash-based URL state — no router dependency.
//
// Format:
//   #section?key1=val1&key2=val2
//
// The section is the active page (e.g. 'challenges', 'mock'). Params after `?`
// are filters/intent specific to that section. Default values ('all', empty)
// are stripped so URLs stay short.
//
// Why hash, not pathname? Static hosts (GitHub Pages, simple S3 buckets) can't
// rewrite arbitrary paths to index.html without server config. Hash routing
// works on any static host and survives reload trivially.

import { useState, useEffect, useCallback } from 'react'

function readSection() {
  const raw = (typeof window !== 'undefined' ? window.location.hash : '').replace(/^#/, '')
  return raw.split('?')[0] || ''
}

function readParams() {
  if (typeof window === 'undefined') return {}
  const raw = window.location.hash.replace(/^#/, '')
  const [, query = ''] = raw.split('?')
  return Object.fromEntries(new URLSearchParams(query))
}

function buildHash(section, params) {
  const cleaned = Object.entries(params).filter(([, v]) =>
    v != null && v !== '' && v !== 'all'
  )
  const qs = cleaned
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
  if (!section) return ''
  return qs ? `#${section}?${qs}` : `#${section}`
}

function writeHash(section, params) {
  if (typeof window === 'undefined') return
  const next = buildHash(section, params)
  if (window.location.hash === next) return
  // replaceState avoids spamming history. Use pushState if you want every
  // filter change to be a back-button stop — most users don't.
  window.history.replaceState(null, '', next || window.location.pathname + window.location.search)
}

// Hook: read+write the active section.
// `navigate(section, params)` writes both the section and the params atomically.
export function useUrlSection(defaultSection = 'home') {
  const [section, setSection] = useState(() => readSection() || defaultSection)

  useEffect(() => {
    const onChange = () => {
      const next = readSection() || defaultSection
      setSection(prev => (prev === next ? prev : next))
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [defaultSection])

  const navigate = useCallback((nextSection, nextParams = {}) => {
    writeHash(nextSection, nextParams)
    setSection(nextSection)
    // notify same-tab listeners (hashchange only fires for OTHER changes sometimes)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }, [])

  return [section, navigate]
}

// Hook: read+write a single URL param. Re-renders when external nav changes it.
export function useUrlParam(key, defaultValue = 'all') {
  const [value, setValue] = useState(() => readParams()[key] ?? defaultValue)

  useEffect(() => {
    const onChange = () => {
      const next = readParams()[key] ?? defaultValue
      setValue(prev => (prev === next ? prev : next))
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [key, defaultValue])

  const update = useCallback((newValue) => {
    const section = readSection() || 'home'
    const params = readParams()
    if (newValue == null || newValue === '' || newValue === defaultValue) {
      delete params[key]
    } else {
      params[key] = newValue
    }
    writeHash(section, params)
    setValue(newValue == null || newValue === '' ? defaultValue : newValue)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }, [key, defaultValue])

  return [value, update]
}

// Build a shareable URL for a specific section + params.
// Used by "Copy link" buttons.
export function buildShareUrl(section, params = {}) {
  if (typeof window === 'undefined') return ''
  const hash = buildHash(section, params)
  const { origin, pathname } = window.location
  return `${origin}${pathname}${hash}`
}
