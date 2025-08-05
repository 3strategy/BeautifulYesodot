---
layout: page
title: "פרק 6 - לולאות מקוננות"
subtitle: "ביצוע חוזר בתוך ביצוע חוזר"
tags: קינון, כוכביות, patterns
author: גיא סידס
lang: he
---

{: .box-note}
**הגדרה: לולאה מקוננת** (Nested Loop) הוא מבנה תכנות שבו לולאה אחת נמצאת בתוך גוף של לולאה אחרת, כך שהלולאה הפנימית מתבצעת במלואה בכל איטרציה של הלולאה החיצונית. 

אין כאן משהו חדש מפני שאנו משתמשים במבנים שכבר למדנו, ובכל זאת זה עיקרון מורכב וחשוב שצריך לתרגל לעומק. הרעיון אינו ממומש רק באמצעות for בתוך for אלא כל שילוב בין סוגי הלולאות כולל while בתוך for, for בתוך while וגם שילוב של foreach שעדיין לא למדנו, ויש שבוחרים לא ללמד בשלב היסודות.
{: .box-success}

<details markdown="1"><summary>קינון: הגדרה כללית והרחבה</summary>

# קינון בתכנות

קינון (Nesting) בתכנות הוא המצב שבו מבנה אחד של קוד (למשל לולאה, תנאי, פונקציה או בלוק אחר) ממוקם בתוך מבנה אחר מאותו סוג **או מסוג אחר**. קינון מאפשר לארגן לוגיקה מורכבת בצורה היררכית ומובנית, אבל גם מגדיל את מורכבות הקריאה והתחזוקה של הקוד.

---

<details markdown="1"><summary>הרחבה ודוגמאות</summary>

### סוגי קינון עיקריים

#### לולאות מקוננות  
לולאה אחת (`for`, `while` וכדומה) נמצאת בתוך לולאה אחרת.

```csharp
for (int i = 0; i < 10; i++) {
    for (int j = 0; j < 5; j++) {
        // גוף הקוד מופעל עבור כל צמד ערכים (i, j)
    }
}
```

#### תנאים מקוננים  
בלוק `if` בתוך בלוק תנאי אחר.

```csharp
if (user.IsLoggedIn) {
    if (user.HasPermission("admin")) {
        // רק משתמשים עם הרשאת מנהל יגיעו לכאן
    }
}
```

#### פונקציות פנימיות (Inner / Local Functions)  
שפות מסוימות (כמו C# 7+, משנת 2017) מאפשרות להכריז על פונקציה בתוך פונקציה אחרת.

```csharp
void ProcessData() {
    Validate();

    void Validate() {
        // אימות נתונים מקומי
    }
}
```

#### קינון של מבני נתונים  
מערכים, רשימות או מילונים שמכילים בתוכם אובייקטים מקוננים או אוספים אחרים.

```json
{
  "user": {
    "name": "אילן",
    "roles": ["admin", "editor"],
    "preferences": {
      "theme": "dark",
      "language": "he"
    }
  }
}
```

---

#### יתרונות הקינון

1. **ארגון היררכי** – מאפשר להפריד לוגיקה לשלבים ולבלוקים מובנים.  
2. **שימוש חוזר** – פונקציות פנימיות מאפשרות למנוע חשיפה גלובלית של לוגיקה שנמצאת בשימוש רק בתוך פונקציה מסוימת.  
3. **פשטות בביצוע פעולות מורכבות** – דוגמה: חיפוש בתוך מטריצה המשתמש בלולאות מקוננות.

---

#### חסרונות ואתגרים

1. **מורכבות רב-ממדית** – ככל שרמת הקינון גדלה, קשה יותר לעקוב אחר זרימת התוכנית ולתחזק אותה.  
2. **ביצועים** – לולאות מקוננות רבות עשויות לגרום ל־O(n²) ואפילו ל־O(n³) בזמן ריצה, תלוי בעומק הקינון.  
3. **קריאות הקוד** – ריבוי רמות של הזחה (indentation) עלול להקשות על קריאת הקוד, ולהעלות את הסיכון לשגיאות כמו בלוקים לא מסודרים.

---

#### אופן השימוש הנכון

- **השמת גבול לעומק הקינון**  
  מומלץ שלא לחרוג מ־2–3 רמות קינון באותו בלוק. אם נדרש עומק גדול יותר – כדאי לשקול חלוקת הלוגיקה לפונקציות נוספות או שימוש במבני נתונים עזר.

- **חלוקה לפונקציות**  
  כאשר מטלה מסוימת מורכבת מדי, מומלץ להוציא חלק ממנה לפונקציה נפרדת כדי לשפר את הקריאות והבדיקות.

- **שמות ברורים**  
  שימוש בשמות משתנים ופונקציות תיאוריים מקל על הבנת מהות כל שלב בקינון.

---

#### סיכום

קינון הוא כלי מרכזי בתכנות המאפשר בנייה של לוגיקה מורכבת על ידי שיבוץ מבנים זה בתוך זה. הוא מעודד ארגון והרכבה של פעולות, אך מצריך תשומת לב למורכבות, לקריאות ולביצועים. הבחירה במידת הקינון המתאימה ושימוש נכון בפונקציות עזר יכולים להפוך קוד ברור, יעיל ותחזוקתי.


</details>

</details>


### דוגמה 1: מלבן של כוכביות


<details open markdown="1"><summary>להלן קוד המדפיס מלבן של כוכביות בגודל 5×10:</summary>


{% highlight csharp linenos %}public static void StarRectangle()
{
    int rows = 5;
    int cols = 10;
    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < cols; j++)
        {
            Console.Write("* ");
        }
        Console.WriteLine();
    }
}
{% endhighlight %}

</details>


### דוגמה 2: טבלת כפל מ-0 עד 10

<details markdown="1"><summary>היעזרו בתבנית שלעיל,וכתבו תכנית המדפיסה את טבלת הכפל מ-0×0 עד 10×10:</summary>
{% highlight csharp linenos %}public static void MultiplicationTable()
{
    for (int i = 0; i <= 10; i++)
    {
        for (int j = 0; j <= 10; j++)
        {
            Console.Write($"{i * j} ");
            //Console.Write($"{i * j:00} "); //חלופות עיצוב
            //Console.Write($"{i * j}\t"); //חלופות עיצוב
        }
        Console.WriteLine();
    }
} {% endhighlight %}

</details>

## תבניות הדפסה Patterns

{: .box-note} 
המונח Patterns מעט מטעה מפני שבמקור הוא משמש לתיאור **תבניות עיצוב** (Design Patterns), וכאן הכוונה **לדגמים גרפיים** שנדפיס למסך

### Pattern 1
בכל אחד מה- Patterns ניתן להתחיל בתרגול הבסיסי עם כוכביות, ולאחר מכן לשפר אותו כדי להדפיס מספרים או תווים. ניתן להמציא עוד תרגילים דומים בהם התבנית המספרית או התווים שיש להדפיס מקיימים חוקיות שונה.

**Asterix1**

```
*
* *
* * *
* * * *
* * * * *
```

---

{% highlight csharp linenos %}public static void Asterix1()
{
    // לולאה חיצונית: עוברת על כל השורות
    for (int i = 0; i < 5; i++)
    {
        // לולאה פנימית: להדפסת שורה
        for (int j = 0; j <= i; j++)
        {
            Console.Write("* "); // ללא מעבר שורה
        }
        Console.WriteLine(); // מעבר שורה
    }
}
{% endhighlight %}



**Numbers1**

```
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
```


<details markdown="1"><summary>פתרון. נסו לשנות את הקוד שבדוגמא הקודמת לפני שאתם מציצים</summary>
{% highlight csharp linenos %}public static void Numbers1()
{
    for (int i = 0; i < 5; i++)
    {
        // לולאה פנימית להדפסת שורה
        for (int j = 0; j <= i; j++)
        {
            Console.Write($"{j + 1} ");
        }
        Console.WriteLine();
    }
}
{% endhighlight %}

</details>

**Chars1** דוגמא ללולאה פנימית מטיפוס תו

```
A
A B
A B C
A B C D
A B C D E
```

---
<details markdown="1"><summary>נסו גם כאן לפתור לפני שאתם מציצים</summary>
{% highlight csharp linenos %}public static void Chars1()
{
    int rows = 5;
    // לולאה חיצונית
    for (int i = 0; i < rows; i++)
    {
        // לולאה של תווים והדפסת תווים
        for (char j = 'A'; j <= 'A' + i; j++)
        {
            Console.Write($"{j} ");
        }
        Console.WriteLine();
    }
}
{% endhighlight %}

</details>

### Pattern 2 שימוש בשתי לולאות פנימיות

**Asterix2**

```
        *
      * *
    * * *
  * * * *
* * * * *
```

<details open markdown="1"><summary>פתרון</summary>

{% highlight csharp linenos %}public static void Asterix2()
{
    int rows = 5;
    for (int i = 0; i < rows; i++)
    {
        // לולאה להדפסת רווחים מקדימים
        for (int j = 0; j < 2 * (rows - i) - 1; j++)
        {
            Console.Write(" ");
        }
        // לולאה להדפסת כוכביות
        for (int k = 0; k <= i; k++)
        {
            Console.Write("* ");
        }
        Console.WriteLine();
    }
}
{% endhighlight %}

</details>

**Numbers2**

```
        1
      1 2
    1 2 3
  1 2 3 4
1 2 3 4 5
```

<details markdown="1"><summary>פתרון. נסו לשנות את הקוד שבדוגמא הקודמת לפני שאתם מציצים</summary>


{% highlight csharp linenos %}public static void Numbers2()
{
    int rows = 5;
    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < rows - i ; j++)
            Console.Write("  "); // שני רווחים

        for (int j = 1; j <= i + 1; j++)
        {   // שוב j-מותר להשתמש ב
            Console.Write($"{j} ");
        }
        Console.WriteLine(); // מעבר שורה
    }
}
{% endhighlight %}


</details>

**Chars2**

```
         A
       A B
     A B C
   A B C D
 A B C D E
```
<details markdown="1"><summary>פתרון. נסו תחילה להשתמש בדוגמאות הקודמות כדי להגיע לתוצאה הרצויה</summary>

{% highlight csharp linenos %}public static void Chars2()
{
    int rows = 5;

    for (int i = 0; i < rows; i++)
    {
        // Print leading spaces for centering
        // Some teachers insist on English only comments
        // Single statement loop can be without block brackets.
        for (int j = 0; j < rows - i; j++)
            Console.Write("  ");

        // הדפסת שורת תווים
        for (char k = 'A'; k <= 'A' + i; k++) // casting -אין צורך ב
        {
            Console.Write($"{k} ");
        }

        Console.WriteLine();
    }
}
{% endhighlight %}

</details>

### Pattern 3

**Asterix3**

```
         *
       * * *
     * * * * *
   * * * * * * *
 * * * * * * * * *
```

---

<details markdown="1"><summary>פתרון</summary>

{% highlight csharp linenos %}public static void Asterix3()
{
    int rows = 5;

    // first loop to print all rows
    for (int i = 0; i < rows; i++)
    {

        // Inner loop 1 to print 
        // white spaces for each row
        for (int j = 0; j < rows - i; j++)
            printf("  "); //2 spaces

        // Inner loop 2 to print *
        // for each row
        for (int k = 0; k < 2 * i + 1; k++)
            Console.Write($"* ");

        Console.WriteLine();
    }
}
{% endhighlight %}

</details>

**Numbers3**

```
         1
       1 2 3
     1 2 3 4 5
   1 2 3 4 5 6 7
 1 2 3 4 5 6 7 8 9
```


<details markdown="1"><summary>פתרון</summary>

{% highlight csharp linenos %}public static void Numbers3()
{
    int rows = 5;

    // first loop to print all rows
    for (int i = 0; i < rows; i++)
    {

        // Inner loop 1 to print 
        // white spaces for each row
        for (int j = 0; j < rows - i; j++)
            printf("  "); //2 spaces

        // Inner loop 2 to print number
        // for each row.
        // when starting from 1, use <= to get the same

        for (int k = 1; k <= 2 * i + 1; k++)
            Console.Write($"{k} ");

        Console.WriteLine();
    }
}
{% endhighlight %}
</details>


**Chars3**

```
         A
       A B C
     A B C D E
   A B C D E F G
 A B C D E F G H I
```


<details markdown="1"><summary>פתרון</summary>

{% highlight csharp linenos %}public static void Chars3()
{
    int rows = 5;

    // first loop to print all rows
    for (int i = 0; i < rows; i++)
    {

        // Inner loop 1 to print 
        // white spaces for each row
        for (int j = 0; j < rows - i; j++)
        {
            printf("  "); //2 spaces
        }

        // Inner loop 2 to print alphabets
        // for each row
        for (char k = 'A'; k < 'A' + 2 * i + 1; k++)
        {
            Console.Write($"{k} ");
        }
        Console.WriteLine();
    }
}
{% endhighlight %}
</details>


תרגילי ה-patterns מבוססים על: [GeeksforGeeks - Pattern Programs in C](https://www.geeksforgeeks.org/c/pattern-programs-in-c/)


## קינון בעזרת הצב

[על בסיס זמן פנוי נלמד לשכפל פרוייקט מגיט ונעבוד עם הצב. תודה לולרי פקר ז"ל על תרומתו להוראת מדעי המחשב](https://github.com/3strategy/Turtle22){:target="_blank"}

**הסרטון שלפניכם מדגים כיצד לבצע clone מגיטהאב ומציג את מחלקת הצפרדעים ומחלקת הצבים שב-unit4**

{% include youtube.html id="G-FnCOscsKo" %} 

---

## תרגול
[⬅ עִבְרוּ לתרגול 6.1 - Patterns לולאות מקוננות עם פתרונות](/cs2/Chapter6Ex6.1)

[⬅ עִבְרוּ לתרגול 6.2 - תרגול כללי בלולאות מקוננות](/cs2/Chapter6Ex6.2)

[⬅ עִבְרוּ לתרגול 6.3 - Patterns לולאות מקוננות ללא פתרונות](/cs2/Chapter6Ex6.3)

[⬅ עִבְרוּ לתרגול 6.4 - לולאות מקוננות - Karel The Robot](/cs2/Chapter6Ex6.4Karel)

