
import { useState, useRef, useEffect, useCallback } from 'react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ParallaxImage = ({ src, alt, className = "" }: ParallaxImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastMoveRef = useRef<{x: number, y: number}>({ x: 0, y: 0 });
  
  // Create intersection observer with optimized options
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Disconnect once visible
        }
      },
      {
        root: null,
        rootMargin: '30% 0%', // Increased rootMargin for earlier loading
        threshold: 0.01, // Lower threshold for faster detection
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Optimized image loading with priority hints
  useEffect(() => {
    if (!isVisible) return;
    
    const img = new Image();
    
    // Set loading priority based on className
    const isPriority = className.includes('hero');
    
    if (isPriority) {
      img.fetchPriority = 'high';
    }
    
    img.onload = () => setIsLoaded(true);
    img.src = src;
    
    return () => {
      img.onload = null;
    };
  }, [isVisible, src, className]);

  // Optimized mousemove handler with frame limiting and interpolation
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !imgRef.current) return;
    
    // Get mouse position relative to container
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    // Store the target position
    lastMoveRef.current = { x, y };
    
    // Use RAF for smoother animation with frame limiting
    if (!frameRef.current) {
      frameRef.current = requestAnimationFrame(() => {
        if (imgRef.current) {
          // Apply transform with hardware acceleration
          imgRef.current.style.transform = 
            `translate3d(${lastMoveRef.current.x * 10}px, ${lastMoveRef.current.y * 10}px, 0) scale(1.05)`;
        }
        frameRef.current = null;
      });
    }
  }, []);

  // Reset transform smoothly on mouse leave
  const handleMouseLeave = useCallback(() => {
    if (imgRef.current) {
      imgRef.current.style.transition = 'transform 0.3s ease-out';
      imgRef.current.style.transform = 'translate3d(0, 0, 0) scale(1)';
      
      // Reset transition after animation completes
      setTimeout(() => {
        if (imgRef.current) {
          imgRef.current.style.transition = 'transform 0.05s linear';
        }
      }, 300);
    }
  }, []);

  return (
    <div 
      ref={ref}
      className={`overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {isVisible && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          fetchPriority={className.includes('hero') ? 'high' : 'auto'}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
            transition: 'transform 0.05s linear',
          }}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default ParallaxImage;
