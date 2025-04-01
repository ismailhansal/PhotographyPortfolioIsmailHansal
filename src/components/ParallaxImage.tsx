
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
        rootMargin: '100px', // Load earlier for smoother appearance
        threshold: 0.1,
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

  // Preload image
  useEffect(() => {
    if (isVisible) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
    }
  }, [isVisible, src]);

  // Improved parallax effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    const imageElement = ref.current.querySelector('img');
    if (imageElement) {
      // Apply smooth transform with requestAnimationFrame
      requestAnimationFrame(() => {
        imageElement.style.transform = `translate(${x * 8}px, ${y * 8}px) scale(1.05)`;
      });
    }
  };

  const handleMouseLeave = () => {
    const imageElement = ref.current?.querySelector('img');
    if (imageElement) {
      requestAnimationFrame(() => {
        imageElement.style.transform = 'translate(0, 0) scale(1)';
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
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-500 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ 
            transitionDelay: '100ms',
            willChange: 'transform, opacity'
          }}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};

export default ParallaxImage;
