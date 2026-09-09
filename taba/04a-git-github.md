---
layout: page
title: 'שומרים גרסאות עם Git ומפרסמים ב־GitHub'
subtitle: שומרים נקודת חזרה במחשב, בודקים שינוי ומעלים את האתר למאגר פרטי
lang: he
tags: [CSharp, Web, Taba, Git, GitHub]
sequence: 45
track: core
published: true
---

{: .box-note}
נבחר את האתר שנמשיך לפתח, נשמור גרסה שלו במחשב וננסה שינוי שאפשר לבטל. אחר כך נעלה את הגרסאות למאגר פרטי ב־GitHub ונשתף את המורה.

<!-- lesson-back:start -->
[חזרה: אתר שנראה טוב עם Bootstrap]({{ '/taba/04-bootstrap/' | relative_url }}){: data-sequence-nav="prev"}
<!-- lesson-back:end -->

## בוחרים את הפרויקט שנמשיך לפתח

פתחו את האתר שעיצבתם והריצו אותו. בחרו את הפרויקט שאת התוכן והעיצוב שלו תרצו להמשיך לפתח.

אם ניסוי קודם כבר אינו פועל ואתם רוצים להתחיל מחדש, צרו פרויקט Razor Pages בתיקייה חדשה בעזרת [מסלול VS Code]({{ '/taba/01a-setup-vscode/' | relative_url }}) או [מסלול Visual Studio]({{ '/taba/01a-setup-visual-studio/' | relative_url }}). העבירו אליו בהדרגה את הטקסטים, התמונות והעיצוב שתרצו לשמור ובדקו כל שינוי. אפשר להשאיר את תיקיות הניסוי הקודמות במחשב.

{: .box-success}
מתחילים לשמור גרסאות כשיש אתר שנפתח, עם התוכן והעיצוב שבחרתם. ממשיכים מכאן באותו פרויקט; אין צורך לשחזר את כל הניסויים בהיסטוריה.

אם הפרויקט כבר מנוהל ב־Git, השתמשו במאגר הקיים. אם הוא כבר מחובר ל־GitHub, דלגו על יצירת מאגר חדש ובצעו את בדיקת ההעלאה שבהמשך.

## חלק ראשון: שומרים גרסאות במחשב עם Git

**Git** שומר היסטוריה בתוך תיקיית הפרויקט במחשב. **GitHub** הוא שירות ברשת שאליו נעלה את ההיסטוריה בחלק השני. אפשר לבצע Commit ולהשוות גרסאות גם בלי חיבור לאינטרנט.

| פעולה | מה נשמר או מוצג? |
| :--- | ---: |
| Save | תוכן הקובץ הנוכחי נשמר בדיסק |
| Diff | ההבדל בין הגרסה שב־Git לבין השינוי שעשיתם |
| Stage | בחירת השינויים שייכללו בגרסה הבאה |
| Commit | גרסה עם הודעה נשמרת בהיסטוריה המקומית |

### בוחרים את תיקיית המאגר

ב־Visual Studio בחרו בתיקיית הפתרון החיצונית, שמכילה את קובץ ה־`.sln` או `.slnx` ואת תיקיית הפרויקט. ב־VS Code בחרו בתיקייה שמכילה את כל קובצי האתר; אם יש פתרון ותיקיית פרויקט פנימית, בחרו בתיקיית הפתרון החיצונית.

זו תיקיית האתר האחד שלכם. אל תבחרו את `source/repos` שמכילה גם פרויקטים אחרים, ואל תיצרו מאגר נוסף בתוך `Pages`.

אם Git אינו מותקן או שהפקודה `git` אינה מזוהה בטרמינל, פנו למורה לעזרה בהתקנתו לפני שממשיכים.

### הגדרה ראשונה: שם ודוא״ל ב־Git
{: #git-user-setup}

<div markdown="1" class="box-note">

**לפני הקומיט הראשון**, הגדירו מי אתם ב־Git. התחברות ל־GitHub אינה מחליפה את ההגדרה הזאת.

ב־VS Code בחרו **Terminal → New Terminal**; ב־Visual Studio בחרו **View → Terminal**. בחלון שנפתח בתחתית המסך הריצו את שתי הפקודות הבאות, כל אחת בנפרד ואחריה Enter. החליפו את השם ואת כתובת הדוא״ל בדוגמאות בפרטים שלכם, והשאירו את המירכאות:

```shell
git config --global user.name "Your Name"
git config --global user.email "yourname@gmail.com"
```

בשורה הראשונה כתבו את שמכם. בשנייה כתבו את **כתובת ה־Gmail האישית שתשתמשו בה ב־GitHub בחלק השני**. בדרך כלל הפקודות מסתיימות בלי להציג הודעה — זה תקין.

ההגדרה נשמרת לכל הפרויקטים תחת משתמש מערכת ההפעלה הנוכחי במחשב הזה. במחשב אישי מבצעים אותה פעם אחת; אם כמה תלמידים עובדים תחת אותו משתמש מחשב, כל תלמיד צריך להגדיר את פרטיו לפני העבודה.

</div>

אם Git מציג **Please tell me who you are** או מבקש להגדיר `user.name` ו־`user.email`, הריצו את שתי הפקודות וחזרו לפעולת הקומיט. אם הפקודה `git` אינה מזוהה, פנו למורה לעזרה בהתקנת Git.


### מכינים את הקבצים לשמירת גרסאות

בתיקייה שבחרתם כשורש המאגר פתחו את `.gitignore` בעורך. אם אינו קיים, צרו אותו באמצעות **New File** בשם המדויק `.gitignore`. הוסיפו את השורות הבאות ושמרו, כדי שקובצי בנייה, מסדי נתונים מקומיים וקובצי סביבה יישארו במחשב:

```gitignore
**/bin/
**/obj/
.vs/
*.db
*.db-*
*.sqlite
*.sqlite3
.env
.env.*
```


### יוצרים מאגר מקומי — בוחרים את העורך שלכם

<div class="two-columns">
<div markdown="1" class="column box-note">

#### VS Code

פתחו את תיקיית המאגר דרך **File → Open Folder**. ב־**Source Control** לחצו **Initialize Repository**. לחצו **+** לצד **Changes**, כתבו הודעה כמו `Save my styled website` ולחצו **Commit**.

</div>
<div markdown="1" class="column box-note">

#### Visual Studio

פתחו את הפתרון ובחרו **Git → Create Git Repository**. תחת **Other** בחרו **Local only** או **Local**, בדקו את הנתיב ואשרו את יצירת המאגר המקומי.

פתחו **View → Git Changes**. אם נותרו קבצים ב־**Changes**, הוסיפו אותם עם **+**, כתבו הודעה כמו `Save my styled website` ובחרו **Commit Staged**. אם האשף כבר יצר Commit, בדקו שהוא כולל את האתר.

</div>
</div>

לפני הקומיט בדקו שקובצי האתר ו־`.gitignore` כלולים, ושקובצי בנייה מתוך `bin` ו־`obj` אינם ברשימה. ב־Visual Studio שמרו גם את קובץ הפתרון.

[עזרה: מאגר מקומי ב־Visual Studio](https://learn.microsoft.com/en-us/visualstudio/version-control/git-create-repository?view=visualstudio) · [Stage ו־Commit ב־VS Code](https://code.visualstudio.com/docs/sourcecontrol/staging-commits)

### רואים מה השתנה ושומרים גרסה נוספת

1. שנו משפט בדף הבית, שמרו והריצו.
2. פתחו **Source Control** ב־VS Code או **Git Changes** ב־Visual Studio ולחצו על הקובץ כדי לראות את ה־Diff.
3. הסבירו איזו שורה השתנתה. בצעו Stage ו־Commit עם הודעה שמתארת את השינוי.
4. ב־VS Code פתחו את **Source Control Graph**; ב־Visual Studio פתחו **Git → View Branch History**. מצאו את הגרסאות ששמרתם.

### ניסוי קטן: חוזרים לגרסה ששמרנו

{: .box-warning}
מבצעים את הניסוי רק אחרי שהעבודה הרצויה שמורה ב־Commit ואין שינויים ממתינים. ביטול השינוי הבא יסיר את העריכה הניסיונית מהקובץ; אל תבחרו ביטול של כל הקבצים.

1. החליפו מילה אחת בכותרת ב־`Pages/Index.cshtml`, שמרו וראו אותה בדפדפן. הפעם **אל תבצעו Stage או Commit**.
2. פתחו את ה־Diff של הקובץ ובדקו שהוא מכיל רק את שינוי הניסוי.
3. ב־VS Code לחצו עליו בכפתור הימני ובחרו **Discard Changes**. ב־Visual Studio בחרו **Undo Changes** על אותו קובץ ב־Git Changes. אשרו את ביטול השינוי בקובץ הזה בלבד.
4. הריצו שוב ובדקו שהכותרת חזרה לגרסה האחרונה ששמרתם ב־Commit.

[עזרה: ביטול עריכה ב־VS Code](https://code.visualstudio.com/docs/sourcecontrol/staging-commits) · [ביטול שינויים ב־Visual Studio](https://learn.microsoft.com/en-us/azure/devops/repos/git/undo?view=azure-devops)

{: .box-success}
יש לכם גרסאות במחשב, ואתם יודעים לבדוק שינוי ולחזור מהניסוי לגרסה האחרונה. עכשיו נעלה אותן ל־GitHub.

## חלק שני: מעלים את הגרסאות ל־GitHub

**Commit שומר במחשב; Push מעלה ל־GitHub.** הפרסום הראשון יוצר מאגר ברשת ומחבר אליו את המאגר המקומי. לאחר מכן מעלים גרסאות נוספות באמצעות Push.

### יוצרים חשבון ומתחברים

פתחו [GitHub](https://github.com/) והירשמו עם כתובת ה־Gmail האישית שלכם. השלימו את אימות הדוא״ל. אם כבר יש לכם חשבון, השתמשו בו. אין צורך ליצור מאגר באתר לפני הפרסום מהעורך.

ב־Visual Studio אפשר להתחבר דרך **File → Account Settings** ולהוסיף את חשבון GitHub שלכם. ב־VS Code תתבקשו להתחבר במהלך הפרסום. בדקו שאתם משתמשים בחשבון האישי הנכון.

### מפרסמים מאגר פרטי — בוחרים את העורך שלכם

<div class="two-columns">
<div markdown="1" class="column box-note">

#### VS Code

פתחו **View → Command Palette → Publish to GitHub**. התחברו אם תתבקשו, בחרו שם למאגר ובחרו **Publish to GitHub private repository**. המתינו לסיום ההעלאה.

</div>
<div markdown="1" class="column box-note">

#### Visual Studio

בחלון **Git Changes** לחצו **Push** (החץ כלפי מעלה). כשאין מאגר מרוחק, המשיכו לפרסום ב־GitHub. בדקו את החשבון ואת שם המאגר, בחרו **Private** ואשרו **Create and Push**.

אם המאגר כבר מחובר, Push מעלה אליו את הגרסאות; אין ליצור מאגר נוסף.

</div>
</div>

<!-- המעבר ממאגר Local only לפרסום ב־Visual Studio דורש בדיקת ממשק במעבדה. מסלול VS Code עם Initialize ואז Publish הצליח בבדיקת המורה; בדיקות מחשבים נוספים עדיין מתוכננות. -->

{: .box-warning}
אם מופיע **Repository already exists** או שההעלאה נכשלת, הציגו למורה את ההודעה. אל תנסו שוב ליצור מאגר באותו שם ואל תמחקו את העבודה.

[עזרה: פרסום מ־VS Code](https://code.visualstudio.com/docs/sourcecontrol/repos-remotes) · [העלאה מ־Visual Studio](https://learn.microsoft.com/en-us/visualstudio/version-control/git-push-remote?view=visualstudio)

### בודקים שהגרסאות הגיעו ומשתפים את המורה

1. פתחו את המאגר ב־GitHub ובדקו שמופיעה התווית **Private**.
2. פתחו את `Pages/Index.cshtml` בתוך הפרויקט ובדקו שהתוכן האחרון נמצא שם. פתחו את רשימת ה־Commits וראו את הודעות הגרסאות ששמרתם.
3. בחרו **Settings → Collaborators → Add people** ושלחו הזמנה ל־`3strategy@gmail.com`.
4. שלחו את כתובת המאגר במקום שהמורה ביקש. הגישה למורה תופעל לאחר קבלת ההזמנה.

[עזרה: הזמנת שותפים למאגר פרטי](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository)

העלאת הקוד אינה מפעילה את האתר באינטרנט. ממשיכים להריץ אותו במחשב מתוך העורך.

### מעלים שינוי נוסף

שנו פסקה, שמרו ובדקו בדפדפן. בדקו Diff, בצעו Stage ו־Commit. לאחר מכן בחרו **Source Control → … → Push** ב־VS Code או **Git → Push** ב־Visual Studio. רעננו את המאגר ב־GitHub וודאו שגם השינוי החדש הגיע.

## ממשיכים במחשב הזה או במחשב נוסף

**Pull** מקבל את הגרסאות שהועלו ל־GitHub. **Clone** יוצר במחשב נוסף עותק של המאגר ושל ההיסטוריה שלו.

<details markdown="1"><summary>עוברים למחשב נוסף? מבצעים Clone פעם אחת</summary>

אחרי שהעליתם את העבודה מהמחשב הראשון, התחברו לאותו חשבון GitHub במחשב הנוסף. **Clone** מוריד את המאגר ואת ההיסטוריה שלו לתיקייה מקומית; אין ליצור שם פרויקט חדש.

- ב־VS Code: בחרו **View → Command Palette → Git: Clone**, הדביקו את כתובת המאגר הפרטי שלכם, בחרו תיקיית אב כגון `WebProjects`, ואז פתחו את התיקייה שנוצרה.
- ב־Visual Studio: במסך הפתיחה בחרו **Clone a repository**, הדביקו את הכתובת, בחרו מקום לשמירה ולחצו **Clone**. פתחו את קובץ הפתרון שבמאגר.

התקינו גם במחשב הזה את כלי הפיתוח מהמסלול שלכם. לאחר מכן, בכל מפגש פותחים את אותו עותק ומבצעים Pull; אין צורך ב־Clone נוסף.

</details>

## שגרת העבודה מהשיעור הבא

- בתחילת מפגש, לאחר שהעבודה הקודמת שמורה ב־Commit: פתחו את המאגר הנכון ובצעו **Pull**. ב־VS Code: **Source Control → … → Pull**; ב־Visual Studio: **Git → Pull**.
- לאחר שינוי משמעותי: שמרו, הריצו, בדקו Diff, בצעו Stage ו־Commit.
- בסיום: בצעו Push ובדקו ב־GitHub שהשינוי הגיע, גם כשעובדים תמיד באותו מחשב נייד.
- אם מופיעה התנגשות או שגיאת סנכרון, פנו למורה בלי למחוק עבודה ובלי Force Push.

לאורך השנה נדרשים לפחות 50 commits משמעותיים. מתחילים לצבור אותם עכשיו; אין צורך ליצור בדיעבד גרסאות לניסויים הקודמים או לפצל שינוי חסר ערך כדי להגדיל מונה.

## בדיקת הבנה

הראו גרסה ששמרתם במחשב ואת אותה גרסה ב־GitHub. הסבירו מה ההבדל בין Save, Commit ו־Push, ואיזו פעולה החזירה את הכותרת אחרי הניסוי.

{: .box-success}
יש לכם אתר עובד, היסטוריה מקומית ומאגר פרטי שמכיל את הקוד המעודכן. בדקו גם שההזמנה למורה מופיעה כממתינה או מאושרת.

<!-- lesson-next:start -->
---

## המשך

- [מחברים דפים ובונים טופס]({{ '/taba/05-pages-and-forms/' | relative_url }}){: data-sequence-nav="next"}
<!-- lesson-next:end -->
