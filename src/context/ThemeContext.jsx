import { createContext, useContext, useEffect, useState } from 'react'

const THEMES = ['dark', 'light']
const ThemeContext = createContext({ theme: 'dark', setTheme: () => {}, toggle: () => {} })

function readInitial() {
  try {
    const saved = localStorage.getItem('cracked_theme')
    if (THEMES.includes(saved)) return saved
  } catch {}
  // Respect system preference on first visit
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: light)').matches) {
    return 'light'
  }
  return 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readInitial)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const setTheme = (next) => {
    if (!THEMES.includes(next)) return
    setThemeState(next)
    try { localStorage.setItem('cracked_theme', next) } catch {}
  }
  const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() { return useContext(ThemeContext) }
