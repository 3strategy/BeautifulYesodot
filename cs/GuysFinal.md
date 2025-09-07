---
layout: page
title: "דוח פרוייקט — GuysFinalAndroidAssignment"
subtitle: "גרסת אנדרואיד ניסיונית למשחק ttrainer (HTML + JS) משולב באפליקציה מקורית"
author: גיא סידס
lang: he
---

{: .box-note .table-en}
**Repo:** <https://github.com/3strategy/GuysFinalAndroidAssignment>

---



## 1. תקציר 📜 {#id1.}

<div markdown="1" class="box-success"><!-- Html setting of a class to the div has more flexiblity compared to {: .box-success}--------->
הפרויקט פותח כחלק מהשתלמות **Android Studio** ומתמקד בשילוב עמוד **WebView** שמריץ משחק HTML שהומר מ‑Python (Colab). האפליקציה מדגימה:

* שילוב **Hybrid‑Web + Native** מלא.
* **Alarm Scheduler & Notification** ↔ התראות בעת פתיחת האפליקציה ובשעה קבועה.
* **Sensors API** ↔ ניעור ‑> סגירת אפליקציה.
* שמירת נתונים לוקאליים ב‑**SharedPreferences** (לדוגמה: "lastScore") לצד **Leaderboard** גלובלי הנשמר בענן (Firebase).
* התאמות UI (הקטנת Action Bar / Navigation Bar, תמיכה במצבי Light / Dark).

</div>

---

## 2. ארכיטקטורת‑על {#id2.}



### תרשים זרימה
<!-- FLOWCHART ------------------------------------------------------------>
<div class="mermaid">
flowchart TD
    LA[LauncherActivity] -->|Intent| SPLASH[SplashActivity]
    SPLASH -->|User chooses| MAIN["MainActivity<br/>(Fragments)"]
    MAIN --> WVF["WebViewFragment :ttrainer"]
    MAIN --> DBF[DataFragment]
    MAIN --> SET[SettingsFragment]
    LA   --> WA["WalletActivity<br/>(Android Template)"]
</div>


### Class Diagram
<!-- CLASS DIAGRAM -------------------------------------------------------->
<div class="mermaid">
classDiagram
    class MainActivity {
        +onCreate()
        +scheduleAlarm()
        +registerShakeSensor()
        +saveScore()
    }
    class WebViewFragment {
        +loadHtml()
        +postMessageToJS()
        +receiveJSCallbacks()
    }
    class SharedPrefs
    MainActivity --> WebViewFragment
    MainActivity --> SharedPrefs
</div>

> **הערה:** המרצה מוזמן להריץ את האפליקציה ולוודא את זרימת הנתונים בזמן‑אמת.

---

## 3. מודול WebView – המשחק *ttrainer* {#id3.}


* **HTML → WebView**: עמוד HTML שעבר ריפקטור מפייתון/Colab כדי לרוץ ב‑Web.
* **Bridge API**: שימוש ב‑`addJavascriptInterface` לשליחת נתונים דו‑כיוונית בין JS ↔ Kotlin.
* **Persistence**: סטטוס משתמש נשמר ב‑SharedPreferences; ציוני שחקנים נשלחים ל‑Leaderboard בענן.
{: .box-success}

```kotlin
@JavascriptInterface
fun postScore(score: Int) {
    firebaseRepo.submitScore(score)   // Cloud Leaderboard
    prefs.edit().putInt("lastScore", score).apply()
}
```

---

## 4. MainActivity & Fragments {#id4.}

**חלק ממה שכתוב כאן הוא הזיה של GPT בפועל יש 4 פרגמנטים וצריך לעדכן את הטבלה ידנית**

| Fragment             | תפקיד                   | טכניקות עיקריות                                |
| -------------------- | ----------------------- | ---------------------------------------------- |
| **WebViewFragment**  | מציג את *ttrainer*      | `WebView`, JS Bridge                           |
| **DataFragment**     | טבלת שיאים גלובלית      | Firebase Firestore, `RecyclerView`, `LiveData` |
| **SettingsFragment** | שינוי ערכות צבע והתראות | `PreferenceFragmentCompat`                     |
{: .table-en}

Additional UI tweaks — הקטנת Action Bar ו‑Navigation Bar כדי למקסם שטח תצוגה.

---

## 5. Alarm Scheduler & Notification ⏰ {#id5.}


* התראה מיידית בעת פתיחת האפליקציה (ערוץ "welcome")
* התראה יומית בשעה שמוגדרת בקוד (ערוץ "daily‑reminder")
* תמיכה ב‑API 34 דרך `ExactAlarmPermissionChecker`
{: .box-success}

```kotlin
val alarmMgr = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
// ...
alarmMgr.setExactAndAllowWhileIdle(
    AlarmManager.RTC_WAKEUP,
    triggerTime,
    pendingIntent
)
```

---

## 6. חיישנים – Shake to Close 📳 {#id6.}

| אתגר             | פתרון                                                |
| ---------------- | ---------------------------------------------------- |
| חיווי תנועה רועש | מסנן Low‑Pass + סף תאוצה `> 12 m/s²`                 |
| Lifecycle Aware  | רישום SensorListener ב‑`onResume` ושחרור ב‑`onPause` |

---

## 7. אתגרים מרכזיים & פתרונות {#id7.}



1. **סנכרון WebView ↔ Cloud Leaderboard**  
   > שימוש ב‑Firebase SDK + Callbacks ל‑UI, תוך התחשבות בזמני רשת.
2. **Alarm & Notifications ב‑API 34**  
   > הגדרת הרשאת `SCHEDULE_EXACT_ALARM` ולוגיקה חלופית במכשירים שמונעים התראה מדויקת.
3. **Reduce UI Chrome**  
   > שימוש ב‑`WindowCompat.setDecorFitsSystemWindows(getWindow(), false)`.  
   > שינוי צבע Status Bar דרך Theme‑overlay.

---

## 8. "Lessons Learned" 🤓 {#id8.}



* **Hybrid ≠ Hack** — אינטגרציה נכונה (Cloud + Prefs + JS Bridge) יוצרת חוויה אחידה.
* **Early Sensors Planning** — עדיף לתכנן Lifecycle בשלב מוקדם ולחסוך memory leaks.
* **גרסאות API** — תכונות כמו Exact Alarm דורשות חשיבה לאחור על מכשירים ישנים.

---

## 9. TODO / הרחבות עתידיות {#id9.}



* **צילומי מסך** — להוסיף ל‑`/docs/assets/img/` ↔ קריאה בתג `![Screen](...)`.
* **Firebase Analytics** — שיקוף נתוני שימוש ברמת Cloud.
* **שיפור UX** — אנימציית טעינת נתונים מה‑Leaderboard בענן.

---

## 10. בנייה והרצה ⚙️ {#id10.}


```bash
git clone https://github.com/3strategy/GuysFinalAndroidAssignment.git
cd GuysFinalAndroidAssignment
# Android Studio → Open Folder
```

1. ודא **Android Studio Giraffe (או חדש יותר)** + `Android SDK 34` מותקנים.
2. הפעל **`Run → app`** (מכשיר אמיתי מומלץ לניעור 📳).

---

## 11. קרדיטים 🙏 {#id11.}


* **Guy Siedes** — פיתוח, עיצוב, בדיקות.
* **זאב פריימן** — ייעוץ.
* **קהילת StackOverflow / Firebase / JetBrains** על התשובות.

---

> **שאלות / הערות?**  
> לפנות בטלפון: **0586444461**

