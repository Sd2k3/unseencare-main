"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Variants } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
  Mic,
  Play,
  Calendar,
  Plus,
  Heart,
  Sparkles,
  Volume2,
  Edit3,
  Trash2,
  Star,
  TrendingUp,
  BookOpen,
  Headphones,
} from "lucide-react"
import { cn } from "../utils/cn"

const Journal: React.FC = () => {
  const navigate = useNavigate()
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [showNewEntry, setShowNewEntry] = useState(false)

  const journalEntries = [
    {
      id: 1,
      title: "Morning Practice Session",
      content:
        "Had an amazing breakthrough today! Finally mastered the 'R' sound that I've been struggling with. The tongue placement technique Dr. Chen taught me really clicked during today's practice.",
      date: "Today, 10:30 AM",
      mood: "excited",
      hasRecording: true,
      recordingDuration: "2:34",
      tags: ["Articulation", "Breakthrough", "R-sound"],
      progress: 85,
    },
    {
      id: 2,
      title: "Speech Therapy Session",
      content:
        "Had a productive session with my therapist. We worked on fluency techniques and breathing exercises. I'm feeling more confident about speaking in public now.",
      date: "Yesterday, 2:15 PM",
      mood: "confident",
      hasRecording: false,
      tags: ["Fluency", "Therapy", "Confidence"],
      progress: 78,
    },
    {
      id: 3,
      title: "Vocabulary Expansion",
      content:
        "Learned 8 new challenging words today and practiced using them in different contexts. My pronunciation is getting clearer with each practice session.",
      date: "3 days ago, 7:45 PM",
      mood: "proud",
      hasRecording: true,
      recordingDuration: "1:56",
      tags: ["Vocabulary", "Pronunciation", "Practice"],
      progress: 92,
    },
    {
      id: 4,
      title: "Reading Practice",
      content:
        "Recorded myself reading my favorite poem. It's incredible to hear the improvement compared to last month's recording. My pace is more natural now.",
      date: "Last week, 11:20 AM",
      mood: "happy",
      hasRecording: true,
      recordingDuration: "3:12",
      tags: ["Reading", "Progress", "Recording"],
      progress: 88,
    },
  ]

  const popularTopics = [
    { name: "Articulation", count: 15, color: "from-pink-500 to-rose-400" },
    { name: "Fluency", count: 12, color: "from-rose-500 to-pink-400" },
    { name: "Vocabulary", count: 8, color: "from-pink-400 to-peach-400" },
    { name: "Practice", count: 20, color: "from-peach-500 to-orange-400" },
    { name: "Progress", count: 10, color: "from-orange-400 to-peach-400" },
  ]

  const moodEmojis = {
    excited: "🎉",
    confident: "💪",
    proud: "🌟",
    happy: "😊",
    focused: "🎯",
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  }

  const entryVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  }

  const handleRecordToggle = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      setTimeout(() => setIsRecording(false), 3000) // Auto stop after 3 seconds for demo
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-peach-50 to-rose-50 p-4 md:p-6 lg:p-8">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-peach-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-rose-200/30 to-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-peach-200/20 to-pink-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8 text-center md:text-left"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="flex items-center gap-4 justify-center md:justify-start mb-4">
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-pink-500 to-peach-400 rounded-2xl flex items-center justify-center text-white shadow-xl"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <BookOpen className="w-8 h-8" />
            </motion.div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-peach-500 bg-clip-text text-transparent">
                My Journal
              </h1>
              <p className="text-gray-600 text-lg mt-2">Track your speech therapy journey</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Content - Journal Entries */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <motion.div variants={cardVariants}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={() => setShowNewEntry(true)}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-peach-400 hover:from-pink-600 hover:to-peach-500 text-white rounded-xl py-4 px-6 font-semibold shadow-lg flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(236, 72, 153, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Plus className="w-5 h-5" />
                    New Entry
                  </motion.button>

                  <motion.button
                    onClick={handleRecordToggle}
                    className={cn(
                      "flex-1 rounded-xl py-4 px-6 font-semibold shadow-lg flex items-center justify-center gap-3 transition-all duration-300",
                      isRecording
                        ? "bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse"
                        : "bg-gradient-to-r from-rose-500 to-pink-400 hover:from-rose-600 hover:to-pink-500 text-white",
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Mic className="w-5 h-5" />
                    {isRecording ? "Recording..." : "Voice Entry"}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Journal Entries */}
            <motion.div className="space-y-6" variants={containerVariants}>
              {journalEntries.map((entry) => (
                <motion.div key={entry.id} variants={entryVariants}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                    whileHover={{ scale: 1.01, y: -2 }}
                    onClick={() => setSelectedEntry(selectedEntry === entry.id ? null : entry.id)}
                  >
                    {/* Entry Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="text-3xl"
                          animate={{ rotate: selectedEntry === entry.id ? 360 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {moodEmojis[entry.mood as keyof typeof moodEmojis]}
                        </motion.div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-peach-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                            {entry.title}
                          </h2>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <Calendar className="w-4 h-4" />
                            {entry.date}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {entry.hasRecording && (
                          <motion.div
                            className="flex items-center gap-1 bg-gradient-to-r from-pink-100 to-peach-100 text-pink-600 px-3 py-1 rounded-full text-sm"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Volume2 className="w-3 h-3" />
                            {entry.recordingDuration}
                          </motion.div>
                        )}
                        <div className="flex items-center gap-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-600 px-3 py-1 rounded-full text-sm">
                          <TrendingUp className="w-3 h-3" />
                          {entry.progress}%
                        </div>
                      </div>
                    </div>

                    {/* Entry Content */}
                    <p className="text-gray-700 mb-4 leading-relaxed">{entry.content}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {entry.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tagIndex}
                          className="bg-gradient-to-r from-pink-50 to-peach-50 text-pink-600 px-3 py-1 rounded-full text-sm border border-pink-200/50"
                          whileHover={{ scale: 1.05 }}
                        >
                          #{tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {selectedEntry === entry.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-pink-100 pt-4 mt-4"
                        >
                          <div className="flex gap-3">
                            <motion.button
                              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-peach-400 hover:from-pink-600 hover:to-peach-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Edit3 className="w-4 h-4" />
                              Edit
                            </motion.button>
                            {entry.hasRecording && (
                              <motion.button
                                className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-400 hover:from-rose-600 hover:to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Play className="w-4 h-4" />
                                Play Recording
                              </motion.button>
                            )}
                            <motion.button
                              className="flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-400 hover:from-gray-600 hover:to-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Stats Overview */}
            <motion.div variants={cardVariants}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-400 rounded-xl flex items-center justify-center text-white"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-peach-500 bg-clip-text text-transparent">
                    Progress Overview
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <motion.div
                    className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.span
                      className="block text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      24
                    </motion.span>
                    <span className="text-gray-600 text-sm font-medium">Total Entries</span>
                  </motion.div>
                  <motion.div
                    className="bg-gradient-to-br from-peach-100 to-orange-100 rounded-xl p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.span
                      className="block text-3xl font-bold bg-gradient-to-r from-peach-600 to-orange-500 bg-clip-text text-transparent"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                    >
                      7
                    </motion.span>
                    <span className="text-gray-600 text-sm font-medium">This Week</span>
                  </motion.div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.span
                      className="block text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                    >
                      16
                    </motion.span>
                    <span className="text-gray-600 text-sm font-medium">Text Entries</span>
                  </motion.div>
                  <motion.div
                    className="bg-gradient-to-br from-pink-100 to-peach-100 rounded-xl p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.span
                      className="block text-3xl font-bold bg-gradient-to-r from-pink-600 to-peach-500 bg-clip-text text-transparent"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
                    >
                      8
                    </motion.span>
                    <span className="text-gray-600 text-sm font-medium">Voice Entries</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Popular Topics */}
            <motion.div variants={cardVariants}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-r from-peach-500 to-orange-400 rounded-xl flex items-center justify-center text-white"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <Star className="w-5 h-5" />
                  </motion.div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-peach-600 to-orange-500 bg-clip-text text-transparent">
                    Popular Topics
                  </h2>
                </div>
                <div className="space-y-3">
                  {popularTopics.map((topic, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-gray-50 to-pink-50/50 hover:from-pink-50 hover:to-peach-50 transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.02, x: 4 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn("w-3 h-3 rounded-full bg-gradient-to-r", topic.color)} />
                        <span className="font-medium text-gray-800">#{topic.name}</span>
                      </div>
                      <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">{topic.count}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Practice Streak */}
            <motion.div variants={cardVariants}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-400 rounded-xl flex items-center justify-center text-white"
                    whileHover={{ scale: 1.1 }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Heart className="w-5 h-5" />
                  </motion.div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                    Practice Streak
                  </h2>
                </div>
                <div className="text-center">
                  <motion.div
                    className="text-6xl font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    12
                  </motion.div>
                  <p className="text-gray-600 font-medium mb-4">days in a row! 🔥</p>
                  <div className="bg-gradient-to-r from-pink-100 to-peach-100 rounded-xl p-4">
                    <p className="text-sm text-gray-600">
                      Amazing consistency! Keep up the great work to reach your 30-day goal.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Practice */}
            <motion.div variants={cardVariants}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-r from-orange-500 to-peach-400 rounded-xl flex items-center justify-center text-white"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Headphones className="w-5 h-5" />
                  </motion.div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-peach-500 bg-clip-text text-transparent">
                    Quick Practice
                  </h2>
                </div>
                <motion.button
                  onClick={() => navigate("/practice")}
                  className="w-full bg-gradient-to-r from-orange-500 to-peach-400 hover:from-orange-600 hover:to-peach-500 text-white rounded-xl py-4 px-6 font-semibold shadow-lg flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(251, 146, 60, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Play className="w-5 h-5" />
                  Start Session
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* New Entry Modal */}
      <AnimatePresence>
        {showNewEntry && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNewEntry(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-peach-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-peach-500 bg-clip-text text-transparent mb-2">
                  New Journal Entry
                </h3>
                <p className="text-gray-600">Share your thoughts and track your progress</p>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Entry title..."
                  className="w-full p-4 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                />
                <textarea
                  placeholder="Write about your practice session, thoughts, or progress..."
                  rows={6}
                  className="w-full p-4 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent resize-none"
                />
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowNewEntry(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl py-3 px-6 font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowNewEntry(false)}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-peach-400 hover:from-pink-600 hover:to-peach-500 text-white rounded-xl py-3 px-6 font-semibold"
                  >
                    Save Entry
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Journal
