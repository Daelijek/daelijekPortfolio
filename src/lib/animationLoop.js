// Shared requestAnimationFrame driver for every canvas/DOM animation on the site.
//
// Each animation used to run its own unbounded rAF loop. This driver adds, in one place:
//  - a frame-rate cap (high-refresh 120/144 Hz screens no longer redraw backgrounds 144x/s)
//  - pausing while the tab is hidden or the element is scrolled out of the viewport
//  - a normalized time step, so motion speed is the same at 30, 60 or 144 fps
//  - a single static frame for prefers-reduced-motion

const FRAME_60 = 1000 / 60;

/** Frame-rate cap for decorative animations per performance tier. */
export const FPS_BY_TIER = { high: 60, med: 45, saver: 30 };

/**
 * @param {(dt: number, now: number) => void} frame
 *   Called once per drawn frame. `dt` is the elapsed time in 60 fps frames
 *   (1 at 60 fps, 2 at 30 fps), clamped to 6 so a stall never causes a jump.
 * @param {object}  [options]
 * @param {Element} [options.element]  Pause while this element is outside the viewport.
 * @param {number}  [options.fps=60]   Maximum frames per second.
 * @param {boolean} [options.staticFrame=false]  Draw one frame and stop (reduced motion).
 * @returns {() => void} stop function — call it from the effect cleanup.
 */
export function startAnimationLoop(frame, { element, fps = 60, staticFrame = false } = {}) {
  if (typeof window === 'undefined') return () => {};

  if (staticFrame) {
    const id = requestAnimationFrame((now) => frame(1, now));
    return () => cancelAnimationFrame(id);
  }

  const minInterval = 1000 / fps;
  let rafId = null;
  let lastDrawn = null;
  let pageVisible = !document.hidden;
  let inViewport = true;

  const tick = (now) => {
    rafId = requestAnimationFrame(tick);

    if (lastDrawn !== null) {
      const elapsed = now - lastDrawn;
      // Small tolerance: rAF timestamps jitter around the display interval.
      if (elapsed < minInterval - 2) return;
      const dt = Math.min(elapsed / FRAME_60, 6);
      lastDrawn = now;
      frame(dt, now);
    } else {
      lastDrawn = now;
      frame(1, now);
    }
  };

  const start = () => {
    if (rafId !== null || !pageVisible || !inViewport) return;
    lastDrawn = null; // resume without a large time step
    rafId = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (rafId === null) return;
    cancelAnimationFrame(rafId);
    rafId = null;
  };

  const onVisibilityChange = () => {
    pageVisible = !document.hidden;
    if (pageVisible) start();
    else stop();
  };
  document.addEventListener('visibilitychange', onVisibilityChange);

  let observer = null;
  if (element && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      if (inViewport) start();
      else stop();
    });
    observer.observe(element);
  }

  start();

  return () => {
    stop();
    document.removeEventListener('visibilitychange', onVisibilityChange);
    observer?.disconnect();
  };
}
