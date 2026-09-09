---
layout: page
title: 'מתחילים ב־VS Code: פרויקט Razor ראשון'
subtitle: מתקינים C# Dev Kit, יוצרים פרויקט מהממשק ומריצים אתר ראשון
lang: he
tags: [CSharp, Web, Taba]
track: setup
published: true
---

{: .box-note}
נתקין את התוסף C# Dev Kit, ניצור אתר Razor Pages דרך הממשק של VS Code ונפתח אותו בדפדפן. נשנה כותרת ונראה את השינוי בדפדפן. מתחילים כאן גם אם עדיין אין לכם תיקייה.

[חזרה: סביבת הפיתוח: מריצים ומשנים אתר]({{ '/taba/01a-development-git/' | relative_url }})

זה המסלול ל־**VS Code** ב־Windows או ב־macOS. אם בחרתם Visual Studio ב־Windows, עברו ל[מסלול Visual Studio]({{ '/taba/01a-setup-visual-studio/' | relative_url }}). מבצעים מסלול אחד בלבד.

## 1. מכינים את הכלים

1. התקינו [VS Code](https://code.visualstudio.com/Download).
2. התקינו [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0) עבור מערכת ההפעלה שלכם. בחרו **SDK**, שמאפשר ליצור ולהריץ פרויקטים.

**תיקייה** היא המקום שבו הקבצים נשמרים במחשב. **פרויקט Razor Pages** הוא אוסף קבצים שממנו .NET מריץ אתר.

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

אם מופיעה שגיאה במקום האתר, הציגו למורה את ההודעה לפני שממשיכים לעריכה.

עצרו דרך **Run → Stop Debugging**. בחלון Explorer פתחו את `Pages/Index.cshtml` שבתוך הפרויקט ושנו את המילה `Welcome` בכותרת ל־`החיות שלי`. שמרו והפעילו שוב כדי לראות את השינוי. לאחר הבדיקה עצרו את ההרצה.

בהמשך נעבוד מתוך התיקייה שמכילה את קובץ הפרויקט, למשל `GuysRazor.csproj`, ואת `Pages` ו־`wwwroot`. בדוגמאות הקורס הפרויקט נקרא `RazorTaba`; אצלכם השתמשו בשם שבחרתם. `Pages` מכילה את דפי האתר ו־`wwwroot` את העיצוב, התמונות וקובצי JavaScript.

{: .box-success}
סיימתם כשאתם יודעים לפתוח את תיקיית הפרויקט, לזהות את קובץ ה־`.csproj` ולהריץ אתר עם הכותרת ששיניתם.

## המשך

[חוזרים לשיעור המשותף: משנים את האתר ובודקים בדפדפן]({{ '/taba/01a-development-git/#after-setup' | relative_url }})
