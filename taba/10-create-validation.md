---
layout: page
title: מוסיפים חיה ובודקים קלט
subtitle: טופס יצירה, שמירה וולידציה; עריכת תיאור Markdown ושימוש חוזר ברכיב התצוגה
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 100
track: core
published: true
companion_commit: c23009a7f8491b6ca49d54b01e7c9bb0001af7b0
companion_previous: a604aff5a09479be4863c6da3e9dd3d5e5cd0008
---

{: .box-note}
נבנה טופס להוספת חיה ונשמור את הפרטים במסד. נבדוק את הקלט ונציג הודעת תיקון כשחסר שם, תיאור או נתיב תמונה תקין.

<!-- lesson-back:start -->
[חזרה: הנתונים נשמרים עם EF Core ו־SQLite]({{ '/taba/09-ef-sqlite/' | relative_url }})
<!-- lesson-back:end -->

[קוד השלב](https://github.com/3strategy/razortaba/tree/c23009a7f8491b6ca49d54b01e7c9bb0001af7b0) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/a604aff5a09479be4863c6da3e9dd3d5e5cd0008...c23009a7f8491b6ca49d54b01e7c9bb0001af7b0)

אם קישור הקוד אינו נפתח, בקשו גישה למאגר.

## מה נלמד

- לעקוב אחר GET → טופס → POST → שמירה → רשימה.
- להשתמש ב־Required וב־ModelState.
- לשמור תיאור Markdown כטקסט.

## מתחילים מסונכרנים

פתחו את תיקיית הפרויקט הנכונה, בדקו שאין שינוי לא שמור והפעילו **Pull**. אם Git מציג התנגשות, פנו למורה; אל תמחקו עבודה ואל תבצעו Force Push.

## 1. מתארים קלט תקין

המאפיינים שמעל התכונות הם כללי בדיקה. Required מחייב ערך ו־StringLength מגביל אורך. ImagePath הוא נתיב לתמונה שהוספנו ל־`wwwroot/images`. הבדיקה דורשת נתיב שמתחיל ב־`/images/` ומסתיים בסיומת תמונה מתאימה. השוו בין `/images/fox.svg` לבין נתיב שגוי ובדקו את ההודעה שמתקבלת.

## 2. מחברים את הטופס

`asp-for` יוצר שמות שדות שתואמים ל־Animal. `BindProperty` מקבל את הערכים לאחר POST. אם הקלט שגוי, מחזירים Page ומציגים שגיאות עם הערכים שכבר כתבתם. אם הקלט תקין, יוצרים אובייקט חדש ומעתיקים רק את השדות המותרים. המסד קובע את Id; לא מקבלים אותו מהגולש.

## 3. שומרים פעם אחת

Add מכינה הוספה; SaveChangesAsync מבצעת אותה. RedirectToPage מעביר לרשימה ומונע שליחה חוזרת של הטופס כשמרעננים. טופס Razor כולל אסימון נגד שליחה מזויפת; אין להסיר את ההגנה. הוולידציה כאן בצד השרת, גם אם הדפדפן אינו מציג בדיקה מקומית.

### פקודות השלב

הפקודות מורצות משורש המאגר, שבו נמצאת התיקייה `RazorTaba`, בטרמינל של Visual Studio או VS Code.

```shell
dotnet ef migrations add AnimalValidation --project RazorTaba
dotnet ef database update --project RazorTaba
```

## השינויים בקוד

### `RazorTaba/Models/Animal.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Models/Animal.cs
+++ b/RazorTaba/Models/Animal.cs
@@ -1,10 +1,19 @@
+using System.ComponentModel.DataAnnotations;
+
 namespace RazorTaba.Models;

 /// <summary>חיה אחת באתר, הנשמרת כרשומה בטבלת Animals.</summary>
 public class Animal
 {
     public int Id { get; set; }
+    [Required(ErrorMessage = "כתבו שם לחיה"), StringLength(60)]
+    [Display(Name = "שם")]
     public string Name { get; set; } = "";
+    [Required(ErrorMessage = "כתבו תיאור"), StringLength(6000)]
+    [Display(Name = "תיאור ב־Markdown")]
     public string Description { get; set; } = "";
+    [Required, RegularExpression(@"^/images/[A-Za-z0-9_-]+\.(svg|png|jpg|jpeg|webp)$",
+        ErrorMessage = "בחרו קובץ תמונה מקומי, לדוגמה /images/fox.svg")]
+    [Display(Name = "נתיב תמונה")]
     public string ImagePath { get; set; } = "/images/fox.svg";
 }
````

### `RazorTaba/Pages/Animals/Create.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Animals/Create.cshtml` והדביקו את התוכן הבא:

````cshtml
@page
@model RazorTaba.Pages.Animals.CreateModel
@{
    ViewData["Title"] = "הוספת חיה";
}
<h1>הוספת חיה</h1>
<form method="post" class="card p-4 col-lg-8">
    <div asp-validation-summary="All" class="text-danger" role="alert"></div>
    <label asp-for="Animal.Name" class="form-label"></label>
    <input asp-for="Animal.Name" class="form-control mb-3" />
    <label asp-for="Animal.Description" class="form-label"></label>
    <textarea asp-for="Animal.Description" class="form-control mb-3" rows="7"></textarea>
    <label asp-for="Animal.ImagePath" class="form-label"></label>
    <input asp-for="Animal.ImagePath" class="form-control mb-3" dir="ltr" />
    <button class="btn btn-primary" type="submit">הוספת חיה</button>
    <a asp-page="Index" class="mt-3">חזרה לרשימה</a>
</form>
````

### `RazorTaba/Pages/Animals/Create.cshtml.cs`

קובץ חדש. צרו את `RazorTaba/Pages/Animals/Create.cshtml.cs` והדביקו את התוכן הבא:

````csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using RazorTaba.Data;
using RazorTaba.Models;

namespace RazorTaba.Pages.Animals;

/// <summary>מציג טופס ומוסיף רשומה תקינה למסד.</summary>
public class CreateModel(AppDbContext db) : PageModel
{
    [BindProperty]
    public Animal Animal { get; set; } = new();

    public void OnGet() { }

    /// <summary>מקבל את הטופס. מעתיקים רק שדות שהתלמיד רשאי לערוך.</summary>
    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid) return Page();

        var animal = new Animal
        {
            Name = Animal.Name,
            Description = Animal.Description,
            ImagePath = Animal.ImagePath
        };
        db.Animals.Add(animal);
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
@@ -3,11 +3,12 @@
 @{
     ViewData["Title"] = "החיות";
 }
 <h1>החיות שלנו</h1>
+<a asp-page="Create" class="btn btn-primary mb-4">הוספת חיה</a>
 @if (Model.Animals.Count == 0)
 {
-    <p class="alert alert-info">עוד אין חיות. בקרוב נוסיף את הראשונה.</p>
+    <p class="alert alert-info">עוד אין חיות. הוסיפו את הראשונה באמצעות הכפתור.</p>
 }
 <div class="row g-4">
 @foreach (var animal in Model.Animals)
 {
````

<details markdown="1"><summary>קבצי תשתית וקבצים שנוצרו אוטומטית</summary>

הקבצים הבאים נמצאים בקוד השלב. קבצים שנוצרים באמצעות פקודות השלב אין להעתיק ידנית.

- [RazorTaba/Migrations/20260905065718_AnimalValidation.Designer.cs](https://github.com/3strategy/razortaba/blob/c23009a7f8491b6ca49d54b01e7c9bb0001af7b0/RazorTaba/Migrations/20260905065718_AnimalValidation.Designer.cs)
- [RazorTaba/Migrations/20260905065718_AnimalValidation.cs](https://github.com/3strategy/razortaba/blob/c23009a7f8491b6ca49d54b01e7c9bb0001af7b0/RazorTaba/Migrations/20260905065718_AnimalValidation.cs)
- [RazorTaba/Migrations/AppDbContextModelSnapshot.cs](https://github.com/3strategy/razortaba/blob/c23009a7f8491b6ca49d54b01e7c9bb0001af7b0/RazorTaba/Migrations/AppDbContextModelSnapshot.cs)

</details>

## מריצים ובודקים

1. הוסיפו חיה עם שם ותיאור תקינים; היא מופיעה ברשימה.
2. שלחו שם ריק וקבלו שגיאה בלי רשומה חדשה.
3. הזינו כתובת תמונה חיצונית וקבלו הודעה לתיקון.
4. כבו והפעילו את האתר; החיה עדיין מופיעה.

## משימה אישית ובדיקת הבנה

הוסיפו שני פריטים בנושא שלכם. תארו במילים שלכם את ההבדל בין Add לבין SaveChangesAsync. בצעו commits נפרדים למודל ולטופס אם אלו שינויים שלמדתם בנפרד.

{: .box-success}
בסיום שינוי משמעותי: בדקו את ה־diff, בצעו Stage, כתבו הודעת commit שמתארת מה שיניתם, ובצעו Push. ודאו ב־GitHub שהשינוי הגיע. נדרשים לפחות 50 commits משמעותיים לאורך השנה, גם למי שעובד תמיד באותו מחשב נייד.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.

<!-- teacher-notes:start
class_periods: 3
teacher-notes:end -->

<!-- lesson-next:start -->
---

## המשך

- [מעדכנים ומוחקים רשומות]({{ '/taba/11-edit-delete/' | relative_url }})
<!-- lesson-next:end -->
