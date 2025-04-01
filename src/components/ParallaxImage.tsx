
import { useState, useRef, useEffect } from 'react';

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '200px', // Larger margin for earlier loading
        threshold: 0.01, // Lower threshold for quicker detection
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
      
      // Clean up any pending animation frames
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  // Preload image
  useEffect(() => {
    if (isVisible) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setIsLoaded(true);
      };
    }
  }, [isVisible, src]);

  // Optimized parallax effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !imgRef.current) return;
    
    // Cancel any existing animation frame
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    // Schedule the animation in the next frame for better performance
    frameRef.current = requestAnimationFrame(() => {
      if (imgRef.current) {
        imgRef.current.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 0) scale(1.05)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    
    if (imgRef.current) {
      frameRef.current = requestAnimationFrame(() => {
        if (imgRef.current) {
          imgRef.current.style.transform = 'translate3d(0, 0, 0) scale(1)';
        }
      });
    }
  };

  return (
    <div 
      ref={ref}
      className={`overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {(isVisible) && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-300 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ 
            willChange: 'transform, opacity',
            transform: 'translate3d(0, 0, 0)', // Default transform with hardware acceleration
          }}
          onLoad={() => setIsLoaded(true)}
          loading="eager" // For initial viewport images
        />
      )}
    </div>
  );
};

export default ParallaxImage;
