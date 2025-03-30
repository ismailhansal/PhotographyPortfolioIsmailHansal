
import { useEffect } from 'react';
import AnimatedSection from '../components/AnimatedSection';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 md:px-6">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl uppercase tracking-wider mb-4">About Me</h1>
          <div className="w-16 h-px bg-white/40 mx-auto"></div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <img 
              src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21" 
              alt="Ismail Hansal" 
              className="w-full object-cover aspect-[3/4]"
            />
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <h2 className="text-3xl uppercase tracking-wider mb-6">Ismail Hansal</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              I am a professional photographer with over 10 years of experience capturing 
              moments across portrait, commercial, and landscape photography. My passion lies 
              in finding the perfect light, composition, and moment to tell compelling visual stories.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              After studying photography at the Academy of Fine Arts, I began my career documenting 
              travel experiences across five continents. This experience shaped my unique perspective 
              and approach to photography that combines technical precision with artistic vision.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Today, I work with clients ranging from individuals seeking portrait sessions to 
              restaurants and cafés wanting to showcase their ambiance and offerings, as well as 
              magazines and brands looking for distinctive landscape and lifestyle imagery.
            </p>
            
            <div className="mt-8">
              <h3 className="text-xl uppercase tracking-wider mb-4">My Approach</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I believe that great photography is about patience, connection, and the ability 
                to see beauty in the ordinary. Every session is approached with intention and care, 
                ensuring that the final images exceed expectations and stand the test of time.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Whether I'm photographing people, places, or products, my goal remains the same: 
                to create images that evoke emotion, tell stories, and capture the authentic essence 
                of the subject.
              </p>
            </div>
          </AnimatedSection>
        </div>
        
        <AnimatedSection className="mt-20" delay={400}>
          <div className="bg-dark-muted p-8 md:p-12">
            <h2 className="text-2xl uppercase tracking-wider mb-6 text-center">Equipment & Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg uppercase mb-3">Camera Systems</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>Sony Alpha Series</li>
                  <li>Canon EOS Professional</li>
                  <li>Hasselblad Medium Format</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg uppercase mb-3">Specializations</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>Portrait Photography</li>
                  <li>Food & Restaurant</li>
                  <li>Café Atmosphere</li>
                  <li>Landscape & Nature</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg uppercase mb-3">Post-Processing</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>Adobe Lightroom</li>
                  <li>Adobe Photoshop</li>
                  <li>Capture One Pro</li>
                </ul>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
};

export default About;
