import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  ScanFace,
  Box,
  ShieldCheck,
  Brain,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import Sidebar from './Sidebar';

export default function Recognition() {
  const [activeSection, setActiveSection] = useState<'face' | 'object' | null>(null);
  const [message, setMessage] = useState("");

  function triggerTraining() {
    fetch("http://localhost:5000/train", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }

  const triggerDetection = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/detect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error starting object detection.");
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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

      <div className="relative z-10 max-w-7xl mx-auto px-20 py-12">
        <Sidebar/>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700">
            Smart Recognition Technology
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Experience the power of advanced AI recognition systems designed to enhance daily life and safety for individuals with dementia.
          </p>
        </motion.div>

        {/* Main Recognition Sections */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Face Recognition Section */}
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.03 }}
            onHoverStart={() => setActiveSection('face')}
            onHoverEnd={() => setActiveSection(null)}
          >
            <div className="h-[450px] rounded-3xl overflow-hidden relative shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?q=80&w=2669&auto=format&fit=crop"
                alt="Face Recognition"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Animated overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-pink-900/90 via-pink-800/50 to-transparent"
                whileHover={{ 
                  background: "linear-gradient(to top, rgba(190, 24, 93, 0.95), rgba(190, 24, 93, 0.6), transparent)" 
                }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Floating particles effect on hover */}
              <AnimatePresence>
                {activeSection === 'face' && (
                  <>
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-pink-300 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0], 
                          scale: [0, 1.5, 0],
                          x: Math.random() * 400 - 200,
                          y: Math.random() * 400 - 200,
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                        style={{
                          left: '50%',
                          top: '50%',
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center mb-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ScanFace className="w-10 h-10 mr-4" />
                    </motion.div>
                    <h3 className="text-4xl font-bold">Face Recognition</h3>
                  </div>
                  <p className="text-lg text-pink-100 mb-6 leading-relaxed">
                    Advanced facial recognition system that helps identify familiar faces and maintain social connections.
                  </p>

                  <motion.button
                    onClick={triggerTraining}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-pink-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-pink-50 transition-all duration-300"
                  >
                    Train Model
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Object Recognition Section */}
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.03 }}
            onHoverStart={() => setActiveSection('object')}
            onHoverEnd={() => setActiveSection(null)}
          >
            <div className="h-[450px] rounded-3xl overflow-hidden relative shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop"
                alt="Object Recognition"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Animated overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-rose-900/90 via-rose-800/50 to-transparent"
                whileHover={{ 
                  background: "linear-gradient(to top, rgba(225, 29, 72, 0.95), rgba(225, 29, 72, 0.6), transparent)" 
                }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Floating particles effect on hover */}
              <AnimatePresence>
                {activeSection === 'object' && (
                  <>
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-rose-300 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0], 
                          scale: [0, 1.5, 0],
                          x: Math.random() * 400 - 200,
                          y: Math.random() * 400 - 200,
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                        style={{
                          left: '50%',
                          top: '50%',
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center mb-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Box className="w-10 h-10 mr-4" />
                    </motion.div>
                    <h3 className="text-4xl font-bold">Object Recognition</h3>
                  </div>
                  <p className="text-lg text-rose-100 mb-6 leading-relaxed">
                    Advanced object detection system that identifies objects in real-time and provides contextual information.
                  </p>

                  <div className="flex gap-4">
                    <motion.button
                      onClick={triggerTraining}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-rose-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-rose-50 transition-all duration-300"
                    >
                      Train Model
                    </motion.button>

                    <motion.button
                      onClick={triggerDetection}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300"
                    >
                      Start Detection
                    </motion.button>
                  </div>
                  
                  {message && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-rose-200 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
                    >
                      {message}
                    </motion.p>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <AnimatePresence mode="wait">
          {activeSection && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="grid md:grid-cols-3 gap-8 mb-16"
            >
              {features[activeSection].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -10,
                    transition: { duration: 0.2 }
                  }}
                  className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-pink-200 hover:shadow-2xl transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-14 h-14 mb-6 text-pink-600" />
                  </motion.div>
                  <h4 className="text-2xl font-semibold mb-4 text-gray-800">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-3xl p-12 shadow-2xl"
        >
          <h2 className="text-4xl font-bold mb-8 text-white">Get Started Today</h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Ready to experience the future of AI-powered recognition technology? Contact us to learn more about our solutions.
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-pink-600 px-10 py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-pink-50 transition-all duration-300"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
