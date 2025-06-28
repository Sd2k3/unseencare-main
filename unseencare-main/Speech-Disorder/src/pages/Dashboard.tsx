"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Heart,
  Target,
  TrendingUp,
  Clock,
  Mic,
  BarChart3,
  Users,
  Activity,
  Play,
  Award,
  BookOpen,
  Volume2,
  Brain,
  Plus,
  Share,
  Eye,
  Bell,
  Shield,
  Mail,
  Phone,
  Settings,
  UserCheck,
  Upload,
  Video,
} from "lucide-react"

interface QuickStat {
  title: string
  value: string
  icon: React.ReactNode
  trend: string
  color: string
}

interface Caregiver {
  id: string
  name: string
  relationship: string
  email: string
  phone: string
  permissions: string[]
  lastActive: string
  status: "active" | "pending" | "inactive"
}

const PhotoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const photos = [
    {
      url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
      title: "Speech Therapy Session",
      description: "Professional guidance for better communication",
    },
    {
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
      title: "Voice Training",
      description: "Building confidence through practice",
    },
    {
      url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop",
      title: "Communication Skills",
      description: "Developing clear articulation",
    },
    {
      url: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=400&fit=crop",
      title: "Therapeutic Support",
      description: "Expert care for speech disorders",
    },
    {
      url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
      title: "Family Encouragement",
      description: "Together we overcome challenges",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [photos.length])

  return (
    <div className="relative h-96 overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 rounded-3xl border border-pink-200/50 shadow-xl mb-8 animate-fade-in">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200/30 to-rose-200/30"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,114,182,0.2),transparent_50%)]"></div>
      </div>

      {/* Photo Cards Container */}
      <div className="relative h-full flex items-center justify-center perspective-1000">
        <div className="relative w-full max-w-7xl mx-auto px-28">
          <div className="flex items-center justify-center space-x-14">
            {photos.map((photo, index) => {
              const offset = index - currentIndex
              const isActive = offset === 0
              const isNext = offset === 1 || offset === -photos.length + 1
              const isPrev = offset === -1 || offset === photos.length - 1

              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-1000 ease-in-out transform-gpu ${
                    isActive
                      ? "scale-110 z-30 opacity-100 translate-x-0 rotate-0"
                      : isNext
                        ? "scale-75 z-20 opacity-70 translate-x-80 rotate-12"
                        : isPrev
                          ? "scale-75 z-20 opacity-70 -translate-x-80 -rotate-12"
                          : "scale-50 z-10 opacity-30 translate-x-96"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative w-96 h-80 rounded-2xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-sm border border-pink-200/50">
                    <img
                      src={photo.url || "/placeholder.svg"}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2 drop-shadow-lg">{photo.title}</h3>
                      <p className="text-sm opacity-90 drop-shadow-md">{photo.description}</p>
                    </div>

                    {/* 3D Border Effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-pink-300/40 pointer-events-none"></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div
        className="absolute top-10 left-10 w-4 h-4 bg-pink-400/60 rounded-full animate-bounce"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-20 right-20 w-6 h-6 bg-rose-400/60 rounded-full animate-bounce"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-20 left-20 w-3 h-3 bg-pink-500/60 rounded-full animate-bounce"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute bottom-10 right-10 w-5 h-5 bg-rose-500/60 rounded-full animate-bounce"
        style={{ animationDelay: "0.5s" }}
      ></div>

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-pink-600 scale-125 shadow-lg" : "bg-pink-400/70 hover:bg-pink-500/80"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

const VideoDemo: React.FC = () => {
  const [hasVideo, setHasVideo] = useState(false)

  return (
    <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 rounded-3xl p-8 border border-pink-200/50 shadow-xl mb-8 animate-fade-in transform hover:scale-102 transition-all duration-500">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 flex items-center justify-center space-x-3 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
          <Video className="w-8 h-8 text-pink-500" />
          <span>SpeechFlow Demo</span>
        </h2>
        <p className="text-gray-600 text-lg">See how SpeechFlow transforms speech therapy</p>
      </div>

      {!hasVideo ? (
        <div className="group relative h-96 bg-gradient-to-br from-pink-100/50 to-rose-100/50 rounded-2xl border-2 border-dashed border-pink-300/50 flex flex-col items-center justify-center transition-all duration-500 hover:border-pink-400 hover:bg-gradient-to-br hover:from-pink-100 hover:to-rose-100 hover:shadow-xl hover:-translate-y-2">
          <div className="text-center space-y-6 animate-slide-up">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl shadow-pink-200/50">
              <Upload className="w-12 h-12 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                Upload Your Demo Video
              </h3>
              <p className="text-gray-600 mb-6 text-lg group-hover:text-gray-700 transition-colors duration-300">
                Showcase how SpeechFlow helps improve communication skills
              </p>
              <button
                onClick={() => setHasVideo(true)}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-xl hover:shadow-pink-200/50 group-hover:shadow-2xl"
              >
                Choose Video File
              </button>
            </div>
          </div>

          {/* Animated Background Elements */}
          <div
            className="absolute top-6 left-6 w-4 h-4 bg-pink-400/60 rounded-full animate-ping"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute top-12 right-12 w-3 h-3 bg-rose-400/60 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-8 left-12 w-5 h-5 bg-pink-500/60 rounded-full animate-ping"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-6 right-8 w-2 h-2 bg-rose-500/60 rounded-full animate-ping"
            style={{ animationDelay: "1.5s" }}
          ></div>

          {/* Floating Decorative Elements */}
          <div className="absolute top-16 left-16 transform rotate-45 hover:rotate-90 transition-transform duration-1000">
            <div
              className="w-8 h-8 bg-gradient-to-br from-pink-300/40 to-rose-400/40 rounded-lg backdrop-blur-sm border border-pink-300/30 animate-bounce shadow-lg"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>
          <div className="absolute top-20 right-20 transform -rotate-12 hover:rotate-12 transition-transform duration-1000">
            <div
              className="w-6 h-6 bg-gradient-to-br from-rose-300/40 to-pink-400/40 rounded-full backdrop-blur-sm border border-rose-300/30 animate-bounce shadow-lg"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="relative h-96 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 animate-scale-in">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <button className="group w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-500 transform hover:scale-125 hover:rotate-12 shadow-2xl hover:shadow-white/20">
              <Play className="w-10 h-10 text-white ml-1 group-hover:scale-125 transition-all duration-300" />
            </button>
          </div>
          <div className="absolute bottom-6 left-6 z-20 text-white animate-slide-up">
            <h3 className="text-xl font-bold mb-2">SpeechFlow Demo</h3>
            <p className="text-sm opacity-90">Learn effective speech therapy techniques</p>
          </div>

          {/* Placeholder Background with Speech Therapy Theme */}
          <div className="w-full h-full bg-gradient-to-br from-pink-600 via-rose-600 to-pink-700 opacity-90 relative">
            {/* Animated Waveform Effect */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="flex space-x-1">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-white rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 60 + 20}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: Play,
            title: "Interactive Demo",
            description: "Step-by-step speech therapy walkthrough",
            color: "from-pink-400 to-rose-400",
            bgColor: "bg-pink-50",
          },
          {
            icon: Video,
            title: "Feature Overview",
            description: "All speech therapy functionalities",
            color: "from-rose-400 to-pink-400",
            bgColor: "bg-rose-50",
          },
          {
            icon: Upload,
            title: "Easy Setup",
            description: "Quick start guide for therapy",
            color: "from-pink-500 to-rose-500",
            bgColor: "bg-pink-50",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="group text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl hover:bg-white/80 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 hover:shadow-xl border border-pink-200/50 hover:border-pink-300/50 animate-slide-up"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div
              className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-pink-200/30`}
            >
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-gray-900 transition-colors duration-300">
              {feature.title}
            </h4>
            <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const SpeechTherapyDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showAddForm, setShowAddForm] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [caregivers, setCaregivers] = useState<Caregiver[]>([
    {
      id: "1",
      name: "Michael Johnson",
      relationship: "Spouse",
      email: "michael@email.com",
      phone: "+1 (555) 123-4567",
      permissions: ["practice-logs", "progress-alerts", "emergency-contact"],
      lastActive: "2 hours ago",
      status: "active",
    },
    {
      id: "2",
      name: "Dr. Emily Rodriguez",
      relationship: "Speech Therapist",
      email: "dr.rodriguez@clinic.com",
      phone: "+1 (555) 987-6543",
      permissions: ["practice-logs", "voice-recordings", "progress-reports", "therapy-notes"],
      lastActive: "1 day ago",
      status: "active",
    },
  ])

  const [newCaregiver, setNewCaregiver] = useState({
    name: "",
    relationship: "",
    email: "",
    phone: "",
    permissions: [] as string[],
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const quickStats: QuickStat[] = [
    {
      title: "Practice Sessions",
      value: "24",
      icon: <Play className="w-6 h-6" />,
      trend: "+3 this week",
      color: "text-pink-600",
    },
    {
      title: "Voice Recordings",
      value: "12",
      icon: <Mic className="w-6 h-6" />,
      trend: "+2 today",
      color: "text-rose-600",
    },
    {
      title: "Progress Score",
      value: "8.5/10",
      icon: <Target className="w-6 h-6" />,
      trend: "+0.5 this month",
      color: "text-pink-500",
    },
    {
      title: "Daily Streak",
      value: "15",
      icon: <Award className="w-6 h-6" />,
      trend: "Personal best!",
      color: "text-rose-500",
    },
  ]

  const availablePermissions = [
    { id: "practice-logs", label: "Practice Sessions", description: "View speech practice tracking data" },
    { id: "voice-recordings", label: "Voice Recordings", description: "Access voice recording sessions" },
    { id: "progress-reports", label: "Progress Reports", description: "View and download therapy reports" },
    { id: "therapy-notes", label: "Therapy Notes", description: "Access therapist notes and recommendations" },
    { id: "progress-alerts", label: "Progress Alerts", description: "Receive milestone notifications" },
    { id: "emergency-contact", label: "Emergency Contact", description: "Receive urgent communication alerts" },
  ]

  const handleAddCaregiver = (e: React.FormEvent) => {
    e.preventDefault()
    const caregiver: Caregiver = {
      id: Date.now().toString(),
      ...newCaregiver,
      lastActive: "Never",
      status: "pending",
    }
    setCaregivers([...caregivers, caregiver])
    setNewCaregiver({ name: "", relationship: "", email: "", phone: "", permissions: [] })
    setShowAddForm(false)
  }

  const togglePermission = (permission: string) => {
    setNewCaregiver((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-amber-100 text-amber-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-peach-50 to-rose-50">
      {/* Hero Section with Enhanced Design */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-40 right-20 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <div className="mb-8 transform hover:scale-105 transition-all duration-700">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in transform hover:rotate-1 transition-all duration-500">
              <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 bg-clip-text text-transparent filter drop-shadow-2xl">
                SpeechFlow
              </span>
            </h1>

            {/* Floating 3D Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute top-0 left-1/4 w-4 h-4 bg-pink-400/50 rounded-full animate-bounce"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute top-10 right-1/4 w-3 h-3 bg-rose-400/50 rounded-full animate-bounce"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-5 left-1/3 w-2 h-2 bg-pink-500/50 rounded-full animate-bounce"
                style={{ animationDelay: "1.5s" }}
              ></div>
            </div>
          </div>

          <div className="relative transform hover:scale-105 transition-all duration-500">
            <p
              className="text-xl md:text-2xl mb-8 text-gray-700 opacity-90 animate-fade-in font-light leading-relaxed max-w-4xl mx-auto"
              style={{ animationDelay: "0.3s" }}
            >
              "Every word matters, every sound counts - together we unlock the power of clear communication"
            </p>

            {/* Speech Quote */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto mb-8 border border-pink-200/50 shadow-lg">
              <p className="text-lg text-gray-600 italic mb-2">
                "Your voice is unique and powerful. Every practice session brings you closer to confident
                communication."
              </p>
              <p className="text-sm text-pink-600 font-semibold">- SpeechFlow Therapy Team</p>
            </div>

            {/* 3D Decorative Line */}
            <div className="relative mx-auto w-64 h-2 perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-full transform rotate-x-12 animate-pulse shadow-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 rounded-full blur-sm animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Floating 3D Elements */}
        <div className="absolute top-32 left-16 transform rotate-45 hover:rotate-90 transition-transform duration-1000">
          <div
            className="w-16 h-16 bg-gradient-to-br from-pink-300/40 to-rose-400/40 rounded-lg backdrop-blur-sm border border-pink-300/30 animate-bounce shadow-2xl"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
        <div className="absolute top-48 right-24 transform -rotate-12 hover:rotate-12 transition-transform duration-1000">
          <div
            className="w-20 h-20 bg-gradient-to-br from-rose-300/40 to-pink-400/40 rounded-full backdrop-blur-sm border border-rose-300/30 animate-bounce shadow-2xl"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
        <div className="absolute bottom-32 left-1/4 transform rotate-12 hover:-rotate-12 transition-transform duration-1000">
          <div
            className="w-12 h-12 bg-gradient-to-br from-pink-400/40 to-rose-300/40 rounded-lg backdrop-blur-sm border border-pink-400/30 animate-bounce shadow-2xl"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-pink-200/50 shadow-lg">
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "caregivers", label: "Care Team", icon: Users },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:text-pink-600 hover:bg-pink-50"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in">
            {/* Photo Carousel Section */}
            <PhotoCarousel />

            {/* Video Demo Section */}
            <VideoDemo />

            {/* Speech Therapy Tips Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-pink-200/50 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Daily Speech Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Practice Daily</h3>
                  <p className="text-sm text-gray-600">15-20 minutes of focused speech practice daily</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Volume2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Voice Warm-ups</h3>
                  <p className="text-sm text-gray-600">Start each session with vocal exercises</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Stay Relaxed</h3>
                  <p className="text-sm text-gray-600">Maintain calm breathing and posture</p>
                </div>
              </div>
            </div>

            {/* Welcome Header with 3D Effect */}
            <div className="flex justify-between items-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-xl transform hover:scale-102 transition-all duration-300">
              <div className="transform hover:translate-x-2 transition-all duration-300">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Sarah!</h2>
                <p className="text-gray-600">You're making amazing progress! Here's your speech therapy overview.</p>
              </div>
              <div className="text-right transform hover:scale-110 transition-all duration-300">
                <div className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  {currentTime.toLocaleTimeString()}
                </div>
                <div className="text-sm text-gray-500">{currentTime.toLocaleDateString()}</div>
              </div>
            </div>

            {/* Enhanced 3D Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 hover:border-pink-300/50 transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 perspective-1000 shadow-xl hover:shadow-pink-200/50 animate-slide-up"
                  style={{
                    animationDelay: `${index * 200}ms`,
                    transform: "rotateX(5deg) rotateY(5deg)",
                  }}
                >
                  {/* 3D Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 to-rose-100/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-4 rounded-xl bg-gradient-to-br ${
                          stat.color.includes("pink-6")
                            ? "from-pink-100 to-pink-200 border border-pink-300/50"
                            : stat.color.includes("rose-6")
                              ? "from-rose-100 to-rose-200 border border-rose-300/50"
                              : stat.color.includes("pink-5")
                                ? "from-pink-100 to-pink-200 border border-pink-300/50"
                                : "from-rose-100 to-rose-200 border border-rose-300/50"
                        } transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg`}
                      >
                        <span className={stat.color}>{stat.icon}</span>
                      </div>
                      <TrendingUp className="w-4 h-4 text-emerald-500 animate-pulse group-hover:scale-125 transition-all duration-300" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 group-hover:text-4xl transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-rose-600 group-hover:bg-clip-text group-hover:text-transparent">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                      {stat.title}
                    </p>
                    <p
                      className={`text-xs ${stat.color} font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
                    >
                      {stat.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Today's Overview */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-pink-200/50 shadow-xl transform hover:scale-102 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-8 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Today's Speech Progress
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group text-center p-8 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl transform hover:scale-110 hover:rotate-2 transition-all duration-500 hover:shadow-xl hover:shadow-pink-200/50 border border-pink-200/50">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 group-hover:scale-125 transition-all duration-500 shadow-xl shadow-pink-200/50">
                    <Play className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-xl mb-2">Practice Sessions</h3>
                  <p className="text-sm text-gray-600 mb-4">3 of 3 completed today</p>
                  <div className="w-full bg-pink-200/50 rounded-full h-4 shadow-inner border border-pink-300/50">
                    <div className="bg-gradient-to-r from-pink-400 to-pink-500 h-4 rounded-full w-full animate-pulse shadow-lg"></div>
                  </div>
                </div>

                <div className="group text-center p-8 bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl transform hover:scale-110 hover:rotate-2 transition-all duration-500 hover:shadow-xl hover:shadow-rose-200/50 border border-rose-200/50">
                  <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 group-hover:scale-125 transition-all duration-500 shadow-xl shadow-rose-200/50">
                    <Mic className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-xl mb-2">Voice Quality</h3>
                  <p className="text-sm text-gray-600 mb-4">Excellent clarity today</p>
                  <div className="w-full bg-rose-200/50 rounded-full h-4 shadow-inner border border-rose-300/50">
                    <div className="bg-gradient-to-r from-rose-400 to-rose-500 h-4 rounded-full w-5/6 animate-pulse shadow-lg"></div>
                  </div>
                </div>

                <div className="group text-center p-8 bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl transform hover:scale-110 hover:rotate-2 transition-all duration-500 hover:shadow-xl hover:shadow-pink-200/50 border border-pink-200/50">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 group-hover:scale-125 transition-all duration-500 shadow-xl shadow-pink-200/50">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-xl mb-2">Goal Progress</h3>
                  <p className="text-sm text-gray-600 mb-4">On track (85%)</p>
                  <div className="w-full bg-pink-200/50 rounded-full h-4 shadow-inner border border-pink-300/50">
                    <div className="bg-gradient-to-r from-pink-400 to-rose-500 h-4 rounded-full w-5/6 animate-pulse shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Recent Activity */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-pink-200/50 shadow-xl">
              <h3 className="text-2xl font-semibold text-gray-800 mb-8 flex items-center space-x-3">
                <Clock className="w-6 h-6 text-pink-500" />
                <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Recent Speech Activity
                </span>
              </h3>

              <div className="space-y-6">
                {[
                  { action: "Articulation practice completed", time: "2 hours ago", type: "practice" },
                  { action: "Voice recording session", time: "5 hours ago", type: "recording" },
                  { action: "Weekly progress report generated", time: "1 day ago", type: "report" },
                  { action: "Therapist feedback received", time: "2 days ago", type: "feedback" },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="group flex items-center space-x-6 p-6 bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-white/80 transition-all duration-500 transform hover:scale-105 hover:translate-x-2 hover:shadow-xl border border-pink-200/30 hover:border-pink-300/50 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl ${
                        activity.type === "practice"
                          ? "bg-gradient-to-br from-pink-400 to-pink-600 shadow-pink-200/50"
                          : activity.type === "recording"
                            ? "bg-gradient-to-br from-rose-400 to-rose-600 shadow-rose-200/50"
                            : activity.type === "report"
                              ? "bg-gradient-to-br from-pink-400 to-rose-600 shadow-pink-200/50"
                              : "bg-gradient-to-br from-rose-400 to-pink-600 shadow-rose-200/50"
                      } text-white`}
                    >
                      {activity.type === "practice" ? (
                        <Play className="w-8 h-8" />
                      ) : activity.type === "recording" ? (
                        <Mic className="w-8 h-8" />
                      ) : activity.type === "report" ? (
                        <BarChart3 className="w-8 h-8" />
                      ) : (
                        <BookOpen className="w-8 h-8" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-semibold text-lg group-hover:text-gray-900 transition-colors duration-300">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {activity.time}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "caregivers" && (
          <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2 flex items-center space-x-3">
                  <Users className="w-10 h-10 text-pink-500" />
                  <span>Care Team Dashboard</span>
                </h1>
                <p className="text-gray-600 text-lg">Manage your speech therapy support network</p>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center space-x-3 group"
              >
                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-semibold">Add Care Team Member</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  icon: Users,
                  value: caregivers.length,
                  label: "Care Team Members",
                  sublabel: `${caregivers.filter((c) => c.status === "active").length} active`,
                  color: "from-pink-400 to-rose-400",
                  bgColor: "bg-pink-50",
                },
                {
                  icon: Share,
                  value: 8,
                  label: "Data Shared Today",
                  sublabel: "Auto-sync enabled",
                  color: "from-rose-400 to-pink-400",
                  bgColor: "bg-rose-50",
                },
                {
                  icon: Bell,
                  value: 2,
                  label: "Pending Invites",
                  sublabel: "Awaiting response",
                  color: "from-amber-400 to-orange-400",
                  bgColor: "bg-amber-50",
                },
                {
                  icon: Shield,
                  value: "High",
                  label: "Privacy Level",
                  sublabel: "Encrypted sharing",
                  color: "from-purple-400 to-pink-400",
                  bgColor: "bg-purple-50",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <stat.icon className={`w-7 h-7 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                  <p className="text-sm text-pink-600 font-medium">{stat.sublabel}</p>
                </div>
              ))}
            </div>

            {/* Care Team Members List */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center space-x-3">
                <Heart className="w-7 h-7 text-pink-500" />
                <span>Your Care Team</span>
              </h2>
              <div className="space-y-6">
                {caregivers.map((caregiver, index) => (
                  <div
                    key={caregiver.id}
                    className="bg-gradient-to-r from-white to-pink-50/50 rounded-2xl p-6 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-pink-100/50 animate-slide-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {caregiver.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">{caregiver.name}</h3>
                          <p className="text-pink-600 font-medium">{caregiver.relationship}</p>
                          <div className="flex items-center space-x-6 mt-2">
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{caregiver.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{caregiver.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(caregiver.status)}`}
                        >
                          {caregiver.status}
                        </span>
                        <button className="p-3 text-gray-600 hover:bg-pink-100 rounded-xl transition-colors">
                          <Settings className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Access Permissions:</p>
                      <div className="flex flex-wrap gap-2">
                        {caregiver.permissions.map((permission) => {
                          const permissionData = availablePermissions.find((p) => p.id === permission)
                          return (
                            <span
                              key={permission}
                              className="px-3 py-1 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 rounded-full text-sm font-medium border border-pink-200"
                            >
                              {permissionData?.label || permission}
                            </span>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Last active: {caregiver.lastActive}</span>
                      </span>
                      <div className="flex space-x-4">
                        <button className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-medium transition-colors">
                          <Eye className="w-4 h-4" />
                          <span>View Activity</span>
                        </button>
                        <button className="flex items-center space-x-2 text-rose-600 hover:text-rose-700 font-medium transition-colors">
                          <Share className="w-4 h-4" />
                          <span>Share Update</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add Caregiver Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Add Care Team Member
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-3 hover:bg-gray-100 rounded-xl transition-colors text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleAddCaregiver} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name</label>
                    <input
                      type="text"
                      value={newCaregiver.name}
                      onChange={(e) => setNewCaregiver((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full p-4 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Relationship</label>
                    <input
                      type="text"
                      value={newCaregiver.relationship}
                      onChange={(e) => setNewCaregiver((prev) => ({ ...prev, relationship: e.target.value }))}
                      placeholder="e.g., Spouse, Therapist, Parent, Friend"
                      className="w-full p-4 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
                    <input
                      type="email"
                      value={newCaregiver.email}
                      onChange={(e) => setNewCaregiver((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full p-4 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Phone Number</label>
                    <input
                      type="tel"
                      value={newCaregiver.phone}
                      onChange={(e) => setNewCaregiver((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-4 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-6">Access Permissions</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availablePermissions.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-start space-x-4 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-100"
                      >
                        <input
                          type="checkbox"
                          id={permission.id}
                          checked={newCaregiver.permissions.includes(permission.id)}
                          onChange={() => togglePermission(permission.id)}
                          className="mt-1 w-5 h-5 text-pink-600 border-pink-300 rounded focus:ring-pink-500"
                        />
                        <div>
                          <label htmlFor={permission.id} className="text-sm font-semibold text-gray-700 cursor-pointer">
                            {permission.label}
                          </label>
                          <p className="text-xs text-gray-600 mt-1">{permission.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 font-semibold"
                  >
                    <UserCheck className="w-6 h-6" />
                    <span>Send Invitation</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  )
}

export default SpeechTherapyDashboard
