import { createContext, useContext, useState } from 'react'

export const ROLES = ['all', 'ic', 'senior', 'staff', 'lead', 'em']

export const ROLE_LABELS = {
  all: 'All',
  ic: 'IC',
  senior: 'Senior',
  staff: 'Staff',
  lead: 'Lead',
  em: 'EM',
}

const RoleContext = createContext({ role: 'all', setRole: () => {} })

export function RoleProvider({ children }) {
  const [role, setRoleState] = useState(() => {
    try {
      const saved = localStorage.getItem('user_role')
      return ROLES.includes(saved) ? saved : 'all'
    } catch {
      return 'all'
    }
  })

  const setRole = (next) => {
    if (!ROLES.includes(next)) return
    setRoleState(next)
    try { localStorage.setItem('user_role', next) } catch {}
  }

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  return useContext(RoleContext)
}
