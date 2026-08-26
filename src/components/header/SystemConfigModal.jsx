'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { X, Volume2, VolumeX, Check, Sparkles, Gauge } from 'lucide-react';

const themes = [
  { id: 'acid', name: 'Acid Green', color: '#00FF9F', desc: 'Default Cyber' },
  { id: 'cyan', name: 'Neon Cyan', color: '#00F3FF', desc: 'High Contrast' },
  { id: 'amber', name: 'Solar Amber', color: '#FFB800', desc: 'Warm Matrix' },
  { id: 'crimson', name: 'Crimson Red', color: '#FF0055', desc: 'Aggressive HUD' },
  { id: 'obsidian', name: 'Obsidian White', color: '#FFFFFF', desc: 'Minimalist Luxe' },
];

export default function SystemConfigModal({ isOpen, onClose }) {
  const {
    theme,
    setTheme,
    soundEnabled,
    setSoundEnabled,
    lang,
    setLang,
    perfTier,
    setPerfTier,
    playHover,
    playClick
  } = useThemeAudio();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Slide-in HUD Panel */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#080B0E] border-l border-white/10 p-6 flex flex-col justify-between font-mono shadow-2xl"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-ping" />
                  <h3 className="text-sm font-bold tracking-widest text-white uppercase">SYSTEM_CONFIG // GLOBAL</h3>
                </div>
                <button
                  onClick={() => { playClick(); onClose(); }}
                  onMouseEnter={playHover}
                  className="p-1 rounded text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Section 01: Core Accent Theme */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-white/50 mb-3">
                  <span>[01] CORE ACCENT COLOR</span>
                  <span className="text-[var(--accent-color)] uppercase">{theme}</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {themes.map((t) => {
                    const isActive = theme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        onMouseEnter={playHover}
                        className={`flex items-center justify-between p-2.5 rounded border transition-all ${
                          isActive
                            ? 'bg-white/10 border-[var(--accent-color)] shadow-[0_0_15px_var(--accent-glow)]'
                            : 'bg-white/5 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full shadow-sm"
                            style={{ backgroundColor: t.color }}
                          />
                          <div className="text-left">
                            <div className="text-xs font-semibold text-white">{t.name}</div>
                            <div className="text-[10px] text-white/40">{t.desc}</div>
                          </div>
                        </div>
                        {isActive && <Check className="w-4 h-4 text-[var(--accent-color)]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 02: Audio SFX */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-white/50 mb-3">
                  <span>[02] UI AUDIO ENGINE</span>
                  <span className="text-[var(--accent-color)]">{soundEnabled ? 'ACTIVE' : 'MUTED'}</span>
                </div>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  onMouseEnter={playHover}
                  className={`w-full flex items-center justify-between p-3 rounded border transition-all ${
                    soundEnabled
                      ? 'bg-[var(--accent-glow)] border-[var(--accent-border)] text-white'
                      : 'bg-white/5 border-white/10 text-white/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {soundEnabled ? (
                      <Volume2 className="w-4 h-4 text-[var(--accent-color)]" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-white/40" />
                    )}
                    <span className="text-xs">Procedural UI Sound Effects</span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-black/40 text-[var(--accent-color)]">
                    {soundEnabled ? 'ENABLED' : 'DISABLED'}
                  </span>
                </button>
              </div>

              {/* Section 03: Localization */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-white/50 mb-3">
                  <span>[03] INTERFACE LANGUAGE</span>
                  <span className="text-[var(--accent-color)] uppercase">{lang}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setLang('en')}
                    onMouseEnter={playHover}
                    className={`py-2 text-xs font-semibold rounded border transition-all ${
                      lang === 'en'
                        ? 'bg-[var(--accent-color)] text-[#06080A] font-bold border-transparent'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    ENGLISH [EN]
                  </button>
                  <button
                    onClick={() => setLang('ru')}
                    onMouseEnter={playHover}
                    className={`py-2 text-xs font-semibold rounded border transition-all ${
                      lang === 'ru'
                        ? 'bg-[var(--accent-color)] text-[#06080A] font-bold border-transparent'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    РУССКИЙ [RU]
                  </button>
                </div>
              </div>
            </div>

            {/* Footer status */}
            <div className="border-t border-white/10 pt-4 text-[11px] text-white/40 flex items-center justify-between">
              <span>DAELIJEK_ENGINE // 2026</span>
              <span className="text-[var(--accent-color)]">ALL SYSTEMS NOMINAL</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
