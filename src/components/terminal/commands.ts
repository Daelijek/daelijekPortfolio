import { THEMES, type Theme } from '@/lib/themes';
import { isLocale, type Locale } from '@/i18n/config';

export interface SkillRow {
  sector: string;
  tech: string;
}

/** A rendered terminal line (the id is assigned by the terminal when appending). */
export type TerminalLineData =
  | { type: 'command' | 'banner' | 'output' | 'success' | 'error' | 'info' | 'easter-egg' | 'cv-download'; content: string }
  | { type: 'skills-table'; data: SkillRow[] };

export type TerminalLine = TerminalLineData & { id: string };

/** Side effects a command may trigger; implemented by the terminal component. */
export interface CommandContext {
  soundEnabled: boolean;
  setTheme: (theme: Theme) => void;
  setSoundEnabled: (enabled: boolean) => void;
  switchLocale: (locale: Locale) => void;
  /** Navigate to a locale-free path (e.g. "/projects/rolesieve"). */
  navigate: (path: string) => void;
  openUrl: (url: string) => void;
  downloadCv: () => void;
  celebrate: () => void;
  playError: () => void;
}

export type CommandResult = { kind: 'clear' } | { kind: 'close' } | { kind: 'output'; lines: TerminalLineData[] };

export const QUICK_COMMANDS = ['help', 'skills', 'projects', 'sudo hire dias', 'contact', 'cv', 'clear'];

const CASE_STUDIES: Record<string, { slug: string; label: string }> = {
  fintrack: { slug: 'finance-management-app', label: 'FinTrack' },
  finance: { slug: 'finance-management-app', label: 'FinTrack' },
  opengov: { slug: 'opengov-kz', label: 'OpenGov.kz' },
  'open-gov': { slug: 'opengov-kz', label: 'OpenGov.kz' },
  rolesieve: { slug: 'rolesieve', label: 'RoleSieve' },
  'role-sieve': { slug: 'rolesieve', label: 'RoleSieve' },
  berik: { slug: 'berik-zhunusbek', label: 'Berik Zhunusbek Gallery' },
};

const LINKS = {
  telegram: 'https://t.me/daelijek_og',
  linkedin: 'https://www.linkedin.com/in/dias-yermek/',
  github: 'https://github.com/Daelijek',
} as const;

export const SKILLS: SkillRow[] = [
  { sector: 'Frontend Core', tech: 'Next.js 16, React 19, TypeScript, Tailwind 4, HTML5/CSS3' },
  { sector: 'Mobile Engineering', tech: 'Flutter & Dart, Riverpod, React Native, Expo CLI' },
  { sector: 'Backend & APIs', tech: 'FastAPI, Python, PostgreSQL, SQLAlchemy 2, REST, WebSockets' },
  { sector: 'AI & Cloud Tech', tech: 'OpenAI & Anthropic SDKs, Vector Embeddings, LLM Streaming' },
  { sector: 'Architecture & Dev', tech: 'Modular Clean Arch, Riverpod, Docker, CI/CD, Vite 6' },
];

/** Tab-completion candidates. */
export const COMPLETIONS = [
  'help', 'skills', 'projects', 'open', 'about', 'contact', 'cv', 'theme', 'audio', 'lang', 'whoami', 'date', 'clear', 'sudo hire dias', 'exit',
  ...Object.keys(CASE_STUDIES).filter((k) => !k.includes('-') && k !== 'finance').map((k) => `open ${k}`),
  ...THEMES.map((t) => `theme ${t}`),
  'audio on', 'audio off', 'lang en', 'lang ru', 'lang kk',
];

export function completeCommand(input: string): string | null {
  const lower = input.trim().toLowerCase();
  if (!lower) return null;
  return COMPLETIONS.find((cmd) => cmd.startsWith(lower)) ?? null;
}

const CONTACT_BLOCK = `  [TELEGRAM]  ${LINKS.telegram}  (@daelijek_og)
  [EMAIL]     dias1605ermek@gmail.com
  [LINKEDIN]  ${LINKS.linkedin}
  [GITHUB]    ${LINKS.github}`;

const HELP = `AVAILABLE COMMANDS:
  help               - Display this interactive command index
  skills             - View complete technical competency matrix
  projects           - List production applications & case studies
  open <project>     - Navigate to project (fintrack | opengov | rolesieve | berik)
  about              - Engineer bio, architectural focus, and background
  contact            - Direct communication ports (Telegram, Email, LinkedIn)
  cv / resume        - Download official engineering dossier (PDF)
  theme <name>       - Switch HUD theme (${THEMES.join(' | ')})
  audio <on|off>     - Toggle procedural Web Audio sound synthesizer
  lang <en|ru|kk>    - Switch portfolio localization
  whoami             - Query current terminal session privileges
  date               - Display real-time Astana telemetry timestamp (UTC+5)
  clear              - Wipe console buffer
  sudo hire dias     - [EASTER EGG] Execute contract hiring protocol
  exit               - Close this terminal drawer`;

const HIRE = `╔═══════════════════════════════════════════════════════════════════╗
║ >>> [ ACCESS GRANTED // CONTRACT OFFER PROTOCOL INITIALIZED ] <<< ║
╚═══════════════════════════════════════════════════════════════════╝
  Candidate:   DIAS YERMEK (Middle Frontend & Mobile Developer)
  Status:      AVAILABLE FOR CONTRACT & FULL-TIME OFFERS
  Location:    Astana, Kazakhstan (UTC+5) · Remote / Hybrid / Relocate
  Stack:       Next.js 16, Flutter, React Native, FastAPI, AI Integrations

  DIRECT CONTACT CHANNELS:
${CONTACT_BLOCK}
═══════════════════════════════════════════════════════════════════`;

const PROJECTS = `PRODUCTION CASE STUDIES:
  [01] fintrack   - FinTrack Personal Finance Management App (React Native, FastAPI)
  [02] rolesieve  - RoleSieve HeadHunter Vacancy Intelligence & NLP Engine (Next.js, Python)
  [03] opengov    - OpenGov.kz National Civic Engagement Portal (React 19, Vite, MSW)
  [04] berik      - Berik Zhunusbek Art Gallery (HTML5, CSS3, Vanilla JS)

  [TIP] Type "open fintrack", "open rolesieve", "open opengov" or "open berik" to view details.`;

const ABOUT = `DIAS YERMEK // SOFTWARE ENGINEER
Location: Astana, Kazakhstan (UTC+5)
Specialization: High-Performance Web & Mobile Ecosystems with AI Integrations.
Philosophy: Clean Architecture, Deterministic State Management, 60 FPS Micro-Interactions.`;

const out = (type: Exclude<TerminalLineData['type'], 'skills-table'>, content: string): TerminalLineData => ({ type, content });

/** Parses and runs one command line. Pure apart from the side effects passed in `ctx`. */
export function runCommand(raw: string, ctx: CommandContext): CommandResult {
  const lower = raw.trim().toLowerCase();
  const [name, arg] = lower.split(/\s+/);

  if (lower === 'clear' || lower === 'cls') return { kind: 'clear' };
  if (lower === 'exit' || lower === 'quit') return { kind: 'close' };

  if (['sudo hire dias', 'hire dias', 'hire', 'sudo hire'].includes(lower)) {
    ctx.celebrate();
    return { kind: 'output', lines: [out('easter-egg', HIRE)] };
  }

  switch (name) {
    case 'help':
      return { kind: 'output', lines: [out('output', HELP)] };
    case 'skills':
    case 'matrix':
    case 'stack':
      return { kind: 'output', lines: [{ type: 'skills-table', data: SKILLS }] };
    case 'projects':
      return { kind: 'output', lines: [out('output', PROJECTS)] };
    case 'open': {
      const target = arg ? CASE_STUDIES[arg] : undefined;
      if (!target) {
        return { kind: 'output', lines: [out('error', `Unknown project: "${arg ?? ''}". Available: fintrack, rolesieve, opengov, berik`)] };
      }
      ctx.navigate(`/projects/${target.slug}`);
      return { kind: 'output', lines: [out('success', `[SYS] Routing to ${target.label} Case Study...`)] };
    }
    case 'about':
    case 'bio':
      return { kind: 'output', lines: [out('output', ABOUT)] };
    case 'contact':
      return { kind: 'output', lines: [out('output', `DIRECT COMMUNICATION CHANNELS:\n${CONTACT_BLOCK}`)] };
    case 'telegram':
    case 'linkedin':
    case 'github': {
      const url = LINKS[name];
      ctx.openUrl(url);
      const label = name === 'github' ? 'GitHub' : name === 'linkedin' ? 'LinkedIn' : 'Telegram';
      return { kind: 'output', lines: [out('success', `[SYS] Opening ${label}: ${url}`)] };
    }
    case 'cv':
    case 'resume':
      ctx.downloadCv();
      return { kind: 'output', lines: [out('cv-download', '[SYS] Initiating dossier download: Dias_Yermek_CV.pdf...')] };
    case 'theme':
      if ((THEMES as readonly string[]).includes(arg)) {
        ctx.setTheme(arg as Theme);
        return { kind: 'output', lines: [out('success', `HUD Core Theme shifted to [${arg.toUpperCase()}].`)] };
      }
      return { kind: 'output', lines: [out('error', `Usage: theme <${THEMES.join(' | ')}>`)] };
    case 'audio':
    case 'sound':
      if (arg === 'on' || arg === 'enable') {
        ctx.setSoundEnabled(true);
        return { kind: 'output', lines: [out('success', 'Sound Engine status: ONLINE.')] };
      }
      if (arg === 'off' || arg === 'disable') {
        ctx.setSoundEnabled(false);
        return { kind: 'output', lines: [out('success', 'Sound Engine status: MUTED.')] };
      }
      return { kind: 'output', lines: [out('output', `Audio is currently ${ctx.soundEnabled ? 'ONLINE' : 'MUTED'}. Usage: audio <on|off>`)] };
    case 'lang':
      if (isLocale(arg)) {
        ctx.switchLocale(arg);
        return { kind: 'output', lines: [out('success', `Localization switched to [${arg.toUpperCase()}].`)] };
      }
      return { kind: 'output', lines: [out('error', 'Usage: lang <en | ru | kk>')] };
    case 'whoami':
      return { kind: 'output', lines: [out('output', 'guest_operator // elevated privileges granted (session: root)')] };
    case 'date':
    case 'time': {
      const astana = new Date().toLocaleString('en-US', { timeZone: 'Asia/Almaty' });
      return { kind: 'output', lines: [out('output', `Astana Local Time (UTC+5): ${astana}`)] };
    }
    default:
      ctx.playError();
      return { kind: 'output', lines: [out('error', `command not found: "${raw.trim()}". Type "help" to view available instructions.`)] };
  }
}
