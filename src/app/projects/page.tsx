'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { projects } from '@/config/projects';
import { GlowCard } from '@/components/ui/GlowCard';
import { SkillBadge } from '@/components/ui/SkillBadge';
import type { Project } from '@/config/projects';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'cv', label: 'Computer Vision' },
  { id: 'ai-ml', label: 'AI / ML' },
  { id: 'web', label: 'Web' },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
      <Link href={`/projects/${project.id}`} className="block h-full group">
        <GlowCard className="p-6 cursor-pointer h-full hover:scale-[1.01] hover:border-cyan-DEFAULT/30 transition-all duration-300" glowColor={project.categories.includes('cv') ? 'cyan' : 'violet'}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${project.status === 'completed' ? 'bg-green-400' : 'bg-yellow-400'}`} />
              <span className="font-mono text-xs text-silver-dim capitalize">{project.status}</span>
            </div>
            <span className="font-mono text-xs text-silver-dim">{project.year}</span>
          </div>
          {project.featured && (
            <span className="inline-block mb-3 text-xs font-mono text-cyan-DEFAULT bg-cyan-DEFAULT/10 border border-cyan-DEFAULT/20 rounded-full px-2 py-0.5">Featured</span>
          )}
          <h3 className="font-grotesk font-black text-lg text-silver-bright mb-2 leading-tight group-hover:text-cyan-DEFAULT transition-colors">{project.title}</h3>
          <p className="text-silver-mid text-sm mb-4 leading-relaxed line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techStack.slice(0, 4).map((tech) => (<SkillBadge key={tech} name={tech} size="sm" variant="ghost" />))}
            {project.techStack.length > 4 && (<span className="text-xs text-silver-dim">+{project.techStack.length - 4}</span>)}
          </div>
          <span className="inline-flex items-center gap-1 text-sm text-cyan-DEFAULT hover:text-cyan-muted font-bold tracking-tight">
            View Case Study <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </GlowCard>
      </Link>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const filtered = activeFilter === 'all' ? projects : projects.filter((p) => p.categories.includes(activeFilter));

  return (
    <div className="relative min-h-screen bg-obsidian-900">
      <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-900/60 via-transparent to-obsidian-900" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-cyan-DEFAULT" />
            <span className="font-mono text-xs text-cyan-DEFAULT uppercase tracking-widest">Projects</span>
          </div>
          <h1 className="font-grotesk font-bold text-6xl md:text-7xl text-silver-bright leading-none">Work That<span className="gradient-text block"> Ships</span></h1>
        </div>
      </section>
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-12">
            {FILTERS.map((filter) => (<button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`px-4 py-2 rounded-lg font-mono text-sm transition-all cursor-pointer ${activeFilter === filter.id ? 'bg-cyan-DEFAULT text-obsidian-900 font-semibold' : 'glass border border-white/10 text-silver-mid hover:text-silver-bright hover:border-white/20'}`}>{filter.label}</button>))}
          </div>
          <motion.div layout className="grid md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (<ProjectCard key={project.id} project={project} />))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
