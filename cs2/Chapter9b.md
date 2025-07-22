---
layout: page
title: "פרק 9 מערך חד ממדי"
subtitle: "הערות והרחבות"
author: גיא סידס
tags: [מערך, מערכים, חד ממדי]
mathjax: true
lang: he
---

## inline initializations

### בכל המקומות מאתחלים עם {} אז איך פתאום יש [ ]?

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


## Timeline of Inline Initializer Syntax in C\#

# Inline Initialization in C (including Borland C)

- **K&R C / ANSI C (1978/1989)**

  - **Array initializers** (from the original C language)
    ```c
    int a[] = { 1, 2, 3 }; // note the diffent syntax!!! ? סוגריים במקום יותר הגיוני
    ```

- **Java 1.0 (January 1996) / C# 1.0 (January 2002) לקח להם זמן להתעורר...**

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

  - **Collection expressions** (**square-bracket** literals)
    ```csharp
    int[] nums = [1, 2, 3, 4, 5];
    ```