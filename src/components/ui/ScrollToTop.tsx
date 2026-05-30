'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.12, y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="fixed bottom-8 right-8 z-[99998] w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(7, 7, 15, 0.7)',
            border: '1px solid rgba(0, 229, 255, 0.35)',
            boxShadow: '0 0 18px rgba(0, 229, 255, 0.25), 0 4px 20px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {/* Animated neon ring */}
          <motion.span
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{
              boxShadow: [
                '0 0 0px rgba(0, 229, 255, 0)',
                '0 0 14px rgba(0, 229, 255, 0.5)',
                '0 0 0px rgba(0, 229, 255, 0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <ChevronUp size={20} className="text-cyan-DEFAULT relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
