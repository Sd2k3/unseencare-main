import React, { useState } from 'react';
import { 
  Home, 
  Activity, 
  Pill, 
  Shield, 
  BookOpen, 
  Users, 
  Award, 
  Brain, 
  BarChart3,
  Heart,
  Settings,
  User,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { ActivePage } from '../App';

interface SidebarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

interface NavItem {
  id: ActivePage;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />,
      color: 'from-pink-400 to-rose-500'
    },
    {
      id: 'seizure-tracker',
      label: 'Seizure Tracker',
      icon: <Activity className="w-5 h-5" />,
      color: 'from-rose-400 to-pink-500'
    },
    {
      id: 'medication-reminders',
      label: 'Medication Reminders',
      icon: <Pill className="w-5 h-5" />,
      color: 'from-pink-400 to-rose-500'
    },
    {
      id: 'emergency-sos',
      label: 'Emergency SOS',
      icon: <Shield className="w-5 h-5" />,
      color: 'from-red-400 to-rose-500'
    },
    {
      id: 'mood-trigger-diary',
      label: 'Mood & Trigger Diary',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'caregiver-dashboard',
      label: 'Caregiver Dashboard',
      icon: <Users className="w-5 h-5" />,
      color: 'from-indigo-400 to-purple-500'
    },
    {
      id: 'daily-streaks',
      label: 'Daily Streaks & Rewards',
      icon: <Award className="w-5 h-5" />,
      color: 'from-amber-400 to-orange-500'
    },
    {
      id: 'mental-health-tools',
      label: 'Mental Health Tools',
      icon: <Brain className="w-5 h-5" />,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'progress-reports',
      label: 'Progress Reports',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'from-blue-400 to-indigo-500'
    }
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed lg:hidden z-50 top-4 left-4 p-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white/80 backdrop-blur-md border-r border-pink-200/50 z-40 transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Header */}
        <div className="p-6 border-b border-pink-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">EpiCare</h1>
              <p className="text-sm text-gray-600">Support Platform</p>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation */}
        <div className="h-[calc(100vh-180px)] overflow-y-auto py-4 px-2">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-left group ${
                  activePage === item.id
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg transform scale-[1.02]`
                    : 'text-gray-700 hover:bg-pink-50 hover:text-pink-700 hover:transform hover:scale-[1.02]'
                }`}
              >
                <div className={`p-1 rounded-lg ${
                  activePage === item.id 
                    ? 'bg-white/20' 
                    : 'bg-pink-100 group-hover:bg-pink-200'
                }`}>
                  {item.icon}
                </div>
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-pink-200/50 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center space-x-3 p-3 bg-pink-50 rounded-xl">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Sarah Johnson</p>
              <p className="text-xs text-gray-600">Patient</p>
            </div>
            <div className="flex space-x-1">
              <button className="p-1 text-gray-600 hover:bg-pink-100 rounded">
                <Bell className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-600 hover:bg-pink-100 rounded">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;