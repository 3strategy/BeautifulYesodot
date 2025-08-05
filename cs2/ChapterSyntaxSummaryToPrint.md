---
layout: page-to-print
---

### סיכום תחביר: פונקציות מחרוזות ומערכים ב-C#

#### 1. פונקציית MinTup

```csharp
public static (int, int) MinTup(int[] arr)
{
    int iMin = 0;
    for (int i = 1; i < arr.Length; i++)
    {
        if (arr[i] < arr[iMin])
            iMin = i; // מוצא את המינימום ואת האינדקס שלו
    }
    return (iMin, arr[iMin]);
}
```

#### 2. פונקציות מחרוזות מובנות

```csharp
string s = "Example String";

int position = s.IndexOf("String"); // מחזירה אינדקס התחלת תת-מחרוזת או -1
bool has = s.Contains("Exam"); // בודקת קיום תת-מחרוזת
int len = s.Length; // מחזירה את אורך המחרוזת
```

#### 3. העמסת פונקציות ותחביר פונקציה מקוצר

```csharp
// תחביר מקוצר
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

int MultiplyAtIndex(int[] arr, int index) => arr[index] * index; // תחביר מקוצר
```

#### 6. מציאת מספר זוגי אחרון במערך

א. תחביר רגיל עם לולאת for הפוכה ו-break
```csharp
int LastEven(int[] arr)
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
    int LastEvenHat(int[] arr)
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
  int LastEvenForeach(int[] arr)
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

