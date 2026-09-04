'use client';

import React, { useRef, useEffect } from 'react';

export default function TrueLaserScanner() {
  const containerRef = useRef(null);
  const laserRef = useRef(null);
  const textContainerRef = useRef(null);
  const illuminatedWrapperRef = useRef(null);
  const prevYRef = useRef(0);

  useEffect(() => {
    let animId;
    let startTime = performance.now();
    const duration = 12000; // 12s full loop (6s down, 6s up)

    const update = (currentTime) => {
      const container = containerRef.current;
      const laser = laserRef.current;
      const textContainer = textContainerRef.current;
      const illuminatedWrapper = illuminatedWrapperRef.current;

      if (container && laser && textContainer && illuminatedWrapper) {
        const containerRect = container.getBoundingClientRect();
        const textRect = textContainer.getBoundingClientRect();

        const H = containerRect.height;
        const elapsed = currentTime - startTime;

        // Smooth Sine Ping-Pong 0 -> H -> 0
        const progress = 0.5 - 0.5 * Math.cos(((elapsed % duration) / duration) * 2 * Math.PI);
        const laserY = progress * H;

        // Determine travel direction
        const isMovingDown = laserY >= prevYRef.current;
        prevYRef.current = laserY;

        // Move 1px laser line
        laser.style.transform = `translate3d(0, ${laserY}px, 0)`;

        // Calculate exact laser offset relative to the illuminated wrapper
        const bleed = 60; // 60px bleed buffer
        const textTop = textRect.top - containerRect.top;
        const textHeight = textRect.height;
        const totalHeight = textHeight + bleed * 2;
        
        // Exact laser center coordinate relative to the illuminated wrapper top
        const offset = (laserY - textTop) + bleed;

        const tailLength = 80; // 80px smooth phosphor decay trail
        const leadSharp = 3;   // 3px razor-sharp leading edge

        // Clamped gradient stops to prevent any browser negative-pixel gradient clipping
        const clamp = (val) => Math.max(0, Math.min(totalHeight, val));

        let mask = '';
        if (isMovingDown) {
          // Moving DOWN: Leading edge is AT the laser (sharp below), trailing decay is ABOVE
          const p0 = clamp(offset - tailLength);
          const p1 = clamp(offset - tailLength * 0.6);
          const p2 = clamp(offset - tailLength * 0.25);
          const pPeakStart = clamp(offset - 1);
          const pPeakEnd = clamp(offset + 1);
          const pLead = clamp(offset + leadSharp);

          mask = `linear-gradient(to bottom, 
            transparent 0px, 
            transparent ${p0}px, 
            rgba(0,0,0,0.15) ${p1}px, 
            rgba(0,0,0,0.6) ${p2}px, 
            black ${pPeakStart}px, 
            black ${pPeakEnd}px, 
            transparent ${pLead}px, 
            transparent ${totalHeight}px
          )`;
        } else {
          // Moving UP: Leading edge is AT the laser (sharp above), trailing decay is BELOW
          const pLead = clamp(offset - leadSharp);
          const pPeakStart = clamp(offset - 1);
          const pPeakEnd = clamp(offset + 1);
          const p2 = clamp(offset + tailLength * 0.25);
          const p1 = clamp(offset + tailLength * 0.6);
          const p0 = clamp(offset + tailLength);

          mask = `linear-gradient(to bottom, 
            transparent 0px, 
            transparent ${pLead}px, 
            black ${pPeakStart}px, 
            black ${pPeakEnd}px, 
            rgba(0,0,0,0.6) ${p2}px, 
            rgba(0,0,0,0.15) ${p1}px, 
            transparent ${p0}px, 
            transparent ${totalHeight}px
          )`;
        }

        illuminatedWrapper.style.webkitMaskImage = mask;
        illuminatedWrapper.style.maskImage = mask;
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex flex-col pointer-events-none select-none font-mono justify-end items-end pb-20 xs:pb-24 sm:pb-26 md:portrait:pb-24 px-4 xs:px-6 sm:px-10 md:portrait:px-10 md:max-xl:landscape:justify-center md:max-xl:landscape:items-start md:max-xl:landscape:pb-0 md:max-xl:landscape:px-8 lg:max-xl:landscape:px-12 xl:justify-center xl:items-start xl:pb-0 xl:px-14 2xl:px-16"
    >
      {/* 1. Thin 1px Laser Line */}
      <div
        ref={laserRef}
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent pointer-events-none z-20"
        style={{
          boxShadow: '0 0 6px var(--accent-color), 0 0 14px var(--accent-glow)',
          willChange: 'transform',
        }}
      />

      {/* 2. Text Content */}
      <div className="relative z-10 space-y-2.5 xs:space-y-3 sm:space-y-4 xl:space-y-5 max-w-lg text-right md:max-xl:landscape:text-left xl:text-left flex flex-col items-end md:max-xl:landscape:items-start xl:items-start">
        {/* Dual-Layer Text Wrapper */}
        <div ref={textContainerRef} className="relative">
          {/* Base Layer: Adaptable Theme Muted Text */}
          <h1
            className="text-3xl xs:text-4xl sm:text-5xl md:portrait:text-5xl md:max-xl:landscape:text-4xl lg:max-xl:landscape:text-5xl xl:text-5xl 2xl:text-7xl font-black uppercase font-display leading-[0.88] tracking-tighter select-none text-right md:max-xl:landscape:text-left xl:text-left"
            style={{ color: 'var(--accent-color)', opacity: 0.14 }}
          >
            <span className="block">CREATIVE</span>
            <span className="block">DEVELOPER</span>
          </h1>

          {/* Top Layer: Glowing Acid Green Text with 60px Bleed Buffer and Clamped Precision Mask */}
          <div
            ref={illuminatedWrapperRef}
            className="absolute -inset-[60px] p-[60px] pointer-events-none select-none"
            style={{
              willChange: 'mask-image, -webkit-mask-image',
            }}
          >
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:portrait:text-5xl md:max-xl:landscape:text-4xl lg:max-xl:landscape:text-5xl xl:text-5xl 2xl:text-7xl font-black uppercase font-display leading-[0.88] tracking-tighter text-[var(--accent-color)] text-glow-strong text-right md:max-xl:landscape:text-left xl:text-left">
              <span className="block">CREATIVE</span>
              <span className="block">DEVELOPER</span>
            </h1>
          </div>
        </div>

        {/* Underline Info Log Tag */}
        <div className="space-y-1 xs:space-y-1.5 pt-1 sm:pt-2 max-w-xs sm:max-w-sm md:max-w-md xl:max-w-sm flex flex-col items-end md:max-xl:landscape:items-start xl:items-start text-right md:max-xl:landscape:text-left xl:text-left">
          <div className="flex items-center gap-1.5 xs:gap-2 text-[9px] xs:text-[10px] sm:text-xs text-[var(--accent-color)] font-bold tracking-widest uppercase">
            <span className="hidden md:max-xl:landscape:block xl:block w-2 h-[1px] bg-[var(--accent-color)]" />
            <span>[ INFO_LOG ]</span>
            <span className="md:max-xl:landscape:hidden xl:hidden w-2 h-[1px] bg-[var(--accent-color)]" />
          </div>
          <p className="text-[9.5px] xs:text-[11px] sm:text-xs text-white/70 uppercase tracking-wide leading-relaxed font-mono pr-2.5 md:max-xl:landscape:pr-0 md:max-xl:landscape:pl-3 xl:pr-0 xl:pl-3 border-r-2 md:max-xl:landscape:border-r-0 md:max-xl:landscape:border-l xl:border-r-0 xl:border-l border-[var(--accent-color)]/40 max-w-[230px] xs:max-w-[270px] sm:max-w-[340px] md:max-w-[400px] xl:max-w-none">
            SCULPTING TECHNICAL PERFORMANCE INTO IMMERSIVE DIGITAL ART.
          </p>

          {/* Mobile & Tablet Metrics Row (Hidden on desktop XL where TelemetryHUDPod shows it) */}
          <div className="flex xl:hidden items-center justify-end md:max-xl:landscape:justify-start gap-2.5 xs:gap-3 sm:gap-4 pt-1 text-[10px] xs:text-[11px] sm:text-xs font-mono select-none">
            <span className="text-white/80 font-bold">
              <span className="text-[var(--accent-color)] font-black text-xs xs:text-sm sm:text-base">3+</span> YEARS
            </span>
            <span className="text-white/25 font-light">|</span>
            <span className="text-white/80 font-bold">
              <span className="text-[var(--accent-color)] font-black text-xs xs:text-sm sm:text-base">15+</span> PROJECTS
            </span>
            <span className="hidden sm:inline text-white/25 font-light">|</span>
            <span className="hidden sm:inline text-white/80 font-bold">
              <span className="text-[var(--accent-color)] font-black text-xs xs:text-sm sm:text-base">1.5M+</span> USERS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
