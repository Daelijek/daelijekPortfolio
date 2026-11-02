import { test, expect, type Page } from '@playwright/test';

const skipBootScreen = async (page: Page) => {
  await page.addInitScript(() => sessionStorage.setItem('daelijek_booted', 'true'));
};

test.describe('locale routing (server-rendered)', () => {
  test('Russian pages are rendered in Russian on the server', async ({ request }) => {
    const res = await request.get('/ru/about');
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).toContain('<html lang="ru"');
    expect(html).toMatch(/О Диасе Ермеке/); // localized <title>, present before any JS runs
  });

  test('English stays unprefixed and /en/* redirects to it', async ({ request }) => {
    const en = await request.get('/about');
    expect(en.status()).toBe(200);
    expect(await en.text()).toContain('<html lang="en"');

    const prefixed = await request.get('/en/about', { maxRedirects: 0 });
    expect(prefixed.status()).toBe(308);
    expect(prefixed.headers().location).toMatch(/\/about$/);
  });

  test('pages declare canonical and hreflang alternates', async ({ page }) => {
    await skipBootScreen(page);
    await page.goto('/kk/projects/rolesieve');
    await expect(page.locator('html')).toHaveAttribute('lang', 'kk');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/kk\/projects\/rolesieve$/);
    for (const [hreflang, path] of [
      ['en', '/projects/rolesieve'],
      ['ru', '/ru/projects/rolesieve'],
      ['kk', '/kk/projects/rolesieve'],
      ['x-default', '/projects/rolesieve'],
    ]) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${hreflang}"]`)).toHaveAttribute('href', new RegExp(`${path}$`));
    }
  });

  test('a remembered language redirects unprefixed URLs; no cookie means English', async ({ request, playwright }) => {
    const withCookie = await playwright.request.newContext({
      baseURL: test.info().project.use.baseURL,
      extraHTTPHeaders: { cookie: 'NEXT_LOCALE=ru' },
    });
    const res = await withCookie.get('/projects', { maxRedirects: 0 });
    expect(res.status()).toBe(307);
    expect(res.headers().location).toMatch(/\/ru\/projects$/);
    await withCookie.dispose();

    // Browser language alone never redirects.
    const plain = await request.get('/projects', { maxRedirects: 0, headers: { 'accept-language': 'ru-RU,ru;q=0.9' } });
    expect(plain.status()).toBe(200);
  });

  test('unknown pages are a localized 404', async ({ request }) => {
    const res = await request.get('/ru/does-not-exist');
    expect(res.status()).toBe(404);
    expect(await res.text()).toContain('Страница не найдена');
    expect((await request.get('/kk/projects/evently')).status()).toBe(404);
  });

  test('sitemap lists every locale with alternates', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text();
    expect(xml).toContain('/kk/projects/rolesieve</loc>');
    expect(xml).toMatch(/hreflang="ru"/);
  });

  test('localized case-study aliases redirect', async ({ request }) => {
    const res = await request.get('/ru/projects/role-sieve', { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers().location).toMatch(/\/ru\/projects\/rolesieve$/);
  });
});

test.describe('language switcher', () => {
  test('switches to the same page in Russian, remembers it, and back to English', async ({ page, context }) => {
    await skipBootScreen(page);
    await page.goto('/about');

    await page.getByRole('button', { name: 'Global System Settings' }).click();
    await page.getByRole('button', { name: 'RU', exact: true }).click();
    await expect(page).toHaveURL(/\/ru\/about$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');

    const cookies = await context.cookies();
    expect(cookies.find((c) => c.name === 'NEXT_LOCALE')?.value).toBe('ru');

    // Internal links stay in Russian.
    await page.goto('/ru/projects');
    await expect(page.locator('a[href="/ru/projects/rolesieve"]').first()).toBeAttached();

    // Unprefixed URL now redirects to the remembered language.
    await page.goto('/contact');
    await expect(page).toHaveURL(/\/ru\/contact$/);

    await page.getByRole('button', { name: 'Global System Settings' }).click();
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page).not.toHaveURL(/\/ru\//);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});
