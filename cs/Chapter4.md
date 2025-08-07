---
layout: page
title: "פרק 4 - לולאות for"
subtitle: "ביצוע פעולות חוזרות באמצעות לולאות for"
author: גיא סידס
lang: he
---

{: .box-note}
**הערה:** בפרק זה נלמד כיצד להשתמש בלולאות מסוג for לביצוע פעולות חוזרות באופן יעיל וברור.

## מבנה לולאת for

לולאת `for` משמשת לביצוע פעולה מספר מוגדר של פעמים.

המבנה הכללי:

{% highlight csharp linenos %}for (int i = 0; i < 5; i++)
{
    Console.WriteLine("The number is: " + i);
}
{% endhighlight %}

דוגמת פלט:

```
The number is: 0
The number is: 1
The number is: 2
The number is: 3
The number is: 4
```
בדוגמא זו - הלולאה רצה 5 פעמים. בסוף כל סיבוב ה-i גדל ב-1 והתנאי נבדק. בסופו של דבר i הופך ל-5 התנאי הוא `false` התוכנית יוצאת מהלולאה ו-i מושמד.

## הסרטון הבא מדגים מה קורה מאחורי הקלעים
{% include youtube.html id="yd8cxpAmdUQ" %} 

## שימושים נפוצים בלולאות for

חישוב סכום מספרים:

{% highlight csharp linenos %}int sum = 0;
for (int i = 1; i <= 10; i++)
{
    sum += i;
}
Console.WriteLine("The sum is: " + sum); // 55
{% endhighlight %}

## יצירת טבלת כפל בעזרת לולאה

דוגמה להצגת טבלת כפל של המספר 3:

{% highlight csharp linenos %}int number = 3;
for (int i = 1; i <= 10; i++)
{
    Console.WriteLine(number + " x " + i + " = " + (number * i));
}
{% endhighlight %}

## שימוש ב-break בלולאות

ניתן לעצור לולאה באמצע באמצעות המילה `break`:

{% highlight csharp linenos %}for (int i = 1; i <= 10; i++)
{
    if (i == 5)
    {
        break; // עצירה כשהערך של i הוא 5
    }
    Console.WriteLine(i);
}
{% endhighlight %}

פלט הלולאה יהיה:

```
1
2
3
4
```


{: .box-warning}

**אזהרה:** ודאו שהתנאי בלולאה (`i <= 10`) מאפשר את עצירת הלולאה, אחרת הלולאה עלולה להפוך ללולאה אינסופית!

## תרגיל - הדפסת מספרים ושימוש בצובר

כתבו תוכנית המדפיסה את המספרים מ-1 עד 5 ואת הסכום המצטבר שלהם. השתמשו בלולאת `for`.

**פתרון לדוגמה:**

{% highlight csharp linenos %}int sum = 0; // משתנה צובר
for (int i = 1; i <= 5; i++)
{
    sum += i;
    Console.WriteLine("Number: " + i + ", cumulative sum: " + sum);
}
{% endhighlight %}

הפלט של התוכנית יהיה:

```
Number: 1, cumulative sum: 1
Number: 2, cumulative sum: 3
Number: 3, cumulative sum: 6
Number: 4, cumulative sum: 10
Number: 5, cumulative sum: 15
```

## טבלת מעקב ללולאת for עם צובר

| שורת קוד | i | sum | פלט|
|-----------|---|-----|---|
| 1    |  | 0   |  |
|2-5   | 1 | 1   |Number: 1, cumulative sum: 1|
| 2-5   | 2 | 3   |Number: 2, cumulative sum: 3|
| 2-5 | 3 | 6   |Number: 3, cumulative sum: 6   |
| 2-5  | 4 | 10  |Number: 4, cumulative sum: 10  |
| 2-5   | 5 | 15  | Number: 5, cumulative sum: 15 |
{: .table-en}

[⬅ עִבְרוּ לתרגול 4.1 - לולאות for: שארית חלוקה](/cs/Chapter4Ex4.1)

[⬅ עִבְרוּ לתרגול 4.2 - לולאות for: מונה, צובר, מינימום ומקסימום](/cs/Chapter4Ex4.2)

## מציאת מקסימום

<details markdown="1">
<summary>מציאת מקסימום</summary>

### ראינו כיצד מוצאים מקסימום ומינימום

```csharp
public static void QFindMax()
{
    // קלוט 5 שלמים
    int num, max;

    max = int.MinValue; // איתחול למינימלי האפשרי

    for (int i = 0; i < 5; i++)
    {
        Console.Write("Enter a number: ");
        num = int.Parse(Console.ReadLine());

        Console.WriteLine(num);
        if (num > max)
            max = num;
    }
    Console.WriteLine($"max is {max}");
}

```


## מקסימום. גרסה עם קלט כפול
**בפועל תבחרו מה שנראה לכם נכון ותלמדו רק טכניקה אחת**

```csharp
/// <summary>
/// מציאת הקלט המקסימלי מתוך 5 מספרים. קלט כפול. 
/// </summary>
public static void QFindMax()
{
    int num, max;
    // קלט כפול. 
    Console.Write("Enter a number: "); // קלט כפול
    max = int.Parse(Console.ReadLine());

    for (int i = 0; i < 4; i++) // חזרה אחת פחות
    {
        Console.Write("Enter a number: ");
        num = int.Parse(Console.ReadLine());

        Console.WriteLine(num);
        if (num > max)
            max = num;
    }
    Console.WriteLine($"max is {max}");
}

```



## מינימום
```csharp
/// <summary>
/// מציאת הקלט המינימלי. 
/// </summary>
public static void QFindMin()
{
    // קלוט 5 שלמים ומצא את המינימלי
    int num, min;

    min = int.MaxValue;

    for (int i = 0; i < 5; i++)
    {
        Console.Write("Enter a number: ");
        num = int.Parse(Console.ReadLine());

        Console.WriteLine(num);
        if (num < min)
            min = num;
    }
    Console.WriteLine($"min is {min}");
}
```




</details>

<details markdown="1">
<summary>מציאת מינימום: לימוד משגיאות</summary>

### בפתרון שלהלן הוכנסו כמה גרסאות שגויות לתנאי וגרסה אחת לא יעילה אך נכונה.

```csharp
public static void QFindMinMistaken()
{
    // קלוט 5 שלמים
    int num, max;

    max = int.MinValue; // איתחול למינימלי האפשרי

    for (int i = 0; i < 5; i++)
    {
        Console.Write("Enter a number: ");
        num = int.Parse(Console.ReadLine());

        Console.WriteLine(num);
        // לפניכם שתי גרסאות
        // האם יש גרסה נכונה? שגויה? 
        // עקבו באמצעות הדוגמא שלהלן
        //    5                3     5
        if (max <= Math.Max(next, max)) // גרסה 1
            max = next; // עקבו אחר גרסה זו

        if (max < Math.Max(next, max)) // גרסה 2
            max = next; // עקבו אחר גרסה זו
        
        // כיצד ניתן לתקן ולשפר

    }
    Console.WriteLine($"max is {max}");
}

```

</details>




## מציאת מספר ראשוני - דוגמא לשימוש בדגל וב-break

לצורך היכרות עם הרעיון ננסה לכתוב תכנית המוצאת אם מספר הוא ראשוני. נעשה זאת בשלבים.

<details markdown="1">
<summary>מציאה אם מספר הוא ראשוני</summary>



#### גרסה התחלתית שגויה - התקדמות בצעדים קטנים
```csharp
public static void QIsPrime()
{   // גרסה התחלתית שגויה. צריך להתקדם בצעדים קטנים

    //Console.Write("Enter a number: ");
    int num1 = 60;// int.Parse(Console.ReadLine());
    // לולאה לבדיקה אם המספר הוא ראשוני
    for (int i = 2; i < num1; i++)
    {
        if (num1 % i == 0) // מתחלק בדיוק
        {
            Console.WriteLine("Not prime");
        }
    }
    Console.WriteLine("IsPrime");
}
```

#### גרסה סופית, ללא אופטימיזציות

(אופטימיזציות - הן תיקונים לקוד שיגרמו לו לרוץ ביעילות גבוהה יותר. לא ננסה למצוא כאלו בשלב זה)

```csharp
public static void QIsPrime()
{
    //Console.Write("Enter a number: ");
    int num1 = 60000;// int.Parse(Console.ReadLine());
    bool isPrime = true; //דגל 
    // לולאה לבדיקה אם המספר הוא ראשוני
    for (int i = 2; i < num1; i++)
    {
        if (num1 % i == 0) // מתחלק בדיוק
        {
            Console.WriteLine("Not prime");
            isPrime = false;
            break; // יציאה מיידית מהלולאה לפני שהסתיימה
        }
    }
    // בסי שארפ אין אפשרות מובנית לדעת אם הלולאה הסתיימה רגיל
    // break או שהיה 
    if (isPrime)
        Console.WriteLine("IsPrime");
}
```


</details>


---


## תרגול מציאת מקסימום יחד עם ערך נוסף
כתבו תכנית הקולטת מ-10 תלמידים שם תלמיד וציון. התוכנית תדפיס את שם התלמיד שקיבל את הציון הגבוה ביותר.
- יכולים לבדוק באמצעות rnd במקום קלט (מגרילים אות בתור שם תלמיד)

<details markdown="1">
<summary>תשתית לפתרון כולל רנדומיזציה של תו במקום קליטת שם</summary>

```csharp
/// <summary>
/// המטרה לקלוט 10 שמות תלמידים וציונים שלהם (או להגריל זאת)
/// ולהדפיס את שם התלמיד שקיבל את הציון הגבוה ביותר
///  ========== שפרו את הקוד כדי שיבצע את מה שנדרש =========
///  ========  כרגע הוא סתם מוצא ציון מקסימלי
/// </summary>
public static void Main()
{
    int num, max;
    max = -1; // איתחול למינימלי האפשרי
    char myInitial = '-'; // האות הראשונה של שם התלמיד
    // use of unitialized variable האיתחול מראש - כדי למנוע שגיאת 

    for (int i = 0; i < 10; i++)
    {
        //random השאלה פתורה באמצעות 
        myInitial = (char)rnd.Next(65, 100); 
        num = rnd.Next(20, 100);

        Console.WriteLine(myInitial);
        Console.WriteLine(num);
        if (num > max)
            max = num;
    }
    Console.WriteLine($"max is {max}");
    Console.WriteLine(myInitial); // חייב להגדיר בחוץ ולאתחל
}
```
</details>

<details markdown="1">
<summary>פתרון</summary>

{% highlight csharp linenos %}
/// <summary>
/// הקוד המוצא מקסימום וערך נלווה למקסימום
/// </summary>
public static void Main()
{
    int max;
    max = -1; // איתחול לגודל שאינו בטווח האפשרויות
    string bestName = "";
    for (int i = 0; i < 10; i++)
    {
        Console.WriteLine("Enter name");
        string name = Console.ReadLine();

        Console.Write("Enter grade: ");
        int num = int.Parse(Console.ReadLine());

        if (num > max) //מצאנו מקסימום חדש 
        {
            max = num;
            bestName = name;
        }
    }
    Console.WriteLine($"Mr {bestName} got the best grade: {max}");

}
{% endhighlight %}

</details>

---

## גילגול (שמירת היסטוריה) sliding window

לעיתים בלולאות יש צורך **לשמור את הערך מהאיטרציה הקודמת** כדי להשוות אותו לערך הנוכחי, לדוגמא כאשר רוצים לבדוק אם הקלט הנוכחי שונה מהקלט הקודם, או למצוא רצפים משתנים.

{: .box-note}
**הערה:** שמירה של ערך קודם מתבצעת בעזרת משתנה עזר (לרוב `prev`), אותו מעדכנים בכל איטרציה לאחר ההשוואה.

### דוגמה: ספירת שינויים ברצף מספרים

נניח שהוזנו לנו 5 מספרים, ואנו רוצים לספור בכמה מקרים המספר השתנה מהפעם הקודמת.

<details markdown="1">
<summary>פתרון</summary>

{% highlight csharp linenos %}int count = 0;
int prev = 0;

for (int i = 0; i < 5; i++)
{
    Console.Write("Enter a number: ");
    int num = int.Parse(Console.ReadLine());

    if (i > 0 && num != prev)
    {
        count++;
    }

    prev = num; // גילגול: שומרים את הקלט האחרון
}

Console.WriteLine("Number of changes: " + count);
{% endhighlight %}

**הסבר:**  
בלולאה מתקבל קלט מהמשתמש, משווים אותו לערך הקודם (`prev`), ואם יש שינוי – מגדילים את המונה.  
לאחר ההשוואה, "מגלגלים" את הערך הנוכחי למשתנה `prev` כדי שישמש אותנו בסיבוב הבא.

</details>

## קישורים
[⬅ עברו  לנקודות צפיה חשובות בסרטון שיעור פרק 4b](/cs2/VideoLinks/Chapter4VidLinks)




## תרגול

[⬅ עִבְרוּ לתרגול 4.1 - לולאות for: שארית חלוקה](/cs/Chapter4Ex4.1)

[⬅ עִבְרוּ לתרגול 4.2 - לולאות for: מונה, צובר, מינימום ומקסימום](/cs/Chapter4Ex4.2)

[⬅ עִבְרוּ לתרגול 4.3 לולאות for: מינימום מקסימום ספירה צבירה ושארית חלוקה](/cs/Chapter4Ex4.3)

[⬅ עברו תרגול 4.4 לולאות for: שאלות נוספות והשלמות"](/cs/Chapter4Ex4.4)

[⬅ עִבְרוּ לתרגול 4.5 - לולאות for: גילגול (שמירת היסטוריה)](/cs/Chapter4Ex4.5)



## סרטונים
[סרטוני פרק 6: לולאות for](https://www.youtube.com/playlist?list=PLw4P_RdfuzShl0iRsytc83T2ZHm3kvUAD){:target="_blank"}

[פלייליסט השתלמות חלק א](https://www.youtube.com/playlist?list=PLnVUJu2KuoA04DlduroHvjZfhbxagO9nP){:target="_blank"}