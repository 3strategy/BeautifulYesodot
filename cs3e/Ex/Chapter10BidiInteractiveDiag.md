---
layout: page
title: "פרק 10 - אלכסונים במערך דו-ממדי"
subtitle: "תרגול אינטרקטיבי - כתיבת לולאות במערך דו-ממדי"
author: גיא סידס
lang: he
tags: 2d-array, interactive,מערך דו-ממדי,nested loops,אינטרקטיבי, game
---

<style>
    .interactive-container {
        --target-col: rgba(97, 175, 239, 0.35);
        --user-col: rgba(152, 195, 121, 0.7);
    }

    .interactive-container .cell {
        cursor: default;
        overflow: hidden;
    }

    .interactive-container .coords-hint {
        z-index: 2;
    }

    .interactive-container .cell.target::before {
        content: '';
        position: absolute;
        inset: 8px;
        border-radius: 4px;
        background-color: var(--target-col);
        z-index: 1;
    }

    .interactive-container .cell.user::after {
        content: '';
        position: absolute;
        inset: 14px;
        border-radius: 50%;
        background-color: var(--user-col);
        z-index: 1;
    }

    .interactive-container .cell.extra::after {
        background-color: var(--danger-col);
    }

    .interactive-container .cell.miss {
        outline: 2px dashed var(--danger-col);
        outline-offset: -4px;
    }

    .interactive-container .code-input {
        width: min(760px, 92vw);
        min-height: 180px;
        margin-bottom: 10px;
        background-color: var(--code-back-col);
        border: 2px solid var(--panel-border-col);
        border-radius: 8px;
        padding: 12px;
        font-family: 'Courier New', Courier, monospace;
        font-size: 1em;
        color: var(--text-col);
        direction: ltr;
        text-align: left;
        resize: vertical;
        box-shadow: 0 5px 15px rgba(0,0,0,0.25);
    }

    .interactive-container .legend {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin: 4px 0 12px;
        font-size: 0.95em;
        color: var(--muted-col);
        direction: ltr;
    }

    .interactive-container .legend-item {
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }

    .interactive-container .legend-swatch {
        width: 14px;
        height: 14px;
        border-radius: 3px;
        border: 1px solid var(--panel-border-col);
        display: inline-block;
    }

    .interactive-container .legend-target {
        background-color: var(--target-col);
    }

    .interactive-container .legend-user {
        background-color: var(--user-col);
    }

    .interactive-container .level-title {
        font-size: 1.1em;
        font-weight: bold;
        margin-bottom: 6px;
    }

    .interactive-container .level-hint {
        font-size: 0.95em;
        color: var(--muted-col);
        margin-bottom: 6px;
    }

    .interactive-container .logic-controls {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        margin: 12px 0 6px;
    }

    .interactive-container .logic-controls .btn:disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }

    .interactive-container .logic-toast {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.96);
    }

    .interactive-container .logic-toast.show {
        transform: translate(-50%, -50%) scale(1);
    }

    .interactive-container .logic-toast.level-up {
        background: linear-gradient(135deg, #f6cf4a, #ff8a3d 45%, #ff4f7b);
        color: #2a0b00;
        border-color: rgba(255, 255, 255, 0.6);
        box-shadow: 0 18px 35px rgba(255, 140, 60, 0.45),
            0 0 0 3px rgba(255, 240, 200, 0.45);
        font-weight: 700;
        letter-spacing: 0.04em;
    }
</style>

<div class="interactive-container" id="logic-painter-container">

    <p>תפקידך לכתוב קוד כך שיסומנו המשבצות המודגשות!</p>

    <div class="logic-toast" id="logic-painter-toast" aria-live="polite"></div>

    <div class="two-columns" style="direction: ltr">
        <div class="column">
    <div class="code-box" id="logic-painter-code">
        Loading...
    </div>

    <textarea class="code-input" id="logic-painter-input" rows="8" spellcheck="false" aria-label="C# loop input"></textarea>

    <div class="legend">
        <div class="legend-item">
            <span class="legend-swatch legend-target"></span>
            target
        </div>
        <div class="legend-item">
            <span class="legend-swatch legend-user"></span>
            your marks
        </div>
    </div>

        </div>
        <div class="column">
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

        </div>
    </div>

    <div class="logic-controls" style="direction:ltr">
     <button class="btn" id="logic-painter-check" type="button" onclick="checkSolution()">בדוק תשובה</button>
        <button class="btn" id="logic-painter-prev" type="button"> ◀ Prev</button>
        <button class="btn" id="logic-painter-next" type="button">Next  ▶ </button>
        <button class="btn" id="logic-painter-reset" type="button">Reset</button>
       
    </div>
    <div id="logic-painter-message"></div>

</div>

<script src="/assets/js/logic-painter-diag-final.js"></script>
