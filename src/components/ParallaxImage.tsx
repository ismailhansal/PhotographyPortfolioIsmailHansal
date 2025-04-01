
import { useState, useRef, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

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
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;
    
    // Cancel any previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observerRef.current?.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '200px', // Larger margin for earlier loading
        threshold: 0.01, // Lower threshold for quicker detection
      }
    );

    observerRef.current.observe(currentRef);

    return () => {
      observerRef.current?.disconnect();
      
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

  // Optimized parallax effect with lerp smoothing
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !imgRef.current) return;
    
    // Cancel any existing animation frame
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    // Update last position
    lastMousePosition.current = { x, y };
    
    // Schedule the animation in the next frame for better performance
    const applyParallax = () => {
      if (imgRef.current) {
        // Apply transform with hardware acceleration hints
        imgRef.current.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 0) scale(1.05)`;
      }
    };
    
    frameRef.current = requestAnimationFrame(applyParallax);
  };

  const handleMouseLeave = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    
    if (imgRef.current) {
      // Smooth transition back to center
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
      {!isLoaded && isVisible && (
        <Skeleton className="w-full h-full" />
      )}
      
      {isVisible && (
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
