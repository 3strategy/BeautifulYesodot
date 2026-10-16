---
layout: page
title: "08 — מחברים דפים ובונים טופס"
subtitle: ניווט ושדות HTML בתוך פרויקט Razor הרץ; תוויות וטופס שעדיין אינו שומר נתונים; בלי להקדים לוגיקת C#
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 9
track: core
published: true
companion_commit: 9e759fba10f1ec17fe4b851ed53e8703d06b644b
companion_previous: fd6683d2c183607a7a808b053c0887256179d66e
---

{: .box-note}
נוסיף דף לאתר ונקשר אליו מהתפריט. נבנה בו טופס עם שדות ותוויות, ונבדוק איך משתמשים בו.

<!-- lesson-back:start -->
[חזרה: 07 — מקום לשיעור נוסף]({{ '/taba/07-reserved/' | relative_url }}){: data-sequence-nav="prev"}
<!-- lesson-back:end -->

<!--
[קוד השלב](https://github.com/3strategy/razortaba/tree/9e759fba10f1ec17fe4b851ed53e8703d06b644b) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/fd6683d2c183607a7a808b053c0887256179d66e...9e759fba10f1ec17fe4b851ed53e8703d06b644b)
-->

## מה נלמד

- לקשר בין דפי האתר.
- לקשר label לשדה באמצעות for ו־id.
- להבדיל בין טופס מעוצב לבין שמירת נתונים.

{: .box-note}
מהשיעור הזה בונים בהדרגה את הפרויקט השנתי שרשמתם בשיעור Git. פתחו את המאגר האישי בשם `FirstNameLastNameRazor` עם הפרטים שלכם, וודאו שהמורה אישר גישה אליו. הוסיפו את הדף החדש לאתר הזה; אין ליצור פרויקט חדש עבור כל שיעור. אם הרישום או השיתוף עדיין לא הושלמו, חזרו ל[06 — נקודת הרישום]({{ '/taba/06-git-github/' | relative_url }}) והשלימו אותה עם המורה.

## מתחילים מסונכרנים

פתחו את תיקיית הפרויקט הנכונה, בדקו שאין שינוי לא שמור והפעילו **Pull**. אם Git מציג התנגשות, פנו למורה; אל תמחקו עבודה ואל תבצעו Force Push.

## דף נוסף, אותו אתר

צרו `Pages/Contact.cshtml`. השורה `@page` מאפשרת להגיע לדף בכתובת `/Contact`. את התפריט עורכים פעם אחת ב־Layout. כרגע מתייחסים ל־asp-page ככתובת לדף בפרויקט; בהמשך נסביר כיצד Razor יוצר href. הכפתור `type="button"` אינו שולח את הטופס. לחצו עליו ובדקו שהדף נשאר במקומו.

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
                         <li class="nav-item">
                             <a class="nav-link text-dark" asp-area="" asp-page="/Privacy">Privacy</a>
                         </li>
+                        <li class="nav-item">
+                            <a class="nav-link text-dark" asp-area="" asp-page="/Contact">קשר</a>
+                        </li>
                     </ul>
                 </div>
             </div>
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

<!-- teacher-notes:start
class_periods: 2
teacher-notes:end -->

<!-- lesson-next:start -->
---

## המשך

- [המשך: 09 — כותבים תוכן ב־Markdown]({{ '/taba/09-markdown/' | relative_url }}){: data-sequence-nav="next"}
<!-- lesson-next:end -->
