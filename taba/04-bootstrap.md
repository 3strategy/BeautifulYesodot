---
layout: page
title: אתר שנראה טוב עם Bootstrap
subtitle: כרטיסים, רשת והתאמה לנייד; בסיס עובד גם למי שטרם השלים עיצוב אישי
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 40
track: core
class_periods: 3
published: false
companion_commit: 98aeb85bf53ca294a7a42f6f9b75eec36f054250
companion_previous: c80e5ea647000b07646c97f41b4ab091327319f8
---

{: .box-note}
כבר יש אתר שאפשר להציג בגאווה: פתיחה בולטת, כרטיסים ועיצוב שמתאים לטלפון. Bootstrap נותן שמות מוכנים לכללי עיצוב.

[קוד השלב](https://github.com/3strategy/razortaba/tree/98aeb85bf53ca294a7a42f6f9b75eec36f054250) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/c80e5ea647000b07646c97f41b4ab091327319f8...98aeb85bf53ca294a7a42f6f9b75eec36f054250)

קישורי GitHub מפנים למאגר פרטי. המורה צריך להעניק הרשאת קריאה; אפשר ללמוד גם מהקוד המופיע כאן.

## מה נלמד

- להשתמש ב־container, row ו־col.
- להרכיב card וכפתור.
- לשלב מחלקות Bootstrap עם CSS אישי.

## מתחילים מסונכרנים

פתחו את תיקיית הפרויקט הנכונה, בדקו שאין שינוי לא שמור והפעילו **Pull**. אם Git מציג התנגשות, פנו למורה; אל תמחקו עבודה ואל תבצעו Force Push.

## בונים בשלושה אזורים

אזור הפתיחה משתמש בשתי עמודות במסך גדול. אזור הכרטיסים משתמש בשלוש עמודות מ־md ומעלה; במסך צר הכרטיסים נערמים. `g-4` קובע רווחים ו־`h-100` משווה גובה. אל תשננו את כל Bootstrap: בחרו בכל פעם מחלקה אחת ושנו אותה כדי לראות מה היא עושה. קובצי Bootstrap מגיעים עם תבנית הפרויקט; אין צורך להעתיק עיצוב של אתר שלם.

## השינויים בקוד

### `RazorTaba/Pages/Index.cshtml`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Index.cshtml
+++ b/RazorTaba/Pages/Index.cshtml
@@ -2,16 +2,24 @@
 @model IndexModel
 @{
     ViewData["Title"] = "בית";
 }
-<section class="intro">
-<h1>החיות שלי</h1>
-<p>ברוכים הבאים לפינה שלי בטבע. נכיר חיות, נקרא עליהן ונלמד איך מטפלים בהן.</p>
-<h2>מה תמצאו כאן?</h2>
-<ul>
-    <li>חיות שיש להן סיפור</li>
-    <li>מדריכי טיפול קצרים</li>
-    <li>המלצות שלי להיכרות מקרוב</li>
-</ul>
-<a href="https://he.wikipedia.org/wiki/שועל">לקריאה על שועלים</a>
-<img src="~/images/fox.svg" alt="איור של שועל" width="180" />
+<section class="intro row g-4 align-items-center mx-0">
+    <div class="col-lg-8">
+        <p class="eyebrow">הפינה שלי בטבע</p>
+        <h1>לכל חיה יש סיפור.<br />בואו להכיר.</h1>
+        <p class="lead">מגלים, מתעדים ולומדים לטפל. אתר קטן עם מקום גדול לסקרנות.</p>
+        <a class="btn btn-light btn-lg" href="#meet">מכירים את החיות ↓</a>
+    </div>
+    <div class="col-lg-4 text-center">
+        <img class="hero-image" src="~/images/fox.svg" alt="איור שועל כתום" />
+    </div>
+</section>
+<section id="meet" class="py-5">
+    <p class="eyebrow">נפגשים מקרוב</p>
+    <h2 class="mb-4">שלוש חיות, שלושה סיפורים</h2>
+    <div class="row g-4">
+        <div class="col-md-4"><article class="card h-100"><div class="animal-art" aria-hidden="true">🦊</div><div class="card-body"><h3>נורי השועל</h3><p>סקרן, זריז ותמיד מוכן לגלות משהו חדש.</p></div></article></div>
+        <div class="col-md-4"><article class="card h-100"><div class="animal-art mint" aria-hidden="true">🐢</div><div class="card-body"><h3>תום הצב</h3><p>לא ממהר לשום מקום. יש הרבה מה ללמוד ממנו.</p></div></article></div>
+        <div class="col-md-4"><article class="card h-100"><div class="animal-art lilac" aria-hidden="true">🦉</div><div class="card-body"><h3>לונה הינשופה</h3><p>כשהשמש יורדת, הסיפור שלה רק מתחיל.</p></div></article></div>
+    </div>
 </section>
````

### `RazorTaba/wwwroot/css/site.css`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/wwwroot/css/site.css
+++ b/RazorTaba/wwwroot/css/site.css
@@ -11,4 +11,14 @@ a { color: var(--forest); text-underline-offset: .25em; }
 .intro { background: var(--forest); color: #fff; border-radius: 1.5rem; padding: 3rem; }
 .intro h1 { font-size: clamp(2rem, 6vw, 4rem); font-weight: 800; }
 .intro a { color: var(--accent); }
 footer { border-top: 1px solid #d8dfd3; margin-top: 3rem; color: var(--leaf); }
+
+.eyebrow { letter-spacing: .08em; font-weight: 700; font-size: .9rem; }
+.hero-image { width: min(100%, 17rem); transform: rotate(-5deg); border-radius: 2rem; }
+.card { border: 1px solid #d8dfd3; border-radius: 1.25rem; overflow: hidden; box-shadow: 0 .4rem 1.5rem #173f3508; }
+.animal-art { background: #fae5d3; font-size: 5rem; text-align: center; padding: 1.5rem; }
+.mint { background: #e1e9d9; }
+.lilac { background: #ebe3ee; }
+.btn { border-radius: .75rem; }
+.btn-primary { background: var(--forest); border-color: var(--forest); }
+.btn-primary:hover { background: var(--leaf); border-color: var(--leaf); }
````

## מריצים ובודקים

1. במסך רחב רואים שלושה כרטיסים בשורה.
2. ברוחב טלפון הכרטיסים נערמים בלי גלילה אופקית.
3. הכפתור גולל לאזור החיות.

## משימה אישית ובדיקת הבנה

התאימו שלושה כרטיסים לנושא שלכם. החליפו תוכן קודם, ורק אחר כך צבעים. אם העיצוב לא הושלם, המשיכו עם הדוגמה העובדת כדי לא להיתקע לפני שיעורי הנתונים.

{: .box-success}
בסיום שינוי משמעותי: בדקו את ה־diff, בצעו Stage, כתבו הודעת commit שמתארת מה שיניתם, ובצעו Push. ודאו ב־GitHub שהשינוי הגיע. נדרשים לפחות 50 commits משמעותיים לאורך השנה, גם למי שעובד תמיד באותו מחשב נייד.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.

## בדיקת ניגודיות של הכפתור

בבדיקת התצוגה גילינו שכלל הקישורים באזור הפתיחה השפיע גם על כפתור בהיר. כלל ממוקד יותר נותן לכפתור טקסט כהה ושומר על קריאות. זהו תרגול קצר בספציפיות של CSS.

[תיקון שנבדק](https://github.com/3strategy/razortaba/commit/6d9c5e4efd58b3b4530ea77898c606ed97fe7eb6)

````diff
diff --git a/RazorTaba/wwwroot/css/site.css b/RazorTaba/wwwroot/css/site.css
index e75fa54..67b88ae 100644
--- a/RazorTaba/wwwroot/css/site.css
+++ b/RazorTaba/wwwroot/css/site.css
@@ -29,4 +29,7 @@ footer { border-top: 1px solid #d8dfd3; margin-top: 3rem; color: var(--leaf); }
 .markdown-content th, .markdown-content td { padding: .6rem; border-bottom: 1px solid #d8dfd3; text-align: right; }
 pre { direction: ltr; text-align: left; background: #eef1e9; padding: 1rem; overflow: auto; }
 .mermaid-diagram { overflow-x: auto; text-align: center; margin-block: 1.5rem; }
 .mermaid-diagram svg { max-width: 100%; height: auto; }
+
+/* הכפתור הבהיר זקוק לטקסט כהה, גם כשהוא נמצא בתוך אזור הפתיחה. */
+.intro .btn-light { color: var(--forest); }
````
