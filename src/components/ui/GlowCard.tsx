'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'violet' | 'both';
}

export function GlowCard({ children, className, glowColor = 'cyan' }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const glowColors = {
    cyan: 'rgba(0, 229, 255, 0.06)',
    violet: 'rgba(124, 58, 237, 0.06)',
    both: 'rgba(0, 229, 255, 0.04)',
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        'glass rounded-2xl border border-white/8 relative overflow-hidden group',
        className
      )}
      style={{
        background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColors[glowColor]}, transparent 40%), rgba(255,255,255,0.02)`,
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
