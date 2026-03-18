---
layout: page
title: "שאלון - בגרות 2018 שאלה 3: Time / Flight / Airport"
share-description: "שאלון אינטראקטיבי על Time, Flight ו-Airport מבגרות קיץ תשע\"ח שאלה 3, עם תרגול על עצם בתוך עצם, מערך עצמים ולולאת חיפוש."
full-width: true
tags: [שאלון, אינטראקטיבי, bagrut, 2018, Time, Flight, Airport, OOP, מערכי עצמים, עצם בתוך עצם]
mathjax: true
lang: he
---

<!-- interactive -->

{: .box-note}
השאלון הזה מבוסס על בגרות קיץ תשע"ח שאלה 3 (`Time / Flight / Airport`), אבל המטרה כאן היא
לתרגל בעיקר שלושה רעיונות:
- עצם בתוך עצם: לכל `Flight` יש `Time`
- מערך של עצמים: ל-`Airport` יש `Flight[]`
- חיפוש במערך בלי ליפול לשגיאת `return` מוקדם מדי

הנחות העבודה כאן:
- לכל תכונה יש `Get` ו-`Set`
- `Time` מקבלת שעה ודקה, ואם ערך מסוים אינו חוקי הוא מוחלף ב-`0`
- ב-`Airport` אין ערכי `null` במערך `flights`

שאלות 1-2 מתמקדות בבנאי של `Time`.
שאלות 3-4 מתמקדות במבנה `Flight` ובקריאות מקוננות.
שאלות 5-8 מתמקדות בשגיאה ובתיקון של `IsFly()`.
שאלות 9-10 מסכמות את מבנה העצמים והגישה אל הנתונים.

```csharp
public class Time
{
    private int hour;
    private int minute;
}

public class Flight
{
    private string name;
    private string flightCode;
    private string destination;
    private Time flightTime;
}

public class Airport
{
    private Flight[] flights;
}
```

<div id="quiz-header-root"></div>
<div id="quiz-root"></div>

<!-- In the site's RTL layout, the first column renders on the right and the second on the left. -->
<div class="two-columns questionnaire-source-layout">
  <div markdown="1" class="column">
<div id="quiz-main-root"></div>
  </div>

  <div markdown="1" class="column">

{: .box-note}
מקור השאלה:
[PDF]({{ '/bagruyot/2018.6.381/q3.pdf' | relative_url }}#page=1)

<object
  class="questionnaire-source-viewer"
  data="{{ '/bagruyot/2018.6.381/q3.pdf' | relative_url }}#page=1"
  type="application/pdf"
  aria-label="בגרות 2018 קיץ שאלה 3">
  <p>
    אם ה-PDF לא נטען בתוך הדף, פתחו את
    <a href="{{ '/bagruyot/2018.6.381/q3.pdf' | relative_url }}#page=1">q3.pdf</a>.
  </p>
</object>

  </div>
</div>

<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>

<script>
window.QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "שאלה 1: ערך לא חוקי של שעה",
    promptHe: "מה צריך לקרות בבנאי של `Time` עבור הקריאה `new Time(25, 10)`?",
    codeLang: "csharp",
    code: `Time t = new Time(25, 10);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "העצם יישמר עם `hour = 25`, `minute = 10`" },
      { key: "B", text: "העצם יישמר עם `hour = 0`, `minute = 10`" },
      { key: "C", text: "העצם יישמר עם `hour = 0`, `minute = 0`" },
      { key: "D", text: "תתקבל שגיאת קומפילציה" },
    ],
    correctKey: "B",
    explanationHe: "השעה 25 אינה חוקית, ולכן רק `hour` מוחלפת ל-`0`. הדקה 10 חוקית ולכן נשארת 10.",
    tags: ["Time", "constructor", "validation"],
  },
  {
    id: 2,
    title: "שאלה 2: ערך לא חוקי של דקה",
    promptHe: "מה צריך לקרות בבנאי של `Time` עבור הקריאה `new Time(14, 75)`?",
    codeLang: "csharp",
    code: `Time t = new Time(14, 75);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "העצם יישמר עם `hour = 14`, `minute = 0`" },
      { key: "B", text: "העצם יישמר עם `hour = 0`, `minute = 75`" },
      { key: "C", text: "העצם יישמר עם `hour = 0`, `minute = 0`" },
      { key: "D", text: "העצם יישמר עם `hour = 14`, `minute = 75`" },
    ],
    correctKey: "A",
    explanationHe: "הדקה 75 אינה חוקית ולכן מוחלפת ל-`0`. השעה 14 תקינה ולכן נשארת 14.",
    tags: ["Time", "constructor", "minute"],
  },
  {
    id: 3,
    title: "שאלה 3: איזה שדה מייצג עצם פנימי?",
    promptHe: "איזו תכונה ב-`Flight` היא עצם מטיפוס אחר, ולא מספר או מחרוזת?",
    codeLang: "csharp",
    code: `public class Flight
{
    private string name;
    private string flightCode;
    private string destination;
    private ____;
}`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`private string flightTime;`" },
      { key: "B", text: "`private int flightTime;`" },
      { key: "C", text: "`private Time flightTime;`" },
      { key: "D", text: "`private Airport flightTime;`" },
    ],
    correctKey: "C",
    explanationHe: "לכל טיסה יש זמן טיסה מטיפוס `Time`, כלומר `Flight` מכילה עצם פנימי.",
    tags: ["Flight", "nested object", "Time"],
  },
  {
    id: 4,
    title: "שאלה 4: על איזה עצם קוראים ל-`GetMinute()`?",
    promptHe: "מה נכון לגבי הקריאה `flights[2].GetFlightTime().GetMinute()`?",
    codeLang: "csharp",
    code: `flights[2].GetFlightTime().GetMinute()`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`GetMinute()` נקראת על האובייקט `Airport`" },
      { key: "B", text: "`GetMinute()` נקראת על האובייקט `Flight` שב-`flights[2]`" },
      { key: "C", text: "`GetMinute()` נקראת על האובייקט `Time` שמוחזר מ-`GetFlightTime()`" },
      { key: "D", text: "`GetMinute()` נקראת על המערך `flights`" },
    ],
    correctKey: "C",
    explanationHe: "הקריאה `GetFlightTime()` מחזירה עצם מטיפוס `Time`, ורק עליו קוראים ל-`GetMinute()`.",
    tags: ["nested calls", "Flight", "Time"],
  },
  {
    id: 5,
    title: "שאלה 5: מה תחזיר הפעולה השגויה?",
    promptHe: "מה תחזיר הפעולה הנתונה עבור מערך שבו שמות החברות הם `Cloud`, אחר כך `Air`, אחר כך `Sky`, אחר כך `Travel`?",
    codeLang: "csharp",
    code: `public bool IsFly()
{
    for (int i = 0; i < this.flights.Length; i++)
    {
        if (this.flights[i].GetName() == "Sky")
            return true;
        return false;
    }
}`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`true`" },
      { key: "B", text: "`false`" },
      { key: "C", text: "תלוי רק בטיסה השלישית" },
      { key: "D", text: "שגיאת זמן ריצה" },
    ],
    correctKey: "B",
    explanationHe: "הטיסה הראשונה היא `Cloud`, לא `Sky`, ולכן כבר באיטרציה הראשונה מבצעים `return false` ולא ממשיכים לבדוק את שאר המערך.",
    tags: ["IsFly", "bug", "loop"],
  },
  {
    id: 6,
    title: "שאלה 6: מה בדיוק השגיאה?",
    promptHe: "למה הפעולה `IsFly()` שגויה?",
    codeLang: "csharp",
    code: `for (int i = 0; i < this.flights.Length; i++)
{
    if (this.flights[i].GetName() == "Sky")
        return true;
    return false;
}`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "אסור להשתמש ב-`for` על מערך עצמים" },
      { key: "B", text: "ההשוואה ל-`\"Sky\"` צריכה להיות מחוץ ללולאה" },
      { key: "C", text: "`return false` נמצא בתוך הלולאה ולכן הפעולה מפסיקה אחרי הבדיקה הראשונה שלא הצליחה" },
      { key: "D", text: "צריך לבדוק את `destination` ולא את `name`" },
    ],
    correctKey: "C",
    explanationHe: "כדי לחפש בכל המערך, מותר להחזיר `true` כשמצאנו התאמה, אבל `false` צריך להחזיר רק אחרי שסיימנו לבדוק את כל הטיסות.",
    tags: ["IsFly", "control flow", "bug"],
  },
  {
    id: 7,
    title: "שאלה 7: התיקון הנכון",
    promptHe: "איזו גרסה מתקנת את הפעולה כך שתבדוק את כל הטיסות?",
    codeLang: "csharp",
    code: `public bool IsFly()
{
    ...
}`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`for (int i = 0; i < flights.Length; i++) { if (flights[i].GetName() == \"Sky\") return true; } return false;`" },
      { key: "B", text: "`for (int i = 0; i < flights.Length; i++) { if (flights[i].GetName() != \"Sky\") return false; } return true;`" },
      { key: "C", text: "`if (flights[0].GetName() == \"Sky\") return true; else return false;`" },
      { key: "D", text: "`return flights.Length > 0;`" },
    ],
    correctKey: "A",
    explanationHe: "כך ממשיכים לעבור על כל הטיסות עד שמוצאים `Sky`. אם סיימנו את כל הלולאה ולא מצאנו, רק אז מחזירים `false`.",
    tags: ["IsFly", "fix", "array scan"],
  },
  {
    id: 8,
    title: "שאלה 8: מתי הפעולה השגויה דווקא מצליחה?",
    promptHe: "באיזה מצב הפעולה השגויה תחזיר בכל זאת `true`?",
    codeLang: "csharp",
    code: `if (this.flights[i].GetName() == "Sky")
    return true;
return false;`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "אם יש `Sky` במקום כלשהו במערך" },
      { key: "B", text: "רק אם `Sky` מופיעה בתא הראשון" },
      { key: "C", text: "רק אם `Sky` מופיעה בתא האחרון" },
      { key: "D", text: "לעולם לא" },
    ],
    correctKey: "B",
    explanationHe: "הפעולה בודקת בפועל רק את התא הראשון. אם שם יש `Sky`, היא תחזיר `true`; אחרת תחזיר `false` מיד.",
    tags: ["IsFly", "first element", "bug"],
  },
  {
    id: 9,
    title: "שאלה 9: גישה לנתון מקונן",
    promptHe: "איזה תנאי בודק שהטיסה הנוכחית היא של `Sky` ושזמן הטיסה שלה הוא בדיוק `08:30`?",
    codeLang: "csharp",
    code: `Flight f = flights[i];
if ( ____ )`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`f.GetName() == \"Sky\" && f.GetFlightTime().GetHour() == 8 && f.GetFlightTime().GetMinute() == 30`" },
      { key: "B", text: "`f.GetFlightTime() == 830 && f.GetName() == \"Sky\"`" },
      { key: "C", text: "`f.GetHour() == 8 && f.GetMinute() == 30`" },
      { key: "D", text: "`f.GetName() == \"Sky\" && flights.GetHour() == 8`" },
    ],
    correctKey: "A",
    explanationHe: "השעה והדקה נמצאות בתוך העצם `Time`, ולכן צריך להגיע אליהן דרך `GetFlightTime()`.",
    tags: ["nested calls", "Flight", "Time access"],
  },
  {
    id: 10,
    title: "שאלה 10: תמונת המבנה המלאה",
    promptHe: "איזו אמירה מתארת נכון את מבנה העצמים בשאלה?",
    codeLang: "csharp",
    code: `Airport -> flights[]
Flight -> flightTime`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`Airport` מכילה מערך של `Flight`, וכל `Flight` מכילה עצם אחד מטיפוס `Time`" },
      { key: "B", text: "`Airport` מכילה עצם אחד מטיפוס `Time`, וכל `Time` מכילה מערך של `Flight`" },
      { key: "C", text: "`Flight` מכילה מערך של `Airport`, וכל `Airport` מכילה `Time`" },
      { key: "D", text: "`Time` היא המחלקה היחידה שיש לה עצמים פנימיים" },
    ],
    correctKey: "A",
    explanationHe: "זה בדיוק דפוס של מיכל עצמים: `Airport` מחזיקה `Flight[]`, ובכל `Flight` יש עצם פנימי `Time`.",
    tags: ["summary", "composition", "array of objects"],
  },
];

window.QUIZ_LABELS = {
  title: "שאלון Time / Flight / Airport - בגרות 2018-6/3",
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
    headerMountId: "quiz-header-root",
    mainMountId: "quiz-main-root",
    questions: window.QUIZ_QUESTIONS,
    labels: window.QUIZ_LABELS,
    revealDelayMs: 250,
    dir: "rtl"
  });
</script>
