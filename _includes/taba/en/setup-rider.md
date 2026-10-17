## 1. Prepare the tools

Install [JetBrains Rider](https://www.jetbrains.com/rider/download/) and the [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0) for your operating system. On a Mac, choose Arm64 for Apple Silicon or x64 for Intel. If Rider was open during installation, reopen it.

## 2. Create a solution and project through the interface

<div class="two-columns">
<div markdown="1" class="column">

On Rider's start screen, click **New Solution**, as shown in the screenshot. If a solution is already open, choose **File → New Solution**.

</div>
<div markdown="1" class="column">

[![Rider start screen with the New Solution button]({{ '/assets/img/taba/rider-welcome.png' | relative_url }})]({{ '/assets/img/taba/rider-welcome.png' | relative_url }})

</div>
</div>

### Choose Web, then Razor Pages

<div class="two-columns">
<div markdown="1" class="column">

Choose **Web** on the left. In the **Template** list, explicitly choose **Web App (Razor Pages)** — entering the Web category may initially select Blazor, so check the selected row.

Choose any practice name, such as `RazorPractice`, and your own parent folder. The screenshot uses an example folder in Windows; on a Mac, you can choose `WebProjects` in your home folder. Do not copy the example path if it is not your folder.

</div>
<div markdown="1" class="column">

[![Rider New Solution window with RazorPractice and the Web App Razor Pages template selected]({{ '/assets/img/taba/rider-new-solution.png' | relative_url }})]({{ '/assets/img/taba/rider-new-solution.png' | relative_url }})

</div>
</div>

### Check the creation settings

1. In **Solution name**, enter any English name without spaces, such as `RazorPractice`. Keep **Project name** the same.
2. In **Solution directory**, choose your own parent folder, such as `WebProjects` in your home folder. Check the full path before confirming creation. Do not choose another project's folder.
3. Leave **Put solution and project in the same directory** unchecked. This gives you an outer solution folder and an inner project folder.
4. Choose **C#** and the **net10.0** framework. Scroll down using the outer scrollbar on the right, past the template list, to see the additional options.
5. Leave **Do not use top-level statements** unchecked. Set **Auth** to **No authentication**. Leave **Add Dockerfile** unchecked. You do not need to change Advanced Settings.
6. Uncheck **Create Git repository**. At this stage, you are practising creating and running; sharing on GitHub comes after Bootstrap.
7. Click **Create** and wait for file creation and package restore to finish.

[![Rider Razor Pages options with net10.0, No authentication and Do not use top-level statements unchecked]({{ '/assets/img/taba/rider-template-options.png' | relative_url }})]({{ '/assets/img/taba/rider-template-options.png' | relative_url }})

You can click any screenshot to view it at full size.

If .NET 10 or the correct template does not appear, check the SDK installation and ask the teacher. Do not choose another template just to continue.

## 3. Run and check

1. In the **Solution** window on the left (the file tree), expand the project and `Pages`. Check that `Index.cshtml`, a `.csproj` file and the `wwwroot` folder exist.
2. In the run-configuration list on the top toolbar, select **RazorPractice: http**, or your own project name followed by `http`. If this profile is already selected, leave it. Click **Run ▶**.
3. Wait for the build to finish. If the browser does not open automatically, open the `http://localhost:…` address displayed in the Run window. Use the port number your project displays.
4. Check that **Welcome** appears with the Home and Privacy menu. Stop using **Stop ■**.
5. Open `Pages/Index.cshtml`, replace `Welcome` with `החיות שלי` (“My animals”), save and run again. Check that the heading changed.

<div class="two-columns">
<div markdown="1" class="column">

The Rider screenshot shows the project and `Pages` on the left, the `http` profile on the top toolbar and the **Run** window at the bottom. The **Now listening on** line displays your website's address. Your port number may differ from the screenshot. The yellow warning in the screenshot says no HTTPS port was selected when running the `http` profile; if Now listening on appears and the Welcome page opens, the HTTP run succeeded.

[![RazorPractice in Rider after an http run, with the Run window displaying Now listening on]({{ '/assets/img/taba/rider-first-run.png' | relative_url }})]({{ '/assets/img/taba/rider-first-run.png' | relative_url }})

</div>
<div markdown="1" class="column">

The browser should display the template page with **Welcome**, the **Home / Privacy** menu and your project name.

[![Welcome page of the RazorPractice project created and run from Rider]({{ '/assets/img/taba/rider-browser-welcome.png' | relative_url }})]({{ '/assets/img/taba/rider-browser-welcome.png' | relative_url }})

</div>
</div>

{: .box-success}
You have a Razor Pages website created from a template and running from Rider. Bootstrap is already in `wwwroot/lib/bootstrap`, and your personal stylesheet is `wwwroot/css/site.css`.

## 4. Continue or try again

For existing work, choose **Open** and open the `.sln` or `.slnx` solution file. To practise creating again, stop the run, return to **New Solution** and choose a new name, such as `RazorPractice2`, and a new folder alongside the first. Keep the earlier experiment; you do not need to delete it.

Leave `Program.cs`, the run settings and template files in place. You do not need to publish anything online.

[Help: create a website in Rider](https://www.jetbrains.com/help/rider/Get_started_with_asp_net.html)

<!-- Verified through Rider 2026.2.2 GUI on Windows, 2026-10-16: created C:/Temp/TabaRiderGui/RazorPractice with Web App (Razor Pages), net10.0, No authentication, no Git, and top-level statements. Run profile http built successfully and opened Welcome at localhost:5282. Captures are real application screenshots. macOS GUI remains unverified. -->
