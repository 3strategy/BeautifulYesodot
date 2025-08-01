---
layout: page
title: "פרק 9 מערך חד ממדי"
subtitle: "משתנים הבנויים כאוסף"
author: גיא סידס
tags: [מערך, מערכים, חד ממדי, Ternary operator, foreach]
mathjax: true
lang: he
---

<!-- https://www.perplexity.ai/search/this-page-goes-to-github-pages-z3w2NJR4SHqGVk14l89Rmw -->
<style>
details, details > summary { display: none; }
#stage {
  position: relative;
  min-height: 25em;
  width: 100%;
}
#stage pre {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  opacity: 0;
  transition: opacity 3s;
  z-index: 1;
  direction: ltr;
  background: inherit;
  margin: 0;
}
#stage pre.show {
  opacity: 1;
  z-index: 2;
}
.button-container {
  margin-top: 0em;
  margin-bottom: 2em;
  display: flex;
  justify-content: flex-start;
  gap: 0.4em;
}
#explanation {
  text-align: center;
  font-weight: bold;
  font-size: 1em;
  min-height: 1em;
  margin-bottom: -3.1em;
  margin-top: 0;
}
.copy-success {
  color: green;
  font-size: 0.9em;
  margin-right: 1em;
  display: inline-block;
  vertical-align: middle;
}
</style>




<details markdown="1"><summary>1. נניח שנרצה להפוך את car **לאוסף של מחרוזות**</summary>

```csharp
static void Main(string[] args)
{
    string   car  =   "BMW";

    Console.WriteLine(car);
}
```
</details>

<details markdown="1"><summary>2. הוספנו: סוגריים **מסולסלים**, לשון **רבים**, וסוגריים **מרובעים**, </summary>

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };

    Console.WriteLine(cars); // ⟹😟לא כמו פייתון. לא ממש עוזר System.String[] מדפיס
}
```



</details>

<details markdown="1"><summary>3. ניתן לגשת לאיבר במערך **לפי מיקום**</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };

    Console.WriteLine(cars[0]); // prints BMW, מתנהג כמו במחרוזת
    Console.WriteLine(cars[0][1]); // ??? ומה זה ידפיס
}
```
</details>


<details markdown="1"><summary>4. כאן כבר יש לנו **בעיה**</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };


        Console.WriteLine(cars[0]);
        Console.WriteLine(cars[1]);
        Console.WriteLine(cars[2]);
        Console.WriteLine(cars[3]); //index out of range exception
        // Program WILL CRUSH 
        Console.ReadLine();




}
```
</details>



<details markdown="1"><summary>5. אפשר לטפל במצבי **Exception**</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };
    try
    {
        Console.WriteLine(cars[0]);
        Console.WriteLine(cars[1]);
        Console.WriteLine(cars[2]);
        Console.WriteLine(cars[3]); // 😥Index Out of Range exception😥
    
    }
    catch (Exception e)
    {
        Console.WriteLine($"we had aproblem: {e.Message}");
    }
}
```
</details>


<details markdown="1"><summary>6. ניעזר בלולאות כדי **לעבור על כל איברי המערך**, אבל,</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = [ "BMW", "Ford", "Kia" ]; // 🤔 ??? {מסולסלים} לא היו קודם סוגריים 😲
    
    for (int i = 0; i < cars.Length; i++)
        Console.WriteLine(cars[i]); // 👮 i גישה ישירה לאיבר באינדקס
}
```
</details>



<details markdown="1"><summary>7. **foreach יותר נוח** בהרבה מקרים</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" }; //inline initialization

    foreach (string car in cars) 🐭
        Console.WriteLine(car); // הרבה יותר פשוט
}
```
</details>



<details markdown="1"><summary>8. כאן מקצים מערך בגודל מסויים וזה **סוף פסוק**</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = new string[5]; // איתחול לגודל 5.  לא יורשה לשנות את הגודל בהמשך
                                  // ולכן בהמשך הדרך בפרוייקטים נעבוד עם מבנים אחרים
                                 // אסור בשימוש Array.Resize(ref cars, 10); אסור בשימוש
    for (int i = 0; i < cars.Length; i++)
    {
        cars[i] = "BMW" + i;
        Console.WriteLine(cars[i]);
    }
}
```
</details>



<details markdown="1"><summary>9. הבדל **חשוב** בין סוגי הלולאות - **לא ניתן לבצע השמה ב-foreach**</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = new string[5]; // מקצה מערך בגודל 5

    foreach (string car in cars) 
        car = "BMW"; // ===== !!! השמה - לא אפשרית  ======
        // ועדיין, נח ושימושי כשעובדים עם עצמים
}
```
</details>

<details markdown="1"><summary>10. אפשר **לשלוח מערך כארגומנט** לפונקציה.</summary>

```csharp
static void Main(string[] args)
{
    int[] nums = { 3,2,1 };
    Add10(nums);
    PrintArr(nums); // prints 13  12  11
    PrintArr(["bus", "bug", "beer", "bear"]); //instanciation in a call with [ ] ???
}
public static void Add10(int[] arr)
{
    for (int i = 0; i < arr.Length; i++)
        arr[i] += 10;
}
static void PrintArr<T>(T[] arr) // מה נסגר עם הפונקציות הגנריות האלה?
{
    foreach (var item in arr)
        Console.Write($" {item} ");
    Console.WriteLine();
}
```
</details>


<details markdown="1"><summary>11. המערך **מאותחל ל-nulls** או לאפסים או ל-false בהתאם לטיפוס</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = new string[5];  // אז לא יודפס כלום null אפשר להדפיס את איברי המערך. הם כולם
    //=== = "" קיימת דרישה בבחינות לבצע לולאת איתחול שמאפסת את אברי המערך. או במקרה זה מגדירה את כולם ===
    //=== מאד לא סביר ומתנגש עם העבודה עם עצמים בהמשך === אמשיך לברר לכם את הנקודה 
    Console.Write(cars[0].Length); // Null Reference Exception אבל לא ניתן לגשת לתכונה כשאין עדין עצם
    cars[0] = cars[0] + "wow";    // null ובכל זאת ניתן לשרשר מחרוזת עם 

}
```
</details>


<details markdown="1"><summary>12. בואו ננסה להבין, **מה זה object reference**</summary>

```csharp
static void Main(string[] args)
{
    char[] chars = ['h', 'e', 'l', 'l', 'o'];
    PrintArr(chars); //        h  e  l  l  o
    WillItChange_יתשנה_או_לא(chars);
    PrintArr(chars); // Stays  h  e  l  l  o
}

static void WillItChange_יתשנה_או_לא(char[] arr)
{
    arr = ['h', 'e', 'l', 'l', '_', 'N', 'o'];
}

```
</details>

<details markdown="1"><summary>13. דוגמא עם ternary operator</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = ["BMW", "Ford", "Kia" ,"T"]; // 🤔 ??? {מסולסלים} לא היו קודם סוגריים 😲

    for (int i = 0; i < cars.Length; i++)
    {
        //ternary operator
        Console.WriteLine($"{cars[i]} is " +
            $"{cars[i].Length} meter{(cars[i].Length>1 ? "s" : "")} long"); // 👮 i גישה ישירה לאיבר באינדקס
    }
        
}

```
</details>


<details markdown="1"><summary>14. דוגמא עם ternary operator with higher perf</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = ["BMW", "Ford", "Kia" ,"T"]; // 🤔 ??? {מסולסלים} לא היו קודם סוגריים 😲

    for (int i = 0; i < cars.Length; i++)
    {
        //ternary operator
        string c = cars[i]; // 👮 i גישה ישירה לאיבר באינדקס
        string sOrNos = c.Length > 1 ? "s" : ""; // Ternary
        Console.WriteLine($"{c} is {c.Length} meter{sOrNos} long"); // 👮 i גישה ישירה לאיבר באינדקס
    }     
}

```
</details>


<details markdown="1"><summary>15. דוגמא עם ternary operator in a foreach</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = ["BMW", "Ford", "Kia" ,"T"]; 

    foreach (var c in cars)
    {
        string sOrNos = c.Length > 1 ? "s" : ""; // Ternary
        Console.WriteLine($"{c} is {c.Length} meter{sOrNos} long"); 
    }      
}
```
</details>


 <!-- this is the actual page that is displayed -->
<!-- =============================================== -->
<div class="button-container">
  <button id="prevBtn">הקודם</button>
  <button id="nextBtn">הבא</button>
  <button id="copyBtn">העתק קוד</button>
  <span id="copyStatus" class="copy-success" style="display:none;">הועתק!</span>
</div>
<div id="explanation"></div>
<div id="stage"></div>




<script defer>
document.addEventListener('DOMContentLoaded', () => {
  // Extract code blocks and processed summaries (markdown-style bold to <strong>)
  const blocks = [...document.querySelectorAll('details')].map(d => ({
    codeEl: d.querySelector('pre').cloneNode(true),
    // Allows using **bold** in summary
    summary: d.querySelector('summary').innerHTML.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  }));
  const stage = document.getElementById('stage');
  const explanation = document.getElementById('explanation');
  const copyBtn = document.getElementById('copyBtn');
  const copyStatus = document.getElementById('copyStatus');
  let idx = 0;

  // Initial code block display
  let current = stage.appendChild(blocks[0].codeEl.cloneNode(true));
  current.classList.add('show');
  if(explanation) explanation.innerHTML = blocks[0].summary;

  function crossfade(toIdx) {
    if (toIdx === idx) return;
    const next = stage.appendChild(blocks[toIdx].codeEl.cloneNode(true));
    next.classList.add('show');
    next.style.opacity = 0;
    next.getBoundingClientRect(); // force reflow
    next.style.opacity = 1;
    current.style.opacity = 0;
    setTimeout(() => {
      current.remove();
      current = next;
      idx = toIdx;
      if(explanation) explanation.innerHTML = blocks[toIdx].summary;
    }, 3000); // 3s transition
  }

  // Buttons (ensure these elements exist before binding)
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  if(nextBtn) nextBtn.onclick = () => crossfade((idx + 1) % blocks.length);
  if(prevBtn) prevBtn.onclick = () => crossfade((idx + blocks.length - 1) % blocks.length);

  // Mouse click on stage (not buttons!)
  stage.addEventListener('mousedown', e => {
    // Only respond if not clicking on code selection or non-left/right button
    if (e.button === 0) { // Left
      crossfade((idx + 1) % blocks.length);
      e.preventDefault();
    }
    if (e.button === 2) { // Right
      crossfade((idx + blocks.length - 1) % blocks.length);
      e.preventDefault();
    }
  });
  stage.addEventListener('contextmenu', e => e.preventDefault());

  // Copy button
  if(copyBtn) copyBtn.onclick = () => {
    const code = current.textContent;
    navigator.clipboard.writeText(code).then(() => {
      if(copyStatus) {
        copyStatus.style.display = 'inline-block';
        setTimeout(() => { copyStatus.style.display = 'none'; }, 1200);
      }
    });
  };
});
</script>

---

## המשך למידה
[⬅ עברו לפרק 9a - גרסת ללא אנימציות](/cs2/Chapter9a)


[⬅ עברו לפרק 9b - הערות והרחבות](/cs2/Chapter9b)

[⬅ עברו לפרק 9c - מערך מונים וצוברים](/cs2/Chapter9c)


## תרגול

[⬅ עברו לרשימת שקפי תרגול במערכים במצגת קמפוס]({% link cs2/Chapter9b.md %}#campus-arr-excercises)

[⬅ עברו לתרגול 9.1 - מערך חד ממדי](/cs2/Chapter9Ex9.1)

[⬅ עברו לתרגול 9.2 - מערכים - שאלות ב- CodeWars](/cs2/Chapter9Ex9.2)



## סרטונים

[סרטוני פרק 9: מערכים](https://www.youtube.com/playlist?list=PLnVUJu2KuoA2cT3X-Fui7j6HZJWZM6vnK){:target="_blank"}

[פלייליסט השתלמות חלק ב](https://www.youtube.com/playlist?list=PLnVUJu2KuoA0igr7xHclrzS2O7bBaqg2S){:target="_blank"}