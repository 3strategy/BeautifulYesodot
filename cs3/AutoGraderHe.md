---
layout: page
title: "משוב באמצעות AI"
subtitle: "אוטומציה של Google Sheets, LLM , Classroom"
author: גיא סידס
tags: [משוב, ניקוד, LLM]
mathjax: true
lang: he
---



{: .box-note}
מערכת אוטומטית ליצירת משוב בעברית על תשובות תלמידים (בעיקר קוד) שנמסרו דרך Google Forms/Google Classroom.  
המערכת קוראת את תשובות התלמידים מטבלת ה־Responses, בונה פרומפט עשיר ל־LLM (GPT / Claude / Groq), שומרת את המשוב והציון בגליון, ולאחר אישור – מזרימה אותם ישירות למסמכי Google Docs של התלמידים, עם תמיכה מלאה ב־RTL וברשימות בעברית. 

---

## מאפיינים

- ✅ **תמיכה במספר מודלי LLM**  
  עבודה עם OpenAI GPT (ברירת מחדל), ועם אפשרות להתאמה קלה ל־Claude ו־Groq.
- ✅ **שני שלבים נפרדים**  
  1. חקירת LLM ויצירת משוב  
  2. הפצה למסמכי התלמידים ב־Classroom  
- ✅ **תמיכה מלאה בעברית**  
  כיווניות RTL, כותרות, רשימות, וטקסט קוד (LTR) – הכל מעוצב אוטומטית ב־Docs. :contentReference
- ✅ **פירוק Markdown**  
  המערכת לוקחת את ה־markdown שהמודל מחזיר, ומתרגמת אותו לסגנונות Docs מקומיים (כותרות, הדגשה, bullets וכו'). :contentReference
- ✅ **מיפוי תלמידים חכם**  
  סנכרון רשימת תלמידים מתוך Classroom, בניית טבלת StudentMapping ומיפוי דוא״ל→StudentID. :contentReference{index=4}  
- ✅ **לוג שגיאות ומעקב סטטוסים**  
  לכל שורה בגליון יש סטטוס, Debug Log, תוצאות LLM גולמיות וציונים מחושבים.

---

## ארכיטקטורה בקצרה

1. **שלב חקירת LLM (Interrogation)**  
   - קריאת תשובות התלמידים מהשורה בגליון  
   - בניית פרומפט עשיר הכולל: נוסח השאלה, פתרון מורה, הערות ורובריקה  
   - שליחת הבקשה ל־LLM  
   - ניתוח התגובה, שליפת ציון/ים, Teacher Guidance וטקסט משוב לתלמיד  
   - כתיבה חזרה לעמודות ייעודיות בגליון (ציון גולמי, ציון מנורמל, הנחיות למורה, טקסט משוב).

2. **שלב הפצה (Delivery)**  
   - שימוש ב־Course ID ו־Assignment ID כדי למצוא את מסמך המשוב של כל תלמיד  
   - מציאת ה־Google Doc הנכון דרך Classroom Submissions  
   - ניקוי מסמך המשוב הקיים, הזרקת הטקסט החדש בפורמט Markdown→Docs  
   - הפעלת Docs Advanced API כדי להחיל RTL למסמך כולו, ואז החזרת קטעי קוד/תשובות ל־LTR  
   - עדכון סטטוס השורה ל־Complete. 

{: .box-success}
הפרדה ברורה בין ״יצירת משוב״ לבין ״הפצה לתלמידים״ מאפשרת בדיקה, דיבוג וסבבי תיקון לפני שהמשוב ״ננעל״ במסמכי התלמידים.

---

## מדריך התקנה / הפעלה ראשונית

### שלב 1: יצירת מטלת Quiz ב־Google Classroom

1. ב־**Google Classroom** צרו **Assignment** חדש.
2. בחרו **Create → Quiz Assignment** – זה ייצור טופס Google Forms משויך. :contentReference[oaicite:7]{index=7}  
3. בכרטיסיית **Settings → Responses** בטופס –  

   {: .box-warning}
   ודאו שהאפשרות **Collect email addresses** מופעלת – בלעדיה המערכת לא תוכל למפות תלמידים.

4. הוסיפו את שאלות השאלון (למשל שאלות קוד).
5. בקביעות המטלה ב־Classroom – הגדירו תאריך יעד וניקוד, ואשרו את המטלה לתלמידים.

---

### שלב 2: יצירת Responses Sheet

1. פתחו את הטופס → לשונית **Responses** → אייקון ה־Sheets הירוק.  
2. צרו גליון תשובות חדש (לרוב בשם `Form Responses 1`).  
3. ודאו ש־A1 הוא `Timestamp` ו־B1 הוא `Email Address`. 

אם כבר יש לכם Responses Sheet קיים, אפשר להוסיף אליו את ה־Apps Script בלי ליצור חדש.

---

### שלב 3: הוספת קבצי Apps Script

קובץ google sheets הכולל את כל קובצי הקוד יסופק לפי דרישה

### שלב 4: קביעת קבועים בסיסיים

ב־`Code.js` מגדירים בראש הקובץ:

```javascript
// עמודות בסיסיות של הטופס
const COL_TIMESTAMP = 1; // Timestamp
const COL_EMAIL     = 2; // Email address
const COL_SCORE     = 3; // ניקוד מספרי (אופציונלי)

// העמודה הראשונה של תשובות תלמידים
const NUM_QUESTIONS   = 1; // מספר שאלות בשאלון
````

חשוב לעדכן:

* `COL_FIRST_ANSWER` – מספר העמודה שבה מתחילה התשובה הראשונה (ברירת מחדל: 5 = עמודה E).
* `NUM_QUESTIONS` – מספר השאלות בפועל. 

המערכת משתמשת בערכים האלו כדי לחשב אוטומטית את עמודות הסטטוס, הלוג ותוצאות ה־LLM.

---

### שלב 5: יצירת גליינים תומכים

1. רעננו את דף ה־Sheets – אמורה להופיע תפריט חדש: **🎓 Classroom Feedback**. 
2. בתפריט: **⚙️ Sheet Setup → Initialize Required Sheets**.

הפעולה תיצור:

* **Settings** – גליון הגדרות בסיסיות

  * A1 – Course ID
  * A2 – Course Name (נמלא אוטומטית)
  * A3 – Feedback Assignment ID
* **AssignmentConfig** – תצורת שאלות, פתרונות והערות הערכה. 

3. לאחר מכן, הריצו **⚙️ Sheet Setup → Add System Columns** – כדי להוסיף עמודות סטטוס, לוג ותגובות LLM בגליון התשובות.

---

### שלב 6: חיבור ל־Google Classroom

#### Course ID

1. פתחו את הקורס ב־Classroom.
2. העתיקו את ה־Course ID מה־URL (`.../c/COURSE_ID/...`).
3. הדביקו ל־Settings!A1. 

#### בדיקת חיבור לקורס

1. בתפריט: **📚 Classroom Setup → Test Course ID Decoding** – בודק את הקידוד (כולל תמיכה ב־Base64 שמספקים לעתים בממשק).
2. **📚 Classroom Setup → Test Classroom Connection** – מוודא חיבור ל־Courses.get, ומעדכן את שם הקורס ב־A2. 

#### סנכרון רשימת תלמידים

1. **📚 Classroom Setup → Sync Student Mapping** –

   * מושך את כל התלמידים מהקורס
   * יוצר גליון **StudentMapping** עם שם, ID ודוא״ל
2. במידת הצורך – משלימים דוא״ל ידני בעמודה "Email (Manual)".
3. **📚 Classroom Setup → Build Email Mapping** – בונה מיפוי פנימי של `email → studentId` לשימוש בשלב ההפצה. 

---

### שלב 7: הגדרת LLM ושמירת המפתח בצורה מאובטחת

{: .box-warning}
בשלב זה עובדים עם מפתחות API – חובה להקפיד על אבטחה, למחוק מפתחות מהקוד אחרי שמירה ל־Script Properties, ולא להעלות אותם ל־Git.

#### הכנסת המפתח לקוד (זמנית)

1. פתחו `LLMConfig.js`.
2. אתרו את האובייקט `LLM_CONFIG_EXAMPLE`.
3. בעבור המודל הפעיל (למשל `"gpt5mini"`) הזינו את המפתח בשדה `"Key"`. 
4. ודאו שרק מודל אחד מוגדר כ־`"Active": true`.

#### שמירה ל־Script Properties

בתפריט הגליון:

1. **🔧 LLM Configuration → 1. Save Hardcoded Config to Properties** –

   * המערכת שומרת את כל התצורה (כולל המפתח) ל־Script Properties המאובטחים.
2. לאחר השמירה – חיזרו ל־`LLMConfig.js` והחליפו את המפתח בטקסט־דמה (למשל `"Key": "sk-proj-KEY-REMOVED-FOR-SECURITY"`). 

#### בדיקת התצורה

1. **🔧 LLM Configuration → 2. Load & Verify Active Config** – מציגה איזה מודל פעיל ומה ה־Endpoint.
2. **🔧 LLM Configuration → 3. Test LLM Connection** – שולחת פרומפט בדיקה ומוודאת שהחיבור עובד. 

---

### שלב 8: קביעת שאלות ופתרונות בגליון AssignmentConfig

בגליון **AssignmentConfig** ממלאים עבור כל שאלה:

| עמודה            | תוכן                                  |
| ---------------- | ------------------------------------- |
| Question #       | מספר רציף (1, 2, 3, ...)              |
| Question Text    | נוסח השאלה כפי שניתנה לתלמידים        |
| Teacher Solution | פתרון מלא/מייצג של המורה              |
| Notes/Rubric     | הערות, רובריקה, דגשים ל־LLM           |
| Min / Max        | טווח הציון להצגה מנורמלת (אופציונלי)  |

הגליון הזה הוא לב הפרומפט – כאן אומרים למודל מה ציפינו לראות, ואילו שיקולי ניקוד חשובים.

---

### שלב 9: בדיקת חקירת LLM על שורה אחת

1. בגליון ה־Form Responses – עמדו על שורה עם נתוני תלמיד.
2. **🔄 LLM Interrogation → ✅ Do Active Row**.
3. צפו בשדות הסטטוס והלוג מתעדכנים, ובטור ה־Raw LLM Response מופיע טקסט המשוב.
4. בדקו שהציון נשלף נכון מתוך הטקסט. 

---

### שלב 10: יצירת מטלת משוב ב־Classroom

1. ב־Classroom צרו Assignment חדש (למשל: "משוב על Quiz 1").
2. הוסיפו Google Doc כקובץ מצורף.
3. בחרו **Make a copy for each student** – כך לכל תלמיד יהיה מסמך משוב עצמאי. 
4. לאחר יצירת המטלה, העתיקו את ה־Assignment ID מה־URL (`.../a/ASSIGNMENT_ID/...`)
5. הדביקו את ה־Assignment ID ל־Settings!A3. 

---

### שלב 11: בדיקת הפצת משוב למסמך תלמיד

1. ודאו שיש שורה עם סטטוס `"LLM Complete"`.
2. עמדו על השורה → **📤 Deliver to Classroom → Deliver Active Row to Classroom**.
3. המערכת:

   * תמצא את ה־Student ID לפי הדוא״ל
   * תאתר את מסמך ה־Doc של המטלה החדשה
   * תנקה את תוכנו ותכתוב את המשוב בפורמט כותרות/רשימות בעברית
   * תעדכן סטטוס ל־Completed. 

---

## עבודה שוטפת בפרודקשן

### עיבוד תשובות חדשות

**אפשרות A: עיבוד כל השורות שלא טופלו**

* **🔄 LLM Interrogation → ✅✅ Do All Unprocessed**
  המערכת תחזור על כל שורה ללא `"LLM Complete"`, תפעיל LLM ותמלא את כל הטורים הנלווים. 

**אפשרות B: עיבוד לפי שאלה**

* התאמה מחדש לשאלה יחידה דרך תפריטי ה־Re-interrogate per Question (מתאים כשמחדדים את הרובריקה לשאלה מסוימת בלבד). 

### הפצת משוב לכולם

לאחר שהמשוב נראה טוב בגליון:

* **📤 Deliver to Classroom → Deliver All To Classroom** –
  מועבר לכל התלמידים שיש להם סטטוס LLM תקין ומסמך משוב משויך.

{: .box-success}
המודל המומלץ: קודם להריץ עיבוד LLM, לעבור על כמה דוגמאות, לשפר רובריקה/פרומפט לפי הצורך, ורק אז להריץ ״Deliver All״ לכל הכיתה.

---

## תצורת LLM – מבט טכני קצר

ב־`LLMConfig.js` מוגדר אובייקט `LLM_CONFIG_EXAMPLE` המכיל:

* שם ידידותי (Name)
* כתובת `ApiEndpoint`
* מפתח `Key` (אחרי השמירה ל־Properties – מומלץ להחליף לפלס הולדר)
* דגל `Active` – רק מודל אחד פעיל בכל רגע נתון
* `AdditionalConfig` – שדות ייחודיים לכל ספק (למשל `model`, `max_completion_tokens`, `reasoning_effort` ל־OpenAI; `anthropic-version` ל־Claude; וכו'). 

הפונקציה `getActiveLLM()` קוראת את ההגדרות מ־Script Properties ומחזירה את התצורה של המודל הפעיל בלבד. 

---

## התאמת הפרומפט (Prompt Customization)

בניית הפרומפט מתבצעת בפונקציה `buildFeedbackPrompt()` ב־`LLMConfig.js`. הפרומפט כולל: 

1. הגדרת תפקיד – ״מורה לתכנות שנותן משוב במארקדאון בעברית״
2. שאלות המבחן וטקסט השאלה לכל סעיף
3. פתרונות מורה וערות ניקוד (רובריקה)
4. תשובות התלמיד מן הטופס
5. הוראות פורמט ליציאת המשוב (כותרות, מבנה `עשיתם טוב / תיקונים / הצעות לשיפור`, ועוד).

ניתן לעדכן שם בקלות את הניסוח בעברית, רמת הפירוט, והטמפלייט של ה־Teacher Guidance.

---

## אבטחה והמלצות

{: .box-warning}
אסור להשאיר מפתחות API בקוד, ב־GitHub, או לשתף אותם עם משתמשים שאינם מורים / מנהלי המערכת.

* **כן לעשות**:

  * לשמור מפתחות ב־Script Properties בלבד
  * להקפיד ש־`.clasp.json` נמצא ב־`.gitignore`
  * לעבור על משוב לדוגמא לפני הרצת Deliver All. 

* **לא לעשות**:

  * להעלות מפתחות למאגרי Git
  * לתת הרשאות Script Properties למשתמשים לא מוכרים
  * להשאיר מפתחות בקבצי הקוד המקוריים. 

---

## קרדיטים

{: .box-success}
המערכת נבנתה עבור מורות ומורים המשתמשים ב־Google Classroom, במטרה לחסוך זמן, לשפר עקביות בבדיקות, ולאפשר משוב עשיר בעברית על עבודות קוד ופתרונות חישוביים. 

(לקבלת הגליון שלחו לי ואצאפ  [+972586444461](https://wa.me/972586444461)).

