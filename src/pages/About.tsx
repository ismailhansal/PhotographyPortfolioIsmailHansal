
import { useEffect } from 'react';
import AnimatedSection from '../components/AnimatedSection';

import meabout from '@/assets/me-about.webp'

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
          <AnimatedSection>
            <img 
              src={meabout}
              alt="Ismail Hansal" 
              className="w-full object-cover"
            />
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <h2 className="text-3xl uppercase tracking-wider mb-6 mt-16">Ismail Hansal</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
            I am a professional photographer specializing in culinary, restaurant, real estate, and male portrait photography. With years of experience in the field, my approach goes beyond simply capturing images—I strive to bring an artistic vision to every project I undertake.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
            For me, photography is not just about pressing the shutter; it’s about seeing light, textures, and emotions in a unique way. I aim to create images that don’t just showcase a subject but tell a story, evoke a mood, and leave an impact.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
            I collaborate with restaurants and cafés to highlight their ambiance and dishes in the most appetizing way. I work with real estate professionals to craft visuals that enhance property appeal. My portrait photography is about capturing authenticity and personality, creating timeless images that reflect confidence and character.
            </p>
            
            <div className="mt-8">
              <h3 className="text-xl uppercase tracking-wider mb-4">My Approach</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
              Every project is approached with precision, creativity, and attention to detail. I carefully compose each shot to bring out the best in my subjects, ensuring that the final images are both visually striking and meaningful.
              Whether working with businesses or individuals, my goal remains the same: to create powerful images that tell stories, inspire emotions, and leave a lasting impression.
              </p>
              <p className="text-gray-300 leading-relaxed">
              Whether working with businesses or individuals, my goal remains the same: to create powerful images that tell stories, inspire emotions, and leave a lasting impression.
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
                  <li>Fujifilm Xt3</li>
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
