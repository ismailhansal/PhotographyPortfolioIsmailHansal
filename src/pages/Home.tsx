
import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import ParallaxScrollSection from '../components/ParallaxScrollSection';
import gsap from 'gsap';
import { useIsMobile } from '../hooks/use-mobile';
import cabestan from '@/assets/cabestan.webp';
import ciel from '@/assets/ciel.webp';
import ducasse from '@/assets/ducasse.webp';
import immo from '@/assets/immo.webp';
import steak from '@/assets/steak.webp';
import portrait from '@/assets/portrait.webp';

import burgermobile from '@/assets/mobile/burger-mobile.webp';
import ducassemobile from '@/assets/mobile/ducasse-mobile.webp';
import immomobile from '@/assets/mobile/immo-mobile.webp';
import packomobile from '@/assets/mobile/packo-mobile.webp';
import pizzamobile from '@/assets/mobile/pizza-mobile.webp';

import meabout from '@/assets/me-about.webp'

// Desktop hero images
const desktopHeroImages = [
  ducasse,
  ciel,
  steak,
  immo,
  cabestan,
];

// Mobile hero images (portrait format)
const mobileHeroImages = [
  pizzamobile,
  ducassemobile,
  immomobile,
  burgermobile,
  packomobile
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Get the appropriate images based on device
  const [heroImages, setHeroImages] = useState<string[]>([]);
  
  // Preload images function with optimized loading
  const preloadImages = useCallback((imageUrls: string[]) => {
    let loadedCount = 0;
    const totalImages = imageUrls.length;
    
    return new Promise<void>((resolve) => {
      // Load first image with high priority, others with lower priority
      imageUrls.forEach((src, index) => {
        const img = new Image();
        
        // Set high priority for first image, low for others
        if (index === 0) {
          img.fetchPriority = 'high';
        }
        
        img.src = src;
        img.onload = img.onerror = () => {
          loadedCount++;
          
          // Resolve after first image loads for faster display
          if (loadedCount === 1) {
            setHeroImages([imageUrls[0]]);
            setImagesLoaded(true);
          }
          
          // Then load the rest of the images
          if (loadedCount === totalImages) {
            setHeroImages(imageUrls);
            resolve();
          }
        };
      });
    });
  }, []);
  
  // Update images when switching between mobile and desktop
  useEffect(() => {
    const currentImages = isMobile ? mobileHeroImages : desktopHeroImages;
    preloadImages(currentImages);
  }, [isMobile, preloadImages]);
  
  // Set up image cycle only after images are loaded
  useEffect(() => {
    if (!imagesLoaded || heroImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
    }, 1800);
    
    return () => clearInterval(interval);
  }, [heroImages, imagesLoaded]);
  
  // Enhanced text animations with GSAP
  useEffect(() => {
    if (textRef.current && imagesLoaded) {
      // Create animation timeline
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        }
      });
      
      // Animate text elements
      tl.fromTo(textRef.current.children, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15, 
          duration: 1.2,
        }
      )
      .fromTo(".letter", 
        { scale: 0.9, opacity: 0.5 },
        { 
          scale: 1, 
          opacity: 1, 
          stagger: 0.02, 
          duration: 0.5,
          ease: "back.out(1.5)"
        }, 
        "-=0.8"
      );
      
      // Add subtle animation for scroll indicator
      if (scrollIndicatorRef.current) {
        gsap.fromTo(scrollIndicatorRef.current,
          { opacity: 0, y: -20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            delay: 1.5,
            ease: "power2.out" 
          }
        );
      }
    }
  }, [imagesLoaded]);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Split text into individual letters for animation
  const splitTextIntoLetters = (text: string) => {
    return text.split('').map((letter, index) => (
      <span key={index} className="letter inline-block">{letter}</span>
    ));
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section with Dynamic Images */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black/70 z-0 overflow-hidden">
          {imagesLoaded && heroImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Hero image ${index + 1}`}
              className={`hero-image absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-70 active' : 'opacity-0'
              }`}
              style={{ 
                zIndex: index === currentImageIndex ? 1 : 0,
                willChange: 'opacity, transform'
              }}
            />
          ))}
        </div>
        
        <div ref={textRef} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-light mb-6 tracking-wider uppercase overflow-hidden">
            {splitTextIntoLetters("Ismail")}
          </h1>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-light mb-8 tracking-wider uppercase overflow-hidden">
            {splitTextIntoLetters("Hansal")}
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light tracking-wide overflow-hidden">
            <span className="inline-block">Capturing moments, creating memories</span>
          </p>
          <div className="overflow-hidden">
            <Link 
              to="/portfolio"
              className="button-effect inline-block"
            >
              Discover My Work
            </Link>
          </div>
        </div>
        
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer"
        >
          <ArrowDown 
            className="text-white/70 hover:text-white transition-colors" 
            size={32} 
            onClick={() => {
              const aboutSection = document.querySelector('#about-section');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </div>
      </section>

      {/* About Me Preview with Parallax Scroll Effect */}
      <section id="about-section" className="py-20 px-4 md:px-6 bg-dark">
        <div className="max-w-[95%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ParallaxScrollSection speed={0.15} direction="down">
              <img 
                src={meabout} 
                alt="Ismail Hansal" 
                className="w-full h-[350px] md:h-[900px] object-cover object-top"
                fetchPriority="low" 
                loading="lazy"
              />
            </ParallaxScrollSection>
            
            <ParallaxScrollSection speed={0.1} direction="up">
              <AnimatedSection delay={200}>
                <h2 className="text-3xl md:text-4xl uppercase tracking-wider mb-6">About Me</h2>
                <div className="w-16 h-px bg-white/40 mb-6"></div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  As a photographer, I am dedicated to capturing the extraordinary in the ordinary, 
                  finding beauty in unexpected places, and preserving moments that tell compelling stories.
                </p>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  My journey in photography began over a decade ago, and since then, I've had the privilege 
                  of working with amazing clients across various industries, from fashion and food to landscapes and architecture.
                </p>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  With a keen eye for detail and a passion for storytelling through visuals, I approach each project 
                  with creativity and dedication, ensuring that every image captures not just the subject, but the emotion and atmosphere of the moment.
                </p>
                <Link to="/about" className="button-effect inline-block">
                  Learn More
                </Link>
              </AnimatedSection>
            </ParallaxScrollSection>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
