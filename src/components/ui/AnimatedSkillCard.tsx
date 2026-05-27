'use client';

import { motion } from 'framer-motion';
import { GlowCard } from '@/components/ui/GlowCard';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

interface AnimatedSkillCardProps {
  category: SkillCategory;
  ci: number;
}

export function AnimatedSkillCard({ category, ci }: AnimatedSkillCardProps) {
  return (
    <GlowCard
      className="p-6 space-y-5"
      glowColor={ci % 2 === 0 ? 'cyan' : 'violet'}
    >
      <h3 className="font-grotesk font-bold text-silver-bright text-lg">
        {category.label}
      </h3>
      <div className="space-y-3">
        {category.skills.map((skill) => (
          <div key={skill.name} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-silver-mid text-sm">{skill.name}</span>
              <span className="font-mono text-xs text-silver-dim">{skill.level}%</span>
            </div>
            <div className="w-full h-1.5 bg-silver-dim/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-DEFAULT to-violet-light"
                initial={{ width: '0%' }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true, margin: '-10px' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlowCard>
  );
}
