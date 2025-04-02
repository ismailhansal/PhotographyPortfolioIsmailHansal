
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500); // Delay hiding to show 100%
          return 100;
        }
        return newProgress;
      });
    }, 200);

    // Set a maximum timeout to ensure preloader doesn't get stuck
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setLoading(false), 500);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader className="w-12 h-12 text-white" />
            </motion.div>
          </motion.div>
          
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl mb-4 tracking-wider uppercase font-light text-white"
          >
            Loading
          </motion.h2>
          
          <div className="w-64 mb-2">
            <Progress value={progress} className="h-1 bg-gray-800" />
          </div>
          
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
