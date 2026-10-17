---
layout: page
title: "04 — Styling with CSS"
subtitle: Colours, spacing and style classes; change CSS in the development environment and see the browser update through automatic refresh or Hot Reload
lang: en
language: en
translation_of: /taba/04-css-classes/
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 5
track: core
published: true
companion_commit: cf47e9a44b213154d234e3797e69eb05fbc4c2a3
companion_previous: 7a9346ec48cfdb1d434e910fbc6076b416cd5828
---

{: .box-note}
We will style the website with CSS: change colours and spacing, add a style class and see the result in the browser after each change.

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

<!-- lesson-back:start -->
[Previous lesson: 03 — Making the website mine]({{ '/taba/en/03-my-theme/' | relative_url }}){: data-sequence-nav="prev"} · [Next lesson: 05 — A good-looking website with Bootstrap]({{ '/taba/en/05-bootstrap/' | relative_url }}){: data-sequence-nav="next"}

On a touchscreen, swipe right for the next lesson and left for the previous lesson.
<!-- lesson-back:end -->

<!--
[קוד השלב](https://github.com/3strategy/razortaba/tree/cf47e9a44b213154d234e3797e69eb05fbc4c2a3) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/7a9346ec48cfdb1d434e910fbc6076b416cd5828...cf47e9a44b213154d234e3797e69eb05fbc4c2a3)
-->

## What we will learn

- Use a style class and identify a selector.
- Distinguish between `color`, `background` and `padding`.
- See the immediate result of a CSS change.

{: .box-note}
This is still the practice stage, before registering your year-long project. You can work in your chosen experiment or create a new one in a separate folder using the [02 — setup guides]({{ '/taba/en/02-development-environment/' | relative_url }}). If you start again, apply the earlier lesson changes needed for the examples below. Keep your previous experiments; you do not need to publish to GitHub yet.

## Open and run

Open the project folder you have been working in, save the files and run the website. Check that the previous session's change appears before trying a new change.

## A small styling experiment

Open `wwwroot/css/site.css`. Keep the template rules and append the style rules shown below. Run dotnet watch or Hot Reload. After adding them, change only `--forest`, save and observe the result. Then change padding and restore a value that looks comfortable. `class="intro"` connects an HTML area to the `.intro` rule. A CSS class is the name of a style rule; it is not a C# class. CSS variables bring the colour palette together in one place.

## Two ways to use style classes

`class="intro"` refers to the `.intro` rule we will write in `site.css`. By contrast, `class="text-center"` or `class="container"` refers to Bootstrap classes already included in the template. You can combine several names in the same `class`, separated by spaces. In the next lesson, we will use these classes to build columns and cards.

## Code changes

### `RazorTaba/Pages/Index.cshtml`

Make the following change in the existing file. The `+` and `-` signs show changes and are not part of the code:

````diff
 @model IndexModel
 @{
     ViewData["Title"] = "בית";
 }
+<section class="intro">
 <h1>החיות שלי</h1>
 <p>ברוכים הבאים לפינה שלי בטבע. נכיר חיות, נקרא עליהן ונלמד איך מטפלים בהן.</p>
 <h2>מה תמצאו כאן?</h2>
 <ul>
     <li>חיות שיש להן סיפור</li>
     <li>מדריכי טיפול קצרים</li>
     <li>המלצות שלי להיכרות מקרוב</li>
 </ul>
 <a href="https://he.wikipedia.org/wiki/שועל">לקריאה על שועלים</a>
 <img src="~/images/fox.svg" alt="איור של שועל" width="180" />
+</section>
````

### `RazorTaba/wwwroot/css/site.css`

Append the following rules to the file, after its last closing brace. Keep the template rules; the `+` signs mark new lines and are not part of the code you type:

````diff
+:root {
+    --forest: #173f35;
+    --leaf: #4d7058;
+    --paper: #f7f5ed;
+    --accent: #e6b66b;
+}
+body { font-family: Arial, sans-serif; color: var(--forest); background: var(--paper); line-height: 1.7; }
+a { color: var(--forest); text-underline-offset: .25em; }
+.intro { background: var(--forest); color: #fff; border-radius: 1.5rem; padding: 3rem; }
+.intro h1 { font-size: clamp(2rem, 6vw, 4rem); font-weight: 800; }
+.intro a { color: var(--accent); }
+footer { border-top: 1px solid #d8dfd3; margin-top: 3rem; color: var(--leaf); }
````

## Run and check

1. The background is light and the introduction area is dark.
2. Changing `--forest` changes the styling without changing HTML.
3. On a narrow screen, the heading does not overflow.

## Personal task and understanding check

Choose your own palette and change one spacing value. Explain which selector affects the heading and which affects the links. Save and check the colour change before trying another change.

{: .box-success}
After a change: save the files, check the website in the browser and explain what you changed. You can continue with this experiment or practise again in a separate project; note where you saved each experiment.

{: .box-note}
AI can help you understand an error message and troubleshoot a problem. You are responsible for writing, testing and explaining the code; do not run an agent to write the project for you.

<!-- teacher-notes:start
class_periods: 3
teacher-notes:end -->

<!-- lesson-next:start -->
---

## Next steps

- [Continue: 05 — A good-looking website with Bootstrap]({{ '/taba/en/05-bootstrap/' | relative_url }})
<!-- lesson-next:end -->
