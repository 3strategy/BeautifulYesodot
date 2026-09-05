---
layout: page
title: מעדכנים ומוחקים רשומות
subtitle: איתור לפי מזהה, עריכה ואישור מחיקה; טיפול ברשומה שאינה קיימת
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 110
track: core
class_periods: 3
published: false
companion_commit: 68100fd563b4748c2a344551c3079f524bc1ab5f
companion_previous: a0b42b62d249a9701b5e2fc371874ede541a006c
---

{: .box-note}
משלימים CRUD: קוראים רשומה לפי מזהה, עורכים את התוכן ומוחקים רק לאחר אישור. התיאור הופך למאמר עם Markdown ו־Mermaid.

[קוד השלב](https://github.com/3strategy/razortaba/tree/68100fd563b4748c2a344551c3079f524bc1ab5f) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/a0b42b62d249a9701b5e2fc371874ede541a006c...68100fd563b4748c2a344551c3079f524bc1ab5f)

קישורי GitHub מפנים למאגר פרטי. המורה צריך להעניק הרשאת קריאה; אפשר ללמוד גם מהקוד המופיע כאן.

## מה נלמד

- לאתר רשומה באמצעות Id.
- לעדכן אובייקט שהמסד כבר עוקב אחריו.
- להפריד בין הצגת אישור מחיקה לבין ביצוע מחיקה.

## מתחילים מסונכרנים

פתחו את תיקיית הפרויקט הנכונה, בדקו שאין שינוי לא שמור והפעילו **Pull**. אם Git מציג התנגשות, פנו למורה; אל תמחקו עבודה ואל תבצעו Force Push.

## עוקבים אחר רשומה אחת

`asp-route-id` מוסיף מזהה לכתובת. Edit טוענת את הרשומה ב־GET ומציגה את הערכים בטופס. ב־POST מחפשים אותה שוב, בודקים קלט ומעתיקים את השדות המותרים. אין צורך ב־Add בזמן עריכה.

Delete מציגה שאלה ב־GET. רק POST מבצעת Remove ו־SaveChangesAsync. כתובת שלא מתאימה לרשומה מחזירה 404 במקום ליצור רשומה חדשה בטעות. בדף Details משתמשים באותו MarkdownRenderer מהמאמר; לא כותבים ממיר נוסף.

## השינויים בקוד

### `RazorTaba/Pages/Animals/Delete.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Animals/Delete.cshtml` והדביקו את התוכן הבא:

````cshtml
@page "{id:int}"
@model RazorTaba.Pages.Animals.DeleteModel
@{
    ViewData["Title"] = "מחיקת חיה";
}
<h1>למחוק את @Model.Animal.Name?</h1>
<p>המחיקה מתבצעת רק לאחר אישור. היא אינה מוחקת קובצי תמונה.</p>
<form method="post">
    <button class="btn btn-danger" type="submit">כן, למחוק</button>
    <a asp-page="Index" class="btn btn-outline-secondary">ביטול</a>
</form>
````

### `RazorTaba/Pages/Animals/Delete.cshtml.cs`

קובץ חדש. צרו את `RazorTaba/Pages/Animals/Delete.cshtml.cs` והדביקו את התוכן הבא:

````csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using RazorTaba.Data;
using RazorTaba.Models;

namespace RazorTaba.Pages.Animals;

/// <summary>מציג אישור ב־GET ומוחק רק ב־POST.</summary>
public class DeleteModel(AppDbContext db) : PageModel
{
    public Animal Animal { get; private set; } = new();

    public async Task<IActionResult> OnGetAsync(int id)
    {
        var existing = await db.Animals.FindAsync(id);
        if (existing is null) return NotFound();
        Animal = existing;
        return Page();
    }

    public async Task<IActionResult> OnPostAsync(int id)
    {
        var existing = await db.Animals.FindAsync(id);
        if (existing is null) return NotFound();
        db.Animals.Remove(existing);
        await db.SaveChangesAsync();
        return RedirectToPage("Index");
    }
}
````

### `RazorTaba/Pages/Animals/Details.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Animals/Details.cshtml` והדביקו את התוכן הבא:

````cshtml
@page "{id:int}"
@model RazorTaba.Pages.Animals.DetailsModel
@{
    ViewData["Title"] = Model.Animal.Name;
}
<article class="markdown-content card p-4">
    <h1>@Model.Animal.Name</h1>
    <img src="@Model.Animal.ImagePath" alt="איור של @Model.Animal.Name" />
    @Html.Raw(Model.DescriptionHtml)
</article>
<a asp-page="Index">חזרה לחיות</a>
````

### `RazorTaba/Pages/Animals/Details.cshtml.cs`

קובץ חדש. צרו את `RazorTaba/Pages/Animals/Details.cshtml.cs` והדביקו את התוכן הבא:

````csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using RazorTaba.Data;
using RazorTaba.Models;
using RazorTaba.Services;

namespace RazorTaba.Pages.Animals;

/// <summary>מציג רשומה ותוכן Markdown באמצעות אותו רכיב ששימש למאמר.</summary>
public class DetailsModel(AppDbContext db, MarkdownRenderer renderer) : PageModel
{
    public Animal Animal { get; private set; } = new();
    public string DescriptionHtml { get; private set; } = "";

    public async Task<IActionResult> OnGetAsync(int id)
    {
        var existing = await db.Animals.FindAsync(id);
        if (existing is null) return NotFound();
        Animal = existing;
        DescriptionHtml = renderer.Render(Animal.Description);
        return Page();
    }
}
````

### `RazorTaba/Pages/Animals/Edit.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Animals/Edit.cshtml` והדביקו את התוכן הבא:

````cshtml
@page "{id:int}"
@model RazorTaba.Pages.Animals.EditModel
@{
    ViewData["Title"] = "שמירת שינויים";
}
<h1>שמירת שינויים</h1>
<form method="post" class="card p-4 col-lg-8">
    <div asp-validation-summary="All" class="text-danger" role="alert"></div>
    <label asp-for="Animal.Name" class="form-label"></label>
    <input asp-for="Animal.Name" class="form-control mb-3" />
    <label asp-for="Animal.Description" class="form-label"></label>
    <textarea asp-for="Animal.Description" class="form-control mb-3" rows="7"></textarea>
    <label asp-for="Animal.ImagePath" class="form-label"></label>
    <input asp-for="Animal.ImagePath" class="form-control mb-3" dir="ltr" />
    <button class="btn btn-primary" type="submit">שמירת שינויים</button>
    <a asp-page="Index" class="mt-3">חזרה לרשימה</a>
</form>
````

### `RazorTaba/Pages/Animals/Edit.cshtml.cs`

קובץ חדש. צרו את `RazorTaba/Pages/Animals/Edit.cshtml.cs` והדביקו את התוכן הבא:

````csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using RazorTaba.Data;
using RazorTaba.Models;

namespace RazorTaba.Pages.Animals;

/// <summary>טוען רשומה קיימת ומעדכן רק את שדות התוכן שלה.</summary>
public class EditModel(AppDbContext db) : PageModel
{
    [BindProperty]
    public Animal Animal { get; set; } = new();

    public async Task<IActionResult> OnGetAsync(int id)
    {
        var existing = await db.Animals.FindAsync(id);
        if (existing is null) return NotFound();
        Animal = existing;
        return Page();
    }

    /// <summary>מחפש מחדש לפי הכתובת; Id שהגיע בטופס אינו משנה את הרשומה שנבחרה.</summary>
    public async Task<IActionResult> OnPostAsync(int id)
    {
        var existing = await db.Animals.FindAsync(id);
        if (existing is null) return NotFound();
        if (!ModelState.IsValid) return Page();
        existing.Name = Animal.Name;
        existing.Description = Animal.Description;
        existing.ImagePath = Animal.ImagePath;
        await db.SaveChangesAsync();
        return RedirectToPage("Index");
    }
}
````

### `RazorTaba/Pages/Animals/Index.cshtml`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Animals/Index.cshtml
+++ b/RazorTaba/Pages/Animals/Index.cshtml
@@ -16,9 +16,13 @@
         <article class="card h-100">
             <img src="@animal.ImagePath" alt="איור של @animal.Name" class="card-img-top" />
             <div class="card-body">
                 <h2 class="h4">@animal.Name</h2>
-                <p>@animal.Description</p>
+                <a asp-page="Details" asp-route-id="@animal.Id">לסיפור המלא</a>
+                <div class="d-flex gap-3 mt-3">
+                    <a asp-page="Edit" asp-route-id="@animal.Id">עריכה</a>
+                    <a asp-page="Delete" asp-route-id="@animal.Id">מחיקה</a>
+                </div>
             </div>
         </article>
     </div>
 }
````

## מריצים ובודקים

1. ערכו שם ובדקו שה־Id נשאר זהה.
2. כתבו תיאור Markdown עם תרשים ופתחו לסיפור המלא.
3. ביטול מחיקה משאיר את הרשומה.
4. אישור מחיקה מסיר אותה.
5. כתובת /Animals/Edit/999999 מחזירה 404.

## משימה אישית ובדיקת הבנה

ערכו פריט אישי והסבירו מדוע פתיחת קישור המחיקה אינה מוחקת דבר. בדקו שהטופס אינו מאפשר להזין שם ריק גם בזמן עריכה.

{: .box-success}
בסיום שינוי משמעותי: בדקו את ה־diff, בצעו Stage, כתבו הודעת commit שמתארת מה שיניתם, ובצעו Push. ודאו ב־GitHub שהשינוי הגיע. נדרשים לפחות 50 commits משמעותיים לאורך השנה, גם למי שעובד תמיד באותו מחשב נייד.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.
