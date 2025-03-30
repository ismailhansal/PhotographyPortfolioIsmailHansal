
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-0">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
            alt="Mountain landscape photography"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto opacity-0 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4 tracking-wider uppercase">
            Ismail Hansal
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light tracking-wide">
            Capturing moments, creating memories
          </p>
          <Link 
            to="/portfolio"
            className="button-effect inline-block"
          >
            Discover My Work
          </Link>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 px-4 md:px-6">
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
      <section className="py-20 px-4 md:px-6 bg-dark-accent">
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
