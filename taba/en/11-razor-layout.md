---
layout: page
title: "11 — Understand Razor Pages and the shared layout"
subtitle: Explain the project structure you already use; Layout and Markdown and Mermaid display with a ready-made component; before EF or Identity
lang: en
language: en
translation_of: /taba/11-razor-layout/
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 12
track: core
published: true
companion_commit: 2307d2e1aa18db15dd9675c618ace510fe87528c
companion_previous: cb12bd589208363af709028b0a00a26769ff7a7d
---

{: .box-note}
We will get to know the website's shared layout and display our Markdown article and Mermaid diagram inside it. A change in the content file will appear on the guide page.

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

<!-- lesson-back:start -->
[Previous lesson: 10 — Draw with text: Mermaid]({{ '/taba/en/10-mermaid/' | relative_url }}){: data-sequence-nav="prev"} · [Next lesson: 12 — The first dynamic page]({{ '/taba/en/12-first-dynamic-page/' | relative_url }}){: data-sequence-nav="next"}

On a touchscreen, swipe right for the next lesson and left for the previous lesson.
<!-- lesson-back:end -->

<!--
[קוד השלב](https://github.com/3strategy/razortaba/tree/2307d2e1aa18db15dd9675c618ace510fe87528c) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/cb12bd589208363af709028b0a00a26769ff7a7d...2307d2e1aa18db15dd9675c618ace510fe87528c)
-->

## What we will learn

- Distinguish between Layout, a page body and a content file.
- Display Markdown inside the existing design.
- Understand that a dedicated component converts content to HTML, rather than pasting it without checks.

## Start in sync

Open the correct project folder. Make sure your work from the previous session is saved both in the files and in a Commit, and that there are no pending changes in Source Control or Git Changes. Now **Pull**. If Git reports a conflict, ask the teacher; do not delete work or Force Push.

## Adapt the examples to our project name

`RazorTaba` is the project name in the examples. Continue in your personal project without renaming it or creating an extra `RazorTaba` folder inside. To find the name your code uses, open `Pages/Index.cshtml.cs` and check the `namespace` line for the part before `.Pages`. For example, if it says `namespace NoaCohenRazor.Pages;`, your prefix is `NoaCohenRazor`.

In this lesson's code excerpts, replace `RazorTaba` with your prefix in every `namespace`, every `using`, the name after `@model` and the service registration in `Program.cs`. Use your own project folder in file paths too: if the editor is open directly in the folder containing `.csproj`, start with `Pages`, `Services` or `wwwroot`, without adding another project folder. Create `Services` inside the project folder if it does not exist; the `Content` folder from earlier lessons is alongside `Pages`.

## 1. Understand the layout

`_Layout.cshtml` contains the head, menu and footer. `RenderBody` is where the page body is inserted. `@page` makes a file into a page that can be requested from the server. You no longer need to copy a menu into every article.

## 2. Install the ready-made components

Mermaid is a ready-made library that draws diagrams in the browser. We will add it to the project as local files:

1. Download the <a href="{{ '/assets/downloads/taba/mermaid-11.17.2.zip' | relative_url }}" download>Mermaid files for this lesson — version 11.17.2 (ZIP)</a>.
2. Extract the ZIP file: in Windows, right-click it and choose **Extract All**; in macOS, double-click it. Inside the extracted folder, you will find a folder named `mermaid`.
3. Copy the `mermaid` folder into `wwwroot/lib` inside your project. Copy the extracted folder, not the ZIP file. Keep the licence and version files inside it too.
4. Open the folder in the editor and check that you have this structure:

```text
wwwroot/
└── lib/
    └── mermaid/
        ├── LICENSE
        ├── VERSION.txt
        └── mermaid.min.js
```

{: .box-note}
Make sure the file is exactly at `wwwroot/lib/mermaid/mermaid.min.js`, without an extra `mermaid` folder nested inside. You do not need to paste its content into the editor or edit it. `VERSION.txt` shows version `11.17.2`.

Now install the two NuGet packages using the commands below, and add the service, `Guide` page and JavaScript file following the code excerpts. The Mermaid files are ready to use; we will connect them to the shared layout below.

Markdig converts Markdown to HTML, the component sanitises it, and the browser draws Mermaid. `Html.Raw` receives only the sanitised result; do not use it on text received directly from a form. Diagrams have their own LTR direction inside the Hebrew page. A diagram error leaves its source visible with a nearby correction message.

## 3. Keep writing content

After completing the code changes below, run the website and open `/Guide`. Change `Content/care.md`, save and refresh. The article and image now appear on the website itself.

### Commands for this step

Open a terminal in Visual Studio or VS Code and move to your project folder containing its `.csproj` file. In VS Code, this is usually the folder you already opened; if you opened an outer solution folder in Visual Studio or Rider, move into the inner project folder in the terminal. Run the following commands there. They find the project file in the current folder, so they do not contain a fixed project name.

```shell
dotnet add package Markdig --version 1.3.2
dotnet add package HtmlSanitizer --version 9.2.1039
```

## Code changes

### `RazorTaba/Pages/Shared/_Layout.cshtml`

Make the following change in the existing file. The `+` and `-` signs show changes and are not part of the code:

````diff
                         <li class="nav-item">
                             <a class="nav-link text-dark" asp-area="" asp-page="/Contact">קשר</a>
                         </li>
+                        <li class="nav-item">
+                            <a class="nav-link text-dark" asp-area="" asp-page="/Guide">מדריך</a>
+                        </li>
                     </ul>
                 </div>
             </div>
 ⁞

     <script src="~/lib/jquery/dist/jquery.min.js"></script>
     <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
+    <script src="~/lib/mermaid/mermaid.min.js"></script>
+    <script src="~/js/markdown.js" defer></script>
     <script src="~/js/site.js" asp-append-version="true"></script>

     @await RenderSectionAsync("Scripts", required: false)
````

### `RazorTaba/Pages/Guide.cshtml`

New file. Create `RazorTaba/Pages/Guide.cshtml` and paste in the following content:

````cshtml
@page
@model RazorTaba.Pages.GuideModel
@{
    ViewData["Title"] = "מדריך הטיפול";
}
<article class="markdown-content card p-4 p-md-5">
    @* מציגים רק את התוצאה שעברה ניקוי ב־MarkdownRenderer. *@
    @Html.Raw(Model.ArticleHtml)
</article>
````

### `RazorTaba/Pages/Guide.cshtml.cs`

`GuideModel` loads the known file `Content/care.md` from your project. The request URL does not choose a file path on your computer. Its `OnGet` method prepares the article when the browser requests the page.

New file. Create `RazorTaba/Pages/Guide.cshtml.cs` and paste in the following content:

````csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using RazorTaba.Services;

namespace RazorTaba.Pages;

/// <summary>טוען מאמר מקובץ ידוע. כתובת הבקשה אינה בוחרת נתיב במחשב.</summary>
public class GuideModel(IWebHostEnvironment environment, MarkdownRenderer renderer) : PageModel
{
    public string ArticleHtml { get; private set; } = "";

    /// <summary>מכין את התוכן כאשר הדפדפן מבקש את הדף.</summary>
    public void OnGet()
    {
        string path = Path.Combine(environment.ContentRootPath, "Content", "care.md");
        ArticleHtml = renderer.Render(System.IO.File.ReadAllText(path));
    }
}
````

### `RazorTaba/Services/MarkdownRenderer.cs`

New file. Create `RazorTaba/Services/MarkdownRenderer.cs` and paste in the following content:

````csharp
using Ganss.Xss;
using Markdig;

namespace RazorTaba.Services;

/// <summary>ממיר תוכן Markdown ל־HTML בטוח להצגה. זוהי תשתית מוכנה לתלמידים.</summary>
public class MarkdownRenderer
{
    private readonly MarkdownPipeline pipeline = new MarkdownPipelineBuilder()
        .UsePipeTables().DisableHtml().Build();

    /// <summary>מרנדר טקסט בלבד; HTML גולמי וקישורים מסוכנים אינם מורשים.</summary>
    public string Render(string source)
    {
        var sanitizer = new HtmlSanitizer();
        sanitizer.AllowedTags.Clear();
        foreach (string tag in new[] { "p", "h1", "h2", "h3", "h4", "ul", "ol", "li",
            "strong", "em", "a", "img", "pre", "code", "blockquote", "hr", "br",
            "table", "thead", "tbody", "tr", "th", "td" })
            sanitizer.AllowedTags.Add(tag);
        sanitizer.AllowedAttributes.Clear();
        foreach (string attribute in new[] { "href", "src", "alt", "title", "class" })
            sanitizer.AllowedAttributes.Add(attribute);
        sanitizer.AllowedSchemes.Clear();
        sanitizer.AllowedSchemes.Add("https");
        sanitizer.AllowedSchemes.Add("http");
        return sanitizer.Sanitize(Markdown.ToHtml(source, pipeline));
    }
}
````

### `RazorTaba/Program.cs`

Make the following change in the existing file. The `+` and `-` signs show changes and are not part of the code:

````diff

 // Add services to the container.
 builder.Services.AddRazorPages();
+builder.Services.AddSingleton<RazorTaba.Services.MarkdownRenderer>();

 var app = builder.Build();

````

### `RazorTaba/wwwroot/js/markdown.js`

New file. Create `RazorTaba/wwwroot/js/markdown.js` and paste in the following content:

````javascript
// תשתית מוכנה: שומרים את מקור התרשים כטקסט ומציגים שגיאה מקומית במקרה הצורך.
document.addEventListener("DOMContentLoaded", async () => {
    if (!window.mermaid) return;
    mermaid.initialize({ startOnLoad: false, securityLevel: "strict", suppressErrorRendering: true });
    let diagramId = 0;
    for (const code of document.querySelectorAll("pre > code.language-mermaid")) {
        const pre = code.parentElement;
        const source = code.textContent;
        const diagram = document.createElement("div");
        diagram.className = "mermaid-diagram";
        diagram.dir = "ltr";
        try {
            // מונעים מתוכן מאמר לשנות את הגדרות הרכיב שסיפק המורה.
            if (/%%\s*\{|^\s*---/m.test(source)) throw new Error("Configuration is not allowed");
            const result = await mermaid.render(`article-diagram-${diagramId++}`, source);
            diagram.innerHTML = result.svg;
            pre.replaceWith(diagram);
        } catch {
            const note = document.createElement("p");
            note.className = "alert alert-warning diagram-error";
            note.textContent = "התרשים לא הוצג. בדקו סוגריים, חצים ותוויות במקור שלמטה.";
            pre.before(note);
        }
    }
});
````

### `RazorTaba/wwwroot/css/site.css`

Make the following change in the existing file. The `+` and `-` signs show changes and are not part of the code:

````diff
 /* הכפתור הבהיר זקוק לטקסט כהה, גם כשהוא נמצא בתוך אזור הפתיחה. */
 .intro .btn-light { color: var(--forest); }
+
+.markdown-content { max-width: 58rem; margin-inline: auto; }
+.markdown-content img { max-width: min(100%, 20rem); height: auto; border-radius: 1rem; }
+.markdown-content table { width: 100%; margin-block: 1rem; }
+.markdown-content th, .markdown-content td { padding: .6rem; border-bottom: 1px solid #d8dfd3; text-align: right; }
+pre { direction: ltr; text-align: left; background: #eef1e9; padding: 1rem; overflow: auto; }
+.mermaid-diagram { overflow-x: auto; text-align: center; margin-block: 1.5rem; }
+.mermaid-diagram svg { max-width: 100%; height: auto; }
````

### `RazorTaba/RazorTaba.csproj`

The NuGet commands have already added the two `PackageReference` lines to the file. Now we will also add a setting that copies Markdown files with the website. To get the following result after running the commands, open your project's `.csproj` file and **replace all its content** with the complete code below. Do not paste it in addition to the existing content.

````xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="HtmlSanitizer" Version="9.2.1039" />
    <PackageReference Include="Markdig" Version="1.3.2" />
  </ItemGroup>

  <ItemGroup>
    <Content Include="Content/**/*.md" CopyToOutputDirectory="PreserveNewest" CopyToPublishDirectory="PreserveNewest" />
  </ItemGroup>
</Project>
````

{: .box-success}
Check that the file contains two `ItemGroup` sections: the first contains both packages, and the second contains the `Content` line. Make sure both sections are inside `Project`, each section closes with `</ItemGroup>`, and `</Project>` appears at the end. Save the file and run the project.

<!--
<details open markdown="1"><summary>קבצים חדשים שנוספו או נוצרו בשלב</summary>

אלה הקבצים החדשים שנוספו או נוצרו בשלב הזה. קובצי מיגרציה או תשתית שנוצרים בפקודה אין להעתיק ידנית.

- [RazorTaba/wwwroot/lib/mermaid/LICENSE](https://github.com/3strategy/razortaba/blob/2307d2e1aa18db15dd9675c618ace510fe87528c/RazorTaba/wwwroot/lib/mermaid/LICENSE)
- [RazorTaba/wwwroot/lib/mermaid/VERSION.txt](https://github.com/3strategy/razortaba/blob/2307d2e1aa18db15dd9675c618ace510fe87528c/RazorTaba/wwwroot/lib/mermaid/VERSION.txt)
- [RazorTaba/wwwroot/lib/mermaid/mermaid.min.js](https://github.com/3strategy/razortaba/blob/2307d2e1aa18db15dd9675c618ace510fe87528c/RazorTaba/wwwroot/lib/mermaid/mermaid.min.js)

</details>
-->

## Run and check

1. The article appears at `/Guide` inside the shared menu.
2. The diagram appears as SVG rather than a code fence.
3. Break an arrow in the diagram: the article stays visible and a correction message appears. Restore the valid source.
4. Check at phone width and make sure the table and diagram do not break the page layout.

## Personal task and understanding check

Display your personal article on the website. Explain to the teacher where you edit content, where you edit styles and where the components connecting them are.

{: .box-success}
After a meaningful change: inspect the diff, Stage, write a commit message describing your change, Commit and Push. Check in GitHub that the change arrived. At least 50 meaningful commits are required throughout the year, even if you always work on the same laptop.

{: .box-note}
AI can help you understand an error message and troubleshoot a problem. You are responsible for writing, testing and explaining the code; do not run an agent to write the project for you.

<!-- teacher-notes:start
class_periods: 3

רכיבי Markdown/Mermaid מסופקים כתשתית. אין צורך ללמד כתיבת parser או JavaScript אסינכרוני בשלב זה.
teacher-notes:end -->

<!-- lesson-next:start -->
---

## Next steps

- [Continue: 12 — The first dynamic page]({{ '/taba/en/12-first-dynamic-page/' | relative_url }})
<!-- lesson-next:end -->
