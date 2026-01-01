---
layout: page
title: "פרק 3 - תנאים, ביטויים לוגיים ושארית חלוקה"
subtitle: "תנאים, החלטות וביטויים לוגיים"
tags: [logical expressions,bool, ביטויים בוליאנים, תנאים מורכבים, אופרטורי השוואה, אופרטורים לוגיים, טבלת מעקב, טבלאות, סגנונות סוגריים]
mathjax: true
lang: he
---
<!-- https://chatgpt.com/c/67f0f869-af10-800e-8479-c8fd3873432c -->


{: .box-note}
**הערה:** בפרק זה נלמד כיצד לקבל החלטות בתוכנית שלנו באמצעות תנאים, ביטויים לוגיים ושימוש בשארית החלוקה.

## ריבוי שאלות בויז'ואל סטודיו

**המטרה: לארגן את החומרים גם בויז'ואל סטודיו בנוסף ל-google docs.**

{: .box-success}
ניתן לפעול ב-3 דרכים מומלצות כדי להכיל כמה פתרונות בתוך אותו פרוייקט
    1. מספר שאלות (כפעולות) באותו קובץ, 
    2. מספר מחלקות באותו פרוייקט, 
    3. מספר פרוייקטים באותו Solution.

<details markdown="1"><summary>הרחיבו כדי לצפות בסרטון המדגים את 3 הדרכים</summary>

הסרטון הבא מדגים את 3 הדרכים

{% include youtube.html id="qoSIYajsUk4" %} 



</details>

## משפטי תנאי - if, else {#id3if}

משפט תנאי מאפשר לנו לבצע פעולה מסוימת רק אם תנאי מסוים מתקיים.

מבנה משפט תנאי פשוט:

{% highlight cs mark_lines="2" %}
int score = 85;
if (score >= 60) // Logical Expression לביטוי שבסוגריים קוראים ביטוי לוגי
{
    Console.WriteLine("Passed the exam!");
}
{% endhighlight %}

---

## תרגול
כתבו תכנית הקולטת שני ציונים של תלמיד. ציון הראשון הוא של מחצית א' והציון השניה הוא של מחצית ב' במקצוע הנדסת תכנה. אם הציון השני גבוה מהציון הראשון לפחות ב-5 נקודות, יש להדפיס את ההודעה "התלמיד התקדם!"

---

## מבנה משפט תנאי עם else:

{% highlight csharp linenos %}int score = 55;
if (score >= 60) // false הביטוי הלוגי כאן הוא 
{
    Console.WriteLine("Passed the exam!");
}
else // לכן שורה 4 לא תבוצע ושורה 8 תבוצע
{
    Console.WriteLine("Failed the exam, try again.");
}
{% endhighlight %}


---

## מבנה מלא עם else if ועם else

{% highlight csharp linenos %}string color = "Green";
if (color == "Red")
    Console.WriteLine("Color is red");
else if (color == "Green")
{
    Console.ForegroundColor = ConsoleColor.Green;
    Console.WriteLine("Color is green");
}
else
    Console.WriteLine($"Color is {color}");
{% endhighlight %}

---

### דוגמא פתורה לתנאי עם else if:
כתבו תוכנית הקולטת גיל ומדפיסה :

- "minor" אם הגיל קטן מ-18
- אחרת אם הגיל בין 18 ל-64 (כולל) — "adult"
- אחרת — "senior"

<details><summary>פתרון</summary>

{% highlight csharp linenos %}public static void Main()
{
    Console.Write("Enter age: ");
    int age = int.Parse(Console.ReadLine());

    if (age < 18)
        Console.WriteLine("minor");
    else if (age <= 64)
        Console.WriteLine("adult");
    else
        Console.WriteLine("senior");
}
{% endhighlight %}

</details>

## אופרטורים של השוואה ואופרטורים לוגיים {#id3ops}



| במתמטיקה  | אופרטור | סוג האופרטור       | תיאור                                      | דוגמה בקוד                       |
|------------|---------|--------------------|---------------------------------------------|----------------------------------|
| $$=$$    | `==`    | השוואה             | שווה                                       | `if (x == y) { … }`              |
| $$\neq$$ | `!=`    | השוואה             | לא שווה                                   | `if (x != y) { … }`              |
| $$>$$    | `>`     | השוואה             | גדול מ                                     | `if (x > y) { … }`               |
| $$<$$    | `<`     | השוואה             | קטן מ                                      | `if (x < y) { … }`               |
| $$\ge$$  | `>=`    | השוואה             | גדול או שווה                              | `if (x >= y) { … }`              |
| $$\le$$  | `<=`    | השוואה             | קטן או שווה                               | `if (x <= y) { … }`              |
| $$\land$$| `&&`    | לוגי               | AND (וגם)                                  | `if (a > 0 && b > 0) { … }`       |
| $$\lor$$ | `||`    | לוגי               | OR (או)                                    | `if (a == 0 || b == 0) { … }`     |
| $$\lnot$$| `!`     | לוגי               | NOT (שלילה)                                | `bool ok = !isReady;`            |
{: .table-en}



## ביטויים לוגיים והשוואות

ביטויים לוגיים מאפשרים לנו לקבל החלטות על בסיס השוואה בין ערכים.

דוגמא לביטוי לוגי היא הביטוי `a >= 18`:
באנגלית : Logical Expression

## משתנה בוליאני true / false
משתנה שמכיל את הערך true או false. יכול להכיל תוצאה של ביטוי בוליאני

```csharp
Console.WriteLine(“Enter 2 numbers”);
num1 = int.Parse(Console.ReadLine());
num2 = int.Parse(Console.ReadLine());
found = (num1 == num2);

if (found)
	Console.WriteLine(“The numbers are equal!”);
else
	Console.WriteLine(“The numbers are not equal.”);
```

**דוגמא נוספת:**

```csharp
int age = 18;
// הנה שורה קצת מוזרה ננסה להבין אותה יחד
bool isAdult = age >= 18; // isAdult שיכנס למשתנה true תוצאה הביטוי תהיה
```

דוגמאות לביטויים לוגיים
```csharp
// השוואה פשוטה:
x > 0         // חיובי x אמת אם 

// שילוב עם AND:
(x > 0) && (x % 2 == 0)  
// חיובי ו־זוגי x אמת אם

// ביטוי מורכב:
(a != b) && ((c > d) || (e <= f))
// אמת אם a לא שווה ל־b וגם (c גדול מ־d או e קטן/שווה ל־f)
```


## שארית חלוקה. שימוש במודולו (%)

האופרטור `%` (מודולו) מחזיר את שארית החלוקה בין שני מספרים. שארית החלוקה של 10 ב-3 היא 1. נושא זה מבלבל תלמידים ויש לחזור על ההקניה בנקודות זמן שונות לכל אורך השנה. אין ל-% שום קשר לחישוב אחוזים. ניתן להעזר בו לקביעת זוגיות / אי-זוגיות , לבידוד של ספרות במספר ועוד.

```csharp 
int number = 7;
if (number % 2 == 0)
{
    Console.WriteLine("Mispar zugi (even number)");
}
else
{
    Console.WriteLine("Mispar e-zugi (odd number)");
}
```

אם המשתנה הוא 7, הפלט יהיה:

```
Mispar e-zugi (odd number)
```

עדיף לעבוד באנלית. יש להנחות את התלמידים לעבוד פונטי במקרה שאינם מכירים מילה מסויימת באנגלית (כך נמנע מצבים מיותרים בהם בזמן בחינה פונים אליכם לתרגום מילים לאנגלית). בסביבת [אונליין כגון netfiddle](https://dotnetfiddle.net/) ניתן להדפיס עברית
{: .box-success}

## שימוש באופרטורים לוגיים לכתיבת תנאים מורכבים
כיצד משלבים כמה תנאים בעזרת 'וגם', 'או', ו'לא'

אופרטורים לוגיים מאפשרים לנו לבדוק תנאים מורכבים: 
מקרים בהם צריכים ששני תנאים יתקיימו (וגם) או מצבים בהם יש כמה אפשרויות כל אחת מהן טובה (או)

- `&&` (וגם)
- `||` (או)
- `!` (שלילה, לא)

דוגמה:

{% highlight csharp linenos %}int age = 25;
bool hasLicense = true;

if (age >= 18 && hasLicense) 
{
    Console.WriteLine("You can drive a car");
}
else
{
    Console.WriteLine("You cannot drive a car");
}
{% endhighlight %}

## משתני דגל (Flags)

משתנה דגל הוא משתנה לוגי שנועד לזכור מצב מסוים.

{% highlight csharp linenos %}bool found = false;
int number = 5;

if (number == 5)
{
    found = true;
}

if (found)
{
    Console.WriteLine("Number found");
}
{% endhighlight %}






## סגנונות כתיבת סוגריים בקוד
סגנון C# מקובל (Allman) הופיע עד כה ואנו נכתוב רק בצורה זו

סגנון Java (K&R) כאן פתיחת הסוגריים היא בהמשך להוראה הפותחת את הבלוק
```csharp
bool found = false;
int number = 5;

// java style block brackets
if (number == 5) { 
    found = true;
}

if (found) {
    Console.WriteLine("Number found");
}
```

{: .box-success}
**כתיבה ללא סוגריים:** בדוגמא שלנו ניתן גם להתעלם מסוגריים מפני שבתוך הבלוק מופיעה הוראה בודדת. כתיבה זו מומלצת מרגע שתרגישו בנח איתה. גם כאשר כותבים ללא סוגריים מקובל מאד מעבר שורה

```csharp
bool found = false;
int number = 5;

if (number == 5)
    found = true;

if (found) 
    Console.WriteLine("Number found");
```

{: .box-warning}
**אזהרה:** שימו לב להשתמש תמיד בשני סימני שוויון (`==`) לבדיקת שוויון בתנאים. זו אחת השגיאות הנפוצות ביותר בתנאים, והיא חוסמת קימפול

---

{: .box-success}
ניתן בדוגמא שלנו לותר על התנאי הראשון. ולבצע השמה של תוצאת הביטוי הלוגי

{% highlight csharp linenos %}bool found = false;
int number = 5;

found = number == 5; // true יקבל את הערך found

if (found)
    Console.WriteLine("Number found");
    {% endhighlight %}

## בדיקת פלינדרום. **טבלת מעקב** {#id3palindrome}

כתבו תוכנית ב-C# הקולטת מספר תלת-ספרתי חיובי (`num`) ומדפיצה הודעה אם המספר הוא פלינדרום. פלינדרום הוא מילה, מספר, משפט או כל רצף סמלים אחר, שקריאתו מימין לשמאל ומשמאל לימין היא זהה.

<details markdown="1"><summary>פתרון</summary>

{% highlight csharp linenos %}Console.Write("Enter a 3 digit number: ");
int num = int.Parse(Console.ReadLine()); // הניחו לצורך מעקב שנקלט המספר 363
int units = num % 10; // בידוד הספרה הימנית
int hundreds = num / 100; // בידוד הספרה השמאלית
if (units == hundreds)
{
    Console.WriteLine($"{num} is a palindrome");
}
else
{
    Console.WriteLine($"{num} is not a palindrome");
}
{% endhighlight %}

**טבלת מעקב עבור קלט `363`:**
טבלת מעקב מאפשרת לעקוב אחר ביצוע הקוד על דף נייר. בבחינות מופיעות כמעט תמיד דוגמאות קוד ודרישה לבצע מעקב. בסוף המעקב תתבקשו בנוסף לקבוע מה מטרת הקוד.

| שורה | `num` | `units` | `hundreds` | `units == hundreds` | פלט                    |
| ---- | ---- | ------- | ---------- | ------------------- | ---------------------- |
| 2  |363  | –       | –          | –                   |            |
| 3  |363  | 3       | –          | –                   |     |
| 4  |363  | 3       | 3          | –                   | |
| 5  |363  | 3       | 3          | **true**            | `363 is a palindrome`  |
{: .table-en}


**ניתן לעקוב ולרשום רק מה שמשתנה. דוגמא למעקב עבור קלט `563`:**

| שורה | `num` | `units` | `hundreds` | `units == hundreds` | פלט                    |
| ---- | ---- | ------- | ---------- | ------------------- | ---------------------- |
| 2   |563 |         |            |                     |             |
| 3,4  |    | 3       |  5          |                    |      |
| 5   |    |         |            | **false**            |   |
| 11  |    |         |            |            | `563 is not a palindrome`  |
{: .table-en}


</details>

## השלמות וחזרה
1. **לא הספקנו לדבר על טבלת המעקב**. הטבלה בסוף פתרון הפלינדרום שלעיל.
1. שגיאה נפוצה שראינו: בדוגמא שלהלן המילה Success **תודפס תמיד** מפני שיש בטעות ; בסוף התנאי. זו שגיאה מאד מְתַעְתַּעַת מפני שהקוד מתקמפל וקשה לשים לב לטעות. טעות כזו ניתן לגלות בבדיקת מקרים, או, בתשומת לב ל-warnings של VS, או, אם ניישר את הקוד באמצעות הקיצורים, נוכל לשים לב ששורת ההדפסה אינה מוזחת פנימה וזה אמור להדליק נורה אדומה. 
    ```csharp
    if (num > 5);
        Console.WriteLine("Success");
    ```
1. חשוב להבדיל בין משפט תנאי בודד הכולל `else` שבו בהכרח אחת מהאפשרויות תתקיים, לבין מספר משפטי תנאי בזה אחר זה `if; if; if` בהם יתכן שיותר מאחד התנאים יתקיים, ויתכן שאף אחד לא יתקיים. משפט תנאי הכולל `if, else if, else if` הוא משפט בו לכל היותר אפשרות אחת תתקיים.
1. לא ניתן לרשום כמו בפייתון `if (3 < x < 5)`. חייבים `if (x > 3 && x < 5)`. גם לא ניתן לרשום `if(myResult < 5 || > 8)`.
1. בתנאי מורכב חל סדר קדימות בלוגיקה: גם קודם לאו כמו שכפל קודם לחיבור. לכן לעיתים יש חשיבות רבה לסוגריים כמו בדוגמא שלהלן בה הביטוי הראשון אמת והשני שקר.
    ```csharp
    int a = 5, b = 6, c = 7, d = 8, e = 9, f = 10;
    bool result1 = a == b && c > d || e <= f; // result 1 is true
    bool result2 = a == b && (c > d || e <= f); // result 2 is false
    bool result2b = (a == b) && ((c > d) || (e <= f)); // same as result 2
    ```

## תרגול
[⬅ מעבר לתרגול 3.1 - תרגילים בתנאים פשוטים](/cs/Chapter3Ex3.1)

[⬅ מעבר לתרגול 3.2 - תרגילים בתנאים מורכבים ושארית חלוקה](/cs/Chapter3Ex3.2)

[⬅ מעבר לתרגול מעבדה תחילה - תמר פז - שארית חלוקה](https://cse.net.technion.ac.il/files/2023/09/l3-cs-cond-cs.pdf){:target="_blank"}

[⬅ מעבר לתרגול מתקדם 3.3 - איומים בלוח שחמט](/cs/Chapter3Ex3.3)

[⬅ מעבר לתרגול מתקדם 3.4 - מיונים ואפיונים](/cs/Chapter3Ex3.4)

## סרטונים
[סרטוני פרק 2: ביטויים לוגיים](https://www.youtube.com/playlist?list=PLw4P_RdfuzSjVGWRUCg9qWvDkkSWrANtP){:target="_blank"}

[סרטוני פרק 4: משפטי תנאי](https://www.youtube.com/playlist?list=PLw4P_RdfuzSitIvnpWSgqZLJHot9__eSG){:target="_blank"}

