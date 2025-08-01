import { useState, useEffect } from 'react';
import { Button } from "../../assets/components/ui/button";
import { Menu, X, Brain, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Start with dark mode
  const [isHeaderVisible, setIsHeaderVisible] = useState(false); // Start hidden
  const [activityTimeout, setActivityTimeout] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-hide header functionality
  useEffect(() => {
    let timeoutId;

    const showHeader = () => {
      setIsHeaderVisible(true);
      
      // Clear existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Set new timeout to hide after 2 seconds of inactivity
      timeoutId = setTimeout(() => {
        setIsHeaderVisible(false);
      }, 2000);
    };

    const hideHeader = () => {
      setIsHeaderVisible(false);
    };

    // Show header on mouse move
    const handleMouseMove = () => {
      showHeader();
    };

    // Show header on scroll
    const handleScroll = () => {
      showHeader();
    };

    // Show header on key press (for accessibility)
    const handleKeyPress = () => {
      showHeader();
    };

    // Show header when mouse enters window
    const handleMouseEnter = () => {
      showHeader();
    };

    // Hide header when mouse leaves window (optional)
    const handleMouseLeave = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        setIsHeaderVisible(false);
      }, 1000); // Shorter timeout when mouse leaves
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Keep header visible when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsHeaderVisible(true);
    }
  }, [isMobileMenuOpen]);

  // Simplified theme detection - checks for background color to determine theme
  useEffect(() => {
    const detectTheme = () => {
      // Method 1: Check if HeaderFrame container exists and its background
      const headerFrameContainer = document.querySelector('[style*="background"]');
      if (headerFrameContainer) {
        const bgStyle = headerFrameContainer.style.backgroundColor;
        const isDark = bgStyle.includes('black') || bgStyle.includes('rgb(0, 0, 0)');
        setIsDarkMode(isDark);
      }
      
      // Method 2: Check for theme toggle button state
      const themeButton = document.querySelector('[aria-label*="Switch to"]');
      if (themeButton) {
        const ariaLabel = themeButton.getAttribute('aria-label');
        const isDark = ariaLabel.includes('light mode'); // If it says "switch to light", we're in dark
        setIsDarkMode(isDark);
      }

      // Method 3: Look for theme indicator in DOM
      const body = document.body;
      const computedStyle = window.getComputedStyle(body);
      const bgColor = computedStyle.backgroundColor;
      if (bgColor === 'rgb(0, 0, 0)' || bgColor === 'black') {
        setIsDarkMode(true);
      } else if (bgColor.includes('255') || bgColor === 'white') {
        setIsDarkMode(false);
      }
    };

    // Initial detection
    detectTheme();
    
    // Check theme every 100ms for immediate response
    const interval = setInterval(detectTheme, 100);
    
    // Also listen for clicks on theme toggle button
    const handleThemeButtonClick = () => {
      setTimeout(detectTheme, 50); // Small delay to let theme change take effect
    };
    
    document.addEventListener('click', handleThemeButtonClick);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('click', handleThemeButtonClick);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  // Theme-aware styles
  const themeStyles = {
    headerBg: isDarkMode 
      ? 'bg-black/10 backdrop-blur-xl border-b border-white/10 shadow-lg'
      : 'bg-white/10 backdrop-blur-xl border-b border-black/10 shadow-lg',
    textColor: isDarkMode ? 'text-white' : 'text-gray-900',
    logoText: isDarkMode ? 'text-white' : 'text-gray-900',
    hoverColor: isDarkMode ? 'hover:text-gray-300 hover:scale-115' : 'hover:text-gray-700 hover:scale-115',
    buttonBg: isDarkMode 
      ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm' 
      : 'bg-white/20 text-gray-900 hover:bg-white/30 border border-gray-900/30 backdrop-blur-sm',
    mobileBg: isDarkMode 
      ? 'bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl' 
      : 'bg-white/20 backdrop-blur-xl border border-gray-900/10 shadow-2xl',
    iconColor: isDarkMode ? 'text-white' : 'text-gray-900',
    logoIconBg: isDarkMode ? 'bg-blue-600/80 backdrop-blur-sm' : 'bg-blue-500/80 backdrop-blur-sm'
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${themeStyles.headerBg} ${
        isHeaderVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-center">
          {/* Logo on the left */}
          <div className="flex items-center space-x-1 absolute left-6">
            <img
              src="logo.gif"
              alt="Logo"
              className="w-15 h-15 object-contain"
            />
            <span className={`text-xl font-bold ${themeStyles.logoText} drop-shadow-sm`}>
              NLP Club
            </span>
          </div>

          {/* Centered Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className={`${themeStyles.textColor} ${themeStyles.hoverColor} transition-all duration-600 ease-out text-lg font-bold`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={`${themeStyles.textColor} ${themeStyles.hoverColor} transition-all duration-600 ease-out text-lg font-bold`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className={`${themeStyles.textColor} ${themeStyles.hoverColor} transition-all duration-600 ease-out text-lg font-bold`}
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className={`${themeStyles.textColor} ${themeStyles.hoverColor} transition-all duration-600 ease-out text-lg font-bold`}
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className={`${themeStyles.textColor} ${themeStyles.hoverColor} transition-all duration-600 ease-out text-lg font-bold`}
            >
              Testimonials
            </button>
            <Button 
              onClick={() => scrollToSection('contact')}
              className={`${themeStyles.buttonBg} transition-all duration-600 ease-out hover:scale-115 shadow-lg hover:shadow-xl text-lg font-bold`}
            >
              Join Club
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 absolute right-6 ${themeStyles.iconColor} transition-colors duration-300`}
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
          <div className={`md:hidden mt-4 ${themeStyles.mobileBg} rounded-2xl p-6 space-y-4`}>
            <button 
              onClick={() => scrollToSection('home')}
              className={`block w-full text-left ${themeStyles.textColor} ${themeStyles.hoverColor} transition-colors duration-300 py-2 text-lg font-bold`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={`block w-full text-left ${themeStyles.textColor} ${themeStyles.hoverColor} transition-colors duration-300 py-2 text-lg font-bold`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className={`block w-full text-left ${themeStyles.textColor} ${themeStyles.hoverColor} transition-colors duration-300 py-2 text-lg font-bold`}
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className={`block w-full text-left ${themeStyles.textColor} ${themeStyles.hoverColor} transition-colors duration-300 py-2 text-lg font-bold`}
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className={`block w-full text-left ${themeStyles.textColor} ${themeStyles.hoverColor} transition-colors duration-300 py-2 text-lg font-bold`}
            >
              Testimonials
            </button>
            <Button 
              onClick={() => scrollToSection('contact')}
              className={`w-full ${themeStyles.buttonBg} transition-all duration-300 mt-4 shadow-lg hover:shadow-xl text-lg font-bold`}
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