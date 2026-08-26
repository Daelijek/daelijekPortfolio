'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundFx } from '../audio/soundEffects';

const ThemeAudioContext = createContext({
  theme: 'acid',
  setTheme: () => {},
  soundEnabled: true,
  setSoundEnabled: () => {},
  lang: 'en',
  setLang: () => {},
  perfTier: 'high',
  setPerfTier: () => {},
  playHover: () => {},
  playClick: () => {},
  playSwitch: () => {},
});

export function ThemeAudioProvider({ children }) {
  const [theme, setThemeState] = useState('acid');
  const [soundEnabled, setSoundEnabledState] = useState(true);
  const [lang, setLangState] = useState('en');
  const [perfTier, setPerfTierState] = useState('high');

  useEffect(() => {
    // Load saved preferences from localStorage
    try {
      const savedTheme = localStorage.getItem('daelijek_theme');
      const savedSound = localStorage.getItem('daelijek_sound');
      const savedLang = localStorage.getItem('daelijek_lang');
      const savedPerf = localStorage.getItem('daelijek_perf');

      if (savedTheme) {
        setThemeState(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else {
        document.documentElement.setAttribute('data-theme', 'acid');
      }

      if (savedSound !== null) {
        const isSound = savedSound === 'true';
        setSoundEnabledState(isSound);
        soundFx.setEnabled(isSound);
      }

      if (savedLang) {
        setLangState(savedLang);
      }

      if (savedPerf) {
        setPerfTierState(savedPerf);
      }
    } catch {}
  }, []);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    try {
      localStorage.setItem('daelijek_theme', newTheme);
    } catch {}
    soundFx.playSwitch();
  };

  const setSoundEnabled = (val) => {
    setSoundEnabledState(val);
    soundFx.setEnabled(val);
    try {
      localStorage.setItem('daelijek_sound', val ? 'true' : 'false');
    } catch {}
    if (val) soundFx.playClick();
  };

  const setLang = (newLang) => {
    setLangState(newLang);
    try {
      localStorage.setItem('daelijek_lang', newLang);
    } catch {}
    soundFx.playSwitch();
  };

  const setPerfTier = (tier) => {
    setPerfTierState(tier);
    try {
      localStorage.setItem('daelijek_perf', tier);
    } catch {}
    soundFx.playSwitch();
  };

  return (
    <ThemeAudioContext.Provider
      value={{
        theme,
        setTheme,
        soundEnabled,
        setSoundEnabled,
        lang,
        setLang,
        perfTier,
        setPerfTier,
        playHover: () => soundFx.playHover(),
        playClick: () => soundFx.playClick(),
        playSwitch: () => soundFx.playSwitch(),
      }}
    >
      {children}
    </ThemeAudioContext.Provider>
  );
}

export function useThemeAudio() {
  return useContext(ThemeAudioContext);
}
