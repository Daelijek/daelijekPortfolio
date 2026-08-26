'use client';

import React, { useRef, useEffect } from 'react';
import { useThemeAudio } from '../../context/ThemeAudioContext';

export default function HologramHead() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const { theme } = useThemeAudio();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let angle = 0;
    const width = (canvas.width = 460);
    const height = (canvas.height = 580);

    const getColors = () => {
      switch (theme) {
        case 'cyan': return { r: 0, g: 243, b: 255 };
        case 'amber': return { r: 255, g: 184, b: 0 };
        case 'crimson': return { r: 255, g: 0, b: 85 };
        case 'obsidian': return { r: 255, g: 255, b: 255 };
        default: return { r: 0, g: 255, b: 159 };
      }
    };

    // Pre-calculate fixed 3D Head Vertices (Static, Zero Re-generation)
    const points = [];
    const numPoints = 160;

    // Head Volume using Fibonacci Sphere distribution
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const r = 90 + (1 - Math.abs(y)) * 12;
      points.push({
        x: Math.cos(theta) * radius * r,
        y: y * 115 - 15,
        z: Math.sin(theta) * radius * r,
        type: 'head',
      });
    }

    // Glasses - Left rim
    for (let i = 0; i < 20; i++) {
      const t = (i / 20) * Math.PI * 2;
      points.push({ x: -30 + Math.cos(t) * 20, y: -22 + Math.sin(t) * 15, z: 98, type: 'glasses' });
    }
    // Glasses - Right rim
    for (let i = 0; i < 20; i++) {
      const t = (i / 20) * Math.PI * 2;
      points.push({ x: 30 + Math.cos(t) * 20, y: -22 + Math.sin(t) * 15, z: 98, type: 'glasses' });
    }
    // Glasses Bridge
    points.push({ x: -10, y: -22, z: 100, type: 'glasses' });
    points.push({ x: 0, y: -22, z: 102, type: 'glasses' });
    points.push({ x: 10, y: -22, z: 100, type: 'glasses' });

    let currentRotX = 0;
    let currentRotY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.008;
      const col = getColors();

      // Smooth LERP mouse tracking
      currentRotX += (mouseRef.current.targetY * -0.3 - currentRotX) * 0.06;
      currentRotY += (mouseRef.current.targetX * 0.45 + angle - currentRotY) * 0.06;

      const cx = width / 2;
      const cy = height / 2;

      // Project 3D coordinates
      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);
      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);

      const projected = points.map((p) => {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        const fov = 360;
        const scale = fov / (fov + z2 + 160);
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          z: z2,
          scale,
          type: p.type,
        };
      });

      // Draw Wireframe mesh connecting lines
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          const maxDist = p1.type === 'glasses' && p2.type === 'glasses' ? 18 : 26;

          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / maxDist) * (p1.type === 'glasses' ? 0.6 : 0.28);
            ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${alpha})`;
            ctx.lineWidth = p1.type === 'glasses' ? 1.0 : 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw Glowing Nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.beginPath();
        const r = p.type === 'glasses' ? 1.6 * p.scale : 1.2 * p.scale;
        ctx.arc(p.x, p.y, Math.max(0.7, r), 0, Math.PI * 2);
        const alpha = Math.min(1, Math.max(0.15, (p.z + 120) / 240));
        ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${p.type === 'glasses' ? 0.9 : alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [theme]);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain filter drop-shadow-[0_0_20px_var(--accent-glow)]"
      />
    </div>
  );
}
