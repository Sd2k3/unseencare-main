"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Pill,
  Clock,
  AlertCircle,
  Phone,
  MapPin,
  Shield,
  Heart,
  Calendar,
  User,
  Bell,
  Search,
  Plus,
  X,
  Check,
  ChevronRight,
} from "lucide-react"
import Sidebar from "./Sidebar"

export default function Medication() {
  // Original medication data
  const medications = [
    {
      category: "Cholinesterase Inhibitors",
      description: "Improve memory & thinking skills",
      drugs: [
        {
          name: "Donepezil (Aricept)",
          usage: "For all dementia stages",
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2830&auto=format&fit=crop",
          precautions: [
            "Take with food to reduce nausea",
            "Monitor for dizziness and slow heart rate",
            "Do not stop suddenly without consulting a doctor",
          ],
        },
        {
          name: "Rivastigmine (Exelon)",
          usage: "For mild to moderate Alzheimer's & Parkinson's dementia",
          image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2830&auto=format&fit=crop",
          precautions: [
            "Take with food to reduce nausea",
            "Monitor for dizziness and slow heart rate",
            "Do not stop suddenly without consulting a doctor",
          ],
        },
      ],
    },
    {
      category: "NMDA Receptor Antagonist",
      description: "Slows disease progression",
      drugs: [
        {
          name: "Memantine (Namenda)",
          usage: "For moderate to severe Alzheimer's",
          image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=2830&auto=format&fit=crop",
          precautions: [
            "Avoid alcohol; may worsen side effects",
            "Watch for dizziness, confusion, or headache",
            "Do not crush or split extended-release tablets",
          ],
        },
      ],
    },
  ]

  const caregivers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Primary Physician",
      contact: "(555) 123-4567",
      location: "Memorial Hospital",
      address: "123 Healthcare Ave, Medical City, MC 12345",
    },
    {
      name: "Michael Chen",
      role: "Primary Caregiver",
      contact: "(555) 987-6543",
      location: "Home Care Services",
      address: "456 Caregiver Lane, Care City, CC 67890",
    },
  ]

  // State for medication schedule data
  const [todaysMedications, setTodaysMedications] = useState([
    {
      id: 1,
      time: "8:00 AM",
      medications: ["Donepezil", "Memantine", "Omega-3"],
      status: "completed",
    },
    {
      id: 2,
      time: "12:00 PM",
      medications: ["Vitamin B12"],
      status: "pending",
    },
    {
      id: 3,
      time: "8:00 PM",
      medications: ["Memantine"],
      status: "pending",
    },
  ])

  // State for medication list
  const [medicationList, setMedicationList] = useState([
    {
      id: 1,
      name: "Donepezil",
      dosage: "10mg",
      frequency: "Once daily",
      time: "8:00 AM",
    },
    {
      id: 2,
      name: "Memantine",
      dosage: "5mg",
      frequency: "Twice daily",
      time: "8:00 AM, 8:00 PM",
    },
    {
      id: 3,
      name: "Vitamin B12",
      dosage: "1000mcg",
      frequency: "Once daily",
      time: "12:00 PM",
    },
    {
      id: 4,
      name: "Omega-3",
      dosage: "1000mg",
      frequency: "Once daily",
      time: "8:00 AM",
    },
  ])

  // State for UI
  const [activeTab, setActiveTab] = useState("Active")
  const [activeSection, setActiveSection] = useState("schedule")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddReminder, setShowAddReminder] = useState(false)
  const [showAddMedication, setShowAddMedication] = useState(false)
  const [selectedMedication, setSelectedMedication] = useState(null)
  const [filteredMedications, setFilteredMedications] = useState([])

  // Form states
  const [newReminder, setNewReminder] = useState({
    time: "",
    medications: [],
    status: "pending",
  })

  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    time: "",
  })

  // Refs
  const searchInputRef = useRef(null)

  // Calculate progress
  const completedMeds = todaysMedications.filter((med) => med.status === "completed").length
  const totalMeds = todaysMedications.length
  const progressPercentage = Math.round((completedMeds / totalMeds) * 100)

  // Filter medications based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = medicationList.filter(
        (med) =>
          med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          med.dosage.toLowerCase().includes(searchQuery.toLowerCase()) ||
          med.frequency.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredMedications(filtered)
    } else {
      setFilteredMedications([])
    }
  }, [searchQuery, medicationList])

  // Handle taking medication
  const handleTakeMedication = (id) => {
    setTodaysMedications((prev) => prev.map((med) => (med.id === id ? { ...med, status: "completed" } : med)))
  }

  // Handle adding a new reminder
  const handleAddReminder = (e) => {
    e.preventDefault()
    if (newReminder.time && newReminder.medications.length > 0) {
      const newId = todaysMedications.length > 0 ? Math.max(...todaysMedications.map((m) => m.id)) + 1 : 1

      setTodaysMedications((prev) => [
        ...prev,
        {
          id: newId,
          time: newReminder.time,
          medications: newReminder.medications,
          status: "pending",
        },
      ])

      setNewReminder({
        time: "",
        medications: [],
        status: "pending",
      })

      setShowAddReminder(false)
    }
  }

  // Handle adding a new medication
  const handleAddMedication = (e) => {
    e.preventDefault()
    if (newMedication.name && newMedication.dosage && newMedication.frequency && newMedication.time) {
      const newId = medicationList.length > 0 ? Math.max(...medicationList.map((m) => m.id)) + 1 : 1

      setMedicationList((prev) => [
        ...prev,
        {
          id: newId,
          name: newMedication.name,
          dosage: newMedication.dosage,
          frequency: newMedication.frequency,
          time: newMedication.time,
        },
      ])

      setNewMedication({
        name: "",
        dosage: "",
        frequency: "",
        time: "",
      })

      setShowAddMedication(false)
    }
  }

  // Handle selecting medication for reminder
  const handleSelectMedication = (med) => {
    if (!newReminder.medications.includes(med.name)) {
      setNewReminder((prev) => ({
        ...prev,
        medications: [...prev.medications, med.name],
      }))
    }
    setSearchQuery("")
  }

  // Handle removing medication from reminder
  const handleRemoveMedication = (medName) => {
    setNewReminder((prev) => ({
      ...prev,
      medications: prev.medications.filter((name) => name !== medName),
    }))
  }

  return (
    <>
      <div className="min-h-screen bg-[#FFF5F7] text-gray-800 pl-72 p-6 relative">
        <Sidebar />
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-[#E83E8C]">Medication</h1>
              <p className="text-gray-600 mt-2">Manage medication schedules and reminders</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-md"
              onClick={() => setShowAddReminder(true)}
            >
              <Plus size={20} />
              <span>Add Reminder</span>
            </motion.button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="flex items-center bg-white rounded-full border border-gray-200 px-4 py-2 shadow-sm">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search medications, dosages, or schedules..."
                className="w-full outline-none text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600">
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {searchQuery && filteredMedications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                >
                  <div className="p-2">
                    <h3 className="text-sm font-medium text-gray-500 mb-2 px-2">Medications</h3>
                    {filteredMedications.map((med) => (
                      <motion.div
                        key={med.id}
                        whileHover={{ backgroundColor: "#FFF0F5" }}
                        className="px-3 py-2 rounded-md cursor-pointer flex justify-between items-center"
                        onClick={() => {
                          setSelectedMedication(med)
                          setSearchQuery("")
                        }}
                      >
                        <div>
                          <div className="font-medium">{med.name}</div>
                          <div className="text-sm text-gray-500">
                            {med.dosage} - {med.frequency}
                          </div>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-4 border-b border-gray-200">
            <button
              className={`py-2 px-4 ${activeSection === "schedule" ? "border-b-2 border-[#E83E8C] text-[#E83E8C] font-medium" : "text-gray-600 hover:text-[#E83E8C]"}`}
              onClick={() => setActiveSection("schedule")}
            >
              Medication Schedule
            </button>
            <button
              className={`py-2 px-4 ${activeSection === "details" ? "border-b-2 border-[#E83E8C] text-[#E83E8C] font-medium" : "text-gray-600 hover:text-[#E83E8C]"}`}
              onClick={() => setActiveSection("details")}
            >
              Medication Details
            </button>
          </div>

          {activeSection === "schedule" ? (
            <>
              {/* Today's Medication Schedule */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#FFF0F5] rounded-full">
                    <Calendar className="h-5 w-5 text-[#E83E8C]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Today's Medication Schedule</h2>
                </div>
                <p className="text-gray-600 mb-6 ml-11">Track your medication for today</p>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Daily Progress</span>
                    <span className="font-medium">{progressPercentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                </div>

                {/* Medication Time Slots */}
                <div className="space-y-4">
                  {todaysMedications.map((slot, index) => (
                    <motion.div
                      key={slot.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border border-gray-100 rounded-lg p-4 flex items-center justify-between bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-[#FFF0F5] p-3 rounded-full">
                          <Clock className="h-5 w-5 text-[#E83E8C]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{slot.time}</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {slot.medications.map((med, i) => (
                              <span key={i} className="bg-[#FFF0F5] px-3 py-1 rounded-full text-sm text-[#E83E8C]">
                                {med}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      {slot.status === "completed" ? (
                        <div className="px-4 py-2 rounded-full bg-green-50 text-green-600 flex items-center gap-2">
                          <Check size={16} />
                          <span>Completed</span>
                        </div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 rounded-full bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] text-white shadow-sm"
                          onClick={() => handleTakeMedication(slot.id)}
                        >
                          Take Now
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Medications and Reminder Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Medications */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#FFF0F5] rounded-full">
                      <Pill className="h-5 w-5 text-[#E83E8C]" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Medications</h2>
                  </div>
                  <p className="text-gray-600 mb-6 ml-11">Manage your medication list</p>

                  {/* Tabs */}
                  <div className="grid grid-cols-2 mb-6">
                    <button
                      className={`py-3 ${activeTab === "Active" ? "bg-white border-b-2 border-[#E83E8C] text-[#E83E8C] font-medium" : "bg-gray-50 text-gray-600"}`}
                      onClick={() => setActiveTab("Active")}
                    >
                      Active
                    </button>
                    <button
                      className={`py-3 ${activeTab === "All" ? "bg-white border-b-2 border-[#E83E8C] text-[#E83E8C] font-medium" : "bg-gray-50 text-gray-600"}`}
                      onClick={() => setActiveTab("All")}
                    >
                      All Medications
                    </button>
                  </div>

                  {/* Medication List */}
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    <AnimatePresence>
                      {medicationList.map((med, index) => (
                        <motion.div
                          key={med.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border border-gray-100 rounded-lg p-4 flex justify-between items-center bg-white hover:shadow-md transition-shadow"
                        >
                          <div>
                            <h3 className="font-bold text-gray-800">{med.name}</h3>
                            <p className="text-gray-600">
                              {med.dosage} - {med.frequency}
                            </p>
                            <p className="text-gray-600">{med.time}</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-[#FFF0F5] text-[#E83E8C] rounded-md hover:bg-[#FFE0EB]"
                          >
                            Edit
                          </motion.button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Add Medication Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] text-white rounded-md shadow-sm flex items-center justify-center gap-2"
                    onClick={() => setShowAddMedication(true)}
                  >
                    <Plus size={18} />
                    Add Medication
                  </motion.button>
                </motion.div>

                {/* Reminder Settings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#FFF0F5] rounded-full">
                      <Bell className="h-5 w-5 text-[#E83E8C]" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Reminder Settings</h2>
                  </div>
                  <p className="text-gray-600 mb-6 ml-11">Configure how you receive medication reminders</p>

                  {/* Reminder Methods */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Reminder Methods</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 p-4 border border-gray-100 rounded-lg hover:bg-[#FFF0F5] hover:border-[#FFD0E0] transition-colors"
                      >
                        <Bell className="h-5 w-5 text-[#E83E8C]" />
                        <span>App Notification</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 p-4 border border-gray-100 rounded-lg hover:bg-[#FFF0F5] hover:border-[#FFD0E0] transition-colors"
                      >
                        <Bell className="h-5 w-5 text-[#E83E8C]" />
                        <span>Voice Reminder</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Reminder Timing */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Reminder Timing</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 p-4 border border-gray-100 rounded-lg hover:bg-[#FFF0F5] hover:border-[#FFD0E0] transition-colors"
                      >
                        <Clock className="h-5 w-5 text-[#E83E8C]" />
                        <span>5 minutes before</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 p-4 border border-gray-100 rounded-lg hover:bg-[#FFF0F5] hover:border-[#FFD0E0] transition-colors"
                      >
                        <Clock className="h-5 w-5 text-[#E83E8C]" />
                        <span>At scheduled time</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 p-4 border border-gray-100 rounded-lg hover:bg-[#FFF0F5] hover:border-[#FFD0E0] transition-colors"
                      >
                        <Clock className="h-5 w-5 text-[#E83E8C]" />
                        <span>15 minutes after</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 p-4 border border-gray-100 rounded-lg hover:bg-[#FFF0F5] hover:border-[#FFD0E0] transition-colors"
                      >
                        <Clock className="h-5 w-5 text-[#E83E8C]" />
                        <span>Custom...</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Caregiver Alerts */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Caregiver Alerts</h3>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 p-4 w-full border border-gray-100 rounded-lg hover:bg-[#FFF0F5] hover:border-[#FFD0E0] transition-colors"
                    >
                      <Bell className="h-5 w-5 text-[#E83E8C]" />
                      <span>Alert if medication missed</span>
                    </motion.button>
                  </div>

                  {/* Save Settings Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] text-white rounded-md shadow-sm"
                  >
                    Save Settings
                  </motion.button>
                </motion.div>
              </div>
            </>
          ) : (
            <>
              {/* Medication Categories */}
              <div className="space-y-12">
                {medications.map((category, categoryIndex) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                      <Shield className="h-6 w-6 text-[#E83E8C]" />
                      <span>{category.category}</span>
                    </h2>
                    <p className="text-gray-600 ml-8">{category.description}</p>

                    <div className="space-y-8">
                      {category.drugs.map((drug, index) => (
                        <motion.div
                          key={drug.name}
                          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                        >
                          <div
                            className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 0 ? "" : "lg:flex-row-reverse"}`}
                          >
                            <div className="p-6 space-y-4">
                              <h3 className="text-xl font-semibold text-gray-800">{drug.name}</h3>
                              <p className="text-[#E83E8C] font-medium">{drug.usage}</p>
                              <div className="space-y-3">
                                <h4 className="font-medium text-gray-800 flex items-center space-x-2">
                                  <AlertCircle className="h-5 w-5 text-[#E83E8C]" />
                                  <span>Precautions:</span>
                                </h4>
                                <ul className="space-y-2 ml-7">
                                  {drug.precautions.map((precaution, i) => (
                                    <li key={i} className="text-gray-600 flex items-start space-x-2">
                                      <span className="text-[#E83E8C] mt-1">•</span>
                                      <span>{precaution}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="relative h-64 lg:h-auto">
                              <img
                                src={drug.image || "/placeholder.svg"}
                                alt={drug.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Caregiver Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] rounded-2xl p-8 text-white shadow-md"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                  <Heart className="h-6 w-6" />
                  <span>Caregiver Information</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {caregivers.map((caregiver, index) => (
                    <motion.div
                      key={caregiver.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4"
                    >
                      <div className="flex items-center space-x-3">
                        <User className="h-6 w-6" />
                        <h3 className="text-xl font-semibold">{caregiver.name}</h3>
                      </div>
                      <p className="text-pink-100">{caregiver.role}</p>
                      <div className="space-y-2">
                        <p className="flex items-center space-x-2">
                          <Phone className="h-5 w-5" />
                          <span>{caregiver.contact}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <MapPin className="h-5 w-5" />
                          <span>{caregiver.location}</span>
                        </p>
                        <p className="text-sm text-pink-100 ml-7">{caregiver.address}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Add Reminder Modal */}
      <AnimatePresence>
        {showAddReminder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddReminder(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Add Medication Reminder</h2>
                <button className="text-gray-400 hover:text-gray-600" onClick={() => setShowAddReminder(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddReminder} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E83E8C] focus:border-transparent"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder((prev) => ({ ...prev, time: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medications</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search medications..."
                      className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E83E8C] focus:border-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {/* Search Results */}
                    {searchQuery && filteredMedications.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-40 overflow-y-auto">
                        {filteredMedications.map((med) => (
                          <div
                            key={med.id}
                            className="px-3 py-2 hover:bg-[#FFF0F5] cursor-pointer"
                            onClick={() => handleSelectMedication(med)}
                          >
                            {med.name} ({med.dosage})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Selected Medications */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newReminder.medications.map((med, index) => (
                      <div
                        key={index}
                        className="bg-[#FFF0F5] px-3 py-1 rounded-full text-sm text-[#E83E8C] flex items-center gap-1"
                      >
                        {med}
                        <button
                          type="button"
                          onClick={() => handleRemoveMedication(med)}
                          className="hover:text-[#D81B60]"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowAddReminder(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] text-white rounded-md shadow-sm"
                  >
                    Add Reminder
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Medication Modal */}
      <AnimatePresence>
        {showAddMedication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddMedication(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Add New Medication</h2>
                <button className="text-gray-400 hover:text-gray-600" onClick={() => setShowAddMedication(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddMedication} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E83E8C] focus:border-transparent"
                    value={newMedication.name}
                    onChange={(e) => setNewMedication((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E83E8C] focus:border-transparent"
                    value={newMedication.dosage}
                    onChange={(e) => setNewMedication((prev) => ({ ...prev, dosage: e.target.value }))}
                    required
                    placeholder="e.g. 10mg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <select
                    className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E83E8C] focus:border-transparent"
                    value={newMedication.frequency}
                    onChange={(e) => setNewMedication((prev) => ({ ...prev, frequency: e.target.value }))}
                    required
                  >
                    <option value="">Select frequency</option>
                    <option value="Once daily">Once daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Three times daily">Three times daily</option>
                    <option value="Every other day">Every other day</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E83E8C] focus:border-transparent"
                    value={newMedication.time}
                    onChange={(e) => setNewMedication((prev) => ({ ...prev, time: e.target.value }))}
                    required
                    placeholder="e.g. 8:00 AM, 8:00 PM"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowAddMedication(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] text-white rounded-md shadow-sm"
                  >
                    Add Medication
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Medication Detail Modal */}
      <AnimatePresence>
        {selectedMedication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMedication(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">{selectedMedication.name}</h2>
                <button className="text-gray-400 hover:text-gray-600" onClick={() => setSelectedMedication(null)}>
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-[#FFF0F5] p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Dosage</p>
                      <p className="font-medium text-gray-800">{selectedMedication.dosage}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Frequency</p>
                      <p className="font-medium text-gray-800">{selectedMedication.frequency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium text-gray-800">{selectedMedication.time}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50"
                    onClick={() => setSelectedMedication(null)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] text-white rounded-md shadow-sm"
                    onClick={() => {
                      // Add to reminder logic
                      if (!newReminder.medications.includes(selectedMedication.name)) {
                        setNewReminder((prev) => ({
                          ...prev,
                          medications: [...prev.medications, selectedMedication.name],
                        }))
                      }
                      setSelectedMedication(null)
                      setShowAddReminder(true)
                    }}
                  >
                    Add to Reminder
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

