import React, { useEffect, useState } from 'react';
import {
  Pill, Plus, Clock, Bell, Check, X, Calendar, Settings
} from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  color: string;
  nextDue: string;
  taken: boolean;
  status: 'due' | 'tomorrow'; // Add this line
}



function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
function showLocalNotification(title: string, body: string) {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/icon.png", // optional icon
    });
  } else {
    console.warn("Notifications are not allowed by the user.");
  }
}


export const scheduleMedicationReminder = (name: string, dosage: string, time: string) => {
  const now = new Date();
  const [hours, minutes] = time.split(":").map(Number);
  const reminderTime = new Date();
  reminderTime.setHours(hours, minutes, 0, 0);

  if (reminderTime <= now) {
    reminderTime.setDate(reminderTime.getDate() + 1); // Schedule for tomorrow if time passed
  }

  const delay = reminderTime.getTime() - now.getTime();

  console.log(`🔔 Will show notification in ${Math.round(delay / 1000)} seconds`);

  setTimeout(() => {
    showLocalNotification("💊 Medication Reminder", `Time to take ${name} (${dosage})`);
  }, delay);
};

const MedicationReminders: React.FC = () => {

 const [medications, setMedications] = useState<Medication[]>([
  {
    id: '1',
    name: 'Levetiracetam',
    dosage: '500mg',
    frequency: 'Twice daily',
    times: ['08:00', '20:00'],
    color: 'bg-blue-500',
    nextDue: '20:00',
    taken: true,
    status: 'tomorrow' // or 'due' if it’s upcoming today
  },
  {
    id: '2',
    name: 'Lamotrigine',
    dosage: '100mg',
    frequency: 'Once daily',
    times: ['09:00'],
    color: 'bg-green-500',
    nextDue: '09:00',
    taken: false,
    status: 'tomorrow'
  }
]);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);
  

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: 'once',
    times: ['08:00'],
    color: 'bg-blue-500'
  });

  // ✅ Subscribe to push when component mounts
  useEffect(() => {
    const subscribeToPush = async () => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          
          const registration = await navigator.serviceWorker.register('/sw.js');
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
          });
          await fetch("http://localhost:5000/subscribe", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: { "Content-Type": "application/json" }
          });
        } catch (err) {
          console.error("Subscription failed:", err);
        }
      }
    };
    subscribeToPush();
  }, []);

  const markAsTaken = (id: string) => {
    setMedications(prev =>
      prev.map(med =>
        med.id === id ? { ...med, taken: true } : med
      )
    );
  };

  const markAsSkipped = (id: string) => {
    setMedications(prev =>
      prev.map(med =>
        med.id === id ? { ...med, taken: false } : med
      )
    );
  };

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();

    const now = new Date();
    const [hours, minutes] = newMedication.times[0].split(":").map(Number);
    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0, 0);

    const status = scheduledTime > now ? "due" : "tomorrow";

    const id = Date.now().toString();
    const med: Medication = {
      id,
      name: newMedication.name,
      dosage: newMedication.dosage,
      frequency: newMedication.frequency,
      times: newMedication.times,
      color: newMedication.color,
      nextDue: newMedication.times[0],
      taken: false,
      status
    };

    setMedications(prev => [...prev, med]);

    scheduleMedicationReminder(med.name, med.dosage, med.times[0]);

    setShowAddForm(false);
    setNewMedication({
      name: '',
      dosage: '',
      frequency: 'once',
      times: ['08:00'],
      color: 'bg-blue-500'
    });
    newMedication.name,
  newMedication.dosage,
  newMedication.times[0]
  };


  const adherenceRate = Math.round((medications.filter(med => med.taken).length / medications.length) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
            <Pill className="w-8 h-8 text-pink-500" />
            <span>Medication Reminders</span>
          </h1>
          <p className="text-gray-600">Stay on track with your medication schedule</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-pink-400 to-rose-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Medication</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{adherenceRate}%</h3>
          <p className="text-sm text-gray-600">Adherence Rate</p>
          <p className="text-xs text-green-600">+5% this month</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">12</h3>
          <p className="text-sm text-gray-600">Day Streak</p>
          <p className="text-xs text-blue-600">Personal best!</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Bell className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">2</h3>
          <p className="text-sm text-gray-600">Due Today</p>
          <p className="text-xs text-purple-600">1 remaining</p>
        </div>
      </div>

      {/* Today's Medications */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
          <Clock className="w-5 h-5 text-pink-500" />
          <span>Today's Schedule</span>
        </h2>

        <div className="space-y-4">
          {medications.map((medication) => (
            <div key={medication.id} className="bg-white/50 rounded-xl p-4 hover:bg-white/70 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${medication.color} rounded-xl flex items-center justify-center`}>
                    <Pill className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{medication.name}</h3>
                    <p className="text-sm text-gray-600">{medication.dosage} • {medication.frequency}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Next: {medication.nextDue}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {medication.taken ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <Check className="w-5 h-5" />
                      <span className="text-sm font-medium">Taken</span>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => markAsTaken(medication.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-1"
                      >
                        <Check className="w-4 h-4" />
                        <span>Take</span>
                      </button>
                      <button
                        onClick={() => markAsSkipped(medication.id)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-1"
                      >
                        <X className="w-4 h-4" />
                        <span>Skip</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    {/* Upcoming Reminders */}
{/* Upcoming Reminders */}
<div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
    <Bell className="w-5 h-5 text-pink-500" />
    <span>Upcoming Reminders</span>
  </h2>

  <div className="space-y-3">
    {medications.map((med, index) =>
      med.times.map((time, i) => {
        const now = new Date();
        const [hours, minutes] = time.split(':').map(Number);
        const medTime = new Date();
        medTime.setHours(hours, minutes, 0, 0);

        const isToday = medTime > now;
        const status = isToday ? 'due' : 'tomorrow';

        return (
          <div key={`${index}-${i}`} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${
                status === 'due' ? 'bg-red-500' : 'bg-gray-400'
              }`}></div>
              <div>
                <p className="font-medium text-gray-800">{time}</p>
                <p className="text-sm text-gray-600">{med.name} {med.dosage}</p>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              status === 'due' 
                ? 'bg-red-100 text-red-700' 
                : 'bg-gray-100 text-gray-700'
            }`}>
              {status === 'due' ? 'Due now' : 'Tomorrow'}
            </span>
          </div>
        );
      })
    )}
  </div>
</div>



      {/* Settings */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
          <Settings className="w-5 h-5 text-pink-500" />
          <span>Reminder Settings</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Push Notifications</span>
              <button className="w-12 h-6 bg-pink-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Sound Alerts</span>
              <button className="w-12 h-6 bg-pink-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Vibration</span>
              <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Snooze Duration</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>5 minutes</option>
                <option>10 minutes</option>
                <option>15 minutes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Advance</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>5 minutes before</option>
                <option>10 minutes before</option>
                <option>15 minutes before</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Add Medication Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add Medication</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleAddMedication}>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Medication Name</label>
    <input
      type="text"
      placeholder="e.g., Levetiracetam"
      value={newMedication.name}
      onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
    <input
      type="text"
      placeholder="e.g., 500mg"
      value={newMedication.dosage}
      onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
    <select
      value={newMedication.frequency}
      onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
    >
      <option value="once">Once daily</option>
      <option value="twice">Twice daily</option>
      <option value="three">Three times daily</option>
      <option value="four">Four times daily</option>
    </select>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
    <input
      type="time"
      value={newMedication.times[0]}
      onChange={(e) => setNewMedication({ ...newMedication, times: [e.target.value] })}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
    />
  </div>

  <div className="flex space-x-4 pt-4">
    <button
      type="button"
      onClick={() => setShowAddForm(false)}
      className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
    >
      Add Medication
    </button>
  </div>
</form>

          </div>
        </div>
      )}
    </div>
  );
};

export default MedicationReminders;
