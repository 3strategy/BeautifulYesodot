---
layout: page
title: הדף הדינמי הראשון
subtitle: נתונים, תנאים ורשימה בדף; מתחילים לאחר לימוד תנאים ולולאות ב־C#
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 70
track: core
class_periods: 3
published: false
companion_commit: 06e672ffeb1aa04eec860204b36dcdb1fabaca0c
companion_previous: 287c690c1d3d39fd12ae46dd725f134954b5c0b4
---

{: .box-note}
מתחילים רק אחרי תנאים ולולאות ב־C#. הדף מקבל טקסט ורשימה מהשרת ומציג אותם בלי להעתיק שורות HTML.

[קוד השלב](https://github.com/3strategy/razortaba/tree/06e672ffeb1aa04eec860204b36dcdb1fabaca0c) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/287c690c1d3d39fd12ae46dd725f134954b5c0b4...06e672ffeb1aa04eec860204b36dcdb1fabaca0c)

קישורי GitHub מפנים למאגר פרטי. המורה צריך להעניק הרשאת קריאה; אפשר ללמוד גם מהקוד המופיע כאן.

## מה נלמד

- להציג ערך דרך Model.
- לשלב if ו־foreach ב־Razor.
- להבחין בין נתונים בזיכרון לבין נתונים שנשמרו.

## מתחילים מסונכרנים

פתחו את תיקיית הפרויקט הנכונה, בדקו שאין שינוי לא שמור והפעילו **Pull**. אם Git מציג התנגשות, פנו למורה; אל תמחקו עבודה ואל תבצעו Force Push.

## מחברים ידע שכבר יש לנו

`OnGet` רצה כשהדפדפן מבקש את הדף. היא מכינה Greeting ורשימת שמות. `List<string>` היא אוסף של מחרוזות; בפרק זה משתמשים באוסף מוכן וב־foreach, בלי ללמוד את כל פעולות List. מחלקת PageModel מגיעה מהתשתית: כעת קוראים את גוף הפעולה ואת התנאי. הגדרת מחלקה משלנו תגיע אחרי לימוד המחלקות ב־C#.

## השינויים בקוד

### `RazorTaba/Pages/Discover.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Discover.cshtml` והדביקו את התוכן הבא:

````cshtml
@page
@model RazorTaba.Pages.DiscoverModel
@{
    ViewData["Title"] = "מגלים";
}
<h1>@Model.Greeting</h1>
@if (Model.Names.Count == 0)
{
    <p>עדיין אין חיות ברשימה.</p>
}
else
{
    <ul class="list-group">
    @foreach (string name in Model.Names)
    {
        <li class="list-group-item">@name</li>
    }
    </ul>
}
````

### `RazorTaba/Pages/Discover.cshtml.cs`

קובץ חדש. צרו את `RazorTaba/Pages/Discover.cshtml.cs` והדביקו את התוכן הבא:

````csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RazorTaba.Pages;

/// <summary>דוגמה ראשונה להעברת נתונים מ־C# לדף; אין כאן מסד נתונים.</summary>
public class DiscoverModel : PageModel
{
    public string Greeting { get; private set; } = "";
    public List<string> Names { get; private set; } = new();

    /// <summary>מכין נתונים לכל בקשת GET.</summary>
    public void OnGet()
    {
        Greeting = "יש לנו חברים חדשים להכיר";
        Names = new List<string> { "נורי", "תום", "לונה" };
    }
}
````

### `RazorTaba/Pages/Shared/_Layout.cshtml`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Shared/_Layout.cshtml
+++ b/RazorTaba/Pages/Shared/_Layout.cshtml
@@ -13,8 +13,9 @@
             <a class="brand" asp-page="/Index">🐾 החיות שלי</a>
             <a asp-page="/Index">בית</a>
             <a asp-page="/Contact">קשר</a>
             <a asp-page="/Guide">מדריך</a>
+            <a asp-page="/Discover">מגלים</a>
         </nav>
     </header>
     <main class="container py-4">
         @RenderBody()
````

## מריצים ובודקים

1. ב־/Discover מופיעים שלושת השמות.
2. הוסיפו שם ברשימה: מופיעה שורה נוספת בלי להעתיק li.
3. רוקנו זמנית את הרשימה וראו את הודעת המצב הריק. החזירו את הנתונים.

## משימה אישית ובדיקת הבנה

הוסיפו שם והסבירו כמה פעמים גוף הלולאה פועל. הסבירו מדוע שינוי ברשימה זו אינו טופס לשמירת מידע.

{: .box-success}
בסיום שינוי משמעותי: בדקו את ה־diff, בצעו Stage, כתבו הודעת commit שמתארת מה שיניתם, ובצעו Push. ודאו ב־GitHub שהשינוי הגיע. נדרשים לפחות 50 commits משמעותיים לאורך השנה, גם למי שעובד תמיד באותו מחשב נייד.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.
