import React, { useState, Suspense, lazy, useEffect } from "react";
import Header from "../assets/components/Header";
import Head from "../assets/components/Head";

const AboutUsSection = lazy(() => import("../assets/components/aboutus"));
const ProjectsSection = lazy(() =>
  import("../assets/components/ProjectsSection")
);
const NlpClubGallery = lazy(() =>
  import("../assets/components/TeamMemberGallery")
);
const Mentors = lazy(() => import("../assets/components/Mentors"));
const TeamMembers = lazy(() => import("../assets/components/TeamMembers"));
const Footer = lazy(() => import("../assets/components/Footer"));

// Enhanced Loader Component
const LoadingSpinner = ({ isDarkMode, message = "Loading..." }) => (
  <div className={`flex flex-col items-center justify-center min-h-screen transition-all duration-300 ${
    isDarkMode 
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
      : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
  }`}>
    {/* Animated Logo/Icon */}
    <div className="relative mb-8">
      <div className={`w-20 h-20 rounded-full border-4 border-t-transparent animate-spin ${
        isDarkMode ? 'border-white/30' : 'border-gray-300'
      }`}></div>
      <div className={`absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-current animate-spin ${
        isDarkMode ? 'text-blue-400' : 'text-blue-600'
      }`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
    </div>
    
    {/* Loading Text */}
    <p className={`text-lg font-semibold mb-4 animate-pulse ${
      isDarkMode ? 'text-white' : 'text-gray-800'
    }`} style={{ fontFamily: "StencilFont" }}>
      {message}
    </p>
    
    {/* Progress Dots */}
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full animate-bounce ${
            isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
          }`}
          style={{ animationDelay: `${i * 0.2}s` }}
        ></div>
      ))}
    </div>
  </div>
);

// Section Loader for individual components
const SectionLoader = ({ isDarkMode }) => (
  <div className={`flex items-center justify-center py-20 transition-all duration-300 ${
    isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50/50'
  }`}>
    <div className="flex flex-col items-center space-y-4">
      <div className={`w-12 h-12 border-4 border-t-transparent rounded-full animate-spin ${
        isDarkMode ? 'border-white/20 border-t-blue-400' : 'border-gray-200 border-t-blue-600'
      }`}></div>
      <p className={`text-sm font-medium ${
        isDarkMode ? 'text-white/70' : 'text-gray-600'
      }`}>Loading section...</p>
    </div>
  </div>
);

// Frame Animation Loader Hook - Specifically for HeaderFrame
const useFrameAnimationReady = () => {
  const [framesReady, setFramesReady] = useState(false);
  
  useEffect(() => {
    // Listen for HeaderFrame critical frames to be loaded
    const checkFramesReady = () => {
      // Since HeaderFrame manages its own loading, we'll simulate a check
      // In production, you could use a context or event system
      setTimeout(() => setFramesReady(true), 1500);
    };
    
    checkFramesReady();
  }, []);

  return framesReady;
};

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Check if frame animation is ready (HeaderFrame handles its own loading)
  const framesReady = useFrameAnimationReady();

  // Simulate app initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const themeValues = {
    buttonBg: isDarkMode
      ? "bg-white/10 hover:bg-white/20 text-white"
      : "bg-black text-white hover:bg-gray-800",
    mainBg: isDarkMode
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      : "bg-gradient-to-br from-gray-50 via-white to-gray-100",
  };

  // Show main loader while app is initializing
  if (isAppLoading) {
    return (
      <LoadingSpinner 
        isDarkMode={isDarkMode} 
        message="Initializing NLP Club experience..."
      />
    );
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${themeValues.mainBg}`}
      style={{ fontFamily: "StencilFont" }}
    >
      {/* Enhanced Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-20 right-6 z-50 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:rotate-180 ${themeValues.buttonBg}`}
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      >
        {isDarkMode ? (
          // Sun icon with enhanced styling
          <svg
            className="w-6 h-6 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          // Moon icon with enhanced styling
          <svg
            className="w-6 h-6 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>

      {/* Main Content with Fade-in Animation */}
      <div className="animate-fadeIn">
        <Header isDarkMode={isDarkMode} />
        {/* HeaderFrame component handles its own frame loading */}
        <Head isDarkMode={isDarkMode} />
        
        <Suspense fallback={<SectionLoader isDarkMode={isDarkMode} />}>
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

      {/* Custom Styles */}
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