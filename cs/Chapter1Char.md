---
layout: page
title: "הטיפוס char"
subtitle: "הסבר על משתנים מסוג תו / char"
tags: [תווים, ascii, casting]
author: גיא סידס
lang: he
---

{: .box-note}
משתנה מסוג `char` בשפת C# מיועד לאחסן תו בודד (אות, ספרה, סימן מיוחד וכדומה). בפועל, תווים אלו מיוצגים בצורה מספרית, לפי תקן ASCII (American Standard Code for Information Interchange).

{: .box-warning}
**תו עוטפים בגרש בודד ' במקום בגרשיים "** ```;'char ch = 'b```

### דוגמת קוד להמרות בין char ו-int

הקוד הבא מדגים כיצד משתנה מסוג char ניתן להמרה למספר שלם (`int`) ולהפך:

{% highlight csharp linenos %}static void Main(String[] args)
{
    int num;
    char ch;
    ch = 'c';   // ch למשתנה 'c' השמה של התו 
    num = ch;   // num לתוך המשתנה ASCII המרה אוטומטית. קבלת קוד 
    Console.WriteLine("num == " + num); // 99 :'c' יוצג הערך המספרי של   
    Console.WriteLine("ch == " + ch);   // 'c' יציג את התו 
    ch = (char)(num + 1);   // 'c' יקבל את התו הבא אחרי ch המרה מפורשת: המשתנה  
    Console.WriteLine("ch == " + ch); // 'd' יציג את התו 
}
{% endhighlight %}

### מידע נוסף על תווים (ASCII)

ASCII הוא תקן אמריקאי לייצוג מידע באמצעות ספרות, המאפשר הצגה של אותיות, מספרים וסימנים שונים בקוד בינארי. כל תו מיוצג באמצעות מספר בין 0 ל-127 לדוגמה:
בקוד ASCII, התו 'A' מתאים למספר 65, התו 'B' מתאים ל-66, התו 'a' ל-97 והתו 'b' ל-98.

כאשר ממירים בין משתנים מטיפוס char למשתנים מטיפוס int, המשתנה מטיפוס char יומר לערך המספרי של קוד ה-ASCII של התו שהוא מאחסן. בכיוון ההפוך, כאשר ממירים משתנה מטיפוס int למשתנה מטיפוס char, מתקבל התו המתאים לערך המספרי של קוד ה-ASCII.

לדוגמה, ההמרה הבאה:

```csharp
ch = (char)num;
```

תציב במשתנה מסוג char את התו שקוד ה-ASCII שלו שווה לערך המספרי המאוחסן ב-num.

{: .box-note}
טיפוס char בשפת C# הוא 16bit, בניגוד לשפות אחרות בהן תו (char) הוא בגודל של 8 ביט בלבד.
הסיבה לכך היא שתווי C# מאוחסנים בתקן UTF-16, המאפשר תמיכה במגוון רחב של תווים בינלאומיים מעבר לתווי האלפבית האנגלי הפשוט, כגון תווים בעברית (א, ב...), ערבית, סינית, רוסית, וסימנים מיוחדים נוספים (כגון סימני מטבע: ₪, €, £ וכדומה).
עם זאת, תווים שנמצאים מעל הטווח הבסיסי (מעל U+FFFF), כמו אימוג'ים למשל 😀, דורשים יותר מ-16 ביט ולכן מיוצגים ב-UTF-16 כזוג תווים (Surrogate Pair). כתוצאה מכך, לא ניתן להכניס אותם לתוך משתנה יחיד מסוג char, אלא רק במחרוזת (string) שמורכבת מרצף של תווים:
```csharp
// לא חוקי - '😀' מיוצג בזוג תווים
// char emoji = '😀';

// חוקי - מחרוזת יכולה להכיל זוגות UTF-16
string emoji = "😀";
```



## תרגול - הריצו את שתי גרסאות הקוד הבאות

{% highlight csharp linenos %}static void Main(String[] args)
{
    int num;
    char ch; 
    ch = 'c'; // c has ascii value 99
    num = ch; // implicit type conversion from char to int
    Console.WriteLine("num=" + num);
    Console.WriteLine("ch=" + ch);
}
{% endhighlight %}

**בגרסה הבאה יש שגיאה.** העתיקו את הקוד, הריצו אותו, וזהו מה השגיאה (בעזרת הודעות השגיאה של VS):

{% highlight csharp linenos %}static void Main(String[] args)
{
    int num;
    char ch;
    num = 99;
    ch = num;
    Console.WriteLine("num=" + num);
    Console.WriteLine("ch=" + ch);
}
{% endhighlight %}
