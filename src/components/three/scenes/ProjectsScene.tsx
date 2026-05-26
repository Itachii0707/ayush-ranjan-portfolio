'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Grid, Float } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasWrapper } from '../CanvasWrapper';

function DeviceSlab({ position, rotation }: { position: [number,number,number]; rotation?: [number,number,number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
  });
  return (
    <mesh ref={meshRef} position={position} rotation={rotation || [0, 0, 0]}>
      <boxGeometry args={[2.2, 1.4, 0.05]} />
      <meshPhysicalMaterial color="#0a0a20" metalness={0.8} roughness={0.2} emissive="#001122" emissiveIntensity={0.5} transmission={0.1} thickness={0.2} />
    </mesh>
  );
}

function HolographicFrame({ position }: { position: [number,number,number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z += 0.005;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
  });
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[1.5, 0.02, 8, 60]} />
      <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.3} transparent opacity={0.6} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 4, 2]} intensity={2} color="#00E5FF" />
      <pointLight position={[-6, 0, 0]} intensity={1} color="#7C3AED" />
      <spotLight position={[0, 10, 5]} angle={0.3} penumbra={0.9} intensity={2} color="#00E5FF" castShadow />
      <fog attach="fog" args={['#030305', 8, 22]} />
      <Float speed={1} floatIntensity={0.3}><DeviceSlab position={[-4, 0.5, -3]} rotation={[0.1, 0.4, 0]} /></Float>
      <Float speed={1.3} floatIntensity={0.4}><DeviceSlab position={[4, -0.5, -4]} rotation={[0.05, -0.3, 0.05]} /></Float>
      <Float speed={0.8} floatIntensity={0.2}><DeviceSlab position={[0, 2, -6]} rotation={[0.15, 0, 0]} /></Float>
      <Float speed={1.1} floatIntensity={0.35}><DeviceSlab position={[-2, -1.5, -5]} rotation={[0, 0.2, 0.1]} /></Float>
      <HolographicFrame position={[5, 1, -5]} />
      <HolographicFrame position={[-5, -1, -6]} />
      <Grid position={[0, -3, -5]} args={[40, 40]} cellSize={0.8} cellThickness={0.5} cellColor="rgba(0,229,255,0.3)" sectionSize={4} sectionThickness={0.8} sectionColor="rgba(124,58,237,0.4)" fadeDistance={18} fadeStrength={1} infiniteGrid />
    </>
  );
}

export function ProjectsScene() {
  return (
    <CanvasWrapper className="absolute inset-0" camera={{ position: [0, 1, 7], fov: 65 }} frameloop="always">
      <Scene />
    </CanvasWrapper>
  );
}
