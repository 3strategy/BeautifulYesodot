---
layout: page-to-print
---



#### 1. פונקציית MinTup

```csharp
public static (int, int) MinTup(int[] arr) // returns tuple
{
    int iMin = 0;
    for (int i = 1; i < arr.Length; i++)
    {
        if (arr[i] < arr[iMin])
            iMin = i; // מוצא את המינימום ואת האינדקס שלו
    }
    return (iMin, arr[iMin]); // tuple החזרת 
}
```

#### 2. פונקציות מחרוזות מובנות

```csharp
string s = "Example String";

int position = s.IndexOf("String"); // מחזירה אינדקס התחלת תת-מחרוזת או -1
bool has = s.Contains("Exam"); // בודקת קיום תת-מחרוזת
int len = s.Length; // מחזירה את אורך המחרוזת
```

#### 3. העמסת פונקציות ותחביר פונקציה מקוצר Method Overloading

```csharp
// תחביר מקוצר. הפונקציה קוראת לפונקציה שמתחת ומחזירה את התוצאה שהיא מקבלת ממנה
// { return... }  החץ הוא במקום הסוגריים והריטורן
public static string SubS(string stt, int start) => SubS(stt, start, stt.Length - start);

// תחביר מלא עם לולאה
public static string SubS(string stt, int start, int end)
{
    string result = "";
    for (int i = start; i < end; i++)
        result += stt[i];

    return result; // מחזירה תת-מחרוזת מ-start עד end
}
```

#### 4. תחביר מערכים
```csharp
string[] cars = new string[5]; // איתחול לגודל 5, המערך מאופס
string[] cars2 = { "BMW", "Ford", "Kia" }; // איתחול ישיר (לא ניתן לאחר איתחול רגיל)
```

#### 5. הגדרה וקריאה של פונקציה המקבלת מערך ושלם ומחזירה שלם
```csharp
int result = MultiplyAtIndex(new int[] { 1, 2, 3 }, 2); // קריאה לפונקציה
int res2 = MultiplyAtIndex([1, 2, 3], 2); // תחביר 2023 לאותה קריאה

public static int MultiplyAtIndex(int[] arr, int index) => arr[index] * index; // תחביר מקוצר
```

{: .page-break-before}
#### 6. מציאת איבר אחרון המקיים תנאי, ב3 דרכים
בדוגמא זו: מציאת מספר **זוגי אחרון** במערך

{: .subq}
א. תחביר רגיל עם לולאת for הפוכה ו-break
```csharp
public static int LastEven(int[] arr)
{
    int lastEven = -1;
    for (int i = arr.Length - 1; i >= 0; i--)
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
ב. שימוש בתחביר כובע (^) ולולאת for הפוכה ו-break
```csharp
public static int LastEvenHat(int[] arr)
{
    int lastEven = -1;
    for (int i = 1; i <= arr.Length; i++)
    {
        if (arr[^i] % 2 == 0)
        {
            lastEven = arr[^i];
            break;
        }
    }
    return lastEven;
}
```

{: .subq}
ג. תחביר foreach קדימה בלי break

```csharp
public static int LastEvenForeach(int[] arr)
{
    int lastEven = -1;
    foreach (int num in arr)
    {
        if (num % 2 == 0)
            lastEven = num;
    }
    return lastEven;
}
```

#### 7. מערך מונים
**הבעיה:** נתון מערך של מספרים בתחום 0–100. כתבו פונקציה המחזירה מערך מונים המצביע על כמות ההופעות של כל מספר.
```csharp
public static int[] CountOccurrences(int[] arr) 
{
    int[] counts = new int[101];
    foreach (int x in arr) 
    {
        if (x >= 0 && x <= 100) 
        counts[x]++;
    }
    return counts;
}
```