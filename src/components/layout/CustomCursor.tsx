'use client';
import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide completely on touch/mobile devices
    if (window.matchMedia('(hover: none)').matches) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let rafId: number;
    let isHovering = false;

    // Smooth ring follows mouse with lerp (no spring jitter)
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      if (dotRef.current) {
        // Dot snaps instantly to mouse position
        dotRef.current.style.transform = `translate(${mouseX + 12}px, ${mouseY + 12}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX - 16;
      mouseY = e.clientY - 16;
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
      {/* Outer ring — lags smoothly behind */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99999] will-change-transform"
        style={{
          border: '1.5px solid rgba(0, 229, 255, 0.8)',
          boxShadow: '0 0 10px rgba(0, 229, 255, 0.4)',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
      />
      {/* Inner dot — snaps instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999] will-change-transform"
        style={{
          background: '#00E5FF',
          boxShadow: '0 0 8px rgba(0, 229, 255, 1)',
          marginLeft: '-12px',
          marginTop: '-12px',
        }}
      />
      <style>{`
        .cursor-hover {
          width: 3rem !important;
          height: 3rem !important;
          border-color: rgba(168, 85, 247, 0.9) !important;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.5) !important;
        }
      `}</style>
    </>
  );
}
