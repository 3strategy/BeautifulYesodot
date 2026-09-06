---
layout: page
title: 'מתחילים ב־VS Code: פרויקט Razor ומאגר פרטי'
subtitle: מתקינים C# Dev Kit, יוצרים פרויקט מהממשק ומריצים אתר ראשון
lang: he
tags: [CSharp, Web, Taba, Git, GitHub]
track: setup
published: true
---

{: .box-note}
נתקין את התוסף C# Dev Kit, ניצור אתר Razor Pages דרך הממשק של VS Code ונפתח אותו בדפדפן. אחר כך נשמור את הקוד במאגר פרטי ב־GitHub ונזמין את המורה. מתחילים כאן גם אם עדיין אין לכם תיקייה או מאגר.

[חזרה: סביבת הפיתוח ו־GitHub]({{ '/taba/01a-development-git/' | relative_url }})

זה המסלול ל־**VS Code** ב־Windows או ב־macOS. אם בחרתם Visual Studio ב־Windows, עברו ל[מסלול Visual Studio]({{ '/taba/01a-setup-visual-studio/' | relative_url }}). מבצעים מסלול אחד בלבד.

## 1. מכינים את הכלים

1. התקינו [VS Code](https://code.visualstudio.com/Download).
2. התקינו [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0) עבור מערכת ההפעלה שלכם. בחרו **SDK**, שמאפשר ליצור ולהריץ פרויקטים.
3. פנו למורה לעזרה בהתקנת **Git** מתוך VS Code.

4. פתחו [GitHub](https://github.com/) בדפדפן, צרו חשבון באמצעות ה־Gmail האישי שלכם, השלימו את אימות הדוא״ל והתחברו. אם כבר יש לכם חשבון, השתמשו בו. שמרו לעצמכם את שם המשתמש. בשלב הזה אין צורך ליצור שם מאגר.

**תיקייה** היא המקום שבו הקבצים נשמרים במחשב. **פרויקט Razor Pages** הוא אוסף קבצים שממנו .NET מריץ אתר. **Git** שומר גרסאות של הקבצים במחשב; **GitHub** שומר עותק של המאגר ברשת.

## 2. מתקינים את התוסף C# Dev Kit

<div class="two-columns">
<div markdown="1" class="column">

לחצו על סמל **Extensions** בסרגל הצד — סמל הריבועים שמסומן בצילום. בתיבת החיפוש הקלידו `C# Dev`.

בתוצאה **C# Dev Kit** של **Microsoft** לחצו **Install** והמתינו לסיום ההתקנה. זה התוסף שמוסיף ל־VS Code את האפשרות ליצור ולנהל פרויקטי C#.

אם מופיע **Reload Window**, לחצו עליו כדי להשלים את טעינת התוסף.

</div>
<div markdown="1" class="column">

[![חלון Extensions עם חיפוש C# Dev וכפתור Install של C# Dev Kit מסומנים]({{ '/assets/img/taba/vscode-install-csharp-dev-kit.png' | relative_url }})]({{ '/assets/img/taba/vscode-install-csharp-dev-kit.png' | relative_url }})

</div>
</div>

## 3. יוצרים פרויקט דרך הממשק

{: .box-warning}
קראו את השלבים לפני שמתחילים והישארו באשף עד לאישור **Create project**. מעבר לחלון אחר במהלך השלבים מפסיק את אשף יצירת הפרויקט. אם האשף נסגר לפני שאישרתם יצירה, פתחו שוב **.NET: New Project** והתחילו את הבחירות מחדש.

<div class="two-columns">
<div markdown="1" class="column">

פתחו **View → Command Palette**, או לחצו **Ctrl+Shift+P** ב־Windows ו־**Cmd+Shift+P** ב־macOS.

הקלידו `.NET: New`, גללו ברשימת התוצאות אם צריך ובחרו **.NET: New Project...**, כפי שמסומן בצילום. בוחרים בפקודת יצירת הפרויקט, ולא באחת מפקודות ההתקנה שמופיעות לידה.

</div>
<div markdown="1" class="column">

[![רשימת הפקודות של VS Code עם NET New Project מסומן לבחירה]({{ '/assets/img/taba/vscode-new-project-command.png' | relative_url }})]({{ '/assets/img/taba/vscode-new-project-command.png' | relative_url }})

</div>
</div>

<div class="two-columns">
<div markdown="1" class="column">

ברשימת התבניות שנפתחת גללו עד שתמצאו **ASP.NET Core Web App (Razor Pages)** ובחרו בה, כפי שמסומן בצילום.

</div>
<div markdown="1" class="column">

[![רשימת תבניות הפרויקט ב־VS Code עם ASP.NET Core Web App (Razor Pages) מסומנת]({{ '/assets/img/taba/vscode-razor-template.png' | relative_url }})]({{ '/assets/img/taba/vscode-razor-template.png' | relative_url }})

</div>
</div>

### בוחרים את מיקום הפרויקט

<div class="two-columns">
<div markdown="1" class="column">

בחלון **Project Location** עברו לתיקיית המשתמש שלכם, ובתוכה אל **source → repos**. בחרו בתיקייה הזאת כמיקום הפרויקט, כפי שמוצג בצילום. שם המשתמש אצלכם יהיה שונה.

כשתתבקשו לתת שם לפרויקט, הקלידו שם באנגלית ללא רווחים שכולל את שמכם, למשל `GuysRazorVS`. האשף ייצור את תיקיות הפרויקט עבורכם.

</div>
<div markdown="1" class="column">

[![בחירת מיקום הפרויקט בתיקיית המשתמש תחת source ואז repos]({{ '/assets/img/taba/vscode-project-location.png' | relative_url }})]({{ '/assets/img/taba/vscode-project-location.png' | relative_url }})

</div>
</div>

### מאשרים את יצירת הפרויקט

<div class="two-columns">
<div markdown="1" class="column">

בחלון **Create project or view options** בחרו **Create project**, כפי שמסומן בצילום. הנתיב שמופיע בשורה מציג היכן הפרויקט שלכם ייווצר.

המתינו לסיום היצירה והטעינה. אם תתבקשו לפתוח את הפרויקט שנוצר, אשרו זאת.

</div>
<div markdown="1" class="column">

[![בחירת Create project לאישור יצירת הפרויקט בנתיב שמוצג באשף]({{ '/assets/img/taba/vscode-create-project-confirm.png' | relative_url }})]({{ '/assets/img/taba/vscode-create-project-confirm.png' | relative_url }})

</div>
</div>

{: .box-note}
אם הפקודה **.NET: New Project** אינה מופיעה, חזרו לשלב הקודם והשלימו את התקנת C# Dev Kit. אם כבר יצרתם פרויקט, פתחו את התיקייה הקיימת דרך **File → Open Folder** במקום ליצור עותק נוסף.

## 4. מריצים ובודקים שהפרויקט פועל

בחרו **Run → Run Without Debugging**. אם מתבקשים לבחור פרויקט להרצה, בחרו בפרויקט שיצרתם.

{: .box-success}
**הבדיקה הצליחה:** הדפדפן נפתח ומציג **Welcome** בכתובת `localhost`. הפרויקט נוצר ופועל על המחשב שלכם.

אם מופיעה שגיאה במקום האתר, הציגו למורה את ההודעה לפני שממשיכים לשיתוף.

עצרו דרך **Run → Stop Debugging**. בחלון Explorer פתחו את `Pages/Index.cshtml` שבתוך הפרויקט ושנו את המילה `Welcome` בכותרת ל־`החיות שלי`. שמרו והפעילו שוב כדי לראות את השינוי. לאחר הבדיקה עצרו את ההרצה.

בהמשך נעבוד מתוך התיקייה שמכילה את קובץ הפרויקט, למשל `GuysRazor.csproj`, ואת `Pages` ו־`wwwroot`. בדוגמאות הקורס הפרויקט נקרא `RazorTaba`; אצלכם השתמשו בשם שבחרתם. `Pages` מכילה את דפי האתר ו־`wwwroot` את העיצוב, התמונות וקובצי JavaScript.

## 5. מכינים את הקבצים לפרסום

ב־Explorer, בתיקייה שמכילה את קובץ הפרויקט, פתחו את `.gitignore`. אם אינו קיים, צרו אותו באמצעות **New File** בשם המדויק `.gitignore`. הוסיפו את השורות הבאות ושמרו, כדי שקובצי בנייה, מסדי נתונים מקומיים וקובצי סביבה יישארו במחשב:

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

## 6. שומרים גרסה מקומית ואז מפרסמים

<!-- מסלול הפרסום הישיר הקודם נכשל בבדיקת המורה: לאחר יצירת המאגר הופיע שוב Publish Branch וניסיון פרסום נוסף החזיר Repository already exists. המסלול החלופי להלן מבוסס על תיעוד VS Code וטרם אומת בניסוי הכיתתי. -->

{: .box-warning}
בצעו את הפרסום הראשון יחד עם המורה. אם מופיע **GitHub Repository already exists**, עצרו והציגו לו את ההודעה; אל תנסו לפרסם שוב באותו שם.

1. פתחו את **Source Control** ובחרו **Initialize Repository** עבור תיקיית הפרויקט שלכם.
2. ליד קבוצת **Changes** לחצו **+** כדי לבצע **Stage All Changes**. הקבצים יעברו אל **Staged Changes**. קובצי `bin` ו־`obj` אמורים להישאר מחוץ לרשימה בזכות `.gitignore` שהכנתם.
3. כתבו הודעה כגון `Create first Razor Pages site` ולחצו **Commit**. בשלב הזה שומרים גרסה מקומית, לפני החיבור ל־GitHub.
4. לאחר שהקומיט הסתיים, פתחו **View → Command Palette** ובחרו **Publish to GitHub**.
5. אם מתבקשים להתחבר, התחברו לחשבון GitHub שלכם. בחרו **Publish to GitHub private repository**.
6. המתינו לסיום הפרסום ופתחו את המאגר ב־GitHub. פתחו את קובץ `Pages/Index.cshtml` בתוך הפרויקט וראו שהקוד שלכם הגיע.
7. לבדיקה נוספת, שנו פסקה בדף, שמרו, בצעו Stage וכתבו הודעת קומיט. כעת, כשהמאגר כבר מחובר, בחרו **Commit & Sync**. רעננו את המאגר ב־GitHub ובדקו שגם השינוי השני הגיע.

אם מופיעה בקשה להגדיר שם וכתובת דוא״ל ב־Git, פנו למורה והשלימו אותה לפני שממשיכים.

העלאת הקוד ל־GitHub אינה מפעילה אתר באינטרנט. את האתר מריצים במחשב שלכם דרך **Run → Run Without Debugging**.

## 7. משתפים את המורה ובודקים שסיימנו

1. בדף המאגר ב־GitHub פתחו **Settings → Collaborators → Add people**.
2. שתפו את `3strategy@gmail.com` באמצעות שליחת הזמנה. הגישה תופעל אחרי שהמורה יקבל את ההזמנה.
3. העתיקו את כתובת המאגר משורת הכתובת ושלחו אותה במקום שהמורה ביקש. המאגר נשאר **Private**.

<div markdown="1" class="box-success">

לפני ההמשך ודאו שאתם יכולים להראות:

- את תיקיית הפרויקט במחשב ואת קובץ ה־`.csproj` שבתוכה.
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
