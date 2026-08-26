'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { Mail, Clock } from 'lucide-react';

export default function FloatingFooter() {
  const pathname = usePathname();
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

  if (pathname === '/') return null;

  return (
    <footer className="fixed bottom-8 left-8 right-8 sm:left-12 sm:right-12 z-30 pointer-events-none flex items-center justify-between font-mono text-xs select-none">
      {/* Left Column: Email */}
      <div className="pointer-events-auto">
        <p className="text-[10px] text-white/40 leading-tight uppercase">Wanna Say Hello?</p>
        <a
          href="mailto:yermek.dias2004@gmail.com"
          onMouseEnter={playHover}
          onClick={playClick}
          className="text-white hover:text-[var(--accent-color)] font-bold transition-colors block mt-0.5"
        >
          yermek.dias2004@gmail.com
        </a>
      </div>

      {/* Right Column: Local Time */}
      <div className="pointer-events-auto hidden sm:block text-right">
        <p className="text-[10px] text-white/40 leading-tight uppercase">Local Time</p>
        <p className="text-white font-bold flex items-center gap-1.5 justify-end mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-ping" />
          <span>Astana / {astanaTime || '12:00:00'} (UTC+5)</span>
        </p>
      </div>
    </footer>
  );
}
