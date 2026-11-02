'use client';

import { useCallback, useEffect, useRef, type KeyboardEvent, type RefObject } from 'react';

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
 *  - moves focus into the dialog on open (`initialFocusRef` may be the container itself,
 *    with tabIndex -1, to avoid a visible focus ring)
 *  - returns an onKeyDown handler that keeps Tab / Shift+Tab inside the dialog
 */
export function useDialogFocus(
  isOpen: boolean,
  containerRef: RefObject<HTMLElement | null>,
  { initialFocusRef }: { initialFocusRef?: RefObject<HTMLElement | null> } = {}
) {
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    // Wait one frame so the (animated) dialog is mounted before focusing into it.
    const id = requestAnimationFrame(() => {
      const target = initialFocusRef?.current ?? containerRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      target?.focus({ preventScroll: true });
    });

    return () => {
      cancelAnimationFrame(id);
      const previous = returnFocusRef.current;
      if (previous && document.contains(previous)) previous.focus({ preventScroll: true });
    };
  }, [isOpen, containerRef, initialFocusRef]);

  return useCallback(
    (event: KeyboardEvent) => {
      const container = containerRef.current;
      if (event.key !== 'Tab' || !container) return;
      const focusables = [...container.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      // Focus is on the dialog container itself (initial focus): enter the cycle.
      if (document.activeElement === container) {
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
