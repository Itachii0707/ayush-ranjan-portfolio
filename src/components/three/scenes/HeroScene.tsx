'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { CanvasWrapper } from '../CanvasWrapper';
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

// Simpler rotation-only particles — no per-particle JS updates (GPU only)
function CyanParticles() {
  const count = 1200;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 12 + 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    ref.current.rotation.x = state.clock.elapsedTime * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00E5FF" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function VioletParticles() {
  const count = 600;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 24;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = -state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#7C3AED" transparent opacity={0.3} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Scene() {
  const mouse = useMousePosition();

  useFrame((state) => {
    // Smooth camera parallax with lerp
    state.camera.position.x += (mouse.normalizedX * 0.5 - state.camera.position.x) * 0.02;
    state.camera.position.y += (-mouse.normalizedY * 0.35 - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[6, 6, 6]} intensity={3} color="#00E5FF" />
      <pointLight position={[-6, -4, -4]} intensity={2} color="#7C3AED" />
      <spotLight position={[0, 10, 5]} angle={0.35} penumbra={0.9} intensity={5} color="#00B8D4" />
      <fog attach="fog" args={['#030305', 10, 28]} />
      <GlassTorusKnot />
      <CyanParticles />
      <VioletParticles />
      <Stars radius={35} depth={60} count={2000} factor={3} saturation={0} fade speed={0.3} />
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.6}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

import { useState, useEffect } from 'react';

export function HeroScene() {
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // If we scroll past the first fold (100vh), unmount the WebGL canvas to free up GPU resources
      setIsInView(window.scrollY < window.innerHeight + 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isInView) return null;

  return (
    <CanvasWrapper
      className="fixed inset-0"
      camera={{ position: [0, 0, 5.5], fov: 60 }}
      frameloop="always"
    >
      <Scene />
    </CanvasWrapper>
  );
}
