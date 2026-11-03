'use client';

import { useI18n } from '@/i18n/I18nProvider';

/** "AVAILABILITY | ● OPEN" badge; layout/visibility classes come from the caller. */
export default function AvailabilityPill({ className = '' }: { className?: string }) {
  const { common } = useI18n();

  return (
    <div
      className={`pointer-events-auto items-center gap-2 rounded-full bg-black/60 border border-white/15 backdrop-blur-md font-mono shadow-lg ${className}`}
    >
      <span className="text-white/55 tracking-wider text-[10px] uppercase">{common.system.availabilityBadge}</span>
      <span className="w-[1px] h-3 bg-white/20" />
      <span className="text-[var(--accent-color)] font-bold tracking-wider flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-ping" />
        {common.system.availabilityShort}
      </span>
    </div>
  );
}
