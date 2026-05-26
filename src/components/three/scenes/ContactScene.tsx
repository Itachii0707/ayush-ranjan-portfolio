'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { CanvasWrapper } from '../CanvasWrapper';
import * as THREE from 'three';

function WireframeGlobe() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.003;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.5, 4]} />
      <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.1} wireframe transparent opacity={0.15} />
    </mesh>
  );
}

function PulsingDot({ position }: { position: [number,number,number] }) {
  const outerRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!outerRef.current) return;
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    outerRef.current.scale.setScalar(scale);
    const mat = outerRef.current.material as THREE.MeshStandardMaterial;
    mat.opacity = 0.6 - Math.sin(state.clock.elapsedTime * 2) * 0.3;
  });
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={1} />
      </mesh>
      <mesh ref={outerRef}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.5} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function ParticleTrails() {
  const count = 300;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const r = 2.5 + Math.random() * 3;
      arr[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      arr[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      arr[i * 3 + 2] = r * Math.cos(theta);
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.001; });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial size={0.02} color="#00E5FF" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function Scene() {
  const lat = (20.5937 * Math.PI) / 180;
  const lon = (78.9629 * Math.PI) / 180;
  const r = 2.52;
  const indiaPos: [number,number,number] = [r * Math.cos(lat) * Math.cos(lon - Math.PI), r * Math.sin(lat), r * Math.cos(lat) * Math.sin(lon - Math.PI)];
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#00E5FF" />
      <pointLight position={[-5, -3, 3]} intensity={1} color="#7C3AED" />
      <fog attach="fog" args={['#030305', 8, 20]} />
      <WireframeGlobe />
      <PulsingDot position={indiaPos} />
      <ParticleTrails />
    </>
  );
}

export function ContactScene() {
  return (
    <CanvasWrapper className="absolute inset-0" camera={{ position: [0, 0, 6], fov: 60 }} frameloop="always">
      <Scene />
    </CanvasWrapper>
  );
}
