import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { Brain, Home, Camera, Map, Gamepad2, MessageCircle, Pill, Smile, Clock, Settings, Music, NotebookIcon, HomeIcon } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard', path: '/', gradient: 'from-pink-500 to-rose-400' },
    { icon: Camera, label: 'Recognition', id: 'recognition', path: '/recognition', gradient: 'from-rose-500 to-pink-400' },
    { icon: Map, label: 'Safety Zones', id: 'safety', path: '/safety-zones', gradient: 'from-pink-400 to-peach-400' },
    { icon: Gamepad2, label: 'Activities', id: 'activities', path: '/activities', gradient: 'from-peach-400 to-orange-300' },
    { icon: MessageCircle, label: 'Chat', id: 'chat', path: '/chat', gradient: 'from-orange-300 to-amber-300' },
    { icon: NotebookIcon, label: 'Albums', id: 'Albums', path: '/albums', gradient: 'from-amber-300 to-yellow-300' },
    { icon: Pill, label: 'Medication', id: 'medication', path: '/medication', gradient: 'from-pink-600 to-rose-500' },
    { icon: Smile, label: 'Journal', id: 'mood', path: '/journal', gradient: 'from-rose-400 to-pink-500' },
    { icon: Clock, label: 'Reminders', id: 'reminders', path: '/reminders', gradient: 'from-pink-500 to-fuchsia-400' },
    { icon: Music, label: 'Music Therapy', id: 'music', path: '/music-therapy', gradient: 'from-fuchsia-400 to-pink-400' },
    { icon: Settings, label: 'Settings', id: 'settings', path: '/settings', gradient: 'from-gray-400 to-pink-300' },
    { icon: HomeIcon, label: 'Go to back to Home', id: 'reminders', path: '/', gradient: 'from-pink-500 to-fuchsia-400' },

  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full w-72 bg-gradient-to-br from-pink-50/95 via-peach-50/95 to-rose-50/95 shadow-xl overflow-y-auto border-r backdrop-blur-md border-pink-200/50`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/30 to-peach-100/30"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,114,182,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 sticky top-0 p-6 border-b border-pink-200/30 backdrop-blur-xl bg-gradient-to-r from-pink-50/90 to-peach-50/90">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-pink-500 to-peach-500 shadow-lg shadow-pink-500/30">
              <Brain className="h-6 w-6 text-white animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-peach-500">
              UnseenCare
            </h1>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10 ring-2 ring-pink-300/50"
              }
            }}
          />
         
        </div>
      </div>

      <nav className="relative z-10 p-4">
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
                    absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20
                    transition-all duration-300 bg-gradient-to-r ${item.gradient}
                  `}
                />
                <div
                  className={`
                    relative flex items-center px-4 py-3 rounded-xl
                    transition-all duration-300 ease-out
                    backdrop-blur-sm border border-transparent
                    ${
                      isActive
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-pink-200/50 border-pink-300/30`
                        : 'text-gray-700 hover:text-gray-900 hover:bg-pink-50/50 hover:border-pink-200/30 hover:shadow-md hover:shadow-pink-100/50'
                    }
                  `}
                >
                  <item.icon className={`
                    h-5 w-5 mr-3
                    transition-all duration-300
                    group-hover:scale-110 group-hover:rotate-3
                    ${isActive ? 'text-white drop-shadow-sm' : 'group-hover:text-pink-600'}
                  `} />
                  <span className={`font-medium text-sm ${isActive ? 'drop-shadow-sm' : ''}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute right-3 w-2 h-2 rounded-full bg-white/70 animate-pulse" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating Decorative Elements */}
      <div className="absolute bottom-10 left-6 w-3 h-3 bg-pink-300/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-16 right-8 w-2 h-2 bg-peach-300/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-32 right-6 w-4 h-4 bg-rose-300/40 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
      
      {/* Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-pink-50/80 to-transparent pointer-events-none"></div>
    </div>
  );
}
