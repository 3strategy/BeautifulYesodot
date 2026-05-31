---
layout: page-to-print
tags: [סיכום, תחביר, תקציר, syntax, summary, java]
title: תקציר תחביר חלק ב Java
mathjax: true
lang: he
---

#### 1. פונקציות מחרוזות מובנות

```java
String s = "Example String";

int position = s.indexOf("String"); // מחזירה אינדקס התחלת תת-מחרוזת או -1
boolean has = s.contains("Exam"); // בודקת קיום תת-מחרוזת
int len = s.length(); // מחזירה את אורך המחרוזת
```

#### 2. תחביר מערכים
```java
String[] cars = new String[5]; // איתחול לגודל 5, המערך מאופס לערכי null
String[] cars2 = { "BMW", "Ford", "Kia" }; // איתחול ישיר בזמן הכרזה
```

#### 3. הגדרה וקריאה של פונקציה המקבלת מערך ושלם ומחזירה שלם
```java
int result = multiplyAtIndex(new int[] { 1, 2, 3 }, 2); // קריאה לפונקציה
int[] nums = { 1, 2, 3 };
int res2 = multiplyAtIndex(nums, 2); // אפשר גם לשמור במשתנה ואז לשלוח

public static int multiplyAtIndex(int[] arr, int index)
{
    return arr[index] * index;
}
```

{: .page-break-before}
#### 4. מציאת איבר אחרון המקיים תנאי, ב3 דרכים
בדוגמא זו: מציאת מספר **זוגי אחרון** במערך

{: .subq}
א. תחביר רגיל עם לולאת for הפוכה ו-break
```java
public static int lastEven(int[] arr)
{
    int lastEven = -1;
    for (int i = arr.length - 1; i >= 0; i--)
    {
        if (arr[i] % 2 == 0)
        {
            lastEven = arr[i];
            break; // לא נרצה להמשיך לחפש
        }
    }
    return lastEven;
}
```

{: .subq}
ב. לולאת for קדימה עם חישוב אינדקס מהסוף
```java
public static int lastEvenFromEnd(int[] arr)
{
    int lastEven = -1;
    for (int i = 1; i <= arr.length; i++)
    {
        int value = arr[arr.length - i]; // חישוב האינדקס מהסוף
        if (value % 2 == 0)
        {
            lastEven = value;
            break;
        }
    }
    return lastEven;
}
```

{: .subq}
ג. תחביר foreach קדימה בלי break

```java
public static int lastEvenForeach(int[] arr)
{
    int lastEven = -1;
    for (int num : arr)
    {
        if (num % 2 == 0)
            lastEven = num;
    }
    return lastEven;
}
```

#### 5. מערך מונים
**הבעיה:** נתון מערך של מספרים בתחום 0–100. כתבו פונקציה המחזירה מערך מונים המצביע על כמות ההופעות של כל מספר.
```java
public static int[] countOccurrences(int[] arr)
{
    int[] counts = new int[101];
    for (int x : arr)
    {
        if (x >= 0 && x <= 100)
            counts[x]++;
    }
    return counts;
}
```
