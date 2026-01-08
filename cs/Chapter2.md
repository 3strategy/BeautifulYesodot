---
layout: page
title: "פרק 2 המחלקה Math, Random"
subtitle: "חישובים מתמטיים ומספרים אקראיים"
tags: [המחלקה Random,static Random,איתחול סטטי, המתמטית,דיבוג breakpoints, הגרלות, פונקציות מתמטיות, טבלת מעקב]
author: גיא סידס
lang: he
---
<!-- https://chatgpt.com/c/67f0f869-af10-800e-8479-c8fd3873432c -->

{: .box-note}
**בקצרה:** בפרק זה נכיר את השימוש במחלקות Math ו-Random של שפת C#, המאפשרות לנו לבצע חישובים מתמטיים ולהשתמש במספרים אקראיים.

## שימוש במחלקה Math

המחלקה `Math` מאפשרת לבצע חישובים מתמטיים מורכבים באופן פשוט.

דוגמאות נפוצות:

{% highlight csharp linenos %}double result = Math.Pow(2, 3); // חזקה - התוצאה 8
Console.WriteLine(result);

result = Math.Sqrt(16); // שורש ריבועי - התוצאה 4
Console.WriteLine(result);

result = Math.Abs(-10); // ערך מוחלט - התוצאה 10
Console.WriteLine(result);

result = Math.Round(3.565, 2); // עיגול ל-2 ספרות אחרי הנקודה - התוצאה 3.57
Console.WriteLine(result);

result = Math.Floor(3.9); // עיגול כלפי מטה - התוצאה 3
Console.WriteLine(result);

result = Math.Ceiling(3.9); // עיגול כלפי מעלה - התוצאה 4
Console.WriteLine(result);
{% endhighlight %}

**floor הוא עיגול מטה, ולא סתם מחיקה של השבר**
```csharp
static void Main(String[] args)
{
    double r = -1.2;
    Console.WriteLine($"after casting {(int)r}"); // -1
    Console.WriteLine($"after floor {Math.Floor(r)}"); // -2
}
```

## מספרים אקראיים (Random)

נשתמש במחלקה `Random` כדי לייצר מספרים אקראיים.

יצירת מספר אקראי שלם בין 1 ל-10:

{% highlight csharp linenos %}public static Random rnd = new Random();

public static void Main()
{
 int number = rnd.Next(1, 11); // 1-10
 Console.WriteLine(number);
}
{% endhighlight %}

יצירת מספר אקראי ממשי בין 0 ל-1:

{% highlight csharp linenos %}public static Random rnd = new Random();

public static void Main()
{
 double number = rnd.NextDouble();
 Console.WriteLine(number);
}
{% endhighlight %}

## דוגמא לשימוש במספרים אקראיים

הדמיית הטלת קובייה:

{% highlight csharp linenos %}public static Random rnd = new Random();

public static void Main()
{
 int dice = rnd.Next(1, 7); // 1-6
 Console.WriteLine("Dice roll result: " + dice);
}
{% endhighlight %}

## טבלת מעקב (דוגמה לשימוש ב-Random)

{: .table-en}

| שורת קוד | dice | פלט                     |
|-----------|------|-------------------------|
| הגדרה    | 4    |                         |
| פלט      | 4    | Dice roll result: 4  |

## למה מאתחלים רק אובייקט אחד, כלומר עובדים עם `static Random`? {#id.staticrandom}

<details markdown="1"><summary>הוכחה שחשוב להימנע מאיתחול rnd בתוך פונקציה</summary>

{: .box-error}
מעטים מודעים לבעיה המוסברת כאן. כדי להסביר אותה **חייבים להכיר מערכים**, ורצוי להכיר עצמים. כדאי להיכנס לכאן בשלב מאוחר יותר של הלמידה. אין לכך השלכות לבגרות (מעטים מכירים את הבעייה ואין כמעט ראנדום בבחינות בגרות). כמובן **שלשימושים מציאותיים זו תובנה מאד חשובה.**

**בקוד שלהלן ממלאים מערך של 1000 שלמים במספרים אקראיים 0 או 1. במצב רנדומלי עלינו לצפות לתוצאה יחסית קרובה ל-500 אם נספור את כמות ה-1 שקיבלנו.** (בין 468–532 ב-95% מהניסויים שנערוך).

**הדוגמא מצליחה להראות את הפגם באיתחול מרובה, כאשר מריצים אותה בגרסת .net framework 4.7.2. יתכן שבגרסאות שונות אלגוריתם בחירת ה-seed יותר מתקדם ומכשיל את הדוגמא.** על כל פנים העיקרון ברור. המופע (אובייקט) rnd הוא מנוע שכבר מכיל בתוכו שרשרת צפוייה מראש של מספרים אקראיים, והשרשרת תלוייה ב-seed שנקבע בעצמו באופן אקראי. כדי ליצור 1000 מספרים אקראיים לא נכון ליצור 1000 מכונות לוטו. מכונה אחת יכולה להגריל אינסוף מספרים. ברגע שיצרנו 1000 מכונות באותו שבריר שנייה (כפי שמודגם כאן) יתכן שרבות מהמכונות שיצרנו זהות, ואנחנו בעצם מבקשים מ-1000 מכונות יחסית זהות, לשלוף את המספר הראשון שיש להן במצבור. התוצאה במקרים טיפוסיים היא אוסף שאינו לגמרי רנדומלי, ובדוגמא קיצונית זו מקבלים ממש 1000 תוצאות שכולן 0 או כולן 1.

{% highlight csharp linenos %}static int[] arr = new int[1000];
static int current = 0;
static void Main(string[] args)
{
    for (int i = 0; i < 1000; i++)
        Fill(); // מילוי המערך

    int count = 0;
    for (int i = 0; i < 1000; i++)
    {
        if (arr[i] > 0) // 1-ספירת כמות ה
            count++; 
    }
    // .net framework 4.7.2-תוצאה 0 או 1000 ב
    Console.WriteLine(count); 
}
public static void Fill()
{
    // (איתחול שגוי (בתוך הפונקציה
    Random rnd = new Random(); // שגיאה 
    arr[current] = rnd.Next(0, 2); // 0,1 -מילוי המערך ב
    current = current + 1;
}
{% endhighlight %}



</details>

## סרטון הסבר על שימוש ב- breakpoints למציאת שגיאות

{: .box-success}
איתור שגיאות בקוד (דיבוג) הוא חלק בלתי נפרד מתכנות ומפיתוח חשיבה אלגוריתמית. הדרך המרכזית כיום בזמן הפיתוח, היא שימוש ב-breakpoint. דרך זו מתווספת לדרך ישנה ושימושית לא פחות - הדפסות ביניים (ובקוד מסחרי משתמשים בנוסף בכתיבה ללוג, משלוח הודעות וחיבור debugger שאיננו מלמדים).

לפניכם סרטון הדרכה קצר, המסביר כיצד ניתן לדבג בעזרת breakpoints.

{% include youtube.html id="yjl6vQVFXb0" %} 


## תרגול

[⬅ מעבר לתרגול 2.1 - המחלקות Math, Random](/cs/Chapter2Ex2.1)

[⬅ להיכרות עם הקיצורים השימושיים והוספת קיצורים משלכם snippets נוספים](/cs/Chapter1Shortcuts)

<!-- #### התמצאות באתר קמפוס =================
עדיין לא הוקלט -->

## סרטונים

[סרטוני פרק 3: המחלקה Math](https://www.youtube.com/playlist?list=PLw4P_RdfuzShCTd4wgIlDn_Mhum2Pdbai){:target="_blank"}

[⬅ תקציר עם מספרי שורות כולל קצת דברים שלא למדנו](/cs/ChapterSyntaxSummary)

[⬅ תקציר להדפסה קצת דברים שלא למדנו](/cs/ChapterSyntaxSummaryToPrint)

