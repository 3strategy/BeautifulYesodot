---
layout: page 
title: "תרגול 4.2 - לולאות for: מונה, צובר, מינימום ומקסימום"
subtitle: "תרגול בלולאות for"
tags: "טבלת מעקב"
mathjax: true
lang: he
---

## תרגיל 4.2.1

ברישום לאתר בית הספר יש להזין סיסמה אשר מורכבת מ-N תווים, לפחות מחציתם אותיות באנגלית.

כתבו תכנית הקולטת את אורך הסיסמה N, ואחר כך את הסיסמא עצמה, תו אחרי תו.

התוכנית תחשב ותדפיס כמה מהתווים הם אותיות, והאם הסיסמא היא חוקית או לא.

**דוגמת קלט:**

```
6
D
6
v
7
U
2
```

**דוגמת פלט:**

```
There are 3 letters in the password
The password is valid
```

## תרגיל 4.2.2

ביום החיסונים השנתי באזור השרון, נקלט עבור כל כלב האות הראשונה של שמו, גילו (בשנים), והגזע שלו לפי:

* כלב גזעי עם תעודות מסומן באות R
* כלב גזעי ללא תעודות מסומן באות L
* כלב מעורב מסומן באות M

כתבו תכנית הקולטת נתונים של 50 כלבים. עבור כל כלב יש להדפיס את נתוניו ואת אות הסימון שלו.

בסיכום היום יודפס דוח ובו מספר הכלבים שסומנו באות R, מספר הכלבים שסומנו באות L ומספר הכלבים שסומנו באות M.

בנוסף תדפיס התוכנית הודעה איזה מהסוגים נפוץ יותר באזור.

## תרגיל 4.2.3

כתבו תוכנית הקולטת 100 מספרים בעלי ארבע ספרות. התוכנית תדפיס "אמת" אם סכום הספרות החיצוניות (אלפים ואחדות) שווה לסכום הספרות הפנימיות (מאות ועשרות), ו-"שקר" אם לא.

## תרגיל 4.2.4

ארגון לשמירה על איכות הסביבה קבע רמה מותרת של זיהום אוויר בעיר מסוימת. רמת הזיהום נמדדת במספרים שלמים חיוביים. בכל יום מתבצעות שתי מדידות, ומוצאים את המדידה הגבוהה ביותר מבין השתיים.

כתבו תוכנית שתקלוט את רמת הזיהום המותרת ואת שתי המדידות שנעשו בעיר בכל יום במשך 30 יום.

פלט התוכנית:

* אם שתי המדידות שוות, לוקחים אחת מהן.
* כל יום מודיע הארגון אם רמת הזיהום הגבוהה ביותר היא מעל הרמה המותרת או לא.
* יש להדפיס את מספרו הסידורי של היום בו נמצאה רמת הזיהום הגבוהה ביותר ומספרו הסידורי של היום בו נמצאה רמת הזיהום הנמוכה ביותר.

## תרגיל 4.2.5

בתחרות זריקת כידון השתתפו שבעה אנשים. כל אחד זרק את הכידון למרחק הרב ביותר שהצליח.

כתבו תוכנית בה הקלט הוא מרחק הזריקה של כל אחד מהמשתתפים.

הפלט:

* מספרו של המנצח (ע"פ סדר הזריקה) והמרחק אותו זרק.
* מספרו של המפסיד (שהגיע במקום האחרון) והמרחק אותו זרק.
* ממוצע הזריקות של כל שבעת המשתתפים.

## תרגיל 4.2.6

בשכבת כיתות י' נערך מבצע איסוף של בקבוקי פלסטיק וסוללות לצורכי מחזור.

בשכבה 68 תלמידים הלומדים בשתי כיתות. עבור כל פריט שאסף התלמיד, קיבלה כיתתו נקודות:

* בקבוק פלסטיק: 3 נקודות
* סוללה: 7 נקודות

כתבו תוכנית שתקלוט עבור כל תלמיד את מספר הכיתה שלו, מספר בקבוקי הפלסטיק ומספר הסוללות שאסף (0 אם לא אסף).

הפלט:

* סיכום נקודות של כל כיתה.
* מספר הכיתה המנצחת, או "TEKO" אם התוצאה תיקו.

## תרגיל 4.2.7

עקבו בעזרת טבלת מעקב אחר ביצוע קטע התוכנית הבא עבור הקלט (משמאל לימין):

```
13, 10, 20, 18, 25, 5
```

{% highlight csharp linenos %}int s = 0, n, a;
Console.WriteLine("Enter a whole positive number");
n = int.Parse(Console.ReadLine());

for (int i = 0; i < n; i++)
{
    Console.WriteLine("Enter a whole positive number");
    a = int.Parse(Console.ReadLine());
    if (a > 10)
        if (a >= 20)
            Console.WriteLine("boom");
        else
            s = s + a;
}

Console.WriteLine(s); // (**) {% endhighlight %}

1. בטבלה יש לכלול עמודה עבור כל משתנה, עמודה עבור כל תנאי ועמודה עבור הפלט.
2. תנו דוגמא לערכי קלט עבורם יתקבל הפלט 0 בהוראה המסומנת (\*\*).

## 4.2.8(13) בדיקת ריבוע שלם — טבלת מעקב ופתרון מתוקן

{: .subq}
א. הקוד הבא אינו מוצלח לקביעת ריבוע שלם:


{% highlight csharp linenos %}int s = 0, num;
for (int i = 1; i <= 5; i++)
{
  num = int.Parse(Console.ReadLine());

  if (num == Math.Pow(i, 2))
  {
      s += num;
      Console.WriteLine(num);
  }
}
Console.WriteLine(s);
{% endhighlight %}


הסבירו מדוע הקוד אינו מוצא את כל הריבועים השלמים.  
השלימו טבלת מעקב עבור הקלטים: **3, 4, 5, 16, 6**  
(העמודות: מספר קלט, i, Math.Pow(i,2), האם num==Math.Pow(i,2), s אחרי הסיבוב)


<details markdown="1">
<summary>פתרון</summary>

#### טבלת מעקב מורחבת - עבור קלטים: 3, 4, 5, 16, 6

זה מה שתלמידים ירשמו בשלב זה. 

| שורה בקוד | i | num | if (num == Math.Pow(i,2)) | s | פלט | פלט סופי |
|-----------|---|-----|---------------------------|---|------|----------|
| 1         |   |     |                           | 0 |      |          |
| 2-4       | 1 | 3   |                           |   |      |          |
| 6         |  |    | false                        |   |      |          |
| 2-4       | 2 | 4   |                           |   |      |          |
| 6         |   |     | true                        |  |     |          |
| 8,9         |   |     |                         | 4 | 4    |          |
| 2-4       | 3 | 5   |                           |   |      |          |
| 6         |  |    | false                        |   |      |          |
| 2-4       | 4 | 16   |                           |   |      |          |
| 6         |   |     | true                        |  |     |          |
| 8,9         |   |     |                         | 20 | 16    |          |
| 2-4       | 5 | 6    |                           |   |      |          |
| 6         |   |     | false                        | |     |          |
| 12      |   |     |                           |   |      | 20        |
{: .table-en}

בבגרות אין מספור שורות והם ילמדו להתבטא גם בלי זה. חשוב ללמוד לשלב שורות, אחרת הטבלה ארוכה מדי.
{: .box-note}


#### טבלת מעקב מקוצרת
גרסה מקוצרת עוד יותר (כמו שמופיע אצל הילה קדמן)

| קלט num | i | Math.Pow(i,2) | if num == Math.Pow(i,2) | s (אחרי) |
|----------|---|---------------|-------------------------|-----------|
| 3        | 1 | 1             | false                      | 0         |
| 4        | 2 | 4             | true                      | 4         |
| 5        | 3 | 9             | false                      | 4         |
| 16       | 4 | 16            | true                      | 20        |
| 6        | 5 | 25            | false                      | 20        |
| פלט סופי 20|
{: .table-en}

**למה הקוד לא יכול למצוא ריבוע שלם?**  
הקוד בודק רק אם הקלט שווה לאחד **בלבד** מבין הריבועים $$1², 2², 3², 4², 5²$$ (רק עבור i=1..5), ולא אם כל קלט הוא ריבוע שלם כלשהו.  
למשל, אם נכניס את המספר 9 בקלט הראשון (כאשר i=1), זה לא יעבור את הבדיקה, למרות ש-9 הוא ריבוע שלם (כי Math.Pow(1,2) = 1).

</details>

{: .subq}
ב. כתבו קוד המגריל 10 מספרים בין 1 ל-20 ומדפיס עבור כל אחד אם הוא ריבוע שלם.   (דוגמא: 16 הוא ריבוע שלם, מפני שהמספר 4 (השורש הריבועי שלו) הוא שלם). ניתן להתבסס על הסעיף הקודם.

{: .box-warning}
**אזהרה:** שימו לב שכל פעם שתיצרו מופע (אינסטנס) חדש של `()new Random` באמצעות הפקודה Random , ייתtrue שתקבלו תוצאות דומות אם תיצרו מופעים חדשים במהירות רבה מאוד (לדוגמה בלולאה). מומלץ ליצור מופע אחד ולהשתמש בו לאורך כל התוכנית.


[⬅ עבור לתרגול 4.3 לולאות for: מינימום מקסימום ספירה צבירה ושארית חלוקה](/cs/Chapter4Ex4.3)

[⬅ חזור לתרגול 4.1 - לולאות for: שארית חלוקה](/cs/Chapter4Ex4.1)

