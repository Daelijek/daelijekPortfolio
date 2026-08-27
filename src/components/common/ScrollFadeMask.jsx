'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollFadeMask({ children }) {
  const pathname = usePathname();

  // Root HUD landing page is fixed and has its own layout
  if (pathname === '/') {
    return <>{children}</>;
  }

  return (
    <>
      {/* Top Multi-Stop Optical Scrim (Smooth cubic fade under nav header) */}
      <div
        className="fixed top-0 left-0 right-0 h-36 sm:h-44 pointer-events-none z-20 select-none"
        style={{
          background: `linear-gradient(
            to bottom,
            #040608 0%,
            rgba(4, 6, 8, 0.98) 25%,
            rgba(4, 6, 8, 0.88) 45%,
            rgba(4, 6, 8, 0.65) 62%,
            rgba(4, 6, 8, 0.40) 76%,
            rgba(4, 6, 8, 0.18) 88%,
            rgba(4, 6, 8, 0.05) 96%,
            transparent 100%
          )`,
        }}
      />

      {/* Bottom Multi-Stop Optical Scrim (Smooth cubic fade above footer) */}
      <div
        className="fixed bottom-0 left-0 right-0 h-24 sm:h-32 pointer-events-none z-20 select-none"
        style={{
          background: `linear-gradient(
            to top,
            #040608 0%,
            rgba(4, 6, 8, 0.95) 25%,
            rgba(4, 6, 8, 0.75) 50%,
            rgba(4, 6, 8, 0.40) 72%,
            rgba(4, 6, 8, 0.12) 88%,
            transparent 100%
          )`,
        }}
      />

      <div className="relative z-10 w-full">
        {children}
      </div>
    </>
  );
}
