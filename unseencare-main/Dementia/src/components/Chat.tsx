"use client"

import { useState } from "react"
import { MapPin, MessageSquare, Send, Users } from "lucide-react"
import Sidebar from "./Sidebar"

export default function Chat() {
  const [activeView, setActiveView] = useState<"map" | "chat">("map")
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null)
  const [message, setMessage] = useState("")

  const dummyNearbyPatients = [
    { id: 1, name: "John Doe", distance: "0.5 miles", lastActive: "5 min ago", status: "online" },
    { id: 2, name: "Jane Smith", distance: "1.2 miles", lastActive: "15 min ago", status: "away" },
    { id: 3, name: "Robert Johnson", distance: "2.0 miles", lastActive: "1 hour ago", status: "offline" },
  ]

  const dummyMessages = [
    {
      id: 1,
      sender: "John Doe",
      message: "Hello, I need some assistance with my medication.",
      time: "2:30 PM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      message: "Hi John! I'd be happy to help. What specific questions do you have?",
      time: "2:32 PM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "John Doe",
      message: "I'm not sure about the dosage timing for my new prescription.",
      time: "2:35 PM",
      isOwn: false,
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage("")
    }
  }

  return (
    <>
      <Sidebar />
      <div className="bg-gradient-to-br from-pink-50 to-peach-50 rounded-2xl shadow-2xl p-8 ml-72 transition-all duration-500 hover:shadow-3xl">
        {/* Animated Header */}
        <div className="flex space-x-6 mb-8">
          <button
            onClick={() => setActiveView("map")}
            className={`group flex items-center px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeView === "map"
                ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg shadow-pink-200"
                : "bg-white/70 text-pink-600 hover:bg-white/90 hover:shadow-md"
            }`}
          >
            <MapPin
              className={`h-5 w-5 mr-3 transition-transform duration-300 ${activeView === "map" ? "animate-pulse" : "group-hover:rotate-12"}`}
            />
            <span className="relative">
              Nearby Patients
              {activeView === "map" && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-white/50 rounded-full animate-pulse"></div>
              )}
            </span>
          </button>
          <button
            onClick={() => setActiveView("chat")}
            className={`group flex items-center px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeView === "chat"
                ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg shadow-pink-200"
                : "bg-white/70 text-pink-600 hover:bg-white/90 hover:shadow-md"
            }`}
          >
            <MessageSquare
              className={`h-5 w-5 mr-3 transition-transform duration-300 ${activeView === "chat" ? "animate-bounce" : "group-hover:rotate-12"}`}
            />
            <span className="relative">
              Chat
              {activeView === "chat" && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-white/50 rounded-full animate-pulse"></div>
              )}
            </span>
          </button>
        </div>

        {/* Animated Content Container */}
        <div className="relative overflow-hidden rounded-2xl">
          {activeView === "map" ? (
            <div className="animate-fadeIn">
              {/* Enhanced Map Section */}
              <div className="mb-8 rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <div className="relative">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik"
                    className="w-full h-[400px] border-0"
                  ></iframe>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-pink-500" />
                      <span className="text-sm font-medium text-gray-700">
                        {dummyNearbyPatients.length} patients nearby
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Patient List */}
              <div className="space-y-4">
                {dummyNearbyPatients.map((patient, index) => (
                  <div
                    key={patient.id}
                    className="group flex items-center justify-between p-6 rounded-2xl bg-white/80 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg border border-pink-100/50"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "slideInUp 0.6s ease-out forwards",
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-300 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            patient.status === "online"
                              ? "bg-green-400 animate-pulse"
                              : patient.status === "away"
                                ? "bg-yellow-400"
                                : "bg-gray-400"
                          }`}
                        ></div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
                          {patient.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {patient.distance} away • {patient.lastActive}
                        </p>
                      </div>
                    </div>
                    <button
                      className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-xl hover:from-pink-600 hover:to-rose-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
                      onClick={() => {
                        setSelectedPatient(patient.id)
                        setActiveView("chat")
                      }}
                    >
                      <span className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>Chat</span>
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-[600px] flex flex-col animate-fadeIn">
              {/* Enhanced Chat Header */}
              {selectedPatient && (
                <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white p-4 rounded-t-2xl mb-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-semibold">
                      {dummyNearbyPatients
                        .find((p) => p.id === selectedPatient)
                        ?.name.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {dummyNearbyPatients.find((p) => p.id === selectedPatient)?.name}
                      </h3>
                      <p className="text-sm text-white/80">Online now</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Chat Messages */}
              <div className="flex-1 bg-gradient-to-b from-white/50 to-pink-50/30 backdrop-blur-sm rounded-2xl p-6 mb-4 overflow-y-auto space-y-4">
                {selectedPatient ? (
                  dummyMessages.map((msg, index) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isOwn ? "justify-end" : "justify-start"} animate-messageSlide`}
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg ${
                          msg.isOwn
                            ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white"
                            : "bg-white text-gray-800 border border-pink-100"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${msg.isOwn ? "text-white/70" : "text-gray-500"}`}>{msg.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full flex items-center justify-center mb-4 animate-pulse">
                      <MessageSquare className="h-8 w-8 text-pink-500" />
                    </div>
                    <p className="text-gray-500 text-lg font-medium">Select a patient to start chatting</p>
                    <p className="text-gray-400 text-sm mt-2">Choose from the nearby patients list</p>
                  </div>
                )}
              </div>

              {/* Enhanced Message Input */}
              <div className="flex space-x-3 p-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-100/50">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-xl bg-pink-50/50 text-gray-800 placeholder-gray-500 border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-xl hover:from-pink-600 hover:to-rose-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium group"
                >
                  <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
