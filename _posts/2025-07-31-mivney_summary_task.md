---
layout: post
title: "גיא סידס - מטלה מסכמת"
subtitle: מטלה מסכמת בהשתלמות מבני נתונים - תשפ"ה
tags: [AI, GPT, cognition, שיפור החשיבה, השפעות AI]
comments: true
mathjax: true
author: "גיא סידס, ת.ז. 024416992, מצפן: 217318, מנחה: דפנה לוי רשתי"
lang: he
---

**שם המגיש** גיא סידס: ת.ז. 024416992
 
**תאריך:** 31/7/25

**השתלמות:** מבני נתונים - תשפ"ד מספר מצפן  217318

**מנחה:** דפנה לוי רשתי


---

# חלק א׳ - רפלקציה

השתלמות מבני נתונים קידמה אותי באופן משמעותי בהוראת מדעי המחשב. קודם כל, ההשתלמות חיזקה את תחושת הביטחון שלי בהוראת נושאים מורכבים כמו רקורסיה ומבני נתונים מתקדמים. בזכות ההשתלמות נחשפתי לשיטות חדשות שהפכו את ההוראה שלי לממוקדת, אפקטיבית ומעניינת יותר עבור התלמידים. בנוסף בהשתלמות התנסיתי יותר מבעבר בשימוש בבדיקות אוטומטיות, ובכתיבת בדיקות אוטומטיות (Unit Testing), מה ששדרג את איכות הקוד שלי ואפשר לי לאתר תקלות מוקדם יותר ולעבוד בצורה שתאפשר לי לסייע בעתיד לתלמידים לבדוק קוד שלהם (אם או בלי גישה למערכת Stacks שבה עבדנו לאורך ההשתלמות). הליווי הצמוד והאיכותי של המרצה, היה יוצא דופן, וגישתה האכפתית והתומכת עודדה אותי ללמוד ולהתפתח. מצפה בקוצר רוח להשתלמויות נוספות בהנחייתה.

---

{: .page-break-before}
# חלק ב׳ - עבודת חקר: בניית פרויקט בדיקות שיתופי

זה לא הנושא עליו התבקשנו לכתוב, אבל **זה חשוב יותר**.
הפרויקט השיתופי בגיט הציבורי היה מורכב מן הצפוי והתפתח לאורך 17 גרסאות. התחלתי עם הקמת תשתית הבדיקות, הוספת קבצי `.gitignore`, ו-README מסודר לתיעוד. נתקלתי בתחילה בבעיות תאימות בין פרוייקט הבדיקות לבין .netFramework שגרמו לשגיאות יוצאות דופן. **התהליך כלל 2 מחיקות ובניות מחדש** של הפרויקט, הפעם כספריית מחלקות (ClassLibrary) תוך שימוש ב-NUnit שנוסף דרך NuGet. כיוון שגם טכניקה זו נכשלה והניבה פרוייקט בדיקות כושל, השתמשתי לבסוף בתשתית ישנה יותר מפרוייקטי בדיקות קודמים, ויצרתי בסיס איתן שעליו ניתן לעבוד, אשר מאשפר להינות מכל העולמות (עולם ה-`UnitTests` והעולם הגרפי של `Unit4.dll` שהכין ולרי פקאר ז"ל). 
די מוקדם בתהליך הבנתי שעלי לשתף פרוייקט זה לכלל המשתלמים כדי להעביר אותם את המשוכה ולאפשר לכולם למנף את יכולות הבדיקה שלהם.

במהלך הפיתוח, הוספתי הפניות בין פרויקטים כדי להבטיח גישה מלאה למבני הנתונים. לאחר כמה סבבי תיקונים, הצלחתי לגרום לכל הבדיקות לעבור. הפרויקט השתפר משמעותית כשהכנסתי פעולות חדשות לבניית עצים ויזואליים (`BuildTreeFromVisual`), שהקלו על כתיבת הבדיקות והפכו אותן לנגישות למשתלמים נוספים. לבסוף, יצרתי תיעוד עדכני שכלל דוגמאות קוד, לינקים לצ'אטים של GPT, ודמואים שימושיים.

#### הגיט הציבורי:
[Console250722Mivney](https://github.com/3strategy/Console250722Mivney)

##  הסבר בנוגע להתקנה ושימוש בפרוייטק

להלן קובץ ה- **README** של הפרוייקט הציבורי

<div markdown ="1" style="direction:ltr; text-align: left; border: 1px solid black; padding: 10px;">
### This is a demo of adding a test project.

1. Going by the book, went very badly (due to the usage of Unit4.dll which requires .Net Framework). See earlier versions of this readme if you want to see details.
2. I ended up bringing in an old unit test project that was created with NUnit framework (that's no longer proposed).
3. So the shortest way to get started is by cloning this project and working on it. 

[Here is the GPT chat](https://chatgpt.com/share/687fcb71-ee74-800e-8cf4-8f5ecca3f73c) 


![צפיה בתוצאות הבדיקות](assets/img/image-2.png)


#### First run
When you first run the project you should get this:
![יצוג גרפי של עץ](assets/img/image.png)

---

the project now support creating trees (mainly for testing purposed) using the following syntax:

```csharp
var root = BuildTreeFromVisual(new[] {
    "     5     ",
    "  3     8  ",
    "1  4       "
});
```

or with **line spaces** and this would support test cases like this one:
```
[TestCase(new[] {
    "   10   ",
    "        ",
    " -2  7  "
}, 15, TestName = "TreeWithNegativeValues")]
```
This usage is demonstrated in this test class:
`..\Test3rdTry\BinNode\SumBinaryTreeNodes.cs`

</div>

---


## קישור לצ'אט: כיצד מכינים בדיקות בעזרת GPT
שיתפתי למשתתפי ההשתלמות גם את הצ'אט של יצירת הבדיקות כדי שיראו כיצד ניתן להעזר ב-GPT ליצירת בדיקות אוטומטיות שקל לשלב בפרוייקט הבדיקות.
[קישור לצ'אט](https://chatgpt.com/share/687fcb71-ee74-800e-8cf4-8f5ecca3f73c)

---

{: .page-break-before}
# חלק ג׳ - כתיבת פונקציות הרחבה רקורסיביות והשוואת ביצועים

בתהליך כתיבת פונקציות הרחבה (`Extension Methods`) הרקורסיביות `ToArray` ו-`ToArray2`, התמקדנו (אני ו-GPT) ביצירת שתי גרסאות:

1. גרסה ראשונה (`ToArray2`): מקצה מערך מחדש בכל שלב ברקורסיה.
2. גרסה שנייה (`ToArray`): מבצעת הקצאת מערך יחידה ויעילה, המתבצעת רק פעם אחת, תוך העברת מערך כבר מוקצה כפרמטר בין שלבי הרקורסיה.

השוואת הביצועים בין שתי הגרסאות הוכיחה שהגרסה השנייה (עם הקצאת מערך יחידה) יעילה בהרבה, בעיקר במערכים גדולים. תהליך הכתיבה היה איטרטיבי ודרש מספר תיקונים והתאמות עד שהגענו לפתרון האופטימלי, כולל שיפור ההבנה שלי בנושאי רקורסיה וביצועים. כתיבת הבדיקות נעשתה באופן יסודי במסגרת הצ'אט "NUnit 3 Test Setup", עם תשומת לב מדויקת לפרטים, מה שחיזק מאוד את מיומנויותיי בתחום.

#### הקוד הלא יעיל

```csharp
/// <summary>
/// Recursively converts the stack to an array of its elements (bottom to top), restoring the stack.
/// </summary>
public static T[] ToArray2<T>(this Stack<T> stack)
{
    if (stack.IsEmpty())
        return Array.Empty<T>();

    // Pop the top element
    T top = stack.Pop();
    // Recursively get array of remaining elements
    T[] rest = stack.ToArray2();
    // Restore the popped element
    stack.Push(top);

    // Combine rest and top into a new array
    T[] result = new T[rest.Length + 1];
    for (int i = 1; i <= rest.Length; i++)
        result[i] = rest[i - 1];
    result[0] = top;

    return result;
}
```

---

#### הקוד היעיל

```csharp
/// <summary>
/// Recursive extension method. Converts the stack to an array of its elements (bottom → top), restoring the stack.
/// Performs **only one** array allocation by creating it at the deepest (empty‑stack) frame and
/// filling indices while the recursion unwinds.
/// </summary>
public static T[] ToArray<T>(this Stack<T> stack) => BuildArray(stack, 0);


/// <summary>
/// Recursive helper for the parent ToArray.
/// <para>depth = how many elements have been popped so far (also the index to write)</para>
/// <para>When the stack is empty we allocate the array sized to <c>depth</c>.</para>
/// <para>On the way back up we restore the stack and fill <c>array[depth]</c> with <c>top</c>.</para>
/// </summary>
private static T[] BuildArray<T>(Stack<T> stack, int depth)
{
    if (stack.IsEmpty())
        return new T[depth]; // single allocation happens exactly once at the deepest call

    T top = stack.Pop();
    T[] array = BuildArray(stack, depth + 1); // recurse first, depth grows
    array[depth] = top;                       // fill while unwinding (bottom→top order)
    stack.Push(top);                          // restore
    return array;
}
```

#### בדיקות הביצועים

```csharp
public static void CompareToArrayPerformance()
{
    const int N = 8000;
    // Build a template stack
    var template = new Stack<int>();
    for (int i = 0; i < N; i++)
        template.Push(i);

    // Helper to clone the stack
    Stack<int> Clone(Stack<int> orig)
    {
        var temp = new Stack<int>();
        var clone = new Stack<int>();
        while (!orig.IsEmpty())
            temp.Push(orig.Pop());
        while (!temp.IsEmpty())
        {
            var v = temp.Pop();
            orig.Push(v);
            clone.Push(v);
        }
        return clone;
    }

    const int iterations = 10;
    long totalTime1 = 0, totalTime2 = 0;
    int[] samples1 = new int[iterations];
    int[] samples2 = new int[iterations];

    for (int it = 0; it < iterations; it++)
    {
        var s1 = Clone(template);
        var s2 = Clone(template);

        var sw = Stopwatch.StartNew();

        var arr2 = s2.ToArray2();
        sw.Stop(); totalTime2 += sw.ElapsedMilliseconds;

        sw.Restart();
        var arr1 = s1.ToArray();
        sw.Stop(); totalTime1 += sw.ElapsedMilliseconds;

        // Record a small sample to verify correctness
        samples1[it] = arr1.Length > 0 ? arr1[0] : int.MinValue;
        samples2[it] = arr2.Length > 0 ? arr2[0] : int.MinValue;
    }

    Console.WriteLine($"Avg ToArray:  {totalTime1 / (double)iterations:F2} ms");
    Console.WriteLine($"Avg ToArray2: {totalTime2 / (double)iterations:F2} ms");
    Console.WriteLine("Test iterations:");
    for (int it = 0; it < iterations; it++)
        Console.WriteLine($"  iter {it}: ToArray={samples1[it]}, ToArray2={samples2[it]}");
}
```

#### תוצאות הבדיקות
```
Avg ToArray:  0.80 ms
Avg ToArray2: 96.50 ms
Sample[0] per iteration:
  iter 0: ToArray=7999, ToArray2=7999
  iter 1: ToArray=7999, ToArray2=7999
  iter 2: ToArray=7999, ToArray2=7999
  iter 3: ToArray=7999, ToArray2=7999
  iter 4: ToArray=7999, ToArray2=7999
  iter 5: ToArray=7999, ToArray2=7999
  iter 6: ToArray=7999, ToArray2=7999
  iter 7: ToArray=7999, ToArray2=7999
  iter 8: ToArray=7999, ToArray2=7999
  iter 9: ToArray=7999, ToArray2=7999
```

---{.page-break-before}

