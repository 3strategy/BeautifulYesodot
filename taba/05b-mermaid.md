---
layout: page
title: 'מציירים באמצעות טקסט: Mermaid'
subtitle: תרשים זרימה בתוך Markdown; צמתים, קשרים ותוויות בעברית; קריאה, תיקון והסבר של מקור התרשים
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 52
track: core
published: true
companion_commit: cb12bd589208363af709028b0a00a26769ff7a7d
companion_previous: ac696838547401ac23a50a09097079f44d97d6a6
---

{: .box-note}
ניצור תרשים זרימה באמצעות Mermaid. נכתוב צמתים וחצים, נוסיף תוויות בעברית ונשנה את התרשים דרך קובץ הטקסט שלו.

<!-- lesson-back:start -->
[חזרה: כותבים תוכן ב־Markdown]({{ '/taba/05a-markdown/' | relative_url }}){: data-sequence-nav="prev"}
<!-- lesson-back:end -->

{% include taba-private-links-visibility.html %}
{% if taba_show_private_links %}
[קוד השלב](https://github.com/3strategy/razortaba/tree/cb12bd589208363af709028b0a00a26769ff7a7d) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/ac696838547401ac23a50a09097079f44d97d6a6...cb12bd589208363af709028b0a00a26769ff7a7d)
{% endif %}

## מה נלמד

- להבדיל בין מזהה צומת לבין התווית שלו.
- לחבר צמתים באמצעות חצים.
- לקרוא ולהסביר את התרשים במקום להתייחס אליו כתמונה סגורה.

## מתחילים מסונכרנים

פתחו את תיקיית הפרויקט הנכונה, בדקו שאין שינוי לא שמור והפעילו **Pull**. אם Git מציג התנגשות, פנו למורה; אל תמחקו עבודה ואל תבצעו Force Push.

## תחביר קטן, תוצאה ברורה

בתוך גדר קוד ששפתה mermaid כתבו flowchart LR. האותיות A ו־B הן מזהים; התוויות העבריות נמצאות במירכאות. אם תצוגת ה־Markdown בעורך אינה מציגה Mermaid, קראו את המקור או השתמשו בתצוגה שמדגים המורה; בפרק הבא האתר עצמו ירנדר את התרשים. תרשים שמיוצר בעזרת כלי חייב עדיין להתאים לתוכן ולהיות מובן לכם.

## השינויים בקוד

### `RazorTaba/Content/care.md`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Content/care.md
+++ b/RazorTaba/Content/care.md
@@ -15,4 +15,13 @@

 ![איור של שועל](/images/fox.svg)

 [חזרה לדף הבית](/)
+
+## מתכננים טיפול
+
+```mermaid
+flowchart LR
+    A["בוחרים חיה"] --> B["לומדים על הצרכים שלה"]
+    B --> C["קובעים מטפל אחראי"]
+    C --> D["מכינים סביבה מתאימה"]
+```
````

## מריצים ובודקים

1. יש ארבעה צמתים המחוברים לפי סדר הגיוני.
2. שינוי התווית אינו משנה את מזהה הצומת.
3. הוסיפו צומת, בדקו מקור וחזרו לגרסה תקינה אם שכחתם סוגר.

## משימה אישית ובדיקת הבנה

בנו תהליך בן ארבעה שלבים בנושא האתר שלכם. הסבירו בעל פה כל חץ.

{: .box-success}
בסיום שינוי משמעותי: בדקו את ה־diff, בצעו Stage, כתבו הודעת commit שמתארת מה שיניתם, ובצעו Push. ודאו ב־GitHub שהשינוי הגיע. נדרשים לפחות 50 commits משמעותיים לאורך השנה, גם למי שעובד תמיד באותו מחשב נייד.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.

<!-- teacher-notes:start
class_periods: 1
teacher-notes:end -->

<!-- lesson-next:start -->
---

## המשך

- [מבינים את Razor Pages ואת התבנית המשותפת]({{ '/taba/06-razor-layout/' | relative_url }}){: data-sequence-nav="next"}
<!-- lesson-next:end -->
