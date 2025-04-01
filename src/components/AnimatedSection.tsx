
import { useRef, useEffect, useState, ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

const AnimatedSection = ({ 
  children, 
  className = "", 
  delay = 0,
  threshold = 0.1
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;
    
    // Cancel any previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Create the observer with performance optimizations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Use requestAnimationFrame for smoother animation scheduling
          requestAnimationFrame(() => {
            setIsVisible(true);
          });
          
          // Unobserve after animation is triggered to save resources
          observerRef.current?.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '20px',
        threshold: threshold, // Lower threshold for earlier detection
      }
    );

    observerRef.current.observe(currentRef);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold]);

  // Optimize animation with hardware acceleration hints
  const animationStyle = {
    opacity: 0,
    transform: 'translateY(20px) translateZ(0)', // Added translateZ for hardware acceleration
    transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: 'opacity, transform',
  };

  const visibleStyle = {
    opacity: 1,
    transform: 'translateY(0) translateZ(0)',
  };

  return (
    <div
      ref={ref}
      className={className}
      style={isVisible ? { ...animationStyle, ...visibleStyle } : animationStyle}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
