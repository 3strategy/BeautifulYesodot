---
layout: page
title: "09 — Write content in Markdown"
subtitle: Headings, lists, links, images, tables and code fences; your own article in an md file and a preview
lang: en
language: en
translation_of: /taba/09-markdown/
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 10
track: core
published: true
companion_commit: ac696838547401ac23a50a09097079f44d97d6a6
companion_previous: 9e759fba10f1ec17fe4b851ed53e8703d06b644b
---

{: .box-note}
We will write a Markdown article with headings, lists, an image and a table. We will open a preview and see how text markers become a structured document.

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

<!-- lesson-back:start -->
[Previous lesson: 08 — Connect pages and build a form]({{ '/taba/en/08-pages-and-forms/' | relative_url }}){: data-sequence-nav="prev"} · [Next lesson: 10 — Draw with text: Mermaid]({{ '/taba/en/10-mermaid/' | relative_url }}){: data-sequence-nav="next"}

On a touchscreen, swipe right for the next lesson and left for the previous lesson.
<!-- lesson-back:end -->

<!--
[קוד השלב](https://github.com/3strategy/razortaba/tree/ac696838547401ac23a50a09097079f44d97d6a6) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/9e759fba10f1ec17fe4b851ed53e8703d06b644b...ac696838547401ac23a50a09097079f44d97d6a6)
-->

## What we will learn

- Write headings, lists, links and an image.
- Build a table and identify the source file.
- Separate the meaning of the content from the page's styling.

## Start in sync

Open the correct project folder. Make sure your work from the previous session is saved both in the files and in a Commit, and that there are no pending changes in Source Control or Git Changes. Now **Pull**. If Git reports a conflict, ask the teacher; do not delete work or Force Push.

## Write and preview

Create `Content/care.md`. In VS Code, use Open Preview to the Side; if you work in Visual Studio, you can open the Markdown file in VS Code to preview it. A link starting with `/` is relative to the website, so we will check it when the content appears on the website in lesson 11. For now, this file is not an active web page.

A main heading starts with `#` and a numbered list starts with `1.`. Spaces and blank lines separate blocks. You do not need to write a `div` around every paragraph.

## Code changes

### `RazorTaba/Content/care.md`

The shared Hebrew article is about learning before adopting an animal. Its questions ask whether we have time for daily care, what the animal needs to eat and who can help when we are away. Its table lists a safe environment and a responsible regular keeper. Keep this example or write the personal article requested below.

New file. Create `RazorTaba/Content/care.md` and paste in the following content:

````markdown
# לפני שמאמצים, לומדים

בעל חיים צריך **טיפול קבוע**, סביבה מתאימה ותשומת לב.

## שלוש שאלות חשובות

1. האם יש לנו זמן לטפל בכל יום?
2. מה החיה צריכה לאכול?
3. מי יכול לעזור לנו כשאנחנו לא בבית?

| צורך | מה בודקים? |
| ---: | ---: |
| סביבה | מקום בטוח ומתאים |
| טיפול | מטפל אחראי וקבוע |

![איור של שועל](/images/fox.svg)

[חזרה לדף הבית](/)
````

## Run and check

1. The preview contains headings, a list and a table.
2. Bold text appears without the asterisk markers.
3. The source file is readable even without a preview.

## Personal task and understanding check

Write your own article with two subheadings, a list and a link to a source. Add an image with alternative text. Explain what belongs to content and what belongs to styling.

{: .box-success}
After a meaningful change: inspect the diff, Stage, write a commit message describing your change, Commit and Push. Check in GitHub that the change arrived. At least 50 meaningful commits are required throughout the year, even if you always work on the same laptop.

{: .box-note}
AI can help you understand an error message and troubleshoot a problem. You are responsible for writing, testing and explaining the code; do not run an agent to write the project for you.

<!-- teacher-notes:start
class_periods: 1
teacher-notes:end -->

<!-- lesson-next:start -->
---

## Next steps

- [Continue: 10 — Draw with text: Mermaid]({{ '/taba/en/10-mermaid/' | relative_url }})
<!-- lesson-next:end -->
