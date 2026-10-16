## 1. מכינים את הכלים

התקינו [JetBrains Rider](https://www.jetbrains.com/rider/download/) ואת [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0) למערכת ההפעלה שלכם. ב־Mac בחרו Arm64 למחשב Apple Silicon או x64 למחשב Intel. אם Rider היה פתוח בזמן ההתקנה, פתחו אותו מחדש.

## 2. יוצרים פתרון ופרויקט דרך הממשק

<div class="two-columns">
<div markdown="1" class="column">

במסך הפתיחה של Rider לחצו **New Solution**, כפי שמוצג בצילום. אם כבר פתוח פתרון, בחרו **File → New Solution**.

</div>
<div markdown="1" class="column">

[![מסך הפתיחה של Rider עם כפתור New Solution]({{ '/assets/img/taba/rider-welcome.png' | relative_url }})]({{ '/assets/img/taba/rider-welcome.png' | relative_url }})

</div>
</div>

### בוחרים Web ואז Razor Pages

<div class="two-columns">
<div markdown="1" class="column">

בחרו **Web** בצד שמאל. ברשימת **Template** בחרו במפורש **Web App (Razor Pages)** — הכניסה לקטגוריה Web עשויה לבחור תחילה Blazor, ולכן חשוב לבדוק את השורה המסומנת.

תנו שם חופשי לניסוי, למשל `RazorPractice`, ובחרו תיקיית אב משלכם. בצילום השתמשנו בתיקיית דוגמה ב־Windows; ב־Mac אפשר לבחור `WebProjects` בתיקיית הבית. אל תעתיקו את נתיב הדוגמה אם הוא אינו התיקייה שלכם.

</div>
<div markdown="1" class="column">

[![חלון New Solution ב־Rider עם שם RazorPractice ותבנית Web App Razor Pages מסומנת]({{ '/assets/img/taba/rider-new-solution.png' | relative_url }})]({{ '/assets/img/taba/rider-new-solution.png' | relative_url }})

</div>
</div>

### בודקים את הגדרות היצירה

1. ב־**Solution name** הקלידו שם חופשי באנגלית ללא רווחים, למשל `RazorPractice`. השאירו את **Project name** זהה.
2. ב־**Solution directory** בחרו תיקיית אב משלכם, למשל `WebProjects` בתיקיית הבית. בדקו את הנתיב המלא לפני אישור היצירה. אין לבחור תיקייה של פרויקט אחר.
3. השאירו **Put solution and project in the same directory** לא מסומן. כך יש תיקיית פתרון חיצונית ותיקיית פרויקט פנימית.
4. בחרו **C#** ומסגרת **net10.0**. גללו את החלון כלפי מטה באמצעות פס הגלילה החיצוני הימני, מעבר לרשימת התבניות, כדי לראות את האפשרויות הנוספות.
5. השאירו **Do not use top-level statements** לא מסומן. בשדה **Auth** בחרו **No authentication**. השאירו **Add Dockerfile** לא מסומן. אין צורך לשנות אפשרויות ב־Advanced Settings.
6. הסירו את הסימון **Create Git repository**. בשלב הזה מתנסים ביצירה ובהרצה; שיתוף ב־GitHub יגיע אחרי Bootstrap.
7. לחצו **Create** והמתינו לסיום יצירת הקבצים ושחזור החבילות.

[![אפשרויות Razor Pages ב־Rider עם net10.0, אימות No authentication ואפשרות Do not use top-level statements לא מסומנת]({{ '/assets/img/taba/rider-template-options.png' | relative_url }})]({{ '/assets/img/taba/rider-template-options.png' | relative_url }})

אפשר ללחוץ על כל צילום כדי לראות אותו בגודל מלא.

אם .NET 10 או התבנית המתאימה אינם מופיעים, בדקו את התקנת ה־SDK ופנו למורה. אל תבחרו תבנית אחרת כדי להמשיך.

## 3. מריצים ובודקים

1. בחלון **Solution** משמאל (חלון עץ הקבצים) הרחיבו את הפרויקט ואת `Pages`. ודאו שקיימים `Index.cshtml`, קובץ `.csproj` והתיקייה `wwwroot`.
2. ברשימת תצורות ההרצה בסרגל העליון בחרו **RazorPractice: http**, או את שם הפרויקט שלכם ואחריו `http`. אם כבר נבחר הפרופיל הזה, השאירו אותו. לחצו על **Run ▶**.
3. המתינו לסיום הבנייה. פתחו את כתובת `http://localhost:…` שמופיעה בחלון Run אם הדפדפן אינו נפתח אוטומטית. השתמשו במספר היציאה שהפרויקט שלכם מציג.
4. בדקו שמופיע **Welcome** עם תפריט Home ו־Privacy. עצרו באמצעות **Stop ■**.
5. פתחו `Pages/Index.cshtml`, החליפו את `Welcome` ב־`החיות שלי`, שמרו והפעילו שוב. בדקו שהכותרת השתנתה.

<div class="two-columns">
<div markdown="1" class="column">

בצילום Rider רואים את הפרויקט ואת `Pages` משמאל, את פרופיל `http` בסרגל העליון ואת חלון **Run** בתחתית. השורה **Now listening on** מציגה את כתובת האתר שלכם. מספר היציאה עשוי להיות שונה מהצילום. האזהרה הצהובה שבצילום מציינת שלא נבחרה יציאת HTTPS בהרצת פרופיל `http`; אם שורת Now listening on מופיעה ודף Welcome נפתח, הרצת HTTP הצליחה.

[![פרויקט RazorPractice ב־Rider לאחר הרצה עם http וחלון Run שמציג Now listening on]({{ '/assets/img/taba/rider-first-run.png' | relative_url }})]({{ '/assets/img/taba/rider-first-run.png' | relative_url }})

</div>
<div markdown="1" class="column">

בדפדפן צריך להופיע דף התבנית עם **Welcome**, תפריט **Home / Privacy** ושם הפרויקט שלכם.

[![דף Welcome של פרויקט RazorPractice שנוצר והורץ מתוך Rider]({{ '/assets/img/taba/rider-browser-welcome.png' | relative_url }})]({{ '/assets/img/taba/rider-browser-welcome.png' | relative_url }})

</div>
</div>

{: .box-success}
יש לכם אתר Razor Pages שנוצר מתבנית ופועל מתוך Rider. Bootstrap כבר נמצא ב־`wwwroot/lib/bootstrap`, והעיצוב האישי נמצא ב־`wwwroot/css/site.css`.

## 4. ממשיכים או מנסים שוב

לעבודה קיימת בחרו **Open** ופתחו את קובץ הפתרון `.sln` או `.slnx`. לתרגול יצירה מחדש עצרו את ההרצה, חזרו ל־**New Solution** ובחרו שם חדש, למשל `RazorPractice2`, ותיקייה חדשה לצד הראשונה. שמרו את הניסוי הקודם; אין צורך למחוק אותו.

השאירו את `Program.cs`, את הגדרות ההרצה ואת קובצי התבנית במקומם. אין צורך לפרסם דבר לרשת.

[עזרה: יצירת אתר ב־Rider](https://www.jetbrains.com/help/rider/Get_started_with_asp_net.html)

<!-- Verified through Rider 2026.2.2 GUI on Windows, 2026-10-16: created C:/Temp/TabaRiderGui/RazorPractice with Web App (Razor Pages), net10.0, No authentication, no Git, and top-level statements. Run profile http built successfully and opened Welcome at localhost:5282. Captures are real application screenshots. macOS GUI remains unverified. -->
