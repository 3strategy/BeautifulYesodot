---
layout: page
title: מרחיבים את פרופיל המשתמש
subtitle: שדות אישיים ועריכת פרופיל; הרחבה קטנה באמצעות Code First
lang: he
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 160
track: extension
published: false
companion_commit: bc1c1048e1ce6b28351acd3297997d99bed5a0e7
companion_previous: a0d1d6b6f67b875ff6a4071865f989d00f3e58bd
---

{: .box-note}
זו הרחבה קטנה ונפרדת: שם לתצוגה, עיר ותחביב אחד. משתמשים בטבלת המשתמשים הקיימת בלי לבנות מערכת חשבונות מחדש.

[קוד השלב](https://github.com/3strategy/razortaba/tree/bc1c1048e1ce6b28351acd3297997d99bed5a0e7) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/a0d1d6b6f67b875ff6a4071865f989d00f3e58bd...bc1c1048e1ce6b28351acd3297997d99bed5a0e7)

קישורי GitHub מפנים למאגר פרטי. המורה צריך להעניק הרשאת קריאה; אפשר ללמוד גם מהקוד המופיע כאן.

## מה נלמד

- להרחיב מחלקה קיימת בתכונות.
- לעדכן פרופיל באמצעות UserManager.
- לבחור משתמש לפי הכניסה, ולא לפי מזהה שהגולש שולח.

## מתחילים מסונכרנים

פתחו את תיקיית הפרויקט הנכונה, בדקו שאין שינוי לא שמור והפעילו **Pull**. אם Git מציג התנגשות, פנו למורה; אל תמחקו עבודה ואל תבצעו Force Push.

## מוסיפים מעט מידע

AppUser יורשת מ־IdentityUser. מחליפים את הטיפוס באותם מקומות שבהם נרשמה תשתית Identity ומוסיפים מיגרציה למסד החשבונות בלבד. פרופיל קורא את המשתמש המחובר באמצעות GetUserAsync(User). אין שדה UserId בטופס. `[Authorize]` דורש כניסה לפני פתיחת הפרופיל.

TempData משמשת להודעת הצלחה אחרי הפניה; היא אינה המקום שבו הפרופיל נשמר. השדות נשמרים במסד דרך UpdateAsync.

### פקודות השלב

הפקודות מורצות משורש המאגר, שבו נמצאת התיקייה `RazorTaba`, בטרמינל של Visual Studio או VS Code.

```shell
dotnet ef migrations add ExtendProfile --context AuthDbContext --output-dir Migrations/Auth --project RazorTaba
dotnet ef database update --context AuthDbContext --project RazorTaba
```

## השינויים בקוד

### `RazorTaba/Models/AppUser.cs`

קובץ חדש. צרו את `RazorTaba/Models/AppUser.cs` והדביקו את התוכן הבא:

````csharp
using Microsoft.AspNetCore.Identity;

namespace RazorTaba.Models;

/// <summary>חשבון Identity עם תוספת קטנה של פרטי פרופיל.</summary>
public class AppUser : IdentityUser
{
    public string DisplayName { get; set; } = "";
    public string City { get; set; } = "";
    public bool LikesNature { get; set; }
}
````

### `RazorTaba/Data/AuthDbContext.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Data/AuthDbContext.cs
+++ b/RazorTaba/Data/AuthDbContext.cs
@@ -1,10 +1,11 @@
+using RazorTaba.Models;
 using Microsoft.AspNetCore.Identity;
 using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
 using Microsoft.EntityFrameworkCore;

 namespace RazorTaba.Data;

 /// <summary>מסד החשבונות נפרד ממסד החיות, כדי להוסיף כניסה בלי לשכתב את הליבה.</summary>
-public class AuthDbContext(DbContextOptions<AuthDbContext> options) : IdentityDbContext<IdentityUser>(options)
+public class AuthDbContext(DbContextOptions<AuthDbContext> options) : IdentityDbContext<AppUser>(options)
 {
 }
````

### `RazorTaba/Program.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Program.cs
+++ b/RazorTaba/Program.cs
@@ -1,4 +1,5 @@
+using RazorTaba.Models;
 using Microsoft.EntityFrameworkCore;
 using Microsoft.AspNetCore.Identity;
 using RazorTaba.Data;

@@ -11,9 +12,9 @@ string databasePath = Path.Combine(builder.Environment.ContentRootPath, "App.db"
 builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite($"Data Source={databasePath}"));

 string accountsPath = Path.Combine(builder.Environment.ContentRootPath, "Accounts.db");
 builder.Services.AddDbContext<AuthDbContext>(options => options.UseSqlite($"Data Source={accountsPath}"));
-builder.Services.AddDefaultIdentity<IdentityUser>(options =>
+builder.Services.AddDefaultIdentity<AppUser>(options =>
 {
     // תרגול מקומי: אין דרישה לשליחת דוא"ל או לספק חיצוני.
     options.SignIn.RequireConfirmedAccount = false;
     options.User.RequireUniqueEmail = true;
````

### `RazorTaba/Pages/Account/Register.cshtml.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Account/Register.cshtml.cs
+++ b/RazorTaba/Pages/Account/Register.cshtml.cs
@@ -1,13 +1,14 @@
+using RazorTaba.Models;
 using System.ComponentModel.DataAnnotations;
 using Microsoft.AspNetCore.Identity;
 using Microsoft.AspNetCore.Mvc;
 using Microsoft.AspNetCore.Mvc.RazorPages;

 namespace RazorTaba.Pages.Account;

 /// <summary>יוצר חשבון דרך Identity; לא שומר סיסמה בטבלת חיות או בקוד.</summary>
-public class RegisterModel(UserManager<IdentityUser> users, SignInManager<IdentityUser> signIn) : PageModel
+public class RegisterModel(UserManager<AppUser> users, SignInManager<AppUser> signIn) : PageModel
 {
     [BindProperty, Required, EmailAddress]
     public string Email { get; set; } = "";
     [BindProperty, Required, DataType(DataType.Password)]
@@ -17,9 +18,9 @@ public class RegisterModel(UserManager<IdentityUser> users, SignInManager<Identi

     public async Task<IActionResult> OnPostAsync()
     {
         if (!ModelState.IsValid) return Page();
-        var user = new IdentityUser { UserName = Email, Email = Email };
+        var user = new AppUser { UserName = Email, Email = Email };
         var result = await users.CreateAsync(user, Password);
         if (!result.Succeeded)
         {
             foreach (var error in result.Errors) ModelState.AddModelError("", error.Description);
````

### `RazorTaba/Pages/Account/Login.cshtml.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Account/Login.cshtml.cs
+++ b/RazorTaba/Pages/Account/Login.cshtml.cs
@@ -1,13 +1,14 @@
+using RazorTaba.Models;
 using System.ComponentModel.DataAnnotations;
 using Microsoft.AspNetCore.Identity;
 using Microsoft.AspNetCore.Mvc;
 using Microsoft.AspNetCore.Mvc.RazorPages;

 namespace RazorTaba.Pages.Account;

 /// <summary>מאמת סיסמה באמצעות Identity ומאפשר רק חזרה לכתובת מקומית.</summary>
-public class LoginModel(SignInManager<IdentityUser> signIn) : PageModel
+public class LoginModel(SignInManager<AppUser> signIn) : PageModel
 {
     [BindProperty, Required, EmailAddress]
     public string Email { get; set; } = "";
     [BindProperty, Required, DataType(DataType.Password)]
````

### `RazorTaba/Pages/Account/Logout.cshtml.cs`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Account/Logout.cshtml.cs
+++ b/RazorTaba/Pages/Account/Logout.cshtml.cs
@@ -1,12 +1,13 @@
+using RazorTaba.Models;
 using Microsoft.AspNetCore.Identity;
 using Microsoft.AspNetCore.Mvc;
 using Microsoft.AspNetCore.Mvc.RazorPages;

 namespace RazorTaba.Pages.Account;

 /// <summary>יציאה מתבצעת באמצעות POST, לא באמצעות קישור GET.</summary>
-public class LogoutModel(SignInManager<IdentityUser> signIn) : PageModel
+public class LogoutModel(SignInManager<AppUser> signIn) : PageModel
 {
     public IActionResult OnGet() => RedirectToPage("/Index");
     public async Task<IActionResult> OnPostAsync()
     {
````

### `RazorTaba/Pages/Account/Profile.cshtml.cs`

קובץ חדש. צרו את `RazorTaba/Pages/Account/Profile.cshtml.cs` והדביקו את התוכן הבא:

````csharp
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using RazorTaba.Models;

namespace RazorTaba.Pages.Account;

/// <summary>עריכת הפרופיל של המשתמש המחובר בלבד.</summary>
[Authorize]
public class ProfileModel(UserManager<AppUser> users) : PageModel
{
    [BindProperty, Required(ErrorMessage = "כתבו שם לתצוגה"), StringLength(60)]
    public string DisplayName { get; set; } = "";
    [BindProperty, StringLength(60)]
    public string? City { get; set; }
    [BindProperty]
    public bool LikesNature { get; set; }
    [TempData]
    public string? Message { get; set; }

    public async Task<IActionResult> OnGetAsync()
    {
        var user = await users.GetUserAsync(User);
        if (user is null) return Challenge();
        DisplayName = user.DisplayName;
        City = user.City;
        LikesNature = user.LikesNature;
        return Page();
    }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid) return Page();
        var user = await users.GetUserAsync(User);
        if (user is null) return Challenge();
        user.DisplayName = DisplayName;
        user.City = City ?? "";
        user.LikesNature = LikesNature;
        var result = await users.UpdateAsync(user);
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors) ModelState.AddModelError("", error.Description);
            return Page();
        }
        Message = "הפרופיל נשמר";
        return RedirectToPage();
    }
}
````

### `RazorTaba/Pages/Account/Profile.cshtml`

קובץ חדש. צרו את `RazorTaba/Pages/Account/Profile.cshtml` והדביקו את התוכן הבא:

````cshtml
@page
@model RazorTaba.Pages.Account.ProfileModel
@{ ViewData["Title"] = "הפרופיל שלי"; }
<h1>הפרופיל שלי</h1>
@if (Model.Message is not null) { <p class="alert alert-success">@Model.Message</p> }
<form method="post" class="card p-4 col-lg-6">
    <div asp-validation-summary="All" class="text-danger" role="alert"></div>
    <label asp-for="DisplayName">שם לתצוגה</label><input asp-for="DisplayName" class="form-control mb-3" />
    <label asp-for="City">עיר</label><input asp-for="City" class="form-control mb-3" />
    <label class="mb-3"><input asp-for="LikesNature" /> אוהבים טבע</label>
    <button class="btn btn-primary">שמירת פרופיל</button>
</form>
````

### `RazorTaba/Pages/Shared/_LoginPartial.cshtml`

בקובץ הקיים בצעו את השינוי הבא. סימני `+` ו־`-` מציינים שינוי ואינם חלק מהקוד:

````diff
--- a/RazorTaba/Pages/Shared/_LoginPartial.cshtml
+++ b/RazorTaba/Pages/Shared/_LoginPartial.cshtml
@@ -1,6 +1,7 @@
 @if (User.Identity?.IsAuthenticated == true)
 {
+    <a asp-page="/Account/Profile">הפרופיל שלי</a>
     <span class="small">שלום, @User.Identity.Name</span>
     <form method="post" asp-page="/Account/Logout" class="m-0">
         <button class="btn btn-sm btn-outline-secondary">יציאה</button>
     </form>
````

<details markdown="1"><summary>קבצי תשתית וקבצים שנוצרו אוטומטית</summary>

הקבצים הבאים נמצאים בקוד השלב. קבצים שנוצרים באמצעות פקודות השלב אין להעתיק ידנית.

- [RazorTaba/Migrations/Auth/20260905070601_ExtendProfile.Designer.cs](https://github.com/3strategy/razortaba/blob/bc1c1048e1ce6b28351acd3297997d99bed5a0e7/RazorTaba/Migrations/Auth/20260905070601_ExtendProfile.Designer.cs)
- [RazorTaba/Migrations/Auth/20260905070601_ExtendProfile.cs](https://github.com/3strategy/razortaba/blob/bc1c1048e1ce6b28351acd3297997d99bed5a0e7/RazorTaba/Migrations/Auth/20260905070601_ExtendProfile.cs)
- [RazorTaba/Migrations/Auth/AuthDbContextModelSnapshot.cs](https://github.com/3strategy/razortaba/blob/bc1c1048e1ce6b28351acd3297997d99bed5a0e7/RazorTaba/Migrations/Auth/AuthDbContextModelSnapshot.cs)

</details>

## מריצים ובודקים

1. משתמש לא מחובר מופנה לכניסה בפתיחת הפרופיל.
2. שנו שם, עיר וסימון תחביב; צאו והיכנסו וודאו שנשמרו.
3. שם ריק אינו נשמר.
4. חשבון אחר אינו מקבל את פרטי הפרופיל הראשון.

## משימה אישית ובדיקת הבנה

התאימו את כותרת התחביב לנושא שלכם. הסבירו מדוע אין צורך לשאול בטופס איזה משתמש רוצים לערוך.

{: .box-success}
בסיום שינוי משמעותי: בדקו את ה־diff, בצעו Stage, כתבו הודעת commit שמתארת מה שיניתם, ובצעו Push. ודאו ב־GitHub שהשינוי הגיע. נדרשים לפחות 50 commits משמעותיים לאורך השנה, גם למי שעובד תמיד באותו מחשב נייד.

{: .box-note}
AI יכול לעזור להבין הודעת שגיאה ולנפות תקלה. אתם אחראים לכתוב, לבדוק ולהסביר את הקוד; אין להפעיל סוכן שיכתוב את הפרויקט.
