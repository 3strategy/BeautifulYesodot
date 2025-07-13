---
layout: page
title: "תרגול 7.1 - פונקציות void"
subtitle: "תרגול בכתיבת פונקציות שלא מחזירות ערך לביצוע משימות חוזרות"
tags: [functions, void, for, loops]
mathjax: true
lang: he
---

תרגול בכתיבת פונקציות שמבצעות משימות קבועות אינן מקבלות פרמטרים (מידע מבחוץ), והן **void** כלומר, **אינן מחזירות ערך**.

### 7.1.1 — הדפסת המספרים 1 עד 10


כתבו פונקציה `()PrintOneToTen` שמדפיסה את כל המספרים מ־1 עד 10 ברצף בשורה אחת (מופרדים ברווח).

---

### 7.1.2 — הדפסת מספרים זוגיים 2..20

כתבו פונקציה `()PrintEvens20` שמדפיסה את כל המספרים הזוגיים בין 2 ל־20 (כולל), כל מספר בשורה נפרדת.

---

### 7.1.3 — הדפסת האותיות A–Z

כתבו פונקציה `()PrintAlphabet` שמדפיסה את כל אותיות האלפבית האנגלי מ־A עד Z, בשורה אחת, מופרדות ברווח.
<details><summary>רמז</summary>
ניתן לבצע איטרציה על אותיות בדומה לאיטרציה מספרית, באמצעות טיפוס הנתונים char. (זכרו שהתרשים הפנימי של תווי יוניקוד מגדיר סדר - למשל 'A'+1 הוא 'B').
</details>
<details markdown="1"><summary>פתרון</summary>

```csharp
public static void PrintAlphabet()
{
    for (char ch = 'A'; ch <= 'Z'; ch++)
        Console.Write(ch + " ");
    Console.WriteLine();
}
```
</details>

---

### 7.1.4 — מלבן כוכביות 5×5

כתבו פונקציה `()StarSquare5` שמדפיסה ריבוע של כוכביות בגודל 5×5 (5 שורות של 5 כוכביות כל אחת).

---

### 7.1.5 — סכום המספרים 1–50

כתבו פונקציה `()SumOneToFifty` שמחשבת את סכום כל המספרים מ־1 עד 50 ומדפיסה את התוצאה.

<details markdown="1"><summary>פתרון</summary>

```csharp
public static void SumOneToFifty()
{
    int sum = 0;
    for (int i = 1; i <= 50; i++)
        sum += i;
    Console.WriteLine($"Sum 1-50 = {sum}");
}
// תוצאה: Sum 1-50 = 1275
```
</details>

