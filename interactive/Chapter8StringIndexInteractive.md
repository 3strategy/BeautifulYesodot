---
layout: page
title: "משחק מחרוזות: מגדל האינדקסים"
subtitle: "תרגול אינטראקטיבי ראשון ב־string[index], Length, וגבולות"
author: גיא סידס
lang: he
tags: [משחק, משחקים, אינטראקטיבי, אינטרקטיבי, אינטקרטיבי, interactive, game, C#, csharp, string, מחרוזת, מחרוזות, אינדקס, מערך, מערכים]
---

{: .box-note}
מטרת המשחק היא לבנות אינטואיציה של גישה ישירה לפי אינדקס: `s[i]`, `s.Length`, האינדקס האחרון, ומה קורה כשחורגים מהגבול. אין כאן שימוש ב־`IndexOf`, `Contains` או `Substring`.

<link rel="stylesheet" href="{{ '/assets/css/index-intuition-games.css' | relative_url }}">

<div class="index-game" id="string-index-game" data-game="strings">
    <div class="index-game__topbar">
        <h2 class="index-game__title">מגדל האינדקסים: מחרוזות</h2>
        <div class="index-game__score" data-role="score">שלב 1</div>
    </div>

    <div class="index-game__layout">
        <section class="index-game__stage" aria-label="לוח המשחק">
            <div class="index-game__story" data-role="story"></div>
            <div class="index-game__visual" data-role="visual"></div>
            <div class="index-game__feedback" data-role="message" aria-live="polite"></div>
        </section>

        <section class="index-game__mission" aria-label="משימה וקוד">
            <div class="index-game__task" data-role="task"></div>
            <pre class="index-game__code"><code data-role="code"></code></pre>
            <div class="index-game__choices" data-role="choices"></div>
            <div class="index-game__controls">
                <button class="index-game__btn" type="button" data-action="prev">הקודם</button>
                <button class="index-game__btn index-game__btn--primary" type="button" data-action="check">בדיקה</button>
                <button class="index-game__btn" type="button" data-action="next">הבא</button>
                <button class="index-game__btn" type="button" data-action="reset">איפוס</button>
            </div>
        </section>
    </div>
</div>

<div markdown="1" class="box-success">

עמוד ההמשך למערכים: [משחק מערכים: רציף האינדקסים]({{ '/interactive/Chapter9ArrayIndexInteractive' | relative_url }})

</div>

<details markdown="1"><summary>למורה: מה המשחק מדגיש</summary>

- אינדקס מתחיל ב־0.
- `s.Length` הוא מספר התווים, ולכן `s[s.Length]` חורג.
- האינדקס האחרון הוא `s.Length - 1`.
- מחרוזת מאפשרת קריאה לפי אינדקס, אבל לא השמה לתוך תו.
- מציאת תווים בלי `IndexOf` היא מעבר אינדקסים ובדיקה של `s[i]`.

</details>

<script src="{{ '/assets/js/index-intuition-games.js' | relative_url }}"></script>
