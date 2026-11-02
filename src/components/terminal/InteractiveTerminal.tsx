'use client';

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { CornerDownLeft, Maximize2, Minimize2, Terminal as TerminalIcon, X } from 'lucide-react';
import { soundFx } from '@/audio/soundEffects';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import { useDialogFocus } from '@/hooks/useDialogFocus';
import { useLocalizedPath, useSwitchLocale } from '@/i18n/I18nProvider';
import { track } from '@/lib/analytics';
import { QUICK_COMMANDS, completeCommand, runCommand, type CommandContext, type TerminalLine, type TerminalLineData } from './commands';
import TerminalOutput from './TerminalOutput';

const WELCOME: TerminalLine[] = [
  {
    id: 'welcome-1',
    type: 'banner',
    content: `╔════════════════════════════════════════════════════════════════╗
║   DIAS YERMEK // HUD SYSTEM TERMINAL KERNEL v2.6.4 (2026)      ║
║   Type "help" to display commands or click quick chips below.  ║
╚════════════════════════════════════════════════════════════════╝`,
  },
  { id: 'welcome-2', type: 'info', content: '[TIP] Run "sudo hire dias" for contract protocols, or "skills" for competency matrix.' },
];

/** Triggers a file download through the attachment endpoint (works in Chrome where `download` is ignored). */
function downloadCv() {
  soundFx.playDownload();
  const link = document.createElement('a');
  link.href = '/api/cv';
  link.download = 'Dias_Yermek_CV.pdf';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => link.remove(), 1200);
}

/** Easter-egg command line (toggle with ` or ~), rendered as a modal dialog. */
export default function InteractiveTerminal() {
  const router = useRouter();
  const { setTheme, soundEnabled, setSoundEnabled } = useThemeAudio();
  const { href } = useLocalizedPath();
  const switchLocale = useSwitchLocale();

  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [celebrating, setCelebrating] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const trapFocus = useDialogFocus(isOpen, dialogRef, { initialFocusRef: inputRef });
  // Monotonic counter for line keys (Date.now() can collide within one millisecond).
  const lineIdRef = useRef(0);

  const toggle = () => {
    soundFx.playClick();
    setIsOpen((open) => !open);
  };
  const close = () => {
    soundFx.playClick();
    setIsOpen(false);
  };

  // Keep the newest output in view.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, isOpen]);

  // While open: pause smooth scrolling and lock the page behind the dialog.
  useEffect(() => {
    if (!isOpen) return;
    window.__lenis?.stop();
    document.body.style.overflow = 'hidden';
    track('Terminal Opened');
    return () => {
      window.__lenis?.start();
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Global shortcut: ` or ~ toggles (unless typing in another field), Escape closes.
  useEffect(() => {
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        const active = document.activeElement;
        const typingElsewhere = active !== inputRef.current && (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement);
        if (typingElsewhere) return;
        e.preventDefault();
        toggle();
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const ctx = useMemo<CommandContext>(
    () => ({
      soundEnabled,
      setTheme,
      setSoundEnabled,
      switchLocale,
      navigate: (path) => setTimeout(() => router.push(href(path)), 350),
      openUrl: (url) => window.open(url, '_blank', 'noopener,noreferrer'),
      downloadCv,
      celebrate: () => {
        soundFx.playAccessGranted();
        setCelebrating(true);
        setTimeout(() => setCelebrating(false), 5000);
      },
      playError: () => soundFx.playTerminalError(),
    }),
    [soundEnabled, setTheme, setSoundEnabled, switchLocale, router, href]
  );

  const withIds = (data: TerminalLineData[]): TerminalLine[] =>
    data.map((line) => ({ ...line, id: `line-${++lineIdRef.current}` }));

  const execute = (commandText = input) => {
    const raw = commandText.trim();
    if (!raw) return;

    soundFx.playClick();
    // Only the command name is sent, never the free-text arguments the visitor typed.
    track('Terminal Command Executed', { command: raw.split(/\s+/)[0].toLowerCase() });
    setHistory((prev) => (prev[0] === raw ? prev : [raw, ...prev]));
    setHistoryIndex(-1);
    setInput('');

    const result = runCommand(raw, ctx);
    if (result.kind === 'clear') return setLines([]);
    if (result.kind === 'close') return setIsOpen(false);
    setLines((prev) => [...prev, ...withIds([{ type: 'command', content: `dias@portfolio:~$ ${raw}` }, ...result.lines])]);
  };

  const recall = (index: number) => {
    setHistoryIndex(index);
    const value = index === -1 ? '' : history[index];
    setInput(value);
    requestAnimationFrame(() => inputRef.current?.setSelectionRange(value.length, value.length));
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '`' || e.key === '~') {
      e.preventDefault();
      close();
      return;
    }
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) soundFx.playKeypress();

    if (e.key === 'Enter') {
      execute();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) recall(Math.min(historyIndex + 1, history.length - 1));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) recall(historyIndex - 1);
    } else if (e.key === 'Tab' && !e.shiftKey) {
      // Tab completes a partially typed command; with nothing to complete it moves focus as usual.
      const match = completeCommand(input);
      if (match && match !== input.trim().toLowerCase()) {
        e.preventDefault();
        soundFx.playKeypress();
        setInput(match);
      }
    }
  };

  return (
    <>
      {/* Trigger pill (bottom-left) */}
      <div className="hud-cli-trigger fixed bottom-3 sm:bottom-4 lg:bottom-5 left-3 sm:left-4 lg:left-5 z-40 select-none">
        <button
          type="button"
          onClick={toggle}
          title="Toggle Terminal (~ or `)"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="group flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#060a0f]/80 hover:bg-[#081018] border border-white/15 hover:border-[var(--accent-color)] text-[var(--heading-tint)] hover:text-white transition-all shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-2xl font-mono text-xs cursor-pointer"
        >
          <TerminalIcon aria-hidden="true" className="w-3.5 h-3.5 text-[var(--accent-color)] group-hover:rotate-12 transition-transform" />
          <span className="font-bold tracking-wider hidden sm:inline">&gt;_ CLI</span>
          <span className="text-[10px] px-1 py-0.5 rounded bg-white/10 text-white/50 border border-white/10 font-mono hidden md:inline">~</span>
          <span className="sr-only">Interactive terminal (shortcut: backtick)</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onClick={(e) => {
              if (e.target === e.currentTarget) close(); // click on the backdrop
            }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-2 sm:p-6 bg-black/75 backdrop-blur-md pointer-events-auto select-none"
          >
            {celebrating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 1.5, repeat: 2 }}
                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--accent-color)]/25 via-emerald-500/25 to-cyan-500/25 z-0"
              />
            )}

            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Interactive terminal"
              onKeyDown={trapFocus}
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 25 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className={`relative flex flex-col rounded-2xl bg-[#03060a]/95 border border-[var(--accent-color)]/35 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(0,255,159,0.12)] overflow-hidden font-mono z-10 transition-all duration-300 ${
                isMaximized ? 'w-[98vw] h-[94vh]' : 'w-full max-w-3xl h-[520px] max-h-[85vh] sm:max-h-[80vh]'
              }`}
            >
              {/* Window bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#060c14] border-b border-white/10 select-none">
                {/* Decorative traffic lights (mouse shortcuts; the real buttons are on the right) */}
                <div className="flex items-center gap-2">
                  <span aria-hidden="true" title="Close" onClick={close} className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" />
                  <span aria-hidden="true" title="Toggle size" onClick={() => setIsMaximized((m) => !m)} className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer" />
                  <span aria-hidden="true" title="Maximize" onClick={() => setIsMaximized((m) => !m)} className="w-3 h-3 rounded-full bg-green-500/80 cursor-pointer" />
                  <span className="ml-3 text-xs tracking-wider text-white/60 font-semibold flex items-center gap-2">
                    <TerminalIcon aria-hidden="true" className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                    <span>DIAS_YERMEK // KERNEL v2.6.4</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setIsMaximized((m) => !m);
                    }}
                    title={isMaximized ? 'Restore' : 'Maximize'}
                    aria-label={isMaximized ? 'Restore terminal size' : 'Maximize terminal'}
                    className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  >
                    {isMaximized ? <Minimize2 aria-hidden="true" className="w-3.5 h-3.5" /> : <Maximize2 aria-hidden="true" className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    title="Close (ESC or ~)"
                    aria-label="Close terminal"
                    className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  >
                    <X aria-hidden="true" className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Output (clicking anywhere focuses the input) */}
              <div
                ref={bodyRef}
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                onClick={() => inputRef.current?.focus()}
                role="log"
                aria-live="polite"
                className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-2 text-xs sm:text-sm font-mono leading-relaxed cursor-text overscroll-contain"
              >
                <TerminalOutput lines={lines} />
              </div>

              {/* Quick command chips */}
              <div className="px-4 py-2 bg-[#05090f] border-t border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar select-none text-[11px]">
                <span className="text-white/55 mr-1 shrink-0 font-semibold">[QUICK]</span>
                {QUICK_COMMANDS.map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => {
                      execute(cmd);
                      inputRef.current?.focus();
                    }}
                    className="shrink-0 px-2 py-0.5 rounded-md bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-[var(--accent-color)] text-white/70 hover:text-[var(--accent-color)] transition-all font-mono active:scale-95 cursor-pointer"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Prompt */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#04070d] border-t border-white/10">
                <span className="text-[var(--accent-color)] font-bold text-xs sm:text-sm select-none">dias@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  aria-label="Terminal command"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="type command (e.g. 'help', 'skills', 'sudo hire dias')..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-xs sm:text-sm font-mono placeholder:text-white/25 caret-[var(--accent-color)]"
                />
                <button
                  type="button"
                  onClick={() => {
                    execute();
                    inputRef.current?.focus();
                  }}
                  title="Execute command (Enter)"
                  aria-label="Run command"
                  className="p-1.5 rounded-lg bg-[var(--accent-color)]/10 hover:bg-[var(--accent-color)]/20 border border-[var(--accent-color)]/30 text-[var(--accent-color)] transition-colors active:scale-95 cursor-pointer"
                >
                  <CornerDownLeft aria-hidden="true" className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
