import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Music2, 
  Heart,
  Repeat,
  Shuffle,
  Radio
} from 'lucide-react';
import Sidebar from './Sidebar';
import VoiceNotes from './VoiceNotes';
export default function MusicTherapy() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks = [
    {
      title: 'Love Story (Taylor\'s Version)',
      artist: 'Taylor Swift',
      duration: '3:56',
      cover: "https://images.unsplash.com/photo-1548778052-311f4bc2b502?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      spotifyEmbed: "https://open.spotify.com/embed/track/3CeCwYWvdfXbZLXFhBrbnf"
    },
    {
      title: 'Style',
      artist: 'Taylor Swift',
      duration: '3:51',
      cover: "https://images.unsplash.com/photo-1449748040579-354c191a7934?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      spotifyEmbed: "https://open.spotify.com/embed/track/0ug5NqcwcFR2xrfTkc7k8e"
    },
    {
      title: 'Cruel Summer',
      artist: 'Taylor Swift',
      duration: '2:58',
      cover: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2674&auto=format&fit=crop",
      spotifyEmbed: "https://open.spotify.com/embed/track/1BxfuPKGuaTgP7aM0Bbdwr"
    }
  ];

  // Animated background particles
  const particles = [...Array(30)].map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 20 + 10,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
  }));

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const playPrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  return (
    <>
      {/* <Sidebar /> */}
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pl-72 p-6 relative">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-purple-400/10"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.initialX}%`,
                top: `${particle.initialY}%`,
              }}
              animate={{
                x: [0, 30, -30, 0],
                y: [0, -20, 20, 0],
                scale: [1, 1.2, 0.8, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
        <Sidebar/>
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <Music2 className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Music Therapy
              </h1>
            </div>
            <p className="text-gray-600 ml-12">
              Enhance mood and cognitive function through therapeutic music sessions
            </p>
          </motion.div>

          {/* Main Player */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Current Track Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-purple-100"
            >
              <div className="p-6">
                <div className="flex items-start space-x-6">
                  <motion.img
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    src={tracks[currentTrack].cover}
                    alt={tracks[currentTrack].title}
                    className="w-32 h-32 object-cover rounded-xl shadow-lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">{tracks[currentTrack].title}</h2>
                    <p className="text-gray-600">{tracks[currentTrack].artist}</p>
                    
                    {/* Spotify Embed */}
                    <div className="mt-4 rounded-xl overflow-hidden h-[80px]">
                      <iframe
                        src={tracks[currentTrack].spotifyEmbed}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="encrypted-media"
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="mt-8">
                  <div className="flex items-center justify-center space-x-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsShuffling(!isShuffling)}
                      className={`p-2 rounded-full ${isShuffling ? 'text-purple-600' : 'text-gray-400'} hover:text-purple-600`}
                    >
                      <Shuffle className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={playPrevious}
                      className="p-2 rounded-full text-gray-600 hover:text-purple-600"
                    >
                      <SkipBack className="h-6 w-6" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={togglePlay}
                      className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white shadow-lg hover:shadow-xl transition-shadow"
                    >
                      {isPlaying ? (
                        <Pause className="h-8 w-8" />
                      ) : (
                        <Play className="h-8 w-8" />
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={playNext}
                      className="p-2 rounded-full text-gray-600 hover:text-purple-600"
                    >
                      <SkipForward className="h-6 w-6" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsRepeating(!isRepeating)}
                      className={`p-2 rounded-full ${isRepeating ? 'text-purple-600' : 'text-gray-400'} hover:text-purple-600`}
                    >
                      <Repeat className="h-5 w-5" />
                    </motion.button>
                  </div>

                  {/* Volume Control */}
                  <div className="mt-6 flex items-center space-x-4 px-4">
                    <Volume2 className="h-5 w-5 text-gray-600" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Playlist */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Radio className="h-5 w-5 text-purple-600" />
                <span>Therapeutic Playlist</span>
              </h3>
              <div className="space-y-3">
                {tracks.map((track, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setCurrentTrack(index)}
                    className={`w-full p-4 rounded-xl flex items-center space-x-4 transition-all ${
                      currentTrack === index
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'hover:bg-purple-50'
                    }`}
                  >
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 text-left">
                      <p className="font-medium">{track.title}</p>
                      <p className={`text-sm ${currentTrack === index ? 'text-purple-100' : 'text-gray-600'}`}>
                        {track.artist}
                      </p>
                    </div>
                    {currentTrack === index && isPlaying && (
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              height: ["4px", "12px", "4px"]
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                            className="w-1 bg-white rounded-full"
                          />
                        ))}
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <VoiceNotes/>
    </>
  );
}