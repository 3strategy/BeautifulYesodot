---
layout: post
title: "רשימת תתי נושאים למעקב למידה"
author: גיא סידס
date: 2025-04-05
lang: en
---
<!-- https://chatgpt.com/c/67f0f869-af10-800e-8479-c8fd3873432c -->
<style>
html {
  direction: ltr !important;
}
body {
  text-align: left !important;
}
nav.navbar {
  direction: rtl !important;
  text-align: right !important;
}
/* Remove bullets & left padding from your task list */
ul.task-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Make sure individual items don’t reintroduce their own markers */
ul.task-list li {
  list-style: none;
  margin-left: 0;
}

/* (Optional) Tweak spacing so your checkbox and text line up neatly */
ul.task-list .task-list-item-checkbox {
  margin: 0 0.5em 0 0;
  vertical-align: middle;
}
</style>

## בעמוד זה תוכלו לסמן לעצמכם נושאים שאתם כבר מבינים ולעקוב אחר הלמידה
פשוט סמנו את הנושאים. הסימון אמור להישאר על המחשב שלכם

# Chapter 1: הדפסה, משתנים והמרות

- [ ] רישום במצפן

- [ ] VS2022 התקנת

- [ ] Basic output: Console.WriteLine and Console.Write פלט בסיסי

- [ ] Variables and their types (int, double, string) משתנים וטיפוסי משתנים

- [ ] Declaration and initialization of variables הכרזה ואיתחול משתנים

- [ ] Reading input from the console (Console.ReadLine) ביצוע קלט

- [ ] Converting strings to numerical types (int.Parse, double.Parse) המרת מחרוזות למספר

- [ ] Arithmetic operations (+, -, *, /) אופרטורים חשבוניים

- [ ] Integer division: 10/4 equals 2 חלוקה בשלמים 

- [ ] remainder (modulus %) האופרטור שארית חלוקה

- [ ] Explicit type conversions (**casting**, e.g. `(double)x` ) המרת טיפוסים מפורשת

- [ ] Implicit conversions המרה אוטומטית

- [ ] אופרטורים מיוחדים `+=, -=, *=, /=, ++, --`




# Chapter 2: תנאים, ביטויים לוגיים ושארית חלוקה

- [ ] Comparison operators  אופרטורים של השוואה

- [ ] Conditional statements (if, else if, else) משפטי תנאי

- [ ] Boolean expressions  ביטויים בוליאניים

- [ ] Logical operators `&&, ||, !` אופרטורים לוגיים

- [ ] משמעות הבלוק `{הסוגריים המסולסלים}` 

- [ ] סגנונות כתיבת סוגריים

- [ ] Nested conditional statements משפטי תנאי מקוננים

- [ ] Modulo operation % in conditional contexts השימוש בשארית חלוקה בתוך תנאי

- [ ] Common conditional scenarios (leap year, even/odd checks, etc.) דוגמאות לשימוש בשארית חלוקה

- [ ] Using logical conditions for decision making שימוש בתנאי לקבלת החלטות

- [ ] Flag variables (boolean variables to remember conditions or states) משתנה המשמש כדגל

- [ ] Tracking tables (טבלאות מעקב) for conditional logic טבלאות מעקב לביצוע מותנה

- [ ] string interpolation using `$"a is {a} "` שרשור מחרוזות

- [ ] איפוס סביבת העבודה Windows ⟶ Reset Window Layout


# Chapter 3: המחלקה Math, Random

- [ ] Introduction to the Math class (Math.Pow, Math.Sqrt, Math.Abs) המחלקה המתמטית

- [ ] Usage examples of Math class methods דוגמאות שימוש במחלקה המתמטית

- [ ] Random numbers (Random class, Next, NextDouble) מספרים אקראיים

- [ ] Generating random numbers within specific ranges הגרלת מספר שלם בטווח מוגדר

- [ ] Applications of random numbers in simple problems שימושים של ראנדום

- [ ] Debugging with breakpoints שימוש ב-breakpoints, סרטון

- [ ] הקיצורים הקריטיים cw ⟶ ⟶ הדפסה, Ctrl k d יישור, Ctrl / הערות, Ctrl z לביטול


# Chapter 4: לולאות for

- [ ] Basic loop concept and the purpose of repetition ביצוע חוזר. לולאות

- [ ] Structure of a `for` loop (initialization; condition; increment) מבנה לולאת for

- [ ] Loop execution flow מהלך ביצוע הלולאה

- [ ] Practical examples of for loops דוגמאות ללולאות

- [ ] Using loop counters שימוש במונה

- [ ] Using loop sum שימוש בצובר

- [ ] Breaking loops prematurely with `break` שימוש בהוראת break ליציאה מוקדמת מלולאה


# Chapter 4b: נושאים מתקדמים בתחביר לולאות (ללא קינון)

- [ ] Retaining i value after the loop שימור ערך האינדקס לאחר סיום הלולאה

- [ ] **Multiple initializations**

- [ ] **multiple conditions, multiple increments or statements**

- [ ] **Omisions of the `i` initialization**

- [ ] **BAD Practice: omission of the increment statement**

- [ ] **BAD Practice:** interfering with i inside the block to extend the loop when a condition is met (for example when an input did not meet criteria and we wish to collect a valid predefined number of inputs)

- [ ] **Skipping part of one loop using `continue` statement**

- [ ] Tracking loops execution with tables (טבלאות מעקב)

- [ ] Using **breakpoints** to debug loops שימוש ב-breakpoints לדיבוג לולאות. אין כאן משהו שונה. פשוט בשלב זה רצוי כבר לדעת כיצד משתמשים.

- [ ] עד לשלב זה הנושא **Variable Scope** אמור להיות ברור


# Chapter 5: לולאות while

- [ ] The concept of a conditional loop (while) העיקרון של לולאת

- [ ] Structure and syntax of a while loop מבנה לולאת while

- [ ] Differences between for and while loops ההבדלים בין while ל-for

- [ ] Typical use-cases for while loops (unknown iteration counts, input validation)

- [ ] Infinite loops and stopping conditions

- [ ] `bool` flags שימוש בדגלים. ניתן יהיה להכיר זאת טוב יותר בחלק ב'.

- [ ] Using `break` to control loop execution שימוש בהוראה `break` (for those who know functions: using return in a loop)

- [ ] Debugging while loops with breakpoints (שוב, אין כאן משהו חדש)

<!-- - [ ] Structure of a basic C# program (Main method, class, namespace) מבנה תכנית בסיסית -->


<script>
document.addEventListener('DOMContentLoaded', () => {
  const cbs = Array.from(document.querySelectorAll('li input[type=checkbox]'));

  cbs.forEach((cb, i) => {
    // give it a stable id…
    cb.id = `subtopic-${i}`;

    // …and make it interactive
    cb.removeAttribute('disabled');
  });

  // load previous state
  const saved = JSON.parse(localStorage.getItem('subtopics_progress') || '{}');
  cbs.forEach(cb => { if (saved[cb.id]) cb.checked = true });

  // on any change, rebuild+save
  cbs.forEach(cb => cb.addEventListener('change', () => {
    const states = {};
    cbs.forEach(x => states[x.id] = x.checked);
    localStorage.setItem('subtopics_progress', JSON.stringify(states));
  }));
});
</script>