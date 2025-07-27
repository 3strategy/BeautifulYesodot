---
layout: page
title: "פרק 9 מערך חד ממדי"
subtitle: "משתנים הבנויים כאוסף"
author: גיא סידס
tags: [מערך, מערכים, חד ממדי, Ternary operator]
mathjax: true
lang: he
---
<!-- see Chapter9 for the animated version for the teacher -->
<!-- https://www.perplexity.ai/search/this-page-goes-to-github-pages-z3w2NJR4SHqGVk14l89Rmw -->




<details markdown="1"><summary>1. נניח שנרצה להפוך את car לאוסף של מחרוזות</summary>

```csharp
static void Main(string[] args)
{
    string   car  =   "BMW";

    Console.WriteLine(car);
}
```
</details>

<details markdown="1"><summary>2. הוספנו: סוגריים מסולסלים, לשון רבים, וסוגריים מרובעים, </summary>

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };

    Console.WriteLine(cars); // ⟹😟לא כמו פייתון. לא ממש עוזר System.String[] מדפיס
}
```



</details>

<details markdown="1"><summary>3. ניתן לגשת לאיבר במערך לפי מיקום</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };

    Console.WriteLine(cars[0]); // prints BMW, מתנהג כמו במחרוזת
    Console.WriteLine(cars[0][1]); // ??? ומה זה ידפיס
}
```
</details>


<details markdown="1"><summary>4. כאן כבר יש לנו בעיה</summary>
פניה ל-index שלא קיים במערך תקריס את התכנית עם ndex Out Of Range Exception

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };


        Console.WriteLine(cars[0]);
        Console.WriteLine(cars[1]);
        Console.WriteLine(cars[2]);
        Console.WriteLine(cars[3]); //index out of range exception
        // Program WILL CRUSH 
        Console.ReadLine();




}
```
</details>



<details markdown="1"><summary>5. אפשר לטפל במצבי Exception</summary>
הוראת try/catch אינה בתכנית הלימודים אך תשתמש את התלמידים בהמשך.

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };
    try
    {
        Console.WriteLine(cars[0]);
        Console.WriteLine(cars[1]);
        Console.WriteLine(cars[2]);
        Console.WriteLine(cars[3]); // 😥Index Out of Range exception😥
    
    }
    catch (Exception e)
    {
        Console.WriteLine($"we had aproblem: {e.Message}");
    }
}
```
</details>


<details markdown="1"><summary>6. ניעזר בלולאות כדי לעבור על כל איברי המערך, אבל,</summary>
מעבר בלולאה על כל איברי המערך הוא קל באמצעות התחביר בו השתלמנו ללולאות עד היום: מתחילים מ-0 ומגיעים עד לפני `cars.Length`
האינדקס cars.Length הוא הראשון שחורג מהמערך. cars.Length היא **תכונה** של מערך. 

החל מסוף 2023 ניתן לאתחל מערך באופן ישיר (כלומר כולל השמת הערכים) גם בכתיבת סוגריים מרובעים

```csharp
static void Main(string[] args)
{
    string[] cars = [ "BMW", "Ford", "Kia" ]; // 🤔 ??? {מסולסלים} לא היו קודם סוגריים 😲
    
    for (int i = 0; i < cars.Length; i++)
        Console.WriteLine(cars[i]); // 👮 i גישה ישירה לאיבר באינדקס
}
```
</details>



<details markdown="1"><summary>7. foreach יותר נוח בהרבה מקרים</summary>
כאן עבור אותה מטרה אנו משתמשים בלולאה מסוג חדש - foreach - שבעצם יודעת להתגלגל על אוספים. `string car` הופך בכל סיבוב של הלולאה להיות האיבר הבא במערך, וכך ניתן להשתמש בו מבלי לדעת את המיקום שלו.
כפי שהזכרתי עכבר שאוכל חריצי גבינה, לא באמת סוכם כמה יש ואז רץ בינהם באמצעות אינדק. הוא פשוט עובר אחד אחד. 
1. בצורה זו אין לנו מידע על מיקום.
1. לא ניתן בצע כתיבה לתוך car (לעומת `cars[i] = "Toyota"` שניתן לרשום).

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" }; //inline initialization

    foreach (string car in cars) 🐭
        Console.WriteLine(car); // הרבה יותר פשוט
}
```
</details>



<details markdown="1"><summary>8. כאן מקצים מערך בגודל מסויים וזה סוף פסוק</summary>
כאן מוקצה מערך ריק בגודל 5.
לא ניתן לשנות את גודל המערך. (גם אם ניתן, אסור להשתמש בזה).


```csharp
static void Main(string[] args)
{
    string[] cars = new string[5]; // איתחול לגודל 5.  לא יורשה לשנות את הגודל בהמשך
                                  // ולכן בהמשך הדרך בפרוייקטים נעבוד עם מבנים אחרים
                                 // אסור בשימוש Array.Resize(ref cars, 10); אסור בשימוש
    for (int i = 0; i < cars.Length; i++)
    {
        cars[i] = "BMW" + i;
        Console.WriteLine(cars[i]);
    }
}
```
</details>



<details markdown="1"><summary>9. הבדל חשוב בין סוגי הלולאות - לא ניתן לבצע השמה ב-foreach</summary>
כבר הבהרתי

```csharp
static void Main(string[] args)
{
    string[] cars = new string[5]; // מקצה מערך בגודל 5

    foreach (string car in cars) 
        car = "BMW"; // ===== !!! השמה - לא אפשרית  ======
        // ועדיין, נח ושימושי כשעובדים עם עצמים
}
```
</details>

<details markdown="1"><summary>10. אפשר לשלוח מערך כארגומנט לפונקציה.</summary>

```csharp
static void Main(string[] args)
{
    int[] nums = { 3,2,1 };
    Add10(nums);
    PrintArr(nums); // prints 13  12  11
    PrintArr(["bus", "bug", "beer", "bear"]); //instanciation in a call with [ ] ???
}
public static void Add10(int[] arr)
{
    for (int i = 0; i < arr.Length; i++)
        arr[i] += 10;
}
static void PrintArr<T>(T[] arr) // מה נסגר עם הפונקציות הגנריות האלה?
{
    foreach (var item in arr)
        Console.Write($" {item} ");
    Console.WriteLine();
}
```
</details>


<details markdown="1"><summary>11. המערך מאותחל ל-nulls או לאפסים או ל-false בהתאם לטיפוס</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = new string[5];  // אז לא יודפס כלום null אפשר להדפיס את איברי המערך. הם כולם
    //=== = "" קיימת דרישה בבחינות לבצע לולאת איתחול שמאפסת את אברי המערך. או במקרה זה מגדירה את כולם ===
    //=== מאד לא סביר ומתנגש עם העבודה עם עצמים בהמשך === אמשיך לברר לכם את הנקודה 
    Console.Write(cars[0].Length); // Null Reference Exception אבל לא ניתן לגשת לתכונה כשאין עדין עצם
    cars[0] = cars[0] + "wow";    // null ובכל זאת ניתן לשרשר מחרוזת עם 

}
```
</details>


<details markdown="1"><summary>12. בואו ננסה להבין, מה זה object reference</summary>

```csharp
static void Main(string[] args)
{
    char[] chars = ['h', 'e', 'l', 'l', 'o'];
    PrintArr(chars); //        h  e  l  l  o
    WillItChange_יתשנה_או_לא(chars);
    PrintArr(chars); // Stays  h  e  l  l  o
}

static void WillItChange_יתשנה_או_לא(char[] arr)
{
    arr = ['h', 'e', 'l', 'l', '_', 'N', 'o'];
}

```
</details>

<details markdown="1"><summary>13. דוגמא עם ternary operator</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = ["BMW", "Ford", "Kia" ,"T"]; // 🤔 ??? {מסולסלים} לא היו קודם סוגריים 😲

    for (int i = 0; i < cars.Length; i++)
    {
        //ternary operator
        Console.WriteLine($"{cars[i]} is " +
            $"{cars[i].Length} meter{(cars[i].Length>1 ? "s" : "")} long"); // 👮 i גישה ישירה לאיבר באינדקס
    }
        
}

```
</details>


<details markdown="1"><summary>14. דוגמא עם ternary operator with higher perf</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = ["BMW", "Ford", "Kia" ,"T"]; // 🤔 ??? {מסולסלים} לא היו קודם סוגריים 😲

    for (int i = 0; i < cars.Length; i++)
    {
        //ternary operator
        string c = cars[i]; // 👮 i גישה ישירה לאיבר באינדקס
        string sOrNos = c.Length > 1 ? "s" : ""; // Ternary
        Console.WriteLine($"{c} is {c.Length} meter{sOrNos} long"); // 👮 i גישה ישירה לאיבר באינדקס
    }     
}

```
</details>


<details markdown="1"><summary>15. דוגמא עם ternary operator in a foreach</summary>

```csharp
static void Main(string[] args)
{
    string[] cars = ["BMW", "Ford", "Kia" ,"T"]; 

    foreach (var c in cars)
    {
        string sOrNos = c.Length > 1 ? "s" : ""; // Ternary
        Console.WriteLine($"{c} is {c.Length} meter{sOrNos} long"); 
    }      
}
```
</details>


 <!-- this is the actual page that is displayed -->
<!-- =============================================== -->
<!-- <div class="button-container">
  <button id="prevBtn">הקודם</button>
  <button id="nextBtn">הבא</button>
  <button id="copyBtn">העתק קוד</button>
  <span id="copyStatus" class="copy-success" style="display:none;">הועתק!</span>
</div>
<div id="explanation"></div>
<div id="stage"></div> -->





---

## המשך למידה
[⬅ עברו לפרק 9 - גרסה עם אנימציות](/cs2/Chapter9)


[⬅ עברו לפרק 9b - הערות והרחבות](/cs2/Chapter9b)

[⬅ עברו לפרק 9c - מערך מונים וצוברים](/cs2/Chapter9c)


## תרגול

[⬅ עברו לתרגול 9.1 - מערך חד ממדי](/cs2/Chapter9Ex9.1)

[⬅ עברו לתרגול 9.2 - מערכים - שאלות ב- CodeWars](/cs2/Chapter9Ex9.2)



## סרטונים

[סרטוני פרק 9: פעולות](https://www.youtube.com/playlist?list=PLnVUJu2KuoA2cT3X-Fui7j6HZJWZM6vnK){:target="_blank"}

[פלייליסט השתלמות חלק ב](https://www.youtube.com/playlist?list=PLnVUJu2KuoA0igr7xHclrzS2O7bBaqg2S){:target="_blank"}