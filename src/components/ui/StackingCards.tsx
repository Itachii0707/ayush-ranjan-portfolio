'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StackCard {
  number: string;
  title: string;
  body: string;
  accent?: 'cyan' | 'violet';
}

interface StackingCardsProps {
  cards: StackCard[];
}

const CARD_COLORS = {
  cyan: {
    border: 'border-cyan-DEFAULT/20 hover:border-cyan-DEFAULT/50',
    glow: 'rgba(0,229,255,0.08)',
    accent: '#00E5FF',
    label: 'rgba(0,229,255,0.18)',
  },
  violet: {
    border: 'border-violet-light/20 hover:border-violet-light/50',
    glow: 'rgba(168,85,247,0.08)',
    accent: '#A855F7',
    label: 'rgba(168,85,247,0.18)',
  },
};

export function StackingCards({ cards }: StackingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>('.s-card');
      const totalCards = cardEls.length;

      // Each card stacks over the previous ones
      cardEls.forEach((card, i) => {
        // Cards below the current one should scale down and dim
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: `top+=${i * 100}px top`,
          end: `top+=${(i + 1) * 100}px top`,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            // Scale and dim already-placed cards
            for (let j = 0; j < i; j++) {
              const depth = i - j;
              gsap.to(cardEls[j], {
                scale: 1 - depth * 0.03 - progress * 0.03,
                opacity: 1 - depth * 0.12 - progress * 0.06,
                filter: `blur(${depth * 0.5 + progress * 0.5}px)`,
                duration: 0,
              });
            }
          },
        });

        // Slide each card up into view
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${i * 90}px 70%`,
              end: `top+=${i * 90 + 80}px 40%`,
              scrub: 0.6,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Sticky viewport observer */}
      <div ref={stickyRef} />

      <div className="relative space-y-6">
        {cards.map((card, i) => {
          const accent = card.accent ?? (i % 2 === 0 ? 'cyan' : 'violet');
          const colors = CARD_COLORS[accent];

          return (
            <div
              key={card.number}
              className={`s-card relative glass rounded-2xl border ${colors.border} p-8 md:p-10 overflow-hidden transition-colors duration-300 will-change-transform`}
              style={{
                background: `radial-gradient(ellipse 80% 60% at 20% 50%, ${colors.glow}, transparent 70%), var(--glass-bg)`,
              }}
            >
              {/* Shimmer top edge */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              {/* Large number watermark */}
              <span
                className="select-none pointer-events-none absolute -right-4 -top-6 font-grotesk font-black text-[10rem] leading-none opacity-[0.04]"
                style={{ color: colors.accent }}
              >
                {card.number}
              </span>

              <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
                {/* Number chip */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-mono font-black text-lg"
                  style={{
                    background: colors.label,
                    color: colors.accent,
                    border: `1px solid ${colors.accent}30`,
                  }}
                >
                  {card.number}
                </div>

                <div className="space-y-3">
                  <h3 className="font-grotesk text-2xl font-bold text-silver-bright">
                    {card.title}
                  </h3>
                  <p className="text-silver-mid leading-relaxed text-base max-w-xl">
                    {card.body}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
