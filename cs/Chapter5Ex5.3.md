---
layout: page 
title: "תרגול 5.3 מעבר חוסם ודגל בוליאני"
subtitle: "שאלות הבחנה בין לולאות" 
tags: [תרגול מעורב]
mathjax: true
lang: he
---

## 5.3.1  
כתבו תוכנית שמבקשת מהמשתמש להזין מספרים שלמים ותדפיס את כל המספרים עד להתקיימות אחד מהתנאים: הסכום המצטבר של המספרים גדול מ-100 או שהוזן מספר שלילי. התוכנית תדפיס את הסכום הכולל, את כמות המספרים שהוזנו ואם הושג היעד 100.

<details markdown="1"><summary>הדרכה</summary>  

זו שאלה מסוג מעבר חוסם.
- הגדירו משתנים `sum, count` מטיפוס `int` ואת הדגל (הבוליאני) `isValid = true`.  
- תנאי הלולאה צריך להיות `sum <= 100 && isValid`.  
- בכל איטרציה קלטו `num` והוסיפו אותו ל-`sum`.  
- אם `num < 0`, העבירו `isValid = false` כדי לקטוע את הלולאה.  
</details>

<details markdown="1"><summary>פתרון</summary>  
{% highlight csharp linenos %}public static void Main()
{
    int sum = 0;
    int count = 0;
    bool isValid = true;

    while (sum <= 100 && isValid)
    {
        Console.Write("Enter an integer: ");
        int num = int.Parse(Console.ReadLine());
        sum += num;      // גם מספרים שליליים נספרים
        count++;

        if (num < 0) // זיהינו קלט שלילי – נפסיק בלולאה הבאה
            isValid = false;
        else
            Console.WriteLine($"Valid num: {num}");
    }

    Console.WriteLine($"Total sum: {sum}");
    Console.WriteLine($"Numbers entered: {count}");
    if (sum > 100) // if(isValid) אותה תוצאה תושג עם
        Console.WriteLine($"Target was reached");
    else
        Console.WriteLine("Target was NOT reached");
}
// בפתרון זה המספר השלילי נספר ונסכם
{% endhighlight %}


```
Enter an integer: 45
Valid num: 45
Enter an integer: 38
Valid num: 38
Enter an integer: -2
Total sum: 81
Numbers entered: 3
Target was NOT reached
```
</details>


## 5.3.2  
וריאציה על השאלה הקודמת. כתבו תוכנית המגרילה מספרים שלמים בתחום $$-5$$ עד (כולל) $$33$$ (כדי לסמלץ קלט) ותדפיס את כל המספרים עד להתקיימות אחד מהתנאים: הסכום המצטבר של המספרים גדול מ-100 או שהוזן מספר שלילי (לא חוקי). התוכנית תדפיס את המספרים החוקיים, את  הסכום הכולל, את כמות המספרים שהוזנו והאם הושג היעד 100. **אין לכלול קלט שלילי בסכום או בספירה,** ואסור להשתמש בתנאי בתוך לולאה.

<details markdown="1"><summary>הדרכה</summary>

- הגדירו משתנים `sum, count` מטיפוס `int`.  
- תנאי הלולאה צריך להיות `sum <= 100` .  ניתן לחילופין לרשום `while(true)` כך שברור שיש יציאה/ות בתוך הלולאה.
- בכל איטרציה קלטו `num`.
- אם `num < 0`, יש לקטוע באמצעות `break`.
- אם אנחנו עדיין בלולאה, יש להוסיף את num ל-`sum`.  

</details>

<details markdown="1"><summary>פתרון בלולאה אינסופית</summary>  
{% highlight csharp linenos %}public static void Main()
{
    int sum = 0;
    int count = 0;

    while (true)
    {
        int num = rnd.Next(-3, 34);// int.Parse(Console.ReadLine());

        if (num < 0 || sum > 100)
            break; // אפשר לדייק את נקודת היציאה
                   // ולצאת למשל אחרי ספירה אך לפני סכימה / הדפסה

        Console.WriteLine(num);
        count++;
        sum += num;
    }

    Console.WriteLine($"Total sum: {sum}");
    Console.WriteLine($"Numbers entered: {count}");
    if (sum > 100)
        Console.WriteLine("Target was reached");
    else
        Console.WriteLine("Target was NOT reached");
}{% endhighlight %}
</details>


<details markdown="1"><summary>פתרון עם קלט כפול</summary>  
{% highlight csharp linenos %}public static void Main()
{
    int sum = 0;
    int count = 0;

    Console.Write("Enter an integer. negative to stop: ");
    int num = int.Parse(Console.ReadLine());

    while (num >= 0 && sum < 100)
    {
        Console.WriteLine($"Valid num: {num}");
        count++;
        sum += num;

        Console.Write("Enter an integer. negative to stop: ");
        num = int.Parse(Console.ReadLine());
    }

    Console.WriteLine($"Total sum: {sum}");
    Console.WriteLine($"Numbers entered: {count}");
    if (sum > 100)
        Console.WriteLine($"Target was reached");
    else
        Console.WriteLine("Target was NOT reached");
}
// הערה: בפתרון זה תגובה מידית לקלט שלילי, אבל לא להגעה ליעד
{% endhighlight %}

**עצירה מיידית בקלט שלילי**
```
Enter an integer. negative to stop: 35
Valid num: 35
Enter an integer. negative to stop: 45
Valid num: 45
Enter an integer. negative to stop: -2
Total sum: 80
Numbers entered: 2
Target was NOT reached
```
**בדוגמת הקלט להלן הסכום כבר עובר את 100 ועדיין מבקשים שוב קלט. זה לא מושלם הקלט לא יספר ולא יסכם, אבל אנו מבקשים אותו סתם**
```
Enter an integer. negative to stop: 35
Valid num: 35
Enter an integer. negative to stop: 42
Valid num: 42
Enter an integer. negative to stop: 28
Valid num: 28
Enter an integer. negative to stop:
```


</details>



## 5.3.3  
זו שאלה מסוג מעבר חוסם.
כתבו תוכנית הקולטת תווים בזה אחר זה. כל עוד התו הנוכחי אינו סימן נקודה (`'.'`) והדגל `error=false`. בתוך הלולאה מדפיסים את התו. אם מתקבל תו שאינו אות אנגלית (לא בין `'A'` ל־`'Z'` ולא בין `'a'` ל־`'z'`), מעדכנים `error=true` כדי לגרום לעצירת הלולאה.

<details markdown="1"><summary>הדרכה</summary>  
- הגדירו דגל (בוליאני) `error = false`.  
- תנאי ה־`while` יהיה `ch != '.' && !error`.  
- בכל איטרציה קלטו תו (`char ch`) ובדקו האם טווח האותיות תקין.  
- אם לא, עדכנו `error = true`.  
</details>

## 5.3.4  
כתבו תוכנית שקוראת מספרים שלמים וחישוב מכפלתם המצטברת, כל עוד המכפלה קטנה מ-1000 והדגל `isZeroFound=false`. בכל איטרציה קלטו מספר; אם הוא אפס, עדכנו `isZeroFound=true`, אחרת הכפילו את המספר למכפלה.

<details markdown="1"><summary>הדרכה</summary>  
- הגדירו `product = 1` ודגל `isZeroFound = false`.  
- תנאי הלולאה: `product < 1000 && !isZeroFound`.  
- בכל איטרציה קלטו `num`; אם `num == 0`, העבירו `isZeroFound = true`, אחרת: `product *= num`.  
</details>

## 5.3.5 
כתבו תוכנית הקולטת עשרה מספרים שלמים ומשתמשת בדגל `hasEven=false`. בכל איטרציה, אם המספר מתחלק ב-2, עדכנו את הדגל בהתאם. לאחר סיום הלולאה הדפיסו את סכום המספרים שנקלטו, ובנוסף “נמצא זוגי” אם אכן נמצא קלט זוגי ו"לא נמצא זוגי" אם לא נמצא.

<details markdown="1"><summary>הדרכה</summary>  
- הגדירו `hasEven = false`.  
- לולאת `for (int i = 0; i < 10; i++)`.  
- בכל איטרציה קלטו `num`; אם `num % 2 == 0`, העבירו `hasEven = true`.  
- בסיום, בדקו את `hasEven` והדפיסו בהתאם.  
</details>

## 5.3.6  
כתבו תוכנית שקוראת ערך $$n$$ מהמשתמש, ואז קולטת $$n$$ מספרים באמצעות לולאת `for` ומשתמשת בדגל `exceedsLimit=false`. בכל איטרציה הוסיפו את המספר לסכום המצטבר; אם הסכום עובר את הערך 500, עדכנו `exceedsLimit=true`. לאחר הלולאה הדפיסו “עבר את המגבלה” אם `exceedsLimit=true`, אחרת “בסדר”.

<details markdown="1"><summary>הדרכה</summary>  
- הגדירו `sum = 0` ודגל `exceedsLimit = false`.  
- קלטו את $$n$$ והפעילו `for (int i = 0; i < n; i++)`.  
- בכל איטרציה קלטו `num`, הוסיפו ל־`sum`.  
- אם `sum > 500`, העבירו `exceedsLimit = true`.  
- בסיום, בדקו את `exceedsLimit`.  
</details>

## 5.3.7  
כתבו תוכנית שמחשבת את המכפלה של המספרים מ-1 עד $$n$$ (שנקלט מהמשתמש) באמצעות לולאת `for`. השתמשו בדגל `overflow=false`; בכל איטרציה, אם המכפלה עולה על ערך סף (למשל 1000), עדכנו `overflow=true` וקטעו את הלולאה. לאחר מכן הדפיסו “אירע overflow” אם `overflow=true`, אחרת “חישוב הושלם בהצלחה”.

<details markdown="1"><summary>הדרכה</summary>  
- הגדירו `product = 1` ודגל `overflow = false`.  
- קלטו את $$n$$ והפעילו `for (int i = 1; i <= n; i++)`.  
- בכל איטרציה הכפילו: `product *= i`.  
- אם `product > 1000`, העבירו `overflow = true` ו`break`.  
- בסיום, בדקו את `overflow`.  
</details>
