import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
  resolve: {
    // `server-only` throws outside React Server Components; tests import server modules directly.
    alias: { 'server-only': new URL('./tests/unit/stubs/server-only.ts', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1') },
  },
});
