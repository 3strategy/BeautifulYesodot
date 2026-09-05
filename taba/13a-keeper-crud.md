---
layout: page
title: 'מנהלים מטפלים: CRUD וקשר קיים'
subtitle: תרגול חוזר של טפסים ומניעת מחיקת רשומה שיש אליה הפניות
lang: he
sequence: 131
track: extension
published: false
companion_commit: 82d6db226876efbf7228a9f4d7508296a28e0164
companion_previous: be7cbe0a753408d51078a3d2660cbbb102b0ac95
---

{: .box-note}
מיישמים שוב את דפוס CRUD, הפעם על טבלה קטנה של מטפלים. השינוי המעניין הוא כלל המחיקה.

[קוד השלב](https://github.com/3strategy/razortaba/tree/82d6db226876efbf7228a9f4d7508296a28e0164) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/be7cbe0a753408d51078a3d2660cbbb102b0ac95...82d6db226876efbf7228a9f4d7508296a28e0164)

קישורי GitHub מפנים למאגר פרטי. המורה צריך להעניק הרשאת קריאה; אפשר ללמוד גם מהקוד המופיע כאן.

## מה נלמד

- להעביר דפוס מוכר למחלקה אחרת.
- להבין מדוע קשר מגביל מחיקה.
- לבדוק תוצאה בשתי טבלאות.

## מתחילים מסונכרנים

פתחו את תיקיית הפרויקט הנכונה, בדקו שאין שינוי לא שמור והפעילו **Pull**. אם Git מציג התנגשות, פנו למורה; אל תמחקו עבודה ואל תבצעו Force Push.

## אותו דפוס, כלל עסקי נוסף

צרו את דפי Keepers לפי הקוד. נסו תחילה לזהות בעצמכם מה דומה לדפי Animals. לפני מחיקה שואלים אם קיימת חיה שמפנה למטפל. אם כן, מציגים הסבר ומשאירים את הנתונים. גם המסד מגן על הקשר באמצעות Restrict.

זהו שיעור נפרד כדי לא להעמיס על ההיכרות הראשונה עם קשרים. מי שסיים רק את פרק 13 יכול להמשיך לעבוד עם המטפל לדוגמה.

## השינויים בקוד

### `RazorTaba/Pages/Keepers/Create.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Keepers/Create.cshtml` והדביקו את התוכן הבא:

````cshtml
@page 
@model RazorTaba.Pages.Keepers.CreateModel
@{ ViewData["Title"] = "הוספת מטפל"; }
<h1>הוספת מטפל</h1>
<form method="post" class="card p-4 col-lg-7">
    <div asp-validation-summary="All" class="text-danger" role="alert"></div>
    <label asp-for="Keeper.Name" class="form-label"></label>
    <input asp-for="Keeper.Name" class="form-control mb-3" />
    <button class="btn btn-primary">שמירה</button>
    <a asp-page="Index">ביטול</a>
</form>
````

### `RazorTaba/Pages/Keepers/Create.cshtml.cs`

קובץ חדש. צרו את `RazorTaba/Pages/Keepers/Create.cshtml.cs` והדביקו את התוכן הבא:

````csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using RazorTaba.Data;
using RazorTaba.Models;

namespace RazorTaba.Pages.Keepers;

/// <summary>הוספת מטפל באמצעות אותו דפוס טופס שכבר למדנו.</summary>
public class CreateModel(AppDbContext db) : PageModel
{
    [BindProperty]
    public Keeper Keeper { get; set; } = new();
    public void OnGet() { }

    public async Task<IActionResult> OnPostAsync(int id)
    {
        if (!ModelState.IsValid) return Page();
        db.Keepers.Add(new Keeper { Name = Keeper.Name });
        await db.SaveChangesAsync();
        return RedirectToPage("Index");
    }
}
````

### `RazorTaba/Pages/Keepers/Delete.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Keepers/Delete.cshtml` והדביקו את התוכן הבא:

````cshtml
@page "{id:int}"
@model RazorTaba.Pages.Keepers.DeleteModel
@{ ViewData["Title"] = "מחיקת מטפל"; }
<h1>למחוק את @Model.Keeper.Name?</h1>
<div asp-validation-summary="All" class="text-danger" role="alert"></div>
<form method="post">
    <button class="btn btn-danger">אישור מחיקה</button>
    <a class="btn btn-outline-secondary" asp-page="Index">ביטול</a>
</form>
````

### `RazorTaba/Pages/Keepers/Delete.cshtml.cs`

קובץ חדש. צרו את `RazorTaba/Pages/Keepers/Delete.cshtml.cs` והדביקו את התוכן הבא:

````csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using RazorTaba.Data;
using RazorTaba.Models;

namespace RazorTaba.Pages.Keepers;

/// <summary>מוחק מטפל רק אם אין חיות שמפנות אליו.</summary>
public class DeleteModel(AppDbContext db) : PageModel
{
    public Keeper Keeper { get; private set; } = new();
    public async Task<IActionResult> OnGetAsync(int id)
    {
        var existing = await db.Keepers.FindAsync(id);
        if (existing is null) return NotFound();
        Keeper = existing;
        return Page();
    }

    public async Task<IActionResult> OnPostAsync(int id)
    {
        var existing = await db.Keepers.FindAsync(id);
        if (existing is null) return NotFound();
        Keeper = existing;
        if (await db.Animals.AnyAsync(a => a.KeeperId == id))
        {
            ModelState.AddModelError("", "למטפל יש חיות. העבירו אותן למטפל אחר לפני מחיקה.");
            return Page();
        }
        db.Keepers.Remove(existing);
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException)
        {
            ModelState.AddModelError("", "לא ניתן למחוק כעת. רעננו ובדקו אם נוספו חיות למטפל.");
            return Page();
        }
        return RedirectToPage("Index");
    }
}
````

### `RazorTaba/Pages/Keepers/Edit.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Keepers/Edit.cshtml` והדביקו את התוכן הבא:

````cshtml
@page "{id:int}"
@model RazorTaba.Pages.Keepers.EditModel
@{ ViewData["Title"] = "עריכת מטפל"; }
<h1>עריכת מטפל</h1>
<form method="post" class="card p-4 col-lg-7">
    <div asp-validation-summary="All" class="text-danger" role="alert"></div>
    <label asp-for="Keeper.Name" class="form-label"></label>
    <input asp-for="Keeper.Name" class="form-control mb-3" />
    <button class="btn btn-primary">שמירה</button>
    <a asp-page="Index">ביטול</a>
</form>
````

### `RazorTaba/Pages/Keepers/Edit.cshtml.cs`

קובץ חדש. צרו את `RazorTaba/Pages/Keepers/Edit.cshtml.cs` והדביקו את התוכן הבא:

````csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using RazorTaba.Data;
using RazorTaba.Models;

namespace RazorTaba.Pages.Keepers;

/// <summary>עריכת מטפל באמצעות אותו דפוס טופס שכבר למדנו.</summary>
public class EditModel(AppDbContext db) : PageModel
{
    [BindProperty]
    public Keeper Keeper { get; set; } = new();
    public async Task<IActionResult> OnGetAsync(int id)
    {
        var existing = await db.Keepers.FindAsync(id);
        if (existing is null) return NotFound();
        Keeper = existing;
        return Page();
    }

    public async Task<IActionResult> OnPostAsync(int id)
    {
        if (!ModelState.IsValid) return Page();
        var existing = await db.Keepers.FindAsync(id);
        if (existing is null) return NotFound();
        existing.Name = Keeper.Name;
        await db.SaveChangesAsync();
        return RedirectToPage("Index");
    }
}
````

### `RazorTaba/Pages/Keepers/Index.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Keepers/Index.cshtml` והדביקו את התוכן הבא:

````cshtml
@page
@model RazorTaba.Pages.Keepers.IndexModel
@{ ViewData["Title"] = "מטפלים"; }
<h1>המטפלים שלנו</h1>
<a class="btn btn-primary mb-4" asp-page="Create">הוספת מטפל</a>
<ul class="list-group">
@foreach (var keeper in Model.Keepers)
{
    <li class="list-group-item d-flex gap-3">
        <span class="me-auto">@keeper.Name</span>
        <a asp-page="Edit" asp-route-id="@keeper.Id">עריכה</a>
        <a asp-page="Delete" asp-route-id="@keeper.Id">מחיקה</a>
    </li>
}
</ul>
````

### `RazorTaba/Pages/Keepers/Index.cshtml.cs`

קובץ חדש. צרו את `RazorTaba/Pages/Keepers/Index.cshtml.cs` והדביקו את התוכן הבא:

````csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using RazorTaba.Data;
using RazorTaba.Models;

namespace RazorTaba.Pages.Keepers;

/// <summary>רשימת המטפלים העסקיים.</summary>
public class IndexModel(AppDbContext db) : PageModel
{
    public List<Keeper> Keepers { get; private set; } = new();
    public async Task OnGetAsync() => Keepers = await db.Keepers.AsNoTracking().OrderBy(k => k.Name).ToListAsync();
}
````

### `RazorTaba/Pages/Shared/_Layout.cshtml`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Shared/_Layout.cshtml
+++ b/RazorTaba/Pages/Shared/_Layout.cshtml
@@ -15,8 +15,9 @@
             <a asp-page="/Contact">קשר</a>
             <a asp-page="/Guide">מדריך</a>
             <a asp-page="/Discover">מגלים</a>
             <a asp-page="/Animals/Index">החיות</a>
+            <a asp-page="/Keepers/Index">מטפלים</a>
         </nav>
     </header>
     <main class="container py-4">
         @RenderBody()
````

## מריצים ובודקים

1. צרו מטפל חדש וראו אותו באפשרויות של טופס חיה.
2. שנו את שמו וראו את השם החדש לצד החיות.
3. ניסיון למחוק מטפל עם חיות מציג שגיאה ומשאיר את הנתונים.
4. מטפל ללא חיות ניתן למחיקה.

## משימה אישית ובדיקת הבנה

הוסיפו מטפל, שייכו לו חיה ובדקו את שני מסלולי המחיקה. הסבירו מדוע מחיקה אוטומטית של כל החיות אינה מתאימה כאן.

{: .box-success}
בסיום שינוי משמעותי: בדקו את ה־diff, בצעו Stage, כתבו הודעת commit שמתארת מה שיניתם, ובצעו Push. ודאו ב־GitHub שהשינוי הגיע. נדרשים לפחות 50 commits משמעותיים לאורך השנה, גם למי שעובד תמיד באותו מחשב נייד.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.
