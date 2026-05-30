'use client';

import { motion } from 'framer-motion';
import { education, achievements, timelineEvents } from '@/config/experience';
import { skillCategories } from '@/config/skills';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlowCard } from '@/components/ui/GlowCard';
import { SkillBadge } from '@/components/ui/SkillBadge';
import { Timeline } from '@/components/ui/Timeline';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: 'easeOut' as const },
  }),
};

const skillClusterVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export function ExperienceClient() {
  return (
    <>
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
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="relative"
              >
                {/* Timeline dot — pulsing */}
                <motion.div
                  className="absolute -left-[2.85rem] md:-left-[3.35rem] top-6 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-DEFAULT to-violet-light ring-4 ring-obsidian-900 z-10"
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5 }}
                />

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
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + j * 0.06 }}
                          className="flex items-start gap-2 text-silver-dim text-sm"
                        >
                          <span className="text-cyan-DEFAULT mt-1 flex-shrink-0">▹</span>
                          {h}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Timeline ──────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-transparent via-obsidian-900/50 to-transparent">
        <div className="container mx-auto px-6">
          <SectionTitle
            label="Milestones"
            title="Certifications & Achievements"
            subtitle="An animated timeline showcasing key technical credentials, hackathons, and milestones."
          />
          <div className="mt-12">
            <Timeline events={timelineEvents} />
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
        <motion.div
          variants={skillClusterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category.id}
              variants={fadeUp}
              custom={ci}
            >
              <GlowCard
                className="p-6 space-y-5 h-full"
                glowColor={ci % 2 === 0 ? 'cyan' : 'violet'}
              >
                <h3 className="font-grotesk font-bold text-silver-bright">
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, si) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: si * 0.05, duration: 0.3 }}
                    >
                      <SkillBadge
                        name={skill.name}
                        variant={ci % 2 === 0 ? 'cyan' : 'violet'}
                        size="sm"
                      />
                    </motion.div>
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
