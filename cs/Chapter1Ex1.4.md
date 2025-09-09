---
layout: page 
title: "תרגול 1.4 – שארית חלוקה" 
subtitle: "בתרגול זה נתמקד בפעולות חלוקה ושארית"
tags: [interpolation, שרשור מחרוזות, מרחק אותיות במעגל]
lang: he
---

<!-- https://chatgpt.com/c/68009c2e-f948-800e-bec6-8222041d0f33 -->

## תרגילי שארית חלוקה אלו פתירים גם לפני שלומדים הוראות תנאי if

{: .box-note}
התרגילים כאן משמשים גם לתרגול הבנת הנקרא. הנושא שארית חלוקה קשה לתלמידים ומומלץ לחזור ולתרגל אותו שוב ושוב בשלבי לימוד שונים - (תנאים, לולאות)

### תרגיל 1.4.1 {#id1.4.1}

כתבו תכנית שתקבל שני מספרים שלמים n1, n2  
והדפס את תוצאת החלוקה n1 / n2, ואת השארית n1 % n2

{: .box-success}
**שרשור מחרוזות:** בפתרון המוצע נעשה שימוש ב-$ כתחביר מומלץ ונח לשירשור מחרוזות (string interpolation). תחביר דומה משמש גם בפייתון כאשר משתמשים בתחילית 'f לפני המחרוזת. תחביר זה לא קיים ב-

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
int n1 = 17; // example value
int n2 = 4;  // example value

int quotient = n1 / n2; // calculate integer division
int remainder = n1 % n2; // calculate remainder

Console.WriteLine($"Quotient: {quotient}, Remainder: {remainder}");
{% endhighlight %}


</details>

---

### תרגיל 1.4.2 {#id1.4.2}

יוסי קיבל דמי כיס שבועיים בסכום כלשהו (אין צורך בקלט).  
עליו לחסוך חצי מהסכום, ואת השאר להוציא.  
כתבו תכנית שתחשב ותחזיר את הסכום שייחסך ואת הסכום שיוציא בכל שבוע.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
int total = 120; // example amount

int save = total / 2; // save half
int spend = total - save; // the rest is for spending

Console.WriteLine($"Saved: {save}, Spent: {spend}");
{% endhighlight %}

{: .box-success}
**שרשור מחרוזות:** בפתרון זה נעשה שימוש ב-$ כתחביר מומלץ ונח לשירשור מחרוזות (string interpolation). תחביר דומה משמש גם בפייתון כאשר משתמשים בתחילית 'f לפני המחרוזת. תחביר זה לא קיים ב-

</details>

---

### תרגיל 1.4.3 {#id1.4.3}

יוסי קיבל דמי כיס שבועיים. עליו להוציא סכום כסף שווה בכל אחד מימות השבוע (7 ימים).  
כתבו תכנית שתחשב:  
- כמה כסף יוציא בכל יום (שלם בלבד).  
- כמה שקלים יישארו לו בסוף השבוע.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
int money = 53; // example value

int perDay = money / 7; // integer division for daily spending
int leftover = money % 7; // what's left after division

Console.WriteLine($"Per day: {perDay}, Leftover: {leftover}");
{% endhighlight %}

</details>

---

### תרגיל 1.4.4 {#id1.4.4}

חנה קיבלה ליום ההולדת סכום כסף מסוים. ב־80 שקל קנתה ג’ינס, וב־25 שקל קנתה חולצה.  
את יתרת הכסף החליטה לחלק בצורה שווה לכל השנה (12 חודשים) בכדי שישארו לה דמי כיס. הסכום בכל חודש יהיה שלם (ללא אגורות), ובעודף החליטה לקנות ממתקים.  
כתבו תכנית שתקלוט את סכום המתנה, תחשב בכמה כסף קנתה חנה ממתקים, וכמה נותר לה לדמי כיס בכל חודש.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
int gift = 250; // example value
int jeans = 80;
int shirt = 25;

int left = gift - jeans - shirt; // money left after shopping
int monthly = left / 12; // full shekels per month
int candy = left % 12; // leftover goes to candy

Console.WriteLine($"Monthly allowance: {monthly}, Candy: {candy}");
{% endhighlight %}

</details>

---

### תרגיל 1.4.5 {#id1.4.5}

כתבו תכנית הקולטת זמן בדקות, ומדפיסה:
- כמה שעות שלמות יש בו  
- כמה דקות נותרות לאחר השעות השלמות  
לדוגמא עבור הקלט 204 יודפס:  

```
3 minutes and 24 seconds
```


<details><summary>פתרון</summary>

{% highlight csharp linenos %}
int totalMinutes = 204; // example

int hours = totalMinutes / 60; // full hours
int minutes = totalMinutes % 60; // remaining minutes

Console.WriteLine($"{hours} minutes and {minutes} seconds");
{% endhighlight %}

</details>

---

### תרגיל 1.4.6 {#id1.4.6}

שימו במשתנה מספר דו-ספרתי כלשהו.  
על התכנית לחשב ולהדפיס את ספרת העשרות ואת ספרת האחדות

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
int number = 47; // example two-digit number

int tens = number / 10; // extract tens digit
int ones = number % 10; // extract ones digit

Console.WriteLine($"Tens: {tens}, Ones: {ones}");
{% endhighlight %}

</details>

---

### תרגיל 1.4.7 {#id1.4.7}

חברת car עשתה סקר וגילתה שבמרוצי מכוניות, כל מכונית תשיעית מתהפכת, וכל מכונית חמישית נעצרת על המסלול בגלל תקלה.  
שימו את מספר המכוניות שהשתתפו במרוץ מסויים במשתנה.  
- כתבו תכנית שתדפיס כמה מכוניות התהפכו  
- כמה מכוניות נעצרו בגלל תקלה.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
int totalCars = 180; // example value

int flipped = totalCars / 9; // every 9th car flips
int stopped = totalCars / 5; // every 5th car stops

Console.WriteLine($"Flipped cars: {flipped}");
Console.WriteLine($"Stopped cars: {stopped}");
{% endhighlight %}

</details>



## 1.4.8 מרחק מעגלי בין אותיות {id1.4.8}

נתון מעגל של האותיות **a–z**.
כתוב תכנית בשפת תכנות (למשל C# או Java) שתקלוט שתי אותיות ותחזיר את **המרחק המעגלי** ביניהן.
המרחק בין שתי אותיות הוא מספר הצעדים הקטן ביותר שנדרש כדי לעבור מאות אחת לשנייה לאורך המעגל.

---

### דוגמאות

#### דוגמה 1: מעגל קטן עם שלוש אותיות (a, b, c)

במעגל זה המרחק בין כל שתי אותיות הוא תמיד **1**.

<div class="mermaid">
graph LR
    A[a] --- B[b]
    B --- C[c]
    C --- A
</div>

---

#### דוגמה 2: מעגל עם חמש אותיות (a, b, c, d, e)

* המרחק בין **d** ל־**b** הוא **2** (דרך d→c→b).
* המרחק בין **d** ל־**a** הוא **2** ולא 3 (כי הולכים בכיוון d→e→a).

<div class="mermaid">
graph LR
    A[a] --- B[b]
    B --- C[c]
    C --- D[d]
    D --- E[e]
    E --- A
</div>

---

### דרישה

ממשו פונקציה/תכנית שתקבל שתי אותיות (a–z) ותחשב את המרחק המעגלי ביניהן.
לדוגמה:

* קלט: `a d` → פלט: `3`
* קלט: `d a` → פלט: `3`
* קלט: `d b` → פלט: `2`

---

