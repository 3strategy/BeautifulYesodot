---
layout: page
title: הנתונים נשמרים עם EF Core ו־SQLite
subtitle: מחלקה, DbSet, מיגרציה וטבלה; רשימת חיות הנשמרת לאחר הפעלה מחדש
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 90
track: core
published: true
companion_commit: b5f18f08235b92724f86fba55cff23d9749b2818
companion_previous: fa36fed1fc7b6642eae874a816cf782b2577e68f
---

{: .box-note}
נחבר את מחלקת Animal למסד SQLite באמצעות EF Core. ניצור טבלה ונציג באתר את הרשומות שנקראות ממנה.

<!-- lesson-back:start -->
[חזרה: מכרטיס HTML לאובייקט Animal]({{ '/taba/08-animal-model/' | relative_url }}){: data-sequence-nav="prev"}
<!-- lesson-back:end -->

{% include taba-private-links-visibility.html %}
{% if taba_show_private_links %}
[קוד השלב](https://github.com/3strategy/razortaba/tree/b5f18f08235b92724f86fba55cff23d9749b2818) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/fa36fed1fc7b6642eae874a816cf782b2577e68f...b5f18f08235b92724f86fba55cff23d9749b2818)
{% endif %}

## מה נלמד

- להסביר את הרצף Animal → DbSet → מיגרציה → טבלה.
- ליצור מסד ללא התקנת שרת SQL.
- לקרוא רשומות ולהבחין בין רשימה ריקה לבין תקלה.

## מתחילים מסונכרנים

פתחו את תיקיית הפרויקט הנכונה, בדקו שאין שינוי לא שמור והפעילו **Pull**. אם Git מציג התנגשות, פנו למורה; אל תמחקו עבודה ואל תבצעו Force Push.

## מה התפקיד של כל חלק?

Animal מתארת רשומה. AppDbContext מחבר את EF לטבלאות. DbSet הוא הגישה לטבלת Animals. מיגרציה היא תיאור שינוי במבנה; `database update` מחילה אותו על המסד המקומי. אין להשתמש ב־EnsureCreated לצד migrations.

הפרמטר `db` מספק לדף גישה למסד, לפי ההגדרה ב־Program. `db.Animals` פונה לרשומות החיות. `await` מחכה לסיום הקריאה לפני הצגת התוצאה. עקבו אחר הנתונים משורת הקריאה ועד ללולאה שבדף.

## מריצים לפי הסדר

הפקודות יוצרות את המיגרציה אצלכם. קובצי המיגרציות נכנסים ל־Git; App.db אינו נכנס. בחזרה מהבית מבצעים Pull ואז `dotnet ef database update --project RazorTaba` אם התקבלו מיגרציות חדשות. אין לשתף מסד פעיל בין מחשבים דרך Git.

### פקודות השלב

הפקודות מורצות משורש המאגר, שבו נמצאת התיקייה `RazorTaba`, בטרמינל של Visual Studio או VS Code.

```shell
dotnet add RazorTaba package Microsoft.EntityFrameworkCore.Sqlite --version 10.0.10
dotnet add RazorTaba package Microsoft.EntityFrameworkCore.Design --version 10.0.10
dotnet add RazorTaba package SQLitePCLRaw.bundle_e_sqlite3 --version 3.0.5
dotnet new tool-manifest
dotnet tool install dotnet-ef --version 10.0.10
dotnet ef migrations add InitialAnimals --project RazorTaba
dotnet ef database update --project RazorTaba
```

{: .box-note}
הפקודה `migrations add InitialAnimals` יוצרת בתיקיית `Migrations` שני קבצים ששמותיהם מתחילים בתאריך ובשעה ומסתיימים ב־`_InitialAnimals.cs` וב־`_InitialAnimals.Designer.cs`. המספר בתחילת השם יהיה שונה בכל יצירה — זה תקין. השאירו את השמות ואת מזהה המיגרציה כפי שנוצרו אצלכם; אין לשנות אותם כדי להתאים לצילום או לדוגמה. בנוסף נוצר `AppDbContextModelSnapshot.cs`, שמתאר את מבנה המודל הנוכחי.

לאחר `database update`, בדקו שנוצר `App.db` בתיקיית הפרויקט. שמרו ב־Git את קובצי `Migrations`; מסד הנתונים המקומי נשאר מחוץ למאגר, לפי `.gitignore`.

## השינויים בקוד

### `RazorTaba/Data/AppDbContext.cs`

קובץ חדש. צרו את `RazorTaba/Data/AppDbContext.cs` והדביקו את התוכן הבא:

````csharp
using Microsoft.EntityFrameworkCore;
using RazorTaba.Models;

namespace RazorTaba.Data;

/// <summary>החיבור בין אובייקטי האתר לבין טבלאות מסד הנתונים.</summary>
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Animal> Animals => Set<Animal>();
}
````

### `RazorTaba/Program.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Program.cs
+++ b/RazorTaba/Program.cs
@@ -1,8 +1,15 @@
+using Microsoft.EntityFrameworkCore;
+using RazorTaba.Data;
+
 var builder = WebApplication.CreateBuilder(args);
 builder.Services.AddRazorPages();
 builder.Services.AddSingleton<RazorTaba.Services.MarkdownRenderer>();

+// נתיב יחסי מחושב תמיד מתיקיית הפרויקט, גם כשמריצים פקודה משורש המאגר.
+string databasePath = Path.Combine(builder.Environment.ContentRootPath, "App.db");
+builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite($"Data Source={databasePath}"));
+
 var app = builder.Build();
 if (!app.Environment.IsDevelopment())
 {
     app.UseExceptionHandler("/Error");
````

### `RazorTaba/Pages/Animals/Index.cshtml.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Animals/Index.cshtml.cs
+++ b/RazorTaba/Pages/Animals/Index.cshtml.cs
@@ -1,19 +1,18 @@
 using Microsoft.AspNetCore.Mvc.RazorPages;
+using Microsoft.EntityFrameworkCore;
+using RazorTaba.Data;
 using RazorTaba.Models;

 namespace RazorTaba.Pages.Animals;

-/// <summary>מציג כרטיסים מתוך אובייקטים של Animal.</summary>
-public class IndexModel : PageModel
+/// <summary>קורא חיות מהמסד בלי לשנות אותן.</summary>
+public class IndexModel(AppDbContext db) : PageModel
 {
     public List<Animal> Animals { get; private set; } = new();

-    /// <summary>יוצר אובייקט לדוגמה לכל בקשה, ללא שמירה.</summary>
-    public void OnGet()
+    /// <summary>טוען את הרשומות לפי שם לצורך תצוגה.</summary>
+    public async Task OnGetAsync()
     {
-        Animals = new List<Animal>
-        {
-            new Animal { Id = 1, Name = "נורי", Description = "שועל סקרן שאוהב ללמוד." }
-        };
+        Animals = await db.Animals.AsNoTracking().OrderBy(a => a.Name).ToListAsync();
     }
 }
````

### `RazorTaba/Models/Animal.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Models/Animal.cs
+++ b/RazorTaba/Models/Animal.cs
@@ -1,7 +1,7 @@
 namespace RazorTaba.Models;

-/// <summary>חיה אחת באתר. בשלב זה האובייקטים קיימים רק בזיכרון.</summary>
+/// <summary>חיה אחת באתר, הנשמרת כרשומה בטבלת Animals.</summary>
 public class Animal
 {
     public int Id { get; set; }
     public string Name { get; set; } = "";
````

{% if taba_show_private_links %}
<details markdown="1"><summary>קבצי תשתית וקבצים שנוצרו אוטומטית</summary>

הקבצים הבאים נמצאים בקוד השלב. קבצים שנוצרים באמצעות פקודות השלב אין להעתיק ידנית.

- [RazorTaba/Migrations/20260905065453_InitialAnimals.Designer.cs](https://github.com/3strategy/razortaba/blob/b5f18f08235b92724f86fba55cff23d9749b2818/RazorTaba/Migrations/20260905065453_InitialAnimals.Designer.cs)
- [RazorTaba/Migrations/20260905065453_InitialAnimals.cs](https://github.com/3strategy/razortaba/blob/b5f18f08235b92724f86fba55cff23d9749b2818/RazorTaba/Migrations/20260905065453_InitialAnimals.cs)
- [RazorTaba/Migrations/AppDbContextModelSnapshot.cs](https://github.com/3strategy/razortaba/blob/b5f18f08235b92724f86fba55cff23d9749b2818/RazorTaba/Migrations/AppDbContextModelSnapshot.cs)
- [RazorTaba/RazorTaba.csproj](https://github.com/3strategy/razortaba/blob/b5f18f08235b92724f86fba55cff23d9749b2818/RazorTaba/RazorTaba.csproj)
- [dotnet-tools.json](https://github.com/3strategy/razortaba/blob/b5f18f08235b92724f86fba55cff23d9749b2818/dotnet-tools.json)

</details>
{% endif %}

## מריצים ובודקים

1. הפקודה database update מסתיימת ללא שגיאה.
2. ב־/Animals מופיע מצב ריק ולא שגיאת שרת.
3. נוצר App.db בתיקיית RazorTaba והוא אינו מופיע לשמירה ב־Git.
4. שמרו את קובצי המיגרציה ב־commit.

## משימה אישית ובדיקת הבנה

ציירו ב־Mermaid את הדרך ממחלקה לטבלה ולדף. הסבירו מה עובר ב־Git ומה נוצר בכל מחשב בנפרד.

{: .box-success}
בסיום שינוי משמעותי: בדקו את ה־diff, בצעו Stage, כתבו הודעת commit שמתארת מה שיניתם, ובצעו Push. ודאו ב־GitHub שהשינוי הגיע. נדרשים לפחות 50 commits משמעותיים לאורך השנה, גם למי שעובד תמיד באותו מחשב נייד.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.

<!-- teacher-notes:start
class_periods: 4
teacher-notes:end -->

<!-- lesson-next:start -->
---

## המשך

- [מוסיפים חיה ובודקים קלט]({{ '/taba/10-create-validation/' | relative_url }}){: data-sequence-nav="next"}
<!-- lesson-next:end -->
