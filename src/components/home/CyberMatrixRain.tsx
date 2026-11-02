'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { startAnimationLoop } from '@/lib/animationLoop';

// Full-height Cyber Terminal Matrix Rain Canvas
export default function CyberMatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;
    let width = (canvas.width = parent.offsetWidth);
    let height = (canvas.height = parent.offsetHeight);


    const tokens = [
      '0', '1', '0x7F', '0xA4', '0xFF', '0x00', '0x9C', '0x1A', '0x3E', '0x88',
      'KERNEL', 'QUANTUM', 'ASTANA', 'DIAS', 'YERMEK', 'SHADER', 'NODE',
      'VRAM', 'GL2', 'PIPE', 'BUFFER', 'SYNC', 'WEBGL2', 'LATENCY',
      '14MS', '60FPS', '51.16N', '71.44E', '2026', 'OK', 'READY', '101', '010',
      '01100', '10011', '0xFE', '0x2B', 'PORTFOLIO', 'SYS_INIT', 'HEX_STREAM'
    ];

    const columnWidth = 26;
    const columns = Math.floor(width / columnWidth);
    const drops: number[] = [];
    const speeds: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -60;
      speeds[i] = 1 + Math.random() * 2.2;
    }

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      const targetColumns = Math.floor(width / columnWidth);
      while (drops.length < targetColumns) {
        drops.push(Math.random() * -60);
        speeds.push(1 + Math.random() * 2.2);
      }
    };

    window.addEventListener('resize', handleResize);

    // dtModifier: elapsed time in 60 fps frames (provided by the shared loop driver)
    const draw = (dtModifier: number) => {

      // Clear canvas completely to keep 100% transparency
      ctx.clearRect(0, 0, width, height);

      ctx.font = '10px "JetBrains Mono", ui-monospace, SFMono-Regular, monospace';

      for (let i = 0; i < drops.length; i++) {
        const x = i * columnWidth + 6;
        const headY = drops[i] * 16;

        // Render head + trailing 5 fading characters
        for (let t = 0; t < 6; t++) {
          const charY = headY - t * 16;
          if (charY > -20 && charY < height + 20) {
            const text = tokens[(Math.floor(drops[i] * 7 + t + i * 13)) % tokens.length];

            if (t === 0) {
              // Leading character (Clean bright white)
              ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
              ctx.fillText(text, x, charY);
            } else if (t === 1) {
              ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
              ctx.fillText(text, x, charY);
            } else {
              // Trailing fading green
              const alpha = Math.max(0.04, 0.28 - t * 0.05);
              ctx.fillStyle = `rgba(0, 255, 159, ${alpha})`;
              ctx.fillText(text, x, charY);
            }
          }
        }

        // Frame-rate independent respawn probability matching 60fps base rate (0.04)
        const resetProbability = 1 - Math.pow(0.96, dtModifier);
        if ((headY > height + 80 && Math.random() < resetProbability) || headY > height + 350) {
          drops[i] = -Math.random() * 10;
          speeds[i] = 1 + Math.random() * 2;
        }

        drops[i] += speeds[i] * 0.35 * dtModifier;
      }

    };

    // Reduced motion: no falling characters at all (a static frame would be empty anyway).
    if (reducedMotion) {
      return () => window.removeEventListener('resize', handleResize);
    }

    // Fixed 60 fps cap: the rain only plays on the boot screen, where the visitor switches
    // perf tiers — depending on the tier would restart the animation on every click.
    const stopLoop = startAnimationLoop(draw, { element: canvas, fps: 60 });

    return () => {
      window.removeEventListener('resize', handleResize);
      stopLoop();
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 select-none"
    />
  );
}
