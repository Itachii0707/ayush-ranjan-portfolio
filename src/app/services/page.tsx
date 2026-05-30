import type { Metadata } from 'next';
import { ServicesScene } from '@/components/three/ServicesScene';
import { ServicesClient } from './ServicesClient';

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

      {/* ─── Animated content (client) ────────────────────────────── */}
      <ServicesClient />
    </main>
  );
}
