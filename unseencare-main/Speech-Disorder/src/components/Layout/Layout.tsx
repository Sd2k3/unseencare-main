import type React from "react"
import { AppSidebar } from "./Sidebar"
import Header from "./Header"

interface LayoutProps {
  children: React.ReactNode
}

/**
 * Main Layout Component for React + Vite
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col ml-0 lg:ml-64 transition-all duration-300">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default Layout
