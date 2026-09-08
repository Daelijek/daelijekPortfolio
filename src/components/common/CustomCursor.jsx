'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Strictly disable on touch screens, mobile/tablet devices, or coarse pointer inputs
    const checkCapability = () => {
      if (typeof window === 'undefined') return;
      const isTouch =
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
        window.innerWidth < 1024;
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

      setIsEnabled(!isTouch && hasFinePointer);
    };

    checkCapability();
    window.addEventListener('resize', checkCapability);
    return () => window.removeEventListener('resize', checkCapability);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    let animId;
    let hasMoved = false;

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
        setIsVisible(true);
      }

      // Move center dot immediately without delay/transitions
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    // 60-120 FPS hardware-accelerated LERP loop for smooth trailing ring
    const renderLoop = () => {
      if (hasMoved && ringRef.current) {
        const lerpFactor = 0.16;
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.dataset?.cursor === 'pointer'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div
      className={`hidden lg:block fixed inset-0 pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Center dot (instant follow) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      >
        <div
          className={`rounded-full transition-all duration-150 ease-out ${
            isClicking
              ? 'w-2 h-2 bg-white scale-75'
              : isHovered
              ? 'w-3 h-3 bg-[var(--accent-color)] scale-125 shadow-[0_0_12px_var(--accent-color)]'
              : 'w-2 h-2 bg-[var(--accent-color)]'
          }`}
        />
      </div>

      {/* Trailing HUD ring (smooth 60-120fps LERP inertia) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      >
        <div
          className={`rounded-full border border-[var(--accent-color)] transition-all duration-200 ease-out ${
            isHovered
              ? 'w-10 h-10 opacity-70 scale-110 rotate-45 border-dashed'
              : 'w-6 h-6 opacity-35 scale-100'
          }`}
        />
      </div>
    </div>
  );
}
