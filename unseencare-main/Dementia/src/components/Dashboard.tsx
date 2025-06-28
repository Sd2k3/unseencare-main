"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { Brain, Camera, MessageSquare, Album, Heart, Clock, Users, Sparkles, Play, Target, TrendingUp, BarChart3, Activity, Award, Plus, Share, Eye, Bell, Shield, Mail, Phone, Settings, Upload, Video } from 'lucide-react'
import { SignInButton } from "@clerk/clerk-react"
import Sidebar from './Sidebar'

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

interface Shape {
  id: number;
  type: string;
  size: number;
  x: number;
  y: number;
  rotation: number;
  duration: number;
  delay: number;
  opacity: number;
}

const PhotoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const photos = [
    {
      url: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=3271&auto=format&fit=crop",
      title: "Compassionate Care",
      description: "Professional dementia care with advanced technology",
    },
    {
      url: "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?q=80&w=2671&auto=format&fit=crop",
      title: "Memory Support",
      description: "Preserving precious memories with digital archives",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1661769167673-cfdb37f156d8?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Family Connection",
      description: "Keeping families connected through technology",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1682094069738-19a65f3145b9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Cognitive Training",
      description: "AI-powered cognitive exercises and support",
    },
    {
      url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2670&auto=format&fit=crop",
      title: "Daily Care",
      description: "Comprehensive daily care management",
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
          <span>CareCompanion Demo</span>
        </h2>
        <p className="text-gray-600 text-lg">See how CareCompanion transforms dementia care</p>
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
                Showcase how CareCompanion helps improve dementia care
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
            <h3 className="text-xl font-bold mb-2">CareCompanion Demo</h3>
            <p className="text-sm opacity-90">Learn effective dementia care techniques</p>
          </div>

          {/* Placeholder Background with Dementia Care Theme */}
          <div className="w-full h-full bg-gradient-to-br from-pink-600 via-rose-600 to-pink-700 opacity-90 relative">
            {/* Animated Brain Wave Effect */}
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
            description: "Step-by-step dementia care walkthrough",
            color: "from-pink-400 to-rose-400",
            bgColor: "bg-pink-50",
          },
          {
            icon: Video,
            title: "Feature Overview",
            description: "All dementia care functionalities",
            color: "from-rose-400 to-pink-400",
            bgColor: "bg-rose-50",
          },
          {
            icon: Upload,
            title: "Easy Setup",
            description: "Quick start guide for caregivers",
            color: "from-pink-500 to-rose-500",
            bgColor: "bg-pink-50",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="group text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl hover:bg-white/80 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 hover:shadow-xl border border-pink-200/50 animate-slide-up"
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

export default function Dashboard() {
  useScroll(); // If you need scrollYProgress, add it back where needed
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
      relationship: "Primary Care Doctor",
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

  const features = [
    {
      icon: Brain,
      title: "Cognitive Support",
      description: "Advanced AI algorithms provide personalized cognitive exercises and memory enhancement activities.",
      gradient: "from-[#E83E8C] to-[#6F42C1]",
    },
    {
      icon: Camera,
      title: "Smart Recognition",
      description: "Cutting-edge facial recognition helps identify loved ones and maintain social connections.",
      gradient: "from-[#6F42C1] to-[#9370DB]",
    },
    {
      icon: Album,
      title: "Memory Archive",
      description: "Create and preserve precious memories with our digital life story book feature.",
      gradient: "from-[#E83E8C] to-[#FF6B6B]",
    },
    {
      icon: MessageSquare,
      title: "Communication Hub",
      description: "Stay connected with family through voice messages and easy-to-use video calls.",
      gradient: "from-[#FF6B6B] to-[#FF8E53]",
    },
    {
      icon: Clock,
      title: "Care Schedule",
      description: "Smart scheduling system for medications, appointments, and daily activities.",
      gradient: "from-[#4BC0C0] to-[#6F42C1]",
    },
    {
      icon: Users,
      title: "Family Network",
      description: "Connect caregivers and family members in a supportive digital community.",
      gradient: "from-[#6F42C1] to-[#E83E8C]",
    },
  ]

  const quickStats: QuickStat[] = [
    {
      title: "Daily Activities",
      value: "8/10",
      icon: <Activity className="w-6 h-6" />,
      trend: "+2 completed today",
      color: "text-pink-600",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Cognitive Score",
      value: "85%",
      trend: "+5% this week",
      color: "text-rose-600",
    },
    {
      title: "Memory Games",
      value: "12",
      icon: <Target className="w-6 h-6" />,
      trend: "+3 this week",
      color: "text-pink-500",
    },
    {
      title: "Care Streak",
      value: "28",
      icon: <Award className="w-6 h-6" />,
      trend: "Days in a row!",
      color: "text-rose-500",
    },
  ]

  const availablePermissions = [
    { id: "practice-logs", label: "Activity Logs", description: "View daily activity tracking data" },
    { id: "voice-recordings", label: "Voice Messages", description: "Access voice message recordings" },
    { id: "progress-reports", label: "Progress Reports", description: "View and download care reports" },
    { id: "therapy-notes", label: "Care Notes", description: "Access caregiver notes and recommendations" },
    { id: "progress-alerts", label: "Progress Alerts", description: "Receive milestone notifications" },
    { id: "emergency-contact", label: "Emergency Contact", description: "Receive urgent communication alerts" },
  ]

  // Generate particles for the background animation
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    size: Math.random() * 8 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }))

  // Generate geometric shapes
  const shapes = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    type: ["circle", "triangle", "square", "hexagon"][Math.floor(Math.random() * 4)],
    size: Math.random() * 60 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 360,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.07 + 0.03,
  }))

  // Canvas ref for wave animation
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Wave animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const width = (canvas.width = window.innerWidth)
    const height = (canvas.height = window.innerHeight)

    let time = 0

    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, "rgba(232, 62, 140, 0.05)")
    gradient.addColorStop(0.5, "rgba(111, 66, 193, 0.05)")
    gradient.addColorStop(1, "rgba(232, 62, 140, 0.05)")

    const drawWave = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw multiple waves with different parameters
      for (let i = 0; i < 3; i++) {
        const amplitude = 20 + i * 5
        const period = 200 + i * 50
        const speed = 0.02 - i * 0.005
        const verticalOffset = height * 0.3 + i * height * 0.15

        ctx.beginPath()
        ctx.moveTo(0, verticalOffset)

        for (let x = 0; x < width; x++) {
          const y = Math.sin((x / period) * 2 + time * speed) * amplitude + verticalOffset
          ctx.lineTo(x, y)
        }

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.stroke()
      }

      time += 1
      requestAnimationFrame(drawWave)
    }

    drawWave()

    return () => {
      // Cleanup if needed
    }
  }, [])

  // Function to render shape based on type
  const renderShape = (shape: Shape) => {
    switch (shape.type) {
      case "circle":
        return (
          <motion.div
            key={`shape-${shape.id}`}
            className="absolute rounded-full border border-[#E83E8C]/20"
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              opacity: shape.opacity,
              zIndex: -4,
            }}
            animate={{
              rotate: [shape.rotation, shape.rotation + 360],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              rotate: {
                duration: shape.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              scale: {
                duration: shape.duration / 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          />
        )
      case "square":
        return (
          <motion.div
            key={`shape-${shape.id}`}
            className="absolute border border-[#6F42C1]/20"
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              opacity: shape.opacity,
              zIndex: -4,
            }}
            animate={{
              rotate: [shape.rotation, shape.rotation + 360],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              rotate: {
                duration: shape.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              scale: {
                duration: shape.duration / 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          />
        )
      case "triangle":
        return (
          <motion.div
            key={`shape-${shape.id}`}
            className="absolute"
            style={{
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid rgba(232, 62, 140, 0.05)`,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              opacity: shape.opacity,
              zIndex: -4,
            }}
            animate={{
              rotate: [shape.rotation, shape.rotation + 360],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              rotate: {
                duration: shape.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              scale: {
                duration: shape.duration / 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          />
        )
      case "hexagon":
        return (
          <motion.div
            key={`shape-${shape.id}`}
            className="absolute"
            style={{
              width: shape.size,
              height: shape.size * 0.866,
              clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              backgroundColor: "rgba(111, 66, 193, 0.03)",
              border: "1px solid rgba(111, 66, 193, 0.1)",
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              opacity: shape.opacity,
              zIndex: -4,
            }}
            animate={{
              rotate: [shape.rotation, shape.rotation + 360],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              rotate: {
                duration: shape.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              scale: {
                duration: shape.duration / 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          />
        )
      default:
        return null
    }
  }

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
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-72">
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 overflow-hidden">
          {/* Enhanced background animation */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F7] to-[#F8F0FF] opacity-80"></div>

            {/* Canvas for wave animation */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: -5 }} />

            {/* Light rays effect */}
            <div className="absolute inset-0" style={{ zIndex: -6 }}>
              <div
                className="absolute top-0 left-1/4 w-1/2 h-screen bg-gradient-to-b from-[#E83E8C]/5 to-transparent"
                style={{
                  transform: "perspective(1000px) rotateX(75deg)",
                  transformOrigin: "top",
                  filter: "blur(40px)",
                }}
              />
              <div
                className="absolute top-0 left-1/3 w-1/3 h-screen bg-gradient-to-b from-[#6F42C1]/5 to-transparent"
                style={{
                  transform: "perspective(1000px) rotateX(75deg)",
                  transformOrigin: "top",
                  filter: "blur(40px)",
                }}
              />
            </div>

            {/* Geometric shapes */}
            {shapes.map(renderShape)}

            {/* Animated gradient blobs with smoother transitions */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`blob-${i}`}
                className="absolute rounded-full bg-gradient-to-br from-[#E83E8C]/10 to-[#6F42C1]/10 blur-3xl"
                style={{
                  width: `${Math.random() * 50 + 20}%`,
                  height: `${Math.random() * 50 + 20}%`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  zIndex: -5,
                }}
                animate={{
                  x: [0, 30, -30, 0],
                  y: [0, -20, 20, 0],
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                  duration: Math.random() * 20 + 25,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  times: [0, 0.33, 0.66, 1],
                }}
              />
            ))}

            {/* Floating particles with smoother motion */}
            {particles.map((particle) => (
              <motion.div
                key={`particle-${particle.id}`}
                className="absolute rounded-full bg-white"
                style={{
                  width: particle.size,
                  height: particle.size,
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  zIndex: -3,
                  boxShadow:
                    particle.size > 5
                      ? `0 0 ${particle.size * 2}px ${particle.size / 2}px rgba(232, 62, 140, 0.2)`
                      : "none",
                }}
                animate={{
                  y: [0, -100],
                  x: [0, Math.random() * 40 - 20],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: particle.delay,
                  ease: "easeInOut",
                  times: [0, 0.7, 1],
                }}
              />
            ))}

            {/* Gradient mesh */}
            <div
              className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjMyLCA2MiwgMTQwLCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIj48L3JlY3Q+PC9zdmc+')]"
              style={{ opacity: 0.4, zIndex: -4 }}
            />

            {/* Radial gradient overlay */}
            <div
              className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-white/30"
              style={{
                background: "radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.3) 100%)",
                zIndex: -2,
              }}
            />
          </div>

          {/* Sign In Button */}
          <div className="absolute top-6 right-6 z-50">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <SignInButton>
                <button className="bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300">
                  Sign In
                </button>
              </SignInButton>
            </motion.div>
          </div>

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
                    CareCompanion
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
                  "Empowering dementia care with intelligent technology and compassionate support"
                </p>

                {/* Care Quote */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto mb-8 border border-pink-200/50 shadow-lg">
                  <p className="text-lg text-gray-600 italic mb-2">
                    "Every moment matters, every memory counts - together we create a caring environment where love and
                    technology unite."
                  </p>
                  <p className="text-sm text-pink-600 font-semibold">- CareCompanion Team</p>
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

                {/* Dementia Care Tips Section */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-pink-200/50 shadow-xl">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Daily Care Tips</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl transform hover:scale-105 transition-all duration-300">
                      <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">Cognitive Exercises</h3>
                      <p className="text-sm text-gray-600">15-20 minutes of brain training activities daily</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl transform hover:scale-105 transition-all duration-300">
                      <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">Emotional Support</h3>
                      <p className="text-sm text-gray-600">Maintain loving connections and positive interactions</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl transform hover:scale-105 transition-all duration-300">
                      <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">Routine Care</h3>
                      <p className="text-sm text-gray-600">Consistent daily schedules and medication reminders</p>
                    </div>
                  </div>
                </div>

                {/* Welcome Header with 3D Effect */}
                <div className="flex justify-between items-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-xl transform hover:scale-102 transition-all duration-300">
                  <div className="transform hover:translate-x-2 transition-all duration-300">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Sarah!</h2>
                    <p className="text-gray-600">You're providing amazing care! Here's your daily overview.</p>
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
                    Today's Care Progress
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="group text-center p-8 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl transform hover:scale-110 hover:rotate-2 transition-all duration-500 hover:shadow-xl hover:shadow-pink-200/50 border border-pink-200/50">
                      <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 group-hover:scale-125 transition-all duration-500 shadow-xl shadow-pink-200/50">
                        <Activity className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-800 text-xl mb-2">Daily Activities</h3>
                      <p className="text-sm text-gray-600 mb-4">8 of 10 completed today</p>
                      <div className="w-full bg-pink-200/50 rounded-full h-4 shadow-inner border border-pink-300/50">
                        <div className="bg-gradient-to-r from-pink-400 to-pink-500 h-4 rounded-full w-4/5 animate-pulse shadow-lg"></div>
                      </div>
                    </div>

                    <div className="group text-center p-8 bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl transform hover:scale-110 hover:rotate-2 transition-all duration-500 hover:shadow-xl hover:shadow-rose-200/50 border border-rose-200/50">
                      <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 group-hover:scale-125 transition-all duration-500 shadow-xl shadow-rose-200/50">
                        <Brain className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-800 text-xl mb-2">Cognitive Health</h3>
                      <p className="text-sm text-gray-600 mb-4">Excellent engagement today</p>
                      <div className="w-full bg-rose-200/50 rounded-full h-4 shadow-inner border border-rose-300/50">
                        <div className="bg-gradient-to-r from-rose-400 to-rose-500 h-4 rounded-full w-5/6 animate-pulse shadow-lg"></div>
                      </div>
                    </div>

                    <div className="group text-center p-8 bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl transform hover:scale-110 hover:rotate-2 transition-all duration-500 hover:shadow-xl hover:shadow-pink-200/50 border border-pink-200/50">
                      <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 group-hover:scale-125 transition-all duration-500 shadow-xl shadow-pink-200/50">
                        <Target className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-800 text-xl mb-2">Care Goals</h3>
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
                      Recent Care Activity
                    </span>
                  </h3>

                  <div className="space-y-6">
                    {[
                      { action: "Memory exercise completed", time: "2 hours ago", type: "practice" },
                      { action: "Medication reminder sent", time: "5 hours ago", type: "medication" },
                      { action: "Weekly care report generated", time: "1 day ago", type: "report" },
                      { action: "Family video call scheduled", time: "2 days ago", type: "communication" },
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
                              : activity.type === "medication"
                                ? "bg-gradient-to-br from-rose-400 to-rose-600 shadow-rose-200/50"
                                : activity.type === "report"
                                  ? "bg-gradient-to-br from-pink-400 to-rose-600 shadow-pink-200/50"
                                  : "bg-gradient-to-br from-rose-400 to-pink-600 shadow-rose-200/50"
                          } text-white`}
                        >
                          {activity.type === "practice" ? (
                            <Brain className="w-8 h-8" />
                          ) : activity.type === "medication" ? (
                            <Clock className="w-8 h-8" />
                          ) : activity.type === "report" ? (
                            <BarChart3 className="w-8 h-8" />
                          ) : (
                            <MessageSquare className="w-8 h-8" />
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

                {/* Features Grid */}
                <section className="py-20 px-4 md:px-12">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, margin: "-100px" }}
                    className="max-w-7xl mx-auto"
                  >
                    <motion.div
                      className="flex items-center justify-center gap-3 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="p-2 bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] rounded-xl shadow-md">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                      <motion.h2
                        className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#E83E8C] to-[#6F42C1]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        Transforming Care Through Innovation
                      </motion.h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                      {features.map((feature, index) => (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileHover={{
                            scale: 1.02,
                            translateY: -5,
                            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                          }}
                          className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-md border border-gray-100 overflow-hidden relative group hover:border-[#E83E8C]/20 transition-all duration-300"
                        >
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                          />
                          <div className="relative z-10">
                            <div
                              className={`p-4 rounded-2xl inline-block bg-gradient-to-br ${feature.gradient} mb-6 shadow-md`}
                            >
                              <feature.icon className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </section>

                {/* Call to Action */}
                <section className="py-20 px-4 md:px-12 mb-20">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, margin: "-100px" }}
                    className="max-w-4xl mx-auto text-center bg-white/80 backdrop-blur-sm rounded-3xl p-16 shadow-xl border border-gray-100 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#E83E8C]/5 to-[#6F42C1]/5" />

                    {/* Animated background elements */}
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-br from-[#E83E8C]/10 to-[#6F42C1]/10 blur-3xl"
                        style={{
                          width: `${Math.random() * 40 + 30}%`,
                          height: `${Math.random() * 40 + 30}%`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          x: [0, 20, -20, 0],
                          y: [0, -15, 15, 0],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                          duration: Math.random() * 10 + 15,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          times: [0, 0.33, 0.66, 1],
                        }}
                      />
                    ))}

                    <div className="relative z-10">
                      <motion.div
                        className="inline-block mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="p-3 bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] rounded-2xl inline-flex shadow-lg">
                          <Sparkles className="h-8 w-8 text-white" />
                        </div>
                      </motion.div>
                      <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#E83E8C] to-[#6F42C1]">
                        Start Your Care Journey Today
                      </h2>
                      <p className="text-xl mb-10 text-gray-600">
                        Join thousands of families who trust CareCompanion to provide compassionate, intelligent care for their
                        loved ones
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="px-10 py-5 bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] text-white rounded-xl text-xl font-semibold shadow-lg transition-all duration-300"
                      >
                        Begin Free Trial
                      </motion.button>
                    </div>
                  </motion.div>
                </section>
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
                    <p className="text-gray-600 text-lg">Manage your dementia care support network</p>
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
                        {/* Add your form fields here */}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

