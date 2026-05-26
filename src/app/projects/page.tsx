'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronRight } from 'lucide-react';
import { projects } from '@/config/projects';
import { GlowCard } from '@/components/ui/GlowCard';
import { SkillBadge } from '@/components/ui/SkillBadge';
import { SectionTitle } from '@/components/ui/SectionTitle';
import type { Project } from '@/config/projects';

const ProjectsScene = dynamic(
  () => import('@/components/three/scenes/ProjectsScene').then((m) => m.ProjectsScene),
  { ssr: false, loading: () => null }
);

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'cv', label: 'Computer Vision' },
  { id: 'ai-ml', label: 'AI / ML' },
  { id: 'web', label: 'Web' },
];

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
      <GlowCard className="p-6 cursor-pointer h-full" glowColor={project.categories.includes('cv') ? 'cyan' : 'violet'}>
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
        <h3 className="font-grotesk font-bold text-lg text-silver-bright mb-2 leading-tight">{project.title}</h3>
        <p className="text-silver-mid text-sm mb-4 leading-relaxed line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.slice(0, 4).map((tech) => (<SkillBadge key={tech} name={tech} size="sm" variant="ghost" />))}
          {project.techStack.length > 4 && (<span className="text-xs text-silver-dim">+{project.techStack.length - 4}</span>)}
        </div>
        <button onClick={onClick} className="flex items-center gap-1 text-sm text-cyan-DEFAULT hover:text-cyan-muted transition-colors font-medium">
          View Details <ChevronRight size={14} />
        </button>
      </GlowCard>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-[99990] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <div className="absolute inset-0 bg-obsidian-900/90 backdrop-blur-sm" />
      <motion.div className="relative w-full max-w-2xl glass-strong rounded-2xl border border-white/10 p-8 max-h-[85vh] overflow-y-auto" initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-6 right-6 text-silver-dim hover:text-silver-bright transition-colors"><X size={20} /></button>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-cyan-DEFAULT uppercase tracking-widest">Project</span>
            <span className="font-mono text-xs text-silver-dim">{project.year}</span>
          </div>
          <h2 className="font-grotesk font-bold text-3xl text-silver-bright mb-3">{project.title}</h2>
          <p className="text-silver-mid leading-relaxed">{project.longDescription}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="glass rounded-xl p-4">
            <h4 className="font-mono text-xs text-silver-dim uppercase tracking-wider mb-2">Challenge</h4>
            <p className="text-silver-mid text-sm">{project.challenge}</p>
          </div>
          <div className="glass rounded-xl p-4">
            <h4 className="font-mono text-xs text-silver-dim uppercase tracking-wider mb-2">Results</h4>
            <p className="text-silver-mid text-sm">{project.results}</p>
          </div>
        </div>
        <div className="mb-6">
          <h4 className="font-mono text-xs text-silver-dim uppercase tracking-wider mb-3">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">{project.techStack.map((tech) => (<SkillBadge key={tech} name={tech} variant="cyan" size="sm" />))}</div>
        </div>
        <div className="flex gap-3">
          {project.github && (<a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-white/10 text-silver-mid text-sm hover:text-silver-bright hover:border-white/20 transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> GitHub</a>)}
          {project.live && (<a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-DEFAULT text-obsidian-900 text-sm font-medium hover:bg-cyan-muted transition-colors"><ExternalLink size={14} /> Live Demo</a>)}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const filtered = activeFilter === 'all' ? projects : projects.filter((p) => p.categories.includes(activeFilter));

  return (
    <div className="relative min-h-screen bg-obsidian-900">
      <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden pt-24">
        <ProjectsScene />
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
            {FILTERS.map((filter) => (<button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${activeFilter === filter.id ? 'bg-cyan-DEFAULT text-obsidian-900 font-semibold' : 'glass border border-white/10 text-silver-mid hover:text-silver-bright hover:border-white/20'}`}>{filter.label}</button>))}
          </div>
          <motion.div layout className="grid md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (<ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <AnimatePresence>{selectedProject && (<ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />)}</AnimatePresence>
    </div>
  );
}
