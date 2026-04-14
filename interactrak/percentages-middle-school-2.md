---
layout: page
title: שאלון מעקב באחוזים – סדרה ב'
tags: [אחוזים, מתמטיקה, חטיבת ביניים, שאלון, אינטראקטיבי]
lang: he
full-width: true
tracked_quiz: true
quiz_key: "26-percentages-middle-school-2"
quiz_window_start: "2026-04-14T08:00:00+03:00"
quiz_window_end: "2026-05-31T23:59:59+03:00"
quiz_unlock_token: "yesodot-p2-b-2026-4nQ8X7m2"
quiz_debug_uids:
  - "YtfYwYQ5FxOFk50npfDWF0Ekq7i1"
---

<!-- interactive -->

{: .box-note}
זהו שאלון מעקב מוגן.
הדף עצמו ציבורי, אבל פתיחת השאלון מחייבת:
- התחברות עם Google
- קישור מלא עם `start`, `end`, `token`
- חלון זמן פעיל

ההתקדמות נשמרת אוטומטית, והשליחה הסופית ננעלת לתלמידים רגילים.

<div id="tracked-quiz-status"></div>
<div id="tracked-quiz-account"></div>
<div id="quiz-root" class="hidden"></div>

<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>

<script>
window.QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "שאלה 1: עשרה אחוזים ממספר",
    promptHe: "כמה הם 10% מתוך 50?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "5" },
      { key: "B", text: "10" },
      { key: "C", text: "15" },
      { key: "D", text: "20" },
    ],
    correctKey: "A",
    explanationHe: "10% הם עשירית. עשירית של 50 היא 5.",
    tags: ["אחוז מתוך מספר"],
  },
  {
    id: 2,
    title: "שאלה 2: חמישים אחוזים",
    promptHe: "כמה הם 50% מתוך 22?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "8" },
      { key: "B", text: "11" },
      { key: "C", text: "13" },
      { key: "D", text: "16" },
    ],
    correctKey: "B",
    explanationHe: "50% הם חצי. חצי מ-22 הוא 11.",
    tags: ["אחוז מתוך מספר"],
  },
  {
    id: 3,
    title: "שאלה 3: רבע מכמות",
    promptHe: "כמה הם 25% מתוך 40?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "8" },
      { key: "B", text: "10" },
      { key: "C", text: "12" },
      { key: "D", text: "15" },
    ],
    correctKey: "B",
    explanationHe: "25% הם רבע. רבע של 40 הוא 10.",
    tags: ["אחוז מתוך מספר"],
  },
  {
    id: 4,
    title: "שאלה 4: חמישה אחוזים",
    promptHe: "כמה הם 5% מתוך 60?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "2" },
      { key: "B", text: "3" },
      { key: "C", text: "4" },
      { key: "D", text: "5" },
    ],
    correctKey: "B",
    explanationHe: "10% מתוך 60 הם 6. 5% הם חצי מזה, כלומר 3.",
    tags: ["אחוז מתוך מספר"],
  },
  {
    id: 5,
    title: "שאלה 5: שלושה רבעים",
    promptHe: "כמה הם 75% מתוך 80?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "50" },
      { key: "B", text: "55" },
      { key: "C", text: "60" },
      { key: "D", text: "65" },
    ],
    correctKey: "C",
    explanationHe: "75% הם שלושה רבעים. רבע של 80 הוא 20, ולכן שלושה רבעים הם 60.",
    tags: ["אחוז מתוך מספר"],
  },
  {
    id: 6,
    title: "שאלה 6: מציאת אחוז",
    promptHe: "15 מתוך 60 זה כמה אחוזים?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "20%" },
      { key: "B", text: "25%" },
      { key: "C", text: "30%" },
      { key: "D", text: "40%" },
    ],
    correctKey: "B",
    explanationHe: "15/60 מצטמצם ל-1/4, וחלק אחד מארבעה הוא 25%.",
    tags: ["מציאת אחוז"],
  },
  {
    id: 7,
    title: "שאלה 7: איזה חלק?",
    promptHe: "14 מתוך 35 זה כמה אחוזים?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "30%" },
      { key: "B", text: "35%" },
      { key: "C", text: "40%" },
      { key: "D", text: "45%" },
    ],
    correctKey: "C",
    explanationHe: "14/35 מצטמצם ל-2/5. שניים מחמישה שווים 40%.",
    tags: ["מציאת אחוז"],
  },
  {
    id: 8,
    title: "שאלה 8: הנחה בחנות",
    promptHe: "חולצה עלתה 200 שקלים ויש עליה הנחה של 10%. מה המחיר אחרי ההנחה?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "170 שקלים" },
      { key: "B", text: "180 שקלים" },
      { key: "C", text: "185 שקלים" },
      { key: "D", text: "190 שקלים" },
    ],
    correctKey: "B",
    explanationHe: "10% מתוך 200 הם 20. מחסירים 20 מ-200 ומקבלים 180.",
    tags: ["הנחה"],
  },
  {
    id: 9,
    title: "שאלה 9: התייקרות",
    promptHe: "מחיר ספר היה 150 שקלים והתייקר ב-20%. מה המחיר החדש?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "160 שקלים" },
      { key: "B", text: "165 שקלים" },
      { key: "C", text: "170 שקלים" },
      { key: "D", text: "180 שקלים" },
    ],
    correctKey: "D",
    explanationHe: "20% מתוך 150 הם 30. מוסיפים 30 ל-150 ומקבלים 180.",
    tags: ["התייקרות"],
  },
  {
    id: 10,
    title: "שאלה 10: מציאת השלם",
    promptHe: "20% ממספר הם 14. מה המספר?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "56" },
      { key: "B", text: "63" },
      { key: "C", text: "70" },
      { key: "D", text: "77" },
    ],
    correctKey: "C",
    explanationHe: "אם 20% הם 14, אז 1% הוא 0.7, ולכן 100% הם 70.",
    tags: ["חלק לשלם"],
  },
  {
    id: 11,
    title: "שאלה 11: כמה תלמידים בבית הספר?",
    promptHe: "30% מהתלמידים בבית הספר הם 90 תלמידים. כמה תלמידים יש בבית הספר בסך הכול?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "270" },
      { key: "B", text: "300" },
      { key: "C", text: "330" },
      { key: "D", text: "360" },
    ],
    correctKey: "B",
    explanationHe: "אם 30% הם 90, אז 10% הם 30, ולכן 100% הם 300.",
    tags: ["חלק לשלם"],
  },
  {
    id: 12,
    title: "שאלה 12: מחיר לפני הנחה",
    promptHe: "אחרי הנחה של 25% מחיר נעליים הוא 90 שקלים. מה היה המחיר לפני ההנחה?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "112 שקלים" },
      { key: "B", text: "115 שקלים" },
      { key: "C", text: "120 שקלים" },
      { key: "D", text: "125 שקלים" },
    ],
    correctKey: "C",
    explanationHe: "אחרי הנחה של 25% נשארים 75% מהמחיר. אם 75% הם 90, אז 100% הם 120.",
    tags: ["הנחה", "חלק לשלם"],
  },
  {
    id: 13,
    title: "שאלה 13: שבר לאחוז",
    promptHe: "2/5 שווה לכמה אחוזים?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "40%" },
      { key: "B", text: "45%" },
      { key: "C", text: "50%" },
      { key: "D", text: "55%" },
    ],
    correctKey: "A",
    explanationHe: "2/5 הוא שניים מחמישה, ו-5 × 20 = 100. לכן 2 × 20 = 40%.",
    tags: ["אחוז ושבר"],
  },
  {
    id: 14,
    title: "שאלה 14: כמה נוכחים?",
    promptHe: "בכיתה יש 40 תלמידים. 35% נעדרים היום. כמה תלמידים נוכחים?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "24" },
      { key: "B", text: "26" },
      { key: "C", text: "28" },
      { key: "D", text: "30" },
    ],
    correctKey: "B",
    explanationHe: "35% מ-40 הם 14. אם 14 נעדרים, נוכחים 40 − 14 = 26.",
    tags: ["מציאת אחוז", "חישוב מורכב"],
  },
  {
    id: 15,
    title: "שאלה 15: עלייה וירידה",
    promptHe: "מחיר מוצר עלה ב-20% ואז ירד ב-20% מהמחיר החדש. האם המחיר חזר לקדמותו?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "כן, המחיר זהה למקורי" },
      { key: "B", text: "לא, המחיר גדל ב-4%" },
      { key: "C", text: "לא, המחיר קטן ב-4%" },
      { key: "D", text: "לא, המחיר קטן ב-10%" },
    ],
    correctKey: "C",
    explanationHe: "נניח מחיר מקורי 100. אחרי עלייה של 20% המחיר הוא 120. אחרי ירידה של 20% מ-120 מקבלים 96. המחיר קטן ב-4% מהמחיר המקורי.",
    tags: ["התייקרות", "הנחה", "שאלה מסכמת"],
  },
];

window.QUIZ_LABELS = {
  title: "שאלון אחוזים לחטיבת ביניים – סדרה ב'",
  progressAnswered: "נענו",
  progressCorrect: "נכונות",
  progressCompleted: "הושלמו",
  questionLabel: "שאלה",
  ofLabel: "מתוך",
  resetLabel: "איפוס",
  prevLabel: "הקודם",
  nextLabel: "הבא",
  submitLabel: "שליחה סופית",
  explanationTitle: "הסבר",
  emptyMessage: "אין שאלות להצגה.",
  blankNextConfirmMessage: "השאלה הנוכחית עדיין ריקה. להמשיך בכל זאת?",
  blankSubmitConfirmMessage: "השאלה האחרונה עדיין ריקה. לשלוח בכל זאת?",
  completionTitle: "השליחה התקבלה",
  completionMessage: "השאלון נשלח וננעל.\nאם צריך לפתוח ניסיון חדש, דברו עם המורה.",
  submitErrorMessage: "לא הצלחנו לשמור את ההגשה כרגע. נסו שוב בעוד רגע.",
  loadingTitle: "בודקים גישה",
  loadingMessage: "מכינים את השאלון...",
  signInTitle: "נדרשת התחברות",
  signInMessage: "כדי לפתוח את השאלון, התחברו עם חשבון Google.",
  signInButtonLabel: "התחברות עם Google",
  invalidLinkTitle: "קישור שאלון לא תקין",
  invalidLinkMessage: "הקישור שקיבלתם לא תואם את פרטי השאלון הפעילים.",
  windowClosedTitle: "השאלון סגור",
  windowClosedMessage: "השאלון אינו זמין כרגע לפי חלון הזמן שהוגדר.",
  configErrorTitle: "שגיאת הגדרת שאלון",
  configErrorMessage: "הדף לא הוגדר נכון ולכן אי אפשר לפתוח את השאלון.",
  authErrorTitle: "שגיאת התחברות",
  authErrorMessage: "לא הצלחנו להשלים את ההתחברות עם Google.",
  loadErrorTitle: "לא הצלחנו לטעון את השאלון",
  loadErrorMessage: "לא הצלחנו לטעון את מצב השאלון מ-Firebase.",
  signOutLabel: "התנתקות",
  accountSignedInPrefix: "מחוברים בתור",
  autosaveMessage: "ההתקדמות נשמרת אוטומטית בזמן העבודה.",
  debugBadgeLabel: "דיבאג",
  debugResetLabel: "פתיחת ניסיון בדיקה חדש",
  debugResetConfirmMessage: "למחוק את הנתונים השמורים ולהתחיל מחדש?",
};

window.TRACKED_QUIZ_CONFIG = {
  firebaseConfig: {
    apiKey: "AIzaSyB1PN88qSK_iLk2tquUtHEr-243P9-9C8U",
    authDomain: "guysfbfinal.firebaseapp.com",
    databaseURL: "https://guysfbfinal-default-rtdb.firebaseio.com",
    projectId: "guysfbfinal",
    storageBucket: "guysfbfinal.firebasestorage.app",
    messagingSenderId: "305446301273",
    appId: "1:305446301273:web:87f1865be1a45edad9cb48"
  },
  rootPath: "jekyll",
  quizKey: {{ page.quiz_key | jsonify }},
  slug: "percentages-middle-school-2",
  pagePath: {{ page.url | relative_url | jsonify }},
  quizWindowStart: {{ page.quiz_window_start | jsonify }},
  quizWindowEnd: {{ page.quiz_window_end | jsonify }},
  unlockToken: {{ page.quiz_unlock_token | jsonify }},
  debugUids: {{ page.quiz_debug_uids | jsonify }},
  mountId: "quiz-root",
  statusMountId: "tracked-quiz-status",
  accountMountId: "tracked-quiz-account",
  questions: window.QUIZ_QUESTIONS,
  labels: window.QUIZ_LABELS,
  questionLabels: window.QUIZ_LABELS,
  revealDelayMs: 250,
  dir: "rtl"
};
</script>

<script type="text/babel" src="{{ '/assets/js/questionnaire.js' | relative_url }}"></script>
<script src="{{ '/assets/js/tracked-quiz-auth.js' | relative_url }}"></script>
