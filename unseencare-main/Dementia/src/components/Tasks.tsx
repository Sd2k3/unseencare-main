import React from 'react';
import { Bell, Calendar } from 'lucide-react';
import Sidebar from './Sidebar';



export default function Tasks() {
  const upcomingReminders = [
    { time: '9:00 AM', task: 'Take morning medication', date: 'Today' },
    { time: '2:30 PM', task: 'Doctor\'s appointment', date: 'Tomorrow' },
    { time: '10:00 AM', task: 'Memory exercise session', date: 'Wed, Mar 20' },
  ];

  return (
    <>
    <Sidebar/>
    <div className={` '} rounded-xl shadow-lg p-6 ml-72`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-semibold  'text-gray-900'`}>
          Upcoming Reminders
        </h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Set Reminder
        </button>
      </div>

      <div className="space-y-4">
        {upcomingReminders.map((reminder, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-lg  'bg-gray-50'`}
          >
            <div className="flex items-center space-x-4">
              <Calendar className={`h-5 w-5  'text-gray-500'`} />
              <div>
                <p className={`font-medium  'text-gray-900'`}>
                  {reminder.task}
                </p>
                <p className={`text-sm  'text-gray-600'`}>
                  {reminder.date} at {reminder.time}
                </p>
              </div>
            </div>
            <button className="text-purple-600 hover:text-purple-700">
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}