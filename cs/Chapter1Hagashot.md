---
layout: page 
title: "- מבוא לשפת #C, עבודה במערכת ההגשות" 
subtitle: "עבודה בויזואל סטודיו ובמערכת ההגשות"
tags: [מערכת ההגשות]
mathjax: true
lang: he
---

# איך לעבוד נכון עם [מערכת ההגשות](https://הגשות.שלי.com/?join=ZWTRS2)

הדרך המומלצת לעבוד במערכת ההגשות היא:

1. נכנסים לתרגיל כלשהו,
2. מעתיקים את **כותרת הפעולה** מתוך חלון הפתרון המוצג שם,
3. מדביקים את הכותרת ב־Visual Studio מעל ה-`()Main`
4. מוסיפים **סוגריים** { }  לפעולה.
5. קוראים לפעולה מתוך `()Main`. לדוגמא:



הערה: אצלכם זה אמור להיראות ככה אם אתם מנסים פעם ראשונה מהבית

```cs
namespace ConsoleApp111
{
    internal class Program
    {

        public static void DefineIntVariables()
        {
            // TODO: למלא את גוף הפעולה לפי הדרישה
        }

        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
        }
    }
}
```

למי שהיו בשיעור הראיתי איך מגיעים למצב כזה כשרושמים `;` בסוף השורה הראשונה ועוברים שורה (לוחצים enter):

{% highlight csharp linenos mark_lines="5 6 7 8" %}namespace ConsoleApp1;

public class Program
{
    public static void DefineIntVariables()
    {
        // TODO: למלא את גוף הפעולה לפי הדרישה
    }

    public static void Main(string[] args)
    {
        // קריאה לפעולה: כך נגרום לקוד שנכתוב בפעולה לרוץ
        DefineIntVariables();

    }
}
{% endhighlight %}


לאחר מכן:

- פותרים את השאלה כרגיל ב־Visual Studio.  
- בודקים שהכול עובד.  
- מעתיקים את ==הפעולה כולה== בחזרה למערכת ההגשות.

