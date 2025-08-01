import { useRef, useEffect } from 'react';

const StarsCanvas = ({ isDarkTheme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Star properties
    const stars = [];
    const numStars = 200;
    const starSpeed = 0.1;

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        opacity: Math.random(),
      });
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach((star) => {
        // Update star position
        star.y = (star.y + starSpeed) % canvas.height;
        star.opacity = 0.3 + Math.sin(Date.now() * 0.001 + star.x) * 0.3;

        // Draw star
        ctx.beginPath();
        ctx.fillStyle = isDarkTheme ? `rgba(255, 255, 255, ${star.opacity})` : `rgba(0, 0, 0, ${star.opacity})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default StarsCanvas;