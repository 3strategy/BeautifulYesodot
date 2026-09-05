---
layout: page
title: מחברים דפים ובונים טופס
subtitle: ניווט ושדות HTML בתוך פרויקט Razor הרץ; תוויות וטופס שעדיין אינו שומר נתונים; בלי להקדים לוגיקת C#
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 50
track: core
class_periods: 2
published: false
companion_commit: 4519e73eaadd6ca8ac11534db6f79937b8c7561d
companion_previous: 1f7107067a9abfbfe07a10bbea700175ed3a659d
---

{: .box-note}
מוסיפים דף בתוך הפרויקט הקיים. הטופס עוזר ללמוד שדות ותוויות; שמירת נתונים תגיע בפרק CRUD.

[קוד השלב](https://github.com/3strategy/razortaba/tree/4519e73eaadd6ca8ac11534db6f79937b8c7561d) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/1f7107067a9abfbfe07a10bbea700175ed3a659d...4519e73eaadd6ca8ac11534db6f79937b8c7561d)

קישורי GitHub מפנים למאגר פרטי. המורה צריך להעניק הרשאת קריאה; אפשר ללמוד גם מהקוד המופיע כאן.

## מה נלמד

- לקשר בין דפי האתר.
- לקשר label לשדה באמצעות for ו־id.
- להבדיל בין טופס מעוצב לבין שמירת נתונים.

## מתחילים מסונכרנים

פתחו את תיקיית הפרויקט הנכונה, בדקו שאין שינוי לא שמור והפעילו **Pull**. אם Git מציג התנגשות, פנו למורה; אל תמחקו עבודה ואל תבצעו Force Push.

## דף נוסף, אותו אתר

צרו `Pages/Contact.cshtml`. השורה `@page` מאפשרת להגיע לדף בכתובת `/Contact`. את התפריט עורכים פעם אחת ב־Layout. כרגע מתייחסים ל־asp-page ככתובת לדף בפרויקט; בהמשך נסביר כיצד Razor יוצר href. הכפתור הוא type=button בכוונה, כדי לא להעמיד פנים שנשלח מידע.

## השינויים בקוד

### `RazorTaba/Pages/Contact.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Contact.cshtml` והדביקו את התוכן הבא:

````cshtml
@page
@{
    ViewData["Title"] = "נשארים בקשר";
}
<h1>נשארים בקשר</h1>
<p class="alert alert-info">זהו תרגול של טופס HTML. הפרטים עדיין אינם נשלחים או נשמרים.</p>
<form class="card p-4 col-lg-7">
    <label for="visitor" class="form-label">השם שלכם</label>
    <input id="visitor" class="form-control mb-3" required maxlength="50" />
    <label for="topic" class="form-label">על מה תרצו לקרוא?</label>
    <textarea id="topic" class="form-control mb-3" rows="4"></textarea>
    <button type="button" class="btn btn-primary">כפתור לדוגמה — עדיין לא שולח</button>
</form>
````

### `RazorTaba/Pages/Shared/_Layout.cshtml`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Shared/_Layout.cshtml
+++ b/RazorTaba/Pages/Shared/_Layout.cshtml
@@ -11,8 +11,9 @@
     <header class="site-header">
         <nav class="container py-3 d-flex gap-3 align-items-center flex-wrap" aria-label="ניווט ראשי">
             <a class="brand" asp-page="/Index">🐾 החיות שלי</a>
             <a asp-page="/Index">בית</a>
+            <a asp-page="/Contact">קשר</a>
         </nav>
     </header>
     <main class="container py-4">
         @RenderBody()
````

## מריצים ובודקים

1. קישור קשר מוביל לדף החדש.
2. לחיצה על תווית השם מעבירה את המיקוד לשדה.
3. אין שליחת מידע כשלוחצים על הכפתור.

## משימה אישית ובדיקת הבנה

הוסיפו שדה רלוונטי לנושא שלכם עם תווית מתאימה. הסבירו מדוע טופס יפה אינו הוכחה שהנתונים נשמרים.

{: .box-success}
בסיום שינוי משמעותי: בדקו את ה־diff, בצעו Stage, כתבו הודעת commit שמתארת מה שיניתם, ובצעו Push. ודאו ב־GitHub שהשינוי הגיע. נדרשים לפחות 50 commits משמעותיים לאורך השנה, גם למי שעובד תמיד באותו מחשב נייד.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.
