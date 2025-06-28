import React, { useState } from 'react';
import { useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Calendar, 
  Heart, 
  Cloud, 
  Sun, 
  CloudRain,
  Zap,
  Save,
  TrendingUp,
  BarChart3
} from 'lucide-react';

interface DiaryEntry {
  _id: string;
  date: string;
  mood: number;
  energy: number;
  stress: number;
  sleep: number;
  weather: string;
  notes: string;
  triggers: string[];
  activities: string[];
}

const MoodTriggerDiary: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  const fetchEntries = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/diary");
      const data: DiaryEntry[] = await res.json();
      setEntries(data); // 🧠 directly set from DB
    } catch (error) {
      console.error("Failed to fetch entries:", error);
    }
  };

  useEffect(() => {
  fetchEntries();
}, []);


  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    mood: 5,
    energy: 5,
    stress: 5,
    sleep: 5,
    triggers: [] as string[],
    activities: [] as string[],
    notes: '',
    weather: 'sunny'
  });

  const commonTriggers = [
    'Stress', 'Lack of sleep', 'Bright lights', 'Loud noise', 'Alcohol',
    'Missed medication', 'Hormonal changes', 'Illness', 'Dehydration',
    'Screen time', 'Caffeine', 'Weather changes'
  ];

  const commonActivities = [
    'Exercise', 'Reading', 'Meditation', 'Work', 'Socializing',
    'TV/Movies', 'Music', 'Cooking', 'Walking', 'Gaming',
    'Shopping', 'Cleaning'
  ];

  const moodEmojis = ['😢', '😟', '😐', '🙂', '😊', '😄', '😁', '🤩', '😍', '🥰'];
  const weatherIcons = {
    sunny: <Sun className="w-5 h-5 text-yellow-500" />,
    cloudy: <Cloud className="w-5 h-5 text-gray-500" />,
    rainy: <CloudRain className="w-5 h-5 text-blue-500" />
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/diary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Failed to save entry");
    }

    const data = await res.json();
    console.log("Entry Saved:", data);
    setEntries((prev) => [data, ...prev.slice(0, 1)]); // latest 2 entries only

    alert("Diary entry saved!");
    setShowForm(false);
  } catch (err) {
    console.error("Error:", err);
    alert("Failed to save entry");
  }
};

  const handleArrayToggle = (array: string[], item: string, field: 'triggers' | 'activities') => {
    const newArray = array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
    
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

const averageMood =
  entries.length > 0
    ? entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length
    : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-purple-500" />
            <span>Mood & Trigger Diary</span>
          </h1>
          <p className="text-gray-600">Track your daily mood, triggers, and activities</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Entry</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{averageMood.toFixed(1)}/10</h3>
          <p className="text-sm text-gray-600">Average Mood</p>
          <p className="text-xs text-green-600">+0.5 this week</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">6.5/10</h3>
          <p className="text-sm text-gray-600">Average Energy</p>
          <p className="text-xs text-blue-600">Stable</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">4.2/10</h3>
          <p className="text-sm text-gray-600">Average Stress</p>
          <p className="text-xs text-red-600">-0.8 this week</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">15</h3>
          <p className="text-sm text-gray-600">Entries This Month</p>
          <p className="text-xs text-purple-600">Great consistency!</p>
        </div>
      </div>

      {/* Recent Entries */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Entries</h2>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry._id} className="bg-white/50 rounded-xl p-4 hover:bg-white/70 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{moodEmojis[entry.mood - 1]}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{entry.date}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Mood: {entry.mood}/10</span>
                      <span>Energy: {entry.energy}/10</span>
                      <span>Stress: {entry.stress}/10</span>
                      <span>Sleep: {entry.sleep}/10</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {weatherIcons[entry.weather as keyof typeof weatherIcons]}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Triggers:</p>
                  <div className="flex flex-wrap gap-1">
                    {entry.triggers.map((trigger, index) => (
                      <span key={index} className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                        {trigger}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Activities:</p>
                  <div className="flex flex-wrap gap-1">
                    {entry.activities.map((activity, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {entry.notes && (
                <p className="text-sm text-gray-600 italic bg-gray-50 p-3 rounded-lg">
                  "{entry.notes}"
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Insights & Patterns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Most Common Triggers</h3>
            <div className="space-y-2">
              {['Stress', 'Lack of sleep', 'Bright lights'].map((trigger, index) => (
                <div key={trigger} className="flex justify-between items-center p-2 bg-red-50 rounded-lg">
                  <span className="text-sm text-gray-700">{trigger}</span>
                  <span className="text-xs text-red-600">{3 - index} times</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Mood Boosters</h3>
            <div className="space-y-2">
              {['Exercise', 'Reading', 'Meditation'].map((activity, index) => (
                <div key={activity} className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-700">{activity}</span>
                  <span className="text-xs text-green-600">+{1.5 - index * 0.2} mood</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Entry Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add Diary Entry</h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['mood', 'energy', 'stress', 'sleep'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {field} (1-10)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={formData[field as keyof typeof formData] as number}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        [field]: parseInt(e.target.value) 
                      }))}
                      className="w-full"
                    />
                    <div className="text-center text-sm text-gray-600 mt-1">
                      {formData[field as keyof typeof formData]}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weather</label>
                <div className="flex space-x-4">
                  {Object.entries(weatherIcons).map(([weather, icon]) => (
                    <button
                      key={weather}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, weather }))}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        formData.weather === weather
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Triggers</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {commonTriggers.map(trigger => (
                    <button
                      key={trigger}
                      type="button"
                      onClick={() => handleArrayToggle(formData.triggers, trigger, 'triggers')}
                      className={`p-2 rounded-lg text-sm transition-colors ${
                        formData.triggers.includes(trigger)
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {trigger}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activities</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {commonActivities.map(activity => (
                    <button
                      key={activity}
                      type="button"
                      onClick={() => handleArrayToggle(formData.activities, activity, 'activities')}
                      className={`p-2 rounded-lg text-sm transition-colors ${
                        formData.activities.includes(activity)
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  rows={3}
                  placeholder="How was your day? Any additional thoughts..."
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
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

export default MoodTriggerDiary;