---
layout: page
title: "PDF.js Viewer1 Demo"
subtitle: "בדיקת viewer1.html מצומצם"
tags: [pdfjs, viewer, iframe, cs3e]
lang: he
---

{: .box-note}
דף בדיקה עבור `viewer1.html` המצומצם:
Zoom, Print, Download בלבד, עם פתיחה ב-`page-width`.

[פתיחה בלשונית חדשה](/assets/pdfjs/web/viewer1.html?file=%2Fassets%2Fpdfjs%2Fweb%2Fcompressed.tracemonkey-pldi-09.pdf)

### מיכל רחב

<div style="border: 1px solid #d0d7de; border-radius: 8px; overflow: hidden; height: 70vh;">
  <iframe
    src="/assets/pdfjs/web/viewer1.html?file=%2Fassets%2Fpdfjs%2Fweb%2Fcompressed.tracemonkey-pldi-09.pdf"
    title="PDF.js reduced viewer demo wide container"
    style="width: 100%; height: 100%; border: 0;"
    loading="lazy"
  ></iframe>
</div>

### מיכל צר

<div style="max-width: 700px; margin: 0 auto;">
  <div style="border: 1px solid #d0d7de; border-radius: 8px; overflow: hidden; height: 70vh;">
    <iframe
      src="/assets/pdfjs/web/viewer1.html?file=%2Fassets%2Fpdfjs%2Fweb%2Fcompressed.tracemonkey-pldi-09.pdf"
      title="PDF.js reduced viewer demo narrow container"
      style="width: 100%; height: 100%; border: 0;"
      loading="lazy"
    ></iframe>
  </div>
</div>
