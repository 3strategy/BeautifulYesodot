---
layout: page
title: "פרק 11.2 – מהו עצם (Object)?"
subtitle: "תכונות, פעולות ומצב"
tags: [Object, State, Behavior, Identity, C#]
lang: he
---

## הגדרת עצם {#id-object-definition}

{: .box-note}
**עצם** הוא ישות בעלת:
- **תכונות (State)** – המצב הנוכחי
- **פעולות (Behavior)** – מה ניתן לעשות
- **זהות (Identity)** – מי הוא, גם אם תכונות משתנות

## תכונות ופעולות {#id-state-behavior}

| מרכיב | משמעות |
|---|---|
| תכונות | ערכים שמייצגים מצב |
| פעולות | פעולות שניתן להפעיל |
{: .table-he}

## דוגמאות מעולם התכנות {#id-code-objects}

{: .box-success}
גם טיפוסים מוכנים ב־C# הם עצמים:

- `String`  
  - תכונה: `Length`  
  - פעולות: `ToUpper()`, `Contains()`

- `DateTime`  
  - תכונות: `Day`, `Month`  
  - פעולות: `AddDays()`

- `Random`  
  - פעולות: `Next()`, `NextDouble()`
