import { test, expect, type Page } from '@playwright/test';

// Skip the once-per-session boot screen, except in the test that covers it.
const skipBootScreen = async (page: Page) => {
  await page.addInitScript(() => sessionStorage.setItem('daelijek_booted', 'true'));
};

const CASE_STUDIES = ['finance-management-app', 'rolesieve', 'opengov-kz', 'berik-zhunusbek'];

test.describe('pages render', () => {
  test.beforeEach(async ({ page }) => skipBootScreen(page));

  for (const path of ['/', '/about', '/contact', '/projects', ...CASE_STUDIES.map((s) => `/projects/${s}`)]) {
    test(`${path} responds 200 with a heading and no runtime errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (err) => errors.push(err.message));

      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1').first()).toBeAttached();
      await expect(page).toHaveTitle(/Dias Yermek/);
      expect(errors).toEqual([]);
    });
  }

  test('case studies expose canonical and OpenGraph image', async ({ page }) => {
    await page.goto('/projects/rolesieve');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/projects\/rolesieve$/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/og\/rolesieve\.jpg$/);
  });
});

test.describe('routing', () => {
  test('archive repositories have no case-study page', async ({ request }) => {
    const res = await request.get('/projects/evently', { maxRedirects: 0 });
    expect(res.status()).toBe(404);
  });

  test('legacy aliases redirect permanently', async ({ request }) => {
    const res = await request.get('/projects/role-sieve', { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers().location).toMatch(/\/projects\/rolesieve$/);
  });

  test('CV downloads as a PDF attachment', async ({ request }) => {
    const res = await request.get('/api/cv');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('application/pdf');
    expect(res.headers()['content-disposition']).toContain('attachment');
  });

  test('sitemap and robots are served', async ({ request }) => {
    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain('/projects/rolesieve');
    expect((await request.get('/robots.txt')).status()).toBe(200);
  });
});

test.describe('interactions', () => {
  test('boot screen is a dialog and Escape enters the site', async ({ page }) => {
    await page.goto('/');
    const gate = page.getByRole('dialog', { name: /portfolio/i });
    await expect(gate).toBeVisible();
    await expect(page.getByRole('button', { name: /loaded|загружено|жүктелді/i })).toBeEnabled({ timeout: 10_000 });
    await page.keyboard.press('Escape');
    await expect(gate).toBeHidden();
  });

  test('terminal opens with backtick, runs a command, closes with Escape', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard shortcut is a desktop feature');
    await skipBootScreen(page);
    await page.goto('/about');
    // The shortcut listener is attached on hydration; wait for the app to settle first.
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('button', { name: /Interactive terminal/ })).toBeVisible();

    await page.keyboard.press('`');
    const terminal = page.getByRole('dialog', { name: 'Interactive terminal' });
    await expect(terminal).toBeVisible();

    const input = terminal.getByRole('textbox', { name: 'Terminal command' });
    await expect(input).toBeFocused();
    await input.fill('projects');
    await input.press('Enter');
    await expect(terminal).toContainText('PRODUCTION CASE STUDIES');

    await page.keyboard.press('Escape');
    await expect(terminal).toBeHidden();
  });

  test('gallery preview opens from the keyboard and returns focus', async ({ page }) => {
    await skipBootScreen(page);
    await page.goto('/projects/rolesieve');

    const card = page.locator('[role="button"][tabindex="0"]').filter({ hasText: /preview|открыть|ашу/i }).first();
    await card.scrollIntoViewIfNeeded();
    await card.focus();
    await page.keyboard.press('Enter');

    const preview = page.getByRole('dialog').last();
    await expect(preview).toBeVisible();
    await expect(preview.getByRole('button', { name: 'Close preview' })).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(preview).toBeHidden();
    await expect(card).toBeFocused();
  });
});

test.describe('reduced motion', () => {
  test('smooth scrolling and autoplaying motion are disabled', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await skipBootScreen(page);
    await page.goto('/projects/rolesieve');
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
    await expect(page.locator('html')).not.toHaveClass(/lenis/);

    // The gallery ribbon does not auto-scroll.
    const ribbon = page.locator('[role="button"][tabindex="0"]').filter({ hasText: /preview/i }).first();
    await ribbon.scrollIntoViewIfNeeded();
    const before = await ribbon.boundingBox();
    await page.waitForTimeout(1200);
    expect((await ribbon.boundingBox())?.x).toBe(before?.x);
  });
});
