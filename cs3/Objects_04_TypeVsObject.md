---
layout: page
title: "פרק 11.4 – טיפוס מול עצם"
subtitle: "Blueprint לעומת מופע"
tags: [Class, Object, Blueprint, C#]
lang: he
---

## מהו טיפוס (Class)? {#id-class}

{: .box-note}
טיפוס מגדיר **מבנה משותף** לעצמים:
- אילו תכונות יש
- אילו פעולות מותרות

הטיפוס הוא **תכנית בנייה (Blueprint)**.

## מהו עצם (Object)? {#id-instance}

{: .box-success}
עצם הוא **מופע ספציפי** של טיפוס.

| טיפוס | עצמים |
|---|---|
| Student | תלמיד א', תלמיד ב' |
| Computer | מחשב ביתי, מחשב מעבדה |
{: .table-he}

## המחשה {#id-blueprint-illustration}

<div class="mermaid">
graph TD
A[Class] --> B[Object 1]
A --> C[Object 2]
</div>
