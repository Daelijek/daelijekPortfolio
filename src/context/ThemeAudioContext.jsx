'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { soundFx } from '../audio/soundEffects';
import { track } from '../lib/analytics';

const ThemeAudioContext = createContext({
  theme: 'acid',
  setTheme: () => {},
  soundEnabled: true,
  setSoundEnabled: () => {},
  audioProfile: 'default',
  setAudioProfile: () => {},
  perfTier: 'high',
  setPerfTier: () => {},
  playHover: () => {},
  playClick: () => {},
  playSwitch: () => {},
  playDownload: () => {},
});

// Sound-effect helpers never change, so they are created once.
const playHover = () => soundFx.playHover();
const playClick = () => soundFx.playClick();
const playSwitch = () => soundFx.playSwitch();
const playDownload = () => soundFx.playDownload();

const saveSetting = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage may be unavailable (private mode, blocked site data)
  }
};

/**
 * Default animation quality for visitors who never picked a tier themselves.
 * Low-end hardware or Data Saver gets lighter backgrounds (fewer particles, lower fps).
 * The automatic choice is not stored, so it adapts if the device changes.
 */
function detectPerfTier() {
  const cores = navigator.hardwareConcurrency || 4;
  const memoryGb = navigator.deviceMemory || 4; // Chromium only; 4 is a neutral default
  const saveData = Boolean(navigator.connection?.saveData);
  const smallTouchScreen = window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 768;

  if (saveData || cores <= 2 || memoryGb <= 2) return 'saver';
  if (cores <= 4 || memoryGb <= 4 || smallTouchScreen) return 'med';
  return 'high';
}

export function ThemeAudioProvider({ children }) {
  const [theme, setThemeState] = useState('acid');
  const [soundEnabled, setSoundEnabledState] = useState(true);
  const [audioProfile, setAudioProfileState] = useState('default');
  const [perfTier, setPerfTierState] = useState('high');

  // Restore saved preferences. localStorage only exists in the browser, so this runs
  // after hydration. (Language is not stored here: it is part of the URL, see src/i18n.)
  /* eslint-disable react-hooks/set-state-in-effect -- one-time sync from client-only storage */
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('daelijek_theme');
      const savedSound = localStorage.getItem('daelijek_sound');
      const savedProfile = localStorage.getItem('daelijek_audio_profile');
      const savedPerf = localStorage.getItem('daelijek_perf');

      const initialTheme = savedTheme || 'acid';
      setThemeState(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);

      if (savedSound !== null) {
        const isSound = savedSound === 'true';
        setSoundEnabledState(isSound);
        soundFx.setEnabled(isSound);
      }

      if (savedProfile) {
        setAudioProfileState(savedProfile);
        soundFx.setProfile(savedProfile);
      }

      setPerfTierState(['high', 'med', 'saver'].includes(savedPerf) ? savedPerf : detectPerfTier());
    } catch {
      // Storage access safe ignore
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    saveSetting('daelijek_theme', newTheme);
    soundFx.playSwitch();
    track('Theme Changed', { theme: newTheme });
  }, []);

  const setSoundEnabled = useCallback((val) => {
    setSoundEnabledState(val);
    soundFx.setEnabled(val);
    track('Sound Toggled', { enabled: val });
    saveSetting('daelijek_sound', val ? 'true' : 'false');
    if (val) soundFx.playClick();
  }, []);

  const setAudioProfile = useCallback((profile) => {
    setAudioProfileState(profile);
    soundFx.setProfile(profile);
    saveSetting('daelijek_audio_profile', profile);
    soundFx.playProfileDemo(profile);
  }, []);

  const setPerfTier = useCallback((tier) => {
    setPerfTierState(tier);
    saveSetting('daelijek_perf', tier);
    soundFx.playSwitch();
  }, []);

  // Stable value: consumers re-render only when a setting actually changes.
  const value = useMemo(
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

export function useThemeAudio() {
  return useContext(ThemeAudioContext);
}
