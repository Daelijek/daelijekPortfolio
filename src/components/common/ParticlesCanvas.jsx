'use client';

import React, { useEffect, useRef } from 'react';
import { useThemeAudio } from '../../context/ThemeAudioContext';

export default function ParticlesCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
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

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Color based on active theme
    const getThemeColor = () => {
      switch (theme) {
        case 'cyan': return { r: 0, g: 243, b: 255 };
        case 'amber': return { r: 255, g: 184, b: 0 };
        case 'crimson': return { r: 255, g: 0, b: 85 };
        case 'obsidian': return { r: 255, g: 255, b: 255 };
        default: return { r: 0, g: 255, b: 159 }; // Acid Green
      }
    };

    // Calculate dynamic node count based on screen area & performance tier
    const area = width * height;
    const baseDensity = perfTier === 'saver' ? 32000 : perfTier === 'med' ? 19000 : 12500;
    const particleCount = Math.min(150, Math.max(35, Math.round(area / baseDensity)));

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const isHub = Math.random() > 0.82; // 18% are primary hub nodes
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: isHub ? Math.random() * 1.5 + 1.8 : Math.random() * 1.3 + 0.8,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulsePhase: Math.random() * Math.PI * 2,
        isHub,
      });
    }

    let time = 0;
    let lastTime = null;

    const render = (currentTime = performance.now()) => {
      if (lastTime === null) {
        lastTime = currentTime;
      }
      const deltaMs = currentTime - lastTime;
      lastTime = currentTime;

      const clampedDelta = Math.min(Math.max(deltaMs, 0), 100);
      const dtModifier = clampedDelta / (1000 / 60);

      time += 0.025 * dtModifier;

      // Mouse position easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08 * dtModifier;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08 * dtModifier;

      ctx.clearRect(0, 0, width, height);
      const color = getThemeColor();
      const mouse = mouseRef.current;
      const connectionDist = width < 640 ? 95 : 125;

      // 1. Update Positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * dtModifier;
        p.y += p.vy * dtModifier;

        // Wrap around boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Interactive mouse repulsion/funnel
        if (mouse.x > -500) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140 && dist > 0.01) {
            const force = ((1 - dist / 140) * 1.4) * dtModifier;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }
        }
      }

      // 2. Draw Constellation Connective Lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alphaFactor = p1.isHub || p2.isHub ? 0.35 : 0.18;
            const alpha = (1 - dist / connectionDist) * alphaFactor;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
            ctx.lineWidth = p1.isHub && p2.isHub ? 1.0 : 0.6;
            ctx.stroke();
          }
        }

        // Draw interactive mouse connection links
        if (mouse.x > -500) {
          const mdx = p1.x - mouse.x;
          const mdy = p1.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140) {
            const mAlpha = (1 - mdist / 140) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${mAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 3. Draw Nodes / Particles with Hub Auras
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.5 + 0.5;
        const currentRadius = p.isHub ? p.radius * (1.15 + pulse * 0.35) : p.radius;
        const baseAlpha = p.isHub ? 0.85 : 0.45 + pulse * 0.3;

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${baseAlpha})`;
        ctx.fill();

        // Pulsing glow aura around hub nodes
        if (p.isHub) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${0.12 + pulse * 0.14})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, perfTier]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-85 select-none"
    />
  );
}
