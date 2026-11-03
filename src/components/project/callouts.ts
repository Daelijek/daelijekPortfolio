// Tech callouts per case study. Each line must be verifiable in the project's repository;
// projects without an entry render no callout block.
export const PROJECT_CALLOUTS: Record<string, { reliability: string; engineering: string }> = {
  'finance-management-app': {
    reliability: 'JWT & bcrypt • OAuth2 password flow',
    engineering: 'FastAPI async • Swagger / OpenAPI docs',
  },
  rolesieve: {
    reliability: 'Official dev.hh.ru API • 429 / Retry-After backoff',
    engineering: 'FastAPI + Redis / RQ job queue',
  },
  'opengov-kz': {
    reliability: 'MSW mock API layer',
    engineering: 'i18next • KZ / RU / EN',
  },
  'berik-zhunusbek': {
    reliability: 'Zero runtime dependencies',
    engineering: 'HTML5 • CSS3 • Vanilla JS',
  },
};
