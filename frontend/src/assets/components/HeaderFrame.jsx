import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const HeaderFrame = ({isDarkMode}) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(0); // New state for image opacity
  const [textZIndex, setTextZIndex] = useState(30); // New state for text z-index
  const containerRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const totalFrames = 140;
  const secondFrameCount = 80;
  const thirdFrameCount = 120;
  const currentFrameRef = useRef({ current: 0 });

  // Preload images for both themes
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [darkImages, setDarkImages] = useState(Array(totalFrames).fill(null));
  const [lightImages, setLightImages] = useState(Array(totalFrames).fill(null));
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

    // Image preloading logic
  useEffect(() => {
    let isMounted = true;
    const initialFrameCount = 50; // Number of frames to load initially

    const preloadImageRange = (theme, start, end, isLazy) => {
      const promises = [];
      const images = [];
      for (let i = start; i <= end; i++) {
        const frameNumber = String(i).padStart(5, '0');
        const img = new Image();
        img.src = `/frames/${theme}/frame_${frameNumber}.webp`;
        img.loading = isLazy ? 'lazy' : 'eager';
        promises.push(
          new Promise((resolve, reject) => {
            img.onload = () => {
              images[i - 1] = img; // Store in correct index
              resolve();
            };
            img.onerror = reject;
          })
        );
      }
      return Promise.all(promises).then(() => images);
    };

    const loadImages = async () => {
      const primaryTheme = isDarkMode ? 'dark' : 'light';
      const secondaryTheme = isDarkMode ? 'light' : 'dark';
      const primarySetter = isDarkMode ? setDarkImages : setLightImages;
      const secondarySetter = isDarkMode ? setLightImages : setDarkImages;

      // Loop 1: Eagerly load initial primary frames
      const initialPrimaryPromises = [];
      for (let i = 1; i <= initialFrameCount; i++) {
        const frameNumber = String(i).padStart(5, '0');
        const img = new Image();
        img.src = `/frames/${primaryTheme}/frame_${frameNumber}.webp`;
        initialPrimaryPromises.push(new Promise(resolve => {
          img.onload = () => resolve({ img, index: i - 1 });
          img.onerror = () => resolve({ img: null, index: i - 1 });
        }));
      }
      const loadedInitialPrimary = await Promise.all(initialPrimaryPromises);
      if (!isMounted) return;
      primarySetter(prev => {
        const newArr = [...prev];
        loadedInitialPrimary.forEach(({ img, index }) => { if (img) newArr[index] = img; });
        return newArr;
      });
      setImagesLoaded(true);

      // Loop 2: Lazily load remaining primary frames
      const remainingPrimaryPromises = [];
      for (let i = initialFrameCount + 1; i <= secondFrameCount ; i++) {
        const frameNumber = String(i).padStart(5, '0');
        const img = new Image();
        img.src = `/frames/${primaryTheme}/frame_${frameNumber}.webp`;
        remainingPrimaryPromises.push(new Promise(resolve => {
          img.onload = () => resolve({ img, index: i - 1 });
          img.onerror = () => resolve({ img: null, index: i - 1 });
        }));
      }
      
      for (let i = secondFrameCount + 1; i <= thirdFrameCount; i++) {
        const frameNumber = String(i).padStart(5, '0');
        const img = new Image();
        img.src = `/frames/${primaryTheme}/frame_${frameNumber}.webp`;
        remainingPrimaryPromises.push(new Promise(resolve => {
          img.onload = () => resolve({ img, index: i - 1 });
          img.onerror = () => resolve({ img: null, index: i - 1 });
        }));
      }

      for (let i = thirdFrameCount + 1; i <= totalFrames; i++) {
        const frameNumber = String(i).padStart(5, '0');
        const img = new Image();
        img.src = `/frames/${primaryTheme}/frame_${frameNumber}.webp`;
        remainingPrimaryPromises.push(new Promise(resolve => {
          img.onload = () => resolve({ img, index: i - 1 });
          img.onerror = () => resolve({ img: null, index: i - 1 });
        }));
      }


      Promise.all(remainingPrimaryPromises).then(loadedRemainingPrimary => {
        if (isMounted) {
            primarySetter(prev => {
                const newArr = [...prev];
                loadedRemainingPrimary.forEach(({ img, index }) => { if (img) newArr[index] = img; });
                return newArr;
            });
        }
      });

      // Loop 3: Lazily load initial secondary frames
      const initialSecondaryPromises = [];
      for (let i = 1; i <= initialFrameCount; i++) {
          const frameNumber = String(i).padStart(5, '0');
          const img = new Image();
          img.src = `/frames/${secondaryTheme}/frame_${frameNumber}.webp`;
          initialSecondaryPromises.push(new Promise(resolve => {
              img.onload = () => resolve({ img, index: i - 1 });
              img.onerror = () => resolve({ img: null, index: i - 1 });
          }));
      }
      Promise.all(initialSecondaryPromises).then(loadedInitialSecondary => {
          if (isMounted) {
              secondarySetter(prev => {
                  const newArr = [...prev];
                  loadedInitialSecondary.forEach(({ img, index }) => { if (img) newArr[index] = img; });
                  return newArr;
              });
          }
      });

      // Loop 4: Lazily load remaining secondary frames
      const remainingSecondaryPromises = [];
      for (let i = initialFrameCount + 1; i <= totalFrames; i++) {
          const frameNumber = String(i).padStart(5, '0');
          const img = new Image();
          img.src = `/frames/${secondaryTheme}/frame_${frameNumber}.webp`;
          remainingSecondaryPromises.push(new Promise(resolve => {
              img.onload = () => resolve({ img, index: i - 1 });
              img.onerror = () => resolve({ img: null, index: i - 1 });
          }));
      }
      Promise.all(remainingSecondaryPromises).then(loadedRemainingSecondary => {
          if (isMounted) {
              secondarySetter(prev => {
                  const newArr = [...prev];
                  loadedRemainingSecondary.forEach(({ img, index }) => { if (img) newArr[index] = img; });
                  return newArr;
              });
          }
      });
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, [isDarkMode, totalFrames]);

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
      heroBgColor: isDarkMode ? "bg-black" : "bg-white",
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

          {/* Left Side Text - Now positioned at TOP */}
          <div
            ref={leftTextRef}
            className="absolute left-8 md:left-16 top-24 md:top-24 pointer-events-none max-w-xs"
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

          {/* Right Side Text - Now positioned at BOTTOM */}
          <div
            ref={rightTextRef}
            className="absolute right-8 md:right-16 bottom-20 md:bottom-24 pointer-events-none max-w-xs text-right"
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
  className={`text-8xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-black tracking-widest text-center ${
    isDarkMode
      ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
      : ""
  }`}
  style={{
    color: isDarkMode ? undefined : "#454547",
    fontWeight: 900,
    textShadow: isDarkMode
      ? "0 0 20px rgba(255,255,255,0.3)"
      : "0 0 10px rgba(0,0,0,0.05)",
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
  className={`text-8xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-black tracking-widest text-center ${
    isDarkMode
      ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
      : ""
  }`}
  style={{
    color: isDarkMode ? undefined : "#454547",
    fontWeight: 900,
    textShadow: isDarkMode
      ? "0 0 20px rgba(255,255,255,0.3)"
      : "0 0 10px rgba(0,0,0,0.05)",
    letterSpacing: "0.2em",
  }}
>
  {currentText.mainSubtitle}
</h1>

          </div>

          {/* Loading indicator - full screen */}
          {!imagesLoaded && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-opacity-80 z-50"
              style={{ backgroundColor: isDarkMode ? '#000' : '#FFF' }}
            >
              <div className="text-center">
                <h2
                  className={`text-4xl font-bold ${themeValues.textColor}`}>
                  Loading...
                </h2>
                <p className={`mt-2 ${themeValues.textColor}`}>
                  Please wait while we prepare the experience.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderFrame;