'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, ExternalLink, Download } from 'lucide-react';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { soundFx } from '../../audio/soundEffects';
import * as amplitude from '@amplitude/unified';

const AVAILABLE_COMMANDS = [
  'help',
  'skills',
  'projects',
  'open',
  'about',
  'contact',
  'cv',
  'theme',
  'audio',
  'lang',
  'whoami',
  'date',
  'clear',
  'sudo hire dias',
  'exit'
];

const EXTENDED_COMPLETIONS = [
  ...AVAILABLE_COMMANDS,
  'open fintrack',
  'open opengov',
  'open rolesieve',
  'theme acid',
  'theme cyan',
  'theme amber',
  'theme crimson',
  'theme obsidian',
  'audio on',
  'audio off',
  'lang en',
  'lang ru',
  'lang kk'
];

const SKILLS_DATA = [
  { sector: 'Frontend Core', tech: 'Next.js 15, React 19, TypeScript, Tailwind 4, HTML5/CSS3' },
  { sector: 'Mobile Engineering', tech: 'Flutter & Dart, Riverpod, React Native, Expo CLI' },
  { sector: 'Backend & APIs', tech: 'FastAPI, Python, PostgreSQL, SQLAlchemy 2, REST, WebSockets' },
  { sector: 'AI & Cloud Tech', tech: 'OpenAI & Anthropic SDKs, Vector Embeddings, LLM Streaming' },
  { sector: 'Architecture & Dev', tech: 'Modular Clean Arch, Riverpod, Docker, CI/CD, Vite 6' }
];

// Helper to render text with clickable URLs, emails, and links
function FormattedTerminalText({ text, className }) {
  const tokenRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const parts = text.split(tokenRegex);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('http://') || part.startsWith('https://')) {
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-color)] underline underline-offset-2 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1 font-semibold"
              onClick={(e) => e.stopPropagation()}
            >
              <span>{part}</span>
              <ExternalLink className="w-2.5 h-2.5 inline opacity-70" />
            </a>
          );
        }
        if (part.includes('@') && !part.includes(' ') && !part.startsWith('dias@')) {
          return (
            <a
              key={i}
              href={`mailto:${part}`}
              className="text-[var(--accent-color)] underline underline-offset-2 hover:text-white transition-colors cursor-pointer font-semibold"
              onClick={(e) => e.stopPropagation()}
            >
              {part}
            </a>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
}

export default function InteractiveTerminal() {
  const router = useRouter();
  const { setTheme, soundEnabled, setSoundEnabled, setLang } = useThemeAudio();

  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isCelebrationActive, setIsCelebrationActive] = useState(false);

  const [outputLines, setOutputLines] = useState([
    {
      id: 'welcome-1',
      type: 'banner',
      content: `╔════════════════════════════════════════════════════════════════╗
║   DIAS YERMEK // HUD SYSTEM TERMINAL KERNEL v2.6.4 (2026)      ║
║   Type "help" to display commands or click quick chips below.  ║
╚════════════════════════════════════════════════════════════════╝`
    },
    {
      id: 'welcome-2',
      type: 'info',
      content: '[TIP] Run "sudo hire dias" for contract protocols, or "skills" for competency matrix.'
    }
  ]);

  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of terminal on new outputs
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [outputLines, isOpen]);

  // Isolate scroll and pause Lenis smooth scrolling when terminal is active
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = window.__lenis;
    if (isOpen) {
      if (lenis && typeof lenis.stop === 'function') {
        lenis.stop();
      }
      document.body.style.overflow = 'hidden';
    } else {
      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }
      document.body.style.overflow = '';
    }

    return () => {
      if (typeof window !== 'undefined') {
        const l = window.__lenis;
        if (l && typeof l.start === 'function') {
          l.start();
        }
        document.body.style.overflow = '';
      }
    };
  }, [isOpen]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
      try {
        amplitude.track('Terminal Opened', { prompt_version: 'BA400.4' });
      } catch (err) {
        void err;
      }
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Global keyboard listener for backtick (`) and ESC
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        const activeEl = document.activeElement;
        const activeTag = activeEl?.tagName?.toLowerCase();
        // If active element is NOT the terminal's own input, prevent and toggle
        if (activeEl !== inputRef.current && (activeTag === 'input' || activeTag === 'textarea')) {
          return;
        }
        e.preventDefault();
        soundFx.playClick();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        soundFx.playClick();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen]);

  // Robust PDF download handler that works reliably in Chrome & Chromium browsers
  const handleDownloadCV = useCallback(async () => {
    soundFx.playDownload();
    try {
      const response = await fetch('/dias_yermek_cv.pdf');
      if (!response.ok) throw new Error('Network error');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = blobUrl;
      link.setAttribute('download', 'Dias_Yermek_CV.pdf');
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (link.parentNode) {
          document.body.removeChild(link);
        }
        window.URL.revokeObjectURL(blobUrl);
      }, 1500);
    } catch (err) {
      void err;
      // Fallback direct link invocation attached to DOM
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = '/dias_yermek_cv.pdf';
      link.setAttribute('download', 'Dias_Yermek_CV.pdf');
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (link.parentNode) {
          document.body.removeChild(link);
        }
      }, 1500);
    }
  }, []);

  const executeCommand = (cmdText) => {
    const rawCmd = (cmdText !== undefined ? cmdText : input).trim();
    if (!rawCmd) return;

    soundFx.playClick();
    try {
      amplitude.track('Terminal Command Executed', { command: rawCmd });
    } catch (err) {
      void err;
    }

    // Add to history navigation (avoid duplicate consecutive commands)
    setCommandHistory((prev) => (prev[0] === rawCmd ? prev : [rawCmd, ...prev]));
    setHistoryIndex(-1);

    const newLines = [
      ...outputLines,
      {
        id: `cmd-${Date.now()}`,
        type: 'command',
        content: `dias@portfolio:~$ ${rawCmd}`
      }
    ];

    const lowerCmd = rawCmd.toLowerCase();
    const args = lowerCmd.split(/\s+/);
    const mainCmd = args[0];

    if (lowerCmd === 'clear' || lowerCmd === 'cls') {
      setOutputLines([]);
      setInput('');
      return;
    }

    if (lowerCmd === 'exit' || lowerCmd === 'quit') {
      setIsOpen(false);
      setInput('');
      return;
    }

    // Easter Egg: Sudo hire dias
    if (lowerCmd === 'sudo hire dias' || lowerCmd === 'hire dias' || lowerCmd === 'hire' || lowerCmd === 'sudo hire') {
      soundFx.playAccessGranted();
      setIsCelebrationActive(true);
      setTimeout(() => setIsCelebrationActive(false), 5000);

      newLines.push({
        id: `out-${Date.now()}`,
        type: 'easter-egg',
        content: `╔═══════════════════════════════════════════════════════════════════╗
║ >>> [ ACCESS GRANTED // CONTRACT OFFER PROTOCOL INITIALIZED ] <<< ║
╚═══════════════════════════════════════════════════════════════════╝
  Candidate:   DIAS YERMEK (Middle Frontend & Mobile Engineer)
  Status:      AVAILABLE FOR CONTRACT & FULL-TIME OFFERS
  Location:    Astana, Kazakhstan (UTC+5) · Remote / Hybrid / Relocate
  Stack:       Next.js 15, Flutter, React Native, FastAPI, AI Integrations

  DIRECT CONTACT CHANNELS:
  [TELEGRAM]  https://t.me/daelijek_og (@daelijek_og)
  [EMAIL]     dias1605ermek@gmail.com
  [LINKEDIN]  https://www.linkedin.com/in/dias-yermek/
  [GITHUB]    https://github.com/Daelijek
═══════════════════════════════════════════════════════════════════`
      });
      setOutputLines(newLines);
      setInput('');
      return;
    }

    if (mainCmd === 'help') {
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: `AVAILABLE COMMANDS:
  help               - Display this interactive command index
  skills             - View complete technical competency matrix
  projects           - List production applications & case studies
  open <project>     - Navigate to project (fintrack | opengov | rolesieve)
  about              - Engineer bio, architectural focus, and background
  contact            - Direct communication ports (Telegram, Email, LinkedIn)
  cv / resume        - Download official engineering dossier (PDF)
  theme <name>       - Switch HUD theme (acid | cyan | amber | crimson | obsidian)
  audio <on|off>     - Toggle procedural Web Audio sound synthesizer
  lang <en|ru|kk>    - Switch portfolio localization
  whoami             - Query current terminal session privileges
  date               - Display real-time Astana telemetry timestamp (UTC+5)
  clear              - Wipe console buffer
  sudo hire dias     - [EASTER EGG] Execute contract hiring protocol
  exit               - Close this terminal drawer`
      });
    } else if (mainCmd === 'skills' || mainCmd === 'matrix' || mainCmd === 'stack') {
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'skills-table',
        data: SKILLS_DATA
      });
    } else if (mainCmd === 'projects') {
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: `PRODUCTION CASE STUDIES:
  [01] fintrack   - FinTrack Personal Finance Management App (React Native, FastAPI)
  [02] opengov    - OpenGov.kz National Civic Engagement Portal (React 19, Vite, MSW)
  [03] rolesieve  - RoleSieve HeadHunter Vacancy Intelligence & NLP Engine (Next.js, Python)

  [TIP] Type "open fintrack", "open opengov", or "open rolesieve" to view details.`
      });
    } else if (mainCmd === 'open') {
      const target = args[1];
      if (target === 'fintrack' || target === 'finance') {
        newLines.push({ id: `out-${Date.now()}`, type: 'success', content: '[SYS] Routing to FinTrack Case Study...' });
        setTimeout(() => router.push('/projects/finance-management-app'), 350);
      } else if (target === 'opengov' || target === 'open-gov') {
        newLines.push({ id: `out-${Date.now()}`, type: 'success', content: '[SYS] Routing to OpenGov.kz Case Study...' });
        setTimeout(() => router.push('/projects/opengov-kz'), 350);
      } else if (target === 'rolesieve' || target === 'role-sieve') {
        newLines.push({ id: `out-${Date.now()}`, type: 'success', content: '[SYS] Routing to RoleSieve Case Study...' });
        setTimeout(() => router.push('/projects/rolesieve'), 350);
      } else {
        newLines.push({ id: `out-${Date.now()}`, type: 'error', content: `Unknown project: "${target || ''}". Available: fintrack, opengov, rolesieve` });
      }
    } else if (mainCmd === 'about' || mainCmd === 'bio') {
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: `DIAS YERMEK // SOFTWARE ENGINEER
Location: Astana, Kazakhstan (UTC+5)
Specialization: High-Performance Web & Mobile Ecosystems with AI Integrations.
Philosophy: Clean Architecture, Deterministic State Management, 60 FPS Micro-Interactions.`
      });
    } else if (mainCmd === 'contact') {
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: `DIRECT COMMUNICATION CHANNELS:
  [TELEGRAM]  https://t.me/daelijek_og  (@daelijek_og)
  [EMAIL]     dias1605ermek@gmail.com
  [LINKEDIN]  https://www.linkedin.com/in/dias-yermek/
  [GITHUB]    https://github.com/Daelijek`
      });
    } else if (mainCmd === 'telegram') {
      newLines.push({ id: `out-${Date.now()}`, type: 'success', content: '[SYS] Opening Telegram: https://t.me/daelijek_og' });
      if (typeof window !== 'undefined') window.open('https://t.me/daelijek_og', '_blank');
    } else if (mainCmd === 'linkedin') {
      newLines.push({ id: `out-${Date.now()}`, type: 'success', content: '[SYS] Opening LinkedIn: https://www.linkedin.com/in/dias-yermek/' });
      if (typeof window !== 'undefined') window.open('https://www.linkedin.com/in/dias-yermek/', '_blank');
    } else if (mainCmd === 'github') {
      newLines.push({ id: `out-${Date.now()}`, type: 'success', content: '[SYS] Opening GitHub: https://github.com/Daelijek' });
      if (typeof window !== 'undefined') window.open('https://github.com/Daelijek', '_blank');
    } else if (mainCmd === 'cv' || mainCmd === 'resume') {
      handleDownloadCV();
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'cv-download',
        content: '[SYS] Initiating dossier download: Dias_Yermek_CV.pdf (111 KB)...'
      });
    } else if (mainCmd === 'theme') {
      const targetTheme = args[1];
      const validThemes = ['acid', 'cyan', 'amber', 'crimson', 'obsidian'];
      if (validThemes.includes(targetTheme)) {
        setTheme(targetTheme);
        newLines.push({ id: `out-${Date.now()}`, type: 'success', content: `HUD Core Theme shifted to [${targetTheme.toUpperCase()}].` });
      } else {
        newLines.push({ id: `out-${Date.now()}`, type: 'error', content: `Usage: theme <${validThemes.join(' | ')}>` });
      }
    } else if (mainCmd === 'audio' || mainCmd === 'sound') {
      const mode = args[1];
      if (mode === 'on' || mode === 'enable') {
        setSoundEnabled(true);
        newLines.push({ id: `out-${Date.now()}`, type: 'success', content: 'Sound Engine status: ONLINE.' });
      } else if (mode === 'off' || mode === 'disable') {
        setSoundEnabled(false);
        newLines.push({ id: `out-${Date.now()}`, type: 'success', content: 'Sound Engine status: MUTED.' });
      } else {
        newLines.push({ id: `out-${Date.now()}`, type: 'output', content: `Audio is currently ${soundEnabled ? 'ONLINE' : 'MUTED'}. Usage: audio <on|off>` });
      }
    } else if (mainCmd === 'lang') {
      const targetLang = args[1];
      if (['en', 'ru', 'kk'].includes(targetLang)) {
        setLang(targetLang);
        newLines.push({ id: `out-${Date.now()}`, type: 'success', content: `Localization switched to [${targetLang.toUpperCase()}].` });
      } else {
        newLines.push({ id: `out-${Date.now()}`, type: 'error', content: 'Usage: lang <en | ru | kk>' });
      }
    } else if (mainCmd === 'whoami') {
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: 'guest_operator // elevated privileges granted (session: root)'
      });
    } else if (mainCmd === 'date' || mainCmd === 'time') {
      const now = new Date();
      const astanaString = now.toLocaleString('en-US', { timeZone: 'Asia/Almaty' });
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: `Astana Local Time (UTC+5): ${astanaString}`
      });
    } else {
      soundFx.playTerminalError();
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'error',
        content: `command not found: "${rawCmd}". Type "help" to view available instructions.`
      });
    }

    setOutputLines(newLines);
    setInput('');
  };

  const handleKeyDown = (e) => {
    // If user presses ` or ~ while focused in the terminal input, close terminal instead of typing the character
    if (e.key === '`' || e.key === '~') {
      e.preventDefault();
      soundFx.playClick();
      setIsOpen(false);
      return;
    }

    // Play subtle keypress sound on keystrokes
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      soundFx.playKeypress();
    }

    if (e.key === 'Enter') {
      executeCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(nextIndex);
        const prevCmd = commandHistory[nextIndex];
        setInput(prevCmd);
        setTimeout(() => {
          inputRef.current?.setSelectionRange(prevCmd.length, prevCmd.length);
        }, 0);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        const nextCmd = commandHistory[nextIndex];
        setInput(nextCmd);
        setTimeout(() => {
          inputRef.current?.setSelectionRange(nextCmd.length, nextCmd.length);
        }, 0);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (!input.trim()) return;
      const lower = input.trim().toLowerCase();
      const match = EXTENDED_COMPLETIONS.find((cmd) => cmd.startsWith(lower));
      if (match) {
        soundFx.playKeypress();
        setInput(match);
      }
    }
  };

  return (
    <>
      {/* Floating Cyber Trigger Pill (Fixed in Bottom HUD, Left of Controls) */}
      <div className="hud-cli-trigger fixed bottom-3 sm:bottom-4 lg:bottom-5 left-3 sm:left-4 lg:left-5 z-40 select-none">
        <button
          onClick={() => {
            soundFx.playClick();
            setIsOpen((prev) => !prev);
          }}
          className="group flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#060a0f]/80 hover:bg-[#081018] border border-white/15 hover:border-[var(--accent-color)] text-[var(--heading-tint)] hover:text-white transition-all shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-2xl font-mono text-xs cursor-pointer"
          title="Toggle Terminal (~ or `)"
          aria-label="Toggle Interactive Terminal"
        >
          <TerminalIcon className="w-3.5 h-3.5 text-[var(--accent-color)] group-hover:rotate-12 transition-transform" />
          <span className="font-bold tracking-wider hidden sm:inline">&gt;_ CLI</span>
          <span className="text-[10px] px-1 py-0.5 rounded bg-white/10 text-white/50 border border-white/10 font-mono hidden md:inline">
            ~
          </span>
        </button>
      </div>

      {/* Terminal Drawer / Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onClick={(e) => {
              // Click outside terminal window closes it cleanly
              if (e.target === e.currentTarget) {
                soundFx.playClick();
                setIsOpen(false);
              }
            }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-2 sm:p-6 bg-black/75 backdrop-blur-md pointer-events-auto select-none"
          >
            {/* Celebration Particle Flash on "sudo hire dias" */}
            {isCelebrationActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 1.5, repeat: 2 }}
                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--accent-color)]/25 via-emerald-500/25 to-cyan-500/25 z-0"
              />
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 25 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className={`relative flex flex-col rounded-2xl bg-[#03060a]/95 border border-[var(--accent-color)]/35 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(0,255,159,0.12)] overflow-hidden font-mono z-10 transition-all duration-300 ${
                isMaximized
                  ? 'w-[98vw] h-[94vh]'
                  : 'w-full max-w-3xl h-[520px] max-h-[85vh] sm:max-h-[80vh]'
              }`}
            >
              {/* Terminal Window Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#060c14] border-b border-white/10 select-none">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:opacity-100 transition-opacity"
                    onClick={() => {
                      soundFx.playClick();
                      setIsOpen(false);
                    }}
                    title="Close"
                  />
                  <div
                    className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer hover:opacity-100 transition-opacity"
                    onClick={() => {
                      soundFx.playClick();
                      setIsMaximized((m) => !m);
                    }}
                    title="Toggle Size"
                  />
                  <div
                    className="w-3 h-3 rounded-full bg-green-500/80 cursor-pointer hover:opacity-100 transition-opacity"
                    onClick={() => {
                      soundFx.playClick();
                      setIsMaximized((m) => !m);
                    }}
                    title="Maximize"
                  />
                  <span className="ml-3 text-xs tracking-wider text-white/60 font-semibold flex items-center gap-2">
                    <TerminalIcon className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                    <span>DIAS_YERMEK // KERNEL v2.6.4</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setIsMaximized((m) => !m);
                    }}
                    className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    title={isMaximized ? 'Restore' : 'Maximize'}
                  >
                    {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setIsOpen(false);
                    }}
                    className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    title="Close (ESC or ~)"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Terminal Output Body (Clicking anywhere focuses input) */}
              <div
                ref={terminalBodyRef}
                data-lenis-prevent="true"
                onWheel={(e) => {
                  e.stopPropagation();
                }}
                onClick={() => inputRef.current?.focus()}
                className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-2 text-xs sm:text-sm font-mono scrollbar-thin scrollbar-thumb-white/15 scrollbar-track-transparent leading-relaxed cursor-text overscroll-contain"
              >
                {outputLines.map((line) => {
                  if (line.type === 'command') {
                    return (
                      <div key={line.id} className="text-white/90 font-bold flex items-start gap-1.5">
                        <span className="text-[var(--accent-color)] select-none">&gt;</span>
                        <span>{line.content}</span>
                      </div>
                    );
                  }
                  if (line.type === 'banner') {
                    return (
                      <pre key={line.id} className="text-[var(--accent-color)] text-[10px] sm:text-xs overflow-x-auto leading-tight select-none">
                        {line.content}
                      </pre>
                    );
                  }
                  if (line.type === 'skills-table') {
                    return (
                      <div key={line.id} className="my-2 border border-[var(--border-subtle)] rounded-lg overflow-hidden bg-black/40">
                        <div className="grid grid-cols-12 bg-white/[0.04] border-b border-[var(--border-subtle)] px-3 py-1.5 text-[11px] font-bold text-[var(--heading-tint)] tracking-wider">
                          <span className="col-span-12 sm:col-span-4 uppercase">[SECTOR]</span>
                          <span className="hidden sm:inline sm:col-span-8 uppercase">[TECHNOLOGIES & COMPETENCIES]</span>
                        </div>
                        <div className="divide-y divide-white/[0.06] text-xs">
                          {line.data.map((row, idx) => (
                            <div key={idx} className="grid grid-cols-12 px-3 py-2 items-start hover:bg-white/[0.02] transition-colors gap-1 sm:gap-0">
                              <span className="col-span-12 sm:col-span-4 text-[var(--accent-color)] font-semibold pr-2">{row.sector}</span>
                              <span className="col-span-12 sm:col-span-8 text-white/80">{row.tech}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  if (line.type === 'cv-download') {
                    return (
                      <div key={line.id} className="p-3 my-1 rounded-lg bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 space-y-2">
                        <div className="text-[var(--accent-color)] font-medium flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          <span>{line.content}</span>
                        </div>
                        <div className="text-white/70 text-xs flex items-center gap-2 flex-wrap">
                          <span>Direct file link:</span>
                          <a
                            href="/dias_yermek_cv.pdf"
                            download="Dias_Yermek_CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent-color)] underline underline-offset-2 hover:text-white font-bold inline-flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>/dias_yermek_cv.pdf</span>
                            <ExternalLink className="w-2.5 h-2.5 inline" />
                          </a>
                        </div>
                      </div>
                    );
                  }
                  if (line.type === 'easter-egg') {
                    return (
                      <div key={line.id} className="text-emerald-400 font-bold text-xs sm:text-sm bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-lg overflow-x-auto select-text shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <pre className="whitespace-pre-wrap font-mono leading-normal">
                          <FormattedTerminalText text={line.content} />
                        </pre>
                      </div>
                    );
                  }
                  if (line.type === 'error') {
                    return (
                      <div key={line.id} className="text-red-400 font-medium pl-3 border-l-2 border-red-500/50">
                        {line.content}
                      </div>
                    );
                  }
                  if (line.type === 'success') {
                    return (
                      <div key={line.id} className="text-[var(--accent-color)] font-medium pl-3 border-l-2 border-[var(--accent-color)]/50">
                        <FormattedTerminalText text={line.content} />
                      </div>
                    );
                  }
                  if (line.type === 'info') {
                    return (
                      <div key={line.id} className="text-white/60 text-xs italic pl-1">
                        {line.content}
                      </div>
                    );
                  }
                  return (
                    <div key={line.id} className="text-white/80 select-text">
                      <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm leading-normal">
                        <FormattedTerminalText text={line.content} />
                      </pre>
                    </div>
                  );
                })}
              </div>

              {/* Quick Action Suggestion Chips for Fast Clicking */}
              <div className="px-4 py-2 bg-[#05090f] border-t border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar select-none text-[11px]">
                <span className="text-white/40 mr-1 shrink-0 font-semibold">[QUICK]</span>
                {['help', 'skills', 'projects', 'sudo hire dias', 'contact', 'cv', 'clear'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => {
                      executeCommand(cmd);
                      inputRef.current?.focus();
                    }}
                    className="shrink-0 px-2 py-0.5 rounded-md bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-[var(--accent-color)] text-white/70 hover:text-[var(--accent-color)] transition-all font-mono active:scale-95 cursor-pointer"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Terminal Input Line */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#04070d] border-t border-white/10">
                <span className="text-[var(--accent-color)] font-bold text-xs sm:text-sm select-none">
                  dias@portfolio:~$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type command (e.g. 'help', 'skills', 'sudo hire dias')..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-xs sm:text-sm font-mono placeholder:text-white/25 caret-[var(--accent-color)]"
                  autoFocus
                />
                <button
                  onClick={() => {
                    executeCommand();
                    inputRef.current?.focus();
                  }}
                  className="p-1.5 rounded-lg bg-[var(--accent-color)]/10 hover:bg-[var(--accent-color)]/20 border border-[var(--accent-color)]/30 text-[var(--accent-color)] transition-colors active:scale-95 cursor-pointer"
                  title="Execute command (Enter)"
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
