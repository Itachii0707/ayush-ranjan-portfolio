'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { TorusKnot, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasWrapper } from '../CanvasWrapper';
import { useMousePosition } from '@/lib/hooks/use-mouse-position';

function TorusKnotMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useMousePosition();

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.003;
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.x += mouse.normalizedY * 0.001;
    meshRef.current.rotation.y += mouse.normalizedX * 0.001;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <TorusKnot ref={meshRef} args={[1.2, 0.35, 200, 32]} castShadow>
        <meshPhysicalMaterial
          color="#0a0a1a"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={2}
          emissive="#003344"
          emissiveIntensity={0.3}
          transmission={0.1}
          thickness={0.5}
        />
      </TorusKnot>
    </Float>
  );
}

function ParticleField() {
  const count = 1500;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#00E5FF" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function Scene() {
  const mouse = useMousePosition();

  useFrame((state) => {
    state.camera.position.x += (mouse.normalizedX * 0.5 - state.camera.position.x) * 0.02;
    state.camera.position.y += (mouse.normalizedY * 0.3 - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#00E5FF" />
      <pointLight position={[-5, -3, -3]} intensity={1.5} color="#7C3AED" />
      <spotLight position={[0, 8, 4]} angle={0.4} penumbra={0.8} intensity={3} color="#00B8D4" castShadow />
      <fog attach="fog" args={['#030305', 8, 25]} />
      <TorusKnotMesh />
      <ParticleField />
      <Stars radius={30} depth={50} count={2000} factor={3} saturation={0} fade speed={0.5} />
    </>
  );
}

export function HeroScene() {
  return (
    <CanvasWrapper className="fixed inset-0" camera={{ position: [0, 0, 5], fov: 60 }} frameloop="always">
      <Scene />
    </CanvasWrapper>
  );
}
