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
/* Hide details/summary so only the stage is visible */
details,
details > summary {
  display: none;
}
/* Stage and animation styles */
#stage {
  position: relative;
  width: 100%;
  min-height: 80px;
  margin-bottom: 1em;
}
#stage pre {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  margin: 0;
  opacity: 0;
  transition: opacity 0.7s;
  pointer-events: none;
  direction: ltr;
}
#stage pre.fg {
  opacity: 1;
  pointer-events: auto;
  z-index: 2;
}
#stage pre.bg {
  z-index: 1;
}
</style>






<details markdown="1"><summary>p</summary>

```csharp
static void Main(string[] args)
{
    string car = "BMW";

    Console.WriteLine(car);
}
```
</details>

<details  markdown="1"><summary>p</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };

    Console.WriteLine(cars.Length);
}
```
</details>



## Display stage


<div id="stage"></div>
<div style="margin-bottom:2em;">
  <button id="prevBtn">הקודם</button>
  <button id="nextBtn">הבא</button>
</div>



<script defer>
document.addEventListener('DOMContentLoaded', () => {
  // 1️⃣ Collect <pre> blocks from <details>
  const steps = [...document.querySelectorAll('details')]
    .map(d => d.querySelector('pre').cloneNode(true));
  const stage = document.getElementById('stage');
  let idx = 0;
  let fg = stage.appendChild(steps[0].cloneNode(true));
  fg.classList.add('fg');

  function showStep(newIdx) {
    if (newIdx === idx) return;
    const bg = stage.appendChild(steps[newIdx].cloneNode(true));
    bg.classList.add('bg');
    setTimeout(() => {
      fg.classList.remove('fg');
      fg.classList.add('bg');
      bg.classList.remove('bg');
      bg.classList.add('fg');
      fg.remove();
      fg = bg;
      idx = newIdx;
    }, 700); // matches CSS transition duration
  }

  document.getElementById('nextBtn').onclick = () =>
    showStep((idx + 1) % steps.length);

  document.getElementById('prevBtn').onclick = () =>
    showStep((idx + steps.length - 1) % steps.length);
});
</script>

