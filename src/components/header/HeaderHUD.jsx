'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Menu, X, Globe, Clock, Terminal } from 'lucide-react';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { portfolioContent } from '../../data/portfolioData';
import SystemConfigModal from './SystemConfigModal';

export default function HeaderHUD() {
  const { lang, setLang, playHover, playClick } = useThemeAudio();
  const content = portfolioContent[lang];
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [astanaTime, setAstanaTime] = useState('');

  // Astana real-time clock (UTC+5)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to Astana timezone (UTC+5)
      const options = {
        timeZone: 'Asia/Almaty',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      const formatted = new Intl.DateTimeFormat('en-GB', options).format(now);
      setAstanaTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#06080A]/85 backdrop-blur-md border-b border-white/10 font-mono transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo & Stamp */}
          <a
            href="#overview"
            onMouseEnter={playHover}
            className="group flex items-center gap-3 text-left"
          >
            <div className="w-8 h-8 rounded border border-[var(--accent-border)] bg-[var(--accent-glow)] flex items-center justify-center font-bold text-xs text-[var(--accent-color)] shadow-[0_0_12px_var(--accent-glow)] group-hover:scale-105 transition-transform">
              DY
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold tracking-wider text-white group-hover:text-[var(--accent-color)] transition-colors">
                  {content.system.brandTitle}
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 text-white/60">
                  {content.system.location}
                </span>
              </div>
              <p className="text-[10px] text-white/40 tracking-tight">
                {content.system.brandSub}
              </p>
            </div>
          </a>

          {/* Center: Live Availability Status (Desktop) */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-pulse" />
            <span className="text-white/80 font-medium text-[11px] tracking-wide">
              {content.system.availability}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Astana Local Clock */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-white/50 bg-white/5 px-2.5 py-1 rounded border border-white/5">
              <Clock className="w-3.5 h-3.5 text-[var(--accent-color)]" />
              <span>AST:</span>
              <span className="text-white font-semibold">{astanaTime || '12:00:00'}</span>
            </div>

            {/* Quick Lang Switch */}
            <button
              onClick={() => {
                playClick();
                setLang(lang === 'en' ? 'ru' : 'en');
              }}
              onMouseEnter={playHover}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-[var(--accent-color)]" />
              <span className="font-bold">{lang.toUpperCase()}</span>
            </button>

            {/* System Config Gear Trigger */}
            <button
              onClick={() => {
                playClick();
                setIsConfigOpen(true);
              }}
              onMouseEnter={playHover}
              className="p-2 rounded bg-white/5 hover:bg-[var(--accent-glow)] border border-white/10 hover:border-[var(--accent-border)] text-white hover:text-[var(--accent-color)] transition-all"
              title="System Config / Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Nav Menu Trigger */}
            <button
              onClick={() => {
                playClick();
                setIsMenuOpen(!isMenuOpen);
              }}
              onMouseEnter={playHover}
              className="md:hidden p-2 rounded bg-white/5 border border-white/10 text-white"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Desktop Directory Nav Bar */}
        <div className="hidden md:block border-t border-white/5 bg-[#080B0E]/60 px-4 sm:px-6 lg:px-8 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
            <nav className="flex items-center gap-6">
              {content.nav.items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onMouseEnter={playHover}
                  className="group flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
                >
                  <span className="text-[10px] text-[var(--accent-color)] opacity-70 group-hover:opacity-100">
                    [{item.index}]
                  </span>
                  <span className="tracking-wide font-medium">{item.label}</span>
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4 text-[11px] text-white/40">
              <span>STACK: NEXT15_FLUTTER_RN</span>
              <span className="text-[var(--accent-color)]">● SYSTEM READY</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-30 bg-[#080B0E] border-b border-white/10 p-6 md:hidden font-mono shadow-2xl"
          >
            <nav className="flex flex-col gap-4">
              {content.nav.items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5 text-sm text-white"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[var(--accent-color)]">[{item.index}]</span>
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Config Modal Drawer */}
      <SystemConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
      />
    </>
  );
}
