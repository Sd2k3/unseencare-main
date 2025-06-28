"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Variants } from "framer-motion"
import { Card, CardContent } from "@/components/UI/Card"
import  Button  from "@/components/UI/Button"
import { Input } from "@/components/UI/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/UI/Select"
import { Switch } from "@/components/UI/Switch"
import { Label } from "@/components/UI/Label"
import { Textarea } from "@/components/UI/Textarea"
import {
  User,
  Bell,
  Shield,
  Palette,
  Volume2,
  Globe,
  Edit3,
  Save,
  RotateCcw,
  Check,
  X,
  AlertCircle,
  Download,
  Upload,
  Trash2,
} from "lucide-react"
import { cn } from "../utils/cn"

interface SettingItem {
  id: string
  label: string
  value: string | boolean | number
  type: "text" | "email" | "number" | "select" | "boolean" | "textarea"
  options?: string[]
  editable: boolean
  description?: string
}

interface SettingSection {
  title: string
  icon: any
  color: string
  items: SettingItem[]
}

const Settings: React.FC = () => {
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set())
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [tempValues, setTempValues] = useState<Record<string, any>>({})

  const [settingsSections, setSettingsSections] = useState<SettingSection[]>([
    {
      title: "Profile",
      icon: User,
      color: "from-pink-500 to-rose-400",
      items: [
        {
          id: "name",
          label: "Full Name",
          value: "Sarah Johnson",
          type: "text",
          editable: true,
          description: "Your display name",
        },
        {
          id: "email",
          label: "Email Address",
          value: "sarah.johnson@email.com",
          type: "email",
          editable: true,
          description: "Primary contact email",
        },
        { id: "age", label: "Age", value: 28, type: "number", editable: true, description: "Your current age" },
        {
          id: "therapist",
          label: "Assigned Therapist",
          value: "Dr. Michael Chen",
          type: "text",
          editable: false,
          description: "Your current therapist",
        },
        {
          id: "bio",
          label: "Bio",
          value: "Speech therapy patient working on articulation and fluency.",
          type: "textarea",
          editable: true,
          description: "Brief description about yourself",
        },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      color: "from-rose-500 to-pink-400",
      items: [
        {
          id: "practice_reminders",
          label: "Practice Reminders",
          value: true,
          type: "boolean",
          editable: true,
          description: "Daily practice notifications",
        },
        {
          id: "reminder_time",
          label: "Reminder Time",
          value: "09:00",
          type: "select",
          options: ["07:00", "08:00", "09:00", "10:00", "11:00", "18:00", "19:00", "20:00"],
          editable: true,
          description: "When to send reminders",
        },
        {
          id: "session_alerts",
          label: "Session Alerts",
          value: "30",
          type: "select",
          options: ["15", "30", "60"],
          editable: true,
          description: "Minutes before session",
        },
        {
          id: "progress_updates",
          label: "Progress Updates",
          value: "weekly",
          type: "select",
          options: ["daily", "weekly", "monthly"],
          editable: true,
          description: "Frequency of progress reports",
        },
        {
          id: "achievements",
          label: "Achievement Notifications",
          value: true,
          type: "boolean",
          editable: true,
          description: "Celebrate your milestones",
        },
      ],
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      color: "from-pink-400 to-peach-400",
      items: [
        {
          id: "data_sharing",
          label: "Data Sharing",
          value: "therapist_only",
          type: "select",
          options: ["none", "therapist_only", "research_anonymous"],
          editable: true,
          description: "Who can access your data",
        },
        {
          id: "voice_storage",
          label: "Voice Recording Storage",
          value: "local",
          type: "select",
          options: ["local", "cloud_encrypted", "none"],
          editable: true,
          description: "Where to store recordings",
        },
        {
          id: "analytics",
          label: "Usage Analytics",
          value: true,
          type: "boolean",
          editable: true,
          description: "Help improve the app",
        },
        {
          id: "two_factor",
          label: "Two-Factor Authentication",
          value: false,
          type: "boolean",
          editable: true,
          description: "Extra security for your account",
        },
      ],
    },
    {
      title: "Appearance",
      icon: Palette,
      color: "from-peach-500 to-orange-400",
      items: [
        {
          id: "theme",
          label: "Theme",
          value: "light",
          type: "select",
          options: ["light", "dark", "auto"],
          editable: true,
          description: "App appearance",
        },
        {
          id: "font_size",
          label: "Font Size",
          value: "medium",
          type: "select",
          options: ["small", "medium", "large", "extra_large"],
          editable: true,
          description: "Text size throughout app",
        },
        {
          id: "color_scheme",
          label: "Color Scheme",
          value: "pink_peach",
          type: "select",
          options: ["pink_peach", "blue_teal", "green_mint", "purple_lavender"],
          editable: true,
          description: "App color theme",
        },
        {
          id: "animations",
          label: "Animations",
          value: true,
          type: "boolean",
          editable: true,
          description: "Enable smooth animations",
        },
        {
          id: "high_contrast",
          label: "High Contrast",
          value: false,
          type: "boolean",
          editable: true,
          description: "Better visibility",
        },
      ],
    },
    {
      title: "Audio",
      icon: Volume2,
      color: "from-orange-400 to-peach-400",
      items: [
        {
          id: "mic_sensitivity",
          label: "Microphone Sensitivity",
          value: "medium",
          type: "select",
          options: ["low", "medium", "high"],
          editable: true,
          description: "Recording sensitivity level",
        },
        {
          id: "playback_speed",
          label: "Playback Speed",
          value: "1.0",
          type: "select",
          options: ["0.5", "0.75", "1.0", "1.25", "1.5", "2.0"],
          editable: true,
          description: "Audio playback rate",
        },
        {
          id: "noise_filter",
          label: "Background Noise Filter",
          value: true,
          type: "boolean",
          editable: true,
          description: "Reduce background noise",
        },
        {
          id: "voice_enhancement",
          label: "Voice Enhancement",
          value: false,
          type: "boolean",
          editable: true,
          description: "Improve audio clarity",
        },
        {
          id: "volume",
          label: "Master Volume",
          value: 75,
          type: "number",
          editable: true,
          description: "Overall app volume (0-100)",
        },
      ],
    },
    {
      title: "Language & Region",
      icon: Globe,
      color: "from-peach-400 to-pink-400",
      items: [
        {
          id: "language",
          label: "Language",
          value: "english",
          type: "select",
          options: ["english", "spanish", "french", "german", "italian"],
          editable: true,
          description: "App language",
        },
        {
          id: "region",
          label: "Region",
          value: "united_states",
          type: "select",
          options: ["united_states", "canada", "united_kingdom", "australia", "other"],
          editable: true,
          description: "Your location",
        },
        {
          id: "timezone",
          label: "Time Zone",
          value: "EST",
          type: "select",
          options: ["EST", "CST", "MST", "PST", "GMT", "CET"],
          editable: true,
          description: "Your time zone",
        },
        {
          id: "date_format",
          label: "Date Format",
          value: "MM/DD/YYYY",
          type: "select",
          options: ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"],
          editable: true,
          description: "How dates are displayed",
        },
      ],
    },
  ])

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("unseencare_settings")
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettingsSections(parsed)
      } catch (error) {
        console.error("Failed to load saved settings:", error)
      }
    }
  }, [])

  // Save settings to localStorage
  const saveToLocalStorage = (sections: SettingSection[]) => {
    try {
      localStorage.setItem("unseencare_settings", JSON.stringify(sections))
    } catch (error) {
      console.error("Failed to save settings:", error)
    }
  }

  const handleEdit = (sectionIndex: number, itemId: string) => {
    const itemKey = `${sectionIndex}-${itemId}`
    setEditingItem(itemKey)

    // Store current value as temp value
    const currentValue = settingsSections[sectionIndex].items.find((item) => item.id === itemId)?.value
    setTempValues((prev) => ({ ...prev, [itemKey]: currentValue }))

    setSavedItems((prev) => {
      const newSet = new Set(prev)
      newSet.delete(itemKey)
      return newSet
    })
  }

  const handleSave = (sectionIndex: number, itemId: string) => {
    const itemKey = `${sectionIndex}-${itemId}`
    const tempValue = tempValues[itemKey]

    if (tempValue !== undefined) {
      // Update the actual settings
      const newSections = [...settingsSections]
      const itemIndex = newSections[sectionIndex].items.findIndex((item) => item.id === itemId)
      if (itemIndex !== -1) {
        newSections[sectionIndex].items[itemIndex].value = tempValue
        setSettingsSections(newSections)
        setHasUnsavedChanges(true)
      }
    }

    setEditingItem(null)
    setSavedItems((prev) => new Set(prev).add(itemKey))

    // Remove saved state after 2 seconds
    setTimeout(() => {
      setSavedItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(itemKey)
        return newSet
      })
    }, 2000)
  }

  const handleCancel = (sectionIndex: number, itemId: string) => {
    const itemKey = `${sectionIndex}-${itemId}`
    setEditingItem(null)
    setTempValues((prev) => {
      const newTemp = { ...prev }
      delete newTemp[itemKey]
      return newTemp
    })
  }

  const handleTempValueChange = (itemKey: string, value: any) => {
    setTempValues((prev) => ({ ...prev, [itemKey]: value }))
  }

  const handleSaveAll = () => {
    saveToLocalStorage(settingsSections)
    setHasUnsavedChanges(false)

    // Show success message
    setSavedItems(new Set(["all"]))
    setTimeout(() => {
      setSavedItems(new Set())
    }, 3000)
  }

  const handleReset = () => {
    setShowResetConfirm(false)
    // Reset to default values (you can customize these)
    const defaultSections = [...settingsSections] // You would set actual defaults here
    setSettingsSections(defaultSections)
    setHasUnsavedChanges(true)
    localStorage.removeItem("unseencare_settings")
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(settingsSections, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "unseencare_settings.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string)
          setSettingsSections(imported)
          setHasUnsavedChanges(true)
        } catch (error) {
          alert("Invalid settings file")
        }
      }
      reader.readAsText(file)
    }
  }

  const renderEditableField = (item: SettingItem, sectionIndex: number) => {
    const itemKey = `${sectionIndex}-${item.id}`
    const isEditing = editingItem === itemKey
    const tempValue = tempValues[itemKey] ?? item.value

    if (!isEditing) {
      return (
        <p className="text-sm text-gray-500 truncate">
          {item.type === "boolean"
            ? item.value
              ? "Enabled"
              : "Disabled"
            : item.type === "select" && item.options
              ? item.options.find((opt) => opt === item.value) || String(item.value)
              : String(item.value)}
        </p>
      )
    }

    switch (item.type) {
      case "boolean":
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={tempValue as boolean}
              onCheckedChange={(checked) => handleTempValueChange(itemKey, checked)}
            />
            <Label className="text-sm">{tempValue ? "Enabled" : "Disabled"}</Label>
          </div>
        )

      case "select":
        return (
          <Select value={String(tempValue)} onValueChange={(value) => handleTempValueChange(itemKey, value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {item.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "textarea":
        return (
          <Textarea
            value={String(tempValue)}
            onChange={(e) => handleTempValueChange(itemKey, e.target.value)}
            className="w-full min-h-[80px]"
            placeholder={item.description}
          />
        )

      case "number":
        return (
          <Input
            type="number"
            value={String(tempValue)}
            onChange={(e) => handleTempValueChange(itemKey, Number(e.target.value))}
            className="w-full"
            min={item.id === "volume" ? 0 : undefined}
            max={item.id === "volume" ? 100 : undefined}
          />
        )

      default:
        return (
          <Input
            type={item.type}
            value={String(tempValue)}
            onChange={(e) => handleTempValueChange(itemKey, e.target.value)}
            className="w-full"
            placeholder={item.description}
          />
        )
    }
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-peach-50 to-rose-50 p-4 md:p-6 lg:p-8">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-peach-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-rose-200/30 to-pink-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8 text-center md:text-left"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-peach-500 bg-clip-text text-transparent mb-3">
            Settings
          </h1>
          <p className="text-gray-600 text-lg">Customize your speech therapy experience</p>

          {hasUnsavedChanges && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg border border-amber-200 inline-flex"
            >
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">You have unsaved changes</span>
            </motion.div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="mb-8 flex flex-wrap gap-4 justify-center md:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="border-pink-200 text-pink-600 hover:bg-pink-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Settings
          </Button>

          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button variant="outline" size="sm" className="border-pink-200 text-pink-600 hover:bg-pink-50">
              <Upload className="w-4 h-4 mr-2" />
              Import Settings
            </Button>
          </div>
        </motion.div>

        {/* Settings Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {settingsSections.map((section: SettingSection, sectionIndex: number) => (
            <motion.div key={sectionIndex} variants={cardVariants}>
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <CardContent className="p-6 md:p-8">
                  {/* Section Header */}
                  <motion.div
                    className={cn(
                      "flex items-center gap-4 mb-6"
                    )}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <motion.div
                      className={cn(
                        "w-12 h-12 bg-gradient-to-r rounded-2xl flex items-center justify-center text-white shadow-lg",
                        section.color,
                      )}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 10px 30px rgba(236, 72, 153, 0.3)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <section.icon className="w-6 h-6" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-peach-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {section.title}
                    </h2>
                  </motion.div>

                  {/* Settings Items */}
                  <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                    {section.items.map((item: SettingItem, itemIndex: number) => {
                      const itemKey = `${sectionIndex}-${item.id}`
                      const isEditing = editingItem === itemKey
                      const isSaved = savedItems.has(itemKey)

                      return (
                        <motion.div key={itemIndex} variants={itemVariants} className="group/item">
                          <motion.div
                            className={cn(
                              "p-4 rounded-xl transition-all duration-300 border",
                              isEditing
                                ? "bg-gradient-to-r from-pink-50 to-peach-50 border-pink-200 shadow-md"
                                : isSaved
                                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-md"
                                  : "bg-gray-50/50 border-gray-100 hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-peach-50/50 hover:border-pink-200/50",
                            )}
                            whileHover={{ scale: 1.01, x: 4 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-semibold text-gray-900 truncate">{item.label}</p>
                                  {item.description && (
                                    <div className="group/tooltip relative">
                                      <AlertCircle className="w-4 h-4 text-gray-400 cursor-help" />
                                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                        {item.description}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div className="mt-2">{renderEditableField(item, sectionIndex)}</div>
                              </div>

                              {item.editable && (
                                <div className="flex items-center gap-2">
                                  <AnimatePresence mode="wait">
                                    {isSaved ? (
                                      <motion.div
                                        key="saved"
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0, rotate: 180 }}
                                        className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center text-white shadow-lg"
                                      >
                                        <Check className="w-5 h-5" />
                                      </motion.div>
                                    ) : isEditing ? (
                                      <motion.div
                                        key="editing"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="flex gap-2"
                                      >
                                        <motion.button
                                          onClick={() => handleSave(sectionIndex, item.id)}
                                          className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg"
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.95 }}
                                        >
                                          <Check className="w-4 h-4" />
                                        </motion.button>
                                        <motion.button
                                          onClick={() => handleCancel(sectionIndex, item.id)}
                                          className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-400 hover:from-gray-600 hover:to-gray-500 rounded-full flex items-center justify-center text-white shadow-lg"
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.95 }}
                                        >
                                          <X className="w-4 h-4" />
                                        </motion.button>
                                      </motion.div>
                                    ) : (
                                      <motion.button
                                        key="edit"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        onClick={() => handleEdit(sectionIndex, item.id)}
                                        className="w-10 h-10 bg-gradient-to-r from-pink-500 to-peach-400 hover:from-pink-600 hover:to-peach-500 rounded-full flex items-center justify-center text-white shadow-lg opacity-0 group-hover/item:opacity-100 transition-all duration-200"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        <Edit3 className="w-4 h-4" />
                                      </motion.button>
                                    )}
                                  </AnimatePresence>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 300, damping: 25 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={handleSaveAll}
              disabled={!hasUnsavedChanges}
              className={cn(
                "px-8 py-3 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300",
                hasUnsavedChanges
                  ? "bg-gradient-to-r from-pink-500 to-peach-400 hover:from-pink-600 hover:to-peach-500 text-white"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed",
              )}
            >
              <Save className="w-5 h-5 mr-2" />
              {savedItems.has("all") ? "Settings Saved!" : "Save All Changes"}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowResetConfirm(true)}
              className="border-2 border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg font-semibold"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset to Default
            </Button>
          </motion.div>
        </motion.div>

        {/* Reset Confirmation Modal */}
        <AnimatePresence>
          {showResetConfirm && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetConfirm(false)}
            >
              <motion.div
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Reset Settings?</h3>
                  <p className="text-gray-600 mb-6">
                    This will reset all your settings to their default values. This action cannot be undone.
                  </p>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setShowResetConfirm(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button
                      onClick={handleReset}
                      className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
                    >
                      Reset All
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Settings
