'use client';
import { motion } from 'framer-motion';

export function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {/* Cyan orb top-right */}
      <motion.div
        className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Violet orb bottom-left */}
      <motion.div
        className="absolute -bottom-60 -left-40 w-[800px] h-[800px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      {/* Small cyan orb middle */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />
    </div>
  );
}
