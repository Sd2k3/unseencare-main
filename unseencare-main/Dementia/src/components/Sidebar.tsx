import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import {
  Brain,
  Home,
  Camera,
  Map,
  Gamepad2,
  MessageCircle,
  Calendar,
  Pill,
  Smile,
  Clock,
  Settings,
  Music,
  Mic,
  NotebookIcon
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
}

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard', path: '/', gradient: 'from-violet-900 to-purple-600' },
    { icon: Camera, label: 'Recognition', id: 'recognition', path: '/recognition', gradient: 'from-purple-900 to-indigo-500' },
    { icon: Map, label: 'Safety Zones', id: 'safety', path: '/safety-zones', gradient: 'from-indigo-900 to-blue-500' },
    { icon: Gamepad2, label: 'Activities', id: 'activities', path: '/activities', gradient: 'from-blue-900 to-cyan-500' },
    { icon: MessageCircle, label: 'Chat', id: 'chat', path: '/chat', gradient: 'from-cyan-500 to-teal-500' },
    { icon: NotebookIcon, label: 'Albums', id: 'Albums', path: '/albums', gradient: 'from-teal-500 to-cyan-500' },
    { icon: Pill, label: 'Medication', id: 'medication', path: '/medication', gradient: 'from-emerald-500 to-green-500' },
    { icon: Smile, label: 'Journal', id: 'mood', path: '/journal', gradient: 'from-rose-500 to-pink-500' },
    { icon: Clock, label: 'Reminders', id: 'reminders', path: '/reminders', gradient: 'from-pink-500 to-fuchsia-500' },
    { icon: Music, label: 'Music Therapy', id: 'music', path: '/music-therapy', gradient: 'from-fuchsia-500 to-purple-500' },

    { icon: Settings, label: 'Settings', id: 'settings', path: '/settings', gradient: 'from-gray-500 to-slate-500' },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full w-72 ${
        'bg-white/95'
      } shadow-xl overflow-y-auto border-r backdrop-blur-md ${
       'border-gray-300'
      }`}
    >
      <div className="sticky top-0 z-10 p-6 border-b border-gray-100/10 backdrop-blur-xl bg-opacity-90">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/20">
              <Brain className="h-6 w-6 text-white animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Dementia Cure
            </h1>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10"
              }
            }}
          />
          <SignInButton mode="modal">
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
              Sign in
            </button>
          </SignInButton>
        </div>
      </div>

      <nav className="p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`
                  block w-full group relative
                  ${isActive ? 'scale-[1.02]' : ''}
                `}
              >
                <div
                  className={`
                    absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                    transition-opacity duration-300 bg-gradient-to-r ${item.gradient}
                    opacity-20
                  `}
                />
                <div
                  className={`
                    relative flex items-center px-4 py-3 rounded-xl
                    transition-all duration-300 ease-out
                    group-hover:bg-opacity-10
                    ${
                      isActive
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }
                  `}
                >
                  <item.icon className={`
                    h-5 w-5 mr-3
                    transition-all duration-300
                    group-hover:scale-110 group-hover:rotate-3
                    ${isActive ? 'text-white' : 'group-hover:text-current'}
                  `} />
                  <span className="font-medium text-sm">{item.label}</span>
                  {isActive && (
                    <div className="absolute right-2 w-2 h-2 rounded-full bg-white/50" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}