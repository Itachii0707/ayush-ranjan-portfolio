'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  once?: boolean;
  type?: 'chars' | 'words';
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  as: Tag = 'h1',
  once = true,
  type = 'chars',
}: AnimatedTextProps) {
  if (type === 'words') {
    const words = text.split(' ');
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        variants={{
          visible: { transition: { staggerChildren: 0.06, delayChildren: delay } },
          hidden: {},
        }}
      >
        <Tag className={cn('flex flex-wrap gap-x-[0.3em]', className)}>
          {words.map((word, wi) => (
            <span key={wi} className="overflow-hidden inline-block">
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: '110%', opacity: 0 },
                  visible: { y: '0%', opacity: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </Tag>
      </motion.div>
    );
  }

  // char-by-char (default)
  const chars = text.split('');
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={{
        visible: { transition: { staggerChildren: 0.025, delayChildren: delay } },
        hidden: {},
      }}
    >
      <Tag className={cn('flex flex-wrap', className)}>
        {chars.map((char, ci) => (
          <span key={ci} className="overflow-hidden inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: '120%', opacity: 0, filter: 'blur(8px)' },
                visible: {
                  y: '0%',
                  opacity: 1,
                  filter: 'blur(0px)',
                  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {char}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}
