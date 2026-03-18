---
layout: page
title: שאלון - ירושה בסיסית
tags: [שאלון, אינטראקטיבי, OOP, ירושה, inheritance, csharp, cs101]
mathjax: true
lang: he
---

<!-- interactive -->

<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>

<div id="quiz-root"></div>

<script>
window.QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "שאלה 1: מי יורש ממי?",
    promptHe: "מה נכון לגבי הקוד הבא?",
    codeLang: "csharp",
    code: `public class Animal
{
}

public class Dog : Animal
{
}`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`Animal` יורשת מ-`Dog`" },
      { key: "B", text: "`Dog` יורשת מ-`Animal`" },
      { key: "C", text: "שתי המחלקות יורשות זו מזו" },
      { key: "D", text: "אין כאן ירושה בכלל" },
    ],
    correctKey: "B",
    explanationHe: "ב-`C#`, הכתיבה `class Dog : Animal` אומרת שהמחלקה `Dog` יורשת מן המחלקה `Animal`.",
    tags: ["inheritance", "csharp"],
  },
  {
    id: 2,
    title: "שאלה 2: מתודה שעוברת בירושה",
    promptHe: "מה יקרה בקריאה האחרונה?",
    codeLang: "csharp",
    code: `public class Animal
{
    public void Eat()
    {
        Console.WriteLine("eating");
    }
}

public class Dog : Animal
{
}

Dog d = new Dog();
d.Eat();`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "תתקבל שגיאה, כי `Eat()` שייכת רק ל-`Animal`" },
      { key: "B", text: "הפעולה תעבוד, כי `Dog` ירשה את `Eat()`" },
      { key: "C", text: "הקוד יעבוד רק אם נוסיף `Bark()`" },
      { key: "D", text: "`Dog` תהפוך למחלקה `Animal`" },
    ],
    correctKey: "B",
    explanationHe: "כאשר מחלקה יורשת ממחלקה אחרת, היא מקבלת גם את הפעולות של מחלקת האב. לכן אפשר לקרוא ל-`d.Eat()`.",
    tags: ["methods", "inheritance"],
  },
  {
    id: 3,
    title: "שאלה 3: גם פעולת Get עוברת בירושה",
    promptHe: "מה נכון לגבי הקריאה האחרונה?",
    codeLang: "csharp",
    code: `public class Person
{
    private string name = "Dana";

    public string GetName()
    {
        return name;
    }
}

public class Student : Person
{
}

Student s = new Student();
string n = s.GetName();`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "תתקבל שגיאה, כי `GetName()` קיימת רק ב-`Person`" },
      { key: "B", text: "הקוד חוקי, כי `Student` יורשת את `GetName()`" },
      { key: "C", text: "הקוד חוקי רק אם נוסיף `SetName()`" },
      { key: "D", text: "המשתנה `n` יקבל תמיד מחרוזת ריקה" },
    ],
    correctKey: "B",
    explanationHe: "בכיתה אנחנו כותבים פעולות `Get...` ו-`Set...`. גם פעולות כאלה עוברות בירושה, ולכן `Student` יכולה להשתמש ב-`GetName()` של `Person`.",
    tags: ["getters", "inheritance"],
  },
  {
    id: 4,
    title: "שאלה 4: אפשר להוסיף גם דברים חדשים",
    promptHe: "מה נכון לגבי המחלקה `Dog`?",
    codeLang: "csharp",
    code: `public class Animal
{
    public void Eat()
    {
    }
}

public class Dog : Animal
{
    public void Bark()
    {
    }
}`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`Dog` מאבדת את `Eat()` כי הוספנו `Bark()`" },
      { key: "B", text: "`Dog` לא יכולה להוסיף פעולות חדשות" },
      { key: "C", text: "`Dog` גם יורשת את `Eat()` וגם מוסיפה את `Bark()`" },
      { key: "D", text: "הקוד אינו חוקי" },
    ],
    correctKey: "C",
    explanationHe: "ירושה לא מונעת מהמחלקה הבת להוסיף דברים חדשים. `Dog` יורשת את `Eat()` מ-`Animal`, ובנוסף יש לה גם `Bark()`.",
    tags: ["methods", "subclass"],
  },
  {
    id: 5,
    title: "שאלה 5: \"הוא סוג של\"",
    promptHe: "אם כתוב `class Cat : Animal`, איזו אמירה נכונה?",
    codeLang: "csharp",
    code: `public class Animal
{
}

public class Cat : Animal
{
}`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`Cat` היא סוג של `Animal`" },
      { key: "B", text: "`Animal` היא סוג של `Cat`" },
      { key: "C", text: "אין שום קשר בין `Cat` ל-`Animal`" },
      { key: "D", text: "זה נכון רק אם לשתיהן יש אותו מספר שדות" },
    ],
    correctKey: "A",
    explanationHe: "המשמעות של ירושה היא שמחלקת הבן היא סוג מיוחד של מחלקת האב. לכן `Cat` היא סוג של `Animal`.",
    tags: ["concept", "is-a"],
  },
  {
    id: 6,
    title: "שאלה 6: למה משתמשים בירושה?",
    promptHe: "מה היתרון המרכזי של ירושה בדוגמה שבה גם `Dog` וגם `Cat` צריכות את הפעולה `Eat()`?",
    codeLang: "csharp",
    code: `public class Animal
{
    public void Eat()
    {
        Console.WriteLine("eating");
    }
}

public class Dog : Animal
{
}

public class Cat : Animal
{
}`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "אפשר לכתוב את `Eat()` פעם אחת ב-`Animal` ולהשתמש בה גם ב-`Dog` וגם ב-`Cat`" },
      { key: "B", text: "ירושה גורמת לתוכנית לרוץ תמיד מהר יותר" },
      { key: "C", text: "ירושה מבטלת את הצורך ליצור אובייקטים" },
      { key: "D", text: "ירושה הופכת כל שדה ל-`private`" },
    ],
    correctKey: "A",
    explanationHe: "ירושה עוזרת לשתף קוד משותף. במקום לכתוב שוב ושוב את `Eat()` בכל מחלקה, כותבים אותה פעם אחת במחלקת האב.",
    tags: ["reuse", "inheritance"],
  },
];

window.QUIZ_LABELS = {
  title: "שאלון ירושה בסיסית",
  progressAnswered: "נענו",
  progressCorrect: "נכונות",
  questionLabel: "שאלה",
  ofLabel: "מתוך",
  resetLabel: "איפוס",
  prevLabel: "הקודם",
  nextLabel: "הבא",
  explanationTitle: "הסבר",
  emptyMessage: "אין שאלות להצגה.",
};
</script>

<script type="text/babel" src="{{ '/assets/js/questionnaire.js' | relative_url }}"></script>
<script type="text/babel">
  window.renderQuestionnaire({
    mountId: "quiz-root",
    questions: window.QUIZ_QUESTIONS,
    labels: window.QUIZ_LABELS,
    revealDelayMs: 250,
    dir: "rtl"
  });
</script>
