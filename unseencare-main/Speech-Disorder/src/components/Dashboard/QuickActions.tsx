"use client"

import type React from "react"
import { Play, Mic, BookOpen, Camera } from "lucide-react"
import { Card, CardContent } from "@/components/UI/Card"

/**
 * Quick Actions Component for React + Vite
 */
const QuickActions: React.FC = () => {
  const actions = [
    {
      id: "quick-practice",
      title: "Quick Practice",
      description: "Start a 5-minute session",
      icon: Play,
      color: "bg-blue-100 text-blue-600",
      hoverColor: "group-hover:bg-blue-500 group-hover:text-white",
    },
    {
      id: "voice-journal",
      title: "Voice Journal",
      description: "Record your thoughts",
      icon: Mic,
      color: "bg-green-100 text-green-600",
      hoverColor: "group-hover:bg-green-500 group-hover:text-white",
    },
    {
      id: "word-of-day",
      title: "Word of the Day",
      description: 'Learn "Resilience"',
      icon: BookOpen,
      color: "bg-purple-100 text-purple-600",
      hoverColor: "group-hover:bg-purple-500 group-hover:text-white",
    },
    {
      id: "mirror-practice",
      title: "Mirror Practice",
      description: "Visual feedback tool",
      icon: Camera,
      color: "bg-orange-100 text-orange-600",
      hoverColor: "group-hover:bg-orange-500 group-hover:text-white",
    },
  ]

  const handleActionClick = (actionId: string) => {
    console.log(`Action clicked: ${actionId}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <Card key={action.id} className="group cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleActionClick(action.id)}>
            <CardContent className="p-6 text-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${action.color} ${action.hoverColor}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">{action.title}</h3>
              <p className="text-sm text-text-secondary">{action.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default QuickActions
