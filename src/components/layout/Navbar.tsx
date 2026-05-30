'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Terminal, Cpu } from 'lucide-react';
import { navItems } from '@/config/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'glass-header'
          : 'bg-transparent'
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 3.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Neon scroll progress bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left z-[60] pointer-events-none"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #00E5FF 0%, #A855F7 100%)',
          boxShadow: '0 0 8px rgba(0,229,255,0.6)',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg glass border border-cyan-DEFAULT/30 flex items-center justify-center group-hover:border-cyan-DEFAULT/60 transition-colors">
            <span className="font-grotesk font-bold text-sm gradient-text">AR</span>
          </div>
          <span className="font-grotesk font-semibold text-silver-bright hidden sm:block">
            Ayush Ranjan
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative px-4 py-2 font-inter text-sm font-medium transition-colors rounded-lg',
                pathname === item.href
                  ? 'text-cyan-DEFAULT'
                  : 'text-silver-mid hover:text-silver-bright'
              )}
            >
              {pathname === item.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-lg glass border border-cyan-DEFAULT/20"
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/resume"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-DEFAULT/30 text-cyan-DEFAULT text-sm font-medium hover:bg-cyan-DEFAULT/10 hover:border-cyan-DEFAULT/60 transition-all"
          >
            <Cpu size={14} />
            Resume
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-silver-mid hover:text-silver-bright transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="md:hidden glass border-t border-white/5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'block px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                      pathname === item.href
                        ? 'text-cyan-DEFAULT bg-cyan-DEFAULT/10 border border-cyan-DEFAULT/20'
                        : 'text-silver-mid hover:text-silver-bright hover:bg-white/5'
                    )}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
