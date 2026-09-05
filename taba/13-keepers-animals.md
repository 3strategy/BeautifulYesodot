---
layout: page
title: 'מטפל וחיות: קשר אחד־לרבים'
subtitle: Keeper ו־KeeperId, בחירה בטופס והצגת שם המטפל; מניעת מחיקת מטפל עם חיות; המטפל אינו חשבון כניסה
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 130
track: extension
class_periods: 3
published: false
companion_commit: 7445c36e391c81ff2c6516e75690662178c9b259
companion_previous: f1fa21a30fd2d4fbb8d740efa4f32c03ffa651b4
---

{: .box-note}
מוסיפים קשר יחיד בין שתי טבלאות. מטפל יכול לטפל בכמה חיות; חיה מקבלת מטפל אחד בטופס.

[קוד השלב](https://github.com/3strategy/razortaba/tree/7445c36e391c81ff2c6516e75690662178c9b259) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/f1fa21a30fd2d4fbb8d740efa4f32c03ffa651b4...7445c36e391c81ff2c6516e75690662178c9b259)

קישורי GitHub מפנים למאגר פרטי. המורה צריך להעניק הרשאת קריאה; אפשר ללמוד גם מהקוד המופיע כאן.

## מה נלמד

- להבחין בין מזהה זר לבין שם לתצוגה.
- לבחור רשומה קשורה באמצעות select.
- לשדרג מבנה מסד בלי למחוק את העבודה הקודמת.

## מתחילים מסונכרנים

פתחו את תיקיית הפרויקט הנכונה, בדקו שאין שינוי לא שמור והפעילו **Pull**. אם Git מציג התנגשות, פנו למורה; אל תמחקו עבודה ואל תבצעו Force Push.

## 1. שומרים קשר באמצעות מזהה

Keeper הוא אדם או צוות שמטפל בחיה, ואינו משתמש של Identity. שומרים KeeperId ולא מעתיקים את שם המטפל לכל חיה. אם שם המטפל משתנה, הקשר נשאר נכון. Include טוען גם את הרשומה הקשורה. בהמשך אפשר להראות שהצגת שם המטפל דומה לצירוף טבלאות ב־SQL; אין צורך לכתוב JOIN ידנית.

## 2. מה קורה לחיות שכבר קיימות?

לא מוחקים את המסד. המיגרציה יוצרת מטפל לדוגמה בשם צוות המקלט. חיות ישנות נשארות זמנית ללא שיוך ומסומנות כך ברשימה; פותחים אותן בעריכה ובוחרים מטפל. בטפסים חדשים ובעריכה נדרשת בחירה תקינה. לכן KeeperId זמנית nullable במסד אך Required בקלט. זה מאפשר מעבר מדורג בלי להמציא בעלות על נתונים ישנים.

## 3. בוחרים מתוך הנתונים

SelectList מייצר אפשרויות מתוך טבלת Keepers. אחרי שגיאת טופס צריך לטעון שוב את האפשרויות. בדיקת AnyAsync מוודאת שהמזהה אכן קיים גם אם שינו את הבקשה מחוץ לדפדפן. Restrict מונע מחיקת מטפל שיש לו חיות.

### פקודות השלב

הפקודות מורצות משורש המאגר, שבו נמצאת התיקייה `RazorTaba`, בטרמינל של Visual Studio או VS Code.

```shell
dotnet ef migrations add AddKeepers --project RazorTaba
dotnet ef database update --project RazorTaba
```

## השינויים בקוד

### `RazorTaba/Models/Keeper.cs`

קובץ חדש. צרו את `RazorTaba/Models/Keeper.cs` והדביקו את התוכן הבא:

````csharp
using System.ComponentModel.DataAnnotations;

namespace RazorTaba.Models;

/// <summary>מטפל עסקי, שאינו חשבון כניסה לאתר.</summary>
public class Keeper
{
    public int Id { get; set; }
    [Required(ErrorMessage = "כתבו שם מטפל"), StringLength(60)]
    [Display(Name = "שם המטפל")]
    public string Name { get; set; } = "";
}
````

### `RazorTaba/Models/Animal.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Models/Animal.cs
+++ b/RazorTaba/Models/Animal.cs
@@ -5,8 +5,12 @@ namespace RazorTaba.Models;
 /// <summary>חיה אחת באתר, הנשמרת כרשומה בטבלת Animals.</summary>
 public class Animal
 {
     public int Id { get; set; }
+    [Required(ErrorMessage = "בחרו מטפל")]
+    [Display(Name = "מטפל")]
+    public int? KeeperId { get; set; }
+    public Keeper? Keeper { get; set; }
     [Required(ErrorMessage = "כתבו שם לחיה"), StringLength(60)]
     [Display(Name = "שם")]
     public string Name { get; set; } = "";
     [Required(ErrorMessage = "כתבו תיאור"), StringLength(6000)]
````

### `RazorTaba/Data/AppDbContext.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Data/AppDbContext.cs
+++ b/RazorTaba/Data/AppDbContext.cs
@@ -6,5 +6,15 @@ namespace RazorTaba.Data;
 /// <summary>החיבור בין אובייקטי האתר לבין טבלאות מסד הנתונים.</summary>
 public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
 {
     public DbSet<Animal> Animals => Set<Animal>();
+    public DbSet<Keeper> Keepers => Set<Keeper>();
+
+    protected override void OnModelCreating(ModelBuilder modelBuilder)
+    {
+        // השדה נשאר nullable במסד כדי לשמור חיות שנוצרו לפני שיעור הקשרים.
+        modelBuilder.Entity<Animal>().Property(a => a.KeeperId).IsRequired(false);
+        modelBuilder.Entity<Animal>().HasOne(a => a.Keeper).WithMany()
+            .HasForeignKey(a => a.KeeperId).OnDelete(DeleteBehavior.Restrict);
+        modelBuilder.Entity<Keeper>().HasData(new Keeper { Id = 1, Name = "צוות המקלט" });
+    }
 }
````

### `RazorTaba/Pages/Animals/Create.cshtml.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Animals/Create.cshtml.cs
+++ b/RazorTaba/Pages/Animals/Create.cshtml.cs
@@ -1,29 +1,42 @@
 using Microsoft.AspNetCore.Mvc;
 using Microsoft.AspNetCore.Mvc.RazorPages;
+using Microsoft.AspNetCore.Mvc.Rendering;
+using Microsoft.EntityFrameworkCore;
 using RazorTaba.Data;
 using RazorTaba.Models;

 namespace RazorTaba.Pages.Animals;

 /// <summary>מציג טופס ומוסיף רשומה תקינה למסד.</summary>
 public class CreateModel(AppDbContext db) : PageModel
 {
+    public SelectList KeeperOptions { get; private set; } = new(Array.Empty<Keeper>(), "Id", "Name");
+
+    private async Task LoadKeepersAsync()
+    {
+        KeeperOptions = new SelectList(await db.Keepers.AsNoTracking().OrderBy(k => k.Name).ToListAsync(), "Id", "Name");
+    }
+
     [BindProperty]
     public Animal Animal { get; set; } = new();

-    public void OnGet() { }
+    public async Task OnGetAsync() => await LoadKeepersAsync();

     /// <summary>מקבל את הטופס. מעתיקים רק שדות שהתלמיד רשאי לערוך.</summary>
     public async Task<IActionResult> OnPostAsync()
     {
+        await LoadKeepersAsync();
+        if (!await db.Keepers.AnyAsync(k => k.Id == Animal.KeeperId))
+            ModelState.AddModelError("Animal.KeeperId", "בחרו מטפל קיים");
         if (!ModelState.IsValid) return Page();

         var animal = new Animal
         {
             Name = Animal.Name,
             Description = Animal.Description,
-            ImagePath = Animal.ImagePath
+            ImagePath = Animal.ImagePath,
+            KeeperId = Animal.KeeperId
         };
         db.Animals.Add(animal);
         await db.SaveChangesAsync();
         return RedirectToPage("Index");
````

### `RazorTaba/Pages/Animals/Create.cshtml`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Animals/Create.cshtml
+++ b/RazorTaba/Pages/Animals/Create.cshtml
@@ -11,7 +11,11 @@
     <label asp-for="Animal.Description" class="form-label"></label>
     <textarea asp-for="Animal.Description" class="form-control mb-3" rows="7"></textarea>
     <label asp-for="Animal.ImagePath" class="form-label"></label>
     <input asp-for="Animal.ImagePath" class="form-control mb-3" dir="ltr" />
+    <label asp-for="Animal.KeeperId" class="form-label"></label>
+    <select asp-for="Animal.KeeperId" asp-items="Model.KeeperOptions" class="form-select mb-3">
+        <option value="">בחרו מטפל</option>
+    </select>
     <button class="btn btn-primary" type="submit">הוספת חיה</button>
     <a asp-page="Index" class="mt-3">חזרה לרשימה</a>
 </form>
````

### `RazorTaba/Pages/Animals/Edit.cshtml.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Animals/Edit.cshtml.cs
+++ b/RazorTaba/Pages/Animals/Edit.cshtml.cs
@@ -1,34 +1,48 @@
 using Microsoft.AspNetCore.Mvc;
 using Microsoft.AspNetCore.Mvc.RazorPages;
+using Microsoft.AspNetCore.Mvc.Rendering;
+using Microsoft.EntityFrameworkCore;
 using RazorTaba.Data;
 using RazorTaba.Models;

 namespace RazorTaba.Pages.Animals;

 /// <summary>טוען רשומה קיימת ומעדכן רק את שדות התוכן שלה.</summary>
 public class EditModel(AppDbContext db) : PageModel
 {
+    public SelectList KeeperOptions { get; private set; } = new(Array.Empty<Keeper>(), "Id", "Name");
+
+    private async Task LoadKeepersAsync()
+    {
+        KeeperOptions = new SelectList(await db.Keepers.AsNoTracking().OrderBy(k => k.Name).ToListAsync(), "Id", "Name");
+    }
+
     [BindProperty]
     public Animal Animal { get; set; } = new();

     public async Task<IActionResult> OnGetAsync(int id)
     {
         var existing = await db.Animals.FindAsync(id);
         if (existing is null) return NotFound();
         Animal = existing;
+        await LoadKeepersAsync();
         return Page();
     }

     /// <summary>מחפש מחדש לפי הכתובת; Id שהגיע בטופס אינו משנה את הרשומה שנבחרה.</summary>
     public async Task<IActionResult> OnPostAsync(int id)
     {
         var existing = await db.Animals.FindAsync(id);
         if (existing is null) return NotFound();
+        await LoadKeepersAsync();
+        if (!await db.Keepers.AnyAsync(k => k.Id == Animal.KeeperId))
+            ModelState.AddModelError("Animal.KeeperId", "בחרו מטפל קיים");
         if (!ModelState.IsValid) return Page();
         existing.Name = Animal.Name;
         existing.Description = Animal.Description;
         existing.ImagePath = Animal.ImagePath;
+        existing.KeeperId = Animal.KeeperId;
         await db.SaveChangesAsync();
         return RedirectToPage("Index");
     }
 }
````

### `RazorTaba/Pages/Animals/Edit.cshtml`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Animals/Edit.cshtml
+++ b/RazorTaba/Pages/Animals/Edit.cshtml
@@ -11,7 +11,11 @@
     <label asp-for="Animal.Description" class="form-label"></label>
     <textarea asp-for="Animal.Description" class="form-control mb-3" rows="7"></textarea>
     <label asp-for="Animal.ImagePath" class="form-label"></label>
     <input asp-for="Animal.ImagePath" class="form-control mb-3" dir="ltr" />
+    <label asp-for="Animal.KeeperId" class="form-label"></label>
+    <select asp-for="Animal.KeeperId" asp-items="Model.KeeperOptions" class="form-select mb-3">
+        <option value="">בחרו מטפל</option>
+    </select>
     <button class="btn btn-primary" type="submit">שמירת שינויים</button>
     <a asp-page="Index" class="mt-3">חזרה לרשימה</a>
 </form>
````

### `RazorTaba/Pages/Animals/Index.cshtml.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Animals/Index.cshtml.cs
+++ b/RazorTaba/Pages/Animals/Index.cshtml.cs
@@ -12,7 +12,7 @@ public class IndexModel(AppDbContext db) : PageModel

     /// <summary>טוען את הרשומות לפי שם לצורך תצוגה.</summary>
     public async Task OnGetAsync()
     {
-        Animals = await db.Animals.AsNoTracking().OrderBy(a => a.Name).ToListAsync();
+        Animals = await db.Animals.AsNoTracking().Include(a => a.Keeper).OrderBy(a => a.Name).ToListAsync();
     }
 }
````

### `RazorTaba/Pages/Animals/Index.cshtml`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Animals/Index.cshtml
+++ b/RazorTaba/Pages/Animals/Index.cshtml
@@ -16,8 +16,9 @@
         <article class="card h-100">
             <img src="@animal.ImagePath" alt="איור של @animal.Name" class="card-img-top" />
             <div class="card-body">
                 <h2 class="h4">@animal.Name</h2>
+                <p class="text-muted">מטפל: @(animal.Keeper?.Name ?? "טרם שויך מטפל")</p>
                 <a asp-page="Details" asp-route-id="@animal.Id">לסיפור המלא</a>
                 <div class="d-flex gap-3 mt-3">
                     <a asp-page="Edit" asp-route-id="@animal.Id">עריכה</a>
                     <a asp-page="Delete" asp-route-id="@animal.Id">מחיקה</a>
````

<details markdown="1"><summary>קבצי תשתית וקבצים שנוצרו אוטומטית</summary>

הקבצים הבאים נמצאים בקוד השלב. קבצים שנוצרים באמצעות פקודות השלב אין להעתיק ידנית.

- [RazorTaba/Migrations/20260905070131_AddKeepers.Designer.cs](https://github.com/3strategy/razortaba/blob/7445c36e391c81ff2c6516e75690662178c9b259/RazorTaba/Migrations/20260905070131_AddKeepers.Designer.cs)
- [RazorTaba/Migrations/20260905070131_AddKeepers.cs](https://github.com/3strategy/razortaba/blob/7445c36e391c81ff2c6516e75690662178c9b259/RazorTaba/Migrations/20260905070131_AddKeepers.cs)
- [RazorTaba/Migrations/AppDbContextModelSnapshot.cs](https://github.com/3strategy/razortaba/blob/7445c36e391c81ff2c6516e75690662178c9b259/RazorTaba/Migrations/AppDbContextModelSnapshot.cs)

</details>

## מריצים ובודקים

1. חיה ישנה נשארת ברשימה אחרי המיגרציה.
2. ערכו אותה ובחרו צוות המקלט; שם המטפל מוצג.
3. שלחו טופס ללא מטפל וקבלו שגיאה.
4. שתי חיות יכולות להיות משויכות לאותו מטפל.

## משימה אישית ובדיקת הבנה

שרטטו שני מטפלים ושלוש חיות וחברו בקווים. הסבירו מדוע שם המטפל אינו נשמר בתוך שדה התיאור של החיה.

{: .box-success}
בסיום שינוי משמעותי: בדקו את ה־diff, בצעו Stage, כתבו הודעת commit שמתארת מה שיניתם, ובצעו Push. ודאו ב־GitHub שהשינוי הגיע. נדרשים לפחות 50 commits משמעותיים לאורך השנה, גם למי שעובד תמיד באותו מחשב נייד.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.
