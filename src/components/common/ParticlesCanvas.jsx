'use client';

import React, { useEffect, useRef } from 'react';
import { useThemeAudio } from '../../context/ThemeAudioContext';

export default function ParticlesCanvas() {
  const canvasRef = useRef(null);
  const { theme, perfTier } = useThemeAudio();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Color based on theme
    const getThemeColor = () => {
      switch (theme) {
        case 'cyan': return { r: 0, g: 243, b: 255 };
        case 'amber': return { r: 255, g: 184, b: 0 };
        case 'crimson': return { r: 255, g: 0, b: 85 };
        case 'obsidian': return { r: 255, g: 255, b: 255 };
        default: return { r: 0, g: 255, b: 159 }; // Acid green
      }
    };

    const particleCount = perfTier === 'saver' ? 30 : perfTier === 'med' ? 60 : 95;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    const isMobileOrTouch =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
       'ontouchstart' in window ||
       (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
       window.innerWidth < 1024);

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    if (!isMobileOrTouch) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);
      const color = getThemeColor();

      const activeMouse = isMobileOrTouch
        ? {
            x: width * 0.5 + Math.sin(time * 0.7) * (width * 0.35),
            y: height * 0.5 + Math.cos(time * 0.5) * (height * 0.3),
          }
        : mouse;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse gravity / repulsion
        const dx = activeMouse.x - p.x;
        const dy = activeMouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x -= (dx / dist) * 1.2;
          p.y -= (dy / dist) * 1.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${p.alpha * 0.7})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${0.15 * (1 - cdist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (!isMobileOrTouch) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, perfTier]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-75"
    />
  );
}
