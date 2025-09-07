---
layout: page
title: "פרק 7 - פונקציות (המשך)"
subtitle: "ניתוח קוד ונושאים מתקדמים"
author: גיא סידס
tags: [פרמטרים אופציונאליים, העמסת פעולות, overloading, גנריות]
mathjax: true
lang: he
---


בפרק זה נבחן מקרה ודרכו נכיר את יתרונות העבודה בפונקציות. נראה נושאים מתקדמים **שרובם אינם בתכנית הלימודים** (או לפחות לא ביסודות). יחד עם זאת אלו נושאים מאד חשובים - כלים משמעותיים בארגז הכלים שמגדיל את הכח והגמישות של פונקציות. נושאים אלו לא יהיו חלק מהתרגול, אך יחשפו אתכם לעושר של השפה, יעזרו בפתרון בעיות, ויקלו עליכם לקרוא קוד שנכתב על ידי אחרים - בין אם זה LLM או דוגמאות **מההיסטוריה** (להיסטוריה קוראים [stack**overflow**](https://stackoverflow.com/))
{: .box-note}

קשה להאמין שה-AI עשה שינוי כל כך גדול בחיינו שהגענו עד לשלב זה ועד היום לא הזכרתי בכלל את stack**overflow**. מדובר באתר שעד לא מזמן היה מוקד העליה לרגל של כל מתכנת, מורה, תלמיד שרוצה לברר משהו במדעי המחשב. אני מקווה שהאתר הזה ימצא דרך לשרוד. מדובר בכלי שהיה **כל כך חשוב** - שלימדתי כיצד להשתמש בו. האתר מכיל את כל השאלות, וכל התשובות, מדורגות לפי תועלת.
{: .box-success}

## 7.4 לימוד מדוגמא: הכח של DRY {#id7.4}
מפאת אורך הקוד, הקטעים שלהלן מקופלים באקורדיון. פתחו וסגרו לפי הצורך. אין משמעות לסיכום ללא ההקשר (השאלה וגרסאות הפתרון). כך מופיע כל הפרק.

<details markdown="1">
<summary>לימוד מדוגמא: הכח של DRY (Don't Repeat Yourself)</summary>

ניקח כדוגמא את השאלה הבאה שפתרנו כבר:
עליכם לכתוב תוכנית שקולטת מהמשתמש 2 מספרים שלמים ותו.
התוכנית **תדפיס את הביטוי החשבוני ואת תוצאת החישוב** שמתקבל בהתאם לתו שנקלט.
לדוגמה: 
- עבור המספרים 2,3 והתו '+' התוכנית תדפיס: $$2+3=5$$ 
- עבור המספרים 2,3 והתו '^' התוכנית תדפיס: $$2\^3 = 8$$
- פתרון השאלה נראה כך:
    <details open markdown="1">
    <summary>פתרון</summary>
    ```csharp
    public static void MainCalc()
    {
        int num1, num2;
        char oprtr;

        Console.Write("Enter first number ");
        num1 = int.Parse(Console.ReadLine());
        Console.Write("Enter second number ");
        num2 = int.Parse(Console.ReadLine());
        Console.Write("Enter operator ");
        oprtr = char.Parse(Console.ReadLine());

        if (oprtr == '+')
            Console.WriteLine($"{num1} + {num2} = {num1 + num2} ");
        else if (oprtr == '-')
            Console.WriteLine($"{num1} - {num2} = {num1 - num2} ");
        else if (oprtr == '*')
            Console.WriteLine($"{num1} * {num2} = {num1 * num2} ");
        else if (oprtr == '/')
            Console.WriteLine($"{num1} / {num2} = {Math.Round(((double)num1 / num2), 2)} ");
        else if (oprtr == '^')
            Console.WriteLine($" {num1} ^ {num2} = {Math.Pow(num1, num2)}");
    }
    ```
    </details>

### נניח כעת שהשאלה מסתבכת טיפה **ונוספות דרישות:**

עליכם לכתוב תוכנית שקולטת מהמשתמש 2 מספרים שלמים ותו.
התוכנית תדפיס את הביטוי החשבוני ואת תוצאת החישוב שמתקבל בהתאם לתו שנקלט. 

**יש לעמוד בנוסף בדרישות הבאות:**
- בשלב הפנייה לקלט, נדפיס את הטקסט בצבע <span style="color:green">ירוק</span>.
- בזמן שהמשתמש מקליד, נקלוט את הטקסט בצבע <span style="color:yellow">צהוב</span>.
- אם יש טעות בקלט, נדפיס **הודעת שגיאה** בצבע <span style="color:red">באדום</span> ונבצע **קלט מחדש**.

    פתרון השאלה **ללא פונקציות יכול להיראות כך**:

    <details open markdown="1"><summary>פתרון</summary>
    ```csharp
    static void MainCalc1()
    {
        int num1;
        while (true)
        {

            Console.ForegroundColor = ConsoleColor.Green; // prompt in green
            Console.Write("Please enter an integer: ");
            Console.ForegroundColor = ConsoleColor.Yellow;                 // user types in yellow
            string input1 = Console.ReadLine();
            Console.ForegroundColor = ConsoleColor.White;

            if (int.TryParse(input1, out num1))
            {
                break; // valid, exit loop
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red; // error in red, then retry
                Console.WriteLine("Invalid integer. Please try again.");
            }
        }

        double num2;
        while (true) // --- Read second number (double) ---
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.Write("Please enter a double: ");
            Console.ForegroundColor = ConsoleColor.Yellow;
            string input2 = Console.ReadLine();
            Console.ForegroundColor = ConsoleColor.White;

            if (double.TryParse(input2, out num2))
            {
                break;
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Invalid double. Please try again.");
            }
        }

        // --- Read operator ---
        char oprtr;
        while (true)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.Write("Please enter operation (+, -, *, /): ");
            Console.ForegroundColor = ConsoleColor.Yellow;
            string opInput = Console.ReadLine();
            Console.ForegroundColor = ConsoleColor.White;

            if (char.TryParse(opInput, out oprtr) &&
                (oprtr == '+' || oprtr == '-' || oprtr == '*' || oprtr == '/'))
            {
                break;
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Invalid operator. Must be +, -, * or /.");
            }
        }

        // --- Do the calculation inline ---
        Console.ForegroundColor = ConsoleColor.White;
        if (oprtr == '+')
            Console.WriteLine($"{num1} + {num2} = {num1 + num2}");
        else if (oprtr == '-')
            Console.WriteLine($"{num1} - {num2} = {num1 - num2}");
        else if (oprtr == '*')
            Console.WriteLine($"{num1} * {num2} = {num1 * num2}");
        else if (oprtr == '/')
        {
            if (num2 != 0)
                Console.WriteLine($"{num1} / {num2} = {Math.Round((double)num1 / num2, 2)}");
            else
                Console.WriteLine("Cannot divide by zero.");
        }
        //כ-80 שורות עם 3 קטעים מסיביים שחוזרים על עצמם ועושים בדיוק אותו דבר
        Console.ResetColor(); // restore default colours
    }
    ```
    </details>

    <div markdown="1" class="box-warning">
    **סימפטומים בעייתיים:** 
    - שלושה בלוקים נפרדים של `while(true)`, אחד עבור כל קלט.
    - פיזור רב של שינויי צבע סביב כל בקשה לקלט, קריאת הקלט וטיפול בשגיאות.
    - ניתוח נתונים בתוך הקוד (inline parsing) באמצעות `TryParse` והצגת הודעות שגיאה.
    - כל לוגיקת החישוב מוטמעת בתוך `Main` במקום פונקציה נפרדת לשימוש חוזר.
    - כפילות הקוד האורך והסרבול שמתקבל **ממחישים היטב מדוע כדאי להשתמש בפונקציות**, ואפילו יותר — בפונקציות **גנריות** כמו `>Input<T` — כדי לצמצם כפילויות ולשפר את קריאות הקוד.
    </div>


### כך תיראה השאלה בכתיבה תוך פיצול לפונקציות:

<details open markdown="1">
<summary>פתרון</summary>

```csharp
public static void MainCalc2()
{
    // נדמה שהפתרון כתוב בראשי פרקים
    int n1 = Input<int>();       //  קריאה לפונקציית קלט גנרית
    double n2 = Input<double>(); // מאפשרת לקלוט טיפוסים שונים
    // מאפשר להגדיר הנחייה ספציפית למשתמש במידת הצורך Input פרמטר אופציונאלי בפונקציה
    char action = Input<char>("Please enter operation + - / * : "); // הנחיה ספציפית
    Console.WriteLine($"{n1} {action} {n2} = {Calc(n1, action, n2)}");
}

public static double Calc(double num1, char oprtr = '+', double num2 = 0)
{
    // הפונקציה מקבלת שני מספרים ופעולה ומחזירה את התוצאה
    // היא לא מתעסקת בענייני קלט ופלט
    if (oprtr == '+')
        return num1 + num2;
    else if (oprtr == '-')
        return num1 - num2;
    else if (oprtr == '*')
        return num1 * num2;
    else if (oprtr == '/')
        return Math.Round(num1 / num2, 3);
    WriteInColor("\ninvalid opertaion", ConsoleColor.Red);
    return 0;
}

// פונקציה שיודעת לקלוט כפי צריך כולל בקשת קלט והודעות שגיאה
public static T Input<T>(string inputRequest = "Please enter a", string invalidFeedback = null)
{
    try
    {
        if (inputRequest == "Please enter a")
            inputRequest = $"Please enter {typeof(T).ToString().Substring(7)}: ";

        WriteInColor(inputRequest, ConsoleColor.Green, ConsoleColor.Yellow);
        string s = Console.ReadLine();
        Console.ForegroundColor = ConsoleColor.White;
        return (T)Convert.ChangeType(s, typeof(T)); // may throw an exception
    }
    catch (Exception)
    {
        if (invalidFeedback == null)
            invalidFeedback = $"Your input type was not a valid {typeof(T)}\n";
        WriteInColor(invalidFeedback, ConsoleColor.Red);
        return Input<T>(inputRequest, invalidFeedback);
    }
}

// פונקציה שמדפיסה בצבע
public static void WriteInColor(string str, ConsoleColor color, ConsoleColor? nextColor = null)
{
    if (nextColor == null)
        nextColor = Console.ForegroundColor; // use current color if not specified
    Console.ForegroundColor = color;
    Console.Write(str);
    Console.ForegroundColor = (ConsoleColor)nextColor;
}
```



</details>



</details>


<details markdown="1"><summary>פרמטרים אופציונליים ועל nullable types</summary>

פרמטרים אופציונליים מקבלים ערך ברירת מחדל (`value =`), ולכן אינם חייבים לעבור בפועל בעת הקריאה.
- **הם חייבים להיות בסוף רשימת הפרמטרים** כדי שזיהוי הערכים יהיה ברור: אחרת, ללא named arguments, לא נוכל להבחין מי זה מי, בין הפרמטרים.
- **אפשרות נוספת:** ניתן לדלג על פרמטר אופציונלי באמצע הרשימה על־ידי שימוש ב־named arguments.
    למשל בקריאה הבאה לפונקציה: `;double res = Calc(3, num2: 5)` הפונקציה (ראו בקוד שלעיל) תשתמש ב–`oprtr='+'` כברירת מחדל. אנחנו סיפקנו את הפרמטר האופציונאלי **השני** על ידי ציון מפורש.
- C# מאפשרת לרשום❓לצד הטיפוס כדי להצהיר שערכו יכול להיות null (הערך **כלום**, בשונה ממצב unassigned כשלא הוגדר ערך). השימוש ב־(`?ConsoleColor`) nullable type  בפונקציה שלהלן, מאפשר לקבוע `null` כערך ברירת מחדל, וכך לבדוק האם המשתמש החסיר את הפרמטר.
    אם הוא `null` – נוכל להחליט בתוך הפונקציה מה תהיה ברירת המחדל, (כאן: הצבע הנוכחי). לא ניתן היה לבצע קביעה דינמית כזו של ערך ברירת מחדל, בתוך שורת הפרמטרים
    ```csharp
    public static void WriteInColor(string str, ConsoleColor color, ConsoleColor? nextColor = null)
    {
        if (nextColor == null)
            nextColor = Console.ForegroundColor; // משתמשים בצבע הנוכחי אם לא צויין אחרת
        Console.ForegroundColor = color;
        Console.Write(str);
        Console.ForegroundColor = (ConsoleColor)nextColor;
    }
    ```
</details>


### סיכום ביניים 4: ניתוח קוד, פרמטרים אופציונאליים, nullable types

- השוואה בין פתרון ראשוני ללא פונקציות (כ־80 שורות, לולאות `while` כפולות, שינויי צבע ופיזור לוגיקה ב־`Main`) לבין פתרון מפוצל לפונקציות.
- פונקציה גנרית `>Input<T` מרכזת את כל טיפול הקלט, העברת פרמטרי הנחייה (`inputRequest`), טיפול בשגיאות וחזרה רק עם ערך תקין.
- פונקציית `Calc(num1, oprtr, num2)` מפצלת את הלוגיקה של החישוב, משפרת קריאות ויכולת בדיקה נפרדת.
- פרמטרים אופציונליים (`char oprtr = '+'`, `double num2 = 0`): ערכי ברירת מחדל בסוף הרשימה, מאפשרים קריאות קצרות וברורות.
- שימוש ב־named arguments לדילוג על פרמטרים אופציונליים באמצע רשימת הפרמטרים.
- nullable types (`ConsoleColor? nextColor = null`) מאפשרים קביעת ברירת מחדל דינמית בתוך הפונקציה (למשל, שימוש ב־`Console.ForegroundColor` הנוכחי אם לא צויין צבע אחר).





## 7.5 העברת פרמטרים ל-Main. פונקציות בכתיב מקוצר {#id7.5}

<details markdown="1"><summary>האם גם הפונקציה Main(int[] args) מקבלת פרמטרים?</summary>

כן. לגמרי. זו בדיוק המשמעות של מה שרשום בסוגריים. אם תריצו את ה-executable של הפרוייקט שלכם תוכלו לשלוח פרמטרים ל-`Main`
הדרך הקצרה כדי לעשות זאת היא:
1. לפתוח את ה-explorer (סייר הקבצים), בתיקיית הפרוייקט. תזכורת: עושים זאת בקליק ימני על הפרוייקט ובחירת <span style="display:inline-block; transform: rotate(180deg);">
  ↩
</span>Open Folder in File Explorer מהתפריט.
1. להיכנס לתת התיקיה `bin\debug\net9.0`. שם אמור להמתין לכם קובץ עם סיומת .exe. זהו ה-executable שלכם שתואם לקימפול האחרון שעשיתם בהרצה האחרונה.
1. כעת עליכם לפתוח Command Prompt בדיוק בתיקייה זו. יש לכך דרך פשוטה: פשוט רושמים `cmd` בשורת הכתובת של ה-explorer.
1. כעת תוכלו להריץ את הפרוייטק על ידי הקלדת שמו בחלון השחור שנפתח. אם תרצו לשלוח פרמטרים פשוט רישמו אותם בזה אחר זה, למשל `ConsoleApp.exe 3 * 8`.
</details>

<details markdown="1"><summary>איך כותבים בשורה אחת פונקציה כמו $$? f(x) = x^2$$</summary>

```csharp
// כתיבת פונקציה בשורה אחת
static double F(double x) => x*x;
```

- בעצם במקום לבצע חישובים ולסיים בפקודה `;return num`, **אם ניתן לרשום את החישוב בשורה אחת, מותר להשתמש בחץ הקיצור** ולרשום את הערך שיש להחזיר או את הפקודה שנרצה לבצע ישירות בתחביר מקוצר ללא סוגריים.
- מתקבלת פונקציה די דומה לכתיבה במתמטיקה. 
- לא לשכוח: naming convertions for functions: **אות ראשונה גדולה** (בשונה ממשתנים ומ-Java).

</details>


### סיכום ביניים 5: העברת פרמטרים ל-Main וכתיב מקוצר

- לפונקציה `Main(string[] args)` (או `Main(int[] args)`) ניתן להעביר פרמטרים בעת הרצה דרך שורת הפקודה, לדוגמה: `ConsoleApp.exe 3 * 8`.
- כדי להריץ את הקובץ (`.exe`) עם פרמטרים, נכנסים לתיקייה `bin\debug\net9.0`, פותחים `cmd`, ומקלידים את שם הקובץ ואחריו הערכים הרצויים.
- כתיבת פונקציה בשורת חץ (`=>`) מאפשרת תמצות חישוב יחיד והחזרת ערך מיידית, למשל:
  ```csharp
  static double F(double x) => x * x;
  ```
- תחביר מקוצר משפר קריאות ודומה לכתיבה מתמטית.





## 7.6 Generics {#id7.6}

<details markdown="1"><summary>הסבר על פונקציות גנריות</summary>
## 7.6: פונקציית Input במבט מעמיק ו-try/catch {#id7.6}

בפרק זה נבחן לעומק את פונקציית הקלט הגנרית `Input<T>` שבדוגמא 7.4, ונבחן את מנגנון הטיפול בשגיאות.

```csharp
// פונקציה שיודעת לקלוט כפי צריך כולל בקשת קלט והודעות שגיאה
public static T Input<T>(string inputRequest = "Please enter a", string invalidFeedback = null)
{
    try
    {
        if (inputRequest == "Please enter a")
            inputRequest = $"Please enter {typeof(T).ToString().Substring(7)}: ";

        WriteInColor(inputRequest, ConsoleColor.Green, ConsoleColor.Yellow);
        string s = Console.ReadLine();
        
        Console.ForegroundColor = ConsoleColor.White;
        return (T)Convert.ChangeType(s, typeof(T)); // may throw an exception
    }
    catch (Exception)
    {
        if (invalidFeedback == null)
            invalidFeedback = $"Your input type was not a valid {typeof(T)}\n";
        WriteInColor(invalidFeedback, ConsoleColor.Red);
        return Input<T>(inputRequest, invalidFeedback);
    }
}
```

**הבהרות ותובנות:**

- לפונקציה שני פרמטרים עם ערכי ברירת מחדל:
  - `inputRequest`: מחרוזת תזכורת להצגת הודעה ראשונית.
  - `invalidFeedback`: הודעת שגיאה פנימית המשמשת רק בקריאה רקורסיבית.
- מבנה `try/catch`:
  - **try**: ניסיון המרה דינמית (`Convert.ChangeType`) והחזרת ערך מטיפוס `T`.
  - **catch**: תפיסת חריגות בעת המרה כושלת, הצגת הודעת שגיאה והפעלה מחודשת של הפונקציה (רקורסיה) עד לקבלת קלט תקין.
  - שימו לב: **טיפול ב־try/catch הוא נושא מתקדם** ואינו חלק מתכנית הלימודים של כיתה י׳.
- דוגמאות קריאה חיצונית:
  - `int x = Input<int>();`
  - `double d = Input<double>("Enter value: ");`
  - `char op = Input<char>("Enter operator (+,-,*,/): ");`


</details>

### סיכום ביניים 6: Generics and try/catch
- שני הנושאים אינם בתכנית הלימוד ביסודות, אך שימוש בפונקציות גנריות נדרש ביא'.
- `>Input<T` היא פונקציה **גנרית** המבטיחה קלט חוקי לכל טיפוס דרך המרת טיפוסים דינמית.
- שימוש בברירת מחדל לפרמטרים מאפשר קריאה פשוטה מצד המשתמש, תוך שמירה על יכולת שליטה פנימית בטיפול בשגיאות.
- מבנה `try/catch` יחד עם קריאה רקורסיבית (קריאה של הפונקציה לעצמה) מוודאים סריקה חוזרת עד להגעת קלט תקין.
- חשוב לזכור: ניהול חריגות (`try/catch`) נחשב לנושא מתקדם, מעבר לתכנית הלימודים של כיתה י׳.







---

## 7.7 העמסת פונקציות (method overloading) {#id7.7}
נניח שנרצה לקרוא לפונקציה `Calc` כפי שמבוצע בשורה 6:

{% highlight csharp linenos %}public static void Main(string[] args)
{
    if (args.Length == 0)
        MainCalc2();
    else
        Console.WriteLine(Calc(args));
}
{% endhighlight %} 

- האם נוכל לכתוב פונקציה נוספת בשם `Calc` **שתעבוד קצת אחרת**?
- כיצד נכתוב פונקציה שמקבלת את `args` שזמין לפונקציה `Main`, מחלצת ממנו את הערכים הדרושים לה, מחשבת את החישוב ומחזירה לנו מחרוזת של התוצאה?

<details markdown="1"><summary>פתרון</summary>
הפתרון הוא בהעמסת פונקציות: method **Overloading**.

```csharp
/// <summary>
/// an Overloaded version of Calc:
/// </summary>
/// <param name="args">מערך שבו שלושת הפרמטרים - מספר, אופרטור, ומספר</param>
/// <returns>מחזיקה את תוצאת החישוב כמחרוזת מוכנה לשימוש בצורת תרגיל חשבוני</returns>
public static string Calc(string[] args)
{
    if (args.Length >= 3)
    {
        double res = Calc(int.Parse(args[0]), char.Parse(args[1]), int.Parse(args[2]));
        return $"{args[0]} {args[1]} {args[2]} = {res}";
    }

    WriteInColor("\ninvalid request", ConsoleColor.Red);
    return "";
}
```


- **עקרון Overloading**: ניתן להגדיר פונקציות בעלות אותו שם עם חתימות שונות (פרמטרים שונים), והקומפיילר יזהה איזו גרסה לקרוא.
- חתימות Calc:
  - `Calc(double num1, char oprtr = '+', double num2 = 0)` – מחזירה `double`.
  - `Calc(string[] args)` – מחזירה `string`, משתמשת בגרסה הראשונה לצורך החישוב.
- מאפשר גמישות והרחבה: הוספת גרסאות נוספות (למשל `Calc(int, int)`, `Calc(decimal, char, decimal)`) מבלי לשנות את הקוד הקיים.
- שיפור קריאות ושמירה על שמות פונקציות קוהרנטיים לכל תרחיש שימוש.


</details>

### סיכום ביניים 7: overloading

- `Calc` הוגדרה בשתי גרסאות (overloaded) – לפי סוגי הפרמטרים.
- הקומפיילר יבחר אוטומטית בגרסה המתאימה לפי רשימת הפרמטרים בעת הקריאה.
- Overloading הוא כלי מרכזי ליצירת API נקי וכיתוב קוד קריא וממוקד.




## קישורים
  
[⬅ עברו  לנקודות צפיה חשובות בסרטון שיעור 7b](/cs2/VideoLinks/Chapter7VidLinks)


## תרגול

[⬅ עִבְרוּ לתרגול 7.1 - פונקציות void: פעולות ללא פרמטרים](/cs2/Chapter7Ex7.1)

[⬅ עִבְרוּ לתרגול 7.2 - פונקציות המקבלות פרמטרים](/cs2/Chapter7Ex7.2)

[⬅ עִבְרוּ לתרגול 7.3 - פונקציות המקבלות ומחזירות ערך](/cs2/Chapter7Ex7.3)

## סרטונים
[סרטוני פרק 7: פעולות](https://www.youtube.com/playlist?list=PLw4P_RdfuzSh3nsdxq7oMeTbxZtADUsuv){:target="_blank"}




