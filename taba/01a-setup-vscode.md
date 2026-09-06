---
layout: page
title: 'מתחילים ב־VS Code: פרויקט Razor ומאגר פרטי'
subtitle: יוצרים תיקייה, מריצים אתר ראשון ושומרים אותו ב־GitHub
lang: he
tags: [CSharp, Web, Taba, Git, GitHub]
track: setup
published: true
---

{: .box-note}
ניצור תיקייה משלנו, נבנה בתוכה אתר Razor Pages ונפתח אותו בדפדפן. אחר כך נשמור את הקוד במאגר פרטי ב־GitHub ונזמין את המורה. מתחילים כאן גם אם עדיין אין לכם תיקייה או מאגר.

[חזרה: סביבת הפיתוח ו־GitHub]({{ '/taba/01a-development-git/' | relative_url }})

זה המסלול ל־**VS Code** ב־Windows או ב־macOS. אם בחרתם Visual Studio ב־Windows, עברו ל[מסלול Visual Studio]({{ '/taba/01a-setup-visual-studio/' | relative_url }}). מבצעים מסלול אחד בלבד.

## 1. מכינים את הכלים

1. התקינו [VS Code](https://code.visualstudio.com/Download).
2. התקינו [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0) עבור מערכת ההפעלה שלכם. בחרו **SDK**, שמאפשר ליצור ולהריץ פרויקטים.
3. התקינו [Git](https://git-scm.com/downloads). לאחר ההתקנה סגרו ופתחו מחדש את VS Code.
4. ב־VS Code פתחו **Extensions** בסרגל הצד, חפשו **C# Dev Kit** של Microsoft ולחצו **Install**.
5. פתחו [GitHub](https://github.com/) בדפדפן, צרו חשבון אם אין לכם והתחברו. שמרו לעצמכם את שם המשתמש. בשלב הזה אין צורך ליצור שם מאגר.

**תיקייה** היא המקום שבו הקבצים נשמרים במחשב. **פרויקט Razor Pages** הוא אוסף קבצים שממנו .NET מריץ אתר. **Git** שומר גרסאות של הקבצים במחשב; **GitHub** שומר עותק של המאגר ברשת.

## 2. יוצרים ופותחים תיקייה

1. פתחו את סייר הקבצים ב־Windows או את Finder ב־macOS, ועברו אל **Documents / מסמכים**.
2. צרו תיקייה בשם `WebProjects` ופתחו אותה. בתוכה צרו תיקייה בשם `MyAnimals`.
3. ב־VS Code בחרו **File → Open Folder**, בחרו את `MyAnimals` ולחצו **Select Folder / Open**. אם מוצגת שאלת אמון, אשרו את התיקייה שאתם יצרתם.
4. ודאו שבחלק העליון של חלון **Explorer** מופיע `MyAnimals`. זו תהיה תיקיית המאגר, ובה יישמר כל הפרויקט.

{: .box-note}
אם כבר יצרתם את הפרויקט במסלול הזה, פתחו את התיקייה הקיימת והמשיכו מהשלב שבו עצרתם. אין ליצור עותק נוסף. את תיקיית `first-page` מהשיעור הקודם נשאיר כפי שהיא בינתיים.

## 3. יוצרים את פרויקט האתר

בחרו **Terminal → New Terminal**. זהו חלון להקלדת פקודות בתחתית VS Code. הקלידו כל שורה ולחצו Enter:

```shell
dotnet --list-sdks
git --version
```

הפקודה הראשונה צריכה להציג SDK שמתחיל ב־`10.0.`; השנייה צריכה להציג גרסה של Git. אם פקודה אינה מזוהה, חזרו להתקנה ופתחו מחדש את VS Code. אם עדיין אין הצלחה, הציגו למורה את ההודעה לפני שממשיכים.

ודאו שהנתיב המוצג בטרמינל מסתיים ב־`MyAnimals`. הריצו:

```shell
dotnet new webapp -n RazorTaba -o RazorTaba -f net10.0 --auth None
dotnet new gitignore
```

הפקודה הראשונה יוצרת בתוך `MyAnimals` תיקייה חדשה בשם `RazorTaba` ובה קובצי האתר. הפקודה השנייה יוצרת בתיקייה החיצונית קובץ `.gitignore`, שמורה ל־Git לדלג על קבצים זמניים שנוצרים בזמן ההרצה. הפקודות אינן מעלות דבר ל־GitHub.

ב־Explorer פתחו את `RazorTaba` ובדקו שנוצר המבנה הבא:

```text
MyAnimals/
├── .gitignore
└── RazorTaba/
    ├── RazorTaba.csproj
    ├── Program.cs
    ├── Pages/
    │   └── Index.cshtml
    └── wwwroot/
```

`Pages` מכילה את דפי האתר; `wwwroot` מכילה עיצוב, תמונות ו־JavaScript. בהמשך, הנתיב `RazorTaba/Pages/Index.cshtml` תמיד מתחיל מתוך `MyAnimals`.

## 4. מריצים ורואים שינוי

באותו טרמינל, כשאתם עדיין ב־`MyAnimals`, הריצו:

```shell
dotnet watch --project RazorTaba --launch-profile http
```

1. המתינו להודעה **Now listening on** ופתחו בדפדפן את כתובת ה־`http://localhost:...` שמופיעה לצידה. מספר היציאה יכול להיות שונה בכל מחשב.
2. ודאו שמופיע דף הפתיחה עם הכותרת **Welcome**. האתר פועל על המחשב שלכם.
3. פתחו ב־Explorer את `RazorTaba → Pages → Index.cshtml`. בשורת הכותרת שנו רק את המילה `Welcome` ל־`החיות שלי`.
4. שמרו עם **Ctrl+S** ב־Windows או **Cmd+S** ב־macOS וחזרו לדפדפן. אם צריך, רעננו את הדף.
5. לעצירת האתר לחצו בתוך הטרמינל ואז **Ctrl+C**, גם ב־macOS. כדי להפעיל שוב, הריצו שוב את פקודת `dotnet watch`.

{: .box-success}
אם הכותרת החדשה מופיעה בדפדפן, יצרתם פרויקט עובד ושיניתם את הדף הראשון שלו. כעת נשמור את הגרסה הזאת.

## 5. שומרים גרסה ראשונה ב־Git

פתחו את `.gitignore` שבתיקייה החיצונית. בסופו הוסיפו את השורות הבאות ושמרו, כדי שגם מסדי נתונים מקומיים וקובצי סביבה יישארו במחשב:

```gitignore
*.db
*.db-*
*.sqlite
*.sqlite3
.env
.env.*
```

1. פתחו **Source Control** בסרגל הצד ולחצו **Initialize Repository**. ודאו שהמאגר הוא `MyAnimals`. הפעולה מתחילה מעקב מקומי אחר הקבצים; היא אינה יוצרת עדיין מאגר ב־GitHub.
2. תחת **Changes** לחצו על קובץ כדי לראות את התוכן שיישמר. בגרסה הראשונה יהיו קבצים רבים שנוצרו מהתבנית. ודאו ש־`.gitignore` מופיע ושקבצים מתוך `bin` ו־`obj` אינם ברשימה.
3. בחרו **Stage All Changes** דרך תפריט **…**, או לחצו על סימן **+** ליד קבוצת **Changes**. הקבצים יעברו ל־**Staged Changes**: אלה הקבצים שבחרתם לגרסה הבאה.
4. בתיבת ההודעה כתבו `Create first Razor Pages site` ולחצו **Commit**. כך נשמרת גרסה במחשב.

<details markdown="1"><summary>Git מבקש שם וכתובת דוא״ל לפני ה־Commit?</summary>

בטרמינל של `MyAnimals` הריצו את שתי הפקודות הבאות אחרי החלפת טקסט הדוגמה בפרטים שלכם. אפשר להעתיק כתובת פרטיות מסוג `noreply` מתוך **GitHub → Settings → Emails**. אלה פרטי מחבר הגרסה, לא סיסמה.

```shell
git config user.name "Your Name"
git config user.email "YOUR_GITHUB_EMAIL"
```

חזרו ל־Source Control ולחצו שוב **Commit**.

</details>

## 6. מעלים ל־GitHub כמאגר פרטי

1. ב־Source Control לחצו **Publish to GitHub**. אם הכפתור אינו מופיע, פתחו **View → Command Palette**, חפשו `Publish to GitHub` ובחרו בפקודה.
2. אם מתבקשים להתחבר, אשרו בדפדפן את החיבור של VS Code לחשבון GitHub שלכם וחזרו לעורך.
3. תנו למאגר את השם `MyAnimals` ובחרו **Publish to GitHub private repository**. אם מופיעה בחירת נראות נפרדת, בחרו **Private**.
4. המתינו לסיום, ואז לחצו **Open on GitHub** או פתחו באתר GitHub את המאגר מתוך רשימת המאגרים בחשבון שלכם.
5. ודאו שליד שם המאגר כתוב **Private**, שהתיקייה `RazorTaba` והקובץ `.gitignore` מופיעים, ושאפשר לפתוח את `RazorTaba/Pages/Index.cshtml` ולראות את הכותרת ששיניתם.

{: .box-warning}
בחרו **Private** לפני הפרסום. אם השם כבר קיים בחשבון שלכם, בדקו אם זה המאגר שכבר יצרתם בשיעור. אין למחוק מאגר קיים כדי להתחיל שוב. גם במאגר פרטי אין לשמור סיסמאות או מפתחות גישה בקוד.

העלאת הקוד ל־GitHub אינה מפעילה אתר באינטרנט. האתר ממשיך לרוץ במחשב שלכם באמצעות `dotnet watch`.

## 7. משתפים את המורה ובודקים שסיימנו

1. בדף המאגר ב־GitHub פתחו **Settings → Collaborators → Add people**.
2. חפשו את שם המשתמש שהמורה מסר, בחרו בו ושלחו הזמנה. הגישה תופעל אחרי שהמורה יקבל את ההזמנה.
3. העתיקו את כתובת המאגר משורת הכתובת ושלחו אותה במקום שהמורה ביקש. המאגר נשאר **Private**.

<div markdown="1" class="box-success">

לפני ההמשך ודאו שאתם יכולים להראות:

- את התיקייה `MyAnimals` במחשב ואת `RazorTaba.csproj` בתוכה, בתוך `RazorTaba`.
- את האתר פועל בדפדפן עם הכותרת ששיניתם.
- את אותו קובץ ב־GitHub, את ה־Commit הראשון ואת התווית **Private**.
- את ההזמנה למורה, ממתינה או מאושרת, במסך Collaborators.

</div>

<details markdown="1"><summary>מקורות לעזרה</summary>

- [יצירת Razor Pages — Microsoft](https://learn.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/razor-pages-start?view=aspnetcore-10.0)
- [צעדים ראשונים ב־Git ב־VS Code](https://code.visualstudio.com/docs/sourcecontrol/quickstart)
- [פרסום מאגר מ־VS Code](https://code.visualstudio.com/docs/sourcecontrol/repos-remotes)
- [הזמנת שותפים למאגר — GitHub](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository)

</details>

## המשך

[חוזרים לשיעור המשותף: משנים את האתר ושומרים שינוי נוסף]({{ '/taba/01a-development-git/#after-setup' | relative_url }})
