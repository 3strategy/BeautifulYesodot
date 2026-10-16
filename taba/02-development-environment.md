---
layout: page
title: "02 — סביבת הפיתוח: מריצים ומשנים אתר"
subtitle: יוצרים פרויקט Razor Pages, מכירים את הקבצים, עורכים HTML ובודקים בדפדפן
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 3
track: core
published: true
companion_commit: 979d543d83d7d7c9e4f722b5400c60c4253b78a2
companion_previous: 3e83e27c126c0aa3f02f2977e8923702213ecd43
---

{: .box-note}
ניצור ונריץ אתר ב־Visual Studio, ב־VS Code או ב־Rider, נכיר את הקבצים ונשנה את התוכן. נשמור, נריץ ונראה את התוצאה בדפדפן.

<!-- lesson-back:start -->
[הפרק הקודם: 01 — הדף הראשון שלי]({{ '/taba/01-first-page/' | relative_url }}){: data-sequence-nav="prev"} · [הפרק הבא: 03 — האתר הופך לשלי]({{ '/taba/03-my-theme/' | relative_url }}){: data-sequence-nav="next"}

במסך מגע אפשר להחליק ימינה לפרק הבא ושמאלה לפרק הקודם.
<!-- lesson-back:end -->

<!--
[קוד השלב](https://github.com/3strategy/razortaba/tree/979d543d83d7d7c9e4f722b5400c60c4253b78a2) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/3e83e27c126c0aa3f02f2977e8923702213ecd43...979d543d83d7d7c9e4f722b5400c60c4253b78a2)
-->

## מה נלמד

- להריץ אתר מקומי ב־Windows או ב־macOS.
- לזהות את Pages ואת wwwroot.
- לערוך HTML, לשמור קבצים ולבדוק את התוצאה בדפדפן.

## מתנסים ביצירת פרויקט Razor Pages

עד עכשיו שיחקתם ב־HTML בקבצים רגילים, בלי פרויקט. כעת ניצור אתר מתבנית מוכנה. **זה עדיין שלב ניסוי:** בחרו שם חופשי באנגלית ללא רווחים, למשל `RazorPractice`. אפשר ליצור כמה פרויקטים, כל אחד בשם ובתיקייה משלו. אין צורך בחשבון GitHub או בשיתוף עם המורה בשלב הזה.

פתחו את המדריך של סביבת הפיתוח שלכם. כל מדריך מלווה אתכם מהיצירה ועד Welcome בדפדפן, ואפשר לחזור אליו בכל פעם שרוצים לתרגל שוב.

<details markdown="1"><summary>Visual Studio ב־Windows — יצירת Razor Pages דרך הממשק</summary>

{% include taba/setup-visual-studio.md %}

</details>

<details markdown="1"><summary>VS Code ב־macOS — יצירת Razor Pages בטרמינל</summary>

{% include taba/setup-vscode.md %}

</details>

<details markdown="1"><summary>Rider ב־Windows או ב־macOS — יצירת Razor Pages דרך הממשק</summary>

{% include taba/setup-rider.md %}

</details>

### מתרגלים יצירה נוספת

1. עצרו את האתר הראשון באמצעות Stop או Ctrl+C בטרמינל.
2. חזרו למדריך שלכם וצרו פרויקט שני בשם אחר, למשל `RazorPractice2`, בתיקייה נפרדת לצד הראשונה.
3. הריצו גם אותו ובדקו שמופיע Welcome. שנו כותרת כדי שתדעו איזה ניסוי פתוח.
4. עצרו ופתחו שוב את הניסוי הראשון. בדקו שהקבצים שלו והשינוי שעשיתם עדיין קיימים.

{: .box-success}
אתם יודעים ליצור אתר, לעצור אותו ולפתוח עבודה קיימת. בחרו כעת אחד מהניסויים להמשך תרגול תוכן ו־CSS. אפשר לנסות שוב עד שיעור Bootstrap; בשיעור Git שלאחריו נרשום את הפרויקט השנתי בשם `FirstNameLastNameRazor` ונשתף את המורה.

## ממשיכים עם הפרויקט שיצרנו
{: #after-setup}

### 1. פותחים את העבודה הקיימת

ב־VS Code פתחו את תיקיית הפרויקט בשם שבחרתם באמצעות **File → Open Folder**. ב־Visual Studio פתחו את קובץ הפתרון בשם שבחרתם, למשל `GuysRazor.slnx` או `GuysRazor.sln`, מתוך תיקיית הפתרון שלכם. לפתיחה מחדש של עבודה קיימת אין צורך ליצור פרויקט. ב־Rider פתחו את קובץ הפתרון באמצעות **Open**.

כל עוד ממשיכים ניסוי קיים, פתחו את התיקייה שלו, שמרו והריצו. ליצירת ניסוי חדש חזרו למדריך ובחרו שם ותיקייה חדשים.

### 2. עורכים את האתר שלנו

השאירו את הדפדפן לצד העורך. ב־Visual Studio או ב־Rider הפעילו את פרופיל **http**. ב־VS Code פתחו טרמינל בתיקייה שמכילה את קובץ ה־`.csproj` והריצו:

```shell
dotnet watch --launch-profile http
```

בקטע הבא נתאים את דף הבית ואת התבנית המשותפת לעברית. בדוגמאות כאן `RazorTaba` הוא שם תיקיית הפרויקט הפנימית. אם בחרתם שם אישי ב־Visual Studio, החליפו את החלק הזה בשם שלכם: למשל `GuysRazor/Pages/Index.cshtml`. במסלול עם תיקיית פתרון חיצונית הנתיב מתחיל ממנה; ב־VS Code, כשפתחתם ישירות את תיקיית ה־`.csproj`, התחילו מ־`Pages/Index.cshtml` בלי להוסיף תיקייה נוספת. הקבצים כבר נוצרו בהקמה; כעת עורכים אותם.

צרו בתוך `RazorTaba/wwwroot` תיקייה בשם `images` והעתיקו אליה את `fox.svg` ששמרתם בתיקיית `first-page` בשיעור הקודם. כך התמונה שבדף הבית תימצא בנתיב `RazorTaba/wwwroot/images/fox.svg`.

### 3. שומרים ובודקים

בצעו את שינויי הקוד שבהמשך, שמרו את הקבצים ובדקו את האתר. נסו לשנות כותרת או פסקה, שמרו שוב וראו מה השתנה. אם ניסוי לא הצליח, קראו את השגיאה והשוו את הקטע ששיניתם לדוגמה.

## השינויים בקוד

### `RazorTaba/Pages/Index.cshtml`

מתחילים מהדף שיצרה התבנית. אם שיניתם קודם את Welcome, תראו במקומו את הכותרת שלכם. משנים את תוכן הדף; התפריט והמסגרת נשארים בתבנית המשותפת.

````diff
 @page
 @model IndexModel
 @{
-    ViewData["Title"] = "Home page";
+    ViewData["Title"] = "בית";
 }
-
-<div class="text-center">
-    <h1 class="display-4">Welcome</h1>
-    <p>Learn about <a href="https://learn.microsoft.com/aspnet/core">building Web apps with ASP.NET Core</a>.</p>
-</div>
+<h1>החיות שלי</h1>
+<p>זה האתר הראשון שלי. כאן אכיר לכם חיות שמסקרנות אותי.</p>
+<img src="~/images/fox.svg" alt="איור של שועל" width="180" />
````

### `RazorTaba/Pages/Shared/_Layout.cshtml`

קובץ זה כבר קיים בתבנית ומחבר את כל הדפים ל־Bootstrap ול־`site.css`. אין להחליף אותו. בצעו רק את שני השינויים הבאים כדי להתאים את כיוון הדף ואת Bootstrap לעברית:

{% code_diff %}
 <!DOCTYPE html>
-<html lang="en">
+<html lang="he" dir="rtl">
 ⁞
-    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
+    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.rtl.min.css" />
     <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
{% endcode_diff %}

השאירו את שאר השורות, כולל הקישור לקובץ ששמו מסתיים ב־`.styles.css`, תפריט Home ו־Privacy, כפתור פתיחת התפריט בנייד והסקריפטים שבתחתית הקובץ. נסו לצמצם את רוחב החלון ולפתוח את התפריט בכפתור שלו.

### מכירים את קובצי העיצוב שנוצרו

- `wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.min.css` מכיל מחלקות עיצוב מוכנות. משתמשים בשמות המחלקות בתוך HTML; אין לערוך את קובץ הספרייה.
- `wwwroot/css/site.css` הוא קובץ העיצוב האישי של האתר בתבנית הזאת. כאן נוסיף כללי CSS משלנו בשיעור CSS, **אחרי הכללים שכבר נוצרו**.
- `Pages/Shared/_Layout.cshtml.css` מכיל עיצוב של התבנית המשותפת. הקישור ל־`שםהפרויקט.styles.css` טוען את העיצוב הזה לאחר הבנייה; אין ליצור קובץ כזה ידנית.

{: .box-note}
השאירו את `Program.cs`, את `Properties/launchSettings.json` ואת כללי CSS המקוריים כפי שנוצרו. כבר יש לנו אתר עובד. כתובת ההרצה היא הכתובת שהעורך או הטרמינל מציגים אצלכם; אין צורך לקבוע מספר יציאה משותף לכל הניסויים.

<!--
<details open markdown="1"><summary>קבצים חדשים שנוספו או נוצרו בשלב</summary>

אלה הקבצים החדשים שנוספו או נוצרו בשלב הזה. קובצי מיגרציה או תשתית שנוצרים בפקודה אין להעתיק ידנית.

- [RazorTaba/Pages/Error.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Error.cshtml)
- [RazorTaba/Pages/Error.cshtml.cs](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Error.cshtml.cs)
- [RazorTaba/Pages/Index.cshtml.cs](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Index.cshtml.cs)
- [RazorTaba/Pages/Privacy.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Privacy.cshtml)
- [RazorTaba/Pages/Privacy.cshtml.cs](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Privacy.cshtml.cs)
- [RazorTaba/Pages/Shared/_Layout.cshtml.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Shared/_Layout.cshtml.css)
- [RazorTaba/Pages/Shared/_ValidationScriptsPartial.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Shared/_ValidationScriptsPartial.cshtml)
- [RazorTaba/Pages/_ViewImports.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/_ViewImports.cshtml)
- [RazorTaba/Pages/_ViewStart.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/_ViewStart.cshtml)
- [RazorTaba/RazorTaba.csproj](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/RazorTaba.csproj)
- [RazorTaba/appsettings.Development.json](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/appsettings.Development.json)
- [RazorTaba/appsettings.json](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/appsettings.json)
- [RazorTaba/wwwroot/favicon.ico](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/favicon.ico)
- [RazorTaba/wwwroot/images/fox.svg](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/images/fox.svg)
- [RazorTaba/wwwroot/js/site.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/js/site.js)
- [RazorTaba/wwwroot/lib/bootstrap/LICENSE](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/LICENSE)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.min.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.min.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.min.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.min.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.min.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.min.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.min.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.min.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.min.js.map)
- [RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/LICENSE.txt](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/LICENSE.txt)
- [RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.js)
- [RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.min.js)
- [RazorTaba/wwwroot/lib/jquery-validation/LICENSE.md](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/LICENSE.md)
- [RazorTaba/wwwroot/lib/jquery-validation/dist/additional-methods.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/dist/additional-methods.js)
- [RazorTaba/wwwroot/lib/jquery-validation/dist/additional-methods.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/dist/additional-methods.min.js)
- [RazorTaba/wwwroot/lib/jquery-validation/dist/jquery.validate.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/dist/jquery.validate.js)
- [RazorTaba/wwwroot/lib/jquery-validation/dist/jquery.validate.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/dist/jquery.validate.min.js)
- [RazorTaba/wwwroot/lib/jquery/LICENSE.txt](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/LICENSE.txt)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.js)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.min.js)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.min.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.min.map)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.js)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.min.js)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.min.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.min.map)

</details>
-->

## מריצים ובודקים

1. האתר נפתח בכתובת `localhost` שההרצה שלכם מציגה.
2. הכותרת והפסקה מופיעות בעברית והתמונה נטענת.
3. שמרו שינוי נוסף, הריצו וודאו שהוא מופיע.
4. עצרו את ההרצה, פתחו שוב את אותו פרויקט והריצו אותו.

## משימה אישית ובדיקת הבנה

שנו משפט אחד והסבירו באיזה קובץ ערכתם אותו ואיך בדקתם את התוצאה.

{: .box-success}
שמרו את הקבצים והראו את האתר פועל. רשמו לעצמכם היכן נמצאת תיקיית הפרויקט כדי שתוכלו לפתוח אותה במפגש הבא.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.

<!-- teacher-notes:start
class_periods: 1

Template baseline revised 2026-10-16: stock .NET 10 webapp (SDK 10.0.400), top-level statements, original startup/static assets and Bootstrap navbar retained. Early route 01a–04 was applied to a fresh template, built with zero warnings/errors and inspected in a browser. Changed layout/Program excerpts through 15 were checked for contextual applicability only; macOS runs remain pending; Rider 2026.2.2 Windows GUI creation and first run were verified on 2026-10-16. Historical companion pins describe the previous custom layout; they are not qualified source checkpoints for this revised route.

להכין התקנות לפני המפגש. אין יעד לימודי של PR, branches או merge.
teacher-notes:end -->

<!-- lesson-next:start -->
---

## המשך

- [המשך: 03 — האתר הופך לשלי]({{ '/taba/03-my-theme/' | relative_url }})
<!-- lesson-next:end -->
