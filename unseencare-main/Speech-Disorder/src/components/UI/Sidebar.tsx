import React, { createContext, useContext, useState } from 'react'
import { cn } from '@/utils/cn'

interface SidebarContextType {
  isOpen: boolean
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  )
}

interface SidebarProps {
  children: React.ReactNode
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = ({ children, className }) => {
  const { isOpen } = useSidebar()

  return (
    <aside
      className={cn(
        'bg-white border-r border-gray-200 transition-all duration-300',
        isOpen ? 'w-64' : 'w-16',
        className
      )}
    >
      {children}
    </aside>
  )
} 