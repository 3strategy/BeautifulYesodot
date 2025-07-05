---
layout: page
title: "תרגול 7.2 - פונקציות עם פרמטרים"
subtitle: "תרגול בכתיבת פונקציות מקבלות קלט כפרמטרים"
tags: [functions, parameters, C#]
mathjax: true
lang: he
---

# תרגול 7.2 — פונקציות עם פרמטרים

תרגול בכתיבת פונקציות המקבלות קלט דרך פרמטרים ומבצעות חישובים או הדפסות.

### 7.2.1 — זוגי או אי-זוגי?
**מבוסס על 5.1.1**

א. כתבו פונקציה `PrintEvenOrOdd(int n)` שמקבלת מספר `n` ומדפיסה `"n is even"` או `"n is odd"` בהתאם.

ב. כתבו `Main` הקולט מספר שלם אחד מהמשתמש וקורא לפונקציה עם הערך שהוזן.

<details markdown="1"><summary>אין פתרון</summary></details>

---

### 7.2.2 — המקסימום מבין שלושה מספרים
**מבוסס על 4.3.4**

א. כתבו פונקציה `PrintMax3(int a, int b, int c)` שמדפיסה `"Max is X"` כאשר `X` הוא הערך המקסימלי מבין `a,b,c`.

ב. כתבו `Main` הקולט שלושה מספרים וחותם לקריאה לפונקציה.

<details markdown="1"><summary>אין פתרון</summary></details>

---

### 7.2.3 — הדפסת תו פעמים רבות
**מבוסס על דפוס PrintStars**

כתבו פונקציה `PrintLine(char ch, int count)` שמדפיסה בשורה אחת את התו `ch` בדיוק `count` פעמים.

<details markdown="1"><summary>אין פתרון</summary></details>

---

### 7.2.4 — משולש כוכביות גמיש
**מבוסס על 6.1.1 Pattern 4**

כתבו פונקציה `PrintTriangle(int n)` שמדפיסה משולש כוכביות בן `n` שורות: שורה 1 עם כוכבית אחת, שורה 2 עם 2, ..., עד שורה `n` עם `n` כוכביות.

<details markdown="1"><summary>אין פתרון</summary></details>

---

### 7.2.5 — כל המחלקים של מספר
**מבוסס על 5.2.3**

כתבו פונקציה `PrintDivisors(int num)` שמקבלת מספר חיובי ומדפיסה את כל המחלקים החיוביים שלו, מופרדים ברווח.

<details markdown="1"><summary>פתרון</summary>
```csharp
public static void PrintDivisors(int num)
{
    for (int candidate = 1; candidate <= num; candidate++)
    {
        if (num % candidate == 0)
            Console.Write(candidate + " ");
    }
    Console.WriteLine();
}
```</details>

