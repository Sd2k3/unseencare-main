import React from 'react';
import { Smile, Meh, Frown, Heart, Star } from 'lucide-react';
import Sidebar from './Sidebar';



export default function MoodTracker() {
  const moods = [
    { icon: Smile, label: 'Happy', color: 'text-green-500' },
    { icon: Heart, label: 'Loved', color: 'text-red-500' },
    { icon: Star, label: 'Excited', color: 'text-yellow-500' },
    { icon: Meh, label: 'Okay', color: 'text-blue-500' },
    { icon: Frown, label: 'Sad', color: 'text-purple-500' },
  ];

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <>
    <Sidebar/>
    <div className={`'bg-white' rounded-xl shadow-lg p-6 ml-72`}>
      <h2 className={`text-xl font-semibold mb-6  'text-gray-900'`}>
        How are you feeling today?
      </h2>

      <div className="grid grid-cols-5 gap-4 mb-8">
        {moods.map(({ icon: Icon, label, color }) => (
          <button
            key={label}
            className={`flex flex-col items-center p-4 rounded-lg  'bg-gray-50 hover:bg-gray-100'`}
          >
            <Icon className={`h-8 w-8 mb-2 ${color}`} />
            <span className={`text-sm  'text-gray-600'`}>{label}</span>
          </button>
        ))}
      </div>

      <h3 className={`text-lg font-semibold mb-4  'text-gray-900'`}>
        Weekly Mood Track
      </h3>
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center">
            <div className={`text-sm mb-2  'text-gray-600'`}>{day}</div>
            <div
              className={`h-12 rounded-lg  'bg-gray-50' flex items-center justify-center`}
            >
              <Smile className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
        </div>
      </>
  );
}