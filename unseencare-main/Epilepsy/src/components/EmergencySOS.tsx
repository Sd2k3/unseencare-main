import React, { useState } from 'react';
import { 
  Shield, 
  Phone, 
  MapPin, 
  Clock, 
  Plus, 
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  priority: number;
}

const EmergencySOS: React.FC = () => {
  const [sosActive, setSosActive] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'John Johnson',
      relationship: 'Husband',
      phone: '+1 (555) 123-4567',
      email: 'john@email.com',
      priority: 1
    },
    {
      id: '2',
      name: 'Dr. Sarah Smith',
      relationship: 'Neurologist',
      phone: '+1 (555) 987-6543',
      email: 'dr.smith@hospital.com',
      priority: 2
    },
    {
      id: '3',
      name: 'Emergency Services',
      relationship: 'Emergency',
      phone: '911',
      email: '',
      priority: 3
    }
  ]);

  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: ''
  });
  const handleDelete = (id: string) => {
  setContacts((prev) => prev.filter(contact => contact.id !== id));
};

  const activateSOS = () => {
    setSosActive(true);
    // Simulate SOS activation
    setTimeout(() => {
      setSosActive(false);
    }, 5000);
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    const contact: EmergencyContact = {
      id: Date.now().toString(),
      ...newContact,
      priority: contacts.length + 1
    };
    setContacts([...contacts, contact]);
    setNewContact({ name: '', relationship: '', phone: '', email: '' });
    setShowAddContact(false);
  };
  const handleSOS = async () => {
    try {
      const response = await fetch('https://36752693-56b3-4556-b04c-0fee3e67c99e-00-31p7rxt0d6xvn.sisko.replit.dev/trigger-sos', {
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
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
            <Shield className="w-8 h-8 text-red-500" />
            <span>Emergency SOS</span>
          </h1>
          <p className="text-gray-600">Quick access to emergency assistance and contacts</p>
        </div>
      </div>

      {/* SOS Button */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-pink-200/50 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Emergency Alert</h2>
          <p className="text-gray-600 mb-8">Press and hold the button below to send an emergency alert to your contacts with your current location.</p>
          
          <button
            onClick={handleSOS}
            disabled={sosActive}
            className={`w-32 h-32 rounded-full text-white font-bold text-xl shadow-2xl transition-all duration-300 transform ${
              sosActive 
                ? 'bg-green-500 scale-110 animate-pulse' 
                : 'bg-gradient-to-r from-red-500 to-rose-600 hover:scale-105 hover:shadow-3xl active:scale-95'
            }`}
          >
            {sosActive ? (
              <div className="flex flex-col items-center">
                <CheckCircle className="w-8 h-8 mb-2" />
                <span className="text-sm">SENT</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Phone className="w-8 h-8 mb-2" />
                <span>SOS</span>
              </div>
            )}
          </button>

          {sosActive && (
            <div className="mt-6 p-4 bg-green-50 rounded-xl">
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Emergency alert sent successfully!</span>
              </div>
              <p className="text-sm text-green-600 mt-2">
                Your location and emergency message have been sent to all emergency contacts.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Share Location</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Send your current location to emergency contacts</p>
          <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Share Now
          </button>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Medical Alert</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Send medical information to responders</p>
          <button className="w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
            Send Alert
          </button>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Check-in</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Send "I'm okay" message to contacts</p>
          <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            Check In
          </button>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Emergency Contacts</h2>
          <button
            onClick={() => setShowAddContact(true)}
            className="bg-gradient-to-r from-pink-400 to-rose-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Contact</span>
          </button>
        </div>

        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-white/50 rounded-xl p-4 hover:bg-white/70 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                    contact.priority === 1 ? 'bg-red-500' :
                    contact.priority === 2 ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`}>
                    {contact.priority}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.relationship}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{contact.phone}</span>
                      </div>
                      {contact.email && (
                        <span className="text-sm text-gray-600">{contact.email}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Information */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Medical Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Current Medications</h3>
            <div className="space-y-2">
              <div className="p-3 bg-white/50 rounded-lg">
                <p className="font-medium">Levetiracetam 500mg</p>
                <p className="text-sm text-gray-600">Twice daily</p>
              </div>
              <div className="p-3 bg-white/50 rounded-lg">
                <p className="font-medium">Lamotrigine 100mg</p>
                <p className="text-sm text-gray-600">Once daily</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Medical Conditions</h3>
            <div className="space-y-2">
              <div className="p-3 bg-white/50 rounded-lg">
                <p className="font-medium">Epilepsy</p>
                <p className="text-sm text-gray-600">Focal seizures</p>
              </div>
              <div className="p-3 bg-white/50 rounded-lg">
                <p className="font-medium">Allergies</p>
                <p className="text-sm text-gray-600">Penicillin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add Emergency Contact</h2>
              <button
                onClick={() => setShowAddContact(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddContact} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                <input
                  type="text"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact(prev => ({ ...prev, relationship: e.target.value }))}
                  placeholder="e.g., Spouse, Doctor, Friend"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddContact(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencySOS;
