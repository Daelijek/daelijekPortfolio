'use client';

import { useCallback, useEffect, useRef } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Keyboard focus management for modal dialogs (WAI-ARIA dialog pattern):
 *  - remembers the element that had focus when the dialog opened and restores it on close
 *  - optionally moves focus into the dialog on open
 *  - returns an onKeyDown handler that keeps Tab / Shift+Tab inside the dialog
 *
 * @param {boolean} isOpen
 * @param {React.RefObject<HTMLElement>} containerRef  the dialog element
 * @param {{ initialFocusRef?: React.RefObject<HTMLElement> }} [options]
 *   initialFocusRef may point at the container itself (with tabIndex -1).
 */
export function useDialogFocus(isOpen, containerRef, { initialFocusRef } = {}) {
  const returnFocusRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    returnFocusRef.current = document.activeElement;

    // Wait one frame so the (animated) dialog is mounted before focusing into it.
    const id = requestAnimationFrame(() => {
      const target = initialFocusRef?.current || containerRef.current?.querySelector(FOCUSABLE);
      target?.focus({ preventScroll: true });
    });

    return () => {
      cancelAnimationFrame(id);
      const previous = returnFocusRef.current;
      if (previous && typeof previous.focus === 'function' && document.contains(previous)) {
        previous.focus({ preventScroll: true });
      }
    };
  }, [isOpen, containerRef, initialFocusRef]);

  return useCallback(
    (event) => {
      if (event.key !== 'Tab' || !containerRef.current) return;
      const focusables = [...containerRef.current.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      // Focus is on the dialog container itself (initial focus): enter the cycle.
      if (document.activeElement === containerRef.current) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [containerRef]
  );
}
