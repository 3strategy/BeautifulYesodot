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
- קישור מלא, בחלון זמן פעיל

ההתקדמות נשמרת אוטומטית, והשליחה הסופית ננעלת.
</div>


<div id="tracked-quiz-status"></div>
<div id="tracked-quiz-account"></div>
<div id="quiz-root" class="hidden"></div>

<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>

<script>
const BALANCE_RIGHT_ASSET = "{{ '/assets/img/balance.svg' | relative_url }}";
const BALANCE_LEFT_ASSET = "{{ '/assets/img/balance-mirror.svg' | relative_url }}";
const BALANCE_BALANCED_ASSET = "{{ '/assets/img/balance-balanced.svg' | relative_url }}";
const BALANCE_IMAGE_WIDTH = 473;
const BALANCE_IMAGE_HEIGHT = 255;
const BALANCE_ROW_SCALE = 0.72;
const BALANCE_ROW_GAP = 14;
const BALANCE_ROW_WIDTH = BALANCE_IMAGE_WIDTH * BALANCE_ROW_SCALE;
const BALANCE_ROW_HEIGHT = BALANCE_IMAGE_HEIGHT * BALANCE_ROW_SCALE;
const BALANCE_ITEM_SLOTS = {
  rightHeavy: {
    left: [
      { x: 108, y: 84 },
      { x: 88, y: 86 },
      { x: 128, y: 86 },
    ],
    right: [
      { x: 377, y: 117 },
      { x: 355, y: 118 },
      { x: 399, y: 118 },
    ],
  },
  leftHeavy: {
    left: [
      { x: 96, y: 117 },
      { x: 74, y: 118 },
      { x: 118, y: 118 },
    ],
    right: [
      { x: 365, y: 84 },
      { x: 343, y: 86 },
      { x: 387, y: 86 },
    ],
  },
  balanced: {
    left: [
      { x: 108, y: 99 },
      { x: 86, y: 101 },
      { x: 130, y: 101 },
    ],
    right: [
      { x: 377, y: 99 },
      { x: 355, y: 101 },
      { x: 399, y: 101 },
    ],
  },
};

function escapeSvgText(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderBalanceItems(items, relation, side) {
  const slots = BALANCE_ITEM_SLOTS[relation][side];
  return (items || []).slice(0, slots.length).map((item, index) => {
    const slot = slots[index];
    return `<text x="${slot.x}" y="${slot.y}" text-anchor="middle" dominant-baseline="middle" font-size="34" font-family="'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif">${escapeSvgText(item)}</text>`;
  }).join("");
}

function buildBalanceRow(row, yOffset) {
  const relation = ["leftHeavy", "rightHeavy", "balanced"].includes(row.relation)
    ? row.relation
    : "rightHeavy";
  const asset = relation === "leftHeavy"
    ? BALANCE_LEFT_ASSET
    : relation === "balanced"
      ? BALANCE_BALANCED_ASSET
      : BALANCE_RIGHT_ASSET;

  return `<g transform="translate(14, ${yOffset}) scale(${BALANCE_ROW_SCALE})">
    <image href="${asset}" x="0" y="0" width="${BALANCE_IMAGE_WIDTH}" height="${BALANCE_IMAGE_HEIGHT}" />
    ${renderBalanceItems(row.left, relation, "left")}
    ${renderBalanceItems(row.right, relation, "right")}
  </g>`;
}

function buildBalancePuzzle(rows) {
  const safeRows = Array.isArray(rows) ? rows : [];
  const height = safeRows.length * BALANCE_ROW_HEIGHT + Math.max(0, safeRows.length - 1) * BALANCE_ROW_GAP + 8;
  const width = BALANCE_ROW_WIDTH + 28;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 ${width} ${height}" role="img" aria-label="תרגיל מאזניים" style="display:block;margin:0 auto;max-width:380px">
    ${safeRows.map((row, index) => buildBalanceRow(row, 4 + index * (BALANCE_ROW_HEIGHT + BALANCE_ROW_GAP))).join("")}
  </svg>`;
}

function ltrCode(text) {
  return `\`${text}\``;
}

function signedNumber(value) {
  return value > 0 ? `+${value}` : `${value}`;
}

function pointText(x, y) {
  return ltrCode(`(${x},${y})`);
}

function deltaText(x, y) {
  return ltrCode(`(${signedNumber(x)},${signedNumber(y)})`);
}

function positionChoice(x, y, directionHe) {
  return `${pointText(x, y)}, ${directionHe}`;
}

function emojiChoiceText(items) {
  const safeItems = Array.isArray(items) ? items : [items];
  return safeItems.join(" ו- ");
}

function emojiChoiceHtml(items) {
  const safeItems = Array.isArray(items) ? items : [items];
  return `<span class="quiz-choice-emoji-line">${safeItems.map((item, index) => `
    ${index ? '<span class="quiz-choice-emoji-joiner">ו-</span>' : ""}
    <span class="quiz-choice-emoji">${escapeSvgText(item)}</span>
  `).join("")}</span>`;
}

function singleEmojiChoice(key, emoji) {
  return {
    key,
    text: emoji,
    choiceHtml: emojiChoiceHtml([emoji]),
  };
}

function pairEmojiChoice(key, left, right) {
  return {
    key,
    text: emojiChoiceText([left, right]),
    choiceHtml: emojiChoiceHtml([left, right]),
  };
}

window.QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "שאלה 1: מי הכבד ביותר?",
    promptHtml: buildBalancePuzzle([
      { left: ["🐫"], right: ["🐨"], relation: "leftHeavy" },
      { left: ["🐨"], right: ["🦘"], relation: "leftHeavy" },
      { left: ["🐫"], right: ["🐼"], relation: "leftHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      singleEmojiChoice("A", "🐫"),
      singleEmojiChoice("B", "🐨"),
      singleEmojiChoice("C", "🐼"),
      singleEmojiChoice("D", "🦘"),
    ],
    correctKey: "A",
    explanationHe: "הגמל כבד גם מהקואלה וגם מהפנדה, והקואלה כבדה מהקנגורו. לכן הגמל הוא הכבד ביותר.",
    tags: ["משקל ואיזון"],
  },
  {
    id: 2,
    title: "שאלה 2: דילוגים קדימה ואחורה",
    promptHe: `רובוט מתחיל ב-${ltrCode("2")} וזז כך: דילוג, צעד אחורה, דילוג, צעד אחורה. לאיזה מספר הוא מגיע?\nמקרא: דילוג = ${ltrCode("+3")}, צעד אחורה = ${ltrCode("-1")}.`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "4" },
      { key: "B", text: "5" },
      { key: "C", text: "6" },
      { key: "D", text: "8" },
    ],
    correctKey: "C",
    explanationHe: `המעבר הוא מ-${ltrCode("2")} ל-${ltrCode("5")}, אחר כך ל-${ltrCode("4")}, שוב ל-${ltrCode("7")}, ולבסוף חזרה ל-${ltrCode("6")}.`,
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
    title: "שאלה 5: מי הקל ביותר?",
    promptHtml: buildBalancePuzzle([
      { left: ["🐼"], right: ["🦔", "🦔"], relation: "balanced" },
      { left: ["🐰"], right: ["🦔"], relation: "leftHeavy" },
      { left: ["🦔"], right: ["🐌"], relation: "leftHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      singleEmojiChoice("A", "🐼"),
      singleEmojiChoice("B", "🦔"),
      singleEmojiChoice("C", "🐰"),
      singleEmojiChoice("D", "🐌"),
    ],
    correctKey: "D",
    explanationHe: "כל קיפוד קל יותר מהפנדה, הארנב כבד מקיפוד, והקיפוד כבד מהחילזון. לכן החילזון הוא הקל ביותר.",
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
    promptHtml: buildBalancePuzzle([
      { left: ["🦭"], right: ["🐧"], relation: "leftHeavy" },
      { left: ["🐧"], right: ["🦀"], relation: "leftHeavy" },
      { left: ["🦀"], right: ["🐝"], relation: "leftHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      singleEmojiChoice("A", "🦭"),
      singleEmojiChoice("B", "🐧"),
      singleEmojiChoice("C", "🦀"),
      singleEmojiChoice("D", "🐝"),
    ],
    correctKey: "D",
    explanationHe: "כלב הים כבד מהפינגווין, הפינגווין כבד מהסרטן, והסרטן כבד מהדבורה. לכן הדבורה היא הקלה ביותר.",
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
    promptHe: `רובוט מתחיל בנקודה ${pointText(1, 1)} וזז כך: מעלה, ימינה, ימינה, מטה, מעלה. היכן הוא יסיים?\nמקרא: מעלה = ${deltaText(0, 1)}, ימינה = ${deltaText(1, 0)}, מטה = ${deltaText(0, -1)}.`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: pointText(2, 2) },
      { key: "B", text: pointText(3, 1) },
      { key: "C", text: pointText(3, 2) },
      { key: "D", text: pointText(4, 2) },
    ],
    correctKey: "C",
    explanationHe: `המסלול הוא ${pointText(1, 1)}→${pointText(1, 2)}→${pointText(2, 2)}→${pointText(3, 2)}→${pointText(3, 1)}→${pointText(3, 2)}.`,
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
    promptHtml: buildBalancePuzzle([
      { left: ["🐙"], right: ["🦀", "🦀", "🦀"], relation: "balanced" },
      { left: ["🦔"], right: ["🦀", "🦀"], relation: "balanced" },
      { left: ["🦔"], right: ["🐟"], relation: "leftHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      singleEmojiChoice("A", "🐙"),
      singleEmojiChoice("B", "🦀"),
      singleEmojiChoice("C", "🦔"),
      singleEmojiChoice("D", "🐟"),
    ],
    correctKey: "A",
    explanationHe: "התמנון שווה לשלושה סרטנים, והקיפוד רק לשני סרטנים. לכן התמנון הוא הכבד ביותר.",
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
    promptHe: `רובוט מתחיל ב-${ltrCode("0")} וזז כך: קפיצה ימינה, צעד שמאלה, קפיצה ימינה, צעד שמאלה, קפיצה ימינה, קפיצה ימינה. לאיזה מספר יגיע הרובוט?\nמקרא: קפיצה ימינה = ${ltrCode("+2")}, צעד שמאלה = ${ltrCode("-1")}.`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "5" },
      { key: "B", text: "6" },
      { key: "C", text: "7" },
      { key: "D", text: "8" },
    ],
    correctKey: "B",
    explanationHe: `כל זוג פקודות מוסיף ${ltrCode("1")}, ולכן אחרי שתי חזרות מגיעים ל-${ltrCode("2")}. שתי ההקפיצות האחרונות מוסיפות עוד ${ltrCode("4")} ומביאות ל-${ltrCode("6")}.`,
    tags: ["סימולציית רובוט"],
  },
  {
    id: 14,
    title: "שאלה 14: מי הכבד ביותר?",
    promptHtml: buildBalancePuzzle([
      { left: ["🐱"], right: ["🐶", "🐶"], relation: "balanced" },
      { left: ["🐶"], right: ["🐹", "🐹"], relation: "balanced" },
      { left: ["🐰"], right: ["🐹"], relation: "leftHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      singleEmojiChoice("A", "🐱"),
      singleEmojiChoice("B", "🐶"),
      singleEmojiChoice("C", "🐹"),
      singleEmojiChoice("D", "🐰"),
    ],
    correctKey: "A",
    explanationHe: "החתול שווה לשני כלבים, וכל כלב שווה לשני אוגרים. לכן החתול כבד יותר מהשאר.",
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
    title: "שאלה 16: מי הכבד ביותר?",
    promptHtml: buildBalancePuzzle([
      { left: ["🐬"], right: ["🐟"], relation: "leftHeavy" },
      { left: ["🐡"], right: ["🐟"], relation: "leftHeavy" },
      { left: ["🐬"], right: ["🐙"], relation: "leftHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      singleEmojiChoice("A", "🐬"),
      singleEmojiChoice("B", "🐡"),
      singleEmojiChoice("C", "🐙"),
      { key: "D", text: "אי אפשר לדעת" },
    ],
    correctKey: "D",
    explanationHe: "הדולפין כבד מהדג ומהתמנון, ודג-הנפוח כבד מהדג. אין השוואה בין הדולפין לדג-הנפוח, ולכן אי אפשר לדעת מי הכבד ביותר.",
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
    promptHe: `רובוט מתחיל ב-${pointText(0, 0)} ופונה צפונה. הוא זז כך: קדימה, קדימה, ימינה, קדימה, שמאלה, קדימה, קדימה. היכן הוא מסיים ולאיזה כיוון הוא פונה?\nמקרא: קדימה = צעד אחד בכיוון הנוכחי, ימינה = סיבוב ימינה, שמאלה = סיבוב שמאלה.`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: positionChoice(1, 4, "צפונה") },
      { key: "B", text: positionChoice(1, 4, "מזרחה") },
      { key: "C", text: positionChoice(0, 4, "צפונה") },
      { key: "D", text: positionChoice(1, 3, "צפונה") },
    ],
    correctKey: "A",
    explanationHe: `שתי פקודות קדימה מביאות ל-${pointText(0, 2)}, ימינה וקדימה ל-${pointText(1, 2)}, ואז שמאלה מחזיר לצפון ושתי פקודות קדימה נוספות מביאות ל-${pointText(1, 4)}.`,
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
    promptHtml: buildBalancePuzzle([
      { left: ["🦒"], right: ["🦓", "🦓"], relation: "balanced" },
      { left: ["🦓"], right: ["🐐"], relation: "leftHeavy" },
      { left: ["🐐"], right: ["🐌"], relation: "leftHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      singleEmojiChoice("A", "🦒"),
      singleEmojiChoice("B", "🦓"),
      singleEmojiChoice("C", "🐐"),
      singleEmojiChoice("D", "🐌"),
    ],
    correctKey: "D",
    explanationHe: "הזברה כבדה מהעז, העז כבדה מהחילזון, והג'ירפה כבדה אפילו יותר. לכן החילזון הוא הקל ביותר.",
    tags: ["משקל ואיזון"],
  },
  {
    id: 21,
    title: "שאלה 21: מי שוקל אותו דבר?",
    promptHtml: buildBalancePuzzle([
      { left: ["🐫"], right: ["🐨", "🐨"], relation: "balanced" },
      { left: ["🐼"], right: ["🐨", "🐨"], relation: "balanced" },
      { left: ["🐶"], right: ["🐨"], relation: "leftHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      pairEmojiChoice("A", "🐫", "🐼"),
      pairEmojiChoice("B", "🐫", "🐶"),
      pairEmojiChoice("C", "🐼", "🐨"),
      { key: "D", text: "אי אפשר לדעת" },
    ],
    correctKey: "A",
    explanationHe: "גם הגמל וגם הפנדה שווים לשתי קואלות, ולכן הם שוקלים אותו דבר.",
    tags: ["משקל ואיזון"],
  },
  {
    id: 22,
    title: "שאלה 22: מי כבד יותר?",
    promptHtml: buildBalancePuzzle([
      { left: ["🐻"], right: ["🐝", "🐝"], relation: "balanced" },
      { left: ["🐟"], right: ["🐝", "🐝"], relation: "balanced" },
      { left: ["🐙"], right: ["🐝"], relation: "leftHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      singleEmojiChoice("A", "🐙"),
      singleEmojiChoice("B", "🐟"),
      { key: "C", text: "שניהם שוקלים אותו דבר" },
      { key: "D", text: "אי אפשר לדעת" },
    ],
    correctKey: "D",
    explanationHe: "הדג שווה לשתי דבורים, ואילו על התמנון יודעים רק שהוא כבד מדבורה אחת. לכן אי אפשר לדעת מי כבד יותר.",
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
  debugWindowBypassMessage: "חשבון דיבאג עוקף את חלון הזמן של השאלון.",
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
