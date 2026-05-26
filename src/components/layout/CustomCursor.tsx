'use client';
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const dotXSpring = useSpring(dotX, { damping: 50, stiffness: 1000, mass: 0.1 });
  const dotYSpring = useSpring(dotY, { damping: 50, stiffness: 1000, mass: 0.1 });

  const isHoveringRef = useRef(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
    };

    const handleHoverStart = () => {
      isHoveringRef.current = true;
      if (cursorRef.current) {
        cursorRef.current.classList.add('cursor-hover');
      }
    };

    const handleHoverEnd = () => {
      isHoveringRef.current = false;
      if (cursorRef.current) {
        cursorRef.current.classList.remove('cursor-hover');
      }
    };

    // Detect interactive elements
    const addHoverListeners = () => {
      const interactiveEls = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, label[for], .magnetic'
      );
      interactiveEls.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    window.addEventListener('mousemove', moveCursor);
    addHoverListeners();

    // Re-add listeners when DOM changes
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      {/* Outer ring cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          border: '1.5px solid rgba(0, 229, 255, 0.8)',
          boxShadow: '0 0 10px rgba(0, 229, 255, 0.4), inset 0 0 10px rgba(0, 229, 255, 0.1)',
        }}
      />
      {/* Inner dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999]"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          background: '#00E5FF',
          boxShadow: '0 0 8px rgba(0, 229, 255, 1)',
        }}
      />
      <style jsx global>{`
        .cursor-hover {
          width: 3rem !important;
          height: 3rem !important;
          border-color: rgba(168, 85, 247, 0.8) !important;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.4), inset 0 0 20px rgba(168, 85, 247, 0.1) !important;
          transform: scale(1.2);
        }
      `}</style>
    </>
  );
}
