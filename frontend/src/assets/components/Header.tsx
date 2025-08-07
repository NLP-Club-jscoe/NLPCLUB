import { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { Button } from "../../assets/components/ui/button";
import { Menu, X } from 'lucide-react';

// Navigation configuration
const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'team', label: 'Gallery' },
  { id: 'members', label: 'Team' }
];

// Throttle utility for better scroll performance
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

const Header = memo(({ isDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Optimized throttled scroll handler
  const handleScroll = useCallback(
    throttle(() => {
      setIsScrolled(window.scrollY > 20);
    }, 16), // ~60fps
    []
  );

  useEffect(() => {
    // Add scroll listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Smooth scroll to section with offset for fixed header
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  }, []);

  // Handle mobile menu close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isMobileMenuOpen]);

  // Memoized theme styles to prevent recreation on every render
  const themeStyles = useMemo(() => ({
    headerBg: isDarkMode 
      ? `bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl ${isScrolled ? 'bg-black/95' : 'bg-black/80'}`
      : `bg-white/80 backdrop-blur-xl border-b border-black/10 shadow-2xl ${isScrolled ? 'bg-white/95' : 'bg-white/85'}`,
    textColor: isDarkMode ? 'text-white' : 'text-gray-900',
    logoText: isDarkMode ? 'text-white' : 'text-gray-900',
    hoverColor: isDarkMode 
      ? 'hover:text-blue-400 hover:scale-105' 
      : 'hover:text-blue-600 hover:scale-105',
    buttonBg: isDarkMode 
      ? 'bg-blue-600/80 text-white hover:bg-blue-500/90 border border-blue-500/50 backdrop-blur-sm shadow-lg' 
      : 'bg-blue-500/80 text-white hover:bg-blue-600/90 border border-blue-400/50 backdrop-blur-sm shadow-lg',
    mobileBg: isDarkMode 
      ? 'bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl' 
      : 'bg-white/95 backdrop-blur-xl border border-gray-900/10 shadow-2xl',
    iconColor: isDarkMode ? 'text-white' : 'text-gray-900',
    logoIconBg: isDarkMode ? 'bg-blue-600/80' : 'bg-blue-500/80'
  }), [isDarkMode, isScrolled]);

  // Memoized navigation items to prevent recreation
  const desktopNavItems = useMemo(() => 
    NAVIGATION_ITEMS.map((item) => (
      <button 
        key={item.id}
        onClick={() => scrollToSection(item.id)}
        className={`${themeStyles.textColor} ${themeStyles.hoverColor} transition-all duration-300 ease-out text-base lg:text-lg font-semibold relative group`}
      >
        {item.label}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
      </button>
    )), [themeStyles, scrollToSection]
  );

  const mobileNavItems = useMemo(() => 
    NAVIGATION_ITEMS.map((item) => (
      <button 
        key={item.id}
        onClick={() => scrollToSection(item.id)}
        className={`block w-full text-left ${themeStyles.textColor} ${themeStyles.hoverColor} transition-all duration-300 py-2 text-lg font-semibold rounded-lg hover:bg-white/5 px-3`}
      >
        {item.label}
      </button>
    )), [themeStyles, scrollToSection]
  );

  return (
    <>
      <header 
        className={`fixed inset-x-0 top-0 z-[99999] transition-all duration-300 will-change-transform ${themeStyles.headerBg}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99999
        }}
      >
        <nav className="container mx-auto px-4 md:px-6 py-3">
          <div className="flex items-center justify-between relative">
            {/* Logo */}
            <div className="flex items-center space-x-2 z-10 flex-shrink-0">
              <div className={`p-1 rounded-lg ${themeStyles.logoIconBg}`}>
                <img
                  src="logo.gif"
                  alt="NLP Club Logo"
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                  loading="eager"
                  width="40"
                  height="40"
                />
              </div>
              <span className={`text-lg md:text-xl font-black ${themeStyles.logoText} drop-shadow-sm tracking-wide whitespace-nowrap`}>
                NLP Club
              </span>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8 absolute left-1/2 transform -translate-x-1/2">
              {desktopNavItems}
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              {/* Desktop Join Button */}
              <Button 
                onClick={() => scrollToSection('contact')}
                className={`hidden md:block ${themeStyles.buttonBg} transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl text-sm lg:text-base font-semibold px-6 py-2 rounded-full`}
              >
                Join Club
              </Button>

              {/* Mobile Menu Button */}
              <button
                className={`md:hidden p-2 rounded-lg ${themeStyles.iconColor} hover:bg-white/10 transition-all duration-300 relative z-10`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`mobile-menu-container md:hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen 
              ? 'max-h-96 opacity-100 mt-4 pointer-events-auto' 
              : 'max-h-0 opacity-0 mt-0 pointer-events-none'
          } overflow-hidden`}>
            <div className={`${themeStyles.mobileBg} rounded-2xl p-6 space-y-4 transform transition-transform duration-300 ${
              isMobileMenuOpen ? 'translate-y-0' : '-translate-y-4'
            }`}>
              {mobileNavItems}
              <Button 
                onClick={() => scrollToSection('contact')}
                className={`w-full ${themeStyles.buttonBg} transition-all duration-300 mt-6 shadow-lg hover:shadow-xl text-lg font-semibold py-3 rounded-full`}
              >
                Join Club
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-20" aria-hidden="true"></div>
    </>
  );
});

Header.displayName = 'Header';

export default Header;
