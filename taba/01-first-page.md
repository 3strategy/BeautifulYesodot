---
layout: page
title: הדף הראשון שלי
subtitle: כותרות, פסקה ותמונה בקובץ HTML שפותחים בדפדפן
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 10
track: core
published: true
companion_commit: d73b40cf58979e57680e965fcd86ad9b62590593
companion_previous: f4c81264dc3b00dc56e2d424bef1183b8bc79dab
---

{: .box-note}
ניצור את דף האינטרנט הראשון שלנו עם כותרת, פסקה ותמונה. נשמור קובץ HTML, נפתח אותו בדפדפן ונראה איך שינוי בקוד משנה את הדף.

<!-- lesson-back:start -->
[חזרה: מפת הדרך: האתר שלי]({{ '/taba/00-student-roadmap/' | relative_url }})
<!-- lesson-back:end -->

[קוד השלב](https://github.com/3strategy/razortaba/tree/d73b40cf58979e57680e965fcd86ad9b62590593) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/f4c81264dc3b00dc56e2d424bef1183b8bc79dab...d73b40cf58979e57680e965fcd86ad9b62590593)

אם קישור הקוד אינו נפתח, בקשו גישה למאגר.

## מה נלמד

- להבדיל בין קובץ המקור לבין מה שהדפדפן מציג.
- לכתוב תגיות פתיחה וסגירה ולהגדיר עברית.
- לקשר תמונה באמצעות נתיב יחסי.

## מכינים תיקייה לקבצים

פתחו את סייר הקבצים ב־Windows או את Finder ב־macOS. בתוך **Documents / מסמכים** צרו תיקייה בשם `first-page`. בתוכה נשמור את `index.html` ואת `fox.svg`. עדיין אין צורך ב־Git או בחשבון GitHub; נקים את מאגר הפרויקט בשיעור הבא.

## 1. יוצרים קובץ אמיתי

ב־Windows פתחו Notepad ושמרו בתוך התיקייה `first-page` בשם `index.html` בקידוד UTF-8, עם סוג קובץ All files. ודאו שלא נוצר `index.html.txt`. ב־macOS אפשר להשתמש ב־VS Code כעורך טקסט פשוט.

## 2. פותחים בדפדפן

שמרו את שני הקבצים באותה תיקייה. הוסיפו לתיקייה את האיור המצורף לקוד השלב. לחצו פעמיים על `index.html`. אחרי שינוי ושמירה רעננו את הדפדפן.

## השינויים בקוד

### `first-page/index.html`

קובץ חדש. צרו את `first-page/index.html` והדביקו את התוכן הבא:

````html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="utf-8">
    <title>החיות שלי</title>
</head>
<body>
    <h1>החיות שלי</h1>
    <p>זה האתר הראשון שלי. כאן אכיר לכם חיות שמסקרנות אותי.</p>
    <img src="fox.svg" alt="איור של שועל" width="180">
</body>
</html>
````

<details markdown="1"><summary>קבצי תשתית וקבצים שנוצרו אוטומטית</summary>

הקבצים הבאים נמצאים בקוד השלב. קבצים שנוצרים באמצעות פקודות השלב אין להעתיק ידנית.

- [first-page/fox.svg](https://github.com/3strategy/razortaba/blob/d73b40cf58979e57680e965fcd86ad9b62590593/first-page/fox.svg)

</details>

## מריצים ובודקים

1. מופיעים כותרת, פסקה ואיור שועל.
2. שנו את הכותרת ושמרו; רעננו ובדקו מה השתנה.
3. שנו זמנית את שם התמונה ב־src והסבירו את הטקסט החלופי. החזירו את הנתיב התקין.

## משימה אישית ובדיקת הבנה

כתבו פסקה אישית והסבירו מדוע שינוי ב־title משפיע על לשונית הדפדפן, ושינוי ב־h1 משפיע על גוף הדף.

{: .box-success}
שמרו את שני הקבצים בתיקיית `first-page` ובדקו שהדף נפתח והתמונה מופיעה. בשיעור הבא תיצרו פרויקט Razor Pages ותלמדו לשמור אותו במאגר פרטי ב־GitHub.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.

<!-- teacher-notes:start
class_periods: 1

הקצבת הפתיחה בעורך טקסט פשוט: כ־45 דקות בלבד. לאחר מכן עוברים לסביבת הפיתוח המלאה.
teacher-notes:end -->

<!-- lesson-next:start -->
---

## המשך

- [סביבת הפיתוח ו־GitHub: מתחילים הרגלי עבודה]({{ '/taba/01a-development-git/' | relative_url }})
<!-- lesson-next:end -->
