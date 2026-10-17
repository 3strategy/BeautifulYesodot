---
layout: page
title: "08 — Connect pages and build a form"
subtitle: Navigation and HTML fields in your running Razor project; labels and a form that does not yet save data; before adding C# logic
lang: en
language: en
translation_of: /taba/08-pages-and-forms/
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 9
track: core
published: true
companion_commit: 9e759fba10f1ec17fe4b851ed53e8703d06b644b
companion_previous: fd6683d2c183607a7a808b053c0887256179d66e
---

{: .box-note}
We will add a page to the website and link to it from the menu. We will build a form with fields and labels, and check how to use it.

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

<!-- lesson-back:start -->
[Previous lesson: 07 — Space for another lesson]({{ '/taba/en/07-reserved/' | relative_url }}){: data-sequence-nav="prev"} · [Next lesson: 09 — Write content in Markdown]({{ '/taba/en/09-markdown/' | relative_url }}){: data-sequence-nav="next"}

On a touchscreen, swipe right for the next lesson and left for the previous lesson.
<!-- lesson-back:end -->

<!--
[קוד השלב](https://github.com/3strategy/razortaba/tree/9e759fba10f1ec17fe4b851ed53e8703d06b644b) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/fd6683d2c183607a7a808b053c0887256179d66e...9e759fba10f1ec17fe4b851ed53e8703d06b644b)
-->

## What we will learn

- Link the website's pages.
- Connect a `label` to a field using `for` and `id`.
- Distinguish between a styled form and saving data.

{: .box-note}
From this lesson onwards, we will gradually build the year-long project you registered in the Git lesson. Open your personal `FirstNameLastNameRazor` repository with your own details, and make sure the teacher has confirmed access. Add the new page to this website; do not create a new project for each lesson. If registration or sharing is incomplete, return to [06 — the registration checkpoint]({{ '/taba/en/06-git-github/' | relative_url }}) and complete it with the teacher.

## Start in sync

Open the correct project folder. Make sure your work from the previous session is saved both in the files and in a Commit, and that there are no pending changes in Source Control or Git Changes. Now **Pull**. If Git reports a conflict, ask the teacher; do not delete work or Force Push.

## Another page, the same website

Create `Pages/Contact.cshtml`. The `@page` line makes the page available at `/Contact`. Edit the menu once in the Layout. For now, treat `asp-page` as a page address in the project; later, we will explain how Razor creates `href`. The `type="button"` button does not submit the form. Click it and check that the page stays where it is.

## Code changes

### `RazorTaba/Pages/Contact.cshtml`

New file. Create `RazorTaba/Pages/Contact.cshtml` and paste in the following content:

````cshtml
@page
@{
    ViewData["Title"] = "נשארים בקשר";
}
<h1>נשארים בקשר</h1>
<p class="alert alert-info">זהו תרגול של טופס HTML. הפרטים עדיין אינם נשלחים או נשמרים.</p>
<form class="card p-4 col-lg-7">
    <label for="visitor" class="form-label">השם שלכם</label>
    <input id="visitor" class="form-control mb-3" required maxlength="50" />
    <label for="topic" class="form-label">על מה תרצו לקרוא?</label>
    <textarea id="topic" class="form-control mb-3" rows="4"></textarea>
    <button type="button" class="btn btn-primary">כפתור לדוגמה — עדיין לא שולח</button>
</form>
````

### `RazorTaba/Pages/Shared/_Layout.cshtml`

Make the following change in the existing file. The `+` and `-` signs show changes and are not part of the code:

````diff
                         <li class="nav-item">
                             <a class="nav-link text-dark" asp-area="" asp-page="/Privacy">Privacy</a>
                         </li>
+                        <li class="nav-item">
+                            <a class="nav-link text-dark" asp-area="" asp-page="/Contact">קשר</a>
+                        </li>
                     </ul>
                 </div>
             </div>
````

## Run and check

1. The “קשר” (“Contact”) link leads to the new page.
2. Clicking the name label moves focus to the field.
3. Clicking the button sends no information.

## Personal task and understanding check

Add a field relevant to your topic with an appropriate label. Explain why an attractive form is not proof that the data is saved.

{: .box-success}
After a meaningful change: inspect the diff, Stage, write a commit message describing your change, Commit and Push. Check in GitHub that the change arrived. At least 50 meaningful commits are required throughout the year, even if you always work on the same laptop.

{: .box-note}
AI can help you understand an error message and troubleshoot a problem. You are responsible for writing, testing and explaining the code; do not run an agent to write the project for you.

<!-- teacher-notes:start
class_periods: 2
teacher-notes:end -->

<!-- lesson-next:start -->
---

## Next steps

- [Continue: 09 — Write content in Markdown]({{ '/taba/en/09-markdown/' | relative_url }})
<!-- lesson-next:end -->
