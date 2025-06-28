import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence, easeInOut, easeOut, easeIn } from "framer-motion"
import {
  Heart,
  Home,
  Gamepad2,
  MessageCircle,
  Pill,
  BookOpen,
  Clock,
  Music,
  Settings,
  Menu,
  X,
  ChevronRight,
  Mic,
  Languages,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../utils/cn"

const sidebarVariants = {
  open: {
    width: "16rem",
    transition: {
      duration: 0.3,
      ease: easeInOut,
    },
  },
  closed: {
    width: "4rem",
    transition: {
      duration: 0.3,
      ease: easeInOut,
    },
  },
}

const menuItemVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: easeOut,
    },
  },
  closed: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.15,
      ease: easeIn,
    },
  },
}

export const AppSidebar: React.FC = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/" },
  
    { icon: Mic, label: "Voice Recognition", href: "/recogination" },
    { icon: Languages, label: "Sign Reader", href: "/sign-lang-reader" },
    { icon: Gamepad2, label: "Activities", href: "/activities" },
    { icon: MessageCircle, label: "Chat", href: "/chat" },
    { icon: Pill, label: "Practice", href: "/practice" },
    { icon: BookOpen, label: "Journal", href: "/journal" },
    { icon: Clock, label: "Reminders", href: "/reminders" },
    { icon: Music, label: "Karaoke Therapy", href: "/karaoke" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        className="fixed top-4 left-4 z-50 lg:hidden bg-gradient-to-r from-rose-500 to-pink-500 text-white p-3 rounded-xl shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isMobileOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Fixed position, full height, no scroll */}
      <motion.aside
        className={cn(
          "fixed left-0 top-0 h-screen z-40 bg-white border-r border-gray-200 shadow-lg overflow-hidden",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
        variants={sidebarVariants}
        animate={isOpen ? "open" : "closed"}
        initial="open"
      >
        {/* Scrollable content container */}
        <div className="h-full flex flex-col overflow-hidden">
          {/* Header - Fixed at top */}
          <div className="flex-shrink-0 p-6 border-b border-gray-100">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-md"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Heart className="w-6 h-6" />
              </motion.div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div variants={menuItemVariants} initial="closed" animate="open" exit="closed">
                    <h1 className="text-2xl font-bold text-gray-800">
                      UnseenCare
                    </h1>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Desktop Toggle Button */}
              <motion.button
                className="hidden lg:block ml-auto p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  animate={{ rotate: isOpen ? 0 : 180 }} 
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>

          {/* Sign In Button - Fixed below header */}
          <div className="flex-shrink-0 p-6 pt-4">
            <AnimatePresence>
              {isOpen && (
                <motion.div variants={menuItemVariants} initial="closed" animate="open" exit="closed">
                  <motion.button
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl py-3 px-6 font-semibold shadow-md transition-all duration-200"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign In
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation - Scrollable area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <nav>
              <motion.ul
                className="space-y-2"
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: {
                      staggerChildren: 0.03,
                      delayChildren: 0.1,
                    },
                  },
                }}
              >
                {menuItems.map((item, index) => {
                  const isActive = location.pathname === item.href
                  const Icon = item.icon

                  return (
                    <motion.li
                      key={index}
                      variants={{
                        open: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.2,
                            ease: "easeOut",
                          },
                        },
                        closed: {
                          opacity: 0,
                          y: 10,
                        },
                      }}
                    >
                      <Link to={item.href} onClick={() => setIsMobileOpen(false)} className="block">
                        <motion.div
                          className={cn(
                            "flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative",
                            isActive
                              ? "bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 shadow-sm border border-rose-100"
                              : "text-gray-600 hover:bg-gray-50 hover:text-rose-600",
                          )}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                        >
                          {/* Active indicator */}
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-500 to-pink-500 rounded-r-full"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                exit={{ scaleY: 0 }}
                                transition={{ duration: 0.2 }}
                              />
                            )}
                          </AnimatePresence>

                          <motion.div className="flex items-center gap-4 w-full">
                            <motion.div
                              className={cn(
                                "p-2 rounded-lg transition-colors",
                                isActive
                                  ? "bg-gradient-to-r from-rose-100 to-pink-100"
                                  : "group-hover:bg-rose-50",
                              )}
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.15 }}
                            >
                              <Icon className="w-5 h-5" />
                            </motion.div>

                            <AnimatePresence>
                              {isOpen && (
                                <motion.span
                                  variants={menuItemVariants}
                                  initial="closed"
                                  animate="open"
                                  exit="closed"
                                  className="font-medium"
                                >
                                  {item.label}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </motion.div>
                      </Link>
                    </motion.li>
                  )
                })}
              </motion.ul>
            </nav>
          </div>

          {/* Footer - Fixed at bottom */}
          <div className="flex-shrink-0 p-6 pt-0 border-t border-gray-100">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <div className="text-xs text-gray-500 text-center">
                    Made with ❤️ for better care
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>
    </>
  )
}