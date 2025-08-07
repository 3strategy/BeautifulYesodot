---
layout: page
title: "תרגול 4.5 - לולאות for: גִּלְגוּל, עוקבים"
subtitle: "תרגול מתקדם בשימוש במשתנה עזר בלולאות. השוואה בין ערכים סמוכים. טבלאות מעקב"
tags: [גילגול, גלגול, הסטוריה, שמירת היסטוריה, תרגול for, sliding window, rolling comparison]
author: גיא סידס
lang: he
---

{: .box-note}
**הערה:** בתרגילים הבאים נדרש לבצע פעולות על נתונים עוקבים (תווים או מספרים). כדי להשוות בין ערכים סמוכים, נשתמש בגִּלְגוּל (שמירת היסטוריה)

## שאלה 4.5.1

כתבו תוכנית הקולטת 30 תווים ובודקת כמה תווים עוקבים יש בקלט.  
(טיפוס תווי הוא טיפוס סדרתי שניתן להשוואה ולבדיקה גדול/קטן – המערכת מבצעת השוואה אוטומטית מול קוד ה- ASCII של התו).

לדוג' עבור 8 התווים הבאים:  
`t, a, d, c, d, c, s, t`

הפלט יהיה:
```
2
```

---

## שאלה 4.5.2

כתבו תוכנית הקולטת 50 מספרים ובודקת כמה שלשות סמוכות בהן המספר האמצעי גדול משני המספרים הסמוכים לו. (הסריקה היא לא קופצת בשלשות, אחרי בדיקת 42,45,40 בודקים את 45,40,80)

לדוג' עבור 8 המספרים הבאים:  
`25, 40, 30, 9, 80, 40, 45, 42`

הפלט יהיה:
```
3
```

<details markdown="1">
<summary>פתרון</summary>

נסרוק כל שלשה סמוכה במערך, ונספור כמה פעמים המספר האמצעי גדול משני המספרים הסמוכים. 

{% highlight csharp linenos %}public static void Main()
{
    int count = 0;
    int prev = -800; // באופן שהקוד כתוב לא תהיה שגיאה בגין חפיפה
    int prevPrev = 700; // בלי קשר לערכים שנשים.
 
    for (int i = 0; i < 50; i++)
    {
        Console.Write("Enter a number: ");
        int current = int.Parse(Console.ReadLine());

        // i>1 דואג שיהיה לנו למה להשוות החל מסיבוב שלישי
        if (i > 1 && prev > current && prev > prevPrev)
            count++;

        prevPrev = prev; // שמירת היסטוריה
        prev = current; // שמירת היסטוריה
    }

    Console.WriteLine("Number of occurences: " + count);
}
{% endhighlight %}

</details>

---

## שאלה 4.5.3

כתבו תוכנית הקולטת 40 תווים ובודקת כמה שלשות סמוכות בהן האמצעי שונה משני התווים הסמוכים והם שווים ביניהם.

לדוג' עבור 10 התווים הבאים:  
s, **r, t, r, t**, a, b, b, b, a

הפלט יהיה:
```
2
```

---

## שאלה 4.5.4 
עקבו אחרי הקוד הבא עבור צמדי הקלטים
- (90,100),
- (200,300),
- (150,100)

{% highlight csharp linenos %}public static void Main()
{
    // קליטה של זוג ראשון
    Console.WriteLine("Enter 2 int numbers");
    int prev1 = int.Parse(Console.ReadLine()); // storing history in prev1 (previous1)
    int prev2 = int.Parse(Console.ReadLine()); // for storing history.

    for (int i = 0; i < 108; i++)
    {
        Console.WriteLine("Enter 2 int numbers");
        int current1 = int.Parse(Console.ReadLine());
        int current2 = int.Parse(Console.ReadLine());
        if (current1 + current2 < prev1 + prev2)
        {
            Console.WriteLine("smaller");
        }
        // למה צריך לשים כאן ולא להתאפק לסיבוב הבא?
        prev1 = current1; // החלק החשוב בפעולה
        prev2 = current2;
    }
}
{% endhighlight %}


<details markdown="1"><summary>פתרון</summary>

## טבלת מעקב

| # (שורות)| prev1 | prev2 | current1 | current2 | i | i<108 | if  |        פלט                  |
|---------|-----|-----|----|----|----|---------------------|----------------|-----------------------|
| 1-4     |     |     |    |    |    |      |                               | Enter 2 int numbers |
| 5,6     | 90  | 110 |    |    |    |      |                               |                       |
| 8       |     |     |    |    | 0  |true  |                               |                       |
| 9       |     |     |    |    |    |      |                               | Enter 2 int numbers |
| 11-13   |     |     | 200| 300|    |    |              false              |                       |
| 18-19   | 200 | 300 |    |    |    |    |                                 |                       |
| 8-10    |     |     |    |    |1   | true |                               | Enter 2 int numbers |
| 11-13   |     |     | 150| 100|    |      |  true                         |                       |
| 15      |     |     |    |    |    |      |                               |       smaller      |
| 18-19   | 150 | 100 |    |    |    |      |                               |                       |
| 8-10    |     |     |    |    | 2  | true |                               | Enter 2 int numbers |
| ...     |     |     |    |    |... | ...  |                               | ...                |
| 8       |     |     |    |    |108 | false|                               | ← יציאה מהלולאה   |
|         |     |     |    |    |    |      |                               | סיום התוכנית      |
{: .table-en}

</details>
---
