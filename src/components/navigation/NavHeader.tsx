'use client';

import { useEffect, useRef, useState } from 'react';
import { Settings } from 'lucide-react';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import { useLocalizedPath } from '@/i18n/I18nProvider';
import NavMenu from './NavMenu';
import PageHeader from './PageHeader';
import SettingsPanel from './SettingsPanel';

/**
 * Site chrome: page header (brand + breadcrumb), the bottom-right menu capsule and the
 * settings gear. Owns the open/closed state so menu and settings never overlap.
 */
export default function NavHeader() {
  const { playHover, playClick } = useThemeAudio();
  const { path } = useLocalizedPath();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLDivElement>(null);
  const settingsPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Close overlays when the route changes ("adjust state on prop change" pattern, no effect).
  const [lastPath, setLastPath] = useState(path);
  if (path !== lastPath) {
    setLastPath(path);
    setIsMenuOpen(false);
    setIsSettingsOpen(false);
  }

  // Phones: the bottom dock (menu, settings, terminal) slides away while reading downwards and
  // returns on any upward scroll, near the top and at the end of the page. The state is a
  // <html data-dock-hidden> attribute, so every dock element (including the terminal trigger,
  // which lives elsewhere) follows it through CSS.
  useEffect(() => {
    const root = document.documentElement;
    if (!isMobile || isMenuOpen || isSettingsOpen) {
      root.removeAttribute('data-dock-hidden');
      return;
    }
    let lastY = window.scrollY;
    let hidden = false;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const nearEdge = y < 80 || window.innerHeight + y >= root.scrollHeight - 80;
      if (nearEdge || y - lastY < -6) hidden = false;
      else if (y - lastY > 6) hidden = true;
      lastY = y;
      root.toggleAttribute('data-dock-hidden', hidden);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
      root.removeAttribute('data-dock-hidden');
    };
  }, [isMobile, isMenuOpen, isSettingsOpen]);

  // Outside click and Escape close both overlays.
  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) setIsMenuOpen(false);
      const inSettings = settingsButtonRef.current?.contains(target) || settingsPanelRef.current?.contains(target);
      if (!inSettings) setIsSettingsOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <>
      <PageHeader />

      <div className="mobile-dock fixed bottom-3 sm:bottom-4 lg:bottom-5 right-3 sm:right-4 lg:right-5 z-50 flex items-end gap-2 xs:gap-3 font-mono select-none">
        <NavMenu
          ref={menuRef}
          isOpen={isMenuOpen}
          isMobile={isMobile}
          onToggle={() => {
            setIsMenuOpen((open) => !open);
            setIsSettingsOpen(false);
          }}
          onNavigate={() => setIsMenuOpen(false)}
        />

        {/* Settings gear: beside the menu capsule (it makes room while the menu is open on phones) */}
        <div ref={settingsButtonRef} className={`relative self-end select-none font-mono ${isMenuOpen && isMobile ? 'hidden' : ''}`}>
          <button
            type="button"
            onClick={() => {
              playClick();
              setIsSettingsOpen((open) => !open);
              setIsMenuOpen(false);
            }}
            onMouseEnter={playHover}
            aria-expanded={isSettingsOpen}
            aria-label="Global System Settings"
            className={`w-12 h-12 xs:w-[52px] xs:h-[52px] sm:w-[58px] sm:h-[58px] md:w-[60px] md:h-[60px] rounded-2xl sm:rounded-2xl md:rounded-3xl backdrop-blur-3xl border transition-all flex items-center justify-center shadow-2xl box-border ${
              isSettingsOpen
                ? 'bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.5)]'
                : 'bg-[#060a0f]/70 border-white/15 hover:border-white/35 text-[var(--heading-tint)] hover:text-white shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)]'
            }`}
          >
            <Settings
              aria-hidden="true"
              className={`w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6 transition-transform duration-500 ${isSettingsOpen ? 'rotate-90 text-black' : 'group-hover:rotate-45'}`}
            />
          </button>
        </div>
      </div>

      <SettingsPanel ref={settingsPanelRef} isOpen={isSettingsOpen} isMobile={isMobile} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
