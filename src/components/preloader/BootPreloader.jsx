'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { soundFx } from '../../audio/soundEffects';
import { Volume2, VolumeX, ShieldCheck, Zap } from 'lucide-react';

export default function BootPreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState('INITIALIZING_DAELIJEK_CORE');
  const [isReady, setIsReady] = useState(false);
  const { soundEnabled, setSoundEnabled, perfTier, setPerfTier, playClick, playHover } = useThemeAudio();

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 3;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setStepText('SYSTEM_READY // ALL_MODULES_ONLINE');
        setIsReady(true);
        clearInterval(interval);
      } else {
        setProgress(current);
        if (current > 30 && current <= 70) {
          setStepText('MOUNTING_SECTORS & REPOSITORIES');
        } else if (current > 70) {
          setStepText('CALIBRATING_HUD_TELEMETRY');
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    soundFx.playBootChime();
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#040608] p-6 md:p-12 font-mono select-none"
    >
      {/* Top HUD bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs text-white/60">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent-color)] animate-pulse" />
          <span className="tracking-widest font-semibold text-white">DIAS_YERMEK // OS v2.6</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] hidden sm:flex">
          <span>PORT: 3000</span>
          <span>LATENCY: 12ms</span>
          <span className="text-[var(--accent-color)]">[ONLINE]</span>
        </div>
      </div>

      {/* Center Interactive Action */}
      <div className="my-auto flex flex-col items-center justify-center text-center max-w-xl mx-auto w-full">
        {/* Monospace percent display */}
        <div className="mb-2 text-6xl md:text-8xl font-extrabold tracking-tighter text-white">
          <span className="text-glow">{progress}</span>
          <span className="text-2xl md:text-3xl text-[var(--accent-color)] ml-1">%</span>
        </div>

        {/* Status log pill */}
        <div className="mb-8 flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs text-[var(--accent-color)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
          <span>&gt; {stepText}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-10 border border-white/5">
          <motion.div
            className="h-full bg-[var(--accent-color)] shadow-[0_0_12px_var(--accent-color)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* Enter Button when ready */}
        <AnimatePresence>
          {isReady && (
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={handleEnter}
              onMouseEnter={playHover}
              className="group relative px-8 py-4 bg-[var(--accent-color)] text-[#06080A] font-bold text-sm tracking-widest uppercase rounded hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>INITIALIZE PORTFOLIO</span>
              <span className="text-xs opacity-75">&gt;&gt;</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Controls HUD */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-4 gap-4 text-xs text-white/60">
        {/* Sound SFX toggle */}
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-[11px]">SFX AUDIO:</span>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            onMouseEnter={playHover}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors border ${
              soundEnabled
                ? 'bg-[var(--accent-glow)] border-[var(--accent-border)] text-[var(--accent-color)]'
                : 'bg-white/5 border-white/10 text-white/40'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{soundEnabled ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {/* Performance tier switcher */}
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-[11px]">PERFORMANCE:</span>
          <div className="flex rounded border border-white/10 p-0.5 bg-white/5">
            {['high', 'med', 'saver'].map((tier) => (
              <button
                key={tier}
                onClick={() => setPerfTier(tier)}
                onMouseEnter={playHover}
                className={`px-2 py-0.5 text-[11px] uppercase rounded transition-colors ${
                  perfTier === tier
                    ? 'bg-[var(--accent-color)] text-[#06080A] font-bold'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
