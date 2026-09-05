---
layout: page
title: 'סביבת הפיתוח ו־GitHub: מתחילים הרגלי עבודה'
subtitle: מריצים פרויקט Razor ב־Visual Studio או VS Code ועורכים HTML; clone, pull, בדיקת diff, stage, commit ו־push; בודקים שהשינויים הגיעו ל־GitHub
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
- Git
- GitHub
sequence: 11
track: core
class_periods: 1
published: false
git_safety: לא מעלים סודות וקובצי build; משתמשים ב־gitignore של הפרויקט; אם pull או push נכשלו פונים למורה בלי למחוק עבודה או לבצע force push
practice: מתחילים כל מפגש ב־pull, מבצעים commits משמעותיים במהלך העבודה ומסיימים ב־commit ו־push; חוזרים על השגרה בבית ובמחשב נייד אישי
companion_commit: 979d543d83d7d7c9e4f722b5400c60c4253b78a2
companion_previous: 3e83e27c126c0aa3f02f2977e8923702213ecd43
---

{: .box-note}
עוזבים את העורך הפשוט ועוברים לפרויקט שרץ בסביבת הפיתוח. עורכים כרגע HTML בלבד. השורות שמתחילות ב־@ ותשתית השרת יוסברו בהמשך.

[קוד השלב](https://github.com/3strategy/razortaba/tree/979d543d83d7d7c9e4f722b5400c60c4253b78a2) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/3e83e27c126c0aa3f02f2977e8923702213ecd43...979d543d83d7d7c9e4f722b5400c60c4253b78a2)

קישורי GitHub מפנים למאגר פרטי. המורה צריך להעניק הרשאת קריאה; אפשר ללמוד גם מהקוד המופיע כאן.

## מה נלמד

- להריץ אתר מקומי ב־Windows או ב־macOS.
- לזהות את Pages ואת wwwroot.
- לשמור שינוי משמעותי ב־Git ולהעלות אותו ל־GitHub.

## מתחילים מסונכרנים

פתחו את תיקיית הפרויקט הנכונה, בדקו שאין שינוי לא שמור והפעילו **Pull**. אם Git מציג התנגשות, פנו למורה; אל תמחקו עבודה ואל תבצעו Force Push.

## 1. סביבת העבודה

התקינו SDK של .NET 10. ב־Windows השתמשו ב־Visual Studio עם רכיב ASP.NET and web development; אפשר גם VS Code עם C# Dev Kit. ב־macOS השתמשו ב־VS Code עם C# Dev Kit. המורה מכין את ההתקנה מראש כדי שהמפגש לא יהפוך לשיעור התקנות.

צרו ASP.NET Core Web App (Razor Pages), בשם `RazorTaba`, ללא Authentication. אל תבחרו Blazor או MVC. אפשר להשתמש בפקודות להלן בשתי המערכות. אחרי יצירת הפרויקט התאימו את הקבצים המוצגים.

## 2. עובדים בשני חלונות

פתחו את תיקיית המאגר בסביבת הפיתוח. ב־Visual Studio הפעילו את פרופיל http; ב־VS Code הפעילו `dotnet watch --project RazorTaba --launch-profile http`. השאירו את הדפדפן לצד העורך. ערכו את הפסקה ב־`Pages/Index.cshtml`, שמרו ובדקו את הרענון. אם הרענון האוטומטי אינו מופעל, רענון רגיל מספיק.

## 3. Git ו־GitHub מההתחלה

צרו מאגר תלמיד ב־GitHub והעניקו למורה גישה. ב־Visual Studio השתמשו בחלון Git Changes; ב־VS Code ב־Source Control. במחשב נוסף מבצעים Clone פעם אחת ופותחים את אותה תיקייה. לפני כל מפגש: Pull. אחרי שינוי קטן שהבנתם: בדיקת diff, Stage ו־Commit עם תיאור ברור. בסיום בבית ובמעבדה: Push ובדיקה באתר GitHub.

Commit שומר מקומית; Push שולח ל־GitHub. Pull מביא שינויים מהמחשב האחר. שמירת קובץ אינה Commit, ו־Commit אינו גיבוי מרוחק. הדרישה חלה גם על מחשב נייד אישי. אם מופיעה התנגשות פונים למורה, בלי למחוק קבצים ובלי Force Push.

המאגר כולל `.gitignore`: אין להעלות bin, obj, מסדי נתונים מקומיים או סודות. אין יעד לימודי של PR, branches או merge.

### פקודות השלב

הפקודות מורצות משורש המאגר, שבו נמצאת התיקייה `RazorTaba`, בטרמינל של Visual Studio או VS Code.

```shell
dotnet new webapp -n RazorTaba -o RazorTaba -f net10.0
dotnet watch --project RazorTaba --launch-profile http
```

## השינויים בקוד

### `RazorTaba/Pages/Index.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Index.cshtml` והדביקו את התוכן הבא:

````cshtml
@page
@model IndexModel
@{
    ViewData["Title"] = "בית";
}
<h1>החיות שלי</h1>
<p>זה האתר הראשון שלי. כאן אכיר לכם חיות שמסקרנות אותי.</p>
<img src="~/images/fox.svg" alt="איור של שועל" width="180" />
````

### `RazorTaba/Pages/Shared/_Layout.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Shared/_Layout.cshtml` והדביקו את התוכן הבא:

````cshtml
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>@ViewData["Title"] — החיות שלי</title>
    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.rtl.min.css" />
    <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
</head>
<body>
    <header class="site-header">
        <nav class="container py-3 d-flex gap-3 align-items-center flex-wrap" aria-label="ניווט ראשי">
            <a class="brand" asp-page="/Index">🐾 החיות שלי</a>
            <a asp-page="/Index">בית</a>
        </nav>
    </header>
    <main class="container py-4">
        @RenderBody()
    </main>
    <footer class="container py-4">אתר של סקרנות, למידה ואכפתיות לבעלי חיים.</footer>
    <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>
````

### `RazorTaba/Program.cs`

קובץ חדש. צרו את `RazorTaba/Program.cs` והדביקו את התוכן הבא:

````csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRazorPages();

var app = builder.Build();
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
app.UseStaticFiles();
app.UseRouting();
app.MapRazorPages();
app.Run();
````

### `RazorTaba/Properties/launchSettings.json`

קובץ חדש. צרו את `RazorTaba/Properties/launchSettings.json` והדביקו את התוכן הבא:

````json
{
  "profiles": {
    "http": {
      "commandName": "Project",
      "launchBrowser": true,
      "applicationUrl": "http://localhost:5186",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "https": {
      "commandName": "Project",
      "launchBrowser": true,
      "applicationUrl": "https://localhost:7186;http://localhost:5186",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
````

<details markdown="1"><summary>קבצי תשתית וקבצים שנוצרו אוטומטית</summary>

הקבצים הבאים נמצאים בקוד השלב. קבצים שנוצרים באמצעות פקודות השלב אין להעתיק ידנית.

- [RazorTaba/Pages/Error.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Error.cshtml)
- [RazorTaba/Pages/Error.cshtml.cs](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Error.cshtml.cs)
- [RazorTaba/Pages/Index.cshtml.cs](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Index.cshtml.cs)
- [RazorTaba/Pages/Privacy.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Privacy.cshtml)
- [RazorTaba/Pages/Privacy.cshtml.cs](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Privacy.cshtml.cs)
- [RazorTaba/Pages/Shared/_Layout.cshtml.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Shared/_Layout.cshtml.css)
- [RazorTaba/Pages/Shared/_ValidationScriptsPartial.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Shared/_ValidationScriptsPartial.cshtml)
- [RazorTaba/Pages/_ViewImports.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/_ViewImports.cshtml)
- [RazorTaba/Pages/_ViewStart.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/_ViewStart.cshtml)
- [RazorTaba/RazorTaba.csproj](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/RazorTaba.csproj)
- [RazorTaba/appsettings.Development.json](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/appsettings.Development.json)
- [RazorTaba/appsettings.json](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/appsettings.json)
- [RazorTaba/wwwroot/css/site.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/css/site.css)
- [RazorTaba/wwwroot/favicon.ico](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/favicon.ico)
- [RazorTaba/wwwroot/images/fox.svg](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/images/fox.svg)
- [RazorTaba/wwwroot/js/site.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/js/site.js)
- [RazorTaba/wwwroot/lib/bootstrap/LICENSE](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/LICENSE)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.min.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.min.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.min.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.min.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.min.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.min.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.min.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.min.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.min.js.map)
- [RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/LICENSE.txt](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/LICENSE.txt)
- [RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.js)
- [RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.min.js)
- [RazorTaba/wwwroot/lib/jquery-validation/LICENSE.md](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/LICENSE.md)
- [RazorTaba/wwwroot/lib/jquery-validation/dist/additional-methods.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/dist/additional-methods.js)
- [RazorTaba/wwwroot/lib/jquery-validation/dist/additional-methods.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/dist/additional-methods.min.js)
- [RazorTaba/wwwroot/lib/jquery-validation/dist/jquery.validate.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/dist/jquery.validate.js)
- [RazorTaba/wwwroot/lib/jquery-validation/dist/jquery.validate.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/dist/jquery.validate.min.js)
- [RazorTaba/wwwroot/lib/jquery/LICENSE.txt](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/LICENSE.txt)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.js)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.min.js)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.min.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.min.map)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.js)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.min.js)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.min.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.min.map)

</details>

## מריצים ובודקים

1. האתר נפתח ב־http://localhost:5186.
2. שינוי הפסקה מופיע בדפדפן.
3. חלון diff מציג רק את השינוי שלכם.
4. לאחר Push רואים ב־GitHub את הודעת ה־commit ואת הקובץ המעודכן.

## משימה אישית ובדיקת הבנה

בצעו שינוי אישי אחד והעלו אותו. הסבירו למורה את ההבדל בין Save, Commit ו־Push. לאורך השנה נדרשים לפחות 50 commits משמעותיים; לא מפצלים שינוי חסר ערך רק כדי להגדיל מונה.

{: .box-success}
בסיום שינוי משמעותי: בדקו את ה־diff, בצעו Stage, כתבו הודעת commit שמתארת מה שיניתם, ובצעו Push. ודאו ב־GitHub שהשינוי הגיע. נדרשים לפחות 50 commits משמעותיים לאורך השנה, גם למי שעובד תמיד באותו מחשב נייד.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.
