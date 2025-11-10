---
layout: page
title: "תרגול 4.6 טבלאות מעקב בלולאות"
subtitle: "תרגילי for עם טבלאות מעקב"
tags: [תרגול for, טבלת מעקב]
mathjax: true
lang: he
---

{: .box-note}
**מטרת הדף**: תרגול לולאות `for` ב־C# עם כתיבת **טבלאות מעקב** (trace tables) שמראות כיצד ערכי המשתנים משתנים בכל צעד.

<!-- https://chatgpt.com/c/68ff0f65-b104-8331-beab-a4ba2e9875e3 -->

## מהי טבלת מעקב? {#trace-intro}

טבלת מעקב היא טבלה שמפרקת את ריצת התוכנית לצעדים. בכל שורה נרשום את מצב המשתנים אחרי הצעד, את הפעולה שבוצעה, ואת פלט הביניים (אם יש). בסיום ננסח במילים **מה מטרת הלולאה**.

## שאלה 1

{% highlight csharp linenos %}public static void What()
{
    int x = 7;
    int y = 0;
    
    for (int i = 1; i <= 15; i++)
    {
        if (i % x == 0)
        {
            y++;
        }
    }
    
    Console.WriteLine(y);
}
{% endhighlight %}

1. עקבו אחר הקוד בטבלת מעקב
2. מה הפלט?
3. מה מטרת הקוד?

---

## שאלה 2

{% highlight csharp linenos %}public static void What()
{
    int a = 8;
    int b = 3;
    int c = 0;
    
    for (int i = a; i > 0; i--)
    {
        c = c * 10 + i % b;
    }
    
    Console.WriteLine(c);
}
{% endhighlight %}

1. עקבו אחר הקוד בטבלת מעקב
2. מה הפלט?
3. מה מטרת הקוד?

---

## שאלה 3

{% highlight csharp linenos %}public static void What()
{
    int m = 0;
    int n = 1;
    
    for (int k = 1; k <= 6; k++)
    {
        int temp = m + n;
        m = n;
        n = temp;
    }
    
    Console.WriteLine(n);
}
{% endhighlight %}

1. עקבו אחר הקוד בטבלת מעקב
2. מה הפלט?
3. מה מטרת הקוד?

---

## שאלה 4

{% highlight csharp linenos %}public static void What()
{
    int p = int.Parse(Console.ReadLine());
    int q = int.Parse(Console.ReadLine());
    int r = p;
    
    for (; r >= q; )
    {
        r = r - q;
    }
    
    Console.WriteLine(r);
}
{% endhighlight %}

1. א. עקבו אחר הקוד בטבלת מעקב עבור הקלטים `23` ו-`7`. מה יהיה הפלט?  
   ב. בטבלה נוספת עקבו אחר הקלטים `17` ו-`5`. מה יהיה הפלט?
2. מה מטרת הקוד?

---

## שאלה 5

{% highlight csharp linenos %}public static void What()
{
    int s = int.Parse(Console.ReadLine());
    int t = int.Parse(Console.ReadLine());
    int u = 1;
    
    for (int j = 1; j <= t; j++)
    {
        u = u * s;
    }
    
    Console.WriteLine(u);
}
{% endhighlight %}

1. א. עקבו אחר הקוד בטבלת מעקב עבור הקלטים `2` ו-`5`. מה יהיה הפלט?  
   ב. בטבלה נוספת עקבו אחר הקלטים `3` ו-`4`. מה יהיה הפלט?
2. מה מטרת הקוד?