import { motion } from "framer-motion";

const BackgroundParticles = () => {
  const particles = [...Array(30)].map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 20 + 10,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
  }));

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pl-72 p-6">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-400/20"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -20, 20, 0],
              scale: [1, 1.5, 1, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundParticles;
