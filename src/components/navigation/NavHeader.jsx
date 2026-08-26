'use client';

import React, { useState, useEffect } from 'react';
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

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSettingsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', index: '1', label: 'Home' },
    { href: '/about', index: '2', label: 'About' },
    { href: '/projects', index: '3', label: 'Projects' },
    { href: '/contact', index: '4', label: 'Contact' },
  ];

  return (
    <>
      {/* Top Left Brand Stamp */}
      <header className="fixed top-6 left-6 sm:left-10 z-40 font-mono select-none">
        <Link
          href="/"
          onMouseEnter={playHover}
          onClick={playClick}
          className="group block"
          aria-label="Dias Yermek - Home"
        >
          <div className="flex items-center gap-3 bg-[#06080A]/70 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10 group-hover:border-[var(--accent-border)] transition-all">
            <div className="text-right">
              <span className="block text-xs font-extrabold text-white group-hover:text-[var(--accent-color)] transition-colors leading-tight">
                Dias
              </span>
              <span className="block text-xs font-extrabold text-white group-hover:text-[var(--accent-color)] transition-colors leading-tight">
                Yermek
              </span>
            </div>
            <div className="w-[1px] h-6 bg-white/20 group-hover:bg-[var(--accent-color)] transition-colors" />
            <div className="text-left text-[10px] text-white/50 leading-tight">
              <span className="block">Portfolio</span>
              <span className="block font-bold text-white/80">2026</span>
            </div>
          </div>
        </Link>
      </header>

      {/* Top Right Controls: Menu & Settings */}
      <div className="fixed top-6 right-6 sm:right-10 z-40 flex items-center gap-3 font-mono">
        {/* Navigation Menu Button & Popup */}
        <div className="relative">
          <button
            onClick={() => {
              playClick();
              setIsMenuOpen(!isMenuOpen);
              if (isSettingsOpen) setIsSettingsOpen(false);
            }}
            onMouseEnter={playHover}
            className={`group flex items-center gap-3 px-3.5 py-2 rounded-lg backdrop-blur-md border transition-all text-xs font-bold ${
              isMenuOpen
                ? 'bg-[var(--accent-color)] text-[#06080A] border-[var(--accent-color)] shadow-[0_0_20px_var(--accent-glow)]'
                : 'bg-[#06080A]/70 text-white border-white/10 hover:border-white/30'
            }`}
            aria-label="Toggle menu"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] opacity-75">
                [{navLinks.find((l) => l.href === pathname)?.index || '1'}]
              </span>
              <span>{navLinks.find((l) => l.href === pathname)?.label || 'Home'}</span>
            </div>
            {/* 4-dot Icon */}
            <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5 items-center justify-center">
              <span className={`w-1 h-1 rounded-full ${isMenuOpen ? 'bg-[#06080A]' : 'bg-[var(--accent-color)]'}`} />
              <span className={`w-1 h-1 rounded-full ${isMenuOpen ? 'bg-[#06080A]' : 'bg-white'}`} />
              <span className={`w-1 h-1 rounded-full ${isMenuOpen ? 'bg-[#06080A]' : 'bg-white'}`} />
              <span className={`w-1 h-1 rounded-full ${isMenuOpen ? 'bg-[#06080A]' : 'bg-[var(--accent-color)]'}`} />
            </div>
          </button>

          {/* Expandable Directory Menu Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute right-0 top-12 w-80 bg-[#080B0E]/95 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-2xl font-mono"
              >
                {/* Menu Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h3>
                    <p className="text-[10px] text-white/40">Directory // System</p>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-[var(--accent-color)] font-bold">
                    DIR
                  </span>
                </div>

                {/* Main Nav Items */}
                <nav className="space-y-1.5 mb-5">
                  {navLinks.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={playClick}
                        onMouseEnter={playHover}
                        className={`flex items-center justify-between p-2.5 rounded-lg text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-[var(--accent-glow)] text-[var(--accent-color)] border border-[var(--accent-border)]'
                            : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-[10px] text-[var(--accent-color)]">[{item.index}]</span>
                          <span className="tracking-wider">{item.label}</span>
                        </div>
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-color)]' : 'bg-white/20'}`} />
                      </Link>
                    );
                  })}
                </nav>

                {/* Social Quick Links with glowing dots */}
                <div className="border-t border-white/10 pt-4">
                  <div className="text-[10px] text-white/40 mb-2.5 tracking-wider uppercase">Quick Connect</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <a
                      href="https://t.me/daelijek"
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHover}
                      className="flex items-center gap-2 p-2 rounded bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
                      <span className="text-[11px]">Telegram</span>
                    </a>
                    <a
                      href="https://github.com/Daelijek"
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHover}
                      className="flex items-center gap-2 p-2 rounded bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span className="text-[11px]">GitHub</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/dias-yermek/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHover}
                      className="flex items-center gap-2 p-2 rounded bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span className="text-[11px]">LinkedIn</span>
                    </a>
                    <a
                      href="https://github.com/Daelijek/FinanceManagementApp"
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHover}
                      className="flex items-center gap-2 p-2 rounded bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[11px]">Dev Labs ↗</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* System Settings Gear Button & Modal */}
        <div className="relative">
          <button
            onClick={() => {
              playClick();
              setIsSettingsOpen(!isSettingsOpen);
              if (isMenuOpen) setIsMenuOpen(false);
            }}
            onMouseEnter={playHover}
            className={`p-2.5 rounded-lg backdrop-blur-md border transition-all text-white ${
              isSettingsOpen
                ? 'bg-[var(--accent-glow)] border-[var(--accent-border)] text-[var(--accent-color)] shadow-[0_0_20px_var(--accent-glow)]'
                : 'bg-[#06080A]/70 border-white/10 hover:border-white/30'
            }`}
            aria-label="Global System Settings"
          >
            <Settings className={`w-4 h-4 transition-transform duration-500 ${isSettingsOpen ? 'rotate-90 text-[var(--accent-color)]' : ''}`} />
          </button>

          {/* Settings Drawer Panel */}
          <AnimatePresence>
            {isSettingsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute right-0 top-12 w-80 bg-[#080B0E]/95 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-2xl font-mono"
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
