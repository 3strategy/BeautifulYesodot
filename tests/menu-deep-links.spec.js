const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

// Exercise the course selector and the shareable menu state together.
const site = path.join(__dirname, '..', '_site');
let server, base, defaultMenu, alternateMenu;

test.beforeAll(async () => {
  server = http.createServer((req, res) => {
    let file = path.join(site, decodeURIComponent(req.url.split('?')[0]));
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file) && !path.extname(file)) file += '.html';
    if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', file.endsWith('.js') ? 'application/javascript' :
      file.endsWith('.css') ? 'text/css' : file.endsWith('.svg') ? 'image/svg+xml' : 'text/html');
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
  const html = fs.readFileSync(path.join(site, 'index.html'), 'utf8');
  defaultMenu = html.match(/data-default-menu-set="([^"]+)"/)[1];
  alternateMenu = 'taba';
});
test.afterAll(async () => { await new Promise(resolve => server.close(resolve)); });
test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => route.request().url().startsWith(base)
    ? route.continue() : route.abort());
});

async function expectMenu(page, menu) {
  const activeCourse = page.locator('[data-course-menu][aria-current="true"]');
  await expect(activeCourse).toHaveAttribute('data-course-menu', menu);
  await expect(page.locator('#course-selector')).toHaveText(await activeCourse.textContent());
  expect(new URL(page.url()).searchParams.get('menu')).toBe(menu);
  const items = await page.locator('[data-menu-sets]').evaluateAll(items => items.map(item => ({
    menus: item.dataset.menuSets.split(/\s+/), hidden: item.hidden
  })));
  for (const item of items) expect(item.hidden).toBe(!item.menus.includes(menu));
}

async function saveMenu(context, menu) {
  await context.addCookies([{ name: 'menu-set', value: menu, url: base }]);
}

test('a fresh recipient opens the course with its selected menu', async ({ page, context }) => {
  await page.goto(`${base}/?menu=${alternateMenu}`);
  await expectMenu(page, alternateMenu);
  expect((await context.cookies()).find(cookie => cookie.name === 'menu-set').value).toBe(alternateMenu);
});

test('explicit menu overrides a previously saved preference', async ({ page, context }) => {
  await saveMenu(context, defaultMenu);
  await page.goto(`${base}/?menu=${alternateMenu}`);
  await expectMenu(page, alternateMenu);
  await page.reload();
  await expectMenu(page, alternateMenu);
});

test('menu follows an ordinary internal link and the destination stays shareable', async ({ page }) => {
  await page.goto(`${base}/?menu=${alternateMenu}`);
  await expectMenu(page, alternateMenu);
  const link = page.locator(`[data-menu-sets~="${alternateMenu}"] a[href^="/"]`).first();
  const target = await link.getAttribute('href');
  await Promise.all([
    page.waitForURL(url => url.pathname === new URL(target, base).pathname),
    link.evaluate(element => element.click())
  ]);
  await page.waitForLoadState('load');
  await expectMenu(page, alternateMenu);
});

test('changing the menu in place updates a stale deep link without reloading', async ({ page }) => {
  await page.goto(`${base}/?menu=${alternateMenu}&exercise=2#question`);
  await expectMenu(page, alternateMenu);
  await page.evaluate(() => { window.menuTestMarker = true; });
  await page.evaluate(menu => setMenuSet(menu), defaultMenu);
  await expectMenu(page, defaultMenu);
  expect(await page.evaluate(() => window.menuTestMarker)).toBe(true);
  const url = new URL(page.url());
  expect(url.searchParams.get('exercise')).toBe('2');
  expect(url.hash).toBe('#question');
  await page.reload();
  await expectMenu(page, defaultMenu);
});

test('invalid and empty URL values preserve the saved preference', async ({ page, context }) => {
  await saveMenu(context, alternateMenu);
  for (const value of ['unknown', '', '%3Cscript%3E', 'TABA']) {
    await page.goto(`${base}/?menu=${value}`);
    await expectMenu(page, alternateMenu);
  }
});

test('missing or invalid preferences fall back to the site default', async ({ page, context }) => {
  await page.goto(base);
  await expectMenu(page, defaultMenu);
  await saveMenu(context, 'obsolete');
  await page.goto(`${base}/?menu=unknown`);
  await expectMenu(page, defaultMenu);
});

test('same-document back and forward restore the menu carried by the URL', async ({ page }) => {
  await page.goto(`${base}/?menu=${alternateMenu}`);
  await expectMenu(page, alternateMenu);
  await page.evaluate(menu => {
    history.pushState({ lesson: 2 }, '', `?menu=${menu}#next`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, defaultMenu);
  await expectMenu(page, defaultMenu);
  await page.goBack();
  await expectMenu(page, alternateMenu);
  await page.goForward();
  await expectMenu(page, defaultMenu);
});

test('URL synchronization preserves history state and all other URL parts', async ({ page, context }) => {
  await saveMenu(context, alternateMenu);
  await page.addInitScript(() => history.replaceState({ lesson: 7 }, '', location.href));
  await page.goto(`${base}/?exercise=2&lang=he#question`);
  await expectMenu(page, alternateMenu);
  const url = new URL(page.url());
  expect(url.searchParams.get('exercise')).toBe('2');
  expect(url.searchParams.get('lang')).toBe('he');
  expect(url.hash).toBe('#question');
  expect(await page.evaluate(() => history.state)).toEqual({ lesson: 7 });
});

test('configured empty menus remain selectable on sites that support them', async ({ page }) => {
  await page.goto(`${base}/?menu=${alternateMenu}`);
  const supportsEmptyMenus = await page.locator('.navbar').getAttribute('data-menu-set-ids');
  test.skip(!supportsEmptyMenus, 'This site discovers menu IDs from populated items.');
  await page.evaluate(menu => {
    document.querySelectorAll('[data-menu-sets]').forEach(item => {
      item.dataset.menuSets = item.dataset.menuSets.split(/\s+/).filter(id => id !== menu).join(' ');
    });
    setMenuSet(menu);
  }, alternateMenu);
  await expectMenu(page, alternateMenu);
});

function taggedPage() {
  return { path: '/taba/00-student-roadmap/', menu: 'taba' };
}

test('a bare direct URL selects the page tag over a saved menu', async ({ page, context }) => {
  const tagged = taggedPage();
  await saveMenu(context, defaultMenu);
  await page.goto(`${base}${tagged.path}?exercise=3#question`);
  await expectMenu(page, tagged.menu);
  expect((await context.cookies()).find(cookie => cookie.name === 'menu-set').value).toBe(tagged.menu);
  const url = new URL(page.url());
  expect(url.searchParams.get('exercise')).toBe('3');
  expect(url.hash).toBe('#question');
});

test('an unchanged navbar link selects the destination page menu', async ({ page }) => {
  const tagged = taggedPage();
  await page.goto(base);
  await expectMenu(page, defaultMenu);
  const link = page.locator(`.navbar a[href^="${tagged.path.replace(/\/$/, '')}"]`).first();
  const href = await link.getAttribute('href');
  expect(href).not.toContain('?');
  await Promise.all([
    page.waitForURL(url => url.pathname.replace(/\/$/, '') === tagged.path.replace(/\/$/, '')),
    link.evaluate(element => element.click())
  ]);
  await page.waitForLoadState('load');
  await expectMenu(page, tagged.menu);
});

test('a page tag overrides a conflicting URL but permits a manual change until reload', async ({ page }) => {
  const tagged = taggedPage();
  await page.goto(`${base}${tagged.path}?menu=${defaultMenu}`);
  await expectMenu(page, tagged.menu);
  await page.evaluate(menu => setMenuSet(menu), defaultMenu);
  await expectMenu(page, defaultMenu);
  await page.reload();
  await expectMenu(page, tagged.menu);
});

test('search results include the page tag in their URLs', async ({ page }) => {
  const tagged = taggedPage();
  const corpus = JSON.parse(fs.readFileSync(path.join(site, 'assets/data/searchcorpus.json'), 'utf8'));
  const result = corpus.find(item => item.url === `${tagged.path}?menu=${tagged.menu}`);
  expect(result).toBeTruthy();
  await page.goto(base + result.url);
  await expectMenu(page, tagged.menu);
});

test('an invalid page tag falls back to a valid incoming URL', async ({ page }) => {
  const tagged = taggedPage();
  await page.route(`${base}${tagged.path}?menu=${defaultMenu}`, async route => {
    const response = await route.fetch();
    const body = (await response.text()).replace(/data-page-menu-set="[^"]*"/, 'data-page-menu-set="unknown"');
    await route.fulfill({ response, body });
  });
  await page.goto(`${base}${tagged.path}?menu=${defaultMenu}`);
  await expectMenu(page, defaultMenu);
});

test('the course selector opens the five Yesodot course pages with submission links', async ({ page }) => {
  const courses = [
    ['חלק א', '/cs/', 'part-a'],
    ['חלק א ברוסית', '/csru/', 'part-a-ru'],
    ['חלק ב', '/cs2/', 'part-b'],
    ['חלק ג', '/cs3e/', 'part-c'],
    ['תב״א', '/taba/00-student-roadmap/', 'taba'],
  ];
  await page.goto(base);
  const links = page.locator('#course-menu a');
  await expect(links).toHaveText(courses.map(([label]) => label));
  for (const [, url, menu] of courses) {
    const link = page.locator(`#course-menu [data-course-menu="${menu}"]`);
    await expect(link).toHaveAttribute('href', url);
    await link.evaluate(element => element.click());
    await expect(page).toHaveURL(`${base}${url}?menu=${menu}`);
    await expectMenu(page, menu);
    const submission = page.getByRole('link', { name: 'הגשת מטלות ב־CodeClassroom' });
    await expect(submission).toHaveAttribute('href', 'https://codeclassroom.io/');
    await expect(submission.locator('img')).not.toHaveJSProperty('naturalWidth', 0);
    await expect(page.locator('footer').getByRole('link', { name: 'CodeClassroom.io' }))
      .toHaveAttribute('href', 'https://codeclassroom.io/');
  }
});

test('direct course links select their chapters and shared pages remember the menu', async ({ page }) => {
  for (const [url, menu] of [
    ['/cs/Chapter3/', 'part-a'],
    ['/csru/Chapter3/', 'part-a-ru'],
    ['/cs2/Chapter8/', 'part-b'],
    ['/cs3e/Objects_02_BuildingClasses/', 'part-c'],
    ['/interactive/objectsQuestionnaire/', 'part-c'],
    ['/cs2/ChapterCampus/', 'part-c'],
    ['/cs/0YearOpening/', 'part-c'],
    ['/taba/04-css-classes/', 'taba'],
  ]) {
    await page.goto(base + url);
    await expectMenu(page, menu);
  }
});
