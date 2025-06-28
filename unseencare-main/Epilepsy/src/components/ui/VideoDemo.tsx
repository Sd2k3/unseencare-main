import React, { useState } from 'react';
import { Play, Upload, Video } from 'lucide-react';

const VideoDemo: React.FC = () => {
  const [hasVideo, setHasVideo] = useState(false);

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200/50 shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center justify-center space-x-2">
          <Video className="w-6 h-6 text-purple-500" />
          <span>App Demo Video</span>
        </h2>
        <p className="text-gray-600">See SeizureSavvy in action</p>
      </div>

      {!hasVideo ? (
        <div className="group relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center transition-all duration-300 hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto transform group-hover:scale-110 transition-all duration-300 shadow-lg">
              <Upload className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Upload Your Demo Video</h3>
              <p className="text-gray-500 mb-4">Showcase how SeizureSavvy helps manage epilepsy</p>
              <button 
                onClick={() => setHasVideo(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Choose Video File
              </button>
            </div>
          </div>
          
          {/* Animated Background Elements */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-purple-300 rounded-full animate-ping"></div>
          <div className="absolute top-8 right-8 w-2 h-2 bg-pink-300 rounded-full animate-ping animation-delay-1000"></div>
          <div className="absolute bottom-6 left-8 w-4 h-4 bg-indigo-300 rounded-full animate-ping animation-delay-2000"></div>
        </div>
      ) : (
        <div className="relative h-80 bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <button className="group w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-110">
              <Play className="w-8 h-8 text-white ml-1 group-hover:scale-125 transition-all duration-300" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 z-20 text-white">
            <h3 className="text-lg font-semibold">SeizureSavvy Demo</h3>
            <p className="text-sm opacity-90">Learn how to use the app effectively</p>
          </div>
          
          {/* Placeholder Background */}
          <div className="w-full h-full bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 opacity-80"></div>
        </div>
      )}

      {/* Video Features */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Play className="w-6 h-6 text-purple-600" />
          </div>
          <h4 className="font-semibold text-gray-800">Interactive Demo</h4>
          <p className="text-sm text-gray-600">Step-by-step walkthrough</p>
        </div>
        
        <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Video className="w-6 h-6 text-pink-600" />
          </div>
          <h4 className="font-semibold text-gray-800">Feature Overview</h4>
          <p className="text-sm text-gray-600">All key functionalities</p>
        </div>
        
        <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Upload className="w-6 h-6 text-indigo-600" />
          </div>
          <h4 className="font-semibold text-gray-800">Easy Setup</h4>
          <p className="text-sm text-gray-600">Quick start guide</p>
        </div>
      </div>
    </div>
  );
};

export default VideoDemo;
