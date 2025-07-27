---
layout: page
title: "פרק 9 מערכים - הערות ותוספות"
subtitle: "הערות והרחבות על מערכים. קישורים לקמפוס"
author: גיא סידס
tags: [איתחול עם סוגריים מרובעים, גישה לאיבר מהסוף, ^i, פלינדרום במערך]
mathjax: true
lang: he
---

## inline initializations

### בכל המקומות מאתחלים עם {} אז איך פתאום יש [ ] 😲?

```csharp
public static void FunctionName(int[] arr)
{
    int[] nums = [1, 2, 3, 4, 5];
    arr = [1, 3, 5, 7, 9];
}
```
That square-bracket `array literal` syntax wasn’t valid until C# 12. As of C# 12 (shipped with .NET 8 in November 2023), the language gained **collection expressions**, which let you write:

```csharp
// Pre-C# 12:
int[] nums = new int[] { 1, 2, 3, 4, 5 };

// C# 12 “collection expression” (array literal):
int[] nums = [1, 2, 3, 4, 5];
```
instead of the old curly-brace form. Under the covers it’s just syntactic sugar for the same array-initializer, but the official feature name is **collection expressions** (often referred to informally as **collection literals**)


## Timeline of Inline Initialization Syntax in C, Java, C#


- **K&R C / ANSI C (1978/1989)**

  - **Array initializers** (from the **original C** language)
    ```c
    int a[] = { 1, 2, 3 }; // note the diffent syntax!!! ? סוגריים במקום יותר הגיוני
    ```

- **C# 1.0 (January 2002) ⟵ Java 1.0 (January 1996) לקח להם זמן להתעורר...**

  - **Array initializers**
    ```csharp
    int[] a = { 1, 2, 3 };
    ```

- **C# 3.0 (November 2007)**

  - **Object initializers**
    ```csharp
    var p = new Point { X = 1, Y = 2 };
    ```
  - **Collection initializers**
    ```csharp
    var list = new List<string> { "apple", "banana", "cherry" };
    ```
  - **Implicitly-typed array creation**
    ```csharp
    var nums = new[] { 1, 2, 3 };
    ```

- **C# 12 (November 2023) - שימו לב כמה כדאי להתעדכן**

  - Collection expressions (**square-bracket** literals)
    ```csharp
    int[] nums = [1, 2, 3, 4, 5];
    ```


## גישה לאיבר מסוף המערך

ב-C# 8.0 ומעלה ניתן לגשת לאיבר מסוף המערך באמצעות הסימון `^`:

```csharp
int[] arr = { 10, 20, 30, 40, 50 };
int last = arr[^1];        // C# syntax. 50 פונה למקום אחרון
int secondToLast = arr[^2]; // 40 פונה למקום לפני אחרון
```

```cs
int[] arr = [10, 20, 30, 40, 50]
int last = arr[^1]           // 50
int second_to_last = arr[^2] // 40
```

## דוגמא פתורה: גלגול מערך ב-k איברים
השאלה מבוססת 9.1.7 ונוספת הדרישה לגלגל את האיברים שעתידים להידרס:

כתבו פונקציה ב־C# בשם `RotateArray` המקבלת:

1. מערך שלמים (`int[] arr`)
2. מספר שלם `k` (לא שלילי)

והופכת את המערך על ידי גלגול ימינה ב־`k` צעדים.

**דוגמא:**

```csharp
static void Main(string[] args)
{
    int[] nums = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
    RotateArray(nums, 3);
    // לאחר הקריאה: nums = { 7, 8, 9, 1, 2, 3, 4, 5, 6 }
}
```

**הסבר קצר:**
הפונקציה תעתיק את `k` האיברים האחרונים של המערך לתחילתו, ותזיז את שאר האיברים ימינה בהתאם, כך שהתוצאה תהיה גלגול ימינה ב־`k` צעדים.

<details markdown="1"><summary>פתרון מלא תוך שימוש במערך עזר</summary>

```csharp
public static void RotateArray(int[] arr, int k)
{
    int n = arr.Length;
    k %= n;
    int[] kNums = new int[k];         // מחזיק את k האיברים האחרונים
    for (int i = 1; i <= k; i++)
        kNums[^i] = arr[^i];          // העתקת k האיברים מהסוף

    for (int i = n - 1 - k; i >= 0; i--)
        arr[i + k] = arr[i];          // הזזת כל האיברים הנותרים ימינה

    for (int i = 0; i < k; i++)
        arr[i] = kNums[i];           // הכנסת האיברים האחרונים למקומם החדש
}
```

</details>


<details markdown="1"><summary>פתרון חלקי ללא שימוש במערך עזר</summary>

```csharp
// פתרון שעובד כרגע רק במקרה שאורך המערך אי זוגי
public static void Q917(int[] arr, int k)
{  //============== FAIL ON EVEN LENGHT!!!  ============================

    //1 keep number 3 (index 2) in memory, 
    //2. put index0 in index 2
    //1. put 5 in tmp, and put tmp memory over 5.
    int tmp = arr[0];
    int l = arr.Length;
    for (int i = 0; i < l * k; i += k) // פעמים k כדי שהלולאה תתבצע
    {                                  // l * k  יש לכפול את 
        int tmp2 = tmp;                // וכך להתאים את עצמנו לגודל הקפיצה
        tmp = arr[(i + k) % l];
        arr[(i + k) % l] = tmp2;
    }
}
```

</details>

## דוגמא פתורה: האם אברי המערך הם פלינדרום, באמצעות גישה עם ^כובע

<details markdown="1"><summary>פתרון</summary>

כדי להשתמש ב- `Debug.Assert` יש להוסיף בתחילת העמוד

```csharp
using System.Diagnostics;
```

```csharp
static void Main(string[] args)
{
    Debug.Assert(!IsPalindrom([1, 2, 3, 1, 1]), "not a palindrom");
    Debug.Assert(IsPalindrom([1])== true, "a palindrom"); // == true אין צורך לרשום
    Debug.Assert(IsPalindrom([1, 2, 3, 2, 1]) == true, "yes it's a palindrom");
    Debug.Assert(IsPalindrom([1, 2, 2, 1]), "yes it's a palindrom");
    Debug.Assert(IsPalindrom([]), "a palindrom");
}

public static bool IsPalindrom(int[] arr)
{
    int l = arr.Length;
    for (int i = 0; i < l / 2; i++)
        if (arr[i] != arr[^(i + 1)]) // כשמסתכלים על אינדקס 0 משמאל
            return false;            // צריך לבקש את אינדקס כובע 1 מימין

    return true;
}
```

</details>


## דוגמא פתורה: חשבון מילולי
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




<details markdown="1"><summary>פתרון</summary>

```csharp
public static string MathInWords(string s)
{
    n = n + 5;
    s = s.ToLower() + " "; // הפיכת המחרוזת לאותיות קטנות
    string[] sss = s.Split(' ');
    string[] strings = new string[3];// 1 = "", s2 = "", s3 = "";
    int j = 0;
    for (int i = 0; i < 3; i++)
    {
        while (s[j] != ' ') // עד מציאת רווח
        {
            strings[i] += s[j]; // הוספת התו למחרוזת
            j++;
        }
        j++;
    }
    int n1 = NumFromWord(strings[0]); // המרת המילה הראשונה למספר
    int n2 = NumFromWord(strings[2]); // המרת המילה הראשונה למספר
    if(strings[1] == "plus")
        return WordFromNum(n1 + n2);

    return WordFromNum(n1 - n2);
}

public static string WordFromNum(int num)
{   // ממספר למילה
    if(num == 0)
        return "Zero";
    if(num == 1)
        return "One";
    if (num == 2)
        return "Two";

    return "Unknown number";
}


public static int NumFromWord(string s)
{   // ממירה מילה למספר
    if (s == "zero") 
        return 0;
    if (s == "one") 
        return 1;

    return 2;
}
```

</details>




## קישורים

[⬅ עברו לפרק 9 - מערכים](/cs2/Chapter9)

[⬅ עברו לפרק 9a - גרסת ללא אנימציות](/cs2/Chapter9a)

[⬅ עברו לפרק 9c - מערך מונים וצוברים](/cs2/Chapter9c)



## תרגול

[⬅ עברו לתרגול 9.1 - מערך חד ממדי](/cs2/Chapter9Ex9.1)

[⬅ עברו לתרגול 9.2 - מערכים - שאלות ב- CodeWars](/cs2/Chapter9Ex9.2)
