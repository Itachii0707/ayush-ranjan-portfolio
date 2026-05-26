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
        const next = prev + Math.random() * 15 + 5;
        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return next;
      });
    }, 150);

    const phaseInterval = setInterval(() => {
      setPhase((prev) => Math.min(prev + 1, phases.length - 1));
    }, 600);

    const timer = setTimeout(() => {
      sessionStorage.setItem('portfolio-loaded', 'true');
      setIsLoading(false);
    }, 3200);

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
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 bg-grid opacity-30" />

          {/* Scanning line */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute left-0 right-0 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.6), transparent)',
                boxShadow: '0 0 20px rgba(0,229,255,0.4)',
              }}
              initial={{ top: '-2px' }}
              animate={{ top: '100vh' }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Logo mark */}
          <motion.div
            className="relative mb-12"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="w-20 h-20 rounded-2xl glass border border-cyan-DEFAULT/30 flex items-center justify-center">
              <span className="font-grotesk font-bold text-3xl gradient-text">AR</span>
            </div>
            <div className="absolute -inset-2 rounded-2xl border border-cyan-DEFAULT/10 animate-pulse" />
            <div
              className="absolute -inset-4 rounded-2xl border border-cyan-DEFAULT/5 animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
          </motion.div>

          {/* Name */}
          <motion.h1
            className="font-grotesk font-bold text-2xl text-silver-bright mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            AYUSH RANJAN
          </motion.h1>

          {/* Phase text */}
          <motion.p
            key={phase}
            className="font-mono text-sm text-cyan-DEFAULT/70 mb-12 h-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {phases[phase]}
          </motion.p>

          {/* Progress bar */}
          <div className="w-64 h-px bg-graphite-500 relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full"
              style={{
                background: 'linear-gradient(90deg, #00E5FF, #7C3AED)',
                boxShadow: '0 0 10px rgba(0,229,255,0.6)',
                width: `${progress}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="font-mono text-xs text-silver-dim mt-3">{Math.round(progress)}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
