import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import gsap from "gsap";

const ScrollVideoFrames = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const leftTextRef = useRef(null);
  const totalFrames = 118;
  const currentFrameRef = useRef({ current: 0 });

  // Preload images for both themes
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [darkImages, setDarkImages] = useState([]);
  const [lightImages, setLightImages] = useState([]);

  // Text content for different frames/themes
  const textContent = useMemo(() => ({
    dark: {
      leftText: "WHERE MIND MEETS CREATIVITY",
      rightText: "WHERE LANGUAGE MEETS IMAGINATION",
      mainTitle: "NLP",
      mainSubtitle: "CLUB"
    },
    light: {
      leftText: "THE FUTURE IS AI AND WE'RE LEADING THE WAY",
      rightText: "IN THE PURSUIT OF CREATIVITY",
      mainTitle: "NLP", 
      mainSubtitle: "CLUB"
    }
  }), []);

  // Get current text based on theme
  const currentText = isDarkMode ? textContent.dark : textContent.light;

  // Memoized image preloading function
  const preloadImages = useCallback(async () => {
    const darkImagePromises = [];
    const lightImagePromises = [];

    for (let i = 1; i <= totalFrames; i++) {
      const frameNumber = String(i).padStart(5, "0");
      const frameNumberDark = String(i).padStart(5, "0");
      
      // Dark theme images
      const darkImg = new Image();
      darkImg.src = `/frames/dark/frame_${frameNumberDark}.png`;
      darkImg.loading = "eager";
      darkImagePromises.push(
        new Promise((resolve, reject) => {
          darkImg.onload = () => resolve(darkImg);
          darkImg.onerror = reject;
        })
      );

      // Light theme images
      const lightImg = new Image();
      lightImg.src = `/frames/light/frame_${frameNumber}.png`;
      lightImg.loading = "eager";
      lightImagePromises.push(
        new Promise((resolve, reject) => {
          lightImg.onload = () => resolve(lightImg);
          lightImg.onerror = reject;
        })
      );
    }

    try {
      const [darkImgs, lightImgs] = await Promise.all([
        Promise.all(darkImagePromises),
        Promise.all(lightImagePromises),
      ]);
      setDarkImages(darkImgs);
      setLightImages(lightImgs);
      setImagesLoaded(true);
    } catch (error) {
      console.error("Error loading images:", error);
    }
  }, [totalFrames]);

  // Preload images on mount
  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  // GSAP Text Animation for left text with smooth scroll-based fade in
  useEffect(() => {
    if (!imagesLoaded || !leftTextRef.current) return;

    const handleTextAnimation = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress through the container
      const scrollStart = containerTop - windowHeight;
      const scrollEnd = containerTop + containerHeight * 0.3;
      const scrollDistance = scrollEnd - scrollStart;
      const currentScroll = scrollTop - scrollStart;
      
      // Calculate progress (0 to 1)
      const progress = Math.max(0, Math.min(1, currentScroll / scrollDistance));
      
      // Smooth fade in with slide animation tied to scroll
      const translateX = -100 + (progress * 100); // Slide from -100px to 0px
      const opacity = progress; // Fade from 0 to 1
      
      // Apply animation with GSAP for smoothness
      gsap.to(leftTextRef.current, {
        x: translateX,
        opacity: opacity,
        duration: 0.1,
        ease: "none", // No easing for direct scroll response
        overwrite: true
      });
    };

    // Initial call
    handleTextAnimation();

    // Use throttled scroll listener
    let ticking = false;
    const throttledHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleTextAnimation();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandler, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandler);
    };
  }, [imagesLoaded]);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    if (!containerRef.current || !imagesLoaded) return;

    const container = containerRef.current;
    const containerHeight = container.offsetHeight;
    const windowHeight = window.innerHeight;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = container.offsetTop;
    const scrollableDistance = containerHeight - windowHeight;

    const relativeScroll = scrollTop - containerTop;
    const rawProgress = Math.max(
      0,
      Math.min(1, relativeScroll / scrollableDistance)
    );

    const easedProgress = rawProgress;
    setScrollProgress(easedProgress);

    const targetFrame = easedProgress * (totalFrames - 1);

    // Smooth animation with GSAP
    gsap.to(currentFrameRef.current, {
      current: targetFrame,
      duration: 0.1,
      ease: "power2.out",
      onUpdate: () => {
        const rounded = Math.round(currentFrameRef.current.current);
        setCurrentFrame(Math.max(0, Math.min(totalFrames - 1, rounded)));
      }
    });
  }, [imagesLoaded, totalFrames]);

  // Add scroll event listener with RAF throttling
  useEffect(() => {
    let ticking = false;

    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });
    handleScroll();

    return () => window.removeEventListener("scroll", throttledScrollHandler);
  }, [handleScroll]);

  // Toggle theme function
  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  // Memoized theme values
  const themeValues = useMemo(
    () => ({
      currentImages: isDarkMode ? darkImages : lightImages,
      heroBgColor: isDarkMode ? "bg-black" : "bg-orange-50",
      textColor: isDarkMode ? "text-white" : "text-black",
      buttonBg: isDarkMode
        ? "bg-white text-black hover:bg-gray-100"
        : "bg-black text-white hover:bg-gray-800",
      spinnerColor: isDarkMode ? "border-white" : "border-black",
    }),
    [isDarkMode, darkImages, lightImages]
  );

  // Memoized text animation calculations for other text elements
  const textAnimations = useMemo(() => {
    // Main title animation based on scroll progress
    const titleScale = 1 + scrollProgress * 0.1;
    const titleOpacity = Math.max(0.8, 1 - scrollProgress * 0.3);
    
    // Right side text animations based on scroll
    const rightTextOpacity = Math.max(0.6, 1 - scrollProgress * 0.4);
    const rightTextTransform = `translateX(${scrollProgress * 20}px)`;

    return { 
      titleScale, 
      titleOpacity, 
      rightTextOpacity,
      rightTextTransform
    };
  }, [scrollProgress]);

  return (
    <div className={`w-full transition-colors duration-300`}>
      {/* Theme Toggle Button - Fixed Position */}
      <button
        onClick={toggleTheme}
        className={`fixed top-20 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${themeValues.buttonBg}`}
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      >
        {isDarkMode ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      {/* Main scroll video container */}
      <div ref={containerRef} className="relative w-full" style={{ height: "500vh" }}>
        {/* Sticky container for the image */}
        <div className={`sticky top-0 w-full h-screen ${themeValues.heroBgColor}`}>
          {!imagesLoaded ? (
            <div className={`w-full h-full ${themeValues.heroBgColor} flex items-center justify-center`}>
              <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${themeValues.spinnerColor}`}></div>
            </div>
          ) : (
            <>
              {/* Video frames - Keep original layout with slight downward positioning */}
              <div className="w-full h-full flex relative">
                <div className="w-2/4 m-auto h-full justify-center relative mt-8 md:mt-12">
                  <img
                    src={themeValues.currentImages[currentFrame]?.src}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{
                      willChange: "transform",
                      transform: "translateZ(0)",
                      imageRendering: "high-quality",
                    }}
                  />
                </div>
              </div>

              {/* Left Side Text with GSAP Animation */}
              <div 
                ref={leftTextRef}
                className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 pointer-events-none z-10 max-w-xs"
                style={{
                  transform: 'translateX(-100px)',
                  opacity: 0
                }}
              >
                <h2 className={`text-2xl md:text-3xl lg:text-4xl font-black leading-tight ${themeValues.textColor} tracking-wide`}>
                  {currentText.leftText}
                </h2>
              </div>

              {/* Right Side Text */}
              <div 
                className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 pointer-events-none z-10 max-w-xs text-right"
                style={{
                  opacity: textAnimations.rightTextOpacity,
                  transform: textAnimations.rightTextTransform,
                  willChange: "transform, opacity",
                  transition: "none",
                }}
              >
                <h2 className={`text-2xl md:text-3xl lg:text-4xl font-black leading-tight ${themeValues.textColor} tracking-wide`}>
                  {currentText.rightText}
                </h2>
              </div>

              {/* Main Title - Top */}
              <div 
                className="absolute top-16 md:top-20 left-2/4 pointer-events-none z-10"
                style={{
                  transform: `translateX(-50%) scale(${textAnimations.titleScale})`,
                  opacity: textAnimations.titleOpacity,
                  willChange: "transform, opacity",
                  transition: "none",
                }}
              >
                <h1 className={`text-6xl md:text-8xl lg:text-9xl font-black ${themeValues.textColor} tracking-widest text-center`}>
                  {currentText.mainTitle}
                </h1>
              </div>

              {/* Main Subtitle - Bottom */}
              <div 
                className="absolute bottom-16 md:bottom-20 left-1/2 pointer-events-none z-10"
                style={{
                  transform: `translateX(-50%) scale(${textAnimations.titleScale})`,
                  opacity: textAnimations.titleOpacity,
                  willChange: "transform, opacity",
                  transition: "none",
                }}
              >
                <h1 className={`text-6xl md:text-8xl lg:text-9xl font-black ${themeValues.textColor} tracking-widest text-center`}>
                  {currentText.mainSubtitle}
                </h1>
              </div>

              {/* Navigation Menu - Top */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none z-10">
                <nav className="flex space-x-8">
                  <span className={`text-sm md:text-base font-bold ${themeValues.textColor} tracking-wider`}>HOME</span>
                  <span className={`text-sm md:text-base font-bold ${themeValues.textColor} tracking-wider`}>ABOUT US</span>
                  <span className={`text-sm md:text-base font-bold ${themeValues.textColor} tracking-wider`}>SERVICES</span>
                </nav>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom spacer */}
      
    </div>
  );
};

export default ScrollVideoFrames;