import type { Metadata } from 'next';
import { profile } from '@/config/profile';
import { skillCategories, interests } from '@/config/skills';
import { education } from '@/config/experience';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlowCard } from '@/components/ui/GlowCard';
import { SkillBadge } from '@/components/ui/SkillBadge';
import { AnimatedSkillCard } from '@/components/ui/AnimatedSkillCard';
import { InteractiveTerminal } from '@/components/ui/InteractiveTerminal';

export const metadata: Metadata = {
  title: 'About | Ayush Ranjan',
  description:
    'Learn about Ayush Ranjan — CS student and AI engineer based in Bengaluru, building at the intersection of computer vision, deep learning, and scalable software.',
};

export default function AboutPage() {
  return (
    <main className="bg-obsidian-900 min-h-screen">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-obsidian-900/50 via-obsidian-900/30 to-obsidian-900 pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-obsidian-900/60 via-transparent to-obsidian-900/60 pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <p className="font-mono text-cyan-DEFAULT text-sm tracking-widest uppercase mb-6">
            About Me
          </p>
          <h1 className="font-grotesk text-5xl md:text-7xl font-black text-silver-bright leading-tight">
            Building at the{' '}
            <span className="gradient-text">Intersection</span>
          </h1>
          <p className="mt-6 text-silver-mid text-xl max-w-2xl mx-auto">
            AI engineering meets software craftsmanship — where I choose to live and build.
          </p>
        </div>
      </section>

      {/* ─── Bio + Education ──────────────────────────────────────── */}
      <section className="relative z-10 py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <div className="space-y-6">
            <SectionTitle label="Who I Am" title="The Full Story" align="left" />
            <div className="space-y-5 text-silver-mid leading-relaxed text-lg">
              <p>{profile.longBio}</p>
            </div>
          </div>

          {/* Education Timeline */}
          <div className="space-y-6">
            <SectionTitle label="Education" title="Academic Background" align="left" />
            <div className="relative space-y-6 pl-6">
              <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-DEFAULT to-violet-light rounded-full" />
              {education.map((edu, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[1.4rem] top-4 w-3 h-3 rounded-full bg-cyan-DEFAULT ring-4 ring-obsidian-900" />
                  <GlowCard className="p-6 space-y-2">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <h3 className="font-grotesk font-bold text-silver-bright text-lg leading-tight">
                        {edu.degree}
                      </h3>
                      {edu.current && (
                        <span className="font-mono text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1 rounded-full whitespace-nowrap">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-violet-light font-semibold text-sm">{edu.institution}</p>
                    <p className="font-mono text-xs text-silver-dim">
                      {edu.startDate} → {edu.endDate} · {edu.location}
                    </p>
                    <ul className="space-y-1 mt-2">
                      {edu.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-silver-dim text-sm">
                          <span className="text-cyan-DEFAULT mt-1 flex-shrink-0">▹</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </GlowCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Interactive Terminal ─────────────────────────────────── */}
      <section className="relative z-10 py-16 container mx-auto px-6">
        <SectionTitle
          label="Shell Workspace"
          title="Interactive Terminal"
          subtitle="Explore my tech profile through a simulated command line interface."
        />
        <div className="mt-12">
          <InteractiveTerminal />
        </div>
      </section>

      {/* ─── Skills ───────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-transparent via-obsidian-900/50 to-transparent">
        <div className="container mx-auto px-6">
          <SectionTitle
            label="Expertise"
            title="Skills & Technologies"
            subtitle="A curated stack built through real-world projects and continuous learning."
          />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, ci) => (
              <AnimatedSkillCard
                key={category.id}
                category={category}
                ci={ci}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Interests ────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 container mx-auto px-6">
        <SectionTitle
          label="Beyond Code"
          title="Interests & Passions"
          subtitle="What I explore when I step away from the keyboard."
        />
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {interests.map((interest) => (
            <GlowCard key={interest.name} className="p-6 text-center space-y-3" glowColor="cyan">
              <span className="text-4xl block">{interest.emoji}</span>
              <h3 className="font-grotesk font-bold text-silver-bright">{interest.name}</h3>
              <p className="text-silver-dim text-sm leading-relaxed">{interest.description}</p>
            </GlowCard>
          ))}
        </div>
      </section>
    </main>
  );
}
