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
  { id: 'obsidian', name: 'Obsidian White', color: '#FFFFFF', desc: 'Minimalist Luxe' },
  { id: 'cyan', name: 'Neon Cyan', color: '#00F3FF', desc: 'High Contrast' },
  { id: 'acid', name: 'Acid Green', color: '#00FF9F', desc: 'Default Cyber' },
  { id: 'amber', name: 'Solar Amber', color: '#FFB800', desc: 'Warm Matrix' },
  { id: 'crimson', name: 'Crimson Red', color: '#FF0055', desc: 'Aggressive HUD' },
];

export default function NavHeader() {
  const pathname = usePathname();
  const {
    theme,
    setTheme,
    soundEnabled,
    setSoundEnabled,
    audioProfile,
    setAudioProfile,
    lang,
    setLang,
    perfTier,
    setPerfTier,
    playHover,
    playClick,
  } = useThemeAudio();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const menuRef = useRef(null);
  const settingsRef = useRef(null);
  const settingsModalRef = useRef(null);

  // Resize listener for responsive animation values
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Live local time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Almaty',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).toLowerCase()
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

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
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target) &&
        (!settingsModalRef.current || !settingsModalRef.current.contains(e.target))
      ) {
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
  const otherRoutes = navLinks
    .filter((item) => item.href !== pathname)
    .sort((a, b) => Number(b.index) - Number(a.index));

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
      <div className="fixed bottom-3 sm:bottom-4 lg:bottom-5 right-3 sm:right-4 lg:right-5 z-50 flex items-end gap-3 font-mono select-none">
        {/* Navigation Menu Capsule & Expandable Curtain with Two-Phase Width->Height Animation */}
        <div
          ref={menuRef}
          style={{
            width: isMenuOpen
              ? (isMobile ? 'calc(100vw - 24px)' : '380px')
              : (isMobile ? '205px' : '260px'),
            transition: `width 0.42s cubic-bezier(0.22, 1, 0.36, 1) ${isMenuOpen ? '0s' : '0.35s'}`,
          }}
          className="relative"
        >
          <div
            className={`w-full rounded-2xl sm:rounded-3xl backdrop-blur-2xl transition-colors duration-300 font-mono select-none overflow-hidden border-2 box-border ${
              isMenuOpen
                ? 'bg-[#04080A]/95 border-[var(--accent-color)] shadow-[0_0_50px_var(--accent-glow)]'
                : 'bg-[var(--card-bg)] border-[var(--accent-border)] hover:border-[var(--accent-color)] shadow-2xl'
            }`}
          >
            {/* Expanded Content (Expands upwards after width reaches full expansion) */}
            <AnimatePresence initial={false}>
              {isMenuOpen && (
                <motion.div
                  key="curtain-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: {
                      height: { duration: 0.42, delay: 0.42, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.32, delay: 0.48, ease: 'easeOut' },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.32, ease: [0.32, 0, 0.2, 1] },
                      opacity: { duration: 0.2, ease: 'easeIn' },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 8, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.44 }}
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

                    {/* Local Time Bar */}
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] px-0.5">
                      <span className="text-[10px] tracking-widest uppercase">LOCAL TIME</span>
                      <span className="text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1.5" suppressHydrationWarning>
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-pulse" />
                        Astana {currentTime || '12:00 pm'}
                      </span>
                    </div>

                    {/* 2. Quick Connect Socials (2x2 Grid matching reference) */}
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
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                        <span className="text-xs font-mono truncate">Github</span>
                      </a>
                      <a
                        href="https://www.upwork.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={playHover}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-[var(--accent-bg-subtle)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] hover:text-[var(--accent-color)] text-[var(--text-secondary)] transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span className="text-xs font-mono truncate">Upwork</span>
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

                    {/* 4. Navigation Routes (Counting upwards towards bottom bar) */}
                    <nav className="space-y-1.5 pt-1 border-t border-[var(--border-subtle)]">
                      {otherRoutes.map((item) => (
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
              className="group flex items-center justify-between pl-4 xs:pl-5 sm:pl-6 pr-1.5 xs:pr-2 h-[46px] xs:h-[50px] sm:h-[56px] cursor-pointer gap-2 xs:gap-3"
            >
              {/* Index & Label */}
              <div className="flex items-center gap-2 xs:gap-3">
                <span
                  className={`text-xs sm:text-sm font-mono font-bold transition-colors ${
                    isMenuOpen ? 'text-[var(--accent-color)]' : 'text-[var(--text-muted)] group-hover:text-[var(--accent-color)]'
                  }`}
                >
                  [{currentNav.index}]
                </span>
                <span
                  className={`text-sm xs:text-base sm:text-lg font-black tracking-widest uppercase font-display transition-colors ${
                    isMenuOpen ? 'text-[var(--accent-color)]' : 'text-[var(--heading-tint)]'
                  }`}
                >
                  {currentNav.label}
                </span>
              </div>

              {/* Theme-Tinted Matrix Icon Button */}
              <div
                className={`w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-500 shrink-0 ${
                  isMenuOpen
                    ? 'bg-white text-black rotate-90 shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                    : 'bg-[var(--heading-tint)] text-[#020504] shadow-[0_0_10px_var(--card-hover-glow)]'
                }`}
              >
                <div className="grid grid-cols-2 gap-1 w-2.5 h-2.5 xs:w-3 xs:h-3 items-center justify-center">
                  <span className="w-1 xs:w-1.5 h-1 xs:h-1.5 rounded-full bg-[#020504]" />
                  <span className="w-1 xs:w-1.5 h-1 xs:h-1.5 rounded-full bg-[#020504]" />
                  <span className="w-1 xs:w-1.5 h-1 xs:h-1.5 rounded-full bg-[#020504]" />
                  <span className="w-1 xs:w-1.5 h-1 xs:h-1.5 rounded-full bg-[#020504]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Settings Gear Button */}
        <div
          ref={settingsRef}
          className={`fixed right-2.5 xs:right-3.5 top-1/2 -translate-y-1/2 md:translate-y-0 md:relative md:top-auto md:right-auto md:self-end select-none font-mono transition-opacity duration-300 z-30 ${
            isMenuOpen ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100'
          }`}
        >
          <button
            onClick={() => {
              playClick();
              setIsSettingsOpen(!isSettingsOpen);
              if (isMenuOpen) setIsMenuOpen(false);
            }}
            onMouseEnter={playHover}
            className={`w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-[60px] md:h-[60px] rounded-xl sm:rounded-2xl md:rounded-3xl backdrop-blur-2xl border-2 transition-all flex items-center justify-center shadow-2xl box-border ${
              isSettingsOpen
                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                : 'bg-[var(--card-bg)] border-[var(--accent-border)] hover:border-[var(--accent-color)] text-[var(--heading-tint)] hover:text-[var(--accent-color)] hover:shadow-[0_0_20px_var(--card-hover-glow)]'
            }`}
            aria-label="Global System Settings"
          >
            <Settings className={`w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6 transition-transform duration-500 ${isSettingsOpen ? 'rotate-90 text-black' : 'group-hover:rotate-45'}`} />
          </button>
        </div>
      </div>

      {/* Global Settings Drawer Panel: Centered and fully visible on mobile, above button on desktop */}
      <AnimatePresence>
        {isSettingsOpen && (
          <>
            {/* Mobile Backdrop (dimmed without blur so background remains clear) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
            />

            <motion.div
              ref={settingsModalRef}
              initial={{ opacity: 0, scale: 0.94, x: isMobile ? '-50%' : 0, y: isMobile ? '-50%' : 0 }}
              animate={{ opacity: 1, scale: 1, x: isMobile ? '-50%' : 0, y: isMobile ? '-50%' : 0 }}
              exit={{ opacity: 0, scale: 0.94, x: isMobile ? '-50%' : 0, y: isMobile ? '-50%' : 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-1/2 top-1/2 w-[calc(100vw-36px)] max-w-[325px] md:left-auto md:top-auto md:bottom-24 lg:bottom-[98px] md:right-4 lg:right-5 md:w-80 md:max-w-xs bg-[#070b10]/80 backdrop-blur-2xl border border-white/20 rounded-2xl sm:rounded-3xl p-3.5 xs:p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_0_30px_rgba(255,255,255,0.02)] font-mono z-50 max-h-[85vh] overflow-y-auto"
            >
              {/* Header matching reference with close button */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5">
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider font-display">System</h3>
                  <p className="text-[9px] text-white/40 tracking-widest font-mono uppercase">GLOBAL CONFIG</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-white/10 border border-white/15 text-[9px] text-white font-mono font-bold">
                    SET
                  </span>
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                    aria-label="Close settings"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* [01] Core Theme Selector with dot indicators matching reference */}
              <div className="mb-2.5">
                <div className="flex items-center justify-between text-[10px] text-white/50 mb-1.5 font-mono">
                  <span>[01] CORE THEME</span>
                  <span className="text-[10px] text-white/40 font-mono">V_1.0</span>
                </div>
                <div className="flex items-center justify-between bg-white/5 p-1.5 rounded-xl border border-white/10">
                  {themeOptions.map((t) => {
                    const isSelected = theme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        onMouseEnter={playHover}
                        className={`relative flex items-center justify-center transition-all ${
                          isSelected
                            ? 'w-7 h-7 rounded-lg border-2 border-white/80 bg-white/10'
                            : 'w-6 h-6 hover:scale-110 opacity-70 hover:opacity-100'
                        }`}
                        title={t.name}
                      >
                        <span
                          className="w-3 h-3 rounded-full transition-transform"
                          style={{ backgroundColor: t.color }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* [02] Audio Engine cards matching reference */}
              <div className="mb-2.5">
                <div className="flex items-center justify-between text-[10px] text-white/50 mb-1.5 font-mono">
                  <span>[02] AUDIO ENGINE</span>
                  <span className="text-[10px] text-[var(--accent-color)] font-bold">{soundEnabled ? 'ON' : 'OFF'}</span>
                </div>
                <div className="space-y-1.5">
                  {/* Default card */}
                  <button
                    onClick={() => {
                      if (!soundEnabled) setSoundEnabled(true);
                      setAudioProfile('default');
                    }}
                    onMouseEnter={playHover}
                    className={`w-full flex items-center justify-between p-2 rounded-xl border text-left transition-all ${
                      soundEnabled && audioProfile === 'default'
                        ? 'bg-white/10 border-white/30 text-white shadow-md'
                        : 'bg-white/5 border-white/5 text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-white">Default</p>
                      <p className="text-[9px] text-white/40 tracking-wider font-mono">AMBIENT / LO-FI</p>
                    </div>
                    {soundEnabled && audioProfile === 'default' && (
                      <div className="flex items-center gap-0.5">
                        <span className="w-0.5 h-2.5 bg-[var(--accent-color)] animate-pulse" />
                        <span className="w-0.5 h-3.5 bg-[var(--accent-color)] animate-pulse delay-75" />
                        <span className="w-0.5 h-2 bg-[var(--accent-color)] animate-pulse delay-150" />
                      </div>
                    )}
                  </button>

                  {/* Digital Minimalism card */}
                  <button
                    onClick={() => {
                      if (!soundEnabled) setSoundEnabled(true);
                      setAudioProfile('minimal');
                    }}
                    onMouseEnter={playHover}
                    className={`w-full flex items-center justify-between p-2 rounded-xl border text-left transition-all ${
                      soundEnabled && audioProfile === 'minimal'
                        ? 'bg-white/10 border-white/30 text-white shadow-md'
                        : 'bg-white/5 border-white/5 text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-white">Digital Minimalism</p>
                      <p className="text-[9px] text-white/40 tracking-wider font-mono">SYNTHWAVE / RETRO</p>
                    </div>
                    {soundEnabled && audioProfile === 'minimal' && (
                      <div className="flex items-center gap-0.5">
                        <span className="w-0.5 h-2.5 bg-cyan-400 animate-pulse" />
                        <span className="w-0.5 h-3.5 bg-cyan-400 animate-pulse delay-75" />
                        <span className="w-0.5 h-2 bg-cyan-400 animate-pulse delay-150" />
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* [03] Performance Tier buttons matching reference */}
              <div className="mb-2.5">
                <div className="flex items-center justify-between text-[10px] text-white/50 mb-1.5 font-mono">
                  <span>[03] PERFORMANCE TIER</span>
                  <span className="text-[10px] text-white/40 font-mono">SYS</span>
                </div>
                <div className="grid grid-cols-3 gap-1 p-1 bg-white/5 rounded-xl border border-white/5 font-mono">
                  {['high', 'medium', 'saver'].map((tier) => {
                    const isActive = (perfTier || 'high').toLowerCase() === tier;
                    const labels = { high: 'High', medium: 'Medium', saver: 'Saver' };
                    return (
                      <button
                        key={tier}
                        onClick={() => setPerfTier(tier)}
                        onMouseEnter={playHover}
                        className={`py-1 rounded-lg text-[10px] font-bold transition-all uppercase tracking-wider ${
                          isActive
                            ? 'bg-white/20 text-white border border-white/30 shadow'
                            : 'text-white/40 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {labels[tier]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* System Active Status Indicator matching reference */}
              <div className="flex items-center justify-center gap-2 py-1 text-[9px] text-white/40 tracking-widest font-mono border-t border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-ping" />
                <span>SYSTEM ACTIVE</span>
              </div>

              {/* Localization & Replay Boot Sequence (Compact bottom bar) */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2 font-mono">
                <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
                  <button
                    onClick={() => setLang('en')}
                    onMouseEnter={playHover}
                    className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all ${
                      lang === 'en'
                        ? 'bg-[var(--accent-color)] text-[#06080A]'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLang('ru')}
                    onMouseEnter={playHover}
                    className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all ${
                      lang === 'ru'
                        ? 'bg-[var(--accent-color)] text-[#06080A]'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    RU
                  </button>
                </div>

                <button
                  onClick={() => {
                    playClick();
                    sessionStorage.removeItem('daelijek_booted');
                    window.location.href = '/';
                  }}
                  onMouseEnter={playHover}
                  className="px-2.5 py-1 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--accent-border)] bg-[var(--accent-bg-subtle)] hover:bg-[var(--accent-glow)] text-[var(--heading-tint)] hover:text-[var(--accent-color)] text-[9px] font-bold tracking-wider uppercase transition-all flex items-center gap-1"
                >
                  <span>REPLAY BOOT</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </>
  );
}

