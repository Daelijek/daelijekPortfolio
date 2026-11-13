import { test, expect, type Page } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

// Automated WCAG 2.1 A/AA audit (axe-core) of every page type, the lightbox and all colour themes. Every section is
// scrolled into view first, because content fades in when it enters the viewport.

const skipBootScreen = (page: Page, theme = 'acid') =>
  page.addInitScript((t) => {
    sessionStorage.setItem('daelijek_booted', 'true');
    localStorage.setItem('daelijek_theme', t);
  }, theme);

async function revealAll(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(700);
}

async function audit(page: Page) {
  const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  return violations.map((v) => `${v.impact} ${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`);
}

test.describe('accessibility (axe)', () => {
  const PAGES = ['/', '/about', '/projects', '/contact', '/projects/rolesieve', '/ru/projects/finance-management-app', '/kk/projects/opengov-kz'];
  for (const path of PAGES) {
    test(`${path} has no WCAG A/AA violations`, async ({ page }) => {
      await skipBootScreen(page);
      await page.goto(path);
      await revealAll(page);
      expect(await audit(page)).toEqual([]);
    });
  }

  test('the lightbox has no WCAG A/AA violations', async ({ page }) => {
    await skipBootScreen(page);
    await page.goto('/projects/rolesieve');
    const slide = page.locator('[data-deck-slide]').first();
    await slide.scrollIntoViewIfNeeded();
    await slide.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('dialog').last()).toBeVisible();
    await page.waitForTimeout(400);
    expect(await audit(page)).toEqual([]);
  });

  for (const theme of ['cyan', 'amber', 'crimson', 'obsidian']) {
    test(`text contrast holds in the ${theme} theme`, async ({ page, isMobile }) => {
      test.skip(isMobile, 'colours do not depend on the viewport');
      await skipBootScreen(page, theme);
      await page.goto('/projects/opengov-kz');
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await revealAll(page);
      expect(await audit(page)).toEqual([]);
    });
  }
});
