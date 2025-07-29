import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Particle component for individual particles
const Particle = ({ position, color, size, isLetter = false }) => {
  const ref = useRef();
  
  // Random movement animation - only for non-letter particles
  useEffect(() => {
    if (!isLetter) {
      const duration = 2 + Math.random() * 2;
      const distance = 0.2 + Math.random() * 0.3; // Smaller movement range
      
      gsap.to(ref.current.position, {
        x: position[0] + (Math.random() - 0.5) * distance,
        y: position[1] + (Math.random() - 0.5) * distance,
        z: position[2] + (Math.random() - 0.5) * distance,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    } else {
      // Subtle movement for letter particles
      const duration = 1.5 + Math.random() * 1.5;
      const distance = 0.05 + Math.random() * 0.2;
      
      gsap.to(ref.current.position, {
        x: position[0] + (Math.random() - 0.5) * distance,
        y: position[1] + (Math.random() - 0.5) * distance,
        z: position[2] + (Math.random() - 0.5) * distance,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, [position, isLetter]);
  
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 6, 6]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} />
    </mesh>
  );
};

// Main particle system component
const ParticleSystem = ({ count = 400, letterParticleCount = 300 }) => {
  const { viewport, mouse } = useThree();
  const groupRef = useRef();
  
  // Generate particles for the letter 'N'
  const letterParticles = useMemo(() => {
    const temp = [];
    const letterWidth = 2; // Broader letter
    const letterHeight = 2.5;
    const thickness = 0.4; // Thinner for sharper edges
    const strokeWidth = 0.2; // Width of the strokes for sharper edges
    
    // Function to create particles for a line with thickness (for sharp edges)
    const createLineParticles = (startX, startY, endX, endY, count) => {
      const particles = [];
      const lineLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
      const normalX = -(endY - startY) / lineLength;
      const normalY = (endX - startX) / lineLength;
      
      for (let i = 0; i < count; i++) {
        // Position along the line
        const t = i / (count - 1);
        const baseX = startX + (endX - startX) * t;
        const baseY = startY + (endY - startY) * t;
        
        // Add particles across the stroke width for sharp edges
        const strokeParticleCount = 5; // Number of particles across the stroke width
        for (let j = 0; j < strokeParticleCount; j++) {
          const strokeT = j / (strokeParticleCount - 1) - 0.5; // -0.5 to 0.5
          const offsetX = normalX * strokeWidth * strokeT;
          const offsetY = normalY * strokeWidth * strokeT;
          
          // Add some minimal randomness for a solid but not too perfect look
          const jitter = 0.02;
          const randX = (Math.random() - 0.5) * jitter;
          const randY = (Math.random() - 0.5) * jitter;
          
          const x = baseX + offsetX + randX;
          const y = baseY + offsetY + randY;
          const z = (Math.random() - 0.5) * thickness;
          
          particles.push({
            position: [x, y, z],
            color: new THREE.Color(1, 1, 1), // Pure white
            size: 0.005 + Math.random() * 0.002, // Very small particles
            isLetter: true
          });
        }
      }
      return particles;
    };
    
    // Left vertical line of 'N'
    temp.push(...createLineParticles(-letterWidth/2, -letterHeight/2, -letterWidth/2, letterHeight/2, letterParticleCount/3));
    
    // Diagonal line of 'N'
    temp.push(...createLineParticles(-letterWidth/2, letterHeight/2, letterWidth/2, -letterHeight/2, letterParticleCount/3));
    
    // Right vertical line of 'N'
    temp.push(...createLineParticles(letterWidth/2, -letterHeight/2, letterWidth/2, letterHeight/2, letterParticleCount/3));
    
    return temp;
  }, [letterParticleCount]);
  
  // Generate random particles around the letter
  const backgroundParticles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      temp.push({
        position: [x, y, z],
        color: new THREE.Color(0.8 + Math.random() * 0.2, 0.8 + Math.random() * 0.2, 0.8 + Math.random() * 0.2), // White with slight variation
        size: 0.003 + Math.random() * 0.004, // Even smaller particles
        isLetter: false
      });
    }
    return temp;
  }, [count]);
  
  // Handle mouse movement for rotation
  const [isMouseDown, setIsMouseDown] = useState(false);
  
  // Add event listeners for mouse down/up
  useEffect(() => {
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  useFrame((state) => {
    if (groupRef.current && !isMouseDown) { // Only rotate when mouse is not pressed
      // Rotate based on mouse position, but limit rotation to prevent upside down
      const maxRotation = 0.3; // Limit rotation to keep N properly oriented
      const rotX = THREE.MathUtils.clamp(mouse.y * 0.5, -maxRotation, maxRotation);
      const rotY = mouse.x * 0.5; // Allow full horizontal rotation
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        rotX,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        rotY,
        0.05
      );
      
      // Remove z-rotation to keep N properly oriented
      groupRef.current.rotation.z = 0;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Letter N made of particles */}
      {letterParticles.map((particle, i) => (
        <Particle key={`letter-${i}`} {...particle} />
      ))}
      
      {/* Background Particles */}
      {backgroundParticles.map((particle, i) => (
        <Particle key={`bg-${i}`} {...particle} />
      ))}
    </group>
  );
};

export default ParticleSystem;