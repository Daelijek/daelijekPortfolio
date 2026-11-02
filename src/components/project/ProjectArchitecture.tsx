'use client';

import { motion as Motion } from 'framer-motion';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';
import { PROJECT_CALLOUTS } from './callouts';
import type { DetailUi, FeaturedProject } from './types';

/** Architecture, technologies, verified callouts and the colour palette. */
export default function ProjectArchitecture({ project, t }: { project: FeaturedProject; t: DetailUi }) {
  const archTitle = t.architectureTechStack;

  return (
    <Motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.05 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="mb-16 sm:mb-24 space-y-6"
    >
      <div className="border-b border-white/[0.08] pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-4 h-4 text-[var(--accent-color)]" />
          <h2 className="text-lg sm:text-xl font-bold text-white font-display uppercase tracking-wide">
            {archTitle}
          </h2>
        </div>
        <span className="text-xs text-white/55 font-mono hidden sm:inline">
          PRODUCTION STACK
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        {/* Tech Tags & Categorized Stack (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#06090E]/90 border border-white/[0.08] space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-mono font-bold text-[var(--accent-color)] uppercase tracking-wider">
              {t.technologiesLibraries}
            </h3>
            <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed">
              {project.walkthrough?.architecture?.desc ||
                'Architected for high throughput, local offline resilience, and enterprise grade security.'}
            </p>
          </div>

          {/* All Tech Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white/85 font-mono hover:border-[var(--accent-color)]/50 hover:text-white transition-all"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Reliability Callouts — only verifiable, project-specific facts */}
          {PROJECT_CALLOUTS[project.slug] && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-white/80 font-mono">
                  {PROJECT_CALLOUTS[project.slug].reliability}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <Zap className="w-4 h-4 text-[var(--accent-color)] shrink-0" />
                <span className="text-xs text-white/80 font-mono">
                  {PROJECT_CALLOUTS[project.slug].engineering}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Design System Palette & Metadata (4 cols) */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#06090E]/90 border border-white/[0.08] flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider block">
              {t.interfacePalette}
            </span>
            <p className="text-xs text-white/60 font-sans leading-relaxed">
              {project.slug === 'finance-management-app'
                ? t.productionUiColorTokens
                : `${project.title}: ${t.officialDesignTokens}`}
            </p>
          </div>

          {project.dossier?.colorPalette && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {project.dossier.colorPalette.map((c, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.06] transition-all min-w-0"
                  title={`${c.name}: ${c.hex}`}
                >
                  <div
                    className="w-full h-10 rounded-lg border border-white/20 shadow-md group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div className="w-full text-center min-w-0">
                    <span className="block text-[11px] text-white font-mono font-semibold truncate tracking-tight">
                      {c.hex}
                    </span>
                    <span className="block text-[10px] text-white/50 truncate tracking-tight mt-0.5" title={c.name}>
                      {c.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Motion.section>
  );
}
