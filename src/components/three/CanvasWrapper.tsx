'use client';
import { Suspense, useEffect, useRef, useState } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Monitor viewport visibility to freeze render loop when scrolled out of view
  useEffect(() => {
    if (reducedMotion || isMobile) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.01 } // Trigger when at least 1% of the canvas is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [reducedMotion, isMobile]);

  // Skip 3D on mobile (saves battery, better UX) or when user prefers reduced motion
  if (reducedMotion || isMobile) return null;

  const dpr: [number, number] =
    performance.tier === 'low'
      ? [0.5, 0.8]
      : performance.tier === 'medium'
      ? [0.8, 1.0]
      : [1.0, 1.2]; // Capped at 1.2 max to prevent fill-rate lag on high-DPI (Retina/4K) screens

  return (
    <div ref={containerRef} className={cn('three-canvas-container', className)}>
      {isVisible && (
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
      )}
    </div>
  );
}
