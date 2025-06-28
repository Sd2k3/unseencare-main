import type { LucideIcon } from "lucide-react"

/**
 * TypeScript Interfaces for React + Vite App
 */

export interface JournalEntry {
  id: string
  title: string
  content: string
  date: string
  hasRecording?: boolean
  recordingDuration?: string
  type: "text" | "voice"
  createdAt: Date
}

export interface PracticeActivity {
  id: string
  title: string
  description: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  category: "Articulation" | "Fluency" | "Voice" | "Vocabulary"
  completed: boolean
  completedAt?: Date
}

export interface ProgressStats {
  totalEntries: number
  thisWeek: number
  textEntries: number
  voiceEntries: number
  streak: number
  weeklyProgress: WeeklyProgress[]
  totalPracticeTime: number
  averageScore: number
}

export interface WeeklyProgress {
  day: string
  progress: number
  date: Date
}

export interface MenuItem {
  id: string
  label: string
  icon: LucideIcon
  href: string
  active?: boolean
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: LucideIcon
  color: string
  unlockedAt?: Date
}

export interface UserSettings {
  theme: "light" | "dark"
  fontSize: "small" | "medium" | "large"
  notifications: {
    practiceReminders: boolean
    progressUpdates: boolean
    achievements: boolean
  }
  audio: {
    microphoneEnabled: boolean
    playbackVolume: number
    speechRecognitionSensitivity: number
  }
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
