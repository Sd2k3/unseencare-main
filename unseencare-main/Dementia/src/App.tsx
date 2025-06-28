import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import QuickActions from './components/QuickActions';
import Schedule from './components/Schedule';
import Chat from './components/Chat';
import Activities from './components/Activities';
import Journal from './components/Journal';
import Safety from './components/Safety';
import Tasks from './components/Tasks';
import MoodTracker from './components/MoodTracker';
import Reminders from './components/Reminders';
import Recognition from './components/Recognition';
import MusicTherapy from './components/MusicTherapy';
import VoiceNotes from './components/VoiceNotes';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Medication from './components/Medication';
import Albums from './components/Albums';
import Home from './components/Home';
import Settings from './components/settings';
  function App() {
  
  
 
  return (
    <>

    

       <BrowserRouter>

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/recognition" element={<Recognition/>}/>
      <Route path="/safety-zones" element={<Safety/>}/>
      <Route path="/medication" element={<Medication/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/mood-tracker' element={<MoodTracker/>}/>
      <Route path='/reminders' element={<Reminders/>}/>
      <Route path='/voice-notes' element={<VoiceNotes/>}/>
      <Route path='/music-therapy' element={<MusicTherapy/>}/>
      <Route path='/activities' element={<Activities/>}/>
      <Route path='/schedule' element={<Schedule/>}/>
      <Route path='/quick-actions' element={<QuickActions/>}/>
      <Route path='/tasks' element={<Tasks/>}/>
      <Route path='/albums' element={<Albums/>}/>
      <Route path='/journal' element={<Journal/>}/>
      <Route path='/settings' element={<Settings/>}/>
    </Routes>
  </BrowserRouter>
     
    

  
  
    </>
  );
}

export default App;