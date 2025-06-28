import React from 'react'
import { Card, CardContent } from '@/components/UI/Card'
import { TrendingUp, Calendar, Target, Award } from 'lucide-react'

const Progress: React.FC = () => {
  const progressData = [
    { label: 'Articulation', current: 75, target: 90, color: 'from-blue-500 to-blue-600' },
    { label: 'Fluency', current: 60, target: 80, color: 'from-green-500 to-green-600' },
    { label: 'Vocabulary', current: 85, target: 95, color: 'from-purple-500 to-purple-600' },
    { label: 'Confidence', current: 70, target: 85, color: 'from-orange-500 to-orange-600' },
  ]

  const weeklyStats = [
    { day: 'Mon', sessions: 3, time: 45 },
    { day: 'Tue', sessions: 2, time: 30 },
    { day: 'Wed', sessions: 4, time: 60 },
    { day: 'Thu', sessions: 1, time: 15 },
    { day: 'Fri', sessions: 3, time: 40 },
    { day: 'Sat', sessions: 2, time: 35 },
    { day: 'Sun', sessions: 0, time: 0 },
  ]

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Progress</h1>
          <p className="text-gray-600">Track your speech therapy journey and achievements</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <Target className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Practice Hours</p>
                  <p className="text-2xl font-bold text-gray-900">42.5</p>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Streak</p>
                  <p className="text-2xl font-bold text-gray-900">7 days</p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Improvement</p>
                  <p className="text-2xl font-bold text-gray-900">+23%</p>
                </div>
                <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Progress by Category */}
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Progress by Category</h2>
              <div className="space-y-6">
                {progressData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="text-sm text-gray-500">{item.current}% / {item.target}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all duration-300`}
                        style={{ width: `${(item.current / item.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">This Week's Activity</h2>
              <div className="space-y-4">
                {weeklyStats.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{day.day}</p>
                      <p className="text-sm text-gray-500">{day.sessions} sessions</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{day.time} min</p>
                      <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-gradient-to-r from-[#E94D97] to-[#A259FF] h-2 rounded-full"
                          style={{ width: `${(day.time / 60) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Progress
