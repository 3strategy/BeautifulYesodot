---
layout: page
title: "תרגול 7.2 - פונקציות void המקבלות פרמטרים"
subtitle: "תרגול בכתיבת פונקציות המקבלות פרמטרים, מבצעות חישובים והדפסות אך אינן מחזירות ערך"
tags: [functions, parameters, C#]
mathjax: true
lang: he
---

## 7.2.1 — זוגי או אי-זוגי? {#id7.2.1}
**מבוסס על 5.1.1**

{: .subq}
א. כתבו פונקציה `PrintEvenOrOdd(int n)` המקבלת מספר שלם n ומדפיסה הודעה המציינת האם n הוא זוגי או אי-זוגי. למשל, עבור הקריאה PrintEvenOrOdd(13) תודפס ההודעה: 13 is odd.

{: .subq}
ב. כתבו תכנית ראשית `()Main` הקולטת מהמשתמש מספר שלם אחד, וקוראת לפונקציה שכתבתם כדי להציג את התוצאה. 

<details markdown="1"><summary>אין פתרון</summary></details>

---

## 7.2.2 — המקסימום מבין שלושה מספרים {#id7.2.2}
**מבוסס על 4.3.4**

{: .subq}
א. כתבו פונקציה `PrintMax3(int a, int b, int c)` המדפיסה את הערך המקסימלי מבין שלושת המספרים a, b, c. לדוגמה, הקריאה `PrintMax3(7, -2, 7)` תדפיס: Max is 7.

{: .subq}
ב. הוסיפו תכנית ראשית `()Main` שקולטת שלושה מספרים שלמים מהמשתמש, וקוראת ל-PrintMax3 עם שלושת הערכים שהוקלדו. 

<details markdown="1"><summary>אין פתרון</summary></details>

---

## 7.2.3 — הדפסת תו פעמים רבות {#id7.2.3}
**מבוסס על דפוס PrintStars**

{: .subq}
א. צרו פונקציה `PrintLine(char ch, int count)` המקבלת תו (Character) ומספר שלם, ומדפיסה בשורה אחת את התו שהתקבל count פעמים. למשל, `PrintLine('#', 5)` תפיק את השורה: ####.

{: .subq}
ב. כתבו תכנית ראשית `()Main` שקוראת לפונקציה זו מספר פעמים, עם פרמטרים שונים לפי בחירתכם, להדגמת הפעולה (ניתן לבקש קלט מהמשתמש עבור התו ומספר הפעמים). 

<details markdown="1"><summary>אין פתרון</summary></details>

---

## 7.2.4 — משולש כוכביות גמיש {#id7.2.4}
**מבוסס על 6.1.1 Pattern 4**

כתבו פונקציה `PrintTriangle(int n)` המדפיסה משולש כוכביות בן n שורות. בשורה הראשונה יודפס כוכבית אחת, בשנייה 2, וכן הלאה עד לשורה ה-n שתכיל n כוכביות. לדוגמה, `PrintTriangle(4)` יפיק:

```
*  
**  
***  
****  
```

<details markdown="1"><summary>אין פתרון</summary></details>


## 7.2.5 — כל המחלקים של מספר {#id7.2.5}
**מבוסס על 5.2.3**

{: .subq}
א. כתבו פונקציה `PrintDivisors(int num)` שמקבלת מספר שלם חיובי num ומדפיסה את כל המחלקים (divisors) החיוביים של num. למשל, עבור הקלט 28 הפלט יהיה: 1, 2, 4, 7, 14, 28 (ניתן להדפיס ברצף מופרד בפסיקים או בשורות נפרדות).

{: .subq}
ב. (אתגר) נסו לייעל את הפונקציה כך שלא תבצע איטרציות מיותרות מעבר לנדרש. 

<details markdown="1"><summary>פתרון</summary> 

{% highlight csharp linenos %}public static void PrintDivisors(int num)
{
    for (int candidate = 1; candidate <= num; candidate++)
    {
        if (num % candidate == 0)
            Console.Write(candidate + " ");
    }
    Console.WriteLine();
}

{% endhighlight %} 

</details>



## 7.2.6 - בדיקת מספר ראשוני {#id7.2.6}

{: .subq}
א. כתבו פונקציה `public static void PrintIsPrime(int num)` המקבלת מספר שלם חיובי ובודקת האם הוא ראשוני. הפונקציה תדפיס הודעה מתאימה, למשל: 17 is prime או 18 is not prime.

{: .subq}
ב. הוסיפו בתוכנית תכנית ראשית `()Main` הקולטת מספר מהמשתמש, וקוראת לפונקציה שכתבתם כדי להציג את ההודעה המתאימה. 

<details markdown="1"><summary>אין פתרון</summary></details>

## 7.2.7 - סדרת פיבונאצ'י {#id7.2.7}

{: .subq}
א. כתבו פונקציה `PrintFibonacci(int n)` שמקבלת מספר שלם חיובי n ומדפיסה את n האיברים הראשונים בסדרת פיבונאצ'י. סדרת פיבונאצ'י מתחילה בערכים 0, 1, וכל איבר לאחר מכן הוא סכום שני האיברים הקודמים לו. לדוגמה, עבור הקריאה `PrintFibonacci(8)` הפלט יהיה: 0 1 1 2 3 5 8 13.

{: .subq}
ב. צרו תכנית ראשית `()Main` הקולטת מהמשתמש מספר חיובי אחד, וקוראת ל-PrintFibonacci עם הערך שהוזן. 

<details markdown="1"><summary>פתרון</summary> 

{% highlight csharp linenos %}public static void PrintFibonacci(int n)
{
    int a = 0, b = 1;
    for (int i = 1; i <= n; i++)
    {
        Console.Write($" {a}");
        int next = a + b;
        a = b;
        b = next;
    }
    Console.WriteLine();
}
{% endhighlight %} 

</details>

## 7.2.8 - הדפסת שם מספר פעמים {#id7.2.8}
כתבו פונקציה `PrintNameMultiple(string name, int times)` המקבלת שם (מחרוזת) ומספר שלם times, ומדפיסה את השם שהתקבל times פעמים ברצף אחד אחרי השני. למשל, הקריאה PrintNameMultiple("Noa", 3) תדפיס: Noa Noa Noa (באותה שורה או בשורות שונות - לפי החלטתכם). 

<details markdown="1"><summary>אין פתרון</summary></details>

## 7.2.9 - ממוצע ציונים {#id7.2.9}
פונקציה `PrintAverage(int grade1, int grade2, int grade3)` המקבלת שלושה ציונים (בין 0 ל-100) ומדפיסה את הממוצע שלהם. לדוגמה, PrintAverage(90, 85, 100) תדפיס: Average = 91.67 (אפשר לעגל את התוצאה לשני מקומות עשרוניים). כתבו את הפונקציה הנ"ל, והוסיפו תוכנית ראשית הקולטת שלושה ציונים מהמשתמש ומשתמשת בפונקציה כדי להציג את הממוצע. 

<details markdown="1"><summary>אין פתרון</summary></details>



## 7.2.10 - חישוב סכום של כל הקומבינציות {#id7.2.10}
כתבו פעולה המקבלת 3 מספרים שלמים, הפעולה מדפיסה את כל הסכומים האפשריים (כולל הביטויים לחישוב הסכומים).
למשל: עבור המספרים n1=1, n2=2, n3=3 הפעולה תדפיס כפלט:
1+2=3
1+3=4
2+3=5


<details markdown="1"><summary>פתרון</summary></details>

```csharp
static void Main(string[] args)
{
    Get3ParamsAndMultiply(1,2,3);
}
public static void Get3ParamsAndMultiply(int n1, int n2, int n3)
{
    Console.WriteLine($"{n1} + {n2} = {n1 + n2}");
    Console.WriteLine($"{n2} + {n3} = {n3 + n2}");
    Console.WriteLine($"{n1} + {n3} = {n1 + n3}");
}
```

[⬅ עִבְרוּ לתרגול 7.1 - פונקציות void: פעולות ללא פרמטרים](/cs2/Chapter7Ex7.1)

[⬅ עִבְרוּ לתרגול 7.3 - פונקציות המקבלות ומחזירות ערך](/cs2/Chapter7Ex7.3)