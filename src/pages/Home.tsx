import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
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
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Get the appropriate images based on device
  const [heroImages, setHeroImages] = useState(isMobile ? mobileHeroImages : desktopHeroImages);
  
  // Update images when switching between mobile and desktop
  useEffect(() => {
    setHeroImages(isMobile ? mobileHeroImages : desktopHeroImages);
    setCurrentImageIndex(0); // Reset image index when switching images
  }, [isMobile]); // Runs when isMobile changes
  
  // Set up faster image cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
    }, 1500); // Change image every 1.5 seconds for more dynamic effect
    
    return () => clearInterval(interval);
  }, [heroImages]);
  
  // Enhanced text animations
  useEffect(() => {
    if (textRef.current) {
      // Initial state - all elements hidden
      gsap.set(textRef.current.children, { 
        y: 100, 
        opacity: 0 
      });
      
      // Create more complex animation timeline
      const tl = gsap.timeline();
      
      tl.to(textRef.current.children, { 
        y: 0, 
        opacity: 1, 
        stagger: 0.2, 
        duration: 1.2,
        ease: "power3.out"
      })
      .fromTo(".letter", 
        { scale: 0.8, opacity: 0.5 },
        { 
          scale: 1, 
          opacity: 1, 
          stagger: 0.03, 
          duration: 0.6,
          ease: "back.out(1.7)"
        }, 
        "-=0.8" // Overlap with previous animation
      );
    }
  }, []);
  
  // Enhanced hero image parallax effect
  useEffect(() => {
    if (heroRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to(heroRef.current?.querySelector('.hero-image.active'), {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: "power2.out"
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [currentImageIndex]);
  
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
          {heroImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Hero image ${index + 1}`}
              className={`hero-image absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-70 active' : 'opacity-0'
              }`}
              style={{ 
                zIndex: index === currentImageIndex ? 1 : 0,
                transform: 'scale(1)'
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
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer">
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

      {/* About Me Preview - Now positioned right after Hero */}
      <section id="about-section" className="py-20 px-4 md:px-6 bg-dark">
        <div className=" max-w-[95%]  mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <img 
                src={meabout} 
                alt="Ismail Hansal" 
                className="w-full h-[400px] md:h-[900px] object-cover object-top" 
                />
            </AnimatedSection>
            
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
