---
layout: page
title: "הטיפוס char"
subtitle: "הסבר על משתנים מסוג תו / char"
tags: [תווים, ascii, casting]
author: גיא סידס
lang: he
---

{: .box-note}
משתנה מסוג `char` בשפת C# מיועד לאחסן תו בודד (אות, ספרה, סימן מיוחד וכדומה). בפועל, הוא מאחסן ערך מספרי של יחידת קוד UTF-16 בתקן Unicode. עבור תווי ASCII הבסיסיים, כמו אותיות באנגלית וספרות, הערכים זהים לערכי ASCII.

{: .box-warning}
**תו עוטפים בגרש בודד (`'`) במקום בגרשיים (`"`):** `char ch = 'b';`

### למה ההמרה אוטומטית רק בכיוון אחד?

{: .box-note}
חשבו על `char` כעל קופסה קטנה ועל `int` כעל קופסה גדולה: ערכי `char` הם בטווח 0–65,535, ואילו `int` יכול להכיל גם מספרים שליליים וגם מספרים חיוביים עד 2,147,483,647. לכן כל ערך של `char` נכנס ב־`int` בלי לאבד מידע, וההמרה אוטומטית. בכיוון ההפוך, מספר כמו 1,000,000 לא נכנס ב־`char`, ולכן נדרשת המרה מפורשת באמצעות `(char)`. זכרו: **מ־`char` ל־`int` — אוטומטי; מ־`int` ל־`char` — נדרש cast.** ה־cast אינו מבטיח שהערך מתאים לטווח.

למשל, לתו `'c'` יש ערך Unicode של 99: ההשמה `int num = 'c';` שומרת 99, והביטוי `(char)(num + 1)` מחזיר את התו `'d'`, שערכו 100.

### דוגמת קוד להמרות בין char ו-int

הקוד הבא מדגים כיצד משתנה מסוג char ניתן להמרה למספר שלם (`int`) ולהפך:

{% highlight csharp linenos %}static void Main(String[] args)
{
    int num;
    char ch;
    ch = 'c';   // ch למשתנה 'c' השמה של התו 
    num = ch;   // המרה אוטומטית לערך המספרי של התו ב־Unicode
    Console.WriteLine("num == " + num); // 99 :'c' יוצג הערך המספרי של   
    Console.WriteLine("ch == " + ch);   // 'c' יציג את התו 
    ch = (char)(num + 1);   // 'c' יקבל את התו הבא אחרי ch המרה מפורשת: המשתנה  
    Console.WriteLine("ch == " + ch); // 'd' יציג את התו 
}
{% endhighlight %}

### מידע נוסף על תווים (ASCII)

ASCII הוא תקן אמריקאי לייצוג מידע באמצעות ספרות, המאפשר הצגה של אותיות, מספרים וסימנים שונים בקוד בינארי. כל תו מיוצג באמצעות מספר בין 0 ל-127 לדוגמה:
בקוד ASCII, התו 'A' מתאים למספר 65, התו 'B' מתאים ל-66, התו 'a' ל-97 והתו 'b' ל-98.

כאשר ממירים מ־`char` ל־`int`, מתקבל הערך המספרי של יחידת הקוד ב־Unicode. בכיוון ההפוך, המרה מפורשת של `int` שערכו בטווח של `char` מחזירה את יחידת הקוד המתאימה. עבור תווי ASCII שבטבלה בהמשך, זהו גם קוד ה־ASCII של התו.

לדוגמה, ההמרה הבאה:

```csharp
ch = (char)num;
```

תציב במשתנה מסוג `char` את יחידת הקוד שערכה שווה למספר המאוחסן ב־`num`, בתנאי שהמספר בטווח 0–65,535.

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
    ch = 'c'; // c has Unicode value 99 (also ASCII)
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



## טבלת ASCII

| Dec | Hex  | Char | Description      | Dec | Hex  | Char | Description      |
|-----|------|------|------------------|-----|------|------|------------------|
| 0   | 0x00 | NUL  | Null             | 64  | 0x40 | @    | At sign          |
| 1   | 0x01 | SOH  | Start of Header  | 65  | 0x41 | A    | Uppercase A      |
| 2   | 0x02 | STX  | Start of Text    | 66  | 0x42 | B    | Uppercase B      |
| 3   | 0x03 | ETX  | End of Text      | 67  | 0x43 | C    | Uppercase C      |
| 4   | 0x04 | EOT  | End of Transmiss.| 68  | 0x44 | D    | Uppercase D      |
| 5   | 0x05 | ENQ  | Enquiry          | 69  | 0x45 | E    | Uppercase E      |
| 6   | 0x06 | ACK  | Acknowledge      | 70  | 0x46 | F    | Uppercase F      |
| 7   | 0x07 | BEL  | Bell             | 71  | 0x47 | G    | Uppercase G      |
| 8   | 0x08 | BS   | Backspace        | 72  | 0x48 | H    | Uppercase H      |
| 9   | 0x09 | TAB  | Horizontal Tab   | 73  | 0x49 | I    | Uppercase I      |
| 10  | 0x0A | LF   | Line Feed        | 74  | 0x4A | J    | Uppercase J      |
| 11  | 0x0B | VT   | Vertical Tab     | 75  | 0x4B | K    | Uppercase K      |
| 12  | 0x0C | FF   | Form Feed        | 76  | 0x4C | L    | Uppercase L      |
| 13  | 0x0D | CR   | Carriage Return  | 77  | 0x4D | M    | Uppercase M      |
| 14  | 0x0E | SO   | Shift Out        | 78  | 0x4E | N    | Uppercase N      |
| 15  | 0x0F | SI   | Shift In         | 79  | 0x4F | O    | Uppercase O      |
| 16  | 0x10 | DLE  | Data Link Escape | 80  | 0x50 | P    | Uppercase P      |
| 17  | 0x11 | DC1  | Device Control 1 | 81  | 0x51 | Q    | Uppercase Q      |
| 18  | 0x12 | DC2  | Device Control 2 | 82  | 0x52 | R    | Uppercase R      |
| 19  | 0x13 | DC3  | Device Control 3 | 83  | 0x53 | S    | Uppercase S      |
| 20  | 0x14 | DC4  | Device Control 4 | 84  | 0x54 | T    | Uppercase T      |
| 21  | 0x15 | NAK  | Negative Ack     | 85  | 0x55 | U    | Uppercase U      |
| 22  | 0x16 | SYN  | Synchronous Idle | 86  | 0x56 | V    | Uppercase V      |
| 23  | 0x17 | ETB  | End of Block     | 87  | 0x57 | W    | Uppercase W      |
| 24  | 0x18 | CAN  | Cancel           | 88  | 0x58 | X    | Uppercase X      |
| 25  | 0x19 | EM   | End of Medium    | 89  | 0x59 | Y    | Uppercase Y      |
| 26  | 0x1A | SUB  | Substitute       | 90  | 0x5A | Z    | Uppercase Z      |
| 27  | 0x1B | ESC  | Escape           | 91  | 0x5B | [    | Left Bracket     |
| 28  | 0x1C | FS   | File Separator   | 92  | 0x5C | \    | Backslash        |
| 29  | 0x1D | GS   | Group Separator  | 93  | 0x5D | ]    | Right Bracket    |
| 30  | 0x1E | RS   | Record Separator | 94  | 0x5E | ^    | Caret            |
| 31  | 0x1F | US   | Unit Separator   | 95  | 0x5F | _    | Underscore       |
| 32  | 0x20 | (sp) | Space            | 96  | 0x60 | `    | Grave Accent     |
| 33  | 0x21 | !    | Exclamation Mark | 97  | 0x61 | a    | Lowercase a      |
| 34  | 0x22 | "    | Double Quote     | 98  | 0x62 | b    | Lowercase b      |
| 35  | 0x23 | #    | Number Sign      | 99  | 0x63 | c    | Lowercase c      |
| 36  | 0x24 | $    | Dollar Sign      | 100 | 0x64 | d    | Lowercase d      |
| 37  | 0x25 | %    | Percent Sign     | 101 | 0x65 | e    | Lowercase e      |
| 38  | 0x26 | &    | Ampersand        | 102 | 0x66 | f    | Lowercase f      |
| 39  | 0x27 | '    | Apostrophe       | 103 | 0x67 | g    | Lowercase g      |
| 40  | 0x28 | (    | Left Parenthesis | 104 | 0x68 | h    | Lowercase h      |
| 41  | 0x29 | )    | Right Parenthesis| 105 | 0x69 | i    | Lowercase i      |
| 42  | 0x2A | *    | Asterisk         | 106 | 0x6A | j    | Lowercase j      |
| 43  | 0x2B | +    | Plus Sign        | 107 | 0x6B | k    | Lowercase k      |
| 44  | 0x2C | ,    | Comma            | 108 | 0x6C | l    | Lowercase l      |
| 45  | 0x2D | -    | Hyphen           | 109 | 0x6D | m    | Lowercase m      |
| 46  | 0x2E | .    | Period           | 110 | 0x6E | n    | Lowercase n      |
| 47  | 0x2F | /    | Slash            | 111 | 0x6F | o    | Lowercase o      |
| 48  | 0x30 | 0    | Digit Zero       | 112 | 0x70 | p    | Lowercase p      |
| 49  | 0x31 | 1    | Digit One        | 113 | 0x71 | q    | Lowercase q      |
| 50  | 0x32 | 2    | Digit Two        | 114 | 0x72 | r    | Lowercase r      |
| 51  | 0x33 | 3    | Digit Three      | 115 | 0x73 | s    | Lowercase s      |
| 52  | 0x34 | 4    | Digit Four       | 116 | 0x74 | t    | Lowercase t      |
| 53  | 0x35 | 5    | Digit Five       | 117 | 0x75 | u    | Lowercase u      |
| 54  | 0x36 | 6    | Digit Six        | 118 | 0x76 | v    | Lowercase v      |
| 55  | 0x37 | 7    | Digit Seven      | 119 | 0x77 | w    | Lowercase w      |
| 56  | 0x38 | 8    | Digit Eight      | 120 | 0x78 | x    | Lowercase x      |
| 57  | 0x39 | 9    | Digit Nine       | 121 | 0x79 | y    | Lowercase y      |
| 58  | 0x3A | :    | Colon            | 122 | 0x7A | z    | Lowercase z      |
| 59  | 0x3B | ;    | Semicolon        | 123 | 0x7B | {    | Left Brace       |
| 60  | 0x3C | <    | Less Than        | 124 | 0x7C | \|   | Vertical Bar      |
| 61  | 0x3D | =    | Equal Sign       | 125 | 0x7D | }    | Right Brace      |
| 62  | 0x3E | >    | Greater Than     | 126 | 0x7E | ~    | Tilde            |
| 63  | 0x3F | ?    | Question Mark    | 127 | 0x7F | DEL  | Delete           |
