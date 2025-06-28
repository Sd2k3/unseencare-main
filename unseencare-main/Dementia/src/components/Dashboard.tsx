"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Brain,
  Camera,
  MessageSquare,
  Album,
  Heart,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import Sidebar from "./Sidebar"
import { SignInButton } from "@clerk/clerk-react"

export default function Dashboard() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  // Image slideshow with high-quality dementia care related images
  const images = [
    "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=3271&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?q=80&w=2671&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1661769167673-cfdb37f156d8?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1682094069738-19a65f3145b9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2670&auto=format&fit=crop",
  ]

  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)

  useEffect(() => {
    const timer = setInterval(nextImage, 5000)
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
  const canvasRef = useRef(null)

  // Wave animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
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
  const renderShape = (shape) => {
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

  return (
    <div className="relative min-h-screen bg-white text-gray-800 overflow-hidden">
      <Sidebar />

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

      {/* Main content with proper spacing for sidebar */}
      <div className="pl-72 p-6">
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

        {/* Hero Section */}
        <motion.section
          style={{ scale }}
          className="min-h-screen flex flex-col items-center justify-center px-4 md:px-12 lg:px-24 py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="p-3 bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] rounded-2xl inline-flex shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#E83E8C] to-[#6F42C1]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              CareCompanion
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-12 text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Empowering dementia care with intelligent technology and compassionate support
            </motion.p>

            {/* Enhanced Image Slideshow */}
            <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={images[currentImage]}
                  alt="Elderly care"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Slideshow Controls */}
              <div className="absolute inset-x-0 bottom-0 flex justify-between items-center p-4">
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.4)" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevImage}
                  className="p-2 rounded-full bg-white/30 backdrop-blur-sm text-white transition-all duration-300"
                >
                  <ChevronLeft size={24} />
                </motion.button>
                <div className="flex space-x-2">
                  {images.map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-2 h-2 rounded-full ${i === currentImage ? "bg-white" : "bg-white/40"}`}
                      whileHover={{ scale: 1.5 }}
                      onClick={() => setCurrentImage(i)}
                      style={{ cursor: "pointer" }}
                    />
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.4)" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextImage}
                  className="p-2 rounded-full bg-white/30 backdrop-blur-sm text-white transition-all duration-300"
                >
                  <ChevronRight size={24} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.section>

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

        {/* Video Demo Section */}
        <section className="py-20 px-4 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, margin: "-100px" }}
            className="max-w-6xl mx-auto"
          >
            <motion.div
              className="flex items-center justify-center gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-2 bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] rounded-xl shadow-md">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#E83E8C] to-[#6F42C1]">
                See CareCompanion in Action
              </h2>
            </motion.div>
            <motion.div
              className="aspect-video rounded-3xl overflow-hidden shadow-xl bg-white/80 backdrop-blur-sm p-8 border border-gray-100"
              whileHover={{ scale: 1.01, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#FFF0F5] to-[#F8F0FF] flex items-center justify-center">
                <motion.p
                  className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Interactive Demo Coming Soon
                </motion.p>
              </div>
            </motion.div>
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
    </div>
  )
}