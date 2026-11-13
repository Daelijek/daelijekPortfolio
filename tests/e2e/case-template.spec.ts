import { test, expect, type Page } from '@playwright/test';

// The case-study template must hold up with any data: these pages are edge-case fixtures
// (src/content/fixtures.ts) that only exist in builds made with CASE_FIXTURES=1, as in CI.
// Locally, build with `CASE_FIXTURES=1 npm run build` to run them; otherwise they are skipped.

const FIXTURES = ['fixture-minimal', 'fixture-maximal'];
const WIDTHS = [360, 768, 1280, 1920];

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('daelijek_booted', 'true'));
});

async function skipWithoutFixtures(page: Page) {
  const res = await page.request.get('/projects/fixture-minimal');
  test.skip(res.status() === 404, 'fixtures are only built with CASE_FIXTURES=1');
}

test.describe('case-study template with edge-case data', () => {
  for (const slug of FIXTURES) {
    test(`${slug} lays out cleanly from 360 to 1920px`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop', 'widths are set explicitly');
      await skipWithoutFixtures(page);
      const errors: string[] = [];
      page.on('pageerror', (err) => errors.push(err.message));

      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`/projects/${slug}`);

        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);

        // The visible hero title stays inside the viewport and does not overflow its own box.
        const titleFits = await page.evaluate(() =>
          [...document.querySelectorAll<HTMLElement>('[data-case-title]')]
            .filter((el) => el.getBoundingClientRect().width > 2) // visible ones (the desktop <h1> is screen-reader only)
            .every((el) => el.getBoundingClientRect().right <= window.innerWidth && el.scrollWidth <= el.clientWidth + 1)
        );
        expect(titleFits, `hero title fits at ${width}px`).toBe(true);

        // Metric tiles fill every row: no empty cells, whatever the count.
        const rowsFilled = await page.evaluate(() => {
          const list = document.querySelector('#overview figcaption dl');
          if (!list) return true;
          const width = list.getBoundingClientRect().width;
          const rows = new Map<number, number>();
          for (const tile of list.children) {
            const rect = tile.getBoundingClientRect();
            rows.set(Math.round(rect.top), (rows.get(Math.round(rect.top)) ?? 0) + rect.width);
          }
          return [...rows.values()].every((sum) => Math.abs(sum - width) <= list.children.length + 2);
        });
        expect(rowsFilled, `metric rows filled at ${width}px`).toBe(true);
      }
      expect(errors).toEqual([]);
    });
  }

  test('missing parts are left out, not rendered empty', async ({ page, isMobile }) => {
    test.skip(isMobile, 'desktop layout (side rail)');
    await skipWithoutFixtures(page);
    await page.goto('/projects/fixture-minimal');

    await expect(page.locator('#screens')).toHaveCount(0);
    await expect(page.getByRole('link', { name: /live demo|source code/i })).toHaveCount(0);
    await expect(page.getByRole('button', { name: /view screens/i })).toHaveCount(0);
    await expect(page.locator('#story')).toHaveCount(0); // no challenge, solution or role
    // Sections: overview, features, stack — and nothing else.
    await expect(page.locator('nav[aria-label="Case study sections"] button')).toHaveCount(3);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });
});
