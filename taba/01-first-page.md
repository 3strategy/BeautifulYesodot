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
[חזרה: מפת הדרך: האתר שלי]({{ '/taba/00-student-roadmap/' | relative_url }}){: data-sequence-nav="prev"}
<!-- lesson-back:end -->

{% include taba-private-links-visibility.html %}
{% if taba_show_private_links %}
[קוד השלב](https://github.com/3strategy/razortaba/tree/d73b40cf58979e57680e965fcd86ad9b62590593) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/f4c81264dc3b00dc56e2d424bef1183b8bc79dab...d73b40cf58979e57680e965fcd86ad9b62590593)
{% endif %}

## מה נלמד

- להבדיל בין קובץ המקור לבין מה שהדפדפן מציג.
- לכתוב תגיות פתיחה וסגירה ולהגדיר עברית.
- לקשר תמונה באמצעות נתיב יחסי.

## מכינים תיקייה לקבצים

פתחו את סייר הקבצים ב־Windows או את Finder ב־macOS. בתוך **Documents / מסמכים** צרו תיקייה בשם `first-page`. בתוכה נשמור את `index.html` ואת `fox.svg`. עדיין אין צורך ב־Git או בחשבון GitHub; נגיע לשמירת גרסאות אחרי שיעור Bootstrap.

## 1. יוצרים קובץ אמיתי

ב־Windows פתחו Notepad ושמרו בתוך התיקייה `first-page` בשם `index.html` בקידוד UTF-8, עם סוג קובץ All files. ודאו שלא נוצר `index.html.txt`. ב־macOS אפשר להשתמש ב־VS Code כעורך טקסט פשוט.

## 2. פותחים בדפדפן

הורידו את <a href="{{ '/assets/img/taba/fox.svg' | relative_url }}" download="fox.svg">איור השועל (fox.svg)</a> ושמרו אותו בתיקייה `first-page`, לצד `index.html`. לחצו פעמיים על `index.html`. אחרי שינוי ושמירה רעננו את הדפדפן.

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

## מריצים ובודקים

1. מופיעים כותרת, פסקה ואיור שועל.
2. שנו את הכותרת ושמרו; רעננו ובדקו מה השתנה.
3. שנו זמנית את שם התמונה ב־src והסבירו את הטקסט החלופי. החזירו את הנתיב התקין.

## משימה אישית ובדיקת הבנה

כתבו פסקה אישית והסבירו מדוע שינוי ב־title משפיע על לשונית הדפדפן, ושינוי ב־h1 משפיע על גוף הדף.

{: .box-success}
שמרו את שני הקבצים בתיקיית `first-page` ובדקו שהדף נפתח והתמונה מופיעה. בשיעור הבא תיצרו פרויקט Razor Pages ותריצו אותו בסביבת הפיתוח.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.

<!-- teacher-notes:start
class_periods: 1

הקצבת הפתיחה בעורך טקסט פשוט: כ־45 דקות בלבד. לאחר מכן עוברים לסביבת הפיתוח המלאה.
teacher-notes:end -->

<!-- lesson-next:start -->
---

## המשך

- [סביבת הפיתוח: מריצים ומשנים אתר]({{ '/taba/01a-development-git/' | relative_url }}){: data-sequence-nav="next"}
<!-- lesson-next:end -->
