'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { FileText, Download, ExternalLink, User, MapPin, Mail } from 'lucide-react';
import { skillCategories } from '@/config/skills';
import { profile } from '@/config/profile';
import toast from 'react-hot-toast';
import { trackEvent } from '@/lib/posthog';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlowCard } from '@/components/ui/GlowCard';
import { SkillBadge } from '@/components/ui/SkillBadge';

const ResumeScene = dynamic(
  () => import('@/components/three/scenes/ResumeScene').then((m) => m.ResumeScene),
  { ssr: false, loading: () => null }
);

export default function ResumePage() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      trackEvent('resume_download', { source: 'resume_page' });
      // Notify server (non-critical)
      fetch('/api/resume-download', { method: 'POST' }).catch(() => {});
      // Trigger browser download
      const link = document.createElement('a');
      link.href = profile.resumeUrl;
      link.download = 'Ayush_Ranjan_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Resume downloaded successfully!');
    } catch {
      toast.error('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const previewResume = () => {
    trackEvent('resume_view', { source: 'resume_page' });
    window.open(profile.resumeUrl, '_blank');
  };

  const sidebarSkills = skillCategories.slice(0, 3);

  return (
    <main className="bg-obsidian-900 min-h-screen">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <ResumeScene />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-obsidian-900/50 via-obsidian-900/30 to-obsidian-900 pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-obsidian-900/60 via-transparent to-obsidian-900/60 pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <p className="font-mono text-cyan-DEFAULT text-sm tracking-widest uppercase mb-6">
            Resume
          </p>
          <h1 className="font-grotesk text-5xl md:text-7xl font-black text-silver-bright leading-tight">
            My{' '}
            <span className="gradient-text">Credentials</span>
          </h1>
          <p className="mt-6 text-silver-mid text-xl max-w-2xl mx-auto">
            A concise summary of my education, skills, and the value I bring to every team I join.
          </p>
        </div>
      </section>

      {/* ─── Main Content ─────────────────────────────────────────── */}
      <section className="relative z-10 py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* ── Main Area (col-span-2) ─────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            <GlowCard className="p-8 md:p-10 space-y-8" glowColor="cyan">
              {/* Header */}
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-cyan-DEFAULT/10 border border-cyan-DEFAULT/20 flex items-center justify-center flex-shrink-0">
                  <FileText size={28} className="text-cyan-DEFAULT" />
                </div>
                <div>
                  <h2 className="font-grotesk font-black text-silver-bright text-2xl md:text-3xl">
                    Ayush Ranjan — Resume
                  </h2>
                  <p className="text-silver-mid mt-1">{profile.tagline}</p>
                  <span className="font-mono text-xs text-violet-light bg-violet-glow/10 px-3 py-1 rounded-full mt-3 inline-block">
                    PDF · Updated 2025
                  </span>
                </div>
              </div>

              {/* Instructions */}
              <div className="border border-silver-dim/10 rounded-xl p-6 bg-white/2 space-y-3">
                <p className="text-silver-mid text-sm leading-relaxed">
                  Download the PDF for the best formatting and offline access. You can also preview it
                  directly in your browser — no account required.
                </p>
                <ul className="space-y-2">
                  {[
                    'ATS-optimized layout for applicant tracking systems',
                    'Clean typography designed for human and machine readability',
                    'Latest version with all projects and skills up to date',
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-silver-dim text-sm">
                      <span className="text-cyan-DEFAULT mt-0.5 flex-shrink-0">▹</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-cyan-DEFAULT hover:bg-cyan-muted disabled:opacity-60 disabled:cursor-not-allowed text-obsidian-900 font-bold font-grotesk px-8 py-4 rounded-xl transition-all duration-300"
                >
                  {isDownloading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-obsidian-900/30 border-t-obsidian-900 rounded-full animate-spin" />
                      Downloading…
                    </>
                  ) : (
                    <>
                      <Download size={20} />
                      Download PDF
                    </>
                  )}
                </button>

                <button
                  onClick={previewResume}
                  className="flex-1 inline-flex items-center justify-center gap-3 glass border border-silver-dim/30 text-silver-bright hover:border-silver-mid font-semibold font-grotesk px-8 py-4 rounded-xl transition-all duration-300"
                >
                  <ExternalLink size={20} />
                  View in Browser
                </button>
              </div>
            </GlowCard>
          </div>

          {/* ── Sidebar ───────────────────────────────────────── */}
          <div className="space-y-6">
            {/* Quick Profile */}
            <GlowCard className="p-6 space-y-5" glowColor="violet">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-DEFAULT to-violet-light flex items-center justify-center">
                  <User size={18} className="text-obsidian-900" />
                </div>
                <div>
                  <p className="font-grotesk font-bold text-silver-bright text-sm">{profile.name}</p>
                  <p className="font-mono text-xs text-silver-dim">AI Engineer · CS Student</p>
                </div>
              </div>

              <div className="space-y-3 border-t border-silver-dim/10 pt-4">
                <div className="flex items-center gap-2.5 text-silver-mid text-sm">
                  <MapPin size={14} className="text-cyan-DEFAULT flex-shrink-0" />
                  {profile.location}
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2.5 text-silver-mid text-sm hover:text-cyan-DEFAULT transition-colors"
                >
                  <Mail size={14} className="text-cyan-DEFAULT flex-shrink-0" />
                  {profile.email}
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-silver-mid text-sm hover:text-cyan-DEFAULT transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-cyan-DEFAULT flex-shrink-0"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-silver-mid text-sm hover:text-cyan-DEFAULT transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-cyan-DEFAULT flex-shrink-0"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </GlowCard>

            {/* Skill previews */}
            {sidebarSkills.map((category, ci) => (
              <GlowCard
                key={category.id}
                className="p-5 space-y-3"
                glowColor={ci % 2 === 0 ? 'cyan' : 'violet'}
              >
                <h4 className="font-grotesk font-bold text-silver-bright text-sm">
                  {category.label}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.slice(0, 5).map((skill) => (
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

            {/* Sidebar download CTA */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full inline-flex items-center justify-center gap-2 bg-cyan-DEFAULT/10 hover:bg-cyan-DEFAULT/20 border border-cyan-DEFAULT/30 text-cyan-DEFAULT font-semibold font-grotesk px-6 py-3 rounded-xl transition-all duration-300 text-sm"
            >
              <Download size={16} />
              {isDownloading ? 'Downloading…' : 'Download Resume'}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
