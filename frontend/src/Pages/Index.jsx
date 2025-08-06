import React, { 
  useState, 
  Suspense, 
  lazy, 
  useEffect, 
  useCallback, 
  useMemo,
  memo
} from "react";
import Header from "../assets/components/Header";
import Head from "../assets/components/Head";

// Lazy load components
const AboutUsSection = lazy(() => 
  import("../assets/components/aboutus")
);
const ProjectsSection = lazy(() => 
  import("../assets/components/ProjectsSection")
);
const NlpClubGallery = lazy(() => 
  import("../assets/components/TeamMemberGallery")
);
const Mentors = lazy(() => 
  import("../assets/components/Mentors")
);
const TeamMembers = lazy(() => 
  import("../assets/components/TeamMembers")
);
const Footer = lazy(() => 
  import("../assets/components/Footer")
);

// Constants
const MIN_LOADING_TIME = 2000;

// Simple Loading Animation Component (with same font and theme as 2nd code)
const SimpleLoadingSpinner = memo(() => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Adjust speed here

    return () => clearInterval(interval);
  }, []);

  // Same text style as the complex loader
  const textStyle = useMemo(() => ({
    fontFamily: "StencilFont",
    lineHeight: '0.9',
    WebkitTextStroke: '2px #666',
    textStroke: '2px #666',
    color: 'transparent'
  }), []);

  return (
    <div className="fixed inset-0 z-50 h-screen w-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Enhanced flowing water background based on progress - same as 2nd code */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary flowing wave */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(0deg, 
              rgba(59, 130, 246, 0.1) 0%, 
              rgba(59, 130, 246, 0.2) ${progress * 0.8}%, 
              transparent ${progress * 0.8 + 20}%, 
              transparent 100%)`,
            transition: 'background 0.5s ease-out'
          }}
        />
        
        {/* Secondary flowing layer */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(0deg, 
              rgba(147, 51, 234, 0.1) 0%, 
              rgba(147, 51, 234, 0.15) ${progress * 0.6}%, 
              transparent ${progress * 0.6 + 25}%, 
              transparent 100%)`,
            transition: 'background 0.8s ease-out'
          }}
        />

        {/* Animated flowing particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-4 bg-blue-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-10px`,
              borderRadius: '2px',
              animation: `flowUp ${3 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: progress > 10 ? 1 : 0,
              transition: 'opacity 0.5s ease'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 leading-none">
        {/* Background text with stroke (same as 2nd code) */}
        <h1
          className="text-8xl md:text-9xl lg:text-[12rem] font-black tracking-wider pointer-events-none select-none"
          style={textStyle}
          aria-hidden="true"
        >
          NLP CLUB
        </h1>

        {/* Animated fill text (clipped from bottom to top) */}
        <h1
          className="text-8xl md:text-9xl lg:text-[12rem] font-black tracking-wider absolute top-0 left-0 pointer-events-none select-none"
          style={{
            fontFamily: "StencilFont",
            lineHeight: '0.9',
            color: '#3E3F29',
            clipPath: `inset(${100 - progress}% 0 0 0)`,
            transition: "clip-path 0.2s ease-out",
          }}
          aria-hidden="true"
        >
          NLP CLUB
        </h1>
      </div>

      {/* Loading percentage - same style as 2nd code */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <p 
          className="text-2xl md:text-3xl font-light tracking-wide text-white/80"
          aria-live="polite"
        >
          {progress}%
        </p>
      </div>

      {/* Animation styles - same as 2nd code */}
      <style jsx>{`
        @keyframes flowUp {
          0% {
            transform: translateY(100vh) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
});

SimpleLoadingSpinner.displayName = 'SimpleLoadingSpinner';

// Memoized theme values
const createThemeValues = (isDarkMode) => ({
  buttonBg: isDarkMode
    ? "bg-white/10 hover:bg-white/20 text-white"
    : "bg-black text-white hover:bg-gray-800",
  mainBg: isDarkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    : "bg-gradient-to-br from-gray-50 via-white to-gray-100",
});

// Section Loader
const SectionLoader = memo(({ isDarkMode }) => (
  <div className={`flex items-center justify-center py-20 transition-all duration-300 ${
    isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50/50'
  }`}>
    <div className="flex flex-col items-center space-y-4">
      <div 
        className={`w-12 h-12 border-4 border-t-transparent rounded-full animate-spin ${
          isDarkMode ? 'border-white/20 border-t-blue-400' : 'border-gray-200 border-t-blue-600'
        }`}
        role="status"
        aria-label="Loading section"
      />
      <p className={`text-sm font-medium ${
        isDarkMode ? 'text-white/70' : 'text-gray-600'
      }`}>
        Loading section...
      </p>
    </div>
  </div>
));

SectionLoader.displayName = 'SectionLoader';

// Theme toggle icons
const SunIcon = memo(() => (
  <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
));

const MoonIcon = memo(() => (
  <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
));

SunIcon.displayName = 'SunIcon';
MoonIcon.displayName = 'MoonIcon';

// Main component
const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : true;
    }
    return true;
  });

  const [isLoading, setIsLoading] = useState(true);

  // Handle loading completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, MIN_LOADING_TIME + 3000); // 3 seconds for animation + minimum time

    return () => clearTimeout(timer);
  }, []);

  // Memoized theme toggle function
  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', JSON.stringify(newMode));
      }
      return newMode;
    });
  }, []);

  // Memoized theme values
  const themeValues = useMemo(() => createThemeValues(isDarkMode), [isDarkMode]);

  // Memoized section loader
  const sectionLoader = useMemo(() => 
    <SectionLoader isDarkMode={isDarkMode} />, 
    [isDarkMode]
  );

  // Show simple loader
  if (isLoading) {
    return <SimpleLoadingSpinner />;
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${themeValues.mainBg}`}
      style={{ fontFamily: "StencilFont" }}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-20 right-6 z-50 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:rotate-180 ${themeValues.buttonBg}`}
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
        type="button"
      >
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* Main Content */}
      <div className="animate-fadeIn">
        <Header isDarkMode={isDarkMode} />
        <Head isDarkMode={isDarkMode} />
        
        <Suspense fallback={sectionLoader}>
          <div className="space-y-0">
            <AboutUsSection isDarkMode={isDarkMode} />
            <ProjectsSection isDarkMode={isDarkMode} />
            <NlpClubGallery isDarkMode={isDarkMode} />
            <Mentors isDarkMode={isDarkMode} />
            <TeamMembers isDarkMode={isDarkMode} />
            <Footer isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          </div>
        </Suspense>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Index;