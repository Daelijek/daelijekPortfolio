'use client';

import Image from 'next/image';
import { motion as Motion } from 'framer-motion';
import { ArrowDown, ExternalLink, Lock, Maximize2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import type { DetailUi, FeaturedProject } from './types';
import { EASE, HudCorners, LABEL, Reveal, SECTION, WindowBar, frameAddress, humanize } from './ui';

interface ProjectHeroProps {
  project: FeaturedProject;
  /** Short project name; the desktop <h1> lives in ProjectHeader, this one is mobile-only. */
  name: string;
  /** Second half of the title ("Personal Finance Management"), may be empty. */
  descriptor: string;
  t: DetailUi;
  /** Number of gallery screens (0 hides the "view screens" link). */
  screensCount: number;
  onOpenCover: () => void;
  onViewScreens: () => void;
}

/**
 * First screen of the case study: what it is, who built what, where to try it — then the
 * cover image with the key numbers attached underneath.
 */
export default function ProjectHero({ project, name, descriptor, t, screensCount, onOpenCover, onViewScreens }: ProjectHeroProps) {
  const { playHover, playClick } = useThemeAudio();
  const hasCode = Boolean(project.githubUrl && !project.isPrivate);
  const metrics = project.walkthrough?.impact?.metrics ?? [];
  const address = frameAddress(project);

  const specs: { label: string; value: string }[] = [
    { label: t.role, value: project.dossier?.primaryRole ?? '' },
    { label: t.platform, value: project.dossier?.targetPlatform ?? '' },
    { label: t.year, value: project.dossier?.entryYear ?? '' },
  ].filter((row) => row.value);

  return (
    <section id="overview" className={SECTION}>
      {/* Phones read pitch -> cover -> spec sheet (an image on the first screen); desktop puts the
          spec sheet beside the pitch and the cover underneath. */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-14 lg:gap-y-16">
        {/* Pitch */}
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="order-1 lg:col-span-7 flex flex-col gap-5"
        >
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-color)]">
            {project.category}
          </p>

          <h1 className="md:hidden font-display font-bold uppercase tracking-tight text-[var(--heading-tint)] text-4xl leading-[1.05] break-words">
            {name}
          </h1>

          {descriptor && (
            <p className="font-display font-semibold text-[var(--heading-tint)] text-xl sm:text-2xl lg:text-[1.75rem] leading-snug">
              {descriptor}
            </p>
          )}

          <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-[60ch]">
            {project.tagline || project.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-sm">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-2.5 h-12 px-6 rounded-xl bg-[var(--accent-color)] text-[#040608] font-bold uppercase tracking-wider hover:shadow-[0_0_28px_var(--accent-glow)] active:scale-[0.98] transition-all"
              >
                <span>{t.openLiveDemo}</span>
                <ExternalLink aria-hidden="true" className="w-4 h-4" />
              </a>
            )}
            {hasCode && (
              <a
                href={project.githubUrl ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-2.5 h-12 px-6 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/30 text-white font-bold uppercase tracking-wider active:scale-[0.98] transition-all"
              >
                <FaGithub aria-hidden="true" className="w-4 h-4" />
                <span>{t.sourceCode}</span>
              </a>
            )}
            {project.isPrivate && (
              <span className="inline-flex items-center gap-2 h-12 px-4 rounded-xl border border-dashed border-white/15 text-xs text-white/60">
                <Lock aria-hidden="true" className="w-3.5 h-3.5" />
                {t.privateRepo}
              </span>
            )}
            {screensCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  playClick();
                  onViewScreens();
                }}
                onMouseEnter={playHover}
                className="group inline-flex items-center gap-2 h-12 px-2 text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-[var(--accent-color)] transition-colors"
              >
                <span>
                  {t.viewScreens} <span className="tabular-nums text-white/40 group-hover:text-inherit">({screensCount})</span>
                </span>
                <ArrowDown aria-hidden="true" className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>
            )}
          </div>
        </Motion.div>

        {/* Spec sheet */}
        <Motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="relative order-3 lg:order-2 lg:col-span-5 self-start w-full rounded-2xl border border-white/[0.08] bg-[var(--card-bg)] backdrop-blur-sm divide-y divide-white/[0.06]"
        >
          <HudCorners />
          {specs.map((row) => (
            <div key={row.label} className="grid grid-cols-[5.5rem_1fr] sm:grid-cols-[6.5rem_1fr] gap-4 px-5 py-3.5">
              <dt className={`${LABEL} pt-0.5`}>{row.label}</dt>
              <dd className="text-sm text-white/90 leading-snug">{row.value}</dd>
            </div>
          ))}
          <div className="grid grid-cols-[5.5rem_1fr] sm:grid-cols-[6.5rem_1fr] gap-4 px-5 py-3.5">
            <dt className={`${LABEL} pt-0.5`}>{t.status}</dt>
            <dd className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {humanize(project.status)}
            </dd>
          </div>
          <div className="grid grid-cols-[5.5rem_1fr] sm:grid-cols-[6.5rem_1fr] gap-4 px-5 py-3.5">
            <dt className={`${LABEL} pt-1`}>{t.stack}</dt>
            <dd className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.04] font-mono text-xs text-white/85">
                  {tag}
                </span>
              ))}
            </dd>
          </div>
        </Motion.dl>

        {/* Cover + key numbers */}
        <Reveal className="order-2 lg:order-3 lg:col-span-12">
          <figure>
          {/* Stage + window frame: the cover reads as a picture of the product, not as this page */}
          <div className="hud-stage relative rounded-2xl sm:rounded-3xl border border-white/[0.08] p-2.5 sm:p-8 lg:p-12">
            <HudCorners />
            <button
              type="button"
              onClick={() => {
                playClick();
                onOpenCover();
              }}
              onMouseEnter={playHover}
              aria-label={`${project.title} — ${t.preview}`}
              className="group relative mx-auto flex w-full max-w-[1100px] flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-white/15 hover:border-[var(--card-hover-border)] bg-[#020407] text-left shadow-[0_24px_70px_rgba(0,0,0,0.75)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.8),0_0_40px_var(--card-hover-glow)] transition-[border-color,box-shadow] duration-300"
            >
              <WindowBar
                address={address}
                aside={
                  <Maximize2
                    aria-hidden="true"
                    className="w-3.5 h-3.5 text-white/40 group-hover:text-[var(--accent-color)] transition-colors"
                  />
                }
              />
              <span className="relative block overflow-hidden">
                {/* width/height only reserve space: `h-auto` lets every cover keep its own aspect ratio */}
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1920}
                  height={1080}
                  preload
                  draggable={false}
                  sizes="(max-width: 1240px) 92vw, 1100px"
                  className="w-full h-auto select-none transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                />
                <span className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 font-mono text-xs font-medium text-white opacity-0 translate-y-1 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-all duration-300">
                  <Maximize2 aria-hidden="true" className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                  {t.preview}
                </span>
              </span>
            </button>
          </div>

          {metrics.length > 0 && (
            <figcaption className="mt-4 sm:mt-5">
              <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
                {metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col-reverse justify-end gap-1.5 min-w-0 bg-[var(--bg-secondary)] px-4 py-5 sm:px-7 sm:py-6">
                    <dt className={LABEL}>{humanize(metric.label)}</dt>
                    <dd className="font-display font-bold text-[var(--accent-color)] text-[clamp(1.3rem,2.5vw,2.25rem)] leading-tight tracking-tight break-words">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </figcaption>
          )}
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
