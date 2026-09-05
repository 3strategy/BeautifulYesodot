---
layout: page
title: כניסה עם Google — הרחבת רשות
subtitle: חיבור ספק כניסה חיצוני לאחר חשבונות מקומיים; הגדרות Console אינן תנאי להשלמת הפרויקט
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 180
track: extension
published: true
companion_commit: a815e72d42242e1186a32a93523b1f6d7b84cc63
companion_previous: 921c2b1ff5cee2ef9e8ecf800788b694aa216d4e
---

{: .box-note}
נוסיף לאתר אפשרות להיכנס עם חשבון Google. נגדיר את החיבור, נוסיף כפתור כניסה ונבדוק את החזרה מ־Google לאתר שלנו.

<!-- lesson-back:start -->
[חזרה: מי רשאי לערוך? בעלות והרשאות]({{ '/taba/17-authorization/' | relative_url }})
<!-- lesson-back:end -->

[קוד השלב](https://github.com/3strategy/razortaba/tree/a815e72d42242e1186a32a93523b1f6d7b84cc63) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/921c2b1ff5cee2ef9e8ecf800788b694aa216d4e...a815e72d42242e1186a32a93523b1f6d7b84cc63)

אם קישור הקוד אינו נפתח, בקשו גישה למאגר.

## מה נלמד

- להבחין בין קוד לבין סוד מקומי.
- להתאים כתובת callback לשרת המקומי.
- להוסיף ספק כניסה בלי לשבור את המסלול הקיים.

## מתחילים מסונכרנים

פתחו את תיקיית הפרויקט הנכונה, בדקו שאין שינוי לא שמור והפעילו **Pull**. אם Git מציג התנגשות, פנו למורה; אל תמחקו עבודה ואל תבצעו Force Push.

## 1. מכינים ספק חיצוני

עקבו אחר [הוראות Microsoft להגדרת Google](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/social/google-logins?view=aspnetcore-10.0). צרו פרויקט ב־Google Cloud, הגדירו מסך הסכמה ולקוח OAuth מסוג Web application. במצב בדיקה הוסיפו את חשבונות התרגול כמשתמשי בדיקה בהתאם להגדרות החשבון.

כתובת ההפניה המקומית לפרויקט הזה היא בדיוק `https://localhost:7186/signin-google`. הפעילו את פרופיל https; הפורט והפרוטוקול חייבים להתאים להגדרה אצל Google. את Client ID ואת Client secret שומרים ב־User Secrets המקומי, לעולם לא ב־Git או בצילום מסך להגשה.

## 2. מחברים את הכפתור

AddDefaultIdentity כבר מספקת דפי תשתית באזור Identity. הכפתור שולח POST ל־ExternalLogin המוכן; לא כותבים בעצמנו טיפול בטוקנים. במסלול כניסה ראשון ייתכן מסך אישור מובנה באנגלית. בלי שני ערכי ההגדרה הכפתור מוסתר והכניסה המקומית פועלת כרגיל.

## 3. בודקים כניסה וחזרה לאתר

הפעילו את האתר, לחצו על כפתור Google והשלימו את הכניסה עם חשבון הבדיקה שהגדרתם. לאחר החזרה לאתר בדקו שהחשבון מופיע בתפריט. צאו מהחשבון ונסו להיכנס שוב.

### פקודות השלב

הפקודות מורצות משורש המאגר, שבו נמצאת התיקייה `RazorTaba`, בטרמינל של Visual Studio או VS Code.

```shell
dotnet add RazorTaba package Microsoft.AspNetCore.Authentication.Google --version 10.0.10
dotnet user-secrets set "Authentication:Google:ClientId" "YOUR-CLIENT-ID" --project RazorTaba
dotnet user-secrets set "Authentication:Google:ClientSecret" "YOUR-CLIENT-SECRET" --project RazorTaba
dotnet dev-certs https --trust
dotnet run --project RazorTaba --launch-profile https
```

## השינויים בקוד

### `RazorTaba/Program.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Program.cs
+++ b/RazorTaba/Program.cs
@@ -25,8 +25,20 @@ builder.Services.ConfigureApplicationCookie(options =>
     options.LoginPath = "/Account/Login";
     options.AccessDeniedPath = "/Account/Denied";
 });

+// Google הוא תוספת בלבד: בלי הגדרות מקומיות, הכניסה הרגילה ממשיכה לעבוד.
+string? googleId = builder.Configuration["Authentication:Google:ClientId"];
+string? googleSecret = builder.Configuration["Authentication:Google:ClientSecret"];
+if (!string.IsNullOrWhiteSpace(googleId) && !string.IsNullOrWhiteSpace(googleSecret))
+{
+    builder.Services.AddAuthentication().AddGoogle(options =>
+    {
+        options.ClientId = googleId;
+        options.ClientSecret = googleSecret;
+    });
+}
+
 var app = builder.Build();
 if (!app.Environment.IsDevelopment())
 {
     app.UseExceptionHandler("/Error");
````

### `RazorTaba/RazorTaba.csproj`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/RazorTaba.csproj
+++ b/RazorTaba/RazorTaba.csproj
@@ -3,18 +3,20 @@
   <PropertyGroup>
     <TargetFramework>net10.0</TargetFramework>
     <Nullable>enable</Nullable>
     <ImplicitUsings>enable</ImplicitUsings>
+    <UserSecretsId>razortaba-local-development</UserSecretsId>
   </PropertyGroup>

   <ItemGroup>
     <PackageReference Include="HtmlSanitizer" Version="9.2.1039" />
     <PackageReference Include="Markdig" Version="1.3.2" />
+    <PackageReference Include="Microsoft.AspNetCore.Authentication.Google" Version="10.0.10" />
     <PackageReference Include="Microsoft.AspNetCore.Identity.EntityFrameworkCore" Version="10.0.10" />
     <PackageReference Include="Microsoft.AspNetCore.Identity.UI" Version="10.0.10" />
-    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="10.0.10">
-      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
-      <PrivateAssets>all</PrivateAssets>
+    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="10.0.10">
+      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
+      <PrivateAssets>all</PrivateAssets>
     </PackageReference>
     <PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="10.0.10" />
     <PackageReference Include="SQLitePCLRaw.bundle_e_sqlite3" Version="3.0.5" />
   </ItemGroup>
````

### `RazorTaba/Pages/Account/Login.cshtml.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Account/Login.cshtml.cs
+++ b/RazorTaba/Pages/Account/Login.cshtml.cs
@@ -6,10 +6,14 @@ using Microsoft.AspNetCore.Mvc.RazorPages;

 namespace RazorTaba.Pages.Account;

 /// <summary>מאמת סיסמה באמצעות Identity ומאפשר רק חזרה לכתובת מקומית.</summary>
-public class LoginModel(SignInManager<AppUser> signIn) : PageModel
+public class LoginModel(SignInManager<AppUser> signIn, IConfiguration configuration) : PageModel
 {
+    public bool GoogleEnabled =>
+        !string.IsNullOrWhiteSpace(configuration["Authentication:Google:ClientId"]) &&
+        !string.IsNullOrWhiteSpace(configuration["Authentication:Google:ClientSecret"]);
+
     [BindProperty, Required, EmailAddress]
     public string Email { get; set; } = "";
     [BindProperty, Required, DataType(DataType.Password)]
     public string Password { get; set; } = "";
````

### `RazorTaba/Pages/Account/Login.cshtml`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Account/Login.cshtml
+++ b/RazorTaba/Pages/Account/Login.cshtml
@@ -9,4 +9,11 @@
     <label asp-for="Password">סיסמה</label><input asp-for="Password" class="form-control mb-3" autocomplete="current-password" dir="ltr" />
     <button class="btn btn-primary">כניסה</button>
 </form>
 <a asp-page="Register">עדיין אין לכם חשבון?</a>
+
+@if (Model.GoogleEnabled)
+{
+    <form asp-area="Identity" asp-page="/Account/ExternalLogin" asp-route-returnUrl="/" method="post" class="mt-4">
+        <button class="btn btn-outline-primary" name="provider" value="Google">כניסה עם Google</button>
+    </form>
+}
````

### `RazorTaba/Areas/Identity/Pages/_ViewStart.cshtml`

קובץ חדש. צרו את `RazorTaba/Areas/Identity/Pages/_ViewStart.cshtml` והדביקו את התוכן הבא:

````cshtml
@{
    Layout = "/Pages/Shared/_Layout.cshtml";
}
````

## מריצים ובודקים

1. ללא סודות: הכפתור אינו מוצג וכניסה מקומית עובדת.
2. לאחר הגדרה מקומית והפעלה מחדש: הכפתור מוצג.
3. בדקו שכתובת ההפניה ל־Google כוללת את callback המדויק.
4. עם חשבון בדיקה אמיתי: השלימו כניסה, יציאה וכניסה חוזרת.
5. ודאו ש־Git אינו כולל סודות.

## משימה אישית ובדיקת הבנה

תעדו אילו הגדרות נדרשות בכל מחשב, בלי לצלם או להדביק את הסוד. בדקו גם שהכניסה המקומית עדיין פועלת.

{: .box-success}
בסיום שינוי משמעותי: בדקו את ה־diff, בצעו Stage, כתבו הודעת commit שמתארת מה שיניתם, ובצעו Push. ודאו ב־GitHub שהשינוי הגיע. נדרשים לפחות 50 commits משמעותיים לאורך השנה, גם למי שעובד תמיד באותו מחשב נייד.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.

<!-- teacher-notes:start
אימות הפיתוח כלל OAuth challenge עם ערכי דמה. כניסת Google מלאה לא נבדקה; נדרשת בדיקה עם חשבון ואישורים אמיתיים.
teacher-notes:end -->

<!-- lesson-next:start -->
---

## סיום הרצף

- [סיימנו את הרצף — חזרה למפת הדרך]({{ '/taba/00-student-roadmap/' | relative_url }})
<!-- lesson-next:end -->
