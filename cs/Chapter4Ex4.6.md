---
layout: page
title: "תרגול 4.6 טבלאות מעקב בלולאות"
subtitle: "תרגילי for עם טבלאות מעקב"
tags: [תרגול for, טבלת מעקב]
mathjax: true
lang: he
---

{: .box-note}
**מטרת הדף**: תרגול לולאות `for` ב־C# עם כתיבת **טבלאות מעקב** (trace tables) שמראות כיצד ערכי המשתנים משתנים בכל צעד.

## מהי טבלת מעקב? {#trace-intro}

טבלת מעקב היא טבלה שמפרקת את ריצת התוכנית לצעדים. בכל שורה נרשום את מצב המשתנים אחרי הצעד, את הפעולה שבוצעה, ואת פלט הביניים (אם יש). בסיום ננסח במילים **מה מטרת הלולאה**.

## שאלה 1

```csharp
public static void What()
{
    int x = 7;
    int y = 0;
    
    for (int i = 1; i <= 15; i++)
    {
        if (i % x == 0)
        {
            y++;
        }
    }
    
    Console.WriteLine(y);
}
```

1. מה הפלט?
2. מה מטרת הקוד

---

## שאלה 2


```csharp
public static void What()
{
    int a = 8;
    int b = 3;
    int c = 0;
    
    for (int i = a; i > 0; i--)
    {
        c = c * 10 + i % b;
    }
    
    Console.WriteLine(c);
}
```

1. מה הפלט?
2. מה מטרת הקוד

---

## שאלה 3

```csharp
public static void What()
{
    int m = 0;
    int n = 1;
    
    for (int k = 1; k <= 6; k++)
    {
        int temp = m + n;
        m = n;
        n = temp;
    }
    
    Console.WriteLine(n);
}
```


1. מה הפלט?
2. מה מטרת הקוד
