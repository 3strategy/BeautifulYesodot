---
layout: page
title: "01 — My first page"
subtitle: HTML and CSS basics in a file you open in the browser, before creating a project
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
We will create a page with headings, paragraphs, an image, a link and a list, and style it with CSS. We will work in an ordinary HTML file and open it in the browser before creating a project in Visual Studio or VS Code.

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
- Use headings, paragraphs, a line break, a link and a list.
- Distinguish HTML content from CSS styling and change colour, size and spacing.

## HTML: describe the page content

HTML is a markup language. **Tags** identify each part of the content: a heading, a paragraph, an image or a link. For example:

```html
<p>זה האתר הראשון שלי.</p>
```

`<p>` is an opening tag, followed by the content, then the closing tag `</p>`. The slash marks the closing tag. The browser displays the content as a paragraph; it does not display the tag symbols themselves. The example text means “This is my first website”.

| Tag | What is it for? | Example |
|:---|:---|:---|
| `h1` | The page's main heading; our page will have one | `<h1>החיות שלי</h1>` |
| `h2` | A heading for a section within the page | `<h2>מה תמצאו כאן?</h2>` |
| `p` | A paragraph of text | `<p>אני אוהב ללמוד על חיות.</p>` |
| `br` | A line break within the same content | `<p>שלום!<br>נעים להכיר.</p>` |
| `img` | An image | `<img src="fox.svg" alt="איור של שועל" width="180">` |
| `a` | A link to another address | `<a href="https://he.wikipedia.org">ויקיפדיה</a>` |
| `ul` | An unordered list containing `li` items | `<ul><li>שועל</li><li>ינשוף</li></ul>` |
| `li` | One item in a list | `<li>שועל</li>` |

`h1` and `h2` represent heading levels. Choose them according to the content structure; later we can change their size with CSS. `br` and `img` have no inner content or closing tag: do not write `</br>` or `</img>`.

{: .box-note}
Pressing Enter in the source does not normally create a new displayed line in ordinary text. Use another `p` for a new paragraph and `br` for a deliberate line break within a paragraph. Use CSS for spacing between areas instead of adding a series of `br` tags.

### Attributes and nesting

An opening tag can contain **attributes** in the form `name="value"`. For an image, `src` is the file path, `alt` is alternative text describing it, and `width` is its display width in pixels. Alternative text also helps people using a screen reader. For a link, `href` is the destination; the text between `<a>` and `</a>` is what you click.

A tag can contain other tags. This is **nesting**: each `li` is inside `ul`. Close the inner tag before the outer one. Indentation helps you see the structure.

## CSS: decide how the content looks

CSS is a language for styling the page. A CSS rule selects elements and sets their style properties:

```css
p {
    color: darkgreen;
    font-size: 1.2rem;
}
```

`p` is a **selector**: this rule applies to every paragraph on the page. Inside the curly braces, write declarations as `property: value;`: a property name, a colon, a value and a semicolon. Here, `color` sets the text colour and `font-size` sets its size. `rem` is relative to the page's root font size; `1.2rem` is 1.2 times that size.

In our first page, CSS rules go inside a `style` tag in `head`. Later we will also use a separate file with the `.css` extension.

## Prepare a folder for the files

Open File Explorer in Windows or Finder in macOS. Inside **Documents**, create a folder named `first-page`. We will save `index.html` and `fox.svg` there. You do not need Git or a GitHub account yet; we will start saving versions after the Bootstrap lesson.

## 1. Create an actual HTML file

In Windows, open Notepad and save the file in `first-page` as `index.html`, using UTF-8 encoding and the All files file type. Make sure it was not saved as `index.html.txt`. In macOS, you can use VS Code as a simple text editor.

## 2. Prepare an image and open the page in the browser

Download the <a href="{{ '/assets/img/taba/fox.svg' | relative_url }}" download="fox.svg">fox illustration (fox.svg)</a> and save it in `first-page`, alongside `index.html`. Write and save the code in the next section, then double-click `index.html`. After each edit and save, refresh the browser.

## Code changes

### `first-page/index.html`

The shared example website uses Hebrew text and right-to-left (RTL) layout. Keep the example code as shown so later lessons continue from the same website. “החיות שלי” means “My animals”; the paragraph introduces animals we are curious about, and the image description says “fox illustration”.

Write the following content in the new `first-page/index.html`. If you have already opened an empty file, continue working in it:

````html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="utf-8">
    <title>החיות שלי</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: ivory;
            padding: 1rem;
        }
        h1 {
            color: darkgreen;
        }
        p {
            font-size: 1.2rem;
        }
    </style>
</head>
<body>
    <h1>החיות שלי</h1>
    <p>זה האתר הראשון שלי. כאן אכיר לכם חיות שמסקרנות אותי.</p>
    <h2>מה תמצאו כאן?</h2>
    <ul>
        <li>שועל</li>
        <li>ינשוף</li>
    </ul>
    <img src="fox.svg" alt="איור של שועל" width="180">
    <p>רוצים להכיר את השועל?<br>אפשר להמשיך לקרוא בקישור הבא.</p>
    <a href="https://he.wikipedia.org/wiki/שועל">לקריאה על שועלים</a>
</body>
</html>
````

### Read the file structure

- `<!DOCTYPE html>` tells the browser this is a modern HTML document.
- `html` wraps the page. `lang="he"` identifies its language as Hebrew, and `dir="rtl"` sets right-to-left direction.
- `head` contains information about the page: `meta charset="utf-8"` sets an encoding that supports Hebrew, `title` sets the browser tab title, and `style` contains the CSS rules.
- `body` contains the content displayed inside the browser window.

In the `body` rule, `font-family` chooses a font: Arial if available, otherwise a font from the `sans-serif` family. `background-color` sets the background colour, and `padding` adds inner space between the area's edges and its content. The `h1` rule colours the main heading; the `p` rule enlarges both paragraphs.

## Run and check

1. Open `index.html`: a green main heading, a section heading, two paragraphs, a two-item list, a fox and a link appear on a pale background.
2. Change the text inside `h1`, save and refresh. The heading text changes and its colour stays green.
3. Add a `li` item inside `ul`, save and refresh. The same list now has three items.
4. Temporarily remove `br` and join the two parts of the sentence with an ordinary space. Save and refresh: the deliberate line break disappears; in a narrow window the text may still wrap to fit. Restore `br`.
5. Change `darkgreen` to `navy` and `ivory` to `lightyellow`, save and refresh. The heading and background colours change while the text stays the same.
6. Change the paragraph size from `1.2rem` to `1.5rem`. Check that both paragraphs grow. Change `padding` from `1rem` to `2rem` and check that the space around the content grows.
7. Temporarily change the image filename in `src`, save and refresh. Explain the alternative text, then restore the correct path.
8. Click the link and check that it leads to the page about foxes. Use the browser's Back button to return to your page.

## Personal task and understanding check

Adapt the headings and paragraphs to a topic you like, add a list item and choose a heading colour. Save, refresh and explain:

1. What is the difference between `title`, `h1` and `h2`?
2. When would you use a new `p`, and when would you use `br`?
3. What is the difference between an image's `src` and a link's `href`?
4. Which part of the code changes the content, and which changes only its appearance? Why does the `p` selector affect both paragraphs?

{: .box-success}
Save both files in `first-page` and check that the page opens and the image appears. In the next lesson, you will create a Razor Pages project and run it in your development environment.

{: .box-note}
AI can help you understand an error message and troubleshoot a problem. You are responsible for writing, testing and explaining the code; do not run an agent to write the project for you.

<!-- teacher-notes:start
class_periods: 1

הפתיחה בעורך טקסט פשוט כוללת כעת גם תרגול מפורש בשמונה תגיות ובכללי CSS, לפני יצירת הפרויקט. להתאים את זמן התרגול לקבוצה.
הרחבת הוראה ממוקדת, ללא שינוי במאגר המלווה: companion_commit ההיסטורי d73b40cf58979e57680e965fcd86ad9b62590593 אינו כולל את תוספות HTML/CSS ב־first-page/index.html. התאמת checkpoint זה טרם בוצעה; אין לראות בו התאמת מקור מלאה לדוגמה המעודכנת.
teacher-notes:end -->

<!-- lesson-next:start -->
---

## Next steps

- [Continue: 02 — The development environment: run and change a website]({{ '/taba/en/02-development-environment/' | relative_url }})
<!-- lesson-next:end -->
