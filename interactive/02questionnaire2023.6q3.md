---
layout: page
title: "שאלון - בגרות 2023 שאלה 3: CarInfo / CameraInfo"
share-description: "שאלון אינטראקטיבי על CarInfo ו-CameraInfo מבגרות קיץ תשפ\"ג שאלה 3, עם תרגול על מערך עצמים, פעולות בוליאניות וספירת ערים ייחודיות."
full-width: true
tags: [שאלון, אינטראקטיבי, bagrut, 2023, CarInfo, CameraInfo, OOP, מערכי עצמים, בוליאני]
mathjax: true
lang: he
---

<!-- interactive -->

{: .box-note}
השאלון הזה מבוסס על בגרות קיץ תשפ"ג שאלה 3 (`CarInfo / CameraInfo`), אבל הוא בנוי בעיקר כדי
לתרגל מעבר מחשיבה על עצם אחד לחשיבה על מערך של עצמים:
- ברמת `CarInfo`: האם רכב מסוים עבר עבירה?
- ברמת `CameraInfo`: האם כל המכוניות שצולמו במצלמה תקינות?
- ברמת `LegalCities`: איך סופרים ערים ייחודיות כשיש כמה מצלמות באותה עיר?

הנחות העבודה כאן:
- לכל תכונה יש `Get` ו-`Set`
- `privateCar == true` פירושו רכב פרטי
- רכב עבר עבירה אם הוא פרטי ו/או אם נסע מעל המהירות המותרת
- במערך `cameras` ייתכנו כמה איברים עם אותו קוד עיר

שאלות 1-3 מתמקדות ב-`Illegal(maxSpeed)`.
שאלות 4-6 מתמקדות ב-`AllGood()`.
שאלות 7-10 מתמקדות ב-`LegalCities(...)` ובספירת ערים ייחודיות.

```csharp
public class CarInfo
{
    private string id;
    private bool privateCar;
    private int speed;
}

public class CameraInfo
{
    private int city;
    private int maxSpeed;
    private CarInfo[] cars;
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
[PDF]({{ '/bagruyot/2023.6.381/q3.pdf' | relative_url }}#page=1)

<object
  class="questionnaire-source-viewer"
  data="{{ '/bagruyot/2023.6.381/q3.pdf' | relative_url }}#page=1"
  type="application/pdf"
  aria-label="בגרות 2023 קיץ שאלה 3">
  <p>
    אם ה-PDF לא נטען בתוך הדף, פתחו את
    <a href="{{ '/bagruyot/2023.6.381/q3.pdf' | relative_url }}#page=1">q3.pdf</a>.
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
    title: "שאלה 1: התנאי של `Illegal()`",
    promptHe: "איזה ביטוי מתאים להגדרת העבירה בשאלה?",
    codeLang: "csharp",
    code: `public bool Illegal(int maxSpeed)
{
    return ____;
}`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`GetPrivateCar() || GetSpeed() > maxSpeed`" },
      { key: "B", text: "`GetPrivateCar() && GetSpeed() > maxSpeed`" },
      { key: "C", text: "`!GetPrivateCar() && GetSpeed() <= maxSpeed`" },
      { key: "D", text: "`GetSpeed() == maxSpeed`" },
    ],
    correctKey: "A",
    explanationHe: "לפי השאלה, די בכך שיתקיים לפחות אחד משני התנאים: הרכב פרטי או שהמהירות שלו גבוהה מן המותרת.",
    tags: ["Illegal", "boolean", "CarInfo"],
  },
  {
    id: 2,
    title: "שאלה 2: רכב פרטי במהירות תקינה",
    promptHe: "מה תחזיר הקריאה אם הרכב פרטי אבל לא עבר את המהירות המותרת?",
    codeLang: "csharp",
    code: `privateCar = true
speed = 60
maxSpeed = 90

car.Illegal(maxSpeed)`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`false` כי המהירות תקינה" },
      { key: "B", text: "`true` כי עצם היותו רכב פרטי כבר נחשב עבירה בנתיב ציבורי" },
      { key: "C", text: "`true` רק אם `speed == maxSpeed`" },
      { key: "D", text: "שגיאת קומפילציה" },
    ],
    correctKey: "B",
    explanationHe: "בשאלה הזאת רכב פרטי בנתיב תחבורה ציבורית נחשב עבירה גם אם הוא נוסע במהירות תקינה.",
    tags: ["Illegal", "private car", "traffic rule"],
  },
  {
    id: 3,
    title: "שאלה 3: רכב ציבורי במהירות גבוהה",
    promptHe: "מה תחזיר הקריאה אם הרכב ציבורי אבל נסע מעל המהירות המותרת?",
    codeLang: "csharp",
    code: `privateCar = false
speed = 95
maxSpeed = 90

car.Illegal(maxSpeed)`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`false` כי הוא לא פרטי" },
      { key: "B", text: "`true` כי גם חריגה מהמהירות לבדה מספיקה" },
      { key: "C", text: "`true` רק אם הוא גם פרטי" },
      { key: "D", text: "`false` כי יש לבדוק רק את העיר" },
    ],
    correctKey: "B",
    explanationHe: "גם לרכב ציבורי תירשם עבירה אם הוא נסע מעל המהירות המותרת.",
    tags: ["Illegal", "speed", "or condition"],
  },
  {
    id: 4,
    title: "שאלה 4: מה בודקים בתוך `AllGood()`?",
    promptHe: "איזו שורה מתאימה בתוך הלולאה של `AllGood()`?",
    codeLang: "csharp",
    code: `for (int i = 0; i < cars.Length; i++)
{
    if ( ____ )
        return false;
}
return true;`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`cars[i].Illegal(GetMaxSpeed())`" },
      { key: "B", text: "`GetMaxSpeed().Illegal(cars[i])`" },
      { key: "C", text: "`cars[i].GetSpeed() == GetCity()`" },
      { key: "D", text: "`cars[i].GetPrivateCar() == false`" },
    ],
    correctKey: "A",
    explanationHe: "צריך לשאול על כל רכב אם הוא עבר עבירה לפי המהירות המותרת של המצלמה הנוכחית.",
    tags: ["AllGood", "Illegal", "CameraInfo"],
  },
  {
    id: 5,
    title: "שאלה 5: מה תחזיר גרסה שגויה?",
    promptHe: "נניח שכתבו בטעות את `AllGood()` כך:",
    codeLang: "csharp",
    code: `for (int i = 0; i < cars.Length; i++)
{
    if (cars[i].Illegal(GetMaxSpeed()))
        return false;
    return true;
}`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "הפעולה תבדוק נכון את כל הרכבים" },
      { key: "B", text: "הפעולה תחזיר `true` אם הרכב הראשון תקין, גם אם אחריו יש רכב עבריין" },
      { key: "C", text: "הפעולה תמיד תחזיר `false`" },
      { key: "D", text: "הפעולה לא תתקמפל" },
    ],
    correctKey: "B",
    explanationHe: "זו אותה שגיאת `return` מוקדם: אם הרכב הראשון תקין, מחזירים `true` מיד ולא בודקים את שאר הרכבים.",
    tags: ["AllGood", "bug", "loop"],
  },
  {
    id: 6,
    title: "שאלה 6: התיקון הנכון ל-`AllGood()`",
    promptHe: "איזו גרסה מתקנת את הפעולה כך שתבדוק את כל הרכבים במצלמה?",
    codeLang: "csharp",
    code: `public bool AllGood()
{
    ...
}`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`for (int i = 0; i < cars.Length; i++) { if (cars[i].Illegal(GetMaxSpeed())) return false; } return true;`" },
      { key: "B", text: "`for (int i = 0; i < cars.Length; i++) { if (!cars[i].Illegal(GetMaxSpeed())) return true; } return false;`" },
      { key: "C", text: "`return cars[0].Illegal(GetMaxSpeed());`" },
      { key: "D", text: "`return GetCity() >= 0;`" },
    ],
    correctKey: "A",
    explanationHe: "כך מחזירים `false` ברגע שמצאנו עבירה אחת, ורק אם כל הרכבים עברו את הלולאה בשלום מחזירים `true`.",
    tags: ["AllGood", "fix", "array scan"],
  },
  {
    id: 7,
    title: "שאלה 7: מה באמת סופרים ב-`LegalCities()`?",
    promptHe: "יש כמה מצלמות, וייתכן שיש יותר ממצלמה אחת באותה עיר. מה הפעולה צריכה להחזיר?",
    codeLang: "csharp",
    code: `public static int LegalCities(CameraInfo[] cameras)`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "את מספר המצלמות שעבורן `AllGood()` מחזירה `true`" },
      { key: "B", text: "את מספר הערים השונות שבהן לא אותרה שום עבירה באף אחת מן המצלמות של אותה עיר" },
      { key: "C", text: "את מספר המכוניות הציבוריות בכל המערך" },
      { key: "D", text: "תמיד 100, כי יש 100 קודי ערים" },
    ],
    correctKey: "B",
    explanationHe: "הספירה היא של ערים ייחודיות, לא של מצלמות. אם בעיר מסוימת יש כמה מצלמות, העיר תיספר פעם אחת בלבד, ורק אם אף מצלמה בעיר לא זיהתה עבירה.",
    tags: ["LegalCities", "unique cities", "aggregation"],
  },
  {
    id: 8,
    title: "שאלה 8: דוגמה עם שתי מצלמות באותה עיר",
    promptHe: "מה תחזיר `LegalCities()` במקרה הבא?",
    codeLang: "csharp",
    code: `camera A: city = 7, AllGood() == true
camera B: city = 7, AllGood() == false
camera C: city = 12, AllGood() == true`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`3`" },
      { key: "B", text: "`2`" },
      { key: "C", text: "`1`" },
      { key: "D", text: "`0`" },
    ],
    correctKey: "C",
    explanationHe: "עיר 7 לא נחשבת חוקית, כי באחת המצלמות שלה אותרה עבירה. עיר 12 כן נחשבת חוקית, ולכן התוצאה היא 1.",
    tags: ["LegalCities", "duplicate city", "counting"],
  },
  {
    id: 9,
    title: "שאלה 9: סימון עיר בעייתית",
    promptHe: "אם משתמשים במערך עזר בוליאני בגודל 100, איזו שורה מתאימה לסימון עיר שבה אותרה עבירה?",
    codeLang: "csharp",
    code: `bool[] badCity = new bool[100];

for (int i = 0; i < cameras.Length; i++)
{
    if (!cameras[i].AllGood())
    {
        ____
    }
}`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`badCity[i] = true;`" },
      { key: "B", text: "`badCity[cameras[i].GetCity()] = true;`" },
      { key: "C", text: "`badCity[cameras[i].GetMaxSpeed()] = true;`" },
      { key: "D", text: "`badCity[cameras.Length] = true;`" },
    ],
    correctKey: "B",
    explanationHe: "צריך לסמן לפי קוד העיר של המצלמה, לא לפי מיקום המצלמה במערך.",
    tags: ["LegalCities", "helper array", "city code"],
  },
  {
    id: 10,
    title: "שאלה 10: תמונה מלאה",
    promptHe: "מה תחזיר `LegalCities()` עבור המצלמות הבאות?",
    codeLang: "csharp",
    code: `camera 0: city = 5, AllGood() == true
camera 1: city = 5, AllGood() == true
camera 2: city = 8, AllGood() == false
camera 3: city = 9, AllGood() == true`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`4`" },
      { key: "B", text: "`3`" },
      { key: "C", text: "`2`" },
      { key: "D", text: "`1`" },
    ],
    correctKey: "C",
    explanationHe: "עיר 5 חוקית ונספרת פעם אחת בלבד למרות שיש בה שתי מצלמות. עיר 8 אינה חוקית. עיר 9 חוקית. לכן התוצאה היא 2.",
    tags: ["summary", "LegalCities", "distinct count"],
  },
];

window.QUIZ_LABELS = {
  title: "שאלון CarInfo / CameraInfo - בגרות 2023-6/3",
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
