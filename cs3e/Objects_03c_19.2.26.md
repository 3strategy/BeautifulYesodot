---
layout: page
title: "פרק 11.3ג – סיכום שיעור 19.2.26"
subtitle: "חזרת current/static, Don’t Ask Tell עם Sprite, דיבוג הגשות, ופתרון בגרויות על הלוח"
tags: [C#, OOP, objects, static, current, DontAskTell, Sprite, debugging, bagrut]
lang: he
---

## סיכום שיעור (19.2.26)

השיעור נבנה בארבעה חלקים: [פתיח קצר](https://youtu.be/x9I7fFlODqc?t=4), מעבר ללייב־קודינג OOP, דיבוג הגשה של תלמיד, וסיום עם פתרון בגרויות בכתב־יד על הלוח.

### 1) חימום קצר: `current` ו־`static`

פתחנו בחזרה זריזה על `current` מתוך השיעור הקודם: [איפה זה הופיע כבר](https://youtu.be/x9I7fFlODqc?t=18), איך הוא [מצביע לתא הפנוי הבא](https://youtu.be/x9I7fFlODqc?t=43), ואיך שומרים על מערך [רציף בלי חורים](https://youtu.be/x9I7fFlODqc?t=52). משם עברנו מיד ל־`static`: [מה זה אומר עקרונית](https://youtu.be/x9I7fFlODqc?t=72), הדגש על [שדה סטטי](https://youtu.be/x9I7fFlODqc?t=82), והדוגמאות הקלאסיות של [מספור מזהים](https://youtu.be/x9I7fFlODqc?t=89). על הדרך חודדה גם המשמעות של חתימה נכונה ([`static`/לא `static`](https://youtu.be/x9I7fFlODqc?t=127)), ההבנה ששדה סטטי קיים [פעם אחת לכל המחלקה](https://youtu.be/x9I7fFlODqc?t=181), והפרקטיקה של פנייה סטטית דרך שם מחלקה ([ולא דרך עצם](https://youtu.be/x9I7fFlODqc?t=532)).

### 2) Don’t Ask Tell בלייב־קודינג (Sprite)

אחרי החימום עברנו ללב השיעור: [הצגת העיקרון Don’t Ask Tell](https://youtu.be/x9I7fFlODqc?t=797) עם הניסוח “לא לשלוף מידע ואז לעשות עבודה במקום אחר, אלא [לבקש מהעצם שמחזיק את המידע לבצע את העבודה](https://youtu.be/x9I7fFlODqc?t=859)”. הודגש הרעיון של [קירוב פעולות ל־data](https://youtu.be/x9I7fFlODqc?t=869) והאזהרה ממעבר־יתר של פרמטרים [בין פונקציות](https://youtu.be/x9I7fFlODqc?t=883).

בלייב־קוד בנינו דמו בסגנון [Sprite](https://youtu.be/x9I7fFlODqc?t=919) (כמו במסמך [Objects_03bSpriteDemo](/cs3e/Objects_03bSpriteDemo)): בחירת `x/y` כ־[`double` לתנועה חלקה](https://youtu.be/x9I7fFlODqc?t=961), הגדרת גבולות [`maxX/maxY`](https://youtu.be/x9I7fFlODqc?t=1052), ואז מעבר לתנועה מבוססת [`dx/dy`](https://youtu.be/x9I7fFlODqc?t=2188) עם חישוב הצעד בכל איטרציה ([`x += dx`, `y += dy`](https://youtu.be/x9I7fFlODqc?t=2271)). בהמשך חיברנו את זה למתודה שמבצעת [Move+Draw](https://youtu.be/x9I7fFlODqc?t=2581), בדקנו מה קורה כש־[`dx` גדול מדי](https://youtu.be/x9I7fFlODqc?t=2700), וסגרנו שוב את העיקרון שהלוגיקה צריכה לשבת אצל העצם (בהלימה למסמך [Objects_03_DontAskTell](/cs3e/Objects_03_DontAskTell)).

### 3) דיבוג קוד תלמיד מהגשות

בחלק הדיבוג עברנו על קוד תלמיד מהגשות (מטלת 11y4 שאלה 2 ב־[הגשות.שלי.com](https://הגשות.שלי.com)): [פתיחת קוד ההגשה](https://youtu.be/x9I7fFlODqc?t=4041), זיהוי בעיית naming/טיפוס ([`type` כמילה בעייתית](https://youtu.be/x9I7fFlODqc?t=4200)), קריאת כשל הטסטים ([`expected true but was false`](https://youtu.be/x9I7fFlODqc?t=4560)), ואז הנפילה המרכזית: [חסרה חתימת `static`](https://youtu.be/x9I7fFlODqc?t=4605). משם מצאנו שנשארה [גרסת תבנית כפולה](https://youtu.be/x9I7fFlODqc?t=4639), חודד שהפונקציות המבוקשות הן [במחלקה הראשית ולא בתוך `Bicycle`](https://youtu.be/x9I7fFlODqc?t=4680), ולכן נכון להוסיף [`static` לפעולות החיצוניות](https://youtu.be/x9I7fFlODqc?t=4742).

### 4) “המורה פותר על הלוח” + 3 שאלות בגרות

פה היה המסר הפדגוגי החזק של השיעור: תלמידים רגילים לסביבה דיגיטלית, אבל חייבים לראות גם [איך פתרון נראה בכתב־יד על לוח](https://youtu.be/x9I7fFlODqc?t=3818), כולל דיוק מה כן/לא כותבים בבגרות. בהמשך חיזקנו את זה שוב בדיון על [תרגול כתב־יד מול דיגיטלי](https://youtu.be/x9I7fFlODqc?t=6287) ועל החשיבות של [בדיקה בכתב יד/Notepad](https://youtu.be/x9I7fFlODqc?t=6308).

השאלות שנפתרו:

1. בגרות 2017, שאלון 381, שאלה 2 (משולב אצלנו עם קבצי [2017.6.381/q1.pdf](/bagruyot/2017.6.381/q1.pdf) ו־[2017.6.381/q2.pdf](/bagruyot/2017.6.381/q2.pdf)): [בחירה של השאלה](https://youtu.be/x9I7fFlODqc?t=3970), [הסבר איך לגשת אליה “טיפין טיפין”](https://youtu.be/x9I7fFlODqc?t=5117), עבודה על הכותרות/בנאים [על הלוח](https://youtu.be/x9I7fFlODqc?t=5162), וסיכום למה ההדגמה הזו [קריטית לתלמידים](https://youtu.be/x9I7fFlODqc?t=6126).
2. בגרות 2023, שאלון 371, שאלה 4 ([2023.6.371/q4.pdf](/bagruyot/2023.6.371/q4.pdf)): [בחירת השאלה](https://youtu.be/x9I7fFlODqc?t=7466), [מיקום נכון במחלקה פנימית](https://youtu.be/x9I7fFlODqc?t=7631), חישוב ההפרשים והלולאה ([עם גבול נכון](https://youtu.be/x9I7fFlODqc?t=7975)), והדגש למה חייבים [`else if` ולא ערבוב תנאים](https://youtu.be/x9I7fFlODqc?t=8284).
3. בגרות 2023, שאלון 371, שאלה 5 ([2023.6.371/q5.pdf](/bagruyot/2023.6.371/q5.pdf)): [מעבר לשאלה](https://youtu.be/x9I7fFlODqc?t=8647), כותרת פעולה חיצונית [עם `static`](https://youtu.be/x9I7fFlODqc?t=8815), דפוס `best` על מערך [למציאת הראשון שנכנס](https://youtu.be/x9I7fFlODqc?t=8957), פירוק הקריאה המורכבת על `MyTime.Before(...)` ([כאן היה העומס המחשבתי העיקרי](https://youtu.be/x9I7fFlODqc?t=9303)), וסיום עם [הדפסת התוצאה](https://youtu.be/x9I7fFlODqc?t=9397) וזיהוי שזה אכן [שאלה 5 של 2023/371](https://youtu.be/x9I7fFlODqc?t=9447).

**בשורה התחתונה: דיברנו על:**

- ([Don’t Ask Tell](https://youtu.be/x9I7fFlODqc?t=802)),
- תרגול קוד אמיתי עם תקלות אמיתיות ([דיבוג הגשות](https://youtu.be/x9I7fFlODqc?t=4639)),
- ודיוק בחשיבה לבגרות דרך פתרון מונחה־מורה על לוח ([“לא רק דיגיטלי”](https://youtu.be/x9I7fFlODqc?t=6126)).
