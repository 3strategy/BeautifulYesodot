---
layout: page 
title: "תרגול 6.1 - לולאות for מקוננות"
subtitle: "תרגול בלולאות for: Patterns"
tags: קינון, כוכביות, patterns
mathjax: true
lang: he
---




# תרגילים לפרק 6 — חלק 1

## תרגיל 6.1.1

**Pattern 4**

**Asterix4**

```
* * * * *
* * * *
* * *
* *
*
```

<details markdown="1"><summary>פתרון</summary>

{% highlight csharp linenos %}public static void Asterix4()
{
    int rows = 5;
    for (int i = rows; i > 0; i--)
    {
        for (int j = 0; j < i; j++)
            Console.Write("* ");

        Console.WriteLine();
    }
}
{% endhighlight %}

</details>

**Numbers4**

```
1 2 3 4 5
1 2 3 4
1 2 3
1 2
1
```

<details markdown="1"><summary>פתרון</summary>

{% highlight csharp linenos %}public static void Numbers4()
{
    int rows = 5;
    for (int i = rows; i > 0; i--)
    {
        for (int j = 1; j <= i; j++)
            Console.Write($"{j} ");

        Console.WriteLine();
    }
}
{% endhighlight %}

</details>

**Chars4**

```
A B C D E
A B C D
A B C
A B
A
```

<details markdown="1"><summary>פתרון</summary>

{% highlight csharp linenos %}public static void Chars4()
{
    int rows = 5;
    for (int i = rows; i > 0; i--)
    {
        for (char j = 'A'; j < 'A' + i; j++)
            Console.Write($"{j} ");

        Console.WriteLine();
    }
}
{% endhighlight %}

</details>

## תרגיל 6.1.2

**Pattern 5**

**Asterix5**

```
* * * * *
  * * * *
    * * *
      * *
        *
```

<details markdown="1"><summary>פתרון</summary>

{% highlight csharp linenos %}public static void Asterix5()
{
    int rows = 5;
    for (int i = 0; i < rows; i++)
    {
        for (int s = 0; s < i; s++) 
            Console.Write("  ");
        for (int j = 0; j < rows - i; j++) 
            Console.Write("* ");
        Console.WriteLine();
    }
}
{% endhighlight %}

</details>

**Numbers5**

```
1 2 3 4 5
  1 2 3 4
    1 2 3
      1 2
        1
```

<details markdown="1"><summary>פתרון</summary>

{% highlight csharp linenos %}public static void Numbers5()
{
    int rows = 5;
    for (int i = 0; i < rows; i++)
    {
        for (int s = 0; s < i; s++) 
            Console.Write("  ");
        for (int j = 1; j <= rows - i; j++) 
            Console.Write($"{j} ");
        Console.WriteLine();
    }
}
{% endhighlight %}

</details>

**Chars5**

```
A B C D E
  A B C D
    A B C
      A B
        A
```

<details markdown="1"><summary>פתרון</summary>

{% highlight csharp linenos %}public static void Chars5()
{
    int rows = 5;
    for (int i = 0; i < rows; i++)
    {
        for (int s = 0; s < i; s++) 
            Console.Write("  ");
        for (char c = 'A'; c < 'A' + rows - i; c++) 
            Console.Write($"{c} ");
        Console.WriteLine();
    }
}
{% endhighlight %}

</details>
