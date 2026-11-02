import type Lenis from 'lenis';

declare global {
  interface Window {
    /** Active smooth-scroll instance (set by SmoothScroll; paused by the terminal dialog). */
    __lenis?: Lenis;
  }
}

export {};
