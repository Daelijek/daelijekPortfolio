'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth inertial scrolling engine
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      syncTouch: false, // Keep native 120Hz ProMotion touch responsiveness on mobile devices
      anchors: true,
      autoRaf: true,
      stopInertiaOnNavigate: true,
    });

    lenisRef.current = lenis;

    if (typeof window !== 'undefined') {
      window.__lenis = lenis;
    }

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== 'undefined' && window.__lenis === lenis) {
        delete window.__lenis;
      }
    };
  }, []);

  // Instantly reset scroll to top on page route transition
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return children;
}
