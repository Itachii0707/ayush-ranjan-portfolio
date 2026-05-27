'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Curtain 1: Cyan Branding Panel */}
      <motion.div
        className="fixed inset-0 z-[99999] bg-cyan-DEFAULT pointer-events-none"
        initial={{ y: '0%' }}
        animate={{ y: '-100%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Curtain 2: Dark Background Matching Panel */}
      <motion.div
        className="fixed inset-0 z-[99998] bg-obsidian-800 pointer-events-none"
        initial={{ y: '0%' }}
        animate={{ y: '-100%' }}
        transition={{ duration: 0.8, delay: 0.12, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Content entrance blur snap & translate */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
