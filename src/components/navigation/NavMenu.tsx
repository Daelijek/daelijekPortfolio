'use client';

import { forwardRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { FileDown } from 'lucide-react';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import { useAstanaClock } from '@/hooks/useAstanaClock';
import { useI18n, useLocalizedPath } from '@/i18n/I18nProvider';
import { SOCIAL_LINKS, getNavItems } from './navItems';

interface NavMenuProps {
  isOpen: boolean;
  isMobile: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}

/** Bottom-right capsule showing the current page; expands upwards into the site menu. */
const NavMenu = forwardRef<HTMLDivElement, NavMenuProps>(function NavMenu({ isOpen, isMobile, onToggle, onNavigate }, ref) {
  const { playHover, playClick, playDownload } = useThemeAudio();
  const { common: content } = useI18n();
  const { path, href } = useLocalizedPath();
  const astanaTime = useAstanaClock();
  const [cvDownloaded, setCvDownloaded] = useState(false);

  const navItems = getNavItems(content.nav);
  const current = navItems.find((item) => item.href === path) ?? navItems[0];
  // Other routes, counting upwards towards the capsule.
  const otherRoutes = navItems.filter((item) => item.href !== path).sort((a, b) => Number(b.index) - Number(a.index));

  const handleDownloadCv = () => {
    playDownload();
    setCvDownloaded(true);
    setTimeout(() => setCvDownloaded(false), 2600);
  };

  return (
    <div
      ref={ref}
      style={{
        width: isOpen ? (isMobile ? 'calc(100vw - 24px)' : '380px') : isMobile ? '205px' : '260px',
        transition: isOpen ? 'width 0.38s cubic-bezier(0.16, 1, 0.3, 1)' : 'width 0.28s cubic-bezier(0.32, 0, 0.2, 1)',
      }}
      className="relative"
    >
      <div
        className={`w-full rounded-2xl sm:rounded-3xl backdrop-blur-3xl transition-all duration-300 font-mono select-none overflow-hidden border box-border ${
          isOpen
            ? 'bg-[#060a0f]/80 border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.35),inset_0_0_40px_rgba(255,255,255,0.02)]'
            : 'bg-[#060a0f]/70 border-white/15 hover:border-white/35 shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)]'
        }`}
      >
        {/* Expanded content: height animates together with the width above */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="curtain-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: 'auto',
                opacity: 1,
                transition: {
                  height: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.25, ease: 'easeOut' },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.28, ease: [0.32, 0, 0.2, 1] },
                  opacity: { duration: 0.18, ease: 'easeIn' },
                },
              }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut', delay: 0.05 }}
                className="w-[calc(100vw-24px)] md:w-[380px] max-w-[calc(100vw-24px)] p-4 sm:p-5 pb-0 sm:pb-0 flex flex-col gap-3.5 sm:gap-4 box-border"
              >
                {/* Header */}
                <div className="flex items-start justify-between border-b border-[var(--border-subtle)] pb-2.5">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[var(--heading-tint)] uppercase tracking-wider font-display">
                      {content.nav.menuTitle}
                    </h3>
                    <p className="text-[10px] text-[var(--text-muted)] tracking-widest uppercase font-mono">{content.nav.menuSub}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-[var(--accent-bg-subtle)] border border-[var(--border-subtle)] text-[10px] text-[var(--accent-color)] font-bold font-mono">
                    DIR
                  </span>
                </div>

                {/* Local time */}
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] px-0.5">
                  <span className="text-[10px] tracking-widest uppercase">{content.system.localTime}</span>
                  <span className="text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1.5" suppressHydrationWarning>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-pulse" />
                    {content.system.astanaCity} {astanaTime.toLowerCase() || '12:00 pm'}
                  </span>
                </div>

                {/* Social links with moving border light ray on hover */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHover}
                      className={`relative flex items-center gap-2 p-2.5 rounded-xl bg-[var(--accent-bg-subtle)] border border-[var(--border-subtle)] hover:border-transparent ${link.hover} text-[var(--text-secondary)] transition-all group overflow-visible`}
                    >
                      <div className="nav-border-beam-mask opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                        <div className={`nav-border-beam-ray ${link.beam}`} />
                      </div>
                      <span className={`relative z-10 w-1.5 h-1.5 rounded-full ${link.dot} shrink-0`} />
                      <span className="relative z-10 text-xs font-mono truncate">{link.name}</span>
                    </a>
                  ))}
                </div>

                {/* CV download (for recruiters) */}
                <a
                  href="/api/cv"
                  download="Dias_Yermek_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDownloadCv}
                  onMouseEnter={playHover}
                  className="flex items-center justify-between p-3 rounded-xl bg-[var(--accent-bg-subtle)] border-2 border-[var(--accent-color)] hover:bg-[var(--accent-glow)] text-[var(--heading-tint)] font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_var(--accent-glow)] group hover:scale-[1.01]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent-color)] text-[#020504] flex items-center justify-center shrink-0 shadow-md">
                      <FileDown aria-hidden="true" className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-mono text-xs text-[var(--heading-tint)] group-hover:text-[var(--accent-color)] transition-colors">
                        {cvDownloaded ? content.nav.cvDownloaded : content.nav.downloadCv}
                      </span>
                      <span className="block text-[10px] text-[var(--text-muted)] font-mono tracking-widest">{content.nav.cvSubtitle}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--accent-color)] tracking-widest px-2 py-0.5 rounded bg-black/60 border border-[var(--accent-border)] shrink-0">
                    PDF · 2P
                  </span>
                </a>

                <div className="h-[1px] w-full bg-[var(--border-subtle)]" />

                <nav className="space-y-1.5">
                  {otherRoutes.map((item) => (
                    <Link
                      key={item.href}
                      href={href(item.href)}
                      onClick={() => {
                        playClick();
                        onNavigate();
                      }}
                      onMouseEnter={playHover}
                      className="relative flex items-center justify-between p-3 rounded-xl border border-[var(--border-subtle)] hover:border-transparent bg-[var(--accent-bg-subtle)] hover:bg-[var(--accent-glow)]/15 text-[var(--text-secondary)] hover:text-[var(--accent-color)] hover:shadow-[0_0_20px_var(--accent-glow)] transition-all group overflow-visible"
                    >
                      <div className="nav-border-beam-mask opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                        <div className="nav-border-beam-ray" />
                      </div>
                      <div className="flex items-center gap-3 relative z-10">
                        <span className="text-xs text-[var(--text-muted)] font-mono">[{item.index}]</span>
                        <span className="text-sm sm:text-base font-bold uppercase tracking-wider font-display">{item.label}</span>
                      </div>
                      <span className="relative z-10 w-2 h-2 rounded-full bg-[var(--border-bright)] group-hover:bg-[var(--accent-color)] group-hover:shadow-[0_0_8px_var(--accent-color)] transition-all" />
                    </Link>
                  ))}
                </nav>

                <div className="h-[1px] w-full bg-[var(--border-subtle)] mt-1 sm:mt-1.5" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Capsule bar: always in the same position */}
        <button
          type="button"
          onClick={() => {
            playClick();
            onToggle();
          }}
          onMouseEnter={playHover}
          aria-expanded={isOpen}
          className="group w-full flex items-center justify-between pl-4 xs:pl-5 sm:pl-6 pr-1.5 xs:pr-2 h-[48px] xs:h-[52px] sm:h-[58px] cursor-pointer gap-2 xs:gap-3 text-left"
        >
          <span className="flex items-center gap-2 xs:gap-3">
            <span
              className={`text-xs sm:text-sm font-mono font-bold transition-colors ${
                isOpen ? 'text-[var(--accent-color)]' : 'text-[var(--text-muted)] group-hover:text-[var(--accent-color)]'
              }`}
            >
              [{current.index}]
            </span>
            <span
              className={`text-sm xs:text-base sm:text-lg font-black tracking-widest uppercase font-display transition-colors ${
                isOpen ? 'text-[var(--accent-color)]' : 'text-[var(--heading-tint)]'
              }`}
            >
              {current.label}
            </span>
            {/* Accessible name = visible label + this hint (an aria-label would replace the visible text) */}
            <span className="sr-only">{isOpen ? ' — close navigation menu' : ' — open navigation menu'}</span>
          </span>

          <span
            className={`w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-500 shrink-0 ${
              isOpen ? 'bg-white text-black rotate-90 shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'bg-[var(--heading-tint)] text-[#020504] shadow-[0_0_10px_var(--card-hover-glow)]'
            }`}
          >
            <svg className="w-4 h-4 xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5 transition-colors" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <circle cx="6" cy="6" r="2.7" />
              <circle cx="14" cy="6" r="2.7" />
              <circle cx="6" cy="14" r="2.7" />
              <circle cx="14" cy="14" r="2.7" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
});

export default NavMenu;
