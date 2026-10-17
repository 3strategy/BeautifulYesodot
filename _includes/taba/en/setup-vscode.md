## 1. Prepare the tools

1. Install [VS Code](https://code.visualstudio.com/Download) and the [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0). On a Mac, choose Arm64 for Apple Silicon or x64 for Intel. You need the SDK, not just the Runtime.
2. In VS Code, open **Extensions**, search for Microsoft's **C# Dev Kit** and click **Install**. The extension helps you edit C#; we will create the project in the terminal.
3. Open **Terminal → New Terminal**. On a Mac, you can also open Terminal through Spotlight. Type the following and press Enter:

```shell
dotnet --list-sdks
```

Check that a version starting with `10.0` appears. If the command is not recognised, close and reopen VS Code after installing the SDK. If it still does not work, ask the teacher.

## 2. Choose a parent folder and a practice name

The following commands are for Terminal in macOS. Copy each line separately and press Enter:

```shell
mkdir -p ~/WebProjects
cd ~/WebProjects
pwd
```

`mkdir -p` prepares a parent folder if it is missing. `cd` moves the terminal into it, and `pwd` displays your location. Check that the path ends in `WebProjects`, rather than another project's folder.

Choose any English name without spaces, such as `RazorPractice`. In all following commands, replace it consistently with your chosen name. If a folder with that name already exists, choose a new name such as `RazorPractice2`; do not overwrite it.

## 3. Create a project from the Razor Pages template

```shell
dotnet new webapp --name RazorPractice --output RazorPractice --framework net10.0 --auth None
cd RazorPractice
```

`webapp` is the **Razor Pages** template. `--name` sets the project name; `--output` creates a new folder with that name. `net10.0` selects the course version, and `None` creates a website without user accounts. Wait for the success message and package restore to finish. Do not add `--force` if you see a message that the folder already contains files.

In VS Code, choose **File → Open Folder**, go to `WebProjects` in your home folder and open `RazorPractice`. If VS Code asks whether you trust the files you created, you can confirm. In Explorer, check that `RazorPractice.csproj`, the `Pages` folder and the `wwwroot` folder appear.

If you opened a new window, open **Terminal → New Terminal** there again. Check that the terminal is in the folder containing the `.csproj` file.

## 4. Run the website before changing it

```shell
dotnet watch --launch-profile http
```

Wait for **Now listening on: http://localhost:…**. Open the exact address displayed on your computer in the browser; the port number is selected by the template and may differ between projects. If the browser does not open automatically, copy the address into its address bar. Leave the terminal running while browsing.

{: .box-success}
The page displays **Welcome** and has a Home and Privacy menu. This is a working Razor Pages template, already including Bootstrap and a personal stylesheet called `wwwroot/css/site.css`.

## 5. Change, stop and reopen

1. Open `Pages/Index.cshtml` and change `Welcome` to `החיות שלי` (“My animals”). Save with **Cmd+S** and refresh the browser if the change does not appear automatically.
2. Return to the terminal and press **Ctrl+C** to stop the server. Closing the browser tab alone does not stop it.
3. Next time, open the same folder and run `dotnet watch --launch-profile http` again.
4. To practise creating another project, stop the server, return to the parent folder with `cd ~/WebProjects` and repeat step 3 with a new name. Do not create a project inside an existing project.

Leave `Program.cs`, the run settings and Bootstrap files as generated. You do not need Git or GitHub at this stage.

[Help: dotnet new templates](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-new-sdk-templates)

<!-- צילומים להשלמה: macOS Terminal עם בדיקת SDK, יצירת הפרויקט, Explorer לאחר Open Folder, ושורת Now listening לצד Welcome. צילומי VS Code GUI הקיימים נשמרים בנכסים אך אינם מסלול היצירה הנלמד כאן. -->
