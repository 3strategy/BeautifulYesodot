---
layout: page
title: מעצבים עם CSS
subtitle: צבעים, ריווח ומחלקות עיצוב; שינוי CSS בסביבת הפיתוח וצפייה מיידית בדפדפן באמצעות רענון אוטומטי או Hot Reload
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 30
track: core
class_periods: 3
published: false
companion_commit: cf47e9a44b213154d234e3797e69eb05fbc4c2a3
companion_previous: 7a9346ec48cfdb1d434e910fbc6076b416cd5828
---

{: .box-note}
לא משנים את התוכן; משנים את המראה באמצעות קובץ CSS משותף. הדפדפן נשאר פתוח לצד העורך.

[קוד השלב](https://github.com/3strategy/razortaba/tree/cf47e9a44b213154d234e3797e69eb05fbc4c2a3) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/7a9346ec48cfdb1d434e910fbc6076b416cd5828...cf47e9a44b213154d234e3797e69eb05fbc4c2a3)

קישורי GitHub מפנים למאגר פרטי. המורה צריך להעניק הרשאת קריאה; אפשר ללמוד גם מהקוד המופיע כאן.

## מה נלמד

- להשתמש במחלקת עיצוב ולזהות selector.
- להבדיל בין color, background ו־padding.
- לראות תוצאה מיידית של שינוי CSS.

## מתחילים מסונכרנים

פתחו את תיקיית הפרויקט הנכונה, בדקו שאין שינוי לא שמור והפעילו **Pull**. אם Git מציג התנגשות, פנו למורה; אל תמחקו עבודה ואל תבצעו Force Push.

## מעבדה קטנה בעיצוב

פתחו `wwwroot/css/site.css`. הפעילו dotnet watch או Hot Reload. שנו רק את `--forest`, שמרו וצפו בתוצאה. אחר כך שנו padding והחזירו לערך נעים לעין. `class="intro"` מקשרת בין אזור HTML לכלל `.intro`. מחלקת CSS היא שם של כלל עיצוב; היא אינה מחלקה בשפת C#. משתני CSS מרכזים את פלטת הצבעים במקום אחד.

## השינויים בקוד

### `RazorTaba/Pages/Index.cshtml`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Index.cshtml
+++ b/RazorTaba/Pages/Index.cshtml
@@ -2,8 +2,9 @@
 @model IndexModel
 @{
     ViewData["Title"] = "בית";
 }
+<section class="intro">
 <h1>החיות שלי</h1>
 <p>ברוכים הבאים לפינה שלי בטבע. נכיר חיות, נקרא עליהן ונלמד איך מטפלים בהן.</p>
 <h2>מה תמצאו כאן?</h2>
 <ul>
@@ -12,4 +13,5 @@
     <li>המלצות שלי להיכרות מקרוב</li>
 </ul>
 <a href="https://he.wikipedia.org/wiki/שועל">לקריאה על שועלים</a>
 <img src="~/images/fox.svg" alt="איור של שועל" width="180" />
+</section>
````

### `RazorTaba/wwwroot/css/site.css`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/wwwroot/css/site.css
+++ b/RazorTaba/wwwroot/css/site.css
@@ -1,2 +1,14 @@
-/* נשנה את העיצוב בשיעור CSS. */
-body { font-family: Arial, sans-serif; }
+:root {
+    --forest: #173f35;
+    --leaf: #4d7058;
+    --paper: #f7f5ed;
+    --accent: #e6b66b;
+}
+body { margin: 0; font-family: Arial, sans-serif; color: var(--forest); background: var(--paper); line-height: 1.7; }
+a { color: var(--forest); text-underline-offset: .25em; }
+.site-header { background: #fff; border-bottom: 1px solid #d8dfd3; }
+.brand { font-size: 1.35rem; font-weight: 800; margin-inline-end: auto; text-decoration: none; }
+.intro { background: var(--forest); color: #fff; border-radius: 1.5rem; padding: 3rem; }
+.intro h1 { font-size: clamp(2rem, 6vw, 4rem); font-weight: 800; }
+.intro a { color: var(--accent); }
+footer { border-top: 1px solid #d8dfd3; margin-top: 3rem; color: var(--leaf); }
````

## מריצים ובודקים

1. הרקע בהיר ואזור הפתיחה כהה.
2. שינוי --forest משנה את העיצוב בלי לשנות HTML.
3. במסך צר הכותרת אינה חורגת.

## משימה אישית ובדיקת הבנה

בחרו פלטה משלכם ושנו ריווח אחד. הסבירו איזה selector משפיע על הכותרת ואיזה על הקישורים. בצעו commit נפרד לשינוי הצבעים.

{: .box-success}
בסיום שינוי משמעותי: בדקו את ה־diff, בצעו Stage, כתבו הודעת commit שמתארת מה שיניתם, ובצעו Push. ודאו ב־GitHub שהשינוי הגיע. נדרשים לפחות 50 commits משמעותיים לאורך השנה, גם למי שעובד תמיד באותו מחשב נייד.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.
