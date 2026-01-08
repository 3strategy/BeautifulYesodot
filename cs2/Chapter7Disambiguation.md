---
layout: page
title: "פרק 7 - דיסאמביגואציה פונקציות"
subtitle: "קלט/פלט מול מקבלת/מחזירה — מונחים בעברית וברוסית עם דוגמאות C#"
author: גיא סידס
tags: [פונקציות, C#, קלט, פלט, רוסית, פעולות, דיסאמביגואציה, סוגי פונקציות, מושגים, מחזירה]
mathjax: true
lang: he
---

{: .box-note}
На этой странице показана разница между двумя видами функций в C#:
функциями, которые считывают данные и выводят результат, и функциями, которые получают параметры и возвращают значение.
Сравнение сопровождается примерами кода и пояснениями на русском и иврите.

<!-- https://chatgpt.com/c/692fd940-c45c-8328-82a1-613b21c1b8f1 -->
## השוואה בין שני סוגי פונקציות ב-C#

### פונקציות שקולטות ומדפיסות ↔ פונקציות שמקבלות ומחזירות

{: .table-heeh}

| עברית (מונחי הוראה) | רוסית – תרגום מדויק | רוסית – מילים נרדפות / שימוש נפוץ | הסבר קצר |
|----------------------|----------------------|-------------------------------------|-----------|
| קולטת | считывает | вводит данные / принимает ввод | פונקציה שקולטת מידע מהמשתמש (Console.ReadLine). |
| מדפיסה | выводит | печатает / показывает на экран | פונקציה שמציגה מידע למשתמש (Console.WriteLine). |
| ללא פרמטרים | без параметров | пустая сигнатура / не принимает аргументы | לא מקבלת שום מידע מבחוץ. |
| מקבלת (פרמטרים) | получает | принимает / получает аргументы | מקבלת מידע בשורת ההגדרה של הפונקציה. |
| מחזירה (ערך) | возвращает | выдаёт / отдаёт результат | מחזירה ערך בעזרת return. |
| מדברת עם המשתמש | взаимодействует с пользователем | работает с вводом/выводом | מבצעת קלט/פלט בעצמה. |
| לא מדברת עם המשתמש | не взаимодействует с пользователем | не считывает и не выводит | משתמשת רק בנתונים שנמסרו לה מבחוץ. |
{: .table-rl}

---

### טבלה 1 — פונקציות קולטות ומדפיסות (ללא פרמטרים)

<table>
  <tr>
    <th style="direction:rtl; text-align:right;">סוג הפונקציה</th>
    <th style="direction:rtl; text-align:right;">הסבר בעברית</th>
    <th>C# Code</th>
    <th>הסבר ברוסית</th>
  </tr>

  <tr>
    <td style="direction:rtl; text-align:right;">פונקציה שקולטת מספר ומדפיסה אותו</td>
    <td style="direction:rtl; text-align:right;">
      הפונקציה לא מקבלת פרמטרים. היא בעצמה קולטת מספר מהמשתמש ואז מדפיסה אותו.
    </td>
    <td>
{% highlight csharp %}
public static void ReadAndPrintNumber()
{
    Console.Write("Enter a number: ");
    int num = int.Parse(Console.ReadLine());
    Console.WriteLine($"You entered: {num}");
}
{% endhighlight %}
    </td>
    <td>Функция считывает число с клавиатуры и выводит его на экран.</td>
  </tr>

  <tr>
    <td style="direction:rtl; text-align:right;">פונקציה שקולטת שם ומברכת</td>
    <td style="direction:rtl; text-align:right;">
      שוב — בלי פרמטרים. הפונקציה שואלת מה השם ומדפיסה ברכה.
    </td>
    <td>
{% highlight csharp %}
public static void ReadNameAndGreet()
{
    Console.Write("Enter your name: ");
    string name = Console.ReadLine();
    Console.WriteLine($"Hello, {name}!");
}
{% endhighlight %}
    </td>
    <td>Функция считывает имя пользователя и показывает приветствие.</td>
  </tr>

  <tr>
    <td style="direction:rtl; text-align:right;">פונקציה שקולטת שני מספרים ומדפיסה את הסכום</td>
    <td style="direction:rtl; text-align:right;">
      הפונקציה עושה גם קלט וגם פלט, בלי לקבל פרמטרים.
    </td>
    <td>
{% highlight csharp %}
public static void ReadTwoNumbersAndPrintSum()
{
    Console.Write("Enter first number: ");
    int a = int.Parse(Console.ReadLine());

    Console.Write("Enter second number: ");
    int b = int.Parse(Console.ReadLine());

    int sum = a + b;
    Console.WriteLine($"Sum = {sum}");
}
{% endhighlight %}
    </td>
    <td>Функция считывает два числа и выводит их сумму.</td>
  </tr>

</table>

---

### טבלה 2 — פונקציות שמקבלות ומחזירות (עובדות עם נתונים)

<table>
  <tr>
    <th style="direction:rtl; text-align:right;">סוג הפונקציה</th>
    <th style="direction:rtl; text-align:right;">הסבר בעברית</th>
    <th>C# Code</th>
    <th>הסבר ברוסית</th>
  </tr>

  <tr>
    <td style="direction:rtl; text-align:right;">פונקציה שמקבלת שני מספרים ומחזירה את הסכום</td>
    <td style="direction:rtl; text-align:right;">
      הפונקציה מקבלת שני פרמטרים ומחזירה תוצאה. אין בה Console.ReadLine או Console.WriteLine.
    </td>
    <td>
{% highlight csharp %}
public static int Add(int a, int b)
{
    int sum = a + b;
    return sum;
}
// דוגמת שימוש:
// int s = Add(3, 5);
{% endhighlight %}
    </td>
    <td>Функция получает два параметра a и b и возвращает их сумму.</td>
  </tr>

  <tr>
    <td style="direction:rtl; text-align:right;">פונקציה שבודקת אם מספר חיובי</td>
    <td style="direction:rtl; text-align:right;">
      מקבלת מספר אחד ומחזירה true או false.
    </td>
    <td>
{% highlight csharp %}
public static bool IsPositive(int num)
{
    return num > 0;
}
// דוגמת שימוש:
// bool ok = IsPositive(7);
{% endhighlight %}
    </td>
    <td>Функция получает число и возвращает логическое значение: положительное ли оно.</td>
  </tr>

  <tr>
    <td style="direction:rtl; text-align:right;">פונקציה שמחזירה ממוצע של שני מספרים</td>
    <td style="direction:rtl; text-align:right;">
      מקבלת שני מספרים ממשיים (double) ומחזירה את הממוצע שלהם.
    </td>
    <td>
{% highlight csharp %}
public static double Average(double x, double y)
{
    double avg = (x + y) / 2.0;
    return avg;
}
// דוגמת שימוש:
// double a = Average(4.0, 10.0);
{% endhighlight %}
    </td>
    <td>Функция принимает два числа типа double и возвращает их среднее значение.</td>
  </tr>

</table>
