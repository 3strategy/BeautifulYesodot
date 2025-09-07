---
layout: page
title: "תרגול 2.1 - המחלקות Math, Random"
subtitle: "תרגול פונקציות מתמטיות והגרלת מספרים אקראיים"
author: גיא סידס
mathjax: true
lang: he
---



**מומלץ לאחר השיעור: צפו בפרק 3.2 בקמפוס ופתרו את התרגילים בפרקים 3.1 ו-3.2 (כל השאלות האמריקאיות).**  
שאלות התכנות המופיעות כאן הן שאלות רשות.
{: .box-note}

---

## 2.1.1 חישוב שטח ואלכסון של מלבן {#id2.1.1}

כתבו תוכנית הקולטת מהמשתמש שני מספרים שלמים (אורך ורוחב של מלבן) ומדפיסה:
- את שטח המלבן
- את אורך אלכסון המלבן (משפט פיתגורס)

הנח שהקלט תקין. בחר שמות משתנים משמעותיים. בדוק עם דוגמאות קלט ופלט.

---

<details markdown="1">
<summary>גרסה מתקדמת: שימוש בפונקציה</summary>


{: .subq}
א. כתבו פונקציה  `static void RectangleAnalysis(int width, int height)`  המקבלת שני שלמים (אורך ורוחב של מלבן), ומדפיסה את שטח המלבן ואת אורך האלכסון (בלי להחזיר ערך).


{: .subq}
ב. כתבו תכנית הראשית המגרילה אורך ורוחב של המלבן בעזרת אובייקט מטיפוס Random וקוראת לפונקציה מסעיף א עם הערכים שהגרלתם. התכנית תדפיס את שטח המלבן שמתקבל.

</details>

---

## 2.1.2 חישוב הפרש גבהים ומציאת הנמוך {#id2.1.2}

כתבו תוכנית הקולטת מהמשתמש את גובהם של שני תלמידים (מספרים ממשיים) ומדפיסה:
- את הערך המוחלט של הפרש הגבהים שלהם
- את גובה התלמיד הנמוך מבין השניים

יש להשתמש בפונקציות ממחלקת Math. ודאו שהודעות הקלט/פלט ברורות.

---

<details markdown="1">
<summary>גרסה מתקדמת: שימוש בפונקציה</summary>


{: .subq}
א. כתבו פונקציה המקבלת שני מספרים ממשיים (גובהי תלמידים) ומחזירה:

-   את הערך המוחלט של הפרש הגבהים שלהם.
-   את גובה התלמיד הנמוך.

    השתמשו בפונקציות ממחלקת Math.  

{: .subq}
ב. הציגו גם את התכנית הראשית המבצעת קריאה לפונקציה.

</details>

---

## 2.1.3 הגרלת מספרים, חישוב שורש והשוואת ערכים מעוגלים {#id2.1.3}

כתבו תוכנית המגרילה שלושה מספרים שלמים בטווח 20 עד 40, ומדפיסה:
- את שלושת המספרים
- את המספר הגדול ביותר
- את השורש הריבועי המעוגל ל-0 ספרות דיוק של כל אחד מהמספרים
- **כאן נדרש שימוש בתנאי. לא למדנו.** הודעה מתאימה אם יש לפחות שני מספרים שהשורש המעוגל שלהם שווה

השתמשו באובייקט מסוג Random ובפונקציות ממחלקת Math.

---

<details markdown="1">
<summary>פתרון</summary>

{% highlight csharp linenos %}public static Random rnd = new Random();

/// <summary>
/// Q213 הגרלה. מציאת הגדול ביותר. עיגול שורשים, שימוש בתנאי
/// </summary>
public static void Q213()
{
    int num1 = rnd.Next(20, 41);
    int num2 = rnd.Next(20, 41);
    int num3 = rnd.Next(20, 41);
    int max = Math.Max(num1, num2);
    max = Math.Max(max, num3);
    // או בפקודה אחת:
    max = Math.Max(num3, Math.Max(num1, num2));
    Console.WriteLine($"max is: {max}");

    double sqr1 = Math.Round(Math.Sqrt(num1));
    double sqr2 = Math.Round(Math.Sqrt(num2), 0);
    double sqr3 = Math.Round(Math.Sqrt(num3), 0);

    Console.WriteLine($"sqr1: {sqr1}, sqr2: {sqr2}, sqr3: {sqr3}");

    // תנאים עדיין לא למדנו
    // else if, else תנאי פשוט עם
    if (sqr1 == sqr2)
        Console.WriteLine("at least 1 has same root.");
    else if (sqr2 == sqr3)
        Console.WriteLine("at least 1 has same root.");
    else if (sqr3 == sqr1)
        Console.WriteLine("at least 1 has same root.");

    // שימוש בתנאי מורכב:
    if (sqr1 == sqr2 || sqr1 == sqr3 || sqr2 == sqr3)
        Console.WriteLine($"at least 1 has " + // מעבר שורה לא עובר שורה
            "the same root:\n\there, using a compound logical expression");
    // כן עובר שורה \n  מוסיף טאב \t
}

/// <summary>
/// (כתיבת הערות. קריאה מתכנית ראשית לפעולה(פונקציה
/// </summary>
public static void Main()
{
    Q213();
}
{% endhighlight %}

</details>

---


## 2.1.4(12) חישוב ערך פונקציה y=x³+6x-10 {#id2.1.4}

כתבו תוכנית הקולטת מהמשתמש מספר שלם x, ומדפיסה את ערך y עבור  
$$ y = x^3 + 6x - 10 $$

יש להשתמש בפונקציות מתוך הספרייה Math.

---

<details markdown="1">
<summary>גרסה מתקדמת: שימוש בפונקציה</summary>

{: .subq}
א. כתבו פונקציה `static int CalcY(int x)` שמקבלת מספר שלם x, ומדפיסה את ערך y לפי $$ y = x^3 + 6x - 10 $$

{: .subq}
ב. כתבו תכנית ראשית הקוראת לפונקציה ומדפיסה את התוצאה.

</details>

---



## 2.1.5 (מצריך שימוש בתנאי) בדיקת "מספר משולש" תלת-ספרתי  {#id2.1.5}

כתבו תוכנית הקולטת מספר תלת-ספרתי שלם, ומדפיסה האם המספר הוא "מספר משולש".  
מספר משולש הוא מספר בו הסכום המתקבל כשכל ספרה מועלית בחזקת 3 שווה למספר עצמו (למשל: $$153 = 1^3 + 5^3 + 3^3$$).

השתמשו בפונקציות ממחלקת Math.

---

<details markdown="1">
<summary>גרסה מתקדמת: שימוש בפונקציה</summary>

{: .subq}
א. כתבו פונקציה `static bool IsTriNumber(int num)` המקבלת מספר תלת-ספרתי ומחזירה true אם המספר הוא "מספר משולש", אחרת false. השתמשו בפונקציות ממחלקת Math.  

{: .subq}
ב. כתבו תכנית ראשית הקוראת לפונקציה ומדפיסה את התוצאה.

</details>

---

# הערה: התרגילים מכאן ואילך אינם מתאימים לתחילת הלמידה

## 2.1.6 אתגר: מציאת מספר המדריכים ללא שימוש בתנאי {#id2.1.6}
בשלב זה של הלמידה - זו שאלת אתגר. מקובל לתת שאלה זו כתרגול של תנאי, ושארית חלוקה. כיוון שנלמד Math לפני תנאים, היא תהווה דוגמא לשימוש בפונקציה Math.Ceiling.
{: .box-note}

לפי חוקי תנועות הנוער יש להקצות מדריך אחד לכל 10 חניכים שמשתתפים במחנה קיץ.

כתבו תוכנית ראשית שקולטת את מספר החניכים ומדפיסה כמה מדריכים יש להקצות, לפי הכלל הבא:
- אם יש עד 10 חניכים – מדריך אחד.
- אם יש 11–20 חניכים – שני מדריכים.
- אם יש 21–30 חניכים – שלושה מדריכים.
- וכן הלאה.

<details markdown="1"><summary>פתרון + פירוט סדר הפעולות</summary>

{% highlight csharp linenos %}static void Main(String[] args)
{
    Console.Write("Enter a number: ");
    int num1 = int.Parse(Console.ReadLine());
    // ?נראה כמו סינית
    int result = (int)Math.Ceiling((double)num1 / 10);
    Console.WriteLine(result);
}
{% endhighlight %}

**כאן GPT בהרחבה מלאה של השלבים כדי להדגים את סדר הפעולות**
{% highlight csharp linenos %}static void Main(string[] args)
{
    // 1. Prompt the user
    Console.Write("Enter a number: ");

    // 2. Read the input as a string
    string input = Console.ReadLine();

    // 3. Parse the string to an integer
    int num1 = int.Parse(input);

    // 4. Convert the integer to double
    double num1Double = (double)num1;

    // 5. Divide by 10
    double division = num1Double / 10;

    // 6. Apply the ceiling function
    double ceilingValue = Math.Ceiling(division);

    // 7. Cast back to int (can skip this)
    int result = (int)ceilingValue;

    // 8. Print the result
    Console.WriteLine(result);
}
{% endhighlight %}

**וכאן עוד גרסאות מקוצרות על בסיס אותו רעיון**

```csharp
static void Main(String[] args)
{
    Console.Write("Enter a number: ");
    // וכאן, מקוצר בצורה מוגזמת
    Console.WriteLine(Math.Ceiling(
        double.Parse(Console.ReadLine()) / 10));
}

static void Main(String[] args)
{
    Console.Write("Enter a number: ");
    // ועוד דוגמא מקוצרת שכופה תוצאה ממשית בעזרת 10.0
    Console.WriteLine(Math.Ceiling(
        int.Parse(Console.ReadLine()) / 10.0));
        // כאן ללא 10.0 הקוד לא מתקמפל
        // double דורשת לקבל Math.Ceiling הפונקציה
}
```


</details>

## 2.1.7 אתגר: כמה ימים בפברואר. שימוש בתיקרה {#id2.1.7}
גם את השאלה הזו נותנים כשאלה פשוטה כשמלמדים תנאים. אבל, תמיד יהיו בקבוצה תלמידים עם ידע מהחטיבה ששאלות כאלו לא מאתגרות אותם. כדאי לדרוש מהם לפתור ללא שימוש בתנאים.
{: .box-note}


לפי היומן היוליאני (על שם יוליוס קיסר) אם שנה מתחלקת ב-4 ללא שארית יהיו בפברואר 29 ימים במקום 28. 
כתבו תכנית הקולטת מספר שנה ומדפיסה כמה ימים יהיו בפברואר, מבלי להשתמש בתנאי.

אופן החישוב כאן מבוסס על אותה הטכניקה שהודגמה בשאלה הקודמת

<details markdown="1"><summary>פתרון</summary>

```csharp
Console.Write("Enter a number: ");
int year = int.Parse(Console.ReadLine());
int extra = (int)Math.Ceiling(year / 4.0) - year / 4;
Console.WriteLine($"February of {year} has {29 - extra} days");
```

תהליך החשיבה מפתרון (בדוגמא כאן) כלל זיהוי שאם נבצע חלוקה בממשי, נקבל את השארית כעשרוני, וניתן לעגל מעלה (כל המקרים עם שבר עשרוני ורק הם, יגדלו ב-1). כך נקבל הפרש בין שתי תוצאות החלוקה. בהמשך אם ננסה להדפיס $$28+extra$$ זה לא יעבוד. אחרי חשיבה נוספת ניתן לזהות שיש צורך ב- $$29 - extra$$. לא תמיד רואים מיד את הסוף.
{: .box-note}

</details>


## 2.1.8 אתגר 2: כמה ימים בפברואר (ללא שימוש בתנאי או בפונקצית תקרה) {#id2.1.8}

רק לאחר הפתרון חשבתי שיש אפשרות לבצע זאת **באמצעות שארית חלוקה** באופן הבא:
ראשית עושים **רדוקציה** לשאלה

רדוקציה היא טכניקה שבה לוקחים בעיה 𝐴 A (לרוב מורכבת או לא ידועה) וממירים אותה—בצורה אלגוריתמית ויעילה—לבעיה 
𝐵 B שכבר יודעים כיצד לפתור או שהיא "פשוטה יותר" מבחינת הבנה/יישום. המרה זו כוללת:

נסו לכתוב מיפוי של המספרים המתחלקים ב-4 ל-4 ושל כל האחרים ל-1
 
לאחר מכן תוכלו להשתמש בכך כדי להדפיס אם יש 28 או 29 ימים בדרך שהוצגה קודם


<details markdown="1"><summary>פתרון - מיפוי ל-0 ו-1</summary>

```csharp
static void Main(String[] args)
{
    Console.Write("Enter year: ");
    int year = int.Parse(Console.ReadLine());
    int zeroOr1 = (year % 4 + 3) / 4;
    Console.WriteLine($"{year} maps to {zeroOr1}");
}
```

ראשית כמה מילים על אספקת פתרונות. היו מודעים לכך שאין בעיה לקבל פתרון מ-GPT על הכל.
מה שיקבע אם התלמיד הוא כזה שמאתגר את עצמו - הוא מוטיביציה פנימית. כשהחלטתי לדוגמא להוסיף את השאלה הזו (מתוך הפרק של תנאים) אף פעם לא ניסיתי לפתור אותה באופן הזה קודם. אבל אני מרגיש חייב לנסות לבד. אני מאמין שגם אתם, וגם הרבה תלמידים ינסו לפתור לבד. מי שהמטרה שלהם היא לעקוף את התרגול, יתקלו בבעיה בבחינה.
{: .box-note}

</details>

## 2.1.9 אתגר 3: הגרלת המספרים 1,2,10,11,12 {#id2.1.9}
עליכם לבחור בהגרלה את אחד מ-5 החודשים הבאים $$1,2,10,11,12$$ (החודשים מיוצגים באמצעות שלמים, ומדובר ברצף של 3 החודשים האחרונים בשנה, ושני החודשים הראשונים בשנה)

- הפתרון באמצעות תנאים הוא פשוט - אבל בשלב זה אין תנאים. האתגר הוא לפתור ללא שימוש בתנאים במערכים וכו'. 
- עליכם לכתוב שורה אחת שבסופה ```... = int n``` יקבל לתוכו את החודש המוגרל.
- התרגיל קשה יותר במקרה שנדרוש שההגרלה תהיה הוגנת (הסתברות אחידה של 0.2 לכל אחד מ-5 החודשים)

לנוחותכם מצורף קוד שבודק את ההתפלגות ההגרלות של הפתרון שלכם. שימו את הקוד שלכם בשורה 7 לצורך בדיקה:

<details markdown="1"><summary>תבנית לבדיקה ההתפלגות באמצעות מערך מונים</summary>

{% highlight csharp linenos %}static Random rnd = new Random();
static void Main()
{
    int[] arr = new int[13];
    for (int i = 0; i < 10000000; i++)
    {
        int n = // הפתרון שלכם להגרלת המספרים 1,2,10,11,12...
        arr[n]++;
    }

    for (int i = 0; i < arr.Length; i++)
        Console.WriteLine($"i:{i} {arr[i] / 10000000.0}");
}
{% endhighlight %}