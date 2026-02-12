---
layout: page
title: "פרק 11.2ב – מערכים ולולאות על עצמים"
subtitle: "foreach, for, null, ומה באמת חשוב ב-current"
tags: [C#, arrays, foreach, for, null, current, objects]
lang: he
---

## תיקון הקשר לשיעור

בשיעור הזה לא עבדנו עם `Transport` ו-`Program1`.
ההדגמות בסוף השיעור היו על:

- `cs3e/Ex/Customer.cs.txt`
- `cs3e/Ex/Store.cs.txt`
- `cs3e/Ex/Program2.cs.txt`

## מה עשינו בחלק הראשון של השיעור (לולאות על מערך עצמים)

בחלק הזה עברנו על דפוסי לולאה מהתקציר:

- הנחה שאין `null`-ים: קוד קצר ופשוט (`foreach`).
- הנחה שיכולים להיות `null`-ים: מוסיפים הגנות.
- גרסת Lambda/`MaxBy` הוזכרה, אבל הודגש שהיא לא לפתרונות בגרות.

```csharp
public static Student MaxStdNoNulls3(Student[] students)
{
    Student maxSt = students[0];
    foreach (Student st in students)
        if (st.GetAge() > maxSt.GetAge())
            maxSt = st;

    return maxSt;
}

public static Student MaxStudent2(Student[] students)
{
    Student maxSt = null;

    foreach (Student st in students)
    {
        if (st is not null &&
            (maxSt is null || st.GetAge() > maxSt.GetAge()))
            maxSt = st;
    }

    return maxSt;
}

public static Student MaxStudent4(Student[] students)
    => students.MaxBy(st => st.GetAge()); // הוזכר בלבד, לא לפתרון בגרות
```

## הקוד מהסוף של השיעור: Customer + Store + Program2

### Customer (האיברים במערך)

```csharp
internal class Customer
{
    private string name;
    private string telNum;
    private int age;

    public Customer(string name, string telNum)
    {
        this.name = name;
        this.telNum = telNum;
    }

    public int GetAge() => age;
    public string GetName() => name;
    public string GetTelNum() => telNum;
}
```

### Store עם current

```csharp
internal class Store
{
  private Customer[] arrCust;

  private int current; //יחזיק את האינדקס של התא הריק הראשון

  public Customer[] GetArrCust() { return arrCust; }

  public Store()
  {
    arrCust = new Customer[100];
    current = 0;
  }

  public void AddCus(Customer customer)
  {
    //arrCust[current++] = customer; // short version
    arrCust[current] = customer; // current is the index of the first empty cell
    current++; // current is the index of the next empty place
  }

  public Customer RemoveCust(int ind)
  {
    if (ind >= current || ind < 0)
      return null;
    
      Customer customer = arrCust[ind];
    //0 1 2| current == 3
    //A B C| 
    for (int i = ind; i < current - 1; i++) // index out of range exception תמיד צריך להיזהר מזה 
      arrCust[i] = arrCust[i + 1];
    // B C C

    arrCust[current - 1] = null; 
    // B C null

    current--;
    return customer;
  }


  // הדגמת current: לא רצים עד Length אלא רק עד current
  public string YoungestName()
  {
    Customer theBest = arrCust[0];
    for (int i = 1; i < current; i++)
      if (arrCust[i].GetAge() < theBest.GetAge())
        theBest = arrCust[i];

    return theBest.GetName();
  }
}
```

### Program2: מה ששאלו בשאלה החיצונית

```csharp
// זו הגרסה החיצונית לפי ניסוח השאלה
public string Bomba(Store s, int num)
{
    var res = s.GetArrCust()[num];
    if (res == null)
        return "no";

    return res.GetTelNum();
}
```

כאן בדיוק היה הפער: השאלה דרשה פעולה חיצונית נקודתית לפי אינדקס, אבל מה שהיה חשוב להדגים זה את דפוס `current`.

## הנקודה הקריטית שחשוב לזכור

`current` מצביע לתא הריק הראשון.
מכאן נובעים שני חוקים:

1. הכנסה: `arrCust[current++] = customer;`
2. חיפוש/מקסימום/מינימום: רצים בלולאה רק עד `i < current` ולא עד `arrCust.Length`

כך נמנעים מלהיכנס לחלק הריק של המערך ומטעויות `NullReferenceException`.

## קישורים מדויקים לווידאו

- [תחילת נושא מערכי עצמים בשיעור](https://youtu.be/ad6T_nmrWHg?t=275)
- [דוגמת הלולאה הפשוטה בהנחה שאין null](https://youtu.be/ad6T_nmrWHg?t=541)
- [הסבר מה זה null במערך עצמים](https://youtu.be/ad6T_nmrWHg?t=560)
- [למה קורסים בלי null checks](https://youtu.be/ad6T_nmrWHg?t=688)
- [בהנחת מערך מלא: foreach עובד נקי](https://youtu.be/ad6T_nmrWHg?t=730)
- [foreach מול for כשלא צריך אינדקס](https://youtu.be/ad6T_nmrWHg?t=809)
- [Lambda/MaxBy והדגשה שזה אסור לבגרות](https://youtu.be/ad6T_nmrWHg?t=987)
- [מעבר לגרסאות עם בדיקות null](https://youtu.be/ad6T_nmrWHg?t=1116)
- [תחביר `is not null` בהקשר הזה](https://youtu.be/ad6T_nmrWHg?t=1542)
- [המעבר לדוגמת Store והשיחה על current](https://youtu.be/ad6T_nmrWHg?t=5330)
- [הגדרה: current מצביע לתא הריק הראשון](https://youtu.be/ad6T_nmrWHg?t=5598)
- [הכנסה למערך עם `arr[current++]`](https://youtu.be/ad6T_nmrWHg?t=5702)
- [השאלה החיצונית (Program2/Bomba) ומה היא באמת דורשת](https://youtu.be/ad6T_nmrWHg?t=5911)
- [למה בדוגמת current רצים עד current ולא עד סוף המערך](https://youtu.be/ad6T_nmrWHg?t=6102)
- [הניסוח המפורש: הטריק הוא לבדוק רק עד current](https://youtu.be/ad6T_nmrWHg?t=6122)
- [סיכום שלך: מה שרצית להדגים הוא הלולאה עד current](https://youtu.be/ad6T_nmrWHg?t=6580)
