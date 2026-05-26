'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasWrapper } from '../CanvasWrapper';

const SERVICE_COLORS = ['#00E5FF', '#7C3AED', '#00E5FF', '#A855F7', '#00B8D4', '#6D28D9'];
const CUBE_POSITIONS: [number,number,number][] = [[-4, 1, -3], [-2, -1, -4], [0, 2, -5], [2, -1, -4], [4, 1, -3], [0, -2, -3]];

function ServiceCube({ position, color, speed }: { position: [number,number,number]; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x += speed * 0.003;
    ref.current.rotation.y += speed * 0.005;
  });
  return (
    <Float speed={speed} floatIntensity={0.4} rotationIntensity={0.3}>
      <mesh ref={ref} position={position}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.1} emissive={color} emissiveIntensity={0.2} transparent opacity={0.8} />
      </mesh>
    </Float>
  );
}

function ConnectionLine({ start, end }: { start: [number,number,number]; end: [number,number,number] }) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({ color: '#00E5FF', transparent: true, opacity: 0.15 });
  const lineObj = new THREE.Line(geo, mat);
  return <primitive object={lineObj} />;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 5, 2]} intensity={1.5} color="#00E5FF" />
      <pointLight position={[-5, 0, -2]} intensity={1} color="#7C3AED" />
      <spotLight position={[3, 8, 4]} angle={0.4} penumbra={0.9} intensity={2} color="#00E5FF" />
      <fog attach="fog" args={['#030305', 8, 22]} />
      {CUBE_POSITIONS.map((pos, i) => <ServiceCube key={i} position={pos} color={SERVICE_COLORS[i]} speed={0.8 + i * 0.2} />)}
      {CUBE_POSITIONS.slice(0, -1).map((pos, i) => <ConnectionLine key={i} start={pos} end={CUBE_POSITIONS[i + 1]} />)}
      <ConnectionLine start={CUBE_POSITIONS[0]} end={CUBE_POSITIONS[5]} />
      <ConnectionLine start={CUBE_POSITIONS[2]} end={CUBE_POSITIONS[5]} />
      <Grid position={[0, -3, -5]} args={[40, 40]} cellSize={0.8} cellThickness={0.4} cellColor="rgba(0,229,255,0.2)" sectionSize={4} sectionThickness={0.7} sectionColor="rgba(124,58,237,0.3)" fadeDistance={18} fadeStrength={1} infiniteGrid />
    </>
  );
}

export function ServicesScene() {
  return (
    <CanvasWrapper className="absolute inset-0" camera={{ position: [0, 1, 7], fov: 65 }} frameloop="always">
      <Scene />
    </CanvasWrapper>
  );
}
