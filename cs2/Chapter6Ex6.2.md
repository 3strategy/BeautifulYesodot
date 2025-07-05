---
layout: page 
title: "תרגול 6.2 - לולאות מקוננות"
subtitle: "תרגול כללי בלולאות מקוננות"
tags: [מונה, צובר, כופל,nesting, min, max, sum, count, תרגול מעורב, קינון]
mathjax: true
lang: he
---

## תרגיל 6.2.1
כתבו תכנית שמדפיסה את כל המספרים הראשוניים בין 1 ל-100

## 6.2.2 מכפלת ראשוניים בתחום

קלטו שני מספרים שלמים $$a$$ ו־$$b$$  

{: .subq}
א. מצאו את כל המספרים הראשוניים בתחום $$[a, b]$$. השתמשו בקוד למציאת מספר ראשוני.

{: .subq}
ב. החזירו את המכפלה של כולם (רמז: עד כה השתמשנו במונה, ובצובר. ניתן להשתמש גם בכופל - השומר תוצאה מצטברת של מכפלות כפי שעשינו בחישוב עצרת).


---

## 6.2.3 סכום ספרות זוגי במספרים באורך לא מוגדר

כמה מספרים בטווח מ־0 עד 10000 הם בעלי סכום ספרות זוגי?

כתבו תוכנית שמונה את כל המספרים מ־0 עד 10000 שסכום הספרות שלהם זוגי.
- השתמשו בלולאה פנימית למציאת סכום ספרות.
- השתמשו במונה.


---



## 6.2.4 — המספר עם סכום הספרות המקסימלי

קילטו מספר חיובי $$n$$ ומצאו את המספר בין $$1$$ ל־$$n$$ (כולל) שסכום ספרותיו הוא הגבוה ביותר.

לדוגמה: אם $$n = 150$$ ייתכן שהפלט יהיה  `number: 149, Sum: 14`


---

<details markdown="1"><summary>פתרון</summary>

{% highlight csharp linenos %}public static void Main()
{
Console.Write("Enter a positive integer n: ");
int n = int.Parse(Console.ReadLine());
    int maxSum = -1;      // סכום הספרות המקסימלי שנמצא עד כה  
    int maxNum = 1;       // המספר בעל סכום הספרות המקסימלי  

    // סורק את כל המספרים מ-1 עד n  
    for (int i = 1; i <= n; i++)  
    {  
        int temp = i;  
        int sum = 0;  

        // פירוק ספרות בעזרת while  
        while (temp > 0)  
        {  
            sum += temp % 10;  // הוספת הספרה האחרונה לסכום  
            temp /= 10;        // קיצוץ הספרה האחרונה  
        }  

        // בדיקה והחלפה אם מוצאים סכום גדול יותר  
        if (sum > maxSum)  
        {  
            maxSum = sum;  // עדכון הסכום המקסימלי
            maxNum = i;  // שמירת האינדקס
        }  
    }  

    Console.WriteLine($"number: {maxNum}, Sum: {maxSum}");  
}  
{% endhighlight %}

</details>


---

## 6.2.9 — המספר עם מכפלת ספרות מקסימלית

מצאו את המספר בין $$1$$ ל־$$500$$ שבו מכפלת הספרות היא הגבוהה ביותר.

- עבור כל מספר, חשב את מכפלת ספרותיו.
- שמור את המספר והמכפלה הגבוהה ביותר.



---

## 6.2.10 — הפרש מקסימלי בין ספרות במספר

מצאו את המספר בין שני קלטים, $$m$$ ו־$$n$$ שבו ההפרש בין הספרה הגדולה ביותר לספרה הקטנה ביותר הוא הגבוה ביותר.

- לדוגמה: $$294 \Rightarrow \max = 9, \min = 2, הפרש = 7$$


---

## 6.2.11 — רצף של 3 מספרים זוגיים עם ממוצע מקסימלי
הערה: זו שאלה של גילגול (שמירת היסטוריה). השאלה לא דורשת קינון

הגרילו 1,000 מספרים בין 1 ל-n. תוך כדי ההגרלה (בלולאה), מצאו את שלישיית המספרים הזוגיים הרציפה (למשל: 2, 4, 6) עם הממוצע הגבוה ביותר, 

- עבור כל שלישייה זוגית עוקבת, חשבו ממוצע.
- החזירו את השלישייה עם הממוצע הגבוה ביותר.



---

## 6.2.10 — ההפרש הגדול ביותר בין סכום למכפלה של ספרות

מצאו את המספרים התלת־ספרתיים שבהם סכום הספרות גדול ממכפלת הספרות, והחזר את המספר עם ההפרש הגדול ביותר בין סכום למכפלה.

- הצג את המספר ואת ערך ההפרש $$\text{Sum} - \text{Product}$$


## 6.2.11 כתיבת תפריט

כתבו מערכת תפריטים שתבקש מהמשתמש לבחור 1 עבור חישוב ריבוע של מספר, 2 עבור הדפסת כוכביות ו-0 כדי לצאת. המערכת תעבוד כפי שמוצג בפלט הבא:

```
Choose of to the following options:
1: Squared Value
2: Line of stars
0: Exit
Enter your choice --> 1
Enter a number: 4
4^2 = 16

Choose of to the following options:
1: Squared Value
2: Line of stars
0: Exit
Enter your choice --> 2
Enter number of stars 7
* * * * * * *

Choose of to the following options:
1: Squared Value
2: Line of stars
0: Exit
Enter your choice --> 0
Thank you for playing
```

<details markdown="1"><summary>פתרון</summary>

{% highlight csharp linenos %}public static void Main()
{
    while (true)
    {
        Console.Write("\nChoose of to the following options:\n1: Squared Value\n" +
            "2: Line of stars\n" +
            "0: Exit\nEnter your choice --> ");
        int choice = int.Parse(Console.ReadLine());
        if (choice == 0)
            break; // exit loop
        else if (choice == 1)
        {
            Console.Write("Enter a number: ");
            int num1 = int.Parse(Console.ReadLine());
            Console.WriteLine($"{num1}^2 = {num1 * num1}");
        }
        else if (choice == 2)
        {
            Console.Write("Enter number of stars ");
            int num1 = int.Parse(Console.ReadLine());
            for (int i = 0; i < num1; i++)
                Console.Write("* ");

            Console.WriteLine();
        }
        else
            Console.WriteLine("Invalid");
    }
    Console.WriteLine("Thank you for playing");
}
{% endhighlight %}

</details>

<details markdown="1"><summary>פתרון GPT כולל פירוק לפונקציות שימוש בדגל, ותגובתו לגבי break</summary>

הנקודה החשובה כאן היא השימוש בפונקציות. GPT בוחר לפרק את הקוד לתתי משימות. שימו לב עד כמה הלולאה הראשית ברורה מבחינת התפקיד של כל פונקציה. לא צריך לדעת מה קורה בתוך הפונקציות השונות כדי להבין מה מטרת הקוד. היתרון בפירוק לפונקציות הוא scalability. ברגע שהקוד בתוך הלולאה הופך לארוך ומסורבל, הפרדה של קטעי קוד לתוך פונקציות נפרדות הופכת את הקוד לקריא יותר ומאפשרת להצמיח אותו יותר רחוק מבלי שנאבד את הבהירות. 
GPT מחליט לעבוד עם דגל יציאה, אך מבהיר בהמשך שרוב האנשים בלולאה פשוטה יעדיפו `while(true), break`

GPT משתמש בהוראה switch שאיני מלמד מפני שהיא לא מספיק שימושית ומעמיסה תחביר בזמן שצריך לפתח חשיבה אלגוריתמית.

GPT משתמש ב- try.Parse שאיננו מלמדים ביסודות אך מאד שימושי בהמשך בפרוייקטים. זכרו שכל מצב של כשלון בזמן שימוש ב-Parse הוא קריסה של האפליקציה / שרת.

#### שוחחתי עם ה-GPT לגבי ההחלטה להשתמש בדגל יציאה:
Using a boolean “exitRequested” flag is perfectly valid—especially if you want your loop condition to clearly reflect “keep going until someone asks to exit.” That said, it’s extremely common (and a bit more concise) to write the menu loop as an infinite loop and just break out of it when choice == 0.

In small menu loops, **most people lean on while(true) + break for brevity,** but there’s nothing “wrong” with a flag if you prefer that style. **Choose the pattern that makes your intent most obvious in the context you’re working.**


{% highlight csharp linenos %}public static void RunMenu()
{
    bool exitRequested = false;

    while (!exitRequested)
    {
        ShowMenu();
        int choice = ReadChoice();

        switch (choice)
        {
            case 1:
                CalculateSquare();
                break;
            case 2:
                PrintStars();
                break;
            case 0:
                Console.WriteLine("Thank you for playing");
                exitRequested = true;
                break;
            default:
                Console.WriteLine("Invalid choice, please try again.");
                break;
        }

        Console.WriteLine();
    }
}

private static void ShowMenu()
{
    Console.WriteLine("Choose one of the following options:");
    Console.WriteLine("1: Squared Value");
    Console.WriteLine("2: Line of stars");
    Console.WriteLine("0: Exit");
    Console.Write("Enter your choice --> ");
}

private static int ReadChoice()
{
    string input = Console.ReadLine();
    return int.TryParse(input, out int choice) ? choice : -1;
}

private static void CalculateSquare()
{
    Console.Write("Enter a number: ");
    string input = Console.ReadLine();

    if (int.TryParse(input, out int number))
    {
        int square = number * number;
        Console.WriteLine($"{number}^2 = {square}");
    }
    else
    {
        Console.WriteLine("Invalid number entered.");
    }
}

private static void PrintStars()
{
    Console.Write("Enter number of stars --> ");
    string input = Console.ReadLine();

    if (int.TryParse(input, out int count) && count > 0)
    {
        for (int i = 0; i < count; i++)
        {
            Console.Write("*");
            if (i < count - 1)
                Console.Write(" ");
        }
        Console.WriteLine();
    }
    else
    {
        Console.WriteLine("Invalid number entered.");
    }
}
{% endhighlight %}

</details>