---
layout: page
title: שאלון - עצם בתוך עצם
tags: [שאלון, אינטראקטיבי, OOP, עצמים, MyTime, Parking, bagrut, cs101]
mathjax: true
lang: he
---

<!-- interactive -->

{: .box-note}
השאלון מבוסס על [שאלה 5 בבגרות קיץ תשפ"ג - `MyTime / Parking`]({{ '/bagruyot/2023.6.371/q5.pdf' | relative_url }}).
כדאי לפתוח קודם את השאלה המקורית ולראות מה בדיוק **נותנים** שם: פעולות כמו `Before`, `Diff`, `GetIn`, `GetOut`, `GetId` מותרות לשימוש גם בלי לממש אותן.

<style>
#quiz-root .quiz-answers-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

#quiz-root .quiz-answer-btn {
    align-items: stretch;
    justify-content: flex-start;
}

#quiz-root .quiz-answer-letter {
    align-self: center;
}

#quiz-root .quiz-answer-text {
    text-align: right;
}

@media (max-width: 560px) {
    #quiz-root .quiz-answers-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>

<div id="quiz-root"></div>

<script>
window.QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "שאלה 1: על איזה עצם קוראים ל-`Before()`?",
    promptHe: "מה נכון לגבי השורה הבאה?",
    codeLang: "csharp",
    code: `if (p.GetIn().Before(bestCar.GetIn()))
    bestCar = p;`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "הפעולה `Before()` נקראת על `p` מטיפוס `Parking`" },
      { key: "B", text: "הפעולה `Before()` נקראת על העצם שמוחזר מ-`p.GetIn()` מטיפוס `MyTime`" },
      { key: "C", text: "הפעולה `Before()` נקראת על המערך `cars`" },
      { key: "D", text: "הפעולה `Before()` נקראת על מספר הרישוי" },
    ],
    correctKey: "B",
    explanationHe: "`p.GetIn()` מחזירה עצם מטיפוס `MyTime`. על העצם הזה מפעילים את `Before(...)`.",
    tags: ["nested calls", "MyTime", "Before"],
  },
  {
    id: 2,
    title: "שאלה 2: התנאי הנכון ל-`First`",
    promptHe: "איזה תנאי צריך להופיע במקום החסר כדי לבחור את המכונית שנכנסה ראשונה?",
    codeLang: "csharp",
    code: `public static void First(Parking[] cars)
{
    Parking bestCar = cars[0];
    foreach (Parking p in cars)
    {
        if ( ____ )
            bestCar = p;
    }
    Console.WriteLine(bestCar.GetId());
}`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`p.GetIn().Before(bestCar.GetIn())`" },
      { key: "B", text: "`bestCar.GetIn().Before(p.GetIn())`" },
      { key: "C", text: "`p.Before(bestCar)`" },
      { key: "D", text: "`p.GetId().Before(bestCar.GetId())`" },
    ],
    correctKey: "A",
    explanationHe: "אם זמן הכניסה של `p` מוקדם יותר מזמן הכניסה של `bestCar`, צריך לעדכן את `bestCar` ל-`p`.",
    tags: ["Parking", "First", "Before"],
  },
  {
    id: 3,
    title: "שאלה 3: מה מדפיסים בסוף?",
    promptHe: "אחרי שמצאנו את המכונית שנכנסה ראשונה, מה צריך להדפיס?",
    codeLang: "csharp",
    code: `Console.WriteLine( ____ );`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`bestCar.GetId()`" },
      { key: "B", text: "`bestCar.GetIn()`" },
      { key: "C", text: "`cars[0].GetId()`" },
      { key: "D", text: "`bestCar.Before()`" },
    ],
    correctKey: "A",
    explanationHe: "בסעיף מבקשים להדפיס את מספר לוחית הרישוי של המכונית שנכנסה ראשונה, ולכן צריך `bestCar.GetId()`.",
    tags: ["Parking", "GetId"],
  },
  {
    id: 4,
    title: "שאלה 4: מימוש `Total()` בלי לגעת ב-`MyTime`",
    promptHe: "איזו שורה יכולה להיות גוף הפעולה `Total()` במחלקה `Parking`?",
    codeLang: "csharp",
    code: `public int Total()
{
    return ____;
}`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`GetOut().Diff(GetIn())`" },
      { key: "B", text: "`GetOut().Before(GetIn())`" },
      { key: "C", text: "`GetOut() - GetIn()`" },
      { key: "D", text: "`Diff(GetOut(), GetIn())`" },
    ],
    correctKey: "A",
    explanationHe: "`GetOut()` ו-`GetIn()` מחזירות עצמים מטיפוס `MyTime`, ועל אחד מהם אפשר לקרוא ל-`Diff(...)`. הפעולה מחזירה את ההפרש בדקות.",
    tags: ["Parking", "Total", "Diff"],
  },
  {
    id: 5,
    title: "שאלה 5: למה לא צריך לממש `Before` ו-`Diff`?",
    promptHe: "מה הגישה הנכונה בשאלה כזאת?",
    codeLang: "csharp",
    code: `// במחלקה MyTime כבר קיימות:
// public bool Before(MyTime other)
// public int Diff(MyTime other)`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "חייבים קודם לממש את `Before` ואת `Diff`, ורק אחר כך לפתור את `Parking`" },
      { key: "B", text: "אפשר להשתמש ב-`Before` וב-`Diff` ישירות, גם בלי לדעת איך הן ממומשות" },
      { key: "C", text: "אסור להשתמש בהן כי הקוד שלהן לא מופיע" },
      { key: "D", text: "מותר להשתמש רק ב-`GetIn()` וב-`GetOut()`" },
    ],
    correctKey: "B",
    explanationHe: "בשאלה נותנים ממשק מוכן. המטרה היא להשתמש בפעולות שכבר קיימות, ולא להיכנס למימוש הפנימי שלהן.",
    tags: ["interface", "abstraction", "methods"],
  },
  {
    id: 6,
    title: "שאלה 6: אותו רעיון במחלקה אחרת",
    promptHe: "יש מערך של שיעורים. איזה תנאי בוחר את השיעור שמתחיל הכי מוקדם?",
    codeLang: "csharp",
    code: `public class Lesson
{
    private MyTime start;

    public MyTime GetStart()
    {
        return start;
    }
}

Lesson firstLesson = lessons[0];

// בתוך לולאה על lessons[i]
if ( ____ )
    firstLesson = lessons[i];`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`lessons[i].GetStart().Before(firstLesson.GetStart())`" },
      { key: "B", text: "`firstLesson.Before(lessons[i])`" },
      { key: "C", text: "`lessons[i].GetStart() < firstLesson.GetStart()`" },
      { key: "D", text: "`lessons[i].Diff(firstLesson)`" },
    ],
    correctKey: "A",
    explanationHe: "זה בדיוק אותו דפוס כמו ב-`Parking`: מקבלים עצם פנימי מסוג `MyTime`, ועליו מפעילים את `Before(...)`.",
    tags: ["transfer", "Lesson", "Before"],
  },
  {
    id: 7,
    title: "שאלה 7: מה מחזירה הקריאה הזאת?",
    promptHe: "מה מייצג הביטוי הבא?",
    codeLang: "csharp",
    code: `p.GetOut().Diff(p.GetIn())`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "מספר המכוניות שחונות בחניון" },
      { key: "B", text: "מספר הדקות שהמכונית חנתה" },
      { key: "C", text: "האם המכונית נכנסה ראשונה" },
      { key: "D", text: "אורך מספר הרישוי" },
    ],
    correctKey: "B",
    explanationHe: "`Diff(...)` מחזירה את ההפרש בדקות בין שני זמני `MyTime`, ולכן כאן מתקבל משך החניה של המכונית.",
    tags: ["Diff", "duration", "Parking"],
  },
];

window.QUIZ_LABELS = {
  title: "שאלון עצם בתוך עצם - MyTime / Parking",
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
