import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const ScrollVideoFrames = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(0); // New state for image opacity
  const [textZIndex, setTextZIndex] = useState(30); // New state for text z-index
  const containerRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const totalFrames = 140;
  const currentFrameRef = useRef({ current: 0 });

  // Preload images for both themes
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [darkImages, setDarkImages] = useState([]);
  const [lightImages, setLightImages] = useState([]);
  const [titlesVisible, setTitlesVisible] = useState(true); // Start with titles visible

  // Text content for different frames/themes
  const textContent = useMemo(
    () => ({
      dark: {
        leftText: "THE FUTURE IS AI AND WE'RE LEADING THE WAY",
        rightText: "WHERE LANGUAGE MEETS IMAGINATION",
        mainTitle: "NLP",
        mainSubtitle: "CLUB",
      },
      light: {
        leftText: "THE FUTURE IS AI AND WE'RE LEADING THE WAY",
        rightText: "WHERE LANGUAGE MEETS IMAGINATION",
        mainTitle: "NLP",
        mainSubtitle: "CLUB",
      },
    }),
    []
  );

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

  // GSAP Text Animation for left and right text with smooth scroll-based fade in
  useEffect(() => {
    if (!leftTextRef.current || !rightTextRef.current) return;

    const handleTextAnimation = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress through the container
      const scrollStart = containerTop - windowHeight;
      const scrollEnd = containerTop + containerHeight * 0.15; // Earlier animation
      const scrollDistance = scrollEnd - scrollStart;
      const currentScroll = scrollTop - scrollStart;

      // Calculate progress (0 to 1)
      const progress = Math.max(0, Math.min(1, currentScroll / scrollDistance));

      // Left text: Slide from left (-100px to 0px)
      const leftTranslateX = -100 + progress * 100;
      const leftOpacity = progress;

      // Right text: Slide from right (100px to 0px)
      const rightTranslateX = 100 - progress * 100;
      const rightOpacity = progress;

      // Apply smooth transitions
      if (leftTextRef.current) {
        leftTextRef.current.style.transform = `translateX(${leftTranslateX}px)`;
        leftTextRef.current.style.opacity = leftOpacity;
        leftTextRef.current.style.transition = "all 0.1s ease-out";
      }

      if (rightTextRef.current) {
        rightTextRef.current.style.transform = `translateX(${rightTranslateX}px)`;
        rightTextRef.current.style.opacity = rightOpacity;
        rightTextRef.current.style.transition = "all 0.1s ease-out";
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

    window.addEventListener("scroll", throttledHandler, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandler);
    };
  }, []);

  // Optimized scroll handler with throttling and image reveal logic
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

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

    setScrollProgress(rawProgress);

    // Image reveal logic - images start appearing after 20% scroll
    const imageRevealThreshold = 0.05; 
    const imageProgress = Math.max(0, (rawProgress - imageRevealThreshold) / (1 - imageRevealThreshold));
    const newImageOpacity = Math.min(1, imageProgress * 2); // Fade in images
    setImageOpacity(newImageOpacity);

    // Text z-index management - text goes behind when images are visible
    if (newImageOpacity > 0.3) {
      setTextZIndex(10); // Behind images
    } else {
      setTextZIndex(30); // In front of images
    }

    // Frame calculation for when images are visible
    if (imagesLoaded && rawProgress > imageRevealThreshold) {
      const frameProgress = (rawProgress - imageRevealThreshold) / (1 - imageRevealThreshold);
      const targetFrame = frameProgress * (totalFrames - 1);
      const currentTargetFrame = Math.max(
        0,
        Math.min(totalFrames - 1, Math.round(targetFrame))
      );
      currentFrameRef.current.current = currentTargetFrame;
      setCurrentFrame(currentTargetFrame);
    }
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

  // Memoized text animation calculations for title elements only
  const textAnimations = useMemo(() => {
    // Main title animation based on scroll progress
    const titleScale = 1 + scrollProgress * 0.1;
    const titleOpacity = Math.max(0.3, 1 - scrollProgress * 0.5); // Fade out more as images appear

    return {
      titleScale,
      titleOpacity,
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
          <svg
            className="w-6 h-6"
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
          <svg
            className="w-6 h-6"
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

      {/* Main scroll video container */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: "500vh" }}
      >
        {/* Sticky container for the image */}
        <div
          className={`sticky top-0 w-full h-screen ${themeValues.heroBgColor}`}
        >
          {/* Video frames - Only show when images should be visible */}
          {imagesLoaded && (
            <div 
              className="w-full h-full flex relative z-20"
              style={{ 
                opacity: imageOpacity,
                transition: 'opacity 0.3s ease-out'
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
          )}

          {/* Left Side Text with Animation */}
          <div
            ref={leftTextRef}
            className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 pointer-events-none max-w-xs"
            style={{
              transform: "translateX(-100px)",
              opacity: 0,
              zIndex: textZIndex,
              transition: 'z-index 0.3s ease-out'
            }}
          >
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-black leading-tight ${themeValues.textColor} tracking-wide`}
            >
              {currentText.leftText}
            </h2>
          </div>

          {/* Right Side Text with Animation */}
          <div
            ref={rightTextRef}
            className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 pointer-events-none max-w-xs text-right"
            style={{
              transform: "translateX(100px)",
              opacity: 0,
              zIndex: textZIndex,
              transition: 'z-index 0.3s ease-out'
            }}
          >
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-black leading-tight ${themeValues.textColor} tracking-wide`}
            >
              {currentText.rightText}
            </h2>
          </div>

          {/* Main Title - Top - MADE BIGGER AND BOLDER */}
          <div
            className="absolute top-12 md:top-16 left-2/4 pointer-events-none"
            style={{
              transform: `translateX(-50%) scale(${textAnimations.titleScale})`,
              opacity: textAnimations.titleOpacity,
              willChange: "transform, opacity",
              transition: "opacity 0.3s ease-out",
              zIndex: textZIndex,
            }}
          >
            <h1
              className={`text-8xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-black ${themeValues.textColor} tracking-widest text-center`}
              style={{
                fontWeight: 900,
                textShadow: isDarkMode
                  ? "0 0 20px rgba(255,255,255,0.3)"
                  : "0 0 20px rgba(0,0,0,0.3)",
                letterSpacing: "0.2em",
              }}
            >
              {currentText.mainTitle}
            </h1>
          </div>

          {/* Main Subtitle - Bottom - MADE BIGGER AND BOLDER */}
          <div
            className="absolute bottom-12 md:bottom-16 left-1/2 pointer-events-none"
            style={{
              transform: `translateX(-50%) scale(${textAnimations.titleScale})`,
              opacity: textAnimations.titleOpacity,
              willChange: "transform, opacity",
              transition: "opacity 0.3s ease-out",
              zIndex: textZIndex,
            }}
          >
            <h1
              className={`text-8xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-black ${themeValues.textColor} tracking-widest text-center`}
              style={{
                fontWeight: 900,
                textShadow: isDarkMode
                  ? "0 0 20px rgba(255,255,255,0.3)"
                  : "0 0 20px rgba(0,0,0,0.3)",
                letterSpacing: "0.2em",
              }}
            >
              {currentText.mainSubtitle}
            </h1>
          </div>

          {/* Loading indicator - only show if images aren't loaded */}
          {!imagesLoaded && (
            <div className="absolute top-4 left-4 z-40">
              <div
                className={`animate-spin rounded-full h-6 w-6 border-b-2 ${themeValues.spinnerColor}`}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrollVideoFrames;