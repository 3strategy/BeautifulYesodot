const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

const corpusPath = path.join(__dirname, '..', '_site', 'assets', 'data', 'searchcorpus.json');

function loadSearchCorpus() {
  const raw = fs.readFileSync(corpusPath, 'utf8');
  return JSON.parse(raw);
}

test.describe('search corpus menu links', () => {
  test('is valid JSON when page tags contain quotes', () => {
    const corpus = loadSearchCorpus();

    expect(corpus).toContainEqual(expect.objectContaining({
      title: 'מבחן מסכם ג מועד ב 1.7.26',
      category: expect.stringContaining('תמ&quot;ע'),
      url: '/teacher-only/cs3e/tests/Test1.7.26/',
    }));
  });

  test('indexes non-markdown menu links by menu title', () => {
    const corpus = loadSearchCorpus();
    const byTitle = new Map(corpus.map((item) => [item.title, item]));

    const chapterOneVideos = byTitle.get('סרטוני פרק 1');
    expect(chapterOneVideos).toBeTruthy();
    expect(chapterOneVideos.url).toContain('https://youtube.com/playlist?list=PLw4P_RdfuzSirWjKrYrwudzauSKkwqC1z');

    expect(corpus).toContainEqual(expect.objectContaining({
      title: '11.1.2 תרגול אינטרקטיבי',
      url: '/interactive/Ex11.1objects_array_interactive.html',
    }));

    const curriculum = byTitle.get('תכנית הלימודים');
    expect(curriculum).toBeTruthy();
    expect(curriculum.url).toContain('https://meyda.education.gov.il/files/CSIT/CS_1-2-4_ver_2-63.pdf');
  });
});
