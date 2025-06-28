
import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [animationStage, setAnimationStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simplified timing for smoother experience
    // Stage 0: Initial state
    // Stage 1: Background appears (0.2s)
    // Stage 2: Loading elements appear (0.8s)
    // Stage 3: Progress animation (1.5s)
    // Stage 4: Complete and fade out (2.8s)
    
    const stage1Timer = setTimeout(() => setAnimationStage(1), 200);
    const stage2Timer = setTimeout(() => setAnimationStage(2), 800);
    const stage3Timer = setTimeout(() => setAnimationStage(3), 1500);
    const stage4Timer = setTimeout(() => setAnimationStage(4), 2800);
    
    // Smoother progress animation
    const progressTimer = setTimeout(() => {
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += Math.random() * 8 + 3;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(progressInterval);
        }
        setProgress(currentProgress);
      }, 80);
    }, 1500);
    
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(stage1Timer);
      clearTimeout(stage2Timer);
      clearTimeout(stage3Timer);
      clearTimeout(stage4Timer);
      clearTimeout(progressTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Optimized gradient background */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-out will-change-transform
          ${animationStage >= 1 
            ? 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900' 
            : 'bg-white dark:bg-gray-950'
          }
          ${animationStage >= 4 ? 'opacity-0' : 'opacity-100'}
        `}
      />
      
      {/* Simplified geometric background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large circle - reduced complexity */}
        <div 
          className={`absolute -top-32 -right-32 w-96 h-96 rounded-full transition-all duration-1000 ease-out will-change-transform
            ${animationStage >= 1 
              ? 'bg-gradient-to-br from-blue-100/15 to-teal-100/15 dark:from-blue-900/8 dark:to-teal-900/8 scale-100' 
              : 'bg-transparent scale-0'
            }
          `}
        />
        {/* Medium circle */}
        <div 
          className={`absolute -bottom-24 -left-24 w-72 h-72 rounded-full transition-all duration-1000 ease-out delay-100 will-change-transform
            ${animationStage >= 1 
              ? 'bg-gradient-to-tr from-teal-100/10 to-green-100/10 dark:from-teal-900/5 dark:to-green-900/5 scale-100' 
              : 'bg-transparent scale-0'
            }
          `}
        />
        {/* Reduced floating elements for better performance */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full transition-all duration-1000 ease-out will-change-transform
              ${animationStage >= 2 
                ? 'bg-gradient-to-r from-blue-300/30 to-teal-300/30 opacity-100' 
                : 'bg-transparent opacity-0'
              }
            `}
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + (i % 2) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              transform: animationStage >= 2 ? `translateY(${Math.sin(i) * 10}px)` : 'translateY(0)'
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          
          {/* App name with optimized typography */}
          <div 
            className={`transform transition-all duration-600 ease-out will-change-transform
              ${animationStage >= 2 
                ? 'translate-y-0 opacity-100 scale-100' 
                : 'translate-y-8 opacity-0 scale-95'
              }
            `}
          >
            <h1 className="text-4xl font-light text-gray-800 dark:text-gray-100 tracking-[0.3em] mb-4">
              UNSEENCARE
            </h1>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto" />
          </div>
          
          {/* Optimized loading indicator */}
          <div 
            className={`mt-16 transform transition-all duration-500 ease-out will-change-transform
              ${animationStage >= 2 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-6 opacity-0'
              }
            `}
          >
            {/* Simplified animated dots */}
            <div className="flex space-x-3 mb-8">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-in-out will-change-transform
                    ${animationStage >= 2 
                      ? 'bg-gradient-to-r from-blue-400 to-teal-400' 
                      : 'bg-gray-300 dark:bg-gray-600'
                    }
                  `}
                  style={{
                    animation: animationStage >= 2 ? `pulse 1.2s ease-in-out infinite ${index * 0.15}s` : 'none',
                    transform: animationStage >= 2 ? 'scale(1)' : 'scale(0.8)'
                  }}
                />
              ))}
            </div>
            
            {/* Optimized progress bar */}
            <div className="w-80 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Loading...</span>
                <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r from-blue-500 to-teal-400 rounded-full transition-all duration-200 ease-out will-change-transform
                    ${animationStage >= 3 ? 'opacity-100' : 'opacity-0'}
                  `}
                  style={{ width: `${progress}%` }}
                >
                  {/* Subtle shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Loading text */}
          <div 
            className={`mt-12 transform transition-all duration-500 ease-out will-change-transform
              ${animationStage >= 3 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-4 opacity-0'
              }
            `}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light tracking-wide">
              Preparing your experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
