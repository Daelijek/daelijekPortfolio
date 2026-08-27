'use client';

import React, { useEffect, useRef } from 'react';
import { useThemeAudio } from '../../context/ThemeAudioContext';

export default function QuantumMatrixBackground() {
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
        default: return { r: 0, g: 255, b: 159 }; // Acid Green
      }
    };

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

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener('resize', resize);

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

    // 3D Grid Parameters
    const cols = perfTier === 'saver' ? 18 : perfTier === 'med' ? 24 : 30;
    const rows = perfTier === 'saver' ? 24 : perfTier === 'med' ? 32 : 40;

    const project3D = (x, y, z, fov = 450) => {
      const scale = fov / (fov + z);
      return {
        x: width * 0.5 + x * scale,
        y: height * 0.5 + y * scale,
        scale,
        depthAlpha: Math.max(0, Math.min(1, 1 - z / 600)),
      };
    };

    const render = () => {
      time += perfTier === 'saver' ? 0.012 : 0.018;

      // Mouse smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, width, height);

      // Deep dark obsidian background
      ctx.fillStyle = '#040608';
      ctx.fillRect(0, 0, width, height);

      const color = getColor();
      const rgb = `${color.r}, ${color.g}, ${color.b}`;

      // Subtle diffuse ambient glow on canvas
      const ambientGrad = ctx.createRadialGradient(width * 0.45, height * 0.5, 20, width * 0.45, height * 0.5, width * 0.65);
      ambientGrad.addColorStop(0, `rgba(${rgb}, 0.055)`);
      ambientGrad.addColorStop(0.6, `rgba(${rgb}, 0.02)`);
      ambientGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = ambientGrad;
      ctx.fillRect(0, 0, width, height);

      // Center point for 3D coordinate space
      const gridWidth = width * 1.35;
      const gridHeight = height * 1.35;
      const cellW = gridWidth / (cols - 1);
      const cellH = gridHeight / (rows - 1);

      // Compute grid vertices in 3D
      const grid = [];

      for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
          const baseX = -gridWidth * 0.5 + c * cellW;
          const baseY = -gridHeight * 0.5 + r * cellH;

          // Quantum harmonic breathing wave
          const wave1 = Math.sin(c * 0.35 + time * 0.8) * Math.cos(r * 0.35 + time * 0.6);
          const wave2 = Math.sin((c + r) * 0.25 - time * 1.2) * 18;
          const radial = Math.sin(Math.sqrt(c * c + r * r) * 0.4 - time * 1.5) * 12;

          let z = (wave1 * 28 + wave2 + radial);

          // 2D screen projection of base coordinates to check cursor proximity
          const screenX = width * 0.5 + baseX;
          const screenY = height * 0.5 + baseY;

          // Gravitational warp / distortion under cursor
          let warpX = 0;
          let warpY = 0;
          let isNearCursor = false;

          if (mx > -500 && my > -500) {
            const dx = screenX - mx;
            const dy = screenY - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 200;

            if (dist < maxDist) {
              isNearCursor = true;
              const force = (1 - dist / maxDist);
              // Gravitational funnel pulling towards cursor and deepening Z
              warpX = -dx * force * 0.35;
              warpY = -dy * force * 0.35;
              z -= force * 70; // deepens the lattice
            }
          }

          const proj = project3D(baseX + warpX, baseY + warpY, z + 120);
          grid[r][c] = {
            ...proj,
            z,
            isNearCursor,
            pulse: Math.sin(time * 2 + c * 0.2 + r * 0.2) * 0.5 + 0.5,
          };
        }
      }

      // Draw horizontal lattice lines with enhanced glow
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const pt = grid[r][c];
          if (c === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = `rgba(${rgb}, 0.17)`;
        ctx.lineWidth = 0.85;
        ctx.stroke();
      }

      // Draw vertical lattice lines with enhanced glow
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const pt = grid[r][c];
          if (r === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = `rgba(${rgb}, 0.17)`;
        ctx.lineWidth = 0.85;
        ctx.stroke();
      }

      // Draw diagonal quantum energy cross-threads
      ctx.beginPath();
      for (let r = 0; r < rows - 1; r += 2) {
        for (let c = 0; c < cols - 1; c += 2) {
          const p1 = grid[r][c];
          const p2 = grid[r + 1][c + 1];
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
      }
      ctx.strokeStyle = `rgba(${rgb}, 0.07)`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Draw glowing Quantum Lattice Nodes
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = grid[r][c];

          // Draw node points
          const isMajorNode = (r % 3 === 0 && c % 3 === 0);
          const isGlowNode = pt.isNearCursor || (isMajorNode && pt.pulse > 0.75);

          if (isGlowNode) {
            ctx.fillStyle = `rgba(${rgb}, ${0.4 + pt.pulse * 0.45})`;
            ctx.shadowColor = `rgba(${rgb}, 0.6)`;
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, (1.8 + pt.pulse * 1.2) * pt.scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          } else if (isMajorNode) {
            ctx.fillStyle = `rgba(${rgb}, 0.25)`;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 1.2 * pt.scale, 0, Math.PI * 2);
            ctx.fill();
          }
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
      {/* 3D Quantum Matrix Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
      />

      {/* Atmospheric edge gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e14]/60 via-transparent to-[#0a0e14]/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e14]/70 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
