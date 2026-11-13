'use client';

import { useState } from 'react';
import { ChevronDown, ShieldCheck, Zap } from 'lucide-react';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import { PROJECT_CALLOUTS } from './callouts';
import type { DetailUi, FeaturedProject } from './types';
import { CARD, LABEL, Reveal, SECTION, SectionHeading, trackSpotlight } from './ui';

/** Display names of the technology groups in `dossier.technologies` (tech terms, not translated). */
const LAYER_LABELS: Record<string, string> = {
  core: 'Core',
  frontendUI: 'Frontend / UI',
  backend: 'Backend',
  security: 'Security',
  nlpQueue: 'NLP & Queue',
  i18n: 'i18n',
  styling: 'Styling',
  api: 'API layer',
  deploy: 'Deploy',
  multimedia: 'Media',
  features: 'Features',
};

/** How the system is built: the key engineering decisions next to the stack, layer by layer. */
export default function ProjectArchitecture({ project, t, index }: { project: FeaturedProject; t: DetailUi; index: string }) {
  const { playClick } = useThemeAudio();
  // Phones show the core layer first; the remaining layers open on demand (always open from `sm` up).
  const [isStackExpanded, setIsStackExpanded] = useState(false);
  const architecture = project.walkthrough?.architecture;
  const decisions = architecture?.highlights ?? [];
  const callouts = PROJECT_CALLOUTS[project.slug];
  const palette = project.dossier?.colorPalette ?? [];

  const groups = Object.entries(project.dossier?.technologies ?? {}).filter(
    (entry): entry is [string, string[]] => Array.isArray(entry[1]) && entry[1].length > 0
  );
  // Projects without a grouped stack fall back to their flat tag list.
  const layers: [string, string[]][] = groups.length > 0 ? groups : [['core', project.tags]];

  return (
    <section id="stack" className={SECTION}>
      <Reveal>
        <SectionHeading index={index} title={t.architectureTechStack} />
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Decisions */}
        <Reveal className="lg:col-span-5">
          <article onMouseMove={trackSpotlight} className={`${CARD} h-full flex flex-col p-6 sm:p-8`}>
            {architecture?.title && (
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--heading-tint)] leading-snug">
                {architecture.title}
              </h3>
            )}
            {architecture?.desc && (
              <p className="mt-3 text-sm sm:text-[15px] text-white/70 leading-relaxed">{architecture.desc}</p>
            )}

            {decisions.length > 0 && (
              <>
                <p className={`${LABEL} mt-7`}>{t.engineeringDecisions}</p>
                <ol className="mt-3 divide-y divide-white/[0.06]">
                  {decisions.map((decision, i) => (
                    <li key={decision} className="flex items-start gap-4 py-3.5">
                      <span aria-hidden="true" className="font-mono text-xs font-bold tabular-nums text-[var(--accent-color)] pt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm sm:text-[15px] text-white/85 leading-relaxed">{decision}</span>
                    </li>
                  ))}
                </ol>
              </>
            )}

            {/* Only verifiable, project-specific facts (see callouts.ts) */}
            {callouts && (
              <div className="mt-auto pt-6 grid gap-2.5">
                <p className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] font-mono text-xs text-white/80">
                  <ShieldCheck aria-hidden="true" className="w-4 h-4 text-emerald-400 shrink-0" />
                  {callouts.reliability}
                </p>
                <p className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] font-mono text-xs text-white/80">
                  <Zap aria-hidden="true" className="w-4 h-4 text-[var(--accent-color)] shrink-0" />
                  {callouts.engineering}
                </p>
              </div>
            )}
          </article>
        </Reveal>

        {/* Stack, layer by layer */}
        <Reveal className="lg:col-span-7" delay={0.08}>
          <article onMouseMove={trackSpotlight} className={`${CARD} h-full flex flex-col p-6 sm:p-8`}>
            <p className={LABEL}>{t.technologiesLibraries}</p>

            <ol className="relative mt-4 before:absolute before:left-[3.5px] before:top-5 before:bottom-5 before:w-px before:bg-white/10">
              {layers.map(([key, items], i) => (
                <li
                  key={key}
                  className={`group relative grid-cols-1 sm:grid-cols-[8.5rem_1fr] gap-2 sm:gap-4 pl-7 pr-2 py-3.5 -mr-2 rounded-xl hover:bg-white/[0.03] transition-colors ${
                    i === 0 || isStackExpanded ? 'grid' : 'hidden sm:grid'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[1.15rem] w-2 h-2 rounded-full border border-[var(--accent-color)] bg-[var(--bg-primary)] group-hover:bg-[var(--accent-color)] group-hover:shadow-[0_0_10px_var(--accent-color)] transition-all"
                  />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)] group-hover:text-[var(--accent-color)] transition-colors sm:pt-1.5">
                    {LAYER_LABELS[key] ?? key}
                  </span>
                  <ul className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <li key={item} className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.04] font-mono text-xs text-white/85">
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            {layers.length > 1 && (
              <button
                type="button"
                aria-expanded={isStackExpanded}
                onClick={() => {
                  playClick();
                  setIsStackExpanded((open) => !open);
                }}
                className="sm:hidden mt-2 inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-white/10 bg-white/[0.03] font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent-color)]"
              >
                {isStackExpanded ? t.showLess : `${t.showFullStack} (+${layers.length - 1})`}
                <ChevronDown aria-hidden="true" className={`w-4 h-4 transition-transform ${isStackExpanded ? 'rotate-180' : ''}`} />
              </button>
            )}

            {palette.length > 0 && (
              <div className="mt-auto pt-6">
                <div className="pt-5 border-t border-white/[0.07]">
                  <p className={LABEL}>{t.interfacePalette}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
                    {palette.map((color) => (
                      <li key={color.hex + color.name} className="flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className="w-6 h-6 rounded-md border border-white/20 shadow-md"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="leading-tight">
                          <span className="block font-mono text-[11px] font-semibold text-white">{color.hex}</span>
                          <span className="block text-[11px] text-white/55">{color.name}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </article>
        </Reveal>
      </div>
    </section>
  );
}
