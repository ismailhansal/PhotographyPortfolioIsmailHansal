
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const heroImages = [
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  
  // Set up faster image cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
    }, 1500); // Change image every 1.5 seconds for more dynamic effect
    
    return () => clearInterval(interval);
  }, []);
  
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
  
  // Initialize ScrollTrigger for smooth scrolling
  useEffect(() => {
    // Set up smooth scrolling
    gsap.config({
      nullTargetWarn: false
    });
    
    // Select all sections for snap scrolling
    const sections = document.querySelectorAll('section');
    sectionRefs.current = Array.from(sections);
    
    // Create scroll triggers for each section
    sectionRefs.current.forEach((section, i) => {
      if (!section) return;
      
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        markers: false,
        onEnter: () => {
          gsap.to(window, {
            duration: 0.8,
            scrollTo: { y: section, offsetY: 0 },
            ease: "power3.inOut"
          });
        },
        onEnterBack: () => {
          gsap.to(window, {
            duration: 0.8,
            scrollTo: { y: section, offsetY: 0 },
            ease: "power3.inOut"
          });
        }
      });
    });
    
    // Advanced parallax effect for background images
    if (heroRef.current) {
      gsap.to(".hero-image.active", {
        y: "10%",
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
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

  // Split text into individual letters for animation
  const splitTextIntoLetters = (text: string) => {
    return text.split('').map((letter, index) => (
      <span key={index} className="letter inline-block">{letter}</span>
    ));
  };

  return (
    <main className="min-h-screen flex flex-col snap-y snap-mandatory">
      {/* Hero Section with Dynamic Images */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center snap-start">
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
                transform: 'scale(1.05)'
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer"
          onClick={() => {
            const nextSection = document.querySelector('section:nth-child(2)');
            if (nextSection) {
              gsap.to(window, {
                duration: 1,
                scrollTo: { y: nextSection, offsetY: 0 },
                ease: "power3.inOut"
              });
            }
          }}
        >
          <ArrowDown className="text-white/70 hover:text-white transition-colors" size={32} />
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 px-4 md:px-6 snap-start">
        <div className="container mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl uppercase tracking-wider mb-4">Featured Work</h2>
            <div className="w-16 h-px bg-white/40 mx-auto"></div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatedSection className="card-shine" delay={100}>
              <Link to="/portfolio?category=portrait" className="block overflow-hidden group">
                <div className="overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9" 
                    alt="Portrait photography" 
                    className="w-full h-[400px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="pt-4 pb-6">
                  <h3 className="text-xl uppercase tracking-wider mb-1">Portrait</h3>
                  <p className="text-gray-400 text-sm">Capturing human essence</p>
                </div>
              </Link>
            </AnimatedSection>
            
            <AnimatedSection className="card-shine" delay={200}>
              <Link to="/portfolio?category=restaurant" className="block overflow-hidden group">
                <div className="overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
                    alt="Restaurant photography" 
                    className="w-full h-[400px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="pt-4 pb-6">
                  <h3 className="text-xl uppercase tracking-wider mb-1">Restaurant</h3>
                  <p className="text-gray-400 text-sm">Culinary visual stories</p>
                </div>
              </Link>
            </AnimatedSection>
            
            <AnimatedSection className="card-shine" delay={300}>
              <Link to="/portfolio?category=landscape" className="block overflow-hidden group">
                <div className="overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1472396961693-142e6e269027" 
                    alt="Landscape photography" 
                    className="w-full h-[400px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="pt-4 pb-6">
                  <h3 className="text-xl uppercase tracking-wider mb-1">Landscape</h3>
                  <p className="text-gray-400 text-sm">Nature's magnificent canvas</p>
                </div>
              </Link>
            </AnimatedSection>
          </div>
          
          <AnimatedSection className="text-center mt-12" delay={400}>
            <Link to="/portfolio" className="button-effect inline-block">
              View All Work
            </Link>
          </AnimatedSection>
        </div>
      </section>
      
      {/* About Preview */}
      <section className="py-20 px-4 md:px-6 bg-dark-accent snap-start">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <img 
                src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21" 
                alt="Ismail Hansal" 
                className="w-full h-[600px] object-cover"
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
