import 'server-only';
import en from './locales/en';
import type { FeaturedProject } from './types';

/**
 * Edge-case case studies for the template's end-to-end tests. They exist only in builds made
 * with CASE_FIXTURES=1 (the CI test build): never in production, the sitemap or search results.
 */
export const CASE_FIXTURES_ENABLED = process.env.CASE_FIXTURES === '1';

const pad = (n: number) => String(n).padStart(2, '0');
const [finance, rolesieve] = en.projects.featured;

/** Only what the template strictly needs: no screens, no links, one metric, one feature. */
const minimal = {
  ...rolesieve,
  num: '98',
  id: 'FIXTURE_MINIMAL',
  slug: 'fixture-minimal',
  title: 'Minimal',
  tagline: 'A case study with only the required fields.',
  category: 'Fixture',
  galleryKind: 'web',
  isPrivate: false,
  liveUrl: null,
  githubUrl: null,
  gallery: undefined,
  tags: ['TypeScript'],
  dossier: { ...rolesieve.dossier, technologies: {}, colorPalette: [], entryYear: '2026', primaryRole: 'Engineer', targetPlatform: 'Web' },
  overview: { lead: 'Only the lead sentence is filled in.', targetAudience: '', challenge: '', solution: '', myRole: '' },
  walkthrough: {
    ...rolesieve.walkthrough,
    concept: { ...rolesieve.walkthrough.concept, highlights: [] },
    architecture: { ...rolesieve.walkthrough.architecture, highlights: [] },
    features: [rolesieve.walkthrough.features[0]],
    impact: { metrics: [rolesieve.walkthrough.impact.metrics[0]] },
  },
} as unknown as FeaturedProject;

/** Everything at once and too long: private + live, 5 metrics, 5 features, 6 stack layers. */
const maximal = {
  ...rolesieve,
  num: '99',
  id: 'FIXTURE_MAXIMAL',
  slug: 'fixture-maximal',
  title:
    'Interplanetaryobservabilityplatform — An extraordinarily long descriptor that has to wrap across several lines without breaking the hero',
  category: 'Fixture // Extremely Long Category Name For Layout Testing',
  isPrivate: true,
  githubUrl: null,
  tags: [...new Set([...rolesieve.tags, ...finance.tags, 'Kubernetes', 'Terraform', 'OpenTelemetry'])],
  dossier: {
    ...rolesieve.dossier,
    technologies: {
      ...finance.dossier.technologies,
      ...rolesieve.dossier.technologies,
      deploy: ['A Very Long Technology Name That Keeps Going And Going', 'gRPC', 'Kafka'],
    },
  },
  walkthrough: {
    ...rolesieve.walkthrough,
    features: [...rolesieve.walkthrough.features, ...finance.walkthrough.features.slice(0, 2)].map((feature, i) => ({
      ...feature,
      num: pad(i + 1),
    })),
    impact: {
      metrics: [...rolesieve.walkthrough.impact.metrics, { label: 'EXTRA_LONG_METRIC_LABEL_NAME', value: '99.999% UPTIME' }],
    },
  },
} as unknown as FeaturedProject;

export const CASE_FIXTURES: FeaturedProject[] = CASE_FIXTURES_ENABLED ? [minimal, maximal] : [];
