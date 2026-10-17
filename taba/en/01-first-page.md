---
layout: page
title: "01 — My first page"
subtitle: Headings, a paragraph and an image in an HTML file you open in the browser
lang: en
language: en
translation_of: /taba/01-first-page/
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 2
track: core
published: true
companion_commit: d73b40cf58979e57680e965fcd86ad9b62590593
companion_previous: f4c81264dc3b00dc56e2d424bef1183b8bc79dab
---

{: .box-note}
We will create our first web page with a heading, a paragraph and an image. We will save an HTML file, open it in the browser and see how changing the code changes the page.

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

<!-- lesson-back:start -->
[Previous lesson: Roadmap: my website (Hebrew)]({{ '/taba/00-student-roadmap/' | relative_url }}){: data-sequence-nav="prev"} · [Next lesson: 02 — The development environment: run and change a website]({{ '/taba/en/02-development-environment/' | relative_url }}){: data-sequence-nav="next"}

On a touchscreen, swipe right for the next lesson and left for the previous lesson.
<!-- lesson-back:end -->

<!--
[קוד השלב](https://github.com/3strategy/razortaba/tree/d73b40cf58979e57680e965fcd86ad9b62590593) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/f4c81264dc3b00dc56e2d424bef1183b8bc79dab...d73b40cf58979e57680e965fcd86ad9b62590593)
-->

## What we will learn

- Distinguish between a source file and what the browser displays.
- Write opening and closing tags and set up Hebrew text.
- Link an image using a relative path.

## Prepare a folder for the files

Open File Explorer in Windows or Finder in macOS. Inside **Documents**, create a folder named `first-page`. We will save `index.html` and `fox.svg` there. You do not need Git or a GitHub account yet; we will start saving versions after the Bootstrap lesson.

## 1. Create an actual HTML file

In Windows, open Notepad and save the file in `first-page` as `index.html`, using UTF-8 encoding and the All files file type. Make sure it was not saved as `index.html.txt`. In macOS, you can use VS Code as a simple text editor.

## 2. Open it in the browser

Download the <a href="{{ '/assets/img/taba/fox.svg' | relative_url }}" download="fox.svg">fox illustration (fox.svg)</a> and save it in `first-page`, alongside `index.html`. Double-click `index.html`. After editing and saving, refresh the browser.

## Code changes

### `first-page/index.html`

The shared example website uses Hebrew text and right-to-left (RTL) layout. Keep the example code as shown so later lessons continue from the same website. “החיות שלי” means “My animals”; the paragraph introduces animals we are curious about, and the image description says “fox illustration”.

New file. Create `first-page/index.html` and paste in the following content:

````html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="utf-8">
    <title>החיות שלי</title>
</head>
<body>
    <h1>החיות שלי</h1>
    <p>זה האתר הראשון שלי. כאן אכיר לכם חיות שמסקרנות אותי.</p>
    <img src="fox.svg" alt="איור של שועל" width="180">
</body>
</html>
````

## Run and check

1. A heading, a paragraph and a fox illustration appear.
2. Change the heading and save; refresh and check what changed.
3. Temporarily change the image filename in `src` and explain the alternative text. Restore the correct path.

## Personal task and understanding check

Write your own paragraph and explain why changing `title` affects the browser tab, while changing `h1` affects the page body.

{: .box-success}
Save both files in `first-page` and check that the page opens and the image appears. In the next lesson, you will create a Razor Pages project and run it in your development environment.

{: .box-note}
AI can help you understand an error message and troubleshoot a problem. You are responsible for writing, testing and explaining the code; do not run an agent to write the project for you.

<!-- teacher-notes:start
class_periods: 1

הקצבת הפתיחה בעורך טקסט פשוט: כ־45 דקות בלבד. לאחר מכן עוברים לסביבת הפיתוח המלאה.
teacher-notes:end -->

<!-- lesson-next:start -->
---

## Next steps

- [Continue: 02 — The development environment: run and change a website]({{ '/taba/en/02-development-environment/' | relative_url }})
<!-- lesson-next:end -->
