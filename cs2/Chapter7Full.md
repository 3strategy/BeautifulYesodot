---
layout: page
title: "פרק 7 - פונקציות(מורחב)"
subtitle: "חלוקת התוכנית לתתי-משימות. מורחב"
author: גיא סידס
tags: [פעולות]
mathjax: true
lang: he
---

<head>
  <style>
    #anim-container {
    position: relative;    /* make this the coordinate system for everything inside */
    min-height: 20em; 
    }
    .box {
      width: 16em;
      height: 10em;
      border: 2px solid #333;
      border-radius: 6px;
      direction: LTR;
      text-align:left;
      position: absolute;
      background: var(--backs-col);
      box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
    }
    #main { top: 40px; left: 40px; }
    #func { top: 40px; right: 40px; }
    #arrow {
      position: absolute;
      top: 70px;
      text-align:left;
      font-size: 2rem;
      opacity: 0;
      transition: left 1s ease, opacity 0.5s ease;
    }
    .bubble {
      position: absolute;
      padding: 4px 8px;
      background: var(--backw-col);
      border: 1px solid #99c;
      border-radius: 4px;
      font-size: 0.9em;
      opacity: 0;
      transition: left 1s ease, top 1s ease, opacity 0.5s ease;
      pointer-events: none;
    }
    #log {
      position: absolute;
      direction: LTR;
      text-align:left;
      bottom: 150px;
      left: 40px;
      right: 40px;
      font-style: italic;
      color: var(--text-col);
    }
    #start {
      position: absolute;
      bottom: 20px;
      right: 40px;
    }
  </style>
</head>


בפרק זה נלמד כיצד לכתוב פעולות (פונקציות), המחלקות את התוכנית לתתי-משימות, מאפשרות שימוש חוזר בקוד, ומשפרות את קריאות הקוד. . 
{: .box-note}

ניתן להשתמש בשני המינוחים. בספרות בעברית רווח המונח פעולה. באנגלית רווח המונח פונקציה.

{: .box-note}
**הערה:** חלק מהמורים מלמדים פונקציות מוקדם יותר - כבר לאחר לולאת `for` ולפני לולאת `while` או אפילו לפני `for`. עם זאת, בסילבוס זה הוחלט ללמד פונקציות רק לאחר לולאות `for`, `while` ולולאות מקוננות, כחלק משלב חשיבה אלגוריתמי מתקדם. אומנם אישית אני ממליץ ללמד פונקציות מוקדם יותר, אך נתיישר עם הסילבוס ונציג את הפרק בהמשך לפרק 6.

הגדרה: פונקציה היא מקבץ של פקודות המאוגדות תחת שם מזוהה, שניתן לקרוא לו (להפעיל אותו) מתוך חלקים שונים בתוכנית כדי לבצע משימה מוגדרת. פונקציה יכולה לקבל נתונים קלט (פרמטרים) ויכולה גם להחזיר תוצאה לפונקציה שקראה לה
- כאשר קוראים לפונקציה, התוכנית עוצרת בנקודת הקריאה, עוברת לביצוע קוד הפונקציה, ולאחר סיום הפונקציה - חוזרת לנקודת הקריאה עם ערך שחושב (אם הפונקציה מחזירה ערך)
- אין כאן מבנה חדש לחלוטין - כבר השתמשנו בפונקציות שקיימות בספריות השפה כגון, `()Console.WriteLine` או `()Math.Sqrt`, וגם ראינו ש-Main היא פונקציה מיוחדת שבה מתחילה התוכנית. יחד עם זאת, פונקציות שאנו כותבים בעצמנו הן כלי מרכזי לבניית תוכניות מורכבות: הן **מאפשרות לנו לפרק בעיות לתתי-משימות, להימנע מחזרת קוד, ולכתוב תוכניות קריאות ונוחות יותר לתחזוקה**.

## בפרק זה נלמד כיצד להגדיר פונקציות משלנו ולקרוא להן.

<details markdown="1"><summary>פונקציות: הגדרה כללית והרחבה</summary>
## פונקציות בתכנות
פונקציה (function, פעולה), נקראת לעיתים גם שגרה (procedure) או מתודה (method). זוהי יחידת קוד עצמאית בתוך תוכנית, המבצעת משימה מוגדרת. 
- לפי פרדיגמת התכנות הפרוצדורלי, מומלץ לפרק תוכניות לפונקציות קטנות ככל האפשר, כך שכל פונקציה מבצעת פעולה פשוטה אחת או כמה פעולות קשורות.
- פונקציות נקראות גם "תת-תוכניות", משום שכל פונקציה היא כמעין תוכנית קטנה בתוך התוכנית הגדולה. 

---

</details>

### ריצה של פונקציה:

**כאשר קוראים לפונקציה, מתבצעות הפקודות שבתוך הפונקציה (הנקראות "גוף הפונקציה"), ולאחר מכן השליטה חוזרת לתוכנית הקוראת.** ניתן לקרוא לאותה פונקציה מספר פעמים במקומות שונים בתוכנית, עם נתונים שונים בכל פעם, ובכך לחסוך כפילות קוד. **התרשים הבא ממחיש את זרימת התוכנית בקריאה ל-3 פונקציות**:

<div class="mermaid">
flowchart TD
    Start([1.התכנית מתחילה בקריאה ל-Main]) --> Main
    Main["Main Method"] --> |"2.קריאה ל- ;()SayHello"| SayHello[הפונקציה SayHello <br/> Hello World מדפיסה]
    SayHello --> |return| Main
    Main --> |"3.קריאה ל- ;()AddNumbers"| AddNumbers[הפונקציה AddNumbers<br/>מחשבת 3+5<br/>ומדפיסה את התוצאה]
    AddNumbers --> |return| Main
    Main --> |"4.קריאה ל- ;()SayGoodbye"| SayGoodbye[הפונקציה SayGoodbye <br/>מדפיסה Goodbye]
    SayGoodbye --> |return| Main
    Main --> End([5.סיום])
    
    style Main fill:#4fc3f7,stroke:#0277bd,stroke-width:4px,color:#fff
    style SayHello fill:#ffb74d,stroke:#f57c00,stroke-width:2px
    style AddNumbers fill:#ffb74d,stroke:#f57c00,stroke-width:2px
    style SayGoodbye fill:#ffb74d,stroke:#f57c00,stroke-width:2px
    style Start fill:#81c784,stroke:#388e3c,stroke-width:2px
    style End fill:#e57373,stroke:#d32f2f,stroke-width:2px
    linkStyle default stroke:#666666,stroke-width:3px
</div>

---


<details markdown="1"><summary>יתרונות חסרונות והנחיות</summary>

## יתרונות השימוש בפונקציות:

- **שימוש חוזר** (Reuse) - פונקציה מאפשרת **לכתוב קוד פעם אחת ולהריץ אותו מספר פעמים**, עם קלטים שונים. בכך אנו נמנעים מחזרת קוד ומפחיתים טעויות.
- **ארגון והבנה** - פיצול תוכנית לפונקציות יוצר **מבנה היררכי ברור.** **קל יותר להבין ולבדוק** חלקי תוכנה קצרים המתמקדים במשימה ספציפית, מאשר להתמודד עם תוכנית ארוכה כמקשה אחת
- **גמישות לשינויים** - עדכון לוגיקה שקיימת בפונקציה אחת יוחל אוטומטית בכל המקומות שקוראים לפונקציה, ללא צורך לשנות קוד במקומות מרובים.
- **בדיקות וניפוי שגיאות** - פונקציות קצרות מאפשרות לבדוק כל חלק בנפרד (Unit Testing) ולאתר שגיאות בקלות רבה יותר.

## חסרונות ואתגרים:
- **מעבר נתונים** - פונקציה פועלת בסביבה מבודדת (scope). משתנים המוגדרים בתוך פונקציה (משתנים מקומיים) אינם מוכרים מחוץ לפונקציה, ולהפך. לכן יש לתכנן carefully כיצד להעביר מידע פנימה (דרך פרמטרים) והחוצה (ערך החזרה) במידת הצורך.
- **ביצועים** - קריאה לפונקציה מוסיפה מעט תקורה (overhead) בזמן ריצה עקב מעבר לשליטה וחזרה. במקרים נדירים של קריאות פונקציה מאוד תכופות בתוך לולאות ענק, ייתכן שתהיה השפעה על הביצועים. עם זאת, ברוב המכריע של המקרים עדיף לכתוב קוד קריא ומודולרי באמצעות פונקציות, ולשקול אופטימיזציה רק בעת הצורך.
- **הגזמה בפירוק** - אף שפרוק לפונקציות קטנות הוא רצוי, פירוק-יתר של קוד לפונקציות רבות מאוד עלול להפוך את המעקב אחר זרימת התוכנית למסובך. חשוב למצוא איזון בבניית הפונקציות כך שכל פונקציה תהיה בגודל סביר ותהיה בעלת אחריות ברורה.

## הנחיות לשימוש נכון בפונקציות:

- **שם ותיעוד מתאימים** - שם פונקציה צריך לתאר בפועל את פעולתה (בפועל באנגלית, לפי מוסכמות השפה: למשל בפייתון בשיטת snake_case, וב־C# ב-PascalCase). **בחירת שמות ברורים וכתיבת הערות** במידת הצורך מקלים על הבנת תפקיד הפונקציה בתוך התוכנית.
- **פונקציה = משימה** - כל פונקציה צריכה לבצע משימה ברורה אחת. אם נוצרת פונקציה ארוכה מאוד או כזו שמנסה לבצע כמה דברים שונים, שקול לפצל אותה למספר פונקציות.
- **מניעת תלות גלובלית** - עדיף להעביר מידע לפונקציות דרך פרמטרים ולהחזיר תוצאות דרך ערך חוזר, מאשר לסמוך על משתנים גלובליים. כך הפונקציה גנרית ושימושית יותר, ותוצאותיה צפויות (פונקציה ללא תלות חיצונית נקראת פונקציה טהורה במונחי תכנות).

## סיכום:
פונקציות הן אבני בניין בסיסיות בתכנות מודרני המאפשרות כתיבת קוד **DRY** (Don't Repeat Yourself) תוך **חלוקת התוכנה לחלקים הגיוניים**. באמצעות פונקציות נוכל לבנות תוכניות מורכבות באופן מדורג: נפתח ונבדוק כל פונקציה בנפרד, ואז נשלב אותן יחד לפתרון הבעיה הכללית. בפונקציות נשתמש שוב ושוב לאורך התכנות - הן כלי עוצמתי בהפחתת סיבוכיות התוכנה ושיפור הקריאות והתחזוקה שלה.

</details>




## הגדרת פונקציה ב-#C:
בתחביר של C#, הגדרת פונקציה (מתודה) נעשית בתוך מחלקה (class). עד שנלמד תכנות מונחה-עצמים, נכתוב פונקציות סטטיות בתוך המחלקה הראשית של התוכנית, לצד הפונקציה Main. התחביר הבסיסי הוא:

```csharp
[modifier(s)] [return_type(s)] FunctionName([parameter_list])
{
    // גוף הפונקציה: סדרת פעולות שתתבצענה בקריאה לפונקציה
}
```

$$
\overbrace{\text{public static}}^{\text{מודיפיירים}}
\quad
\overbrace{\text{void}}^{\text{סוג החזרה}}
\quad
\overbrace{\text{Main}}^{\text{שם הפונקציה}}
\quad
\overbrace{()}^{\text{פרמטרים}} \\


\overbrace{\text{public static}}^{\text{מודיפיירים}}
\quad
\overbrace{\text{bool}}^{\text{סוג החזרה}}
\quad
\overbrace{\text{IsPrime}}^{\text{שם הפונקציה}}
\quad
\overbrace{\bigl(\,\text{int }n\bigr)}^{\text{פרמטרים}}
$$


**חשוב:**
- לשורה הראשונה קוראים הגדרת הפונקציה.
- **חתימת הפונקציה:** כוללת רק את **שם הפונקציה והחלק בו מוגדרים הפרמטרים בסדר מסויים.** בכל מקרה של שתי פונקציות עם אותו שם - יהיה בהכרח הבדל בחתימה. (כיוון שהשם זהה, ההבדל יהיה בפרמטרים שהן מקבלות).
- את הגדרת הפונקציה **יש לכתוב מחוץ לפונקציה Main (ובאותה מחלקה).**
    <details markdown="1"><summary>דיוק והרחבה</summary>

    - **הדרישה היא לא לקנן פונקציות זו בתוך זו אלא במצבים חריגים:** ב־C# 7 יש אפשרות של פונקציות מקומיות, אך לא נעסוק בכך כעת. פונקציות מקומיות הן הן המאפשרות (בגרסאות החדשות) לכתוב תוכנית בלי שמופיע Program, Main וכל הדברים המסורבלים האלו. כפי שאמרתי בעבר, בכתיבה כזו, **אתם כבר בתוך Main** וכשאתם כותבים שם פונקציות, אתם נשענים על היכולת לקנן פונקציות.
    - סדר ההגדרות אינו חשוב - ניתן להגדיר פונקציה לפני או אחרי Main - העיקר שההגדרה נמצאת בטווח המחלקה (בשונה מפייתון - שבה פונקציה חייבת להיות מוגדרת לפני כל מי שקורא לה (ולכן גם לפני ה-  Main)). 
    
    </details>
- נקפיד גם להוסיף את המילה static (כמו בדוגמאות). כשנלמד עצמים נבין מה זה.


---


## 7.1 פונקציות ללא פרמטרים

נתחיל בפונקציות הפשוטות ביותר: פונקציות שאינן מקבלות מידע מהקורא להן (פונקציה ללא פרמטרים). פונקציה כזו תמיד תבצע בדיוק את אותה הפעולה בכל קריאה (אלא אם כן היא קוראת לקלט מהמשתמש או משתמשת במשתנים גלובליים - אפשרויות שקיימות אך **אינן מומלצות כלל**). נשתמש בפונקציות ללא פרמטרים כאשר המשימה שאנו רוצים לבצע היא כללית ואינה דורשת מידע חיצוני בכל הרצה. **בקורס יסודות, מבני נתונים, ובבגרות, אין התלבטות במה להשתמש: ניתן להסיק באופן חד משמעי מניסוח השאלה.**


### דוגמא 1: הדפסת שורת כוכביות מספר פעמים — ללא פונקציה

נניח שנרצה להדפיס שלוש שורות של כוכביות (בכל שורה 10 כוכביות). נשווה בין שני מימושים: **בלי פונקציה - תוך חזרת קוד,** ועם פונקציה.

<details open markdown="1"><summary>פתרון ללא שימוש בפונקציה</summary>

{% highlight csharp linenos %}public static void Main()
{
    // שלוש שורות של 10 כוכביות - מימוש ללא פונקציה
    for (int i = 0; i < 10; i++)
        Console.Write("*");
    Console.WriteLine();

    for (int i = 0; i < 10; i++)
        Console.Write("*");
    Console.WriteLine();

    for (int i = 0; i < 10; i++)
        Console.Write("*");
    Console.WriteLine();
}
{% endhighlight %}

</details>


### נחזור לדוגמא 1: הדפסת שורת כוכביות מספר פעמים — עם פונקציה
**נגדיר פונקציה המדפיסה שורה של כוכביות.** הפונקציה לא מקבלת שום פרמטר (הסוגריים ריקים) ולא מחזירה ערך, **ולכן סוג הערך המוחזר מוגדר כ-void**. 
**ניתן לקרוא לפונקציה** זו מכל מקום בתוך המחלקה (למשל מתוך Main) **על-ידי כתיבת שמה ואחריו סוגריים ריקים**:

<details open markdown="1"><summary>פתרון עם פונקציה</summary>

{% highlight csharp linenos %}public static void PrintStars10()
{
    for (int i = 0; i < 10; i++)
        Console.Write("*");
    Console.WriteLine();
}

public static void Main()
{
    // קריאה לפונקציה 3 פעמים
    PrintStars10();
    PrintStars10();
    PrintStars10();
}
{% endhighlight %}

בפונקציה PrintStars10 השתמשנו בלולאה כדי להדפיס 10 כוכביות ברצף, ואחריה מעבר שורה. בכל קריאה לפונקציה זו נקבל את אותה תוצאה: שורת כוכביות באורך 10. **ואכן בחרנו לקרוא לה שלוש פעמים מתוך Main כדי להדפיס 3 שורות זהות. שימו לב כיצד קריאה חוזרת לפונקציה מונעת חזרת קוד:** לא היינו צריכים לכתוב שלוש לולאות נפרדות או להעתיק את גוף הפונקציה - מספיק לקרוא לה שוב. אם נרצה בעתיד לשנות את אורך השורה המודפסת, נצטרך לערוך את מספר החזרות **במקום אחד בלבד (בתוך גוף הפונקציה)**.

 </details>

בדוגמה שלעיל, שני המימושים מפיקים את אותו הפלט. במימוש הראשון ללא פונקציה, יש לנו חזרת קוד: בלוק הקוד שמדפיס כוכביות מופיע שלוש פעמים. במימוש השני איגדנו את בלוק הקוד לפונקציה בשם PrintStars10 וקראנו לה שלוש פעמים. **המימוש עם הפונקציה נקי ומודולרי יותר: אם נרצה לשנות את אורך השורה או להוסיף פעולה לפני/אחרי ההדפסה, נעשה זאת בתוך הפונקציה ומשם זה ישתקף בכל קריאה. לעומת זאת, במימוש ללא פונקציה היינו צריכים לערוך את השינוי בשלושה מקומות.** במקרה זה יכולנו אמנם להשתמש בלולאה חיצונית במקום לשכפל קוד, אך בדוגמאות מסובכות יותר (או כאשר הקוד החוזר אינו רציף) - פונקציות הן הפתרון המועדף למניעת חזרתיות.

### דוגמה 2: פונקציה ללא קלט המבצעת חישוב
פונקציות ללא פרמטרים עשויות גם לבצע חישוב פנימי ולהציג תוצאה, בלי לקבל מידע מבחוץ. לדוגמה, נכתוב פונקציה המדפיסה את סכום המספרים הזוגיים מ-1 עד 100. הפונקציה תחשב את הסכום באמצעות לולאה, ותדפיס את התוצאה. ניתן לקרוא לפונקציה זו ישירות, ללא צורך בפרמטרים: 

<details markdown="1"><summary>SumEven100 - הדפסת סכום הזוגיים עד 100</summary> 

{% highlight csharp linenos %}public static void SumEven100()
{
    int sum = 0;
    for (int num = 0; num <= 100; num += 2)
        sum += num;

    Console.WriteLine($"Sum of even numbers 1-100 is {sum}");
}
{% endhighlight %}
 </details>

בדוגמה זו, הפונקציה SumEven100 לא זקוקה לקלט חיצוני - היא יודעת לסרוק את הטווח 1 עד 100 בעצמה ולחשב את הסכום. היעדר פרמטרים מפשט את השימוש בפונקציה (פשוט קוראים SumEven100()), אך מצד שני הפונקציה אינה גמישה לטווחים אחרים. מה אם נרצה לחשב סכום זוגיים עד 50 או עד 1000? נוכל כמובן לכתוב פונקציה נפרדת לכל טווח, אך זו לא דרך יעילה. כאן עולה הצורך ביכולת להגדיר פונקציה גנרית יותר - כזו שמקבלת פרמטרים לשינוי התנהגותה. **נעבור כעת לנושא הפרמטרים.**

##  7.2 העברת פרמטרים לפונקציה

כדי להפוך פונקציה לגמישה וכללית יותר, נגדיר פרמטרים (parameters) - משתנים המופיעים בסוגריים בהגדרת הפונקציה. בעת הקריאה לפונקציה, **יש להעביר ארגומנטים (arguments) שהם הערכים המסוימים עבור אותם פרמטרים**.

- **הפרמטרים מתנהגים כמשתנים מקומיים בתוך הפונקציה,** ומאפשרים לקוד הפונקציה לעבוד על נתונים שסופקו מבחוץ. 
- **תחביר פרמטרים:** ברשימת הפרמטרים אנו **מציינים עבור כל פרמטר טיפוס ושם משתנה.** אם יש יותר מפרמטר אחד, מפרידים ביניהם בפסיק. לדוגמה, פונקציה שמקבלת שני מספרים שלמים יכולה להיות מוגדרת כך:
```csharp
public static void PrintSum(int a, int b)
{
    Console.WriteLine($"{a} + {b} = {a + b}");
}
```
כעת, בקריאה לפונקציה יש לספק שני ארגומנטים מתאימים, למשל PrintSum(5, 7) ידפיס את השורה 5 + 7 = 12. שימו לב שסדר הארגומנטים חייב להתאים לסדר הפרמטרים כפי שהוגדרו. טיפוס כל ארגומנט נבדק בזמן הקומפילציה - אם ננסה להעביר ערך מטיפוס לא תואם, נקבל שגיאת קומפילציה. 
- **פרמטר לעומת ארגומנט:** פרמטר הוא חלק מהגדרת הפונקציה (מעין משתנה "תבנית" שהפונקציה מצפה לקבל), ואילו ארגומנט הוא הערך המסוים שאנו מעבירים לקריאה. אפשר לומר שפונקציות מגדירות פרמטרים פורמליים, וכשאנו קוראים להן בפועל אנו מוסרים ערכי ארגומנט. לדוגמה, בפונקציה PrintSum(int a, int b) - a ו-b הם פרמטרים; בקריאה PrintSum(5, 7) - 5 ו-7 הם הארגומנטים. בכיתה אני קורא לכולם פרמטרים.

### דוגמה 3: פונקציה עם פרמטר יחיד (אורך)

**תרגול:** שכתבו את הפונקציה הקודמת שיצרה שורת כוכביות באורך קבוע, **כך שתוכל להדפיס שורה באורך גמיש בהתאם לקלט.** במקום פונקציה נפרדת לכל אורך, נגדיר פונקציה אחת עם פרמטר שלם הקובע את מספר הכוכביות:

<details markdown="1"><summary>PrintStars - פתרון: הדפסת שורת כוכביות באורך נתון</summary>

{% highlight csharp linenos %}public static void PrintStars(int length)
{
    for (int i = 0; i < length; i++)
        Console.Write("*");
    Console.WriteLine();
}
public static void Main()
{
    PrintStars(5); // *****
    PrintStars(10); // **********
    PrintStars(3); // ***
}
{% endhighlight %}

</details> 

הפונקציה PrintStars מקבלת פרמטר יחיד length. בכל קריאה, הערך שנמסר (ארגומנט) יוכנס למשתנה length ויקבע את מספר הפעמים שהלולאה תרוץ. בתוכנית הדוגמה קראנו לפונקציה עם הערכים 5, 10 ו-3 - ובהתאם הודפסו שורות באורכים מתאימים. כעת הפונקציה גמישה בהרבה: היא יודעת להדפיס שורת כוכביות בכל אורך שנבקש, ללא חזרת קוד. אפשר, כמובן, לשלב כמה פרמטרים. 
לדוגמה, נכתוב פונקציה שמדפיסה מלבן של כוכביות, עם שני פרמטרים: rows ו-cols הקובעים את ממדי המלבן:

**תרגול:** כתבו פונקציה PrintRectangle המקבלת שני פרמטרים שלמים - rows (שורות) ו-cols (עמודות), ומדפיסה מלבן כוכביות בגודל המבוקש. לדוגמה, עבור קריאה PrintRectangle(3, 5) הפלט יהיה:
```
*****  
*****  
*****  
```
נסו לחשוב כיצד לכתוב זאת (Tip: השתמשו בלולאה מקוננת), לפני שאתם חושפים את הפתרון.

<details markdown="1"><summary>פתרון. נסו לכתוב את הפונקציה בעצמכם לפני הצפייה</summary>

{% highlight csharp linenos %}public static void PrintRectangle(int rows, int cols)
{
    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < cols; j++)
            Console.Write("*");
        Console.WriteLine();
    }
}
{% endhighlight %}

 </details>

כמובן, פרמטרים יכולים להיות מכל טיפוס - לא רק מספרים. לדוגמה, נוכל לכתוב פונקציה המקבלת מחרוזת ומדפיסה ברכה אישית: 

<details markdown="1"><summary>SayHello - פונקציה עם פרמטר מטיפוס מחרוזת</summary>

```csharp
public static void SayHello(string userName)
{
    Console.WriteLine($"Hello, {userName}!");
}
```

</details> 

בקריאה `SayHello("Dan")` תודפס ההודעה `Hello, Dan!`. בצורה דומה אפשר לקבל בפרמטרים קלטים מטיפוס `double` (למספרים ממשיים), `char` (לתו בודד) וכדומה, או לשלב מספר פרמטרים מסוגים שונים. לדוגמה, פונקציה המקבלת שם וכמות: `PrintNameMultiple(string name, int times)` שתדפיס את השם מספר פעמים לפי הערך (הארגומנט) שיועבר לפרמטר השני. 

- **הערה על העברת ערכים:** בשפות כמו C#, ברירת המחדל היא *העברה לפי ערך* – כלומר, לפונקציה מועבר עותק של הארגומנט. שינוי בפרמטר בתוך הפונקציה **לא משפיע** על המשתנה המקורי ששלחנו. למשל, אם נקרא `PrintStars(n)` כאשר `n` הוא 5, ונשנה בתוך הפונקציה את הערך ל־10, זה לא ישפיע על `n` שמחוץ לפונקציה.



- הערה על העברת ערכים: בשפות כמו #C, ברירת המחדל היא העברה לפי ערך - כלומר, העתק של הארגומנט מועבר לפונקציה. שינוי בערך הפרמטר בתוך הפונקציה לא ישנה את המשתנה המקורי שנשלח בארגומנט. למשל, אם נקרא PrintStars(n) עם משתנה n שערכו 5, ואז בתוך הפונקציה נשנה את length ל-10, הדבר לא ישפיע על המשתנה n מחוץ לפונקציה.

- פונקציה יכולה לקבל אפס, אחד או מספר רב של פרמטרים. אם הפונקציה לא זקוקה לקלט חיצוני - פשוט נגדיר סוגריים ריקים (כמו בקטע 7.1). אם היא דורשת כמה ערכים, נגדיר את כולם ברשימת הפרמטרים, מופרדים בפסיקים. 
- קיימת גם אפשרות להגדרת ערכי ברירת מחדל לפרמטרים (Default Parameters) כדי להפוך חלק מהם לאופציונליים - נושא זה נדון בנפרד.

<details>
<summary>הרחבה – העברה לפי הפניה (by ref)</summary>

לעיתים נרצה לאפשר לפונקציה להשפיע על המשתנה שמחוץ לה. עבור טיפוסים שהם אובייקטים (כמו מערך או רשימה), מועבר לפונקציה מצביע לכתובת בזיכרון – שינוי בתוכן המערך יתעדכן גם מחוץ לפונקציה. לעומת זאת, אם נגרום למשתנה המקומי להצביע לאובייקט חדש, ההשפעה לא תצא החוצה (המצביע המקורי לא משתנה).  
בשימוש ב־`by ref` (או ref ב־C#), הפונקציה יכולה *לשנות את כתובת ההפניה עצמה* – כלומר, גם מחוץ לפונקציה המשתנה יצביע לאובייקט החדש, או שהערך עצמו ישתנה.  
מדובר בכלי עוצמתי, אך לעיתים מסוכן, ולכן נהוג להשתמש בו רק במקרים חריגים ומוצדקים.

</details>

<details>
<summary>דרכים אפשריות לזימון פונקציה</summary>

**דרך א': בהוראת השמה:**
```csharp
absolute = Math.Abs(num);
```

**דרך ב': בהוראת פלט:**

```csharp
Console.WriteLine(Math.Abs(num));
```

**דרך ג': בתוך ביטוי בוליאני:**
```csharp
if (Math.Sqrt(num) == 10.0)
```

**דרך ד': בתוך ביטוי חשבוני:**
```csharp
avg = (Math.Abs(num1) + Math.Abs(num2)) / 2.0;
```

</details>



### סיכום ביניים
בחלקים 7.1-7.2 למדנו כיצד להגדיר פונקציות ללא ערך חזרה: פונקציות המבצעות פעולה (כגון חישוב או הדפסה) ואינן מחזירות נתון חזרה למקום הקריאה. ראינו דוגמאות לפונקציות ללא פרמטרים ועם פרמטרים, והדגשנו את היתרון בגמישות שמקנה העברת פרמטרים. בשלב זה כל הפונקציות שהגדרנו היו עם סוג החזרה void. בחלק הבא נרחיב את היכולת של פונקציות ונדון בפונקציות מחזירות ערך: כיצד פונקציה יכולה לחשב ולהחזיר תוצאה למי שקרא לה. זה יאפשר לנו לכתוב פונקציות כמו Max(a,b) שמחזירה את הגדול מבין שני מספרים, IsPrime(n) שמחזירה אמת/שקר אם המספר ראשוני, ועוד. 




## 7.3 העברה וקבלת ערכים מהפונקציה

נחזור לתחביר הבסיסי:

```csharp
[modifier(s)] [return_type(s)] FunctionName([parameter_list])
{
    // גוף הפונקציה: סדרת פעולות שתתבצענה בקריאה לפונקציה
}
```

$$
\overbrace{\text{public static}}^{\text{מודיפיירים}}
\quad
\overbrace{\text{ bool }}^{\text{סוג החזרה}}
\quad
\overbrace{\text{IsPrime}}^{\text{שם הפונקציה}}
\quad
\overbrace{\bigl(\,\text{int }n\ \underbrace{ = -1}_{\text{ערך ברירת מחדל}}\bigr)}^{\text{פרמטרים}}
$$


<details open markdown="1"><summary>אנימציה: העברת פרמטרים לפונקציה וקבלת ערך מוחזר</summary>

<div id="anim-container">

  <div id="main" class="box">void Main(int[] args)
  <br>
  &lbrace;
  <br>
  &nbsp;&nbsp;int n = Function1(42,"alice");
  <br>
  &rbrace;</div>
  <div id="func" class="box">
    int Function1(<span id="num">int a</span>, <span id="name">string name</span>)
  </div>

  <div id="arrow">➔</div>
  <div id="param" class="bubble">( … )</div>
  <div id="result" class="bubble">…</div>

  <div id="log">Click “Start” to see the call.</div>
  <button id="start">Start Animation</button>




</div>

</details>



## הכח של DRY. code review

<details markdown="1">
<summary>הכח של DRY (Don't Repeat Yourself)</summary>

ניקח כדוגמא את השאלה הבאה שפתרנו כבר:
עליכם לכתוב תוכנית שקולטת מהמשתמש 2 מספרים שלמים ותו.
התוכנית תדפיס את הביטוי החשבוני ואת תוצאת החישוב שמתקבל בהתאם לתו שנקלט.
לדוגמה: 
- עבור המספרים 2,3 והתו '+' התוכנית תדפיס: 5 = 2+3 
- עבור המספרים 2,3 והתו '^' התוכנית תדפיס: 8 = 3^2
- פתרון השאלה נראה כך:
    <details open markdown="1">
    <summary>פתרון</summary>
    ```csharp
    public static void MainCalc()
    {
        int num1, num2;
        char oprtr;

        Console.Write("Enter first number ");
        num1 = int.Parse(Console.ReadLine());
        Console.Write("Enter second number ");
        num2 = int.Parse(Console.ReadLine());
        Console.Write("Enter operator ");
        oprtr = char.Parse(Console.ReadLine());

        if (oprtr == '+')
            Console.WriteLine($"{num1} + {num2} = {num1 + num2} ");
        else if (oprtr == '-')
            Console.WriteLine($"{num1} - {num2} = {num1 - num2} ");
        else if (oprtr == '*')
            Console.WriteLine($"{num1} * {num2} = {num1 * num2} ");
        else if (oprtr == '/')
            Console.WriteLine($"{num1} / {num2} = {Math.Round(((double)num1 / num2), 2)} ");
        else if (oprtr == '^')
            Console.WriteLine($" {num1} ^ {num2} = {Math.Pow(num1, num2)}");
    }
    ```
    </details>

## נניח כעת שהשאלה מסתבכת טיפה **ונוספות דרישות:**

עליכם לכתוב תוכנית שקולטת מהמשתמש 2 מספרים שלמים ותו.
התוכנית תדפיס את הביטוי החשבוני ואת תוצאת החישוב שמתקבל בהתאם לתו שנקלט. 

**יש לעמוד בנוסף בדרישות הבאות:**
- בשלב הפנייה לקלט, נדפיס את הטקסט בצבע <span style="color:green">ירוק</span>.
- בזמן שהמשתמש מקליד, נקלוט את הטקסט בצבע <span style="color:yellow">צהוב</span>.
- אם יש טעות בקלט, נדפיס הודעת שגיאה בצבע <span style="color:red">באדום</span> ונבצע קלט מחדש.

    פתרון השאלה יראה כך:

    <details open markdown="1"><summary>פתרון</summary>
    ```csharp
    static void MainCalc1()
    {
        int num1;
        while (true)
        {

            Console.ForegroundColor = ConsoleColor.Green; // prompt in green
            Console.Write("Please enter an integer: ");
            Console.ForegroundColor = ConsoleColor.Yellow;                 // user types in yellow
            string input1 = Console.ReadLine();
            Console.ForegroundColor = ConsoleColor.White;

            if (int.TryParse(input1, out num1))
            {
                break; // valid, exit loop
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red; // error in red, then retry
                Console.WriteLine("Invalid integer. Please try again.");
            }
        }

        double num2;
        while (true) // --- Read second number (double) ---
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.Write("Please enter a double: ");
            Console.ForegroundColor = ConsoleColor.Yellow;
            string input2 = Console.ReadLine();
            Console.ForegroundColor = ConsoleColor.White;

            if (double.TryParse(input2, out num2))
            {
                break;
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Invalid double. Please try again.");
            }
        }

        // --- Read operator ---
        char oprtr;
        while (true)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.Write("Please enter operation (+, -, *, /): ");
            Console.ForegroundColor = ConsoleColor.Yellow;
            string opInput = Console.ReadLine();
            Console.ForegroundColor = ConsoleColor.White;

            if (char.TryParse(opInput, out oprtr) &&
                (oprtr == '+' || oprtr == '-' || oprtr == '*' || oprtr == '/'))
            {
                break;
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Invalid operator. Must be +, -, * or /.");
            }
        }

        // --- Do the calculation inline ---
        Console.ForegroundColor = ConsoleColor.White;
        if (oprtr == '+')
            Console.WriteLine($"{num1} + {num2} = {num1 + num2}");
        else if (oprtr == '-')
            Console.WriteLine($"{num1} - {num2} = {num1 - num2}");
        else if (oprtr == '*')
            Console.WriteLine($"{num1} * {num2} = {num1 * num2}");
        else if (oprtr == '/')
        {
            if (num2 != 0)
                Console.WriteLine($"{num1} / {num2} = {Math.Round((double)num1 / num2, 2)}");
            else
                Console.WriteLine("Cannot divide by zero.");
        }
        //כ-80 שורות עם 3 קטעים מסיביים שחוזרים על עצמם ועושים בדיוק אותו דבר
        Console.ResetColor(); // restore default colours
    }
    ```
    </details>

    <div markdown="1" class="box-warning">
    **סימפטומים בעייתיים:** 
    - שלושה בלוקים נפרדים של `while(true)`, אחד עבור כל קלט.
    - פיזור רב של שינויי צבע סביב כל בקשה לקלט, קריאת הקלט וטיפול בשגיאות.
    - ניתוח נתונים בתוך הקוד (inline parsing) באמצעות `TryParse` והצגת הודעות שגיאה.
    - כל לוגיקת החישוב מוטמעת בתוך `Main` במקום פונקציה נפרדת לשימוש חוזר.
    - ההכרזות הכפולות והקוד הרב־שכבתיות הללו **ממחישות היטב מדוע כדאי להשתמש בפונקציות**, ואפילו יותר — בעזר **גנרי** כמו `Input<T>` — כדי לצמצם כפילויות ולשפר את קריאות הקוד.
    </div>


    ### כך תיראה השאלה בכתיבה תוך פיצול לפונקציות:

    <details open markdown="1">
    <summary>פתרון</summary>

    ```csharp
    public static void MainCalc2()
    {
        // נדמה שהפתרון כתוב בראשי פרקים
        int n1 = Input<int>(); // קריאה לפונקציית קלט גנרית
        double n2 = Input<double>();
        char action = Input<char>("Please enter operation +-/*: ");
        Console.WriteLine($"{n1} {action} {n2} = {Calc(n1, n2, action)}");
    }

    public static double Calc(double num1, double num2, char oprtr)
    {
        // הפונקציה מקבלת שני מספרים ופעולה ומחזירה את התוצאה
        // היא לא מתעסקת בענייני קלט ופלט
        if (oprtr == '+')
            return num1 + num2;
        else if (oprtr == '-')
            return num1 - num2;
        else if (oprtr == '*')
            return num1 * num2;
        else if (oprtr == '/')
            return Math.Round(num1 / num2, 3);
        WriteInColor("\ninvalid opertaion", ConsoleColor.Red);
        return 0;
    }

    // פונקציה שיודעת לקלוט כפי צריך כולל בקשת קלט והודעות שגיאה
    public static T Input<T>(string inputRequest = "Please enter a", string invalidFeedback = null)
    {
        try
        {
            if (inputRequest == "Please enter a")
                inputRequest = $"Please enter {typeof(T).ToString().Substring(7)}: ";

            WriteInColor(inputRequest, ConsoleColor.Green, ConsoleColor.Yellow);
            string s = Console.ReadLine();
            Console.ForegroundColor = ConsoleColor.White;
            return (T)Convert.ChangeType(s, typeof(T)); // may throw an exception
        }
        catch (Exception)
        {
            if (invalidFeedback == null)
                invalidFeedback = $"Your input type was not a valid {typeof(T)}\n";
            WriteInColor(invalidFeedback, ConsoleColor.Red);
            return Input<T>(inputRequest, invalidFeedback);
        }
    }

    // פונקציה שמדפיסה בצבע
    public static void WriteInColor(string str, ConsoleColor color, ConsoleColor? nextColor = null)
    { 
        if (nextColor == null)
            nextColor = Console.ForegroundColor; // use current color if not specified
        Console.ForegroundColor = color;
        Console.Write(str);
        Console.ForegroundColor = (ConsoleColor)nextColor;
    }
    ```

    </details>

</details>

---

## תרגול

[⬅ עברו לתרגול 7.1 - פונקציות void: פעולות ללא פרמטרים](/cs2/Chapter7Ex7.1)

[⬅ עברו לתרגול 7.2 - פונקציות עם פרמטרים](/cs2/Chapter7Ex7.2)

[⬅ עברו לתרגול 7.3 - פונקציות המקבלות ומחזירות ערך](/cs2/Chapter7Ex7.3)

## סרטונים
[סרטוני פרק 7: פעולות](https://www.youtube.com/playlist?list=PLw4P_RdfuzSh3nsdxq7oMeTbxZtADUsuv){:target="_blank"}




  <script>
    const main   = document.getElementById('main');
    const func   = document.getElementById('func');
    const arrow  = document.getElementById('arrow');
    const param  = document.getElementById('param');
    const result = document.getElementById('result');
    const log    = document.getElementById('log');
    const btn    = document.getElementById('start');
    const numArg = document.getElementById('num');
    const nameArg= document.getElementById('name');

    btn.addEventListener('click', () => {
      // 1) Prepare function signature and param bubble

      param.textContent  = '(42, "Alice")';
      param.textAlign = 'left';
      param.direction = 'LTR';
      log.textContent    = 'Main() → calling Function1';

      // 2) Fade in arrow and param at Main edge
      const startX = main.offsetLeft + main.offsetWidth;
      arrow.style.left   = startX + 'px';
      arrow.style.opacity= 1;
      param.style.left   = startX + 'px';
      param.style.top    = (main.offsetTop - 50) + 'px';
      param.style.opacity= 1;

      // 3) Animate param traveling into Function1’s parentheses
      setTimeout(() => {
        const endParamX = func.offsetLeft + 150;  // roughly over the '(' inside func box
        const endParamY = func.offsetTop +5;
        param.style.left = endParamX + 'px';
        param.style.top  = endParamY + 'px';
      }, 200);



      // 4) Arrow follows shortly after
      setTimeout(() => {
        arrow.style.left = (func.offsetLeft - 30) + 'px';
      }, 600);

      // 3b) Animate param traveling into Function1’s parentheses
      setTimeout(() => {
        numArg.textContent  = '42';
        nameArg.textContent = '"Alice"';
      }, 800);

      // 5) When param arrives, “consume” it into Function1
      setTimeout(() => {
        param.style.opacity = 0;
        log.textContent     = 'Function1 is processing…';
      }, 1400);

      // 6) After a pause, prepare return value bubble at func
      setTimeout(() => {
        result.textContent   = '6';
        result.style.left    = (func.offsetLeft + func.offsetWidth - 20) + 'px';
        result.style.top     = (func.offsetTop - 20) + 'px';
        result.style.opacity = 1;
        log.textContent      = 'Function1 returns 6';
        arrow.textContent    = '⟵';
      }, 2000);

      // 7) Animate result traveling back toward Main
      setTimeout(() => {
        const returnX = main.offsetLeft + main.offsetWidth;
        result.style.left = 3.8 + 'em';
        result.style.top = 5 +'em';
        arrow.style.left  = returnX + 'px';
      }, 2200);

      // 8) Hide arrow & result, finish log
      setTimeout(() => {
        arrow.style.opacity  = 0;
        result.style.opacity = 0;
        result.style.left    = (func.offsetLeft + func.offsetWidth - 20) + 'px';
        arrow.textContent    = '➔'; // reset arrow

        numArg.textContent  = 'int a';
        nameArg.textContent = 'string name';
        log.textContent      = 'Main() received result 6';

        arrow.style.left   = startX + 'px';
        
        param.style.left   = main.offsetLeft + main.offsetWidth + 'px';
        param.style.top    = (main.offsetTop - 50) + 'px';

      }, 4200);
    });
  </script>