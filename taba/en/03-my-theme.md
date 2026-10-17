---
layout: page
title: "03 — Making the website mine"
subtitle: Adapt HTML content in a Razor project already running in Visual Studio or VS Code; choose a theme, add links and lists, save and check the browser
lang: en
language: en
translation_of: /taba/03-my-theme/
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 4
track: core
published: true
companion_commit: b8453928ac20ff101a70969531ee60e81498c7ec
companion_previous: 4ba9f9dd7bf4b634ba111f8bbbb55756bdfb91b2
---

{: .box-note}
We will make the website our own: choose a topic that interests us, write an introduction and add a list and a link to more information.

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

<!-- lesson-back:start -->
[Previous lesson: 02 — The development environment: run and change a website]({{ '/taba/en/02-development-environment/' | relative_url }}){: data-sequence-nav="prev"} · [Next lesson: 04 — Styling with CSS]({{ '/taba/en/04-css-classes/' | relative_url }}){: data-sequence-nav="next"}

On a touchscreen, swipe right for the next lesson and left for the previous lesson.
<!-- lesson-back:end -->

<!--
[קוד השלב](https://github.com/3strategy/razortaba/tree/b8453928ac20ff101a70969531ee60e81498c7ec) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/4ba9f9dd7bf4b634ba111f8bbbb55756bdfb91b2...b8453928ac20ff101a70969531ee60e81498c7ec)
-->

## What we will learn

- Build a list and a link.
- Choose a topic that interests you.
- Distinguish between your own content and the website's shared structure.

{: .box-note}
This is still the practice stage, before registering your year-long project. You can work in your chosen experiment or create a new one in a separate folder using the [02 — setup guides]({{ '/taba/en/02-development-environment/' | relative_url }}). If you start again, apply the earlier lesson changes needed for the examples below. Keep your previous experiments; you do not need to publish to GitHub yet.

## Open and run

Open the project folder you have been working in, save the files and run the website. Check that the previous session's change appears before trying a new change.

## Choose a small topic

Choose animals, songs, games or players. Think ahead about a simple relationship: keeper–animals, artist–songs, studio–games or team–players. Each item will belong to one parent. Replace the text and images with content that fits your chosen topic. Save images you took or have permission to use in `wwwroot/images`.

## Code changes

### `RazorTaba/Pages/Index.cshtml`

Make the following change in the existing file. The `+` and `-` signs show changes and are not part of the code:

````diff
 @{
     ViewData["Title"] = "בית";
 }
 <h1>החיות שלי</h1>
-<p>זה האתר הראשון שלי. כאן אכיר לכם חיות שמסקרנות אותי.</p>
+<p>ברוכים הבאים לפינה שלי בטבע. נכיר חיות, נקרא עליהן ונלמד איך מטפלים בהן.</p>
+<h2>מה תמצאו כאן?</h2>
+<ul>
+    <li>חיות שיש להן סיפור</li>
+    <li>מדריכי טיפול קצרים</li>
+    <li>המלצות שלי להיכרות מקרוב</li>
+</ul>
+<a href="https://he.wikipedia.org/wiki/שועל">לקריאה על שועלים</a>
 <img src="~/images/fox.svg" alt="איור של שועל" width="180" />
````

## Run and check

1. The list displays three items.
2. The link opens the address you intended.
3. The heading and paragraph fit the same topic.

## Personal task and understanding check

Write an introductory paragraph and three list items about your topic. Explain how `href` differs from the text between the `a` tags.

{: .box-success}
After a change: save the files, check the website in the browser and explain what you changed. You can continue with this experiment or practise again in a separate project; note where you saved each experiment.

{: .box-note}
AI can help you understand an error message and troubleshoot a problem. You are responsible for writing, testing and explaining the code; do not run an agent to write the project for you.

<!-- teacher-notes:start
class_periods: 2
teacher-notes:end -->

<!-- lesson-next:start -->
---

## Next steps

- [Continue: 04 — Styling with CSS]({{ '/taba/en/04-css-classes/' | relative_url }})
<!-- lesson-next:end -->
