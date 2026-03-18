---
layout: page
title: "שאלון - בגרות 2020 שאלה 3: Room / Hostel"
share-description: "שאלון אינטראקטיבי על Room ו-Hostel מבגרות קיץ תש\"ף שאלה 3, עם PDF ותרגול על מערך עצמים, הזמנת חדרים והכנסה לפי קומות."
full-width: true
tags: [שאלון, אינטראקטיבי, bagrut, 2020, Room, Hostel, OOP, מערכי עצמים, getters, setters]
mathjax: true
lang: he
---

<!-- interactive -->

{: .box-note}
השאלון הזה מבוסס על בגרות קיץ תש"ף שאלה 3 (`Room / Hostel`), אבל הוא נבנה בעיקר כדי לתרגל
מערך של עצמים, קריאות כמו `allRooms[i].Income()` והמרה של מספר חדר לקומה מתאימה במערך תוצאות.

הנחות העבודה כאן:
- `roomType == 1` פירושו חדר יחיד, `roomType == 2` פירושו חדר זוגי
- `nightsReserved == 0` פירושו חדר פנוי
- לכל תכונה יש פעולות `Get` ו-`Set`
- בתוך `FloorIncome()` חובה להשתמש בפעולה `Income()` מסעיף א

שאלות 1-2 מתמקדות בסעיף א: `Income()`.
שאלות 3-6 מתמקדות בסעיף ב(1): `OrderRoom(...)`.
שאלות 7-9 מתמקדות בסעיף ב(2): `FloorIncome()`.
שאלה 10 מסכמת את כל התמונה.

```csharp
public class Room
{
    private int roomNum;
    private int roomType;        // 1 = single, 2 = double
    private int nightsReserved;  // 0 means free
}

public class Hostel
{
    private Room[] allRooms;     // size 200
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
[PDF]({{ '/bagruyot/2020.6.381/q3.pdf' | relative_url }}#page=1)

<object
  class="questionnaire-source-viewer"
  data="{{ '/bagruyot/2020.6.381/q3.pdf' | relative_url }}#page=1"
  type="application/pdf"
  aria-label="בגרות 2020 קיץ שאלה 3">
  <p>
    אם ה-PDF לא נטען בתוך הדף, פתחו את
    <a href="{{ '/bagruyot/2020.6.381/q3.pdf' | relative_url }}#page=1">q3.pdf</a>.
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
    title: "שאלה 1: מימוש `Income()`",
    promptHe: "איזה גוף פעולה מתאים לחישוב ההכנסה מן החדר?",
    codeLang: "csharp",
    code: `public int Income()
{
    ...
}`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`if (GetRoomType() == 1) return GetNightsReserved() * 100; else return GetNightsReserved() * 50;`" },
      { key: "B", text: "`if (GetRoomType() == 1) return 50; else return 100;`" },
      { key: "C", text: "`return GetRoomNum() * GetNightsReserved();`" },
      { key: "D", text: "`return GetRoomType() * GetNightsReserved();`" },
    ],
    correctKey: "A",
    explanationHe: "ההכנסה מחושבת כמספר הלילות כפול מחיר ללילה. חדר יחיד עולה 100 שקלים ללילה, וחדר זוגי עולה 50 שקלים ללילה.",
    tags: ["Income", "Room", "pricing"],
  },
  {
    id: 2,
    title: "שאלה 2: כמה מחזירה הקריאה?",
    promptHe: "לחדר יש `roomNum = 231`, `roomType = 2`, `nightsReserved = 4`. מה תחזיר הקריאה `room.Income()`?",
    codeLang: "csharp",
    code: `roomType = 2
nightsReserved = 4

room.Income()`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`4`" },
      { key: "B", text: "`50`" },
      { key: "C", text: "`200`" },
      { key: "D", text: "`400`" },
    ],
    correctKey: "C",
    explanationHe: "זה חדר זוגי, ולכן המחיר ללילה הוא 50. ארבעה לילות נותנים `4 * 50 = 200`.",
    tags: ["Income", "calculation", "double room"],
  },
  {
    id: 3,
    title: "שאלה 3: התנאי הנכון ב-`OrderRoom`",
    promptHe: "איזה תנאי בוחר חדר שהוא גם מן הסוג המבוקש וגם פנוי?",
    codeLang: "csharp",
    code: `for (int i = 0; i < allRooms.Length; i++)
{
    Room room = allRooms[i];
    if ( ____ )
    {
        ...
    }
}`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`room.GetRoomType() == type && room.GetNightsReserved() == 0`" },
      { key: "B", text: "`room.GetRoomType() == nights && room.GetNightsReserved() == type`" },
      { key: "C", text: "`room.Income() == 0 && room.GetRoomNum() == type`" },
      { key: "D", text: "`room.GetRoomType() == type || room.GetNightsReserved() == 0`" },
    ],
    correctKey: "A",
    explanationHe: "צריך לבדוק שני תנאים יחד: גם שהחדר הוא מן הסוג שהתבקש, וגם שהוא פנוי. לכן צריך `&&` ולא `||`.",
    tags: ["OrderRoom", "condition", "array of objects"],
  },
  {
    id: 4,
    title: "שאלה 4: מה עושים כשמצאנו חדר מתאים?",
    promptHe: "הפעולה צריכה לעדכן את מספר הלילות ולהחזיר את מספר החדר. איזו השלמה נכונה?",
    codeLang: "csharp",
    code: `if (room.GetRoomType() == type && room.GetNightsReserved() == 0)
{
    ____
}`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`room.SetNightsReserved(nights); return room.GetRoomNum();`" },
      { key: "B", text: "`return room.Income();`" },
      { key: "C", text: "`return i;`" },
      { key: "D", text: "`room.SetNightsReserved(0); return nights;`" },
    ],
    correctKey: "A",
    explanationHe: "לפי השאלה, ברגע שמצאנו חדר מתאים צריך לשמור בו את מספר הלילות שהתבקשו, ואז להחזיר את מספר החדר עצמו.",
    tags: ["OrderRoom", "setter", "return value"],
  },
  {
    id: 5,
    title: "שאלה 5: איפה כותבים `return -1`?",
    promptHe: "המערך אינו ממוין. מתי מחזירים `-1`?",
    codeLang: "csharp",
    code: `public int OrderRoom(int type, int nights)
{
    for (int i = 0; i < allRooms.Length; i++)
    {
        ...
    }

    ____
}`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "מיד אם `allRooms[0]` לא מתאים" },
      { key: "B", text: "בסוף כל איטרציה של הלולאה" },
      { key: "C", text: "רק אחרי שעברנו על כל המערך ולא מצאנו אף חדר מתאים" },
      { key: "D", text: "במקום `return room.GetRoomNum()`" },
    ],
    correctKey: "C",
    explanationHe: "כיוון שהחדרים אינם ממוינים, חדר מתאים יכול להופיע בכל מקום במערך. לכן מחזירים `-1` רק אחרי שסיימנו לחפש בכולו.",
    tags: ["OrderRoom", "search", "not sorted"],
  },
  {
    id: 6,
    title: "שאלה 6: החדר הראשון במערך, לא החדר הקטן ביותר",
    promptHe: "מה יקרה בקריאה `OrderRoom(2, 3)` עבור המערך הבא?",
    codeLang: "csharp",
    code: `allRooms[0]: roomNum = 231, roomType = 2, nightsReserved = 0
allRooms[1]: roomNum = 145, roomType = 2, nightsReserved = 0
allRooms[2]: roomNum = 111, roomType = 1, nightsReserved = 0`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יוחזר `231`, ובחדר `231` יתעדכן `nightsReserved` ל-`3`" },
      { key: "B", text: "יוחזר `145`, כי זה מספר חדר קטן יותר" },
      { key: "C", text: "יוחזר `2`, כי זה סוג החדר שהתבקש" },
      { key: "D", text: "יוחזר `-1`, כי יש יותר מחדר מתאים אחד" },
    ],
    correctKey: "A",
    explanationHe: "השאלה מבקשת את החדר הראשון במערך שעונה על התנאים, לא את מספר החדר הקטן ביותר. לכן בוחרים את `allRooms[0]`.",
    tags: ["OrderRoom", "first match", "array order"],
  },
  {
    id: 7,
    title: "שאלה 7: מאיזה מספר חדר יוצא אינדקס קומה?",
    promptHe: "הספרה השמאלית במספר החדר מייצגת את הקומה, אבל מערך ההכנסות משתמש באינדקסים `0..2`. איזו שורה מתאימה?",
    codeLang: "csharp",
    code: `Room room = allRooms[i];
int floorIndex = ____;`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`room.GetRoomNum() / 100 - 1`" },
      { key: "B", text: "`room.GetRoomNum() % 100`" },
      { key: "C", text: "`room.GetRoomNum() / 10 - 1`" },
      { key: "D", text: "`room.GetRoomNum() / 100`" },
    ],
    correctKey: "A",
    explanationHe: "בחלוקה של מספר בן שלוש ספרות ב-100 מקבלים את הספרה הראשונה. לדוגמה `145 / 100 = 1`, אבל קומה 1 צריכה להישמר באינדקס 0, ולכן מחסרים 1.",
    tags: ["FloorIncome", "floor index", "roomNum"],
  },
  {
    id: 8,
    title: "שאלה 8: צבירת ההכנסה לפי קומה",
    promptHe: "בסעיף ב(2) חייבים להשתמש ב-`Income()` מסעיף א. איזו שורה נכונה בתוך הלולאה?",
    codeLang: "csharp",
    code: `int[] sums = new int[3];

for (int i = 0; i < allRooms.Length; i++)
{
    Room room = allRooms[i];
    int floorIndex = room.GetRoomNum() / 100 - 1;
    ____
}`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`sums[floorIndex] += room.Income();`" },
      { key: "B", text: "`sums[i] += room.GetNightsReserved();`" },
      { key: "C", text: "`sums[floorIndex] = room.GetRoomType();`" },
      { key: "D", text: "`room.SetNightsReserved(sums[floorIndex]);`" },
    ],
    correctKey: "A",
    explanationHe: "צריך להוסיף לסכום של הקומה את ההכנסה של החדר הנוכחי. לכן גם משתמשים באינדקס הקומה, וגם קוראים ל-`room.Income()`.",
    tags: ["FloorIncome", "Income", "accumulation"],
  },
  {
    id: 9,
    title: "שאלה 9: מה מחזירה `FloorIncome()`?",
    promptHe: "מה יהיה מערך הסכומים עבור החדרים הבאים?",
    codeLang: "csharp",
    code: `room 145: roomType = 1, nightsReserved = 2
room 231: roomType = 2, nightsReserved = 3
room 317: roomType = 1, nightsReserved = 0
room 302: roomType = 2, nightsReserved = 4`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`[200, 150, 200]`" },
      { key: "B", text: "`[350, 0, 200]`" },
      { key: "C", text: "`[200, 200, 150]`" },
      { key: "D", text: "`[2, 3, 4]`" },
    ],
    correctKey: "A",
    explanationHe: "קומה 1 מקבלת `2 * 100 = 200` מן החדר `145`. קומה 2 מקבלת `3 * 50 = 150` מן החדר `231`. קומה 3 מקבלת `0` מן החדר `317` ועוד `4 * 50 = 200` מן החדר `302`.",
    tags: ["FloorIncome", "array result", "calculation"],
  },
  {
    id: 10,
    title: "שאלה 10: תמונה מלאה",
    promptHe: "מה יהיו הערכים של `ordered` ושל `sums` אחרי שתי הקריאות?",
    codeLang: "csharp",
    code: `allRooms[0]: roomNum = 111, roomType = 1, nightsReserved = 0
allRooms[1]: roomNum = 213, roomType = 2, nightsReserved = 2
allRooms[2]: roomNum = 145, roomType = 1, nightsReserved = 1

int ordered = OrderRoom(1, 3);
int[] sums = FloorIncome();`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`ordered == 111` ו-`sums == [400, 100, 0]`" },
      { key: "B", text: "`ordered == 145` ו-`sums == [100, 100, 0]`" },
      { key: "C", text: "`ordered == 111` ו-`sums == [300, 100, 0]`" },
      { key: "D", text: "`ordered == -1` ו-`sums == [100, 100, 0]`" },
    ],
    correctKey: "A",
    explanationHe: "החדר הראשון הפנוי מסוג 1 הוא `111`, ולכן הוא מקבל `3` לילות ומוחזר מן הפעולה. אחר כך בקומה 1 יש `111` עם הכנסה `300` ועוד `145` עם הכנסה `100`, ולכן מתקבל `400`. בקומה 2 יש `213` עם הכנסה `2 * 50 = 100`, ובקומה 3 אין הכנסה.",
    tags: ["summary", "OrderRoom", "FloorIncome"],
  },
];

window.QUIZ_LABELS = {
  title: "שאלון Room / Hostel - בגרות 2020-6/3",
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
