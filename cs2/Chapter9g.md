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
  min-height: 27em;
  width: 100%;
}
#stage pre {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  margin: 0;
  opacity: 0;
  transition: opacity 3s;
  z-index: 1;
  direction: ltr;
  background: inherit;
}
#stage pre.show {
  opacity: 1;
  z-index: 2;
}
</style>






<details markdown="1"><summary></summary>

```csharp
static void Main(string[] args)
{
    string car = "BMW";

    Console.WriteLine(car);
}
```
</details>

<details markdown="1"><summary></summary>

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };

    Console.WriteLine(cars);
}
```
פלט
```
System.String[]
```


</details>

<details markdown="1"><summary></summary>

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };

    Console.WriteLine(cars[0]);
}
```
פלט
```
BMW
```
</details>


<details markdown="1"><summary></summary>

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };


        Console.WriteLine(cars[0]);
        Console.WriteLine(cars[1]);
        Console.WriteLine(cars[2]);
        Console.WriteLine(cars[3]); //index out of range exception
        Console.ReadLine();


}
```
</details>



<details markdown="1"><summary></summary>

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


<details markdown="1"><summary></summary>

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };
    
    for (int i = 0; i < cars.Length; i++)
        Console.WriteLine(cars[i]);
}
```
</details>



<details markdown="1"><summary></summary>

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };

    foreach (string car in cars)
        Console.WriteLine(car); // הרבה יותר פשוט
}
```
</details>



<details markdown="1"><summary></summary>

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



<details markdown="1"><summary></summary>

```csharp
static void Main(string[] args)
{
    string[] cars = new string[5];

    foreach (string car in cars) 
        car = "BMW"; // ===== השמה - לא אפשרית  ======
}
```
</details>





<div id="stage"></div>
<div style="margin-bottom:2em;">
  <button id="prevBtn">הקודם</button>
  <button id="nextBtn">הבא</button>
</div>



<script defer>
document.addEventListener('DOMContentLoaded', () => {
  const steps = [...document.querySelectorAll('details')].map(
    d => d.querySelector('pre').cloneNode(true)
  );
  const stage = document.getElementById('stage');
  let idx = 0;
  let current = stage.appendChild(steps[0].cloneNode(true));
  current.classList.add('show');

  function crossfade(toIdx) {
    if (toIdx === idx) return;
    const next = stage.appendChild(steps[toIdx].cloneNode(true));
    next.classList.add('show');
    next.style.opacity = 0; // start hidden

    // Force style reflow for transition to work reliably
    next.getBoundingClientRect();
    
    // Start both transitions
    next.style.opacity = 1;
    current.style.opacity = 0;

    setTimeout(() => {
      current.remove();
      current = next;
      idx = toIdx;
    }, 800); // matches transition duration
  }
  
  document.getElementById('nextBtn').onclick = () =>
    crossfade((idx + 1) % steps.length);

  document.getElementById('prevBtn').onclick = () =>
    crossfade((idx + steps.length - 1) % steps.length);
});
</script>

