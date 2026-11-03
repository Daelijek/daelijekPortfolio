import type { LucideIcon } from 'lucide-react';
import { Bot, Building2, Code2, Globe, GraduationCap, Server, ShieldCheck, Smartphone, Terminal, Zap } from 'lucide-react';
import type { Dictionary } from '@/content/types';

export type AboutUi = Dictionary['about']['ui'];

export const SKILL_CATEGORIES = ['mobile', 'web', 'backend', 'ai'] as const;
export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export interface Highlight {
  id: string;
  tag: string;
  Icon: LucideIcon;
  title: string;
  subtitle: string;
}

export interface SkillDomain {
  id: SkillCategory;
  icon: LucideIcon;
  title: string;
  desc: string;
  skills: string[];
  metric: string;
  deliverables: string[];
}

export interface Principle {
  icon: LucideIcon;
  num: string;
  title: string;
  desc: string;
}

export const getHighlights = (t: AboutUi): Highlight[] => [
  { id: 'edu', tag: t.education, Icon: GraduationCap, title: 'Astana IT University', subtitle: 'B.S. Software Engineering (2025)' },
  { id: 'current', tag: t.currentRole, Icon: Building2, title: 'BeyimTech · Astana Hub', subtitle: 'Middle Frontend & Mobile Developer' },
  { id: 'scale', tag: t.keyScale, Icon: Code2, title: 'TrustMe Blockchain SaaS', subtitle: t.platformWith15m },
];

export const getSkillDomains = (t: AboutUi): SkillDomain[] => [
  {
    id: 'mobile',
    icon: Smartphone,
    title: t.mobileArchitecture,
    desc: t.productionMobileAppsOn,
    skills: ['Flutter & Dart', 'Riverpod', 'React Native', 'Expo Framework', 'App Store Deploy', 'Google Play CI/CD', 'Firebase Remote Config'],
    metric: 'iOS & Android',
    deliverables: [t.beyimtechAiPlatformProduction, t.stolovkaFoodtechServiceFlutter, t.financeAiManagerReact],
  },
  {
    id: 'web',
    icon: Globe,
    title: t.modernWebFrontend,
    desc: t.highSpeedNextJs,
    skills: ['Next.js 16 (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Turbopack', 'Core Web Vitals'],
    metric: '60 FPS / SSR',
    deliverables: [t.opengovKzCivicPortal, t.trustmeContractPortalReusable, t.berikZhunusbekGalleryKinetic],
  },
  {
    id: 'backend',
    icon: Server,
    title: t.backendCloudServices,
    desc: t.highThroughputApisWith,
    skills: ['FastAPI (Python)', 'PostgreSQL', 'Supabase', 'Node.js & Express', 'Docker', 'REST & GraphQL', 'JWT & Auth Flow'],
    metric: 'FastAPI & SQL',
    deliverables: [t.asyncRestApisWith, t.supabaseIntegrationWithRow, t.containerizedDockerMicroservicesAnd],
  },
  {
    id: 'ai',
    icon: Bot,
    title: t.aiSystemsAppliedTech,
    desc: t.openaiModelIntegrationsStreaming,
    skills: ['OpenAI API', 'Real-time AI Chatbots', 'Lexical Markdown', 'Web Audio API', 'Canvas 2D / HUD', 'Prompt Pipelines'],
    metric: 'Applied AI',
    deliverables: [t.adaptiveEducationalAiChatbots, t.lexicalMarkdownWysiwygEditor, t.proceduralWebAudioSynthesizer],
  },
];

export const getPrinciples = (t: AboutUi): Principle[] => [
  { icon: Zap, num: '01', title: t.zeroLag60Fps, desc: t.interfacesMustRespondInstantly },
  { icon: ShieldCheck, num: '02', title: t.endToEndProduct, desc: t.fromInitialFigmaSpecs },
  { icon: Terminal, num: '03', title: t.resilientCleanArchitecture, desc: t.strictTypescriptTypingModular },
];

/**
 * Multi-select filter for the competency matrix: clicking one category while all are
 * shown isolates it; deselecting the last one (or "all") shows everything again.
 */
export function toggleCategory(selected: readonly SkillCategory[], clicked: SkillCategory | 'all'): SkillCategory[] {
  const all = [...SKILL_CATEGORIES];
  if (clicked === 'all') return all;
  if (selected.length === all.length) return [clicked];
  if (selected.includes(clicked)) return selected.length === 1 ? all : selected.filter((c) => c !== clicked);
  return [...selected, clicked];
}
