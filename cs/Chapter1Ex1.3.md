---
layout: page 
title: "תרגול 1.3 – תרגול מתקדם: חישובים, המרות וחסכונות" 
subtitle: "בדף זה נתמקד בבעיות יומיומיות הכוללות חישובים מורכבים מעט יותר. כל התרגילים מבוססים על קלט/פלט, משתנים ופעולות חשבון בלבד."
lang: he
---
<!-- https://chatgpt.com/c/68009c2e-f948-800e-bec6-8222041d0f33 -->


### תרגיל 1.3.1: המר מ־ק"ג לגרם

כתבו תכנית שקוראת משקל בק"ג ומחשבת את המשקל בגרמים (1 ק"ג = 1000 גרם).

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
Console.Write("Enter weight in kilograms: ");
double kg = double.Parse(Console.ReadLine());

double grams = kg * 1000;

Console.WriteLine("Weight in grams: " + grams);
{% endhighlight %}

</details>

---

### תרגיל 1.3.2: המר מק"מ למטרים וסנטימטרים

כתבו תכנית שקוראת מרחק בק"מ ומדפיסה אותו גם במטרים וגם בסנטימטרים.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
Console.Write("Enter distance in kilometers: ");
double km = double.Parse(Console.ReadLine());

double meters = km * 1000;
double cm = meters * 100;

Console.WriteLine("Meters: " + meters);
Console.WriteLine("Centimeters: " + cm);
{% endhighlight %}

</details>

---

### תרגיל 1.3.3: חישוב זמן כולל בדקות

כתבו תכנית שקוראת שעות ודקות (למשל: 2 שעות ו־15 דקות) ומחשבת את סך הזמן בדקות.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
Console.Write("Enter hours: ");
int hours = int.Parse(Console.ReadLine());

Console.Write("Enter minutes: ");
int minutes = int.Parse(Console.ReadLine());

int totalMinutes = hours * 60 + minutes;

Console.WriteLine("Total minutes: " + totalMinutes);
{% endhighlight %}

</details>

---

### תרגיל 1.3.4: ממוצע מהירות

כתבו תכנית שקוראת מרחק בק"מ וזמן בשעות, ומדפיסה את ממוצע המהירות בקמ"ש.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
Console.Write("Enter distance in kilometers: ");
double distance = double.Parse(Console.ReadLine());

Console.Write("Enter time in hours: ");
double time = double.Parse(Console.ReadLine());

double speed = distance / time;

Console.WriteLine("Average speed: " + speed + " km/h");
{% endhighlight %}

</details>

---

### תרגיל 1.3.5: ממוצע ציון עם שקלול

כתבו תכנית שמחשבת ממוצע של שני ציונים, כאשר ציון אחד שווה פי 3 מהשני.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
Console.Write("Enter first grade: ");
double g1 = double.Parse(Console.ReadLine());

Console.Write("Enter second grade (worth 3 times more): ");
double g2 = double.Parse(Console.ReadLine());

double avg = (g1 + g2 * 3) / 4;

Console.WriteLine("Weighted average: " + avg);
{% endhighlight %}

</details>

---

### תרגיל 1.3.6: חיסכון חודשי

כתבו תכנית שקוראת סכום חיסכון חודשי ומספר חודשים, ומדפיסה את הסכום הכולל שנצבר.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
Console.Write("Enter monthly saving: ");
double saving = double.Parse(Console.ReadLine());

Console.Write("Enter number of months: ");
int months = int.Parse(Console.ReadLine());

double total = saving * months;

Console.WriteLine("Total saved: " + total);
{% endhighlight %}

</details>

---

### תרגיל 1.3.7: המרת דקות לשעות ודקות

כתבו תכנית שקוראת מספר בדקות (למשל 135) ומדפיסה כמה שעות ודקות זה.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
Console.Write("Enter total minutes: ");
int total = int.Parse(Console.ReadLine());

int hours = total / 60;
int minutes = total % 60;

Console.WriteLine("Hours: " + hours);
Console.WriteLine("Minutes: " + minutes);
{% endhighlight %}

</details>

---

### תרגיל 1.3.8: חישוב עלות לאחר הנחה

כתבו תכנית שקוראת מחיר מקורי ואחוז הנחה, ומדפיסה את המחיר לאחר הנחה.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
Console.Write("Enter original price: ");
double price = double.Parse(Console.ReadLine());

Console.Write("Enter discount percent: ");
double discount = double.Parse(Console.ReadLine());

double finalPrice = price * (100 - discount) / 100;

Console.WriteLine("Price after discount: " + finalPrice);
{% endhighlight %}

</details>

---

### תרגיל 1.3.9: הספק יומי

כתבו תכנית שקוראת מספר עמודים בספר ומספר ימים, ומחשבת כמה עמודים יש לקרוא כל יום.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
Console.Write("Enter total pages: ");
int pages = int.Parse(Console.ReadLine());

Console.Write("Enter number of days: ");
int days = int.Parse(Console.ReadLine());

double perDay = (double)pages / days;

Console.WriteLine("Pages per day: " + perDay);
{% endhighlight %}

</details>

---

### תרגיל 1.3.10: שקלול תרגול ועבודה

תרגיל בשפת תכנות שווה 30% מהציון, ועבודה שווה 70%.  
כתבו תכנית שקוראת את שני הציונים ומחשבת את הציון הסופי.

<details markdown="1"><summary>פתרון</summary>

{% highlight csharp linenos %}
Console.Write("Enter exercise grade: ");
double ex = double.Parse(Console.ReadLine());

Console.Write("Enter project grade: ");
double pr = double.Parse(Console.ReadLine());

double final = ex * 0.3 + pr * 0.7;

Console.WriteLine("Final grade: " + final);
{% endhighlight %}


[⬅ מעבר להסבר על הטיפוס char תו](/cs/Chapter1Char)
[⬅ מעבר לתרגול 1.4 -  שארית חלוקה](/cs/Chapter1Ex1.4)

</details>
