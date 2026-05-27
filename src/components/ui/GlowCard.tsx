'use client';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'violet';
  onClick?: () => void;
}

export function GlowCard({ children, className, glowColor = 'cyan', onClick }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const glowPosition = useTransform(
    [springX, springY],
    ([x, y]: number[]) => `radial-gradient(400px circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, ${
      glowColor === 'cyan' ? 'rgba(0,229,255,0.12)' : 'rgba(124,58,237,0.12)'
    }, transparent 70%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const glowBorder = glowColor === 'cyan'
    ? 'hover:border-cyan-DEFAULT/40 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]'
    : 'hover:border-violet-glow/40 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]';

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'relative glass rounded-2xl border border-white/6 transition-colors duration-300 cursor-default overflow-hidden',
        glowBorder,
        className
      )}
    >
      {/* Dynamic spotlight glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-300"
        style={{ background: glowPosition, opacity: hovered ? 1 : 0 }}
      />
      {/* Shimmer top border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
