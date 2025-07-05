---
layout: page
title: "BAD פרק 6 - לולאות מקוננות"
subtitle: "ביצוע חוזר בתוך ביצוע חוזר"
author: גיא סידס
lang: he
---

Below is a detailed layout for your markdown documents (in Hebrew) for Chapter 6 (Nested Loops):

### Chapter6.md

# פרק 6: לולאות מקוננות (Nested Loops)

{: .box-note} **קינון:** הוא תהליך שבו לולאה אחת (הלולאה הפנימית) נמצאת בתוך לולאה אחרת (הלולאה החיצונית). הלולאה הפנימית מתבצעת במלואה בכל איטרציה של הלולאה החיצונית. {: .box-note}

## דוגמה בסיסית 1: לוח הכפל 10x10

```csharp
{% highlight csharp linenos %}for (int i = 0; i <= 10; i++)
{
    for (int j = 0; j <= 10; j++)
    {
        Console.Write($"{i * j}\t");
    }
    Console.WriteLine();
}
{% endhighlight %}
```

## דוגמה בסיסית 2: לוח חיבור 5x5

```csharp
{% highlight csharp linenos %}for (int i = 0; i <= 5; i++)
{
    for (int j = 0; j <= 5; j++)
    {
        Console.Write($"{i + j}\t");
    }
    Console.WriteLine();
}
{% endhighlight %}
```

## דוגמאות לפטרנים

### פטרן 1: Asterix1

```
*
* *
* * *
* * * *
* * * * *
```

```csharp
{% highlight csharp linenos %}public static void Asterix1()
{
    for (int i = 0; i < 5; i++)
    {
        for (int j = 0; j <= i; j++)
            Console.Write("* ");
        Console.WriteLine();
    }
}
{% endhighlight %}
```

### פטרן 2: Numbers1

```
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
```

```csharp
{% highlight csharp linenos %}public static void Numbers1()
{
    for (int i = 0; i < 5; i++)
    {
        for (int j = 0; j <= i; j++)
            Console.Write($"{j + 1} ");
        Console.WriteLine();
    }
}
{% endhighlight %}
```

### פטרן 3: Chars1

```
A
A B
A B C
A B C D
A B C D E
```

```csharp
{% highlight csharp linenos %}public static void Chars1()
{
    for (int i = 0; i < 5; i++)
    {
        for (char j = 'A'; j <= 'A' + i; j++)
            Console.Write($"{j} ");
        Console.WriteLine();
    }
}
{% endhighlight %}
```

(הוסף דוגמאות נוספות בדומה)

---

### Chapter6Ex1.md

# תרגול 6.1 לולאות מקוננות: פטרנים בסיסיים

(הוסף כאן פטרנים בסיסיים נוספים, כולל פתרונות לכ-30% מהשאלות)

---

### Chapter6Ex2.md

# תרגול 6.2 לולאות מקוננות: פטרנים מתקדמים

(הוסף כאן פטרנים מתקדמים נוספים, פתרונות לפחות שאלות)

---

### קרדיט:

התרגילים וה-patterns מבוססים על: [GeeksforGeeks - Pattern Programs in C](https://www.geeksforgeeks.org/c/pattern-programs-in-c/)
