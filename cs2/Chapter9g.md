---
layout: page
title: "פרק 9 מערך חד ממדי"
subtitle: "משתנים הבנויים כאוסף"
author: גיא סידס
tags: [מערך, מערכים, חד ממדי]
mathjax: true
lang: he
---

<head>
<script defer>

document.addEventListener('DOMContentLoaded', () => {
  // 1️⃣ collect the rendered <pre> blocks inside every <details>
  const steps = [...document.querySelectorAll('details')] 
                 .map(d => d.querySelector('pre').cloneNode(true));

  // 2️⃣ prepare stage with two <pre> elements for cross‑fade
  const stage = document.getElementById('stage');
  let fg = stage.appendChild(steps[0]);
  fg.classList.add('fg');
  let bg = stage.appendChild(fg.cloneNode(true));
  bg.classList.add('bg');

  let idx = 0;
  setInterval(() => {
    // swap roles
    [fg, bg] = [bg, fg];
    fg.classList.replace('bg', 'fg');
    bg.classList.replace('fg', 'bg');

    // load next snippet into the background element
    idx = (idx + 1) % steps.length;
    bg.innerHTML = steps[idx].innerHTML;
  }, 2500); // 2.5 s per frame
});
</script>
</head>


{% raw %}

```csharp
static void Main(string[] args)
{
    string car = "BMW";

    Console.WriteLine(car);
}
```

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };

    Console.WriteLine(cars.Length);
}
```

{% endraw %}

## Display stage


<div id="stage"></div>



