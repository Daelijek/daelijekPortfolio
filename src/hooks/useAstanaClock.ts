'use client';

import { useEffect, useState } from 'react';

const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Almaty', // Astana local time (UTC+5)
  hour12: true,
  hour: 'numeric',
  minute: '2-digit',
});

/** Current time in Astana, e.g. "3:07 PM"; empty string until mounted (avoids hydration mismatch). */
export function useAstanaClock(): string {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    // Minute precision is shown, so a 10 s tick is plenty.
    const id = setInterval(update, 10_000);
    return () => clearInterval(id);
  }, []);

  return time;
}
