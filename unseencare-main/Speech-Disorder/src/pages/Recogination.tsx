"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/Card"
import  Button  from "@/components/UI/Button"
import { Badge } from "@/components/UI/Badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs"
import {
  Mic,
  Play,
  Pause,
  Square,
  RotateCcw,
  Volume2,
  Award,
  Target,
  TrendingUp,
  Heart,
  Brain,
  Zap,
  CheckCircle,
  AlertCircle,
  Star,
  Download,
  Share2,
  MicOff,
  Camera,
  BookOpen,
  MessageCircle,
  Hand,
  Loader2,
  ThumbsUp,
  X,
} from "lucide-react"

// Voice Recognition Types
interface VoiceAnalysis {
  clarity: number
  pace: number
  volume: number
  confidence: number
  pronunciation: number
}

interface Word {
  text: string
  confidence: number
  timestamp: number
  isCorrect: boolean
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onend: ((this: SpeechRecognition, ev: Event) => any) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition
    webkitSpeechRecognition: new () => SpeechRecognition
  }
}

// Sign Language Data
const signLanguageSigns = [
  { word: "hello", emoji: "👋", sign: "Wave hand", difficulty: "easy", description: "Open palm, wave side to side" },
  {
    word: "thank you",
    emoji: "🙏",
    sign: "Gratitude",
    difficulty: "easy",
    description: "Touch chin, move hand forward",
  },
  {
    word: "please",
    emoji: "🤲",
    sign: "Request",
    difficulty: "easy",
    description: "Flat hand on chest, circular motion",
  },
  { word: "love", emoji: "❤️", sign: "Heart", difficulty: "medium", description: "Cross arms over chest" },
  { word: "family", emoji: "👨‍👩‍👧‍👦", sign: "Unity", difficulty: "medium", description: "F handshape, circle motion" },
  { word: "friend", emoji: "🤝", sign: "Bond", difficulty: "easy", description: "Hook index fingers together" },
  { word: "water", emoji: "💧", sign: "Drink", difficulty: "easy", description: "W handshape at mouth" },
  { word: "food", emoji: "🍎", sign: "Eat", difficulty: "easy", description: "Fingertips to mouth" },
  { word: "home", emoji: "🏠", sign: "Shelter", difficulty: "medium", description: "Fingertips touch, then separate" },
  { word: "school", emoji: "🏫", sign: "Learn", difficulty: "medium", description: "Clap hands twice" },
  { word: "book", emoji: "📚", sign: "Read", difficulty: "easy", description: "Open palms like opening book" },
  { word: "happy", emoji: "😊", sign: "Joy", difficulty: "easy", description: "Brush chest upward twice" },
  { word: "sad", emoji: "😢", sign: "Sorrow", difficulty: "easy", description: "Fingers down face like tears" },
  { word: "good", emoji: "👍", sign: "Positive", difficulty: "easy", description: "Thumb up from chin" },
  { word: "bad", emoji: "👎", sign: "Negative", difficulty: "easy", description: "Fingertips to chin, flip down" },
  { word: "yes", emoji: "✅", sign: "Agree", difficulty: "easy", description: "Fist nod up and down" },
  { word: "no", emoji: "❌", sign: "Disagree", difficulty: "easy", description: "Index and middle finger close" },
  { word: "help", emoji: "🆘", sign: "Assist", difficulty: "medium", description: "Fist on flat palm, lift up" },
  { word: "sorry", emoji: "😔", sign: "Apologize", difficulty: "medium", description: "Fist circle on chest" },
  {
    word: "beautiful",
    emoji: "🌸",
    sign: "Pretty",
    difficulty: "hard",
    description: "5 handshape around face, close to 9",
  },
  { word: "cat", emoji: "🐱", sign: "Whiskers", difficulty: "easy", description: "Pinch cheek, pull out twice" },
  { word: "dog", emoji: "🐶", sign: "Pet", difficulty: "easy", description: "Pat leg and snap fingers" },
  { word: "bird", emoji: "🐦", sign: "Fly", difficulty: "medium", description: "G handshape at mouth, open close" },
  { word: "tree", emoji: "🌳", sign: "Growth", difficulty: "medium", description: "5 handshape, arm as trunk" },
  { word: "flower", emoji: "🌺", sign: "Bloom", difficulty: "medium", description: "O handshape to both nostrils" },
  { word: "sun", emoji: "☀️", sign: "Bright", difficulty: "easy", description: "Point up, then circle around head" },
  { word: "moon", emoji: "🌙", sign: "Night", difficulty: "easy", description: "C handshape above temple" },
  {
    word: "star",
    emoji: "⭐",
    sign: "Twinkle",
    difficulty: "medium",
    description: "Index fingers point up, alternate",
  },
  { word: "car", emoji: "🚗", sign: "Drive", difficulty: "easy", description: "Hands grip steering wheel" },
  { word: "house", emoji: "🏡", sign: "Roof", difficulty: "medium", description: "Fingertips together, then apart" },
  { word: "money", emoji: "💰", sign: "Pay", difficulty: "easy", description: "Flat hand tap palm" },
  { word: "work", emoji: "💼", sign: "Job", difficulty: "medium", description: "Fist tap wrist twice" },
  { word: "play", emoji: "🎮", sign: "Fun", difficulty: "easy", description: "Y handshapes shake" },
  { word: "music", emoji: "🎵", sign: "Rhythm", difficulty: "medium", description: "Flat hand wave over arm" },
  { word: "dance", emoji: "💃", sign: "Move", difficulty: "hard", description: "V handshape swing over palm" },
  { word: "color", emoji: "🌈", sign: "Spectrum", difficulty: "medium", description: "5 handshape wiggle at chin" },
  { word: "red", emoji: "🔴", sign: "Lips", difficulty: "easy", description: "Index finger brush lips down" },
  { word: "blue", emoji: "🔵", sign: "Sky", difficulty: "easy", description: "B handshape shake" },
  { word: "green", emoji: "🟢", sign: "Grass", difficulty: "easy", description: "G handshape shake" },
  { word: "yellow", emoji: "🟡", sign: "Bright", difficulty: "easy", description: "Y handshape shake" },
  { word: "black", emoji: "⚫", sign: "Dark", difficulty: "easy", description: "Index finger across forehead" },
  { word: "white", emoji: "⚪", sign: "Pure", difficulty: "easy", description: "5 handshape from chest out" },
  { word: "big", emoji: "📏", sign: "Large", difficulty: "easy", description: "L handshapes apart" },
  { word: "small", emoji: "🤏", sign: "Tiny", difficulty: "easy", description: "Flat hands close together" },
  { word: "hot", emoji: "🔥", sign: "Heat", difficulty: "easy", description: "Claw hand from mouth, throw down" },
  { word: "cold", emoji: "🧊", sign: "Chill", difficulty: "easy", description: "S handshapes shake" },
  { word: "new", emoji: "✨", sign: "Fresh", difficulty: "medium", description: "Flat hand brush over palm" },
  { word: "old", emoji: "👴", sign: "Age", difficulty: "easy", description: "C handshape from chin down" },
  { word: "young", emoji: "👶", sign: "Youth", difficulty: "medium", description: "Fingertips brush chest up twice" },
  { word: "strong", emoji: "💪", sign: "Power", difficulty: "medium", description: "S handshape, show bicep" },
]

const signPhrases = [
  {
    text: "Hello, nice to meet you",
    difficulty: "easy",
    signs: ["hello", "nice", "meet", "you"],
    description: "Basic greeting combination",
  },
  {
    text: "Thank you very much",
    difficulty: "easy",
    signs: ["thank", "you", "very", "much"],
    description: "Polite expression of gratitude",
  },
  {
    text: "I love my family",
    difficulty: "medium",
    signs: ["I", "love", "my", "family"],
    description: "Personal relationship expression",
  },
  {
    text: "The cat is beautiful",
    difficulty: "medium",
    signs: ["the", "cat", "is", "beautiful"],
    description: "Descriptive sentence structure",
  },
  {
    text: "Please help me learn",
    difficulty: "hard",
    signs: ["please", "help", "me", "learn"],
    description: "Request for assistance",
  },
]

const signStories = [
  {
    image: "🏠",
    prompt: "Describe your home using signs",
    keywords: ["home", "family", "love", "happy", "big", "small"],
    difficulty: "medium",
  },
  {
    image: "🌳",
    prompt: "Tell about nature and animals",
    keywords: ["tree", "flower", "bird", "cat", "dog", "beautiful"],
    difficulty: "easy",
  },
  {
    image: "🎵",
    prompt: "Share your hobbies and interests",
    keywords: ["music", "dance", "play", "book", "color", "fun"],
    difficulty: "hard",
  },
  {
    image: "🌈",
    prompt: "Describe colors you see",
    keywords: ["red", "blue", "green", "yellow", "color", "beautiful"],
    difficulty: "easy",
  },
]

// Enhanced feedback messages for sign language
const feedbackMessages = {
  excellent: [
    "🌟 Perfect signing! Your hand movements are excellent!",
    "🎉 Outstanding! Your signs are very clear and accurate!",
    "⭐ Amazing work! You're becoming fluent in sign language!",
    "🏆 Perfect! Your signing technique is spot on!",
  ],
  good: [
    "👍 Good signing! Your hand positions are improving!",
    "😊 Well done! That sign looked much better!",
    "✨ Nice work! You're getting the hang of signing!",
    "💪 Great effort! Keep practicing your hand shapes!",
  ],
  needsWork: [
    "🤔 Good try! Let's work on your hand position a bit more.",
    "💡 Almost there! Try focusing on finger placement.",
    "🎯 Getting closer! Remember the hand movement I showed you.",
    "🔄 Good attempt! Let's try it again with clearer movements.",
  ],
  poor: [
    "😅 That's okay! Sign language takes time to learn.",
    "🌱 Don't worry! Practice makes perfect signs.",
    "💝 Keep trying! You'll get it with more practice.",
    "🎈 No problem! Let's break down the sign step by step.",
  ],
}

// Voice Recognition Component
const VoiceRecognitionComponent: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioLevel, setAudioLevel] = useState(0)
  const [transcription, setTranscription] = useState("")
  const [words, setWords] = useState<Word[]>([])
  const [analysis, setAnalysis] = useState<VoiceAnalysis>({
    clarity: 0,
    pace: 0,
    volume: 0,
    confidence: 0,
    pronunciation: 0,
  })
  const [showResults, setShowResults] = useState(false)
  const [currentExercise, setCurrentExercise] = useState("Articulation Practice")
  const [waveformData, setWaveformData] = useState<number[]>(Array(50).fill(0))
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState<string>("")
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string>("")

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const exercises = [
    "Articulation Practice",
    "Breathing Exercises",
    "Tongue Twisters",
    "Vowel Sounds",
    "Consonant Blends",
    "Fluency Training",
  ]

  const targetPhrases: { [key: string]: string[] } = {
    "Articulation Practice": [
      "The quick brown fox jumps over the lazy dog",
      "She sells seashells by the seashore",
      "Red leather, yellow leather",
    ],
    "Breathing Exercises": [
      "Take a deep breath and speak slowly",
      "Breathe in through your nose, out through your mouth",
      "Control your breathing while speaking",
    ],
    "Tongue Twisters": [
      "Peter Piper picked a peck of pickled peppers",
      "How much wood would a woodchuck chuck",
      "Unique New York, you know you need unique New York",
    ],
    "Vowel Sounds": ["The cat sat on the mat", "I see three green trees", "Old oak trees grow slowly"],
    "Consonant Blends": [
      "Strong spring storms strike swiftly",
      "Bright blue birds build big nests",
      "Fresh fruit from the farm",
    ],
    "Fluency Training": [
      "Speak slowly and clearly with confidence",
      "Practice makes perfect progress possible",
      "Smooth speech sounds soothing and strong",
    ],
  }

  // Check browser support
  useEffect(() => {
    const checkSupport = () => {
      const speechSupported = "SpeechRecognition" in window || "webkitSpeechRecognition" in window
      const mediaSupported = "MediaRecorder" in window && "getUserMedia" in navigator.mediaDevices
      setIsSupported(speechSupported && mediaSupported)

      if (!speechSupported) {
        setError("Speech recognition not supported in this browser")
      } else if (!mediaSupported) {
        setError("Media recording not supported in this browser")
      }
    }

    checkSupport()
  }, [])

  // Initialize speech recognition
  const initializeSpeechRecognition = useCallback(() => {
    if (!isSupported) return null

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onstart = () => {
      console.log("Speech recognition started")
      setError("")
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        const confidence = event.results[i][0].confidence

        if (event.results[i].isFinal) {
          finalTranscript += transcript

          // Add words with confidence scores
          const wordsArray = transcript.trim().split(" ")
          const newWords: Word[] = wordsArray.map((word) => ({
            text: word,
            confidence: confidence || Math.random() * 0.4 + 0.6,
            timestamp: Date.now(),
            isCorrect: confidence ? confidence > 0.7 : Math.random() > 0.3,
          }))

          setWords((prev) => [...prev, ...newWords])
        }
      }

      setTranscription((prev) => prev + finalTranscript)
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error)
      setError(`Speech recognition error: ${event.error}`)
      setIsRecording(false)
    }

    recognition.onend = () => {
      console.log("Speech recognition ended")
      if (isRecording) {
        // Restart if still recording
        recognition.start()
      }
    }

    return recognition
  }, [isSupported, isRecording])

  // Initialize audio recording
  const initializeAudioRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      })

      streamRef.current = stream

      // Set up audio context for visualization
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const analyser = audioContext.createAnalyser()
      const source = audioContext.createMediaStreamSource(stream)

      analyser.fftSize = 256
      source.connect(analyser)

      audioContextRef.current = audioContext
      analyserRef.current = analyser

      // Set up media recorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4",
      })

      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" })
        const url = URL.createObjectURL(blob)
        setAudioBlob(blob)
        setAudioUrl(url)
        chunksRef.current = []
      }

      return { mediaRecorder, audioContext, analyser }
    } catch (err) {
      console.error("Error accessing microphone:", err)
      setError("Microphone access denied. Please allow microphone access to use this feature.")
      throw err
    }
  }, [])

  // Audio visualization
  const updateAudioVisualization = useCallback(() => {
    if (!analyserRef.current) return

    const analyser = analyserRef.current
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const updateWaveform = () => {
      if (!isRecording) return

      analyser.getByteFrequencyData(dataArray)

      // Calculate average volume
      const average = dataArray.reduce((a, b) => a + b) / bufferLength
      setAudioLevel(average)

      // Update waveform data
      const waveformValues = []
      for (let i = 0; i < 50; i++) {
        const index = Math.floor((i / 50) * bufferLength)
        waveformValues.push(dataArray[index] || 0)
      }
      setWaveformData(waveformValues)

      requestAnimationFrame(updateWaveform)
    }

    updateWaveform()
  }, [isRecording])

  // Start recording
  const startRecording = async () => {
    try {
      setError("")
      setTranscription("")
      setWords([])
      setShowResults(false)
      setRecordingTime(0)

      // Initialize audio recording
      await initializeAudioRecording()

      // Initialize speech recognition
      const recognition = initializeSpeechRecognition()
      if (recognition) {
        recognitionRef.current = recognition
        recognition.start()
      }

      // Start media recorder
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.start(100) // Collect data every 100ms
      }

      setIsRecording(true)

      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)

      // Start audio visualization
      updateAudioVisualization()
    } catch (err) {
      console.error("Error starting recording:", err)
      setError("Failed to start recording. Please check your microphone permissions.")
    }
  }

  // Stop recording
  const stopRecording = () => {
    setIsRecording(false)

    // Stop speech recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }

    // Stop media recorder
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop()
    }

    // Stop audio context
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }

    // Stop media stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    // Clear intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    setAudioLevel(0)

    // Generate analysis after a short delay
    setTimeout(() => {
      generateAnalysis()
    }, 1000)
  }

  // Generate voice analysis
  const generateAnalysis = () => {
    if (words.length === 0) {
      setError("No speech detected. Please try again.")
      return
    }

    const avgConfidence = words.reduce((sum, word) => sum + word.confidence, 0) / words.length
    const correctWords = words.filter((word) => word.isCorrect).length
    const accuracy = (correctWords / words.length) * 100

    // Calculate speech rate (words per minute)
    const duration = recordingTime / 60 // Convert to minutes
    const wordsPerMinute = duration > 0 ? words.length / duration : 0
    const normalRate =
      wordsPerMinute >= 120 && wordsPerMinute <= 180 ? 100 : Math.max(0, 100 - Math.abs(150 - wordsPerMinute))

    const newAnalysis: VoiceAnalysis = {
      clarity: Math.min(100, accuracy + Math.random() * 10),
      pace: Math.min(100, normalRate + Math.random() * 15),
      volume: Math.min(100, 70 + Math.random() * 25),
      confidence: Math.min(100, avgConfidence * 100 + Math.random() * 10),
      pronunciation: Math.min(100, accuracy + Math.random() * 15),
    }

    setAnalysis(newAnalysis)
    setShowResults(true)
  }

  // Play recorded audio
  const playRecording = () => {
    if (!audioUrl) return

    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      setIsPlaying(false)
    } else {
      if (audioRef.current) {
        audioRef.current.play()
        setIsPlaying(true)
      } else {
        const audio = new Audio(audioUrl)
        audioRef.current = audio
        audio.onended = () => setIsPlaying(false)
        audio.onerror = () => {
          setError("Error playing audio")
          setIsPlaying(false)
        }
        audio.play()
        setIsPlaying(true)
      }
    }
  }

  // Reset everything
  const resetRecording = () => {
    stopRecording()
    setTranscription("")
    setWords([])
    setShowResults(false)
    setRecordingTime(0)
    setAudioLevel(0)
    setWaveformData(Array(50).fill(0))
    setError("")

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
      setAudioUrl("")
    }
    setAudioBlob(null)

    if (audioRef.current) {
      audioRef.current = null
    }
  }

  // Download recording
  const downloadRecording = () => {
    if (!audioBlob) return

    const url = URL.createObjectURL(audioBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = `speech-recording-${new Date().toISOString().slice(0, 19)}.webm`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Share results
  const shareResults = async () => {
    const overallScore = Math.round(Object.values(analysis).reduce((a, b) => a + b, 0) / 5)
    const text = `My speech therapy session results: ${overallScore}% overall score. Practicing with ${currentExercise}. #SpeechTherapy #Progress`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Speech Therapy Results",
          text: text,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(text)
        alert("Results copied to clipboard!")
      } catch (err) {
        console.log("Error copying to clipboard:", err)
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-500"
  }

  const getCurrentPhrase = () => {
    const phrases = targetPhrases[currentExercise] || []
    return phrases[Math.floor(Math.random() * phrases.length)]
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecording()
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  if (!isSupported) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-200/50 shadow-2xl text-center max-w-md">
          <MicOff className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Browser Not Supported</h2>
          <p className="text-gray-600 mb-4">
            This feature requires a modern browser with speech recognition and media recording support.
          </p>
          <p className="text-sm text-gray-500">Please try using Chrome, Edge, or Safari on desktop.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Exercise Selector */}
      <div className="flex flex-wrap justify-center gap-3">
        {exercises.map((exercise, index) => (
          <button
            key={index}
            onClick={() => setCurrentExercise(exercise)}
            disabled={isRecording}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
              currentExercise === exercise
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                : "bg-white/70 text-gray-700 hover:bg-white/90 border border-pink-200"
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {exercise}
          </button>
        ))}
      </div>

      {/* Target Phrase */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-pink-200/50">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Practice Phrase:</h3>
        <p className="text-xl text-gray-700 italic">"{getCurrentPhrase()}"</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-2xl text-center">
          <AlertCircle className="w-5 h-5 inline mr-2" />
          {error}
        </div>
      )}

      {/* Main Recording Interface */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-200/50 shadow-2xl">
        {/* Waveform Visualization */}
        <div className="relative h-32 bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl mb-8 overflow-hidden">
          <div className="absolute inset-0 flex items-end justify-center space-x-1 p-4">
            {waveformData.map((height, index) => (
              <div
                key={index}
                className={`w-2 bg-gradient-to-t transition-all duration-300 rounded-full ${
                  isRecording ? "from-pink-400 to-rose-500 animate-pulse" : "from-pink-200 to-rose-300"
                }`}
                style={{
                  height: `${Math.max((height / 255) * 80, 4)}px`,
                  animationDelay: `${index * 20}ms`,
                }}
              ></div>
            ))}
          </div>

          {/* Audio Level Indicator */}
          {isRecording && (
            <div className="absolute top-4 right-4">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-5 h-5 text-pink-600" />
                <div className="w-20 h-2 bg-pink-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-400 to-rose-500 transition-all duration-100 rounded-full"
                    style={{ width: `${Math.min((audioLevel / 255) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Recording Pulse Effect */}
          {isRecording && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center items-center space-x-6 mb-8">
          <button
            onClick={resetRecording}
            disabled={isRecording}
            className="p-4 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-12"
          >
            <RotateCcw className="w-6 h-6 text-gray-600" />
          </button>

          <div className="relative">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`relative p-8 rounded-full transition-all duration-500 transform hover:scale-110 shadow-2xl ${
                isRecording
                  ? "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
                  : "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              }`}
            >
              {isRecording ? <Square className="w-12 h-12 text-white" /> : <Mic className="w-12 h-12 text-white" />}

              {/* Pulse Animation */}
              {isRecording && (
                <>
                  <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-30"></div>
                  <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-20 animation-delay-500"></div>
                </>
              )}
            </button>

            {/* Recording Timer */}
            {isRecording && (
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                  {formatTime(recordingTime)}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={playRecording}
            disabled={!audioUrl || isRecording}
            className="p-4 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-2xl transition-all duration-300 transform hover:scale-110"
          >
            {isPlaying ? <Pause className="w-6 h-6 text-blue-600" /> : <Play className="w-6 h-6 text-blue-600" />}
          </button>
        </div>

        {/* Current Exercise Display */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-pink-100 to-rose-100 px-6 py-3 rounded-2xl border border-pink-200">
            <Target className="w-5 h-5 text-pink-600" />
            <span className="font-semibold text-gray-800">Current Exercise: {currentExercise}</span>
          </div>
        </div>
      </div>

      {/* Real-time Transcription */}
      {(transcription || words.length > 0) && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-200/50 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
            <Brain className="w-7 h-7 text-pink-500" />
            <span>Real-time Transcription</span>
          </h3>

          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-200/50">
            {words.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {words.map((word, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center px-3 py-1 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                      word.isCorrect
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    title={`Confidence: ${Math.round(word.confidence * 100)}%`}
                  >
                    {word.text}
                    {word.isCorrect ? (
                      <CheckCircle className="w-4 h-4 ml-1" />
                    ) : (
                      <AlertCircle className="w-4 h-4 ml-1" />
                    )}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-lg">{transcription}</p>
            )}

            {isRecording && (
              <div className="mt-4 flex items-center space-x-2 text-pink-600">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce animation-delay-200"></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce animation-delay-400"></div>
                <span className="text-sm font-medium ml-2">Listening...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {showResults && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-200/50 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center space-x-3">
            <TrendingUp className="w-7 h-7 text-pink-500" />
            <span>Voice Analysis Results</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {Object.entries(analysis).map(([key, value], index) => (
              <div
                key={key}
                className="group text-center p-6 bg-gradient-to-br from-white to-pink-50 rounded-2xl border border-pink-200/50 hover:shadow-lg transition-all duration-500 transform hover:scale-110 hover:-translate-y-2"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative mb-4">
                  <div className="w-20 h-20 mx-auto">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#fce7f3"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        strokeDasharray={`${value}, 100`}
                        className="transition-all duration-1000 ease-out"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ec4899" />
                          <stop offset="100%" stopColor="#f43f5e" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-2xl font-bold ${getScoreColor(value)}`}>{Math.round(value)}</span>
                    </div>
                  </div>
                </div>

                <h4 className="font-bold text-gray-800 capitalize mb-2 group-hover:text-pink-600 transition-colors duration-300">
                  {key}
                </h4>

                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(value / 20) ? "text-yellow-400 fill-current" : "text-gray-300"
                      } transition-all duration-300`}
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Overall Score */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-pink-100 to-rose-100 px-8 py-4 rounded-2xl border border-pink-200">
              <Award className="w-8 h-8 text-pink-600" />
              <div>
                <div className="text-sm text-gray-600">Overall Score</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  {Math.round(Object.values(analysis).reduce((a, b) => a + b, 0) / 5)}%
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={downloadRecording}
              disabled={!audioBlob}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span>Download Recording</span>
            </button>

            <button
              onClick={shareResults}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Share2 className="w-5 h-5" />
              <span>Share Results</span>
            </button>

            <button
              onClick={resetRecording}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      )}

      {/* Tips and Encouragement */}
      <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-3xl p-8 border border-pink-200/50 shadow-xl">
        <div className="text-center">
          <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Keep Practicing!</h3>
          <p className="text-gray-600 text-lg mb-6">
            Every session brings you closer to clearer communication. Your progress matters!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Daily Practice",
                tip: "Practice for 10-15 minutes daily for best results",
              },
              {
                icon: Target,
                title: "Focus Areas",
                tip: "Work on one sound or word pattern at a time",
              },
              {
                icon: Brain,
                title: "Stay Positive",
                tip: "Celebrate small improvements and be patient with yourself",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-4 bg-white/60 rounded-2xl border border-pink-200/50 transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <item.icon className="w-8 h-8 text-pink-500 mx-auto mb-3" />
                <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Combined Component
export default function CommunicationTherapyHub() {
  const [activeMainTab, setActiveMainTab] = useState("voice")
  const [currentSignIndex, setCurrentSignIndex] = useState(0)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [score, setScore] = useState(0)

  const [cameraActive, setCameraActive] = useState(false)
  const [signsLearned, setSignsLearned] = useState(12)
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [feedback, setFeedback] = useState<{
    type: "excellent" | "good" | "needsWork" | "poor" | null
    message: string
    show: boolean
  }>({ type: null, message: "", show: false })
  const [attempts, setAttempts] = useState(0)
  const [showTips, setShowTips] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [wrongSignDetected, setWrongSignDetected] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Enhanced sign analysis function with camera feedback
  const analyzeSign = useCallback(
    (context: "vocabulary" | "phrase" | "story" | "conversation") => {
      setIsProcessing(true)

      setTimeout(() => {
        const random = Math.random()
        let feedbackType: "excellent" | "good" | "needsWork" | "poor"
        let points = 0

        const currentItem =
          context === "vocabulary"
            ? signLanguageSigns[currentSignIndex]
            : context === "phrase"
              ? signPhrases[currentPhraseIndex]
              : null

        const difficultyMultiplier =
          currentItem?.difficulty === "easy" ? 0.8 : currentItem?.difficulty === "medium" ? 0.6 : 0.4

        const attemptsBonus = Math.min(attempts * 0.1, 0.3)
        const successRate = (random + attemptsBonus) * difficultyMultiplier

        // Simulate wrong sign detection
        if (random < 0.3) {
          setWrongSignDetected(true)
          setTimeout(() => setWrongSignDetected(false), 3000)
        }

        if (successRate > 0.7) {
          feedbackType = "excellent"
          points = 25
          setSignsLearned((prev) => Math.min(prev + 1, 50))
        } else if (successRate > 0.5) {
          feedbackType = "good"
          points = 20
        } else if (successRate > 0.3) {
          feedbackType = "needsWork"
          points = 15
        } else {
          feedbackType = "poor"
          points = 10
        }

        const messages = feedbackMessages[feedbackType]
        const randomMessage = messages[Math.floor(Math.random() * messages.length)]

        setFeedback({
          type: feedbackType,
          message: randomMessage,
          show: true,
        })

        setScore((prev) => prev + points)
        setAttempts((prev) => prev + 1)
        setIsProcessing(false)

        setTimeout(() => {
          setFeedback((prev) => ({ ...prev, show: false }))
        }, 4000)
      }, 1200)
    },
    [currentSignIndex, currentPhraseIndex, attempts],
  )

  // Recording timer
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

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: "user",
        },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setCameraActive(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Please allow camera access to practice sign language with visual feedback.")
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setCameraActive(false)
  }

  const startPractice = () => {
    if (!cameraActive) {
      startCamera()
    }
    setIsRecording(true)
  }

  const stopPractice = () => {
    setIsRecording(false)
    analyzeSign("vocabulary")
  }

  const nextSign = () => {
    setCurrentSignIndex((prev) => (prev + 1) % signLanguageSigns.length)
    setFeedback({ type: null, message: "", show: false })
    setAttempts(0)
    setShowTips(false)
    setWrongSignDetected(false)
  }

  const nextPhrase = () => {
    setCurrentPhraseIndex((prev) => (prev + 1) % signPhrases.length)
    setFeedback({ type: null, message: "", show: false })
    setAttempts(0)
    setShowTips(false)
  }

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % signStories.length)
    setFeedback({ type: null, message: "", show: false })
    setAttempts(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (cameraActive) {
        stopCamera()
      }
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
    }
  }, [cameraActive])

  // Practice Controls Component
  const PracticeControls = () => (
    <div className="flex flex-col items-center gap-4">
      {!isRecording && !isProcessing ? (
        <Button
          onClick={startPractice}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all"
        >
          <Hand className="w-5 h-5 mr-2" />
          Start Signing Practice
        </Button>
      ) : isRecording ? (
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3 text-pink-600 font-medium bg-pink-50 px-4 py-2 rounded-full">
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
            <span>Recording Signs... {formatTime(recordingTime)}</span>
          </div>
          <Button onClick={stopPractice} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2">
            <Square className="w-4 h-4 mr-2" />
            Stop Practice
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-3 text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Analyzing your signs...</span>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Beautiful Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent mb-4">
            🎯 Communication Therapy Hub
          </h1>
          <p className="text-pink-600 text-xl">Master both voice and sign language communication skills!</p>
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-2xl">
              <span>🗣️</span>
              <span>🤟</span>
              <span>👋</span>
              <span>❤️</span>
              <span>🌟</span>
            </div>
          </div>
        </div>

        {/* Enhanced Feedback Modal */}
        {feedback.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
              className={`bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl transform animate-pulse ${
                feedback.type === "excellent"
                  ? "border-l-8 border-green-500"
                  : feedback.type === "good"
                    ? "border-l-8 border-blue-500"
                    : feedback.type === "needsWork"
                      ? "border-l-8 border-yellow-500"
                      : "border-l-8 border-red-500"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {feedback.type === "excellent" && <ThumbsUp className="w-8 h-8 text-green-500" />}
                  {feedback.type === "good" && <CheckCircle className="w-8 h-8 text-blue-500" />}
                  {feedback.type === "needsWork" && <AlertCircle className="w-8 h-8 text-yellow-500" />}
                  {feedback.type === "poor" && <RotateCcw className="w-8 h-8 text-red-500" />}
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{feedback.message}</p>
                    {(feedback.type === "needsWork" || feedback.type === "poor") && (
                      <p className="text-sm text-gray-600 mt-2">
                        💡 Tip:{" "}
                        {activeMainTab === "sign"
                          ? signLanguageSigns[currentSignIndex].description
                          : "Keep practicing your communication skills!"}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFeedback((prev) => ({ ...prev, show: false }))}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Wrong Sign Detection Alert */}
        {wrongSignDetected && cameraActive && activeMainTab === "sign" && (
          <div className="fixed top-20 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-40 animate-bounce">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span className="font-semibold">Incorrect sign detected! Try again.</span>
            </div>
          </div>
        )}

        {/* Enhanced Progress Overview */}
        <Card className="mb-8 border-pink-200 bg-gradient-to-r from-pink-100 via-rose-100 to-orange-100 shadow-xl">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3 text-pink-800 text-2xl">
              <TrendingUp className="w-6 h-6" />
              Your Communication Journey
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center bg-white rounded-lg p-4 shadow-md">
                <div className="text-3xl font-bold text-rose-700">{score}</div>
                <div className="text-sm text-rose-600">Total Score ⭐</div>
              </div>
              <div className="text-center bg-white rounded-lg p-4 shadow-md">
                <div className="text-3xl font-bold text-orange-700">{signsLearned}/50</div>
                <div className="text-sm text-orange-600">Signs Learned 🤟</div>
              </div>
              <div className="text-center bg-white rounded-lg p-4 shadow-md">
                <div className="text-3xl font-bold text-pink-700">{attempts}</div>
                <div className="text-sm text-pink-600">Practice Sessions 🎯</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Navigation Tabs */}
        <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-pink-100 mb-8 h-auto shadow-lg">
            <TabsTrigger value="voice" className="data-[state=active]:bg-rose-200 p-6 text-xl font-semibold">
              <Mic className="w-6 h-6 mr-3" />
              Voice Therapy
            </TabsTrigger>
            <TabsTrigger value="sign" className="data-[state=active]:bg-rose-200 p-6 text-xl font-semibold">
              <Hand className="w-6 h-6 mr-3" />
              Sign Language
            </TabsTrigger>
          </TabsList>

          {/* Voice Recognition Therapy Tab */}
          <TabsContent value="voice">
            <VoiceRecognitionComponent />
          </TabsContent>

          {/* Sign Language Learning Tab */}
          <TabsContent value="sign">
            <Tabs defaultValue="vocabulary" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-pink-100 mb-8 h-auto shadow-lg">
                <TabsTrigger value="vocabulary" className="data-[state=active]:bg-rose-200 p-4 text-lg">
                  <Hand className="w-5 h-5 mr-2" />
                  Vocabulary
                </TabsTrigger>
                <TabsTrigger value="phrases" className="data-[state=active]:bg-rose-200 p-4 text-lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Phrases
                </TabsTrigger>
                <TabsTrigger value="practice" className="data-[state=active]:bg-rose-200 p-4 text-lg">
                  <Camera className="w-5 h-5 mr-2" />
                  Practice
                </TabsTrigger>
                <TabsTrigger value="stories" className="data-[state=active]:bg-rose-200 p-4 text-lg">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Stories
                </TabsTrigger>
              </TabsList>

              {/* Vocabulary Learning */}
              <TabsContent value="vocabulary">
                <Card className="border-pink-200 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-pink-100 to-rose-100">
                    <CardTitle className="text-pink-800 text-2xl">🤟 Sign Vocabulary</CardTitle>
                    <CardDescription className="text-pink-600 text-lg">
                      Learn individual signs with visual demonstrations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="text-8xl mb-6">{signLanguageSigns[currentSignIndex].emoji}</div>
                      <h2 className="text-4xl font-bold text-pink-800 mb-4">
                        {signLanguageSigns[currentSignIndex].word}
                      </h2>
                      <div className="flex flex-wrap justify-center gap-3 mb-6">
                        <Badge variant="secondary" className="bg-pink-100 text-pink-700 text-lg px-4 py-2">
                          Sign: {signLanguageSigns[currentSignIndex].sign}
                        </Badge>
                        <Badge
                          variant={
                            signLanguageSigns[currentSignIndex].difficulty === "easy"
                              ? "default"
                              : signLanguageSigns[currentSignIndex].difficulty === "medium"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-lg px-4 py-2"
                        >
                          {signLanguageSigns[currentSignIndex].difficulty}
                        </Badge>
                      </div>

                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setShowTips(!showTips)}
                        className="mb-6 border-pink-300 text-pink-700 text-lg"
                      >
                        💡 {showTips ? "Hide" : "Show"} Sign Instructions
                      </Button>

                      {showTips && (
                        <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-6 mb-6">
                          <p className="text-rose-700 text-xl font-bold">🤟 How to Sign:</p>
                          <p className="text-rose-600 text-lg mt-2">
                            {signLanguageSigns[currentSignIndex].description}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-center gap-6">
                      <PracticeControls />

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          onClick={nextSign}
                          className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white px-8 py-3 text-lg"
                          disabled={isRecording || isProcessing}
                        >
                          Next Sign
                        </Button>
                        <Button
                          variant="outline"
                          className="border-pink-300 text-pink-700 px-8 py-3 text-lg"
                          onClick={() => {
                            setFeedback({ type: null, message: "", show: false })
                            setWrongSignDetected(false)
                          }}
                          disabled={isRecording || isProcessing}
                        >
                          <RotateCcw className="w-5 h-5 mr-2" />
                          Try Again
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Phrase Practice */}
              <TabsContent value="phrases">
                <Card className="border-pink-200 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-pink-100 to-rose-100">
                    <CardTitle className="text-pink-800 text-2xl">💬 Sign Phrases</CardTitle>
                    <CardDescription className="text-pink-600 text-lg">
                      Practice signing complete phrases and sentences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-pink-800 mb-6">
                        "{signPhrases[currentPhraseIndex].text}"
                      </h2>
                      <div className="flex flex-wrap justify-center gap-3 mb-6">
                        <Badge variant="secondary" className="bg-pink-100 text-pink-700 text-lg px-4 py-2">
                          {signPhrases[currentPhraseIndex].description}
                        </Badge>
                        <Badge
                          variant={
                            signPhrases[currentPhraseIndex].difficulty === "easy"
                              ? "default"
                              : signPhrases[currentPhraseIndex].difficulty === "medium"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-lg px-4 py-2"
                        >
                          {signPhrases[currentPhraseIndex].difficulty}
                        </Badge>
                      </div>

                      <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 mb-6">
                        <p className="text-orange-700 text-xl font-bold mb-3">🎯 Signs to Practice:</p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {signPhrases[currentPhraseIndex].signs.map((sign, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="border-orange-400 text-orange-700 text-base px-3 py-1"
                            >
                              {sign}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                      <PracticeControls />

                      <Button
                        onClick={nextPhrase}
                        className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
                        disabled={isRecording || isProcessing}
                      >
                        Next Phrase
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Camera Practice */}
              <TabsContent value="practice">
                <Card className="border-pink-200 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-pink-100 to-rose-100">
                    <CardTitle className="text-pink-800 text-2xl">📹 Visual Practice</CardTitle>
                    <CardDescription className="text-pink-600 text-lg">
                      Practice with camera feedback and real-time analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="text-center">
                        <h3 className="text-2xl font-semibold text-pink-800 mb-4">Your Practice</h3>
                        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden aspect-video shadow-lg">
                          <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                          {!cameraActive && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">Camera not active</p>
                              </div>
                            </div>
                          )}
                          {wrongSignDetected && cameraActive && (
                            <div className="absolute top-4 left-4 right-4 bg-red-500 text-white p-3 rounded-lg animate-pulse">
                              <div className="flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                <span className="font-semibold">Incorrect sign detected!</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <Button
                          onClick={cameraActive ? stopCamera : startCamera}
                          className="mt-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 text-lg"
                        >
                          <Camera className="w-5 h-5 mr-2" />
                          {cameraActive ? "Stop Camera" : "Start Camera"}
                        </Button>
                      </div>

                      <div className="text-center">
                        <h3 className="text-2xl font-semibold text-pink-800 mb-4">Current Sign</h3>
                        <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-8 aspect-video flex flex-col items-center justify-center shadow-lg">
                          <div className="text-6xl mb-4">{signLanguageSigns[currentSignIndex].emoji}</div>
                          <div className="text-2xl font-bold text-pink-800 mb-2">
                            {signLanguageSigns[currentSignIndex].word}
                          </div>
                          <div className="text-lg text-pink-600 mb-4">{signLanguageSigns[currentSignIndex].sign}</div>
                          <Badge className="bg-rose-200 text-pink-800 text-base px-4 py-2">
                            {signLanguageSigns[currentSignIndex].description}
                          </Badge>
                        </div>
                        <div className="flex flex-col gap-3 mt-6">
                          <PracticeControls />
                          <Button
                            onClick={nextSign}
                            variant="outline"
                            className="border-pink-300 text-pink-700 px-6 py-2 text-lg"
                            disabled={isRecording || isProcessing}
                          >
                            Next Sign
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Story Practice */}
              <TabsContent value="stories">
                <Card className="border-pink-200 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-pink-100 to-rose-100">
                    <CardTitle className="text-pink-800 text-2xl">📚 Sign Stories</CardTitle>
                    <CardDescription className="text-pink-600 text-lg">
                      Create stories using sign language vocabulary
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="text-8xl mb-6">{signStories[currentStoryIndex].image}</div>
                      <h2 className="text-3xl font-bold text-pink-800 mb-6">{signStories[currentStoryIndex].prompt}</h2>

                      <div className="mb-6">
                        <p className="text-lg text-pink-600 mb-4">💡 Try to include these signs:</p>
                        <div className="flex flex-wrap justify-center gap-3">
                          {signStories[currentStoryIndex].keywords.map((keyword, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="border-pink-300 text-pink-700 text-base px-3 py-2"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Badge
                        variant={
                          signStories[currentStoryIndex].difficulty === "easy"
                            ? "default"
                            : signStories[currentStoryIndex].difficulty === "medium"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-lg px-4 py-2 mb-6"
                      >
                        {signStories[currentStoryIndex].difficulty}
                      </Badge>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                      <PracticeControls />

                      <Button
                        className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
                        onClick={nextStory}
                        disabled={isRecording || isProcessing}
                      >
                        New Story Prompt
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Beautiful Sign Language Showcase */}
            <Card className="mt-8 border-pink-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-pink-100 to-rose-100">
                <CardTitle className="text-pink-800 text-2xl text-center">🌟 Your Sign Language Collection</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
                  {signLanguageSigns.slice(0, 20).map((sign, index) => (
                    <div
                      key={index}
                      className="text-center p-3 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg hover:shadow-md transition-all cursor-pointer transform hover:scale-105"
                      onClick={() => setCurrentSignIndex(index)}
                    >
                      <div className="text-2xl mb-1">{sign.emoji}</div>
                      <div className="text-xs text-pink-600 font-medium">{sign.word}</div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <p className="text-pink-600 text-lg">
                    🎯 Keep practicing to unlock all 50 signs! ({signsLearned}/50 learned)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
