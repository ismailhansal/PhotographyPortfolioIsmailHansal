
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
        // More reliable check with a small threshold
        if (entry.isIntersecting) {
          // Small timeout to ensure DOM is ready for animation
          setTimeout(() => {
            setIsVisible(true);
          }, 50);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.15, // Slightly higher threshold for better timing
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

  // Improved animation style with better performance hints
  const animationStyle = {
    opacity: 0,
    transform: 'translateY(20px)',
    transition: `opacity 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) ${delay}ms, transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) ${delay}ms`,
    willChange: 'opacity, transform',
  };

  const visibleStyle = {
    opacity: 1,
    transform: 'translateY(0)',
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
