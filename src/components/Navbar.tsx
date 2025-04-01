
import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Optimize scroll handler with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 will-change-[background-color,padding] ${
        isScrolled ? 'bg-dark/90 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-medium tracking-wider text-white hover:opacity-80 transition-opacity"
          onClick={closeMobileMenu}
        >
          ISMAIL HANSAL
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'text-white' : ''}`}>
            Home
          </Link>
          <Link to="/portfolio" className={`nav-link ${location.pathname === '/portfolio' ? 'text-white' : ''}`}>
            Portfolio
          </Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'text-white' : ''}`}>
            About
          </Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'text-white' : ''}`}>
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Optimized with transform instead of display changes */}
      <div 
        className={`fixed inset-0 bg-dark z-40 flex flex-col items-center justify-center md:hidden transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'transform-none' : 'transform translate-x-full'
        }`}
      >
        <button 
          className="absolute top-6 right-6 text-white hover:text-gray-300 p-2 rounded-full bg-black/20"
          onClick={closeMobileMenu}
          aria-label="Close menu"
        >
          <X size={28} />
        </button>
        
        <nav className="flex flex-col items-center space-y-8 text-xl">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'text-white' : ''}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link 
            to="/portfolio" 
            className={`nav-link ${location.pathname === '/portfolio' ? 'text-white' : ''}`}
            onClick={closeMobileMenu}
          >
            Portfolio
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'text-white' : ''}`}
            onClick={closeMobileMenu}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${location.pathname === '/contact' ? 'text-white' : ''}`}
            onClick={closeMobileMenu}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
