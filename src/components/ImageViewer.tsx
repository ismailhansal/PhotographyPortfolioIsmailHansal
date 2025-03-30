
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ImageViewerProps {
  images: {id: number, src: string, alt: string}[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const ImageViewer = ({ images, initialIndex, isOpen, onClose }: ImageViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const viewerRef = useRef<HTMLDivElement>(null);
  
  // Handle key presses for navigation and closing
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    };
  }, [isOpen, currentIndex]);
  
  // Reset to initial index when viewer is opened
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      ref={viewerRef}
    >
      <div 
        className="absolute top-4 right-4 text-white text-2xl cursor-pointer z-20"
        onClick={onClose}
      >
        ×
      </div>
      
      <div className="w-full h-full flex items-center justify-center relative">
        <button
          onClick={handlePrev}
          className="absolute left-4 z-10 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-all"
          aria-label="Previous image"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="w-full h-full flex items-center justify-center p-4 sm:p-10">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="max-h-full max-w-full object-contain animate-fade-in"
          />
        </div>
        
        <button
          onClick={handleNext}
          className="absolute right-4 z-10 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-all"
          aria-label="Next image"
        >
          <ArrowRight size={24} />
        </button>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <div className="flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
