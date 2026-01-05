---
layout: page
title: "פרק 5 - לולאות while"
subtitle: "ביצוע פעולות חוזרות באמצעות לולאות while"
author: גיא סידס
tags: [פירוק מספר, בניית מספר, while, בעד ונגד break , MISRA Rules]
mathjax: true
lang: he
---

{: .box-note}
**הערה:** בפרק זה נלמד כיצד להשתמש בלולאות מסוג while, שמבצעות פעולה כל עוד תנאי מסוים מתקיים.

{: box-warning}
**סדר הוראה:** יש מורים המעדיפים ללמד לולאת while לפני לולאת for. עשו כפי שמרגיש לכם נכון

## מבנה לולאת while {#id5compare}

לולאת `while` משמשת לביצוע פעולה מספר לא מוגדר של פעמים, כל עוד התנאי מתקיים.

המבנה הכללי:

---

{% highlight csharp linenos %}int counter = 0;
while (counter < 3)
{
    Console.WriteLine("The number is: " + counter);
    counter++;
}
{% endhighlight %}

דוגמת פלט:

```Text
The number is: 0
The number is: 1
The number is: 2
```

זוהי כמובן בחירה שגויה של מימוש. מקרה בו יודעים את מספר החזרות, יש לממש באמצעות לולאת for
{: .box-warning}

---

## דוגמא 1: צבירת משקעים – Counting Rainfall

קלטו כמויות משקעים יומיות (במ"מ). השאלה: אחרי כמה ימים עברה כמות הגשם המצטברת יעד של 100 מ"מ. 

**פלט רצוי:**

```Text
Enter rainfall for day 1: 30
Enter rainfall for day 2: 20
Enter rainfall for day 3: 25
Enter rainfall for day 4: 35

Target reached after 4 days.
```

---

<details><summary>פתרון</summary>

{% highlight csharp linenos %}int totalRainfall = 0;
int daysCount = 0;

while (totalRainfall < 100)
{
    daysCount++;
    Console.Write($"Enter rainfall for day {daysCount}: ");
    int dailyRainfall = int.Parse(Console.ReadLine());
    totalRainfall += dailyRainfall; // צבירה
}

Console.WriteLine($"\nTarget reached after {daysCount} days.");
{% endhighlight %}

</details>

---

## דוגמא 2: לולאה עד לקבלת קלט רצוי מהמשתמש

דוגמא 2: ניתן להשתמש בלולאת `while` לקבלת קלט מהמשתמש עד לקבלת ערך תקין:

{% highlight csharp linenos %}int number;
// ביצוע קלט כפול 
// לפני כניסה ללולאה number -עלינו לדאוג לערך ב
Console.Write("Enter a positive number: ");
number = int.Parse(Console.ReadLine());

while (number <= 0) // יתכן שלא תרוץ כלל
{
    Console.WriteLine("Invalid number, try again.");
    Console.Write("Enter a positive number: ");
    number = int.Parse(Console.ReadLine());
}
Console.WriteLine("The number entered is: " + number);
{% endhighlight %}

---

### דוגמא 3: עצירת הקלט בהתקיים תנאי (שימוש בזקיף)

{% highlight csharp linenos %}Console.Write("Enter number (0 to stop): ");
int n = int.Parse(Console.ReadLine());

while (n != 0)
{
    Console.WriteLine("You entered: " + n);
    Console.Write("Enter number (0 to stop): ");
    n = int.Parse(Console.ReadLine());
}

Console.WriteLine("Stopped.");
{% endhighlight %}

פלט לדוגמא של הלולאה:

```
Enter number (0 to stop): 5
You entered: 5
Enter number (0 to stop): 3
You entered: 3
Enter number (0 to stop): 0
Stopped.
```

---

## לולאות while ושימוש ב-break

**אפשר לעצור לולאה בכל שלב בעזרת `break`**

**דוגמא 4:** בדוגמא זו, מימוש באמצעות break, הזהה בתוצאה לדוגמא 3 של (עצירת קלט):

{% highlight csharp linenos %}int n;
while (true)
{
    Console.Write("Enter number (0 to stop): ");
    n = int.Parse(Console.ReadLine());
    Console.WriteLine("You entered: " + n); // מימוש שידפיס גם את 0
    if (n == 0)
        break;
                
}
Console.WriteLine("Stopped.");
{% endhighlight %}

פלט לדוגמא של הלולאה:

```
Enter number (0 to stop): 5
You entered: 5
Enter number (0 to stop): 3
You entered: 3
Enter number (0 to stop): 0
You entered: 0 // שורה זו לא מופיעה במימוש הקודם ונובעת מכך ששורה 6 לפני תנאי היציאה
Stopped.
```

{: .box-warning}
אין חובה ללמד break אולם השימוש בו מותר. נראה בהמשך תרגילים פתורים עם ובלי הוראה זו. רצוי להקנות לתלמידים  while בדרך אחת, אחידה (גם אם כאן מוצגות שתי הדרכים). [Misra rule relaxation regarding break](https://forum.misra.org.uk/archive/index.php?thread-46.html)

{% highlight csharp linenos %}int number;
while (true) // break דוגמא 1 במימוש באמצעות 
{
    Console.Write("Enter a positive number: ");
    number = int.Parse(Console.ReadLine());
    if (number > 0) // תנאי יציאה מהלולאה
        break; // אם הגענו לכאן, הקלט עונה על הדרישות 
   
    Console.WriteLine("Invalid number, try again.");
}
Console.WriteLine("The number entered is: " + number);
{% endhighlight %}

---

## פירוק ובניית מספר שלם

---

### פירוק מספר

פירוק מספר בלולאת while מתבצע ע\"י חילוץ ספרות בעזרת מודולו 10, והתקדמות ע\"י חלוקה ב־10 עד שהמספר מסתיים.

#### קוד C#: מדפיס את כל הספרות של מספר שלם

{% highlight csharp linenos %}public static void Main()
{
    Console.Write("Enter an integer: ");
    int num = int.Parse(Console.ReadLine());
    while (num > 0) // המספר יאבד ספרה בכל סיבוב
    {
        int digit = num % 10; // חילוץ ספרה ימנית
        Console.WriteLine(digit); // הדפסת הספרה
        // num = num / 10 קיצוץ ספרה
        num /= 10; // המספר יאבד ספרה בכל סיבוב
    }
}
{% endhighlight %}

---

### בניית מספר מתוך ספרות

כדי לבנות מספר מתוך רצף ספרות (ללא מערכים), נכפול את המספר הקיים ב-10 ונוסיף את הספרה החדשה בכל שלב.

**דוגמה:**  
כדי לבנות את המספר 374 מהספרות 3, 7, 4 (בסדר הזה):  

- מתחילים מ־0  
- מוסיפים 3 $$→ 0×10+3=3$$  
- מוסיפים 7 $$→ 3 × 10 + 7 = 37$$  
- מוסיפים 4 $$→ 37 × 10 + 4 = 374$$  

---

## דוגמת קוד: הפיכת סדר הספרות {#id5reverse}

הקוד הבא קולט מספר, בונה מחדש את המספר בסדר ספרות הפוך (למשל 1234 → 4321) ומדפיס את התוצאה.

{% highlight csharp linenos %}public static void Main()
{
    Console.Write("Enter an integer: "); // יש להדפיס באנגלית כדי להימנע מבעיות קידוד
    int num = int.Parse(Console.ReadLine());
    int reversed = 0;
    while (num > 0)
    {
        int digit = num % 10; // חילוץ ספרה אחרונה
        reversed = reversed * 10 + digit; // הוספה מימין
        num /= 10; // num = num / 10 
    }
    Console.WriteLine("Reversed number: " + reversed); // הדפסת המספר ההפוך באנגלית
}
{% endhighlight %}

---

## הרחבה שימוש מומלץ ולא מומלץ ב-break

<details open id="id5break" markdown="1">
<summary>הרחבה: שימוש מומלץ ולא מומלץ בפקודת break בלולאות</summary>

השימוש בפקודת `break` יכול להיות שימושי מאוד במצבים מסוימים, אך עלול להפריע לקריאות הקוד במצבים אחרים. להלן המלצות מתי להשתמש ומתי להימנע:

### מתי נכון להשתמש ב-break?

#### 1. **בלולאה עם יציאה ברורה על סמך קלט המשתמש**:

```csharp
while (true)
{
    string input = Console.ReadLine();
    if (input == "exit")
        break; // יציאה ברורה מהלולאה
}
```

---

### מתי מומלץ להימנע מ-break?

#### 1. **כשהתנאי לסיום פשוט וברור מספיק ויכול להיות מוצג בכותרת הלולאה**:

לדוגמה, בדיקת מספר ראשוני היא דוגמה טובה שבה אפשר להימנע משימוש ב-break כי התנאי ברור:

```csharp
int num = 17;
bool isPrime = true;
int i = 2;

while (i < num && isPrime)
{
    if (num % i == 0)
        isPrime = false;
    i++;
}

if (isPrime)
    Console.WriteLine("Prime number");
else
    Console.WriteLine("Not a prime number");
```

---

### עצות נוספות ממומחה

(חלק מההסבר מבוסס על ידע נוסף שעדיין לא למדנו)

> בגדול זה משתנה קצת מחברה לחברה, בסוף לרוב החברות יש הסבר פנימי למה מותר ומה אסור.
>
> אבל הגישה שהיא לדעתו הכי טובה היא כזו:
>
> אם הקוד בתוך הלולאה הוא באורך של מספר שורות ומאוד קריא, אין שום בעיה להשתמש ב-break. הוא מעדיף את זה על פני הגדרת משתנה בוליאני והוספת if או משהו כזה.
>
> מה שלא מומלץ, זה להשתמש בזה בתוך קוד ארוך ומסובך שבתוך לולאה. קל מאוד לשכוח מה-break בקונטקסט כזה.
>
> למרות שכמובן, אם ישנו קוד ארוך ומסובך בתוך לולאה, כנראה שמשהו כבר לא בסדר – ושאמורה להיות פונקציה (או אפילו פונקציות) שמוגדרת מחוץ ללולאה ומסדרת את העניין בצורה טובה. ואז שוב אפשר להשתמש ב-break 😀

---

לסיכום, השתמשו ב-`break` כאשר הוא תורם לקריאות הקוד וליעילות, אך הקפידו להימנע משימוש בו כשהוא עלול להקשות על הבנת הקוד.

</details>

{: .box-warning}
**אזהרה:** ודאו תמיד שלולאת `while` מכילה תנאי שיגרום להפסקת הלולאה, כדי למנוע לולאה אינסופית.

## תרגול

[⬅ עִבְרוּ לתרגול 5.1 - לולאות while ללא פונקציות)](/cs/Chapter5Ex5.1)

[⬅ עִבְרוּ לתרגול 5.2 לולאות while עם פונקציות](/cs/Chapter5Ex5.2)

[⬅ עִבְרוּ לתרגול 5.3 לולאות מסוגים שונים, מעבר חוסם ודגל בוליאני](/cs/Chapter5Ex5.3)

[⬅ עִבְרוּ לתרגול 5a לולאות מסוגים שונים - תרגול עם AI](/cst/yesodot/ex5a)


## סרטונים

[סרטוני פרק 6: לולאות while](https://www.youtube.com/playlist?list=PLw4P_RdfuzSiWmGL7PdjcY5Sd8Fqeguo4){:target="_blank"}
