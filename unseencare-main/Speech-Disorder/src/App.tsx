import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppSidebar } from './components/AppSidebar';
import Dashboard from './pages/Dashboard';
import Activities from './pages/Activities';
import Practice from './pages/Practice';
import Journal from './pages/Journal';
import Reminder from './pages/Reminder';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import KaraokeTherapy from './pages/Karaoke';
import Chat from './pages/Chat';
import VoiceRecognition from './pages/Recogination';
import SignLangReader from './pages/Sign-lang-reader';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AppSidebar />
        <main className="lg:ml-64 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/reminders" element={<Reminder />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/karaoke" element={<KaraokeTherapy />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/recogination" element={<VoiceRecognition />} />
            <Route path="/sign-lang-reader" element={<SignLangReader />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;