'use client';

import { motion } from 'framer-motion';
import type { Dictionary } from '@/content/types';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import { getPrinciples } from './aboutData';

/** Engineering principles manifesto. */
export default function Principles({ about }: { about: Dictionary['about'] }) {
  const { playHover } = useThemeAudio();
  const t = about.ui;
  const principles = getPrinciples(t);

  return (
    <section className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.05 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="border-b border-white/[0.08] pb-4"
      >
        <span className="text-xs font-mono font-bold text-[var(--accent-color)] tracking-wider uppercase block mb-1">
          // CORE_STANDARDS
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight">
          {t.engineeringPrinciplesMindset}
        </h2>
        <p className="text-xs sm:text-sm text-white/50 mt-1 font-sans">
          {t.coreStandardsGuidingTechnical}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] border-y border-white/[0.08] py-8">
        {principles.map((p, idx) => {
          const PrincipleIcon = p.icon;
          return (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={playHover}
              className={`space-y-4 group ${
                idx === 0 ? 'md:pr-8' : idx === 1 ? 'py-6 md:py-0 md:px-8' : 'pt-6 md:pt-0 md:pl-8'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black font-display text-[var(--accent-color)]">
                  {p.num}
                </span>
                <div className="p-2 rounded-lg bg-[var(--accent-color)]/10 text-[var(--accent-color)]">
                  <PrincipleIcon className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-white font-mono group-hover:text-[var(--accent-color)] transition-colors leading-tight">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/55 font-sans leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
