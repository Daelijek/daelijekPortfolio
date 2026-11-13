'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ListTree } from 'lucide-react';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import { jumpToSection } from './SectionRail';
import type { CaseSection } from './types';

interface SectionsMenuProps {
  sections: CaseSection[];
  /** Id of the current section (scroll spy). */
  active: string | undefined;
  /** Accessible name of the toggle ("Sections"). */
  label: string;
  className?: string;
  /** Position of the dropdown panel (it is absolutely positioned). */
  panelClassName?: string;
  /** The wrapper is the panel's anchor by default; pass '' to anchor it to an outer element. */
  wrapperClassName?: string;
}

/** Toggle + dropdown listing the page sections; picking one scrolls to it. */
export default function SectionsMenu({
  sections,
  active,
  label,
  className = '',
  panelClassName = 'right-0 w-64',
  wrapperClassName = 'relative',
}: SectionsMenuProps) {
  const { playHover, playClick } = useThemeAudio();
  const reducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  // Outside tap and Escape close the panel.
  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className={wrapperClassName}>
      <button
        type="button"
        aria-label={label}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onMouseEnter={playHover}
        onClick={() => {
          playClick();
          setIsOpen((open) => !open);
        }}
        className={className}
      >
        <ListTree aria-hidden="true" className="w-4 h-4" />
      </button>

      {isOpen && (
        <nav
          id={panelId}
          aria-label={label}
          className={`absolute z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[var(--bg-secondary)] shadow-[0_20px_50px_rgba(0,0,0,0.7)] ${panelClassName}`}
        >
          <ul className="py-1.5">
            {sections.map((section) => {
              const isActive = section.id === active;
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => {
                      playClick();
                      setIsOpen(false);
                      jumpToSection(section.id, Boolean(reducedMotion));
                    }}
                    className={`flex w-full items-center gap-3 px-4 h-12 text-left font-mono text-xs uppercase tracking-wider transition-colors ${
                      isActive ? 'bg-white/[0.05] text-[var(--accent-color)]' : 'text-white/80 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    <span className={`tabular-nums ${isActive ? 'font-bold' : 'text-[var(--text-muted)]'}`}>{section.index}</span>
                    <span>{section.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
