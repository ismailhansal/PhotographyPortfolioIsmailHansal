
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-muted py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-medium tracking-wider mb-2">ISMAIL HANSAL</h3>
            <p className="text-gray-400 text-sm">Professional Photographer</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <nav className="flex space-x-6">
              <Link to="/" className="nav-link text-sm uppercase">Home</Link>
              <Link to="/portfolio" className="nav-link text-sm uppercase">Portfolio</Link>
              <Link to="/about" className="nav-link text-sm uppercase">About</Link>
              <Link to="/contact" className="nav-link text-sm uppercase">Contact</Link>
            </nav>
            
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="mailto:contact@ismailhansal.com" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center md:text-left text-gray-500 text-sm">
          <p>&copy; {year} Ismail Hansal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
