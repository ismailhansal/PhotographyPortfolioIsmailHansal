
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
  
  // Memoize the observer callback
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      observerCallback,
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
  }, [observerCallback]);

  // Optimized image preloading
  useEffect(() => {
    if (!isVisible) return;
    
    // Use Image constructor for better control
    const img = new Image();
    // Add image decode for smoother rendering
    img.src = src;
    img.decode()
      .then(() => setIsLoaded(true))
      .catch(() => {
        // Fallback if decode not supported
        img.onload = () => setIsLoaded(true);
      });
      
    return () => {
      img.onload = null;
    };
  }, [isVisible, src]);

  // Optimized, throttled mousemove handler using RAF
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !imgRef.current) return;
    
    // Cancel any existing animation frame to prevent queueing
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    
    // Schedule the transform on the next animation frame
    frameRef.current = requestAnimationFrame(() => {
      if (!ref.current || !imgRef.current) return;
      
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      imgRef.current.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 0) scale(1.05)`;
    });
  }, []);

  // Optimized mouse leave handler
  const handleMouseLeave = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    
    if (imgRef.current) {
      // Use RAF for smoother reset animation
      frameRef.current = requestAnimationFrame(() => {
        if (imgRef.current) {
          imgRef.current.style.transform = 'translate3d(0, 0, 0) scale(1)';
        }
      });
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
          className={`w-full h-full object-cover transition-all duration-300 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ 
            willChange: 'transform, opacity',
            transform: 'translate3d(0, 0, 0)', // Default transform with hardware acceleration
          }}
          onLoad={() => setIsLoaded(true)}
          loading="lazy" // Change to lazy loading for all images
        />
      )}
    </div>
  );
};

export default ParallaxImage;
