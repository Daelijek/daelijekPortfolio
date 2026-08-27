'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only on non-touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.dataset.cursor === 'pointer'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Center dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isClicking
              ? 'w-2 h-2 bg-white scale-75'
              : isHovered
              ? 'w-3 h-3 bg-[var(--accent-color)] scale-125 shadow-[0_0_12px_var(--accent-color)]'
              : 'w-2 h-2 bg-[var(--accent-color)]'
          }`}
        />
      </div>

      {/* Trailing HUD Crosshair ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full border border-[var(--accent-color)] transition-all duration-300 ${
            isHovered
              ? 'w-10 h-10 opacity-70 scale-110 rotate-45 border-dashed'
              : 'w-6 h-6 opacity-30 scale-100'
          }`}
        />
      </div>
    </>
  );
}
