import React, { useState, useEffect } from 'react';
import {
  Heart,
  Calendar,
  Target,
  Star,
  TrendingUp,
  Clock,
  Pill,
  BarChart3,
  Users,
  Activity
} from 'lucide-react';
import SeizureChart from './ui/SeizureChart';
import PhotoCarousel from './ui/PhotoCarousel';
import VideoDemo from './ui/VideoDemo';

interface QuickStat {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  color: string;
}

const Home: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const quickStats: QuickStat[] = [
    {
      title: "Days Seizure-Free",
      value: "7",
      icon: <Calendar className="w-6 h-6" />,
      trend: "+2 from last week",
      color: "text-emerald-600"
    },
    {
      title: "Medication Adherence",
      value: "98%",
      icon: <Target className="w-6 h-6" />,
      trend: "+5% this month",
      color: "text-indigo-600"
    },
    {
      title: "Mood Score",
      value: "8.2/10",
      icon: <Heart className="w-6 h-6" />,
      trend: "Stable",
      color: "text-rose-600"
    },
    {
      title: "Daily Streak",
      value: "12",
      icon: <Star className="w-6 h-6" />,
      trend: "Personal best!",
      color: "text-amber-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Hero Section with Enhanced Design */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <div className="mb-8 transform hover:scale-105 transition-all duration-700">
            <h1 className="text-7xl md:text-9xl font-bold mb-6 animate-fade-in transform hover:rotate-1 transition-all duration-500">
              <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 bg-clip-text text-transparent filter drop-shadow-2xl">
                SeizureSavvy
              </span>
            </h1>
            
            {/* Floating 3D Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-4 h-4 bg-pink-400/50 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-10 right-1/4 w-3 h-3 bg-rose-400/50 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-5 left-1/3 w-2 h-2 bg-pink-500/50 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
            </div>
          </div>
          
          <div className="relative transform hover:scale-105 transition-all duration-500">
            <p className="text-xl md:text-2xl mb-8 text-gray-700 opacity-90 animate-fade-in font-light leading-relaxed max-w-4xl mx-auto" style={{animationDelay: '0.3s'}}>
              "Every day is a victory, every moment is progress - together we build a healthier tomorrow"
            </p>
            
            {/* Health Quote */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto mb-8 border border-pink-200/50 shadow-lg">
              <p className="text-lg text-gray-600 italic mb-2">"Your health journey is unique, and every small step counts towards better wellness."</p>
              <p className="text-sm text-pink-600 font-semibold">- SeizureSavvy Health Team</p>
            </div>
            
            {/* 3D Decorative Line */}
            <div className="relative mx-auto w-64 h-2 perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-full transform rotate-x-12 animate-pulse shadow-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 rounded-full blur-sm animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Floating 3D Elements */}
        <div className="absolute top-32 left-16 transform rotate-45 hover:rotate-90 transition-transform duration-1000">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-300/40 to-rose-400/40 rounded-lg backdrop-blur-sm border border-pink-300/30 animate-bounce shadow-2xl" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="absolute top-48 right-24 transform -rotate-12 hover:rotate-12 transition-transform duration-1000">
          <div className="w-20 h-20 bg-gradient-to-br from-rose-300/40 to-pink-400/40 rounded-full backdrop-blur-sm border border-rose-300/30 animate-bounce shadow-2xl" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="absolute bottom-32 left-1/4 transform rotate-12 hover:-rotate-12 transition-transform duration-1000">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400/40 to-rose-300/40 rounded-lg backdrop-blur-sm border border-pink-400/30 animate-bounce shadow-2xl" style={{animationDelay: '3s'}}></div>
        </div>
      </div>

      {/* Health Tips Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-pink-200/50 shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Daily Wellness Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Stay Hydrated</h3>
              <p className="text-sm text-gray-600">Drink 8-10 glasses of water daily for optimal brain health</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl">
              <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Regular Exercise</h3>
              <p className="text-sm text-gray-600">Light exercise can help reduce seizure frequency</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl">
              <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Sleep Schedule</h3>
              <p className="text-sm text-gray-600">Maintain 7-9 hours of quality sleep each night</p>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Carousel Section */}
      <PhotoCarousel />

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Welcome Header with 3D Effect */}
        <div className="flex justify-between items-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-xl transform hover:scale-102 transition-all duration-300">
          <div className="transform hover:translate-x-2 transition-all duration-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Sarah!</h2>
            <p className="text-gray-600">You're doing amazing! Here's your epilepsy management overview.</p>
          </div>
          <div className="text-right transform hover:scale-110 transition-all duration-300">
            <div className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-sm text-gray-500">{currentTime.toLocaleDateString()}</div>
          </div>
        </div>

        {/* Enhanced 3D Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <div 
              key={index}
              className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 hover:border-pink-300/50 transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 perspective-1000 shadow-xl hover:shadow-pink-200/50"
              style={{
                animationDelay: `${index * 200}ms`,
                transform: 'rotateX(5deg) rotateY(5deg)'
              }}
            >
              {/* 3D Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 to-rose-100/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${
                    stat.color.includes('emerald') ? 'from-emerald-100 to-emerald-200 border border-emerald-300/50' :
                    stat.color.includes('indigo') ? 'from-indigo-100 to-indigo-200 border border-indigo-300/50' :
                    stat.color.includes('rose') ? 'from-rose-100 to-rose-200 border border-rose-300/50' :
                    'from-amber-100 to-amber-200 border border-amber-300/50'
                  } transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                    <span className={stat.color}>
                      {stat.icon}
                    </span>
                  </div>
                  <TrendingUp className="w-4 h-4 text-emerald-500 animate-pulse group-hover:scale-125 transition-all duration-300" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 group-hover:text-4xl transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-rose-600 group-hover:bg-clip-text group-hover:text-transparent">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600 mb-2 group-hover:text-gray-700 transition-colors duration-300">{stat.title}</p>
                <p className={`text-xs ${stat.color} font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300`}>
                  {stat.trend}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Seizure Tracking Chart */}
        <SeizureChart />

        {/* Enhanced Today's Overview */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-pink-200/50 shadow-xl transform hover:scale-102 transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Today's Health Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl transform hover:scale-110 hover:rotate-2 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-200/50 border border-emerald-200/50">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 group-hover:scale-125 transition-all duration-500 shadow-xl shadow-emerald-200/50">
                <Pill className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 text-xl mb-2">Medications</h3>
              <p className="text-sm text-gray-600 mb-4">2 of 2 taken today</p>
              <div className="w-full bg-emerald-200/50 rounded-full h-4 shadow-inner border border-emerald-300/50">
                <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-4 rounded-full w-full animate-pulse shadow-lg"></div>
              </div>
            </div>
            
            <div className="group text-center p-8 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl transform hover:scale-110 hover:rotate-2 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-200/50 border border-indigo-200/50">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 group-hover:scale-125 transition-all duration-500 shadow-xl shadow-indigo-200/50">
                <Activity className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 text-xl mb-2">Activity Level</h3>
              <p className="text-sm text-gray-600 mb-4">Light exercise completed</p>
              <div className="w-full bg-indigo-200/50 rounded-full h-4 shadow-inner border border-indigo-300/50">
                <div className="bg-gradient-to-r from-indigo-400 to-indigo-500 h-4 rounded-full w-3/4 animate-pulse shadow-lg"></div>
              </div>
            </div>
            
            <div className="group text-center p-8 bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl transform hover:scale-110 hover:rotate-2 transition-all duration-500 hover:shadow-xl hover:shadow-rose-200/50 border border-rose-200/50">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 group-hover:scale-125 transition-all duration-500 shadow-xl shadow-rose-200/50">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 text-xl mb-2">Wellness Score</h3>
              <p className="text-sm text-gray-600 mb-4">Excellent (8.2/10)</p>
              <div className="w-full bg-rose-200/50 rounded-full h-4 shadow-inner border border-rose-300/50">
                <div className="bg-gradient-to-r from-rose-400 to-rose-500 h-4 rounded-full w-4/5 animate-pulse shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Demo Section */}
        <VideoDemo />

        {/* Enhanced Recent Activity */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-pink-200/50 shadow-xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 flex items-center space-x-3">
            <Clock className="w-6 h-6 text-pink-500" />
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Recent Health Activity</span>
          </h3>
          
          <div className="space-y-6">
            {[
              { action: "Morning medication taken", time: "2 hours ago", type: "medication" },
              { action: "Mood & wellness entry added", time: "5 hours ago", type: "mood" },
              { action: "Weekly health report generated", time: "1 day ago", type: "report" },
              { action: "Caregiver health update sent", time: "2 days ago", type: "caregiver" }
            ].map((activity, index) => (
              <div key={index} className="group flex items-center space-x-6 p-6 bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-white/80 transition-all duration-500 transform hover:scale-105 hover:translate-x-2 hover:shadow-xl border border-pink-200/30 hover:border-pink-300/50">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl ${
                  activity.type === 'medication' ? 'bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-indigo-200/50' :
                  activity.type === 'mood' ? 'bg-gradient-to-br from-rose-400 to-rose-600 shadow-rose-200/50' :
                  activity.type === 'report' ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-200/50' :
                  'bg-gradient-to-br from-pink-400 to-pink-600 shadow-pink-200/50'
                } text-white`}>
                  {activity.type === 'medication' ? <Pill className="w-8 h-8" /> :
                   activity.type === 'mood' ? <Heart className="w-8 h-8" /> :
                   activity.type === 'report' ? <BarChart3 className="w-8 h-8" /> :
                   <Users className="w-8 h-8" />}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold text-lg group-hover:text-gray-900 transition-colors duration-300">{activity.action}</p>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{activity.time}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
