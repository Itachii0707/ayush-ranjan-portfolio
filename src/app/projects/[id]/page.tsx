import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Cpu, CheckCircle, AlertTriangle } from 'lucide-react';
import { projects } from '@/config/projects';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlowCard } from '@/components/ui/GlowCard';
import { SkillBadge } from '@/components/ui/SkillBadge';
import { HandGestureDemo } from '@/components/ui/HandGestureDemo';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: 'Project Not Found' };
  
  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  
  if (!project) {
    redirect('/projects');
  }

  const isGestureMouse = project.id === 'gesture-virtual-mouse';

  return (
    <main className="bg-obsidian-900 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-5xl space-y-12">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-silver-dim hover:text-cyan-DEFAULT transition-colors font-mono text-xs group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Hero header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {project.categories.map((c) => (
              <span key={c} className="font-mono text-[10px] uppercase tracking-wider text-cyan-DEFAULT bg-cyan-DEFAULT/10 border border-cyan-DEFAULT/20 px-3 py-1 rounded-full">
                {c === 'cv' ? 'Computer Vision' : c === 'ai-ml' ? 'AI / ML' : c}
              </span>
            ))}
            <span className="font-mono text-[10px] text-silver-dim bg-white/5 px-3 py-1 rounded-full">
              {project.year}
            </span>
          </div>
          
          <h1 className="font-grotesk font-black text-4xl md:text-6xl text-silver-bright leading-tight">
            {project.title}
          </h1>
          
          <p className="text-silver-mid text-lg max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 border-b border-white/5 pb-8">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass border border-white/10 text-silver-bright text-sm font-semibold hover:border-cyan-DEFAULT/30 hover:text-cyan-DEFAULT transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              View Repository
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-DEFAULT text-obsidian-900 text-sm font-black hover:bg-cyan-muted hover:scale-105 transition-all shadow-lg shadow-cyan-glow"
            >
              <ExternalLink size={16} />
              Launch Live Site
            </a>
          )}
        </div>

        {/* Detailed Breakdown Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Case study column */}
          <div className="md:col-span-2 space-y-8">
            <div className="space-y-4">
              <h3 className="font-grotesk font-black text-2xl text-silver-bright">Project Case Overview</h3>
              <p className="text-silver-mid leading-relaxed text-base whitespace-pre-line">
                {project.longDescription}
              </p>
            </div>

            {/* In-depth stats & lists */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <GlowCard className="p-6 space-y-3" glowColor="cyan">
                <h4 className="font-grotesk font-bold text-base text-silver-bright flex items-center gap-2">
                  <AlertTriangle className="text-cyan-DEFAULT" size={18} />
                  The Challenge
                </h4>
                <p className="text-silver-mid text-sm leading-relaxed">
                  {project.challenge}
                </p>
              </GlowCard>

              <GlowCard className="p-6 space-y-3" glowColor="violet">
                <h4 className="font-grotesk font-bold text-base text-silver-bright flex items-center gap-2">
                  <CheckCircle className="text-violet-light" size={18} />
                  The Results
                </h4>
                <p className="text-silver-mid text-sm leading-relaxed">
                  {project.results}
                </p>
              </GlowCard>
            </div>

            {/* Show hands gesture CV sandbox if this is the virtual mouse project */}
            {isGestureMouse && (
              <div className="border-t border-white/5 pt-10">
                <HandGestureDemo />
              </div>
            )}
          </div>

          {/* Sidebar Info column */}
          <div className="space-y-6">
            <GlowCard className="p-6 space-y-4" glowColor="cyan">
              <h4 className="font-grotesk font-bold text-base text-silver-bright flex items-center gap-2">
                <Cpu size={16} className="text-cyan-DEFAULT" />
                Technical Details
              </h4>
              
              <div className="space-y-3">
                <div>
                  <p className="text-silver-dim text-[10px] uppercase font-bold tracking-wider mb-1">Status</p>
                  <span className="font-mono text-xs text-green-400 capitalize bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 rounded-full inline-block">
                    {project.status}
                  </span>
                </div>

                <div>
                  <p className="text-silver-dim text-[10px] uppercase font-bold tracking-wider mb-2">Technologies Used</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <SkillBadge key={tech} name={tech} variant="cyan" size="sm" />
                    ))}
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </main>
  );
}
