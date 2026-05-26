import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services, processSteps } from '@/config/services';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlowCard } from '@/components/ui/GlowCard';
import { ServicesScene } from '@/components/three/ServicesScene';

export const metadata: Metadata = {
  title: 'Services | Ayush Ranjan',
  description:
    'Explore the services Ayush Ranjan offers — from full-stack development and system architecture to UI/UX design and technical consulting.',
};

export default function ServicesPage() {
  return (
    <main className="bg-obsidian-900 min-h-screen">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <ServicesScene />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-obsidian-900/50 via-obsidian-900/30 to-obsidian-900 pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-obsidian-900/60 via-transparent to-obsidian-900/60 pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <p className="font-mono text-cyan-DEFAULT text-sm tracking-widest uppercase mb-6">
            Services
          </p>
          <h1 className="font-grotesk text-5xl md:text-7xl font-black text-silver-bright leading-tight">
            What I Can{' '}
            <span className="gradient-text">Build for You</span>
          </h1>
          <p className="mt-6 text-silver-mid text-xl max-w-2xl mx-auto">
            End-to-end engineering expertise — from the first line of code to production-ready deployment.
          </p>
        </div>
      </section>

      {/* ─── Service Cards ────────────────────────────────────────── */}
      <section className="relative z-10 py-24 container mx-auto px-6">
        <SectionTitle
          label="Offerings"
          title="Services & Expertise"
          subtitle="Tailored solutions across the full spectrum of modern software development."
        />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <GlowCard key={service.title} className="p-8 space-y-5 flex flex-col">
              {/* Icon */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-DEFAULT/10 border border-cyan-DEFAULT/20 flex items-center justify-center text-2xl flex-shrink-0">
                  {service.icon}
                </div>
                <h3 className="font-grotesk font-bold text-silver-bright text-xl leading-tight">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-silver-mid leading-relaxed text-sm">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2 flex-1">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-silver-dim text-sm">
                    <span className="text-cyan-DEFAULT mt-0.5 flex-shrink-0">▹</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Pricing label */}
              <div className="pt-4 border-t border-silver-dim/10">
                <span className="font-mono text-xs text-violet-light bg-violet-light/10 px-3 py-1.5 rounded-full">
                  Custom Quote
                </span>
              </div>
            </GlowCard>
          ))}
        </div>
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
              <GlowCard key={i} className="p-6 space-y-4 relative overflow-hidden">
                {/* Step number watermark */}
                <div className="absolute -right-2 -top-4 font-grotesk font-black text-8xl text-silver-dim/5 select-none pointer-events-none">
                  {step.step}
                </div>
                <span className="font-mono text-3xl font-black text-cyan-DEFAULT/30 block">
                  {step.step}
                </span>
                <h3 className="font-grotesk font-bold text-silver-bright text-lg">{step.title}</h3>
                <p className="text-silver-mid text-sm leading-relaxed">{step.description}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 container mx-auto px-6">
        <GlowCard className="p-12 md:p-20 text-center max-w-4xl mx-auto">
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
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-cyan-DEFAULT hover:bg-cyan-DEFAULT/90 text-obsidian-900 font-bold font-grotesk px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
          >
            Start a Conversation
            <ArrowRight size={18} />
          </Link>
        </GlowCard>
      </section>
    </main>
  );
}
