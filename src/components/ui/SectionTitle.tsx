'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionTitle({
  label,
  title,
  subtitle,
  className,
  align = 'left',
}: SectionTitleProps) {
  return (
    <motion.div
      className={cn(
        'mb-16',
        align === 'center' && 'text-center',
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {label && (
        <div className="flex items-center gap-3 mb-4" style={{ justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
          <div className="h-px w-8 bg-cyan-DEFAULT" />
          <span className="font-mono text-xs text-cyan-DEFAULT uppercase tracking-widest">{label}</span>
          <div className="h-px w-8 bg-cyan-DEFAULT" />
        </div>
      )}
      <h2 className="font-grotesk font-bold text-4xl md:text-5xl text-silver-bright mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-silver-mid text-lg max-w-2xl" style={{ margin: align === 'center' ? '0 auto' : undefined }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
