---
layout: page
title: מחפשים ומסננים נתונים
subtitle: שאילתות LINQ פשוטות לפי שם ומטפל; רשימת תוצאות ומצב ללא תוצאות
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 140
track: extension
published: false
companion_commit: ea85e06dae377e4eca5cdeb7b1ec6222cfcc9668
companion_previous: f3905d476256306740393fad05fd80ced82a27ab
---

{: .box-note}
מוסיפים יכולת שימושית בלי טבלה נוספת: מחפשים לפי שם ובוחרים מטפל. הסינון אינו משנה את הרשומות.

[קוד השלב](https://github.com/3strategy/razortaba/tree/ea85e06dae377e4eca5cdeb7b1ec6222cfcc9668) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/f3905d476256306740393fad05fd80ced82a27ab...ea85e06dae377e4eca5cdeb7b1ec6222cfcc9668)

קישורי GitHub מפנים למאגר פרטי. המורה צריך להעניק הרשאת קריאה; אפשר ללמוד גם מהקוד המופיע כאן.

## מה נלמד

- לבנות Where בהדרגה.
- להבחין בין GET לחיפוש לבין POST לשינוי.
- לשמור את אפשרויות החיפוש בכתובת.

## מתחילים מסונכרנים

פתחו את תיקיית הפרויקט הנכונה, בדקו שאין שינוי לא שמור והפעילו **Pull**. אם Git מציג התנגשות, פנו למורה; אל תמחקו עבודה ואל תבצעו Force Push.

## מצמצמים לפני שטוענים

המשתנה query מתאר שאילתה שעדיין לא בוצעה. כל Where מוסיף תנאי. ToListAsync מבצע את הקריאה. Contains כאן הוא חיפוש פשוט לפי טקסט; אין הבטחה לחיפוש חכם או להתעלמות מאותיות גדולות בכל שפה.

הטופס משתמש ב־GET, כך שאפשר להעתיק את כתובת החיפוש. אין צורך במיגרציה כי לא שינינו מבנה נתונים.

## השינויים בקוד

### `RazorTaba/Pages/Animals/Index.cshtml`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Animals/Index.cshtml
+++ b/RazorTaba/Pages/Animals/Index.cshtml
@@ -4,11 +4,16 @@
     ViewData["Title"] = "החיות";
 }
 <h1>החיות שלנו</h1>
 <a asp-page="Create" class="btn btn-primary mb-4">הוספת חיה</a>
+<form method="get" class="row g-3 mb-4">
+    <div class="col-md-5"><label asp-for="Search" class="form-label">חיפוש לפי שם</label><input asp-for="Search" class="form-control" /></div>
+    <div class="col-md-4"><label asp-for="KeeperId" class="form-label">מטפל</label><select asp-for="KeeperId" asp-items="Model.KeeperOptions" class="form-select"><option value="">כל המטפלים</option></select></div>
+    <div class="col-md-3 align-self-end"><button class="btn btn-primary">סינון</button> <a asp-page="Index">ניקוי</a></div>
+</form>
 @if (Model.Animals.Count == 0)
 {
-    <p class="alert alert-info">עוד אין חיות. הוסיפו את הראשונה באמצעות הכפתור.</p>
+    <p class="alert alert-info">אין חיות להצגה. אפשר לנקות את הסינון או להוסיף חיה.</p>
 }
 <div class="row g-4">
 @foreach (var animal in Model.Animals)
 {
````

### `RazorTaba/Pages/Animals/Index.cshtml.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Animals/Index.cshtml.cs
+++ b/RazorTaba/Pages/Animals/Index.cshtml.cs
@@ -1,5 +1,7 @@
+using Microsoft.AspNetCore.Mvc;
 using Microsoft.AspNetCore.Mvc.RazorPages;
+using Microsoft.AspNetCore.Mvc.Rendering;
 using Microsoft.EntityFrameworkCore;
 using RazorTaba.Data;
 using RazorTaba.Models;

@@ -7,12 +9,25 @@ namespace RazorTaba.Pages.Animals;

 /// <summary>קורא חיות מהמסד בלי לשנות אותן.</summary>
 public class IndexModel(AppDbContext db) : PageModel
 {
+    [BindProperty(SupportsGet = true)]
+    public string? Search { get; set; }
+    [BindProperty(SupportsGet = true)]
+    public int? KeeperId { get; set; }
+    public SelectList KeeperOptions { get; private set; } = new(Array.Empty<Keeper>(), "Id", "Name");
     public List<Animal> Animals { get; private set; } = new();

     /// <summary>טוען את הרשומות לפי שם לצורך תצוגה.</summary>
     public async Task OnGetAsync()
     {
-        Animals = await db.Animals.AsNoTracking().Include(a => a.Keeper).OrderBy(a => a.Name).ToListAsync();
+        var query = db.Animals.AsNoTracking().Include(a => a.Keeper).AsQueryable();
+        if (!string.IsNullOrWhiteSpace(Search))
+        {
+            string term = Search.Trim();
+            query = query.Where(a => a.Name.Contains(term));
+        }
+        if (KeeperId.HasValue) query = query.Where(a => a.KeeperId == KeeperId.Value);
+        Animals = await query.OrderBy(a => a.Name).ToListAsync();
+        KeeperOptions = new SelectList(await db.Keepers.OrderBy(k => k.Name).ToListAsync(), "Id", "Name");
     }
 }
````

## מריצים ובודקים

1. חיפוש חלק משם מציג רק התאמות.
2. בחירת מטפל מצמצמת את הרשימה.
3. שם שאינו קיים מציג מצב ריק.
4. ניקוי חוזר לרשימה המלאה בלי למחוק נתונים.

## משימה אישית ובדיקת הבנה

בדקו שלושה חיפושים ותעדו תוצאה צפויה. הסבירו מדוע סינון אינו מחיקה.

{: .box-success}
בסיום שינוי משמעותי: בדקו את ה־diff, בצעו Stage, כתבו הודעת commit שמתארת מה שיניתם, ובצעו Push. ודאו ב־GitHub שהשינוי הגיע. נדרשים לפחות 50 commits משמעותיים לאורך השנה, גם למי שעובד תמיד באותו מחשב נייד.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.
