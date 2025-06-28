import React from 'react';
import { Sun, Moon, Search } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  return (
    <div className={`flex justify-between items-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      <div>
        <h2 className="text-2xl font-bold">Welcome back, Sarah!</h2>
        <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Let's make today a great day for memory care
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg ${
            isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className={`pl-10 pr-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-gray-800 text-white placeholder-gray-400'
                : 'bg-white text-gray-900 placeholder-gray-500'
            }`}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}