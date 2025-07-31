import { useState, useEffect } from 'react';
import { Button } from "../../assets/components/ui/button";
import { Menu, X, Brain, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass-card backdrop-blur-xl' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-primary">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">NLP Club</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Testimonials
            </button>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="glass-button hover-glow"
            >
              Join Club
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 glass-card rounded-2xl p-6 space-y-4">
            <button 
              onClick={() => scrollToSection('home')}
              className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
            >
              Testimonials
            </button>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="w-full glass-button hover-glow mt-4"
            >
              Join Club
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;