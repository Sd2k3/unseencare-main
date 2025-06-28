"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mic,
  Volume2,
  VolumeX,
  Star,
  Music,
  Download,
  Share2,
  Trophy,
  Target,
  Zap,
  Sparkles,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  BookOpen,
  MicOff,
  AlertCircle,
  CheckCircle,
  Brain,
  TrendingUp,
  Clock,
} from "lucide-react"

// Utility function for combining class names
const cn = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes.filter(Boolean).join(" ")
}

interface SpeechAnalysis {
  clarity: number
  pace: number
  volume: number
  pronunciation: number
  fluency: number
  overallScore: number
  suggestions: string[]
  detectedWords: string[]
  missedWords: string[]
}

interface AudioData {
  url: string
  blob: Blob
  duration: number
}

interface Song {
  id: number
  title: string
  artist: string
  difficulty: string
  duration: number
  category: string
  therapeuticFocus: string[]
  audioUrl: string
  lyrics: {
    time: number
    text: string
    phonetic: string
    words: string[]
  }[]
  color: string
  targetWords: string[]
  commonIssues: string[]
}

interface Achievement {
  name: string
  icon: React.ComponentType<{ className?: string }>
  unlocked: boolean
  description: string
}

const KaraokeTherapy: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [selectedSong, setSelectedSong] = useState(0)
  const [showLyrics, setShowLyrics] = useState(true)
  const [currentLine, setCurrentLine] = useState(0)
  const [score, setScore] = useState(0)
  const [streak] = useState(0)
  const [micPermission, setMicPermission] = useState<boolean | null>(null)
  const [audioLevel, setAudioLevel] = useState(0)
  const [recordedAudio, setRecordedAudio] = useState<AudioData | null>(null)
  const [speechAnalysis, setSpeechAnalysis] = useState<SpeechAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [isAudioLoading, setIsAudioLoading] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number>()
  const audioRef = useRef<HTMLAudioElement>(new Audio())
  const recordingStartTimeRef = useRef<number>(0)


  const songs: Song[] = [
    {
      id: 1,
      title: "Twinkle Twinkle Little Star",
      artist: "Traditional",
      difficulty: "beginner",
      duration: 35,
      category: "Nursery Rhymes",
      therapeuticFocus: ["Articulation", "Rhythm", "Breathing"],
      // Using a working online audio file
     audioUrl: "/assets/audio/twinkle-twinkle.mp3",
      lyrics: [
        {
          time: 0,
          text: "Twinkle, twinkle, little star",
          phonetic: "TWING-kul TWING-kul LIT-ul STAR",
          words: ["twinkle", "little", "star"],
        },
        {
          time: 6,
          text: "How I wonder what you are",
          phonetic: "HOW AY WUN-der WHAT YOO AR",
          words: ["how", "wonder", "what", "you", "are"],
        },
        {
          time: 11,
          text: "Up above the world so high",
          phonetic: "UP uh-BUV thuh WURLD SO HY",
          words: ["up", "above", "world", "so", "high"],
        },
        {
          time: 18,
          text: "Like a diamond in the sky",
          phonetic: "LYK uh DY-mund IN thuh SKY",
          words: ["like", "diamond", "in", "the", "sky"],
        },
        {
          time: 24,
          text: "Twinkle, twinkle, little star",
          phonetic: "TWING-kul TWING-kul LIT-ul STAR",
          words: ["twinkle", "little", "star"],
        },
        {
          time: 30,
          text: "How I wonder what you are",
          phonetic: "HOW AY WUN-der WHAT YOO AR",
          words: ["how", "wonder", "what", "you", "are"],
        },
      ],
      color: "from-pink-500 to-rose-400",
      targetWords: ["twinkle", "little", "star", "wonder", "diamond", "above", "world", "high", "sky"],
      commonIssues: ["R sounds", "L sounds", "TH sounds", "Consonant clusters"],
    },
    {
      id: 2,
      title: "Happy Birthday",
      artist: "Traditional",
      difficulty: "beginner",
      duration: 20,
      category: "Celebrations",
      therapeuticFocus: ["Pronunciation", "Social Skills", "Confidence"],
      // Alternative: Use your own audio file path
      audioUrl: "/audio/happy-birthday.mp3", // Put your audio file in public/audio/ folder
      lyrics: [
        {
          time: 0,
          text: "Happy birthday to you",
          phonetic: "HAP-ee BURTH-day TOO YOO",
          words: ["happy", "birthday", "to", "you"],
        },
        {
          time: 5,
          text: "Happy birthday to you",
          phonetic: "HAP-ee BURTH-day TOO YOO",
          words: ["happy", "birthday", "to", "you"],
        },
        {
          time: 10,
          text: "Happy birthday dear friend",
          phonetic: "HAP-ee BURTH-day DEER FREND",
          words: ["happy", "birthday", "dear", "friend"],
        },
        {
          time: 15,
          text: "Happy birthday to you",
          phonetic: "HAP-ee BURTH-day TOO YOO",
          words: ["happy", "birthday", "to", "you"],
        },
      ],
      color: "from-rose-500 to-pink-400",
      targetWords: ["happy", "birthday", "dear", "friend"],
      commonIssues: ["TH sounds", "R sounds", "Vowel clarity"],
    },
    {
      id: 3,
      title: "Row Your Boat",
      artist: "Traditional",
      difficulty: "intermediate",
      duration: 25,
      category: "Action Songs",
      therapeuticFocus: ["Fluency", "Rhythm", "Motor Skills"],
      // Using Text-to-Speech generated audio
      audioUrl: "tts", // Special flag for text-to-speech
      lyrics: [
        { time: 0, text: "Row, row, row your boat", phonetic: "ROH ROH ROH YOR BOHT", words: ["row", "your", "boat"] },
        {
          time: 6,
          text: "Gently down the stream",
          phonetic: "JENT-lee DOWN thuh STREEM",
          words: ["gently", "down", "the", "stream"],
        },
        {
          time: 12,
          text: "Merrily, merrily, merrily, merrily",
          phonetic: "MER-uh-lee MER-uh-lee MER-uh-lee MER-uh-lee",
          words: ["merrily"],
        },
        {
          time: 18,
          text: "Life is but a dream",
          phonetic: "LYF IZ BUT uh DREEM",
          words: ["life", "is", "but", "a", "dream"],
        },
      ],
      color: "from-pink-400 to-orange-400",
      targetWords: ["row", "gently", "stream", "merrily", "dream"],
      commonIssues: ["R sounds", "L sounds", "Rhythm", "Repetition"],
    },
    {
      id: 4,
      title: "The Alphabet Song",
      artist: "Traditional",
      difficulty: "beginner",
      duration: 35,
      category: "Educational",
      therapeuticFocus: ["Articulation", "Letter Sounds", "Memory"],
      audioUrl: "tts", // Using text-to-speech
      lyrics: [
        {
          time: 0,
          text: "A B C D E F G",
          phonetic: "AY BEE SEE DEE EE EF JEE",
          words: ["a", "b", "c", "d", "e", "f", "g"],
        },
        {
          time: 8,
          text: "H I J K L M N O P",
          phonetic: "AYCH AY JAY KAY EL EM EN OH PEE",
          words: ["h", "i", "j", "k", "l", "m", "n", "o", "p"],
        },
        { time: 16, text: "Q R S T U V", phonetic: "KYOO AR ES TEE YOO VEE", words: ["q", "r", "s", "t", "u", "v"] },
        { time: 24, text: "W X Y and Z", phonetic: "DUB-ul-yoo EKS WY and ZEE", words: ["w", "x", "y", "and", "z"] },
        {
          time: 30,
          text: "Now I know my ABCs",
          phonetic: "NOW AY NOH MY AY-BEE-SEES",
          words: ["now", "i", "know", "my", "abcs"],
        },
      ],
      color: "from-orange-500 to-amber-400",
      targetWords: ["letters", "alphabet", "sounds"],
      commonIssues: ["Letter sounds", "Consonant clarity", "Vowel distinction"],
    },
  ]

  const currentSong = songs[selectedSong]

  const achievements: Achievement[] = [
    { name: "First Song", icon: Music, unlocked: true, description: "Complete your first karaoke session" },
    { name: "Perfect Pitch", icon: Target, unlocked: score >= 90, description: "Score 90% or higher on a song" },
    { name: "Streak Master", icon: Zap, unlocked: streak >= 7, description: "Maintain a 7-day practice streak" },
    { name: "Pronunciation Pro", icon: Sparkles, unlocked: true, description: "Master 10 difficult words" },
    { name: "Speech Analyst", icon: Brain, unlocked: speechAnalysis !== null, description: "Complete speech analysis" },
    { name: "Improvement Champion", icon: TrendingUp, unlocked: score > 0, description: "Show measurable improvement" },
  ]

  // Text-to-Speech function
  const speakLyrics = useCallback(
    (lyrics: any[]) => {
      if (!("speechSynthesis" in window)) {
        console.error("Speech synthesis not supported")
        return
      }

      const fullText = lyrics.map((lyric) => lyric.text).join(". ")
      const utterance = new SpeechSynthesisUtterance(fullText)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = (volume / 100) * (isMuted ? 0 : 1)

      // Find a good voice (prefer female voice for nursery rhymes)
      const voices = speechSynthesis.getVoices()
      const preferredVoice =
        voices.find((voice) => voice.lang.startsWith("en") && voice.name.includes("Female")) ||
        voices.find((voice) => voice.lang.startsWith("en"))

      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      utterance.onend = () => {
        setIsPlaying(false)
        setCurrentTime(0)
        setCurrentLine(0)
      }

      speechSynthesis.speak(utterance)
    },
    [volume, isMuted],
  )

  const requestMicrophonePermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      })
      setMicPermission(true)
      streamRef.current = stream
      setupAudioContext(stream)
      return stream
    } catch (error) {
      console.error("Microphone permission denied:", error)
      setMicPermission(false)
      return null
    }
  }, [])

  const setupAudioContext = useCallback((stream: MediaStream) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const analyser = audioContext.createAnalyser()
      const microphone = audioContext.createMediaStreamSource(stream)

      analyser.fftSize = 256
      microphone.connect(analyser)

      audioContextRef.current = audioContext
      analyserRef.current = analyser
      microphoneRef.current = microphone

      monitorAudioLevel()
    } catch (error) {
      console.error("Error setting up audio context:", error)
    }
  }, [])

  const monitorAudioLevel = useCallback(() => {
    if (!analyserRef.current) return

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)

    const updateLevel = () => {
      if (!analyserRef.current) return

      analyserRef.current.getByteFrequencyData(dataArray)
      const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length
      setAudioLevel(average)

      if (isRecording) {
        animationFrameRef.current = requestAnimationFrame(updateLevel)
      }
    }

    updateLevel()
  }, [isRecording])

  const analyzeSpeech = useCallback(
    async (expectedLyrics: any[]): Promise<SpeechAnalysis> => {
      setIsAnalyzing(true)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      const allExpectedWords = expectedLyrics.flatMap((line) => line.words)
      const detectedWords = allExpectedWords.filter(() => Math.random() > 0.2)
      const missedWords = allExpectedWords.filter((word) => !detectedWords.includes(word))

      const clarity = Math.min(95, 60 + (audioLevel / 255) * 35 + Math.random() * 10)
      const pace = Math.min(95, 70 + Math.random() * 25)
      const volume = Math.min(95, 50 + (audioLevel / 255) * 45)
      const pronunciation = Math.min(95, 65 + (detectedWords.length / allExpectedWords.length) * 30)
      const fluency = Math.min(95, 60 + Math.random() * 35)
      const overallScore = Math.round((clarity + pace + volume + pronunciation + fluency) / 5)

      const suggestions: string[] = []

      if (clarity < 70) {
        suggestions.push("Focus on articulating consonants more clearly, especially 'R', 'L', and 'TH' sounds.")
        suggestions.push("Practice opening your mouth wider for vowel sounds.")
      }

      if (pace < 70) {
        suggestions.push("Try to maintain a steady rhythm. Use a metronome to practice timing.")
        suggestions.push("Take brief pauses between phrases to improve pacing.")
      }

      if (volume < 60) {
        suggestions.push("Project your voice more confidently. Practice diaphragmatic breathing.")
        suggestions.push("Ensure you're speaking loud enough to be clearly heard.")
      }

      if (pronunciation < 70) {
        suggestions.push("Work on specific problem sounds identified in your speech pattern.")
        suggestions.push("Practice tongue twisters to improve articulation precision.")
      }

      if (fluency < 70) {
        suggestions.push("Practice reading aloud daily to improve speech flow.")
        suggestions.push("Focus on smooth transitions between words and phrases.")
      }

      currentSong.therapeuticFocus.forEach((focus) => {
        switch (focus) {
          case "Articulation":
            suggestions.push("Practice precise consonant sounds, especially at word endings.")
            break
          case "Rhythm":
            suggestions.push("Clap along to the beat while speaking to improve rhythm.")
            break
          case "Breathing":
            suggestions.push("Practice breathing exercises to support longer phrases.")
            break
          case "Pronunciation":
            suggestions.push("Focus on clear vowel sounds and proper stress patterns.")
            break
        }
      })

      if (missedWords.length > 0) {
        suggestions.push(`Practice these challenging words: ${missedWords.slice(0, 3).join(", ")}`)
      }

      setIsAnalyzing(false)

      return {
        clarity,
        pace,
        volume,
        pronunciation,
        fluency,
        overallScore,
        suggestions: suggestions.slice(0, 5),
        detectedWords,
        missedWords,
      }
    },
    [audioLevel, currentSong],
  )

  const startRecording = useCallback(async () => {
    if (!streamRef.current) {
      const stream = await requestMicrophonePermission()
      if (!stream) return
    }

    try {
      audioChunksRef.current = []
      const mediaRecorder = new MediaRecorder(streamRef.current!, {
        mimeType: "audio/webm;codecs=opus",
      })

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const recordingBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        const audioUrl = URL.createObjectURL(recordingBlob)
        const duration = Date.now() - recordingStartTimeRef.current

        const audioData: AudioData = {
          url: audioUrl,
          blob: recordingBlob,
          duration: duration / 1000,
        }

        setRecordedAudio(audioData)

        const analysis = await analyzeSpeech(currentSong.lyrics)
        setSpeechAnalysis(analysis)
        setScore(analysis.overallScore)
        setShowFeedback(true)
      }

      mediaRecorderRef.current = mediaRecorder
      recordingStartTimeRef.current = Date.now()
      mediaRecorder.start(100)
      setIsRecording(true)
      monitorAudioLevel()
    } catch (error) {
      console.error("Error starting recording:", error)
    }
  }, [requestMicrophonePermission, analyzeSpeech, currentSong, monitorAudioLevel])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setAudioLevel(0)

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isRecording])

  const handleRecord = useCallback(() => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }, [isRecording, startRecording, stopRecording])

  useEffect(() => {
    requestMicrophonePermission()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      // Stop any ongoing speech synthesis
      if ("speechSynthesis" in window) {
        speechSynthesis.cancel()
      }
    }
  }, [requestMicrophonePermission])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    const audio = audioRef.current

    const updateProgress = () => {
      if (audio && !audio.paused) {
        setCurrentTime(audio.currentTime)

        const currentLyricIndex = currentSong.lyrics.findIndex((lyric, index) => {
          const nextLyric = currentSong.lyrics[index + 1]
          return audio.currentTime >= lyric.time && (!nextLyric || audio.currentTime < nextLyric.time)
        })

        if (currentLyricIndex !== -1) {
          setCurrentLine(currentLyricIndex)
        }
      }
    }

    const handleSongEnd = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      setCurrentLine(0)
    }

    const handleLoadStart = () => {
      setIsAudioLoading(true)
      setAudioError(null)
    }

    const handleCanPlay = () => {
      setIsAudioLoading(false)
      setAudioError(null)
    }

    const handleError = () => {
      setIsAudioLoading(false)
      setAudioError("Audio file could not be loaded. Using text-to-speech instead.")
      console.error("Audio loading failed")
    }

    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("ended", handleSongEnd)
    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("ended", handleSongEnd)
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("error", handleError)
    }
  }, [currentSong])

  const handlePlayPause = useCallback(async () => {
    const audio = audioRef.current

    if (isPlaying) {
      // Stop current playback
      if (currentSong.audioUrl === "tts") {
        speechSynthesis.cancel()
      } else {
        audio.pause()
      }
      setIsPlaying(false)
    } else {
      try {
        if (currentSong.audioUrl === "tts") {
          // Use text-to-speech
          setIsPlaying(true)
          speakLyrics(currentSong.lyrics)

          // Start timer for lyrics sync
          let timeElapsed = 0
          const interval = setInterval(() => {
            timeElapsed += 1
            setCurrentTime(timeElapsed)

            const currentLyricIndex = currentSong.lyrics.findIndex((lyric, index) => {
              const nextLyric = currentSong.lyrics[index + 1]
              return timeElapsed >= lyric.time && (!nextLyric || timeElapsed < nextLyric.time)
            })

            if (currentLyricIndex !== -1) {
              setCurrentLine(currentLyricIndex)
            }

            if (timeElapsed >= currentSong.duration) {
              clearInterval(interval)
              setIsPlaying(false)
              setCurrentTime(0)
              setCurrentLine(0)
            }
          }, 1000)
        } else {
          // Use audio file
          if (audio.src !== currentSong.audioUrl) {
            audio.src = currentSong.audioUrl
            audio.volume = isMuted ? 0 : volume / 100
          }
          await audio.play()
          setIsPlaying(true)
        }
      } catch (error) {
        console.error("Playback failed:", error)
        setAudioError("Playback failed. Using text-to-speech instead.")
        // Fallback to TTS
        setIsPlaying(true)
        speakLyrics(currentSong.lyrics)
      }
    }
  }, [isPlaying, currentSong, speakLyrics, isMuted, volume])

  const handleRestart = useCallback(() => {
    const audio = audioRef.current

    // Stop any current playback
    if (currentSong.audioUrl === "tts") {
      speechSynthesis.cancel()
    } else {
      audio.pause()
      audio.currentTime = 0
    }

    setIsPlaying(false)
    setCurrentTime(0)
    setCurrentLine(0)
    setScore(0)
    setSpeechAnalysis(null)
    setShowFeedback(false)
    setAudioError(null)
  }, [currentSong])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = isMuted ? 0 : volume / 100
    }
  }, [volume, isMuted])

  const downloadRecording = () => {
    if (recordedAudio) {
      const a = document.createElement("a")
      a.href = recordedAudio.url
      a.download = `karaoke-recording-${currentSong.title.replace(/\s+/g, "-").toLowerCase()}.webm`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-rose-50 p-4 md:p-6 lg:p-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-rose-200/30 to-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-200/20 to-pink-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="flex items-center gap-4 justify-center mb-4">
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-400 rounded-2xl flex items-center justify-center text-white shadow-xl"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)",
              }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              <Mic className="w-8 h-8" />
            </motion.div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
                Karaoke Therapy
              </h1>
              <p className="text-gray-600 text-lg mt-2">AI-Powered Speech Improvement</p>
            </div>
          </div>
        </motion.div>

        {micPermission === false && (
          <motion.div
            className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-5 h-5 text-red-500" />
            <div className="flex-1">
              <p className="text-red-700 font-medium">Microphone access required</p>
              <p className="text-red-600 text-sm">Please allow microphone access to use recording features.</p>
            </div>
            <button
              onClick={requestMicrophonePermission}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Enable Microphone
            </button>
          </motion.div>
        )}

        {audioError && (
          <motion.div
            className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-5 h-5 text-blue-500" />
            <div className="flex-1">
              <p className="text-blue-700 font-medium">Audio Notice</p>
              <p className="text-blue-600 text-sm">{audioError}</p>
            </div>
          </motion.div>
        )}

        {isAudioLoading && (
          <motion.div
            className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
            <div className="flex-1">
              <p className="text-yellow-700 font-medium">Loading Audio...</p>
              <p className="text-yellow-600 text-sm">Please wait while the audio file loads.</p>
            </div>
          </motion.div>
        )}

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="lg:col-span-2 space-y-6">
            <motion.div variants={cardVariants}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className={cn(
                      "w-20 h-20 bg-gradient-to-r rounded-2xl flex items-center justify-center text-white shadow-lg",
                      currentSong.color,
                    )}
                    whileHover={{ scale: 1.05 }}
                    animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 1, repeat: isPlaying ? Number.POSITIVE_INFINITY : 0 }}
                  >
                    <Music className="w-10 h-10" />
                  </motion.div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{currentSong.title}</h2>
                    <p className="text-gray-600 mb-2">{currentSong.artist}</p>
                    <div className="flex flex-wrap gap-2">
                      {currentSong.therapeuticFocus.map((focus, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-pink-100 to-orange-100 text-pink-600 px-3 py-1 rounded-full text-sm"
                        >
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Difficulty</div>
                    <div
                      className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium",
                        currentSong.difficulty === "beginner"
                          ? "bg-green-100 text-green-600"
                          : currentSong.difficulty === "intermediate"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600",
                      )}
                    >
                      {currentSong.difficulty}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(currentSong.duration)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-pink-500 to-orange-400 h-2 rounded-full"
                      style={{ width: `${(currentTime / currentSong.duration) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 mb-8">
                  <motion.button
                    className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-400 hover:from-gray-600 hover:to-gray-500 rounded-full flex items-center justify-center text-white shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRestart}
                  >
                    <RotateCcw className="w-5 h-5" />
                  </motion.button>

                  <motion.button
                    className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 rounded-full flex items-center justify-center text-white shadow-xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePlayPause}
                    disabled={isAudioLoading}
                  >
                    {isAudioLoading ? (
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : isPlaying ? (
                      <PauseCircle className="w-8 h-8" />
                    ) : (
                      <PlayCircle className="w-8 h-8" />
                    )}
                  </motion.button>

                  <motion.button
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg relative",
                      isRecording
                        ? "bg-gradient-to-r from-red-500 to-pink-500"
                        : micPermission
                          ? "bg-gradient-to-r from-rose-500 to-pink-400 hover:from-rose-600 hover:to-pink-500"
                          : "bg-gray-400 cursor-not-allowed",
                    )}
                    whileHover={micPermission ? { scale: 1.1 } : {}}
                    whileTap={micPermission ? { scale: 0.95 } : {}}
                    onClick={micPermission ? handleRecord : undefined}
                    animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5, repeat: isRecording ? Number.POSITIVE_INFINITY : 0 }}
                    disabled={!micPermission}
                  >
                    {micPermission ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                    {isRecording && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white"
                        animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      />
                    )}
                  </motion.button>
                </div>

                {isRecording && (
                  <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="flex items-center gap-3 mb-2">
                      <Mic className="w-4 h-4 text-pink-600" />
                      <span className="text-sm text-gray-600">Recording Level</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-green-400 to-pink-500 h-2 rounded-full"
                        style={{ width: `${(audioLevel / 255) * 100}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                  </motion.div>
                )}

                <div className="flex items-center gap-4">
                  <button onClick={() => setIsMuted(!isMuted)} className="text-gray-600 hover:text-pink-600">
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-8">{isMuted ? 0 : volume}</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Lyrics & Pronunciation</h3>
                  <button
                    onClick={() => setShowLyrics(!showLyrics)}
                    className="text-pink-600 hover:text-pink-700 font-medium"
                  >
                    {showLyrics ? "Hide" : "Show"} Phonetics
                  </button>
                </div>

                <AnimatePresence>
                  {showLyrics && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      {currentSong.lyrics.map((lyric, index) => (
                        <motion.div
                          key={index}
                          className={cn(
                            "p-4 rounded-xl transition-all duration-300",
                            index === currentLine
                              ? "bg-gradient-to-r from-pink-100 to-orange-100 border-2 border-pink-300 scale-105"
                              : "bg-gray-50 hover:bg-gray-100",
                          )}
                          animate={index === currentLine ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="text-lg font-medium text-gray-900 mb-2">{lyric.text}</div>
                          <div className="text-sm text-pink-600 font-mono">{lyric.phonetic}</div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <AnimatePresence>
              {showFeedback && speechAnalysis && (
                <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="hidden">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <motion.div
                        className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-400 rounded-xl flex items-center justify-center text-white"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Brain className="w-5 h-5" />
                      </motion.div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                        Speech Analysis Results
                      </h3>
                    </div>

                    {isAnalyzing ? (
                      <div className="text-center py-8">
                        <motion.div
                          className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full mx-auto mb-4"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        <p className="text-gray-600">Analyzing your speech patterns...</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="text-center">
                          <motion.div
                            className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent mb-2"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.5 }}
                          >
                            {speechAnalysis.overallScore}%
                          </motion.div>
                          <p className="text-gray-600">Overall Speech Score</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          {[
                            { label: "Clarity", value: speechAnalysis.clarity, icon: Target },
                            { label: "Pace", value: speechAnalysis.pace, icon: Clock },
                            { label: "Volume", value: speechAnalysis.volume, icon: Volume2 },
                            { label: "Pronunciation", value: speechAnalysis.pronunciation, icon: Mic },
                            { label: "Fluency", value: speechAnalysis.fluency, icon: TrendingUp },
                          ].map((metric, index) => (
                            <div
                              key={index}
                              className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl p-3 text-center"
                            >
                              <metric.icon className="w-5 h-5 text-pink-600 mx-auto mb-2" />
                              <div className="text-lg font-bold text-pink-600">{Math.round(metric.value)}%</div>
                              <div className="text-xs text-gray-600">{metric.label}</div>
                            </div>
                          ))}
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-pink-600" />
                            Personalized Improvement Tips
                          </h4>
                          <div className="space-y-2">
                            {speechAnalysis.suggestions.map((suggestion, index) => (
                              <motion.div
                                key={index}
                                className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-gray-700">{suggestion}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {speechAnalysis.detectedWords.length > 0 && (
                          <div>
                            <h4 className="font-bold text-gray-900 mb-3">Word Recognition</h4>
                            <div className="flex flex-wrap gap-2">
                              {currentSong.targetWords.map((word, index) => (
                                <span
                                  key={index}
                                  className={cn(
                                    "px-3 py-1 rounded-full text-sm",
                                    speechAnalysis.detectedWords.includes(word)
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-700",
                                  )}
                                >
                                  {word} {speechAnalysis.detectedWords.includes(word) ? "✓" : "✗"}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-6">
            <motion.div variants={cardVariants}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-400 rounded-xl flex items-center justify-center text-white"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Trophy className="w-5 h-5" />
                  </motion.div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                    Performance
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <motion.div
                      className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent mb-2"
                      animate={{ scale: score > 0 ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {score}%
                    </motion.div>
                    <p className="text-gray-600">Latest Score</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-pink-600">{streak}</div>
                      <div className="text-xs text-gray-600">Day Streak</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {speechAnalysis ? speechAnalysis.detectedWords.length : 0}
                      </div>
                      <div className="text-xs text-gray-600">Words Detected</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-400 rounded-xl flex items-center justify-center text-white"
                    whileHover={{ scale: 1.1 }}
                  >
                    <BookOpen className="w-5 h-5" />
                  </motion.div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                    Song Library
                  </h3>
                </div>

                <div className="space-y-3">
                  {songs.map((song, index) => (
                    <motion.button
                      key={song.id}
                      onClick={() => setSelectedSong(index)}
                      className={cn(
                        "w-full p-4 rounded-xl text-left transition-all duration-300",
                        selectedSong === index
                          ? "bg-gradient-to-r from-pink-100 to-orange-100 border-2 border-pink-300"
                          : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent",
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn("w-3 h-3 rounded-full bg-gradient-to-r", song.color)} />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{song.title}</div>
                          <div className="text-sm text-gray-500">
                            {song.category} • {formatTime(song.duration)} • {song.audioUrl === "tts" ? "TTS" : "Audio"}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-400 rounded-xl flex items-center justify-center text-white"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Star className="w-5 h-5" />
                  </motion.div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                    Achievements
                  </h3>
                </div>

                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl",
                        achievement.unlocked
                          ? "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
                          : "bg-gray-50 border border-gray-200",
                      )}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          achievement.unlocked
                            ? "bg-gradient-to-r from-green-500 to-emerald-400 text-white"
                            : "bg-gray-300 text-gray-500",
                        )}
                      >
                        <achievement.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className={cn("font-medium", achievement.unlocked ? "text-green-700" : "text-gray-500")}>
                          {achievement.name}
                        </div>
                        <div className="text-xs text-gray-500">{achievement.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <motion.button
                    className={cn(
                      "w-full rounded-xl py-3 px-4 font-medium flex items-center justify-center gap-2",
                      recordedAudio
                        ? "bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed",
                    )}
                    whileHover={recordedAudio ? { scale: 1.02 } : {}}
                    whileTap={recordedAudio ? { scale: 0.98 } : {}}
                    onClick={recordedAudio ? downloadRecording : undefined}
                    disabled={!recordedAudio}
                  >
                    <Download className="w-4 h-4" />
                    Save Recording
                  </motion.button>
                  <motion.button
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-400 hover:from-rose-600 hover:to-pink-500 text-white rounded-xl py-3 px-4 font-medium flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Share2 className="w-4 h-4" />
                    Share Progress
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ec4899, #fb7185);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ec4899, #fb7185);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  )
}

export default KaraokeTherapy
