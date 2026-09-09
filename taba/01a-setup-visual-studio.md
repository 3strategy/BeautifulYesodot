---
layout: page
title: 'מתחילים ב־Visual Studio: פרויקט Razor ראשון'
subtitle: יוצרים פתרון ופרויקט, מריצים אתר ומשנים כותרת
lang: he
tags: [CSharp, Web, Taba]
track: setup
published: true
---

{: .box-note}
ניצור ב־Visual Studio אתר Razor Pages חדש, נפתח אותו בדפדפן ונשנה כותרת. נתקין את כלי הפיתוח וניצור פרויקט דרך חלונות התוכנה; אין צורך בפרויקט קיים.

[חזרה: סביבת הפיתוח: מריצים ומשנים אתר]({{ '/taba/01a-development-git/' | relative_url }})

זה המסלול ל־**Visual Studio ב־Windows**. ב־macOS, או אם בחרתם VS Code, עברו ל[מסלול VS Code]({{ '/taba/01a-setup-vscode/' | relative_url }}). מבצעים מסלול אחד בלבד.

## 1. מתקינים את כלי הפיתוח

1. התקינו [Visual Studio Community](https://visualstudio.microsoft.com/vs/community/) בגרסה שתומכת ב־.NET 10. אם Visual Studio כבר מותקן, פתחו **Visual Studio Installer** ובדקו אם נדרש עדכון.
2. בחלון ההתקנה סמנו **ASP.NET and web development** ולחצו **Install**. בהתקנה קיימת לחצו **Modify**, סמנו את הרכיב והשלימו את השינוי.
3. ודאו שמותקן [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0). אם הוא חסר, התקינו אותו ופתחו מחדש את Visual Studio.

**פרויקט** מכיל את הקוד של האתר. **Solution / פתרון** הוא מסגרת ש־Visual Studio משתמש בה כדי לפתוח ולנהל פרויקטים. אצלנו יהיה בו פרויקט אחד.

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

מיד לאחר **Create**, המתינו עד שחלון הפרויקט ייפתח והטעינה תסתיים. לפני שמשנים קוד, בדקו שהפרויקט שנוצר פועל:

1. לחצו על **המשולש הירוק ▶ (Play)** בסרגל העליון של Visual Studio.
2. המתינו לסיום הבנייה ולהפעלת הדפדפן. בהרצה הראשונה הדבר עשוי לקחת מעט זמן.
3. בדקו שבדפדפן מופיע דף הפתיחה של האתר עם הכותרת **Welcome**, ובשורת הכתובת מופיע `localhost` עם מספר יציאה. זה האתר שלכם, שרץ כרגע על המחשב שלכם.

{: .box-success}
**הבדיקה הצליחה:** לחצתם על Play והדף Welcome נפתח בדפדפן. הפרויקט נוצר בהצלחה ואפשר להמשיך לעבוד עליו ולנסות שינויים.

{: .box-warning}
אם האתר לא נפתח או שמופיעה שגיאת בנייה, עצרו כאן והציגו למורה את ההודעה. ממשיכים לעריכה רק אחרי שהאתר פועל.

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
4. חזרו ל־Visual Studio ועצרו באמצעות **Stop** לפני שממשיכים לעריכה.

{: .box-success}
כעת גם השינוי שלכם מופיע באתר. שמרו את הקבצים והמשיכו לשיעור המשותף.

## איך משתמשים בשמות שלכם בשיעורים הבאים?

בדוגמאות בקורס הפרויקט נקרא `RazorTaba`. אצלכם השתמשו בשם שבחרתם: למשל, `RazorTaba/Pages/Index.cshtml` הוא `GuysRazor/Pages/Index.cshtml` בתוך תיקיית הפתרון. אין לשנות את שם הפרויקט כדי להתאים לדוגמה. ב־Solution Explorer פתחו את הפרויקט שלכם ואז את `Pages`.

הבחירה **Do not use top-level statements** יוצרת את `Program.cs` עם מחלקה `Program` ופעולה `Main`. אם בשיעור המשותף מחליפים את כל תוכן `Program.cs` בקוד קצר ללא המחלקה, זו החלפה מלאה של הקובץ; אין להדביק אותו בנוסף למחלקה שנוצרה.

## המשך

[חוזרים לשיעור המשותף: משנים את האתר ובודקים בדפדפן]({{ '/taba/01a-development-git/#after-setup' | relative_url }})
