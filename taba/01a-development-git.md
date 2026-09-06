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
published: true
git_safety: לא מעלים סודות וקובצי build; משתמשים ב־gitignore של הפרויקט; אם pull או push נכשלו פונים למורה בלי למחוק עבודה או לבצע force push
practice: מתחילים כל מפגש ב־pull, מבצעים commits משמעותיים במהלך העבודה ומסיימים ב־commit ו־push; חוזרים על השגרה בבית ובמחשב נייד אישי
companion_commit: 979d543d83d7d7c9e4f722b5400c60c4253b78a2
companion_previous: 3e83e27c126c0aa3f02f2977e8923702213ecd43
---

{: .box-note}
נריץ את האתר ב־Visual Studio או ב־VS Code, נשנה את התוכן ונראה את התוצאה בדפדפן. נשמור את השינוי ב־Git ונעלה אותו ל־GitHub.

<!-- lesson-back:start -->
[חזרה: הדף הראשון שלי]({{ '/taba/01-first-page/' | relative_url }})
<!-- lesson-back:end -->

[קוד השלב](https://github.com/3strategy/razortaba/tree/979d543d83d7d7c9e4f722b5400c60c4253b78a2) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/3e83e27c126c0aa3f02f2977e8923702213ecd43...979d543d83d7d7c9e4f722b5400c60c4253b78a2)

אם קישור הקוד אינו נפתח, בקשו גישה למאגר.

## מה נלמד

- להריץ אתר מקומי ב־Windows או ב־macOS.
- לזהות את Pages ואת wwwroot.
- לשמור שינוי משמעותי ב־Git ולהעלות אותו ל־GitHub.

## מתחילים כאן: יוצרים פרויקט ומאגר בפעם הראשונה

עד עכשיו יצרתם קובץ HTML שפתחתם בדפדפן. כעת ניצור פרויקט Razor Pages בסביבת הפיתוח שנבחר. ב־Visual Studio חלונות יצירת הפרויקט ייצרו עבורנו גם את התיקיות, בשם אישי שנבחר. אחר כך נשמור אותו במאגר פרטי ב־GitHub. **אין צורך בתיקיית פרויקט או במאגר מוכנים, ולא מבצעים Pull לפני ההקמה.**

בחרו את סביבת הפיתוח שלכם ובצעו **אחד** משני המדריכים עד סופו:

<div class="two-columns">
<div markdown="1" class="column box-note">

### VS Code — Windows או macOS

[יוצרים תיקייה ופרויקט ב־VS Code ומפרסמים מאגר פרטי]({{ '/taba/01a-setup-vscode/' | relative_url }})

נפתח תיקייה ריקה, ניצור את קובצי האתר בטרמינל, נריץ אותו ונשמור דרך Source Control.

</div>
<div markdown="1" class="column box-note">

### Visual Studio — Windows

[יוצרים פרויקט ב־Visual Studio ומפרסמים מאגר פרטי]({{ '/taba/01a-setup-visual-studio/' | relative_url }})

נבחר תבנית Razor Pages, נגדיר היכן יישמר הפתרון, נריץ אותו ונשתמש ב־Create Git Repository.

</div>
</div>

{: .box-success}
חזרו לכאן כשיש לכם אתר פועל, מאגר שמסומן **Private** ב־GitHub, Commit ראשון והזמנה למורה. אם כבר השלמתם את ההקמה, המשיכו כאן עם הפרויקט הקיים.

## ממשיכים עם הפרויקט שיצרנו
{: #after-setup}

### 1. פותחים את העבודה הקיימת

ב־VS Code פתחו את התיקייה `MyAnimals` באמצעות **File → Open Folder**. ב־Visual Studio פתחו את קובץ הפתרון בשם שבחרתם, למשל `GuysRazor.slnx` או `GuysRazor.sln`, מתוך תיקיית הפתרון שלכם. אל תפעילו שוב את פקודת יצירת הפרויקט.

במפגשים הבאים, אחרי שכבר יש מאגר מחובר ל־GitHub: ודאו שהעבודה הקודמת שמורה ב־Commit ובצעו **Pull** כדי לקבל את הגרסה האחרונה. ב־VS Code הפעולה נמצאת ב־**Source Control → … → Pull**; ב־Visual Studio ב־**Git → Pull**. אם מופיעה התנגשות, פנו למורה בלי למחוק עבודה ובלי Force Push.

### 2. עורכים את האתר שלנו

השאירו את הדפדפן לצד העורך. ב־Visual Studio הפעילו את פרופיל **http**. ב־VS Code פתחו **Terminal → New Terminal** מתוך `MyAnimals` והריצו:

```shell
dotnet watch --project RazorTaba --launch-profile http
```

בקטע הבא נתאים את דף הבית ואת התבנית המשותפת לעברית. בדוגמאות כאן `RazorTaba` הוא שם תיקיית הפרויקט הפנימית. אם בחרתם שם אישי ב־Visual Studio, החליפו את החלק הזה בשם שלכם: למשל `GuysRazor/Pages/Index.cshtml`. הנתיב מתחיל מתיקיית הפתרון החיצונית. הקבצים כבר נוצרו בהקמה; כעת עורכים אותם.

צרו בתוך `RazorTaba/wwwroot` תיקייה בשם `images` והעתיקו אליה את `fox.svg` ששמרתם בתיקיית `first-page` בשיעור הקודם. כך התמונה שבדף הבית תימצא בנתיב `RazorTaba/wwwroot/images/fox.svg`.

### 3. מבינים מה נשמר והיכן

| פעולה | מה היא עושה |
| :--- | ---: |
| Save | שומרת את הקובץ בדיסק במחשב |
| Diff | מציג את ההבדל בין הגרסה השמורה ב־Git לשינוי שעשיתם |
| Stage | בוחרת אילו שינויים ייכללו בגרסה הבאה |
| Commit | שומרת גרסה בהיסטוריה המקומית של Git |
| Push | שולחת את הגרסאות המקומיות ל־GitHub |
| Pull | מקבלת עדכונים מהמאגר ב־GitHub |

בצעו את שינויי הקוד שבהמשך, הריצו ובדקו אותם, ואז שמרו גרסה נוספת לפי ההנחיות בסוף הדף.

<details markdown="1"><summary>עוברים למחשב נוסף? מבצעים Clone פעם אחת</summary>

אחרי שהעליתם את העבודה מהמחשב הראשון, התחברו לאותו חשבון GitHub במחשב הנוסף. **Clone** מוריד את המאגר ואת ההיסטוריה שלו לתיקייה מקומית; אין ליצור שם פרויקט חדש.

- ב־VS Code: בחרו **View → Command Palette → Git: Clone**, הדביקו את כתובת המאגר הפרטי שלכם, בחרו תיקיית אב כגון `WebProjects`, ואז פתחו את התיקייה שנוצרה.
- ב־Visual Studio: במסך הפתיחה בחרו **Clone a repository**, הדביקו את הכתובת, בחרו מקום לשמירה ולחצו **Clone**. פתחו את קובץ הפתרון שבמאגר.

התקינו גם במחשב הזה את כלי הפיתוח מהמסלול שלכם. לאחר מכן, בכל מפגש פותחים את אותו עותק ומבצעים Pull; אין צורך ב־Clone נוסף.

</details>

## השינויים בקוד

### `RazorTaba/Pages/Index.cshtml`

פתחו את `RazorTaba/Pages/Index.cshtml` הקיים והחליפו את תוכנו בתוכן הבא:

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

פתחו את `RazorTaba/Pages/Shared/_Layout.cshtml` הקיים והחליפו את תוכנו בתוכן הבא:

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

פתחו את `RazorTaba/Program.cs` הקיים והחליפו את תוכנו בתוכן הבא:

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

פתחו את `RazorTaba/Properties/launchSettings.json` הקיים והחליפו את תוכנו בתוכן הבא:

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

## שומרים את השינוי השני ומעלים אותו

1. שמרו את הקבצים ובדקו את האתר בדפדפן.
2. ב־VS Code פתחו **Source Control**, לחצו על כל קובץ שהשתנה ובדקו את ה־Diff. לחצו על **+** ליד הקבצים שבדקתם, כתבו הודעה כגון `Customize Hebrew home page` ולחצו **Commit**. בתפריט **…** בחרו **Push**.
3. ב־Visual Studio פתחו **View → Git Changes**, לחצו פעמיים על כל קובץ לבדיקת ההבדלים, ובצעו **Stage** באמצעות **+**. כתבו הודעה, בחרו **Commit Staged** ואז **Push**.
4. השתמשו בצעדים של העורך שלכם בלבד. פתחו את המאגר ב־GitHub וודאו שההודעה החדשה והקבצים המעודכנים מופיעים, ושהמאגר עדיין **Private**.

## משימה אישית ובדיקת הבנה

בצעו שינוי אישי אחד והעלו אותו. הסבירו למורה את ההבדל בין Save, Commit ו־Push. לאורך השנה נדרשים לפחות 50 commits משמעותיים; לא מפצלים שינוי חסר ערך רק כדי להגדיל מונה.

{: .box-success}
בסיום שינוי משמעותי: בדקו את ה־diff, בצעו Stage, כתבו הודעת commit שמתארת מה שיניתם, ובצעו Push. ודאו ב־GitHub שהשינוי הגיע. נדרשים לפחות 50 commits משמעותיים לאורך השנה, גם למי שעובד תמיד באותו מחשב נייד.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.

<!-- teacher-notes:start
class_periods: 1

להכין התקנות לפני המפגש. אין יעד לימודי של PR, branches או merge.
teacher-notes:end -->

<!-- lesson-next:start -->
---

## המשך

- [האתר הופך לשלי]({{ '/taba/02-my-theme/' | relative_url }})
<!-- lesson-next:end -->
