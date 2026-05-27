'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

// Sync Lenis RAF with the browser's own requestAnimationFrame pipeline
// Previously it ran its own rAF loop separate from R3F, causing double-frame jitter
let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 4), // ease-out-quart — silky smooth
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisInstance = lenis;

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
