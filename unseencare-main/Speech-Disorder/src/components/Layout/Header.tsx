import type React from "react"
import { Bell, Search, User } from "lucide-react"
import Button from "@/components/UI/Button"

/**
 * Header Component for React + Vite
 */
const Header: React.FC = () => {
  return (
    <header className="bg-card border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-text-primary">Welcome back!</h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              aria-label="Search"
            />
          </div>

          {/* Notifications */}
          <button
            className="relative p-2 text-text-secondary hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full" aria-hidden="true"></span>
          </button>

          {/* Profile */}
          <Button variant="ghost" className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
