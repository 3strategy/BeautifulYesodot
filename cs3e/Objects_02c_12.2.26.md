---
layout: page
title: "פרק 11.2ג – סיכום שיעור 12.2.26"
subtitle: "המשך מערכי עצמים, null, static, ודיוק על static void Main"
tags: [C#, objects, arrays, null, static, Main, getters, setters, CodeClassroom, NUnit, exe, dll, class library]
lang: he
---

## סיכום שיעור (12.2.26)

פתחנו [בחזרה ממוקדת על שיעור קודם](https://youtu.be/9YJ5iEMb28w?t=5): מערך עצמים, לולאות, ומה עובד נקי כשאין `null`. מיד אחר כך הזכרנו את התבנית הפשוטה של “מתחילים מהאיבר הראשון ומחפשים טוב ממנו” [בהנחת מערך מלא](https://youtu.be/9YJ5iEMb28w?t=22), ואז [גרסה עם `null`](https://youtu.be/9YJ5iEMb28w?t=67). שאלתם שוב על `MaxBy` - usage of Lambda expressions -, וחזרנו על כך [שזה חד משמעית אסור בשימוש בבגרות](https://youtu.be/9YJ5iEMb28w?t=112) למרות שהוא נוח. הוא גם קשה להבנה בשלב זה.

אחרי החימום חזרנו ל־`Store`/`Customer`, ושם הבהרנו שוב את השימוש ב-`current`: הוא [מצביע לתא הריק הראשון](https://youtu.be/9YJ5iEMb28w?t=192), ולכן ההכנסה היא קודם תא נוכחי ואחר כך הגדלה (`++current`) [כמו שהודגם](https://youtu.be/9YJ5iEMb28w?t=222). דרך השאלות בכיתה זוקק הניסוח: `current` הוא גם “מספר לקוחות”, וגם [אינדקס לתא הפנוי הבא](https://youtu.be/9YJ5iEMb28w?t=347).

מכאן התפתח דיאלוג חשוב: אם מוחקים תא באמצע, האם להשאיר “חור” (`null`) או לשמור רצף. השאלה התחילה [בתרחיש מחיקה מתוך האמצע](https://youtu.be/9YJ5iEMb28w?t=463), והפתרון שנבנה בכיתה היה הזזה שמאלה כדי לשמור מערך “contiguous” [ללא חורים באמצע](https://youtu.be/9YJ5iEMb28w?t=852). תוך כדי, ננעלו שתי נקודות קצה קלאסיות: `current - 1` כדי לא לגלוש [ל־out of range](https://youtu.be/9YJ5iEMb28w?t=947), ואיפוס התא האחרון לאחר ההזזה [ל־`null`](https://youtu.be/9YJ5iEMb28w?t=1020).

חשוב לשמר את ההקשר לבגרות: לא נתקלתי בבגרות בשאלה שמבקשת ממש “למחוק + להזיז + לצמצם” (בטח שלא להסיק במשתמע שכך צריך לבצע את המחיקה). בפונקציה כזאת [בדיוק](https://youtu.be/9YJ5iEMb28w?t=1145), אבל כן חשוב להכיר כי זה מחדד מאוד הבנה של `current` והמנגנון [הבסיסי והנקי](https://youtu.be/9YJ5iEMb28w?t=1268).

<details markdown="1"><summary>הקוד של <code>RemoveCust</code> </summary>

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

internal class Store
{
  private Customer[] arrCust new Customer[100]; // אפילו עדיף
  private int current; // מחזיק את האינדקס של התא הריק הראשון

  public Store()
  {
    //arrCust = new Customer[100]; // = האיתחול שהודגם בשיעור
    current = 0;
  }

  public void AddCus(Customer customer)
  {
    //arrCust[current++] = customer; // short version as was on 5.2 lesson
    arrCust[current] = customer; // current is the index of the first empty cell
                                 // current is also the number of customers
    current++; // current is the index of the next empty place
  }

  public Customer RemoveCust(int ind)
  {
    if (ind >= current || ind < 0)
      return null;
    
      Customer customer = arrCust[ind];
    //0 1 2  (current == 3 take for example a full array of Length 3 to detect and avoid index out of range situation)
    //A B C  
    for (int i = ind; i < current - 1; i++) // index out of range exception : תמיד צריך להיזהר מזה 
      arrCust[i] = arrCust[i + 1];
    // B C C (after the loop ends)

    arrCust[current - 1] = null; 
    // B C null

    current--;
    return customer;
  }
```

</details>

בשלב התרגול עברנו לשאלה 3 [מהמבחן](/cs3e/tests/Test10.2.26) (`Interesting`) והודגש שהתבנית של שבוע שעבר למערך מלא עצמים לא מספיקה [כמו שהיא](https://youtu.be/9YJ5iEMb28w?t=1455), כי כאן יש סינון `price >= 10`. סביב [00:37:43](https://youtu.be/9YJ5iEMb28w?t=2263) הייתה הבהרה חשובה של ניסוח השאלה (“10 או יותר” לא מבטיח ש-10 קיים), ומהנקודה הזאת נבנה פתרון `lowP = null` שמתעדכן רק כשנכנסים לחלק הרלוונטי [בלי ליפול ל־NullReference](https://youtu.be/9YJ5iEMb28w?t=2319). אחר כך אחד המורים הציע בצדק לשפר קריאות ולהוציא את תנאי `>= 10` לשכבה חיצונית [כדי לא לחזור עליו פעמיים](https://youtu.be/9YJ5iEMb28w?t=2439), והשיפור התקבל [בכיתה](https://youtu.be/9YJ5iEMb28w?t=2544) ועדכנו את [פתרון הבחינה](/cs3e/tests/testSol).

```csharp
public static string Interesting(Product[] arr)
{
  Product lowP = null;
  foreach (Product p in arr)
  {
    if (p.GetPrice() >= 10)
      if (lowP == null || p.GetPrice() < lowP.GetPrice())
        lowP = p;
  }

  return lowP.GetName();
}
```

באמצע התרגול עלתה תקלה מאוד נפוצה: “פתחתי קובץ שהורדתי, אני רואה אותו ב־Visual Studio, אז הוא בטוח חלק מהפרויקט”. כאן נעצרנו בדיוק כדי לתקן תפיסה: [עצם זה שהקובץ פתוח בעורך לא אומר שהוא בפרויקט](https://youtu.be/9YJ5iEMb28w?t=3389), ולכן חייבים לבצע את השלבים [קליק ימני על הפרויקט](https://youtu.be/9YJ5iEMb28w?t=3448) ⟵ [Add](https://youtu.be/9YJ5iEMb28w?t=3451) ⟵ [Existing Item](https://youtu.be/9YJ5iEMb28w?t=3457). זו נקודה חשובה מאוד להוראה פרקטית.

במקביל הודגמה גם הסיטואציה של “עובד לי ב־VS אבל לא עובר ב־CodeClassroom”: השגיאה נקראה [בלייב](https://youtu.be/9YJ5iEMb28w?t=2665) ונמצאה בעיית casing (`Getday` מול `GetDay`) [בדיוק במקום שבו הטסטים מצפים לשם אחר](https://youtu.be/9YJ5iEMb28w?t=2706). מכאן הגיעה החזרה על הקיצור `gs`, על PascalCase, ועל הכלל “כל מילה חדשה מתחילה באות גדולה” [כולל ההקשר לג׳אווה](https://youtu.be/9YJ5iEMb28w?t=2777). לכן ההמלצה נשארה חד־משמעית: לעבוד עם snippet `gs` כדי למנוע טעויות שמכשילות טסטים [במערכת ההגשות](https://youtu.be/9YJ5iEMb28w?t=2796).

לפני סטטי (ואז שוב אחריו) נפתחה סטייה מבוקרת ל־C# native properties: [הצגת `prop/propfull`](https://youtu.be/9YJ5iEMb28w?t=2861), ההבנה שהשמה לתכונה מפעילה setter [מאחורי הקלעים](https://youtu.be/9YJ5iEMb28w?t=2947), והמעבר מ־`prop` ל־`propfull` כשצריך ולידציה [בשלב מאוחר יותר](https://youtu.be/9YJ5iEMb28w?t=3108). הודגש גם ההבדל הטרמינולוגי בין `field` ל־`property` [בסביבות 52:24](https://youtu.be/9YJ5iEMb28w?t=3144), ולמה דוחים את זה פדגוגית עד שהתלמידים מקבעים קודם את Java-style getter/setter [לצרכי הבגרות](https://youtu.be/9YJ5iEMb28w?t=3217).

<details markdown="1"><summary>לדיוק פדגוגי: למה בכל זאת מלמדים קודם Java-style</summary>

- זה שומר “שפה אחידה” למורים שמלמדים גם C# וגם Java.
- זה מונע בשלב מוקדם בלבול בין שדה פרטי לבין גישה חיצונית.
- חשוב שתהיה הפרדה ארוכה בזמן לפני שמלמדים תלמידים את האמת לגבי C#, כדי שהזיכרון הראשוני שהם צריכים לבגרות יתקבע.

</details>

בחלק של `static` הודגש שהמוקד הפעם הוא לא מחלקה סטטית, אלא [שדה סטטי (מה שאליו מתייחסים כתכונה במשרד החינוך)](https://youtu.be/9YJ5iEMb28w?t=3558): בדוגמת `nextAccountNumber` [ההכרזה](https://youtu.be/9YJ5iEMb28w?t=3571) ואז ההסבר שזה ערך שקיים **פעם אחת ברמת המחלקה** [ולא לכל עצם](https://youtu.be/9YJ5iEMb28w?t=3600). מהלך הדוגמה עם כמה עצמים חיזק איך המספר רץ 1000, 1001, 1002 [כי כולם חולקים אותו משתנה](https://youtu.be/9YJ5iEMb28w?t=3899), הודגש שהסטטי זמין אפילו לפני יצירת עצם. אפשר לראות שהסטטי כבר זמין [בפניה אליו דרך שם המחלקה](https://youtu.be/9YJ5iEMb28w?t=4045).

מכאן הגיע הדיוק הקריטי: ב־C# גישה לסטטי היא דרך `ClassName.Member` בלבד. זה הודגם שוב ושוב, כולל ניסוי שבו ==גישה דרך עצם פשוט לא מתקבלת== [כמותר/אסור](https://youtu.be/9YJ5iEMb28w?t=4258), וסוכם במפורש: תכונה סטטית ניגשים אליה בשם המחלקה [ולא דרך עצם](https://youtu.be/9YJ5iEMb28w?t=4283). הדגמת `Console.ForegroundColor` [חיברה את העיקרון לדוגמה (native C# static property) מוכרת](https://youtu.be/9YJ5iEMb28w?t=5714).

ואז נסגר המעגל של `public static void Main`: נשאלה השאלה “למה כל הזמן static ב־Main?” [ב־01:13:21 נבנתה תשובה מדורגת](https://youtu.be/9YJ5iEMb28w?t=4401),: `Main` הוא [entry point יחיד](https://youtu.be/9YJ5iEMb28w?t=4436), ולכן הוא סטטי; בתוך `Main` לא קיים עדיין עצם של `Program`, ולכן אי אפשר לקרוא ישירות לפעולה לא סטטית [בלי ליצור עצם](https://youtu.be/9YJ5iEMb28w?t=4468). בהמשך גם הודגם ששם המחלקה לא חשוב, ו־`Main` יכול לזוז למחלקה אחרת כל עוד נשאר [`Main` יחיד בפרויקט](https://youtu.be/9YJ5iEMb28w?t=4882).



<details markdown="1"><summary>דיוק קצר למורי Java: ההבדל שהודגש בשיעור</summary>

בשיעור עלתה שוב ושוב ההבחנה שב־C# פונים לסטטי דרך שם מחלקה בלבד, ואילו ב־Java לעיתים אפשר גם דרך reference של עצם (גם אם זה לא מומלץ סגנונית).

```csharp
// C#
// obj.StaticProp = 1; // לא תקין
MyType.StaticProp = 1; // תקין
```

```java
// Java
obj.staticField = 1;      // מתקמפל, אבל לא מומלץ
MyType.staticField = 1;   // הצורה המומלצת
```

מבחינת הוראה: כדאי להמשיך להתעקש בכיתה על `ClassName.Member` גם ב־Java, כדי לשמור עקביות מחשבתית עם המשמעות של static.

</details>

## יצירת פרוייקט בדיקות - הדגמה {#idNunitTest}

<details markdown="1"><summary>הרחבת מורים (מחוץ לחומר): מתי אין צורך ב־<code>Main</code>, ומתי הוא כן חובה. יצרנו פרוייקט ספרייה, ויצרנו פרוייקט בדיקות</summary>

ההסבר על `static Main` הורחב כאן לפרקטיקה של בניית פתרונות אמיתיים. זו סטייה מחומר הליבה, אבל חשובה מאוד למורים.

1. על הצד ה"שלילי" (כשאין `Main`): יצרנו [Class Library חדשה בתוך אותו Solution](https://youtu.be/9YJ5iEMb28w?t=4713), כדי להמחיש שפרויקט כזה מייצר DLL נוסף ולא נקודת כניסה להרצה.
2. המשכנו ליצירת [פרויקט בדיקות NUnit](https://youtu.be/9YJ5iEMb28w?t=4932), ואז הודגש במפורש שבפרויקט בדיקות [לא אמור להיות `Main`](https://youtu.be/9YJ5iEMb28w?t=4947).
3. כדי שה־tests יוכלו לגשת לקוד, הודגם גם שלב החיבור בין הפרויקטים דרך [Add Project Reference](https://youtu.be/9YJ5iEMb28w?t=5020).
4. על הצד ה"חיובי" (כשכן צריך `Main`): בפרויקט שמטרתו הרצה (`.exe`) חייבת להיות נקודת כניסה אחת; זה סוכם שוב סביב [single entry point](https://youtu.be/9YJ5iEMb28w?t=5477).
5. כדי להפוך את זה למוחשי, נפתח חלון `cmd` מתוך התיקייה הנכונה (באמצעות הקלדת `cmd` משורת הכתובת ב־Explorer-סייר הקבצים) [והודגם הרצה מה־CMD](https://youtu.be/9YJ5iEMb28w?t=5409).
6. מאותה הרצה הודגם גם איך שולחים פרמטרים חיצוניים ל־`Main(args)` ואיך קוראים אותם מתוך `args` [בפועל](https://youtu.be/9YJ5iEMb28w?t=5483).

</details>
