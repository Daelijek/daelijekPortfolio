'use client';

import { useCallback, useEffect, useState } from 'react';
import { soundFx } from '@/audio/soundEffects';
import type { Dictionary } from '@/content/types';

const SESSION_KEY = 'daelijek_booted';

type PreloaderText = Dictionary['system']['preloader'];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * State machine of the home page boot screen (shown once per browser session).
 *
 * The counter animates towards a target while short real steps run (font loading);
 * once it reaches 100 the visitor enters with the button, a click anywhere,
 * Escape, or Enter (unless Enter is activating one of the screen's own controls).
 */
export function useBootSequence(text: PreloaderText) {
  const [isBooted, setIsBooted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState(text.initCore);

  useEffect(() => {
    if (isBooted) return;

    try {
      if (sessionStorage.getItem(SESSION_KEY) === 'true') {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage only exists in the browser
        setIsBooted(true);
        return;
      }
    } catch {
      // Storage unavailable: show the boot screen
    }

    let mounted = true;
    let target = 0;
    let rendered = 0;

    // Smooth counter interpolation towards the current target.
    const ticker = setInterval(() => {
      if (rendered >= target) return;
      rendered = Math.min(100, rendered + Math.max(1, Math.ceil((target - rendered) * 0.18)));
      setProgress(rendered);
      if (rendered === 100) setStepText(text.ready);
    }, 20);

    const step = async (label: string, nextTarget: number, ms: number) => {
      if (!mounted) return;
      setStepText(label);
      target = nextTarget;
      await wait(ms);
    };

    (async () => {
      await step(text.initCore, 25, 140);
      await step(text.syncTypography, 50, 0);
      try {
        await document.fonts?.ready;
      } catch {
        // Fonts API unavailable: continue
      }
      await wait(140);
      // Images are not preloaded here: other pages load right-sized versions via next/image.
      await step(text.cachingAssets, 85, 140);
      await step(text.calibratingShaders, 95, 160);
      if (mounted) target = 100;
    })();

    return () => {
      mounted = false;
      clearInterval(ticker);
    };
    // The text only changes with the locale, which remounts the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBooted]);

  const enter = useCallback(() => {
    soundFx.playBootChime();
    setIsBooted(true);
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      // Storage unavailable: the screen shows again next time
    }
  }, []);

  const isReady = !isBooted && progress === 100;

  useEffect(() => {
    if (!isReady) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const onControl = e.target instanceof Element && e.target.closest('button, a, input');
      if (e.key === 'Escape' || (e.key === 'Enter' && !onControl)) {
        e.preventDefault();
        enter();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isReady, enter]);

  return { isBooted, progress, stepText, isReady, enter };
}
