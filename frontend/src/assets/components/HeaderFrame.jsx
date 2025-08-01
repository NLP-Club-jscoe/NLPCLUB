import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import React from "react";

const ScrollVideoFrames = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imageDisappeared, setImageDisappeared] = useState(false);
  const [showFinalAnimation, setShowFinalAnimation] = useState(false);
  const containerRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const mainTitleRef = useRef(null);
  const mainSubtitleRef = useRef(null);
  const imageContainerRef = useRef(null);
  const totalFrames = 140;
  const currentFrameRef = useRef({ current: 0 });

  // Preload images for both themes
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [darkImages, setDarkImages] = useState([]);
  const [lightImages, setLightImages] = useState([]);
  const [titlesVisible, setTitlesVisible] = useState(false);

  // Text content for different frames/themes
  const textContent = useMemo(() => ({
    dark: {
      leftText: "THE FUTURE IS AI AND WE'RE LEADING THE WAY",
      rightText: "WHERE LANGUAGE MEETS IMAGINATION",
      mainTitle: "NLP",
      mainSubtitle: "CLUB"
    },
    light: {
      leftText: "THE FUTURE IS AI AND WE'RE LEADING THE WAY",
      rightText: "WHERE LANGUAGE MEETS IMAGINATION",
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
      
      // Show titles after 1 second delay once images are loaded
      setTimeout(() => {
        setTitlesVisible(true);
      }, 1000);
    } catch (error) {
      console.error("Error loading images:", error);
    }
  }, [totalFrames]);

  // Preload images on mount
  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  // Handle image disappearing and final animation
  useEffect(() => {
    if (currentFrame >= totalFrames - 1) { // When we reach the end (frame 117, since 0-indexed)
      const timer = setTimeout(() => {
        setImageDisappeared(true);
        // Start final animation after image disappears
        setTimeout(() => {
          setShowFinalAnimation(true);
        }, 100);
      }, 2000); // 2 second delay

      return () => clearTimeout(timer);
    }
  }, [currentFrame, totalFrames]);

  // Final animation effect - Text moving toward each other and blinking
  useEffect(() => {
    if (showFinalAnimation && mainTitleRef.current && mainSubtitleRef.current) {
      // GSAP-like animation using CSS transitions and transforms
      const animateToCenter = () => {
        // Move NLP down and CLUB up
        if (mainTitleRef.current) {
          mainTitleRef.current.style.transform = 'translateX(-50%) translateY(100px) scale(1.2)';
          mainTitleRef.current.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }
        
        if (mainSubtitleRef.current) {
          mainSubtitleRef.current.style.transform = 'translateX(-50%) translateY(-100px) scale(1.2)';
          mainSubtitleRef.current.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }

        // Add blinking effect
        setTimeout(() => {
          startBlinking();
        }, 1500);
      };

      const startBlinking = () => {
        const blinkElements = [mainTitleRef.current, mainSubtitleRef.current];
        
        blinkElements.forEach((element, index) => {
          if (element) {
            // Add glowing effect
            element.style.textShadow = isDarkMode 
              ? '0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.6)' 
              : '0 0 30px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,0.6)';
            
            // Blinking animation
            let blinkCount = 0;
            const blinkInterval = setInterval(() => {
              if (blinkCount >= 6) { // Blink 3 times (6 state changes)
                clearInterval(blinkInterval);
                // Final glow state
                element.style.textShadow = isDarkMode 
                  ? '0 0 40px rgba(255,255,255,1), 0 0 80px rgba(255,255,255,0.8)' 
                  : '0 0 40px rgba(0,0,0,1), 0 0 80px rgba(0,0,0,0.8)';
                return;
              }
              
              if (blinkCount % 2 === 0) {
                element.style.opacity = '0.3';
                element.style.textShadow = isDarkMode 
                  ? '0 0 10px rgba(255,255,255,0.3)' 
                  : '0 0 10px rgba(0,0,0,0.3)';
              } else {
                element.style.opacity = '1';
                element.style.textShadow = isDarkMode 
                  ? '0 0 50px rgba(255,255,255,1), 0 0 100px rgba(255,255,255,0.8)' 
                  : '0 0 50px rgba(0,0,0,1), 0 0 100px rgba(0,0,0,0.8)';
              }
              blinkCount++;
            }, 200);
          }
        });
      };

      animateToCenter();
    }
  }, [showFinalAnimation, isDarkMode]);

  // GSAP Text Animation for left and right text with smooth scroll-based fade in
  useEffect(() => {
    if (!imagesLoaded || !leftTextRef.current || !rightTextRef.current || showFinalAnimation) return;

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
      
      // Left text: Slide from left (-100px to 0px)
      const leftTranslateX = -100 + (progress * 100);
      const leftOpacity = progress;
      
      // Right text: Slide from right (100px to 0px)
      const rightTranslateX = 100 - (progress * 100);
      const rightOpacity = progress;
      
      // Apply smooth transitions
      if (leftTextRef.current) {
        leftTextRef.current.style.transform = `translateX(${leftTranslateX}px)`;
        leftTextRef.current.style.opacity = leftOpacity;
        leftTextRef.current.style.transition = 'all 0.1s ease-out';
      }

      if (rightTextRef.current) {
        rightTextRef.current.style.transform = `translateX(${rightTranslateX}px)`;
        rightTextRef.current.style.opacity = rightOpacity;
        rightTextRef.current.style.transition = 'all 0.1s ease-out';
      }
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
  }, [imagesLoaded, showFinalAnimation]);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    if (!containerRef.current || !imagesLoaded || showFinalAnimation) return;

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

    // Smooth frame transition
    const currentTargetFrame = Math.max(0, Math.min(totalFrames - 1, Math.round(targetFrame)));
    currentFrameRef.current.current = currentTargetFrame;
    setCurrentFrame(currentTargetFrame);
  }, [imagesLoaded, totalFrames, showFinalAnimation]);

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

  // Memoized text animation calculations for title elements only
  const textAnimations = useMemo(() => {
    if (showFinalAnimation) {
      return { titleScale: 1, titleOpacity: 1 };
    }
    
    // Main title animation based on scroll progress
    const titleScale = 1 + scrollProgress * 0.1;
    const titleOpacity = Math.max(0.8, 1 - scrollProgress * 0.3);

    return { 
      titleScale, 
      titleOpacity
    };
  }, [scrollProgress, showFinalAnimation]);

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
              <div 
                ref={imageContainerRef}
                className="w-full h-full flex relative z-20"
                style={{
                  opacity: imageDisappeared ? 0 : 1,
                  transition: 'opacity 0.8s ease-out'
                }}
              >
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

              {/* Left Side Text with Animation */}
              <div 
                ref={leftTextRef}
                className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 pointer-events-none z-10 max-w-xs"
                style={{
                  transform: 'translateX(-100px)',
                  opacity: showFinalAnimation ? 0 : 0,
                  transition: showFinalAnimation ? 'opacity 0.5s ease-out' : 'none'
                }}
              >
                <h2 className={`text-2xl md:text-3xl lg:text-4xl font-black leading-tight ${themeValues.textColor} tracking-wide`}>
                  {currentText.leftText}
                </h2>
              </div>

              {/* Right Side Text with Animation */}
              <div 
                ref={rightTextRef}
                className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 pointer-events-none z-10 max-w-xs text-right"
                style={{
                  transform: 'translateX(100px)',
                  opacity: showFinalAnimation ? 0 : 0,
                  transition: showFinalAnimation ? 'opacity 0.5s ease-out' : 'none'
                }}
              >
                <h2 className={`text-2xl md:text-3xl lg:text-4xl font-black leading-tight ${themeValues.textColor} tracking-wide`}>
                  {currentText.rightText}
                </h2>
              </div>

              {/* Main Title - Top */}
              <div 
                ref={mainTitleRef}
                className="absolute top-12 md:top-16 left-2/4 pointer-events-none z-10"
                style={{
                  transform: `translateX(-50%) scale(${textAnimations.titleScale})`,
                  opacity: textAnimations.titleOpacity,
                  willChange: "transform, opacity",
                  transition: showFinalAnimation ? "none" : "none",
                }}
              >
                <h1 
                  className={`text-8xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-black ${themeValues.textColor} tracking-widest text-center`}
                  style={{
                    fontWeight: 900,
                    textShadow: isDarkMode 
                      ? '0 0 20px rgba(255,255,255,0.3)' 
                      : '0 0 20px rgba(0,0,0,0.3)',
                    letterSpacing: '0.2em'
                  }}
                >
                  {currentText.mainTitle}
                </h1>
              </div>

              {/* Main Subtitle - Bottom */}
              <div 
                ref={mainSubtitleRef}
                className="absolute bottom-12 md:bottom-16 left-1/2 pointer-events-none z-10"
                style={{
                  transform: `translateX(-50%) scale(${textAnimations.titleScale})`,
                  opacity: textAnimations.titleOpacity,
                  willChange: "transform, opacity",
                  transition: showFinalAnimation ? "none" : "none",
                }}
              >
                <h1 
                  className={`text-8xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-black ${themeValues.textColor} tracking-widest text-center`}
                  style={{
                    fontWeight: 900,
                    textShadow: isDarkMode 
                      ? '0 0 20px rgba(255,255,255,0.3)' 
                      : '0 0 20px rgba(0,0,0,0.3)',
                    letterSpacing: '0.2em'
                  }}
                >
                  {currentText.mainSubtitle}
                </h1>
              </div>

              {/* Navigation Menu - Top */}
              <div 
                className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none z-10"
                style={{
                  opacity: showFinalAnimation ? 0 : 1,
                  transition: 'opacity 0.5s ease-out'
                }}
              >
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