---
layout: page
title: "קיצורים ב-VS"
subtitle: "טבלאות קיצורים"
tags: [קיצורים]
author: גיא סידס
lang: he
---

## קיצורים לפקודות נפוצות

| קיצור        | פעולה                             |
|--------------|-----------------------------------|
| `cw`         | `Console.WriteLine`               |
| `if`         | בלוק תנאי `if`                    |
| `el`         | בלוק `else`                       |
| `fo`         | בלוק `for`                        |
| `forr`       | בלוק `for` מהסוף להתחלה          |
| `wh`         | בלוק `while`                      |
| `fore`       | בלוק `foreach`                    |
| `cr`         | ביצוע קלט. דורש snippet          |
| `ip`         | קולט מספר שלם. דורש snippet      |


{: .box-success}
כעת נוסיף קובץ קיצורים משלנו כדי ליעל את העבודה. 

## שילוב snippet שהוכן מראש
נוסיף כעת קובץ קיצורים שימושי. יש לעקוב אחר השלבים הבאים. הקובץ יוסיף את הקיצורים ip לביצוע קלט ו- `int.Parse`, את הקיצור  cr עבור `Console.ReadLine()` ואת הקיצור main לכתיבת הכותרת של תכנית ראשית.

1. [לחצו על הקישור להורדת קובץ קיצורים מעודכן](/cs/rl.snippet)
2. פתחו את **סייר הקבצים** ע"י הקלדת explorer בשורת החיפוש
3. הדביקו את הנתיב בשורת הכתובת של סייר הקבצים 

    
    documents\Visual Studio 2022\Code Snippets\Visual C#\My Code Snippets
    
    או

    מסמכים\Visual Studio 2022\Code Snippets\Visual C#\My Code Snippets
    
    או

    %USERPROFILE%\Documents\Visual Studio 2022\Code Snippets\Visual C#\My Code Snippets

    או, שתכנסו באופן ידני מתוך המסמכים שלכם, לתתי התיקיות הרשומות כאן עד שתגיעו

4.העתיקו את הקובץ שהורדתם לתיקייה שנפתחה. במידת הצורך ניתן לפתוח עוד explorer

אם הקיצורים עובדים, הקלדת `ip ⟶⟶` תוסיף את הקוד הבא:
```csharp
Console.Write("Enter a number: ");
int num1 = int.Parse(Console.ReadLine());
```


## קיצורי מקשים (קיימים), לעריכת קוד

| קיצור מקשים     | פעולה                                      |
|------------------|--------------------------------------------|
| `Ctrl + K, C`      | הפוך לשורת הערה (comment)                |
| `Ctrl + K, U`     | הסר שורת הערה (uncomment)                |
| `/ + Ctrl`     | צור / בטל שורת הערה, תואם pycharm, inteliJ  |
| `Ctrl + K, D`     | יישור קוד (format/align)                  |
| `F12`             | קפיצה להגדרת משתנה/פונקציה              |
| `Ctrl + Z`        | ביטול פעולה (Undo)                        |
| `Ctrl + Y`        | חזרה על פעולה (Redo)                      |
| `Ctrl + D`        | שכפול שורה. (מצריך הגדרה ידנית)       |
| `. + Ctrl + Shift`        | זום אין. מגדיל טקסט       |
| `, + Ctrl + Shift`        | זום אאוט. מגדיל טקסט       |
| `גלגלת + Ctrl`        | זום אין/אוט       |