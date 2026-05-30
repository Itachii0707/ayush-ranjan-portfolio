'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide completely on touch/mobile devices
    if (window.matchMedia('(hover: none)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;
    let isHovering = false;

    // Smooth ring follows mouse with lerp (0.15 for snappier, responsive tracking)
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      // On first frame move, snap instantly to avoid starting from top-left corner
      if (ringX === -100) {
        ringX = mouseX;
        ringY = mouseY;
      } else {
        ringX = lerp(ringX, mouseX, 0.15);
        ringY = lerp(ringY, mouseY, 0.15);
      }

      if (ringRef.current) {
        // Translate ringX/Y directly and let CSS translate(-50%, -50%) handle centering
        // This ensures the ring is centered regardless of dynamic hover size transitions!
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onHoverStart = () => {
      isHovering = true;
      ringRef.current?.classList.add('cursor-hover');
    };

    const onHoverEnd = () => {
      isHovering = false;
      ringRef.current?.classList.remove('cursor-hover');
    };

    const attachHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select').forEach((el) => {
        el.addEventListener('mouseenter', onHoverStart);
        el.addEventListener('mouseleave', onHoverEnd);
      });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    attachHoverListeners();

    // Dynamically watch DOM for new elements (e.g. infinite scroll, loaders) and attach hover listeners
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Outer ring trail - floats smoothly behind native hardware cursor */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99999] will-change-transform"
        style={{
          border: '1.5px solid rgba(0, 229, 255, 0.85)',
          boxShadow: '0 0 12px rgba(0, 229, 255, 0.3)',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s',
          // Set transform-origin to center for scaling transitions
          transformOrigin: 'center center',
        }}
      />
      <style>{`
        .cursor-hover {
          width: 2.5rem !important;
          height: 2.5rem !important;
          border-color: rgba(192, 132, 252, 0.95) !important; /* turns violet-light */
          box-shadow: 0 0 16px rgba(192, 132, 252, 0.4) !important;
        }
      `}</style>
    </>
  );
}
