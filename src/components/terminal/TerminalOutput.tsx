import { Fragment, type MouseEvent } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import type { TerminalLine } from './commands';

const URL_OR_EMAIL = /(https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
const stop = (e: MouseEvent) => e.stopPropagation();

/** Renders text with clickable URLs and e-mail addresses. */
function LinkifiedText({ text }: { text: string }) {
  return (
    <>
      {text.split(URL_OR_EMAIL).map((part, i) => {
        if (part.startsWith('http://') || part.startsWith('https://')) {
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stop}
              className="text-[var(--accent-color)] underline underline-offset-2 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1 font-semibold"
            >
              <span>{part}</span>
              <ExternalLink aria-hidden="true" className="w-2.5 h-2.5 inline opacity-70" />
            </a>
          );
        }
        // The prompt "dias@portfolio" is not an e-mail address.
        if (part.includes('@') && !part.includes(' ') && !part.startsWith('dias@')) {
          return (
            <a
              key={i}
              href={`mailto:${part}`}
              onClick={stop}
              className="text-[var(--accent-color)] underline underline-offset-2 hover:text-white transition-colors cursor-pointer font-semibold"
            >
              {part}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

function Line({ line }: { line: TerminalLine }) {
  switch (line.type) {
    case 'command':
      return (
        <div className="text-white/90 font-bold flex items-start gap-1.5">
          <span className="text-[var(--accent-color)] select-none">&gt;</span>
          <span>{line.content}</span>
        </div>
      );
    case 'banner':
      return <pre className="text-[var(--accent-color)] text-[10px] sm:text-xs overflow-x-auto leading-tight select-none">{line.content}</pre>;
    case 'skills-table':
      return (
        <div className="my-2 border border-[var(--border-subtle)] rounded-lg overflow-hidden bg-black/40">
          <div className="grid grid-cols-12 bg-white/[0.04] border-b border-[var(--border-subtle)] px-3 py-1.5 text-[11px] font-bold text-[var(--heading-tint)] tracking-wider">
            <span className="col-span-12 sm:col-span-4 uppercase">[SECTOR]</span>
            <span className="hidden sm:inline sm:col-span-8 uppercase">[TECHNOLOGIES & COMPETENCIES]</span>
          </div>
          <div className="divide-y divide-white/[0.06] text-xs">
            {line.data.map((row) => (
              <div key={row.sector} className="grid grid-cols-12 px-3 py-2 items-start hover:bg-white/[0.02] transition-colors gap-1 sm:gap-0">
                <span className="col-span-12 sm:col-span-4 text-[var(--accent-color)] font-semibold pr-2">{row.sector}</span>
                <span className="col-span-12 sm:col-span-8 text-white/80">{row.tech}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 'cv-download':
      return (
        <div className="p-3.5 my-1 rounded-xl bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 space-y-2.5">
          <div className="text-[var(--accent-color)] font-medium flex items-center gap-2 text-xs sm:text-sm">
            <Download aria-hidden="true" className="w-4 h-4 shrink-0" />
            <span>{line.content}</span>
          </div>
          <div className="text-white/80 text-xs flex items-center gap-2.5 flex-wrap pt-0.5">
            <a
              href="/api/cv"
              download="Dias_Yermek_CV.pdf"
              onClick={stop}
              className="px-3 py-1.5 rounded-lg bg-[var(--accent-color)] text-black font-bold hover:bg-white transition-all inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,255,159,0.3)] active:scale-95 cursor-pointer select-none"
            >
              <Download aria-hidden="true" className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <a
              href="/dias_yermek_cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={stop}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all inline-flex items-center gap-1.5 cursor-pointer select-none"
            >
              <span>Open in Browser</span>
              <ExternalLink aria-hidden="true" className="w-3 h-3 opacity-80" />
            </a>
          </div>
        </div>
      );
    case 'easter-egg':
      return (
        <div className="text-emerald-400 font-bold text-xs sm:text-sm bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-lg overflow-x-auto select-text shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          <pre className="whitespace-pre-wrap font-mono leading-normal">
            <LinkifiedText text={line.content} />
          </pre>
        </div>
      );
    case 'error':
      return <div className="text-red-400 font-medium pl-3 border-l-2 border-red-500/50">{line.content}</div>;
    case 'success':
      return (
        <div className="text-[var(--accent-color)] font-medium pl-3 border-l-2 border-[var(--accent-color)]/50">
          <LinkifiedText text={line.content} />
        </div>
      );
    case 'info':
      return <div className="text-white/60 text-xs italic pl-1">{line.content}</div>;
    default:
      return (
        <div className="text-white/80 select-text">
          <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm leading-normal">
            <LinkifiedText text={line.content} />
          </pre>
        </div>
      );
  }
}

export default function TerminalOutput({ lines }: { lines: TerminalLine[] }) {
  return (
    <>
      {lines.map((line) => (
        <Line key={line.id} line={line} />
      ))}
    </>
  );
}
