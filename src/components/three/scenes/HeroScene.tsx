'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
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
    meshRef.current.rotation.z = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.3, 0.38, 256, 48]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.5}
          roughness={0.0}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#0a0a2a"
          attenuationDistance={0.3}
          attenuationColor="#00E5FF"
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

function ReactiveParticles() {
  const count = 2000;
  const mouse = useMousePosition();
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, originalPositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 14 + 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
      orig[i * 3] = x; orig[i * 3 + 1] = y; orig[i * 3 + 2] = z;
    }
    return { positions: pos, originalPositions: orig };
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const t = state.clock.elapsedTime;
    particlesRef.current.rotation.y = t * 0.015;
    particlesRef.current.rotation.x = t * 0.008;
    const geo = particlesRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const mx = mouse.normalizedX;
    const my = mouse.normalizedY;
    for (let i = 0; i < count; i++) {
      const wave = Math.sin(t * 0.8 + i * 0.01) * 0.06;
      pos[i * 3]     = originalPositions[i * 3]     + mx * wave * 2;
      pos[i * 3 + 1] = originalPositions[i * 3 + 1] + my * wave * 2;
      pos[i * 3 + 2] = originalPositions[i * 3 + 2] + wave;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#00E5FF"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function VioletParticles() {
  const count = 800;
  const particlesRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 24;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = -state.clock.elapsedTime * 0.01;
    particlesRef.current.rotation.z = state.clock.elapsedTime * 0.005;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#7C3AED" transparent opacity={0.35} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Scene() {
  const mouse = useMousePosition();

  useFrame((state) => {
    state.camera.position.x += (mouse.normalizedX * 0.6 - state.camera.position.x) * 0.025;
    state.camera.position.y += (-mouse.normalizedY * 0.4 - state.camera.position.y) * 0.025;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[6, 6, 6]} intensity={3} color="#00E5FF" />
      <pointLight position={[-6, -4, -4]} intensity={2} color="#7C3AED" />
      <spotLight position={[0, 10, 5]} angle={0.35} penumbra={0.9} intensity={5} color="#00B8D4" castShadow />
      <pointLight position={[0, -6, 2]} intensity={1.5} color="#A855F7" />
      <fog attach="fog" args={['#030305', 10, 28]} />
      <GlassTorusKnot />
      <ReactiveParticles />
      <VioletParticles />
      <Stars radius={35} depth={60} count={2500} factor={3} saturation={0} fade speed={0.4} />
      <EffectComposer>
        <Bloom
          intensity={1.8}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0008, 0.0008]}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </>
  );
}

export function HeroScene() {
  return (
    <CanvasWrapper className="fixed inset-0" camera={{ position: [0, 0, 5.5], fov: 60 }} frameloop="always">
      <Scene />
    </CanvasWrapper>
  );
}
