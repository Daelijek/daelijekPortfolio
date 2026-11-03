'use client';

import { useEffect } from 'react';
import { classifyLink, setAnalyticsClient, track } from '../../lib/analytics';

const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

// Share of sessions recorded by Session Replay. Recording every session is heavy on
// bandwidth/CPU and unnecessary for a portfolio; 10% is plenty for UX review.
const SESSION_REPLAY_SAMPLE_RATE = 0.1;

let started = false;

function whenIdle(cb: () => void) {
  if ('requestIdleCallback' in window) window.requestIdleCallback(cb, { timeout: 4000 });
  else setTimeout(cb, 1500);
}

export default function AmplitudeAnalytics() {
  // Load the SDK after the page is interactive and keep it out of the initial bundle.
  useEffect(() => {
    if (started) return;
    started = true;

    if (!apiKey) {
      if (process.env.NODE_ENV !== 'production') console.warn('Amplitude API key missing — analytics disabled');
      return;
    }

    whenIdle(async () => {
      try {
        const amplitude = await import('@amplitude/unified');
        // Autocapture includes page views on client-side route changes.
        amplitude.initAll(apiKey, {
          analytics: { autocapture: true },
          sessionReplay: { sampleRate: SESSION_REPLAY_SAMPLE_RATE },
        });
        setAnalyticsClient(amplitude);
      } catch {
        // Blocked by an ad blocker or network failure: analytics stays a no-op.
      }
    });
  }, []);

  // One delegated listener for CV downloads and contact/outbound links,
  // plus any element marked with data-analytics-event.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target instanceof Element ? e.target.closest('a[href], [data-analytics-event]') : null;
      if (!el) return;

      const path = window.location.pathname;
      const custom = el.getAttribute('data-analytics-event');
      if (custom) {
        track(custom, { path });
        return;
      }

      const match = classifyLink(el.getAttribute('href') || '');
      if (match) {
        const { event, ...props } = match;
        track(event, { ...props, path });
      }
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
