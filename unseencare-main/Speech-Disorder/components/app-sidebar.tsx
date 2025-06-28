"use client"

import {
  Home,
  Eye,
  Shield,
  Gamepad2,
  MessageCircle,
  ImageIcon,
  Pill,
  BookOpen,
  Clock,
  Music,
  Settings,
} from "lucide-react"
import { Sidebar } from "@/components/UI/Sidebar"

export function AppSidebar() {
  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Eye, label: "Recognition", href: "/recognition" },
    { icon: Shield, label: "Safety Zones", href: "/safety-zones" },
    { icon: Gamepad2, label: "Activities", href: "/activities" },
    { icon: MessageCircle, label: "Chat", href: "/chat" },
    { icon: ImageIcon, label: "Albums", href: "/albums" },
    { icon: Pill, label: "Medication", href: "/medication" },
    { icon: BookOpen, label: "Journal", href: "/journal", active: true },
    { icon: Clock, label: "Reminders", href: "/reminders" },
    { icon: Music, label: "Music Therapy", href: "/music-therapy" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <Sidebar className="border-r-0 bg-white">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#E94D97] rounded-full flex items-center justify-center text-white">
            <BookOpen className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-[#A259FF]">NeuroNest</h1>
        </div>

        <button className="w-full bg-[#A259FF] hover:bg-[#8A4DD3] text-white rounded-full py-2 px-4 mb-8">
          Sign In
        </button>
      </div>

      <div className="p-4">
        {menuItems.map((item, index) => (
          <a href={item.href} key={index} className={`flex items-center gap-4 h-10 rounded-lg px-2 mb-2 ${item.active ? "bg-[#F8E1F0] text-[#E94D97]" : "hover:bg-[#FFF5FA] hover:text-[#E94D97]"}`}>
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </Sidebar>
  )
}
