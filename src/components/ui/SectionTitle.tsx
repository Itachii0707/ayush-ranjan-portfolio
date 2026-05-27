'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionTitle({ label, title, subtitle, align = 'center', className }: SectionTitleProps) {
  const alignClass = align === 'left' ? 'text-left items-start' : align === 'right' ? 'text-right items-end' : 'text-center items-center';

  const words = title.split(' ');

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={cn('flex flex-col gap-4', alignClass, className)}
    >
      {label && (
        <motion.span
          variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase text-cyan-DEFAULT"
        >
          <span className="w-8 h-px bg-cyan-DEFAULT/60" />
          {label}
          <span className="w-8 h-px bg-cyan-DEFAULT/60" />
        </motion.span>
      )}

      <div className={cn('flex flex-wrap gap-x-[0.3em]', alignClass)}>
        {words.map((word, wi) => (
          <span key={wi} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block font-grotesk text-3xl md:text-4xl lg:text-5xl font-black text-silver-bright leading-tight"
              variants={{
                hidden: { y: '110%' },
                visible: { y: '0%', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: wi * 0.07 } },
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </div>

      {subtitle && (
        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } } }}
          className="text-silver-mid text-base md:text-lg max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
