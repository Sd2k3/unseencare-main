"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence, useSpring, useTransform, easeInOut, easeOut } from "framer-motion"
import { Card, CardContent } from "@/components/UI/Card"
import  Button  from "@/components/UI/Button"
import {
  Play,
  Mic,
  Target,
  Award,
  Calendar,
  Clock,
  Star,
  Volume2,
  Square,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  ThumbsUp,
  X,
  Loader2,
  Camera,
  Gamepad2,
  TrendingUp,
  BarChart3,
  Activity,
} from "lucide-react"

// ==================== TYPES & INTERFACES ====================
interface ActivityType {
  id: string
  title: string
  description: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  icon: React.ComponentType<any>
  category: "articulation" | "fluency" | "vocabulary" | "social"
}

interface UserStats {
  totalSessions: number
  totalMinutes: number
  currentStreak: number
  weeklyGoal: number
  weeklyProgress: number
  level: number
  totalScore: number
  dailyProgress: { day: string; minutes: number; sessions: number }[]
  weeklyStats: { week: string; score: number; sessions: number }[]
  categoryProgress: { category: string; progress: number; sessions: number }[]
}

interface FeedbackType {
  type: "excellent" | "good" | "needsWork" | "poor" | null
  message: string
  show: boolean
}

// ==================== ANIMATION VARIANTS ====================
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
}

const buttonVariants = {
  idle: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: easeOut,
    },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
}

const pulseVariants = {
  pulse: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 1.5,
      repeat: Number.POSITIVE_INFINITY,
      ease: easeInOut,
    },
  },
}

const slideInVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easeInOut,
    },
  },
}

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: easeInOut,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: { duration: 0.2 },
  },
}

// ==================== SAMPLE DATA ====================
const activities: ActivityType[] = [
  {
    id: "articulation",
    title: "Articulation Practice",
    description: "Practice specific sounds and improve pronunciation",
    duration: "15 min",
    difficulty: "Beginner",
    icon: Mic,
    category: "articulation",
  },
  {
    id: "fluency",
    title: "Fluency Exercises",
    description: "Work on speaking smoothly and reducing stuttering",
    duration: "20 min",
    difficulty: "Intermediate",
    icon: Play,
    category: "fluency",
  },
  {
    id: "vocabulary",
    title: "Vocabulary Builder",
    description: "Learn new words and expand your vocabulary",
    duration: "10 min",
    difficulty: "Beginner",
    icon: Target,
    category: "vocabulary",
  },
  {
    id: "social",
    title: "Social Communication",
    description: "Practice conversation skills in different scenarios",
    duration: "25 min",
    difficulty: "Advanced",
    icon: Award,
    category: "social",
  },
  {
    id: "mirror",
    title: "Mirror Practice",
    description: "Watch your mouth movements while practicing sounds",
    duration: "12 min",
    difficulty: "Beginner",
    icon: Camera,
    category: "articulation",
  },
  {
    id: "games",
    title: "Speech Games",
    description: "Fun interactive games to improve speech skills",
    duration: "18 min",
    difficulty: "Intermediate",
    icon: Gamepad2,
    category: "vocabulary",
  },
]

// Practice words for articulation
const practiceWords = [
  { word: "rabbit", emoji: "🐰", sound: "/r/", difficulty: "easy" },
  { word: "sun", emoji: "☀️", sound: "/s/", difficulty: "easy" },
  { word: "lion", emoji: "🦁", sound: "/l/", difficulty: "medium" },
  { word: "rainbow", emoji: "🌈", sound: "/r/", difficulty: "hard" },
]

// Feedback messages for different performance levels
const feedbackMessages = {
  excellent: [
    "🌟 Excellent pronunciation! Perfect clarity!",
    "🎉 Outstanding! Your speech is very clear!",
    "⭐ Amazing work! Keep up the great practice!",
  ],
  good: [
    "👍 Good job! Your pronunciation is improving!",
    "😊 Well done! That sounded much better!",
    "✨ Nice work! You're getting the hang of it!",
  ],
  needsWork: [
    "🤔 Good try! Let's work on that sound a bit more.",
    "💡 Almost there! Try focusing on tongue placement.",
    "🎯 Getting closer! Keep practicing!",
  ],
  poor: [
    "😅 That's okay! Everyone learns at their own pace.",
    "🌱 Don't worry! Practice makes perfect.",
    "💝 Keep trying! You'll get it with more practice.",
  ],
}

// ==================== MAIN COMPONENT ====================
const Activities: React.FC = () => {
  // ==================== STATE MANAGEMENT ====================

  // Activity and navigation state
  const [activeActivity, setActiveActivity] = useState<string | null>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  // Recording state
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)

  // Camera state
  const [cameraActive, setCameraActive] = useState(false)

  // User progress and feedback state
  const [userStats, setUserStats] = useState<UserStats>({
    totalSessions: 47,
    totalMinutes: 320,
    currentStreak: 5,
    weeklyGoal: 150,
    weeklyProgress: 89,
    level: 3,
    totalScore: 1250,
    dailyProgress: [
      { day: "Mon", minutes: 25, sessions: 2 },
      { day: "Tue", minutes: 30, sessions: 3 },
      { day: "Wed", minutes: 15, sessions: 1 },
      { day: "Thu", minutes: 40, sessions: 4 },
      { day: "Fri", minutes: 35, sessions: 3 },
      { day: "Sat", minutes: 20, sessions: 2 },
      { day: "Sun", minutes: 45, sessions: 4 },
    ],
    weeklyStats: [
      { week: "W1", score: 180, sessions: 8 },
      { week: "W2", score: 220, sessions: 12 },
      { week: "W3", score: 195, sessions: 10 },
      { week: "W4", score: 280, sessions: 15 },
      { week: "W5", score: 310, sessions: 18 },
      { week: "W6", score: 275, sessions: 14 },
    ],
    categoryProgress: [
      { category: "Articulation", progress: 85, sessions: 15 },
      { category: "Fluency", progress: 72, sessions: 12 },
      { category: "Vocabulary", progress: 90, sessions: 18 },
      { category: "Social", progress: 65, sessions: 8 },
    ],
  })

  const [feedback, setFeedback] = useState<FeedbackType>({
    type: null,
    message: "",
    show: false,
  })

  // Refs for media handling
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Animation springs
  const progressSpring = useSpring(userStats.weeklyProgress / userStats.weeklyGoal, {
    stiffness: 100,
    damping: 30,
  })
  const progressWidth = useTransform(progressSpring, [0, 1], ["0%", "100%"])

  // ==================== RECORDING FUNCTIONS ====================

  /**
   * Starts audio recording with optimized settings
   */
  const startRecording = useCallback(async () => {
    try {
      // Clean up any existing recording
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      // Request microphone access with enhanced audio settings
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
        },
      })

      streamRef.current = stream

      // Create MediaRecorder with optimized settings
      const options = {
        mimeType: "audio/webm;codecs=opus",
        audioBitsPerSecond: 128000,
      }

      let mediaRecorder
      try {
        mediaRecorder = new MediaRecorder(stream, options)
      } catch (e) {
        // Fallback for browsers that don't support webm
        mediaRecorder = new MediaRecorder(stream)
      }

      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      // Handle data availability
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      // Handle recording stop
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mediaRecorder.mimeType || "audio/wav",
        })
        const url = URL.createObjectURL(audioBlob)
        setAudioURL(url)

        // Analyze the recording
        analyzeRecording()
      }

      // Start recording
      mediaRecorder.start(100)
      setIsRecording(true)
      setAudioURL(null)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Please allow microphone access to use voice recording features.")
      setIsRecording(false)
    }
  }, [])

  /**
   * Stops the current recording
   */
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Clean up stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
    }
  }, [isRecording])

  /**
   * Simulates AI analysis of the recorded speech
   */
  const analyzeRecording = useCallback(() => {
    setIsProcessing(true)

    // Simulate analysis processing time
    setTimeout(() => {
      const random = Math.random()
      let feedbackType: "excellent" | "good" | "needsWork" | "poor"
      let points = 0

      // Determine feedback based on simulated analysis
      if (random > 0.7) {
        feedbackType = "excellent"
        points = 20
      } else if (random > 0.5) {
        feedbackType = "good"
        points = 15
      } else if (random > 0.3) {
        feedbackType = "needsWork"
        points = 10
      } else {
        feedbackType = "poor"
        points = 5
      }

      // Select random feedback message
      const messages = feedbackMessages[feedbackType]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]

      // Update feedback and stats
      setFeedback({
        type: feedbackType,
        message: randomMessage,
        show: true,
      })

      // Update user stats
      setUserStats((prev) => ({
        ...prev,
        totalScore: prev.totalScore + points,
        totalSessions: prev.totalSessions + 1,
      }))

      setIsProcessing(false)

      // Auto-hide feedback after 4 seconds
      setTimeout(() => {
        setFeedback((prev) => ({ ...prev, show: false }))
      }, 4000)
    }, 800)
  }, [])

  // ==================== CAMERA FUNCTIONS ====================

  /**
   * Starts the camera for mirror practice
   */
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Please allow camera access to use the mirror practice feature.")
    }
  }

  /**
   * Stops the camera
   */
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }

  // ==================== UTILITY FUNCTIONS ====================

  /**
   * Plays the recorded audio
   */
  const playAudio = () => {
    if (audioURL) {
      const audio = new Audio(audioURL)
      audio.play().catch((error) => {
        console.error("Error playing audio:", error)
      })
    }
  }

  /**
   * Uses text-to-speech to speak the given text
   */
  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel() // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  /**
   * Formats seconds into MM:SS format
   */
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  /**
   * Moves to the next practice word
   */
  const nextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % practiceWords.length)
    setAudioURL(null)
    setFeedback({ type: null, message: "", show: false })
  }

  /**
   * Starts a specific activity
   */
  const startActivity = (activityId: string) => {
    setActiveActivity(activityId)
    setAudioURL(null)
    setFeedback({ type: null, message: "", show: false })
  }

  /**
   * Returns to the main activities view
   */
  const backToActivities = () => {
    setActiveActivity(null)
    // Clean up any active media
    if (isRecording) stopRecording()
    if (cameraActive) stopCamera()
  }

  // ==================== EFFECTS ====================

  /**
   * Recording timer effect
   */
  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
      setRecordingTime(0)
    }

    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
    }
  }, [isRecording])

  /**
   * Cleanup effect
   */
  useEffect(() => {
    return () => {
      // Clean up media streams and timers
      if (cameraActive) stopCamera()
      if (isRecording) stopRecording()
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
      if ("speechSynthesis" in window) {
        speechSynthesis.cancel()
      }
    }
  }, [])

  // ==================== COMPONENT RENDERS ====================

  /**
   * Animated Button Component
   */
  const AnimatedButton = ({ children, className, onClick, disabled, variant = "primary", ...props }: any) => (
    <motion.div
      variants={buttonVariants}
      initial="idle"
      whileHover={!disabled ? "hover" : "idle"}
      whileTap={!disabled ? "tap" : "idle"}
    >
      <Button className={`${className} transition-all duration-200`} onClick={onClick} disabled={disabled} {...props}>
        {children}
      </Button>
    </motion.div>
  )

  /**
   * Recording Controls Component
   */
  const RecordingControls = () => (
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!isRecording && !isProcessing ? (
        <AnimatedButton onClick={startRecording} className="bg-[#E94D97] hover:bg-[#D43A84] text-white shadow-lg">
          <Mic className="w-4 h-4 mr-2" />
          Start Recording
        </AnimatedButton>
      ) : isRecording ? (
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 text-red-600 font-medium">
            <motion.div className="w-3 h-3 bg-red-500 rounded-full" variants={pulseVariants} animate="pulse" />
            <span>Recording... {formatTime(recordingTime)}</span>
          </div>
          <AnimatedButton onClick={stopRecording} className="bg-red-500 hover:bg-red-600 text-white shadow-lg">
            <Square className="w-4 h-4 mr-2" />
            Stop Recording
          </AnimatedButton>
        </motion.div>
      ) : (
        <motion.div
          className="flex items-center gap-2 text-blue-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Loader2 className="w-4 h-4" />
          </motion.div>
          <span>Analyzing your speech...</span>
        </motion.div>
      )}

      <AnimatePresence>
        {audioURL && !isRecording && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedButton onClick={playAudio} className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg">
              <Play className="w-4 h-4 mr-2" />
              Play Recording
            </AnimatedButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )

  /**
   * Stats Overview Component with Graph Visualizations
   */
  const StatsOverview = () => (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {/* Total Sessions */}
      <motion.div variants={cardVariants}>
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 overflow-hidden">
          <CardContent className="p-6">
            <motion.div className="flex items-center gap-3 mb-4" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <motion.div
                className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Target className="w-6 h-6" />
              </motion.div>
              <div>
                <motion.p
                  className="text-2xl font-bold text-blue-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {userStats.totalSessions}
                </motion.p>
                <p className="text-sm text-blue-600">Total Sessions</p>
              </div>
            </motion.div>
            {/* Mini bar chart */}
            <div className="flex items-end gap-1 h-8">
              {userStats.dailyProgress.map((day, index) => (
                <motion.div
                  key={day.day}
                  className="bg-blue-400 rounded-t flex-1"
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.sessions / 5) * 100}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Current Streak */}
      <motion.div variants={cardVariants}>
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 overflow-hidden">
          <CardContent className="p-6">
            <motion.div className="flex items-center gap-3 mb-4" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <motion.div
                className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Calendar className="w-6 h-6" />
              </motion.div>
              <div>
                <motion.p
                  className="text-2xl font-bold text-orange-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {userStats.currentStreak}
                </motion.p>
                <p className="text-sm text-orange-600">Day Streak 🔥</p>
              </div>
            </motion.div>
            {/* Streak visualization */}
            <div className="flex gap-1">
              {Array.from({ length: 7 }).map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-4 h-4 rounded ${index < userStats.currentStreak ? "bg-orange-400" : "bg-orange-200"}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Total Score */}
      <motion.div variants={cardVariants}>
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 overflow-hidden">
          <CardContent className="p-6">
            <motion.div className="flex items-center gap-3 mb-4" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <motion.div
                className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Star className="w-6 h-6" />
              </motion.div>
              <div>
                <motion.p
                  className="text-2xl font-bold text-green-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {userStats.totalScore}
                </motion.p>
                <p className="text-sm text-green-600">Total Score ⭐</p>
              </div>
            </motion.div>
            {/* Score trend line */}
            <div className="flex items-end gap-1 h-8">
              {userStats.weeklyStats.slice(-4).map((week, index) => (
                <motion.div
                  key={week.week}
                  className="bg-green-400 rounded-t flex-1"
                  initial={{ height: 0 }}
                  animate={{ height: `${(week.score / 350) * 100}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Practice Time */}
      <motion.div variants={cardVariants}>
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 overflow-hidden">
          <CardContent className="p-6">
            <motion.div className="flex items-center gap-3 mb-4" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <motion.div
                className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Clock className="w-6 h-6" />
              </motion.div>
              <div>
                <motion.p
                  className="text-2xl font-bold text-purple-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {userStats.totalMinutes}
                </motion.p>
                <p className="text-sm text-purple-600">Minutes Practiced</p>
              </div>
            </motion.div>
            {/* Time distribution */}
            <div className="flex items-end gap-1 h-8">
              {userStats.dailyProgress.map((day, index) => (
                <motion.div
                  key={day.day}
                  className="bg-purple-400 rounded-t flex-1"
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.minutes / 50) * 100}%` }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  /**
   * Weekly Progress Component with Enhanced Graph
   */
  const WeeklyProgress = () => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="mb-8 bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#E94D97]" />
                Weekly Progress
              </h3>
              <p className="text-sm text-gray-600">
                {userStats.weeklyProgress} of {userStats.weeklyGoal} minutes completed
              </p>
            </div>
            <div className="text-right">
              <motion.p
                className="text-2xl font-bold text-[#E94D97]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {Math.round((userStats.weeklyProgress / userStats.weeklyGoal) * 100)}%
              </motion.p>
              <p className="text-sm text-gray-600">This Week</p>
            </div>
          </div>

          {/* Daily Progress Chart */}
          <div className="mb-6">
            <div className="flex justify-between items-end h-32 bg-white rounded-lg p-4 border">
              {userStats.dailyProgress.map((day, index) => (
                <div key={day.day} className="flex flex-col items-center gap-2">
                  <motion.div
                    className="bg-gradient-to-t from-[#E94D97] to-[#A259FF] rounded-t w-8"
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.minutes / 50) * 80}px` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  />
                  <span className="text-xs text-gray-600 font-medium">{day.day}</span>
                  <span className="text-xs text-gray-500">{day.minutes}m</span>
                </div>
              ))}
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-[#E94D97] to-[#A259FF] h-3 rounded-full"
              style={{ width: progressWidth }}
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min((userStats.weeklyProgress / userStats.weeklyGoal) * 100, 100)}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  /**
   * Category Progress Graph Component
   */
  const CategoryProgressGraph = () => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#E94D97]" />
            Category Progress
          </h3>
          <div className="space-y-4">
            {userStats.categoryProgress.map((category, index) => (
              <motion.div
                key={category.category}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="w-24 text-sm font-medium text-gray-700">{category.category}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-3 rounded-full ${
                      index === 0
                        ? "bg-gradient-to-r from-blue-400 to-blue-600"
                        : index === 1
                          ? "bg-gradient-to-r from-green-400 to-green-600"
                          : index === 2
                            ? "bg-gradient-to-r from-purple-400 to-purple-600"
                            : "bg-gradient-to-r from-orange-400 to-orange-600"
                    }`}
                    initial={{ width: "0%" }}
                    animate={{ width: `${category.progress}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                  />
                </div>
                <div className="w-16 text-right">
                  <span className="text-sm font-bold text-gray-900">{category.progress}%</span>
                  <div className="text-xs text-gray-500">{category.sessions} sessions</div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  /**
   * Weekly Stats Chart Component
   */
  const WeeklyStatsChart = () => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#E94D97]" />
            Weekly Performance
          </h3>
          <div className="flex justify-between items-end h-40 bg-gradient-to-t from-gray-50 to-white rounded-lg p-4 border">
            {userStats.weeklyStats.map((week, index) => (
              <div key={week.week} className="flex flex-col items-center gap-2">
                <motion.div
                  className="bg-gradient-to-t from-[#E94D97] to-[#A259FF] rounded-t w-12 flex items-end justify-center text-white text-xs font-bold pb-1"
                  initial={{ height: 0 }}
                  animate={{ height: `${(week.score / 350) * 120}px` }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                >
                  {week.score}
                </motion.div>
                <span className="text-xs text-gray-600 font-medium">{week.week}</span>
                <span className="text-xs text-gray-500">{week.sessions} sessions</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  /**
   * Articulation Practice Activity Component
   */
  const ArticulationPractice = () => {
    const currentWord = practiceWords[currentWordIndex]

    return (
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex items-center gap-4 mb-6"
          variants={slideInVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatedButton onClick={backToActivities} className="bg-gray-500 hover:bg-gray-600 text-white">
            ← Back
          </AnimatedButton>
          <h2 className="text-2xl font-bold text-gray-900">Articulation Practice</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="mb-6 overflow-hidden">
            <CardContent className="p-8 text-center">
              <motion.div
                className="text-8xl mb-4"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {currentWord.emoji}
              </motion.div>

              <motion.h3
                className="text-4xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {currentWord.word}
              </motion.h3>

              <motion.div
                className="flex justify-center gap-2 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.span
                  className="bg-[#E94D97] text-white px-3 py-1 rounded-full text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  Target Sound: {currentWord.sound}
                </motion.span>
                <motion.span
                  className={`px-3 py-1 rounded-full text-sm ${
                    currentWord.difficulty === "easy"
                      ? "bg-green-100 text-green-800"
                      : currentWord.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {currentWord.difficulty}
                </motion.span>
              </motion.div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <AnimatedButton
                  onClick={() => speakText(currentWord.word)}
                  className="bg-blue-500 hover:bg-blue-600 text-white mr-4 shadow-lg"
                  disabled={isRecording || isProcessing}
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Listen to Word
                </AnimatedButton>

                <div className="my-6">
                  <RecordingControls />
                </div>

                <div className="flex justify-center gap-4">
                  <AnimatedButton
                    onClick={nextWord}
                    className="bg-[#E94D97] hover:bg-[#D43A84] text-white shadow-lg"
                    disabled={isRecording || isProcessing}
                  >
                    Next Word
                  </AnimatedButton>
                  <AnimatedButton
                    onClick={() => {
                      setAudioURL(null)
                      setFeedback({ type: null, message: "", show: false })
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white shadow-lg"
                    disabled={isRecording || isProcessing}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Try Again
                  </AnimatedButton>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    )
  }

  /**
   * Mirror Practice Activity Component
   */
  const MirrorPractice = () => {
    const currentWord = practiceWords[currentWordIndex]

    return (
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex items-center gap-4 mb-6"
          variants={slideInVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatedButton onClick={backToActivities} className="bg-gray-500 hover:bg-gray-600 text-white">
            ← Back
          </AnimatedButton>
          <h2 className="text-2xl font-bold text-gray-900">Mirror Practice</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {/* Your Practice */}
          <motion.div variants={cardVariants}>
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Practice</h3>
                <motion.div
                  className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video mb-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                  <AnimatePresence>
                    {!cameraActive && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-gray-100"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <p className="text-gray-500">Camera not active</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                <AnimatedButton
                  onClick={cameraActive ? stopCamera : startCamera}
                  className="w-full bg-[#E94D97] hover:bg-[#D43A84] text-white shadow-lg"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {cameraActive ? "Stop Camera" : "Start Camera"}
                </AnimatedButton>
              </CardContent>
            </Card>
          </motion.div>

          {/* Guide */}
          <motion.div variants={cardVariants}>
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Guide</h3>
                <motion.div
                  className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg p-8 aspect-video flex flex-col items-center justify-center mb-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    👄
                  </motion.div>
                  <motion.div
                    className="text-2xl font-bold text-gray-900 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {currentWord.word}
                  </motion.div>
                  <div className="text-sm text-gray-600">Practice the {currentWord.sound} sound</div>
                </motion.div>
                <div className="flex gap-2">
                  <AnimatedButton
                    onClick={() => speakText(currentWord.word)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Hear Word
                  </AnimatedButton>
                  <AnimatedButton
                    onClick={nextWord}
                    className="flex-1 bg-[#E94D97] hover:bg-[#D43A84] text-white shadow-lg"
                  >
                    Next Word
                  </AnimatedButton>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  // ==================== MAIN RENDER ====================

  return (
    <div className="p-6 md:p-8 min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-rose-50">
      <div className="max-w-7xl mx-auto">
        {/* Animated Feedback Modal */}
        <AnimatePresence>
          {feedback.show && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className={`bg-white rounded-lg p-6 max-w-md w-full mx-4 ${
                  feedback.type === "excellent"
                    ? "border-l-4 border-green-500"
                    : feedback.type === "good"
                      ? "border-l-4 border-blue-500"
                      : feedback.type === "needsWork"
                        ? "border-l-4 border-yellow-500"
                        : "border-l-4 border-red-500"
                }`}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex items-start justify-between">
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {feedback.type === "excellent" && <ThumbsUp className="w-6 h-6 text-green-500" />}
                      {feedback.type === "good" && <CheckCircle className="w-6 h-6 text-blue-500" />}
                      {feedback.type === "needsWork" && <AlertCircle className="w-6 h-6 text-yellow-500" />}
                      {feedback.type === "poor" && <RotateCcw className="w-6 h-6 text-red-500" />}
                    </motion.div>
                    <div>
                      <motion.p
                        className="font-medium text-gray-900"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {feedback.message}
                      </motion.p>
                    </div>
                  </motion.div>
                  <motion.button
                    onClick={() => setFeedback((prev) => ({ ...prev, show: false }))}
                    className="text-gray-400 hover:text-gray-600 bg-transparent p-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {!activeActivity ? (
            // Activities Overview
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Speech Therapy Activities</h1>
                <p className="text-gray-600">
                  Track your progress and choose from a variety of speech therapy exercises
                </p>
              </motion.div>

              {/* Stats Overview with Graphs */}
              <StatsOverview />

              {/* Weekly Progress with Enhanced Graph */}
              <WeeklyProgress />

              {/* Category Progress Graph */}
              <CategoryProgressGraph />

              {/* Weekly Stats Chart */}
              <WeeklyStatsChart />

              {/* Activities Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {activities.map((activity) => (
                  <motion.div key={activity.id} variants={cardVariants} whileHover="hover" whileTap="tap">
                    <Card className="bg-white shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                      <CardContent className="p-6">
                        <motion.div
                          className="flex items-center gap-3 mb-4"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            className="w-12 h-12 bg-[#E94D97] rounded-full flex items-center justify-center text-white"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <activity.icon className="w-6 h-6" />
                          </motion.div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{activity.title}</h3>
                            <p className="text-sm text-gray-500">{activity.duration}</p>
                          </div>
                        </motion.div>
                        <p className="text-gray-600 mb-4">{activity.description}</p>
                        <div className="flex items-center justify-between">
                          <motion.span
                            className={`text-sm font-medium ${
                              activity.difficulty === "Beginner"
                                ? "text-green-600"
                                : activity.difficulty === "Intermediate"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {activity.difficulty}
                          </motion.span>
                          <AnimatedButton
                            onClick={() => startActivity(activity.id)}
                            className="bg-[#E94D97] hover:bg-[#D43A84] text-white shadow-lg"
                          >
                            Start
                          </AnimatedButton>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            // Individual Activity Views
            <motion.div
              key="activity"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              {activeActivity === "articulation" && <ArticulationPractice />}
              {activeActivity === "mirror" && <MirrorPractice />}
              {/* Add other activity components here as needed */}
              {(activeActivity === "fluency" ||
                activeActivity === "vocabulary" ||
                activeActivity === "social" ||
                activeActivity === "games") && (
                <div className="max-w-4xl mx-auto text-center">
                  <motion.div
                    className="flex items-center gap-4 mb-6"
                    variants={slideInVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <AnimatedButton onClick={backToActivities} className="bg-gray-500 hover:bg-gray-600 text-white">
                      ← Back
                    </AnimatedButton>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {activities.find((a) => a.id === activeActivity)?.title}
                    </h2>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-12">
                        <motion.div
                          className="text-6xl mb-4"
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          🚧
                        </motion.div>
                        <motion.h3
                          className="text-xl font-semibold text-gray-900 mb-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          Coming Soon!
                        </motion.h3>
                        <motion.p
                          className="text-gray-600"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          This activity is under development and will be available soon.
                        </motion.p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Activities
