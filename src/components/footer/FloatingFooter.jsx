'use client';

import React, { useState, useEffect } from 'react';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { Mail, Clock } from 'lucide-react';

export default function FloatingFooter() {
  const { playHover, playClick } = useThemeAudio();
  const [astanaTime, setAstanaTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Almaty',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      setAstanaTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed bottom-6 left-6 right-6 sm:left-10 sm:right-10 z-30 pointer-events-none flex items-center justify-between font-mono text-xs select-none">
      {/* Left Column: Email */}
      <div className="pointer-events-auto bg-[#06080A]/70 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10 hover:border-[var(--accent-border)] transition-all">
        <p className="text-[10px] text-white/40 leading-tight">Wanna Say Hello?</p>
        <a
          href="mailto:yermek.dias2004@gmail.com"
          onMouseEnter={playHover}
          onClick={playClick}
          className="text-white hover:text-[var(--accent-color)] font-semibold transition-colors flex items-center gap-1.5"
        >
          <span>yermek.dias2004@gmail.com</span>
        </a>
      </div>

      {/* Right Column: Local Time */}
      <div className="pointer-events-auto hidden sm:block bg-[#06080A]/70 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10 text-right">
        <p className="text-[10px] text-white/40 leading-tight">Local Time</p>
        <p className="text-white font-bold flex items-center gap-1.5 justify-end">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-ping" />
          <span>Astana / {astanaTime || '12:00:00'} (UTC+5)</span>
        </p>
      </div>
    </footer>
  );
}
