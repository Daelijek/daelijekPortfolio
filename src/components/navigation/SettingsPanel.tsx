'use client';

import { forwardRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX, X } from 'lucide-react';
import { useThemeAudio, type Theme } from '@/context/ThemeAudioContext';
import { useI18n, useLocalizedPath, useSwitchLocale } from '@/i18n/I18nProvider';
import type { Locale } from '@/i18n/config';
import type { AudioProfile } from '@/audio/soundEffects';
import type { PerfTier } from '@/lib/animationLoop';

const THEME_OPTIONS: { id: Theme; name: string; color: string }[] = [
  { id: 'obsidian', name: 'Obsidian White', color: '#FFFFFF' },
  { id: 'cyan', name: 'Neon Cyan', color: '#00F3FF' },
  { id: 'acid', name: 'Acid Green', color: '#00FF9F' },
  { id: 'amber', name: 'Solar Amber', color: '#FFB800' },
  { id: 'crimson', name: 'Crimson Red', color: '#FF0055' },
];

const LANGUAGES: { id: Locale; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'ru', label: 'RU' },
  { id: 'kk', label: 'KZ' },
];

interface SettingsPanelProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

/** Theme, sound, performance tier and language settings (centered on mobile, above the gear on desktop). */
const SettingsPanel = forwardRef<HTMLDivElement, SettingsPanelProps>(function SettingsPanel({ isOpen, isMobile, onClose }, ref) {
  const {
    theme,
    setTheme,
    soundEnabled,
    setSoundEnabled,
    audioProfile,
    setAudioProfile,
    perfTier,
    setPerfTier,
    playHover,
    playClick,
  } = useThemeAudio();
  const { locale, common: content } = useI18n();
  const { href } = useLocalizedPath();
  const switchLocale = useSwitchLocale();
  const nav = content.nav;

  const offset = isMobile ? '-50%' : 0;
  const chooseProfile = (profile: AudioProfile) => {
    if (!soundEnabled) setSoundEnabled(true);
    setAudioProfile(profile);
  };

  const perfOptions: { tier: PerfTier; label: string }[] = [
    { tier: 'high', label: nav.perfHigh },
    { tier: 'med', label: nav.perfMed },
    { tier: 'saver', label: nav.perfSaver },
  ];

  const audioCards: { profile: AudioProfile; title: string; sub: string; bar: string }[] = [
    { profile: 'default', title: nav.audioDefault, sub: nav.audioDefaultSub, bar: 'bg-[var(--accent-color)]' },
    { profile: 'minimal', title: nav.audioMinimal, sub: nav.audioMinimalSub, bar: 'bg-cyan-400' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile backdrop (dimmed, no blur, so the page stays readable) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />

          <motion.div
            ref={ref}
            role="dialog"
            aria-label={nav.systemTitle}
            initial={{ opacity: 0, scale: 0.94, x: offset, y: offset }}
            animate={{ opacity: 1, scale: 1, x: offset, y: offset }}
            exit={{ opacity: 0, scale: 0.94, x: offset, y: offset }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 w-[calc(100vw-32px)] max-w-[360px] md:left-auto md:top-auto md:bottom-24 lg:bottom-[98px] md:right-4 lg:right-5 md:w-[350px] md:max-w-[360px] bg-[#060a0f]/80 backdrop-blur-3xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.35),inset_0_0_40px_rgba(255,255,255,0.02)] font-mono z-50 max-h-[88vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3.5">
              <div>
                <h3 className="text-base font-black text-white uppercase tracking-wider font-display">{nav.systemTitle}</h3>
                <p className="text-[10px] text-white/55 tracking-widest font-mono uppercase">{nav.systemSub}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-[10px] text-white font-mono font-bold">SET</span>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                  aria-label="Close settings"
                >
                  <X aria-hidden="true" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* [01] Theme */}
            <div className="mb-3.5">
              <div className="flex items-center justify-between text-xs text-white/60 mb-2 font-mono font-bold">
                <span>{nav.coreTheme}</span>
                <span className="text-[10px] text-white/55 font-mono">V_1.0</span>
              </div>
              <div className="flex items-center justify-between bg-white/5 p-2 rounded-2xl border border-white/10">
                {THEME_OPTIONS.map((option) => {
                  const isSelected = theme === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setTheme(option.id)}
                      onMouseEnter={playHover}
                      aria-label={option.name}
                      aria-pressed={isSelected}
                      title={option.name}
                      className={`relative flex items-center justify-center transition-all ${
                        isSelected
                          ? 'w-9 h-9 rounded-xl border-2 border-white/90 bg-white/15 shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                          : 'w-8 h-8 rounded-xl hover:bg-white/5 opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                    >
                      <span
                        className={`rounded-full transition-transform ${isSelected ? 'w-4 h-4 scale-110 shadow-sm' : 'w-3.5 h-3.5'}`}
                        style={{ backgroundColor: option.color }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* [02] Audio engine */}
            <div className="mb-3.5">
              <div className="flex items-center justify-between text-xs text-white/60 mb-2 font-mono font-bold">
                <span>{nav.audioEngine}</span>
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  onMouseEnter={playHover}
                  aria-pressed={soundEnabled}
                  title={soundEnabled ? 'Mute all sounds' : 'Unmute sounds'}
                  className={`text-[10px] px-2 py-0.5 rounded border transition-all flex items-center gap-1.5 font-mono font-bold ${
                    soundEnabled
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                      : 'bg-rose-500/15 border-rose-500/30 text-rose-400 hover:bg-rose-500/25'
                  }`}
                >
                  {soundEnabled ? <Volume2 aria-hidden="true" className="w-3 h-3" /> : <VolumeX aria-hidden="true" className="w-3 h-3" />}
                  <span>{soundEnabled ? nav.audioStatusOn : nav.audioStatusMuted}</span>
                </button>
              </div>
              <div className="space-y-2">
                {audioCards.map((card) => {
                  const active = soundEnabled && audioProfile === card.profile;
                  return (
                    <button
                      key={card.profile}
                      type="button"
                      onClick={() => chooseProfile(card.profile)}
                      onMouseEnter={playHover}
                      aria-pressed={active}
                      className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                        active ? 'bg-white/10 border-white/30 text-white shadow-md' : 'bg-white/5 border-white/5 text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div>
                        <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">{card.title}</p>
                        <p className="text-[10px] text-white/55 tracking-wider font-mono mt-0.5">{card.sub}</p>
                      </div>
                      {active && (
                        <div className="flex items-center gap-1" aria-hidden="true">
                          <span className={`w-1 h-3 ${card.bar} animate-pulse rounded-full`} />
                          <span className={`w-1 h-4.5 ${card.bar} animate-pulse delay-75 rounded-full`} />
                          <span className={`w-1 h-2.5 ${card.bar} animate-pulse delay-150 rounded-full`} />
                        </div>
                      )}
                    </button>
                  );
                })}

                {/* Silent mode */}
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  onMouseEnter={playHover}
                  aria-pressed={!soundEnabled}
                  className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                    !soundEnabled ? 'bg-rose-500/10 border-rose-500/40 text-white shadow-md' : 'bg-white/5 border-white/5 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div>
                    <p className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${!soundEnabled ? 'text-rose-400' : 'text-white'}`}>{nav.audioMute}</p>
                    <p className="text-[10px] text-white/55 tracking-wider font-mono mt-0.5">{nav.audioMuteSub}</p>
                  </div>
                  {!soundEnabled ? (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] font-mono font-bold">
                      <VolumeX aria-hidden="true" className="w-3.5 h-3.5" />
                      <span>{nav.audioStatusMuted}</span>
                    </div>
                  ) : (
                    <VolumeX aria-hidden="true" className="w-4 h-4 text-white/30" />
                  )}
                </button>
              </div>
            </div>

            {/* [03] Performance tier */}
            <div className="mb-3.5">
              <div className="flex items-center justify-between text-xs text-white/60 mb-2 font-mono font-bold">
                <span>{nav.perfTier}</span>
                <span className="text-[10px] text-white/55 font-mono">SYS</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-white/5 rounded-xl border border-white/10 font-mono">
                {perfOptions.map(({ tier, label }) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setPerfTier(tier)}
                    onMouseEnter={playHover}
                    aria-pressed={perfTier === tier}
                    className={`py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                      perfTier === tier ? 'bg-white/20 text-white border border-white/30 shadow-md font-black' : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 py-1.5 text-[10px] text-white/55 tracking-widest font-mono border-t border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-ping" />
              <span>{nav.systemActive}</span>
            </div>

            {/* Language + replay boot screen */}
            <div className="pt-2.5 border-t border-white/10 flex items-center justify-between gap-2.5 font-mono">
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                {LANGUAGES.map((language) => (
                  <button
                    key={language.id}
                    type="button"
                    lang={language.id}
                    onClick={() => {
                      playClick();
                      switchLocale(language.id);
                    }}
                    onMouseEnter={playHover}
                    aria-pressed={locale === language.id}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      locale === language.id ? 'bg-[var(--accent-color)] text-[#06080A] shadow-sm font-black' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {language.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  playClick();
                  try {
                    sessionStorage.removeItem('daelijek_booted');
                  } catch {
                    // Storage unavailable: the boot screen shows anyway
                  }
                  // Full reload so the home page starts its boot sequence from scratch.
                  window.location.href = href('/');
                }}
                onMouseEnter={playHover}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent-border)] bg-[var(--accent-bg-subtle)] hover:bg-[var(--accent-glow)] text-[var(--heading-tint)] hover:text-[var(--accent-color)] text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>{nav.replayBoot}</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

export default SettingsPanel;
