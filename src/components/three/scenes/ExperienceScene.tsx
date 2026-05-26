'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasWrapper } from '../CanvasWrapper';

function LightPillar({ position, color, height }: { position: [number,number,number]; color: string; height: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.4 + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.3;
  });
  return (
    <mesh ref={ref} position={[position[0], position[1] - 2 + height / 2, position[2]]}>
      <cylinderGeometry args={[0.04, 0.04, height, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.7} />
    </mesh>
  );
}

function RotatingRing({ position, radius, color }: { position: [number,number,number]; radius: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.3;
    ref.current.rotation.z = state.clock.elapsedTime * 0.2;
  });
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[radius, 0.03, 8, 64]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.5} />
    </mesh>
  );
}

function AchievementShard({ position }: { position: [number,number,number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.x += 0.005;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.15;
  });
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.2, 0]} />
      <meshPhysicalMaterial color="#00E5FF" metalness={1} roughness={0} emissive="#00E5FF" emissiveIntensity={0.5} />
    </mesh>
  );
}

function Scene() {
  const pillars = [
    { pos: [-5, 0, -4] as [number,number,number], color: '#00E5FF', h: 4 },
    { pos: [-3, 0, -3] as [number,number,number], color: '#7C3AED', h: 3 },
    { pos: [3, 0, -3] as [number,number,number], color: '#00E5FF', h: 5 },
    { pos: [5, 0, -4] as [number,number,number], color: '#7C3AED', h: 3.5 },
    { pos: [1, 0, -5] as [number,number,number], color: '#00E5FF', h: 2.5 },
    { pos: [-1.5, 0, -5] as [number,number,number], color: '#7C3AED', h: 4.5 },
  ];
  const shards: [number,number,number][] = [[-3, 1, -2], [3, -0.5, -2], [-1, 2, -3], [2, 1.5, -4], [-2, -1, -3], [0, -1, -2]];

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 6, 2]} intensity={1.5} color="#00E5FF" />
      <pointLight position={[-4, 0, -2]} intensity={1} color="#7C3AED" />
      <spotLight position={[2, 8, 3]} angle={0.4} penumbra={0.9} intensity={2} color="#ffffff" />
      <fog attach="fog" args={['#030305', 7, 20]} />
      {pillars.map((p, i) => <LightPillar key={i} position={p.pos} color={p.color} height={p.h} />)}
      <RotatingRing position={[-4, 1, -5]} radius={1.5} color="#00E5FF" />
      <RotatingRing position={[4, -1, -5]} radius={2} color="#7C3AED" />
      <RotatingRing position={[0, 2, -7]} radius={2.5} color="#00E5FF" />
      {shards.map((pos, i) => <AchievementShard key={i} position={pos} />)}
      <Grid position={[0, -3, -5]} args={[40, 40]} cellSize={1} cellThickness={0.5} cellColor="rgba(0,229,255,0.2)" sectionSize={5} sectionThickness={0.8} sectionColor="rgba(124,58,237,0.3)" fadeDistance={18} fadeStrength={1} infiniteGrid />
    </>
  );
}

export function ExperienceScene() {
  return (
    <CanvasWrapper className="absolute inset-0" camera={{ position: [0, 1, 7], fov: 65 }} frameloop="always">
      <Scene />
    </CanvasWrapper>
  );
}
