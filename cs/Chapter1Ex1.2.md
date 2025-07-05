---
layout: page 
title: "תרגול 1.2 על משתנים, קלט/פלט ופעולות חשבון בסיסיות" 
subtitle: "הפתרונות מוסתרים – נסו לפתור בעצמכם לפני הצצה."
lang: he
---
<!-- https://chatgpt.com/c/68009c2e-f948-800e-bec6-8222041d0f33 -->


### תרגיל 1.2.1: חיבור שני מספרים

כתבו תכנית שקוראת שני מספרים מהמשתמש ומדפיסה את סכומם.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
Console.Write("Enter first number: ");
int a = int.Parse(Console.ReadLine());

Console.Write("Enter second number: ");
int b = int.Parse(Console.ReadLine());

int sum = a + b;

Console.WriteLine("Sum is: " + sum);
{% endhighlight %}

</details>

---

### תרגיל 1.2.2: ממוצע של שלושה ציונים

כתבו תכנית שקוראת שלושה ציונים ומחשבת את ממוצעם (עם נקודה עשרונית).

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
Console.Write("Enter grade 1: ");
double g1 = double.Parse(Console.ReadLine());

Console.Write("Enter grade 2: ");
double g2 = double.Parse(Console.ReadLine());

Console.Write("Enter grade 3: ");
double g3 = double.Parse(Console.ReadLine());

double average = (g1 + g2 + g3) / 3;

Console.WriteLine("Average: " + average); 
{% endhighlight %}

</details>

---

### תרגיל 1.2.3: שארית החלוקה

כתבו תכנית שקוראת מספר ומדפיסה את השארית שלו בחלוקה ל־3.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
Console.Write("Enter a number: ");
int num = int.Parse(Console.ReadLine());

int remainder = num % 3;

Console.WriteLine("Remainder when divided by 3: " + remainder);
{% endhighlight %}

</details>

---

### תרגיל 1.2.4: אחוז מתוך מספר

כתבו תכנית שקוראת מספר ואחוז (למשל 20) ומדפיסה כמה זה מתוך המספר.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
Console.Write("Enter number: ");
double num = double.Parse(Console.ReadLine());

Console.Write("Enter percentage: ");
double percent = double.Parse(Console.ReadLine());

double result = num * percent / 100;

Console.WriteLine("Result: " + result);
{% endhighlight %}

</details>

---

### תרגיל 1.2.5: שטח מלבן

כתבו תכנית שקוראת את האורך והרוחב של מלבן ומדפיסה את שטחו.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
Console.Write("Enter length: ");
double length = double.Parse(Console.ReadLine());

Console.Write("Enter width: ");
double width = double.Parse(Console.ReadLine());

double area = length * width;

Console.WriteLine("Area of rectangle: " + area);
{% endhighlight %}

</details>

---



### תרגיל 1.2.6: כפל וחיבור

כתבו תכנית שקוראת שני מספרים ומדפיסה גם את המכפלה וגם את הסכום שלהם.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
Console.Write("Enter number 1: ");
int x = int.Parse(Console.ReadLine());

Console.Write("Enter number 2: ");
int y = int.Parse(Console.ReadLine());

Console.WriteLine("Sum: " + (x + y));
Console.WriteLine("Product: " + (x * y));
{% endhighlight %}

</details>

---

### תרגיל 1.2.7: סכום ספרות של מספר בן שתי ספרות

כתבו תכנית שקוראת מספר בן שתי ספרות ומדפיסה את סכום הספרות.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
Console.Write("Enter two-digit number: ");
int num = int.Parse(Console.ReadLine());

int tens = num / 10;
int ones = num % 10;

int sum = tens + ones;

Console.WriteLine("Sum of digits: " + sum);
{% endhighlight %}

</details>

---

### תרגיל 1.2.8: המרה משקלים לדולרים

כתבו תכנית שקוראת סכום בשקלים ואת שער הדולר, ומדפיסה את הסכום בדולרים.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
Console.Write("Enter amount in shekels: ");
double ils = double.Parse(Console.ReadLine());

Console.Write("Enter exchange rate: ");
double rate = double.Parse(Console.ReadLine());

double usd = ils / rate;

Console.WriteLine("Amount in dollars: " + usd);
{% endhighlight %}

</details>

---

### תרגיל 1.2.9: שם וגיל

כתבו תכנית שקוראת שם וגיל ומדפיסה משפט כמו:  
`Sara is 17 y.o.`

<details markdown="1"><summary>פתרון</summary>


{% highlight csharp linenos %}
Console.Write("Enter your name: ");
string name = Console.ReadLine();

Console.Write("Enter your age: ");
int age = int.Parse(Console.ReadLine());

Console.WriteLine(name + " is " + age + " y.o.");
{% endhighlight %}

</details>

## תרגיל 1.2.10 – חילוף בין ספלים

<a id="swapValuesMeaningful"></a>

**מומלץ לחכות עם שאלה זו לשיעור 2.** גרסה חלופית מופיעה [כאן](/cs/Chapter1b#swapValues)

בבית המלוכה האנגלי שותים שתייה חמה מדי יום בשעה 17:00, תה בספלים המיועדים לתה בלבד, וקפה בספלים המיועדים לקפה בלבד.  
אחד המשרתים התבלבל ומזג בטעות תה בספל של קפה, וקפה בספל של תה.  
מיצאו אלגוריתם שיעזור למשרת להחליף בין תכולת הספלים. לאחר מכן כתבו קוד מתאים.



<details markdown="1">
<summary>פתרון אלגוריתמי</summary>

**פתרון מילולי:**

1. קח כוס ריקה.  
2. העבר את התה הנמצא בספל הקפה אל הכוס הריקה.  
3. העבר את הקפה הנמצא בספל התה אל ספל הקפה.  
4. העבר את התה הנמצא בכוס אל ספל התה.  
</details>

<details markdown="1">
<summary>פתרון</summary>
{% highlight csharp linenos %}string cupTea = "coffee";
string cupCoffee = "tea";
string emptyCup;

// שלב 1: כוס ריקה
emptyCup = cupCoffee;

// שלב 2: מזוג את הקפה מהתה לספל הקפה
cupCoffee = cupTea;

// שלב 3: מזוג את התה מהכוס הריקה לספל התה
cupTea = emptyCup;

Console.WriteLine("Cup of tea contains: " + cupTea);
Console.WriteLine("Cup of coffee contains: " + cupCoffee);
{% endhighlight %}

</details>


### מוכן.ה לאתגר?

אם סיימת לפתור 50% מתרגילים אלו בהצלחה, תוכל לעבור לנושא הבא.

[⬅ מעבר לתרגול 1.3 - חישובים והמרות מתקדמות](/cs/Chapter1Ex1.3)

[⬅ מעבר להסבר על הטיפוס char תו](/cs/Chapter1Char)


