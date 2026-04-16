---
layout: page
title: שאלון כניסה ללימודי מדעי המחשב – סדרה ב'
tags: [לוגיקה, חשיבה חישובית, שאלון, אינטראקטיבי, מדעי המחשב]
lang: he
full-width: true
tracked_quiz: true
quiz_key: "27-logic-cs-entrance-b"
quiz_window_start: "2026-04-15T08:00:00+03:00"
quiz_window_end: "2026-08-31T23:59:59+03:00"
quiz_unlock_token: "yesodot-logic-b-2026-rN7qL2w5"
quiz_debug_uids:
  - "YtfYwYQ5FxOFk50npfDWF0Ekq7i1"
---

<!-- interactive -->

<div class="box-note" markdown="1">
זהו שאלון כניסה מוגן.

הדף עצמו ציבורי, אבל פתיחת השאלון מחייבת:

- התחברות עם Google
- קישור מלא עם `start`, `end`, `token`
- חלון זמן פעיל

ההתקדמות נשמרת אוטומטית, והשליחה הסופית ננעלת.
</div>


<div id="tracked-quiz-status"></div>
<div id="tracked-quiz-account"></div>
<div id="quiz-root" class="hidden"></div>

<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>

<script>
function escapeBalanceText(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildBalanceRow(row, yOffset) {
  const relation = row.relation || "equal";
  const beamLeftY = relation === "leftHeavy" ? 46 : relation === "rightHeavy" ? 70 : 58;
  const beamRightY = relation === "leftHeavy" ? 70 : relation === "rightHeavy" ? 46 : 58;
  const leftTrayY = relation === "leftHeavy" ? 84 : relation === "rightHeavy" ? 54 : 70;
  const rightTrayY = relation === "leftHeavy" ? 54 : relation === "rightHeavy" ? 84 : 70;
  const leftText = escapeBalanceText((row.left || []).join(" + "));
  const rightText = escapeBalanceText((row.right || []).join(" + "));

  return `
    <g transform="translate(0, ${yOffset})">
      <rect x="20" y="8" width="520" height="96" rx="16" fill="#ffffff" stroke="#d7dee8" />
      <line x1="150" y1="${beamLeftY}" x2="410" y2="${beamRightY}" stroke="#334155" stroke-width="6" stroke-linecap="round" />
      <line x1="280" y1="88" x2="280" y2="58" stroke="#475569" stroke-width="12" stroke-linecap="round" />
      <circle cx="280" cy="58" r="10" fill="#f97316" />
      <line x1="150" y1="${beamLeftY}" x2="150" y2="${leftTrayY - 8}" stroke="#475569" stroke-width="3.5" />
      <line x1="410" y1="${beamRightY}" x2="410" y2="${rightTrayY - 8}" stroke="#475569" stroke-width="3.5" />
      <rect x="74" y="${leftTrayY}" width="152" height="22" rx="11" fill="#cbd5e1" stroke="#94a3b8" />
      <rect x="334" y="${rightTrayY}" width="152" height="22" rx="11" fill="#cbd5e1" stroke="#94a3b8" />
      <text x="150" y="${leftTrayY - 10}" text-anchor="middle" font-size="28" font-family="sans-serif" direction="rtl">${leftText}</text>
      <text x="410" y="${rightTrayY - 10}" text-anchor="middle" font-size="28" font-family="sans-serif" direction="rtl">${rightText}</text>
    </g>`;
}

function buildBalanceSvg(rows) {
  const width = 560;
  const rowHeight = 118;
  const height = (rows.length * rowHeight) + 20;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 ${width} ${height}" role="img" aria-label="תרשים מאזניים">
    <rect x="0" y="0" width="${width}" height="${height}" rx="18" fill="#f8fafc" />
    ${rows.map((row, index) => buildBalanceRow(row, 10 + (index * rowHeight))).join("")}
  </svg>`;
}

window.QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "שאלה 1: מי כבד יותר?",
    promptHe: "במאזניים רואים שהגמל כבד יותר מהקואלה. מי כבד יותר?",
    promptHtml: buildBalanceSvg([
      { left: ["🐫"], right: ["🐨"], relation: "leftHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "הגמל" },
      { key: "B", text: "הקואלה" },
      { key: "C", text: "שניהם שוקלים אותו דבר" },
      { key: "D", text: "אי אפשר לדעת" },
    ],
    correctKey: "A",
    explanationHe: "הצד של הגמל נמוך יותר במאזניים, ולכן הוא כבד יותר.",
    tags: ["משקל ואיזון"],
  },
  {
    id: 2,
    title: "שאלה 2: דילוגים קדימה ואחורה",
    promptHe: "רובוט מתחיל ב-2. פקודות: דילוג = +3, צעד אחורה = -1. הסדרה היא: דילוג, צעד אחורה, דילוג, צעד אחורה. לאיזה מספר הוא מגיע?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "4" },
      { key: "B", text: "5" },
      { key: "C", text: "6" },
      { key: "D", text: "8" },
    ],
    correctKey: "C",
    explanationHe: "2 ל-5, אחר כך ל-4, שוב ל-7, ולבסוף חזרה ל-6.",
    tags: ["סימולציית רובוט"],
  },
  {
    id: 3,
    title: "שאלה 3: מי הגיע ראשון?",
    promptHe: "נטע, רון ויעל רצו הביתה. נטע לא הגיעה ראשונה, ורון הגיע לפני יעל. מי הגיע ראשון?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "נטע" },
      { key: "B", text: "רון" },
      { key: "C", text: "יעל" },
      { key: "D", text: "אי אפשר לדעת בוודאות" },
    ],
    correctKey: "B",
    explanationHe: "נטע לא ראשונה, ואם רון לפני יעל אז יעל גם לא יכולה להיות ראשונה. לכן רון ראשון.",
    tags: ["פאזל לוגי"],
  },
  {
    id: 4,
    title: "שאלה 4: מה בטוח קיבלה תמר?",
    promptHe: "כל מי שהגיש בזמן קיבל אישור. תמר הגישה בזמן. מה בטוח נכון?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "תמר קיבלה אישור" },
      { key: "B", text: "תמר הגישה באיחור" },
      { key: "C", text: "רק תמר קיבלה אישור" },
      { key: "D", text: "אי אפשר לדעת בוודאות" },
    ],
    correctKey: "A",
    explanationHe: "מהכלל ומהנתון על תמר נובע ישירות שהיא קיבלה אישור.",
    tags: ["הסקה"],
  },
  {
    id: 5,
    title: "שאלה 5: מי קל יותר?",
    promptHe: "הפנדה שוקלת כמו שני קיפודים. מי הקל יותר?",
    promptHtml: buildBalanceSvg([
      { left: ["🐼"], right: ["🦔", "🦔"], relation: "equal" },
    ]),
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "הפנדה" },
      { key: "B", text: "הקיפוד" },
      { key: "C", text: "הם שוקלים אותו דבר" },
      { key: "D", text: "אי אפשר לדעת" },
    ],
    correctKey: "B",
    explanationHe: "אם פנדה אחת שווה לשני קיפודים, אז כל קיפוד לבדו קל יותר מהפנדה.",
    tags: ["משקל ואיזון"],
  },
  {
    id: 6,
    title: "שאלה 6: מי ראשון בתור?",
    promptHe: "רון, מאיה וגיא עומדים בתור. מאיה לפני גיא, ורון אינו ראשון. מי ראשון?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "רון" },
      { key: "B", text: "מאיה" },
      { key: "C", text: "גיא" },
      { key: "D", text: "אי אפשר לדעת בוודאות" },
    ],
    correctKey: "B",
    explanationHe: "רון אינו ראשון, וגיא לא יכול להיות ראשון כי מאיה לפניו. לכן מאיה ראשונה.",
    tags: ["פאזל לוגי"],
  },
  {
    id: 7,
    title: "שאלה 7: מי הקל ביותר?",
    promptHe: "כלב הים כבד מהפינגווין, והפינגווין כבד מהסרטן. מי הקל ביותר?",
    promptHtml: buildBalanceSvg([
      { left: ["🦭"], right: ["🐧"], relation: "leftHeavy" },
      { left: ["🐧"], right: ["🦀"], relation: "leftHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "כלב הים" },
      { key: "B", text: "הפינגווין" },
      { key: "C", text: "הסרטן" },
      { key: "D", text: "אי אפשר לדעת" },
    ],
    correctKey: "C",
    explanationHe: "אם הפינגווין כבד מהסרטן וכלב הים כבד מהפינגווין, אז הסרטן הוא הקל ביותר.",
    tags: ["משקל ואיזון"],
  },
  {
    id: 8,
    title: "שאלה 8: האם יעל למדה?",
    promptHe: "כל תלמיד שלמד למבחן פתר לפחות 5 תרגילים. יעל פתרה 5 תרגילים. מה אפשר לקבוע בוודאות?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יעל למדה למבחן" },
      { key: "B", text: "יעל לא למדה למבחן" },
      { key: "C", text: "יעל פתרה בדיוק 10 תרגילים" },
      { key: "D", text: "אי אפשר לדעת בוודאות" },
    ],
    correctKey: "D",
    explanationHe: "הכלל אומר שלימוד גורר לפחות 5 תרגילים, אבל פתרון של 5 תרגילים לא מוכיח שלמדה.",
    tags: ["הסקה"],
  },
  {
    id: 9,
    title: "שאלה 9: ניווט על רשת",
    promptHe: "רובוט מתחיל בנקודה (1,1). פקודות: מעלה = (0,+1), ימינה = (+1,0), מטה = (0,-1). הסדרה היא: מעלה, ימינה, ימינה, מטה, מעלה. היכן הוא יסיים?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "(2,2)" },
      { key: "B", text: "(3,1)" },
      { key: "C", text: "(3,2)" },
      { key: "D", text: "(4,2)" },
    ],
    correctKey: "C",
    explanationHe: "המסלול הוא (1,1)→(1,2)→(2,2)→(3,2)→(3,1)→(3,2).",
    tags: ["סימולציית רובוט"],
  },
  {
    id: 10,
    title: "שאלה 10: מי יכול להיות ראשון?",
    promptHe: "נטע, רון, יעל ועידו מציגים. רון אחרי יעל, עידו אחרי נטע, ונטע אינה ראשונה. מי יכול להיות ראשון?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "נטע" },
      { key: "B", text: "רון" },
      { key: "C", text: "יעל" },
      { key: "D", text: "עידו" },
    ],
    correctKey: "C",
    explanationHe: "נטע לא ראשונה לפי הנתון, רון לא יכול להיות ראשון כי יעל לפניו, ועידו לא יכול להיות ראשון כי נטע לפניו. לכן רק יעל יכולה להיות ראשונה.",
    tags: ["פאזל לוגי"],
  },
  {
    id: 11,
    title: "שאלה 11: מי הכבד ביותר?",
    promptHe: "התמנון שוקל כמו שלושה סרטנים. הקיפוד שוקל כמו שני סרטנים. מי הכבד ביותר?",
    promptHtml: buildBalanceSvg([
      { left: ["🐙"], right: ["🦀", "🦀", "🦀"], relation: "equal" },
      { left: ["🦔"], right: ["🦀", "🦀"], relation: "equal" },
    ]),
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "התמנון" },
      { key: "B", text: "הסרטן" },
      { key: "C", text: "הקיפוד" },
      { key: "D", text: "כולם שוקלים אותו דבר" },
    ],
    correctKey: "A",
    explanationHe: "שלושה סרטנים כבדים יותר משני סרטנים, ולכן התמנון כבד יותר מהקיפוד ומהסרטן.",
    tags: ["משקל ואיזון"],
  },
  {
    id: 12,
    title: "שאלה 12: מי בטוח לא ראשון?",
    promptHe: "מאיה, גיא, תמר ועידו יושבים בשורה. גיא יושב אחרי מאיה, ועידו יושב לפני גיא. מי בטוח לא יושב ראשון?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "מאיה" },
      { key: "B", text: "גיא" },
      { key: "C", text: "תמר" },
      { key: "D", text: "עידו" },
    ],
    correctKey: "B",
    explanationHe: "גיא חייב לבוא אחרי מאיה וגם אחרי עידו, ולכן הוא לא יכול להיות ראשון.",
    tags: ["פאזל לוגי"],
  },
  {
    id: 13,
    title: "שאלה 13: חזרה על זוג פקודות",
    promptHe: "רובוט מתחיל ב-0. פקודות: קפיצה ימינה = +2, צעד שמאלה = -1. מבצעים פעמיים את הזוג קפיצה ימינה ואז צעד שמאלה, ואחר כך עוד שתי קפיצות ימינה. לאיזה מספר יגיע הרובוט?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "5" },
      { key: "B", text: "6" },
      { key: "C", text: "7" },
      { key: "D", text: "8" },
    ],
    correctKey: "B",
    explanationHe: "כל זוג פקודות מוסיף 1, ולכן אחרי שתי חזרות מגיעים ל-2. שתי הקפיצות האחרונות מוסיפות עוד 4 ומביאות ל-6.",
    tags: ["סימולציית רובוט"],
  },
  {
    id: 14,
    title: "שאלה 14: מי הכבד ביותר לפי שרשרת שוויונות?",
    promptHe: "החתול שוקל כמו שני כלבים, וכלב שוקל כמו שני אוגרים. מי הכבד ביותר?",
    promptHtml: buildBalanceSvg([
      { left: ["🐱"], right: ["🐶", "🐶"], relation: "equal" },
      { left: ["🐶"], right: ["🐹", "🐹"], relation: "equal" },
    ]),
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "החתול" },
      { key: "B", text: "הכלב" },
      { key: "C", text: "האוגר" },
      { key: "D", text: "כולם שוקלים אותו דבר" },
    ],
    correctKey: "A",
    explanationHe: "החתול שווה לשני כלבים, וכל כלב שווה לשני אוגרים. לכן החתול הוא הכבד ביותר.",
    tags: ["משקל ואיזון"],
  },
  {
    id: 15,
    title: "שאלה 15: מה בטוח קרה למסך?",
    promptHe: "כל מי שנכנס לאתר הזין סיסמה. כל מי שהזין סיסמה עבר למסך הבא. מאיה לא עברה למסך הבא. מה בטוח נכון?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "מאיה לא הזינה סיסמה" },
      { key: "B", text: "מאיה עברה למסך הבא" },
      { key: "C", text: "מאיה שינתה את הסיסמה" },
      { key: "D", text: "אי אפשר לדעת בוודאות" },
    ],
    correctKey: "A",
    explanationHe: "אם הזנת סיסמה מביאה למסך הבא, אז מי שלא עברה למסך הבא בוודאות לא הזינה סיסמה.",
    tags: ["הסקה"],
  },
  {
    id: 16,
    title: "שאלה 16: מי הכבד ביותר בין שלושה חפצים?",
    promptHe: "התיק שוקל כמו ספר ועיפרון. הספר שוקל כמו שלושה עפרונות. מי הכבד ביותר?",
    promptHtml: buildBalanceSvg([
      { left: ["🎒"], right: ["📚", "✏️"], relation: "equal" },
      { left: ["📚"], right: ["✏️", "✏️", "✏️"], relation: "equal" },
    ]),
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "התיק" },
      { key: "B", text: "הספר" },
      { key: "C", text: "העיפרון" },
      { key: "D", text: "אי אפשר לדעת בוודאות" },
    ],
    correctKey: "A",
    explanationHe: "הספר שווה לשלושה עפרונות, והתיק שווה לספר ועוד עיפרון. לכן התיק כבד יותר מכולם.",
    tags: ["משקל ואיזון"],
  },
  {
    id: 17,
    title: "שאלה 17: מי יכול להיות ראשון?",
    promptHe: "נטע, רון, יעל ועידו מציגים. נטע לפני רון, רון לפני יעל, ועידו אינו ראשון. מי יכול להיות ראשון?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "רון" },
      { key: "B", text: "יעל" },
      { key: "C", text: "עידו" },
      { key: "D", text: "רק נטע" },
    ],
    correctKey: "D",
    explanationHe: "רון לא ראשון כי נטע לפניו, יעל לא ראשונה כי רון לפניה, ועידו אינו ראשון לפי הנתון. לכן רק נטע יכולה להיות ראשונה.",
    tags: ["פאזל לוגי"],
  },
  {
    id: 18,
    title: "שאלה 18: מסלול עם פניות",
    promptHe: "רובוט מתחיל ב-(0,0) ופונה צפונה. פקודות: קדימה = צעד אחד בכיוון הנוכחי, ימינה = סיבוב ימינה, שמאלה = סיבוב שמאלה. הסדרה היא: קדימה, קדימה, ימינה, קדימה, שמאלה, קדימה, קדימה. היכן הוא מסיים ולאיזה כיוון הוא פונה?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "(1,4), צפונה" },
      { key: "B", text: "(1,4), מזרחה" },
      { key: "C", text: "(0,4), צפונה" },
      { key: "D", text: "(1,3), צפונה" },
    ],
    correctKey: "A",
    explanationHe: "שתי פקודות קדימה מביאות ל-(0,2), ימינה וקדימה ל-(1,2), ואז שמאלה מחזיר לצפון ושתי פקודות קדימה נוספות מביאות ל-(1,4).",
    tags: ["סימולציית רובוט"],
  },
  {
    id: 19,
    title: "שאלה 19: מה בטוח לא הופיע?",
    promptHe: "אם במערכת מופיעה הודעת \"בוצע\", הקובץ נשמר. אם הקובץ נשמר, אפשר לפתוח אותו אחר כך. עכשיו אי אפשר לפתוח את הקובץ. מה בטוח נכון?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "הקובץ נשמר" },
      { key: "B", text: "הודעת \"בוצע\" לא הופיעה" },
      { key: "C", text: "מישהו מחק את הקובץ" },
      { key: "D", text: "אי אפשר לדעת בוודאות" },
    ],
    correctKey: "B",
    explanationHe: "אם אי אפשר לפתוח את הקובץ, אז הוא לא נשמר. וכיוון שהודעת \"בוצע\" מבטיחה שמירה, היא לא הופיעה.",
    tags: ["הסקה"],
  },
  {
    id: 20,
    title: "שאלה 20: מי הקל ביותר?",
    promptHe: "האוטובוס שוקל כמו שתי מכוניות. מכונית שוקלת כמו שני אופניים. האופניים כבדים יותר מהקורקינט. מי הקל ביותר?",
    promptHtml: buildBalanceSvg([
      { left: ["🚌"], right: ["🚗", "🚗"], relation: "equal" },
      { left: ["🚗"], right: ["🚲", "🚲"], relation: "equal" },
      { left: ["🚲"], right: ["🛴"], relation: "leftHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "האוטובוס" },
      { key: "B", text: "המכונית" },
      { key: "C", text: "האופניים" },
      { key: "D", text: "הקורקינט" },
    ],
    correctKey: "D",
    explanationHe: "אם האופניים כבדים מהקורקינט, וכל מכונית ואוטובוס כבדים אפילו יותר, אז הקורקינט הוא הקל ביותר.",
    tags: ["משקל ואיזון"],
  },
];

window.QUIZ_LABELS = {
  title: "שאלון כניסה ללימודי מדעי המחשב – סדרה ב'",
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
  slug: "logic-cs-entrance-b",
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
