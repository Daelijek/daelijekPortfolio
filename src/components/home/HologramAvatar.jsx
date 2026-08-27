'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { Scan } from 'lucide-react';

export default function HologramAvatar() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme, playHover } = useThemeAudio();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  // Mouse tilt tracking
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: y * -15, y: x * 20 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  // Render Wireframe 3D Hologram Head on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let angle = 0;
    const width = (canvas.width = 340);
    const height = (canvas.height = 420);

    const getHexColor = () => {
      switch (theme) {
        case 'cyan': return { r: 0, g: 243, b: 255 };
        case 'amber': return { r: 255, g: 184, b: 0 };
        case 'crimson': return { r: 255, g: 0, b: 85 };
        case 'obsidian': return { r: 255, g: 255, b: 255 };
        default: return { r: 0, g: 255, b: 159 };
      }
    };

    // 3D Point Cloud geometry for Head & Glasses
    const points = [];
    
    // Head shape mesh
    for (let i = 0; i < 140; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const r = 85 + Math.sin(phi * 3) * 8;
      
      points.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.cos(phi) * 1.25 - 15,
        z: r * Math.sin(phi) * Math.sin(theta),
      });
    }

    // Glasses frame circles
    for (let i = 0; i < 16; i++) {
      const t = (i / 16) * Math.PI * 2;
      points.push({ x: -28 + Math.cos(t) * 18, y: -18 + Math.sin(t) * 14, z: 92 });
      points.push({ x: 28 + Math.cos(t) * 18, y: -18 + Math.sin(t) * 14, z: 92 });
    }
    // Glasses bridge
    points.push({ x: 0, y: -18, z: 95 });

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.01;
      const c = getHexColor();
      const colorStr = `rgb(${c.r}, ${c.g}, ${c.b})`;

      const cx = width / 2;
      const cy = height / 2;

      // Project 3D points to 2D
      const projected = points.map((p) => {
        // Rotate around Y
        const cosY = Math.cos(angle + rotate.y * 0.02);
        const sinY = Math.sin(angle + rotate.y * 0.02);
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // Rotate around X
        const cosX = Math.cos(rotate.x * 0.02);
        const sinX = Math.sin(rotate.x * 0.02);
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        const fov = 340;
        const scale = fov / (fov + z2 + 140);
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          scale,
          z: z2,
        };
      });

      // Draw wireframe connecting lines
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 26) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${(1 - dist / 26) * 0.35})`;
            ctx.stroke();
          }
        }
      }

      // Draw glowing nodes
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, p.scale * 1.6), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${Math.min(1, Math.max(0.2, (p.z + 100) / 200))})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [theme, rotate]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHover}
      className="relative w-[280px] sm:w-[320px] h-[380px] sm:h-[420px] flex items-center justify-center select-none font-mono"
      style={{ perspective: '1000px' }}
    >
      {/* 3D Transform Box */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-150 ease-out hologram-effect"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {/* Hologram Outer HUD Frame */}
        <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[9px] text-white/40">
            <span className="flex items-center gap-1 text-[var(--accent-color)] font-bold">
              <Scan className="w-3 h-3" />
              <span>3D_HOLOGRAM // AVATAR</span>
            </span>
            <span>DIAS_YERMEK</span>
          </div>

          <div className="flex items-center justify-between text-[9px] text-white/40">
            <span>WIREFRAME_RENDER</span>
            <span className="text-[var(--accent-color)]">[ONLINE]</span>
          </div>
        </div>

        {/* Laser Sweep */}
        <div className="absolute left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent shadow-[0_0_15px_var(--accent-color)] laser-scanner-line pointer-events-none z-10" />

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain relative z-0"
        />

        {/* Ambient Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 rounded-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, var(--accent-glow), transparent 70%)`,
          }}
        />
      </div>
    </div>
  );
}
