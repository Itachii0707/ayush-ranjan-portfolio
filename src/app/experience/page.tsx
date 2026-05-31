import type { Metadata } from 'next';
import { ExperienceClient } from './ExperienceClient';

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

      {/* ─── Animated content (client) ────────────────────────────── */}
      <ExperienceClient />
    </main>
  );
}
