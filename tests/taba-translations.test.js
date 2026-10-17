const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');
const sources = fs.readdirSync(path.join(root, 'taba'))
  .filter(name => /^(0[1-9]|1[0-2])-.*\.md$/.test(name)).sort();
const lessons = sources.filter(name => !name.startsWith('02-setup-'));
const includes = ['setup-rider.md', 'setup-visual-studio.md', 'setup-vscode.md'];
const metadata = (text, key) => text.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1].replace(/^["']|["']$/g, '');

function codeBlocks(text) {
  // Hidden checkpoint notes are source documentation, not student instructions.
  text = text.replace(/<!--[\s\S]*?-->/g, '');
  const blocks = [];
  let fence = null, block = [];
  for (const line of text.split('\n')) {
    const marker = line.match(/^\s*(`{3,}|~{3,})(.*)$/);
    if (!fence && marker) {
      fence = marker[1]; block = [line];
    } else if (fence) {
      block.push(line);
      if (marker && marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2].trim()) {
        blocks.push(block.join('\n')); fence = null;
      }
    }
  }
  assert.equal(fence, null, 'unclosed code fence');
  blocks.push(...text.matchAll(/{%\s*(?:code_diff|highlight)\b[\s\S]*?{%\s*end(?:code_diff|highlight)\s*%}/g));
  return blocks.map(String);
}

for (const language of ['en', 'ru']) {
  test(`${language}: complete bounded edition, metadata and unchanged copyable code`, () => {
    assert.equal(lessons.length, 12);
    assert.deepEqual(fs.readdirSync(path.join(root, 'taba', language)).filter(name => name.endsWith('.md')).sort(), sources);
    for (const name of sources) {
      const original = read(`taba/${name}`), translated = read(`taba/${language}/${name}`);
      assert.equal(metadata(translated, 'lang'), language, name);
      assert.equal(metadata(translated, 'translation_of'), `/taba/${name.slice(0, -3)}/`, name);
      for (const key of ['sequence', 'track', 'companion_commit', 'companion_previous']) {
        assert.equal(metadata(translated, key), metadata(original, key), `${name}: ${key}`);
      }
      assert.deepEqual(codeBlocks(translated), codeBlocks(original), `${name}: copyable source changed`);
      const body = translated.replace(/^---\n[\s\S]*?\n---\n/, '');
      assert.match(body, /^\s*\{:\s*\.box-note\}/, `${name}: opening synopsis`);
      for (const include of translated.matchAll(/{%\s*include\s+(\S+)\s*%}/g)) {
        assert.ok(fs.existsSync(path.join(root, '_includes', include[1])), `${name}: ${include[1]}`);
        if (include[1].startsWith('taba/')) assert.ok(include[1].startsWith(`taba/${language}/`));
      }
    }
    for (const name of includes) {
      assert.deepEqual(codeBlocks(read(`_includes/taba/${language}/${name}`)), codeBlocks(read(`_includes/taba/${name}`)), name);
    }
  });

  test(`${language}: built language maps, navigation, source links and local assets resolve`, () => {
    for (const name of sources) {
      const stem = name.slice(0, -3), url = `/taba/${language}/${stem}/`;
      const rendered = read(`_site${url}index.html`);
      assert.match(rendered, new RegExp(`<html[^>]*lang="${language}"`), name);
      const data = JSON.parse(rendered.match(/<script id="lesson-language-data"[^>]*>([\s\S]*?)<\/script>/)[1]);
      assert.deepEqual(data.versions, {
        he: `/taba/${stem}/`, en: `/taba/en/${stem}/`, ru: `/taba/ru/${stem}/`
      }, name);
      assert.equal(data.language, language);
      const main = rendered.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
      assert.doesNotMatch(main, /{%|%}/, `${name}: unrendered Liquid`);
      for (const match of main.matchAll(/\b(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
        const urlPath = decodeURIComponent(match[1]);
        const candidates = [urlPath, `${urlPath.replace(/\/$/, '')}/index.html`];
        assert.ok(candidates.some(candidate => fs.existsSync(path.join(root, '_site', candidate))), `${name}: missing ${urlPath}`);
      }
      const index = lessons.indexOf(name);
      if (index < 0) continue; // Setup guides are alternatives, not swipe steps.
      for (const [direction, neighbor] of [['prev', lessons[index - 1]], ['next', lessons[index + 1]]]) {
        const target = neighbor ? `/taba/${language}/${neighbor.slice(0, -3)}/` :
          direction === 'prev' ? '/taba/00-student-roadmap/' : '/taba/13-animal-model/';
        const links = [...main.matchAll(/<a\b([^>]*data-sequence-nav="(?:prev|next)"[^>]*)>/g)]
          .map(match => match[1]).filter(attributes => attributes.includes(`data-sequence-nav="${direction}"`));
        assert.equal(links.length, 1, `${name}: ${direction} count`);
        assert.ok(links[0].includes(`href="${target}"`), `${name}: ${direction} should lead to ${target}`);
      }
    }
    for (const stem of ['00-student-roadmap', '13-animal-model']) {
      const html = read(`_site/taba/${stem}/index.html`);
      const data = JSON.parse(html.match(/<script id="lesson-language-data"[^>]*>([\s\S]*?)<\/script>/)[1]);
      assert.deepEqual(data.versions, {}, `${stem}: outside translation scope`);
    }
  });
}
