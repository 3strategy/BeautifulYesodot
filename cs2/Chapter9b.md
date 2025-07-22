---
layout: page
title: "פרק 9 מערכים - הערות ותוספות"
subtitle: "הערות והרחבות"
author: גיא סידס
tags: [מערך, מערכים, חד ממדי, מערך מונים, מערך צוברים]
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

```python
arr = [10, 20, 30, 40, 50]
last = arr[-1]           # 50
second_to_last = arr[-2] # 40
```

# מערך מונים


מערך שבו כל אינדקס מייצג ערך מסוים, והערך במיקום זה מציין את מספר הפעמים שהערך הופיע.

### שאלה לדוגמה

**הבעיה:** נתון מערך של מספרים בתחום 0–100. כתבו פונקציה המחזירה מערך מונים המצביע על כמות ההופעות של כל מספר.

#### פתרון

```csharp
int[] CountOccurrences(int[] arr) {
  int[] counts = new int[101];
  foreach (int x in arr) {
    if (x >= 0 && x <= 100) counts[x]++;
  }
  return counts;
}
```

---

## מערך דגלים בוליאניים

מערך בוליאני (`bool[]`) בו כל אינדקס מייצג ערך מסוים, והערך `true` מציין נוכחות או תקינות, ו-`false` חוסר.

### שאלה לדוגמה

**הבעיה:** נתון מערך של מספרים בתחום 0–100. כתבו פונקציה שבודקת אם מספר נתון `n` הופיע לפחות פעם אחת במערך.

#### פתרון

```csharp
bool[] BuildFlags(int[] arr) {
  bool[] flags = new bool[101];
  foreach (int x in arr) {
    if (x >= 0 && x <= 100) flags[x] = true;
  }
  return flags;
}

bool Exists(int n, bool[] flags) {
  return (n >= 0 && n < flags.Length) && flags[n];
}
```

---

> **הערה חשובה:** בשימוש בטווח ערכים פתוח (למשל כל מספר `int`), שיטות אלו עלולות לגרום לבעיות אחסון וביצועים קשות. במקרים מעשיים נהוג להשתמש במבני נתונים דינמיים (למשל `Dictionary<int,int>` או `HashSet<int>`).



## קישורים

[⬅ עברו לפרק 9 - מערכים](/cs2/Chapter9)

[⬅ עברו לפרק 9c - מערך מונים וצוברים](/cs2/Chapter9c)
