


מחלקת טיפוס הנתונים מחרוזת (String) כוללת בתכנית הלימודים, אך מוגבלת לפעולות הבאות בלבד: myString[ind], .Contains(value), .IndexOf(char), .Length
{: .box-note}

נובע, שאין הכרח ללמד את הכלים הנוחים שראינו שהם שימושיים ליום יום להדפסות, ולהקנייה של פעולות בשרשרת על עצמים, אבל פחות רלוונטית בהמשך בעבודה עם פונקציות שמטפלות במערכים ובעצמים: .Replace(), .Substring(), .Split(","). תלמידים במקרים רבים גם ישכחו את אופן השימוש הנכון ולכן עדיף להקדיש כמה שפחות זמן לדברים האלו. 
{: .box-note}

לטעמי גם הבנה ההתנהגות של מחרוזת בהיבט של מצביעים לכתובות זכרון הפניות, הבנת המושג immutable הם מיותרים, במיוחד בשלב זה של הלמידה. עדיף להבין לעומק מהו מצביע לאובייק כשעובדים עם מערכים, ואחר כך מחלקות.

למי שרוצה להתעמק בהבנה הנושא כבר בשלב זה, ניתן להיעזר [בפרוייקט שהכנתי כאן](https://github.com/3strategy/ConsApp4ObjectAddresses). לא נראה זאת בשיעור (למניעת בלבול מיותר). מומלץ לחזור לפרוייקט הזה לאחר לימוד עצמים (הדוגמא מכילה שני פרוייקטים - אחד לעצמים ואחד למחרוזות. יתכן שבהמשך אוסיף גרסה לשלמים)

## וכעת, השאלה היא מה נותר ללמד? 
כיוון שאנחנו לא בתחילת הלמידה - ניגע ישר בעצם העניין. מחרוזת היא טיפוס שדומה במקצת למערך בכך שניתן לגשת לתו לפי מיקום:

מחרוזת מתנהגת *לצורכי **קריאה** (שליפת נתון)* **כמו** מערך של תווים, ונראה זאת בדוגמא הפשוטה הבאה הממחישה את הנקודה
```csharp
string s = "Great";
Console.WriteLine(s[1]); // r ידפיס 
Console.WriteLine(s[5]); // Exception: index out of range  : שגיאת זמן ריצה
// האינדקס האחרון כאן הוא 4, כי האינדקס מתחיל מ-0

```

אולם מחרוזת אינה באמת מערך מפני שהיא **immutable**, כלומר, **לא ניתן לשנות אותה** - לכתוב בתוכה.

```csharp
s[1] = 'G'; // Property or indexr cannot be assigned to -- it is read only 

```


לדבר על מיון לקסיקוגרפי:

```csharp
string s1 = "Goat";
string s2 = "great";
string s3 = "car";
string s4 = "Car";

Console.WriteLine(s1.CompareTo(s2)); // -1 meaning s2 comes before
Console.WriteLine(s4.CompareTo(s2)); // -1 meaning car comes before
Console.WriteLine(s4.CompareTo(s3)); // 1 meaning Car comes after car
Console.WriteLine(s4.CompareTo(s4)); // 3 meaning same position
```

## תרגילים להתנסות


```csharp
st1 = "Take a fake pen";
n = st1.LastIndexOf("ake");
// n = ?

st1 = "Keep it simple";
st2 = "it";
n = st1.IndexOf(st2);   // n = ?

s1 = "Think about jumping";
s2 = s1.Remove(5,11);
// s2 = ?

st = "Dont say hello";
s1 = st.Substring(5, 8);
// s1 = ?

s1 = "You are OK";
s2 = "OK";
st = s1.Replace(s2, "awesome");
// st = ?

s1 = "Jish";
s2 = "beri";
st = s1.Insert(2, s2);
// st = ?
```


## תרגול

[⬅ עִבְרוּ לתרגול 3.1 - מחרוזות](/cs2/Chapter8Ex8.1)




## סרטונים

[סרטוני פרק 8: מחרוזות](https://www.youtube.com/playlist?list=PLnVUJu2KuoA22PXymfu7FrV3hrYIinEb7){:target="_blank"}
