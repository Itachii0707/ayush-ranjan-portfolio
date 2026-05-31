'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Mail, MapPin, Calendar } from 'lucide-react';
import { GlowCard } from '@/components/ui/GlowCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { profile } from '@/config/profile';
import toast from 'react-hot-toast';
import { trackEvent } from '@/lib/posthog';

const BUDGET_OPTIONS = ['Under \u20b950K', '\u20b950K - \u20b9150K', '\u20b950K - \u20b9500K', '\u20b9500K+', 'Open to discuss'];
const TIMELINE_OPTIONS = ['ASAP', '1-2 weeks', '1 month', '2-3 months', 'Flexible'];
const INQUIRY_TYPES = [
  { id: 'general', label: 'General Inquiry' },
  { id: 'project', label: 'Project Work' },
  { id: 'recruiter', label: 'Recruitment' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', company: '', budget: '', timeline: '', type: 'general' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSuccess(true);
        toast.success('Message sent successfully!');
        trackEvent('contact_form_submitted', { type: formData.type });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (err) {
      toast.error('Failed to send message. Please try emailing directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const update = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));
  const inputClass = 'w-full bg-obsidian-700/50 border border-white/10 rounded-xl px-4 py-3 text-silver-bright placeholder-silver-dim text-sm font-inter focus:outline-none focus:border-cyan-DEFAULT/50 focus:bg-obsidian-700 transition-all';

  return (
    <div className="relative min-h-screen bg-obsidian-900">
      <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-900/60 via-transparent to-obsidian-900" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-cyan-DEFAULT" />
            <span className="font-mono text-xs text-cyan-DEFAULT uppercase tracking-widest">Contact</span>
          </div>
          <h1 className="font-grotesk font-bold text-6xl md:text-7xl text-silver-bright leading-none">Start a<span className="gradient-text block"> Conversation</span></h1>
        </div>
      </section>

      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div key="success" className="flex flex-col items-center justify-center py-24 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                    <div className="w-20 h-20 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center mb-6"><CheckCircle size={40} className="text-green-400" /></div>
                    <h2 className="font-grotesk font-bold text-3xl text-silver-bright mb-3">Message Sent!</h2>
                    <p className="text-silver-mid mb-8">Thanks for reaching out. I will respond within 24 hours.</p>
                    <button onClick={() => { setIsSuccess(false); setFormData({ name: '', email: '', subject: '', message: '', company: '', budget: '', timeline: '', type: 'general' }); }} className="px-6 py-3 rounded-xl glass border border-white/10 text-silver-mid hover:text-silver-bright transition-colors">Send Another</button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div>
                      <label className="block text-silver-dim text-xs font-mono uppercase tracking-wider mb-2">Inquiry Type</label>
                      <div className="flex flex-wrap gap-2">
                        {INQUIRY_TYPES.map((t) => (<button key={t.id} type="button" onClick={() => update('type', t.id)} className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${formData.type === t.id ? 'bg-cyan-DEFAULT text-obsidian-900' : 'glass border border-white/10 text-silver-mid hover:text-silver-bright'}`}>{t.label}</button>))}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-silver-dim text-xs font-mono uppercase tracking-wider mb-2">Name *</label><input required className={inputClass} placeholder="Your name" value={formData.name} onChange={(e) => update('name', e.target.value)} /></div>
                      <div><label className="block text-silver-dim text-xs font-mono uppercase tracking-wider mb-2">Email *</label><input required type="email" className={inputClass} placeholder="your@email.com" value={formData.email} onChange={(e) => update('email', e.target.value)} /></div>
                    </div>
                    {formData.type !== 'general' && (<div><label className="block text-silver-dim text-xs font-mono uppercase tracking-wider mb-2">Company / Organization</label><input className={inputClass} placeholder="Company name" value={formData.company} onChange={(e) => update('company', e.target.value)} /></div>)}
                    <div><label className="block text-silver-dim text-xs font-mono uppercase tracking-wider mb-2">Subject *</label><input required className={inputClass} placeholder="What is this about?" value={formData.subject} onChange={(e) => update('subject', e.target.value)} /></div>
                    {formData.type === 'project' && (
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className="block text-silver-dim text-xs font-mono uppercase tracking-wider mb-2">Budget Range</label><select className={inputClass} value={formData.budget} onChange={(e) => update('budget', e.target.value)}><option value="">Select budget</option>{BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}</select></div>
                        <div><label className="block text-silver-dim text-xs font-mono uppercase tracking-wider mb-2">Timeline</label><select className={inputClass} value={formData.timeline} onChange={(e) => update('timeline', e.target.value)}><option value="">Select timeline</option>{TIMELINE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
                      </div>
                    )}
                    <div><label className="block text-silver-dim text-xs font-mono uppercase tracking-wider mb-2">Message *</label><textarea required rows={6} className={inputClass} placeholder="Tell me what you are working on..." value={formData.message} onChange={(e) => update('message', e.target.value)} /></div>
                    <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-cyan-DEFAULT text-obsidian-900 font-grotesk font-semibold hover:bg-cyan-muted transition-colors disabled:opacity-50 text-sm">
                      <Send size={16} />{isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
            <div className="space-y-6">
              <GlowCard className="p-6" glowColor="cyan">
                <h3 className="font-grotesk font-semibold text-silver-bright mb-4">Direct Contact</h3>
                <div className="space-y-4">
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-silver-mid hover:text-cyan-DEFAULT transition-colors"><Mail size={16} className="text-cyan-DEFAULT flex-shrink-0" /><span className="text-sm">{profile.email}</span></a>
                  <div className="flex items-center gap-3 text-silver-mid"><MapPin size={16} className="text-cyan-DEFAULT flex-shrink-0" /><span className="text-sm">{profile.location}</span></div>
                </div>
              </GlowCard>
              <GlowCard className="p-6" glowColor="violet">
                <h3 className="font-grotesk font-semibold text-silver-bright mb-4">Connect</h3>
                <div className="space-y-3">
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-silver-mid hover:text-cyan-DEFAULT transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-cyan-DEFAULT"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    <span className="text-sm">GitHub</span>
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-silver-mid hover:text-cyan-DEFAULT transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-cyan-DEFAULT"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    <span className="text-sm">LinkedIn</span>
                  </a>
                </div>
              </GlowCard>
              <GlowCard className="p-6" glowColor="cyan">
                <h3 className="font-grotesk font-semibold text-silver-bright mb-3">Book a Call</h3>
                <p className="text-silver-mid text-sm mb-4">Prefer a quick call? Schedule a 30-min meeting.</p>
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-violet-glow/20 border border-violet-glow/30 text-violet-light text-sm hover:bg-violet-glow/30 transition-colors w-full justify-center"><Calendar size={14} /> Schedule via Calendly</a>
              </GlowCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
