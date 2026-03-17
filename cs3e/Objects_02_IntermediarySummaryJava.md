---
layout: page-to-print
title: תקציר עצמים למבחן פברואר (Java)
tags: [סיכום עצמים פברואר,תקציר עצמים, class, private, public, objects summary, מערך עצמים, java]
lang: he
---

{: .box-note}
עמוד זה הוא המקבילה ב-Java ל-[תקציר העצמים ב-C#](/cs3e/Objects_02_IntermediarySummary).

```java
import java.util.Scanner;


class Student
{
    // תכונות, בפועל אלו שדות פרטיים
    private int age;
    private String name; // כמו string ב-C#, אבל ב-Java כותבים String

    // constructor פעולה בונה עם פרמטרים
    public Student(String name, int stAge)
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
    public String getName()
    {
        return name;
    }

    // פעולה מחזירה גיל
    public int getAge()
    {
        return age;
    }
}

public class Main
{
    public static void main(String[] args) // נקודת הכניסה, כמו Main ב-C#
    {
        Scanner reader = new Scanner(System.in); // אובייקט קלט כיתתי רגיל

        // יצירת מערך תלמידים
        Student[] students = new Student[3];

        // אתחול באמצעות בנאי עם פרמטרים
        students[0] = new Student("Dana", 17);

        // איתחול באמצעות בנאי ריק
        students[1] = new Student();

        // איתחול באמצעות פעולה בונה מעתיקה
        students[2] = new Student(students[0]);

        // קריאה לפעולה חיצונית מחזירה את שם התלמיד הזקן ביותר
        String oldestName = maxStdName1(students);

        Point p1 = new Point(5, 3); // איתחול נקודה
        Point p2 = new Point(2, 1);

        // קריאה לפעולה פנימית. שם העצם ואז נקודה
        // כפרמטר  p2 ושולחים את  p1  קוראים לפעולה על העצם
        System.out.println("Dist p1⟺p2 is: " + p1.distance(p2));

        reader.close();
    }
}
```

### פעולות חיצוניות

```java
  /**
   * Scans an array of students for the oldest.
   * Assumes the array contains no nulls.
   */
  public static Student maxStdNoNulls3(Student[] students)
  {
    Student maxSt = students[0];
    for (Student st : students) // כמו foreach ב-C#
      if (st.getAge() > maxSt.getAge())
        maxSt = st;

    return maxSt;
  }

  /**
   * פעולה חיצונית המקבלת מערך תלמידים ומחזירה את שם התלמיד המבוגר ביותר
   * + null checks
   */
  public static String maxStdName1(Student[] students)
  {
    Student maxSt = students[0];

    for (int i = 1; i < students.length; i++) // כמו Length ב-C#, אבל ב-Java זה length
    {
      // בדיקה שהתא במערך אינו null
      if (students[i] != null)
      {
        // גם maxSt עלול להיות null
        if (maxSt == null || students[i].getAge() > maxSt.getAge())
          maxSt = students[i];
      }
    }

    return maxSt.getName(); // NullPointerException ⟵ אם כל התאים ריקים
  }

  /**
   * Scans an array of students for the oldest
   * + null checks
   * @param students A non-null array, but can contain nulls
   * @return The student whose age is maximal
   */
  public static Student maxStudent2(Student[] students)
  {
    Student maxSt = null;

    for (Student st : students) // כמו foreach ב-C#
    {
      // מדלגים על תאים ריקים
      if (st != null &&
          (maxSt == null || st.getAge() > maxSt.getAge()))
        maxSt = st;
    }

    return maxSt;
  }
```
