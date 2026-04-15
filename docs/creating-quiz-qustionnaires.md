# Agent Task: Create Two Hebrew Logic Questionnaires with SVG Weight Questions

## Context — read these files first

Before writing any code or content, read and understand the following files:

1. `\interactrak\percentages-middle-school-2.md`
   — A complete, working questionnaire. Use it as the **exact structural template**: front-matter
   keys, `window.QUIZ_QUESTIONS`, `window.QUIZ_LABELS`, `window.TRACKED_QUIZ_CONFIG`, script tags,
   Jekyll Liquid expressions, and the surrounding HTML skeleton.

2. `\assets\js\questionnaire.js`
   — The React rendering engine. Pay special attention to how `q.promptHe` is rendered
   (line ~477). Note that **there is no `promptHtml` field today** — you will need to add one
   (see "Engine Patch" section below).

3. `\docs\questionnaire-ideas.md`
   — Topic ideas for the questionnaires. Draw on sections 1 (Weight & Balance Logic),
   4 (Algorithmic Thinking / Robot), 5 (Constraints / Logic Puzzle), and 9 (Deduction) for
   question content.

---

## Engine Patch — `questionnaire.js`

The current `promptHe` field renders as plain text. SVG/emoji diagrams require raw HTML.
Add support for a new **optional** `promptHtml` field on question objects.

In the `Questionnaire` component, immediately after the existing `promptHe` block (around
line 477), add:

```jsx
{q.promptHtml
  ? <div
      className="quiz-prompt quiz-prompt-html"
      dangerouslySetInnerHTML={{ __html: q.promptHtml }}
    />
  : null}
```

Rules:

- `promptHtml` and `promptHe` are independent; a question may have both, either, or neither.
- When both are present, render `promptHe` first, then `promptHtml` below it.
- Do **not** remove or alter any existing logic.

---

## SVG Weight-Balance Visual — Template to Reuse

assets\img\balance.svg

---

## Output Files to Create

Create **two new files** under:
`\interactrak\`

| File | Quiz key | Token | Series |
| --- | --- | --- | --- |
| `logic-cs-entrance-a.md` | `"27-logic-cs-entrance-a"` | `"yesodot-logic-a-2026-eK3mP9x1"` | א |
| `logic-cs-entrance-b.md` | `"27-logic-cs-entrance-b"` | `"yesodot-logic-b-2026-rN7qL2w5"` | ב |

Both files share the same Firebase config and `debugUids` as the template file.
Use today's date for `quiz_window_start` (08:00 +03:00) and `2026-08-31T23:59:59+03:00`
for `quiz_window_end`.

---

## Content Specification

Each file must contain exactly **20 questions** in `window.QUIZ_QUESTIONS`.

### Difficulty distribution (per file)

- Questions 1–6: easy
- Questions 7–14: medium
- Questions 15–20: hard

### Category mix (per file) — use `tags` to label each

Use these Hebrew tag names:

| Category | Hebrew tag | Count per file |
| --- | --- | --- |
| Weight & Balance (SVG) | `"משקל ואיזון"` | 7 |
| Robot / Algorithm Simulation | `"סימולציית רובוט"` | 4 |
| Logic Puzzle / Constraints | `"פאזל לוגי"` | 5 |
| Deduction / Missing Info | `"הסקה"` | 4 |

### Weight & Balance questions — SVG rules

- Every weight-balance question **must** set `promptHtml` to an SVG diagram (adapt the
  template above with the relevant emoji/symbols).
- Also set `promptHe` to a short text statement of the same information in Hebrew, so
  the question is accessible without the image.
- Use animal or object emojis as the entities (e.g. 🐘🐰🐦🐢🐸🦊🦁🐺).
- Vary the structure: some questions give ordinal relations (A > B > C), some give
  equality + offset (A = B + 1), some have 4 entities, some ask "cannot determine".
- All Hebrew text inside SVG `<text>` elements must use `font-family="sans-serif"` and
  `direction="rtl"`.

### Robot / Algorithm Simulation questions

- Describe a simple robot with 2–3 movement commands in Hebrew.
- Give a sequence of 4–7 commands and ask for the final position or state.
- Vary: some linear, some with loops ("repeat 3 times").

### Logic Puzzle / Constraints questions

- 3–5 named characters (Hebrew names: דנה, אמיר, ליאור, מיכל, יובל, נועם, שירה).
- Give 2–3 constraints, ask who satisfies a condition.
- Some should have a "cannot determine" correct answer.

### Deduction questions

- Short 2–3 sentence paragraph in Hebrew.
- Ask what can be concluded with certainty.
- One distractor per question should be "אי אפשר לדעת בוודאות".

---

## `window.QUIZ_LABELS` — Hebrew strings

Copy the full `QUIZ_LABELS` object from the template file verbatim.
Then override only `title`:

- Series א: `"שאלון כניסה ללימודי מדעי המחשב – סדרה א'"`
- Series ב: `"שאלון כניסה ללימודי מדעי המחשב – סדרה ב'"`

---

## `window.TRACKED_QUIZ_CONFIG` — Jekyll Liquid fields

Use **exactly** the same Liquid expressions as in the template for runtime fields:

```js
quizKey: {{ page.quiz_key | jsonify }},
pagePath: {{ page.url | relative_url | jsonify }},
quizWindowStart: {{ page.quiz_window_start | jsonify }},
quizWindowEnd: {{ page.quiz_window_end | jsonify }},
unlockToken: {{ page.quiz_unlock_token | jsonify }},
debugUids: {{ page.quiz_debug_uids | jsonify }},
```

Set `slug` to match the filename without `.md`.
Set `dir: "rtl"`.
Set `revealDelayMs: 250`.
Pass `questions: window.QUIZ_QUESTIONS` and `labels: window.QUIZ_LABELS`.

---

## Front-matter (per file)

```yaml
---
layout: page
title: <Hebrew title matching QUIZ_LABELS.title>
tags: [לוגיקה, חשיבה חישובית, שאלון, אינטראקטיבי, מדעי המחשב]
lang: he
full-width: true
tracked_quiz: true
quiz_key: "<value from table above>"
quiz_window_start: "<today 08:00 +03:00>"
quiz_window_end: "2026-08-31T23:59:59+03:00"
quiz_unlock_token: "<value from table above>"
quiz_debug_uids:
  - "YtfYwYQ5FxOFk50npfDWF0Ekq7i1"
---
```

---

## Quality Checklist — verify before finishing

- [ ] Every question has: `id` (1–20), `title` (Hebrew), `promptHe` (Hebrew), at minimum 4
      `choices` with keys A/B/C/D, a `correctKey`, an `explanationHe`, and `tags`.
- [ ] Every weight-balance question also has `promptHtml` with a valid inline SVG.
- [ ] All `correctKey` values are actually correct — verify each answer manually.
- [ ] `explanationHe` explains *why* the answer is correct in one or two sentences.
- [ ] No two questions in the same file share identical answer choices.
- [ ] Series א and Series ב use **different** questions and different entities throughout —
      they must not be copies of each other.
- [ ] The `questionnaire.js` patch has been applied and does not break existing questions
      that have no `promptHtml`.
- [ ] Both markdown files are valid Jekyll pages with no Liquid syntax errors.
- [ ] `choicesDir: "rtl"` is set on every question.

````

---

A few notes before you run this:

**Fill in the SVG placeholder** — paste your weight-balance SVG example right where it says `[PASTE YOUR SVG EXAMPLE HERE]`. The agent needs a concrete template to clone and adapt; without it it will invent its own geometry and it'll likely be off.

**The engine patch** is unavoidable given how `questionnaire.js` currently works — `FormattedText` strips HTML. The patch is minimal (4 lines) and fully backward-compatible, so it won't touch any of your existing questionnaires.

**Two-pass tip** — if Copilot hits context limits on 40 questions at once, you can split: ask it to produce Series א first with the engine patch, confirm it looks right, then run again for Series ב referencing Series א as an additional "do not duplicate" example.
