---
layout: page
title: "פרק 11.5 – בניית מחלקה ב־C#"
subtitle: "תכונות, פעולות והרשאות גישה"
tags: [C#, class, private, public]
lang: he
---

## מבנה מחלקה בסיסי {#id-class-structure}

```csharp
public class Student
{
    // תכונות
    private string name;

    // פעולות
    public string GetName()
    {
        return name;
    }
}
```

## תכונות לעומת משתנים {#id-fields-vs-vars}

{: .box-note}
- משתנה – קיים רק בזמן ריצה של פעולה
- תכונה – חלק מהעצם, כל עוד הוא קיים

## הרשאות גישה {#id-access-modifiers}

| הרשאה         | משמעות              |
| ------------- | ------------------- |
| private       | נגיש רק בתוך המחלקה |
| public        | נגיש מכל מקום       |
{: .table-he}






