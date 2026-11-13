'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion as Motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import { useLocalizedPath } from '@/i18n/I18nProvider';
import { useActiveSection } from './SectionRail';
import SectionsMenu from './SectionsMenu';
import type { CaseSection, DetailUi, FeaturedProject } from './types';

/** Scroll distance (px) over which the hero title travels into the bar. */
const DOCK_RANGE = 150;
/** Height of the header row; its centre lines up with the fixed brand stamp (top-left). */
const ROW_HEIGHT = 104;
/** Font size of the title once it is docked in the bar. */
const DOCKED_FONT_PX = 19;

const smoothstep = (t: number) => t * t * (3 - 2 * t);
const dockProgress = (scrollY: number) => smoothstep(Math.min(1, Math.max(0, scrollY / DOCK_RANGE)));

interface ProjectHeaderProps {
  project: FeaturedProject;
  /** Short project name (title without the descriptor). */
  name: string;
  /** Sections of this page, for the section menus (mobile bar and tablet header). */
  sections: CaseSection[];
  t: DetailUi;
}

/**
 * Page chrome of a case study:
 *  - a reading-progress beam on the top edge
 *  - a scrim that fades in on scroll, so docked chrome never collides with the content
 *  - desktop: the hero title, which shrinks into the sticky bar next to the back button
 *  - mobile: the "back to projects" button; once the hero has scrolled away, a compact bar
 *    with back, the current section, a section menu and the Demo / Code links
 *  - tablet (md..xl, no side rail): a section menu in the sticky bar
 */
export default function ProjectHeader({ project, name, sections, t }: ProjectHeaderProps) {
  const { playHover, playClick } = useThemeAudio();
  const { href } = useLocalizedPath();
  const { scrollY, scrollYProgress } = useScroll();

  const backRef = useRef<HTMLAnchorElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isDocked, setIsDocked] = useState(false);
  const [showMobileBar, setShowMobileBar] = useState(false);
  const active = useActiveSection(sections);
  const current = sections.find((section) => section.id === active) ?? sections[0];

  // Where the title lands (relative to its hero position). The hero position itself is pure
  // CSS, so the first paint is correct before any measurement.
  const dockX = useMotionValue(0);
  const dockY = useMotionValue(-ROW_HEIGHT);
  const dockScale = useMotionValue(0.25);

  useEffect(() => {
    const measure = () => {
      const back = backRef.current;
      const title = titleRef.current;
      if (!back || !title || title.offsetHeight === 0) return;

      // Fit guard: the CSS size is an estimate from the character count. If the real name is
      // wider than the row (wide glyphs, unusual names), shrink it to fit exactly.
      const page = title.closest<HTMLElement>('.case-study');
      const row = title.parentElement;
      if (page && row) {
        page.style.removeProperty('--case-title-size');
        const estimate = Number.parseFloat(getComputedStyle(title).fontSize) || 80;
        const available = row.clientWidth;
        if (title.scrollWidth > available) {
          page.style.setProperty('--case-title-size', `${Math.floor((estimate * available) / title.scrollWidth)}px`);
        }
      }

      const fontSize = Number.parseFloat(getComputedStyle(title).fontSize) || 80;
      dockX.set(back.offsetLeft + back.offsetWidth + 18);
      // From "top edge at the bottom of the row" to "centred in the row".
      dockY.set(-(ROW_HEIGHT / 2 + title.offsetHeight / 2));
      dockScale.set(Math.min(1, DOCKED_FONT_PX / fontSize));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (backRef.current) observer.observe(backRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [dockX, dockY, dockScale]);

  const titleX = useTransform([scrollY, dockX], ([y, x]: number[]) => dockProgress(y) * x);
  const titleY = useTransform([scrollY, dockY], ([y, target]: number[]) => dockProgress(y) * target);
  const titleScale = useTransform([scrollY, dockScale], ([y, s]: number[]) => 1 + dockProgress(y) * (s - 1));
  const scrimOpacity = useTransform(scrollY, [0, DOCK_RANGE], [0, 1]);

  // While the mobile bar is shown, the global brand stamp (top-left) steps aside (see globals.css).
  useEffect(() => {
    const root = document.documentElement;
    root.toggleAttribute('data-case-bar-open', showMobileBar);
    return () => root.removeAttribute('data-case-bar-open');
  }, [showMobileBar]);

  useMotionValueEvent(scrollY, 'change', (y) => {
    setIsDocked(y > DOCK_RANGE * 0.7);
    setShowMobileBar(y > window.innerHeight * 0.6);
  });

  const hasCode = Boolean(project.githubUrl && !project.isPrivate);

  return (
    <>
      {/* Reading progress */}
      <Motion.div
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 inset-x-0 z-50 h-[2px] origin-left bg-[var(--accent-color)] shadow-[0_0_12px_var(--accent-color)] pointer-events-none"
      />

      {/* Top scrim (same optical fade the other pages get from ScrollFadeMask) */}
      <Motion.div
        aria-hidden="true"
        style={{
          opacity: scrimOpacity,
          background:
            'linear-gradient(to bottom, var(--bg-primary) 0%, var(--bg-primary) 52%, color-mix(in srgb, var(--bg-primary) 82%, transparent) 70%, color-mix(in srgb, var(--bg-primary) 40%, transparent) 86%, transparent 100%)',
        }}
        className="fixed top-0 inset-x-0 z-30 h-32 md:h-36 pointer-events-none"
      />

      {/* Mobile: back button (until the compact bar takes over) */}
      <div
        inert={showMobileBar}
        className={`md:hidden fixed top-8 right-6 z-40 select-none transition-opacity duration-300 ${
          showMobileBar ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <Link
          href={href('/projects')}
          onClick={playClick}
          onMouseEnter={playHover}
          className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#080d14]/85 hover:bg-[#101722] border border-white/20 text-white backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] active:scale-95 transition-all group"
        >
          <span className="w-5 h-5 rounded-md bg-white text-black flex items-center justify-center shrink-0 group-hover:-translate-x-0.5 transition-transform">
            <ArrowLeft aria-hidden="true" className="w-3.5 h-3.5 text-black stroke-[2.5]" />
          </span>
          <span className="font-mono font-bold text-xs uppercase tracking-wider text-white">{t.projects}</span>
        </Link>
      </div>

      {/* Mobile: compact bar once the hero has scrolled away */}
      <div
        data-case-bar=""
        inert={!showMobileBar}
        className={`md:hidden fixed inset-x-0 top-0 z-[45] transition-transform duration-300 ease-out ${
          showMobileBar ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex h-14 items-center gap-1 border-b border-white/10 bg-[var(--bg-primary)]/95 px-2 backdrop-blur-xl">
          <Link
            href={href('/projects')}
            onClick={playClick}
            aria-label={t.allProjects}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white/85 active:bg-white/10"
          >
            <ArrowLeft aria-hidden="true" className="h-5 w-5" />
          </Link>
          <div className="min-w-0 flex-1 px-1">
            <p className="truncate font-display text-sm font-bold uppercase leading-tight text-[var(--heading-tint)]">{name}</p>
            {current && (
              <p className="truncate font-mono text-[11px] leading-tight text-[var(--accent-color)]">
                {current.index} / {String(sections.length).padStart(2, '0')} · {current.label}
              </p>
            )}
          </div>
          {/* Remounted when the bar hides, so the panel never reappears open */}
          <SectionsMenu
            key={String(showMobileBar)}
            sections={sections}
            active={active}
            label={t.sectionsMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white/85 active:bg-white/10"
            wrapperClassName=""
            panelClassName="inset-x-2 top-14"
          />
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              aria-label={t.openLiveDemo}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[var(--accent-color)] active:bg-white/10"
            >
              <ExternalLink aria-hidden="true" className="h-[18px] w-[18px]" />
            </a>
          )}
          {hasCode && (
            <a
              href={project.githubUrl ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              aria-label={t.sourceCode}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white/85 active:bg-white/10"
            >
              <FaGithub aria-hidden="true" className="h-[18px] w-[18px]" />
            </a>
          )}
        </div>
      </div>

      {/* Desktop: sticky bar with the docking title */}
      <header className="hidden md:block sticky top-0 z-40 w-full pointer-events-none select-none">
        <div className="w-[90%] max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="relative flex items-center justify-between gap-4" style={{ height: ROW_HEIGHT }}>
            <div style={{ paddingLeft: 'var(--case-brand-clearance)' }}>
              <Link
                ref={backRef}
                href={href('/projects')}
                onClick={playClick}
                onMouseEnter={playHover}
                aria-label={t.allProjects}
                className="pointer-events-auto inline-flex items-center gap-2 h-10 px-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/25 text-white/80 hover:text-white transition-colors group backdrop-blur-sm"
              >
                <ArrowLeft aria-hidden="true" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden lg:inline font-mono font-semibold uppercase tracking-wider text-xs">{t.allProjects}</span>
              </Link>
            </div>

            {/* Hero title: sits under the bar at the top of the page, docks beside the back button on scroll */}
            <Motion.div
              ref={titleRef}
              data-case-title=""
              style={{ x: titleX, y: titleY, scale: titleScale, transformOrigin: '0% 50%', top: ROW_HEIGHT }}
              className="absolute left-0 will-change-transform pointer-events-auto text-[length:var(--case-title-size)]"
            >
              <h1 className="font-display font-bold uppercase tracking-tight leading-none whitespace-nowrap text-[var(--heading-tint)]">
                {name}
              </h1>
            </Motion.div>

            {/* Right: case number, plus quick links once the hero buttons have scrolled away */}
            <div className="relative z-10 flex items-center gap-2.5 font-mono text-xs">
              {/* Tablet: no side rail, so the sections live in a menu here */}
              <div className="pointer-events-auto xl:hidden">
                <SectionsMenu
                  sections={sections}
                  active={active}
                  label={t.sectionsMenu}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[var(--bg-secondary)] text-white/80 hover:border-white/25 hover:text-white transition-colors"
                />
              </div>
              <span className="px-2.5 h-7 inline-flex items-center rounded-full border border-[var(--card-border)] bg-[var(--bg-primary)] text-[var(--accent-color)] font-bold text-[11px] tracking-wider">
                {project.num}
              </span>
              <div
                className={`flex items-center gap-2.5 transition-opacity duration-300 ${
                  isDocked ? 'opacity-100 pointer-events-auto' : 'opacity-0 invisible'
                }`}
              >
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-[var(--accent-color)] text-[#040608] font-bold tracking-wider uppercase hover:shadow-[0_0_20px_var(--accent-glow)] active:scale-95 transition-all"
                  >
                    <span>{t.live}</span>
                    <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
                  </a>
                )}
                {hasCode && (
                  <a
                    href={project.githubUrl ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-surface)] border border-white/10 hover:border-white/25 text-white/85 hover:text-white font-bold uppercase tracking-wider transition-colors"
                  >
                    <FaGithub aria-hidden="true" className="w-3.5 h-3.5" />
                    <span>{t.code}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
