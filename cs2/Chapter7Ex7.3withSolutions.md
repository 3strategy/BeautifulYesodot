---
layout: page
title: "תרגול 7.3 - פונקציות המקבלות ומחזירות ערך"
subtitle: "תרגול בכתיבת פונקציות המקבלות פרמטרים, ומחזירות ערך"
tags: [functions, parameters, C#]
mathjax: true
lang: he
---


## 7.3.1 כתיבת הגדרות של פונקציות

השלימו את הטבלה - כתבו את ההגדרות של הפונקציות שמבצעות את המתואר בכל שורה

| החישוב הדרוש                                       | כותרת הפעולה                                      |
|----------------------------------------------------|---------------------------------------------------|
| א. חישוב ההפרש בין שני גבהים                      |  ```your function declaration here```  |
| ב. חישוב מספר הספרות שיש למספר נתון              |                    |
| ג. בדיקה האם המספר a מתחלק ב-b באופן שלם         |                  |
| ד. בדיקה האם המספר השלישי הוא ממוצע של שני הראשונים |  |
| ה. מחרוזת המכילה תוכן של קובץ מסוים במחשב         |        |
{: .table-rl}

---

<details markdown="1"><summary>פתרון</summary>


| החישוב הדרוש                                       | כותרת הפעולה                                      |
|----------------------------------------------------|---------------------------------------------------|
| א. חישוב ההפרש בין שני גבהים                      | `static int HeightDifference(int height1, int height2)`  |
| ב. חישוב מספר הספרות שיש למספר נתון              | `static int CountDigits(int number)`                     |
| ג. בדיקה האם המספר a מתחלק ב-b באופן שלם         | `static bool IsDivisible(int a, int b)`                  |
| ד. בדיקה האם המספר השלישי הוא ממוצע של שני הראשונים | `static bool IsAverageOf(int first, int second, int third)` |
| ה. מחרוזת המכילה תוכן של קובץ מסוים במחשב         | `static string ReadFileContent(string filePath)`          |
{: .table-rl}

</details>


## 7.3.2 7 BOOM

<!-- 4.0.3 במצגת 4-5 -->

{: .subq}
א. יש לכתבו פעולה `static string SevenBoom(int num)` המקבלת מספר ומחזירה boom אם המספר מתחלק ב-7 או מופיעה בו הספרה 7 אחרת הפעולת מחזירה את המספר עצמו (כמחרוזת).

{: .subq}
ב. יש לכתבו תכנית ראשית המשתמשת בפונקציה כדי לשחק במשחק '7 בום' בתחום המספרים 1 עד (כולל) 99

פלט התכנית:
```
1 2 3 4 5 6 boom 8 9 10 11 12 13 boom 15 16 boom 18...
```

<details markdown="1"><summary>פתרון</summary>

```csharp
// א. פונקציה שמקבלת מספר ומחזירה "boom" אם המספר מתחלק ב-7 או מכיל את הספרה 7
static string SevenBoom(int num)
{
    // בדיקה אם המספר מתחלק ב-7
    if (num % 7 == 0)
        return "boom";
    // בדיקה אם המחרוזת של המספר מכילה את התו '7'
    if (num.ToString().Contains('7'))
        return "boom";
    // במקרה אחר, החזר את המספר כמחרוזת
    return num.ToString();
}

// ב. תכנית ראשית של שאלת 7.3.2, שם הפונקציה MainQ732
static void MainQ732()
{
    for (int i = 1; i <= 99; i++)
    {
        Console.Write(SevenBoom(i));
        if (i < 99)
            Console.Write(" ");
    }
    Console.WriteLine();
}
```
</details>


## 7.3.3 עצרת
<!-- 4.24 במצגת 4-5 -->
כתבו פעולה `Factorial(int n)` המקבלת מספר שלם ומחזירה עצרת שלו

<details markdown="1"><summary>פתרון</summary>

```csharp
// א. פונקציה Factorial המקבלת n (int) ומחזירה עצרתו (int)
static int Factorial(int n)
{
    if (n < 0) // עצרת לא מוגדרת למספרים שליליים
        throw new ArgumentException("n must be non-negative", nameof(n));

    int result = 1;
    for (int i = 2; i <= n; i++)
        result *= i; // כפל מצטבר
    return result;
}
```
</details>

## 7.3.4 תכונות חלוקה
<!-- 4.0.5 במצגת 4-5 -->

{: .subq}
א. כתבו פעולה המקבלת זוג מספרים שלמים. הפעולה תחזיר false אם המספרים שווים או קטנים מ-1. בכל מקרה אחר, אם המספר הראשון מתחלק (ללא שארית) במספר השני או אם המספר השני מתחלק (ללא שארית) במספר הראשון יוחזר true, אחרת false.

{: .subq} 
ב. העזרו בקוד המצורף לבדיקת הפעולה שכתבתם בסעיף א: התכנית בודקת עבור 5 זוגות מספרים ומדפיסה הודעה מתאימה עבור כל זוג מספרים. 
ניתן כשנלמד מערכים להגדיר מערך ולהשתמש בלולאת foreach באופן הבא: 

```csharp
using System;
using System.Diagnostics;

class Program
{
    
    // לכאן יש להעתיק את מימוש הפונקציה שכתבתם בסעיף א'
    static bool CheckPair(int number1, int number2)
    {
        // מימוש הפונקציה שלכם...

    }
    static void Main()
    {
        // אוסף הזוגות לבדיקה: (מספר ראשון, מספר שני, התוצאה הצפויה)
        var testPairs = new (int First, int Second, bool Expected)[]
        {
            (3, 5, false),
            (5, 15, true),
            (2, 5, false),
            (3, 6, true),
            (10, 5, true)
        };

        foreach (var (first, second, expected) in testPairs)
        {
            bool actual = CheckPair(first, second);    // קריאה לפונקציה מסעיף א׳
            Debug.Assert(actual == expected,
                $"test failed for ({first}, {second}): expected {expected}, actual {actual}");
            Console.WriteLine($"({first}, {second}) -> expected: {expected}, actual: {actual}");
        }
    }

}
```

<details markdown="1"><summary>פתרון</summary>

```csharp
// א. פונקציה המקבלת זוג מספרים ומחזירה true אם אחד מהם מתחלק בשלמות בשני
// מחזירה false אם המספרים שווים או כל מספר קטן מ-1
static bool IsDivisiblePair(int a, int b)
{
    if (a == b || a < 1 || b < 1) // בדיקה למקרים שמחזירים false מיד
        return false;
    if (a % b == 0 || b % a == 0) // בדיקה אם אחד מתחלק בשני ללא שארית
        return true;
    return false; // בכל מקרה אחר
}
```
</details>

<!-- 
ממתין למחרוזות
# 7.3.3 חבר מושבעים
4.11 של מצגת 4-5
{: .subq}
א. למשפט שנערך התמנה חבר מושבעים ובו 12 חברים. כל אחד מן המושבעים רושם בפתק את האות y אם לדעתו הנאשם אשם או את האות n אם לדעתו הנאשם חף מפשע. דין הנאשם יחרץ בהתאם לרוב.
כתבו פעולה המקבלת מחרוזת (סדרת תווים "…  ynyn" המייצגת את דעות חבר המושבעים). הפעולה מחזירה 1 אם הנאשם זכאי, 0 אם אין הכרעה, 1- אם הוא אשם. 
לא בהכרח יש 12 הצבעות, אך אם יש יותר מ-6 מסוג מסויים ניתן להכריע.
 -->


## 7.3.5 סכום סדרת טבעיים

כתבו תוכנית שמחזירה את הסכום של כל המספרים מ-1 ועד `num` (כולל). `num` תמיד יהיה מספר שלם חיובי גדול מ-0. הפונקציה שלך צריכה להחזיר רק את התוצאה. מה שמופיע בסוגריים בדוגמאות הוא הדרך שבה מגיעים לתוצאה ואינו חלק מהפלט.
 יש לפתור [בקישור זה CodeWars](https://www.codewars.com/kata/55d24f55d7dd296eb9000030)

לדוגמה (קלט → פלט):

```
2 → 3 (1 + 2)
8 → 36 (1 + 2 + 3 + 4 + 5 + 6 + 7 + 8)
```

<details markdown="1"><summary>פתרון</summary>

```csharp
// א. פונקציה שמחזירה את סכום כל המספרים מטווח 1 עד num (כולל)
static int Summation(int num)
{
    // num תמיד יהיה > 0 לפי תנאי השאלה
    return num * (num + 1) / 2; // נוסחת סכום טווח אריתמטי
}
```
</details>

## 7.3.6 מספר מושלם
יש לכתבו פעולה המקבלת מספר שלם, ומחזירה true אם הוא מושלם. אחרת false.
את השאלה הבאה יש לפתור באתר [codeWars בקישור זה](https://www.codewars.com/kumite/6343cebb6054f00030618f0d) לאחר שתצרו לעצמכם משתמש

בעבר הצעתי ציון 100 במחצית א לתלמיד שיגיע לניקוד 400 באתר CodeWars. כיום זה כבר לא אפשרי, בגלל LLM (GPT) אלא אם אתם רואים שהתלמיד אכן עובד. תלמידים שמגיעים לניקוד כזה באופן לגיטימי עד דצמבר, יסיימו ב-100 בשני השאלונים
{: .box-success}

<details markdown="1"><summary>פתרון</summary>

```csharp
// א. פונקציה המקבלת מספר שלם ומחזירה true אם הוא מושלם, אחרת false
static bool IsPerfect(int num)
{
    if (num <= 1) // לפי ההגדרה, מספרים <=1 אינם מושלמים
        return false;

    int sum = 1; // 1 תמיד מחלק
    int limit = num / 2;
    for (int i = 2; i <= limit; i++)
    {
        if (num % i == 0)
            sum += i; // הוסף מחלק אם אין שארית
    }
    return sum == num; // מושלם אם סכום המחלקים שווה למספר
}
```
</details>

## 7.3.7 מרחק בין עמודים
[קישור לשאלה באתר CodeWars](https://www.codewars.com/kata/5bb0c58f484fcd170700063d)
יש עמודים לאורך הכביש. המרחק בין כל שני עמודים סמוכים זהה, וכן רוחב כל העמודים זהה. הפונקציה שלך מקבלת שלושה פרמטרים:
1.	מספר העמודים (≥ 1)
2.	המרחק בין העמודים (10–30 מטר)
3.	רוחב העמוד (10–50 סנטימטר)
הפונקציה תחזיר את המרחק בין העמוד הראשון לעמוד האחרון בסנטימטרים, מבלי לכלול את רוחב העמוד הראשון והעמוד האחרון.


<details markdown="1"><summary>פתרון</summary>

```csharp
// א. פונקציה המקבלת מספר עמודים, מרחק ביניהם במטרים ורוחב עמוד בס"מ
// ומחזירה את המרחק בין העמוד הראשון לאחרון בס"מ, ללא רוחב העמוד הראשון והאחרון
static int DistanceBetweenPillars(int numPillars, int distBetweenMeters, int pillarWidthCm)
{
    if (numPillars <= 1) // אם יש עמוד אחד או פחות, אין מרחק
        return 0;
    // סכום המרחקים בין כל זוג עמודים סמוכים (בס"מ)
    int totalGaps = (numPillars - 1) * distBetweenMeters * 100;
    // סכום רוחבי העמודים שביניהם (בס"מ), פרט לראשון ולאחרון
    int totalIntermediateWidths = (numPillars - 2) * pillarWidthCm;
    return totalGaps + totalIntermediateWidths;
}
```
</details>


<!-- 
יחכה למחרוזות
## 7.3.1 אנליזת הצבעות
[text](https://www.codewars.com/kata/6343f62a2f5d2e0023639a26) -->


## 7.3.8 מעקב וטענות כניסה ויציאה

נתונה הפעולה הבאה:

{% highlight csharp linenos %}static bool Equal1(int n1, int n2)
{
    while (n1!=0 && n2!=0)
    {
        n1 = n1 / 10;
        n2 = n2 / 10;
    }
    return n1==0 && n2==0;
}
{% endhighlight %}

{: .subq}
א. עירכו טבלת מעקב עבור הערכים 578, 35 וציינו מה הערך אותו תחזיר הפעולה.

<details markdown="1"><summary>פתרון</summary>

טבלת מעקב עבור Equal1(578, 35):
|שלב | n1  | n2 | n1!=0 && n2!=0 | פעולה                      
|-----|-----|----|----------------|---------------------------
|1    | 578 | 35 | true           | n1=578/10=57, n2=35/10=3  
|2    | 57  | 3  | true           | n1=57/10=5,  n2=3/10=0   
|3    | 5   | 0  | false          | יציאה מהלולאה            

תוצאת הפעולה: n1==0 && n2==0 → 5==0 && 0==0 → **false**

</details>


{: .subq}
ב. תנו דוגמת קלט עבורה תחזיר הפעולה true ודוגמת קלט עבורה תחזיר הפעולה false.

<details markdown="1"><summary>פתרון</summary>

```csharp
// ב. דוגמאות קלט לפעולה Equal1:
// דוגמה שתְחזיר true:  Equal1(123, 987) → true   // שני מספרים בעלי אותו מספר ספרות
// דוגמה שתְחזיר false: Equal1(123, 45)  → false  // מספרים בעלי מספר שונה של ספרות
```
</details>

{: .subq}
ג. השלימו את טענת הכניסה והיציאה של הפעולה.

    ```csharp
    // טענת כניסה: הפעולה מקבלת שני מספרים חיוביים שלמים
    // טענת יציאה: ...
    ```

<details markdown="1"><summary>פתרון</summary>

**טענת כניסה:** הפעולה מקבלת שני מספרים חיוביים שלמים
**טענת יציאה:** מחזירה true אם לשני המספרים אותו מספר ספרות, אחרת false

</details>

<details markdown="1"><summary>פתרון ל-ג': הרחבה על המושגים טענת כניסה ויציאה</summary>


בטכניקות של Design by Contract במדעי המחשב מגדירים עבור כל פונקציה שני סוגי דרישות מרכזיות:

### טענת כניסה (Precondition)
היא התנאי שמחייב להתקיים לפני קריאת הפונקציה, כדי שהפונקציה תפעל כהלכה.
מגדירים אותה כדי לתעד אילו ערכים מותר להעביר לפונקציה.
אם המטפל (caller) מפר תנאי זה, התוצאה עלולה להיות בלתי־תחזיתית (חריגות, לולאות אינסופיות, ערכים שגויים).

**בדוגמה שניתנה:**
```csharp
// טענת כניסה: הפעולה מקבלת שני מספרים חיוביים שלמים
```
כלומר, הפונקציה מניחה שקיבלה x>0 ו־y>0 ושלמים, ואין צורך לבדוק זאת בפנים כל עוד הקריאה תעמוד בתנאי.

### טענת יציאה (Postcondition)
היא התנאי שהפונקציה מבטיחה שיעמוד אחרי סיום ההרצה שלה.
מתארת את ה״חוזה״ שהפונקציה עומדת בו כלפי המתכנת שמשתמש בה.
מאפשר לאמת בתום הריצה שהפונקציה אכן ביצעה את מה שנדרש.

**בדוגמה הנתונה:**
```csharp
// טענת יציאה: הפעולה מוודאת שמספר הספרות בשני המספרים זהה
```

כלומר, לאחר סיום הפונקציה, נחזיר true אם ומכיל־כל־ואי את התנאי, ו־false אחרת.

### למה זה חשוב?
- **בהירות תיעודית:** מאפשר למתכנתים להבין מיד מה מותר ומה מובטח בפונקציה, בלי לקרוא את כל הקוד בפנים.
- **זיהוי באגים מוקדם:** אי־קיום טענת כניסה יכול להרים שגיאה כבר בשלב בדיקות קלט, ואי־קיום טענת יציאה מדווח על כשל לוגי בתוך הפונקציה.
- **תחזוקת קוד קלה יותר:** כשמבצעים שינויים, אפשר לבדוק אוטומטית (assertions) שהחוזה עדיין נשמר.

### סיכום קצר

**Precondition:** התנאים שעל הסביבה (הקריאה) למלא לפני קריאה לפונקציה.

**Postcondition:** התנאים שהפונקציה מבטיחה לצרכן שלה לאחר סיום ההרצה.

בכתיבה מסוג `summary` אנחנו מכסים בעצם את טענת הכניסה והיציאה:

```csharp
/// <summary>
/// This function checks if two integers are equal by comparing their digits.
/// </summary>
/// <param name="n1">an integer</param>
/// <param name="n2">an integer</param>
/// <returns>true if both lengths are equal</returns>
```

{: .box-note}
המושג פחות בשימוש כיום ולא מופיע בבחינות בגרות, אלא בעיקר בספרות ובשאלות.

</details>

{: .subq}
ד. כתבו פעולה Equal2 השקולה לפעולה Equal1, אך מבצעת את האלגוריתם באופן שונה - הפעולה Equal2 תשתמש בפעולה הנתונה הבאה: `CountDigits`.

    {% highlight csharp linenos %}    /// <summary>
    /// טענת כניסה: הפונקציה מקבלת מספר שלם חיובי
    /// ממש לא מקובל לתעד בעברית
    /// </summary>
    /// <param name="num">integer</param>
    /// <returns>טענת יציאה: הפעולה מחזירה את מספר ספרותיו</returns>
    static int CountDigits(int num)
    {
        int counter = 0;
        while (num > 0)
        {
            num = num / 10;
            counter++;
        }
        return counter;
    }
    {% endhighlight %}

<details markdown="1"><summary>פתרון</summary>

ג. פעולת Equal2 שקולה ל-Equal1 אך משתמשת ב-CountDigits

```csharp
// טענת כניסה: הפעולה מקבלת שני מספרים חיוביים שלמים
// טענת יציאה: מחזירה true אם לשני המספרים אותו מספר ספרות, אחרת false
static bool Equal2(int n1, int n2)
{
    return CountDigits(n1) == CountDigits(n2);
}
```
</details>



## 7.3.9 משלוח מוניות
קבוצת אורחים מגיעה למלון לבילוי ספשבוע. האורחים מגיעים בשלוש טיסות. טיסה אחת ביום רביעי, אחת בחמישי בערב וטיסה בייום שישי בבוקר, ויש להביאם במוניות משדה התעופה למלון. במוניות של שדה התעופה מקום ל-7 נוסעים (פרט לנהג).

{: .subq} 
א. כדי לבצע את החישוב של כמות המוניות הנחוצה עבור מספר נוסעים נתון עליכם לכתוב פעולה בשם `TaxisOrder` המקבלת פרמטר num1 שמכיל את מספר הנוסעים, ומחזירה את מספר המוניות הנדרש.

{: .subq}
ב. כתבו תכנית ראשית שתדפיס כמה מוניות צריך לשלוח ביום ד' (עבור 49 נוסעים), כמה ביום ה' (עבור 52 נוסעים), וכמה ביום ו' (עבור 60 נוסעים). התכנית הראשית תקרא לפעולה 3 פעמים - קריאה אחת עבור כל יום, וכך תוכל להדפיס את מספר המוניות הדרושות.

<details markdown="1"><summary>פתרון</summary>

```csharp
// א. פונקציה המקבלת מספר נוסעים ומחזירה את מספר המוניות הנדרש (7 נוסעים לכל מונית)
static int TaxisOrder(int num1)
{
    // חלוקת עגולה כלפי מעלה: (num1 + 6) / 7
    return (num1 + 6) / 7;
}

// ב. תכנית ראשית של שאלת 7.3.9, שם הפונקציה MainQ739
static void MainQ739()
{
    // חישוב והצגת מספר המוניות לכל יום
    Console.Write(TaxisOrder(49)); // יום ד'
    Console.Write(" ");
    Console.Write(TaxisOrder(52)); // יום ה'
    Console.Write(" ");
    Console.WriteLine(TaxisOrder(60)); // יום ו'
}
```
</details>


<!-- # 7.3.10 ספירה רומית
מטלה מסכמת שאלה 9
פוסל את השאלה. לא מוגדרת עבודה עם L ועם C בשביל לדעת איך לספור עד 100 -->



## 7.3.10 ספרות חוזרות במספר
<!-- במקור שאלה 6 מהכנות למבחן - שהושמטה. -->
{: .subq}
א. 	כתבו פעולה המקבלת כפרמטר מספר שלם חיובי num וספרה digit. 
		הפעולה תחזיר כמה פעמים הספרה digit מופיעה במספר.
**דוגמא**: עבור המספר 123532 והספרה 3 יוחזר הערך 2, מאחר שהספרה 3 מופיעה פעמיים.

{: .subq}
ב. 	כתבו פעולה ראשית המגרילה 5 זוגות מספרים:
    - number - מספר בעל 4 ספרות (1000-9999),
    - digit - מספר בין 1 ל-9,
    ומדפיסה לכל זוג מספרים את המספרים שהוגרלו (number ו- digit) ואת מספר הפעמים שהספרה digit חוזרת במספר number.

<details markdown="1"><summary>פתרון</summary>

```csharp
// א. פונקציה המקבלת מספר שלם חיובי num וספרה digit ומחזירה כמה פעמים הספרה מופיעה במספר
static int CountDigitOccurrences(int num, int digit)
{
    int count = 0;
    while (num > 0)
    {
        if (num % 10 == digit) // השווה ספרת אחד
            count++;
        num /= 10; // הסר ספרה אחרונה
    }
    return count; // החזר מספר ההופעות
}

// ב. תכנית ראשית של שאלת 7.3.10, שם הפונקציה MainQ730
static void MainQ730()
{
    var rnd = new Random(); // יוצר אובייקט לאקראיות
    for (int i = 0; i < 5; i++)
    {
        int number = rnd.Next(1000, 10000); // מספר בין 1000 ל-9999
        int digit = rnd.Next(1, 10);        // ספרה בין 1 ל-9
        Console.WriteLine($"{number} {digit} {CountDigitOccurrences(number, digit)}");
    }
}
```
</details>


## 7.3.11

{: .subq}
א. כתבו פעולה בשם `IsEvenDigits` המקבלת מספר שלם וחיובי ומחזירה `true` אם כל ספרות המספר זוגיות, אחרת מחזירה `false`.

{: .subq}
ב. כתבו פעולה בשם `IsDiffDigits` המקבלת מספר חיובי ומחזירה `true` אם כל ספרותיו שונות זו מזו, אחרת מחזירה `false`. 

{: .subq}
ג. 	כתבו תוכנית (פעולה ראשית) הקולטת מספרים שלמים חיוביים, הקלט יסתיים כאשר נקלט מספר שאינו חיובי.
 	
    על התוכנית למצוא ולהדפיס את המספר הגדול ביותר שנקלט אשר מקיים את התנאי ״כל ספרותיו זוגיות וגם שונות זו מזו״.
 	במידה ולא נקלט מספר העונה לתנאי יינתן פלט שמסביר זאת כפי שמוצג בדוגמאות.

**דוגמאות:**
- עבור הקלט: 924,846,866,642,0

    יינתן הפלט: 846.
- ועבור הקלט: 3000 ,241,483,982,888,198

    יינתן הפלט: 0.


<details markdown="1"><summary>פתרון</summary>

```csharp
// א. פונקציה שבודקת אם כל ספרות המספר זוגיות
static bool IsEvenDigits(int num)
{
    if (num <= 0) // מבוצע רק עבור מספרים חיוביים
        throw new ArgumentException("Number must be positive", nameof(num));
    while (num > 0)
    {
        int d = num % 10;
        if (d % 2 != 0) // אם ספרה לא זוגית
            return false;
        num /= 10;
    }
    return true;
}

// ב. פונקציה שבודקת אם כל ספרות המספר שונות זו מזו (שימוש בלולאות מקוננות בלבד)
static bool IsDiffDigits(int num)
{
    int tempOuter = num;
    while (tempOuter > 0)
    {
        int digit = tempOuter % 10;             // הספרה הנבדקת
        int tempInner = tempOuter / 10;         // שאר הספרות הבאות אחרי הספרה הנבדקת
        while (tempInner > 0)
        {
            if (tempInner % 10 == digit)       // אם נמצאה ספרה זהה
                return false;
            tempInner /= 10;
        }
        tempOuter /= 10;                       // עבור לספרה הבאה לבדיקת ייחודיות
    }
    return true; // אם לא נמצאה אף חפיפה
}

// ג. תכנית ראשית של שאלת 7.3.11, שם הפונקציה MainQ7311
static void MainQ7311()
{
    int max = 0;
    while (true)
    {
        int n = int.Parse(Console.ReadLine()); // קריאה מהקלט
        if (n <= 0) // סיום על קלט לא חיובי
            break;
        if (IsEvenDigits(n) && IsDiffDigits(n) && n > max)
            max = n;
    }
    Console.WriteLine(max); // אם לא נמצא מספר העונה לתנאים, יוחזר 0
}
```
</details>



## 7.3.12 החלפת ספרות
<!-- במקור שאלה 8 שנמחקה ממטלת תרגול למבחן יסודות מחזור 3 -->
{: .subq}
א.	כתבו פעולה `SwitchDigits` המקבלת כפרמטר מספר שלם וחיובי ומחזירה:
את המספר במידה וכמות הספרות במספר אי-זוגית
את המספר בהיפוך ספרות של כל זוג ספרות סמוך. לדוגמה: אם המספר הוא 1234, הפעולה תחזיר מספר חדש 2143  (כלומר כל זוג ספרות סמוך החליף סדר).

{: .subq}
ב.	כתבו פעולה ראשית (`Main`) המגרילה 4 מספרים שלמים בין 1111 לבין 6868 (כולל).
הפעולה תדפיס בשורה נפרדת לכל מספר שהוגרל את המספר עצמו ולידו (עם רווח) את המספר בהיפוך ספרות (יש להשתמש בפעולה מסעיף א).


<details markdown="1"><summary>פתרון</summary>

```csharp
// ג. תכנית ראשית של שאלת 7.3.11, שם הפונקציה MainQ7311
static void MainQ7311()
{
    int max = 0;
    while (true)
    {
        int n = int.Parse(Console.ReadLine()); // קריאה מהקלט
        if (n <= 0) // סיום על קלט לא חיובי
            break;
        if (IsEvenDigits(n) && IsDiffDigits(n) && n > max)
            max = n;
    }
    Console.WriteLine(max); // אם לא נמצא מספר העונה לתנאים, יוחזר 0
}

// א. פונקציה SwitchDigits המקבלת מספר שלם חיובי ומחזירה:
// - את המספר המקורי אם כמות הספרות אי-זוגית
// - מספר חדש עם החלפת זוגות סמוכים אם כמות הספרות זוגית
static int SwitchDigits(int num)
{
    string s = num.ToString();
    if (s.Length % 2 != 0)
        return num; // מספר בעל אורך אי-זוגי, מחזירים במקור
    char[] arr = s.ToCharArray();
    for (int i = 0; i < arr.Length; i += 2)
    {
        // החלפת הספרה במיקום i ובמיקום i+1
        char tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
    }
    return int.Parse(new string(arr)); // החזרת המספר החדש
}

// ב. תכנית ראשית של שאלת 7.3.12, שם הפונקציה MainQ7312
static void MainQ7312()
{
    var rnd = new Random(); // אובייקט לייצור מספרים אקראיים
    for (int i = 0; i < 4; i++)
    {
        int number = rnd.Next(1111, 6869); // מספר בין 1111 ל-6868
        Console.WriteLine($"{number} {SwitchDigits(number)}");
    }
}
```
</details>



## 7.3.13 מספר עולה יורד
כתבו פונקציה המקבלת מספר שלם חיובי בן 3 ספרות לפחות מחשבת אם הוא עולה יורד ומחזירה בהתאם `true/false`
מספר הוא עולה יורד, אם הספרות (מימין לשמאל, עולות ממש, בעקביות ומנקודה מסויימת יורדות ממש בעקביות). 

**לדוגמא:**
- 12320 עולה יורד
- 43620 אינו עולה יורד
- 133420 אינו עולה יורד


<details markdown="1"><summary>פתרון GPT</summary>

```csharp
// BY GPT
// א. פונקציה שבודקת אם המספר בעל 3 ספרות לפחות הוא 'עולה-יורד'
// לפי הגדרה: מימין לשמאל הספרות עולות ממש ואז יורדות ממש לאחר נקודת שיא אחת
static bool OleYoredGPT(int num)
{
    if (num < 100) // לפחות 3 ספרות
        throw new ArgumentException("Number must have at least 3 digits", nameof(num));

    // קריאת הספרה התחתונה
    int prev = num % 10;
    num /= 10;
    // קריאת הספרה הבאה כדי לקבוע תחילת מגמת עלייה
    int curr = num % 10;
    if (curr <= prev) // חייב להתחיל בעלייה
        return false;
    prev = curr;
    num /= 10;

    bool peaked = false; // נשאית המעבר מירידה לעלייה
    while (num > 0)
    {
        curr = num % 10;
        if (!peaked)
        {
            if (curr > prev)
            {
                prev = curr; // ממשיכים בעלייה
            }
            else if (curr < prev)
            {
                peaked = true; // הגענו לשיא ועוברים למגמת ירידה
                prev = curr;
            }
            else
            {
                return false; // שווה, לא תקין
            }
        }
        else // במגמת ירידה
        {
            if (curr < prev)
            {
                prev = curr; // ממשיכים בירידה
            }
            else
            {
                return false; // עלייה או שווה לאחר השיא -> כשלון
            }
        }
        num /= 10;
    }
    return peaked; // חייב להיות ירידה לפחות פעם אחת
}
```
</details>

<details markdown="1"><summary>פתרון Guy</summary>

```csharp
public static bool OleYored1Guy(int n)
{   //  ============= גרסה בה התנאי העיקרי הוא הדגלים ================
    int num = n; // שומר את המספר המקורי להדפסה בסוף
    bool hasRizing = false;// מניח בשלילה שלא מתחיל בעליה
    bool isFalling = false; // להמשך- כשכבר תהיה עליה
    int prev = n % 10; // היסטוריה
    bool oleYored = true; //הנחה בשלילה שהכל טוב

    while (n > 9 && oleYored) //כל עוד תקף ולפחות 2 ספרות: פירוק מספר
    {
        n /= 10; // באופן חריג בהתחלה: מחלק ב-10   
        int current = n % 10; // ספרה הנוכחית

        if (current == prev)
            oleYored = false;

        if (!hasRizing)
            if (current < prev)
                oleYored = false;
            else
                hasRizing = true;
        // כבר בעליה
        else if (!isFalling && current < prev)
            isFalling = true; // סימון שהתחילה ירידה
        else if (isFalling && current > prev)
            oleYored = false;

        prev = current; // מעדכן את הספרה הקודמת לספרה הנוכחית
    }
    return (oleYored && isFalling && hasRizing);
}
```
</details>

<details markdown="1"><summary>פתרון Guy2</summary>

```csharp
public static bool OleYored2(int n)
{
    int num = n; // שומר את המספר המקורי להדפסה בסוף
    bool hasRizing = false;// מניח בשלילה שלא מתחיל בעליה
    bool isFalling = false; // להמשך- כשכבר תהיה עליה
    int prev = n % 10;
    bool oleYored = true; //הנחה בשלילה שהכל טוב

    while (n > 9 && oleYored) //כל עוד תקף ולפחות 2 ספרות: פירוק מספר
    {
        n /= 10; // באופן חריג בהתחלה: מחלק ב-10   
        int current = n % 10;  // ספרה הנוכחית

        if (current == prev)
            oleYored = false;  // אם הספרה הנוכחית שווה לקודמת, סימן שאין ירידה

        // ================ גרסה בה התנאי העיקרי הוא הספרות ===================
        else if (current > prev)
        {
            if (!hasRizing)  // לוגיקה שתקרה רק בפעם הראשונה
                hasRizing = true;  // ספרה הנוכחית גדולה מהקודמת, אז יש עליה

            else if (isFalling)  // אם כבר היה לי ירידה
                oleYored = false; // סימן שהכל לא בסדר
        }
        else // הספרה הנוכחית קטנה מהקודמת
        {
            if (!hasRizing)  // ירידה לפני שהתחילה עליה
                oleYored = false;
            else  // אם כבר היתה עליה וכן/לא לא סימנתי ירידה
                isFalling = true; //  גם אם כבר הפעלתי אני מפעיל את הדגל
        }

        prev = current; // מעדכן את הספרה הקודמת לספרה הנוכחית
    }

    return (oleYored && isFalling && hasRizing);
}
```
</details>