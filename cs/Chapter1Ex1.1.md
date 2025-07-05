---
layout: page
title: "תרגול 1.1 אלגוריתמים"
subtitle: "אלגוריתמים ותוכניות פשוטות"
author: גיא סידס
lang: he
---
<!-- התרגילים ממוספרים 1.2 עד 1.5 במצגת 1 בהתאמה -->

## תרגיל 1.1.3 – חשבון טלפון חודשי

פתחו אלגוריתם המקבל כקלט מספר דקות שיחה ואת סכום התשלומים הקבועים (סכום חודשי קבוע) ומדפיסה את הסכום הכולל לתשלום..
נתון שמחירה של דקת שיחה: 1.20 ₪.



<details> <summary>פתרון</summary>
אלגוריתם מילולי:

קבל כקלט את מספר דקות השיחה לתוך minutes.

קבל את סכום התשלומים הקבועים לתוך payment.

חשב minutes * 1.20 + payment והכנס ל-total.

הצג את total.

{% highlight csharp linenos %}Console.Write("Enter call minutes: ");
double minutes = double.Parse(Console.ReadLine());

Console.Write("Enter fixed charges amount: ");
double payment = double.Parse(Console.ReadLine());

double total = minutes * 1.20 + payment;

Console.WriteLine("Total amount due: " + total + " ש\"ח");
{% endhighlight %}

</details>

## תרגיל 3 – שטח ריבוע
פתחו אלגוריתם הקולט אורך צלע של ריבוע, ומציג את שטחו.



<details> <summary>פתרון</summary>

אלגוריתם מילולי:

קבל כקלט מספר לתוך num.

חשב num * num והכנס ל-square.

הצג את square.

{% highlight csharp linenos %}Console.Write("Enter side length of square: ");
double num = double.Parse(Console.ReadLine());

double square = num * num;

Console.WriteLine("Area of square: " + square);
{% endhighlight %}

</details>

## תרגיל 1.1.4 – נפח תיבה
פתחו אלגוריתם הקולט שלושה מספרים שלמים: אורך, רוחב וגובה של תיבה.
האלגוריתם יחושב וידפיס את נפח התיבה.

<details> <summary>פתרון ב-C#</summary>

{% highlight csharp linenos %}Console.Write("Enter box length: ");
int length = int.Parse(Console.ReadLine());

Console.Write("Enter box width: ");
int width = int.Parse(Console.ReadLine());

Console.Write("Enter box height: ");
int height = int.Parse(Console.ReadLine());

int volume = length * width * height;

Console.WriteLine("Box volume: " + volume);

{% endhighlight %}
</details>

## תרגיל 1.1.5 – מחיר מחשב כולל מע״מ
פתחו אלגוריתם הקולט את מחירו של מחשב ומחשב את המחיר כולל מע"מ בשיעור 18%.


<details markdown="1"> <summary>פתרון ב-C#</summary>
אלגוריתם מילולי:

קלוט מספר ממשי לתוך price.

חשב price + price * 0.18 והכנס ל-finalPrice.

הדפס את finalPrice.

{% highlight csharp linenos %}Console.Write("Enter computer price: "); // כדי לא לעבור שורה Write פלט ובו אנו מבקשים קלט. מקובל לרשום 

double price = double.Parse(Console.ReadLine());

double finalPrice = price + price * 0.18; // price * 1.18  אפשר גם

Console.WriteLine("final price including V.A.T is: ₪" + finalPrice);
{% endhighlight %}
</details>




### המשך תרגול

אם סיימתם לתרגל תרגילים אלו בהצלחה, המשיכו לתרגילים הבאים או למטלת הבית

[⬅ מעבר לתרגול 1.2 - משתנים והשמה](/cs/Chapter1Ex1.2)

[⬅ מעבר לתרגול 1.3 - חישובים והמרות מתקדמות](/cs/Chapter1Ex1.3)

[⬅ מעבר להסבר על **הטיפוס char** תו](/cs/Chapter1Char)

[⬅ לקריאה על **קיצורים שימושיים** וכתיבת קיצורים snippets נוספים](/cs/Shortcuts)


