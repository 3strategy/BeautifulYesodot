---
layout: page
title: "פרק 3 - איומים בלוח שחמט"
subtitle: "תרגול אינטרקטיבי בתנאי if"
author: גיא סידס
lang: he
tags: [תנאים, if, שחמט, אינטרקטיבי, לוגיקה]
---

<style>
    .chess-threats {
        --threat-col: rgba(224, 108, 117, 0.56);
        --threat-strong-col: rgba(224, 108, 117, 0.82);
        --guide-col: rgba(97, 175, 239, 0.42);
        --piece-col: #f7f7f7;
        --piece-back-col: rgba(18, 18, 18, 0.74);
        --white-square-col: #f0d9b5;
        --black-square-col: #b58863;
        --board-border-col: #242424;
        max-width: 1120px;
        margin-inline: auto;
    }

    .chess-threats .chess-threats-layout {
        width: 100%;
        display: grid;
        grid-template-columns: minmax(320px, 470px) minmax(340px, 1fr);
        gap: 22px;
        align-items: start;
        direction: ltr;
    }

    .chess-threats .chess-board-panel,
    .chess-threats .chess-code-panel {
        width: 100%;
        min-width: 0;
    }

    .chess-threats .chess-code-panel {
        direction: rtl;
        text-align: right;
    }

    .chess-threats .chess-board-wrap {
        width: max-content;
        max-width: 100%;
        margin-inline: auto;
        overflow-x: auto;
        padding-bottom: 4px;
    }

    .chess-threats .chess-board-grid {
        --square-size: clamp(34px, 7vw, 54px);
        --label-size: clamp(22px, 5vw, 34px);
        display: grid;
        grid-template-columns: var(--label-size) repeat(8, var(--square-size));
        grid-template-rows: var(--label-size) repeat(8, var(--square-size));
        gap: 0;
        direction: ltr;
        border: 2px solid var(--board-border-col);
        background: var(--board-border-col);
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
    }

    .chess-threats .board-label,
    .chess-threats .board-corner {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--panel-col);
        color: var(--text-col);
        font-family: Consolas, "Courier New", monospace;
        font-weight: 700;
        font-size: 0.92em;
        border: 1px solid var(--board-border-col);
    }

    .chess-threats .board-square {
        position: relative;
        width: var(--square-size);
        height: var(--square-size);
        border: 1px solid rgba(20, 20, 20, 0.25);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .chess-threats .board-square.light {
        background: var(--white-square-col);
    }

    .chess-threats .board-square.dark {
        background: var(--black-square-col);
    }

    .chess-threats .board-square.guide::before,
    .chess-threats .board-square.threat::before {
        content: "";
        position: absolute;
        inset: 4px;
        border-radius: 5px;
        z-index: 1;
    }

    .chess-threats .board-square.guide::before {
        background: var(--guide-col);
    }

    .chess-threats .board-square.threat::before {
        background: var(--threat-col);
        box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.22);
    }

    .chess-threats .board-square.target-threat::after {
        content: "";
        position: absolute;
        inset: 4px;
        border: 3px solid #ffd166;
        border-radius: 8px;
        z-index: 3;
        box-shadow: 0 0 12px rgba(255, 209, 102, 0.7);
    }

    .chess-threats .coords-hint {
        color: #161616;
        font-size: 0.64em;
        font-family: Consolas, "Courier New", monospace;
        opacity: 0.42;
        position: absolute;
        bottom: 2px;
        right: 3px;
        z-index: 2;
        pointer-events: none;
    }

    .chess-threats .chess-piece {
        min-width: 1.65em;
        height: 1.65em;
        border-radius: 50%;
        background: var(--piece-back-col);
        color: var(--piece-col);
        border: 2px solid rgba(255, 255, 255, 0.75);
        display: none;
        align-items: center;
        justify-content: center;
        font-family: Consolas, "Courier New", monospace;
        font-size: clamp(1em, 3.8vw, 1.35em);
        font-weight: 800;
        line-height: 1;
        position: relative;
        z-index: 4;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
    }

    .chess-threats .board-square.has-piece .chess-piece {
        display: flex;
    }

    .chess-threats .chess-status {
        min-height: 2.4em;
        margin: 10px auto 0;
        color: var(--muted-col);
        font-weight: 700;
        text-align: center;
        direction: rtl;
    }

    .chess-threats .legend {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 14px;
        direction: rtl;
        margin-top: 10px;
        color: var(--muted-col);
        font-size: 0.95em;
    }

    .chess-threats .legend-item {
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }

    .chess-threats .legend-swatch {
        width: 15px;
        height: 15px;
        border-radius: 4px;
        border: 1px solid var(--panel-border-col);
        display: inline-block;
    }

    .chess-threats .legend-threat {
        background: var(--threat-col);
    }

    .chess-threats .legend-guide {
        background: var(--guide-col);
    }

    .chess-threats .legend-target {
        background: transparent;
        border: 3px solid #ffd166;
    }

    .chess-threats .code-box {
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 10px;
        padding: 12px;
        font-size: 1em;
        text-align: left;
    }

    .chess-threats .code-box pre {
        margin: 0;
        white-space: pre-wrap;
        direction: ltr;
        text-align: left;
        font-size: 0.95em;
        line-height: 1.45;
    }

    .chess-threats .level-title {
        color: var(--accent-col);
        font-size: 1.12em;
        font-weight: 800;
        margin: 0 0 6px;
        direction: rtl;
        text-align: right;
    }

    .chess-threats .level-hint {
        color: var(--muted-col);
        font-size: 0.98em;
        margin: 0 0 10px;
        direction: rtl;
        text-align: right;
    }

    .chess-threats .condition-input {
        width: 100%;
        min-height: 150px;
        box-sizing: border-box;
        background-color: var(--code-back-col);
        border: 2px solid var(--panel-border-col);
        border-radius: 8px;
        padding: 12px;
        font-family: Consolas, "Courier New", monospace;
        color: var(--text-col);
        direction: ltr;
        text-align: left;
        resize: vertical;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
    }

    .chess-threats .condition-input:focus {
        outline: 2px solid var(--accent-col);
        outline-offset: 2px;
    }

    .chess-threats .logic-controls {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        margin-top: 12px;
        direction: rtl;
    }

    .chess-threats .logic-controls .btn {
        margin-top: 0;
        padding-inline: 18px;
    }

    .chess-threats .logic-controls .btn:disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }

    .chess-threats #chess-threats-message {
        min-height: 34px;
        margin-top: 10px;
        font-size: 1.1em;
        font-weight: 700;
        text-align: center;
    }

    .chess-threats .logic-toast.level-up {
        background: linear-gradient(135deg, #f6cf4a, #ff8a3d 48%, #ff4f7b);
        color: #2a0b00;
        border-color: rgba(255, 255, 255, 0.65);
        font-weight: 800;
    }

    @media (max-width: 880px) {
        .chess-threats .chess-threats-layout {
            grid-template-columns: 1fr;
        }

        .chess-threats .chess-board-panel {
            order: 2;
        }

        .chess-threats .chess-code-panel {
            order: 1;
        }
    }
</style>

<div class="interactive-container chess-threats" id="chess-threats-container">
    <p>השלימו רק את התנאי שבתוך ה־if. אחרי הבדיקה הלוח יציג את המשבצות המאוימות ואת מצב הכלים.</p>

    <div class="logic-toast" id="chess-threats-toast" aria-live="polite"></div>

    <div class="chess-threats-layout">
        <div class="chess-board-panel">
            <div class="chess-board-wrap">
                <div class="chess-board-grid" id="chess-threats-board" aria-label="לוח שחמט אינטרקטיבי"></div>
            </div>

            <div class="legend">
                <span class="legend-item"><span class="legend-swatch legend-threat"></span>משבצות מאוימות</span>
                <span class="legend-item"><span class="legend-swatch legend-guide"></span>משבצות עזר</span>
                <span class="legend-item"><span class="legend-swatch legend-target"></span>כלי שנמצא באיום</span>
            </div>

            <div class="chess-status" id="chess-threats-status"></div>
        </div>

        <div class="chess-code-panel">
            <div id="chess-threats-title" class="level-title">Loading...</div>
            <div id="chess-threats-prompt" class="level-hint"></div>

            <div class="code-box" id="chess-threats-code">
                <pre><code>Loading...</code></pre>
            </div>

            <textarea
                class="condition-input"
                id="chess-threats-input"
                spellcheck="false"
                aria-label="C# if condition input"></textarea>

            <div class="logic-controls">
                <button class="btn" id="chess-threats-check" type="button">בדוק תנאי</button>
                <button class="btn" id="chess-threats-new" type="button">מיקום חדש</button>
                <button class="btn" id="chess-threats-next" type="button">הבא</button>
                <button class="btn" id="chess-threats-prev" type="button">הקודם</button>
                <button class="btn" id="chess-threats-reset" type="button">איפוס</button>
            </div>

            <div id="chess-threats-message" aria-live="polite"></div>
        </div>
    </div>
</div>

<script src="/assets/js/chess-threats-interactive.js"></script>
