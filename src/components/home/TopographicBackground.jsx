'use client';

import React, { useEffect, useRef } from 'react';
import { useThemeAudio } from '../../context/ThemeAudioContext';

export default function TopographicBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const { theme, perfTier } = useThemeAudio();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let time = 0;

    const getColor = () => {
      switch (theme) {
        case 'cyan': return { r: 0, g: 243, b: 255 };
        case 'amber': return { r: 255, g: 184, b: 0 };
        case 'crimson': return { r: 255, g: 0, b: 85 };
        case 'obsidian': return { r: 255, g: 255, b: 255 };
        default: return { r: 0, g: 255, b: 159 };
      }
    };

    // Handle High-DPI / Retina resolution
    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : { width: window.innerWidth / 2, height: window.innerHeight };
      const dpr = Math.min(window.devicePixelRatio || 1, perfTier === 'high' ? 2 : 1);

      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener('resize', resize);

    // Mouse tracker within component bounds
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Multi-octave organic height-field function
    const getElevation = (x, y, t, mx, my) => {
      // Base flowing contours
      const nx = x * 0.0032;
      const ny = y * 0.0032;

      // Harmonic waves forming organic terrain
      const w1 = Math.sin(nx * 2.2 + t * 0.45) * Math.cos(ny * 2.5 - t * 0.35);
      const w2 = Math.sin(nx * 4.5 - ny * 3.1 + t * 0.6) * 0.5;
      const w3 = Math.cos((nx + ny) * 3.2 + t * 0.25) * 0.35;
      const w4 = Math.sin(Math.sqrt(nx * nx + ny * ny) * 5.0 - t * 0.5) * 0.4;

      let elevation = (w1 + w2 + w3 + w4) * 0.5 + 0.5; // normalized ~ [0..1]

      // Subtle mouse repulsion / elevation deformation
      if (mx > -500 && my > -500) {
        const dx = x - mx;
        const dy = y - my;
        const distSq = dx * dx + dy * dy;
        const radius = 220;
        if (distSq < radius * radius) {
          const factor = Math.exp(-distSq / (2 * 75 * 75));
          elevation += factor * 0.45;
        }
      }

      return elevation;
    };

    // Render loop
    const render = () => {
      time += perfTier === 'saver' ? 0.004 : 0.008;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, width, height);

      // Deep cyber background fill
      ctx.fillStyle = '#040608';
      ctx.fillRect(0, 0, width, height);

      const color = getColor();
      const rgb = `${color.r}, ${color.g}, ${color.b}`;

      // Number of elevation contour lines based on height and performance
      const lineStep = perfTier === 'saver' ? 42 : perfTier === 'med' ? 32 : 24;
      const numLines = Math.ceil(height / lineStep) + 8;
      const sampleStep = perfTier === 'saver' ? 14 : 8;

      // Draw Topographic Elevation Contours
      for (let i = -4; i < numLines; i++) {
        const baseY = i * lineStep;
        const isMajor = i % 5 === 0; // Major contour line (index contour)

        ctx.beginPath();
        let started = false;

        for (let x = 0; x <= width + sampleStep; x += sampleStep) {
          const elev = getElevation(x, baseY, time, mx, my);
          // Displace Y vertically according to organic terrain elevation
          const y = baseY + (elev - 0.5) * (lineStep * 2.8);

          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Color and glow based on major vs minor contour
        if (isMajor) {
          ctx.strokeStyle = `rgba(${rgb}, 0.42)`;
          ctx.lineWidth = 1.2;
          ctx.shadowColor = `rgba(${rgb}, 0.35)`;
          ctx.shadowBlur = 4;
        } else {
          ctx.strokeStyle = `rgba(${rgb}, 0.14)`;
          ctx.lineWidth = 0.75;
          ctx.shadowBlur = 0;
        }

        ctx.stroke();
        ctx.shadowBlur = 0; // reset shadow

        // Render delicate topographic elevation labels on major index lines
        if (isMajor && i > 0 && i < numLines - 2 && (i + Math.floor(time * 0.2)) % 2 === 0) {
          const labelX = (width * 0.28 + ((i * 137) % Math.floor(width * 0.45))) % (width - 120);
          const elevVal = Math.floor(200 + i * 45 + Math.sin(time * 0.5 + i) * 12);
          const elevSample = getElevation(labelX, baseY, time, mx, my);
          const labelY = baseY + (elevSample - 0.5) * (lineStep * 2.8) - 4;

          ctx.font = '8px "JetBrains Mono", monospace';
          ctx.fillStyle = `rgba(${rgb}, 0.45)`;
          ctx.fillText(`+${elevVal}m`, labelX, labelY);
        }
      }

      // Draw subtle topographic HUD coordinate crosshairs / marks
      const gridSpacingX = 140;
      const gridSpacingY = 140;
      ctx.strokeStyle = `rgba(${rgb}, 0.05)`;
      ctx.lineWidth = 0.5;

      for (let x = gridSpacingX; x < width; x += gridSpacingX) {
        for (let y = gridSpacingY; y < height; y += gridSpacingY) {
          // Draw subtle crosshair '+'
          ctx.beginPath();
          ctx.moveTo(x - 3, y);
          ctx.lineTo(x + 3, y);
          ctx.moveTo(x, y - 3);
          ctx.lineTo(x, y + 3);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme, perfTier]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* High-DPI 60FPS Topographic Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
      />

      {/* Deep Atmospheric Radial & Linear Lighting Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06080A]/85 via-transparent to-[#040608]/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#06080A]/90 via-transparent to-[#040608]/40 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 35% 45%, var(--accent-glow), transparent 65%)',
        }}
      />

      {/* Subtle HUD Topo Scanner Watermark */}
      <div className="absolute top-4 left-6 z-10 flex items-center gap-2 font-mono text-[9px] text-[var(--accent-color)] opacity-40 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-ping" />
        <span>TOPO_ELEVATION // 60FPS_LIDAR_SCAN</span>
      </div>
    </div>
  );
}
