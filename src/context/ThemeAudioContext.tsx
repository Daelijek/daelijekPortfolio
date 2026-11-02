'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import { soundFx, type AudioProfile } from '@/audio/soundEffects';
import { track } from '@/lib/analytics';
import type { PerfTier } from '@/lib/animationLoop';

export const THEMES = ['acid', 'cyan', 'amber', 'crimson', 'obsidian'] as const;
export type Theme = (typeof THEMES)[number];

const PERF_TIERS: readonly PerfTier[] = ['high', 'med', 'saver'];

const isTheme = (v: unknown): v is Theme => typeof v === 'string' && (THEMES as readonly string[]).includes(v);
const isPerfTier = (v: unknown): v is PerfTier => typeof v === 'string' && (PERF_TIERS as readonly string[]).includes(v);

export interface ThemeAudioContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  audioProfile: AudioProfile;
  setAudioProfile: (profile: AudioProfile) => void;
  perfTier: PerfTier;
  setPerfTier: (tier: PerfTier) => void;
  playHover: () => void;
  playClick: () => void;
  playSwitch: () => void;
  playDownload: () => void;
}

// Sound-effect helpers never change, so they are created once.
const playHover = () => soundFx.playHover();
const playClick = () => soundFx.playClick();
const playSwitch = () => soundFx.playSwitch();
const playDownload = () => soundFx.playDownload();
const noop = () => {};

const ThemeAudioContext = createContext<ThemeAudioContextValue>({
  theme: 'acid',
  setTheme: noop,
  soundEnabled: true,
  setSoundEnabled: noop,
  audioProfile: 'default',
  setAudioProfile: noop,
  perfTier: 'high',
  setPerfTier: noop,
  playHover: noop,
  playClick: noop,
  playSwitch: noop,
  playDownload: noop,
});

const saveSetting = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage may be unavailable (private mode, blocked site data)
  }
};

type NavigatorHints = Navigator & {
  deviceMemory?: number; // Chromium only
  connection?: { saveData?: boolean };
};

/**
 * Default animation quality for visitors who never picked a tier themselves.
 * Low-end hardware or Data Saver gets lighter backgrounds (fewer particles, lower fps).
 * The automatic choice is not stored, so it adapts if the device changes.
 */
function detectPerfTier(): PerfTier {
  const nav = navigator as NavigatorHints;
  const cores = nav.hardwareConcurrency || 4;
  const memoryGb = nav.deviceMemory ?? 4; // 4 is a neutral default where the API is missing
  const saveData = Boolean(nav.connection?.saveData);
  const smallTouchScreen = window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 768;

  if (saveData || cores <= 2 || memoryGb <= 2) return 'saver';
  if (cores <= 4 || memoryGb <= 4 || smallTouchScreen) return 'med';
  return 'high';
}

export function ThemeAudioProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('acid');
  const [soundEnabled, setSoundEnabledState] = useState(true);
  const [audioProfile, setAudioProfileState] = useState<AudioProfile>('default');
  const [perfTier, setPerfTierState] = useState<PerfTier>('high');

  // Restore saved preferences. localStorage only exists in the browser, so this runs
  // after hydration. (Language is not stored here: it is part of the URL, see src/i18n.)
  /* eslint-disable react-hooks/set-state-in-effect -- one-time sync from client-only storage */
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('daelijek_theme');
      const savedSound = localStorage.getItem('daelijek_sound');
      const savedProfile = localStorage.getItem('daelijek_audio_profile');
      const savedPerf = localStorage.getItem('daelijek_perf');

      const initialTheme = isTheme(savedTheme) ? savedTheme : 'acid';
      setThemeState(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);

      if (savedSound !== null) {
        const isSound = savedSound === 'true';
        setSoundEnabledState(isSound);
        soundFx.setEnabled(isSound);
      }

      if (savedProfile === 'default' || savedProfile === 'minimal') {
        setAudioProfileState(savedProfile);
        soundFx.setProfile(savedProfile);
      }

      setPerfTierState(isPerfTier(savedPerf) ? savedPerf : detectPerfTier());
    } catch {
      // Storage access safe ignore
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    saveSetting('daelijek_theme', newTheme);
    soundFx.playSwitch();
    track('Theme Changed', { theme: newTheme });
  }, []);

  const setSoundEnabled = useCallback((val: boolean) => {
    setSoundEnabledState(val);
    soundFx.setEnabled(val);
    track('Sound Toggled', { enabled: val });
    saveSetting('daelijek_sound', val ? 'true' : 'false');
    if (val) soundFx.playClick();
  }, []);

  const setAudioProfile = useCallback((profile: AudioProfile) => {
    setAudioProfileState(profile);
    soundFx.setProfile(profile);
    saveSetting('daelijek_audio_profile', profile);
    soundFx.playProfileDemo(profile);
  }, []);

  const setPerfTier = useCallback((tier: PerfTier) => {
    setPerfTierState(tier);
    saveSetting('daelijek_perf', tier);
    soundFx.playSwitch();
  }, []);

  // Stable value: consumers re-render only when a setting actually changes.
  const value = useMemo<ThemeAudioContextValue>(
    () => ({
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
      playSwitch,
      playDownload,
    }),
    [theme, soundEnabled, audioProfile, perfTier, setTheme, setSoundEnabled, setAudioProfile, setPerfTier]
  );

  return (
    <ThemeAudioContext.Provider value={value}>
      {/* reducedMotion="user": framer-motion drops transform/layout animations when the
          OS "reduce motion" setting is on (opacity fades are kept). */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeAudioContext.Provider>
  );
}

export function useThemeAudio(): ThemeAudioContextValue {
  return useContext(ThemeAudioContext);
}
