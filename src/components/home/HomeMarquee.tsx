import type { Dictionary } from '@/content/types';

type MarqueeItem = Dictionary['system']['marquee'][number];

const EDGE_FADE = 'linear-gradient(to right, transparent 0%, black 50px, black calc(100% - 50px), transparent 100%)';

/** Edge-to-edge rolling stack marquee (desktop XL only). Decorative: hidden from screen readers. */
export default function HomeMarquee({ items }: { items: MarqueeItem[] }) {
  return (
    <div
      aria-hidden="true"
      className="hidden xl:block fixed left-1/2 right-3 sm:right-4 lg:right-6 top-5 z-30 overflow-hidden pointer-events-none select-none"
      style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
    >
      {/* Three copies so the CSS loop never shows a gap. */}
      <div className="animate-marquee flex items-center gap-8 py-2">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 shrink-0">
            <span className="px-2 py-0.5 rounded border border-[var(--accent-border)] bg-[var(--accent-glow)] text-[10px] text-[var(--accent-color)] tracking-wider font-mono uppercase transition-colors">
              {item.label}
            </span>
            <span className="text-xl sm:text-2xl font-normal text-[var(--accent-color)] tracking-wider uppercase font-condensed transition-colors">
              {item.value}
            </span>
            <span className="text-white/20 text-lg ml-2 font-mono">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
