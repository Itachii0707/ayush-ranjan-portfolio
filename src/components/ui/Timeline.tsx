'use client';

import { motion } from 'framer-motion';
import { GlowCard } from '@/components/ui/GlowCard';
import { TimelineEvent } from '@/config/experience';

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative max-w-4xl mx-auto py-12">
      {/* Central track line (Left-aligned on mobile, Center-aligned on desktop) */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-DEFAULT via-violet-light to-obsidian-700/20 transform md:-translate-x-1/2 rounded-full" />

      <div className="space-y-12">
        {events.map((event, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={event.id} className="relative flex flex-col md:flex-row items-stretch">
              {/* Floating pulsing node marker */}
              <div className="absolute left-4 md:left-1/2 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-DEFAULT to-violet-light ring-4 ring-obsidian-900 transform -translate-x-1/2 z-10 shadow-lg shadow-cyan-glow animate-pulse" />

              {/* Event card wrapper (Alternates side on desktop, stacked on mobile) */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 flex ${isEven ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12 md:ml-auto'}`}>
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -30 : 30, y: 15 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-md"
                >
                  <GlowCard className="p-6 space-y-3" glowColor={isEven ? 'cyan' : 'violet'}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl filter drop-shadow-[0_2px_8px_rgba(0,229,255,0.2)]" role="img" aria-label={event.type}>
                          {event.icon}
                        </span>
                        <div>
                          <span className="text-xs font-mono uppercase tracking-wider text-silver-dim">
                            {event.type}
                          </span>
                          <h4 className="font-grotesk font-black text-silver-bright text-base leading-tight mt-0.5">
                            {event.title}
                          </h4>
                          <p className="text-violet-light text-xs font-semibold mt-1">{event.organization}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="font-mono text-[10px] font-bold text-cyan-DEFAULT bg-cyan-DEFAULT/10 px-2 py-0.5 rounded border border-cyan-DEFAULT/20 whitespace-nowrap uppercase tracking-wider">
                          {event.month} {event.year}
                        </span>
                      </div>
                    </div>
                    <p className="text-silver-mid text-xs leading-relaxed mt-2 pl-1">
                      {event.description}
                    </p>
                  </GlowCard>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
