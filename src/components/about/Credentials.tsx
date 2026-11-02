'use client';

import { motion } from 'framer-motion';
import { Award, Languages } from 'lucide-react';
import type { Dictionary } from '@/content/types';
import { useThemeAudio } from '@/context/ThemeAudioContext';

/** Certifications and spoken languages. */
export default function Credentials({ about }: { about: Dictionary['about'] }) {
  const { playHover } = useThemeAudio();

  if (!about.credentials) return null;

  return (
    <section className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.05 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="border-b border-white/[0.08] pb-4 flex items-center justify-between"
      >
        <div>
          <span className="text-xs font-mono font-bold text-[var(--accent-color)] tracking-wider uppercase block mb-1">
            // CREDENTIALS_VERIFIED
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight">
            {about.credentials.title}
          </h2>
          <p className="text-xs text-white/50 mt-1 font-sans">
            {about.credentials.subtitle}
          </p>
        </div>
        <span className="text-xs text-[var(--accent-color)] font-mono font-bold">
          [ACCREDITED]
        </span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Certifications Card Pod */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.05 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-6 sm:p-7 bg-[#0b0f14]/80 border border-white/[0.08] hover:border-[var(--accent-color)]/40 transition-all duration-300 backdrop-blur-md space-y-5 flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-44 h-44 bg-[var(--accent-color)]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[var(--accent-color)]/10 transition-all" />

          <div className="relative z-10 space-y-5">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/20">
                  <Award className="w-4 h-4" />
                </div>
                <span className="font-bold text-white uppercase tracking-wider text-sm font-mono">
                  {about.credentials.certTitle || 'CERTIFICATIONS'}
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[var(--accent-color)] px-2.5 py-0.5 rounded-full bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30">
                {about.credentials.certifications.length} VERIFIED
              </span>
            </div>

            {/* Sub-cards */}
            <div className="space-y-3">
              {about.credentials.certifications.map((cert, cIdx) => (
                <div
                  key={cIdx}
                  onMouseEnter={playHover}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[var(--accent-color)]/30 hover:bg-white/[0.05] transition-all space-y-2 group/sub"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xs sm:text-sm font-bold text-white font-mono group-hover/sub:text-[var(--accent-color)] transition-colors">
                      {cert.title}
                    </h3>
                    <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/30 shrink-0 font-bold">
                      {cert.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/50 font-mono">
                    <span>{cert.issuer}</span>
                    <span className="text-[10px] text-[var(--accent-color)] font-bold">{cert.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/55">
            <span>// CISCO & AWS VERIFICATION</span>
            <span className="text-emerald-400 flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              AUTHENTICATED
            </span>
          </div>
        </motion.div>

        {/* Spoken Languages Card Pod */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.05 }}
          transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-6 sm:p-7 bg-[#0b0f14]/80 border border-white/[0.08] hover:border-[var(--accent-color)]/40 transition-all duration-300 backdrop-blur-md space-y-5 flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-44 h-44 bg-[var(--accent-color)]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[var(--accent-color)]/10 transition-all" />

          <div className="relative z-10 space-y-5">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/20">
                  <Languages className="w-4 h-4" />
                </div>
                <span className="font-bold text-white uppercase tracking-wider text-sm font-mono">
                  {about.credentials.langTitle || 'LANGUAGES'}
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[var(--accent-color)] px-2.5 py-0.5 rounded-full bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30">
                3 PROFICIENCIES
              </span>
            </div>

            {/* Sub-cards */}
            <div className="space-y-3">
              {about.credentials.languages.map((langItem, lIdx) => (
                <div
                  key={lIdx}
                  onMouseEnter={playHover}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[var(--accent-color)]/30 hover:bg-white/[0.05] transition-all space-y-1.5 group/sub"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-white font-mono group-hover/sub:text-[var(--accent-color)] transition-colors flex items-center gap-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/70 font-mono">
                        {langItem.name === 'English' ? 'EN' : langItem.name === 'Kazakh' ? 'KZ' : 'RU'}
                      </span>
                      {langItem.name}
                    </span>
                    <span className="text-xs font-mono font-bold text-[var(--accent-color)]">
                      {langItem.level}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 font-sans leading-relaxed">
                    {langItem.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/55">
            <span>// MULTILINGUAL WORKFLOW</span>
            <span className="text-white/60">TRILINGUAL FLUENCY</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
