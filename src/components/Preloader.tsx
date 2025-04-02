
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Optimize preloader to avoid excessive re-renders
    let animationFrameId: number;
    let startTime = performance.now();
    const duration = 2500; // Slightly shorter for better UX
    
    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const newProgress = Math.min(100, (elapsed / duration) * 100);
      
      setProgress(newProgress);
      
      if (newProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => setLoading(false), 300); // Reduced delay
      }
    };
    
    animationFrameId = requestAnimationFrame(updateProgress);

    // Set a maximum timeout to ensure preloader doesn't get stuck
    const timeout = setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      setProgress(100);
      setTimeout(() => setLoading(false), 300);
    }, 3000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }} // Slightly faster transition
          className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-1 bg-white w-64 overflow-hidden mb-4"
            style={{ maxWidth: '300px', willChange: 'width' }} // Added willChange for better performance
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 text-sm"
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
