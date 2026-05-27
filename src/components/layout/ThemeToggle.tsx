'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />; // Placeholder with same dimensions to avoid Layout Shift
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-9 h-9 rounded-lg glass border border-cyan-DEFAULT/20 flex items-center justify-center text-silver-mid hover:text-cyan-DEFAULT transition-colors focus:outline-none"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDark ? 0 : 180, 
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute"
      >
        <Moon size={16} />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDark ? -180 : 0, 
          scale: isDark ? 0 : 1,
          opacity: isDark ? 0 : 1 
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute"
      >
        <Sun size={16} />
      </motion.div>
    </button>
  );
}
