---
layout: page
title: "פרק 11.7 – שימוש בעצמים"
subtitle: "עבודה נכונה עם מופעים"
tags: [objects, usage, C#]
lang: he
---



## עבודה עם עצמים {#id-using-objects}

> **כדי להשתמש בעצם:**
>
> 1. מגדירים משתנה מטיפוס המחלקה  
> 2. בונים עצם עם `new`  
> 3. מפעילים פעולות  
{: .box-note}

## דוגמה מלאה {#id-full-example}

```csharp
Student s = new Student("Noam", "456");
s.SetMath(90);
Console.WriteLine(s.ComputeAverage());
```

## למה זה חשוב? {#id-why-important}

> - קוד קריא וברור
> - תחזוקה קלה
> - בסיס לירושה ופולימורפיזם בהמשך
{: .box-success}
