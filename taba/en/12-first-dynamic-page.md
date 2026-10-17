---
layout: page
title: "12 — The first dynamic page"
subtitle: Display data with conditions and loops in Razor
lang: en
language: en
translation_of: /taba/12-first-dynamic-page/
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 13
track: core
published: true
companion_commit: 98ed9acb039c2d584629f2f45eeb1b0660e931f2
companion_previous: 2307d2e1aa18db15dd9675c618ace510fe87528c
---

{: .box-note}
We will display text and a list of names supplied by C#. We will use a condition to handle an empty list and a loop to create one row for each name.

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

<!-- lesson-back:start -->
[Previous lesson: 11 — Understand Razor Pages and the shared layout]({{ '/taba/en/11-razor-layout/' | relative_url }}){: data-sequence-nav="prev"} · [Next lesson: 13 — From an HTML card to an Animal object (Hebrew)]({{ '/taba/13-animal-model/' | relative_url }}){: data-sequence-nav="next"}

On a touchscreen, swipe right for the next lesson and left for the previous lesson.
<!-- lesson-back:end -->

<!--
[קוד השלב](https://github.com/3strategy/razortaba/tree/98ed9acb039c2d584629f2f45eeb1b0660e931f2) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/2307d2e1aa18db15dd9675c618ace510fe87528c...98ed9acb039c2d584629f2f45eeb1b0660e931f2)
-->

## What we will learn

- Display a value through `Model`.
- Combine `if` and `foreach` in Razor.
- Distinguish between data in memory and saved data.

## Start in sync

Open the correct project folder. Make sure your work from the previous session is saved both in the files and in a Commit, and that there are no pending changes in Source Control or Git Changes. Now **Pull**. If Git reports a conflict, ask the teacher; do not delete work or Force Push.

{: .box-note}
`RazorTaba` is an example name in this lesson too. Use your own project folder, and replace this prefix in `namespace` and the name after `@model` with the prefix before `.Pages` in your existing `Pages/Index.cshtml.cs`. Do not create a new project or an extra `RazorTaba` folder.

## Connect knowledge we already have

`OnGet` runs when the browser requests the page. It prepares `Greeting` and a list of names. `List<string>` is a collection of strings, and `foreach` goes through the strings one by one. Follow one name: find it in the C# list and in the row generated on the page.

This example uses no database. Every GET request runs `OnGet` again and recreates the list from the names written in the code; it does not save changes made by a visitor.

## Code changes

### `RazorTaba/Pages/Discover.cshtml`

New file. Create `RazorTaba/Pages/Discover.cshtml` and paste in the following content:

````cshtml
@page
@model RazorTaba.Pages.DiscoverModel
@{
    ViewData["Title"] = "מגלים";
}
<h1>@Model.Greeting</h1>
@if (Model.Names.Count == 0)
{
    <p>עדיין אין חיות ברשימה.</p>
}
else
{
    <ul class="list-group">
    @foreach (string name in Model.Names)
    {
        <li class="list-group-item">@name</li>
    }
    </ul>
}
````

### `RazorTaba/Pages/Discover.cshtml.cs`

New file. Create `RazorTaba/Pages/Discover.cshtml.cs` and paste in the following content:

````csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RazorTaba.Pages;

/// <summary>דוגמה ראשונה להעברת נתונים מ־C# לדף; אין כאן מסד נתונים.</summary>
public class DiscoverModel : PageModel
{
    public string Greeting { get; private set; } = "";
    public List<string> Names { get; private set; } = new();

    /// <summary>מכין נתונים לכל בקשת GET.</summary>
    public void OnGet()
    {
        Greeting = "יש לנו חברים חדשים להכיר";
        Names = new List<string> { "נורי", "תום", "לונה" };
    }
}
````

### `RazorTaba/Pages/Shared/_Layout.cshtml`

Make the following change in the existing file. The `+` and `-` signs show changes and are not part of the code:

````diff
                         <li class="nav-item">
                             <a class="nav-link text-dark" asp-area="" asp-page="/Guide">מדריך</a>
                         </li>
+                        <li class="nav-item">
+                            <a class="nav-link text-dark" asp-area="" asp-page="/Discover">מגלים</a>
+                        </li>
                     </ul>
                 </div>
             </div>
````

## Run and check

1. The three names appear at `/Discover`.
2. Add a name to the list: another row appears without copying `li`.
3. Temporarily empty the list and see the empty-state message. Restore the data.

## Personal task and understanding check

Add a name and explain how many times the loop body runs. Explain why changing this list is not a form for saving information.

{: .box-success}
After a meaningful change: inspect the diff, Stage, write a commit message describing your change, Commit and Push. Check in GitHub that the change arrived. At least 50 meaningful commits are required throughout the year, even if you always work on the same laptop.

{: .box-note}
AI can help you understand an error message and troubleshoot a problem. You are responsible for writing, testing and explaining the code; do not run an agent to write the project for you.

<!-- teacher-notes:start
class_periods: 3

לתזמן לאחר תנאים ולולאות ב־C#. PageModel ותשתית האתחול מסופקים בדוגמה.
teacher-notes:end -->

<!-- lesson-next:start -->
---

## Next steps

- [Continue: 13 — From an HTML card to an Animal object (Hebrew)]({{ '/taba/13-animal-model/' | relative_url }})
<!-- lesson-next:end -->
