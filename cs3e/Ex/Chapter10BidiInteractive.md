---
layout: page
title: "פרק 10 - תרגול מערך דו-ממדי"
subtitle: "תרגול ראשוני אינטראקטיבי. קרדיט דפנה ל.ר"
author: גיא סידס
lang: he
tags: 2d-array, interactive,מערך דו-ממדי,אינטרקטיבי, game
---

<div class="interactive-container" id="logic-painter-container">

    <p>תפקידך לסמן את כל המשבצות שמקיימות את התנאי!</p>

    <div class="logic-toast" id="logic-painter-toast" aria-live="polite"></div>

    <div class="code-box" id="logic-painter-code">
        Loading...
    </div>

    <div class="game-area">
        
        <div class="axis-label axis-label-col">
            col (עמודה) &rarr;
        </div>

        <div class="header-numbers col-numbers">
            <div>0</div><div>1</div><div>2</div><div>3</div><div>4</div>
        </div>

        <div class="axis-label axis-label-row">
             &larr; row (שורה)
        </div>

        <div class="header-numbers row-numbers">
            <div>0</div><div>1</div><div>2</div><div>3</div><div>4</div>
        </div>

        <div class="grid-container" id="logic-painter-grid"></div>
    </div>

    <button class="btn" onclick="checkSolution()">בדוק תשובה</button>
    <div id="logic-painter-message"></div>

</div>

<script src="/assets/js/logic-painter.js"></script>
