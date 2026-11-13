import { defineConfig, devices } from '@playwright/test';

const PORT = 3210;
const isCI = Boolean(process.env.CI);

/**
 * End-to-end tests against a production build (`next build && next start`).
 * Chromium projects use the installed Google Chrome locally (Playwright's Chromium in CI);
 * WebKit (Safari) and Firefox need `npx playwright install webkit firefox`.
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
    // Safari and Firefox engines (Playwright's WebKit / Firefox builds).
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'iphone', use: { ...devices['iPhone 14'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !isCI,
    timeout: 60_000,
  },
});
