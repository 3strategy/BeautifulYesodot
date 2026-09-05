---
layout: page
title: מבינים את Razor Pages ואת התבנית המשותפת
subtitle: מסבירים את מבנה הפרויקט שבו כבר עובדים; Layout ותצוגת Markdown ו־Mermaid באמצעות רכיב מוכן; ללא EF או Identity
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 60
track: core
class_periods: 3
published: false
companion_commit: 8e87c04f22eb9ca9c58fe82b5cb5ac28c3da5882
companion_previous: afab7e81ccfeaf1905b522f7ac03dc134aebf8e1
---

{: .box-note}
הפרויקט שבו עבדנו מההתחלה הוא Razor Pages. כעת מבינים את התבנית המשותפת ומחברים אליה את המאמר והתרשים שכבר כתבנו.

[קוד השלב](https://github.com/3strategy/razortaba/tree/8e87c04f22eb9ca9c58fe82b5cb5ac28c3da5882) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/afab7e81ccfeaf1905b522f7ac03dc134aebf8e1...8e87c04f22eb9ca9c58fe82b5cb5ac28c3da5882)

קישורי GitHub מפנים למאגר פרטי. המורה צריך להעניק הרשאת קריאה; אפשר ללמוד גם מהקוד המופיע כאן.

## מה נלמד

- להבחין בין Layout, גוף דף וקובץ תוכן.
- להציג Markdown בתוך העיצוב הקיים.
- להבין שהמרת תוכן ל־HTML נעשית ברכיב ייעודי ולא בהדבקה לא מבוקרת.

## מתחילים מסונכרנים

פתחו את תיקיית הפרויקט הנכונה, בדקו שאין שינוי לא שמור והפעילו **Pull**. אם Git מציג התנגשות, פנו למורה; אל תמחקו עבודה ואל תבצעו Force Push.

## 1. מבינים את התבנית

`_Layout.cshtml` מכיל את הראש, התפריט והכותרת התחתונה. `RenderBody` הוא המקום שבו נכנס גוף הדף. `@page` הופך קובץ לדף שניתן לבקש מהשרת. כעת לא צריך להעתיק תפריט לכל מאמר.

## 2. מתקינים תשתית מוכנה

המורה מספק את תיקיית `wwwroot/lib/mermaid` מהקוד המצורף, כולל הרישיון; אין צורך להעתיק ספרייה מתוך גדר קוד. התקינו את שתי חבילות NuGet. הוסיפו את השירות, דף Guide וקובץ JavaScript כמתואר. מותר להעתיק את התשתית הזו: יעד הלמידה כאן הוא חיבור התוכן לתצוגה, לא כתיבת parser או JavaScript אסינכרוני.

Markdig ממיר Markdown ל־HTML, הרכיב מנקה אותו, והדפדפן מצייר את Mermaid. `Html.Raw` מקבל רק את התוצאה הנקייה; אין להפעיל אותו על טקסט שהגיע ישירות מטופס. התרשימים מקבלים כיוון LTR משלהם בתוך הדף העברי. תקלה בתרשים משאירה את המקור והודעת תיקון מקומית.

## 3. ממשיכים לכתוב תוכן

פתחו `/Guide`. שנו את `Content/care.md`, שמרו ורעננו. כעת המאמר והתמונה מוצגים באתר עצמו. אין צורך ללמוד C# לעומק כדי לערוך את המאמר.

### פקודות השלב

הפקודות מורצות משורש המאגר, שבו נמצאת התיקייה `RazorTaba`, בטרמינל של Visual Studio או VS Code.

```shell
dotnet add RazorTaba package Markdig --version 1.3.2
dotnet add RazorTaba package HtmlSanitizer --version 9.2.1039
```

## השינויים בקוד

### `RazorTaba/Pages/Shared/_Layout.cshtml`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Shared/_Layout.cshtml
+++ b/RazorTaba/Pages/Shared/_Layout.cshtml
@@ -12,14 +12,17 @@
         <nav class="container py-3 d-flex gap-3 align-items-center flex-wrap" aria-label="ניווט ראשי">
             <a class="brand" asp-page="/Index">🐾 החיות שלי</a>
             <a asp-page="/Index">בית</a>
             <a asp-page="/Contact">קשר</a>
+            <a asp-page="/Guide">מדריך</a>
         </nav>
     </header>
     <main class="container py-4">
         @RenderBody()
     </main>
     <footer class="container py-4">אתר של סקרנות, למידה ואכפתיות לבעלי חיים.</footer>
     <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
+    <script src="~/lib/mermaid/mermaid.min.js"></script>
+    <script src="~/js/markdown.js" defer></script>
     @await RenderSectionAsync("Scripts", required: false)
 </body>
 </html>
````

### `RazorTaba/Pages/Guide.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Guide.cshtml` והדביקו את התוכן הבא:

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

קובץ חדש. צרו את `RazorTaba/Pages/Guide.cshtml.cs` והדביקו את התוכן הבא:

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

קובץ חדש. צרו את `RazorTaba/Services/MarkdownRenderer.cs` והדביקו את התוכן הבא:

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

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Program.cs
+++ b/RazorTaba/Program.cs
@@ -1,6 +1,7 @@
 var builder = WebApplication.CreateBuilder(args);
 builder.Services.AddRazorPages();
+builder.Services.AddSingleton<RazorTaba.Services.MarkdownRenderer>();

 var app = builder.Build();
 if (!app.Environment.IsDevelopment())
 {
````

### `RazorTaba/wwwroot/js/markdown.js`

קובץ חדש. צרו את `RazorTaba/wwwroot/js/markdown.js` והדביקו את התוכן הבא:

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

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/wwwroot/css/site.css
+++ b/RazorTaba/wwwroot/css/site.css
@@ -21,4 +21,12 @@ footer { border-top: 1px solid #d8dfd3; margin-top: 3rem; color: var(--leaf); }
 .lilac { background: #ebe3ee; }
 .btn { border-radius: .75rem; }
 .btn-primary { background: var(--forest); border-color: var(--forest); }
 .btn-primary:hover { background: var(--leaf); border-color: var(--leaf); }
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

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/RazorTaba.csproj
+++ b/RazorTaba/RazorTaba.csproj
@@ -1,9 +1,17 @@
-<Project Sdk="Microsoft.NET.Sdk.Web">
-
-  <PropertyGroup>
-    <TargetFramework>net10.0</TargetFramework>
-    <Nullable>enable</Nullable>
-    <ImplicitUsings>enable</ImplicitUsings>
-  </PropertyGroup>
-
-</Project>
+<Project Sdk="Microsoft.NET.Sdk.Web">
+
+  <PropertyGroup>
+    <TargetFramework>net10.0</TargetFramework>
+    <Nullable>enable</Nullable>
+    <ImplicitUsings>enable</ImplicitUsings>
+  </PropertyGroup>
+
+  <ItemGroup>
+    <PackageReference Include="HtmlSanitizer" Version="9.2.1039" />
+    <PackageReference Include="Markdig" Version="1.3.2" />
+  </ItemGroup>
+
+  <ItemGroup>
+    <Content Include="Content/**/*.md" CopyToOutputDirectory="PreserveNewest" CopyToPublishDirectory="PreserveNewest" />
+  </ItemGroup>
+</Project>
````

<details markdown="1"><summary>קבצי תשתית וקבצים שנוצרו אוטומטית</summary>

הקבצים הבאים נמצאים בקוד השלב. קבצים שנוצרים באמצעות פקודות השלב אין להעתיק ידנית.

- [RazorTaba/wwwroot/lib/mermaid/LICENSE](https://github.com/3strategy/razortaba/blob/8e87c04f22eb9ca9c58fe82b5cb5ac28c3da5882/RazorTaba/wwwroot/lib/mermaid/LICENSE)
- [RazorTaba/wwwroot/lib/mermaid/VERSION.txt](https://github.com/3strategy/razortaba/blob/8e87c04f22eb9ca9c58fe82b5cb5ac28c3da5882/RazorTaba/wwwroot/lib/mermaid/VERSION.txt)
- [RazorTaba/wwwroot/lib/mermaid/mermaid.min.js](https://github.com/3strategy/razortaba/blob/8e87c04f22eb9ca9c58fe82b5cb5ac28c3da5882/RazorTaba/wwwroot/lib/mermaid/mermaid.min.js)

</details>

## מריצים ובודקים

1. המאמר מוצג ב־/Guide בתוך התפריט המשותף.
2. התרשים מוצג כ־SVG ולא כגדר קוד.
3. שברו חץ בתרשים: המאמר נשאר מוצג ומתקבלת הודעת תיקון. החזירו את המקור התקין.
4. בדקו ברוחב טלפון וודאו שהטבלה והתרשים אינם שוברים את פריסת הדף.

## משימה אישית ובדיקת הבנה

הציגו באתר את המאמר האישי שלכם. הסבירו למורה היכן עורכים תוכן, היכן עיצוב, והיכן נמצאת התשתית שמחברת ביניהם.

{: .box-success}
בסיום שינוי משמעותי: בדקו את ה־diff, בצעו Stage, כתבו הודעת commit שמתארת מה שיניתם, ובצעו Push. ודאו ב־GitHub שהשינוי הגיע. נדרשים לפחות 50 commits משמעותיים לאורך השנה, גם למי שעובד תמיד באותו מחשב נייד.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.
