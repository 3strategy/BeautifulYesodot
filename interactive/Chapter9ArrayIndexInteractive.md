---
layout: page
title: "משחק מערכים: רציף האינדקסים"
subtitle: "תרגול אינטראקטיבי ראשון במערך חד־ממדי, כתיבה לפי אינדקס, ו־for/foreach"
author: גיא סידס
lang: he
tags: [משחק, משחקים, אינטראקטיבי, אינטרקטיבי, אינטקרטיבי, interactive, game, C#, csharp, array, arrays, מערך, מערכים, חד ממדי, אינדקס, foreach, for, מחרוזות]
---

{: .box-note}
המשחק ממשיך את אותה אינטואיציה מפרק המחרוזות: קוראים וכותבים לפי מיקום. במערך אפשר גם לבצע השמה לתא, ובמערך של מחרוזות אפשר לפגוש ביטויים כמו `cars[0][1]`.

<link rel="stylesheet" href="{{ '/assets/css/index-intuition-games.css' | relative_url }}">

<div class="index-game" id="array-index-game" data-game="arrays">
    <div class="index-game__topbar">
        <h2 class="index-game__title">רציף האינדקסים: מערכים חד־ממדיים</h2>
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

עמוד ההכנה למחרוזות: [משחק מחרוזות: מגדל האינדקסים]({{ '/interactive/Chapter8StringIndexInteractive' | relative_url }})

</div>

<details markdown="1"><summary>למורה: מה המשחק מדגיש</summary>

- `arr[i]` הוא תא במערך, בדיוק לפי מיקום.
- במערך ניתן לבצע השמה: `arr[i] = value`.
- `arr[arr.Length]` חורג, כי האינדקס האחרון הוא `arr.Length - 1`.
- `cars[0][1]` נקרא בשני צעדים: קודם איבר במערך, אחר כך תו במחרוזת.
- `for` מתאים כשצריך אינדקס או כתיבה לתאים. `foreach` נוח כשצריך לעבור על הערכים בלבד.

</details>

<script src="{{ '/assets/js/index-intuition-games.js' | relative_url }}"></script>
