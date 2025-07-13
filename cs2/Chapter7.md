---
layout: page
title: "פרק 7 - פונקציות מקוצר"
subtitle: "פישוט מבני הקוד בעזרת פעולות חוזרות"
author: גיא סידס
lang: he
---

<head>
  <style>
    #anim-container {
    position: relative;    /* make this the coordinate system for everything inside */
    min-height: 400px; 
    }
    .box {
      width: 250px;
      height: 140px;
      border: 2px solid #333;
      border-radius: 6px;
      text-align: center;
      line-height: 60px;
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
      font-size: 0.9rem;
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

{: .box-note}
**הערה:** חלק מהמורים מלמדים פונקציות מוקדם יותר – כבר לאחר לולאת `for` ולפני לולאת `while` או אפילו לפני `for`. עם זאת, בסילבוס זה הוחלט ללמד פונקציות רק לאחר לולאות `for`, `while` ולולאות מקוננות, כחלק משלב חשיבה אלגוריתמי מתקדם. אומנם אישית אני ממליץ ללמד פונקציות מוקדם יותר, אך נתיישר עם הסילבוס ונציג את הפרק בהמשך לפרק 6.

## 7.1 פונקציות ללא פרמטרים

פונקציה ללא פרמטרים (void) היא פונקציה שקוראים לה מתוך `Main` כדי לבצע משימה מובחנת ואינה מקבלת קלט חיצוני.

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

### דוגמאות נוספות

<details open markdown="1"><summary>הדפסת סכום המספרים הזוגיים מ-1 עד 100</summary>

```csharp
public static void SumEven100()
{
    int sum = 0;
    for (int num = 1; num <= 100; num++)
        if (num % 2 == 0)
            sum += num;
    Console.WriteLine($"Sum of even numbers 1-100 is {sum}");
}
```
</details>

---

<details open markdown="1"><summary>תרשים זרימה של קריאה ל-3 פונקציות</summary>

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

</details>



## 7.2 פונקציות עם פרמטרים

כדי להפוך פונקציה גמישה, נגדיר לה *פרמטרים* – משתנים שקובעים את התנהגותה בקריאה.

{% highlight csharp linenos %}
public static void PrintStars(int length)
{
    for (int i = 0; i < length; i++)
        Console.Write("*");
    Console.WriteLine();
}

public static void Main()
{
    PrintStars(5);   // *****
    PrintStars(10);  // **********
    PrintStars(3);   // ***
}
{% endhighlight %}

### דוגמאות נוספות

<details markdown="1"><summary>PrintRectangle(rows, cols)</summary>

```csharp
public static void PrintRectangle(int rows, int cols)
{
    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < cols; j++)
            Console.Write("*");
        Console.WriteLine();
    }
}
```
</details>

<details markdown="1"><summary>SayHello(string userName)</summary>

```csharp
public static void SayHello(string userName)
{
    Console.WriteLine($"שלום, {userName}!");
}
```

</details>


---


<details open markdown="1"><summary>אנימציה: העברת פרמטרים לפונקציה</summary>

<div id="anim-container">

  <div id="main" class="box">Main(int[] args)
  &lbrace;
  &nbsp;&nbsp;Function1(42,"alice");
  &rbrace;</div>
  <div id="func" class="box">
    Function1(<span id="num">int a</span>, <span id="name">string name</span>)
  </div>

  <div id="arrow">➔</div>
  <div id="param" class="bubble">( … )</div>
  <div id="result" class="bubble">…</div>

  <div id="log">Click “Start” to see the call.</div>
  <button id="start">Start Animation</button>




</div>

</details>


### סיכום הביניים

בפרקים 7.1–7.2 למדנו להגדיר פונקציות מסוג `void` ללא פרמטרים ועם פרמטרים. בפונקציות אלה ניתן לאגד קוד חוזר, לשפר קריאות ולהפוך את הקוד לגמיש יותר. בפונקציות הבאות (פרק 7.3) נלמד על פונקציות שמחזירות ערך (`return`), כולל טיפוסי ערך בסיסיים ובוליאני.

<script>
    const main   = document.getElementById('main');
    const func   = document.getElementById('func');
    const arrow  = document.getElementById('arrow');
    const log    = document.getElementById('log');
    const numArg = document.getElementById('num');
    const nameArg= document.getElementById('name');
    const btn    = document.getElementById('start');

    btn.addEventListener('click', () => {
      // 1) Prepare arguments and log
      numArg.textContent  = '42';
      nameArg.textContent = '"Alice"';
      log.textContent     = 'Main() calls Function1(42, "Alice")';

      // 2) Position arrow at the edge of Main
      arrow.style.opacity = 1;
      arrow.style.left    = (main.offsetLeft + main.offsetWidth) + 'px';

      // 3) Animate call: arrow moves to Function1
      setTimeout(() => {
        arrow.style.left = (func.offsetLeft - 30) + 'px';
      }, 100);

      // 4) While arrow is moving, show “working” message
      setTimeout(() => {
        log.textContent = 'Function1 is doing stuff…';
      }, 1200);

      // 5) After “work” is done, animate return
      setTimeout(() => {
        log.textContent = 'Function1 returns "Result" to Main()';
        // small back-arrow effect
        arrow.textContent = '⟵';
        arrow.style.left  = (func.offsetLeft + func.offsetWidth - 20) + 'px';
      }, 2500);

      // 6) Move arrow back to Main
      setTimeout(() => {
        arrow.style.left  = (main.offsetLeft + main.offsetWidth) + 'px';
      }, 2600);

      // 7) Fade arrow out and show final state
      setTimeout(() => {
        arrow.style.opacity = 0;
        log.textContent     = 'Main() received result "Result"';
        arrow.textContent   = '➔'; // reset arrow direction
      }, 3800);
    });
</script>