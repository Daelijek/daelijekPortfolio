'use client';

import * as amplitude from '@amplitude/unified';

const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

// Module scope runs once per page load, so no extra "initialized" flag is needed.
if (typeof window !== 'undefined') {
  if (!apiKey) {
    console.warn('Amplitude API key missing — analytics disabled');
  } else {
    amplitude.initAll(apiKey, {
      analytics: { autocapture: true },
      sessionReplay: { sampleRate: 1 },
    });
    amplitude.track('Viewed Home Page', { prompt_version: 'BA400.4' });
  }
}

export default function AmplitudeAnalytics() {
  return null;
}
