'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Download, ChevronDown, MapPin, Mail } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { profile } from '@/config/profile';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { CounterCard } from '@/components/ui/CounterCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { StackingCards } from '@/components/ui/StackingCards';

const HeroScene = dynamic(
  () => import('@/components/three/scenes/HeroScene').then((m) => m.HeroScene),
  { ssr: false, loading: () => null }
);

const storyItems = [
  {
    number: '01',
    title: 'The Spark',
    body: 'It started with curiosity — tinkering with HTML pages at age 12, watching static text transform into something interactive. That first moment of seeing code come alive on screen lit a fire that never went out.',
    accent: 'cyan' as const,
  },
  {
    number: '02',
    title: 'Deep Dive',
    body: 'From frontend experiments I dove deep into algorithms, distributed systems, and machine learning. Every new domain became a puzzle to dissect, understand from first principles, and rebuild better.',
    accent: 'violet' as const,
  },
  {
    number: '03',
    title: 'Building Systems',
    body: 'Theory met practice in real-world engineering — designing scalable APIs, optimizing database queries, architecting microservices. I learned that the best code is invisible: reliable, fast, and maintainable.',
    accent: 'cyan' as const,
  },
  {
    number: '04',
    title: 'The Mission',
    body: 'Today I build products that matter. I bring together engineering rigor, design sensibility, and product thinking to create software that solves real problems for real people at real scale.',
    accent: 'violet' as const,
  },
];

export default function HomePage() {
  const texts = ["AI Engineer", "Software Developer", "Computer Vision Specialist"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    
    if (!isDeleting) {
      if (displayedText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(50);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length - 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setTypingSpeed(100);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayedText, isDeleting, currentTextIndex, typingSpeed]);

  return (
    <main className="bg-obsidian-900 min-h-screen">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-6">
        {/* Three.js scene — hidden on mobile via CanvasWrapper internally */}
        <div className="fixed inset-0 z-0">
          {/* Mobile gradient fallback (visible on mobile where WebGL is disabled) */}
          <div className="hero-mobile-bg absolute inset-0 md:opacity-0" />
          <HeroScene />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-obsidian-900/60 via-obsidian-900/30 to-obsidian-900/80 pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-obsidian-900/40 via-transparent to-obsidian-900/40 pointer-events-none" />

        {/* Main Side-by-Side Flex Container */}
        <div className="relative z-10 container mx-auto max-w-6xl w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 pt-16">
          
          {/* Left Column: Text & Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            
            {/* Desktop Hello pointer badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:inline-block relative"
            >
              <Image
                src="/assets/arrow.png"
                alt="Arrow pointer"
                width={80}
                height={80}
                className="absolute rotate-[-15deg]"
                style={{ left: "-85px", top: "-45px", width: "auto", height: "auto" }}
              />
              <div style={{ bottom: 15, position: "relative" }} className="glass px-4 py-1.5 rounded-full border border-cyan-DEFAULT/20">
                <p className="text-white text-sm font-semibold tracking-wide">
                  Hello! I Am <span className="text-purple-400">Ayush Ranjan</span>
                </p>
              </div>
            </motion.div>

            {/* Mobile Hello pointer badge */}
            <div className="lg:hidden flex justify-center mb-2">
              <div className="relative inline-block glass px-4 py-1.5 rounded-full border border-cyan-DEFAULT/20">
                <p className="text-white text-sm font-semibold">
                  Hello! I Am <span className="text-purple-400">Ayush Ranjan</span>
                </p>
              </div>
            </div>

            {/* Dynamic Slogan */}
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-silver-mid font-medium tracking-wide">
                An AI Engineer who
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                Judges a system<br />
                by its{' '}
                <span className="relative inline-block px-2">
                  <Image 
                    src="/assets/circle.png" 
                    alt="Circle highlight" 
                    width={180} 
                    height={80} 
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none mt-1 scale-x-110" 
                  />
                  <span className="bg-gradient-to-r from-violet-400 via-violet-300 to-violet-400 bg-clip-text text-transparent relative z-10">
                    interface
                  </span>
                </span>
                ...
              </h1>
              <p className="text-sm md:text-base text-silver-dim italic max-w-lg mx-auto lg:mx-0">
                Because if the design is not intuitive, what else can be?
              </p>
            </div>

            {/* Typewriter Rotating Title */}
            <div className="pt-4 pb-2">
              <p className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                I&apos;m an <span className="bg-gradient-to-r from-cyan-DEFAULT to-violet-light bg-clip-text text-transparent">{displayedText}</span>
                <span className="text-cyan-DEFAULT animate-pulse ml-1">|</span>
              </p>
            </div>

            {/* Short Bio */}
            <p className="text-silver-mid text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              {profile.shortBio}
            </p>

            {/* Actions / CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <MagneticButton strength={0.15}>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-cyan-DEFAULT hover:bg-cyan-DEFAULT/90 text-obsidian-900 font-bold font-grotesk px-6 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] text-sm"
                >
                  View Projects
                  <ArrowRight size={16} />
                </Link>
              </MagneticButton>

              <MagneticButton
                onClick={() => (window.location.href = '/contact')}
                className="inline-flex items-center gap-2 border border-violet-light text-violet-light hover:bg-violet-light/10 font-bold font-grotesk px-6 py-3.5 rounded-xl transition-all duration-300 text-sm"
                strength={0.15}
              >
                <Mail size={16} />
                Hire Me
              </MagneticButton>

              <MagneticButton strength={0.15}>
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-2 glass border border-silver-dim/30 text-silver-bright hover:border-silver-mid font-bold font-grotesk px-6 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 text-sm"
                >
                  <Download size={16} />
                  Resume
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Glow Portrait Image */}
          <div className="flex-1 flex justify-center lg:justify-end relative w-full max-w-sm lg:max-w-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-[280px] h-[340px] md:w-[320px] md:h-[400px] lg:w-[360px] lg:h-[440px]"
            >
              {/* Backing decorative shapes */}
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-glow to-cyan-glow blur-3xl opacity-60 rounded-full scale-90" />
              <div className="absolute -inset-2 border border-white/5 rounded-2xl rotate-3 pointer-events-none" />
              <div className="absolute -inset-2 border border-cyan-DEFAULT/10 rounded-2xl -rotate-3 pointer-events-none" />
              
              {/* User Portrait Image with beautiful neon Drop-Shadow Outline */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden glass border border-white/10 p-2 shadow-2xl">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-obsidian-800">
                  <Image
                    src="/assets/ayush.png"
                    alt="Ayush Ranjan - AI Engineer & Developer"
                    fill
                    sizes="(max-width: 768px) 280px, 360px"
                    priority
                    className="object-cover object-top portrait-glow transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        >
          <span className="text-silver-dim text-[10px] font-mono tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} className="text-cyan-DEFAULT" />
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
      <section className="relative z-10 py-24 container mx-auto px-6">
        <SectionTitle
          label="My Journey"
          title="The Story So Far"
          subtitle="Four chapters that shaped how I think, build, and lead."
        />
        <div className="mt-16">
          <StackingCards cards={storyItems} />
        </div>
      </section>

      {/* ─── Final CTA ────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong rounded-3xl p-12 md:p-20 text-center max-w-4xl mx-auto border border-silver-dim/10 relative overflow-hidden"
        >
          {/* Decorative orb */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-DEFAULT/10 to-violet-light/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-gradient-to-tr from-violet-light/10 to-cyan-DEFAULT/10 blur-3xl" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-grotesk text-4xl md:text-5xl font-black text-silver-bright mb-6 relative z-10"
          >
            Ready to Build{' '}
            <span className="gradient-text">Something Great?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-silver-mid text-lg mb-10 max-w-xl mx-auto relative z-10"
          >
            Whether you have a project in mind or just want to explore possibilities, I&apos;m always open to a conversation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 relative z-10"
          >
            <MagneticButton strength={0.2}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-cyan-DEFAULT hover:bg-cyan-DEFAULT/90 text-obsidian-900 font-bold font-grotesk px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
              >
                Get in Touch
                <ArrowRight size={18} />
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 glass border border-silver-dim/30 text-silver-bright hover:border-silver-mid font-semibold font-grotesk px-10 py-4 rounded-xl transition-all duration-300"
              >
                Learn More About Me
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
