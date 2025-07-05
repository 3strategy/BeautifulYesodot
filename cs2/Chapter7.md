---
layout: page
title: "פרק 7 - פונקציות"
subtitle: "פישוט מבני הקוד בעזרת פעולות חוזרות"
author: גיא סידס
lang: he
---

{: .box-note}
**הערה:** חלק מהמורים מלמדים פונקציות מוקדם יותר – כבר לאחר לולאת `for` ולפני לולאת `while` או אפילו לפני `for`. עם זאת, בסילבוס זה הוחלט ללמד פונקציות רק לאחר לולאות `for`, `while` ולולאות מקוננות, כחלק משלב חשיבה אלגוריתמי מתקדם. אומנם אישית אני ממליץ ללמד פונקציות מוקדם יותר, אך נתיישר עם הסילבוס ונציג את הפרק בהמשך לפרק 6.

## 7.1 פונקציות ללא פרמטרים

פונקציה ללא פרמטרים (void) היא פונקציה שקוראים לה מתוך `Main` כדי לבצע משימה מובחנת ואינה מקבלת קלט חיצוני.

{% highlight csharp linenos %}public static void PrintStars10()
{
    for (int i = 0; i < 10; i++)
        Console.Write("*");
    Console.WriteLine();
}

public static void Main()
{
    // קריאה לפונקציה 3 פעמים
    PrintStars10();
    PrintStars10();
    PrintStars10();
}
{% endhighlight %}

### דוגמאות נוספות

<details open markdown="1"><summary>הדפסת סכום המספרים הזוגיים מ-1 עד 100</summary>

```csharp
public static void SumEven100()
{
    int sum = 0;
    for (int num = 1; num <= 100; num++)
        if (num % 2 == 0)
            sum += num;
    Console.WriteLine($"Sum of even numbers 1-100 is {sum}");
}
```
</details>

<details open markdown="1"><summary>תרשים זרימה של קריאה ל-3 פונקציות</summary>

<div class="mermaid">
flowchart TD
    Start([1.התכנית מתחילה בקריאה ל-Main]) --> Main
    Main["Main Method"] --> |"2.קריאה ל- ;()SayHello"| SayHello[הפונקציה SayHello <br/> Hello World מדפיסה]
    SayHello --> |return| Main
    Main --> |"3.קריאה ל- ;()AddNumbers"| AddNumbers[הפונקציה AddNumbers<br/>מחשבת 3+5<br/>ומדפיסה את התוצאה]
    AddNumbers --> |return| Main
    Main --> |"4.קריאה ל- ;()SayGoodbye"| SayGoodbye[הפונקציה SayGoodbye <br/>מדפיסה Goodbye]
    SayGoodbye --> |return| Main
    Main --> End([5.סיום])
    
    style Main fill:#4fc3f7,stroke:#0277bd,stroke-width:4px,color:#fff
    style SayHello fill:#ffb74d,stroke:#f57c00,stroke-width:2px
    style AddNumbers fill:#ffb74d,stroke:#f57c00,stroke-width:2px
    style SayGoodbye fill:#ffb74d,stroke:#f57c00,stroke-width:2px
    style Start fill:#81c784,stroke:#388e3c,stroke-width:2px
    style End fill:#e57373,stroke:#d32f2f,stroke-width:2px
    linkStyle default stroke:#666666,stroke-width:3px
</div>

</details>

## 7.2 פונקציות עם פרמטרים

כדי להפוך פונקציה גמישה, נגדיר לה *פרמטרים* – משתנים שקובעים את התנהגותה בקריאה.

{% highlight csharp linenos %}
public static void PrintStars(int length)
{
    for (int i = 0; i < length; i++)
        Console.Write("*");
    Console.WriteLine();
}

public static void Main()
{
    PrintStars(5);   // *****
    PrintStars(10);  // **********
    PrintStars(3);   // ***
}
{% endhighlight %}

### דוגמאות נוספות

<details markdown="1"><summary>PrintRectangle(rows, cols)</summary>

```csharp
public static void PrintRectangle(int rows, int cols)
{
    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < cols; j++)
            Console.Write("*");
        Console.WriteLine();
    }
}
```
</details>

<details markdown="1"><summary>SayHello(string userName)</summary>

```csharp
public static void SayHello(string userName)
{
    Console.WriteLine($"שלום, {userName}!");
}
```</details>

### סיכום הביניים

בפרקים 7.1–7.2 למדנו להגדיר פונקציות מסוג `void` ללא פרמטרים ועם פרמטרים. בפונקציות אלה ניתן לאגד קוד חוזר, לשפר קריאות ולהפוך את הקוד לגמיש יותר. בפונקציות הבאות (פרק 7.3) נלמד על פונקציות שמחזירות ערך (`return`), כולל טיפוסי ערך בסיסיים ובוליאני.

