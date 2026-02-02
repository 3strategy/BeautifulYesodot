---
layout: page-to-print
title: תקציר עצמים למבחן פברואר
tags: [סיכום עצמים פברואר,תקציר עצמים, class, private, public, objects summary, מערך עצמים]
lang: he
---

```cs

public class Student
{
    // תכונות, בפועל אלו שדות פרטיים
    private int age; 
    private string name;

    // constructor פעולה בונה עם פרמטרים
    public Student(string name, int stAge)
    {
        this.name = name; // `this.` is required here
        age = stAge; // `this.` is not required here
    }

    // פעולה בונה ללא פרמטרים parameterless constructor
    // זוהי העמסת בנאים
    public Student()
    {
        name = "no name";
        this.age = 0; // `this.` is not required here
    }

    // פעולה בונה מעתיקה Copy constructor
    // constructor overloading
    public Student(Student other)
    {
        name = other.name; 
        age = other.age; // `this.` is not required here
    }

    // פעולה מחזירה שם
    public string GetName()
    {
        return name;
    }

    // פעולה מחזירה גיל
    public int GetAge()
    {
        return age;
    }
}

public static void Main()
{
    // יצירת מערך תלמידים
    Student[] students = new Student[3];

    // אתחול באמצעות בנאי עם פרמטרים
    students[0] = new Student("Dana", 17);

    // איתחול באמצעות בנאי ריק ריק
    students[1] = new Student();

    // איתחול באמצעות פעולה בונה מעתיקה
    students[2] = new Student(students[0]);

    // קריאה לפעולה חיצונית מחזירה את שם התלמיד הזקן ביותר
    string oldestName = MaxAge(students);

    Point p1 = new Point(5, 3); // איתחול נקודה
    Point p2 = new Point(2, 1);

    // קריאה לפעולה פנימית. שם העצם ואז נקודה
    // כפרמטר  p2 ושולחים את  p1  קוראים לפעולה על העצם
    Console.WriteLine($"Dist p1⟺p2 is: {p1.Distance(p2):0.00}");

}
```

### פעולות חיצוניות


```csharp
  /// <summary>
  /// Scans an array of students for the oldest.
  /// Assumes the array contains no nulls.
  /// </summary>
  public static Student MaxStdNoNulls3(Student[] students)
  {
    Student maxSt = students[0];
    foreach (Student st in students)
      if (st.GetAge() > maxSt.GetAge())
        maxSt = st;

    return maxSt;
  }

  /// <summary>
  /// גרסה בשורה אחת שאסורה לשימוש בבחינה ובבגרות
  /// linq אסור 
  /// </summary>
  public static Student MaxStudent4(Student[] students)
    => students.MaxBy(st => st.GetAge());

  /// <summary>
  /// פעולה חיצונית המקבלת מערך תלמידים ומחזירה את שם התלמיד המבוגר ביותר
  /// + null checks
  /// </summary>
  public static string MaxStdName1(Student[] students)
  {
    Student maxSt = students[0];

    for (int i = 1; i < students.Length; i++)
    {
      // בדיקה שהתא במערך אינו null
      if (students[i] != null)
      {
        // גם maxSt עלול להיות null
        if (maxSt == null || students[i].GetAge() > maxSt.GetAge())
          maxSt = students[i];
      }
    }

    return maxSt.GetName(); // null reference exception ⟵ אם כל התאים ריקים
  }

  /// <summary>
  /// Scans an array of students for the oldest
  /// + null checks
  /// </summary>
  /// <param name="students">A non-null array, but can contain nulls</param>
  /// <returns>The student whose age is maximal</returns>
  public static Student MaxStudent2(Student[] students)
  {
    Student maxSt = null;

    foreach (Student st in students)
    {
      // מדלגים על תאים ריקים
      if (st is not null &&
          (maxSt is null || st.GetAge() > maxSt.GetAge()))
        maxSt = st;
    }

    return maxSt;
  }


```
