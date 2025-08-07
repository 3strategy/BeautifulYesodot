---
layout: page
title: "תרגול 8.1 - תרגול מחרוזות"
subtitle: "תרגול במחרוזות"
author: גיא סידס
tags: [מערך, חשבון מילולי, שאלה 8.4, תרגול מחרוזות]
mathjax: true
lang: he
---






## 8.1.4 חשבון מילולי
<!-- ניתן כשאלה 8.4 במטלה 2 -->
<!-- פתרון שאלת החשבון 8.4 ממטלה 2 -->
כתבו פונקציה ב-C# בשם `MathInWords` המקבלת מחרוזת המתארת פעולה מתמטית בשפה האנגלית (חיבור או חיסור) ומחזירה את התוצאה במילים באנגלית.

**פרמטרים:**
- `input` (type: `string`) – מחרוזת בפורמט `<Number> <operator> <Number>` כאשר `<operator>` הוא `plus` או `minus` (לא רגיש לרישיות).

**דוגמאות לשימוש:**
```csharp
Console.WriteLine(MathInWords("One plus one"));   // Output: "Two"
Console.WriteLine(MathInWords("zero Plus one")); // Output: "One"
Console.WriteLine(MathInWords("one minus One")); // Output: "Zero"
```

**הערות:**
- הפעולות המתמטיות הנתמכות הן רק חיבור (`plus`) וחיסור (`minus`).
- המספרים בקלט יהיו בתחום **0–2**.
- תחביר הקלט עלול לכלול רישיות שונה (e.g., `One`, `one`, `ONE`), עליכם להתייחס לזה באופן שאינו רגיש לרישיות (.ToLower() or .ToUpper() לפני שמתחילים לעבוד).
- התוצאה תופק במילים באנגלית, כאשר התו הראשון של המחרוזת צריך להיות אות גדולה (Capitalized).



[קישור לפתרון]({% link cs2/Chapter9b.md %}#math-in-words)






---


## קישורים

[⬅ עִבְרוּ לרשימת שקפי תרגול במערכים במצגת קמפוס]({% link cs2/Chapter9b.md %}#campus-arr-excercises)


[⬅ עִבְרוּ לתרגול 9.2 - מערכים - שאלות ב- CodeWars](/cs2/Chapter9Ex9.2)

[⬅ עִבְרוּ לרשימת שקפי תרגול במערכים במצגת קמפוס]({% link cs2/Chapter9b.md %}#campus-arr-excercises)

[קישור למטלה 25 עד שאארגן אותה מסודר](https://docs.google.com/document/d/1nT5SIx4R1a49nZNHtJbZM5Bu2w8nVqK9GIppGUT_G4s/edit?usp=sharing)

