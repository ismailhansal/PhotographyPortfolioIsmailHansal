
import { useRef, useEffect, useState, ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSection = ({ children, className = "", delay = 0 }: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Use requestAnimationFrame for smoother animation scheduling
          requestAnimationFrame(() => {
            setIsVisible(true);
          });
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Lower threshold for earlier detection
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Optimize animation with hardware acceleration hints
  const animationStyle = {
    opacity: 0,
    transform: 'translateY(20px) translateZ(0)', // Added translateZ for hardware acceleration
    transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`,
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
