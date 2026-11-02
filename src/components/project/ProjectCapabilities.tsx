'use client';

import { motion as Motion } from 'framer-motion';
import { Layers, Sparkles } from 'lucide-react';
import type { DetailUi, FeaturedProject } from './types';

/** Core capabilities (feature cards). */
export default function ProjectCapabilities({ project, t }: { project: FeaturedProject; t: DetailUi }) {
  const featuresTitle = t.coreCapabilities;
  const features = project.walkthrough?.features;
  if (!features) return null;

  return (
    <Motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.05 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="mb-20 sm:mb-28 space-y-8"
    >
      <div className="border-b border-white/[0.08] pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-[var(--accent-color)]" />
          <h2 className="text-lg sm:text-xl font-bold text-white font-display uppercase tracking-wide">
            {featuresTitle}
          </h2>
        </div>
        <span className="text-xs text-white/55 font-mono">
          {project.walkthrough.features.length} MODULES
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
        {project.walkthrough.features.map((f, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-3xl bg-[#06090E]/90 border border-white/[0.08] hover:border-[var(--accent-color)]/40 transition-all duration-300 flex flex-col justify-between space-y-5 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-black text-[var(--accent-color)] font-display">
                  {f.num}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-white/60 font-mono font-medium">
                  {f.metric}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display group-hover:text-[var(--accent-color)] transition-colors">
                {f.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                {f.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-white/55">
              <Layers className="w-3.5 h-3.5 text-[var(--accent-color)]" />
              <span>PRODUCTION VERIFIED</span>
            </div>
          </div>
        ))}
      </div>
    </Motion.section>
  );
}
