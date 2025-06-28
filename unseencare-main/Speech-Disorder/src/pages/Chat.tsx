"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageCircle,
  Send,
  Smile,
  Users,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  PhoneOff,
  Shield,
  Paperclip,
  MoreHorizontal,
  UserPlus,
  Search,
  Settings,
  Bell,
  Star,
  Heart,
  Zap,
  CheckCircle,
  ImageIcon,
} from "lucide-react"
import { cn } from "../utils/cn"

interface Message {
  id: number
  user: string
  avatar: string
  message: string
  time: string
  isOwn: boolean
  reactions?: string[]
  badge: string
  type?: "text" | "voice" | "image" | "file"
  duration?: string
  isRead?: boolean
}

interface SupportGroup {
  id: number
  name: string
  description: string
  members: number
  online: number
  category: string
  color: string
  lastMessage: string
  lastTime: string
  unread: number
  isActive: boolean
  isPinned?: boolean
  isMuted?: boolean
}

interface OnlineMember {
  name: string
  avatar: string
  status: string
  badge: string
  color: string
  isTyping?: boolean
  lastSeen?: string
}

const SpeechChat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(0)
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [onlineUsers] = useState(24)
  const [isVoiceCall, setIsVoiceCall] = useState(false)
  const [isVideoCall, setIsVideoCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSettings, setShowSettings] = useState(false)
  const [activeTab, setActiveTab] = useState("all") // all, groups, direct
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const supportGroups: SupportGroup[] = [
    {
      id: 1,
      name: "Stuttering Support Circle",
      description: "A safe space for people who stutter to share experiences and support each other",
      members: 156,
      online: 23,
      category: "Stuttering",
      color: "from-pink-500 to-rose-400",
      lastMessage: "Thanks everyone for the encouragement today! Your support means everything 💪",
      lastTime: "2 min ago",
      unread: 3,
      isActive: true,
      isPinned: true,
    },
    {
      id: 2,
      name: "Articulation Heroes",
      description: "Mastering clear speech together through practice and mutual support",
      members: 89,
      online: 12,
      category: "Articulation",
      color: "from-rose-500 to-pink-400",
      lastMessage: "The 'R' sound exercise from yesterday really helped! Who wants to practice together?",
      lastTime: "8 min ago",
      unread: 1,
      isActive: false,
    },
    {
      id: 3,
      name: "Confidence Builders",
      description: "Building speaking confidence through encouragement and shared victories",
      members: 203,
      online: 31,
      category: "Confidence",
      color: "from-pink-400 to-peach-400",
      lastMessage: "Celebrated my first public speaking success today! 🎉 Thank you all for believing in me",
      lastTime: "15 min ago",
      unread: 0,
      isActive: false,
      isPinned: true,
    },
    {
      id: 4,
      name: "Voice Therapy Friends",
      description: "Supporting voice recovery and strengthening journey together",
      members: 67,
      online: 8,
      category: "Voice Therapy",
      color: "from-peach-500 to-orange-400",
      lastMessage: "My voice is getting stronger each day! The exercises are really working 🌟",
      lastTime: "1 hour ago",
      unread: 0,
      isActive: false,
    },
    {
      id: 5,
      name: "Teen Speech Support",
      description: "A dedicated space for teenagers navigating speech challenges",
      members: 124,
      online: 18,
      category: "Teen Support",
      color: "from-purple-500 to-pink-400",
      lastMessage: "School presentation went better than expected! Thanks for the tips everyone 📚",
      lastTime: "2 hours ago",
      unread: 0,
      isActive: false,
    },
    {
      id: 6,
      name: "Parent Support Network",
      description: "Parents supporting each other through their children's speech journey",
      members: 178,
      online: 15,
      category: "Parent Support",
      color: "from-blue-500 to-purple-400",
      lastMessage: "Looking for recommendations for speech apps for my 7-year-old",
      lastTime: "3 hours ago",
      unread: 0,
      isActive: false,
    },
  ]

  const chatMessages: Message[] = [
    {
      id: 1,
      user: "Dr. Sarah Mitchell",
      avatar: "🌸",
      message:
        "Good morning, wonderful community! 🌅 How is everyone feeling today? Remember, every small step forward is a victory worth celebrating.",
      time: "9:30 AM",
      isOwn: false,
      reactions: ["❤️", "👋", "🌟"],
      badge: "Speech Therapist",
      isRead: true,
    },
    {
      id: 2,
      user: "Alex Chen",
      avatar: "🌟",
      message:
        "Hi Dr. Sarah! I'm feeling a bit nervous about my presentation today, but I've been practicing the breathing techniques we learned last week. The diaphragmatic breathing really helps calm my nerves.",
      time: "9:32 AM",
      isOwn: false,
      reactions: ["💪", "🌟", "🙏"],
      badge: "Active Member",
      isRead: true,
    },
    {
      id: 3,
      user: "You",
      avatar: "🦋",
      message:
        "You've absolutely got this, Alex! 💙 Remember, we're all rooting for you. Take your time, breathe deeply, and trust in all the practice you've put in. You're stronger than you know! 🌈",
      time: "9:35 AM",
      isOwn: true,
      reactions: ["❤️", "🙏", "✨"],
      badge: "Community Champion",
      isRead: true,
    },
    {
      id: 4,
      user: "Maya Rodriguez",
      avatar: "🌺",
      message:
        "I have the most amazing news to share! 🎉 I successfully ordered my coffee this morning without any blocks or repetitions. It might seem small, but for me, it's HUGE! Thank you all for the constant encouragement. ☕️✨",
      time: "9:40 AM",
      isOwn: false,
      reactions: ["🎉", "👏", "☕️", "💪", "🌟"],
      badge: "Progress Star",
      isRead: true,
    },
    {
      id: 5,
      user: "David Kim",
      avatar: "🎯",
      message:
        "Maya, that's absolutely incredible! 🚀 I remember when ordering food felt like climbing Mount Everest. Now look at us - we're conquering our fears one conversation at a time! So proud of you! 💫",
      time: "9:42 AM",
      isOwn: false,
      reactions: ["🚀", "❤️", "👑"],
      badge: "Mentor",
      isRead: true,
    },
    {
      id: 6,
      user: "Emma Thompson",
      avatar: "🌈",
      message:
        "This community fills my heart with so much hope and joy. 🌈💕 Seeing everyone's progress and the incredible support we give each other reminds me that I'm not alone in this journey. Thank you for being my safe space. 🤗",
      time: "9:45 AM",
      isOwn: false,
      reactions: ["🌈", "💕", "🤗", "✨"],
      badge: "New Member",
      isRead: true,
    },
    {
      id: 7,
      user: "Jordan Martinez",
      avatar: "⭐",
      message:
        "Quick reminder for everyone: our virtual practice session is tomorrow at 7 PM EST! 📅 We'll be working on conversation starters and building confidence in group settings. Can't wait to see you all there! 🎤",
      time: "9:48 AM",
      isOwn: false,
      reactions: ["📅", "🎤", "👍"],
      badge: "Group Leader",
      isRead: false,
    },
  ]

  const onlineMembers: OnlineMember[] = [
    {
      name: "Dr. Sarah Mitchell",
      avatar: "🌸",
      status: "Available for guidance",
      badge: "Speech Therapist",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Alex Chen",
      avatar: "🌟",
      status: "Preparing for presentation",
      badge: "Active Member",
      color: "from-blue-500 to-purple-400",
      isTyping: true,
    },
    {
      name: "Maya Rodriguez",
      avatar: "🌺",
      status: "Celebrating small wins",
      badge: "Progress Star",
      color: "from-pink-400 to-peach-400",
    },
    {
      name: "David Kim",
      avatar: "🎯",
      status: "Mentoring newcomers",
      badge: "Mentor",
      color: "from-green-500 to-emerald-400",
    },
    {
      name: "Emma Thompson",
      avatar: "🌈",
      status: "Learning and growing",
      badge: "New Member",
      color: "from-rose-500 to-pink-400",
    },
    {
      name: "Jordan Martinez",
      avatar: "⭐",
      status: "Planning group session",
      badge: "Group Leader",
      color: "from-orange-500 to-red-400",
    },
    {
      name: "Sophie Wilson",
      avatar: "🌻",
      status: "Practicing exercises",
      badge: "Regular",
      color: "from-yellow-500 to-orange-400",
    },
    {
      name: "Michael Brown",
      avatar: "🎨",
      status: "Sharing art therapy",
      badge: "Creative Helper",
      color: "from-indigo-500 to-purple-500",
    },
  ]

  const quickResponses = [
    "You've got this! 💪",
    "Take your time 🌸",
    "So proud of you! 🌟",
    "Keep practicing! 📚",
    "Sending love & support 💙",
    "Amazing progress! 🎉",
    "You're not alone 🤗",
    "Believe in yourself ✨",
  ]

  const emojis = ["😊", "❤️", "👏", "🌟", "💪", "🎉", "🌸", "💙", "🤗", "✨", "🌈", "☕️", "🚀", "👑", "🙏", "💫"]

  const badgeColors = {
    "Speech Therapist": "from-purple-500 to-pink-500",
    Mentor: "from-green-500 to-emerald-400",
    "Progress Star": "from-yellow-500 to-orange-400",
    "Community Champion": "from-blue-500 to-purple-400",
    "Group Leader": "from-orange-500 to-red-400",
    "Active Member": "from-pink-500 to-rose-400",
    "New Member": "from-emerald-500 to-green-400",
    Regular: "from-gray-500 to-gray-400",
    "Creative Helper": "from-indigo-500 to-purple-500",
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("")
      setIsTyping(true)
      setTimeout(() => setIsTyping(false), 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const filteredGroups = supportGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
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
        stiffness: 400,
        damping: 30,
      },
    },
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 30,
      },
    },
  }

  const currentGroup = supportGroups[selectedChat]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-peach-50 to-rose-50">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200/20 to-peach-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-rose-200/20 to-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-peach-200/15 to-pink-200/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 h-screen flex flex-col">
        {/* Top Header */}
        <motion.header
          className="bg-white/90 backdrop-blur-md border-b border-pink-100 px-6 py-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-pink-500 to-peach-400 rounded-xl flex items-center justify-center text-white shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-peach-500 bg-clip-text text-transparent">
                  Speech Connect
                </h1>
                <p className="text-sm text-gray-600">Connect • Support • Grow Together</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.div
                className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">{onlineUsers} online</span>
              </motion.div>

              <motion.button
                className="w-10 h-10 bg-white/80 hover:bg-white rounded-xl flex items-center justify-center text-gray-600 hover:text-pink-600 shadow-sm border border-pink-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={() => setShowSettings(!showSettings)}
                className="w-10 h-10 bg-white/80 hover:bg-white rounded-xl flex items-center justify-center text-gray-600 hover:text-pink-600 shadow-sm border border-pink-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Groups */}
          <motion.aside
            className="w-80 bg-white/80 backdrop-blur-md border-r border-pink-100 flex flex-col"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Search & Filters */}
            <div className="p-4 border-b border-pink-100">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search groups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent text-sm"
                />
              </div>

              <div className="flex gap-2">
                {["all", "groups", "direct"].map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      activeTab === tab
                        ? "bg-gradient-to-r from-pink-500 to-peach-400 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Groups List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence>
                {filteredGroups.map((group, index) => (
                  <motion.button
                    key={group.id}
                    onClick={() => setSelectedChat(index)}
                    className={cn(
                      "w-full p-4 rounded-xl text-left transition-all duration-300 relative group",
                      selectedChat === index
                        ? "bg-gradient-to-r from-pink-100 to-peach-100 border-2 border-pink-300 shadow-lg"
                        : "bg-white/60 hover:bg-white/80 border-2 border-transparent hover:border-pink-200 shadow-sm hover:shadow-md",
                    )}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Pin indicator */}
                    {group.isPinned && (
                      <div className="absolute top-2 right-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <div className={cn("w-5 h-5 rounded-full bg-gradient-to-r mt-1 shadow-sm", group.color)} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900 truncate text-base">{group.name}</h3>
                          {group.unread > 0 && (
                            <motion.span
                              className="bg-gradient-to-r from-pink-500 to-rose-400 text-white text-xs px-2 py-1 rounded-full font-medium min-w-[20px] text-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                              {group.unread}
                            </motion.span>
                          )}
                        </div>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">{group.description}</p>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {group.members} members
                          </span>
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            {group.online} online
                          </span>
                        </div>

                        <div className="border-t border-gray-200 pt-2">
                          <p className="text-xs text-gray-600 truncate mb-1">{group.lastMessage}</p>
                          <p className="text-xs text-gray-400">{group.lastTime}</p>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t border-pink-100">
              <motion.button
                className="w-full bg-gradient-to-r from-pink-500 to-peach-400 hover:from-pink-600 hover:to-peach-500 text-white rounded-xl py-3 px-4 font-semibold shadow-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(236, 72, 153, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <UserPlus className="w-5 h-5" />
                Create New Group
              </motion.button>
            </div>
          </motion.aside>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col bg-white/60 backdrop-blur-sm">
            {/* Chat Header */}
            <motion.div
              className="p-6 border-b border-pink-100 bg-white/80 backdrop-blur-md"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    className={cn(
                      "w-14 h-14 bg-gradient-to-r rounded-2xl flex items-center justify-center text-white shadow-lg",
                      currentGroup.color,
                    )}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Users className="w-7 h-7" />
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{currentGroup.name}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{currentGroup.members} members</span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        {currentGroup.online} online
                      </span>
                      <span className="bg-gradient-to-r from-pink-100 to-peach-100 text-pink-700 px-2 py-1 rounded-full text-xs font-medium">
                        {currentGroup.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    className={cn(
                      "w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-200",
                      isVoiceCall
                        ? "bg-gradient-to-r from-red-500 to-pink-500"
                        : "bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500",
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsVoiceCall(!isVoiceCall)}
                  >
                    {isVoiceCall ? <PhoneOff className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
                  </motion.button>

                  <motion.button
                    className={cn(
                      "w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-200",
                      isVideoCall
                        ? "bg-gradient-to-r from-red-500 to-pink-500"
                        : "bg-gradient-to-r from-blue-500 to-purple-400 hover:from-blue-600 hover:to-purple-500",
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsVideoCall(!isVideoCall)}
                  >
                    {isVideoCall ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                  </motion.button>

                  <motion.button
                    className="w-11 h-11 bg-gradient-to-r from-gray-500 to-gray-400 hover:from-gray-600 hover:to-gray-500 rounded-xl flex items-center justify-center text-white shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    variants={messageVariants}
                    className={cn("flex gap-4", msg.isOwn ? "flex-row-reverse" : "flex-row")}
                  >
                    <div className="flex-shrink-0">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-r from-pink-400 to-peach-400 rounded-full flex items-center justify-center text-white text-lg shadow-md"
                        whileHover={{ scale: 1.1 }}
                      >
                        {msg.avatar}
                      </motion.div>
                    </div>

                    <div className={cn("flex-1 max-w-2xl", msg.isOwn ? "text-right" : "text-left")}>
                      <div className="flex items-center gap-3 mb-2">
                        {!msg.isOwn && (
                          <>
                            <span className="font-bold text-gray-900">{msg.user}</span>
                            <span
                              className={cn(
                                "text-xs px-3 py-1 rounded-full text-white font-medium shadow-sm",
                                `bg-gradient-to-r ${badgeColors[msg.badge as keyof typeof badgeColors] || "from-gray-500 to-gray-400"}`,
                              )}
                            >
                              {msg.badge}
                            </span>
                          </>
                        )}
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          {msg.time}
                          {msg.isOwn && (
                            <CheckCircle className={cn("w-3 h-3", msg.isRead ? "text-blue-500" : "text-gray-400")} />
                          )}
                        </span>
                      </div>

                      <motion.div
                        className={cn(
                          "p-4 rounded-2xl shadow-sm relative group",
                          msg.isOwn
                            ? "bg-gradient-to-r from-pink-500 to-peach-400 text-white"
                            : "bg-white border border-pink-100",
                        )}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                      >
                        <p className="text-sm leading-relaxed">{msg.message}</p>

                        {/* Message actions */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex gap-1">
                            <motion.button
                              className="w-6 h-6 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Heart className="w-3 h-3" />
                            </motion.button>
                            <motion.button
                              className="w-6 h-6 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <MoreHorizontal className="w-3 h-3" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>

                      {msg.reactions && msg.reactions.length > 0 && (
                        <div className="flex gap-2 mt-3 flex-wrap">
                          {msg.reactions.map((reaction, index) => (
                            <motion.button
                              key={index}
                              className="bg-white border border-pink-200 rounded-full px-3 py-1 text-sm shadow-sm hover:shadow-md hover:border-pink-300 transition-all duration-200"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {reaction}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white">
                      💭
                    </div>
                    <div className="bg-white border border-pink-100 rounded-2xl p-4 shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Responses */}
            <div className="px-6 py-3 border-t border-pink-100 bg-white/80 backdrop-blur-md">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {quickResponses.map((response, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setMessage(response)}
                    className="flex-shrink-0 bg-gradient-to-r from-pink-100 to-peach-100 hover:from-pink-200 hover:to-peach-200 text-pink-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {response}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-pink-100 bg-white/90 backdrop-blur-md">
              <div className="flex items-end gap-4">
                <div className="flex-1 relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Share your thoughts... Remember, this is a safe space 💙"
                    className="w-full p-4 pr-16 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent resize-none bg-white/90 backdrop-blur-sm text-sm leading-relaxed shadow-sm"
                    rows={3}
                  />

                  {/* Input Actions */}
                  <div className="absolute right-3 bottom-3 flex gap-2">
                    <motion.button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="text-pink-500 hover:text-pink-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Smile className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      className="text-pink-500 hover:text-pink-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ImageIcon className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      className="text-pink-500 hover:text-pink-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Paperclip className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Emoji Picker */}
                  <AnimatePresence>
                    {showEmojiPicker && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full right-0 mb-2 bg-white rounded-2xl shadow-xl border border-pink-200 p-4 backdrop-blur-md"
                      >
                        <div className="grid grid-cols-8 gap-2">
                          {emojis.map((emoji, index) => (
                            <motion.button
                              key={index}
                              onClick={() => {
                                setMessage(message + emoji)
                                setShowEmojiPicker(false)
                              }}
                              className="w-8 h-8 flex items-center justify-center hover:bg-pink-50 rounded-lg transition-colors"
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {emoji}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-200",
                      isMuted
                        ? "bg-gradient-to-r from-red-500 to-pink-500"
                        : "bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500",
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </motion.button>

                  <motion.button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-200",
                      message.trim()
                        ? "bg-gradient-to-r from-pink-500 to-peach-400 hover:from-pink-600 hover:to-peach-500"
                        : "bg-gray-300 cursor-not-allowed",
                    )}
                    whileHover={message.trim() ? { scale: 1.1 } : {}}
                    whileTap={message.trim() ? { scale: 0.95 } : {}}
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Online Members */}
          <motion.aside
            className="w-80 bg-white/80 backdrop-blur-md border-l border-pink-100 flex flex-col"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            {/* Online Members Header */}
            <div className="p-6 border-b border-pink-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold bg-gradient-to-r from-pink-600 to-peach-500 bg-clip-text text-transparent">
                  Online Members
                </h3>
                <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {onlineMembers.length}
                </span>
              </div>
            </div>

            {/* Members List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {onlineMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-peach-50 transition-all duration-200 cursor-pointer group"
                  whileHover={{ scale: 1.02, x: 4 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="relative">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-r from-pink-400 to-peach-400 rounded-full flex items-center justify-center text-white text-lg shadow-md"
                      whileHover={{ scale: 1.1 }}
                    >
                      {member.avatar}
                    </motion.div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                    {member.isTyping && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 border-2 border-white rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 truncate">{member.name}</h4>
                      <span
                        className={cn(
                          "text-xs px-2 py-1 rounded-full text-white font-medium",
                          `bg-gradient-to-r ${member.color}`,
                        )}
                      >
                        {member.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{member.status}</p>
                    {member.isTyping && <p className="text-xs text-blue-600 font-medium">typing...</p>}
                  </div>

                  <motion.button
                    className="opacity-0 group-hover:opacity-100 w-8 h-8 bg-gradient-to-r from-pink-500 to-peach-400 rounded-lg flex items-center justify-center text-white shadow-md transition-opacity"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Community Guidelines */}
            <div className="p-6 border-t border-pink-100">
              <motion.div
                className="bg-gradient-to-r from-pink-50 to-peach-50 rounded-xl p-4 border border-pink-200"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-pink-600" />
                  <h4 className="font-bold text-pink-700">Safe Space Guidelines</h4>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <Heart className="w-3 h-3 text-pink-500 mt-1 flex-shrink-0" />
                    <span>Be patient and supportive with everyone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-3 h-3 text-pink-500 mt-1 flex-shrink-0" />
                    <span>Respect everyone's unique journey</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-3 h-3 text-pink-500 mt-1 flex-shrink-0" />
                    <span>Share experiences, offer encouragement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-3 h-3 text-pink-500 mt-1 flex-shrink-0" />
                    <span>Maintain confidentiality and trust</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.aside>
        </div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default SpeechChat
