/**
 * Application Constants for React + Vite App
 */

export const APP_NAME = "NeuroNest"
export const APP_VERSION = "1.0.0"

export const ROUTES = {
  DASHBOARD: "/",
  JOURNAL: "/journal",
  ACTIVITIES: "/activities",
  PROGRESS: "/progress",
  SETTINGS: "/settings",
} as const

export const DIFFICULTY_LEVELS = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
} as const

export const ACTIVITY_CATEGORIES = {
  ARTICULATION: "Articulation",
  FLUENCY: "Fluency",
  VOICE: "Voice",
  VOCABULARY: "Vocabulary",
} as const

export const COLORS = {
  PRIMARY: "#E94D97",
  SECONDARY: "#A259FF",
  BACKGROUND: "#FFF5FA",
  WHITE: "#FFFFFF",
} as const
