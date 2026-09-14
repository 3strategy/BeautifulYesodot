const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const names = require('./fixtures/cs-initial-sequence.json');
const site = path.join(__dirname, '..', '_site');
const routes = {
  cs: names.map(name => `/cs/${name}/`),
  csru: ['/csru/', ...names.map(name => `/csru/${name}/`)],
};
let server, base;
test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
test.beforeAll(async () => {
  server = http.createServer((req, res) => {
    let file = path.join(site, decodeURIComponent(req.url.split('?')[0]));
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', file.endsWith('.js') ? 'application/javascript' :
      file.endsWith('.css') ? 'text/css' : 'text/html; charset=utf-8');
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
test.afterAll(async () => { await new Promise(resolve => server.close(resolve)); });
test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => route.request().url().startsWith(base)
    ? route.continue() : route.abort());
});

for (const [course, urls] of Object.entries(routes)) {
  test(`${course}: every lesson has reciprocal links and one shared swipe script`, async ({ page, request }) => {
    test.setTimeout(90000);
    for (const [index, url] of urls.entries()) {
      await page.goto(base + url);
      for (const [direction, expected] of [['prev', urls[index - 1]], ['next', urls[index + 1]]]) {
        const links = page.locator(`main a[data-sequence-nav="${direction}"]`);
        await expect(links).toHaveCount(expected ? 1 : 0);
        if (expected) {
          await expect(links).toHaveAttribute('href', expected);
          expect((await request.get(base + expected)).status()).toBe(200);
        }
      }
      await expect(page.locator('script[src$="/assets/js/sequence-navigation.js"]')).toHaveCount(1);
      if (course === 'csru') {
        await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
        await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
        await expect(page.locator('main')).toHaveCSS('direction', 'ltr');
        await expect(page.locator('main')).toHaveCSS('text-align', 'left');
      }
    }
  });

  test(`${course}: real touch swipes go next and previous on lesson prose`, async ({ page }) => {
    await page.goto(base + `/` + course + `/Chapter1/`);
    await swipe(page, true);
    await expect(page).toHaveURL(base + `/${course}/Chapter1Hagashot/`);
    await swipe(page, false);
    await expect(page).toHaveURL(base + `/${course}/Chapter1/`);
  });
}

async function swipe(page, forward) {
  const paragraph = page.locator('main p').filter({ hasText: /.{20}/, hasNot: page.locator('a') }).first();
  await paragraph.evaluate(el => el.scrollIntoView({ block: 'center' }));
  const box = await paragraph.boundingBox();
  const y = Math.max(100, Math.min(740, box.y + box.height / 2));
  const from = forward ? 100 : 285, to = forward ? 285 : 100;
  const session = await page.context().newCDPSession(page);
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: from, y, id: 1 }] });
  for (let step = 1; step <= 8; step++) {
    await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints:
      [{ x: from + (to - from) * step / 8, y, id: 1 }] });
  }
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await session.detach();
}

test('Russian menu persists across languages and leaves shared links available', async ({ page, context }) => {
  await page.goto(base + '/csru/');
  await page.locator('main a[href="javascript:setMenuSet(\'part-a-ru\');"]').click();
  await expect.poll(async () => (await context.cookies()).find(cookie => cookie.name === 'menu-set')?.value).toBe('part-a-ru');
  for (const url of ['/csru/Chapter1/', '/cs/Chapter1/']) {
    await page.goto(base + url);
    const menu = page.locator('nav [data-menu-sets]');
    const shown = await menu.evaluateAll(items => items.filter(item => !item.hidden).map(item => item.dataset.menuSets));
    expect(shown).toEqual(Array(5).fill('part-a-ru'));
    const shared = page.locator('nav > .navbar-collapse > ul > li:not([data-menu-sets])');
    expect(await shared.count()).toBeGreaterThanOrEqual(3);
    expect(await shared.evaluateAll(items => items.every(item => !item.hidden))).toBe(true);
    await expect(page.locator('nav [data-menu-sets="part-a-ru"]').first()).toHaveCSS('direction', 'ltr');
  }
  await page.evaluate(() => setMenuSet('part-a'));
  expect(await page.locator('nav [data-menu-sets]').evaluateAll(items =>
    items.filter(item => !item.hidden).every(item => item.dataset.menuSets.split(' ').includes('part-a')))).toBe(true);
});

test('Russian progress remains checked after reload and uses its own storage', async ({ page }) => {
  await page.goto(base + '/csru/Chapter0/');
  const checkbox = page.locator('#csru-progress-math');
  await checkbox.check();
  await page.reload();
  await expect(checkbox).toBeChecked();
  const value = await page.evaluate(() => JSON.parse(localStorage.getItem('csru-initial-course-progress-v1')));
  expect(value.math).toBe(true);
  await expect(page.locator('#csru-progress-comparison')).not.toBeChecked();
});
