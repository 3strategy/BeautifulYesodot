---
layout: page
title: "04 — מעצבים עם CSS"
subtitle: צבעים, ריווח ומחלקות עיצוב; שינוי CSS בסביבת הפיתוח וצפייה מיידית בדפדפן באמצעות רענון אוטומטי או Hot Reload
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 5
track: core
published: true
companion_commit: cf47e9a44b213154d234e3797e69eb05fbc4c2a3
companion_previous: 7a9346ec48cfdb1d434e910fbc6076b416cd5828
---

{: .box-note}
נעצב את האתר באמצעות CSS: נשנה צבעים וריווח, נוסיף מחלקת עיצוב ונראה את התוצאה בדפדפן אחרי כל שינוי.

<!-- lesson-back:start -->
[חזרה: 03 — האתר הופך לשלי]({{ '/taba/03-my-theme/' | relative_url }}){: data-sequence-nav="prev"}
<!-- lesson-back:end -->

<!--
[קוד השלב](https://github.com/3strategy/razortaba/tree/cf47e9a44b213154d234e3797e69eb05fbc4c2a3) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/7a9346ec48cfdb1d434e910fbc6076b416cd5828...cf47e9a44b213154d234e3797e69eb05fbc4c2a3)
-->

## מה נלמד

- להשתמש במחלקת עיצוב ולזהות selector.
- להבדיל בין color, background ו־padding.
- לראות תוצאה מיידית של שינוי CSS.

{: .box-note}
זה עדיין שלב התנסות לפני רישום הפרויקט השנתי. אפשר לעבוד בניסוי שבחרתם או ליצור ניסוי חדש בתיקייה נפרדת בעזרת [02 — מדריכי ההקמה]({{ '/taba/02-development-environment/' | relative_url }}). אם מתחילים מחדש, השלימו בו את שינויי השיעורים הקודמים הדרושים לדוגמאות שלפניכם. שמרו את הניסויים הקודמים; עדיין אין צורך לפרסם ל־GitHub.

## פותחים ומריצים

פתחו את תיקיית הפרויקט שבה עבדתם, שמרו את הקבצים והריצו את האתר. בדקו שהשינוי מהמפגש הקודם מופיע לפני שמנסים שינוי חדש.

## מעבדה קטנה בעיצוב

פתחו `wwwroot/css/site.css`. השאירו את כללי התבנית והוסיפו בסוף את כללי העיצוב שמופיעים בהמשך. הפעילו dotnet watch או Hot Reload. לאחר ההוספה שנו רק את `--forest`, שמרו וצפו בתוצאה. אחר כך שנו padding והחזירו לערך נעים לעין. `class="intro"` מקשרת בין אזור HTML לכלל `.intro`. מחלקת CSS היא שם של כלל עיצוב; היא אינה מחלקה בשפת C#. משתני CSS מרכזים את פלטת הצבעים במקום אחד.

## שתי דרכים להשתמש במחלקות עיצוב

`class="intro"` מפנה לכלל `.intro` שנכתוב ב־`site.css`. לעומתו `class="text-center"` או `class="container"` מפנה למחלקות Bootstrap שכבר הגיעו עם התבנית. אפשר לשלב כמה שמות באותו `class`, עם רווח ביניהם. בשיעור הבא נשתמש במחלקות האלה לבניית עמודות וכרטיסים.

## השינויים בקוד

### `RazorTaba/Pages/Index.cshtml`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
 @model IndexModel
 @{
     ViewData["Title"] = "בית";
 }
+<section class="intro">
 <h1>החיות שלי</h1>
 <p>ברוכים הבאים לפינה שלי בטבע. נכיר חיות, נקרא עליהן ונלמד איך מטפלים בהן.</p>
 <h2>מה תמצאו כאן?</h2>
 <ul>
     <li>חיות שיש להן סיפור</li>
     <li>מדריכי טיפול קצרים</li>
     <li>המלצות שלי להיכרות מקרוב</li>
 </ul>
 <a href="https://he.wikipedia.org/wiki/שועל">לקריאה על שועלים</a>
 <img src="~/images/fox.svg" alt="איור של שועל" width="180" />
+</section>
````

### `RazorTaba/wwwroot/css/site.css`

הוסיפו בסוף הקובץ את הכללים הבאים, אחרי הסוגר המסולסל האחרון. השאירו את כללי התבנית במקומם; סימני `+` מציינים שורות חדשות ואינם חלק מהקוד שמקלידים:

````diff
+:root {
+    --forest: #173f35;
+    --leaf: #4d7058;
+    --paper: #f7f5ed;
+    --accent: #e6b66b;
+}
+body { font-family: Arial, sans-serif; color: var(--forest); background: var(--paper); line-height: 1.7; }
+a { color: var(--forest); text-underline-offset: .25em; }
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

בחרו פלטה משלכם ושנו ריווח אחד. הסבירו איזה selector משפיע על הכותרת ואיזה על הקישורים. שמרו ובדקו את שינוי הצבעים לפני שמנסים שינוי נוסף.

{: .box-success}
בסיום שינוי: שמרו את הקבצים, בדקו את האתר בדפדפן והסבירו מה שיניתם. אפשר להמשיך בניסוי הזה או לתרגל שוב בפרויקט נפרד; רשמו היכן שמרתם כל ניסוי.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.

<!-- teacher-notes:start
class_periods: 3
teacher-notes:end -->

<!-- lesson-next:start -->
---

## המשך

- [המשך: 05 — אתר שנראה טוב עם Bootstrap]({{ '/taba/05-bootstrap/' | relative_url }}){: data-sequence-nav="next"}
<!-- lesson-next:end -->
