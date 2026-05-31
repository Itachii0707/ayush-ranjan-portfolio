'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { usePathname } from 'next/navigation';
import * as THREE from 'three';
import { CanvasWrapper } from './CanvasWrapper';
import { useMousePosition } from '@/lib/hooks/use-mouse-position';

function GlassTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useMousePosition();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.12 + mouse.normalizedY * 0.3;
    meshRef.current.rotation.y = t * 0.18 + mouse.normalizedX * 0.3;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.3, 0.38, 200, 40]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          roughness={0.0}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.04}
          distortion={0.15}
          distortionScale={0.3}
          temporalDistortion={0.08}
          color="#0a0a2a"
          attenuationDistance={0.3}
          attenuationColor="#00E5FF"
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

function DriftingParticles() {
  const mouse = useMousePosition();
  const pathname = usePathname();
  const cyanRef = useRef<THREE.Points>(null);
  const violetRef = useRef<THREE.Points>(null);

  const isHomePage = pathname === '/';

  // Cyan particles positions
  const cyanPositions = useMemo(() => {
    const count = 300;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, []);

  // Violet particles positions
  const violetPositions = useMemo(() => {
    const count = 200;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Slow drifting rotations
    if (cyanRef.current) {
      cyanRef.current.rotation.y = t * 0.01;
      cyanRef.current.rotation.x = t * 0.005;
    }
    if (violetRef.current) {
      violetRef.current.rotation.y = -t * 0.008;
      violetRef.current.rotation.z = t * 0.003;
    }

    // Smooth camera parallax
    state.camera.position.x += (mouse.normalizedX * 0.6 - state.camera.position.x) * 0.015;
    state.camera.position.y += (-mouse.normalizedY * 0.4 - state.camera.position.y) * 0.015;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#00E5FF" />
      <pointLight position={[-5, -5, -5]} intensity={1.5} color="#7C3AED" />
      <spotLight position={[0, 10, 5]} angle={0.35} penumbra={0.9} intensity={2} color="#00B8D4" />

      {/* Conditionally render the premium glass TorusKnot ONLY on the home page */}
      {isHomePage && <GlassTorusKnot />}

      {/* Cyan drifting point stars */}
      <points ref={cyanRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[cyanPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#00E5FF"
          transparent
          opacity={0.35}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Violet drifting point stars */}
      <points ref={violetRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[violetPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#A855F7"
          transparent
          opacity={0.3}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Starfield background */}
      <Stars
        radius={24}
        depth={40}
        count={800}
        factor={2}
        saturation={0.5}
        fade
        speed={0.15}
      />
    </>
  );
}

export function GlobalBackground() {
  return (
    <CanvasWrapper
      className="fixed inset-0 z-0 pointer-events-none"
      camera={{ position: [0, 0, 5.5], fov: 60 }}
      frameloop="always"
    >
      <DriftingParticles />
    </CanvasWrapper>
  );
}
