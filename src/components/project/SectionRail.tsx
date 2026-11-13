'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import type { CaseSection } from './types';

/** Smooth-scrolls to a section; its `scroll-margin-top` keeps it clear of the docked header. */
export function jumpToSection(id: string, instant = false) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { immediate: instant });
  else el.scrollIntoView({ behavior: instant ? 'auto' : 'smooth', block: 'start' });
}

/**
 * Quick-jump rail in the left gutter (wide screens only): one tick per section, the current
 * one highlighted by a scroll spy. Labels appear when the rail is hovered or focused.
 */
export default function SectionRail({ sections }: { sections: CaseSection[] }) {
  const { playHover, playClick } = useThemeAudio();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(sections[0]?.id);
  const ids = sections.map((s) => s.id).join(',');

  useEffect(() => {
    // A section is "current" while it crosses a thin band just above the middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    for (const id of ids.split(',')) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return (
    <nav
      aria-label="Case study sections"
      className="group/rail hidden xl:flex fixed left-4 2xl:left-6 top-1/2 -translate-y-1/2 z-30 flex-col font-mono select-none"
    >
      {sections.map((section) => {
        const isActive = section.id === active;
        return (
          <button
            key={section.id}
            type="button"
            aria-current={isActive ? 'true' : undefined}
            onMouseEnter={playHover}
            onClick={() => {
              playClick();
              jumpToSection(section.id, Boolean(reducedMotion));
            }}
            className="group/item relative flex items-center gap-2 py-2 pr-2 text-[11px]"
          >
            <span
              className={`tabular-nums transition-colors ${
                isActive ? 'font-bold text-[var(--accent-color)]' : 'text-[var(--text-muted)] group-hover/item:text-white'
              }`}
            >
              {section.index}
            </span>
            <span
              aria-hidden="true"
              className={`h-px transition-all duration-300 ${
                isActive
                  ? 'w-7 bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-color)]'
                  : 'w-3 bg-white/30 group-hover/item:w-5 group-hover/item:bg-white/70'
              }`}
            />
            <span
              className={`pointer-events-none absolute left-full top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[var(--bg-secondary)] px-2 py-1 uppercase tracking-widest opacity-0 -translate-x-1 transition-all duration-200 group-hover/rail:opacity-100 group-hover/rail:translate-x-0 group-focus-visible/item:opacity-100 group-focus-visible/item:translate-x-0 ${
                isActive ? 'text-[var(--accent-color)]' : 'text-white/75'
              }`}
            >
              {section.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
