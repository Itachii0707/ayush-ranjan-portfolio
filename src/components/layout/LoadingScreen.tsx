'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const phases = [
    'Initializing systems...',
    'Loading AI modules...',
    'Rendering 3D environment...',
    'Calibrating interface...',
    'Welcome, Ayush Ranjan',
  ];

  useEffect(() => {
    // Check if already loaded in this session
    if (sessionStorage.getItem('portfolio-loaded')) {
      setIsLoading(false);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 20 + 8;
        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return next;
      });
    }, 80);

    const phaseInterval = setInterval(() => {
      setPhase((prev) => Math.min(prev + 1, phases.length - 1));
    }, 240);

    const timer = setTimeout(() => {
      sessionStorage.setItem('portfolio-loaded', 'true');
      setIsLoading(false);
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(phaseInterval);
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[99998] flex flex-col items-center justify-center bg-obsidian-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 bg-grid opacity-20" />

          {/* Scanning line */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute left-0 right-0 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)',
                boxShadow: '0 0 20px rgba(168,85,247,0.4)',
              }}
              initial={{ top: '-2px' }}
              animate={{ top: '100vh' }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Logo mark */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="w-16 h-16 rounded-xl glass border border-violet-bright/30 flex items-center justify-center">
              <span className="font-grotesk font-bold text-2xl gradient-text">AR</span>
            </div>
            <div className="absolute -inset-1.5 rounded-xl border border-violet-bright/10 animate-pulse" />
            <div
              className="absolute -inset-3 rounded-xl border border-violet-bright/5 animate-pulse"
              style={{ animationDelay: '0.4s' }}
            />
          </motion.div>

          {/* Name */}
          <motion.h1
            className="font-grotesk font-bold text-xl text-silver-bright mb-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            AYUSH RANJAN
          </motion.h1>

          {/* Phase text */}
          <motion.p
            key={phase}
            className="font-mono text-xs text-violet-light/70 mb-8 h-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {phases[phase]}
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-px bg-graphite-500 relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full"
              style={{
                background: 'linear-gradient(90deg, #7C3AED, #A855F7)',
                boxShadow: '0 0 8px rgba(168,85,247,0.6)',
                width: `${progress}%`,
              }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <p className="font-mono text-[10px] text-silver-dim mt-2">{Math.round(progress)}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
