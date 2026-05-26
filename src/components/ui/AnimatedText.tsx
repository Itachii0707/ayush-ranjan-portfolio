'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  once?: boolean;
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  staggerDelay = 0.03,
  as: Tag = 'h1',
  once = true,
}: AnimatedTextProps) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay * i },
    }),
  };

  const child = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      <Tag className={cn('flex flex-wrap gap-x-2', className)}>
        {words.map((word, i) => (
          <motion.span key={i} variants={child} className="inline-block">
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
