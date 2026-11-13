import { test, expect } from '@playwright/test';

// Visual regression of the case-study template on the "maximal" fixture (stable data, every
// block filled). Baselines are rendered on Windows: fonts rasterize differently on CI's Linux,
// so this suite runs locally only. Needs a CASE_FIXTURES=1 build. Refresh after an intended
// design change with: npx playwright test visual --update-snapshots

test.skip(Boolean(process.env.CI), 'baselines are Windows renders');

const BLOCKS = [
  { name: 'hero', selector: '#overview' },
  { name: 'features', selector: '#features' },
  { name: 'stack', selector: '#stack' },
  { name: 'next-case', selector: 'section[aria-labelledby="next-case-label"]' },
];

test.describe('case-study template visuals', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(!['desktop', 'mobile'].includes(testInfo.project.name), 'baselines exist for the Chromium projects');
    await page.emulateMedia({ reducedMotion: 'reduce' }); // no autoplay, smooth scrolling or slide-ins
    await page.addInitScript(() => sessionStorage.setItem('daelijek_booted', 'true'));
    const res = await page.goto('/projects/fixture-maximal');
    test.skip(res?.status() === 404, 'fixtures are only built with CASE_FIXTURES=1');
    // The particle background is random by design.
    await page.addStyleTag({ content: 'canvas { visibility: hidden !important; }' });
  });

  for (const { name, selector } of BLOCKS) {
    test(name, async ({ page }) => {
      const block = page.locator(selector).first();
      await block.scrollIntoViewIfNeeded();
      await page.waitForTimeout(900); // fade-ins (reduced motion keeps opacity transitions)
      // Fixed and sticky chrome (bars, dock, scrims) depends on the scroll position: leave it out.
      await page.evaluate(() => {
        for (const el of document.querySelectorAll<HTMLElement>('body *')) {
          const { position } = getComputedStyle(el);
          if (position === 'fixed' || position === 'sticky') el.style.visibility = 'hidden';
        }
      });
      await expect(block).toHaveScreenshot(`${name}.png`, { maxDiffPixelRatio: 0.01, animations: 'disabled' });
    });
  }
});
