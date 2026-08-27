'use client';

import React, { useRef, useEffect } from 'react';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { Activity } from 'lucide-react';

// Dedicated Hardware-Accelerated 60fps Telemetry Oscilloscope Canvas
function TelemetryWaveCanvas() {
  const canvasRef = useRef(null);
  const { theme } = useThemeAudio();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement.offsetWidth || 300);
    let height = (canvas.height = 36);

    const getColor = () => {
      switch (theme) {
        case 'cyan':
          return { r: 0, g: 243, b: 255 };
        case 'amber':
          return { r: 255, g: 184, b: 0 };
        case 'crimson':
          return { r: 255, g: 0, b: 85 };
        case 'obsidian':
          return { r: 255, g: 255, b: 255 };
        default:
          return { r: 0, g: 255, b: 159 }; // Acid Green
      }
    };

    const color = getColor();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || 300;
      height = canvas.height = 36;
    };
    window.addEventListener('resize', handleResize);

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);

      const t = time * 0.0032;
      const centerY = height / 2;

      // 1. Subtle horizontal telemetry baseline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // 2. Faint Ghost Wave (Harmonic secondary echo)
      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.25)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 3) {
        const p = x / width;
        const env = Math.pow(Math.sin(p * Math.PI), 1.2);
        const y = centerY + env * (Math.sin(p * 16 - t * 2.5) * 6 + Math.sin(p * 32 - t * 4) * 3);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 3. Primary Crisp Neon Telemetry Wave (Full Theme Reactive)
      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.95)`;
      ctx.lineWidth = 1.8;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.7)`;
      ctx.beginPath();

      for (let x = 0; x <= width; x += 2) {
        const p = x / width;
        const env = Math.pow(Math.sin(p * Math.PI), 1.2);
        const y =
          centerY +
          env *
            (Math.sin(p * 14 - t * 3.5) * 8.5 +
              Math.sin(p * 28 - t * 6) * 3.8 +
              Math.sin(p * 42 - t * 2) * 2);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-9 block pointer-events-none select-none"
    />
  );
}

export default function TelemetryHUDPod() {
  const { playHover, playClick } = useThemeAudio();

  return (
    <div className="w-full max-w-sm space-y-6 font-mono select-none pointer-events-auto">
      {/* 1. Header Telemetry Status */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-[var(--accent-color)] animate-pulse" />
          <span className="text-[11px] font-bold text-white/50 tracking-widest uppercase">
            SYS_TELEMETRY // 01
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[var(--accent-border)] bg-[var(--accent-glow)] text-[10px] font-bold text-[var(--accent-color)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-ping" />
          <span>OPEN_FOR_WORK</span>
        </div>
      </div>

      {/* 2. Big Punchy Metrics in Denominary Font */}
      <div className="grid grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="space-y-0.5">
          <div className="text-3xl sm:text-4xl font-black text-white font-condensed tracking-tight">
            15<span className="text-[var(--accent-color)]">+</span>
          </div>
          <p className="text-[10px] font-bold text-white/80 uppercase leading-tight">
            PROJECTS
          </p>
          <p className="text-[8.5px] text-white/40 leading-tight">
            Mobile & Web
          </p>
        </div>

        {/* Metric 2 */}
        <div className="space-y-0.5">
          <div className="text-3xl sm:text-4xl font-black text-white font-condensed tracking-tight">
            3<span className="text-[var(--accent-color)]">+</span>
          </div>
          <p className="text-[10px] font-bold text-white/80 uppercase leading-tight">
            YEARS EXP
          </p>
          <p className="text-[8.5px] text-white/40 leading-tight">
            Production Dev
          </p>
        </div>

        {/* Metric 3 */}
        <div className="space-y-0.5">
          <div className="text-3xl sm:text-4xl font-black text-white font-condensed tracking-tight">
            1.5M<span className="text-[var(--accent-color)]">+</span>
          </div>
          <p className="text-[10px] font-bold text-white/80 uppercase leading-tight">
            USERS
          </p>
          <p className="text-[8.5px] text-white/40 leading-tight">
            TrustMe Scale
          </p>
        </div>
      </div>

      {/* 3. Live Animated Oscilloscope / Activity Wave */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-[9px] text-white/40 uppercase">
          <span>REALTIME_PROCESSING</span>
          <span className="text-[var(--accent-color)] font-bold">60 FPS // LOW_LATENCY</span>
        </div>
        <div className="h-9 w-full overflow-hidden flex items-center border-y border-white/5 relative">
          <TelemetryWaveCanvas />
        </div>
      </div>

      {/* 4. Core Specialization Stack Tags (Clean inline tags) */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[9.5px] text-white/40 uppercase tracking-wider block">
          CORE_ENGINEERING_STACK
        </span>
        <div className="flex flex-wrap gap-x-3.5 gap-y-1 text-xs font-mono text-[var(--accent-color)]">
          <span>&bull; Flutter</span>
          <span>&bull; React Native</span>
          <span>&bull; Next.js 15</span>
          <span>&bull; FastAPI</span>
          <span>&bull; PostgreSQL</span>
        </div>
      </div>

      {/* 5. Live System Stream Diagnostics */}
      <div className="pt-2 border-t border-white/10 text-[9.5px] text-white/50 space-y-1 font-mono">
        <div className="hover:text-[var(--accent-color)] transition-colors">&gt; ARCHITECTURE: REACT19_NEXT15_RIVERPOD</div>
        <div className="hover:text-[var(--accent-color)] transition-colors">&gt; STATUS_CODE: 200_OK // STANDBY</div>
        <div className="hover:text-[var(--accent-color)] transition-colors">&gt; TELEMETRY_HOST: ASTANA_HUB_KZ</div>
      </div>
    </div>
  );
}
