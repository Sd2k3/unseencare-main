import type { JournalEntry, PracticeActivity, ProgressStats } from "@/types"

/**
 * Mock Data for React + Vite Development
 */

const formatDate = (date: Date): string => {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) {
    return `Today, ${date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`
  } else if (diffInDays === 1) {
    return `Yesterday, ${date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago, ${date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`
  } else {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }
}

export const mockJournalEntries: JournalEntry[] = [
  {
    id: "1",
    title: "Morning Practice",
    content:
      "Completed articulation exercises focusing on 'S' and 'R' sounds. Feeling more confident with my pronunciation today.",
    date: formatDate(new Date()),
    type: "text",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Speech Therapy Session",
    content: "Had a productive session with my therapist. We worked on fluency techniques and breathing exercises.",
    date: formatDate(new Date(Date.now() - 86400000)),
    type: "text",
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: "3",
    title: "Vocabulary Practice",
    content: 'Learned 5 new words today and practiced using them in sentences. My favorite new word is "resilience".',
    date: formatDate(new Date(Date.now() - 259200000)),
    type: "text",
    createdAt: new Date(Date.now() - 259200000),
  },
  {
    id: "4",
    title: "Voice Recording",
    content: "Recorded myself reading a paragraph to track my progress. I can hear improvement in my fluency.",
    date: formatDate(new Date(Date.now() - 604800000)),
    hasRecording: true,
    recordingDuration: "1:24",
    type: "voice",
    createdAt: new Date(Date.now() - 604800000),
  },
]

export const mockActivities: PracticeActivity[] = [
  {
    id: "1",
    title: "Articulation Practice",
    description: "Focus on clear pronunciation of challenging sounds like S, R, and TH",
    duration: "10 min",
    difficulty: "Beginner",
    category: "Articulation",
    completed: false,
  },
  {
    id: "2",
    title: "Fluency Exercises",
    description: "Breathing techniques and smooth speech patterns to improve flow",
    duration: "15 min",
    difficulty: "Intermediate",
    category: "Fluency",
    completed: true,
    completedAt: new Date(),
  },
  {
    id: "3",
    title: "Voice Modulation",
    description: "Practice pitch, tone, and volume control for expressive speech",
    duration: "12 min",
    difficulty: "Advanced",
    category: "Voice",
    completed: false,
  },
  {
    id: "4",
    title: "Vocabulary Builder",
    description: "Learn new words and practice using them in context",
    duration: "8 min",
    difficulty: "Beginner",
    category: "Vocabulary",
    completed: false,
  },
]

export const mockProgressStats: ProgressStats = {
  totalEntries: 12,
  thisWeek: 4,
  textEntries: 8,
  voiceEntries: 4,
  streak: 3,
  totalPracticeTime: 12.5,
  averageScore: 89,
  weeklyProgress: [
    { day: "Mon", progress: 80, date: new Date() },
    { day: "Tue", progress: 65, date: new Date() },
    { day: "Wed", progress: 90, date: new Date() },
    { day: "Thu", progress: 75, date: new Date() },
    { day: "Fri", progress: 85, date: new Date() },
    { day: "Sat", progress: 70, date: new Date() },
    { day: "Sun", progress: 65, date: new Date() },
  ],
}
