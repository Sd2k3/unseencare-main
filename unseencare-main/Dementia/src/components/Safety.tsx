

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  MapPin, 
  Shield, 
  Phone, 
  Plus, 
  AlertCircle, 
  CheckCircle, 
  Navigation, 
  Home,
  Heart,
  PhoneCall
} from 'lucide-react';
import Sidebar from './Sidebar';

export default function Safety() {
  const [activeSection, setActiveSection] = useState<'phone' | 'tracker' | 'zones'>('phone');
  const [isInSafeZone, setIsInSafeZone] = useState(true); // Demo purpose
  const [showNavigationPanel, setShowNavigationPanel] = useState(false);

  const sections = [
    { id: 'phone', icon: Smartphone, label: 'Locate Phone' },
    { id: 'tracker', icon: MapPin, label: 'Locate Tracker' },
    { id: 'zones', icon: Shield, label: 'Safe Zones' },
  ];

  const emergencyContacts = [
    { name: 'Local Police', number: '911' },
    { name: 'Primary Caregiver', number: '(555) 123-4567' },
    { name: 'Family Doctor', number: '(555) 987-6543' },
    { name: 'Emergency Contact', number: '(555) 234-5678' },
  ];

  const safeZones = [
    { name: 'Home', address: 'Knowledge Park 3 Greater Noida, Uttar Pradesh', radius: 500 },
    { name: 'Community Center', address: ' Gate 1 Sarojini Marke, Delhi, India ', radius: 300 },
  ];

  const handleSOS = async () => {
    try {
      const response = await fetch('http://localhost:5000/trigger-sos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data.message);
      alert(data.message);
    } catch (error) {
      console.error('Error sending SOS:', error);
      alert(`Failed to send SOS alert: ${(error as Error)?.message || 'Unknown error occurred'}`);
    }
  };

  // Animated background particles
  const particles = [...Array(20)].map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 15 + 10,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
  }));

  return (
    <>
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-pink-200/30 rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 pl-72 p-6 relative">
        {/* Animated Background */}
        <Sidebar/>  

        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-pink-200 hover:shadow-2xl transition-all duration-300"
          >
            <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600">
              Safety Monitoring
            </h1>
            <p className="text-gray-700">
              Monitor location and ensure safety with real-time tracking and safe zone alerts.
            </p>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex space-x-4 mb-6"
          >
            {sections.map(({ id, icon: Icon, label }) => (
              <motion.button
                key={id}
                onClick={() => setActiveSection(id as any)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 shadow-lg ${
                  activeSection === id
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-200/50'
                    : 'bg-white/90 backdrop-blur-lg text-gray-700 hover:bg-white hover:shadow-xl border border-pink-200'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {label}
              </motion.button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Section */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-pink-200 hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik"
                    className="w-full h-[500px] rounded-xl border-0"
                  ></iframe>
                  
                  {/* Safe Zone Indicator */}
                  {isInSafeZone && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg"
                    >
                      <CheckCircle className="h-5 w-5" />
                      <span>In Safe Zone</span>
                    </motion.div>
                  )}

                  {/* Navigation Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowNavigationPanel(!showNavigationPanel)}
                    className="absolute bottom-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <Navigation className="h-5 w-5" />
                    <span>Navigate</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Safe Zones List */}
              {activeSection === 'zones' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-pink-200"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Safe Zones</h3>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Add Zone</span>
                    </motion.button>
                  </div>

                  <div className="space-y-4">
                    {safeZones.map((zone, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-white/70 hover:bg-white/90 transition-all duration-300 border border-pink-200 shadow-lg hover:shadow-xl"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <motion.div 
                              whileHover={{ rotate: 5 }}
                              className="p-2 bg-pink-100 rounded-lg"
                            >
                              <Home className="h-5 w-5 text-pink-600" />
                            </motion.div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{zone.name}</h4>
                              <p className="text-sm text-gray-600">{zone.address}</p>
                              <p className="text-sm text-pink-600 mt-1 font-medium">Radius: {zone.radius}m</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <motion.button 
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-gray-600 hover:text-pink-600 transition-colors"
                            >
                              <Navigation className="h-5 w-5" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Emergency Contacts */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-pink-200 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center space-x-2 mb-6">
                  <PhoneCall className="h-6 w-6 text-red-500" />
                  <h3 className="text-xl font-semibold text-gray-900">Emergency Contacts</h3>
                </div>
                <div className="space-y-4">
                  {emergencyContacts.map((contact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.03, x: 5 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/70 hover:bg-white/90 transition-all duration-300 border border-pink-200 shadow-md hover:shadow-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-600">{contact.number}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.85 }}
                        className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-lg transition-colors"
                      >
                        <Phone className="h-5 w-5" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-red-400 via-pink-500 to-rose-500 rounded-2xl p-6 shadow-xl text-white hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center space-x-2 mb-6">
                  <AlertCircle className="h-6 w-6" />
                  <h3 className="text-xl font-semibold">Emergency Alert / SOS</h3>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSOS}
                  className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 py-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="h-5 w-5" />
                  </motion.div>
                  <span className="font-semibold">Send Emergency Alert</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
