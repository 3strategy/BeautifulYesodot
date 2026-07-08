---
layout: page
title: "פרק 9b - מערכים - הערות ותוספות"
subtitle: "הערות והרחבות על מערכים. קישורים לקמפוס"
author: גיא סידס
tags: [איתחול עם סוגריים מרובעים, חשבון מילולי, שאלה 8.4, גישה לאיבר מהסוף, ^i, פלינדרום במערך]
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

<!-- about linking to a point on the page https://chatgpt.com/g/g-p-6826c1c2449c8191803e04f2f1250bd5-jekyll-web-development/c/688706fd-7d68-8330-abc8-709cf278fada -->

## דוגמא פתורה: גלגול מערך ב-k איברים {#no-arr917}

השאלה מבוססת 9.1.7 ונוספת הדרישה לגלגל את האיברים שעתידים להידרס:

כתבו פונקציה ב־C# בשם `RotateArray` או `Q917noArr` המקבלת:

1. מערך שלמים (`int[] arr`)
2. מספר שלם `k` (לא שלילי)

ומשנה את המערך על ידי גלגול ימינה ב־`k` צעדים.

**דוגמא:**

```csharp
static void Main(string[] args)
{
    int[] nums = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
    RotateArray(nums, 3);
    // לאחר הקריאה: nums = { 7, 8, 9, 1, 2, 3, 4, 5, 6 }
}
```

<details markdown="1" open><summary>פתרון מלא #1 בעזרת מערך חדש ומודולו</summary>

```csharp
public static void RotateArray(int[] nums, int k)
{
    int[] hadash = new int[nums.Length];

    for (int i = 0; i < nums.Length; i++)
        hadash[(i + k) % nums.Length] = nums[i];

    for (int i = 0; i < nums.Length; i++)
        nums[i] = hadash[i];
}
```

</details>

<details markdown="1"><summary>פתרון מלא #2 תוך שימוש במערך עזר</summary>

```csharp
public static void Q917b(int[] arr, int k)
{   // Given an array of integers, rotate the array
    // to the right by k steps, where k is non-negative.
    if (arr.Length<=k ) // הגנה מחריגות
        return;

    int[] kNums = new int[k]; // מכיל את האחרונים שעתידים להידרס
    for (int i = 1; i <= k; i++)
        kNums[^i] = arr[^i]; // הולך ישר ל-3 האחרונים

    for (int i = arr.Length - 1-k; i >= 0; i--)
        arr[i+k] = arr[i]; // מזיז את כל השאר ימינה

    for (int i = 0; i < k; i++)
        arr[i] = kNums[i]; // מכניס את ה-3 האחרונים למקומם החדש
}
```
</details>


<details markdown="1"><summary>פתרון חלקי #3 ללא שימוש במערך עזר (עובד לפעמים)</summary>

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


<details markdown="1"><summary>פתרון מלא #4 ללא שימוש במערך עזר</summary>

```csharp
public static void Q917noArr(int[] arr, int k)
{
    if (arr.Length<=k ) // הגנה מחריגות
        return;
    int tmp = arr[0];
    int l = arr.Length;
    int adjust = 0; //adjustment
    for (int i = 0; i < l * k; i += k)
    {
        int tmp2 = tmp;
        if ((i + k) % l != adjust)  // check for overlap
        {
            tmp = arr[(i + k) % l];
            arr[(i + k) % l] = tmp2;
        }
        // special case - we already moved the 0 index
        else // (consider adjust was 0 as an example) 
        {
            tmp = arr[(i + k) % l + 1]; // copy from next index
            arr[(i + k) % l] = tmp2;
            i++;//shift by 1 [breaching MISRA well formed loops]
            adjust++; // this way we will detect next overlap
        }
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


## דוגמא פתורה: חשבון מילולי {#math-in-words}
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




<details markdown="1"><summary>פתרון חשבון מילולי שאלה 8.4</summary>

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


## מספרי השקפים במצגת קמפוס המכילים פתרונות לתרגילים מדורגים: {#campus-arr-excercises}

- שקף 18: העתקת מערך
- שקף 19: מציאה כמה מספרים גדולים מהממוצע (זה סוג של שאלות שלא יכולנו לשאול לפני שהיה לנו מערך)
- שקף 22: לא להסתכל - יש שם טענות לא מדוייקות שיש השפעה על הערך המקורי של העצם. ההשפעה היא על תוכן העצם, ולא על הערך שלו (שהוא בסך הכל מציע לכתובת). יתרה מזו העברת המערך כפרמטר אינה העברה by ref. בשביל זה יש לנו את האפשרות להשתמש ב-ref
- שקף 23: פעולה שמחזירה מערך
- שקף 24 מכיל שגיאות ולא יתקמפל
- שקף 26: מציאת מקסימום. זו דוגמא לתרגיל שאתם אמורים לנסות לפתור לבד בלי להציץ
- שקף 27: מציאת האינדקס שבו האיבר המקסימלי. עוד דבר שאתם אמורים לפתור לבד (למנף את הפתרונות מלפני שלמדנו פונקציות שבהן מוצאים ערך נלווה למקסימום)
- שקף 30: הפיכת סדר האיברים (הצלחתם לפתור לבד בשיעור)
- שקף 31-37: פלינדרום ב-150 קליקים של עכבר. חשוב להבין שהרבה מהשאלות שפתרנו בלולאות על מספרים, ניתן כעת לנסח על מערכים, ועליכם לפתור אותן בלי להציץ בפתרונות. 
- שקף 38-40: מעקב על קוד. חשוב - לא תרגלנו עדיין מעקב
- שקף 43: על הפדגוגיה של להחזיר ערך רק פעם אחת ורק בסוף הפעולה. אני לא מסכים עם זה. אבל יש לזה יתרונות
- שקף 44-46: סיבוב מערך כפי שפתרנו, אבל בכיוון ההפוך.
- שקף 47-51: שאלה קשה - הדפסת התווים השונים במערך
- שקף 52-54: מיזוג מערכים ממוינים
- שקף 55-61: מערך מונים - עדיין לא הגענו
- שקף 62-74: מערך צוברים - עדיין לא הגענו




## קישורים

[⬅ עברו  לנקודות צפיה חשובות בסרטון שיעור 9b](/cs2/VideoLinks/Chapter9VidLinks)

[לא קשור: עבודה עם LLM על מיני פרוייקט WPF לטיפול בבעיית הקישורים לסרטונים](https://www.youtube.com/playlist?list=PLnVUJu2KuoA2SlsoD7iVn4Xfc2Rds-ymH)


[⬅ עִבְרוּ לפרק 9 - מערכים](/cs2/Chapter9)

[⬅ עִבְרוּ לפרק 9a - גרסת ללא אנימציות](/cs2/Chapter9a)

[⬅ עִבְרוּ לפרק 9c - מערך מונים וצוברים](/cs2/Chapter9c)



## תרגול

[⬅ עִבְרוּ לתרגול 9.1 - מערך חד ממדי](/cs2/Chapter9Ex9.1)

[⬅ עִבְרוּ לתרגול 9.2 - מערכים - שאלות ב- CodeWars](/cs2/Chapter9Ex9.2)

[⬅ עִבְרוּ לקאהוט 1 של עדן ארז - מערך חד ממדי](https://create.kahoot.it/details/2179097c-9b0d-46d4-8e7c-21e990cc6b68)

[⬅ עִבְרוּ לקאהוט 2 של עדן ארז - מערך חד ממדי של עצמים (לא בחומר עדיין)](https://create.kahoot.it/details/798a4855-d710-49d0-b170-00b672ee36c9)
