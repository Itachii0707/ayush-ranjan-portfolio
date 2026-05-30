'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services, processSteps } from '@/config/services';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlowCard } from '@/components/ui/GlowCard';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: 'easeOut' as const },
  }),
};

export function ServicesClient() {
  return (
    <>
      {/* ─── Service Cards ────────────────────────────────────────── */}
      <section className="relative z-10 py-24 container mx-auto px-6">
        <SectionTitle
          label="Offerings"
          title="Services & Expertise"
          subtitle="Tailored solutions across the full spectrum of modern software development."
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <GlowCard className="p-8 space-y-5 flex flex-col h-full" glowColor={service.color as 'cyan' | 'violet'}>
                {/* Icon */}
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                      service.color === 'cyan'
                        ? 'bg-cyan-DEFAULT/10 border border-cyan-DEFAULT/20'
                        : 'bg-violet-light/10 border border-violet-light/20'
                    }`}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="font-grotesk font-bold text-silver-bright text-xl leading-tight">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-silver-mid leading-relaxed text-sm">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 flex-1">
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.4 }}
                      className="flex items-start gap-2 text-silver-dim text-sm"
                    >
                      <span className={`mt-0.5 flex-shrink-0 ${service.color === 'cyan' ? 'text-cyan-DEFAULT' : 'text-violet-light'}`}>▹</span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Pricing label */}
                <div className="pt-4 border-t border-silver-dim/10">
                  <span className="font-mono text-xs text-violet-light bg-violet-light/10 px-3 py-1.5 rounded-full">
                    Custom Quote
                  </span>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── Process Steps ────────────────────────────────────────── */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-transparent via-obsidian-900/50 to-transparent">
        <div className="container mx-auto px-6">
          <SectionTitle
            label="How I Work"
            title="The Process"
            subtitle="A structured approach that ensures every project is delivered with clarity, quality, and care."
          />
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                <GlowCard className="p-6 space-y-4 relative overflow-hidden h-full">
                  {/* Step number watermark */}
                  <div className="absolute -right-2 -top-4 font-grotesk font-black text-8xl text-silver-dim/5 select-none pointer-events-none">
                    {step.step}
                  </div>
                  {/* Connector line between steps on desktop */}
                  {i < processSteps.length - 1 && (
                    <motion.div
                      className="hidden lg:block absolute -right-3 top-1/2 w-6 h-0.5 bg-gradient-to-r from-cyan-DEFAULT/40 to-transparent z-20"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.4, duration: 0.5 }}
                    />
                  )}
                  <span className="font-mono text-3xl font-black text-cyan-DEFAULT/30 block">
                    {step.step}
                  </span>
                  <h3 className="font-grotesk font-bold text-silver-bright text-lg">{step.title}</h3>
                  <p className="text-silver-mid text-sm leading-relaxed">{step.description}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlowCard className="p-12 md:p-20 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-br from-cyan-DEFAULT/10 to-transparent blur-3xl" />
            <p className="font-mono text-cyan-DEFAULT text-sm tracking-widest uppercase mb-4">
              Let&apos;s Collaborate
            </p>
            <h2 className="font-grotesk text-4xl md:text-5xl font-black text-silver-bright mb-6">
              Have a Project in{' '}
              <span className="gradient-text">Mind?</span>
            </h2>
            <p className="text-silver-mid text-lg mb-10 max-w-xl mx-auto">
              Tell me about your project and we&apos;ll figure out the best way to bring it to life together.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-cyan-DEFAULT hover:bg-cyan-DEFAULT/90 text-obsidian-900 font-bold font-grotesk px-10 py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
              >
                Start a Conversation
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </GlowCard>
        </motion.div>
      </section>
    </>
  );
}
