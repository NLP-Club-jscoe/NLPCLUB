import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const HeaderFrame = ({ isDarkMode, onLoadingChange }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(0);
  const [textZIndex, setTextZIndex] = useState(30);
  const containerRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const totalFrames = 140;
  const secondFrameCount = 100;
  const thirdFrameCount = 120;
  const criticalFrameCount = 20;
  const currentFrameRef = useRef({ current: 0 });

  // Enhanced loading states - NO LOADER UI HERE
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('Initializing...');
  const [darkImages, setDarkImages] = useState(Array(totalFrames).fill(null));
  const [lightImages, setLightImages] = useState(Array(totalFrames).fill(null));
  const [criticalFramesLoaded, setCriticalFramesLoaded] = useState(false);

  // Notify parent component of loading changes
  useEffect(() => {
    onLoadingChange?.({
      isLoaded: imagesLoaded,
      progress: loadingProgress,
      stage: loadingStage
    });
  }, [imagesLoaded, loadingProgress, loadingStage, onLoadingChange]);

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

  const currentText = isDarkMode ? textContent.dark : textContent.light;

  // Enhanced image preloading with better progress tracking
  useEffect(() => {
    let isMounted = true;
    const initialFrameCount = 40;
    
    let totalExpectedLoads = 0;
    let currentLoads = 0;

    const updateProgress = (stage, loaded, total) => {
      if (!isMounted) return;
      const progress = Math.round((loaded / total) * 100);
      setLoadingProgress(progress);
      setLoadingStage(stage);
    };

    const preloadImageBatch = async (theme, startFrame, endFrame, isEager = false) => {
      const promises = [];
      
      for (let i = startFrame; i <= endFrame; i++) {
        const frameNumber = String(i).padStart(5, '0');
        const img = new Image();
        img.src = `/frames/${theme}/frame_${frameNumber}.webp`;
        
        if (isEager) {
          img.loading = 'eager';
          img.fetchPriority = 'high';
        }
        
        promises.push(new Promise(resolve => {
          const handleLoad = () => {
            currentLoads++;
            updateProgress(`Loading ${theme} frames...`, currentLoads, totalExpectedLoads);
            resolve({ img, index: i - 1 });
          };
          
          const handleError = () => {
            currentLoads++;
            updateProgress(`Loading ${theme} frames...`, currentLoads, totalExpectedLoads);
            resolve({ img: null, index: i - 1 });
          };
          
          img.onload = handleLoad;
          img.onerror = handleError;
        }));
      }
      
      return Promise.all(promises);
    };

    const loadImages = async () => {
      if (!isMounted) return;
      
      const primaryTheme = isDarkMode ? 'dark' : 'light';
      const secondaryTheme = isDarkMode ? 'light' : 'dark';
      const primarySetter = isDarkMode ? setDarkImages : setLightImages;
      const secondarySetter = isDarkMode ? setLightImages : setDarkImages;

      totalExpectedLoads = totalFrames * 2;
      
      try {
        setLoadingStage('Loading critical frames...');
        const criticalFrames = await preloadImageBatch(primaryTheme, 1, criticalFrameCount, true);
        
        if (!isMounted) return;
        
        primarySetter(prev => {
          const newArr = [...prev];
          criticalFrames.forEach(({ img, index }) => { 
            if (img) newArr[index] = img; 
          });
          return newArr;
        });
        
        setCriticalFramesLoaded(true);
        
        setLoadingStage('Loading essential frames...');
        const initialFrames = await preloadImageBatch(primaryTheme, criticalFrameCount + 1, initialFrameCount);
        
        if (!isMounted) return;
        
        primarySetter(prev => {
          const newArr = [...prev];
          initialFrames.forEach(({ img, index }) => { 
            if (img) newArr[index] = img; 
          });
          return newArr;
        });
        
        setImagesLoaded(true);
        
        // Background load remaining frames
        const loadRemainingFrames = async () => {
          const chunkSize = 20;
          
          for (let start = initialFrameCount + 1; start <= secondFrameCount; start += chunkSize) {
            if (!isMounted) return;
            const end = Math.min(start + chunkSize - 1, secondFrameCount);
            const chunk = await preloadImageBatch(primaryTheme, start, end);
            
            if (isMounted) {
              primarySetter(prev => {
                const newArr = [...prev];
                chunk.forEach(({ img, index }) => { 
                  if (img) newArr[index] = img; 
                });
                return newArr;
              });
            }
            
            await new Promise(resolve => setTimeout(resolve, 50));
          }
          
          for (let start = secondFrameCount + 1; start <= thirdFrameCount; start += chunkSize) {
            if (!isMounted) return;
            const end = Math.min(start + chunkSize - 1, thirdFrameCount);
            const chunk = await preloadImageBatch(primaryTheme, start, end);
            
            if (isMounted) {
              primarySetter(prev => {
                const newArr = [...prev];
                chunk.forEach(({ img, index }) => { 
                  if (img) newArr[index] = img; 
                });
                return newArr;
              });
            }
            
            await new Promise(resolve => setTimeout(resolve, 50));
          }
          
          for (let start = thirdFrameCount + 1; start <= totalFrames; start += chunkSize) {
            if (!isMounted) return;
            const end = Math.min(start + chunkSize - 1, totalFrames);
            const chunk = await preloadImageBatch(primaryTheme, start, end);
            
            if (isMounted) {
              primarySetter(prev => {
                const newArr = [...prev];
                chunk.forEach(({ img, index }) => { 
                  if (img) newArr[index] = img; 
                });
                return newArr;
              });
            }
            
            await new Promise(resolve => setTimeout(resolve, 50));
          }
        };
        
        const loadSecondaryTheme = async () => {
          const chunkSize = 30;
          
          for (let start = 1; start <= totalFrames; start += chunkSize) {
            if (!isMounted) return;
            const end = Math.min(start + chunkSize - 1, totalFrames);
            const chunk = await preloadImageBatch(secondaryTheme, start, end);
            
            if (isMounted) {
              secondarySetter(prev => {
                const newArr = [...prev];
                chunk.forEach(({ img, index }) => { 
                  if (img) newArr[index] = img; 
                });
                return newArr;
              });
            }
            
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        };
        
        Promise.all([loadRemainingFrames(), loadSecondaryTheme()]).then(() => {
          if (isMounted) {
            setLoadingProgress(100);
            setLoadingStage('Complete!');
          }
        });
        
      } catch (error) {
        console.error('Error loading images:', error);
        if (isMounted) {
          setLoadingStage('Error loading images');
        }
      }
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, [isDarkMode, totalFrames, criticalFrameCount]);

  // GSAP Text Animation for left and right text
  useEffect(() => {
    if (!leftTextRef.current || !rightTextRef.current) return;

    const handleTextAnimation = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      const scrollStart = containerTop - windowHeight;
      const scrollEnd = containerTop + containerHeight * 0.15;
      const scrollDistance = scrollEnd - scrollStart;
      const currentScroll = scrollTop - scrollStart;
      const progress = Math.max(0, Math.min(1, currentScroll / scrollDistance));

      const leftTranslateX = -100 + progress * 100;
      const leftOpacity = progress;
      const rightTranslateX = 100 - progress * 100;
      const rightOpacity = progress;

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

    handleTextAnimation();
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
    return () => window.removeEventListener("scroll", throttledHandler);
  }, []);

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerHeight = container.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = container.offsetTop;
    const scrollableDistance = containerHeight - windowHeight;
    const relativeScroll = scrollTop - containerTop;
    const rawProgress = Math.max(0, Math.min(1, relativeScroll / scrollableDistance));

    setScrollProgress(rawProgress);

    const imageRevealThreshold = 0.05;
    const imageProgress = Math.max(0, (rawProgress - imageRevealThreshold) / (1 - imageRevealThreshold));
    const newImageOpacity = Math.min(1, imageProgress * 2);
    setImageOpacity(newImageOpacity);

    if (newImageOpacity > 0.3) {
      setTextZIndex(10);
    } else {
      setTextZIndex(30);
    }

    if (criticalFramesLoaded && rawProgress > imageRevealThreshold) {
      const frameProgress = (rawProgress - imageRevealThreshold) / (1 - imageRevealThreshold);
      const targetFrame = frameProgress * (totalFrames - 1);
      const currentTargetFrame = Math.max(0, Math.min(totalFrames - 1, Math.round(targetFrame)));
      currentFrameRef.current.current = currentTargetFrame;
      setCurrentFrame(currentTargetFrame);
    }
  }, [criticalFramesLoaded, totalFrames]);

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

    window.addEventListener("scroll", throttledScrollHandler, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", throttledScrollHandler);
  }, [handleScroll]);

  // Memoized theme values
  const themeValues = useMemo(() => ({
    currentImages: isDarkMode ? darkImages : lightImages,
    heroBgColor: isDarkMode ? "bg-black" : "bg-white",
    textColor: isDarkMode ? "text-white" : "text-black",
    buttonBg: isDarkMode
      ? "bg-white text-black hover:bg-gray-100"
      : "bg-black text-white hover:bg-gray-800",
    spinnerColor: isDarkMode ? "border-white" : "border-black",
  }), [isDarkMode, darkImages, lightImages]);

  // Memoized text animation calculations
  const textAnimations = useMemo(() => {
    const titleScale = 1 + scrollProgress * 0.1;
    const titleOpacity = Math.max(0.3, 1 - scrollProgress * 0.5);
    return { titleScale, titleOpacity };
  }, [scrollProgress]);

  return (
    <div className={`w-full transition-colors duration-300`}>
      {/* Main scroll video container */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: "500vh" }}
      >
        {/* Sticky container for the image */}
        <div className={`sticky top-0 w-full h-screen ${themeValues.heroBgColor}`}>
          
          {/* NO LOADER HERE - Removed completely */}

          {/* Video frames - Show as soon as critical frames are loaded */}
          {criticalFramesLoaded && (
            <div 
              className="w-full h-full flex relative z-20"
              style={{ 
                opacity: imageOpacity,
                transition: 'opacity 0.3s ease-out'
              }}
            >
              <div className="w-2/4 m-auto h-full justify-center relative mt-8 md:mt-12">
                {themeValues.currentImages[currentFrame] && (
                  <img
                    src={themeValues.currentImages[currentFrame].src}
                    alt={`Frame ${currentFrame + 1}`}
                    className="w-full h-full object-cover"
                    style={{
                      willChange: "transform",
                      transform: "translateZ(0)",
                      imageRendering: "high-quality",
                    }}
                    loading="eager"
                  />
                )}
              </div>
            </div>
          )}

          {/* Left Side Text */}
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
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-black leading-tight ${themeValues.textColor} tracking-wide`}>
              {currentText.leftText}
            </h2>
          </div>

          {/* Right Side Text */}
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
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-black leading-tight ${themeValues.textColor} tracking-wide`}>
              {currentText.rightText}
            </h2>
          </div>

          {/* Main Title */}
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

          {/* Main Subtitle */}
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
        </div>
      </div>
    </div>
  );
};

export default HeaderFrame;