"use client"
import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

type UserRole = 'investor' | 'founder'

interface RoleContextType {
  role: UserRole
  setRole: (role: UserRole) => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('investor')

  // Load role from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') as UserRole
    if (savedRole) {
      setRole(savedRole)
    }
  }, [])

  // Save role to localStorage whenever it changes
  const handleSetRole = (newRole: UserRole) => {
    setRole(newRole)
    localStorage.setItem('userRole', newRole)
  }

  return (
    <RoleContext.Provider value={{ role, setRole: handleSetRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export const useRole = () => {
  const context = useContext(RoleContext)
  if (!context) throw new Error('useRole must be used within RoleProvider')
  return context
} 