'use client';

import { motion } from 'framer-motion';
import type { Dictionary } from '@/content/types';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import { useI18n } from '@/i18n/I18nProvider';
import { getHighlights } from './aboutData';

/** Biography (the page h1) and the three highlight stats. */
export default function AboutIntro({ about }: { about: Dictionary['about'] }) {
  const { playHover } = useThemeAudio();
  const { common: content } = useI18n();
  const highlightCards = getHighlights(about.ui);

  return (
    <section className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.05 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
      >
        <span className="text-xs text-[var(--accent-color)] font-bold tracking-widest uppercase">
          // {content.system.role} &bull; {content.system.location}
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display uppercase tracking-tight leading-tight break-words">
          {about.title}
        </h1>

        <p className="text-base sm:text-lg text-white font-sans font-medium leading-relaxed pt-1">
          {about.lead}
        </p>

        <p className="text-sm sm:text-base text-white/60 font-sans leading-relaxed max-w-4xl">
          {about.story}
        </p>
      </motion.div>

      {/* 2. THE THREE HIGHLIGHTS AS AN EDITORIAL STAT STREAM (NO BOXES) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] border-y border-white/[0.08] py-6 sm:py-8 my-6"
      >
        {highlightCards.map((card, idx) => {
          const CardIcon = card.Icon;
          return (
            <div
              key={card.id}
              onMouseEnter={playHover}
              className={`space-y-3 group ${
                idx === 0 ? 'sm:pr-6 lg:pr-8' : idx === 1 ? 'py-5 sm:py-0 sm:px-6 lg:px-8' : 'pt-5 sm:pt-0 sm:pl-6 lg:pl-8'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[var(--accent-color)]">
                  <CardIcon className="w-4 h-4" />
                  <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-white/50">
                    {card.tag}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[var(--accent-color)] font-bold">
                  0{idx + 1}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-base sm:text-lg font-bold text-white font-mono group-hover:text-[var(--accent-color)] transition-colors leading-tight">
                  {card.title}
                </div>
                <div className="text-xs text-white/50 font-sans leading-relaxed">
                  {card.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
