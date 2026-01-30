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
// ואז יש קריאה לפעולה בונה  new כדי לבנות את העצם משתמשים במילה
```

**שלבי הבנייה:**

1. הקצאת זיכרון
1. אתחול תכונות
1. החזרת העצם החדש

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

<details open markdown="1"><summary>המחלקה המלאה כמעט כפי שהוצגה בשיעור</summary>

```csharp
public class Student
{
  private int id;

  private string name;

  private int age;

  public Student()
  {

  }
  //  //פעולה בונה מעתיקה
  public Student(Student other)
  {
    this.id = other.id;
    name = other.name;
    age = other.age;
  }

  public Student(int ageee, string nameeee)
    : this(ageee, nameeee, 110)
  {
    Console.WriteLine("Invented ID");
  }
  public Student(int age, string name, int id = 110)
  {
    this.age = age;
    this.name = name;
    this.id = id;
  }

  public int GetAge()
  {
    return age;
  }
  public void SetAge(int value)
  {
    age = value;
  }
  public string GetName()
  {
    return name;
  }
  public void SetName(string value)
  {
    name = value;
  }
  public int GetId()
  {
    return id;
  }
  public void SetId(int value)
  {
    id = value;
  }

  public void AddOneYear()
  {
    age++;
  }
}


```

</details>

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

---

## דגשים משיעור 29/1

- פתיחה: חזרנו על מטרת המחלקה, אבסטרקציה והכמסה (encapsulation); תכונות מוגדרות כ־`private` וגישה מבחוץ **רק דרך פעולות**.
- דוגמת **Student**: (`GetName`, `SetName`), בהמשך ראינו כתיבה מהירה של כל זה עם הקיצור `gs`.
- בנאים: `new` יוצר עצם ומפעיל בנאי; בנאי ברירת־מחדל קיים כשאין בנאים אחרים; ברגע שמגדירים בנאי עם פרמטרים צריך להוסיף גם בנאי ריק אם רוצים לאפשר יצירה בלי פרמטרים.
- `this` ושרשור בנאים: הבחנה בין פרמטר לתכונה, ושימוש ב־`: this(...)` כדי להימנע מכפילות קוד ולהעביר אחריות לבנאי מרכזי (אפשר גם דרך Setters כדי לבצע ולידציה).
- פעולה בונה מעתיקה: קבלת עצם מסוג Student והעתקת ערכים ליצירת עצם חדש (לא רק העתקת הפניה), כולל דיון מתי שכפול כן הגיוני.
- סדר כתיבה מומלץ: תכונות ⟵ בנאים ⟵ פעולות מאחזרות/קובעות ⟵ פעולות נוספות.
- שימוש חוזר בקוד: בדוגמת Point הראינו שכדאי לקרוא לפעולה קיימת (`Distance`) במקום לחשב מחדש. שימוש ב־IntelliSense (הקלדת נקודה אחרי שם העצם) כדי לגלות פעולות קיימות במחלקה ומה הן עושות.
- פעולה **פנימית מול חיצונית:** פנימית נמצאת בתוך המחלקה ופועלת על `this`; חיצונית נמצאת מחוץ למחלקה ומשתמשת בעצם. כלל אצבע לבגרות: חיצונית `public static`, פנימית `public` ללא `static` (הרחבה על `static` נדחתה לשיעור הבא).
- מעבר לדוגמת **Test** ו־`DateTime`: שינוי תאריך עם `AddDays` מחזיר עצם חדש ולכן שינוי ההפניה לא משנה את התכונה בתוך העצם המקורי. (בשיעור עצמו עבדנו עם Add ולא AddDays).
- חזרנו שוב על **טכניקת הוספת מחלקה קיימת:** הוספת מחלקה שהורדה ל־Visual Studio דרך Add > Existing Item.
- Assignment 11y2 — תרגלנו הוספת פעולות פנימיות וחיצוניות.

<details open markdown="1"><summary>המחלקה המלאה כמעט כפי שהוצגה בשיעור</summary>

```csharp
internal partial class Program
{

  public static void Hizonit7()
  {

    Student s1 = new Student(); // 0 NO NAME
    Student s2 = new Student(s1); //משתמש בבונה מעתיקה
    Student s3 = new Student(5, "Name");

    Test t1 = new Test();
    Test t2 = new Test(t1.GetTestDate().Add(new TimeSpan(2, 30, 0, 0)));
    DateTime d = t2.GetTestDate();

    d = d.AddDays(1); // t2 מוסיף יום. לא משפיע על התאריך בתוך 
    // להפנות למקום החדש בזכרון d - הפעולה תחזיר עצם חדש וההפניה גורמת ל 
    // t2 לא תהיה שום השפעה על תאריך המבחן שיש בתכונה של 
  }
}
public class Test
{

  private DateTime testDate;

  public Test()
    : this(DateTime.Now)
  {
  }

  public Test(DateTime testDate)
  {
    this.testDate = testDate;
  }

  public DateTime GetTestDate()
  {
    return testDate;
  }
  public void SetTestDate(DateTime value)
  {
    testDate = value;
  }


}
```

</details>
