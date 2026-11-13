'use client';

import type { DetailUi, FeaturedProject } from './types';
import { CARD, Reveal, SECTION, SectionHeading, trackSpotlight } from './ui';

/** Core capabilities: one card per feature, each led by its number and headline metric. */
export default function ProjectCapabilities({ project, t, index }: { project: FeaturedProject; t: DetailUi; index: string }) {
  const features = project.walkthrough?.features ?? [];
  if (features.length === 0) return null;

  return (
    <section id="features" className={SECTION}>
      <Reveal>
        <SectionHeading index={index} title={t.coreCapabilities} />
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {features.map((feature, i) => (
          <Reveal key={feature.num} delay={i * 0.08}>
            <article
              onMouseMove={trackSpotlight}
              className={`${CARD} group h-full overflow-hidden p-6 sm:p-8 hover:border-[var(--card-hover-border)] transition-colors duration-300`}
            >
              {/* Oversized ghost numeral */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute z-[-1] -bottom-7 -right-1 font-display font-bold text-[8rem] leading-none text-white/[0.035] group-hover:text-white/[0.07] transition-colors duration-500 select-none"
              >
                {feature.num}
              </span>

              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs font-bold tracking-[0.18em] text-[var(--accent-color)]">{feature.num}</span>
                <span className="px-2.5 py-1 rounded-full border border-[var(--card-border)] font-mono text-[11px] font-semibold text-[var(--accent-color)] text-right">
                  {feature.metric}
                </span>
              </div>
              <h3 className="mt-6 font-display font-bold text-lg sm:text-xl text-white leading-snug">{feature.title}</h3>
              <p className="mt-3 text-sm sm:text-[15px] text-white/70 leading-relaxed">{feature.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
