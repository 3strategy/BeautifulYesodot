---
layout: page
title: "תרגול 3.1 - תנאים וביטויים לוגיים"
subtitle: "תרגול 3.1 תנאים פשוטים"
author: גיא סידס
mathjax: true
lang: he
---
[⬅ מעבר לתרגול 3.2 - תרגילים בתנאים מורכבים ושארית חלוקה](/cs/Chapter3Ex3.2)

[⬅ מעבר לתרגול מעבדה תחילה - תמר פז - שארית חלוקה](https://cse.net.technion.ac.il/files/2023/09/l3-cs-cond-cs.pdf){:target="_blank"}

## תרגיל 3.1.1 בדיקת פלינדרום {#id3.1.1}
התרגיל מופיע בפרק 3
[⬅ חזרה לפרק 3 תנאים](/cs/Chapter3)


---

### תרגיל 3.1.2 בדיקת זוגיות {#id3.1.2}

כתבו תוכנית הקולטת מספר שלם `n` ומדפיצה "even" אם הוא זוגי, אחרת "odd".

<details markdown="1"><summary>פתרון</summary>

{% highlight csharp linenos %}int n = 8;
if (n % 2 == 0)
{
    Console.WriteLine("even");
}
else
{
    Console.WriteLine("odd");
}
{% endhighlight %}

</details>

---

### תרגיל 3.1.3 השוואת שני מספרים {#id3.1.3}

כתבו תוכנית שבודקת שני שלמים `a` ו־`b` ומדפיצה:

* "a > b"
* "a == b"
* אחרת "a < b"

---

### תרגיל 3.1.4 מציאת מקסימום {#id3.1.4}

כתבו תוכנית שבהם `a` ו־`b` שלמים. אתחלו `max = a`, ואם `b > a` קבע `max = b`. לבסוף הדפיסו `max`.

---

### תרגיל 3.1.5 בדיקת חיוביות {#id3.1.5}

כתבו תוכנית הקולטת מספר `x` ומדפיסה:

* "positive" אם `x > 0`
* "zero" אם `x == 0`
* אחרת "negative"


## 3.1.6 כמה ימים בפברואר {#id3.1.6}

לפי היומן היוליאני (על שם יוליוס קיסר) אם שנה מתחלקת ב-4 ללא שארית יהיו בפברואר 29 ימים במקום 28. 
כתבו תכנית הקולטת מספר שנה ומדפיסה כמה ימים יהיו בפברואר, (שימוש בתנאי). ניתן לפתור גם ללא תנאים באמצעות Ceiling. 

<details markdown="1"><summary>פתרון</summary>

```csharp
Console.Write("Enter a number: ");
int year = int.Parse(Console.ReadLine());
if (year % 4 == 0)
    Console.WriteLine("29 days");
else
    Console.WriteLine("28 days");
```

</details>




## 3.1.7 סידור מספרים {#id3.1.7}

יש לקלוט שני מספרים `n1`, `n2`.  
לאחר הקלט יש לבדוק מי מהם גדול יותר, ולדאוג לכך שהגדול יאוחסן במשתנה `n2` והקטן יאוחסן במשתנה `n1`.  

> יש להשתמש **בתנאים (if)** ולא להשתמש בפונקציה `Math.Max`.

לדוגמה:  
- קלט: `n1 = 8`, `n2 = 3`  
- פלט לאחר העיבוד: `n1 = 3`, `n2 = 8`

<details markdown="1"><summary>פתרון</summary>

```csharp

static void Main()
{
    Console.Write("הכנס מספר ראשון: ");
    int n1 = int.Parse(Console.ReadLine());

    Console.Write("הכנס מספר שני: ");
    int n2 = int.Parse(Console.ReadLine());

    if (n1 > n2)
    {
        int tmp = n1; // החלפה
        n1 = n2;
        n2 = tmp;
    }

    Console.WriteLine($"לאחר הסידור: n1={n1}, n2={n2}");
}

```

</details>



[⬅ מעבר לתרגול 3.2 - תרגילים בתנאים מורכבים](/cs/Chapter3Ex3.2)