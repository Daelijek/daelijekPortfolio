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
    <footer className="fixed bottom-6 sm:bottom-8 left-6 sm:left-12 z-30 pointer-events-none flex items-end gap-8 sm:gap-12 font-mono text-xs select-none">
      {/* Email Column */}
      <div className="pointer-events-auto">
        <p className="text-[10px] text-[var(--text-muted)] leading-tight uppercase tracking-wider mb-0.5">
          Wanna Say Hello?
        </p>
        <a
          href="mailto:dias1605ermek@gmail.com"
          onMouseEnter={playHover}
          onClick={playClick}
          className="text-xs sm:text-sm font-bold text-[var(--heading-tint)] hover:text-[var(--accent-color)] transition-colors block"
        >
          dias1605ermek@gmail.com
        </a>
      </div>

      {/* Local Time Column (Placed side-by-side after Wanna Say Hello) */}
      <div className="pointer-events-auto hidden sm:block">
        <p className="text-[10px] text-[var(--text-muted)] leading-tight uppercase tracking-wider mb-0.5">
          Local Time
        </p>
        <p className="text-xs sm:text-sm font-bold text-[var(--heading-tint)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-ping" />
          <span>Astana / {astanaTime || '12:00:00'} (UTC+5)</span>
        </p>
      </div>
    </footer>
  );
}
