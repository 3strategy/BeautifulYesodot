---
layout: page
title: שאלון - כימוס ב-OOP
tags: [שאלון, אינטראקטיבי, OOP, כימוס, encapsulation, private, getters, setters, constructors]
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
    title: "משימה 1: שגיאת גישה",
    promptHe: "מה יקרה בשורה המסומנת?",
    codeLang: "csharp",
    code: `public class Player {
    private int score;
}

// בקלאס אחר (Main):
Player p1 = new Player();
p1.score = 100; // <--- שורה זו`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "הקוד ירוץ והציון יהיה 100" },
      { key: "B", text: "שגיאת קומפילציה - הגישה חסומה" },
      { key: "C", text: "הציון יישאר 0" },
      { key: "D", text: "תתקבל שגיאת ריצה" },
    ],
    correctKey: "B",
    explanationHe: "השדה `score` מוגדר כ-`private`, ולכן אי אפשר לגשת אליו ישירות מתוך מחלקה אחרת. השורה המסומנת תגרום לשגיאת קומפילציה.",
    tags: ["private", "encapsulation", "fields"],
  },
  {
    id: 2,
    title: "משימה 2: שימוש ב-Setter",
    promptHe: "מה יהיה הערך של `score` לאחר שתי השורות הללו?",
    codeLang: "csharp",
    code: `p1.SetScore(80);
p1.SetScore(p1.GetScore() + 10);`,
    choices: [
      { key: "A", text: "70" },
      { key: "B", text: "80" },
      { key: "C", text: "90" },
      { key: "D", text: "100" },
    ],
    correctKey: "C",
    explanationHe: "אחרי `SetScore(80)` הערך הוא 80. אחר כך `GetScore()` מחזיר 80, מוסיפים 10, ו-`SetScore(...)` מעדכן את `score` ל-90.",
    tags: ["setters", "getters", "methods"],
  },
  {
    id: 3,
    title: "משימה 3: הבנאי (Constructor)",
    promptHe: "איזה ערך יוחזר אם נריץ כעת `s.GetGrade()`?",
    codeLang: "csharp",
    code: `public Student(String name, int grade) {
    this.name = name;
    this.grade = grade;
}

Student s = new Student("Gal", 95);`,
    choices: [
      { key: "A", text: "0" },
      { key: "B", text: "90" },
      { key: "C", text: "95" },
      { key: "D", text: "100" },
    ],
    correctKey: "C",
    explanationHe: "הבנאי מקבל את הערך 95 ושומר אותו בשדה `grade`, לכן הקריאה `s.GetGrade()` תחזיר 95.",
    tags: ["constructors", "this", "getters"],
  },
  {
    id: 4,
    title: "משימה 4: הגנה על נתונים",
    promptHe: "למה להשתמש ב-`private` ובשיטת `setAge(int a)` במקום לגשת ישירות לתכונה?",
    codeLang: "csharp",
    code: `private int age;

public void setAge(int a) {
    if (a >= 0) {
        age = a;
    }
}`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "כדי שהקוד ירוץ מהר יותר" },
      { key: "B", text: "כדי שנוכל לבדוק תקינות לפני העדכון, למשל שהגיל לא שלילי" },
      { key: "C", text: "כי אי אפשר להגדיר מספרים ב-private" },
      { key: "D", text: "כדי להקטין את גודל הזיכרון של האובייקט" },
    ],
    correctKey: "B",
    explanationHe: "השילוב של `private` עם setter מאפשר לשלוט בעדכון הנתון ולבדוק שהוא חוקי לפני השמירה. כך אפשר למנוע ערכים שגויים כמו גיל שלילי.",
    tags: ["encapsulation", "validation", "setters"],
  },
  {
    id: 5,
    title: "משימה 5: העתקת אובייקטים",
    promptHe: "מה יחזיר `a1.GetBalance()` בסוף הקוד?",
    codeLang: "csharp",
    code: `Account a1 = new Account(500);
Account a2 = new Account(1000);
a1 = a2;
a2.SetBalance(a2.GetBalance() + 200);`,
    choices: [
      { key: "A", text: "500" },
      { key: "B", text: "1000" },
      { key: "C", text: "1200" },
      { key: "D", text: "1500" },
    ],
    correctKey: "C",
    explanationHe: "אחרי `a1 = a2`, שני המשתנים מתייחסים לאותו אובייקט. לכן כשהיתרה של `a2` מתעדכנת ל-1200, גם `a1.GetBalance()` מחזיר 1200.",
    tags: ["objects", "references", "assignment"],
  },
];

window.QUIZ_LABELS = {
  title: "אתגר הכימוס (Encapsulation)",
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
