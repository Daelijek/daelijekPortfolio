'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Dictionary } from '@/content/types';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import { SKILL_CATEGORIES, getSkillDomains, toggleCategory, type SkillCategory } from './aboutData';

const CATEGORY_TABS: { id: SkillCategory; label: string }[] = [
  { id: 'mobile', label: 'MOBILE' },
  { id: 'web', label: 'WEB' },
  { id: 'backend', label: 'BACKEND' },
  { id: 'ai', label: 'AI & DATA' },
];

/** Filterable competency matrix (multi-select categories with animated cards). */
export default function CompetencyMatrix({ about }: { about: Dictionary['about'] }) {
  const { playHover, playClick } = useThemeAudio();
  const t = about.ui;
  const [selectedCategories, setSelectedCategories] = useState<SkillCategory[]>([...SKILL_CATEGORIES]);
  const filteredDomains = getSkillDomains(t).filter((d) => selectedCategories.includes(d.id));

  const handleToggleCategory = (category: SkillCategory | 'all') => {
    playClick();
    setSelectedCategories((current) => toggleCategory(current, category));
  };

  return (
    <section className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.05 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="border-b border-white/[0.08] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <span className="text-xs font-mono font-bold text-[var(--accent-color)] tracking-wider uppercase block mb-1">
            // TECHNICAL_CAPABILITIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight">
            {about.sectorsTitle || 'COMPETENCY MATRIX'}
          </h2>
          <p className="text-xs sm:text-sm text-white/50 mt-1 font-sans">
            {about.sectorsSubtitle || 'Categorized technical capabilities & tooling'}
          </p>
        </div>

        {/* Multi-Select Category Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap self-start sm:self-auto">
          <button
            onClick={() => handleToggleCategory('all')}
            onMouseEnter={playHover}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategories.length === 4
                ? 'bg-[var(--accent-color)] text-[#020504] shadow-[0_0_15px_var(--accent-glow)]'
                : 'bg-white/[0.04] text-white/60 hover:text-white border border-white/10'
            }`}
          >
            <span>{t.all}</span>
            {selectedCategories.length === 4 && <Check className="w-3 h-3" />}
          </button>

          {CATEGORY_TABS.map((tab) => {
            const isSelected = selectedCategories.includes(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => handleToggleCategory(tab.id)}
                onMouseEnter={playHover}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/40 shadow-[0_0_12px_var(--accent-glow)]'
                    : 'bg-white/[0.04] text-white/50 hover:text-white border border-white/10'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[var(--accent-color)]' : 'bg-white/30'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* HIGH-END ARCHITECTURAL CARDS GRID WITH FLUID LAYOUT & EXIT ANIMATIONS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6">
        <AnimatePresence>
          {filteredDomains.map((domain, idx) => {
            const DomainIcon = domain.icon;
            return (
              <motion.div
                layout="position"
                key={domain.id}
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.92,
                  y: -8,
                  transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                }}
                transition={{
                  layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.25 },
                  y: { duration: 0.25 },
                }}
                onMouseEnter={playHover}
                className="relative rounded-2xl p-6 sm:p-7 bg-[#0b0f14]/80 border border-white/[0.08] hover:border-[var(--accent-color)]/50 transition-colors duration-300 group flex flex-col justify-between hover:shadow-[0_0_35px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden"
              >
                {/* Subtle Ambient Radial Highlight on Hover */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--accent-color)]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[var(--accent-color)]/15 transition-all duration-500" />

                <div className="relative z-10 space-y-5">
                  {/* Top Row: Icon, Index & Metric Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/20 shadow-[0_0_15px_var(--accent-glow)]">
                        <DomainIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[var(--accent-color)] font-bold tracking-wider uppercase block">
                          0{idx + 1} // DOMAIN
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white font-mono group-hover:text-[var(--accent-color)] transition-colors">
                          {domain.title}
                        </h3>
                      </div>
                    </div>

                    <span className="shrink-0 text-[10px] font-mono text-[var(--accent-color)] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 font-bold">
                      {domain.metric}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed">
                    {domain.desc}
                  </p>

                  {/* Technology Stack Chips */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-white/55 uppercase tracking-wider block">
                      // TECH_STACK
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {domain.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/80 font-mono group-hover:border-white/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Deliverables / Production Proof at bottom of card */}
                <div className="relative z-10 pt-4 mt-5 border-t border-white/[0.06] space-y-2">
                  <span className="text-[10px] font-mono font-bold text-[var(--accent-color)] uppercase tracking-wider block">
                    // KEY_DELIVERABLES
                  </span>
                  <ul className="space-y-1.5 text-xs text-white/70 font-sans">
                    {domain.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[var(--accent-color)] font-mono shrink-0 font-bold">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
