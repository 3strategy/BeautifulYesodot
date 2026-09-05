---
layout: page
title: הרשמה וכניסה עם Microsoft Identity
subtitle: חשבונות מקומיים לאחר CRUD; ללא תלות בחשבון Google או בהגדרות OAuth
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 150
track: extension
published: false
companion_commit: 3ca22602bb94d32cd8cacf20820425e5ecfbfd79
companion_previous: 4a453d577b30a8120ccbf26b72e2d831168ba7bd
---

{: .box-note}
מוסיפים חשבונות מקומיים אחרי שהאתר והנתונים עובדים. אין Console של Google, שליחת דוא״ל או שינוי במסד החיות.

[קוד השלב](https://github.com/3strategy/razortaba/tree/3ca22602bb94d32cd8cacf20820425e5ecfbfd79) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/4a453d577b30a8120ccbf26b72e2d831168ba7bd...3ca22602bb94d32cd8cacf20820425e5ecfbfd79)

קישורי GitHub מפנים למאגר פרטי. המורה צריך להעניק הרשאת קריאה; אפשר ללמוד גם מהקוד המופיע כאן.

## מה נלמד

- להבדיל בין אימות זהות להרשאה.
- להשתמש ב־UserManager וב־SignInManager.
- להכיר מסד חשבונות נפרד ותהליך כניסה מקומי.

## מתחילים מסונכרנים

פתחו את תיקיית הפרויקט הנכונה, בדקו שאין שינוי לא שמור והפעילו **Pull**. אם Git מציג התנגשות, פנו למורה; אל תמחקו עבודה ואל תבצעו Force Push.

## 1. שני תחומי נתונים

AppDbContext ממשיך לנהל חיות ומטפלים ב־App.db. AuthDbContext מנהל חשבונות ב־Accounts.db. כך אין צורך להחליף את בסיס מסד הליבה או למחוק מיגרציות. מעכשיו מציינים `--context` בכל פקודת EF.

## 2. משתמשים בתשתית Identity

UserManager יוצר משתמש ושומר גיבוב סיסמה. SignInManager בודק סיסמה ומנהל עוגיית כניסה. לא כותבים אלגוריתם הצפנת סיסמאות ולא שומרים סיסמה בעצמנו. לתרגול המקומי אין דרישת אישור דוא״ל. זה אינו שיעור בהפעלת אתר ציבורי.

## 3. בודקים מצבים שונים

טופסי הכניסה וההרשמה בעברית כדי שאפשר יהיה לעקוב אחר הזרימה. אחרי כניסה התפריט משתנה. עדיין לא הוספנו הגבלת עריכה: אימות והרשאות הם שני שיעורים שונים. יציאה מתבצעת ב־POST. כתובת ReturnUrl נבדקת כדי לא להפנות לאתר חיצוני.

### פקודות השלב

הפקודות מורצות משורש המאגר, שבו נמצאת התיקייה `RazorTaba`, בטרמינל של Visual Studio או VS Code.

```shell
dotnet add RazorTaba package Microsoft.AspNetCore.Identity.EntityFrameworkCore --version 10.0.10
dotnet add RazorTaba package Microsoft.AspNetCore.Identity.UI --version 10.0.10
dotnet ef migrations add InitialIdentity --context AuthDbContext --output-dir Migrations/Auth --project RazorTaba
dotnet ef database update --context AuthDbContext --project RazorTaba
```

## השינויים בקוד

### `RazorTaba/Data/AuthDbContext.cs`

קובץ חדש. צרו את `RazorTaba/Data/AuthDbContext.cs` והדביקו את התוכן הבא:

````csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace RazorTaba.Data;

/// <summary>מסד החשבונות נפרד ממסד החיות, כדי להוסיף כניסה בלי לשכתב את הליבה.</summary>
public class AuthDbContext(DbContextOptions<AuthDbContext> options) : IdentityDbContext<IdentityUser>(options)
{
}
````

### `RazorTaba/Program.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Program.cs
+++ b/RazorTaba/Program.cs
@@ -1,5 +1,6 @@
 using Microsoft.EntityFrameworkCore;
+using Microsoft.AspNetCore.Identity;
 using RazorTaba.Data;

 var builder = WebApplication.CreateBuilder(args);
 builder.Services.AddRazorPages();
@@ -8,14 +9,31 @@ builder.Services.AddSingleton<RazorTaba.Services.MarkdownRenderer>();
 // נתיב יחסי מחושב תמיד מתיקיית הפרויקט, גם כשמריצים פקודה משורש המאגר.
 string databasePath = Path.Combine(builder.Environment.ContentRootPath, "App.db");
 builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite($"Data Source={databasePath}"));

+string accountsPath = Path.Combine(builder.Environment.ContentRootPath, "Accounts.db");
+builder.Services.AddDbContext<AuthDbContext>(options => options.UseSqlite($"Data Source={accountsPath}"));
+builder.Services.AddDefaultIdentity<IdentityUser>(options =>
+{
+    // תרגול מקומי: אין דרישה לשליחת דוא"ל או לספק חיצוני.
+    options.SignIn.RequireConfirmedAccount = false;
+    options.User.RequireUniqueEmail = true;
+    options.Password.RequiredLength = 8;
+}).AddEntityFrameworkStores<AuthDbContext>();
+builder.Services.ConfigureApplicationCookie(options =>
+{
+    options.LoginPath = "/Account/Login";
+    options.AccessDeniedPath = "/Account/Denied";
+});
+
 var app = builder.Build();
 if (!app.Environment.IsDevelopment())
 {
     app.UseExceptionHandler("/Error");
     app.UseHsts();
 }
 app.UseStaticFiles();
 app.UseRouting();
+app.UseAuthentication();
+app.UseAuthorization();
 app.MapRazorPages();
 app.Run();
````

### `RazorTaba/Pages/Account/Register.cshtml.cs`

קובץ חדש. צרו את `RazorTaba/Pages/Account/Register.cshtml.cs` והדביקו את התוכן הבא:

````csharp
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RazorTaba.Pages.Account;

/// <summary>יוצר חשבון דרך Identity; לא שומר סיסמה בטבלת חיות או בקוד.</summary>
public class RegisterModel(UserManager<IdentityUser> users, SignInManager<IdentityUser> signIn) : PageModel
{
    [BindProperty, Required, EmailAddress]
    public string Email { get; set; } = "";
    [BindProperty, Required, DataType(DataType.Password)]
    public string Password { get; set; } = "";
    [BindProperty, Compare(nameof(Password), ErrorMessage = "הסיסמאות אינן זהות"), DataType(DataType.Password)]
    public string ConfirmPassword { get; set; } = "";

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid) return Page();
        var user = new IdentityUser { UserName = Email, Email = Email };
        var result = await users.CreateAsync(user, Password);
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors) ModelState.AddModelError("", error.Description);
            return Page();
        }
        await signIn.SignInAsync(user, isPersistent: false);
        return RedirectToPage("/Index");
    }
}
````

### `RazorTaba/Pages/Account/Register.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Account/Register.cshtml` והדביקו את התוכן הבא:

````cshtml
@page
@model RazorTaba.Pages.Account.RegisterModel
@{ ViewData["Title"] = "הרשמה"; }
<h1>יוצרים חשבון</h1>
<p>בחרו סיסמה עם לפחות שמונה תווים, אות גדולה, אות קטנה, ספרה וסימן.</p>
<form method="post" class="card p-4 col-lg-6">
    <div asp-validation-summary="All" class="text-danger" role="alert"></div>
    <label asp-for="Email">דוא״ל</label><input asp-for="Email" class="form-control mb-3" autocomplete="username" dir="ltr" />
    <label asp-for="Password">סיסמה</label><input asp-for="Password" class="form-control mb-3" autocomplete="new-password" dir="ltr" />
    <label asp-for="ConfirmPassword">אימות סיסמה</label><input asp-for="ConfirmPassword" class="form-control mb-3" autocomplete="new-password" dir="ltr" />
    <button class="btn btn-primary">הרשמה</button>
</form>
````

### `RazorTaba/Pages/Account/Login.cshtml.cs`

קובץ חדש. צרו את `RazorTaba/Pages/Account/Login.cshtml.cs` והדביקו את התוכן הבא:

````csharp
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RazorTaba.Pages.Account;

/// <summary>מאמת סיסמה באמצעות Identity ומאפשר רק חזרה לכתובת מקומית.</summary>
public class LoginModel(SignInManager<IdentityUser> signIn) : PageModel
{
    [BindProperty, Required, EmailAddress]
    public string Email { get; set; } = "";
    [BindProperty, Required, DataType(DataType.Password)]
    public string Password { get; set; } = "";
    [BindProperty(SupportsGet = true)]
    public string? ReturnUrl { get; set; }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid) return Page();
        var result = await signIn.PasswordSignInAsync(Email, Password, isPersistent: false, lockoutOnFailure: true);
        if (!result.Succeeded)
        {
            ModelState.AddModelError("", "הכניסה לא הצליחה. בדקו את הפרטים או נסו שוב מאוחר יותר.");
            return Page();
        }
        return LocalRedirect(Url.IsLocalUrl(ReturnUrl) ? ReturnUrl! : "/");
    }
}
````

### `RazorTaba/Pages/Account/Login.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Account/Login.cshtml` והדביקו את התוכן הבא:

````cshtml
@page
@model RazorTaba.Pages.Account.LoginModel
@{ ViewData["Title"] = "כניסה"; }
<h1>טוב שחזרתם</h1>
<form method="post" class="card p-4 col-lg-6">
    <div asp-validation-summary="All" class="text-danger" role="alert"></div>
    <input asp-for="ReturnUrl" type="hidden" />
    <label asp-for="Email">דוא״ל</label><input asp-for="Email" class="form-control mb-3" autocomplete="username" dir="ltr" />
    <label asp-for="Password">סיסמה</label><input asp-for="Password" class="form-control mb-3" autocomplete="current-password" dir="ltr" />
    <button class="btn btn-primary">כניסה</button>
</form>
<a asp-page="Register">עדיין אין לכם חשבון?</a>
````

### `RazorTaba/Pages/Account/Logout.cshtml.cs`

קובץ חדש. צרו את `RazorTaba/Pages/Account/Logout.cshtml.cs` והדביקו את התוכן הבא:

````csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RazorTaba.Pages.Account;

/// <summary>יציאה מתבצעת באמצעות POST, לא באמצעות קישור GET.</summary>
public class LogoutModel(SignInManager<IdentityUser> signIn) : PageModel
{
    public IActionResult OnGet() => RedirectToPage("/Index");
    public async Task<IActionResult> OnPostAsync()
    {
        await signIn.SignOutAsync();
        return RedirectToPage("/Index");
    }
}
````

### `RazorTaba/Pages/Account/Logout.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Account/Logout.cshtml` והדביקו את התוכן הבא:

````cshtml
@page
@model RazorTaba.Pages.Account.LogoutModel
````

### `RazorTaba/Pages/Account/Denied.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Account/Denied.cshtml` והדביקו את התוכן הבא:

````cshtml
@page
@{ ViewData["Title"] = "אין הרשאה"; Response.StatusCode = 403; }
<h1>אין הרשאה לשינוי הזה</h1>
<p>אפשר לחזור לרשימה ולבחור רשומה שיצרתם בעצמכם.</p>
<a asp-page="/Animals/Index">חזרה לחיות</a>
````

### `RazorTaba/Pages/Shared/_LoginPartial.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Shared/_LoginPartial.cshtml` והדביקו את התוכן הבא:

````cshtml
@if (User.Identity?.IsAuthenticated == true)
{
    <span class="small">שלום, @User.Identity.Name</span>
    <form method="post" asp-page="/Account/Logout" class="m-0">
        <button class="btn btn-sm btn-outline-secondary">יציאה</button>
    </form>
}
else
{
    <a asp-page="/Account/Login">כניסה</a>
    <a asp-page="/Account/Register">הרשמה</a>
}
````

### `RazorTaba/Pages/Shared/_Layout.cshtml`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Shared/_Layout.cshtml
+++ b/RazorTaba/Pages/Shared/_Layout.cshtml
@@ -16,8 +16,9 @@
             <a asp-page="/Guide">מדריך</a>
             <a asp-page="/Discover">מגלים</a>
             <a asp-page="/Animals/Index">החיות</a>
             <a asp-page="/Keepers/Index">מטפלים</a>
+            <partial name="_LoginPartial" />
         </nav>
     </header>
     <main class="container py-4">
         @RenderBody()
````

<details markdown="1"><summary>קבצי תשתית וקבצים שנוצרו אוטומטית</summary>

הקבצים הבאים נמצאים בקוד השלב. קבצים שנוצרים באמצעות פקודות השלב אין להעתיק ידנית.

- [RazorTaba/Migrations/Auth/20260905070549_InitialIdentity.Designer.cs](https://github.com/3strategy/razortaba/blob/3ca22602bb94d32cd8cacf20820425e5ecfbfd79/RazorTaba/Migrations/Auth/20260905070549_InitialIdentity.Designer.cs)
- [RazorTaba/Migrations/Auth/20260905070549_InitialIdentity.cs](https://github.com/3strategy/razortaba/blob/3ca22602bb94d32cd8cacf20820425e5ecfbfd79/RazorTaba/Migrations/Auth/20260905070549_InitialIdentity.cs)
- [RazorTaba/Migrations/Auth/AuthDbContextModelSnapshot.cs](https://github.com/3strategy/razortaba/blob/3ca22602bb94d32cd8cacf20820425e5ecfbfd79/RazorTaba/Migrations/Auth/AuthDbContextModelSnapshot.cs)
- [RazorTaba/RazorTaba.csproj](https://github.com/3strategy/razortaba/blob/3ca22602bb94d32cd8cacf20820425e5ecfbfd79/RazorTaba/RazorTaba.csproj)

</details>

## מריצים ובודקים

1. הרשמה עם סיסמה תקינה מציגה משתמש בתפריט.
2. הרשמה עם סיסמה חלשה מציגה שגיאה.
3. יציאה ולאחריה כניסה עם הסיסמה עובדות.
4. סיסמה שגויה אינה מכניסה.
5. החיות הקיימות נשארו במסד היישום.

## משימה אישית ובדיקת הבנה

הסבירו איזה מסד מחזיק את שם החיה ואיזה את החשבון. הסבירו מדוע כניסה מוצלחת עדיין אינה הרשאה לערוך כל רשומה.

{: .box-success}
בסיום שינוי משמעותי: בדקו את ה־diff, בצעו Stage, כתבו הודעת commit שמתארת מה שיניתם, ובצעו Push. ודאו ב־GitHub שהשינוי הגיע. נדרשים לפחות 50 commits משמעותיים לאורך השנה, גם למי שעובד תמיד באותו מחשב נייד.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.
