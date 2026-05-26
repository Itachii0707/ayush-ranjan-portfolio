'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasWrapper } from '../CanvasWrapper';

function DocumentPlane({ position, rotation, scale }: { position: [number,number,number]; rotation?: [number,number,number]; scale?: [number,number,number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.05;
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation || [0, 0, 0]} scale={scale || [1, 1, 1]}>
      <boxGeometry args={[1.5, 2, 0.02]} />
      <meshPhysicalMaterial color="#0a0a20" metalness={0.3} roughness={0.7} emissive="#001133" emissiveIntensity={0.3} transparent opacity={0.6} />
    </mesh>
  );
}

function ScanLine() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = -1.5 + ((state.clock.elapsedTime * 0.5) % 3);
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0.02]}>
      <planeGeometry args={[1.5, 0.02]} />
      <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.5} transparent opacity={0.6} />
    </mesh>
  );
}

function GeometricFrame() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
  });
  return (
    <group ref={ref}>
      {[0, 0.3, 0.6].map((offset, i) => (
        <mesh key={i}>
          <torusGeometry args={[2.5 + offset, 0.015, 8, 80]} />
          <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.3 - i * 0.08} transparent opacity={0.3 - i * 0.08} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#00E5FF" />
      <pointLight position={[-3, -2, 2]} intensity={1} color="#7C3AED" />
      <spotLight position={[0, 5, 3]} angle={0.5} penumbra={0.9} intensity={2} color="#ffffff" />
      <fog attach="fog" args={['#030305', 6, 18]} />
      <Float speed={0.5} floatIntensity={0.15}><DocumentPlane position={[-3.5, 0.5, -4]} rotation={[0.05, 0.4, 0.02]} /></Float>
      <Float speed={0.7} floatIntensity={0.2}><DocumentPlane position={[3.5, -0.5, -5]} rotation={[-0.05, -0.3, -0.02]} /></Float>
      <Float speed={0.4} floatIntensity={0.1}><DocumentPlane position={[0, 2.5, -7]} rotation={[0.1, 0, 0]} scale={[0.7, 0.7, 1]} /></Float>
      <ScanLine />
      <GeometricFrame />
    </>
  );
}

export function ResumeScene() {
  return (
    <CanvasWrapper className="absolute inset-0" camera={{ position: [0, 0, 6], fov: 60 }} frameloop="always">
      <Scene />
    </CanvasWrapper>
  );
}
