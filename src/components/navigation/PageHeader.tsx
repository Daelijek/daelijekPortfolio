'use client';

import Link from 'next/link';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import { useI18n, useLocalizedPath } from '@/i18n/I18nProvider';

type TitledPage = '/about' | '/projects' | '/contact';
const TITLED_PAGES: TitledPage[] = ['/about', '/projects', '/contact'];
const isTitledPage = (path: string): path is TitledPage => (TITLED_PAGES as string[]).includes(path);

/** Brand stamp (top-left) and breadcrumb + page title (top-right) on every page except home. */
export default function PageHeader() {
  const { playHover, playClick } = useThemeAudio();
  const { common } = useI18n();
  const { path, href } = useLocalizedPath();
  if (path === '/') return null;

  const page = isTitledPage(path) ? path.slice(1) as 'about' | 'projects' | 'contact' : null;

  return (
    <>
      <header className="brand-stamp fixed top-8 left-8 sm:left-12 z-40 font-mono select-none transition-opacity duration-300">
        <Link href={href('/')} onMouseEnter={playHover} onClick={playClick} className="group block">
          <div className="flex items-center gap-3.5">
            <div className="text-right">
              <span className="block text-sm sm:text-base font-extrabold text-[var(--heading-tint)] group-hover:text-[var(--accent-color)] transition-colors leading-tight">
                Dias
              </span>
              <span className="block text-sm sm:text-base font-extrabold text-[var(--heading-tint)] group-hover:text-[var(--accent-color)] transition-colors leading-tight">
                Yermek
              </span>
            </div>
            <div className="w-[1.5px] h-7 bg-white/20 group-hover:bg-[var(--accent-color)] transition-colors" />
            <div className="text-left text-xs sm:text-sm text-[var(--text-secondary)] leading-tight">
              <span className="block">Portfolio</span>
              <span className="block font-bold text-[var(--heading-tint)]">2026</span>
            </div>
          </div>
        </Link>
      </header>

      {/* Breadcrumb + title; hidden on mobile to avoid overlapping content */}
      {page && (
        <div className="hidden sm:block fixed top-8 right-8 sm:right-12 z-40 select-none text-right">
          <nav
            className="flex items-center justify-end gap-1.5 text-[10px] sm:text-xs font-mono tracking-widest text-[var(--text-secondary)] uppercase mb-0.5"
            aria-label="Breadcrumb"
          >
            <Link href={href('/')} onClick={playClick} onMouseEnter={playHover} className="hover:text-[var(--heading-tint)] transition-colors">
              HOME
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[var(--heading-tint)] font-bold">{common.nav.breadcrumbs[page]}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wider font-display leading-tight text-[var(--heading-tint)] transition-colors duration-300">
            {common.nav.pageTitles[page]}
          </h1>
        </div>
      )}
    </>
  );
}
