---
layout: page
title: "פרק 9 מערך חד ממדי"
subtitle: "משתנים הבנויים כאוסף"
author: גיא סידס
tags: [מערך, מערכים, חד ממדי]
mathjax: true
lang: he
---

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
  margin-bottom: 1em;
  text-align: center;
}
#explanation {
  margin: 1em 0 2em 0;
  min-height: 2em;
  font-weight: bold;
  text-align: center;
}
.copy-success {
  color: green;
  font-size: 0.9em;
  margin-right: 1em;
  display: inline-block;
  vertical-align: middle;
}
</style>





<details markdown="1"><summary>להוסיף מה הולכים לעשות כאן</summary>

```csharp
static void Main(string[] args)
{
    string   car  =   "BMW";

    Console.WriteLine(car);
}
```
</details>

<details markdown="1"><summary>להוסיף מה הולכים לעשות כאן</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };

    Console.WriteLine(cars); // ⟹  System.String[]
}
```



</details>

<details markdown="1"><summary>להוסיף מה הולכים לעשות כאן</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };

    Console.WriteLine(cars[0]);
}
```
</details>


<details markdown="1"><summary>להוסיף מה הולכים לעשות כאן</summary>

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



<details markdown="1"><summary>להוסיף מה הולכים לעשות כאן</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };
    try
    {
        Console.WriteLine(cars[0]);
        Console.WriteLine(cars[1]);
        Console.WriteLine(cars[2]);
        Console.WriteLine(cars[3]); //index out of range exception
    
    }
    catch (Exception e)
    {
        Console.WriteLine($"we had aproblem: {e.Message}");
    }
}
```
</details>


<details markdown="1"><summary>להוסיף מה הולכים לעשות כאן</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };
    
    for (int i = 0; i < cars.Length; i++)
        Console.WriteLine(cars[i]);
}
```
</details>



<details markdown="1"><summary>להוסיף מה הולכים לעשות כאן</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" }; //direct instanciation

    foreach (string car in cars)
        Console.WriteLine(car); // הרבה יותר פשוט
}
```
</details>



<details markdown="1"><summary>להוסיף מה הולכים לעשות כאן</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = new string[5]; // איתחול לגודל 5
    
    for (int i = 0; i < cars.Length; i++)
    {
        cars[i] = "BMW" + i;
        Console.WriteLine(cars[i]);
    }
}
```
</details>



<details markdown="1"><summary>להוסיף מה הולכים לעשות כאן</summary>

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

<details markdown="1"><summary>להוסיף מה הולכים לעשות כאן</summary>

```csharp
static void Main(string[] args)
{
    int[] nums = { 3,2,1 };
    Add10(nums);
    PrintArr(nums); // prints 13  12  11
    PrintArr(["bus", "bug", "beer", "bear"]); //instanciation in a call with [ ] 
}
public static void Add10(int[] arr)
{
    for (int i = 0; i < arr.Length; i++)
        arr[i] += 10;
}
static void PrintArr<T>(T[] arr)
{
    foreach (var item in arr)
        Console.Write($" {item} ");
    Console.WriteLine();
}
```
</details>


<details markdown="1"><summary>להוסיף מה הולכים לעשות כאן</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = new string[5];
    Console.Write(cars[0].Length); // Null Reference Exception
    cars[0] = cars[0] + "wow";

}
```
</details>


<details markdown="1"><summary>להוסיף מה הולכים לעשות כאן</summary>

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
  // Extract summaries and codes:
  const blocks = [...document.querySelectorAll('details')].map(d => {
      return {
        summary: d.querySelector('summary').textContent,
        codeEl: d.querySelector('pre').cloneNode(true)
      };
  });
  const stage = document.getElementById('stage');
  const explanation = document.getElementById('explanation');
  const copyBtn = document.getElementById('copyBtn');
  const copyStatus = document.getElementById('copyStatus');
  let idx = 0;

  // Initial display
  let current = stage.appendChild(blocks[0].codeEl.cloneNode(true));
  current.classList.add('show');
  explanation.textContent = blocks[0].summary;

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
      explanation.textContent = blocks[toIdx].summary;
    }, 3000);
  }

  // Button handlers
  document.getElementById('nextBtn').onclick = () =>
    crossfade((idx + 1) % blocks.length);
  document.getElementById('prevBtn').onclick = () =>
    crossfade((idx + blocks.length - 1) % blocks.length);

  // Mouse click on stage (not buttons)
  stage.addEventListener('mousedown', e => {
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

  // Copy button handler
  copyBtn.onclick = () => {
    // Find and copy code from currently displayed <pre>
    const code = current.textContent;
    // Use Clipboard API if available
    navigator.clipboard.writeText(code).then(() => {
      copyStatus.style.display = 'inline-block';
      setTimeout(() => { copyStatus.style.display = 'none'; }, 1200);
    });
  };
});
</script>


---

## תרגול

[⬅ עברו לתרגול 9.1 - מערך חד ממדי](/cs2/Chapter9Ex9.1)