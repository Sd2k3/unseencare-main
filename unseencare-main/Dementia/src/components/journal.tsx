import React, { useState, useRef } from 'react';
import { FileText, Mic, Calendar, Clock, Plus, Square, Play, Pause } from 'lucide-react';
import Sidebar from './Sidebar';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  type: 'text' | 'voice';
  voiceDuration?: string;
  audioUrl?: string;
}

export default function Journal() {
  const [isNewEntry, setIsNewEntry] = useState(false);
  const [entryType, setEntryType] = useState<'text' | 'voice'>('text');
  const [newEntry, setNewEntry] = useState({ title: '', content: '' });
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'Morning Walk',
      content: 'Had a lovely walk in the park today. Saw many birds and flowers in bloom.',
      timestamp: 'Today, 10:30 AM',
      type: 'text'
    },
    {
      id: '2',
      title: 'Family Visit',
      content: 'Sarah and the grandkids came over for lunch. We had a wonderful time together.',
      timestamp: 'Yesterday, 2:15 PM',
      type: 'text'
    },
    {
      id: '3',
      title: 'Memory from Childhood',
      content: 'Remembered the summer vacation at the lake when I was 10 years old.',
      timestamp: '3 days ago, 7:45 PM',
      type: 'text'
    },
    {
      id: '4',
      title: "Doctor's Appointment",
      content: '',
      timestamp: 'Last week, 11:20 AM',
      type: 'voice',
      voiceDuration: '1:24'
    }
  ]);

  const [stats, setStats] = useState({
    totalEntries: 12,
    thisWeek: 4,
    textEntries: 8,
    voiceEntries: 4,
    streak: 3
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const topics = ['Family', 'Memories', 'Health', 'Activities', 'Nature'];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      let time = 0;
      timerRef.current = window.setInterval(() => {
        time += 1;
        setRecordingTime(time);
      }, 1000);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSaveEntry = () => {
    const now = new Date();
    const timestamp = now.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    const newJournalEntry: JournalEntry = {
      id: Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      timestamp: `Today, ${timestamp}`,
      type: entryType,
      ...(entryType === 'voice' && audioUrl && {
        voiceDuration: formatTime(recordingTime),
        audioUrl: audioUrl
      })
    };

    setEntries(prevEntries => [newJournalEntry, ...prevEntries]);
    setStats(prevStats => ({
      ...prevStats,
      totalEntries: prevStats.totalEntries + 1,
      thisWeek: prevStats.thisWeek + 1,
      [entryType === 'text' ? 'textEntries' : 'voiceEntries']: 
        prevStats[entryType === 'text' ? 'textEntries' : 'voiceEntries'] + 1
    }));

    // Reset form
    setIsNewEntry(false);
    setNewEntry({ title: '', content: '' });
    setAudioUrl(null);
    setRecordingTime(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const renderVoiceRecorder = () => (
    <div className="border rounded-lg p-6 mb-6 bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Mic className="w-5 h-5 text-pink-600" />
          <span className="font-medium text-pink-800">Voice Recording</span>
        </div>
        <span className="text-pink-600">{formatTime(recordingTime)}</span>
      </div>

      {audioUrl && (
        <div className="mb-4">
          <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
          <button
            onClick={togglePlayback}
            className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-all duration-300"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Play'} Recording
          </button>
        </div>
      )}

      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
          isRecording
            ? 'bg-red-100 text-red-600 hover:bg-red-200'
            : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600'
        }`}
      >
        {isRecording ? (
          <>
            <Square className="w-4 h-4" /> Stop Recording
          </>
        ) : (
          <>
            <Mic className="w-4 h-4" /> Start Recording
          </>
        )}
      </button>
    </div>
  );

  const renderNewEntryForm = () => (
    <div className="bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-6 h-6 text-pink-600" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">New Journal Entry</h2>
      </div>
      <p className="text-gray-600 mb-6">Create a new journal entry</p>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setEntryType('text')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
            entryType === 'text'
              ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <FileText className="w-5 h-5" />
          Text Entry
        </button>
        <button
          onClick={() => setEntryType('voice')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
            entryType === 'voice'
              ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Mic className="w-5 h-5" />
          Voice Entry
        </button>
      </div>

      <input
        type="text"
        placeholder="Entry Title"
        value={newEntry.title}
        onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
        className="w-full mb-4 p-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
      />

      {entryType === 'voice' ? (
        renderVoiceRecorder()
      ) : (
        <textarea
          placeholder="Write your thoughts here..."
          value={newEntry.content}
          onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
          className="w-full h-48 mb-6 p-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 resize-none"
        />
      )}

      <div className="flex justify-end gap-4">
        <button
          onClick={() => {
            setIsNewEntry(false);
            setAudioUrl(null);
            setRecordingTime(0);
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
          }}
          className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-all duration-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveEntry}
          disabled={!newEntry.title || (!newEntry.content && !audioUrl)}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Entry
        </button>
      </div>
    </div>
  );

  const renderEntryList = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-6 h-6 text-pink-600" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">Journal Entries</h2>
          </div>
          <p className="text-gray-600 mb-6">Record your thoughts and memories</p>

          <div className="space-y-6">
            {entries.map((entry) => (
              <div key={entry.id} className="border-b border-pink-100 last:border-0 pb-6 last:pb-0 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 rounded-lg p-4 transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{entry.title}</h3>
                  <div className="flex items-center gap-2 text-pink-600 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{entry.timestamp}</span>
                  </div>
                </div>
                
                {entry.type === 'voice' ? (
                  <div className="flex items-center gap-2 text-pink-600">
                    <Mic className="w-4 h-4" />
                    <span>Voice recording ({entry.voiceDuration})</span>
                  </div>
                ) : (
                  <p className="text-gray-600 mb-4">{entry.content}</p>
                )}

                <button className="text-pink-600 hover:text-pink-700 font-medium transition-all duration-300">
                  View Full Entry
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsNewEntry(true)}
            className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <Plus className="w-5 h-5" />
            New Journal Entry
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">Entry Summary</h2>
          <p className="text-gray-600 mb-6">Track your journaling progress</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 transform hover:scale-[1.02] transition-all duration-300">
              <div className="text-3xl font-bold text-pink-600">{stats.totalEntries}</div>
              <div className="text-sm text-gray-600">Total Entries</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 transform hover:scale-[1.02] transition-all duration-300">
              <div className="text-3xl font-bold text-purple-600">{stats.thisWeek}</div>
              <div className="text-sm text-gray-600">This Week</div>
            </div>
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 transform hover:scale-[1.02] transition-all duration-300">
              <div className="text-3xl font-bold text-pink-600">{stats.textEntries}</div>
              <div className="text-sm text-gray-600">Text Entries</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 transform hover:scale-[1.02] transition-all duration-300">
              <div className="text-3xl font-bold text-purple-600">{stats.voiceEntries}</div>
              <div className="text-sm text-gray-600">Voice Entries</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">Popular Topics</h2>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <span
                key={topic}
                className="px-4 py-2 bg-gradient-to-r from-pink-50 to-purple-50 text-pink-700 rounded-full text-sm font-medium hover:from-pink-100 hover:to-purple-100 cursor-pointer transition-all duration-300"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">Journaling Streak</h2>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-pink-600">{stats.streak}</span>
            <span className="text-gray-600">days in a row</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">Keep writing to increase your streak!</p>
        </div>
        
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-8 ml-72">
      <Sidebar/>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text mb-2">Journal</h1>
          <p className="text-gray-600">Record thoughts, memories, and daily experiences</p>
        </div>

        {isNewEntry ? renderNewEntryForm() : renderEntryList()}
      </div>
    </div>
  );
}