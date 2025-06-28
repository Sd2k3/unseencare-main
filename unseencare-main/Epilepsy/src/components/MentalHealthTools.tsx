import React, { useState } from 'react';
import { 
  Brain, 
  Play, 
  Pause, 
  SkipForward, 
  Volume2,
  BookOpen,
  Heart,
  Headphones,
  Clock,
  Star,
  CheckCircle,
  Music,
  Mic,
  PenTool
} from 'lucide-react';

interface MeditationSession {
  id: string;
  title: string;
  duration: string;
  category: string;
  description: string;
  completed: boolean;
}

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: number;
}

const MentalHealthTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'meditation' | 'journal' | 'music'>('music');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [showJournalForm, setShowJournalForm] = useState(false);
  const [journalEntry, setJournalEntry] = useState({ title: '', content: '', mood: 5 });

  const meditationSessions: MeditationSession[] = [
    {
      id: '1',
      title: 'Morning Calm',
      duration: '10 min',
      category: 'Mindfulness',
      description: 'Start your day with peaceful mindfulness',
      completed: true
    },
    {
      id: '2',
      title: 'Stress Relief',
      duration: '15 min',
      category: 'Relaxation',
      description: 'Release tension and find inner peace',
      completed: false
    },
    {
      id: '3',
      title: 'Sleep Preparation',
      duration: '20 min',
      category: 'Sleep',
      description: 'Prepare your mind for restful sleep',
      completed: false
    },
    {
      id: '4',
      title: 'Anxiety Relief',
      duration: '12 min',
      category: 'Anxiety',
      description: 'Calm your mind during anxious moments',
      completed: true
    },
    {
      id: '5',
      title: 'Body Scan',
      duration: '18 min',
      category: 'Mindfulness',
      description: 'Connect with your body and release tension',
      completed: false
    },
    {
      id: '6',
      title: 'Breathing Focus',
      duration: '8 min',
      category: 'Breathing',
      description: 'Simple breathing exercises for clarity',
      completed: false
    }
  ];

  const [journalEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      title: 'Feeling Grateful',
      content: 'Today I felt really grateful for the support from my family. The meditation session this morning helped me start the day with a positive mindset.',
      mood: 8
    },
    {
      id: '2',
      date: '2024-01-14',
      title: 'Challenging Day',
      content: 'Had some stress at work today, but I used the breathing exercises and it really helped. I\'m learning to manage my anxiety better.',
      mood: 6
    }
  ]);

  const musicTherapy = [
    { id: '1', title: 'Nature Sounds', duration: '30 min', type: 'Ambient' },
    { id: '2', title: 'Classical Relaxation', duration: '45 min', type: 'Classical' },
    { id: '3', title: 'Binaural Beats', duration: '25 min', type: 'Therapeutic' },
    { id: '4', title: 'Ocean Waves', duration: '60 min', type: 'Nature' }
  ];

  const handlePlaySession = (sessionId: string) => {
    setCurrentSession(sessionId);
    setIsPlaying(true);
  };

  const handlePauseSession = () => {
    setIsPlaying(false);
  };

  const completedSessions = meditationSessions.filter(session => session.completed).length;
  const totalMinutes = meditationSessions
    .filter(session => session.completed)
    .reduce((total, session) => total + parseInt(session.duration), 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
            <Brain className="w-8 h-8 text-green-500" />
            <span>Mental Health Tools</span>
          </h1>
          <p className="text-gray-600">Meditation, journaling, and music therapy for stress reduction</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{completedSessions}</h3>
          <p className="text-sm text-gray-600">Sessions Completed</p>
          <p className="text-xs text-green-600">This month</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{totalMinutes}</h3>
          <p className="text-sm text-gray-600">Minutes Meditated</p>
          <p className="text-xs text-blue-600">Keep it up!</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{journalEntries.length}</h3>
          <p className="text-sm text-gray-600">Journal Entries</p>
          <p className="text-xs text-purple-600">This week</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">7.2/10</h3>
          <p className="text-sm text-gray-600">Average Mood</p>
          <p className="text-xs text-pink-600">+0.8 this week</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-2 border border-pink-200/50">
        <div className="flex space-x-2">
          {[
            { id: 'music', label: 'Music Therapy', icon: <Music className="w-4 h-4" /> },
            { id: 'meditation', label: 'Meditation', icon: <Brain className="w-4 h-4" /> },
            { id: 'journal', label: 'Journal', icon: <PenTool className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Meditation Tab */}
      {activeTab === 'meditation' && (
        <div className="space-y-6">
          {/* Current Session Player */}
          {currentSession && (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {meditationSessions.find(s => s.id === currentSession)?.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {meditationSessions.find(s => s.id === currentSession)?.category} • 
                    {meditationSessions.find(s => s.id === currentSession)?.duration}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-5 h-5 text-gray-600" />
                  <div className="w-20 h-1 bg-gray-300 rounded-full">
                    <div className="w-3/4 h-1 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-4">
                <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <SkipForward className="w-5 h-5 text-gray-600 transform rotate-180" />
                </button>
                <button
                  onClick={isPlaying ? handlePauseSession : () => setIsPlaying(true)}
                  className="p-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white" />
                  )}
                </button>
                <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <SkipForward className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>2:30</span>
                  <span>10:00</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full w-1/4"></div>
                </div>
              </div>
            </div>
          )}

          {/* Meditation Sessions */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Meditation Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {meditationSessions.map((session) => (
                <div key={session.id} className="bg-white/50 rounded-xl p-4 hover:bg-white/70 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      session.category === 'Mindfulness' ? 'bg-blue-100 text-blue-700' :
                      session.category === 'Relaxation' ? 'bg-green-100 text-green-700' :
                      session.category === 'Sleep' ? 'bg-purple-100 text-purple-700' :
                      session.category === 'Anxiety' ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {session.category}
                    </div>
                    {session.completed && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-gray-800 mb-2">{session.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{session.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{session.duration}</span>
                    <button
                      onClick={() => handlePlaySession(session.id)}
                      className="flex items-center space-x-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-lg hover:shadow-md transition-all duration-300"
                    >
                      <Play className="w-4 h-4" />
                      <span className="text-sm">Play</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Journal Tab */}
      {activeTab === 'journal' && (
        <div className="space-y-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Journal Entries</h2>
              <button
                onClick={() => setShowJournalForm(true)}
                className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <PenTool className="w-4 h-4" />
                <span>New Entry</span>
              </button>
            </div>

            <div className="space-y-4">
              {journalEntries.map((entry) => (
                <div key={entry.id} className="bg-white/50 rounded-xl p-4 hover:bg-white/70 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{entry.title}</h3>
                      <p className="text-sm text-gray-600">{entry.date}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">{entry.mood}/10</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{entry.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Journal Form Modal */}
          {showJournalForm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">New Journal Entry</h2>
                  <button
                    onClick={() => setShowJournalForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ×
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={journalEntry.title}
                      onChange={(e) => setJournalEntry(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="How are you feeling today?"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your thoughts</label>
                    <textarea
                      rows={6}
                      value={journalEntry.content}
                      onChange={(e) => setJournalEntry(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Write about your day, feelings, or anything on your mind..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mood (1-10)</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={journalEntry.mood}
                      onChange={(e) => setJournalEntry(prev => ({ ...prev, mood: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Very Low</span>
                      <span className="font-medium">{journalEntry.mood}</span>
                      <span>Very High</span>
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowJournalForm(false)}
                      className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      Save Entry
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Music Therapy Tab */}
      {activeTab === 'music' && (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
            <Headphones className="w-5 h-5 text-pink-500" />
            <span>Music Therapy</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {musicTherapy.map((track) => (
              <div key={track.id} className="bg-white/50 rounded-xl p-4 hover:bg-white/70 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{track.title}</h3>
                      <p className="text-sm text-gray-600">{track.type} • {track.duration}</p>
                    </div>
                  </div>
                  <button className="p-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg hover:shadow-md transition-all duration-300">
                    <Play className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MentalHealthTools;