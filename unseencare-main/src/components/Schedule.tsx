import React from 'react';
import Sidebar from './Sidebar';


export default function Schedule() {
  const scheduleItems = [
    { time: '9:00 AM', task: 'Morning Medicine', type: 'Medication' },
    { time: '10:30 AM', task: 'Memory Game Session', type: 'Activity' },
    { time: '12:00 PM', task: 'Lunch with Family', type: 'Social' },
    { time: '3:00 PM', task: 'Music Therapy', type: 'Activity' },
  ];

  return (
    <>
    <Sidebar/>
    <div className={` '} rounded-xl shadow-lg p-6`}>
      <h3 className={`text-xl font-semibold mb-4  'text-gray-900'`}>
        Today's Schedule
      </h3>
      <div className="space-y-4">
        {scheduleItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-lg  'bg-gray-50'`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-2 h-2 rounded-full ${
                  item.type === 'Medication'
                    ? 'bg-red-500'
                    : item.type === 'Activity'
                    ? 'bg-green-500'
                    : 'bg-blue-500'
                }`}
              />
              <div>
                <p className={`font-medium  'text-gray-900'`}>{item.task}</p>
                <p className={`text-sm  'text-gray-600'`}>{item.time}</p>
              </div>
            </div>
            <span
              className={`text-sm px-3 py-1 rounded-full ${
                item.type === 'Medication'
                  ? 'bg-red-100 text-red-800'
                  : item.type === 'Activity'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {item.type}
            </span>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}