---
layout: page
title: מי רשאי לערוך? בעלות והרשאות
subtitle: שיוך רשומה למשתמש ובדיקת הרשאה בצד השרת; הבעלות נפרדת מהמטפל העסקי
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 170
track: extension
published: false
companion_commit: 3cb5c6fc63600dc58a3f04cf70d0d505107ba421
companion_previous: 19036f631297cf0242188a7502e8ca7cb6878e3f
---

{: .box-note}
כעת משתמשים בכניסה כדי להחליט מי רשאי לשנות רשומה. הגנה אמיתית נמצאת בשרת, לא רק בהסתרת כפתור.

[קוד השלב](https://github.com/3strategy/razortaba/tree/3cb5c6fc63600dc58a3f04cf70d0d505107ba421) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/19036f631297cf0242188a7502e8ca7cb6878e3f...3cb5c6fc63600dc58a3f04cf70d0d505107ba421)

קישורי GitHub מפנים למאגר פרטי. המורה צריך להעניק הרשאת קריאה; אפשר ללמוד גם מהקוד המופיע כאן.

## מה נלמד

- להבדיל בין מטפל עסקי לבין בעל הרשומה.
- להגן על GET ועל POST של עריכה ומחיקה.
- לבדוק הרשאות עם שני משתמשים.

## מתחילים מסונכרנים

פתחו את תיקיית הפרויקט הנכונה, בדקו שאין שינוי לא שמור והפעילו **Pull**. אם Git מציג התנגשות, פנו למורה; אל תמחקו עבודה ואל תבצעו Force Push.

## שני סוגי קשרים

KeeperId הוא קשר עסקי בתוך מסד היישום. OwnerUserId מזהה את החשבון שיצר את הרשומה. מכיוון שהחשבונות במסד נפרד, זה אינו מפתח זר בין שני מסדי SQLite. הערך מגיע מהמשתמש המחובר בשרת, ולא מטופס. אין מחיקת חשבונות כחלק מהמסלול הזה.

## מגינים בכל כניסה לשינוי

Authorize דורש כניסה. בכל GET ו־POST של Edit ו־Delete בודקים גם בעלות. הסתרת קישור היא נוחות בלבד: גם כתובת שהוקלדה ידנית או POST שנבנה מחוץ לדפדפן חייבים להידחות. הטפסים מעתיקים רק שדות תוכן ולכן אי אפשר לשנות בעלות באמצעות שדה מוסתר נוסף.

רשומות שנוצרו לפני הפרק נשארות ללא בעלים ואינן ניתנות לעריכה דרך האתר. לא נותנים למשתמש הראשון בעלות אוטומטית על עבודת אחרים. לצורך התרגול יוצרים רשומות חדשות אחרי כניסה. מטפל הדוגמה נשאר זמין לבחירה אך אינו ניתן לשינוי. תפקידי admin ומסך העברת בעלות אינם חלק מהפרק.

### פקודות השלב

הפקודות מורצות משורש המאגר, שבו נמצאת התיקייה `RazorTaba`, בטרמינל של Visual Studio או VS Code.

```shell
dotnet ef migrations add RecordOwnership --context AppDbContext --project RazorTaba
dotnet ef database update --context AppDbContext --project RazorTaba
```

## השינויים בקוד

### `RazorTaba/Models/Animal.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Models/Animal.cs
+++ b/RazorTaba/Models/Animal.cs
@@ -5,8 +5,10 @@ namespace RazorTaba.Models;
 /// <summary>חיה אחת באתר, הנשמרת כרשומה בטבלת Animals.</summary>
 public class Animal
 {
     public int Id { get; set; }
+    // מזהה בעל הרשומה במסד החשבונות; אינו מתקבל מהטופס.
+    public string? OwnerUserId { get; set; }
     [Required(ErrorMessage = "בחרו מטפל")]
     [Display(Name = "מטפל")]
     public int? KeeperId { get; set; }
     public Keeper? Keeper { get; set; }
````

### `RazorTaba/Models/Keeper.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Models/Keeper.cs
+++ b/RazorTaba/Models/Keeper.cs
@@ -5,8 +5,10 @@ namespace RazorTaba.Models;
 /// <summary>מטפל עסקי, שאינו חשבון כניסה לאתר.</summary>
 public class Keeper
 {
     public int Id { get; set; }
+    // מזהה בעל הרשומה במסד החשבונות; אינו מתקבל מהטופס.
+    public string? OwnerUserId { get; set; }
     [Required(ErrorMessage = "כתבו שם מטפל"), StringLength(60)]
     [Display(Name = "שם המטפל")]
     public string Name { get; set; } = "";
 }
````

### `RazorTaba/Pages/Animals/Create.cshtml.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Animals/Create.cshtml.cs
+++ b/RazorTaba/Pages/Animals/Create.cshtml.cs
@@ -1,4 +1,6 @@
+using System.Security.Claims;
+using Microsoft.AspNetCore.Authorization;
 using Microsoft.AspNetCore.Mvc;
 using Microsoft.AspNetCore.Mvc.RazorPages;
 using Microsoft.AspNetCore.Mvc.Rendering;
 using Microsoft.EntityFrameworkCore;
@@ -7,8 +9,9 @@ using RazorTaba.Models;

 namespace RazorTaba.Pages.Animals;

 /// <summary>מציג טופס ומוסיף רשומה תקינה למסד.</summary>
+[Authorize]
 public class CreateModel(AppDbContext db) : PageModel
 {
     public SelectList KeeperOptions { get; private set; } = new(Array.Empty<Keeper>(), "Id", "Name");

@@ -31,8 +34,9 @@ public class CreateModel(AppDbContext db) : PageModel
         if (!ModelState.IsValid) return Page();

         var animal = new Animal
         {
+            OwnerUserId = User.FindFirstValue(ClaimTypes.NameIdentifier),
             Name = Animal.Name,
             Description = Animal.Description,
             ImagePath = Animal.ImagePath,
             KeeperId = Animal.KeeperId
````

### `RazorTaba/Pages/Animals/Edit.cshtml.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Animals/Edit.cshtml.cs
+++ b/RazorTaba/Pages/Animals/Edit.cshtml.cs
@@ -1,4 +1,6 @@
+using System.Security.Claims;
+using Microsoft.AspNetCore.Authorization;
 using Microsoft.AspNetCore.Mvc;
 using Microsoft.AspNetCore.Mvc.RazorPages;
 using Microsoft.AspNetCore.Mvc.Rendering;
 using Microsoft.EntityFrameworkCore;
@@ -7,8 +9,9 @@ using RazorTaba.Models;

 namespace RazorTaba.Pages.Animals;

 /// <summary>טוען רשומה קיימת ומעדכן רק את שדות התוכן שלה.</summary>
+[Authorize]
 public class EditModel(AppDbContext db) : PageModel
 {
     public SelectList KeeperOptions { get; private set; } = new(Array.Empty<Keeper>(), "Id", "Name");

@@ -23,8 +26,9 @@ public class EditModel(AppDbContext db) : PageModel
     public async Task<IActionResult> OnGetAsync(int id)
     {
         var existing = await db.Animals.FindAsync(id);
         if (existing is null) return NotFound();
+        if (existing.OwnerUserId != User.FindFirstValue(ClaimTypes.NameIdentifier)) return Forbid();
         Animal = existing;
         await LoadKeepersAsync();
         return Page();
     }
@@ -33,8 +37,9 @@ public class EditModel(AppDbContext db) : PageModel
     public async Task<IActionResult> OnPostAsync(int id)
     {
         var existing = await db.Animals.FindAsync(id);
         if (existing is null) return NotFound();
+        if (existing.OwnerUserId != User.FindFirstValue(ClaimTypes.NameIdentifier)) return Forbid();
         await LoadKeepersAsync();
         if (!await db.Keepers.AnyAsync(k => k.Id == Animal.KeeperId))
             ModelState.AddModelError("Animal.KeeperId", "בחרו מטפל קיים");
         if (!ModelState.IsValid) return Page();
````

### `RazorTaba/Pages/Animals/Delete.cshtml.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Animals/Delete.cshtml.cs
+++ b/RazorTaba/Pages/Animals/Delete.cshtml.cs
@@ -1,28 +1,33 @@
+using System.Security.Claims;
+using Microsoft.AspNetCore.Authorization;
 using Microsoft.AspNetCore.Mvc;
 using Microsoft.AspNetCore.Mvc.RazorPages;
 using RazorTaba.Data;
 using RazorTaba.Models;

 namespace RazorTaba.Pages.Animals;

 /// <summary>מציג אישור ב־GET ומוחק רק ב־POST.</summary>
+[Authorize]
 public class DeleteModel(AppDbContext db) : PageModel
 {
     public Animal Animal { get; private set; } = new();

     public async Task<IActionResult> OnGetAsync(int id)
     {
         var existing = await db.Animals.FindAsync(id);
         if (existing is null) return NotFound();
+        if (existing.OwnerUserId != User.FindFirstValue(ClaimTypes.NameIdentifier)) return Forbid();
         Animal = existing;
         return Page();
     }

     public async Task<IActionResult> OnPostAsync(int id)
     {
         var existing = await db.Animals.FindAsync(id);
         if (existing is null) return NotFound();
+        if (existing.OwnerUserId != User.FindFirstValue(ClaimTypes.NameIdentifier)) return Forbid();
         db.Animals.Remove(existing);
         await db.SaveChangesAsync();
         return RedirectToPage("Index");
     }
````

### `RazorTaba/Pages/Keepers/Create.cshtml.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Keepers/Create.cshtml.cs
+++ b/RazorTaba/Pages/Keepers/Create.cshtml.cs
@@ -1,12 +1,15 @@
+using System.Security.Claims;
+using Microsoft.AspNetCore.Authorization;
 using Microsoft.AspNetCore.Mvc;
 using Microsoft.AspNetCore.Mvc.RazorPages;
 using RazorTaba.Data;
 using RazorTaba.Models;

 namespace RazorTaba.Pages.Keepers;

 /// <summary>הוספת מטפל באמצעות אותו דפוס טופס שכבר למדנו.</summary>
+[Authorize]
 public class CreateModel(AppDbContext db) : PageModel
 {
     [BindProperty]
     public Keeper Keeper { get; set; } = new();
@@ -14,9 +17,9 @@ public class CreateModel(AppDbContext db) : PageModel

     public async Task<IActionResult> OnPostAsync(int id)
     {
         if (!ModelState.IsValid) return Page();
-        db.Keepers.Add(new Keeper { Name = Keeper.Name });
+        db.Keepers.Add(new Keeper { Name = Keeper.Name, OwnerUserId = User.FindFirstValue(ClaimTypes.NameIdentifier) });
         await db.SaveChangesAsync();
         return RedirectToPage("Index");
     }
 }
````

### `RazorTaba/Pages/Keepers/Edit.cshtml.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Keepers/Edit.cshtml.cs
+++ b/RazorTaba/Pages/Keepers/Edit.cshtml.cs
@@ -1,20 +1,24 @@
+using System.Security.Claims;
+using Microsoft.AspNetCore.Authorization;
 using Microsoft.AspNetCore.Mvc;
 using Microsoft.AspNetCore.Mvc.RazorPages;
 using RazorTaba.Data;
 using RazorTaba.Models;

 namespace RazorTaba.Pages.Keepers;

 /// <summary>עריכת מטפל באמצעות אותו דפוס טופס שכבר למדנו.</summary>
+[Authorize]
 public class EditModel(AppDbContext db) : PageModel
 {
     [BindProperty]
     public Keeper Keeper { get; set; } = new();
     public async Task<IActionResult> OnGetAsync(int id)
     {
         var existing = await db.Keepers.FindAsync(id);
         if (existing is null) return NotFound();
+        if (existing.OwnerUserId != User.FindFirstValue(ClaimTypes.NameIdentifier)) return Forbid();
         Keeper = existing;
         return Page();
     }

@@ -22,8 +26,9 @@ public class EditModel(AppDbContext db) : PageModel
     {
         if (!ModelState.IsValid) return Page();
         var existing = await db.Keepers.FindAsync(id);
         if (existing is null) return NotFound();
+        if (existing.OwnerUserId != User.FindFirstValue(ClaimTypes.NameIdentifier)) return Forbid();
         existing.Name = Keeper.Name;
         await db.SaveChangesAsync();
         return RedirectToPage("Index");
     }
````

### `RazorTaba/Pages/Keepers/Delete.cshtml.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Keepers/Delete.cshtml.cs
+++ b/RazorTaba/Pages/Keepers/Delete.cshtml.cs
@@ -1,4 +1,6 @@
+using System.Security.Claims;
+using Microsoft.AspNetCore.Authorization;
 using Microsoft.AspNetCore.Mvc;
 using Microsoft.AspNetCore.Mvc.RazorPages;
 using Microsoft.EntityFrameworkCore;
 using RazorTaba.Data;
@@ -6,23 +8,26 @@ using RazorTaba.Models;

 namespace RazorTaba.Pages.Keepers;

 /// <summary>מוחק מטפל רק אם אין חיות שמפנות אליו.</summary>
+[Authorize]
 public class DeleteModel(AppDbContext db) : PageModel
 {
     public Keeper Keeper { get; private set; } = new();
     public async Task<IActionResult> OnGetAsync(int id)
     {
         var existing = await db.Keepers.FindAsync(id);
         if (existing is null) return NotFound();
+        if (existing.OwnerUserId != User.FindFirstValue(ClaimTypes.NameIdentifier)) return Forbid();
         Keeper = existing;
         return Page();
     }

     public async Task<IActionResult> OnPostAsync(int id)
     {
         var existing = await db.Keepers.FindAsync(id);
         if (existing is null) return NotFound();
+        if (existing.OwnerUserId != User.FindFirstValue(ClaimTypes.NameIdentifier)) return Forbid();
         Keeper = existing;
         if (await db.Animals.AnyAsync(a => a.KeeperId == id))
         {
             ModelState.AddModelError("", "למטפל יש חיות. העבירו אותן למטפל אחר לפני מחיקה.");
````

### `RazorTaba/Pages/Animals/Index.cshtml`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Animals/Index.cshtml
+++ b/RazorTaba/Pages/Animals/Index.cshtml
@@ -23,12 +23,15 @@
             <div class="card-body">
                 <h2 class="h4">@animal.Name</h2>
                 <p class="text-muted">מטפל: @(animal.Keeper?.Name ?? "טרם שויך מטפל")</p>
                 <a asp-page="Details" asp-route-id="@animal.Id">לסיפור המלא</a>
+                @if (User.Identity?.IsAuthenticated == true && animal.OwnerUserId == User.FindFirstValue(ClaimTypes.NameIdentifier))
+                {
                 <div class="d-flex gap-3 mt-3">
                     <a asp-page="Edit" asp-route-id="@animal.Id">עריכה</a>
                     <a asp-page="Delete" asp-route-id="@animal.Id">מחיקה</a>
                 </div>
+                }
             </div>
         </article>
     </div>
 }
````

### `RazorTaba/Pages/Keepers/Index.cshtml`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Keepers/Index.cshtml
+++ b/RazorTaba/Pages/Keepers/Index.cshtml
@@ -7,9 +7,12 @@
 @foreach (var keeper in Model.Keepers)
 {
     <li class="list-group-item d-flex gap-3">
         <span class="me-auto">@keeper.Name</span>
+        @if (User.Identity?.IsAuthenticated == true && keeper.OwnerUserId == User.FindFirstValue(ClaimTypes.NameIdentifier))
+        {
         <a asp-page="Edit" asp-route-id="@keeper.Id">עריכה</a>
         <a asp-page="Delete" asp-route-id="@keeper.Id">מחיקה</a>
+        }
     </li>
 }
 </ul>
````

### `RazorTaba/Pages/_ViewImports.cshtml`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/_ViewImports.cshtml
+++ b/RazorTaba/Pages/_ViewImports.cshtml
@@ -1,3 +1,5 @@
-﻿@using RazorTaba
-@namespace RazorTaba.Pages
-@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
+ï»¿@using RazorTaba
+@namespace RazorTaba.Pages
+@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
+
+@using System.Security.Claims
````

<details markdown="1"><summary>קבצי תשתית וקבצים שנוצרו אוטומטית</summary>

הקבצים הבאים נמצאים בקוד השלב. קבצים שנוצרים באמצעות פקודות השלב אין להעתיק ידנית.

- [RazorTaba/Migrations/20260905070613_RecordOwnership.Designer.cs](https://github.com/3strategy/razortaba/blob/3cb5c6fc63600dc58a3f04cf70d0d505107ba421/RazorTaba/Migrations/20260905070613_RecordOwnership.Designer.cs)
- [RazorTaba/Migrations/20260905070613_RecordOwnership.cs](https://github.com/3strategy/razortaba/blob/3cb5c6fc63600dc58a3f04cf70d0d505107ba421/RazorTaba/Migrations/20260905070613_RecordOwnership.cs)
- [RazorTaba/Migrations/AppDbContextModelSnapshot.cs](https://github.com/3strategy/razortaba/blob/3cb5c6fc63600dc58a3f04cf70d0d505107ba421/RazorTaba/Migrations/AppDbContextModelSnapshot.cs)

</details>

## מריצים ובודקים

1. פתחו חלון רגיל וחלון פרטי והיכנסו כשני משתמשים שונים.
2. משתמש א יוצר חיה ויכול לערוך אותה.
3. משתמש ב רואה את החיה אך אינו יכול לערוך או למחוק, גם בכתובת ישירה.
4. יצירה ללא כניסה מפנה לטופס הכניסה.
5. בעלות על רשומה אינה ניתנת לשינוי בטופס.

## משימה אישית ובדיקת הבנה

כתבו טבלת בדיקות קטנה: אורח, בעל הרשומה ומשתמש אחר מול קריאה, יצירה, עריכה ומחיקה. הסבירו מדוע Hide אינו Authorize.

{: .box-success}
בסיום שינוי משמעותי: בדקו את ה־diff, בצעו Stage, כתבו הודעת commit שמתארת מה שיניתם, ובצעו Push. ודאו ב־GitHub שהשינוי הגיע. נדרשים לפחות 50 commits משמעותיים לאורך השנה, גם למי שעובד תמיד באותו מחשב נייד.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.

## תיקון מבדיקת שני משתמשים

בדיקת POST עם טופס לא תקין גילתה שסדר הבדיקות חשוב: קודם מאתרים רשומה ובודקים בעלות, ורק אחר כך מציגים שגיאות קלט. כך גם בקשה פגומה של משתמש אחר מקבלת סירוב הרשאה. לא השתנו נתונים לפני התיקון, אך התגובה כעת עקבית וברורה יותר.

[תיקון שנבדק](https://github.com/3strategy/razortaba/commit/685d4aac6c177735ae0e494b84c03e6e0114f6cf)

````diff
diff --git a/RazorTaba/Pages/Keepers/Edit.cshtml.cs b/RazorTaba/Pages/Keepers/Edit.cshtml.cs
index 03bb5c8..2a8d18c 100644
--- a/RazorTaba/Pages/Keepers/Edit.cshtml.cs
+++ b/RazorTaba/Pages/Keepers/Edit.cshtml.cs
@@ -23,12 +23,12 @@ public class EditModel(AppDbContext db) : PageModel
     }

     public async Task<IActionResult> OnPostAsync(int id)
     {
-        if (!ModelState.IsValid) return Page();
         var existing = await db.Keepers.FindAsync(id);
         if (existing is null) return NotFound();
         if (existing.OwnerUserId != User.FindFirstValue(ClaimTypes.NameIdentifier)) return Forbid();
+        if (!ModelState.IsValid) return Page();
         existing.Name = Keeper.Name;
         await db.SaveChangesAsync();
         return RedirectToPage("Index");
     }
````
