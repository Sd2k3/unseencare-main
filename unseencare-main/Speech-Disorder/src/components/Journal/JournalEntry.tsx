"use client"

import type React from "react"
import { Calendar, Mic } from "lucide-react"
import { Card, CardContent } from "@/components/UI/Card"
import Button from "@/components/UI/Button"
import type { JournalEntry as JournalEntryType } from "@/types"

interface JournalEntryProps {
  entry: JournalEntryType
  onViewFull?: (entry: JournalEntryType) => void
}

/**
 * Journal Entry Component for React + Vite
 */
const JournalEntry: React.FC<JournalEntryProps> = ({ entry, onViewFull }) => {
  const handleViewFull = () => {
    if (onViewFull) {
      onViewFull(entry)
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-text-primary">{entry.title}</h3>
          <span className="text-sm text-text-secondary flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {entry.date}
          </span>
        </div>

        <p className="text-text-secondary mb-4 leading-relaxed">{entry.content}</p>

        {entry.hasRecording && (
          <div className="flex items-center gap-2 text-primary-500 mb-4">
            <Mic className="w-4 h-4" />
            <span className="text-sm">Voice recording ({entry.recordingDuration})</span>
          </div>
        )}

        <Button variant="ghost" className="px-0" onClick={handleViewFull}>
          View Full Entry
        </Button>
      </CardContent>
    </Card>
  )
}

export default JournalEntry
