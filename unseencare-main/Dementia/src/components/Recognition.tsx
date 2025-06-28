import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScanFace,
  Box,
  ShieldCheck,
  Brain,
  Sparkles,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import Sidebar from './Sidebar';

export default function Recognition() {
  const [activeSection, setActiveSection] = useState<'face' | 'object' | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function triggerTraining() {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/train", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      setMessage(data.message || "Training completed successfully!");
    } catch (err) {
      setMessage("Error during training process");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const triggerDetection = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/detect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setMessage(data.message || "Detection started successfully");
    } catch (error) {
      setMessage("Error starting object detection.");
    } finally {
      setIsLoading(false);
    }
  };

  const features = {
    face: [
      { icon: ScanFace, title: 'Facial Recognition', description: 'Advanced AI-powered facial detection and recognition' },
      { icon: Brain, title: 'Memory Association', description: 'Links faces with stored memories and relationships' },
      { icon: ShieldCheck, title: 'Privacy Protected', description: 'Enterprise-grade security for personal data' },
    ],
    object: [
      { icon: Box, title: 'Object Detection', description: 'Identifies everyday objects and their purpose' },
      { icon: AlertCircle, title: 'Safety Alerts', description: 'Warns about potentially dangerous items' },
      { icon: Sparkles, title: 'Context Awareness', description: 'Understands object relationships and usage' },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-300/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 pl-0 sm:pl-20 ml-96">
        <Sidebar/>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12 px-4 sm:px-0"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700">
            Smart Recognition Technology
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
            Experience the power of advanced AI recognition systems designed to enhance daily life and safety for individuals with dementia.
          </p>
        </motion.div>

        {/* Main Recognition Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 px-4 sm:px-0">
          {/* Face Recognition Section */}
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setActiveSection('face')}
            onHoverEnd={() => setActiveSection(null)}
          >
            <div className="h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden relative shadow-md">
              <img
                src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?q=80&w=2669&auto=format&fit=crop"
                alt="Face Recognition"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/80 via-pink-800/40 to-transparent" />
              
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end text-white">
                <div>
                  <div className="flex items-center mb-2">
                    <ScanFace className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
                    <h3 className="text-xl sm:text-2xl font-bold">Face Recognition</h3>
                  </div>
                  <p className="text-sm sm:text-base text-pink-100 mb-4">
                    Advanced facial recognition system that helps identify familiar faces and maintain social connections.
                  </p>

                  <motion.button
                    onClick={triggerTraining}
                    disabled={isLoading}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-center gap-1 bg-white text-pink-700 font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-pink-50 transition-all ${isLoading ? 'opacity-70' : ''}`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-pink-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing
                      </>
                    ) : (
                      <>
                        Train Model <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Object Recognition Section */}
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setActiveSection('object')}
            onHoverEnd={() => setActiveSection(null)}
          >
            <div className="h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden relative shadow-md">
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop"
                alt="Object Recognition"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-rose-800/40 to-transparent" />
              
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end text-white">
                <div>
                  <div className="flex items-center mb-2">
                    <Box className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
                    <h3 className="text-xl sm:text-2xl font-bold">Object Recognition</h3>
                  </div>
                  <p className="text-sm sm:text-base text-rose-100 mb-4">
                    Advanced object detection system that identifies objects in real-time and provides contextual information.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <motion.button
                      onClick={triggerTraining}
                      disabled={isLoading}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center justify-center gap-1 bg-white text-rose-700 font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-rose-50 transition-all ${isLoading ? 'opacity-70' : ''}`}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-rose-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing
                        </>
                      ) : (
                        <>
                          Train Model <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      onClick={triggerDetection}
                      disabled={isLoading}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-1 bg-green-500 text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-green-600 transition-all"
                    >
                      Start Detection <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                  
                  {message && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 text-xs sm:text-sm text-rose-200 bg-white/20 backdrop-blur-sm px-3 py-1 rounded"
                    >
                      {message}
                    </motion.p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <AnimatePresence mode="wait">
          {activeSection && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 px-4 sm:px-0"
            >
              {features[activeSection].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/90 p-4 rounded-lg shadow-sm border border-pink-200"
                >
                  <feature.icon className="w-8 h-8 mb-3 text-pink-600" />
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-xl p-6 sm:p-8 mx-4 sm:mx-0 shadow-md"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">Get Started Today</h2>
          <p className="text-sm sm:text-base text-pink-100 mb-4 max-w-xl mx-auto">
            Ready to experience the future of AI-powered recognition technology? Contact us to learn more about our solutions.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-1 mx-auto bg-white text-pink-600 font-medium px-6 py-2 rounded-lg shadow-sm hover:bg-pink-50 transition-all"
          >
            Contact Us <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}