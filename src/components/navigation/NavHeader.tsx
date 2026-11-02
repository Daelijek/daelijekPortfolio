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

      <div className="fixed bottom-3 sm:bottom-4 lg:bottom-5 right-3 sm:right-4 lg:right-5 z-50 flex items-end gap-3 font-mono select-none">
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

        {/* Settings gear (vertically centred on the right edge on mobile) */}
        <div
          ref={settingsButtonRef}
          className={`fixed right-2.5 xs:right-3.5 top-1/2 -translate-y-1/2 md:translate-y-0 md:relative md:top-auto md:right-auto md:self-end select-none font-mono transition-opacity duration-300 z-30 ${
            isMenuOpen ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100'
          }`}
        >
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
            className={`w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-[60px] md:h-[60px] rounded-xl sm:rounded-2xl md:rounded-3xl backdrop-blur-3xl border transition-all flex items-center justify-center shadow-2xl box-border ${
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
