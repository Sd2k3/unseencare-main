import React, { useState } from 'react';
import { 
  Activity, 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  BarChart3,
  Save
} from 'lucide-react';

interface SeizureEntry {
  id: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  triggers: string[];
  location: string;
  severity: number;
  notes: string;
}

const SeizureTracker: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    duration: '',
    type: '',
    triggers: [] as string[],
    location: '',
    severity: 1,
    notes: ''
  });

  const [seizureHistory] = useState<SeizureEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      time: '14:30',
      duration: '2 minutes',
      type: 'Tonic-clonic',
      triggers: ['Stress', 'Lack of sleep'],
      location: 'Home',
      severity: 3,
      notes: 'Felt tired before episode'
    },
    {
      id: '2',
      date: '2024-01-08',
      time: '09:15',
      duration: '45 seconds',
      type: 'Focal',
      triggers: ['Flashing lights'],
      location: 'Office',
      severity: 2,
      notes: 'Quick recovery'
    }
  ]);

  const seizureTypes = [
    'Tonic-clonic',
    'Focal',
    'Absence',
    'Myoclonic',
    'Atonic',
    'Other'
  ];

  const commonTriggers = [
    'Stress',
    'Lack of sleep',
    'Flashing lights',
    'Missed medication',
    'Alcohol',
    'Hormonal changes',
    'Illness',
    'Dehydration'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Seizure entry:', formData);
    setShowForm(false);
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      duration: '',
      type: '',
      triggers: [],
      location: '',
      severity: 1,
      notes: ''
    });
  };

  const handleTriggerToggle = (trigger: string) => {
    setFormData(prev => ({
      ...prev,
      triggers: prev.triggers.includes(trigger)
        ? prev.triggers.filter(t => t !== trigger)
        : [...prev.triggers, trigger]
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
            <Activity className="w-8 h-8 text-rose-500" />
            <span>Seizure Tracker</span>
          </h1>
          <p className="text-gray-600">Monitor and analyze your seizure patterns</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Log Seizure</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <TrendingDown className="w-4 h-4 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">7</h3>
          <p className="text-sm text-gray-600">Days seizure-free</p>
          <p className="text-xs text-green-600">+2 from last week</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">2</h3>
          <p className="text-sm text-gray-600">This month</p>
          <p className="text-xs text-blue-600">-1 from last month</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">1.5 min</h3>
          <p className="text-sm text-gray-600">Average duration</p>
          <p className="text-xs text-purple-600">Stable</p>
        </div>
      </div>

      {/* Seizure History */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Seizures</h2>
        <div className="space-y-4">
          {seizureHistory.map((seizure) => (
            <div key={seizure.id} className="bg-white/50 rounded-xl p-4 hover:bg-white/70 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    seizure.severity === 1 ? 'bg-green-400' :
                    seizure.severity === 2 ? 'bg-yellow-400' :
                    seizure.severity === 3 ? 'bg-orange-400' : 'bg-red-400'
                  }`}></div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{seizure.type}</h3>
                    <p className="text-sm text-gray-600">{seizure.date} at {seizure.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{seizure.duration}</p>
                  <p className="text-xs text-gray-600">Duration</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{seizure.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Severity: {seizure.severity}/5</span>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-1">Triggers:</p>
                <div className="flex flex-wrap gap-2">
                  {seizure.triggers.map((trigger, index) => (
                    <span key={index} className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">
                      {trigger}
                    </span>
                  ))}
                </div>
              </div>
              
              {seizure.notes && (
                <p className="text-sm text-gray-600 italic">{seizure.notes}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Log Seizure Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Log New Seizure</h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g., 2 minutes"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select type</option>
                    {seizureTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="e.g., Home, Office, Park"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Severity (1-5)</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.severity}
                  onChange={(e) => setFormData(prev => ({ ...prev, severity: parseInt(e.target.value) }))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Possible Triggers</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {commonTriggers.map(trigger => (
                    <button
                      key={trigger}
                      type="button"
                      onClick={() => handleTriggerToggle(trigger)}
                      className={`p-2 rounded-lg text-sm transition-colors ${
                        formData.triggers.includes(trigger)
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {trigger}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  rows={3}
                  placeholder="Any additional details..."
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Entry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeizureTracker;