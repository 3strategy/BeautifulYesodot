---
layout: page
title: "05 — A good-looking website with Bootstrap"
subtitle: Cards, a grid and mobile layout; a working starting point even if your personal styling is not finished
lang: en
language: en
translation_of: /taba/05-bootstrap/
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 6
track: core
published: true
companion_commit: e0870b94577d330d3609d697d4a16c8c19c754ab
companion_previous: c80e5ea647000b07646c97f41b4ab091327319f8
---

{: .box-note}
We will build an introduction area and cards with Bootstrap. We will arrange the content in columns and check that the website is easy to read on a phone too.

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

<!-- lesson-back:start -->
[Previous lesson: 04 — Styling with CSS]({{ '/taba/en/04-css-classes/' | relative_url }}){: data-sequence-nav="prev"} · [Next lesson: 06 — Save versions with Git and publish to GitHub]({{ '/taba/en/06-git-github/' | relative_url }}){: data-sequence-nav="next"}

On a touchscreen, swipe right for the next lesson and left for the previous lesson.
<!-- lesson-back:end -->

<!--
[קוד השלב](https://github.com/3strategy/razortaba/tree/e0870b94577d330d3609d697d4a16c8c19c754ab) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/c80e5ea647000b07646c97f41b4ab091327319f8...e0870b94577d330d3609d697d4a16c8c19c754ab)
-->

## What we will learn

- Use `container`, `row` and `col`.
- Assemble a card and a button.
- Combine Bootstrap classes with your own CSS.

{: .box-note}
This is still the practice stage, before registering your year-long project. You can work in your chosen experiment or create a new one in a separate folder using the [02 — setup guides]({{ '/taba/en/02-development-environment/' | relative_url }}). If you start again, apply the earlier lesson changes needed for the examples below. Keep your previous experiments; you do not need to publish to GitHub yet.

## Open and run

Open the project folder you have been working in, save the files and run the website. Check that the previous session's change appears before trying a new change.

## Build in three areas

The introduction area uses two columns on a large screen. The card area uses three columns from `md` upwards; on a narrow screen, the cards stack. `g-4` sets the gaps and `h-100` equalises height. Choose one Bootstrap class at a time and change it to see what it does. Bootstrap files already came with the Razor Pages template and are in `wwwroot/lib/bootstrap`; do not add or edit a library. The template loads them before `wwwroot/css/site.css`, so we will append our customisations to `site.css`. The top menu also remains the template's menu.

## Code changes

### `RazorTaba/Pages/Index.cshtml`

Make the following change in the existing file. The `+` and `-` signs show changes and are not part of the code:

````diff
 @model IndexModel
 @{
     ViewData["Title"] = "בית";
 }
-<section class="intro">
-<h1>החיות שלי</h1>
-<p>ברוכים הבאים לפינה שלי בטבע. נכיר חיות, נקרא עליהן ונלמד איך מטפלים בהן.</p>
-<h2>מה תמצאו כאן?</h2>
-<ul>
-    <li>חיות שיש להן סיפור</li>
-    <li>מדריכי טיפול קצרים</li>
-    <li>המלצות שלי להיכרות מקרוב</li>
-</ul>
-<a href="https://he.wikipedia.org/wiki/שועל">לקריאה על שועלים</a>
-<img src="~/images/fox.svg" alt="איור של שועל" width="180" />
+<section class="intro row g-4 align-items-center mx-0">
+    <div class="col-lg-8">
+        <p class="eyebrow">הפינה שלי בטבע</p>
+        <h1>לכל חיה יש סיפור.<br />בואו להכיר.</h1>
+        <p class="lead">מגלים, מתעדים ולומדים לטפל. אתר קטן עם מקום גדול לסקרנות.</p>
+        <a class="btn btn-light btn-lg" href="#meet">מכירים את החיות ↓</a>
+    </div>
+    <div class="col-lg-4 text-center">
+        <img class="hero-image" src="~/images/fox.svg" alt="איור שועל כתום" />
+    </div>
+</section>
+<section id="meet" class="py-5">
+    <p class="eyebrow">נפגשים מקרוב</p>
+    <h2 class="mb-4">שלוש חיות, שלושה סיפורים</h2>
+    <div class="row g-4">
+        <div class="col-md-4"><article class="card h-100"><div class="animal-art" aria-hidden="true">🦊</div><div class="card-body"><h3>נורי השועל</h3><p>סקרן, זריז ותמיד מוכן לגלות משהו חדש.</p></div></article></div>
+        <div class="col-md-4"><article class="card h-100"><div class="animal-art mint" aria-hidden="true">🐢</div><div class="card-body"><h3>תום הצב</h3><p>לא ממהר לשום מקום. יש הרבה מה ללמוד ממנו.</p></div></article></div>
+        <div class="col-md-4"><article class="card h-100"><div class="animal-art lilac" aria-hidden="true">🦉</div><div class="card-body"><h3>לונה הינשופה</h3><p>כשהשמש יורדת, הסיפור שלה רק מתחיל.</p></div></article></div>
+    </div>
 </section>
````

### `RazorTaba/wwwroot/css/site.css`

Make the following change in the existing file. The `+` and `-` signs show changes and are not part of the code:

````diff
 .intro { background: var(--forest); color: #fff; border-radius: 1.5rem; padding: 3rem; }
 .intro h1 { font-size: clamp(2rem, 6vw, 4rem); font-weight: 800; }
 .intro a { color: var(--accent); }
 footer { border-top: 1px solid #d8dfd3; margin-top: 3rem; color: var(--leaf); }
+
+.eyebrow { letter-spacing: .08em; font-weight: 700; font-size: .9rem; }
+.hero-image { width: min(100%, 17rem); transform: rotate(-5deg); border-radius: 2rem; }
+.card { border: 1px solid #d8dfd3; border-radius: 1.25rem; overflow: hidden; box-shadow: 0 .4rem 1.5rem #173f3508; }
+.animal-art { background: #fae5d3; font-size: 5rem; text-align: center; padding: 1.5rem; }
+.mint { background: #e1e9d9; }
+.lilac { background: #ebe3ee; }
+.btn { border-radius: .75rem; }
+.btn-primary { background: var(--forest); border-color: var(--forest); }
+.btn-primary:hover { background: var(--leaf); border-color: var(--leaf); }
````

## Run and check

1. On a wide screen, you see three cards in a row.
2. At phone width, the cards stack without horizontal scrolling.
3. The button scrolls to the animal area.

## Personal task and understanding check

Adapt three cards to your topic. Change the content first, then the colours. Check that the cards stay readable even when their text lengths differ.

{: .box-success}
After a change: save the files, check the website in the browser and explain what you changed. You can continue with this experiment or practise again in a separate project; note where you saved each experiment.

{: .box-note}
AI can help you understand an error message and troubleshoot a problem. You are responsible for writing, testing and explaining the code; do not run an agent to write the project for you.

## Check the button's contrast

Check the text colour on the light button labelled “מכירים את החיות” (“Meet the animals”). The `.intro a` rule also applies to it and gives the text the accent colour. To get dark text on the light background, open `wwwroot/css/site.css` and append the comment and targeted rule shown here, after `.btn-primary:hover`. Leave the existing rules in place.

<!--
[השינוי בקוד](https://github.com/3strategy/razortaba/commit/e0870b94577d330d3609d697d4a16c8c19c754ab)
-->

````diff
 .btn { border-radius: .75rem; }
 .btn-primary { background: var(--forest); border-color: var(--forest); }
 .btn-primary:hover { background: var(--leaf); border-color: var(--leaf); }
+
+/* הכפתור הבהיר זקוק לטקסט כהה, גם כשהוא נמצא בתוך אזור הפתיחה. */
+.intro .btn-light { color: var(--forest); }
````

{: .box-success}
Save and refresh the page. Make sure the light button's text is dark and readable and clicking it still scrolls to the cards. The new rule applies only to a button with the `btn-light` class inside an area with the `intro` class.

<!-- teacher-notes:start
class_periods: 3
teacher-notes:end -->

{: .box-note}
In the next lesson, we will choose a working website from our experiments and register it as our year-long project. Prepare your chosen website folder, check that it runs and that you can identify its content and style files. Until registration, you can still experiment and start again; afterwards, we will open the same project and keep its progress history.

<!-- lesson-next:start -->
---

## Next steps

- [Continue: 06 — Save versions with Git and publish to GitHub]({{ '/taba/en/06-git-github/' | relative_url }})
<!-- lesson-next:end -->
