import React, { useState } from 'react';
import { MapPin, MessageSquare } from 'lucide-react';
import Sidebar from './Sidebar';


export default function Chat() {
  const [activeView, setActiveView] = useState<'map' | 'chat'>('map');

  const dummyNearbyPatients = [
    { id: 1, name: 'John Doe', distance: '0.5 miles', lastActive: '5 min ago' },
    { id: 2, name: 'Jane Smith', distance: '1.2 miles', lastActive: '15 min ago' },
    { id: 3, name: 'Robert Johnson', distance: '2.0 miles', lastActive: '1 hour ago' },
  ];

  return (<>
  <Sidebar/>
    <div className={`bg-white rounded-xl shadow-lg p-6 ml-72`}>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveView('map')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            activeView === 'map'
              ? 'bg-purple-600 text-white'
              :  'bg-gray-100 text-gray-600'
          }`}
        >
          <MapPin className="h-5 w-5 mr-2" />
          Nearby Patients
        </button>
        <button
          onClick={() => setActiveView('chat')}
          className="flex items-center px-4 py-2 rounded-lg"
            
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          Chat
        </button>
      </div>

      {activeView === 'map' ? (
        <div>
          <div className="mb-6 rounded-lg overflow-hidden">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik"
              className="w-full h-[400px] border-0"
            ></iframe>
          </div>
          <div className="space-y-4">
            {dummyNearbyPatients.map((patient) => (
              <div
                key={patient.id}
                className={`flex items-center justify-between p-4 rounded-lg  'bg-gray-50'`}
              >
                <div>
                  <h3 className={`font-semibold  'text-gray-900'`}>
                    {patient.name}
                  </h3>
                  <p className={`text-sm  'text-gray-600'`}>
                    {patient.distance} away • {patient.lastActive}
                  </p>
                </div>
                <button
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  onClick={() => setActiveView('chat')}
                >
                  Chat
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-[600px] flex flex-col">
          <div className={`flex-1  'bg-gray-50' rounded-lg p-4 mb-4 overflow-y-auto`}>
            {/* Chat messages would go here */}
            <div className="text-center text-gray-500 my-4">
              Select a patient to start chatting
            </div>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              className={`flex-1 px-4 py-2 rounded-lg ${
                'bg-gray-100 text-gray-900 placeholder-gray-500'
              }`}
            />
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
