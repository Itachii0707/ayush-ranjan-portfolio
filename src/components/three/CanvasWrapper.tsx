'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, AdaptiveDpr } from '@react-three/drei';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { useDevicePerformance } from '@/lib/hooks/use-device-performance';
import { useIsMobile } from '@/lib/hooks/use-media-query';
import { cn } from '@/lib/utils';

interface CanvasWrapperProps {
  children: React.ReactNode;
  className?: string;
  frameloop?: 'always' | 'demand' | 'never';
  camera?: { position?: [number, number, number]; fov?: number };
}

export function CanvasWrapper({
  children,
  className,
  frameloop = 'always',
  camera = { position: [0, 0, 5], fov: 60 },
}: CanvasWrapperProps) {
  const reducedMotion = useReducedMotion();
  const performance = useDevicePerformance();
  const isMobile = useIsMobile();

  // Skip 3D on mobile (too heavy, saves battery, better UX)
  // or when user prefers reduced motion
  if (reducedMotion || isMobile) return null;

  const dpr: [number, number] =
    performance.tier === 'low'
      ? [0.5, 0.8]
      : performance.tier === 'medium'
      ? [0.8, 1.2]
      : [1, 1.5];

  return (
    <div className={cn('three-canvas-container', className)}>
      <Canvas
        dpr={dpr}
        frameloop={frameloop}
        camera={camera}
        gl={{
          antialias: performance.tier !== 'low',
          powerPreference: 'high-performance',
          alpha: true,
        }}
      >
        <AdaptiveDpr pixelated />
        <PerformanceMonitor onDecline={() => {}} onIncline={() => {}} />
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
