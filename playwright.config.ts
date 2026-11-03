import { defineConfig, devices } from '@playwright/test';

const PORT = 3210;
const isCI = Boolean(process.env.CI);

/**
 * End-to-end smoke tests against a production build (`next build && next start`).
 * Locally the installed Google Chrome is used (no browser download);
 * CI installs Playwright's Chromium.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], ...(isCI ? {} : { channel: 'chrome' }) },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'], ...(isCI ? {} : { channel: 'chrome' }) },
    },
  ],
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !isCI,
    timeout: 60_000,
  },
});
