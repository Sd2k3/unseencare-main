"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/Card"
import Button from "@/components/UI/Button"
import { Badge } from "@/components/UI/Badge"
import { Camera, CameraOff, Play, Pause, RotateCcw, Loader2, Activity } from "lucide-react"

// Constants
const PIXEL_STEP = 2 // Lower step for better accuracy
const MOTION_THRESHOLD = 8 // Lower threshold for better sensitivity
const HISTORY_SIZE = 15 // Number of frames to analyze
const DETECTION_COOLDOWN = 2000 // Time between detections (ms)

const motionGestures = {
  wave: {
    emoji: "👋",
    english: "Wave",
    hindi: "हाथ हिलाना",
    response: "Hello! I see you waving! 👋 नमस्ते! आप हाथ हिला रहे हैं!",
  },
  jump: {
    emoji: "🦘",
    english: "Jump",
    hindi: "कूदना",
    response: "Wow! You're jumping! 🦘 वाह! आप कूद रहे हैं!",
  },
  still: {
    emoji: "🧘",
    english: "Still",
    hindi: "स्थिर",
    response: "Very calm! 🧘 बहुत शांत!",
  },
  dance: {
    emoji: "💃",
    english: "Dance",
    hindi: "नृत्य",
    response: "Nice dance moves! 💃 बढ़िया नृत्य!",
  },
  clap: {
    emoji: "👏",
    english: "Clap",
    hindi: "ताली",
    response: "Great clapping! 👏 बहुत अच्छी ताली!",
  },
}

export default function RealMotionDetector() {
  const [isReading, setIsReading] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [currentSign, setCurrentSign] = useState<any>(null)
  const [lastResponse, setLastResponse] = useState("")
  const [detectedSigns, setDetectedSigns] = useState<any[]>([])
  const [motionLevel, setMotionLevel] = useState(0)
  const [motionType, setMotionType] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isResponding, setIsResponding] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationRef = useRef<number | null>(null)
  const previousFrameRef = useRef<ImageData | null>(null)
  const motionHistoryRef = useRef<number[]>([])
  const lastDetectionTime = useRef(0)

  // Improved motion detection with better frame comparison
const detectMotion = useCallback(() => {
  console.log("detectMotion called");
    console.log("🎯 detectMotion called");


  if (!videoRef.current) {
    console.warn("❌ videoRef is null");
  }
  if (!canvasRef.current) {
    console.warn("❌ canvasRef is null");
  }
  if (!isReading) {
    console.warn("⛔ isReading is false");
  }
  if (!cameraActive) {
    console.warn("⛔ camera is not active");
  }

  if (!videoRef.current || !canvasRef.current || !isReading || !cameraActive) {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      console.log("🛑 Stopped animation frame due to invalid state");
    }
    return;
  }

console.log("🎬 Component Render | isReading =", isReading);



    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    
    if (!ctx || video.videoWidth === 0 || video.videoHeight === 0) {
      animationRef.current = requestAnimationFrame(detectMotion)
      return
    }
      console.log("✅ Canvas & Video Ready:", video.videoWidth, "x", video.videoHeight);


    // Set canvas size to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw current frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height)

    if (previousFrameRef.current) {
      let motionPixels = 0
      let totalDiff = 0
      let horizontalMotion = 0
      let verticalMotion = 0

      // Compare each pixel (stepped by PIXEL_STEP)
      for (let y = 0; y < canvas.height; y += PIXEL_STEP) {
        for (let x = 0; x < canvas.width; x += PIXEL_STEP) {
          const idx = (y * canvas.width + x) * 4
          
          // Calculate pixel difference using luminance (more accurate than RGB)
          const prevLum = 0.299 * previousFrameRef.current.data[idx] + 
                          0.587 * previousFrameRef.current.data[idx+1] + 
                          0.114 * previousFrameRef.current.data[idx+2]
          const currLum = 0.299 * currentFrame.data[idx] + 
                          0.587 * currentFrame.data[idx+1] + 
                          0.114 * currentFrame.data[idx+2]
          const diff = Math.abs(currLum - prevLum)

          if (diff > MOTION_THRESHOLD) {
            motionPixels++
            totalDiff += diff

            // Track directional motion
            if (x < canvas.width / 3) horizontalMotion -= diff
            else if (x > (canvas.width * 2) / 3) horizontalMotion += diff

            if (y < canvas.height / 3) verticalMotion -= diff
            else if (y > (canvas.height * 2) / 3) verticalMotion += diff
          }
        }
      }

      // Calculate motion percentage
      const totalPixels = (canvas.width / PIXEL_STEP) * (canvas.height / PIXEL_STEP)
      const motionPercent = (motionPixels / totalPixels) * 100
      setMotionLevel(motionPercent)

      // Update motion history
      motionHistoryRef.current.push(motionPercent)
      if (motionHistoryRef.current.length > HISTORY_SIZE) {
        motionHistoryRef.current.shift()
      }

      // Analyze motion if we have enough history and not in cooldown
      if (motionHistoryRef.current.length >= 10 && 
          Date.now() - lastDetectionTime.current > DETECTION_COOLDOWN) {
        analyzeMotion(motionPercent, horizontalMotion, verticalMotion)
      }
    }

    previousFrameRef.current = currentFrame
    animationRef.current = requestAnimationFrame(detectMotion)
  }, [isReading, cameraActive])

  // Improved motion analysis with better pattern recognition
  const analyzeMotion = (_: number, horizontal: number, vertical: number) => {
    const history = motionHistoryRef.current
    const avgMotion = history.reduce((a, b) => a + b, 0) / history.length
    const maxMotion = Math.max(...history)
    const minMotion = Math.min(...history)
    const motionRange = maxMotion - minMotion

    // Calculate direction ratios
    const absHorizontal = Math.abs(horizontal)
    const absVertical = Math.abs(vertical)
    const totalDirection = absHorizontal + absVertical
    const horizontalRatio = totalDirection > 0 ? absHorizontal / totalDirection : 0
    const verticalRatio = totalDirection > 0 ? absVertical / totalDirection : 0

    let detectedGesture = null
    let type = ""

    // Detection logic with improved thresholds
    if (avgMotion < 2) {
      detectedGesture = "still"
      type = "No Motion"
    } 
    else if (horizontalRatio > 0.65 && avgMotion > 8) {
      detectedGesture = "wave"
      type = "Horizontal Motion"
    }
    else if (verticalRatio > 0.65 && avgMotion > 12) {
      detectedGesture = "jump"
      type = "Vertical Motion"
    }
    else if (motionRange > 20 && avgMotion > 12) {
      detectedGesture = "clap"
      type = "Quick Motion"
    }
    else if (avgMotion > 8) {
      detectedGesture = "dance"
      type = "General Motion"
    }

    if (detectedGesture) {
      handleGestureDetection(detectedGesture, type)
    }
  }

  const handleGestureDetection = (gestureKey: string, type: string) => {
    const gesture = motionGestures[gestureKey as keyof typeof motionGestures]
    if (!gesture) return

    lastDetectionTime.current = Date.now()
    setIsAnalyzing(true)
    setMotionType(type)

    const detectedSign = {
      id: Date.now(),
      sign: gestureKey,
      emoji: gesture.emoji,
      english: gesture.english,
      hindi: gesture.hindi,
      timestamp: new Date().toLocaleTimeString(),
      motionLevel: motionLevel,
    }

    setCurrentSign(detectedSign)
    setDetectedSigns(prev => [detectedSign, ...prev.slice(0, 9)])
    setLastResponse(gesture.response)
    setIsResponding(true)

    setTimeout(() => {
      setIsResponding(false)
      setIsAnalyzing(false)
    }, 2000)
  }

  // Camera functions with better error handling
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
          frameRate: { ideal: 30 }
        },
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        
        // Wait for video to be ready
        await new Promise((resolve) => {
          videoRef.current!.onloadedmetadata = resolve
        })
        
        setCameraActive(true)
        videoRef.current.play().catch(err => {
          console.error("Video play error:", err)
        })
      }
    } catch (error) {
      console.error("Camera error:", error)
      alert("Please enable camera permissions to use motion detection")
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setCameraActive(false)
  }

const startReading = async () => {
  console.log("▶️ startReading() called");

  if (!cameraActive) {
    await startCamera();
  }

  motionHistoryRef.current = [];
  previousFrameRef.current = null;
  lastDetectionTime.current = 0;

setIsReading(true);

};
  const stopReading = () => {
    setIsReading(false)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }

  const resetSession = () => {
    stopReading()
    setDetectedSigns([])
    setCurrentSign(null)
    setLastResponse("")
    setMotionLevel(0)
    setMotionType("")
  }

  // Test gesture function
  const testGesture = (gestureKey: string) => {
    const gesture = motionGestures[gestureKey as keyof typeof motionGestures]
    if (!gesture) return
    
    let type = ""
    switch(gestureKey) {
      case "wave": type = "Horizontal Motion"; break;
      case "jump": type = "Vertical Motion"; break;
      case "still": type = "No Motion"; break;
      case "dance": type = "General Motion"; break;
      case "clap": type = "Quick Motion"; break;
    }
    
    handleGestureDetection(gestureKey, type)
  }

  // Cleanup
  useEffect(() => {
    return () => {
      stopReading()
      stopCamera()
    }
  }, [])
  useEffect(() => {
  console.log("🧪 useEffect triggered | isReading =", isReading);
  if (isReading) {
    console.log("✅ isReading is now true — starting detection loop");
    detectMotion();
  }
}, [isReading]); // depends on detectMotion

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-rose-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent mb-4">
            🎥 Real Motion Detector
          </h1>
          <p className="text-pink-600 text-xl">AI detects your actual movements from camera feed!</p>
          <div className="flex justify-center gap-2 mt-4 text-sm">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">📹 Real Camera Analysis</span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">🤖 Motion AI</span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">🗣️ Live Response</span>
          </div>
        </div>

        {/* Live Response Banner */}
        {lastResponse && (
          <Card className="mb-8 border-green-300 bg-gradient-to-r from-green-100 to-blue-100 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl animate-bounce">🤖</div>
                <div className="flex-1">
                  <div className="text-green-800 font-bold text-xl mb-2">🗣️ AI Detected Your Movement:</div>
                  <div className="text-green-700 text-2xl font-semibold">{lastResponse}</div>
                </div>
                {isResponding && <Loader2 className="w-8 h-8 animate-spin text-green-500" />}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Motion Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4">
            <div className="text-3xl font-bold text-pink-600">{motionLevel.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Motion Level</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-lg font-bold text-orange-600">{motionType || "No Motion"}</div>
            <div className="text-sm text-gray-600">Motion Type</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-3xl font-bold text-green-600">{detectedSigns.length}</div>
            <div className="text-sm text-gray-600">Detections</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-3xl font-bold text-blue-600">{isReading ? "LIVE" : "OFF"}</div>
            <div className="text-sm text-gray-600">Status</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Camera Section */}
          <Card className="border-pink-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-pink-100 to-orange-100">
              <CardTitle className="text-pink-800 text-2xl flex items-center gap-3">
                <Camera className="w-6 h-6" />
                Live Motion Analysis
              </CardTitle>
              <CardDescription className="text-pink-600">
                Move in front of the camera - AI analyzes your real movements!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {/* Video Feed */}
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden aspect-video shadow-lg mb-6">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover"
                />

                {/* Hidden canvas for motion detection */}
                <canvas ref={canvasRef} className="hidden" />

                {!cameraActive && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">Camera not active</p>
                      <p className="text-gray-400 text-sm">Start camera to detect your movements</p>
                    </div>
                  </div>
                )}

                {/* Motion Analysis Overlay */}
                {isReading && cameraActive && (
                  <div className="absolute top-4 left-4 right-4">
                    <div className="bg-pink-500 text-white p-3 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Activity className="w-5 h-5 animate-pulse" />
                        <span className="font-semibold">
                          {isAnalyzing ? "🎯 Analyzing your movement..." : "👀 Watching for movements..."}
                        </span>
                        {isAnalyzing && <Loader2 className="w-4 h-4 animate-spin" />}
                      </div>

                      {/* Motion Level Bar */}
                      <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                        <div
                          className="bg-white h-3 rounded-full transition-all duration-200"
                          style={{ width: `${Math.min(motionLevel * 3, 100)}%` }}
                        ></div>
                      </div>

                      <div className="text-xs">
                        Motion: {motionLevel.toFixed(1)}% | Type: {motionType || "Detecting..."}
                      </div>
                    </div>
                  </div>
                )}

                {/* Current Detection */}
                {currentSign && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg animate-pulse">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{currentSign.emoji}</div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-800">{currentSign.english}</div>
                          <div className="text-pink-600">{currentSign.hindi}</div>
                          <div className="text-xs text-gray-500">Motion: {currentSign.motionLevel?.toFixed(1)}%</div>
                        </div>
                        <Badge className="bg-green-100 text-green-700 border-0">
                          {Math.round(0.9 * 100)}% {/* Confidence for test gestures */}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                <Button
                  onClick={cameraActive ? stopCamera : startCamera}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3"
                >
                  {cameraActive ? <CameraOff className="w-5 h-5 mr-2" /> : <Camera className="w-5 h-5 mr-2" />}
                  {cameraActive ? "Stop Camera" : "Start Camera"}
                </Button>

                <Button
                  onClick={isReading ? stopReading : startReading}
                  disabled={!cameraActive}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-3"
                >
                  {isReading ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                  {isReading ? "Stop Analysis" : "Start Analysis"}
                </Button>

                <Button
                  onClick={resetSession}
                  variant="outline"
                  className="border-pink-300 text-pink-700 px-6 py-3 bg-transparent"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
              </div>

              {/* Test Buttons */}
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-3 text-center font-semibold">
                  🧪 Test Movements (Click to simulate):
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(motionGestures).map(([key, gesture]) => (
                    <Button
                      key={key}
                      size="sm"
                      variant="outline"
                      onClick={() => testGesture(key)}
                      className="text-xs p-2 h-auto hover:bg-pink-50"
                    >
                      <span className="mr-1">{gesture.emoji}</span>
                      {gesture.english}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-pink-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-orange-100 to-rose-100">
              <CardTitle className="text-pink-800 text-2xl flex items-center gap-3">🧠 Motion Analysis</CardTitle>
              <CardDescription className="text-pink-600">Real-time movement detection results</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {/* Detection History */}
              {detectedSigns.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  <h3 className="font-semibold text-gray-800 mb-3">Recent Detections:</h3>
                  {detectedSigns.map((sign, index) => (
                    <div
                      key={sign.id}
                      className={`p-3 rounded-lg border transition-all duration-300 ${
                        index === 0
                          ? "bg-gradient-to-r from-pink-100 to-orange-100 border-pink-300 shadow-md"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-xl">{sign.emoji}</div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-800 text-sm">{sign.english}</div>
                          <div className="text-pink-600 text-xs">{sign.hindi}</div>
                          <div className="text-xs text-gray-500">
                            {sign.timestamp} | Motion: {sign.motionLevel?.toFixed(1)}%
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                          {Math.round(0.9 * 100)}% {/* Confidence for test gestures */}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🎥</div>
                  <p className="text-gray-500">No movements detected yet</p>
                  <p className="text-gray-400 text-sm">Start camera and move in front of it!</p>
                  <p className="text-blue-600 font-semibold mt-2">Try waving, jumping, dancing, or clapping! 🤸</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}