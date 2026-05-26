'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Grid, Float } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasWrapper } from '../CanvasWrapper';

function GlassPanel({ position, rotation }: { position: [number,number,number]; rotation?: [number,number,number] }) {
  return (
    <mesh position={position} rotation={rotation || [0, 0, 0]}>
      <boxGeometry args={[1.5, 2.2, 0.02]} />
      <meshPhysicalMaterial color="#00E5FF" transparent opacity={0.06} roughness={0} metalness={0.1} transmission={0.9} thickness={0.5} envMapIntensity={1} />
    </mesh>
  );
}

function DataPillar({ position, height }: { position: [number, number, number]; height: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.4 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2;
  });
  return (
    <mesh ref={ref} position={[position[0], position[1] + height / 2 - 3, position[2]]}>
      <boxGeometry args={[0.08, height, 0.08]} />
      <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.4} transparent opacity={0.7} />
    </mesh>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  const panels = [
    { position: [-4, 1, -2] as [number,number,number], rotation: [0, 0.3, 0] as [number,number,number] },
    { position: [4, 0, -3] as [number,number,number], rotation: [0, -0.4, 0.05] as [number,number,number] },
    { position: [-2, -2, -4] as [number,number,number], rotation: [0.1, 0.2, 0] as [number,number,number] },
    { position: [3, 2, -5] as [number,number,number], rotation: [0, -0.2, 0.1] as [number,number,number] },
    { position: [0, 3, -6] as [number,number,number], rotation: [0.05, 0, 0] as [number,number,number] },
  ];

  const pillars = [
    { position: [-5, 0, -3] as [number,number,number], height: 3 },
    { position: [-3.5, 0, -2] as [number,number,number], height: 1.8 },
    { position: [5, 0, -3] as [number,number,number], height: 2.5 },
    { position: [3.5, 0, -4] as [number,number,number], height: 3.5 },
    { position: [1.5, 0, -5] as [number,number,number], height: 2 },
    { position: [-1, 0, -4] as [number,number,number], height: 4 },
  ];

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 5, 0]} intensity={1} color="#00E5FF" />
      <pointLight position={[-8, 2, -2]} intensity={0.8} color="#7C3AED" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <fog attach="fog" args={['#030305', 5, 20]} />
      <group ref={groupRef}>
        {panels.map((p, i) => (
          <Float key={i} speed={0.8 + i * 0.2} floatIntensity={0.3} rotationIntensity={0.1}>
            <GlassPanel position={p.position} rotation={p.rotation} />
          </Float>
        ))}
        {pillars.map((p, i) => <DataPillar key={i} position={p.position} height={p.height} />)}
        <Grid position={[0, -3, -4]} args={[30, 30]} cellSize={0.6} cellThickness={0.5} cellColor="#00E5FF" sectionSize={3} sectionThickness={1} sectionColor="#7C3AED" fadeDistance={15} fadeStrength={1} infiniteGrid />
      </group>
    </>
  );
}

export function AboutScene() {
  return (
    <CanvasWrapper className="absolute inset-0" camera={{ position: [0, 0, 6], fov: 65 }} frameloop="always">
      <Scene />
    </CanvasWrapper>
  );
}
