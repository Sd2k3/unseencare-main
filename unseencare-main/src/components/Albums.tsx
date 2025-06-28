import React, { useState } from 'react';
import { Plus, User2, X } from 'lucide-react';
import Sidebar from './Sidebar';
export default function Albums() {
  const [activeTab, setActiveTab] = useState('All Memories');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddMemory, setShowAddMemory] = useState(false);
  const [newMemory, setNewMemory] = useState({
    title: '',
    date: '',
    description: '',
    image: ''
  });
  const tabs = ['All Memories', 'Albums', 'People'];

  const [memories, setMemories] = useState([
    {
      id: 1,
      title: 'Family Reunion 2019',
      date: 'July 15, 2019',
      description: 'The whole family gathered at the lake house',
      image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&q=80&w=1470'
    },
    {
      id: 2,
      title: 'Beach Vacation',
      date: 'August 3, 2022',
      description: 'Our trip to the coast last summer',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1473'
    },
    {
      id: 3,
      title: '60th Birthday Party',
      date: 'May 10, 2020',
      description: 'Celebration with friends and family',
      image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&q=80&w=1469'
    }
  ]);

  const people = [
    { 
      name: 'Sarah', 
      memories: 4,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    },
    { 
      name: 'Michael', 
      memories: 4,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    },
    { 
      name: 'Emma', 
      memories: 2,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
    },
    { 
      name: 'Robert', 
      memories: 2,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
    },
    { 
      name: 'Many friends', 
      memories: 1,
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200'
    },
    { 
      name: 'Parents', 
      memories: 1,
      image: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&q=80&w=200'
    },
    { 
      name: 'Spouse', 
      memories: 1,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    { 
      name: 'Family', 
      memories: 1,
      image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&q=80&w=200'
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredMemories = memories.filter(memory =>
    memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    memory.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = memories.length + 1;
    setMemories([...memories, { ...newMemory, id: newId }]);
    setShowAddMemory(false);
    setNewMemory({ title: '', date: '', description: '', image: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-8 ml-72">
      <Sidebar/>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text mb-2">Memory Album</h1>
          <p className="text-gray-600">Preserve and revisit important memories</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text mb-2">Memory Album</h2>
              <p className="text-gray-600">Browse through your collection of memories</p>
            </div>
            <button 
              onClick={() => setShowAddMemory(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <Plus className="w-5 h-5" />
              Add Memory
            </button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search memories, people, or albums..."
              className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 mb-8 border-b border-pink-100">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-all duration-300 ${
                  activeTab === tab
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-pink-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'People' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredPeople.map((person, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 text-center transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden ring-2 ring-pink-200">
                    <img 
                      src={person.image} 
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{person.name}</h3>
                  <p className="text-sm text-pink-600">{person.memories} memories</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMemories.map(memory => (
                <div 
                  key={memory.id} 
                  className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative h-48">
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <h3 className="text-white font-semibold text-lg">{memory.title}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-pink-600 mb-2">
                      <span>{memory.date}</span>
                    </div>
                    <p className="text-gray-600">{memory.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Memory Modal */}
      {showAddMemory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-xl transform transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">Add New Memory</h3>
              <button 
                onClick={() => setShowAddMemory(false)}
                className="text-gray-500 hover:text-pink-600 transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddMemory}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newMemory.title}
                    onChange={(e) => setNewMemory({...newMemory, title: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newMemory.date}
                    onChange={(e) => setNewMemory({...newMemory, date: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    value={newMemory.description}
                    onChange={(e) => setNewMemory({...newMemory, description: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={newMemory.image}
                    onChange={(e) => setNewMemory({...newMemory, image: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddMemory(false)}
                  className="px-4 py-2 text-gray-600 hover:text-pink-600 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-lg transition-all duration-300"
                >
                  Add Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}