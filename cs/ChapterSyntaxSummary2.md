---
layout: page 
title: "סיכום תחביר" 
subtitle: "סיכום תחביר. כולל כל חלק א"
tags: [סיכום, תחביר, syntax]
mathjax: true
lang: he
---

[⬅ תחביר. קישור לגרסה להדפסה כולל קצת דברים שלא למדנו](/cs/ChapterSyntaxSummary2ToPrint)
לפני הדפסה רצוי לשנות את צבע האתר ללבן (בתפריט תכנים יש שינוי צבע)

{% highlight csharp linenos %}namespace ConsoleApp121; //{} ניתן לרשום ; וכך "לחסוך" זוג סוגריים 

internal class Program
{
    // static היא מחוץ לפונקציות! חייבים להגדיר כ rnd יצירת מופע של 
    static public Random rnd = new Random(); // ריק פרט לבדיקות seed משאירים

    /// <summary>
    /// /// תיעוד מעל הפעולה. תשובה לשאלה 3.2.2 בעזרת הקיצור 
    /// </summary>
    public static void Q322()
    {
        Console.WriteLine("Enter something: "); // פלט/הדפסה/בקשה/הודעה להמשתמש
        int min = int.Parse(Console.ReadLine()); // קלט מספר שלם, המרה, והשמה. 

        int max = 5; // בבחינה מספיק לרשום כך ========== קלוט מספר שלם  =========

        int temp = rnd.Next(9, 31); // מגריל בין 9 ל-30
        bool isOk = rnd.Next(0, 2) == 1; // הגרלת 0 או 1 + השמת תוצאת הביטוי הלוגי
        max = Math.Max(temp, min); // מחזירה (כאן) שלם, הגדול מבינהם
        int min = Math.Min(temp, min); // (שגיאה: (אסור להכריז פעם שניה על משתנה
        double avg = (double)(min + max) / 2; // התוצאה תהיה שלם (casting) ללא
        avg = Math.Round(avg, 3);  // ל-3 ספרות avg מעגל את 
        double sqr = Math.Sqrt(avg); // שורש ריבועי.
        int twoBehzkat3 = (int)Math.Pow(2, 3); // לשלם (casting) חזקה.2³ ממשי ואז
        Console.WriteLine($"min: {min} and max is {max}"); // שירשור מומלץ
        Console.WriteLine($"sqr: {sqr:F4} ... "); // (עיגול ל-4 ספרות (בהדפסה בלבד
        Console.WriteLine($"avg: {avg:0.000} ..."); // 91.500 מבטיח פורמט 3 ספרות
        int mod3 = max % 3; // שארית חלוקה ב-3
        int rDigit = max % 10; // מחלץ ספרה ימנית
        int tensDig = max / 10 % 10; // (ספרת עשרות (בעקבות חלוקה ב-10 וחילוץ ספרה
        bool minIsZugi = min % 2 == 0; // חישוב זוגיות (ביטוי לוגי) והשמת התוצאה במשתנה
    }

    static void Q333()
    {
        int num = 5, length = 10;
        if (num == 0)
            Console.WriteLine("First condition met");
        else if (num == 1)
        {
            Console.WriteLine("Second condition met");
            Console.WriteLine("Only multiple statments require a block");
        }
        else
            Console.WriteLine("Will happen if nothing else happened");

        // בסוף כל סיבוב ;  בתחילת סיבוב ;  במעבר ראשון
        for (int i = 0; i < length; i++)
        {
            // פעמים length יבוצע for בלוק
            if (num > 17) // אם לא קורה משהו חריג
                break; // יציאה מוקדמת מלולאה
        }
        for (int i = length - 1; i >= 0; i--) { }// reversed loop

        while (num > 0) // שימושי כשלא ידוע מספר החזרות
        {
            // מתקיים num > 0 יבוצע כל עוד התנאי 
        }
    }

    public static void Main() // אחד בלבד !!! כאן הקוד יתחיל לרוץ Main יש
    {
        Q322(); // Q322 (קריאה לפעולה (פונקציה
        Q333(); // הדרך לכתוב ולהפעיל כמה תכניות באותו פרוייקט
    }
}

{% endhighlight %}


[⬅ תחביר. קישור לגרסה להדפסה כולל קצת דברים שלא למדנו](/cs/ChapterSyntaxSummary2ToPrint)