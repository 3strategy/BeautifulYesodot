---
layout: page
title: "תרגול תנאים ושארית חלוקה"
subtitle: "תרגול 3.2 תנאים מורכבים ושארית חלוקה"
author: גיא סידס
mathjax: true
lang: he
---

### תרגיל 3.2.1 שנה מעוברת

כתבו תוכנית הקולטת שנה לועזית `year`. הדפס:

* "leap" או "Meuberet" אם מעוברת יש להדפיס,
* אחרת "common" או "Normal".

כל שנה המקיימת אחד מהתנאים הבאים היא שנה מעוברת לפי הלוח הגרגוריאני:

* השנה מתחלקת ב-4 אך אינה מתחלקת ב-100
* השנה מתחלקת ב-400.

למשל, 2004 היא שנה מעוברת, אך 1900 אינה שנה מעוברת, משום שהיא מתחלקת ב-100, אך לא ב-400. 2000 היא שנה מעוברת, משום שהיא מתחלקת ב-400.

<details markdown="1"><summary>פתרון</summary>

{% highlight csharp linenos %}static void Main(string[] args)
{
    Console.Write("Enter a 4 digit year: ");
    int year = int.Parse(Console.ReadLine());

    bool isLeap = false;

    if (year % 4 == 0)
    {
        if (year % 100 != 0 || year % 400 == 0)
        {
            isLeap = true;
        }
    }

    if (isLeap)
        Console.WriteLine("Meuberet");
    else
        Console.WriteLine("Normal");
}
{% endhighlight %}

**פתרון נוסף מקוצר**

{% highlight csharp linenos %}bool isLeap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
Console.WriteLine(isLeap ? "leap" : "common");  // ternary הערה. בפתרון זה נעשה שימוש בתנאי מקוצר 
{% endhighlight %}

</details>

---

### תרגיל 3.2.2 נקודה בתוך מלבן

קולטים שני מספרים ממשיים `x`, `y`. הדפס "inside" אם (x,y) נמצאים בתוך מלבן  $$0<x<10$$ ו- $$0<y<5$$. אחרת "outside".

---

### תרגיל 3.2.3 תו חוקי. שאלה מעט מעייפת

כתבו תוכנית הקולטת תו `ch`. הדפס:

* "vowel" אם הוא a, e, i, o, u ( או A, E, I, O, U )
* אחרת "consonant"


<details markdown="1"><summary>פתרון</summary>

{% highlight csharp linenos %}public static void Main()
{
    Console.Write("Enter a character: ");
    char ch = char.Parse(Console.ReadLine());

    if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u' ||
        ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U')
    {
        Console.WriteLine("vowel");
    }
    else
    {
        Console.WriteLine("consonant");
    }
}
{% endhighlight %}


</details>
---

### תרגיל 3.2.4 שני מתוך שלושה

נתונים שלושה ערכים בוליאניים `p`, `q`, `r`. הדפס:

{: .subq}
א. 
    * "at least two true" אם לפחות שניים בהם true,
    * אחרת "fewer than two"

{: .subq}
ב. הגרילו את המספרים הרנדומליים באמצעות `bool n1 = rnd.Next(0,2) == 1;` הדפיסו את המספרים המתקבלים בהגרלות ואת התוצאה, ובדקו שהקוד עובד נכון

---

### תרגיל 3.2.5 פלינדרום ומתחלק ב-11

כתבו תוכנית הקולטת מספר תלת-ספרתי `n`. הדפס:

* "palindrome & div11" אם פלינדרום ומתחלק ב-11
* "palindrome" רק פלינדרום
* "div11" רק מתחלק ב-11
* אחרת "none"

<details markdown="1"><summary>פתרון</summary>

{% highlight csharp linenos %}bool isPalindrome = (n / 100 == n % 10);
bool isDiv11 = (n % 11 == 0);
if (isPalindrome && isDiv11)
    Console.WriteLine("palindrome & div11");
else if (isPalindrome)
    Console.WriteLine("palindrome");
else if (isDiv11)
    Console.WriteLine("div11");
else
    Console.WriteLine("none");
{% endhighlight %}

</details>

---

## 3.2.6 סיווג נקודה ברבעי הצירים - תנאים מקוננים

כתבו תוכנית שקולטת שני מספרים ממשיים 
$$x, y$$ ומדפיסה באיזה רבע של מערכת הצירים נמצאת הנקודה שאלו הקואורדינטות שלה. — I, II, III או IV; אם הנקודה נמצאת על ציר כלשהו, יש לציין זאת (למשל “On X-axis”, “On Y-axis” או “Origin”).

---

## 3.2.7 סיווג מספר לפי סימן וזוגיות
כתבו תוכנית שקוראת מספר שלם 
$$n$$ ומדפיסה שתי מילים:

האם $$n$$ חיובי, שלילי או אפס;

האם $$n$$ זוגי או אי-זוגי.
לדוגמה: עבור $$n = -3$$ התוכנית תדפיס “Negative Odd”.

---

## 3.2.8 מיון של שלושה מספרים
כתבו תוכנית הקולטת (או מגרילה) שלושה מספרים שלמים $$a, b, c$$ ומדפיסה אותם בסדר עולה.

---

## קמפוס שאלה 5 אפיון משולשים

כתבו : תוכנית הקולטת 3 מספרים ממשיים ומדפיסה האם מדובר במשולש ומה סוג המשולש :
- משולש שווה צלעות
- משולש שווה שוקיים
- משולש ישר זוית
- משולש שווה צלעות וישר זווית
- משולש רגיל

ניתן להניח שהקלט תקין. תזכורת: במשולש, סכום 2 צלעות גדול מן הצלע השלישית.

שימו לב :
יש להדפיס פעם אחת את סוג המשולש במדוייק
למשל : משולש ישר זווית ושווה שוקיים
וכן, משולש שווה צלעות ולא גם משולש שווה שוקיים וגם משולש שווה צלעות



<details markdown="1"><summary>השוואת פתרון נכון ושגוי ובדיקת מקרים</summary>

על מנת לבדוק משולשים באופן כללי יש לרנדם את ערכי הצלעות בין 1 ל-13
על מנת לבדוק תקינות ישר זווית יש לבחור אקראי בין 3 ל-5 (כדי ליצור יותר סיכוי ל ישר זווית). בדיקה של $$1,1,\sqrt{2}$$ מראה ששני הפתרונות שגויים וגם הפתרון בקמפוס דורש תיקון קל.

בהמשך לאחר שנלמד פעולות נכיר טכניקות בדיקה יותר נוחות, אבל המינימום הנדרש הוא להפוך את הפתרון לפונצקיה המקבלת ערכי צלעות כדי לבדוק הרבה אפשרויות בצורה פשוטה..

{% highlight csharp linenos %}static Random rnd = new Random();

public static void Main()
{
    // התכנית הראשית משמת כאן לבדיקה ההשוואתית
    double a, b, c;
    for (int i = 0; i < 10; i++)
    {
        a = rnd.Next(3, 6);
        b = rnd.Next(3, 6);
        c = rnd.Next(3, 6); ;
        Student1Solution(a, b, c);
        Student2Solution(a, b, c);
        Guy(a, b, c);
        Console.WriteLine("====================\n");
    }
    a = 1; b = 1; c = Math.Sqrt(2);
    Student1Solution(a, b, c);
    Student2Solution(a, b, c);
    Guy(a, b, c);
}
static void Student1Solution(double a, double b, double c)
{
    // (פתרון נכון פרט למשולש שו"ש ישר זווית (לפי תוצאות הבדיקות שלי
    Console.WriteLine($"a: {a},  b: {b},  c: {c}");
    bool IsTriangle = ((a + b) > c && (a + c) > b && (b + c) > a);
    bool EquilateralTri = ((a == b) && (a == c));
    bool IsoscelesTri = IsTriangle && !EquilateralTri && ((a == b) ||
            (a == c) || (b == c));
    bool RATri = ((Math.Pow(a, 2) == (Math.Pow(b, 2) + Math.Pow(c, 2))) ||
                    (Math.Pow(b, 2) == (Math.Pow(a, 2) + Math.Pow(c, 2))) ||
                    (Math.Pow(c, 2) == (Math.Pow(a, 2) + Math.Pow(b, 2))));

    if (!IsTriangle)
        Console.WriteLine($"These three numbers" +
            $" don't represent a triangle");
    else if (EquilateralTri)
        Console.WriteLine($"These three numbers" +
            $" represent an equilateral triangle");
    else if (IsoscelesTri)
    {
        if (RATri)
            Console.WriteLine($"These three numbers represent " +
                $"a right angle isosceles triangle");
        else
            Console.WriteLine($"These three numbers represent " +
                $"an isosceles triangle");
    }
    else if (RATri)
        Console.WriteLine($"These three numbers represent " +
                    $"a right angle triangle");
    else
        Console.WriteLine($"These three numbers represent an regular triangle");
}

static void Student2Solution(double side1, double side2, double side3)
{
    // פתרון שגוי (בעקבות הבדיקה ההשוואתית)
    Console.WriteLine("Hello, World!");
    /*
        * תוכנית הקולטת 3 מספרים ממשיים ומדפיסה האם מדובר במשולש ומה סוג המשולש :
                                    - משולש שווה צלעות
                                    - משולש שווה שוקיים
                                    - משולש ישר זוית
                                    - משולש שווה צלעות וישר זווית
                                    - משולש רגיל
    */
    //Console.WriteLine("Enter the 3 sides of the trinangle, from the small to the big");

    if (side1 == side2 && side2 == side3)
    {
        Console.WriteLine("The 3 sides are equal");
    }
    else if (side1 == side2 || side2 == side3)
    {
        Console.WriteLine("The trinangle has 2 sides equal");
    }
    else if (Math.Abs(side3 * side3 - (side1 * side1 + side2 * side2)) < 0.0001)
    {
        Console.WriteLine("The triangle is right-angled.");
    }
    else
    {
        Console.WriteLine("This is regular triangle");
    }

}

/// <summary>
/// תיקון על פתרון קמפוס. שימו לב שבקמפוס יש פתרונות לשאלות הפתוחות
/// </summary>
public static void Guy(double a, double b, double c)
{
    // בדיקה האם מדובר במשולש
    // **** if (!(a + b > c && a + c > b && b + c > a)) // קשה להבין****
    // הכנסת ה"שלילה" לתוך הסוגריים הופכת
    // את התנאי לקריא יותר. כמו בהכנסת מינוס לתוך סוגריים
    // (נהפוך את כל הסימנים (גם הופך ל-או, גדול הופך לקטן שווה
    if ((a + b <= c || a + c <= b || b + c <= a)) // קריא יותר
        Console.WriteLine("!!! Not a triangle !!!");
    else
    {
        //1,1,√2 האם משולש ישר זוית // חייבים לעגל טיפה כדי לטפל בממשיים 
        bool isRight = 
            (Math.Round(Math.Pow(a, 2) + Math.Pow(b, 2), 5) == Math.Round(Math.Pow(c, 2), 5) ||
                Math.Round(Math.Pow(a, 2) + Math.Pow(c, 2), 5) == Math.Round(Math.Pow(b, 2), 5) ||
                Math.Round(Math.Pow(b, 2) + Math.Pow(c, 2), 5) == Math.Round(Math.Pow(a, 2), 5));
        // בדיקה האם משולש שווה שוקיים
        if (a == b || a == c || b == c)
        {
            // בדיקה האם משולש שווה צלעות
            if (a == b && b == c) // ממקרים פרטיים לכלליים
                Console.WriteLine("Equilateral triangle");
            else if (isRight)// הדפסה אם שווה שוקיים או שווה שוקיים וישר זוית.
                Console.WriteLine("Isosceles right triangle");
            else // ברירת מחדל - המקרה הכללי
                Console.WriteLine("Isosceles triangle");
        }
        else
        {
            if (isRight)
                Console.WriteLine("Right triangle");
            else
                Console.WriteLine("Regular triange");
        }
    }
}
{% endhighlight %}

</details>
