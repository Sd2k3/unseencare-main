
import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Share, 
  Eye, 
  Bell, 
  Shield,
  Activity,
  Heart,
  Clock,
  Mail,
  Phone,
  Settings,
  UserCheck,
  AlertTriangle
} from 'lucide-react';

interface Caregiver {
  id: string;
  name: string;
  relationship: string;
  email: string;
  phone: string;
  permissions: string[];
  lastActive: string;
  status: 'active' | 'pending' | 'inactive';
}

const CaregiverDashboard: React.FC = () => {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([
    {
      id: '1',
      name: 'John Johnson',
      relationship: 'Husband',
      email: 'john@email.com',
      phone: '+1 (555) 123-4567',
      permissions: ['seizure-logs', 'medication-alerts', 'emergency-contact'],
      lastActive: '2 hours ago',
      status: 'active'
    },
    {
      id: '2',
      name: 'Dr. Sarah Smith',
      relationship: 'Neurologist',
      email: 'dr.smith@hospital.com',
      phone: '+1 (555) 987-6543',
      permissions: ['seizure-logs', 'medication-logs', 'progress-reports'],
      lastActive: '1 day ago',
      status: 'active'
    },
    {
      id: '3',
      name: 'Mom',
      relationship: 'Mother',
      email: 'mom@email.com',
      phone: '+1 (555) 456-7890',
      permissions: ['emergency-contact'],
      lastActive: 'Never',
      status: 'pending'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCaregiver, setNewCaregiver] = useState({
    name: '',
    relationship: '',
    email: '',
    phone: '',
    permissions: [] as string[]
  });

  const availablePermissions = [
    { id: 'seizure-logs', label: 'Seizure Logs', description: 'View seizure tracking data' },
    { id: 'medication-alerts', label: 'Medication Alerts', description: 'Receive medication reminders' },
    { id: 'medication-logs', label: 'Medication Logs', description: 'View medication history' },
    { id: 'mood-diary', label: 'Mood Diary', description: 'Access mood and trigger entries' },
    { id: 'progress-reports', label: 'Progress Reports', description: 'View and download reports' },
    { id: 'emergency-contact', label: 'Emergency Contact', description: 'Receive emergency alerts' },
    { id: 'location-sharing', label: 'Location Sharing', description: 'Access location during emergencies' }
  ];

  const handleAddCaregiver = (e: React.FormEvent) => {
    e.preventDefault();
    const caregiver: Caregiver = {
      id: Date.now().toString(),
      ...newCaregiver,
      lastActive: 'Never',
      status: 'pending'
    };
    setCaregivers([...caregivers, caregiver]);
    setNewCaregiver({ name: '', relationship: '', email: '', phone: '', permissions: [] });
    setShowAddForm(false);
  };

  const togglePermission = (permission: string) => {
    setNewCaregiver(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
            <Users className="w-8 h-8 text-indigo-500" />
            <span>Caregiver Dashboard</span>
          </h1>
          <p className="text-gray-600">Manage access and share your health data with trusted contacts</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Caregiver</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{caregivers.length}</h3>
          <p className="text-sm text-gray-600">Total Caregivers</p>
          <p className="text-xs text-indigo-600">{caregivers.filter(c => c.status === 'active').length} active</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Share className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">5</h3>
          <p className="text-sm text-gray-600">Data Shared Today</p>
          <p className="text-xs text-green-600">Auto-sync enabled</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Bell className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">3</h3>
          <p className="text-sm text-gray-600">Pending Invites</p>
          <p className="text-xs text-yellow-600">Awaiting response</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">High</h3>
          <p className="text-sm text-gray-600">Privacy Level</p>
          <p className="text-xs text-purple-600">Encrypted sharing</p>
        </div>
      </div>

      {/* Caregivers List */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Caregivers</h2>
        <div className="space-y-4">
          {caregivers.map((caregiver) => (
            <div key={caregiver.id} className="bg-white/50 rounded-xl p-4 hover:bg-white/70 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {caregiver.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{caregiver.name}</h3>
                    <p className="text-sm text-gray-600">{caregiver.relationship}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{caregiver.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{caregiver.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(caregiver.status)}`}>
                    {caregiver.status}
                  </span>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Permissions:</p>
                <div className="flex flex-wrap gap-2">
                  {caregiver.permissions.map((permission) => {
                    const permissionData = availablePermissions.find(p => p.id === permission);
                    return (
                      <span key={permission} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                        {permissionData?.label || permission}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Last active: {caregiver.lastActive}</span>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                    <Eye className="w-4 h-4" />
                    <span>View Activity</span>
                  </button>
                  <button className="flex items-center space-x-1 text-green-600 hover:text-green-700">
                    <Share className="w-4 h-4" />
                    <span>Share Update</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
          <Clock className="w-5 h-5 text-pink-500" />
          <span>Recent Sharing Activity</span>
        </h2>
        <div className="space-y-4">
          {[
            { action: 'Seizure log shared with John Johnson', time: '2 hours ago', type: 'seizure' },
            { action: 'Medication alert sent to Dr. Sarah Smith', time: '4 hours ago', type: 'medication' },
            { action: 'Weekly report generated for John Johnson', time: '1 day ago', type: 'report' },
            { action: 'Emergency alert sent to all caregivers', time: '3 days ago', type: 'emergency' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-white/50 rounded-lg">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activity.type === 'seizure' ? 'bg-red-100 text-red-600' :
                activity.type === 'medication' ? 'bg-blue-100 text-blue-600' :
                activity.type === 'report' ? 'bg-green-100 text-green-600' :
                'bg-orange-100 text-orange-600'
              }`}>
                {activity.type === 'seizure' ? <Activity className="w-5 h-5" /> :
                 activity.type === 'medication' ? <Heart className="w-5 h-5" /> :
                 activity.type === 'report' ? <Share className="w-5 h-5" /> :
                 <AlertTriangle className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-medium">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
          <Shield className="w-5 h-5 text-pink-500" />
          <span>Privacy & Security</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Auto-sync Data</p>
                <p className="text-sm text-gray-600">Automatically share new entries</p>
              </div>
              <button className="w-12 h-6 bg-indigo-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Emergency Auto-share</p>
                <p className="text-sm text-gray-600">Share location during SOS</p>
              </div>
              <button className="w-12 h-6 bg-indigo-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Data Encryption</p>
                <p className="text-sm text-gray-600">Encrypt all shared data</p>
              </div>
              <button className="w-12 h-6 bg-indigo-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>Keep forever</option>
                <option>1 year</option>
                <option>6 months</option>
                <option>3 months</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sharing Frequency</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>Real-time</option>
                <option>Daily summary</option>
                <option>Weekly summary</option>
                <option>Manual only</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Add Caregiver Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add Caregiver</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddCaregiver} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={newCaregiver.name}
                    onChange={(e) => setNewCaregiver(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                  <input
                    type="text"
                    value={newCaregiver.relationship}
                    onChange={(e) => setNewCaregiver(prev => ({ ...prev, relationship: e.target.value }))}
                    placeholder="e.g., Spouse, Doctor, Parent"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newCaregiver.email}
                    onChange={(e) => setNewCaregiver(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newCaregiver.phone}
                    onChange={(e) => setNewCaregiver(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Permissions</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availablePermissions.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id={permission.id}
                        checked={newCaregiver.permissions.includes(permission.id)}
                        onChange={() => togglePermission(permission.id)}
                        className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <div>
                        <label htmlFor={permission.id} className="text-sm font-medium text-gray-700">
                          {permission.label}
                        </label>
                        <p className="text-xs text-gray-500">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <UserCheck className="w-5 h-5" />
                  <span>Send Invitation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaregiverDashboard;