import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const fromRoot = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
  resolve: {
    alias: {
      '@': fromRoot('./src'),
      // `server-only` throws outside React Server Components; tests import server modules directly.
      'server-only': fromRoot('./tests/unit/stubs/server-only.ts'),
    },
  },
});
