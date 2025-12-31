---
layout: page
title: "פרק 11.4 — שדות מול תכונות ב־C#"
subtitle: "Disambiguation: מה שנקרא 'תכונות' בהוראה לעומת המינוח והמשמעות ב־C# אמיתי"
author: גיא סידס
chapter: 11.4
tags: [OOP, C#, שדות, תכונות, Properties, Fields, דיסאמביגואציה]
lang: he
mathjax: true
---

{: .box-note}
מטרת הדף היא לעשות **דיסאמביגואציה** בין מינוח שמופיע לעיתים בהוראה ("תכונות") לבין המינוח הרשמי ב־C#:
ב־C# המילה **Property / תכונה** היא *ישות שונה* מ־**Field / שדה**.

---

## הרעיון בשורה אחת {#idea}

ב־C#:
- **שדה (Field)** הוא משתנה בתוך המחלקה (לרוב `private`).
- **תכונה (Property)** היא “עטיפה” שנראית מבחוץ, עם `get`/`set`, ויכולה לבצע ולידציה/לוגיקה.

במשרד החינוך, לעיתים כשמבקשים לכתוב "תכונות" מתכוונים בפועל ל־**שדות private** (כלומר *Fields*), ולא ל־Properties.

---

## דוגמה בסיסית ב־C# {#example}

<table>
  <tr>
    <th style="direction:rtl; text-align:right;">רכיב</th>
    <th>#C משרד החינוך</th>
    <th>C# Code</th>
  </tr>

  <tr>
    <td style="direction:rtl; text-align:right;">שדה (Field)</td>
    <td>
{% highlight csharp %}
private int age; // תכונה (משרד החינוך)
{% endhighlight %}
    </td>
    <td>
{% highlight csharp %}
private int age; // שדה
{% endhighlight %}
    </td>
  </tr>

  <tr>
    <td style="direction:rtl; text-align:right;">תכונה (Property)</td>
    <td>
{% highlight csharp %}
public int GetAge() => age;

public void SetAge(int value)
{
    if (value > 0)
      age = value;
}
{% endhighlight %}
    </td>
    <td>
{% highlight csharp %}
public int Age // תכונה
{
  get => age;
  set
  {
    if (value > 0)
      age = value;
  }
}
{% endhighlight %}
    </td>
  </tr>
  <tr>
    <td style="direction:rtl; text-align:right;">דוגמה – קריאה (Get)</td>
    <td>
  {% highlight csharp %}
  // "Java style" / משרד החינוך
  int a = student.GetAge();
  {% endhighlight %}
    </td>
    <td>
  {% highlight csharp %}
  // C# אמיתי ב Property
  int a = student.Age;
  {% endhighlight %}
    </td>
  </tr>

  <tr>
    <td style="direction:rtl; text-align:right;">דוגמה – קביעה (Set)</td>
    <td>
  {% highlight csharp %}
  // "Java style" / משרד החינוך
  student.SetAge(18);
  {% endhighlight %}
    </td>
    <td>
  {% highlight csharp %}
  // C# אמיתי ב Property
  student.Age = 18;
  {% endhighlight %}
    </td>
  </tr>
</table>


“ממשק” חיצוני לגישה/עדכון של ערך. נראה מבחוץ כמו נתון, אבל בפועל זו תחבירית פעולה/מנגנון עם <code>get</code>/<code>set</code>.


---

## טבלה משווה — שדות מול תכונות (מטרת דיסאמביגואציה) {#compare}

<table>
  <tr>
    <th style="direction:rtl; text-align:right;">מונח בהוראה (עברית)</th>
    <th style="direction:rtl; text-align:right;">המונח הרשמי ב־C#</th>
    <th style="direction:rtl; text-align:right;">מה זה בפועל?</th>
    <th style="direction:rtl; text-align:right;">איך מזהים בקוד?</th>
    <th style="direction:rtl; text-align:right;">למה זה חשוב?</th>
  </tr>

  <tr>
    <td style="direction:rtl; text-align:right;">
      "תכונה" (כמו שמופיע לפעמים בדרישות)
    </td>
    <td style="direction:rtl; text-align:right;">
      <b>Field (שדה)</b>
    </td>
    <td style="direction:rtl; text-align:right;">
      משתנה פנימי במחלקה, לרוב <code>private</code>. זה *הנתון עצמו*.
    </td>
    <td style="direction:rtl; text-align:right;">
      שורה כמו <code>private int age;</code>
    </td>
    <td style="direction:rtl; text-align:right;">
      אם תלמיד/ה כותבים רק שדות — הם/ן עדיין לא כתבו <i>Property</i>. חשוב לדעת על מה בדיוק הדרישה מדברת.
    </td>
  </tr>

  <tr>
    <td style="direction:rtl; text-align:right;">
      "פעולות מאחזרות/קובעות" (לעיתים מדברים על get/set כ"פעולות")
    </td>
    <td style="direction:rtl; text-align:right;">
      <b>Property (תכונה)</b>
    </td>
    <td style="direction:rtl; text-align:right;">
      מנגנון גישה מבוקר לשדה (או לחישוב ערך). יכול לבצע ולידציה/לוגיקה.
    </td>
    <td style="direction:rtl; text-align:right;">
      בלוק עם <code>get</code>/<code>set</code> או תכונה אוטומטית: <code>public int X { get; set; }</code>
    </td>
    <td style="direction:rtl; text-align:right;">
      מאפשר הכמסה אמיתית: לא לחשוף שדה, לשמור על כללים (למשל גיל לא שלילי), ולשנות מימוש בלי לשבור משתמשים.
    </td>
  </tr>

  <tr>
    <td style="direction:rtl; text-align:right;">
      "תכונה" (במובן הכללי: תיאור של אובייקט)
    </td>
    <td style="direction:rtl; text-align:right;">
      תלוי: <b>Field</b> או <b>Property</b>
    </td>
    <td style="direction:rtl; text-align:right;">
      לפעמים מתכוונים לנתון פנימי, ולפעמים לדרך החיצונית לגשת אליו.
    </td>
    <td style="direction:rtl; text-align:right;">
      מסתכלים מה מופיע בקוד בפועל.
    </td>
    <td style="direction:rtl; text-align:right;">
      זו בדיוק הסיבה לדף הזה: לא להתבלבל בין המונחים.
    </td>
  </tr>

</table>

{: .table-rl}

---

## כלל אצבע להוראה (שימושי בבדיקת עבודות) {#rule-of-thumb}

{: .box-success}
**אם כתוב `private int x;` — זה שדה (Field).**

{: .box-success}
**אם כתוב `public int X { get; set; }` או בלוק `get`/`set` — זו תכונה (Property).**

---

## הערה פדגוגית קצרה {#pedagogy}

{: .box-warning}
כשנאמר בכיתה "תכונות" במובן של *מה יש לאובייקט*, קל להחליק למצב שבו מתכוונים לשדות.
אבל בעולם של C# (וגם של OOP מודרני), תכונה (Property) היא כלי שמייצג **גישה חיצונית מבוקרת** — לא “סתם משתנה”.

במילים אחרות:
- **שדה** = הנתון
- **תכונה** = הדרך הנכונה לחשוף/לשנות את הנתון מבחוץ (או אפילו לחשב אותו)

