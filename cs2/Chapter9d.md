---
layout: page
title: "פרק 9d - תבניות במערכים"
subtitle: "מערך חד ממדי, תבניות"
author: גיא סידס
tags: [מערך, מערכים]
mathjax: true
lang: he
---


{: .box-note}
הפעולות באוסף זה נכתבו עבור מערכים של מספרים שלמים (`int[]`) אך התבנית בהן נכתבו מתאימה לכל טיפוס של מערך. בחלק מהפעולות יש דוגמא לפעולה **גנרית**, ובחלק דוגמא ל-**Extension** Method (שניהם אינם בתכנית הלימודים ביסודות)

**שימו לב:**
במידה שתרצו להשתמש בפעולות אלו בבחינת הבגרות תצטרכו לכתוב אותן.

<details markdown="1"><summary>פעולות בסיסיות</summary>

#### פעולה המדפיסה מערך:

תבנית לפעולה העוברת על כל איברי המערך

```csharp
// פעולה המקבלת מערך ומדפיסה אותו
// תבנית למעבר על אברי מערך
public static void Print(int[] arr)
{
    for (int i = 0; i < arr.Length; i++)
    {
        Console.Write(arr[i] + ", ");
    }
    Console.WriteLine();    // מעבר שורה
}
```

#### פעולה המדפיסה מערך בסדר הפוך:

תבנית לפעולה העוברת על כל איברי המערך בסדר הפוך

```csharp
// פעולה המקבלת מערך ומדפיסה אותו בסדר הפוך
// תבנית למעבר על אברי מערך בסדר הפוך
public static void PrintRev(int[] arr)
{
    for (int i = arr.Length - 1; i >= 0; i--)
    {
        Console.Write(arr[i] + ", ");
    }
    Console.WriteLine();    // מעבר שורה
}
```

#### פעולה המדפיסה את המיקומים הזוגיים/אי-זוגיים:

```csharp
// פעולה המקבלת מערך ומוד (0 לזוגי, 1 לאי-זוגי)
// הפעולה מדפיסה את האיברים במיקומים הרצויים
public static void PrintEvenOrOdd(int[] arr, int mod)
{
    for (int i = mod; i < arr.Length; i += 2)
        Console.Write(arr[i] + " ");
    Console.WriteLine();
}
```

#### פעולה המחזירה את סכום איברי המערך:

```csharp
// פעולה המקבלת מערך ומחזירה את סכום האיברים שלו
public static int Sum(int[] arr)
{
    int sum = 0;
    for (int i = 0; i < arr.Length; i++)
    {
        sum += arr[i];
    }
    return sum;
}
```

#### פעולה המחזירה את מספר המופעים של מספר במערך:

```csharp
// פעולה המקבלת מערך ומספר ומחזירה את מספר המופעים שלו במערך
public static int Count(int[] arr, int num)
{
    int count = 0;
    for (int i = 0; i < arr.Length; i++)
    {
        if (arr[i] == num)
            count++;
    }
    return count;
}
```
</details>

### פעולות הממלאות/בונות מערך

#### פעולה הקולטת ערכים לתוך מערך:

```csharp
// פעולה המקבלת מערך וקולטת לתוכו ערכים
public static void Read(int[] arr)
{
    Console.WriteLine($"please enter {arr.Length} values");
    for (int i = 0; i < arr.Length; i++)
    {
        arr[i] = int.Parse(Console.ReadLine());
    }
}
```

#### פעולה הבונה מערך לפי קלט מהמשתמש:

```csharp
// פעולה הבונה מערך וקולטת בו ערכים
public static int[] Build()
{
    Console.WriteLine("please enter the array size");
    int size = int.Parse(Console.ReadLine());
    int[] arr = new int[size];
    Console.WriteLine($"please enter {arr.Length} values");
    for (int i = 0; i < arr.Length; i++)
    {
        arr[i] = int.Parse(Console.ReadLine());
    }
    return arr;
}
```

#### פעולה ממלאת מערך בערך נתון:

```csharp
// פעולה המקבלת מערך ומספר וממלאת את המערך בערך
public static void Fill(int[] arr, int num)
{
    for (int i = 0; i < arr.Length; i++)
    {
        arr[i] = num;
    }
}
```

#### פעולה ממלאת מערך בערכים אקראיים בטווח:

```csharp
static Random rnd = new Random();
// פעולה המקבלת מערך, מינימום ומקסימום וממלאת באקראיים
public static void FillRnd(int[] arr, int min, int max)
{
    for (int i = 0; i < arr.Length; i++)
    {
        arr[i] = rnd.Next(min, max);
    }
}
```

#### פעולה המחזירה מערך בגודל חדש (שינוי גודל):

```csharp
// פעולה המקבלת מערך וגודל ומחזירה מערך חדש בגודל זה
public static int[] Resize(int[] arr, int size)
{
    int[] newarr = new int[size];
    for (int i = 0; i < newarr.Length; i++)
    {
        newarr[i] = arr[i];
    }
    return newarr;
}
```

#### הזזה מעגלית שמאלה:

```csharp
// פעולה המקבלת מערך ומזיזה את איבריו שמאלה מעגלית
public static void CircleLeft(int[] arr)
{
    int tmp = arr[0];
    for (int i = 0; i < arr.Length - 1; i++)
    {
        arr[i] = arr[i + 1];
    }
    arr[arr.Length - 1] = tmp;
}
```

#### הזזה מעגלית ימינה:

```csharp
// פעולה המקבלת מערך ומזיזה את איבריו ימינה מעגלית
public static void CircleRight(int[] arr)
{
    int tmp = arr[arr.Length - 1];
    for (int i = arr.Length - 1; i > 0; i--)
    {
        arr[i] = arr[i - 1];
    }
    arr[0] = tmp;
}
```

### פעולות לבדיקת תנאי במערך

#### בדיקת קיום ערך:

```csharp
// פעולה המקבלת מערך ומספר ומחזירה אמת אם הוא קיים
public static bool IsExist(int[] arr, int num)
{
    bool found = false;
    for (int i = 0; i < arr.Length && !found; i++)
    {
        found = (arr[i] == num);
    }
    return found;
}
```

#### מיקום ראשון של ערך:

```csharp
// פעולה המקבלת מערך ומספר ומחזירה את המיקום הראשון או -1
public static int Position(int[] arr, int num)
{
    int pos = -1;
    for (int i = 0; i < arr.Length && pos < 0; i++)
    {
        if (arr[i] == num)
            pos = i;
    }
    return pos;
}
```

#### בדיקה אם מערך מסודר בסדר עולה:

```csharp
// פעולה המקבלת מערך ומחזירה אמת אם הוא מסודר עולה
public static bool IsOle(int[] arr)
{
    bool isOle = true;
    for (int i = 0; i < arr.Length - 1 && isOle; i++)
    {
        isOle = (arr[i] <= arr[i + 1]);
    }
    return isOle;
}
```

#### בדיקה אם כל איברי המערך כפולות של 3:

```csharp
// פעולה המקבלת מערך ומחזירה אמת אם כולם כפולות 3
public static bool IsAllTrio(int[] arr)
{
    bool isAll = true;
    for (int i = 0; i < arr.Length && isAll; i++)
    {
        isAll = (arr[i] % 3 == 0);
    }
    return isAll;
}
```

#### ערכים משותפים בין שני מערכים:

```csharp
// פעולה המקבלת שני מערכים ומחזירה מערך של הערכים המשותפים
public static int[] CommonValues(int[] arr1, int[] arr2)
{
    int[] arr = new int[Math.Min(arr1.Length, arr2.Length)];
    int count = 0;
    for (int i = 0; i < arr1.Length; i++)
    {
        if (!IsExist(arr, arr1[i]) && IsExist(arr2, arr1[i]))
        {
            arr[count++] = arr1[i];
        }
    }
    return Resize(arr, count);
}
```

#### ערכים שונים בין שני מערכים:

```csharp
// פעולה המקבלת שני מערכים ומחזירה מערך של הערכים השונים
public static int[] UnCommonValues(int[] arr1, int[] arr2)
{
    int[] arr = new int[arr1.Length + arr2.Length];
    int count = 0;
    for (int i = 0; i < arr1.Length; i++)
    {
        if (!IsExist(arr, arr1[i]) && !IsExist(arr2, arr1[i]))
            arr[count++] = arr1[i];
    }
    for (int i = 0; i < arr2.Length; i++)
    {
        if (!IsExist(arr, arr2[i]) && !IsExist(arr1, arr2[i]))
            arr[count++] = arr2[i];
    }
    return Resize(arr, count);
}
```

### פעולות עבור ערך מקסימלי/מינימלי במערך

#### מקסימום:

```csharp
// פעולה המקבלת מערך ומחזירה את הערך המקסימלי
public static int Max(int[] arr)
{
    int max = arr[0];
    for (int i = 1; i < arr.Length; i++)
        max = Math.Max(max, arr[i]);
    return max;
}
```

#### מיקום המקסימום:

```csharp
// פעולה המקבלת מערך ומחזירה את המיקום של הערך המקסימלי
public static int IMax(int[] arr)
{
    int imax = 0;
    for (int i = 1; i < arr.Length; i++)
        if (arr[i] > arr[imax]) imax = i;
    return imax;
}
```

#### מינימום:

```csharp
// פעולה המקבלת מערך ומחזירה את הערך המינימלי
public static int Min(int[] arr)
{
    int min = arr[0];
    for (int i = 1; i < arr.Length; i++)
        min = Math.Min(min, arr[i]);
    return min;
}
```

#### מיקום המינימום:

```csharp
// פעולה המקבלת מערך ומחזירה את המיקום של הערך המינימלי
public static int IMin(int[] arr)
{
    int imin = 0;
    for (int i = 1; i < arr.Length; i++)
        if (arr[i] < arr[imin]) imin = i;
    return imin;
}
```

### פעולות עבור רצפים

#### אורך הרצף הארוך ביותר:

```csharp
// פעולה המקבלת מערך ומחזירה את אורך הרצף הארוך ביותר
public static int MaxSequence(int[] arr)
{
    int len = 1, max = 0;
    for (int i = 0; i < arr.Length - 1; i++)
    {
        if (arr[i] == arr[i + 1]) len++;
        else { max = Math.Max(max, len); len = 1; }
    }
    return Math.Max(max, len);
}
```

#### מיון לפי רצפים (גירסה 1 עם פעולת עזר):

```csharp
// פעולה המסדרת מערך על פי רצפים של ערכים (גירסה 1)
public static void SequenceOrder(int[] arr)
{
    int tmp, j;
    for (int i = 0; i < arr.Length - 1; i++)
    {
        j = FindValue(arr, arr[i], i + 1);
        if (j > 0)
        {
            tmp = arr[i + 1]; arr[i + 1] = arr[j]; arr[j] = tmp;
        }
    }
}

// פעולת עזר למציאת ערך במערך החל מתווך מסוים
public static int FindValue(int[] arr, int value, int start)
{
    int pos = -1;
    for (int i = start; i < arr.Length && pos < 0; i++)
        if (arr[i] == value) pos = i;
    return pos;
}
```

#### מיון לפי רצפים (גירסה 2 בלי פעולת עזר):

```csharp
// פעולה המסדרת מערך על פי רצפים של ערכים (גירסה 2)
public static void SequenceOrder2(int[] arr)
{
    int tmp;
    for (int i = 0; i < arr.Length - 1; i++)
        for (int j = i + 1; j < arr.Length; j++)
            if (arr[i] == arr[j])
            {
                tmp = arr[i + 1]; arr[i + 1] = arr[j]; arr[j] = tmp;
                i++;
            }
}
```

#### לכידת רצפים לכיווץ (zip):

```csharp
// פעולה המקבלת מערך ומחזירה מערך זיג-זג של ערך וכמותו ברצף
public static int[] Zip(int[] arr)
{
    int[] tmp = new int[arr.Length * 2];
    int p = 0, len = 1;
    for (int i = 0; i < arr.Length - 1; i++)
    {
        if (arr[i] == arr[i + 1]) len++;
        else { tmp[p] = arr[i]; tmp[p+1] = len; p += 2; len = 1; }
    }
    // טיפול ברצף האחרון
    tmp[p] = arr[arr.Length - 1]; tmp[p+1] = len;
    return Resize(tmp, p + 2);
}
```

#### פירוק מערך מכווץ (unzip):

```csharp
// פעולה המקבלת מערך מכווץ ומחזירה מערך פרוש
public static int[] UnZip(int[] arr)
{
    int[] tmp = new int[SumOdd(arr)];
    int value, j = 0;
    for (int i = 0; i < arr.Length; i += 2)
    {
        value = arr[i];
        for (int n = 0; n < arr[i+1]; n++)
            tmp[j + n] = value;
        j += arr[i+1];
    }
    return tmp;
}

// פעולת עזר לסכום האיברים באינדקסים אי-זוגיים
public static int SumOdd(int[] arr)
{
    int sum = 0;
    for (int i = 1; i < arr.Length; i += 2)
        sum += arr[i];
    return sum;
}
```

### מיון בועות (Bubble Sort)

```csharp
// מיון בועות: עוברים על המערך ומבצעים מעבר אחד בכל איטרציה
public static void BubleSort(int[] arr)
{
    for (int i = 0; i < arr.Length; i++)
        BubleSort(arr, arr.Length - 1);
}

// פעולת עזר: מעבר יחיד במערך
private static void BubleSort(int[] arr, int end)
{
    for (int i = 0; i < end - 1; i++)
        if (arr[i] > arr[i+1]) 
            Swap(arr, i, i+1);
}
```

```csharp
// פעולת עזר להחלפת ערכים במערך
private static void Swap(int[] arr, int inx1, int inx2)
{
    int tmp = arr[inx1]; arr[inx1] = arr[inx2]; arr[inx2] = tmp;
}
```
