
import React, { useState, useEffect  } from 'react';

import Sidebar from './components/Sidebar';
import Home from './components/Home';
import SeizureTracker from './components/SeizureTracker';
import MedicationReminders from './components/MedicationReminders';
import EmergencySOS from './components/EmergencySOS';
import MoodTriggerDiary from './components/MoodTriggerDiary';
import CaregiverDashboard from './components/CaregiverDashboard';
import DailyStreaks from './components/DailyStreaks';
import MentalHealthTools from './components/MentalHealthTools';
import ProgressReports from './components/ProgressReports';

export type ActivePage = 'home' | 'seizure-tracker' | 'medication-reminders' | 'emergency-sos' | 
  'mood-trigger-diary' | 'caregiver-dashboard' | 'daily-streaks' | 'mental-health-tools' | 'progress-reports';

const App: React.FC = () => {
  useEffect(() => {
  if ('Notification' in window) {
    Notification.requestPermission().then((permission) => {
      console.log('Notification permission:', permission);
    });
  }
}, []);

  const [activePage, setActivePage] = useState<ActivePage>('home');

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'seizure-tracker':
        return <SeizureTracker />;
      case 'medication-reminders':
        return <MedicationReminders />;
      case 'emergency-sos':
        return <EmergencySOS />;
      case 'mood-trigger-diary':
        return <MoodTriggerDiary />;
      case 'caregiver-dashboard':
        return <CaregiverDashboard />;
      case 'daily-streaks':
        return <DailyStreaks />;
      case 'mental-health-tools':
        return <MentalHealthTools />;
      case 'progress-reports':
        return <ProgressReports />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
