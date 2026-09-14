# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\cs-course-navigation.spec.js >> Russian menu persists across languages and leaves shared links available
- Location: tests\cs-course-navigation.spec.js:79:1

# Error details

```
TypeError: Cannot read properties of undefined (reading 'value')
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | const fs = require('node:fs');
  3   | const http = require('node:http');
  4   | const path = require('node:path');
  5   | const names = require('./fixtures/cs-initial-sequence.json');
  6   | const site = path.join(__dirname, '..', '_site');
  7   | const routes = {
  8   |   cs: names.map(name => `/cs/${name}/`),
  9   |   csru: ['/csru/', ...names.map(name => `/csru/${name}/`)],
  10  | };
  11  | let server, base;
  12  | test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  13  | test.beforeAll(async () => {
  14  |   server = http.createServer((req, res) => {
  15  |     let file = path.join(site, decodeURIComponent(req.url.split('?')[0]));
  16  |     if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  17  |     if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
  18  |     res.setHeader('Content-Type', file.endsWith('.js') ? 'application/javascript' :
  19  |       file.endsWith('.css') ? 'text/css' : 'text/html; charset=utf-8');
  20  |     fs.createReadStream(file).pipe(res);
  21  |   });
  22  |   await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  23  |   base = `http://127.0.0.1:${server.address().port}`;
  24  | });
  25  | test.afterAll(async () => { await new Promise(resolve => server.close(resolve)); });
  26  | test.beforeEach(async ({ page }) => {
  27  |   await page.route('**/*', route => route.request().url().startsWith(base)
  28  |     ? route.continue() : route.abort());
  29  | });
  30  | 
  31  | for (const [course, urls] of Object.entries(routes)) {
  32  |   test(`${course}: every lesson has reciprocal links and one shared swipe script`, async ({ page, request }) => {
  33  |     test.setTimeout(90000);
  34  |     for (const [index, url] of urls.entries()) {
  35  |       await page.goto(base + url);
  36  |       for (const [direction, expected] of [['prev', urls[index - 1]], ['next', urls[index + 1]]]) {
  37  |         const links = page.locator(`main a[data-sequence-nav="${direction}"]`);
  38  |         await expect(links).toHaveCount(expected ? 1 : 0);
  39  |         if (expected) {
  40  |           await expect(links).toHaveAttribute('href', expected);
  41  |           expect((await request.get(base + expected)).status()).toBe(200);
  42  |         }
  43  |       }
  44  |       await expect(page.locator('script[src$="/assets/js/sequence-navigation.js"]')).toHaveCount(1);
  45  |       if (course === 'csru') {
  46  |         await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  47  |         await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  48  |         await expect(page.locator('main')).toHaveCSS('direction', 'ltr');
  49  |         await expect(page.locator('main')).toHaveCSS('text-align', 'left');
  50  |       }
  51  |     }
  52  |   });
  53  | 
  54  |   test(`${course}: real touch swipes go next and previous on lesson prose`, async ({ page }) => {
  55  |     await page.goto(base + `/` + course + `/Chapter1/`);
  56  |     await swipe(page, true);
  57  |     await expect(page).toHaveURL(base + `/${course}/Chapter1Hagashot/`);
  58  |     await swipe(page, false);
  59  |     await expect(page).toHaveURL(base + `/${course}/Chapter1/`);
  60  |   });
  61  | }
  62  | 
  63  | async function swipe(page, forward) {
  64  |   const paragraph = page.locator('main p').filter({ hasText: /.{20}/, hasNot: page.locator('a') }).first();
  65  |   await paragraph.evaluate(el => el.scrollIntoView({ block: 'center' }));
  66  |   const box = await paragraph.boundingBox();
  67  |   const y = Math.max(100, Math.min(740, box.y + box.height / 2));
  68  |   const from = forward ? 100 : 285, to = forward ? 285 : 100;
  69  |   const session = await page.context().newCDPSession(page);
  70  |   await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: from, y, id: 1 }] });
  71  |   for (let step = 1; step <= 8; step++) {
  72  |     await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints:
  73  |       [{ x: from + (to - from) * step / 8, y, id: 1 }] });
  74  |   }
  75  |   await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  76  |   await session.detach();
  77  | }
  78  | 
  79  | test('Russian menu persists across languages and leaves shared links available', async ({ page, context }) => {
  80  |   await page.goto(base + '/csru/');
  81  |   await page.locator('main a[href="javascript:setMenuSet(\'part-a-ru\');"]').click();
> 82  |   expect((await context.cookies()).find(cookie => cookie.name === 'menu-set').value).toBe('part-a-ru');
      |                                                                              ^ TypeError: Cannot read properties of undefined (reading 'value')
  83  |   for (const url of ['/csru/Chapter1/', '/cs/Chapter1/']) {
  84  |     await page.goto(base + url);
  85  |     const menu = page.locator('nav [data-menu-sets]');
  86  |     const shown = await menu.evaluateAll(items => items.filter(item => !item.hidden).map(item => item.dataset.menuSets));
  87  |     expect(shown).toEqual(Array(5).fill('part-a-ru'));
  88  |     const shared = page.locator('nav > .navbar-collapse > ul > li:not([data-menu-sets])');
  89  |     expect(await shared.count()).toBeGreaterThanOrEqual(3);
  90  |     expect(await shared.evaluateAll(items => items.every(item => !item.hidden))).toBe(true);
  91  |     await expect(page.locator('nav [data-menu-sets="part-a-ru"]').first()).toHaveCSS('direction', 'ltr');
  92  |   }
  93  |   await page.evaluate(() => setMenuSet('part-a'));
  94  |   expect(await page.locator('nav [data-menu-sets]').evaluateAll(items =>
  95  |     items.filter(item => !item.hidden).every(item => item.dataset.menuSets.split(' ').includes('part-a')))).toBe(true);
  96  | });
  97  | 
  98  | test('Russian progress remains checked after reload and uses its own storage', async ({ page }) => {
  99  |   await page.goto(base + '/csru/Chapter0/');
  100 |   const checkbox = page.locator('#csru-progress-math');
  101 |   await checkbox.check();
  102 |   await page.reload();
  103 |   await expect(checkbox).toBeChecked();
  104 |   const value = await page.evaluate(() => JSON.parse(localStorage.getItem('csru-initial-course-progress-v1')));
  105 |   expect(value.math).toBe(true);
  106 |   await expect(page.locator('#csru-progress-comparison')).not.toBeChecked();
  107 | });
  108 | 
```