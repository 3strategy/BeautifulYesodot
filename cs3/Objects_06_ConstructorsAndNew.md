---
layout: page
title: "פרק 6.6 – פעולה בונה ו־new"
subtitle: "איך נוצר עצם בזיכרון"
tags: [constructor, new, C#]
lang: he
---



> **הפעולה הבונה:**
>
> - מופעלת פעם אחת בלבד
> - מאתחלת את תכונות העצם
> - אין לה טיפוס חזרה
{: .box-note #id-constructor}

```csharp
public Student(string n, string id)
{
    name = n;
    idNum = id;
}
```

## יצירת עצם – new {#id-new}

```csharp
Student s1 = new Student("Dana", "123");
```

**שלבי הבנייה:**

1. הקצאת זיכרון
1. אתחול תכונות
1. החזרת העצם החדש
