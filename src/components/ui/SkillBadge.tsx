import { cn } from '@/lib/utils';

interface SkillBadgeProps {
  name: string;
  variant?: 'cyan' | 'violet' | 'ghost';
  size?: 'sm' | 'md';
}

export function SkillBadge({ name, variant = 'ghost', size = 'md' }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-mono font-medium border transition-all',
        size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1',
        variant === 'cyan' &&
          'text-cyan-DEFAULT bg-cyan-DEFAULT/10 border-cyan-DEFAULT/30 hover:bg-cyan-DEFAULT/20',
        variant === 'violet' &&
          'text-violet-light bg-violet-glow/10 border-violet-glow/30 hover:bg-violet-glow/20',
        variant === 'ghost' &&
          'text-silver-mid bg-white/5 border-white/10 hover:border-cyan-DEFAULT/30 hover:text-silver-bright'
      )}
    >
      {name}
    </span>
  );
}
