import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Effects } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import ParticleSystem from './ParticleSystem';

const Scene = () => {
  return (
    <Canvas style={{ width: '100vw', height: '100vh', background: '#000000' }}>
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
        <ambientLight intensity={0.15} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} color="#ffffff" />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.4} color="#ffffff" />
        <ParticleSystem />
        <Environment preset="night" />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        
        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={300} intensity={2.0} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
};

export default Scene;