## 1. Install the development tools

1. Install a version of [Visual Studio Community](https://visualstudio.microsoft.com/vs/community/) that supports .NET 10. If Visual Studio is already installed, open **Visual Studio Installer** and check whether an update is needed.
2. In the installer, select **ASP.NET and web development** and click **Install**. For an existing installation, click **Modify**, select the component and complete the change.
3. Make sure the [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0) is installed. If it is missing, install it and reopen Visual Studio.

A **project** contains the website's code. A **solution** is a container Visual Studio uses to open and manage projects. Ours will contain one project.

## 2. Choose a location and names

Visual Studio will create the project folders for you. Start on the application's start screen.

### Open the project creation window

<div class="two-columns">
<div markdown="1" class="column">

Open **Visual Studio 2026**. On the right side of its start screen, click **Create a new project**, as marked in the screenshot.

If a workspace is already open, choose **File → New → Project** to reach the same window.

</div>
<div markdown="1" class="column">

[![Visual Studio 2026 start screen with Create a new project marked]({{ '/assets/img/taba/visual-studio-create-project.png' | relative_url }})]({{ '/assets/img/taba/visual-studio-create-project.png' | relative_url }})

</div>
</div>

### Find and select the website template

<div class="two-columns">
<div markdown="1" class="column">

In the search box at the top, type `raz`. In the results, click **ASP.NET Core Web App (Razor Pages)**, as marked in the screenshot, then **Next** at the bottom.

Make sure you selected the **C#** website template. The **Razor Class Library** result below it is not the template we will use. Do not choose Blazor, Web API or a template with MVC in its name.

</div>
<div markdown="1" class="column">

[![Searching for raz and selecting ASP.NET Core Web App (Razor Pages) in the new project window]({{ '/assets/img/taba/visual-studio-razor-template.png' | relative_url }})]({{ '/assets/img/taba/visual-studio-razor-template.png' | relative_url }})

</div>
</div>

You can click any screenshot to open it at full size.

### Name the project and choose a folder

<div class="two-columns">
<div markdown="1" class="column">

The screenshot uses `GuysRazor`; you can choose another practice name.

In **Configure your new project**, choose an English name without spaces, such as `RazorPractice` or `AnimalsTry2`. This is a practice project; the required personal name will be set in the Git lesson after Bootstrap.

- **Project name**: enter your chosen name.
- **Location**: keep Visual Studio's suggested default, usually `source\repos` inside your user folder. Do not copy the `3stra` username from the screenshot.
- **Solution name**: keep the same name as the project.
- **Place solution and project in the same directory**: leave unchecked.

At the bottom, you can see where the project will be created. Click **Next**. You do not need to create a folder in File Explorer first.

</div>
<div markdown="1" class="column">

[![Configure your new project with an example name and the default source repos location]({{ '/assets/img/taba/visual-studio-project-name.png' | relative_url }})]({{ '/assets/img/taba/visual-studio-project-name.png' | relative_url }})

</div>
</div>

Visual Studio will create an outer solution folder and an inner project folder, both with your chosen name. In our example, both are called `RazorPractice`.

{: .box-note}
If you already created the project, open it through **Open a project or solution** and choose `RazorPractice.sln` or `RazorPractice.slnx` in the existing folder. You do not need another project to continue existing work. To practise creating again, choose a new name and a new folder. Leave `first-page` from the previous lesson as it is.

## 3. Create the Razor Pages project

<div class="two-columns">
<div markdown="1" class="column">

In **Additional information**, choose the following settings. Note the stated difference concerning top-level statements in the older screenshot:

- **Framework: .NET 10.0 (Long Term Support)**.
- **Authentication type: None**.
- **Configure for HTTPS** is checked.
- **Enable container support** is unchecked.
- **Do not use top-level statements** is unchecked: keep the template's normal startup code. The older screenshot shows it checked; uncheck it in your project.
- **Enlist in Aspire orchestration** is unchecked.

The greyed-out fields need no action. Click **Create** at the bottom and wait for the project to be created.

</div>
<div markdown="1" class="column">

[![Razor Pages Additional information settings with NET 10 and Do not use top-level statements checked in the older screenshot]({{ '/assets/img/taba/visual-studio-additional-information.png' | relative_url }})]({{ '/assets/img/taba/visual-studio-additional-information.png' | relative_url }})

</div>
</div>

{: .box-warning}
If Razor Pages or .NET 10 is not listed, return to installation and updating. Do not choose another template just to get past this screen; show the teacher what is missing.

## 4. First check: press Play and see a website

Immediately after **Create**, wait for the project window to open and loading to finish. Before changing code, check that the generated project runs:

1. Click the **green triangle ▶ (Play)** on Visual Studio's top toolbar.
2. Wait for the build to finish and the browser to open. The first run may take a little while.
3. Check that the browser displays the website's opening page with the **Welcome** heading and that its address bar shows `localhost` with a port number. This is your website, running on your computer right now.

{: .box-success}
**Check successful:** you pressed Play and the Welcome page opened in the browser. The project was created successfully and you can continue working on it and trying changes.

{: .box-warning}
If the website does not open or a build error appears, stop here and show the message to the teacher. Continue editing only after the website runs.

<details markdown="1"><summary>Asked to approve an HTTPS certificate on the first run?</summary>

Visual Studio may ask you to approve a local development certificate for HTTPS. Ask the teacher if you are unsure what to approve. You can also stop the run, select **http** in the list beside the green triangle and press Play again.

</details>

### Stop, get to know the files and change a heading

Return to Visual Studio and click the **red Stop square** on the top toolbar to stop the run.

Open **View → Solution Explorer**. Expand the `RazorPractice` project and the `Pages` folder. You can see this structure in the file tree:

```text
source/repos/
└── RazorPractice/
    ├── RazorPractice.slnx (או RazorPractice.sln)
    └── RazorPractice/
        ├── RazorPractice.csproj
        ├── Program.cs
        ├── Pages/
        │   └── Index.cshtml
        └── wwwroot/
```

`Pages` contains website pages, and `wwwroot` contains styles, images and JavaScript. Below, the path `RazorPractice/Pages/Index.cshtml` starts at the `RazorPractice` folder; in Solution Explorer, open the project and then `Pages`.

1. In Solution Explorer, open your project by its chosen name, then `Pages → Index.cshtml`.
2. On the heading line, replace only `Welcome` with `החיות שלי` (“My animals”) and save with **Ctrl+S**.
3. Click the **green Play triangle** again and check that the new heading appears in the browser.
4. Return to Visual Studio and stop using **Stop** before continuing to edit.

{: .box-success}
Your change now appears on the website too. Save the files and continue to the shared lesson.

## How do you use your own names in later lessons?

In the course examples, the project is called `RazorTaba`. Use your own chosen name: for example, `RazorTaba/Pages/Index.cshtml` means `RazorPractice/Pages/Index.cshtml` inside the solution folder. Do not rename your project to match the example. In Solution Explorer, open your project and then `Pages`.

Leave `Program.cs` and `Properties/launchSettings.json` as generated. At this stage, edit content and styles only. You do not need to create a Git repository or publish to GitHub.


<!-- צילום להשלמה: Additional information עם Do not use top-level statements לא מסומן, ובדיקת Welcome בדפדפן. -->
