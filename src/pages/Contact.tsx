
import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 md:px-6">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl uppercase tracking-wider mb-4">Contact</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Let's discuss your photography needs or any questions you might have
          </p>
          <div className="w-16 h-px bg-white/40 mx-auto mt-4"></div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <AnimatedSection className="lg:col-span-2" delay={100}>
            <div className="bg-dark-muted p-8">
              <h2 className="text-2xl uppercase tracking-wider mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 mt-1 mr-4" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <a href="mailto:contact@ismailhansal.com" className="text-gray-300 hover:text-white transition-colors">
                      ismailhansal3@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-5 h-5 mt-1 mr-4" />
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">
                      +212 700917099
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mt-1 mr-4" />
                  <div>
                    <h3 className="font-medium mb-1">Location</h3>
                    <address className="text-gray-300 not-italic">
                      Casablanca, Morocco<br />
                      
                    </address>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl uppercase tracking-wider mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.instagram.com/samael_onela?igsh=dWE3ZGw0bDc3a25u" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="bg-dark-accent p-3 text-gray-300 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection className="lg:col-span-3" delay={200}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm uppercase tracking-wider">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-accent border border-gray-700 p-3 text-white focus:border-white focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm uppercase tracking-wider">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-accent border border-gray-700 p-3 text-white focus:border-white focus:outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm uppercase tracking-wider">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-accent border border-gray-700 p-3 text-white focus:border-white focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm uppercase tracking-wider">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-dark-accent border border-gray-700 p-3 text-white focus:border-white focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-effect py-3 px-8 transition-all duration-300 ease-in-out disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </main>
  );
};

export default Contact;
