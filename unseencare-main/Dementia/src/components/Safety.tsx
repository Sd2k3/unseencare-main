import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// 🔄 Component to recenter map
function RecenterButton({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 15);
  }, [position]);

  return null;
}

export default function Safety() {
  const [activeSection, setActiveSection] = useState<'phone' | 'tracker' | 'zones'>('phone');
  const [isInSafeZone, setIsInSafeZone] = useState(true);
  const [showNavigationPanel, setShowNavigationPanel] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const currentPosition: [number, number] = [latitude, longitude];
        setPosition(currentPosition);
        console.log("Current position:", currentPosition);
      },
      (err) => {
        console.error('Geolocation error:', err);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  const sections = [
    { id: 'phone', icon: Smartphone, label: 'Locate Phone' },
    { id: 'tracker', icon: MapPin, label: 'Locate Tracker' },
    { id: 'zones', icon: Shield, label: 'Safe Zones' }
  ];

  const emergencyContacts = [
    { name: 'Local Police', number: '911' },
    { name: 'Primary Caregiver', number: '(555) 123-4567' },
    { name: 'Family Doctor', number: '(555) 987-6543' },
    { name: 'Emergency Contact', number: '(555) 234-5678' }
  ];

  const safeZones = [
    { name: 'Home', address: 'Knowledge Park 3 Greater Noida, Uttar Pradesh', radius: 500 },
    { name: 'Community Center', address: 'Gate 1 Sarojini Market, Delhi, India', radius: 300 }
  ];

  const handleSOS = async () => {
    try {
      const response = await fetch('https://36752693-56b3-4556-b04c-0fee3e67c99e-00-31p7rxt0d6xvn.sisko.replit.dev/trigger-sos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert(`Failed to send SOS alert: ${(error as Error).message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pl-72 p-6 relative">
      <Sidebar />
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100">
          <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Safety Monitoring</h1>
          <p className="text-gray-600">Monitor location and ensure safety with real-time tracking and safe zone alerts.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex space-x-4 mb-6">
          {sections.map(({ id, icon: Icon, label }) => (
            <motion.button
              key={id}
              onClick={() => setActiveSection(id as any)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center px-6 py-3 rounded-xl transition-all duration-200 ${activeSection === id ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90'}`}
            >
              <Icon className="h-5 w-5 mr-2" />
              {label}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100">
              <div className="relative h-[500px] rounded-xl overflow-hidden">
                {position ? (
                  <MapContainer center={position} zoom={15} scrollWheelZoom={true} className="w-full h-full z-0 rounded-xl">
                    <TileLayer
                      attribution='&copy; OpenStreetMap contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position} icon={customIcon}>
                      <Popup>You are here</Popup>
                    </Marker>

                    {showNavigationPanel && <RecenterButton position={position} />}
                  </MapContainer>
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-xl">
                    <p className="text-gray-600">Fetching your location...</p>
                  </div>
                )}

                {isInSafeZone && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center space-x-2 z-10">
                    <CheckCircle className="h-5 w-5" />
                    <span>In Safe Zone</span>
                  </motion.div>
                )}

                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowNavigationPanel(true)} className="absolute bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg z-10">
                  <Navigation className="h-5 w-5" />
                  <span>Navigate</span>
                </motion.button>
              </div>
            </motion.div>

            {activeSection === 'zones' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Safe Zones</h3>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <Plus className="h-5 w-5" />
                    <span>Add Zone</span>
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {safeZones.map((zone, index) => (
                    <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="p-4 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-200 border border-purple-100">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Home className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{zone.name}</h4>
                            <p className="text-sm text-gray-600">{zone.address}</p>
                            <p className="text-sm text-purple-600 mt-1">Radius: {zone.radius}m</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                            <Navigation className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100">
              <div className="flex items-center space-x-2 mb-6">
                <PhoneCall className="h-6 w-6 text-red-500" />
                <h3 className="text-xl font-semibold text-gray-900">Emergency Contacts</h3>
              </div>
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="flex items-center justify-between p-3 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-200 border border-purple-100">
                    <div>
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.number}</p>
                    </div>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 bg-green-500 text-white rounded-lg">
                      <Phone className="h-5 w-5" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl p-6 shadow-lg text-white">
              <div className="flex items-center space-x-2 mb-6">
                <AlertCircle className="h-6 w-6" />
                <h3 className="text-xl font-semibold">Emergency Alert / SOS</h3>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSOS} className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 py-3 rounded-xl flex items-center justify-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Send Emergency Alert</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
