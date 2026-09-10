---
layout: page
title: מכרטיס HTML לאובייקט Animal
subtitle: מגדירים תכונות של חיה ומציגים אובייקטים בכרטיסים
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 80
track: core
published: true
companion_commit: fa36fed1fc7b6642eae874a816cf782b2577e68f
companion_previous: 98ed9acb039c2d584629f2f45eeb1b0660e931f2
---

{: .box-note}
נגדיר מחלקת Animal עם שם, תיאור ותמונה. ניצור ממנה אובייקטים ונציג כרטיס באתר לכל חיה.

<!-- lesson-back:start -->
[חזרה: הדף הדינמי הראשון]({{ '/taba/07-first-dynamic-page/' | relative_url }}){: data-sequence-nav="prev"}
<!-- lesson-back:end -->

{% include taba-private-links-visibility.html %}
{% if taba_show_private_links %}
[קוד השלב](https://github.com/3strategy/razortaba/tree/fa36fed1fc7b6642eae874a816cf782b2577e68f) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/98ed9acb039c2d584629f2f45eeb1b0660e931f2...fa36fed1fc7b6642eae874a816cf782b2577e68f)
{% endif %}

## מה נלמד

- להגדיר תכונות של Animal.
- ליצור מופע ולאתחל אותו.
- להציג כמה תכונות של אותו אובייקט.

## מתחילים מסונכרנים

פתחו את תיקיית הפרויקט הנכונה, בדקו שאין שינוי לא שמור והפעילו **Pull**. אם Git מציג התנגשות, פנו למורה; אל תמחקו עבודה ואל תבצעו Force Push.

## מה שייך לחיה אחת?

שם, תיאור ונתיב תמונה שייכים לאותה חיה. Id מזהה רשומה, ואינו המיקום שלה בלולאה. התכונות עם get ו־set מאפשרות לקרוא ולעדכן ערכים. הערכים ההתחלתיים מונעים null במחרוזות. כרגע OnGet יוצרת דוגמה בכל בקשה: זו עדיין אינה שמירה.

## השינויים בקוד

### `RazorTaba/Models/Animal.cs`

קובץ חדש. צרו את `RazorTaba/Models/Animal.cs` והדביקו את התוכן הבא:

````csharp
namespace RazorTaba.Models;

/// <summary>חיה אחת באתר. בשלב זה האובייקטים קיימים רק בזיכרון.</summary>
public class Animal
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public string ImagePath { get; set; } = "/images/fox.svg";
}
````

### `RazorTaba/Pages/Animals/Index.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Animals/Index.cshtml` והדביקו את התוכן הבא:

````cshtml
@page
@model RazorTaba.Pages.Animals.IndexModel
@{
    ViewData["Title"] = "החיות";
}
<h1>החיות שלנו</h1>
@if (Model.Animals.Count == 0)
{
    <p class="alert alert-info">עוד אין חיות. בקרוב נוסיף את הראשונה.</p>
}
<div class="row g-4">
@foreach (var animal in Model.Animals)
{
    <div class="col-md-6 col-lg-4">
        <article class="card h-100">
            <img src="@animal.ImagePath" alt="איור של @animal.Name" class="card-img-top" />
            <div class="card-body">
                <h2 class="h4">@animal.Name</h2>
                <p>@animal.Description</p>
            </div>
        </article>
    </div>
}
</div>
````

### `RazorTaba/Pages/Animals/Index.cshtml.cs`

קובץ חדש. צרו את `RazorTaba/Pages/Animals/Index.cshtml.cs` והדביקו את התוכן הבא:

````csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using RazorTaba.Models;

namespace RazorTaba.Pages.Animals;

/// <summary>מציג כרטיסים מתוך אובייקטים של Animal.</summary>
public class IndexModel : PageModel
{
    public List<Animal> Animals { get; private set; } = new();

    /// <summary>יוצר אובייקט לדוגמה לכל בקשה, ללא שמירה.</summary>
    public void OnGet()
    {
        Animals = new List<Animal>
        {
            new Animal { Id = 1, Name = "נורי", Description = "שועל סקרן שאוהב ללמוד." }
        };
    }
}
````

### `RazorTaba/Pages/Shared/_Layout.cshtml`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Shared/_Layout.cshtml
+++ b/RazorTaba/Pages/Shared/_Layout.cshtml
@@ -14,8 +14,9 @@
             <a asp-page="/Index">בית</a>
             <a asp-page="/Contact">קשר</a>
             <a asp-page="/Guide">מדריך</a>
             <a asp-page="/Discover">מגלים</a>
+            <a asp-page="/Animals/Index">החיות</a>
         </nav>
     </header>
     <main class="container py-4">
         @RenderBody()
````

## מריצים ובודקים

1. ב־/Animals מופיע כרטיס נורי.
2. הוסיפו אובייקט שני וקבלו כרטיס שני.
3. הסבירו מה ההבדל בין Animal לבין animal שב־foreach.

## משימה אישית ובדיקת הבנה

התאימו את השם והתיאור לנושא שלכם. שימרו בשלב זה את מבנה ארבע התכונות כדי שהמעבר למסד יהיה קטן וברור.

{: .box-success}
בסיום שינוי משמעותי: בדקו את ה־diff, בצעו Stage, כתבו הודעת commit שמתארת מה שיניתם, ובצעו Push. ודאו ב־GitHub שהשינוי הגיע. נדרשים לפחות 50 commits משמעותיים לאורך השנה, גם למי שעובד תמיד באותו מחשב נייד.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.

<!-- teacher-notes:start
class_periods: 3

לתזמן לאחר היכרות עם מחלקות ותכונות ב־C#.
teacher-notes:end -->

<!-- lesson-next:start -->
---

## המשך

- [הנתונים נשמרים עם EF Core ו־SQLite]({{ '/taba/09-ef-sqlite/' | relative_url }}){: data-sequence-nav="next"}
<!-- lesson-next:end -->
