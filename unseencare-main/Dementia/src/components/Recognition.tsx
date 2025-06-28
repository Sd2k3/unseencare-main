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
import Form from './form';

export default function Recognition() {
  const [activeSection, setActiveSection] = useState<'face' | 'object' | null>(null);

  function triggerTraining() {
    fetch("http://localhost:5000/train", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ /* any needed data */ }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }

  const [message, setMessage] = useState("");

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
  const particles = [...Array(30)].map((_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    duration: Math.random() * 20 + 10,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    delay: Math.random() * 5,
  }));

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
    <>
    
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 relative overflow-hidden">
      {/* Animated Background Particles */}
      <Sidebar/>  
      
      <div className="max-w-7xl mx-auto ml-72">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Smart Recognition Technology
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of advanced AI recognition systems designed to enhance daily life and safety for individuals with dementia.
          </p>
        </motion.div>

        {/* Main Recognition Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Face Recognition Section */}
          {/* Face Recognition Section */}
<motion.div
  className="relative"
  whileHover={{ scale: 1.02 }}
  onHoverStart={() => setActiveSection('face')}
  onHoverEnd={() => setActiveSection(null)}
>
  <div className="h-[400px] rounded-3xl overflow-hidden relative group">
    <img
      src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?q=80&w=2669&auto=format&fit=crop"
      alt="Face Recognition"
      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-purple-900/30 group-hover:from-purple-900/95 group-hover:to-purple-900/40 transition-all duration-500" />
    
    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-4">
          <Camera className="w-8 h-8 mr-3" />
          <h3 className="text-3xl font-bold">Face Recognition</h3>
        </div>
        <p className="text-lg text-purple-100">
          Advanced facial recognition system that helps identify familiar faces and maintain social connections.
        </p>

        {/* 2. Add the button here */}
        <button
          onClick={triggerTraining}
          className="mt-4 bg-white text-purple-700 font-semibold px-4 py-2 rounded-md shadow hover:bg-purple-100 transition-colors"
        >
          Train Model
        </button>
      </motion.div>
    </div>
  </div>
</motion.div>

        </div>
        
    <div>
      {/* Main Recognition Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Face Recognition Section */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.02 }}
          onHoverStart={() => setActiveSection("face")}
          onHoverEnd={() => setActiveSection(null)}
        >
          <div className="h-[400px] rounded-3xl overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?q=80&w=2669&auto=format&fit=crop"
              alt="Face Recognition"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-purple-900/30 group-hover:from-purple-900/95 group-hover:to-purple-900/40 transition-all duration-500" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <Camera className="w-8 h-8 mr-3" />
                  <h3 className="text-3xl font-bold">Object Recognition</h3>
                </div>
                <p className="text-lg text-purple-100">
                  Advanced object detection system that identifies objects in real-time.
                </p>

                {/* Train Model Button */}
                <button
                  onClick={triggerTraining}
                  className="mt-4 bg-white text-purple-700 font-semibold px-4 py-2 rounded-md shadow hover:bg-purple-100 transition-colors"
                >
                  Train Model
                </button>

                {/* Start Detection Button */}
                <button
                  onClick={triggerDetection}
                  className="mt-4 bg-green-500 text-white font-semibold px-4 py-2 rounded-md shadow hover:bg-green-600 transition-colors ml-4"
                >
                  Start Detection
                </button>

                {/* Message */}
                {message && <p className="mt-2 text-purple-200">{message}</p>}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

        {/* Features Grid */}
        <AnimatePresence mode="wait">
          {activeSection && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-3 gap-6 mb-16"
            >
              {features[activeSection].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-purple-100"
                >
                  <feature.icon className="w-12 h-12 mb-4 text-purple-600" />
                  <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Demo Video Section */}
       

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-white flex flex-col items-center"
        >
          <h2 className="text-3xl font-bold mb-6 text-purple-100 ">Contact Us for More Information</h2>
          <p className="text-xl  text-purple-100">
            <input type="text" placeholder="Enter your email"  className='bg-white rounded-xl p-2 m-6 w-1/2  top-6 left-6 '/>
            <input type="text" placeholder="Enter your phone number" className='bg-white rounded-xl p-2 m-6 w-1/2 top-6 left-6 '/>
            <input type="text" placeholder="Enter your message" className='bg-white rounded-xl p-2 m-6 w-1/2  top-6 left-9 '/>
          </p>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'white-200' }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-shadow"
          >
            Send Message
          </motion.button>
        </motion.div>




        <Form/>
      </div>
    </div>
    </>
  );
}