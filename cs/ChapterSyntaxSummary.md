---
layout: page 
title: "סיכום תחביר" 
subtitle: "סיכום תחביר. כרגע כולל את שיעורים 1, 2 ועוד קצת"
tags: [סיכום, תחביר, syntax]
mathjax: true
lang: he
---

לא למדנו עדיין את שורות 26, 27, 29,30,31 אבל רשמתי בכל זאת 

הפירמוטים בשורות 26,27 לא למבחן (זה פשוט מאד נח אז רציתי שיהיה לכם)

לא למדנו (אכין סרטון) איך לרשום מספר תוכניות באותו עמוד (כל מה שקורה בשורות 33-40). שורה 36 היא נקודת ההתחלה, ומשם הקוד ימשיך ל-Q322 כלומר לבצע את שורה 10 ואילך. מי שצפה בקמפוס כבר פגש את זה.

[⬅ תחביר. קישור לגרסה להדפסה כולל קצת דברים שלא למדנו](/cs/ChapterSyntaxSummaryToPrint)

לפני הדפסה רצוי לשנות את צבע האתר ללבן (בתפריט תכנים יש שינוי צבע)

[⬅ תחביר. קישור לגרסה להדפסה כולל כל חלק א](/cs/ChapterSyntaxSummary2ToPrint)

[⬅ תחביר. קישור לגרסה כולל כל חלק א](/cs/ChapterSyntaxSummary2)

{% highlight csharp linenos %}namespace ConsoleApp121; //{} ניתן לרשום ; וכך "לחסוך" זוג סוגריים 

internal class Program
{
  // היא מחוץ לפונקציות rnd יצירת מופע של 
  static public Random rnd = new Random(); // ריק פרט לבדיקות seed משאירים
  /// <summary>
  /// /// תיעוד מעל הפעולה. תשובה לשאלה 3.2.2 בעזרת הקיצור 
  /// </summary>
  public static void Q322()
  {
    Console.WriteLine("Enter something: "); // פלט/הדפסה/בקשה/הודעה להמשתמש
    int min = int.Parse(Console.ReadLine()); // קלט מספר שלם, המרה, והשמה. 

    int max = // בבחינה מספיק לרשום כך ========== קלוט מספר שלם  =========

    int temp = rnd.Next(5, 11); // מגריל בין 5 ל-10

    int max = Math.Max(temp, min); // מחזירה (כאן) שלם, הגדול מבינהם
    min = Math.Min(temp, min); // אסור להכריז פעם שניה על משתנה
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
  static void Main2()
  {
  }
  static void Main() // אחד בלבד !!! כאן הקוד יתחיל לרוץ Main יש
  {
    Q322(); // Q322 (קריאה לפעולה (פונקציה
    Main2(); // הדרך לכתוב ולהפעיל כמה תכניות באותו פרוייקט
  }
}
{% endhighlight %}


[⬅ תחביר. קישור לגרסה להדפסה כולל קצת דברים שלא למדנו](/cs/ChapterSyntaxSummaryToPrint)