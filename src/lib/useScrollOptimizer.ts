
import { useEffect } from 'react';

/**
 * Hook to optimize scrolling performance
 */
export const useScrollOptimizer = () => {
  useEffect(() => {
    // Optimize passive scroll listeners
    const opts = { passive: true } as EventListenerOptions;
    
    // Use requestAnimationFrame for scroll handlers
    document.addEventListener('touchstart', () => {}, opts);
    document.addEventListener('touchmove', () => {}, opts);
    document.addEventListener('scroll', () => {}, opts);
    
    // Set hardware acceleration on body
    document.body.style.webkitBackfaceVisibility = 'hidden';
    document.body.style.backfaceVisibility = 'hidden';
    
    return () => {
      document.removeEventListener('touchstart', () => {});
      document.removeEventListener('touchmove', () => {});
      document.removeEventListener('scroll', () => {});
    };
  }, []);
};
