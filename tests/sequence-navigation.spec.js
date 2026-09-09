const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const site = path.join(__dirname, '..', '_site');
const sequence = require('./fixtures/swipe-sequence.json');
const lessons = [];
for (let url = '/taba/00-student-roadmap/'; url; url = sequence[url].next) {
  if (lessons.includes(url)) throw new Error('Sequence contains a cycle');
  lessons.push(url);
}
let server, base;
test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
test.beforeAll(async () => {
  server = http.createServer((req, res) => {
    let file = path.join(site, decodeURIComponent(req.url.split('?')[0]));
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', file.endsWith('.js') ? 'application/javascript' :
      file.endsWith('.css') ? 'text/css' : 'text/html');
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
async function open(page, index = 1) {
  await page.goto(`${base}${lessons[index]}`);
  await readingSurface(page);
}
async function readingSurface(page) {
  await page.waitForLoadState('load');
  await page.locator('main').waitFor();
  // A plain reading surface within the actual lesson, clear of navigation links.
  await page.evaluate(() => {
    document.querySelector('#swipe-test-surface')?.remove();
    const surface = document.createElement('div');
    surface.id = 'swipe-test-surface';
    surface.textContent = 'Reading surface';
    surface.style.cssText = 'position:fixed;top:260px;left:35px;width:320px;height:180px;background:white;z-index:9999';
    document.querySelector('main').append(surface);
  });
}
async function swipe(page, from, to, { cancel = false, multi = false } = {}) {
  const session = await page.context().newCDPSession(page);
  const points = (x, y) => [{ x, y, id: 1 }, ...(multi ? [{ x: x + 20, y: y + 30, id: 2 }] : [])];
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: points(...from) });
  for (let step = 1; step <= 8; step++) {
    await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints:
      points(from[0] + (to[0] - from[0]) * step / 8, from[1] + (to[1] - from[1]) * step / 8) });
  }
  await session.send('Input.dispatchTouchEvent', { type: cancel ? 'touchCancel' : 'touchEnd', touchPoints: [] });
  await session.detach();
}

test('all Taba links render correctly, resolve locally and form a reciprocal route', async ({page, request}) => {
  test.setTimeout(90000);
  expect(lessons).toHaveLength(24);
  for (const [index, url] of lessons.entries()) {
    await page.goto(base + url);
    for (const [direction, destination] of Object.entries(sequence[url])) {
      const links = page.locator('main a[data-sequence-nav="'+direction+'"]');
      await expect(links).toHaveCount(destination ? 1 : 0);
      if (destination) {
        await expect(links).toHaveAttribute('href', destination);
        expect((await request.get(base+destination)).status()).toBe(200);
        expect(sequence[destination][direction === 'next' ? 'prev' : 'next']).toBe(url);
      }
    }
    await expect(page.locator('script[src$="/assets/js/sequence-navigation.js"]')).toHaveCount(1);
  }
});

test('before-after layout puts before on the left and stacks it first on mobile', async ({page}) => {
  await open(page);
  await page.evaluate(() => {
    document.querySelector('main').insertAdjacentHTML('beforeend', '<div class="two-columns before-after" id="pair"><div class="column">Before</div><div class="column">After</div></div>');
  });
  await expect(page.locator('#pair')).toHaveCSS('flex-direction', 'column');
  const columns=page.locator('#pair .column');
  let first=await columns.nth(0).boundingBox(), second=await columns.nth(1).boundingBox();
  expect(first.y).toBeLessThan(second.y);
  await page.setViewportSize({width:1280,height:900});
  await expect(page.locator('#pair')).toHaveCSS('flex-direction', 'row-reverse');
  first=await columns.nth(0).boundingBox(); second=await columns.nth(1).boundingBox();
  expect(first.x).toBeLessThan(second.x);
});

test('native touch swipe right goes next, swipe left goes previous, including after history return', async ({ page }) => {
  await open(page);
  await swipe(page, [100, 330], [285, 334]);
  await expect(page).toHaveURL(`${base}${lessons[2]}`);
  await page.goBack();
  await readingSurface(page);
  await swipe(page, [285, 330], [100, 334]);
  await expect(page).toHaveURL(`${base}${lessons[0]}`);
});

test('swiping an actual lesson paragraph navigates and ordinary navigation links still work', async ({ page }) => {
  await page.goto(`${base}${lessons[1]}`);
  const paragraph = page.locator('main p.box-note').first();
  await paragraph.evaluate(el => el.scrollIntoView({ block: 'center' }));
  const box = await paragraph.boundingBox();
  const y = box.y + box.height / 2;
  await swipe(page, [100, y], [285, y + 2]);
  await expect(page).toHaveURL(`${base}${lessons[2]}`);
  await page.locator('a[data-sequence-nav="prev"]').first().click();
  await expect(page).toHaveURL(`${base}${lessons[1]}`);
});

test('zoomed reading does not navigate', async ({ page }) => {
  await open(page);
  const session = await page.context().newCDPSession(page);
  await session.send('Emulation.setPageScaleFactor', { pageScaleFactor: 2 });
  expect(await page.evaluate(() => visualViewport.scale)).toBeGreaterThan(1.05);
  const url = page.url();
  await swipe(page, [100, 330], [285, 330]);
  await page.waitForTimeout(150);
  expect(page.url()).toBe(url);
  await session.detach();
});

for (const [name, from, to, options] of [
  ['short drag', [140, 330], [175, 330], {}],
  ['vertical scroll', [160, 400], [164, 280], {}],
  ['diagonal scroll', [100, 400], [260, 280], {}],
  ['cancelled swipe', [100, 330], [285, 330], { cancel: true }],
  ['two fingers', [100, 330], [265, 330], { multi: true }],
  ['screen edge', [5, 330], [230, 330], {}],
]) {
  test(`${name} does not navigate`, async ({ page }) => {
    await open(page);
    const url = page.url();
    await swipe(page, from, to, options);
    await page.waitForTimeout(150);
    expect(page.url()).toBe(url);
    if (name === 'vertical scroll') expect(await page.evaluate(() => scrollY)).toBeGreaterThan(0);
  });
}

test('controls, explicit opt-out, selected text and horizontal scrollers keep their gestures', async ({ page }) => {
  for (const kind of ['button', 'ignore', 'selection', 'overflow']) {
    await open(page);
    await page.evaluate(kind => {
      const surface = document.querySelector('#swipe-test-surface');
      if (kind === 'button') surface.innerHTML = '<button style="width:100%;height:100%">Control</button>';
      if (kind === 'ignore') surface.dataset.swipeIgnore = '';
      if (kind === 'selection') {
        const range = document.createRange(); range.selectNodeContents(surface);
        getSelection().addRange(range);
      }
      if (kind === 'overflow') {
        surface.style.overflowX = 'auto';
        surface.style.direction = 'ltr';
        surface.innerHTML = '<div style="width:1000px;height:100%">Wide table or code</div>';
      }
    }, kind);
    const url = page.url();
    await swipe(page, [285, 330], [100, 330]);
    await page.waitForTimeout(150);
    expect(page.url()).toBe(url);
    if (kind === 'overflow') expect(await page.locator('#swipe-test-surface').evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
  }
});

test('boundaries and untagged pages do not navigate', async ({ page }) => {
  for (const [index, from, to] of [[0, [285, 330], [100, 330]], [lessons.length - 1, [100, 330], [285, 330]]]) {
    await open(page, index);
    const url = page.url();
    await swipe(page, from, to);
    await page.waitForTimeout(150);
    expect(page.url()).toBe(url);
  }
  await page.goto(`${base}/taba/00-teacher-plan/`);
  const url = page.url();
  await expect(page.locator('[data-sequence-nav]')).toHaveCount(0);
  await swipe(page, [100, 330], [285, 330]);
  expect(page.url()).toBe(url);
});
