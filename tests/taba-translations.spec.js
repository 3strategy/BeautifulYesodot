const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const site = path.join(__dirname, '..', '_site');
let server, base;

test.beforeAll(async () => {
  server = http.createServer((req, res) => {
    let file = path.join(site, decodeURIComponent(req.url.split('?')[0]));
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
    const mime = { '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml', '.png': 'image/png' };
    res.setHeader('Content-Type', mime[path.extname(file)] || 'text/html');
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
test.afterAll(async () => { await new Promise(resolve => server.close(resolve)); });
test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => route.request().url().startsWith(base) ? route.continue() : route.abort());
});

for (const language of ['en', 'ru']) {
  test(`${language}: preference, readable layout, translated setup and Hebrew boundary`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1600, height: 1000 });
    await page.goto(`${base}/taba/01-first-page/`);
    await page.locator('#lesson-language-preference').selectOption(language);
    await page.waitForURL(`${base}/taba/${language}/01-first-page/`);
    await expect(page.locator('html')).toHaveAttribute('lang', language);
    await expect(page.locator('main')).toHaveCSS('direction', 'ltr');
    await expect(page.locator('main')).toHaveCSS('text-align', 'left');
    await expect(page.locator('.lesson-language-versions a')).toHaveCount(3);
    await expect(page.locator('.lesson-language-versions [aria-current="page"]')).toHaveAttribute('lang', language);
    await page.locator('main [data-sequence-nav="next"]').click();
    await page.waitForURL(`${base}/taba/${language}/02-development-environment/`);
    // Visual Studio's setup also contains a nested HTTPS troubleshooting note.
    await expect(page.locator('main details:not(details details)')).toHaveCount(3);
    const headings = language === 'en' ? ['Before', 'After'] : ['До', 'После'];
    const comparison = page.locator('.code-diff').first();
    await expect(comparison.locator('h4')).toHaveText(headings);
    const panels = comparison.locator('.code-diff-panel');
    const a = await panels.nth(0).boundingBox(), b = await panels.nth(1).boundingBox();
    expect(a.x).toBeLessThan(b.x);
    expect(a.y).toBe(b.y);
    const positions = await panels.evaluateAll(elements => elements.map(panel =>
      [...panel.querySelectorAll('.code-diff-line')].map(line => line.getBoundingClientRect().y)));
    expect(positions[0]).toEqual(positions[1]);
    const code = await panels.nth(1).locator('code').textContent();
    expect(code).toContain('<html lang="he" dir="rtl">');
    expect(code).not.toMatch(/^[+-]/m);
    expect((await comparison.locator('ins').allTextContents()).join('')).toContain('rtl');
    await comparison.screenshot({ path: testInfo.outputPath(`${language}-code-comparison.png`) });
    await page.goto(`${base}/taba/${language}/12-first-dynamic-page/`);
    await page.locator('main [data-sequence-nav="next"]').click();
    await page.waitForURL(`${base}/taba/13-animal-model/`);
    await expect(page.locator('html')).toHaveAttribute('lang', 'he');
    expect(await page.evaluate(() => localStorage.getItem('lesson-language-preference'))).toBe(language);
    // A canonical menu destination must pick the saved edition again.
    await page.goto(`${base}/taba/04-css-classes/`);
    await page.waitForURL(`${base}/taba/${language}/04-css-classes/`);
    // Explicit source inspection remains available without changing preference.
    await page.locator('.lesson-language-versions a[lang="he"]').click();
    await page.waitForURL(`${base}/taba/04-css-classes/?lang=he`);
    await expect(page.locator('html')).toHaveAttribute('lang', 'he');
  });

  test(`${language}: mobile prose stays LTR and code comparisons stay side by side`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${base}/taba/${language}/02-development-environment/`);
    await expect(page.locator('main')).toHaveCSS('direction', 'ltr');
    const comparison = page.locator('.code-diff').first();
    const panels = comparison.locator('.code-diff-panel');
    const a = await panels.nth(0).boundingBox(), b = await panels.nth(1).boundingBox();
    expect(a.x).toBeLessThan(b.x);
    expect(a.y).toBe(b.y);
    expect(await comparison.evaluate(element => element.scrollWidth > element.clientWidth)).toBe(true);
    const ordinaryParagraph = page.locator('main p.box-note').first();
    const box = await ordinaryParagraph.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(391);
    await ordinaryParagraph.scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath(`${language}-mobile-lesson.png`) });
  });
}
