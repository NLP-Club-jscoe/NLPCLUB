import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import gsap from "gsap";



const ScrollVideoFrames = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const totalFrames = 118;
const currentFrameRef = useRef({ current: 0 }); // Holds float frame

  // Preload images for both themes
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [darkImages, setDarkImages] = useState([]);
  const [lightImages, setLightImages] = useState([]);

// Easing: start slow, speed up, slow down





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

  const easedProgress = rawProgress; // Keep your easing or customize
  setScrollProgress(easedProgress);

  const targetFrame = easedProgress * (totalFrames - 1);

  // ✅ Smooth animation with GSAP
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
      // bgColor: isDarkMode ? "bg-black" : "amber-50",
      heroBgColor: isDarkMode ? "bg-black" : "bg-orange-50",
      textColor: isDarkMode ? "text-white" : "text-black",
      navBg: isDarkMode
        ? "bg-black/20 border-white/10"
        : "bg-white/20 border-black/10",
      buttonBg: isDarkMode
        ? "bg-white text-black hover:bg-gray-100"
        : "bg-black text-white hover:bg-gray-800",
      spinnerColor: isDarkMode ? "border-white" : "border-black",
      // gradientColors: isDarkMode
      //   ? "from-blue-400 to-purple-400"
      //   : "from-blue-600 to-purple-600",
      // textStroke: isDarkMode
      //   ? "1px rgba(255,255,255,0.1)"
      //   : "1px rgba(0,0,0,0.1)",
      // textShadow: isDarkMode
      //   ? "2px 2px 4px rgba(0,0,0,0.8)"
      //   : "2px 2px 4px rgba(255,255,255,0.8)",
      // glassGradient: isDarkMode
      //   ? "" // No gradient in dark mode
      //   : "bg-gradient-to-r from-[#A3ADBA] via-[#A3ADBA]/60 to-transparent",
      // imageOverlay: isDarkMode
      //   ? "" // No overlay in dark mode
      //   : "bg-gradient-to-l from-transparent via-[#A3ADBA]/20 to-[#A3ADBA]/60",
    }),
    [isDarkMode, darkImages, lightImages]
  );

  // Memoized text animation calculations
  const textAnimations = useMemo(() => {
    const textVisibilityStart = 20;
    const textVisibilityEnd = 35;
    const textVisibilityRange = textVisibilityEnd - textVisibilityStart;

    let textOpacity = 0;
    let textTransform = "translateX(-100px)";

    if (
      currentFrame >= textVisibilityStart &&
      currentFrame <= textVisibilityEnd
    ) {
      const progress =
        (currentFrame - textVisibilityStart) / textVisibilityRange;
      textOpacity = Math.min(1, progress * 2);
      textTransform = `translateX(${-100 + progress * 100}px)`;
    } else if (currentFrame > textVisibilityEnd) {
      const fadeOutProgress = Math.min(
        1,
        (currentFrame - textVisibilityEnd) / 10
      );
      textOpacity = Math.max(0, 1 - fadeOutProgress);
      textTransform = `translateX(${fadeOutProgress * 50}px)`;
    }

    // Title animation based on scroll progress
    const titleScale = 1 + scrollProgress * 0.3;
    const titleOpacity = Math.max(0.4, 1 - scrollProgress * 0.6);

    return { textOpacity, textTransform, titleScale, titleOpacity };
  }, [currentFrame, scrollProgress]);

  return (
    <div
      className={`w-full ${themeValues.bgColor} transition-colors duration-300`}
    >
      {/* Glass Navigation Bar - Sticky */}
    

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
          className={`sticky top-0 w-full h-screen  ${themeValues.heroBgColor}`}
        >
          {!imagesLoaded ? (
            <div
              className={`w-full h-full ${themeValues.heroBgColor}  flex items-center justify-center`}
            >
              <div
                className={`animate-spin rounded-full h-8 w-8 border-b-2 ${themeValues.spinnerColor}`}
              ></div>
            </div>
          ) : (
            <>
              {/* Video frames */}
              <div className="w-full  h-full flex relative">
                {/* Left side - text area with conditional gradient blend */}
                <div className=" relative">
                  {!isDarkMode && (
                    <div
                      className={`absolute inset-0 ${themeValues.glassGradient}`}
                    ></div>
                  )}
                </div>

                {/* Right side - image container */}
                <div className="w-2/4 m-auto h-full justify-center  relative">
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

                  {/* Conditional reverse gradient overlay on image side */}
                  {!isDarkMode && (
                    <div
                      className={`absolute inset-0 ${themeValues.imageOverlay}`}
                    ></div>
                  )}
                </div>

                {/* Glass blur overlay at center junction - Only in light mode */}
                {!isDarkMode && (
                  <>
                    <div className="absolute left-1/2 top-0 bottom-0 w-32 -translate-x-1/2  pointer-events-none"></div>

                    {/* Additional subtle blend overlay */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-16 -translate-x-1/2  pointer-events-none"></div>
                  </>
                )}
              </div>

              {/* Animated Title - Left Side */}
              <div className="absolute inset-0 flex items-center pointer-events-none">
                <div className="pl-8 md:pl-16 ml-8 md:ml-12 relative z-10">
                  <h1
                    className={`font-bold leading-tight ${themeValues.textColor}`}
                    style={{
                      transform: `scale(${textAnimations.titleScale})`,
                      opacity: textAnimations.titleOpacity,
                      textShadow: themeValues.textShadow,
                      willChange: "transform, opacity",
                      transition: "none",
                    }}
                  >
                    <div className="text-3xl md:text-5xl lg:text-6xl">
                 
                    </div>
                    <span
                      className={`text-5xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r bg-clip-text text-transparent ${themeValues.gradientColors}`}
                      style={{
                        fontWeight: 900,
                        WebkitTextStroke: themeValues.textStroke,
                      }}
                    >
                      NLP CLUB
                    </span>
                  </h1>
                </div>
              </div>

              {/* Frame-based Animated Text */}
              <div
                className="absolute bottom-20 left-8 md:left-16 pointer-events-none z-10"
                style={{
                  opacity: textAnimations.textOpacity,
                  transform: textAnimations.textTransform,
                  willChange: "transform, opacity",
                  transition: "none",
                }}
              >
                <div
                  className={`text-xl md:text-2xl font-semibold ${
                    isDarkMode ? "text-white/90" : "text-black/90"
                  }`}
                >
         
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom spacer */}
      <div className={`h-screen ${themeValues.bgColor}`}></div>
    </div>
  );
};

export default ScrollVideoFrames;
