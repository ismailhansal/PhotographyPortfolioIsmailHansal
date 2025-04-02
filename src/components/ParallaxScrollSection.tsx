
import { useRef, useEffect, ReactNode } from 'react';

interface ParallaxScrollSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number; // Speed multiplier for parallax effect
  direction?: 'up' | 'down';
}

const ParallaxScrollSection = ({ 
  children, 
  className = "", 
  speed = 0.2,
  direction = 'up'
}: ParallaxScrollSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;
    
    // Use a multiplier based on direction
    const multiplier = direction === 'up' ? -1 : 1;
    
    // Store refs locally to avoid closure issues
    const sectionElement = sectionRef.current;
    const contentElement = contentRef.current;
    
    // Function to calculate and apply parallax transform
    const applyParallax = () => {
      // Get section position relative to viewport
      const rect = sectionElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the section is visible in the viewport
      const visiblePercentage = Math.max(0, 
        Math.min(1, 
          (viewportHeight - rect.top) / (viewportHeight + rect.height)
        )
      );
      
      // Calculate transform distance based on visibility percentage
      const translateY = multiplier * speed * (visiblePercentage * 100);
      
      // Apply the transform with hardware acceleration
      contentElement.style.transform = `translate3d(0, ${translateY}px, 0)`;
    };
    
    // Calculate initial position
    applyParallax();
    
    // Use passive true for better scroll performance
    window.addEventListener('scroll', applyParallax, { passive: true });
    window.addEventListener('resize', applyParallax, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', applyParallax);
      window.removeEventListener('resize', applyParallax);
    };
  }, [speed, direction]);
  
  return (
    <div 
      ref={sectionRef} 
      className={`relative overflow-hidden ${className}`}
    >
      <div 
        ref={contentRef} 
        className="w-full h-full will-change-transform"
        style={{ 
          transition: 'transform 0.05s linear',
          backfaceVisibility: 'hidden'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxScrollSection;
