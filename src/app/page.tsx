'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Download, ChevronDown, MapPin, Mail } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { profile } from '@/config/profile';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { CounterCard } from '@/components/ui/CounterCard';
import { GlowCard } from '@/components/ui/GlowCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import toast from 'react-hot-toast';

const HeroScene = dynamic(
  () => import('@/components/three/scenes/HeroScene').then((m) => m.HeroScene),
  { ssr: false, loading: () => null }
);

gsap.registerPlugin(ScrollTrigger);

const storyItems = [
  {
    number: '01',
    title: 'The Spark',
    body: 'It started with curiosity — tinkering with HTML pages at age 12, watching static text transform into something interactive. That first moment of seeing code come alive on screen lit a fire that never went out.',
  },
  {
    number: '02',
    title: 'Deep Dive',
    body: 'From frontend experiments I dove deep into algorithms, distributed systems, and machine learning. Every new domain became a puzzle to dissect, understand from first principles, and rebuild better.',
  },
  {
    number: '03',
    title: 'Building Systems',
    body: 'Theory met practice in real-world engineering — designing scalable APIs, optimizing database queries, architecting microservices. I learned that the best code is invisible: reliable, fast, and maintainable.',
  },
  {
    number: '04',
    title: 'The Mission',
    body: 'Today I build products that matter. I bring together engineering rigor, design sensibility, and product thinking to create software that solves real problems for real people at real scale.',
  },
];

export default function HomePage() {
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.story-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, storyRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-obsidian-900 min-h-screen">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Three.js scene — hidden on mobile via CanvasWrapper internally */}
        <div className="fixed inset-0 z-0">
          {/* Mobile gradient fallback (visible on mobile where WebGL is disabled) */}
          <div className="hero-mobile-bg absolute inset-0 md:opacity-0" />
          <HeroScene />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-obsidian-900/60 via-obsidian-900/30 to-obsidian-900/80 pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-obsidian-900/40 via-transparent to-obsidian-900/40 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center pt-24">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.8 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-silver-mid text-sm font-mono">Available for opportunities</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 3.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-grotesk text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-silver-bright mb-6 leading-none"
          >
            AYUSH{' '}
            <span className="gradient-text">RANJAN</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 4.05 }}
            className="text-silver-mid text-xl md:text-2xl max-w-2xl mx-auto mb-4 font-light"
          >
            {profile.tagline}
          </motion.p>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 4.15 }}
            className="inline-flex items-center gap-1.5 text-silver-dim text-sm font-mono mb-12"
          >
            <MapPin size={14} className="text-cyan-DEFAULT" />
            {profile.location}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 4.25 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-cyan-DEFAULT hover:bg-cyan-DEFAULT/90 text-obsidian-900 font-semibold font-grotesk px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
            >
              View Projects
              <ArrowRight size={18} />
            </Link>

            <MagneticButton
              onClick={() => (window.location.href = '/contact')}
              className="inline-flex items-center gap-2 border border-violet-light text-violet-light hover:bg-violet-light/10 font-semibold font-grotesk px-8 py-4 rounded-xl transition-all duration-300"
            >
              <Mail size={18} />
              Hire Me
            </MagneticButton>

            <Link
              href="/resume"
              className="inline-flex items-center gap-2 glass border border-silver-dim/30 text-silver-bright hover:border-silver-mid font-semibold font-grotesk px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Download size={18} />
              Resume
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 4.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-silver-dim text-xs font-mono tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} className="text-cyan-DEFAULT" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Stats ────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 container mx-auto px-6">
        <SectionTitle
          label="By the Numbers"
          title="Impact at a Glance"
          subtitle="Metrics that tell the story of years of building, shipping, and iterating."
        />
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {profile.stats.map((stat, i) => (
            <CounterCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </section>

      {/* ─── Story ────────────────────────────────────────────────── */}
      <section ref={storyRef} className="relative z-10 py-24 container mx-auto px-6">
        <SectionTitle
          label="My Journey"
          title="The Story So Far"
          subtitle="Four chapters that shaped how I think, build, and lead."
        />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {storyItems.map((item) => (
            <GlowCard key={item.number} className="story-card opacity-0 p-8 space-y-4">
              <span className="font-mono text-5xl font-black text-cyan-DEFAULT/20 leading-none select-none">
                {item.number}
              </span>
              <h3 className="font-grotesk text-xl font-bold text-silver-bright">{item.title}</h3>
              <p className="text-silver-mid leading-relaxed">{item.body}</p>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* ─── Final CTA ────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 container mx-auto px-6">
        <div className="glass-strong rounded-3xl p-12 md:p-20 text-center max-w-4xl mx-auto border border-silver-dim/10">
          <h2 className="font-grotesk text-4xl md:text-5xl font-black text-silver-bright mb-6">
            Ready to Build{' '}
            <span className="gradient-text">Something Great?</span>
          </h2>
          <p className="text-silver-mid text-lg mb-10 max-w-xl mx-auto">
            Whether you have a project in mind or just want to explore possibilities, I&apos;m always open to a conversation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-cyan-DEFAULT hover:bg-cyan-DEFAULT/90 text-obsidian-900 font-bold font-grotesk px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
            >
              Get in Touch
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 glass border border-silver-dim/30 text-silver-bright hover:border-silver-mid font-semibold font-grotesk px-10 py-4 rounded-xl transition-all duration-300"
            >
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
