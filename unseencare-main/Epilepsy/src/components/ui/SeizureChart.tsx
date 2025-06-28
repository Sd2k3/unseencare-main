import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingDown, BarChart3, Activity } from 'lucide-react';

const SeizureChart: React.FC = () => {
  const seizureData = [
    { month: 'Jan', seizures: 4, medications: 98 },
    { month: 'Feb', seizures: 2, medications: 95 },
    { month: 'Mar', seizures: 1, medications: 100 },
    { month: 'Apr', seizures: 3, medications: 92 },
    { month: 'May', seizures: 1, medications: 98 },
    { month: 'Jun', seizures: 0, medications: 100 },
  ];

  const moodData = [
    { name: 'Excellent', value: 30, color: '#10B981' },
    { name: 'Good', value: 45, color: '#3B82F6' },
    { name: 'Fair', value: 20, color: '#F59E0B' },
    { name: 'Poor', value: 5, color: '#EF4444' },
  ];

  return (
    <div className="space-y-6">
      {/* Charts Header */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center space-x-2">
          <BarChart3 className="w-6 h-6 text-purple-500" />
          <span>Seizure Tracking Dashboard</span>
        </h2>
        <p className="text-gray-600">Monitor your progress and identify patterns</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seizure Frequency Chart */}
        <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Seizure Frequency</h3>
            <TrendingDown className="w-5 h-5 text-green-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={seizureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    border: '1px solid #e0e7ff',
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="seizures" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#8b5cf6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-green-600 font-medium mt-2">↓ 75% reduction this month!</p>
        </div>

        {/* Medication Adherence Chart */}
        <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Medication Adherence</h3>
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={seizureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    border: '1px solid #e0e7ff',
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)'
                  }} 
                />
                <Bar 
                  dataKey="medications" 
                  fill="url(#colorGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-blue-600 font-medium mt-2">Average: 97.2% adherence</p>
        </div>
      </div>

      {/* Mood Distribution Chart */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 hover:shadow-2xl transition-all duration-500">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Mood Distribution (Last 30 Days)</h3>
        <div className="flex flex-col md:flex-row items-center">
          <div className="h-64 w-full md:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {moodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 space-y-3">
            {moodData.map((mood, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: mood.color }}
                ></div>
                <span className="text-gray-700 font-medium">{mood.name}</span>
                <span className="text-gray-500">{mood.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeizureChart;
