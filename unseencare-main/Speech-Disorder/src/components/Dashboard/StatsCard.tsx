import type React from "react"
import { Card, CardContent } from "@/components/UI/Card"

interface StatsCardProps {
  title: string
  value: string | number
  subtitle: string
  color?: "primary" | "secondary"
  icon?: React.ReactNode
}

/**
 * Statistics Card Component for React + Vite
 */
const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle, color = "primary", icon }) => {
  const colorClasses = {
    primary: "text-primary-500",
    secondary: "text-secondary-500",
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6 text-center">
        {icon && <div className="flex justify-center mb-3">{icon}</div>}
        <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
        <div className={`text-4xl font-bold mb-2 ${colorClasses[color]}`}>{value}</div>
        <p className="text-text-secondary text-sm">{subtitle}</p>
      </CardContent>
    </Card>
  )
}

export default StatsCard
