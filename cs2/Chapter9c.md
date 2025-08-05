---
layout: page
title: "פרק 9c - מערך מונים"
subtitle: "מערך מונים, מערך דגלים (מציינים), ומערך צוברים"
author: גיא סידס
tags: [מערך, מערכים, מערך מונים, מערך דגלים, מערך צוברים, foreach]
mathjax: true
lang: he
---


מערך שבו כל אינדקס (מיקום) מייצג ערך מסוים, והערך במיקום זה מציין את מספר הפעמים שהערך הופיע.
{: .box-note}

### שאלה לדוגמה

**הבעיה:** נתון מערך של מספרים בתחום 0–100. כתבו פונקציה המחזירה מערך מונים המצביע על כמות ההופעות של כל מספר.

#### פתרון

```csharp
public static int[] CountOccurrences(int[] arr) {
  int[] counts = new int[101];
  foreach (int x in arr) {
    if (x >= 0 && x <= 100) counts[x]++;
  }
  return counts;
}
```

---

## מערך דגלים בוליאניים (מערך מציינים)

מערך בוליאני (`bool[]`) בו כל אינדקס מייצג ערך מסוים, והערך `true` מציין נוכחות או תקינות, ו-`false` חוסר.

### שאלה לדוגמה

**הבעיה:** נתון מערך של מספרים בתחום 0–100. כתבו פונקציה שבודקת אם מספר נתון `n` הופיע לפחות פעם אחת במערך.

#### פתרון

```csharp
public static bool[] BuildFlags(int[] arr) {
  bool[] flags = new bool[101];
  foreach (int x in arr) {
    if (x >= 0 && x <= 100) flags[x] = true;
  }
  return flags;
}

public static bool Exists(int n, bool[] flags) {
  return (n >= 0 && n < flags.Length) && flags[n];
}
```

---

{: .box-error}
**הערה חשובה:** בשימוש בטווח ערכים פתוח (למשל כל מספר `int`), שיטות אלו עלולות לגרום לבעיות אחסון וביצועים קשות. במקרים מעשיים נהוג להשתמש במבני נתונים דינמיים (למשל `Dictionary<int,int>` או `HashSet<int>`).

<details markdown="a"><summary>דוגמא להתמודדות מאי 2025</summary>

יתכן שדורש הגדרות קומפילציה מיוחדות

```csharp
using System;
using System.Collections;
using System.Collections.Generic;

public class Program
{
private const int FLAG_VALUE = int.MinValue; //using Queue<int?> nullable takes 2X space

/// <summary>
/// working on queue from Collections generic (didn't check perf differences on Queue from Mivney)
/// validates all whole numbers beween min, and max are in the queue.
/// need to test again - it might be possible to revert to bool[] and still get it going
/// under the 2.1 billion limit.
/// </summary>
/// <param name="q"></param>
/// <returns></returns>
/// <exception cref="ArgumentException"></exception>
public static bool CheckValidQ(Queue<int> q)
{
    int max = int.MinValue;
    int min = int.MaxValue;
    int current = 0;
    int length = 0;

    // Find min, max, and count by looping through queue once
    // Add flag marker to detect when we've completed the loop
    q.Enqueue(FLAG_VALUE);

    do
    {
        current = q.Dequeue();
        if (current != FLAG_VALUE)
        {
            //Console.WriteLine(current);
            if (current > max)
                max = current;
            if (current < min)
                min = current;
            length++;
            q.Enqueue(current); // Put it back at the end
        }
    } while (current != FLAG_VALUE); // Stop when we hit the flag

    // Check if range matches length (consecutive sequence)
    if (max - min + 1 != length)
        return false;

    // Create BitArray to track which values we've seen
    long range = (long)max - (long)min + 1;
    if (range > int.MaxValue)
        throw new ArgumentException("Range too large for BitArray");

    var bits = new BitArray((int)range);

    // Loop through queue again to mark bits (flag is still at front)
    //int check = q.Dequeue(); // Remove the flag marker
    q.Enqueue(FLAG_VALUE); // Add it back at the end

    do
    {
        current = q.Dequeue();
        if (current != FLAG_VALUE)
        {
            bits.Set(current - min, true);
            q.Enqueue(current); // Put it back at the end
        }
    } while (current != FLAG_VALUE);

    // Check if all positions are set to true
    for (int i = 0; i < 100; i++)
        //Console.WriteLine(bits.Get(i));
        if (!bits.Get(i))
            return false;

    return true;
}


/// <summary>
/// Creates a test queue at the desired size, with sequential whole numbers.
/// starting from int.MinValue + 5
/// </summary>
public static Queue<int> CreateReasonableTestQueue(int millions = 100)
{
    long count = millions * 1_000_000L;
    const int startValue = int.MinValue + 5; 

    Console.WriteLine($"Creating test queue with {count:N0} elements ({millions} million)...");

    var queue = new Queue<int>();

    for (long i = 0; i < count; i++)
    {
        queue.Enqueue(startValue + (int)i);

        if (i % 10_000_000 == 0 && i > 0) // Progress bar
            Console.WriteLine($"Added {i:N0} elements...");
    }

    Console.WriteLine($"Test queue created! Size: {queue.Count:N0}");
    return queue;
}


public static void Main()
{
    int millionElements = 2000; // above int.MaxValue, it's impossible to configure the bits array.

    try
    {
        Console.WriteLine("=== Queue Validation Test ===");
        var startTime = DateTime.Now;

        Queue<int> testQueue;
        testQueue = CreateReasonableTestQueue(millionElements);
        var creationTime = DateTime.Now;
        Console.WriteLine($"Queue creation took: {(creationTime - startTime).TotalSeconds:F2} seconds");

        Console.WriteLine("Starting validation...");
        bool isValid = CheckValidQ(testQueue);
        var endTime = DateTime.Now;

        Console.WriteLine($"Validation result: {isValid}");
        Console.WriteLine($"Validation took: {(endTime - creationTime).TotalSeconds:F2} seconds");
        Console.WriteLine($"Total time: {(endTime - startTime).TotalSeconds:F2} seconds");
        Console.WriteLine($"Final queue size: {testQueue.Count:N0}");
    }
    catch (OutOfMemoryException)
    {
        Console.WriteLine("ERROR: Out of memory! Try a smaller test size.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"ERROR: {ex.Message}");
    }
}
}
```
</details>


---

## מערך צוברים (Prefix Sum Array)

מערך שבו כל אינדקס `i` מכיל את הסכום המצטבר של כל הערכים במערך המקורי מ־0 עד `i`. שימוש במערך צוברים מאפשר חישוב סכום תת־מערך בין שני אינדקסים `l` ו־`r` בזמן O(1) לאחר בנייתו.

### שאלה לדוגמה

**הבעיה:** נתון המערך `[1, 3, 5, 2, 4]`. בנו מערך צוברים, והשתמשו בו לחישוב סכום הערכים בתחום מ־`l=1` עד `r=3`.

#### פתרון

```csharp
int[] BuildPrefixSums(int[] arr) {
  int n = arr.Length;
  int[] prefix = new int[n];
  prefix[0] = arr[0];
  for (int i = 1; i < n; i++) {
    prefix[i] = prefix[i - 1] + arr[i];
  }
  return prefix;
}

int RangeSum(int l, int r, int[] prefix) {
  return (l == 0) ? prefix[r] : prefix[r] - prefix[l - 1];
}

// שימוש:
int[] arr = { 1, 3, 5, 2, 4 };
int[] prefix = BuildPrefixSums(arr);      // {1, 4, 9, 11, 15}
int sum_1_3 = RangeSum(1, 3, prefix);      // 11 - 1 = 10
```
















### שאלה לדוגמה

**הבעיה:** נתון מערך של מספרים בתחום 0–100. כתבו פונקציה המחזירה מערך מונים המצביע על כמות ההופעות של כל מספר.

#### פתרון

```csharp
public static int[] CountOccurrences(int[] arr) {
  int[] counts = new int[101];
  foreach (int x in arr) {
    if (x >= 0 && x <= 100) counts[x]++;
  }
  return counts;
}
```

---

## מערך דגלים בוליאניים (מערך מציינים)

מערך בוליאני (`[]bool`) בו כל אינדקס מייצג ערך מסוים, והערך `true` מציין נוכחות או תקינות, ו-`false` חוסר.

### שאלה לדוגמה

**הבעיה:** נתון מערך של מספרים בתחום 0–100. כתבו פונקציה שבודקת אם מספר נתון `n` הופיע לפחות פעם אחת במערך.

#### פתרון

```csharp
public static bool[] BuildFlags(int[] arr) {
  bool[] flags = new bool[101];
  foreach (int x in arr) {
    if (x >= 0 && x <= 100) flags[x] = true;
  }
  return flags;
}

public static bool Exists(int n, bool[] flags) {
  return (n >= 0 && n < flags.Length) && flags[n];
}
```

---

> **הערה חשובה:** בשימוש בטווח ערכים פתוח (למשל כל מספר `int`), שיטות אלו עלולות לגרום לבעיות אחסון וביצועים קשות. במקרים מעשיים נהוג להשתמש במבני נתונים דינמיים (למשל `>Dictionary<int,int` או `HashSet<int>`).


## קישורים

[⬅ עִבְרוּ לפרק 9 - מערכים](/cs2/Chapter9)

[⬅ עִבְרוּ לפרק 9a - גרסת ללא אנימציות](/cs2/Chapter9a)

[⬅ עִבְרוּ לפרק 9c - מערך מונים וצוברים](/cs2/Chapter9c)

[⬅ עִבְרוּ לתרגול 9.3 - מערך מונים - עדיין לא קיים!~!!!!](/cs2/Chapter9Ex9.3)


## תרגול

[⬅ עִבְרוּ לתרגול 9.1 - מערך חד ממדי](/cs2/Chapter9Ex9.1)

[⬅ עִבְרוּ לתרגול 9.2 - מערכים - שאלות ב- CodeWars](/cs2/Chapter9Ex9.2)

## סרטונים

[סרטוני פרק 9: הסרטון על מערך מונים](https://www.youtube.com/watch?v=LxYAJY81gNo&list=PLnVUJu2KuoA2cT3X-Fui7j6HZJWZM6vnK&index=24)
