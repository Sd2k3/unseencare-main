import React, { useState } from 'react';
import { Pill, Stethoscope, Bell, Sun, Moon, X, Plus, Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { format } from 'date-fns';
import Sidebar from './Sidebar';

interface Reminder {
  id: string;
  category: string;
  title: string;
  time: string;
  date?: string;
  recurring?: string;
}

export default function Reminders() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      category: 'Medicine',
      title: 'Take morning medication',
      time: '9:00 AM',
      recurring: 'Daily',
    },
    {
      id: '2',
      category: 'Doctor Visits',
      title: 'Neurologist appointment',
      time: '2:30 PM',
      date: 'March 15, 2024',
    },
    {
      id: '3',
      category: 'Other',
      title: 'Memory exercise session',
      time: '10:00 AM',
      recurring: 'Weekly',
    },
  ]);

  const [newReminder, setNewReminder] = useState({
    title: '',
    category: 'Medicine',
    time: '',
    date: '',
    recurring: '',
  });

  const categories = [
    { icon: Pill, label: 'Medicine', count: reminders.filter(r => r.category === 'Medicine').length },
    { icon: Stethoscope, label: 'Doctor Visits', count: reminders.filter(r => r.category === 'Doctor Visits').length },
    { icon: Bell, label: 'Other', count: reminders.filter(r => r.category === 'Other').length },
  ];

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  const handleAddReminder = () => {
    if (newReminder.title && newReminder.time) {
      const reminder: Reminder = {
        id: Date.now().toString(),
        ...newReminder,
      };
      setReminders([...reminders, reminder]);
      setIsModalOpen(false);
      setNewReminder({
        title: '',
        category: 'Medicine',
        time: '',
        date: '',
        recurring: '',
      });
    }
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  return (
    <>
      
      <div className="min-h-screen w-full relative overflow-hidden ml-30">
        <Sidebar />
        <div className="fixed inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-purple-200/20 to-pink-200/20"
              style={{
                width: `${Math.random() * 400 + 100}px`,
                height: `${Math.random() * 400 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="relative max-w-4xl mx-auto px-4 py-12"
        >
          <Sidebar />
          <motion.div
            className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8"
            variants={itemVariants}
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Daily Care Reminders
              </h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100"
              >
                {isDarkMode ? (
                  <Sun className="h-6 w-6 text-indigo-600" />
                ) : (
                  <Moon className="h-6 w-6 text-purple-600" />
                )}
              </motion.button>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {categories.map(({ icon: Icon, label, count }) => (
                <motion.div
                  key={label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-white to-purple-50 hover:from-purple-50 hover:to-indigo-50 transition-colors duration-200 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100">
                      <Icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <span className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-800">
                      {count}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900">{label}</h3>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              {reminders.map((reminder) => (
                <motion.div
                  key={reminder.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-white to-purple-50 hover:from-purple-50 hover:to-indigo-50 transition-colors duration-200 shadow-lg relative group"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteReminder(reminder.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4 text-red-600" />
                  </motion.button>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-lg text-gray-900">
                      {reminder.title}
                    </h4>
                    <span className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-800">
                      {reminder.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {reminder.time} • {reminder.recurring || reminder.date}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white rounded-xl shadow-lg hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800 transition-all duration-200 flex items-center justify-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Reminder
            </motion.button>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">New Reminder</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newReminder.title}
                      onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter reminder title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={newReminder.category}
                      onChange={(e) => setNewReminder({ ...newReminder, category: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Medicine">Medicine</option>
                      <option value="Doctor Visits">Doctor Visits</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      value={newReminder.time}
                      onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={newReminder.date}
                      onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Recurring (Optional)
                    </label>
                    <select
                      value={newReminder.recurring}
                      onChange={(e) => setNewReminder({ ...newReminder, recurring: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Not recurring</option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddReminder}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700"
                  >
                    Add Reminder
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}