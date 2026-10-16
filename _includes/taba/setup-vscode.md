## 1. מכינים את הכלים

1. התקינו [VS Code](https://code.visualstudio.com/Download) ואת [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0). ב־Mac בחרו Arm64 למחשב עם Apple Silicon או x64 למחשב Intel. צריך SDK, ולא Runtime בלבד.
2. ב־VS Code פתחו **Extensions**, חפשו **C# Dev Kit** של Microsoft ולחצו **Install**. התוסף עוזר לערוך C#; את הפרויקט ניצור בטרמינל.
3. פתחו **Terminal → New Terminal**. ב־Mac אפשר גם לפתוח את Terminal דרך Spotlight. הקלידו ולחצו Enter:

```shell
dotnet --list-sdks
```

בדקו שמופיעה גרסה שמתחילה ב־`10.0`. אם הפקודה אינה מזוהה, סגרו ופתחו את VS Code לאחר התקנת ה־SDK. אם עדיין אינה פועלת, פנו למורה.

## 2. בוחרים תיקיית אב ושם לניסוי

הפקודות הבאות מיועדות ל־Terminal ב־macOS. העתיקו כל שורה בנפרד ולחצו Enter:

```shell
mkdir -p ~/WebProjects
cd ~/WebProjects
pwd
```

`mkdir -p` מכינה תיקיית אב אם היא חסרה. `cd` מעבירה את הטרמינל אליה, ו־`pwd` מציגה היכן אתם נמצאים. בדקו שהנתיב מסתיים ב־`WebProjects`, ולא בתיקייה של פרויקט אחר.

בחרו שם חופשי באנגלית ללא רווחים, למשל `RazorPractice`. בכל הפקודות הבאות החליפו אותו באותו שם שבחרתם. אם כבר קיימת תיקייה בשם הזה, בחרו שם חדש כמו `RazorPractice2`; אין לדרוס אותה.

## 3. יוצרים פרויקט מתבנית Razor Pages

```shell
dotnet new webapp --name RazorPractice --output RazorPractice --framework net10.0 --auth None
cd RazorPractice
```

`webapp` היא תבנית **Razor Pages**. `--name` קובע את שם הפרויקט; `--output` יוצר תיקייה חדשה בשם הזה. `net10.0` בוחר את גרסת הקורס, ו־`None` יוצר אתר ללא חשבונות משתמשים. המתינו להודעת הצלחה ולסיום שחזור החבילות. אין להוסיף `--force` אם מופיעה הודעה שהתיקייה כבר מכילה קבצים.

ב־VS Code בחרו **File → Open Folder**, עברו ל־`WebProjects` שבתיקיית הבית ופתחו את `RazorPractice`. אם VS Code שואל אם אתם סומכים על הקבצים שיצרתם, אפשר לאשר. ב־Explorer בדקו שמופיעים `RazorPractice.csproj`, התיקייה `Pages` והתיקייה `wwwroot`.

אם פתחתם חלון חדש, פתחו בו שוב **Terminal → New Terminal**. בדקו שהטרמינל נמצא בתיקייה שמכילה את קובץ ה־`.csproj`.

## 4. מריצים אתר לפני שמשנים אותו

```shell
dotnet watch --launch-profile http
```

המתינו לשורה **Now listening on: http://localhost:…**. פתחו בדפדפן את הכתובת המדויקת שמופיעה אצלכם; מספר היציאה נבחר בתבנית ויכול להיות שונה בין פרויקטים. אם הדפדפן לא נפתח מעצמו, העתיקו את הכתובת לשורת הכתובת שלו. השאירו את הטרמינל פועל בזמן הגלישה.

{: .box-success}
הדף מציג **Welcome** ויש בו תפריט Home ו־Privacy. זו תבנית Razor Pages עובדת, שכבר כוללת Bootstrap וקובץ עיצוב אישי בשם `wwwroot/css/site.css`.

## 5. משנים, עוצרים ופותחים שוב

1. פתחו `Pages/Index.cshtml` ושנו את המילה `Welcome` ל־`החיות שלי`. שמרו עם **Cmd+S** ורעננו את הדפדפן אם השינוי לא מופיע מעצמו.
2. חזרו לטרמינל ולחצו **Ctrl+C** כדי לעצור את השרת. סגירת לשונית הדפדפן לבדה אינה עוצרת אותו.
3. בפעם הבאה פתחו את אותה תיקייה והפעילו שוב `dotnet watch --launch-profile http`.
4. לתרגול יצירה נוספת עצרו את השרת, חזרו לתיקיית האב עם `cd ~/WebProjects` וחזרו על שלב 3 בשם חדש. אל תיצרו פרויקט בתוך פרויקט קיים.

השאירו את `Program.cs`, את הגדרות ההרצה ואת קובצי Bootstrap כפי שנוצרו. בשלב הזה אין צורך ב־Git או ב־GitHub.

[עזרה: תבניות dotnet new](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-new-sdk-templates)

<!-- צילומים להשלמה: macOS Terminal עם בדיקת SDK, יצירת הפרויקט, Explorer לאחר Open Folder, ושורת Now listening לצד Welcome. צילומי VS Code GUI הקיימים נשמרים בנכסים אך אינם מסלול היצירה הנלמד כאן. -->
