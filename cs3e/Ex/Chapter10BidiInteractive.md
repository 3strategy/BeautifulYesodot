---
layout: page
title: "פרק 10 - תרגול מערך דו-ממדי"
subtitle: "תרגול ראשוני אינטראקטיבי. קרדיט דפנה ל.ר"
author: גיא סידס
lang: he
tags: 2d-array, interactive,מערך דו-ממדי,אינטרקטיבי, game
---

<style>
    .interactive-container {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        --accent-col: var(--link-col);
        --muted-col: var(--code-comments-col);
        --panel-col: var(--backn-col);
        --panel-border-col: var(--navbar-border-col);
        --danger-col: var(--backe-col);
        --success-col: var(--backs-col);

        background-color: var(--page-col);
        color: var(--text-col);
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 80vh;
        margin: 0;
        border-radius: 8px;
        padding: 20px;
        direction: rtl; /* Ensure base direction is RTL for Hebrew text */
    }

    .interactive-container h1 { margin: 5px 0; color: var(--accent-col); font-size: 2em; }
    .interactive-container p { margin-bottom: 10px; font-size: 1.1em; color: var(--muted-col); }

    .interactive-container .code-box {
        background-color: var(--code-back-col);
        border: 2px solid var(--accent-col);
        padding: 10px 25px;
        border-radius: 8px;
        font-family: 'Courier New', Courier, monospace;
        font-size: 1.4em;
        margin-bottom: 15px;
        direction: ltr; /* Code is always LTR */
        box-shadow: 0 5px 15px rgba(0,0,0,0.35);
    }

    .interactive-container .variable { color: var(--code-met-col); }
    .interactive-container .operator { color: var(--code-types-col); }
    .interactive-container .number { color: var(--code-numbers-col); }

    /* --- אזור המשחק --- */
    .interactive-container .game-area {
        display: grid;
        /* שינוי מרכזי: הגדלתי את העמודה והשורה הראשונות ל-80px כדי ליצור מרווח */
        grid-template-columns: 80px auto; 
        grid-template-rows: 80px auto;    
        direction: ltr; 
        gap: 5px;
    }

    /* עיצוב כותרות הצירים */
    .interactive-container .axis-label {
        color: var(--code-met-col); /* צהוב-זהב */
        font-size: 1.6em; /* הגדלה משמעותית של הפונט */
        font-weight: bold;
        font-family: monospace;
        text-shadow: 0px 1px 2px rgba(0,0,0,0.35);
    }

    .interactive-container .axis-label-col {
        grid-column: 2;
        grid-row: 1;
        align-self: start; /* מצמיד למעלה רחוק מהמספרים */
        text-align: center;
        margin-top: 5px;   /* קצת רווח מהגבול העליון */
    }

    .interactive-container .axis-label-row {
        grid-column: 1;
        grid-row: 2;
        justify-self: start; /* מצמיד שמאלה רחוק מהמספרים */
        display: flex;
        align-items: center;
        justify-content: center;
        writing-mode: vertical-lr;
        transform: rotate(180deg);
        margin-left: 5px; /* קצת רווח מהגבול השמאלי */
    }

    /* --- המספרים (0, 1, 2...) --- */
    .interactive-container .header-numbers {
        font-size: 1.1em;
        color: var(--text-col);
        font-weight: bold;
        font-family: 'Segoe UI', sans-serif;
        opacity: 0.9;
    }

    .interactive-container .col-numbers {
        grid-column: 2;
        grid-row: 1;
        display: grid;
        grid-template-columns: repeat(5, 55px); 
        gap: 5px;
        align-items: end; /* מצמיד את המספרים למטה, קרוב לגריד */
        justify-items: center;
        margin-bottom: 5px;
    }

    .interactive-container .row-numbers {
        grid-column: 1;
        grid-row: 2;
        display: grid;
        grid-template-rows: repeat(5, 55px);
        gap: 5px;
        align-items: center;
        justify-items: end; /* מצמיד את המספרים ימינה, קרוב לגריד */
        margin-right: 10px;
    }

    /* --- הגריד והמשבצות --- */
    .interactive-container .grid-container {
        grid-column: 2;
        grid-row: 2;
        display: grid;
        grid-template-columns: repeat(5, 55px);
        grid-template-rows: repeat(5, 55px);
        gap: 5px;
        
        padding: 8px;
        border: 2px dashed var(--panel-border-col); 
        border-radius: 10px;
        background-color: var(--panel-col);
    }

    .interactive-container .cell {
        width: 55px;
        height: 55px;
        background-color: var(--backw-col);
        border: 2px solid var(--panel-border-col);
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .interactive-container .cell:hover { background-color: var(--backn-col); transform: scale(1.05); }
    
    .interactive-container .cell.selected {
        background-color: var(--accent-col);
        border-color: var(--text-col);
        box-shadow: 0 0 10px var(--accent-col);
    }

    .interactive-container .cell.wrong {
        background-color: var(--danger-col) !important;
        animation: shake 0.5s;
    }

    .interactive-container .coords-hint {
        font-size: 10px;
        color: var(--text-col);
        opacity: 0.35;
        position: absolute;
        bottom: 2px;
        right: 4px;
        pointer-events: none;
    }

    .interactive-container .btn {
        background-color: var(--success-col);
        color: var(--text-col);
        border: none;
        padding: 10px 30px;
        font-size: 1.2em;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
        margin-top: 15px;
        box-shadow: 0 3px 0 var(--panel-border-col);
        transition: transform 0.1s;
    }
    .interactive-container .btn:hover { background-color: var(--backw-col); }
    .interactive-container .btn:active { transform: translateY(3px); box-shadow: none; }

    .interactive-container #logic-painter-message {
        height: 30px;
        margin-top: 10px;
        font-size: 1.2em;
        font-weight: bold;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.35);
    }

    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(5px); }
        50% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
        100% { transform: translateX(0); }
    }
</style>

<div class="interactive-container">

    <p>תפקידך לסמן את כל המשבצות שמקיימות את התנאי!</p>

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
