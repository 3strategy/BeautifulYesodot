---
layout: page
title: "פרק 11.2 – בניית מחלקה ויצירת עצמים"
subtitle: "תכונות, פעולות, פעולה בונה. איך נוצר עצם בזיכרון"
tags: [C#, class, private, public]
lang: he
---

## בניית מחלקות

### מבנה מחלקה בסיסי {#id-class-structure}

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

### תכונות לעומת משתנים {#id-fields-vs-vars}

{: .box-note}

- משתנה – קיים רק בזמן ריצה של פעולה
- תכונה – חלק מהעצם, כל עוד הוא קיים

### הרשאות גישה {#id-access-modifiers}

{: .table-he}

| הרשאה         | משמעות              |
| ------------- | ------------------- |
| private       | נגיש רק בתוך המחלקה |
| public        | נגיש מכל מקום       |

## Constructor: פעולה בונה

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

**בדרך כלל נלמד זאת כך:**

```csharp
public Student(string name, string id)
{
    this.name = name; // הוא העצם שלנו this 
    this.id = id; // הכרחי כאשר הפרמטר זהה לתכונה this
}
```

### יצירת עצם – new {#id-new}

```csharp
Student s1 = new Student("Dana", "123");
```

**שלבי הבנייה:**

1. הקצאת זיכרון
1. אתחול תכונות
1. החזרת העצם החדש

## עבודה עם עצמים

### עבודה עם עצמים {#id-using-objects}

> **כדי להשתמש בעצם:**
>
> 1. מגדירים משתנה מטיפוס המחלקה  
> 2. בונים עצם עם `new`  
> 3. מפעילים פעולות  
{: .box-note}

### דוגמה מלאה {#id-full-example}

```csharp
Student s = new Student("Noam", "456");
s.SetMath(90);
Console.WriteLine(s.ComputeAverage());
```

## שלבי כתיבה והמונחים בבחינות

**כותרת המחלקה:**

```csharp
public class Student
```

**התכונות:**

```csharp
    private string name;
    private int id;
    private int age;
```

**הבנאי:**

```csharp
public Student(string name, string id)
{
    this.name = name; // הוא העצם שלנו this 
    this.id = id;
}
```

**פעולות קובעות ומאחזרות:**

```csharp
public int GetId()
{
    return id;
}

public string GetName() => name; // פונקציה בכתיבה מקוצרת 
```
