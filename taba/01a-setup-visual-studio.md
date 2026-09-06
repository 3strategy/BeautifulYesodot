---
layout: page
title: 'מתחילים ב־Visual Studio: פרויקט Razor ומאגר פרטי'
subtitle: יוצרים פתרון ופרויקט, מריצים אתר ושומרים אותו ב־GitHub
lang: he
tags: [CSharp, Web, Taba, Git, GitHub]
track: setup
published: true
---

{: .box-note}
ניצור ב־Visual Studio אתר Razor Pages חדש, נפתח אותו בדפדפן ונשמור את הקוד במאגר פרטי ב־GitHub. נתחיל בחשבון GitHub עם Gmail אישי ובהתחברות ל־Visual Studio, ניצור פרויקט דרך חלונות התוכנה ונסיים בהזמנת המורה למאגר; אין צורך בפרויקט או במאגר קיימים.

[חזרה: סביבת הפיתוח ו־GitHub]({{ '/taba/01a-development-git/' | relative_url }})

זה המסלול ל־**Visual Studio ב־Windows**. ב־macOS, או אם בחרתם VS Code, עברו ל[מסלול VS Code]({{ '/taba/01a-setup-vscode/' | relative_url }}). מבצעים מסלול אחד בלבד.

## 1. יוצרים חשבון GitHub עם Gmail אישי

1. פתחו בדפדפן את [GitHub](https://github.com/) ולחצו **Sign up**.
2. הירשמו באמצעות **כתובת ה־Gmail האישית שלכם**, שתוכלו להמשיך להשתמש בה גם בהמשך הלימודים. בחרו שם משתמש שתזהו וזכרו באיזה חשבון השתמשתם.
3. השלימו את ההרשמה ואת אימות כתובת הדוא״ל: פתחו את תיבת ה־Gmail האישית והשתמשו בהודעה שהגיעה מ־GitHub.
4. חזרו ל־GitHub, התחברו ובדקו שבתפריט תמונת הפרופיל מופיע שם המשתמש שלכם. עדיין אין צורך ליצור מאגר באתר.

אם כבר יש לכם חשבון GitHub, השתמשו בו ובדקו ב־**Settings → Emails** שכתובת ה־Gmail האישית שלכם מחוברת ומאומתת. אין צורך לפתוח חשבון נוסף.

### מתקינים את כלי הפיתוח

1. התקינו [Visual Studio Community](https://visualstudio.microsoft.com/vs/community/) בגרסה שתומכת ב־.NET 10. אם Visual Studio כבר מותקן, פתחו **Visual Studio Installer** ובדקו אם נדרש עדכון.
2. בחלון ההתקנה סמנו **ASP.NET and web development** ולחצו **Install**. בהתקנה קיימת לחצו **Modify**, סמנו את הרכיב והשלימו את השינוי.
3. ודאו שמותקן [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0). אם הוא חסר, התקינו אותו ופתחו מחדש את Visual Studio.
### מתחברים ל־Visual Studio עם אותו חשבון GitHub

1. פתחו Visual Studio. במסך ההתחברות בחרו **GitHub**. אם כבר נכנסתם לתוכנה, לחצו על **Sign in** בפינה הימנית העליונה, או פתחו **File → Account Settings** והוסיפו חשבון GitHub.
2. בחלון הדפדפן התחברו **לאותו חשבון GitHub שיצרתם עם ה־Gmail האישי** ואשרו את החיבור ל־Visual Studio.
3. חזרו ל־Visual Studio ובדקו במסך החשבונות שמופיע שם המשתמש שלכם ב־GitHub. אם מוצג חשבון אחר, בחרו את החשבון שלכם לפני ההמשך.

{: .box-success}
לפני שיוצרים פרויקט: חשבון GitHub שלכם מאומת באמצעות ה־Gmail האישי, ואותו חשבון מופיע ב־Visual Studio. זה גם החשבון שבו נשמור את המאגר הפרטי.

**פרויקט** מכיל את הקוד של האתר. **Solution / פתרון** הוא מסגרת ש־Visual Studio משתמש בה כדי לפתוח ולנהל פרויקטים. אצלנו יהיה בו פרויקט אחד. **Git** ישמור גרסאות במחשב ו־**GitHub** ישמור עותק של המאגר ברשת.

## 2. בוחרים מקום ושמות

את תיקיות הפרויקט ייצור Visual Studio עבורכם. התחילו במסך הפתיחה של התוכנה.

### פותחים את חלון יצירת הפרויקט

<div class="two-columns">
<div markdown="1" class="column">

פתחו **Visual Studio 2026**. בצד ימין של מסך הפתיחה לחצו **Create a new project**, כפי שמסומן בצילום.

אם כבר פתוח חלון עבודה, בחרו **File → New → Project** כדי להגיע לאותו חלון.

</div>
<div markdown="1" class="column">

[![מסך הפתיחה של Visual Studio 2026 עם סימון על Create a new project]({{ '/assets/img/taba/visual-studio-create-project.png' | relative_url }})]({{ '/assets/img/taba/visual-studio-create-project.png' | relative_url }})

</div>
</div>

### מחפשים ובוחרים את תבנית האתר

<div class="two-columns">
<div markdown="1" class="column">

בתיבת החיפוש בחלק העליון הקלידו `raz`. ברשימת התוצאות לחצו על **ASP.NET Core Web App (Razor Pages)**, כפי שמסומן בצילום, ואחר כך על **Next** בתחתית החלון.

ודאו שבחרתם בתבנית האתר בשפת **C#**. התוצאה **Razor Class Library** שמופיעה מתחתיה אינה התבנית שנשתמש בה. אל תבחרו Blazor, Web API או תבנית עם MVC בשם.

</div>
<div markdown="1" class="column">

[![חיפוש raz ובחירת ASP.NET Core Web App (Razor Pages) בחלון יצירת פרויקט]({{ '/assets/img/taba/visual-studio-razor-template.png' | relative_url }})]({{ '/assets/img/taba/visual-studio-razor-template.png' | relative_url }})

</div>
</div>

אפשר ללחוץ על כל צילום כדי לפתוח אותו בגודל מלא.

### נותנים שמות ובוחרים תיקייה

<div class="two-columns">
<div markdown="1" class="column">

בחלון **Configure your new project** בחרו שם באנגלית, ללא רווחים, שכולל את שמכם. למשל `GuysRazor` בצילום, או `NoasRazor`. השתמשו בשם שלכם לאורך כל העבודה.

- **Project name**: הקלידו את השם שבחרתם.
- **Location**: השאירו את מיקום ברירת המחדל שמציע Visual Studio, בדרך כלל `source\repos` בתוך תיקיית המשתמש שלכם. אין להעתיק את שם המשתמש `3stra` מהצילום.
- **Solution name**: השאירו את אותו שם כמו הפרויקט.
- **Place solution and project in the same directory**: השאירו לא מסומן.

בתחתית החלון תוכלו לראות היכן הפרויקט ייווצר. לחצו **Next**. אין צורך ליצור תיקייה בסייר הקבצים לפני כן.

</div>
<div markdown="1" class="column">

[![חלון Configure your new project עם השם GuysRazor ומיקום ברירת המחדל source repos]({{ '/assets/img/taba/visual-studio-project-name.png' | relative_url }})]({{ '/assets/img/taba/visual-studio-project-name.png' | relative_url }})

</div>
</div>

Visual Studio ייצור תיקייה חיצונית לפתרון ותיקייה פנימית לפרויקט, שתיהן בשם שבחרתם. בדוגמה שלנו שתיהן נקראות `GuysRazor`.

{: .box-note}
אם כבר יצרתם את הפרויקט, פתחו אותו דרך **Open a project or solution** ובחרו את `GuysRazor.sln` או `GuysRazor.slnx` שבתיקייה הקיימת. אין ליצור פרויקט נוסף. את `first-page` מהשיעור הקודם נשאיר כפי שהיא בינתיים.

## 3. יוצרים את פרויקט Razor Pages

<div class="two-columns">
<div markdown="1" class="column">

בחלון **Additional information** השאירו את ההגדרות כפי שהן בצילום:

- **Framework: .NET 10.0 (Long Term Support)**.
- **Authentication type: None**.
- **Configure for HTTPS** מסומן.
- **Enable container support** לא מסומן.
- **Do not use top-level statements** מסומן.
- **Enlist in Aspire orchestration** לא מסומן.

השדות האפורים אינם דורשים פעולה. לחצו **Create** בתחתית החלון והמתינו ליצירת הפרויקט.

</div>
<div markdown="1" class="column">

[![הגדרות Additional information עבור Razor Pages עם NET 10 ואפשרות Do not use top-level statements מסומנת]({{ '/assets/img/taba/visual-studio-additional-information.png' | relative_url }})]({{ '/assets/img/taba/visual-studio-additional-information.png' | relative_url }})

</div>
</div>

{: .box-warning}
אם תבנית Razor Pages או .NET 10 אינן ברשימה, חזרו לשלב ההתקנה והעדכון. אל תבחרו תבנית אחרת רק כדי לעבור את המסך; הראו למורה מה חסר.

## 4. בדיקה ראשונה: לוחצים על Play ורואים אתר

מיד לאחר **Create**, המתינו עד שחלון הפרויקט ייפתח והטעינה תסתיים. לפני שמשנים קוד או משתפים ב־GitHub, בדקו שהפרויקט שנוצר פועל:

1. לחצו על **המשולש הירוק ▶ (Play)** בסרגל העליון של Visual Studio.
2. המתינו לסיום הבנייה ולהפעלת הדפדפן. בהרצה הראשונה הדבר עשוי לקחת מעט זמן.
3. בדקו שבדפדפן מופיע דף הפתיחה של האתר עם הכותרת **Welcome**, ובשורת הכתובת מופיע `localhost` עם מספר יציאה. זה האתר שלכם, שרץ כרגע על המחשב שלכם.

{: .box-success}
**הבדיקה הצליחה:** לחצתם על Play והדף Welcome נפתח בדפדפן. הפרויקט נוצר בהצלחה ואפשר להמשיך לעבוד עליו ולשתף אותו ב־GitHub.

{: .box-warning}
אם האתר לא נפתח או שמופיעה שגיאת בנייה, עצרו כאן והציגו למורה את ההודעה. ממשיכים לשיתוף רק אחרי שהאתר פועל.

<details markdown="1"><summary>בהרצה הראשונה מופיעה בקשה לאישור תעודת HTTPS?</summary>

Visual Studio עשוי לבקש לאשר תעודת פיתוח מקומית עבור HTTPS. היעזרו במורה אם אינכם בטוחים מה לאשר. אפשר גם לעצור את ההרצה, לבחור **http** ברשימה שליד המשולש הירוק וללחוץ שוב על Play.

</details>

### עוצרים, מכירים את הקבצים ומשנים כותרת

חזרו ל־Visual Studio ולחצו על **הריבוע האדום Stop** בסרגל העליון כדי לעצור את ההרצה.

פתחו **View → Solution Explorer**. הרחיבו את הפרויקט `GuysRazor` ואת התיקייה `Pages`. בסייר הקבצים תוכלו לראות את המבנה הבא:

```text
source/repos/
└── GuysRazor/
    ├── GuysRazor.slnx (או GuysRazor.sln)
    └── GuysRazor/
        ├── GuysRazor.csproj
        ├── Program.cs
        ├── Pages/
        │   └── Index.cshtml
        └── wwwroot/
```

`Pages` מכילה דפי אתר ו־`wwwroot` מכילה עיצוב, תמונות ו־JavaScript. בהמשך, הנתיב `GuysRazor/Pages/Index.cshtml` מתחיל מתיקיית `GuysRazor`; ב־Solution Explorer פותחים את הפרויקט ואז את `Pages`.

1. ב־Solution Explorer פתחו את הפרויקט בשם שבחרתם, ואז `Pages → Index.cshtml`.
2. בשורת הכותרת החליפו רק את `Welcome` ב־`החיות שלי` ושמרו עם **Ctrl+S**.
3. לחצו שוב על **המשולש הירוק Play** ובדקו שבדפדפן מופיעה הכותרת החדשה.
4. חזרו ל־Visual Studio ועצרו באמצעות **Stop** לפני שממשיכים לשיתוף.

{: .box-success}
כעת גם השינוי שלכם מופיע באתר. נשמור את הגרסה הזאת במאגר הפרטי.

## 5. מכינים את הפרויקט לשיתוף

בחרו **File → Save All** כדי לשמור את כל הקבצים. עכשיו נעלה את הפרויקט ל־GitHub מתוך Visual Studio.

## 6. יוצרים מאגר פרטי ומעלים את הפרויקט

<div class="two-columns">
<div markdown="1" class="column">

בתחתית חלון Visual Studio לחצו **Add to Source Control**, ובתפריט שנפתח בחרו **Git**, כפי שמסומן בצילום. כך פותחים את חלון יצירת המאגר עבור הפרויקט שכבר יצרתם ובדקתם.

</div>
<div markdown="1" class="column">

[![בתחתית Visual Studio בוחרים Add to Source Control ואז Git]({{ '/assets/img/taba/visual-studio-add-source-control.png' | relative_url }})]({{ '/assets/img/taba/visual-studio-add-source-control.png' | relative_url }})

</div>
</div>

<div class="two-columns">
<div markdown="1" class="column">

בחלון **Create a Git repository**, כשהחשבון שלכם כבר מחובר, הפרטים מתמלאים אוטומטית. השאירו אותם כפי שהם.

המתינו כ־**5–10 שניות** עד שהכפתור יהיה פעיל ולחצו **Create and Push**. המאגר נוצר כפרטי כברירת מחדל; אין צורך לשנות דבר.

</div>
<div markdown="1" class="column">

[![חלון Create a Git repository עם חשבון מחובר, Visibility מוגדר Private וכפתור Create and Push מסומן]({{ '/assets/img/taba/visual-studio-create-and-push.png' | relative_url }})]({{ '/assets/img/taba/visual-studio-create-and-push.png' | relative_url }})

</div>
</div>

{: .box-success}
הלחיצה יוצרת את מאגר Git ושולחת את הקוד למאגר פרטי ב־GitHub. המתינו לסיום ההעלאה, ואז בדקו שהקוד הגיע.

<details markdown="1"><summary>הכפתור נשאר לא פעיל או שמופיעה שגיאה?</summary>

בדקו שאתם מחוברים לחשבון GitHub שלכם ושיש חיבור לאינטרנט. אם מופיעה הודעה ששם המאגר כבר קיים, או שההעלאה נכשלת, הציגו למורה את ההודעה לפני שתמשיכו.

</details>

## 7. מוודאים שהקוד הגיע ומשתפים את המורה

1. בדפדפן פתחו GitHub, עברו לרשימת המאגרים שלכם ופתחו את `GuysRazor`.
2. פתחו את `GuysRazor/Pages/Index.cshtml` ובדקו שהכותרת שלכם מופיעה. בדקו גם שמופיעים `.gitignore`, קובץ הפתרון וה־Commit הראשון.
3. פתחו **Settings → Collaborators → Add people**, שתפו את `3strategy@gmail.com` באמצעות שליחת הזמנה.
4. שלחו את כתובת המאגר במקום שהמורה ביקש. אחרי קבלת ההזמנה תהיה למורה גישה; המאגר נשאר פרטי.

העלאת הקוד ל־GitHub אינה מפעילה את האתר באינטרנט. כדי לראות את האתר, ממשיכים להריץ אותו מתוך Visual Studio במחשב שלכם.

<div markdown="1" class="box-success">

סיימתם כשיש לכם תיקיית `GuysRazor` עם פתרון ופרויקט `GuysRazor`, אתר שרץ עם הכותרת שלכם, מאגר GitHub שמסומן **Private** ומכיל את אותו קוד, והזמנה למורה שמופיעה במסך Collaborators כממתינה או מאושרת.

</div>

<details markdown="1"><summary>מקורות לעזרה</summary>

- [התחברות ל־Visual Studio עם GitHub](https://learn.microsoft.com/en-us/visualstudio/ide/signing-in-to-visual-studio?view=visualstudio)
- [יצירת Razor Pages — Microsoft](https://learn.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/razor-pages-start?view=aspnetcore-10.0)
- [יצירת מאגר ופרסום מתוך Visual Studio](https://learn.microsoft.com/en-us/visualstudio/version-control/git-create-repository?view=visualstudio)
- [הזמנת שותפים למאגר — GitHub](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository)

</details>

## איך משתמשים בשמות שלכם בשיעורים הבאים?

בדוגמאות בקורס הפרויקט נקרא `RazorTaba`. אצלכם השתמשו בשם שבחרתם: למשל, `RazorTaba/Pages/Index.cshtml` הוא `GuysRazor/Pages/Index.cshtml` בתוך תיקיית הפתרון. אין לשנות את שם הפרויקט כדי להתאים לדוגמה. ב־Solution Explorer פתחו את הפרויקט שלכם ואז את `Pages`.

הבחירה **Do not use top-level statements** יוצרת את `Program.cs` עם מחלקה `Program` ופעולה `Main`. אם בשיעור המשותף מחליפים את כל תוכן `Program.cs` בקוד קצר ללא המחלקה, זו החלפה מלאה של הקובץ; אין להדביק אותו בנוסף למחלקה שנוצרה.

## המשך

[חוזרים לשיעור המשותף: משנים את האתר ושומרים שינוי נוסף]({{ '/taba/01a-development-git/#after-setup' | relative_url }})
