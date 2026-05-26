import type { Metadata } from 'next';
import { education, achievements } from '@/config/experience';
import { skillCategories } from '@/config/skills';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlowCard } from '@/components/ui/GlowCard';
import { SkillBadge } from '@/components/ui/SkillBadge';
import { ExperienceScene } from '@/components/three/ExperienceScene';

export const metadata: Metadata = {
  title: 'Experience | Ayush Ranjan',
  description:
    "Explore Ayush Ranjan's education, achievements, and technical skills — a track record of academic excellence and real-world engineering impact.",
};

export default function ExperiencePage() {
  return (
    <main className="bg-obsidian-900 min-h-screen">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <ExperienceScene />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-obsidian-900/50 via-obsidian-900/30 to-obsidian-900 pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-obsidian-900/60 via-transparent to-obsidian-900/60 pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <p className="font-mono text-cyan-DEFAULT text-sm tracking-widest uppercase mb-6">
            Experience
          </p>
          <h1 className="font-grotesk text-5xl md:text-7xl font-black text-silver-bright leading-tight">
            Track Record of{' '}
            <span className="gradient-text">Excellence</span>
          </h1>
          <p className="mt-6 text-silver-mid text-xl max-w-2xl mx-auto">
            From academic foundations to real-world achievements — a journey of continuous growth.
          </p>
        </div>
      </section>

      {/* ─── Education Timeline ───────────────────────────────────── */}
      <section className="relative z-10 py-24 container mx-auto px-6">
        <SectionTitle
          label="Education"
          title="Academic Journey"
          subtitle="The foundations upon which every project, every system, every solution is built."
        />
        <div className="mt-16 relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-DEFAULT via-violet-light to-cyan-DEFAULT/20 rounded-full" />

          <div className="space-y-10 pl-12 md:pl-20">
            {education.map((edu, i) => (
              <div key={i} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-[2.85rem] md:-left-[3.35rem] top-6 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-DEFAULT to-violet-light ring-4 ring-obsidian-900 z-10" />

                <GlowCard className="p-6 md:p-8 space-y-3" glowColor={i % 2 === 0 ? 'cyan' : 'violet'}>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="font-grotesk font-bold text-silver-bright text-xl leading-tight">
                        {edu.degree}
                      </h3>
                      <p className="text-violet-light font-semibold mt-1">{edu.institution}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="font-mono text-xs text-cyan-DEFAULT bg-cyan-DEFAULT/10 px-3 py-1 rounded-full block mb-2">
                        {edu.startDate} — {edu.endDate}
                      </span>
                      {edu.current && (
                        <span className="font-mono text-xs text-green-400">In Progress</span>
                      )}
                    </div>
                  </div>
                  <p className="font-mono text-xs text-silver-dim">{edu.location}</p>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="space-y-1 mt-2">
                      {edu.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-silver-dim text-sm">
                          <span className="text-cyan-DEFAULT mt-1 flex-shrink-0">▹</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </GlowCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Achievements ─────────────────────────────────────────── */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-transparent via-obsidian-900/50 to-transparent">
        <div className="container mx-auto px-6">
          <SectionTitle
            label="Achievements"
            title="Key Strengths"
            subtitle="Highlights from competitions, contributions, and community impact."
          />
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, i) => (
              <GlowCard key={i} className="p-6 text-center space-y-4" glowColor={i % 2 === 0 ? 'cyan' : 'violet'}>
                <span className="text-4xl block">{achievement.icon}</span>
                <h3 className="font-grotesk font-bold text-silver-bright text-lg leading-tight">
                  {achievement.title}
                </h3>
                <p className="text-silver-dim text-sm leading-relaxed">{achievement.description}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Skills Clusters ──────────────────────────────────────── */}
      <section className="relative z-10 py-24 container mx-auto px-6">
        <SectionTitle
          label="Technical Skills"
          title="Technology Stack"
          subtitle="The tools and technologies I use to bring ideas to life."
        />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, ci) => (
            <GlowCard
              key={category.id}
              className="p-6 space-y-5"
              glowColor={ci % 2 === 0 ? 'cyan' : 'violet'}
            >
              <h3 className="font-grotesk font-bold text-silver-bright">
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    variant={ci % 2 === 0 ? 'cyan' : 'violet'}
                    size="sm"
                  />
                ))}
              </div>
            </GlowCard>
          ))}
        </div>
      </section>
    </main>
  );
}
