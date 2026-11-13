'use client';

import { ArrowRight, CheckCircle2, Users } from 'lucide-react';
import type { DetailUi, FeaturedProject } from './types';
import { CARD, LABEL, Reveal, SECTION, SectionHeading, trackSpotlight } from './ui';

const BODY = 'text-[15px] sm:text-base text-white/80 leading-[1.75] max-w-[64ch]';

/** Problem -> solution -> role, as three cards under a one-sentence summary of the case. */
export default function ProjectNarrative({ project, t, index }: { project: FeaturedProject; t: DetailUi; index: string }) {
  const { overview } = project;
  const outcomes = project.walkthrough?.concept?.highlights ?? [];
  const roleTitle = project.dossier?.primaryRole;

  return (
    <section id="story" className={SECTION}>
      <Reveal>
        <SectionHeading index={index} title={t.challengeAndSolution} />
        <p className="font-display font-semibold text-[var(--heading-tint)] text-lg sm:text-2xl lg:text-3xl leading-snug max-w-[48ch] mb-8 sm:mb-14">
          {overview?.lead || project.description}
        </p>
      </Reveal>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* 01 — the problem */}
        {overview?.challenge && (
          <Reveal className="lg:col-span-5">
            <article onMouseMove={trackSpotlight} className={`${CARD} h-full flex flex-col p-6 sm:p-8`}>
              <h3 className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-amber-400">
                <span aria-hidden="true" className="tabular-nums">01</span>
                <span aria-hidden="true" className="h-px w-5 bg-amber-400/60" />
                {t.theChallenge}
              </h3>
              <p className={`${BODY} mt-5`}>{overview.challenge}</p>

              {overview.targetAudience && (
                <div className="mt-auto pt-6">
                  <div className="flex items-start gap-3 pt-5 border-t border-white/[0.07]">
                    <Users aria-hidden="true" className="w-4 h-4 text-amber-400/90 shrink-0 mt-0.5" />
                    <div>
                      <p className={LABEL}>{t.targetAudience}</p>
                      <p className="mt-1.5 text-sm text-white/70 leading-relaxed">{overview.targetAudience}</p>
                    </div>
                  </div>
                </div>
              )}
            </article>
          </Reveal>
        )}

        {/* Flow marker on the seam between the two cards */}
        {overview?.challenge && overview?.solution && (
          <span
            aria-hidden="true"
            className="hidden lg:flex absolute z-10 top-6 w-9 h-9 -translate-x-1/2 items-center justify-center rounded-full border border-[var(--border-bright)] bg-[var(--bg-primary)] text-[var(--accent-color)] shadow-[0_0_18px_var(--card-hover-glow)]"
            style={{ left: 'calc((100% - 13.75rem) * 5 / 12 + 5.625rem)' }}
          >
            <ArrowRight className="w-4 h-4" />
          </span>
        )}

        {/* 02 — the answer */}
        {overview?.solution && (
          <Reveal className="lg:col-span-7" delay={0.08}>
            <article
              onMouseMove={trackSpotlight}
              className="hud-card h-full rounded-2xl sm:rounded-3xl border border-[var(--border-bright)] bg-[var(--card-bg)] p-6 sm:p-8 lg:pl-10"
            >
              <h3 className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-color)]">
                <span aria-hidden="true" className="tabular-nums">02</span>
                <span aria-hidden="true" className="h-px w-5 bg-[var(--accent-border)]" />
                {t.theSolution}
              </h3>
              <p className={`${BODY} mt-5 text-white/90`}>{overview.solution}</p>

              {outcomes.length > 0 && (
                <ul className="mt-6 pt-6 border-t border-white/[0.07] grid gap-3">
                  {outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3 text-sm sm:text-[15px] text-white/85 leading-relaxed">
                      <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-[var(--accent-color)] shrink-0 mt-1" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </Reveal>
        )}

        {/* 03 — what I did */}
        {overview?.myRole && (
          <Reveal className="lg:col-span-12">
            <article
              onMouseMove={trackSpotlight}
              className={`${CARD} grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-5 p-6 sm:p-8`}
            >
              <div className="lg:col-span-5">
                <h3 className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                  <span aria-hidden="true" className="tabular-nums">03</span>
                  <span aria-hidden="true" className="h-px w-5 bg-white/30" />
                  {t.myRole}
                </h3>
                {roleTitle && (
                  <p className="mt-4 font-display font-bold text-lg sm:text-xl text-[var(--heading-tint)] leading-snug lg:pr-6">
                    {roleTitle}
                  </p>
                )}
              </div>
              <p className={`${BODY} lg:col-span-7 lg:pl-2`}>{overview.myRole}</p>
            </article>
          </Reveal>
        )}
      </div>
    </section>
  );
}
