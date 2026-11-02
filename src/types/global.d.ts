import type Lenis from 'lenis';

declare global {
  interface Window {
    /** Active smooth-scroll instance (set by SmoothScroll; paused by the terminal dialog). */
    __lenis?: Lenis;
  }
}

export {};

declare module 'csstype' {
  interface Properties {
    /** Non-standard WebKit property used to stop image dragging in galleries. */
    WebkitUserDrag?: 'auto' | 'element' | 'none';
  }
}
