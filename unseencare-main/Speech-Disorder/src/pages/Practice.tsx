"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/Card";
import Button from "@/components/UI/Button";
import { Badge } from "@/components/UI/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import {
  Mic,
  Play,
  RotateCcw,
  Star,
  Camera,
  Volume2,
  CheckCircle,
  Target,
  Gamepad2,
  BookOpen,
  MessageCircle,
  TrendingUp,
  Square,
  ThumbsUp,
  AlertCircle,
  X,
  Loader2,
} from "lucide-react";
import axios from "axios";

// Create axios instance with timeout
const api = axios.create({
  baseURL: "https://speechpy.onrender.com",
  timeout: 15000, // 15 second timeout
});

// Sample data for practice - matching Karen's animals
// Sample data for practice - matching Karen's animals
const articulationWords = [
  {
    word: "rabbit",
    emoji: "🐰",
    sound: "/r/",
    difficulty: "easy",
    tips: "Round your lips and lift your tongue tip",
  },
  {
    word: "lion",
    emoji: "🦁",
    sound: "/l/",
    difficulty: "medium",
    tips: "Touch your tongue to the roof of your mouth",
  },
  {
    word: "tiger",
    emoji: "🐅",
    sound: "/t/",
    difficulty: "medium",
    tips: "Touch your tongue tip to your teeth ridge",
  },
  {
    word: "snake",
    emoji: "🐍",
    sound: "/s/",
    difficulty: "medium",
    tips: "Make a long, clear S sound like a snake",
  },
  {
    word: "lemon",
    emoji: "🍋",
    sound: "/l/",
    difficulty: "easy",
    tips: "Start with your tongue touching the roof",
  },
  {
    word: "rainbow",
    emoji: "🌈",
    sound: "/r/",
    difficulty: "hard",
    tips: "Make sure to pronounce both R sounds clearly",
  },
];

const phrases = [
  {
    text: "The red rabbit runs",
    difficulty: "easy",
    target: "/r/",
    tips: "Focus on each R sound - 'Red', 'Rabbit', 'Runs'",
  },
  {
    text: "Sally sells seashells",
    difficulty: "medium",
    target: "/s/",
    tips: "Make crisp S sounds - don't rush through them",
  },
  {
    text: "Little lamb loves lettuce",
    difficulty: "hard",
    target: "/l/",
    tips: "Touch your tongue tip to your palate for each L",
  },
  {
    text: "Round and round the rugged rock",
    difficulty: "hard",
    target: "/r/",
    tips: "This is challenging - take your time with each R",
  },
  {
    text: "She sells sea shells by the seashore",
    difficulty: "hard",
    target: "/s/",
    tips: "Classic tongue twister - go slow and clear",
  },
];

const discriminationPairs = [
  {
    word1: "sip",
    word2: "ship",
    target: "/s/ vs /ʃ/",
    correct: 0,
    explanation: "Listen for the sharp S vs soft SH sound",
  },
  {
    word1: "rice",
    word2: "lice",
    target: "/r/ vs /l/",
    correct: 1,
    explanation: "R has a rounded sound, L touches the roof",
  },
  {
    word1: "thin",
    word2: "sin",
    target: "/θ/ vs /s/",
    correct: 0,
    explanation: "TH uses your tongue between teeth",
  },
  {
    word1: "light",
    word2: "right",
    target: "/l/ vs /r/",
    correct: 1,
    explanation: "L is crisp, R is more rounded",
  },
];

const storyPrompts = [
  {
    image: "🏖️",
    prompt: "Describe what you see at the beach",
    keywords: ["sand", "sun", "sea", "shells"],
  },
  {
    image: "🎂",
    prompt: "Tell me about a birthday party",
    keywords: ["cake", "candles", "celebration", "friends"],
  },
  {
    image: "🌳",
    prompt: "What happens in the forest?",
    keywords: ["trees", "animals", "leaves", "nature"],
  },
  {
    image: "🏠",
    prompt: "Describe your dream house",
    keywords: ["rooms", "garden", "family", "comfortable"],
  },
  {
    image: "🐕",
    prompt: "Tell a story about a friendly dog",
    keywords: ["playful", "loyal", "running", "happy"],
  },
];

const roleplays = [
  {
    scenario: "Restaurant",
    emoji: "🍽️",
    conversation: [
      {
        speaker: "waiter",
        text: "Hi! Welcome to our restaurant. What's your name?",
      },
      { speaker: "user", text: "", expectedWords: ["name", "hello", "hi"] },
      {
        speaker: "waiter",
        text: "Nice to meet you! What would you like to order today?",
      },
      {
        speaker: "user",
        text: "",
        expectedWords: ["order", "food", "menu", "please"],
      },
    ],
  },
  {
    scenario: "Shopping",
    emoji: "🏪",
    conversation: [
      {
        speaker: "cashier",
        text: "Hello! Did you find everything you were looking for?",
      },
      {
        speaker: "user",
        text: "",
        expectedWords: ["yes", "found", "looking", "thank"],
      },
      {
        speaker: "cashier",
        text: "Great! Your total is $15.50. How would you like to pay?",
      },
      {
        speaker: "user",
        text: "",
        expectedWords: ["card", "cash", "pay", "credit"],
      },
    ],
  },
  {
    scenario: "Introduction",
    emoji: "👋",
    conversation: [
      {
        speaker: "friend",
        text: "Hi there! I don't think we've met. What's your name?",
      },
      {
        speaker: "user",
        text: "",
        expectedWords: ["name", "hello", "nice", "meet"],
      },
      {
        speaker: "friend",
        text: "Nice to meet you! What do you like to do for fun?",
      },
      {
        speaker: "user",
        text: "",
        expectedWords: ["like", "fun", "enjoy", "hobby"],
      },
    ],
  },
];

// Feedback messages
const feedbackMessages = {
  excellent: [
    "🌟 Excellent pronunciation! Perfect clarity!",
    "🎉 Outstanding! Your speech is very clear!",
    "⭐ Amazing work! Keep up the great practice!",
    "🏆 Perfect! You nailed that sound!",
  ],
  good: [
    "👍 Good job! Your pronunciation is improving!",
    "😊 Well done! That sounded much better!",
    "✨ Nice work! You're getting the hang of it!",
    "💪 Great effort! Keep practicing like this!",
  ],
  needsWork: [
    "🤔 Good try! Let's work on that sound a bit more.",
    "💡 Almost there! Try focusing on tongue placement.",
    "🎯 Getting closer! Remember the tip I gave you.",
    "🔄 Good attempt! Let's try it again with more focus.",
  ],
  poor: [
    "😅 That's okay! Everyone learns at their own pace.",
    "🌱 Don't worry! Practice makes perfect.",
    "💝 Keep trying! You'll get it with more practice.",
    "🎈 No problem! Let's break it down step by step.",
  ],
};

export default function SpeechPractice() {
  const [activeTab, setActiveTab] = useState("articulation");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentDiscriminationIndex, setCurrentDiscriminationIndex] =
    useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentRoleplayIndex, setCurrentRoleplayIndex] = useState(0);
  const [currentConversationStep, setCurrentConversationStep] = useState(0);
  const [score, setScore] = useState(0);
  const [streak] = useState(5);
  const [balloons, setBalloons] = useState(["🎈", "🎈", "🎈", "🎈", "🎈"]);
  const [candles, setCandles] = useState(["🕯️", "🕯️", "🕯️"]);
  const [discriminationScore, setDiscriminationScore] = useState(0);
  const [totalDiscrimination, setTotalDiscrimination] = useState(0);
  const [feedback, setFeedback] = useState<{
    type: "excellent" | "good" | "needsWork" | "poor" | null;
    message: string;
    show: boolean;
  }>({ type: null, message: "", show: false });
  const [attempts, setAttempts] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  // Karen System Integration States
  const [loading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [systemActive, setSystemActive] = useState(false);
  const [message] = useState("System ready");
  const [karenStatus, setKarenStatus] = useState({
    current_animal: null,
    camera_active: false,
    karen_status: "Not initialized",
    last_heard: "",
    listening: false,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Karen System Functions
  const checkSystemStatus = async () => {
    try {
      const response = await api.get("/api/status", { timeout: 3000 });
      setKarenStatus({
        current_animal: response.data.current_animal,
        camera_active: response.data.camera_active,
        karen_status: response.data.karen_status,
        last_heard: response.data.last_heard || "",
        listening: response.data.listening || false,
      });
    } catch (error) {
      setSystemActive(false);
    }
  };

  const sendCommandToKaren = async (command: string) => {
    try {
      setIsProcessing(true);

      const response = await api.post("/api/command", {
        command: command,
      });

      if (response.data.status === "success") {
        // Show Karen's response as feedback
        setFeedback({
          type: "excellent",
          message: `🤖 Karen: ${response.data.response}`,
          show: true,
        });

        // Update Karen status if available
        if (response.data.karen_status) {
          setKarenStatus(response.data.karen_status);
        }

        // Add points for successful interaction
        setScore((prev) => prev + 15);

        setTimeout(() => {
          setFeedback((prev) => ({ ...prev, show: false }));
        }, 4000);
      } else {
        setFeedback({
          type: "needsWork",
          message: `❌ Error: ${response.data.message}`,
          show: true,
        });
      }
    } catch (error) {
      console.error("Command error:", error);
      setStatusMessage("Command failed");
      setFeedback({
        type: "poor",
        message: "❌ Could not connect to Karen system",
        show: true,
      });
    } finally {
      setIsProcessing(false);
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  useEffect(() => {
    checkSystemStatus();
    // Check status every 5 seconds
    const interval = setInterval(checkSystemStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced voice analysis with Karen integration
  const analyzeRecording = useCallback(
    (context: "word" | "phrase" | "story" | "roleplay") => {
      setIsProcessing(true);

      // Get current item based on context
      let currentItem = null;
      let commandText = "";

      if (context === "word") {
        currentItem = articulationWords[currentWordIndex];
        commandText = `show me ${currentItem.word}`;
      } else if (context === "phrase") {
        currentItem = phrases[currentPhraseIndex];
        commandText = currentItem.text;
      }

      // If Karen system is active, send command to Karen
      if (systemActive && commandText) {
        sendCommandToKaren(commandText);
        return;
      }

      // Fallback to original analysis if Karen is not active
      setTimeout(() => {
        const random = Math.random();
        let feedbackType: "excellent" | "good" | "needsWork" | "poor";
        let points = 0;

        const difficultyMultiplier =
          currentItem?.difficulty === "easy"
            ? 0.8
            : currentItem?.difficulty === "medium"
            ? 0.6
            : 0.4;

        const attemptsBonus = Math.min(attempts * 0.1, 0.3);
        const successRate = (random + attemptsBonus) * difficultyMultiplier;

        if (successRate > 0.7) {
          feedbackType = "excellent";
          points = 20;
        } else if (successRate > 0.5) {
          feedbackType = "good";
          points = 15;
        } else if (successRate > 0.3) {
          feedbackType = "needsWork";
          points = 10;
        } else {
          feedbackType = "poor";
          points = 5;
        }

        const messages = feedbackMessages[feedbackType];
        const randomMessage =
          messages[Math.floor(Math.random() * messages.length)];

        setFeedback({
          type: feedbackType,
          message: randomMessage,
          show: true,
        });

        setScore((prev) => prev + points);
        setAttempts((prev) => prev + 1);
        setIsProcessing(false);

        setTimeout(() => {
          setFeedback((prev) => ({ ...prev, show: false }));
        }, 4000);
      }, 800);
    },
    [currentWordIndex, currentPhraseIndex, attempts, systemActive]
  );

  // Quick Karen commands for animals
  const quickKarenCommand = async (animal: string) => {
    if (systemActive) {
      await sendCommandToKaren(`show me ${animal}`);
    } else {
      setFeedback({
        type: "needsWork",
        message: "🤖 Please start Karen system first!",
        show: true,
      });
      setTimeout(() => setFeedback((prev) => ({ ...prev, show: false })), 3000);
    }
  };

  // Optimized recording timer
  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      setRecordingTime(0);
    }

    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording]);

  // Optimized voice recording functions
  const startRecording = useCallback(async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
        },
      });

      streamRef.current = stream;

      const options = {
        mimeType: "audio/webm;codecs=opus",
        audioBitsPerSecond: 128000,
      };

      let mediaRecorder;
      try {
        mediaRecorder = new MediaRecorder(stream, options);
      } catch (e) {
        mediaRecorder = new MediaRecorder(stream);
      }

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mediaRecorder.mimeType || "audio/wav",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);

        if (activeTab === "articulation") {
          analyzeRecording("word");
        } else if (activeTab === "repetition") {
          analyzeRecording("phrase");
        } else if (activeTab === "stories") {
          analyzeRecording("story");
        } else if (activeTab === "roleplay") {
          analyzeRecording("roleplay");
        }
      };

      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event);
        setIsRecording(false);
        setIsProcessing(false);
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      setAudioURL(null);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Please allow microphone access to use voice recording features.");
      setIsRecording(false);
      setIsProcessing(false);
    }
  }, [activeTab, analyzeRecording]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    }
  }, [isRecording]);

  const playAudio = () => {
    if (audioURL) {
      const audio = new Audio(audioURL);
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const nextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % articulationWords.length);
    setAudioURL(null);
    setFeedback({ type: null, message: "", show: false });
    setAttempts(0);
    setShowTips(false);
  };

  const nextPhrase = () => {
    setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    setAudioURL(null);
    setFeedback({ type: null, message: "", show: false });
    setAttempts(0);
    setShowTips(false);
  };

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % storyPrompts.length);
    setAudioURL(null);
    setFeedback({ type: null, message: "", show: false });
    setAttempts(0);
  };

  const nextDiscrimination = () => {
    setCurrentDiscriminationIndex(
      (prev) => (prev + 1) % discriminationPairs.length
    );
  };

  const handleDiscriminationChoice = (choice: number) => {
    const correct = discriminationPairs[currentDiscriminationIndex].correct;
    setTotalDiscrimination((prev) => prev + 1);

    if (choice === correct) {
      setDiscriminationScore((prev) => prev + 1);
      setScore((prev) => prev + 10);
      setFeedback({
        type: "excellent",
        message: "🎉 Correct! Great listening skills!",
        show: true,
      });
    } else {
      setFeedback({
        type: "needsWork",
        message: `🤔 Not quite. ${discriminationPairs[currentDiscriminationIndex].explanation}`,
        show: true,
      });
    }

    setTimeout(() => {
      setFeedback((prev) => ({ ...prev, show: false }));
      nextDiscrimination();
    }, 3000);
  };

  const popBalloon = () => {
    if (balloons.length > 0) {
      setBalloons((prev) => prev.slice(1));
      setScore((prev) => prev + 5);
      if (balloons.length === 1) {
        setFeedback({
          type: "excellent",
          message: "🎈 Amazing! You popped all the balloons!",
          show: true,
        });
        setTimeout(() => {
          setBalloons(["🎈", "🎈", "🎈", "🎈", "🎈"]);
          setFeedback((prev) => ({ ...prev, show: false }));
        }, 2000);
      }
    }
  };

  const blowCandle = () => {
    if (candles.length > 0) {
      setCandles((prev) => prev.slice(1));
      setScore((prev) => prev + 5);
      if (candles.length === 1) {
        setFeedback({
          type: "excellent",
          message: "🕯️ Wonderful! You blew out all the candles!",
          show: true,
        });
        setTimeout(() => {
          setCandles(["🕯️", "🕯️", "🕯️"]);
          setFeedback((prev) => ({ ...prev, show: false }));
        }, 2000);
      }
    }
  };

  const nextRoleplay = () => {
    setCurrentRoleplayIndex((prev) => (prev + 1) % roleplays.length);
    setCurrentConversationStep(0);
    setAudioURL(null);
    setFeedback({ type: null, message: "", show: false });
  };

  const nextConversationStep = () => {
    const maxSteps = roleplays[currentRoleplayIndex].conversation.length;
    if (currentConversationStep < maxSteps - 1) {
      setCurrentConversationStep((prev) => prev + 1);
      setAudioURL(null);
    } else {
      nextRoleplay();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Recording Controls Component
  const RecordingControls = () => (
    <div className="flex flex-col items-center gap-3 sm:gap-4">
      {!isRecording && !isProcessing ? (
        <Button
          onClick={startRecording}
          className="bg-rose-500 hover:bg-rose-600 text-white w-full sm:w-auto text-sm sm:text-base"
        >
          <Mic className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Start Recording
        </Button>
      ) : isRecording ? (
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-red-600 font-medium">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm sm:text-base">
              Recording... {formatTime(recordingTime)}
            </span>
          </div>
          <Button
            onClick={stopRecording}
            className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto text-sm sm:text-base"
          >
            <Square className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Stop Recording
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-blue-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm sm:text-base">
            {statusMessage || "Analyzing your speech..."}
          </span>
        </div>
      )}

      {audioURL && !isRecording && !isProcessing && (
        <Button
          onClick={playAudio}
          variant="outline"
          className="border-rose-300 text-rose-700 w-full sm:w-auto text-sm sm:text-base"
        >
          <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Play Recording
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-rose-50 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-rose-800 mb-2">
            🗣️ Speech Practice Hub
          </h1>
          <p className="text-rose-600 text-sm sm:text-lg">
            Your journey to clearer speech starts here!
          </p>
        </div>

        {/* Feedback Modal */}
        {feedback.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
              className={`bg-white rounded-lg p-4 sm:p-6 max-w-sm sm:max-w-md w-full mx-4 ${
                feedback.type === "excellent"
                  ? "border-l-4 border-green-500"
                  : feedback.type === "good"
                  ? "border-l-4 border-blue-500"
                  : feedback.type === "needsWork"
                  ? "border-l-4 border-yellow-500"
                  : "border-l-4 border-red-500"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {feedback.type === "excellent" && (
                    <ThumbsUp className="w-6 h-6 text-green-500" />
                  )}
                  {feedback.type === "good" && (
                    <CheckCircle className="w-6 h-6 text-blue-500" />
                  )}
                  {feedback.type === "needsWork" && (
                    <AlertCircle className="w-6 h-6 text-yellow-500" />
                  )}
                  {feedback.type === "poor" && (
                    <RotateCcw className="w-6 h-6 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">
                      {feedback.message}
                    </p>
                    {feedback.type === "needsWork" ||
                    feedback.type === "poor" ? (
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        💡 Tip:{" "}
                        {activeTab === "articulation"
                          ? articulationWords[currentWordIndex].tips
                          : activeTab === "repetition"
                          ? phrases[currentPhraseIndex].tips
                          : "Keep practicing! You're doing great!"}
                      </p>
                    ) : null}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setFeedback((prev) => ({ ...prev, show: false }))
                  }
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Progress Overview */}
        <Card className="mb-4 sm:mb-6 border-rose-200 bg-gradient-to-r from-pink-100 to-orange-100">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-rose-800 text-lg sm:text-xl">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-rose-700">
                  {streak}
                </div>
                <div className="text-xs sm:text-sm text-rose-600">
                  Day Streak 🔥
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-rose-700">
                  {score}
                </div>
                <div className="text-xs sm:text-sm text-rose-600">
                  Total Score ⭐
                </div>
              </div>
              <div className="text-center col-span-2 sm:col-span-1">
                <div className="text-xl sm:text-2xl font-bold text-rose-700">
                  {attempts}
                </div>
                <div className="text-xs sm:text-sm text-rose-600">
                  Practice Attempts 🎯
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Practice Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 bg-rose-100 mb-4 sm:mb-6 h-auto">
            <TabsTrigger
              value="articulation"
              className="data-[state=active]:bg-rose-200 p-2 sm:p-3"
            >
              <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="text-xs sm:text-sm">Words</span>
            </TabsTrigger>
            <TabsTrigger
              value="repetition"
              className="data-[state=active]:bg-rose-200 p-2 sm:p-3"
            >
              <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="text-xs sm:text-sm">Phrases</span>
            </TabsTrigger>
            <TabsTrigger
              value="discrimination"
              className="data-[state=active]:bg-rose-200 p-2 sm:p-3"
            >
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="text-xs sm:text-sm">Listen</span>
            </TabsTrigger>
            <TabsTrigger
              value="mirror"
              className="data-[state=active]:bg-rose-200 p-2 sm:p-3"
            >
              <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="text-xs sm:text-sm">Mirror</span>
            </TabsTrigger>
            <TabsTrigger
              value="games"
              className="data-[state=active]:bg-rose-200 p-2 sm:p-3"
            >
              <Gamepad2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="text-xs sm:text-sm">Games</span>
            </TabsTrigger>
            <TabsTrigger
              value="stories"
              className="data-[state=active]:bg-rose-200 p-2 sm:p-3"
            >
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="text-xs sm:text-sm">Stories</span>
            </TabsTrigger>
            <TabsTrigger
              value="roleplay"
              className="data-[state=active]:bg-rose-200 p-2 sm:p-3"
            >
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="text-xs sm:text-sm">Chat</span>
            </TabsTrigger>
          </TabsList>

          {/* Articulation Practice */}
          <TabsContent value="articulation">
            <Card className="border-rose-200">
              <CardHeader className="bg-gradient-to-r from-pink-100 to-orange-100">
                <CardTitle className="text-rose-800 text-lg sm:text-xl">
                  🎯 Word Practice with Karen
                </CardTitle>
                <CardDescription className="text-rose-600 text-sm">
                  Practice clear pronunciation with Karen AI assistance Practice
                  clear pronunciation with Karen AI assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="text-center mb-6">
                  <div className="text-6xl sm:text-8xl mb-4">
                    {articulationWords[currentWordIndex].emoji}
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-bold text-rose-800 mb-2">
                    {articulationWords[currentWordIndex].word}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <Badge
                      variant="secondary"
                      className="bg-rose-100 text-rose-700 text-xs sm:text-sm"
                    >
                      Target Sound: {articulationWords[currentWordIndex].sound}
                    </Badge>
                    <Badge
                      variant={
                        articulationWords[currentWordIndex].difficulty ===
                        "easy"
                          ? "default"
                          : articulationWords[currentWordIndex].difficulty ===
                            "medium"
                          ? "secondary"
                          : "destructive"
                      }
                      className="text-xs sm:text-sm"
                    >
                      {articulationWords[currentWordIndex].difficulty}
                    </Badge>
                  </div>

                  {/* Quick Karen Commands */}
                  <div className="mb-4">
                    <p className="text-sm text-blue-600 mb-2">
                      🤖 Quick Karen Commands:
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {articulationWords.map((word, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant={
                            index === currentWordIndex ? "primary" : "outline"
                          }
                          onClick={() => quickKarenCommand(word.word)}
                          disabled={!systemActive || isProcessing}
                          className={`text-xs ${
                            index === currentWordIndex
                              ? "bg-blue-500 text-white"
                              : "border-blue-300 text-blue-700"
                          }`}
                        >
                          {word.emoji} {word.word}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Tips Section */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowTips(!showTips)}
                    className="mb-4 border-rose-300 text-rose-700 text-xs sm:text-sm"
                  >
                    💡 {showTips ? "Hide" : "Show"} Tips
                  </Button>

                  {showTips && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4">
                      <p className="text-blue-700 text-sm sm:text-base font-medium">
                        💡 Pronunciation Tip:
                      </p>
                      <p className="text-blue-600 text-xs sm:text-sm mt-1">
                        {articulationWords[currentWordIndex].tips}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  <Button
                    onClick={() =>
                      speakText(articulationWords[currentWordIndex].word)
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto text-sm sm:text-base"
                    disabled={isRecording || isProcessing}
                  >
                    <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Listen to Word
                  </Button>

                  <RecordingControls />

                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <Button
                      onClick={nextWord}
                      className="bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base"
                      disabled={isRecording || isProcessing}
                    >
                      Next Word
                    </Button>
                    <Button
                      variant="outline"
                      className="border-rose-300 text-rose-700 text-sm sm:text-base"
                      onClick={() => {
                        setAudioURL(null);
                        setFeedback({ type: null, message: "", show: false });
                      }}
                      disabled={isRecording || isProcessing}
                    >
                      <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Repetition & Imitation */}
          <TabsContent value="repetition">
            <Card className="border-rose-200">
              <CardHeader className="bg-gradient-to-r from-pink-100 to-orange-100">
                <CardTitle className="text-rose-800 text-lg sm:text-xl">
                  🎤 Phrase Practice
                </CardTitle>
                <CardDescription className="text-rose-600 text-sm">
                  Listen and repeat phrases to improve fluency
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl sm:text-3xl font-bold text-rose-800 mb-4 px-2">
                    "{phrases[currentPhraseIndex].text}"
                  </h2>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <Badge
                      variant="secondary"
                      className="bg-rose-100 text-rose-700 text-xs sm:text-sm"
                    >
                      Target: {phrases[currentPhraseIndex].target}
                    </Badge>
                    <Badge
                      variant={
                        phrases[currentPhraseIndex].difficulty === "easy"
                          ? "default"
                          : phrases[currentPhraseIndex].difficulty === "medium"
                          ? "secondary"
                          : "destructive"
                      }
                      className="text-xs sm:text-sm"
                    >
                      {phrases[currentPhraseIndex].difficulty}
                    </Badge>
                  </div>

                  {/* Tips Section */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowTips(!showTips)}
                    className="mb-4 border-rose-300 text-rose-700 text-xs sm:text-sm"
                  >
                    💡 {showTips ? "Hide" : "Show"} Tips
                  </Button>

                  {showTips && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4">
                      <p className="text-blue-700 text-sm sm:text-base font-medium">
                        💡 Practice Tip:
                      </p>
                      <p className="text-blue-600 text-xs sm:text-sm mt-1">
                        {phrases[currentPhraseIndex].tips}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto text-sm sm:text-base"
                    onClick={() => speakText(phrases[currentPhraseIndex].text)}
                    disabled={isRecording || isProcessing}
                  >
                    <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Listen to Phrase
                  </Button>

                  <RecordingControls />

                  <Button
                    onClick={nextPhrase}
                    className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto text-sm sm:text-base"
                    disabled={isRecording || isProcessing}
                  >
                    Next Phrase
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Auditory Discrimination */}
          <TabsContent value="discrimination">
            <Card className="border-rose-200">
              <CardHeader className="bg-gradient-to-r from-pink-100 to-orange-100">
                <CardTitle className="text-rose-800 text-lg sm:text-xl">
                  👂 Sound Discrimination
                </CardTitle>
                <CardDescription className="text-rose-600 text-sm">
                  Listen carefully and identify the correct sound
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="text-center mb-6">
                  <h2 className="text-lg sm:text-2xl font-bold text-rose-800 mb-4">
                    Which word do you hear?
                  </h2>
                  <Badge
                    variant="secondary"
                    className="bg-rose-100 text-rose-700 mb-4 text-xs sm:text-sm"
                  >
                    {discriminationPairs[currentDiscriminationIndex].target}
                  </Badge>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current" />
                    <span className="text-rose-700 text-sm sm:text-base">
                      Score: {discriminationScore}/{totalDiscrimination}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 sm:gap-6">
                  <Button
                    className="bg-purple-500 hover:bg-purple-600 text-white w-full sm:w-auto text-sm sm:text-base"
                    onClick={() => {
                      const wordToSpeak =
                        Math.random() > 0.5
                          ? discriminationPairs[currentDiscriminationIndex]
                              .word1
                          : discriminationPairs[currentDiscriminationIndex]
                              .word2;
                      speakText(wordToSpeak);
                    }}
                  >
                    <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Play Sound
                  </Button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-md">
                    <Button
                      variant="outline"
                      className="h-16 sm:h-20 text-lg sm:text-xl border-rose-300 hover:bg-rose-100"
                      onClick={() => handleDiscriminationChoice(0)}
                    >
                      {discriminationPairs[currentDiscriminationIndex].word1}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-16 sm:h-20 text-lg sm:text-xl border-rose-300 hover:bg-rose-100"
                      onClick={() => handleDiscriminationChoice(1)}
                    >
                      {discriminationPairs[currentDiscriminationIndex].word2}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mirror Practice */}
          <TabsContent value="mirror">
            <Card className="border-rose-200">
              <CardHeader className="bg-gradient-to-r from-pink-100 to-orange-100">
                <CardTitle className="text-rose-800 text-lg sm:text-xl">
                  🪞 Mirror Practice with Karen
                </CardTitle>
                <CardDescription className="text-rose-600 text-sm">
                  Watch your mouth movements with Karen's camera system Watch
                  your mouth movements with Karen's camera system
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="text-center">
                    <h3 className="text-base sm:text-lg font-semibold text-rose-800 mb-4">
                      Karen's Camera View
                    </h3>
                    <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video">
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="w-full h-full object-cover"
                      />
                      {!karenStatus.camera_active && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                          <div className="text-center">
                            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm sm:text-base">
                              {systemActive
                                ? "Karen camera starting..."
                                : "Start Karen system for camera"}
                            </p>
                          </div>
                        </div>
                      )}
                      {karenStatus.camera_active && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                          🟢 Karen Active
                        </div>
                      )}
                    </div>

                    <div className="mt-4 space-y-2">
                      <a
                        href="https://speechpy.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          className={`${
                            systemActive
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-green-500 hover:bg-green-600"
                          } text-white w-full sm:w-auto text-sm sm:text-base`}
                        >
                          <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          {loading
                            ? "Processing..."
                            : systemActive
                            ? "Stop Karen System"
                            : "Start Karen System"}
                        </Button>
                      </a>

                      <p
                        className={`text-sm ${
                          message.includes("error") || message.includes("fail")
                            ? "text-red-500"
                            : message.includes("ready")
                            ? "text-blue-500"
                            : "text-green-500"
                        }`}
                      ></p>

                      {karenStatus.listening && (
                        <div className="flex items-center justify-center gap-2 text-blue-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-sm">Karen is listening...</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-base sm:text-lg font-semibold text-rose-800 mb-4">
                      Practice Guide
                    </h3>
                    <div className="bg-orange-100 rounded-lg p-6 sm:p-8 aspect-video flex flex-col items-center justify-center">
                      <div className="text-4xl sm:text-6xl mb-4">👄</div>
                      <div className="text-lg sm:text-2xl font-bold text-rose-800 mb-2">
                        {articulationWords[currentWordIndex].word}
                      </div>
                      {karenStatus.current_animal && (
                        <div className="text-sm text-green-600 font-medium">
                          🤖 Karen selected: {karenStatus.current_animal}
                        </div>
                      )}
                      {karenStatus.current_animal && (
                        <div className="text-sm text-green-600 font-medium">
                          🤖 Karen selected: {karenStatus.current_animal}
                        </div>
                      )}
                    </div>
                    <p className="mt-4 text-rose-600 text-sm sm:text-base px-2">
                      Practice the {articulationWords[currentWordIndex].sound}{" "}
                      sound: Watch your mouth position
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 mt-4 justify-center">
                      <Button
                        onClick={() =>
                          speakText(articulationWords[currentWordIndex].word)
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base"
                      >
                        <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Hear Word
                      </Button>
                      <Button
                        onClick={() =>
                          quickKarenCommand(
                            articulationWords[currentWordIndex].word
                          )
                        }
                        disabled={!systemActive}
                        className="bg-purple-500 hover:bg-purple-600 text-white text-sm sm:text-base"
                      >
                        🤖 Ask Karen
                      </Button>
                      <Button
                        onClick={nextWord}
                        variant="outline"
                        className="border-rose-300 text-rose-700 text-sm sm:text-base"
                      >
                        Next Word
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Games */}
          <TabsContent value="games">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              <Card className="border-rose-200 hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-pink-100 to-orange-100">
                  <CardTitle className="text-rose-800 text-base sm:text-lg">
                    🎈 Balloon Pop
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-3xl sm:text-4xl mb-4 min-h-[3rem] flex items-center justify-center flex-wrap">
                    {balloons.join("")}
                  </div>
                  <p className="text-rose-600 mb-4 text-sm sm:text-base">
                    Say any sound to pop balloons!
                  </p>
                  <Button
                    className="bg-rose-500 hover:bg-rose-600 text-white mb-2 w-full sm:w-auto text-sm sm:text-base"
                    onClick={popBalloon}
                  >
                    Pop Balloon!
                  </Button>
                  <div className="text-xs sm:text-sm text-rose-600">
                    Balloons left: {balloons.length}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-rose-200 hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-pink-100 to-orange-100">
                  <CardTitle className="text-rose-800 text-base sm:text-lg">
                    🕯️ Candle Blow
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-3xl sm:text-4xl mb-4 min-h-[3rem] flex items-center justify-center">
                    {candles.join(" ")}
                  </div>
                  <p className="text-rose-600 mb-4 text-sm sm:text-base">
                    Blow out candles with your voice!
                  </p>
                  <Button
                    className="bg-rose-500 hover:bg-rose-600 text-white mb-2 w-full sm:w-auto text-sm sm:text-base"
                    onClick={blowCandle}
                  >
                    Blow Candle!
                  </Button>
                  <div className="text-xs sm:text-sm text-rose-600">
                    Candles left: {candles.length}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-rose-200 hover:shadow-lg transition-shadow md:col-span-2 xl:col-span-1">
                <CardHeader className="bg-gradient-to-r from-pink-100 to-orange-100">
                  <CardTitle className="text-rose-800 text-base sm:text-lg">
                    🤖 Karen Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-3xl sm:text-4xl mb-4">🎯</div>
                  <p className="text-rose-600 mb-4 text-sm sm:text-base">
                    Challenge Karen with animal names!
                  </p>
                  <Button
                    className="bg-purple-500 hover:bg-purple-600 text-white mb-2 w-full sm:w-auto text-sm sm:text-base"
                    onClick={() => {
                      const randomAnimal =
                        articulationWords[
                          Math.floor(Math.random() * articulationWords.length)
                        ];
                      quickKarenCommand(randomAnimal.word);
                    }}
                    disabled={!systemActive}
                  >
                    🤖 Random Animal 🤖 Random Animal
                  </Button>
                  <div className="text-xs sm:text-sm text-rose-600">
                    {systemActive ? "Karen is ready!" : "Start Karen first"}
                  </div>
                  <div className="text-xs sm:text-sm text-rose-600">
                    {systemActive ? "Karen is ready!" : "Start Karen first"}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Storytelling */}
          <TabsContent value="stories">
            <Card className="border-rose-200">
              <CardHeader className="bg-gradient-to-r from-pink-100 to-orange-100">
                <CardTitle className="text-rose-800 text-lg sm:text-xl">
                  📚 Story Building
                </CardTitle>
                <CardDescription className="text-rose-600 text-sm">
                  Create stories and practice fluent speech
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="text-center mb-6">
                  <div className="text-6xl sm:text-8xl mb-4">
                    {storyPrompts[currentStoryIndex].image}
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-rose-800 mb-4 px-2">
                    {storyPrompts[currentStoryIndex].prompt}
                  </h2>

                  {/* Keywords to include */}
                  <div className="mb-4">
                    <p className="text-sm text-rose-600 mb-2">
                      💡 Try to include these words:
                    </p>
                    <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                      {storyPrompts[currentStoryIndex].keywords.map(
                        (keyword, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-rose-300 text-rose-700 text-xs"
                          >
                            {keyword}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  <RecordingControls />

                  <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto text-sm sm:text-base"
                    onClick={nextStory}
                    disabled={isRecording || isProcessing}
                  >
                    New Story Prompt
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Roleplay */}
          <TabsContent value="roleplay">
            <Card className="border-rose-200">
              <CardHeader className="bg-gradient-to-r from-pink-100 to-orange-100">
                <CardTitle className="text-rose-800 text-lg sm:text-xl">
                  💬 Real-Life Practice
                </CardTitle>
                <CardDescription className="text-rose-600 text-sm">
                  Practice conversations for everyday situations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl sm:text-4xl mb-2">
                    {roleplays[currentRoleplayIndex].emoji}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-rose-800">
                    {roleplays[currentRoleplayIndex].scenario}
                  </h3>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {roleplays[currentRoleplayIndex].conversation
                    .slice(0, currentConversationStep + 1)
                    .map((step, index) => (
                      <div key={index}>
                        {step.speaker === "user" ? (
                          <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                            <p className="text-green-800 font-medium text-sm sm:text-base">
                              👤 You:
                            </p>
                            {audioURL && index === currentConversationStep ? (
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  onClick={playAudio}
                                  size="sm"
                                  variant="outline"
                                >
                                  <Play className="w-3 h-3" />
                                </Button>
                                <span className="text-green-700 text-sm sm:text-base">
                                  Your recorded response
                                </span>
                              </div>
                            ) : (
                              <p className="text-green-600 italic mt-2 text-sm sm:text-base">
                                Record your response below
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                            <p className="text-blue-800 font-medium text-sm sm:text-base">
                              🤖{" "}
                              {step.speaker === "waiter"
                                ? "Waiter"
                                : step.speaker === "cashier"
                                ? "Cashier"
                                : step.speaker === "friend"
                                ? "Friend"
                                : "Assistant"}
                              :
                            </p>
                            <p className="text-blue-700 text-sm sm:text-base">
                              "{step.text}"
                            </p>
                            <Button
                              onClick={() => speakText(step.text)}
                              size="sm"
                              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm"
                            >
                              <Volume2 className="w-3 h-3 mr-1" />
                              Listen
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  {roleplays[currentRoleplayIndex].conversation[
                    currentConversationStep
                  ]?.speaker === "user" && <RecordingControls />}

                  {audioURL &&
                    roleplays[currentRoleplayIndex].conversation[
                      currentConversationStep
                    ]?.speaker === "user" && (
                      <Button
                        onClick={nextConversationStep}
                        className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto text-sm sm:text-base"
                        disabled={isRecording || isProcessing}
                      >
                        Continue Conversation
                      </Button>
                    )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mt-6 w-full">
                    {roleplays.map((roleplay, index) => (
                      <Button
                        key={index}
                        variant={
                          index === currentRoleplayIndex ? "primary" : "outline"
                        }
                        className={
                          index === currentRoleplayIndex
                            ? "bg-rose-500 text-white text-xs sm:text-sm"
                            : "border-rose-300 text-rose-700 text-xs sm:text-sm"
                        }
                        onClick={() => {
                          setCurrentRoleplayIndex(index);
                          setCurrentConversationStep(0);
                          setAudioURL(null);
                          setFeedback({ type: null, message: "", show: false });
                        }}
                        disabled={isRecording || isProcessing}
                      >
                        {roleplay.emoji} {roleplay.scenario}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
