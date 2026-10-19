---
layout: page
title: "02 — The development environment: run and change a website"
subtitle: Create a Razor Pages project, get to know the files, edit HTML and check the browser
lang: en
language: en
translation_of: /taba/02-development-environment/
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 3
track: core
published: true
companion_commit: 979d543d83d7d7c9e4f722b5400c60c4253b78a2
companion_previous: 3e83e27c126c0aa3f02f2977e8923702213ecd43
---

{: .box-note}
We will create and run a website in Visual Studio, VS Code or Rider, get to know its files and change its content. We will save, run and see the result in the browser.

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

<!-- lesson-back:start -->
[Previous lesson: 01 — My first page]({{ '/taba/en/01-first-page/' | relative_url }}){: data-sequence-nav="prev"} · [Next lesson: 03 — Making the website mine]({{ '/taba/en/03-my-theme/' | relative_url }}){: data-sequence-nav="next"}

On a touchscreen, swipe right for the next lesson and left for the previous lesson.
<!-- lesson-back:end -->

<!--
[קוד השלב](https://github.com/3strategy/razortaba/tree/979d543d83d7d7c9e4f722b5400c60c4253b78a2) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/3e83e27c126c0aa3f02f2977e8923702213ecd43...979d543d83d7d7c9e4f722b5400c60c4253b78a2)
-->

## What we will learn

- Run a local website in Windows or macOS.
- Identify `Pages` and `wwwroot`.
- Edit HTML, save files and check the result in the browser.

The instructions are in English; the shared example website keeps its Hebrew text and right-to-left (RTL) layout. Keep the Hebrew strings and `lang="he" dir="rtl"` in the examples, including “החיות שלי” (“My animals”), so your website matches the next lessons.

## Try creating a Razor Pages project

So far, you have practised HTML tags and CSS rules in an ordinary file, without a project. Now we will create a website from a ready-made template. **This is still an experiment:** choose any English name without spaces, such as `RazorPractice`. You can create several projects, each with its own name and folder. You do not need a GitHub account or to share anything with your teacher at this stage.

Keep the `first-page` folder as a separate exercise. The new project's home page will start again with a heading, a paragraph and an image; later you will add your own content and styling. We will copy the image later in this lesson and write CSS in a separate file instead of inside `style`.

Open the guide for your development environment. Each guide takes you from creating the project to seeing Welcome in the browser, and you can return to it whenever you want to practise again.

<details markdown="1"><summary>Visual Studio in Windows — create Razor Pages through the interface</summary>

{% include taba/en/setup-visual-studio.md %}

</details>

<details markdown="1"><summary>VS Code in macOS — create Razor Pages in the terminal</summary>

{% include taba/en/setup-vscode.md %}

</details>

<details markdown="1"><summary>Rider in Windows or macOS — create Razor Pages through the interface</summary>

{% include taba/en/setup-rider.md %}

</details>

### Practise creating another project

1. Stop the first website using Stop or Ctrl+C in the terminal.
2. Return to your guide and create a second project with another name, such as `RazorPractice2`, in a separate folder alongside the first.
3. Run it too and check that Welcome appears. Change a heading so you can tell which experiment is open.
4. Stop it and reopen the first experiment. Check that its files and your change are still there.

{: .box-success}
You know how to create a website, stop it and reopen existing work. Now choose one of your experiments to continue practising content and CSS. You can try again up to the Bootstrap lesson; in the Git lesson that follows, we will register the year-long project as `FirstNameLastNameRazor` and share it with the teacher.

## Continue with the project we created
{: #after-setup}

### 1. Open your existing work

In VS Code, open the project folder with your chosen name using **File → Open Folder**. In Visual Studio, open the solution file with your chosen name, such as `GuysRazor.slnx` or `GuysRazor.sln`, from your solution folder. You do not need to create a project to reopen existing work. In Rider, open the solution file using **Open**.

To continue an existing experiment, open its folder, save and run. To create a new experiment, return to the guide and choose a new name and folder.

### 2. Edit our website

Keep the browser beside your editor. In Visual Studio or Rider, run the **http** profile. In VS Code, open a terminal in the folder containing the `.csproj` file and run:

```shell
dotnet watch --launch-profile http
```

Next we will adapt the home page and shared layout for Hebrew. In these examples, `RazorTaba` is the name of the inner project folder. If you chose your own name in Visual Studio, replace that part with your name: for example, `GuysRazor/Pages/Index.cshtml`. When you have an outer solution folder, paths start there; in VS Code, if you opened the `.csproj` folder directly, start with `Pages/Index.cshtml` without adding another folder. These files were created during setup; now we will edit them.

Inside `RazorTaba/wwwroot`, create a folder named `images` and copy in the `fox.svg` you saved in `first-page` in the previous lesson. The home page image will then be at `RazorTaba/wwwroot/images/fox.svg`.

### 3. Save and check

Make the code changes below, save the files and check the website. Try changing a heading or paragraph, save again and see what changed. If an experiment fails, read the error and compare the section you changed with the example.

## Code changes

### `RazorTaba/Pages/Index.cshtml`

Start with the page created by the template. If you changed Welcome earlier, you will see your heading instead. Change the page content; the menu and surrounding frame stay in the shared layout.

````diff
 @page
 @model IndexModel
 @{
-    ViewData["Title"] = "Home page";
+    ViewData["Title"] = "בית";
 }
-
-<div class="text-center">
-    <h1 class="display-4">Welcome</h1>
-    <p>Learn about <a href="https://learn.microsoft.com/aspnet/core">building Web apps with ASP.NET Core</a>.</p>
-</div>
+<h1>החיות שלי</h1>
+<p>זה האתר הראשון שלי. כאן אכיר לכם חיות שמסקרנות אותי.</p>
+<img src="~/images/fox.svg" alt="איור של שועל" width="180" />
````

### `RazorTaba/Pages/Shared/_Layout.cshtml`

This file already exists in the template and connects all pages to Bootstrap and `site.css`. Do not replace it. Make only the following two changes to adapt the page direction and Bootstrap for Hebrew:

{% code_diff %}
 <!DOCTYPE html>
-<html lang="en">
+<html lang="he" dir="rtl">
 ⁞
-    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
+    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.rtl.min.css" />
     <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
{% endcode_diff %}

Leave the other lines, including the link to the file whose name ends in `.styles.css`, the Home and Privacy menu, the mobile menu toggle button and the scripts at the bottom. Try narrowing the window and opening the menu with its button.

### Get to know the generated style files

- `wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.min.css` contains ready-made style classes. Use their names in HTML; do not edit the library file.
- `wwwroot/css/site.css` is the website's personal stylesheet in this template. We will add our own CSS rules here in the CSS lesson, **after the rules already generated**.
- `Pages/Shared/_Layout.cshtml.css` contains styles for the shared layout. The link to `YourProjectName.styles.css` loads these styles after the build; do not create that file manually.

{: .box-note}
Leave `Program.cs`, `Properties/launchSettings.json` and the original CSS rules as generated. We already have a working website. Its running address is the one your editor or terminal displays; you do not need to choose a shared port number for every experiment.

<!--
<details open markdown="1"><summary>קבצים חדשים שנוספו או נוצרו בשלב</summary>

אלה הקבצים החדשים שנוספו או נוצרו בשלב הזה. קובצי מיגרציה או תשתית שנוצרים בפקודה אין להעתיק ידנית.

- [RazorTaba/Pages/Error.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Error.cshtml)
- [RazorTaba/Pages/Error.cshtml.cs](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Error.cshtml.cs)
- [RazorTaba/Pages/Index.cshtml.cs](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Index.cshtml.cs)
- [RazorTaba/Pages/Privacy.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Privacy.cshtml)
- [RazorTaba/Pages/Privacy.cshtml.cs](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Privacy.cshtml.cs)
- [RazorTaba/Pages/Shared/_Layout.cshtml.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Shared/_Layout.cshtml.css)
- [RazorTaba/Pages/Shared/_ValidationScriptsPartial.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Shared/_ValidationScriptsPartial.cshtml)
- [RazorTaba/Pages/_ViewImports.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/_ViewImports.cshtml)
- [RazorTaba/Pages/_ViewStart.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/_ViewStart.cshtml)
- [RazorTaba/RazorTaba.csproj](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/RazorTaba.csproj)
- [RazorTaba/appsettings.Development.json](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/appsettings.Development.json)
- [RazorTaba/appsettings.json](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/appsettings.json)
- [RazorTaba/wwwroot/favicon.ico](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/favicon.ico)
- [RazorTaba/wwwroot/images/fox.svg](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/images/fox.svg)
- [RazorTaba/wwwroot/js/site.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/js/site.js)
- [RazorTaba/wwwroot/lib/bootstrap/LICENSE](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/LICENSE)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.min.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.min.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.min.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.min.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.min.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.min.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.min.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.min.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.min.js.map)
- [RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/LICENSE.txt](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/LICENSE.txt)
- [RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.js)
- [RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.min.js)
- [RazorTaba/wwwroot/lib/jquery-validation/LICENSE.md](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/LICENSE.md)
- [RazorTaba/wwwroot/lib/jquery-validation/dist/additional-methods.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/dist/additional-methods.js)
- [RazorTaba/wwwroot/lib/jquery-validation/dist/additional-methods.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/dist/additional-methods.min.js)
- [RazorTaba/wwwroot/lib/jquery-validation/dist/jquery.validate.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/dist/jquery.validate.js)
- [RazorTaba/wwwroot/lib/jquery-validation/dist/jquery.validate.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/dist/jquery.validate.min.js)
- [RazorTaba/wwwroot/lib/jquery/LICENSE.txt](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/LICENSE.txt)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.js)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.min.js)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.min.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.min.map)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.js)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.min.js)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.min.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.min.map)

</details>
-->

## Run and check

1. The website opens at the `localhost` address displayed by your run.
2. The heading and paragraph appear in Hebrew and the image loads.
3. Save another change, run and make sure it appears.
4. Stop the run, reopen the same project and run it.

## Personal task and understanding check

Change one sentence and explain which file you edited and how you checked the result.

{: .box-success}
Save the files and show the website running. Note where the project folder is so you can open it in the next session.

{: .box-note}
AI can help you understand an error message and troubleshoot a problem. You are responsible for writing, testing and explaining the code; do not run an agent to write the project for you.

<!-- teacher-notes:start
class_periods: 1

Template baseline revised 2026-10-16: stock .NET 10 webapp (SDK 10.0.400), top-level statements, original startup/static assets and Bootstrap navbar retained. Early route 01a–04 was applied to a fresh template, built with zero warnings/errors and inspected in a browser. Changed layout/Program excerpts through 15 were checked for contextual applicability only; macOS runs remain pending; Rider 2026.2.2 Windows GUI creation and first run were verified on 2026-10-16. Historical companion pins describe the previous custom layout; they are not qualified source checkpoints for this revised route.

להכין התקנות לפני המפגש. אין יעד לימודי של PR, branches או merge.
teacher-notes:end -->

<!-- lesson-next:start -->
---

## Next steps

- [Continue: 03 — Making the website mine]({{ '/taba/en/03-my-theme/' | relative_url }})
<!-- lesson-next:end -->
