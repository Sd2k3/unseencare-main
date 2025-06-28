import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

// Screens
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Recognition from './components/Recognition';
import Safety from './components/Safety';
import Medication from './components/Medication';
import Chat from './components/Chat';
import MoodTracker from './components/MoodTracker';
import Reminders from './components/Reminders';
import VoiceNotes from './components/VoiceNotes';
import MusicTherapy from './components/MusicTherapy';
import Activities from './components/Activities';
import Schedule from './components/Schedule';
import QuickActions from './components/QuickActions';
import Tasks from './components/Tasks';
import Albums from './components/Albums';
import Journal from './components/journal';
import Settings from './components/settings';

// Modal
import {AuthModal} from './components/AuthModel';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Optional: Button to open modal — place anywhere, remove if not needed */}
        <button
          onClick={() => setIsAuthOpen(true)}
          className="fixed bottom-5 right-5 bg-purple-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-purple-700 z-50"
        >
          Sign In
        </button>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recognition" element={<Recognition />} />
          <Route path="/safety-zones" element={<Safety />} />
          <Route path="/medication" element={<Medication />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/mood-tracker" element={<MoodTracker />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/voice-notes" element={<VoiceNotes />} />
          <Route path="/music-therapy" element={<MusicTherapy />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/quick-actions" element={<QuickActions />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>

        {/* Auth Modal with open state and close handler */}
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
