'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { portfolioContent } from '../../data/portfolioData';
import { Settings, X, ExternalLink, Globe, Volume2, VolumeX, Check } from 'lucide-react';
import { FaLinkedin, FaGithub, FaTelegram } from 'react-icons/fa6';

const themeOptions = [
  { id: 'acid', name: 'Acid Green', color: '#00FF9F', desc: 'Default Cyber' },
  { id: 'cyan', name: 'Neon Cyan', color: '#00F3FF', desc: 'High Contrast' },
  { id: 'amber', name: 'Solar Amber', color: '#FFB800', desc: 'Warm Matrix' },
  { id: 'crimson', name: 'Crimson Red', color: '#FF0055', desc: 'Aggressive HUD' },
  { id: 'obsidian', name: 'Obsidian White', color: '#FFFFFF', desc: 'Minimalist Luxe' },
];

export default function NavHeader() {
  const pathname = usePathname();
  const { theme, setTheme, soundEnabled, setSoundEnabled, lang, setLang, perfTier, setPerfTier, playHover, playClick } = useThemeAudio();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const menuRef = useRef(null);
  const settingsRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSettingsOpen(false);
  }, [pathname]);

  // Handle outside click & escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setIsSettingsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navLinks = [
    { href: '/', index: '1', label: 'Home' },
    { href: '/about', index: '2', label: 'About' },
    { href: '/projects', index: '3', label: 'Projects' },
    { href: '/contact', index: '4', label: 'Contact' },
  ];

  const pageMeta = {
    '/about': {
      title: 'MEET DIAS',
      breadcrumb: lang === 'ru' ? 'ОБО МНЕ' : 'ABOUT',
    },
    '/projects': {
      title: 'PROJECTS',
      breadcrumb: lang === 'ru' ? 'ПРОЕКТЫ' : 'PROJECTS',
    },
    '/contact': {
      title: 'CONTACT',
      breadcrumb: lang === 'ru' ? 'КОНТАКТЫ' : 'CONTACT',
    },
  };

  const currentNav = navLinks.find((l) => l.href === pathname) || navLinks[0];

  return (
    <>
      {/* Top Left Brand Stamp (Rendered on subpages) */}
      {pathname !== '/' && (
        <header className="fixed top-8 left-8 sm:left-12 z-40 font-mono select-none">
          <Link
            href="/"
            onMouseEnter={playHover}
            onClick={playClick}
            className="group block"
            aria-label="Dias Yermek - Home"
          >
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
      )}

      {/* Top Right Header & Breadcrumb (Rendered on subpages) */}
      {pathname !== '/' && pageMeta[pathname] && (
        <div className="fixed top-8 right-8 sm:right-12 z-40 select-none text-right">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-end gap-1.5 text-[10px] sm:text-xs font-mono tracking-widest text-[var(--text-secondary)] uppercase mb-0.5" aria-label="Breadcrumb">
            <Link href="/" onClick={playClick} onMouseEnter={playHover} className="hover:text-[var(--heading-tint)] transition-colors">
              HOME
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[var(--heading-tint)] font-bold">{pageMeta[pathname].breadcrumb}</span>
          </nav>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wider font-display leading-tight text-[var(--heading-tint)] transition-colors duration-300">
            {pageMeta[pathname].title}
          </h1>
        </div>
      )}

      {/* Bottom Right Controls: Aligned strictly to bottom line */}
      <div className="fixed bottom-3 sm:bottom-4 lg:bottom-5 right-3 sm:right-4 lg:right-5 z-40 flex items-end gap-3 font-mono select-none">
        {/* Navigation Menu Capsule & Expandable Curtain */}
        <div ref={menuRef} className="relative w-[300px] xs:w-[330px] sm:w-[360px]">
          <div
            className={`w-full rounded-2xl sm:rounded-3xl backdrop-blur-2xl transition-colors duration-300 font-mono select-none overflow-hidden border-2 box-border ${
              isMenuOpen
                ? 'bg-[#04080A]/95 border-[var(--accent-color)] shadow-[0_0_50px_var(--accent-glow)]'
                : 'bg-[var(--card-bg)] border-[var(--accent-border)] hover:border-[var(--accent-color)] shadow-2xl'
            }`}
          >
            {/* Expanded Content (Expands upwards like a curtain) */}
            <AnimatePresence initial={false}>
              {isMenuOpen && (
                <motion.div
                  key="curtain-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: {
                      height: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.4, ease: 'easeOut', delay: 0.05 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.42, ease: [0.32, 0, 0.2, 1] },
                      opacity: { duration: 0.25, ease: 'easeIn' },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 8, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="p-4 sm:p-5 pb-3 flex flex-col gap-3.5 sm:gap-4"
                  >
                    {/* 1. Header */}
                    <div className="flex items-start justify-between border-b border-[var(--border-subtle)] pb-2.5">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-[var(--heading-tint)] uppercase tracking-wider font-display">
                          Menu
                        </h3>
                        <p className="text-[10px] text-[var(--text-muted)] tracking-widest uppercase font-mono">
                          NAVIGATION
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-[var(--accent-bg-subtle)] border border-[var(--border-subtle)] text-[10px] text-[var(--accent-color)] font-bold font-mono">
                        DIR
                      </span>
                    </div>

                    {/* 2. Quick Connect Socials (2x2 Grid) */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <a
                        href="https://www.linkedin.com/in/dias-yermek/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={playHover}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-[var(--accent-bg-subtle)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] hover:text-[var(--accent-color)] text-[var(--text-secondary)] transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] shrink-0" />
                        <span className="text-xs font-mono truncate">LinkedIn</span>
                      </a>
                      <a
                        href="https://github.com/Daelijek"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={playHover}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-[var(--accent-bg-subtle)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] hover:text-[var(--accent-color)] text-[var(--text-secondary)] transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] shrink-0" />
                        <span className="text-xs font-mono truncate">GitHub</span>
                      </a>
                      <a
                        href="https://t.me/daelijek_og"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={playHover}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-[var(--accent-bg-subtle)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] hover:text-[var(--accent-color)] text-[var(--text-secondary)] transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span className="text-xs font-mono truncate">Telegram</span>
                      </a>
                      <a
                        href="mailto:dias1605ermek@gmail.com"
                        onMouseEnter={playHover}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-[var(--accent-bg-subtle)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] hover:text-[var(--accent-color)] text-[var(--text-secondary)] transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span className="text-xs font-mono truncate">Email</span>
                      </a>
                    </div>

                    {/* 3. Dev Labs Banner */}
                    <a
                      href="https://github.com/Daelijek/FinanceManagementApp"
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHover}
                      className="flex items-center justify-between p-3 rounded-xl bg-[var(--accent-bg-subtle)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] hover:text-[var(--accent-color)] text-[var(--heading-tint)] font-bold text-xs tracking-wider uppercase transition-colors"
                    >
                      <span className="font-display text-xs">DEV LABS</span>
                      <ExternalLink className="w-4 h-4 text-[var(--accent-color)]" />
                    </a>

                    {/* 4. Navigation Routes */}
                    <nav className="space-y-1.5 pt-1 border-t border-[var(--border-subtle)]">
                      {navLinks
                        .filter((item) => item.href !== pathname)
                        .map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              playClick();
                              setIsMenuOpen(false);
                            }}
                            onMouseEnter={playHover}
                            className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent-border)] bg-[var(--accent-bg-subtle)] hover:bg-[var(--accent-glow)] text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-[var(--text-muted)] font-mono">[{item.index}]</span>
                              <span className="text-sm sm:text-base font-bold uppercase tracking-wider font-display">
                                {item.label}
                              </span>
                            </div>
                            <span className="w-2 h-2 rounded-full bg-[var(--border-bright)] group-hover:bg-[var(--accent-color)] group-hover:shadow-[0_0_8px_var(--accent-color)] transition-all" />
                          </Link>
                        ))}
                    </nav>
                    {/* Fixed separator before bottom capsule */}
                    <div className="h-[1px] w-full bg-[var(--border-subtle)] mt-0.5" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Capsule Bar (Always persistent in the same position, perfectly static) */}
            <div
              onClick={() => {
                playClick();
                setIsMenuOpen((prev) => !prev);
                if (!isMenuOpen && isSettingsOpen) setIsSettingsOpen(false);
              }}
              onMouseEnter={playHover}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  playClick();
                  setIsMenuOpen((prev) => !prev);
                }
              }}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="group flex items-center justify-between pl-5 sm:pl-6 pr-2 h-[50px] sm:h-[56px] cursor-pointer"
            >
              {/* Index & Label */}
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs sm:text-sm font-mono font-bold transition-colors ${
                    isMenuOpen ? 'text-[var(--accent-color)]' : 'text-[var(--text-muted)] group-hover:text-[var(--accent-color)]'
                  }`}
                >
                  [{currentNav.index}]
                </span>
                <span
                  className={`text-base sm:text-lg font-black tracking-widest uppercase font-display transition-colors ${
                    isMenuOpen ? 'text-[var(--accent-color)]' : 'text-[var(--heading-tint)]'
                  }`}
                >
                  {currentNav.label}
                </span>
              </div>

              {/* Theme-Tinted Matrix Icon Button */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-500 shrink-0 ${
                  isMenuOpen
                    ? 'bg-[var(--heading-tint)] text-[#020504] rotate-90 shadow-[0_0_20px_var(--accent-glow)]'
                    : 'bg-[var(--heading-tint)] text-[#020504] shadow-[0_0_10px_var(--card-hover-glow)]'
                }`}
              >
                <div className="grid grid-cols-2 gap-1 w-3 h-3 items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#020504]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#020504]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#020504]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#020504]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Settings Gear Button & Modal */}
        <div ref={settingsRef} className="relative self-end">
          <button
            onClick={() => {
              playClick();
              setIsSettingsOpen(!isSettingsOpen);
              if (isMenuOpen) setIsMenuOpen(false);
            }}
            onMouseEnter={playHover}
            className={`w-[54px] h-[54px] sm:w-[60px] sm:h-[60px] rounded-2xl sm:rounded-3xl backdrop-blur-2xl border-2 transition-all flex items-center justify-center shadow-2xl box-border ${
              isSettingsOpen
                ? 'bg-[var(--accent-glow)] border-[var(--accent-color)] text-[var(--accent-color)] shadow-[0_0_30px_var(--accent-glow)]'
                : 'bg-[var(--card-bg)] border-[var(--accent-border)] hover:border-[var(--accent-color)] text-[var(--heading-tint)] hover:text-[var(--accent-color)] hover:shadow-[0_0_20px_var(--card-hover-glow)]'
            }`}
            aria-label="Global System Settings"
          >
            <Settings className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 ${isSettingsOpen ? 'rotate-90 text-[var(--accent-color)]' : 'group-hover:rotate-45'}`} />
          </button>

          {/* Settings Drawer Panel (Opens Upwards) */}
          <AnimatePresence>
            {isSettingsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 bottom-16 sm:bottom-20 w-80 bg-[#080B0E]/95 backdrop-blur-xl border border-white/15 rounded-2xl sm:rounded-3xl p-5 shadow-2xl font-mono z-50"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">System Config</h3>
                    <p className="text-[10px] text-white/40">Global Customization</p>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-[var(--accent-color)] font-bold">
                    SET
                  </span>
                </div>

                {/* Theme Selector */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-[11px] text-white/50 mb-2.5">
                    <span>[01] CORE ACCENT</span>
                    <span className="text-[var(--accent-color)] uppercase font-bold">{theme}</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg border border-white/5">
                    {themeOptions.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        onMouseEnter={playHover}
                        className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${
                          theme === t.id
                            ? 'scale-110 shadow-[0_0_12px_var(--accent-glow)] ring-2 ring-white'
                            : 'opacity-60 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: t.color }}
                        title={t.name}
                      >
                        {theme === t.id && <Check className="w-3.5 h-3.5 text-black font-bold" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Audio Engine */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-[11px] text-white/50 mb-2">
                    <span>[02] AUDIO ENGINE</span>
                    <span className="text-[var(--accent-color)]">{soundEnabled ? 'ON' : 'OFF'}</span>
                  </div>
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    onMouseEnter={playHover}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-xs transition-all ${
                      soundEnabled
                        ? 'bg-[var(--accent-glow)] border-[var(--accent-border)] text-white'
                        : 'bg-white/5 border-white/10 text-white/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {soundEnabled ? <Volume2 className="w-4 h-4 text-[var(--accent-color)]" /> : <VolumeX className="w-4 h-4" />}
                      <span>Synthesizer SFX</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/40 text-[var(--accent-color)]">
                      {soundEnabled ? 'ACTIVE' : 'MUTED'}
                    </span>
                  </button>
                </div>

                {/* Localization */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-white/50 mb-2">
                    <span>[03] LOCALE</span>
                    <span className="text-[var(--accent-color)] uppercase">{lang}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setLang('en')}
                      onMouseEnter={playHover}
                      className={`py-1.5 rounded border text-xs font-bold transition-all ${
                        lang === 'en'
                          ? 'bg-[var(--accent-color)] text-[#06080A] border-transparent shadow-[0_0_10px_var(--accent-glow)]'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => setLang('ru')}
                      onMouseEnter={playHover}
                      className={`py-1.5 rounded border text-xs font-bold transition-all ${
                        lang === 'ru'
                          ? 'bg-[var(--accent-color)] text-[#06080A] border-transparent shadow-[0_0_10px_var(--accent-glow)]'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      RU
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
