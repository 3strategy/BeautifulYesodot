---
title: "פתרון מבחן - מועד ב' מחזור 3 חלק ב' (C#)"
lang: he
layout: page
---

## שאלה 1 (25 נק')

כתבו פעולה המקבלת מערך של מחרוזות ותו `c`, ומחזירה כמה מחרוזות במערך מכילות את התו `c` לפחות פעם אחת.

```csharp
public static int CountStringsContainingChar(string[] arr, char c)
{
    int count = 0;

    for (int i = 0; i < arr.Length; i++)
    {
        if (arr[i].IndexOf(c) != -1) // כלומר c מופיע לפחות פעם אחת
        // Also acceptable: if (arr[i].Contains(c)) count++;
            count++;
    }

    return count;
}
```

---

## שאלה 2 (25 נק')

### סעיף א' – איתור שגיאה ותיקון

בקטע התוכנית, בסוף הלולאה `num` כבר **לא חיובי** (הוא 0 או שלילי), ולכן אין לחלק בו.  
צריך לחשב ממוצע לפי `count` (כמות המספרים החיוביים שנקלטו).

תיקון:

```csharp
static void Main(string[] args)
{
    int num, sum = 0, count = 0;

    num = int.Parse(Console.ReadLine());

    while (num > 0)
    {
        sum = sum + num;
        count = count + 1;
        num = int.Parse(Console.ReadLine());
    }

    Console.WriteLine((double)sum / count); // <-- תיקון כאן
    Console.WriteLine("=====================");
}
```

### סעיף ב' – בדיקת תקינות ופלט

הפעולה:

```csharp
public static int Check(int a, int b)
{
    if (b - a > 5)
        return 1;
    else
        return 0;
}
```

#### i

```csharp
int x = Check(6, 2);
Console.WriteLine(x);
```

תקין.  
חישוב: `b-a = 2-6 = -4`, לא גדול מ־5 ⇒ מוחזר `0`.  
**פלט:** `0`

#### ii

```csharp
int a = 2;
int b = 8;
Console.WriteLine(Check);
```

לא תקין.  
`Check` הוא **שם של פעולה**, וכאן לא מזמנים אותה עם פרמטרים, אלא מעבירים “method group”.  
ב־C# `Console.WriteLine` לא יודע להדפיס פעולה כזו בצורה הזו.

תיקון אפשרי:

```csharp
Console.WriteLine(Check(a, b));
```

#### iii

```csharp
int m = 7;
for (int i = 1; i < 4; i++)
  Console.WriteLine(Check(i, m));
```

תקין. מחשבים עבור `i = 1,2,3`:

- `Check(1,7)` ⇒ `7-1 = 6` > 5 ⇒ `1`
- `Check(2,7)` ⇒ `7-2 = 5` לא > 5 ⇒ `0`
- `Check(3,7)` ⇒ `7-3 = 4` לא > 5 ⇒ `0`

**פלט (כל מספר בשורה):**
```
1
0
0
```

---

## שאלה 3 (25 נק')

### סעיף א' – פעולה חיצונית (אחים)

שני ==מספרים דו־ספרתיים וחיוביים== נקראים **אחים** אם הם מורכבים מאותן ספרות אך שונים זה מזה (כלומר ספרת העשרות שונה מספרת האחדות).  
אם אין אח – יש להדפיס `"No Brother"`.

```csharp
public static bool PrintBrother(int num)
{
    int tens = num / 10;
    int ones = num % 10;

    if (tens == ones || ones == 0)
    {
        Console.WriteLine("No Brother");
        return false;
    }

    Console.WriteLine(ones * 10 + tens);
    return true;
}
```

### סעיף ב' – פעולה ראשית

קולטים מספרים חיוביים. לכל מספר מדפיסים את האח (או הודעה).  
עוצרים כשנקלט מספר שלילי. בסוף מדפיסים כמה מספרים **לא** היו להם אחים.

```csharp
static void Main(string[] args)
{
    int noBrotherCount = 0;

    int num = int.Parse(Console.ReadLine());
    while (num > 0)
    {
        bool hasBrother = PrintBrother(num);
        if (!hasBrother)
            noBrotherCount++;

        num = int.Parse(Console.ReadLine());
    }

    Console.WriteLine(noBrotherCount);
}
```

---

## שאלה 4 (25 נק')

### סעיף א' – כתיבת הפעולה `Foo`

הפעולה מקבלת מערך חד־ממדי `a` של מספרים שלמים שונים זה מזה, ומספר שלם `num`.

- אם `num` נמצא במערך: הפעולה תחזיר את מספר האיברים **הקטנים מ־num** שנמצאים **לפניו** במערך.
- אחרת: הפעולה תחזיר את מספר האיברים **הקטנים מ־num** שנמצאים במערך.

מימוש ב־C# (בהגדרה סבירה: אם `num` מופיע, מתייחסים למיקום ההופעה הראשונה שלו):

```csharp
// פתרון שלי
public static int Foo2(int[] a, int num)
{
  int count = 0;
  foreach (int n in a)
    if (n == num)
      break;
    else if(n < num)
      count++;

  return count;
}


// פתרון לא אידאלי אבל ניקוד מלא
public static int Foo(int[] a, int num)
{
    int idx = -1;
    for (int i = 0; i < a.Length; i++)
    {
        if (a[i] == num)
        {
            idx = i;
            break;
        }
    }

    int count = 0;

    if (idx != -1)
    {
        // num נמצא: סופרים קטנים מ-num רק לפניו
        for (int i = 0; i < idx; i++)
        {
            if (a[i] < num)
                count++;
        }
    }
    else
    {
        // num לא נמצא: סופרים קטנים מ-num בכל המערך
        for (int i = 0; i < a.Length; i++)
        {
            if (a[i] < num)
                count++;
        }
    }

    return count;
}
```

### סעיף ב'

#### (1) אם `Foo` מחזירה 0 — מה ידוע על `num`?

יש שתי אפשרויות:

- **`num` נמצא במערך** (במיקום כלשהו `idx`), אבל **אין אף איבר קטן מ־num לפניו**.  
  כלומר: לכל `i < idx` מתקיים `a[i] >= num`.
- **`num` לא נמצא במערך**, וגם **אין אף איבר במערך קטן מ־num**.  
  כלומר: לכל `i` מתקיים `a[i] >= num` (num קטן או שווה למינימום במערך).

#### (2) אם גודל המערך 20 והפעולה מחזירה 20 — מה ידוע על `num`?

כדי שהתוצאה תהיה 20, חייבים להיות **20 איברים במערך שקטנים מ־num**.

אם `num` היה נמצא במערך, היינו סופרים רק לפניו, ולכן המקסימום היה לכל היותר 19 (וגם זה רק אם `num` היה בסוף).  
אבל במערך יש **20 איברים שונים**, ואם `num` נמצא במערך אז סופרים לכל היותר 19 “לפניו”.

לכן המסקנה:

- `num` **לא נמצא במערך**, ו־**כל 20 האיברים במערך קטנים מ־num**  
  כלומר `num` גדול מכל איברי המערך (וגם שונה מהם).

## שאלה 5 (25 נק)

```cs
    static int[] Rain(int[] arr)
    {
      int sum = 0, count = 0, maxI = 0, streak = 0;
      for (int i = 0; i < arr.Length; i++)
      {
        int n = arr[i];
        if (n > 0)
          streak++;

        if (n > arr[maxI])
          maxI = 1;

        if (n == 0 || i == arr.Length - 1)
        {
          if (streak > 2)
            count++;

          streak = 0;
        }

      }
    static int[] Rain(int[] arr)
    {
      int sum = 0, count = 0, maxI = 0, streak = 0;
      for (int i = 0; i < arr.Length; i++)
      {
        int n = arr[i];
        if (n > 0)
          streak++;

        if (n > arr[maxI])
          maxI = 1;

        if (n == 0 || i == arr.Length - 1)
        {
          if (streak > 2)
            count++;

          streak = 0;
        }

      }

      return new int[]{ maxI + 1, count};
      //return [maxI + 1, count]; // בוחנים לא יכירו
    }

```
