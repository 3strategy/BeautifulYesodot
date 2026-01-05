---
layout: page
title: "פרק 10 - תרגול מערך דו-ממדי"
subtitle: "הצייר הלוגי - אתגר אינטראקטיבי"
author: גיא סידס
lang: he
tags: 2d-array, interactive, game
---

<style>
    .interactive-container {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #282c34;
        color: white;
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

    .interactive-container h1 { margin: 5px 0; color: #61dafb; font-size: 2em; }
    .interactive-container p { margin-bottom: 10px; font-size: 1.1em; color: #abb2bf; }

    .interactive-container .code-box {
        background-color: #1e1e1e;
        border: 2px solid #61dafb;
        padding: 10px 25px;
        border-radius: 8px;
        font-family: 'Courier New', Courier, monospace;
        font-size: 1.4em;
        margin-bottom: 15px;
        direction: ltr; /* Code is always LTR */
        box-shadow: 0 5px 15px rgba(0,0,0,0.5);
    }

    .interactive-container .variable { color: #d19a66; }
    .interactive-container .operator { color: #56b6c2; }
    .interactive-container .number { color: #98c379; }

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
        color: #e5c07b; /* צהוב-זהב */
        font-size: 1.6em; /* הגדלה משמעותית של הפונט */
        font-weight: bold;
        font-family: monospace;
        text-shadow: 0px 1px 2px rgba(0,0,0,0.5);
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
        color: #ffffff;
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
        border: 2px dashed #5c6370; 
        border-radius: 10px;
        background-color: rgba(0,0,0,0.2);
    }

    .interactive-container .cell {
        width: 55px;
        height: 55px;
        background-color: #3b4048;
        border: 2px solid #555;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .interactive-container .cell:hover { background-color: #4b5263; transform: scale(1.05); }
    
    .interactive-container .cell.selected {
        background-color: #61dafb;
        border-color: #fff;
        box-shadow: 0 0 10px #61dafb;
    }

    .interactive-container .cell.wrong {
        background-color: #e06c75 !important;
        animation: shake 0.5s;
    }

    .interactive-container .coords-hint {
        font-size: 10px;
        color: rgba(255,255,255,0.2);
        position: absolute;
        bottom: 2px;
        right: 4px;
        pointer-events: none;
    }

    .interactive-container .btn {
        background-color: #98c379;
        color: #282c34;
        border: none;
        padding: 10px 30px;
        font-size: 1.2em;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
        margin-top: 15px;
        box-shadow: 0 3px 0 #6d8f53;
        transition: transform 0.1s;
    }
    .interactive-container .btn:hover { background-color: #aadd86; }
    .interactive-container .btn:active { transform: translateY(3px); box-shadow: none; }

    .interactive-container #logic-painter-message {
        height: 30px;
        margin-top: 10px;
        font-size: 1.2em;
        font-weight: bold;
        text-shadow: 1px 1px 2px black;
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

    <h1>הצייר הלוגי</h1>
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