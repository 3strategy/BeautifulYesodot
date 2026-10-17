---
layout: page
title: "06 — Save versions with Git and publish to GitHub"
subtitle: Finish experimenting, register a year-long project and share your progress with the teacher
lang: en
language: en
translation_of: /taba/06-git-github/
tags: [CSharp, Web, Taba, Git, GitHub]
sequence: 7
track: core
published: true
companion_commit: fd6683d2c183607a7a808b053c0887256179d66e
companion_previous: e0870b94577d330d3609d697d4a16c8c19c754ab
---

{: .box-note}
We will move from experiments to our year-long project: choose a working website, save its versions in a private repository named after us and confirm that the teacher has access. From here, we will continue developing the same website throughout the year.

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

<!-- lesson-back:start -->
[Previous lesson: 05 — A good-looking website with Bootstrap]({{ '/taba/en/05-bootstrap/' | relative_url }}){: data-sequence-nav="prev"} · [Next lesson: 07 — Space for another lesson]({{ '/taba/en/07-reserved/' | relative_url }}){: data-sequence-nav="next"}

On a touchscreen, swipe right for the next lesson and left for the previous lesson.
<!-- lesson-back:end -->

<!--
[קוד השלב](https://github.com/3strategy/razortaba/tree/fd6683d2c183607a7a808b053c0887256179d66e) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/e0870b94577d330d3609d697d4a16c8c19c754ab...fd6683d2c183607a7a808b053c0887256179d66e)
-->

<!-- Reference checkpoint: application source remains at the completed Bootstrap
state; the repository-root .gitignore is the taught file change. Personal Git
identity, commit IDs/messages, remotes and collaboration settings are not source
files in this checkpoint. Verify those workflow outcomes separately; a source
diff alone does not establish successful publication or collaborator access. -->

## Register the year-long project and share it with the teacher

<div markdown="1" class="box-note">

**From this lesson onwards, continue with one year-long project and one private GitHub repository.** The repository name must follow `FirstNameLastNameRazor`: your first and last names in English, without spaces, followed by `Razor`. For example: `NoaCohenRazor`. This lets the teacher identify your project when cloning it to their computer.

Add the teacher as a Collaborator so they can download the code, run the website, check your work and help when something breaks. For the teacher to see your latest work, you must Push; a Commit that stays on your computer does not reach them.

**The teacher will assess your ongoing effort throughout the year**, using work dates, the changes themselves and clear Commit messages, together with your explanations and ability to make a change independently. Describe what you changed in each message; this lets both you and the teacher follow your progress and find when a problem appeared. Uploading a whole project at the last minute, even one created by an AI agent, does not demonstrate a year's work process or understanding of the code.

</div>

### Choose the website we will keep developing

Open the website you styled and run it. Choose the project whose content and styling you want to keep developing.

If an earlier experiment no longer works and you want to start again, create a Razor Pages project in a new folder using the [VS Code guide]({{ '/taba/en/02-setup-vscode/' | relative_url }}), [Visual Studio guide]({{ '/taba/en/02-setup-visual-studio/' | relative_url }}) or [Rider guide]({{ '/taba/en/02-setup-rider/' | relative_url }}). Gradually transfer the text, images and styles you want to keep, checking each change. You can leave your previous experiment folders on the computer.

{: .box-success}
Start saving versions once you have a website that opens with your chosen content and styling. Continue in that same project from here; you do not need to recreate every experiment in the history.

If you are creating a new project now, name both the project and solution `FirstNameLastNameRazor` using your own details, following your setup guide. In the practice guides, the name is flexible; at this stage, use the required personal name. If your existing project already works under another name, you do not need to rename files or classes manually; the GitHub repository name will follow the required personal pattern.

If the project is already managed by Git, use its existing repository. If it is already connected to GitHub, skip creating a new repository and carry out the upload check below.

{: .box-warning}
After registering the project, continue in the same repository and keep its history. You can experiment separately in another project, but your year-long work stays in the registered repository. If you want to replace that project or it breaks, ask the teacher before switching repositories; do not delete the history or replace it with a fresh upload of the whole website.

## Part one: save versions on your computer with Git

**Git** keeps history inside the project folder on your computer. **GitHub** is an online service where we will upload that history in part two. You can Commit and compare versions without an internet connection.

| Action | What is saved or displayed? |
| :--- | :--- |
| Save | The current file's content is saved to disk |
| Diff | The difference between the version in Git and your change |
| Stage | Select the changes to include in the next version |
| Commit | A version with a message is saved in local history |

### Choose the repository folder

If you created the website in Rider, use the **VS Code** route for Git actions in this lesson. Install [VS Code](https://code.visualstudio.com/) if it is not installed yet, and use **File → Open Folder** to open the same repository folder as explained below. You can continue editing and running the website in Rider; opening the folder in VS Code does not create a new project or replace your existing work.

In Visual Studio, choose the outer solution folder containing the `.sln` or `.slnx` file and the project folder. In VS Code, choose the folder containing all the website files; if there is a solution with an inner project folder, choose the outer solution folder.

This is the folder for your one website. Do not choose `source/repos`, which also contains other projects, and do not create another repository inside `Pages`.

If Git is not installed or the terminal does not recognise the `git` command, ask the teacher for help installing it before continuing.

### First-time setup: your name and email in Git
{: #git-user-setup}

<div markdown="1" class="box-note">

**Before your first commit**, tell Git who you are. Signing in to GitHub does not replace this setting.

In VS Code, choose **Terminal → New Terminal**; in Visual Studio, choose **View → Terminal**. In the window that opens at the bottom, run the following two commands separately, pressing Enter after each. Replace the example name and email address with your own, keeping the quotation marks:

```shell
git config --global user.name "Your Name"
git config --global user.email "yourname@gmail.com"
```

Write your name on the first line. On the second, use **the personal Gmail address you will use for GitHub in part two**. The commands usually finish without displaying a message — this is normal.

This setting is saved for all projects under the current operating-system user on this computer. On your own computer, you do it once; if several students share the same computer login, each student needs to set their own details before working.

</div>

If Git displays **Please tell me who you are** or asks you to set `user.name` and `user.email`, run both commands and try the commit again. If `git` is not recognised, ask the teacher for help installing Git.


### Prepare the files for version control

In the folder you chose as the repository root, open `.gitignore` in the editor. If it does not exist, create it using **New File** with the exact name `.gitignore`. Add the following lines and save, so build files, local databases and environment files stay on your computer:

```gitignore
**/bin/
**/obj/
.vs/
artifacts/
*.db
*.db-*
*.sqlite
*.sqlite3
.env
.env.*
**/appsettings.Local.json
**/secrets.json
node_modules/
.DS_Store
```

{: .box-warning}
Do not save passwords or keys in code. `.gitignore` helps keep local files out of new commits, but it does not remove a file already committed from history. If a private file already appears in the history, stop before Push and show the teacher.


### Create a local repository — choose your editor

<div class="two-columns">
<div markdown="1" class="column box-note">

#### VS Code

Open the repository folder using **File → Open Folder**. In **Source Control**, click **Initialize Repository**. Click **+** beside **Changes**, write a message such as `Save my styled website` and click **Commit**.

</div>
<div markdown="1" class="column box-note">

#### Visual Studio

Open the solution and choose **Git → Create Git Repository**. Under **Other**, choose **Local only** or **Local**, check the path and confirm creation of the local repository.

Open **View → Git Changes**. If files remain in **Changes**, add them with **+**, write a message such as `Save my styled website` and choose **Commit Staged**. If the wizard already created a Commit, check that it includes the website.

</div>
</div>

Before committing, check that the website files and `.gitignore` are included, and that build files from `bin` and `obj` are not listed. In Visual Studio, save the solution file too.

[Help: a local repository in Visual Studio](https://learn.microsoft.com/en-us/visualstudio/version-control/git-create-repository?view=visualstudio) · [Stage and Commit in VS Code](https://code.visualstudio.com/docs/sourcecontrol/staging-commits)

### See what changed and save another version

1. Change a sentence on the home page, save and run.
2. Open **Source Control** in VS Code or **Git Changes** in Visual Studio and click the file to see its Diff.
3. Explain which line changed. Stage and Commit with a message describing the change.
4. In VS Code, open the **Source Control Graph**; in Visual Studio, open **Git → View Branch History**. Find the versions you saved.
5. To finish the practice, use the editor to restore the sentence to its wording before the experiment. Save, Stage and Commit with a message such as `Restore text after Git practice`. History keeps both the experiment version and the restored version, while the website again displays the content you chose at the start of the lesson.

### A small experiment: return to the saved version

{: .box-warning}
Do this experiment only after your intended work is saved in a Commit and there are no pending changes. Undoing the next change will remove the experimental edit from the file; do not choose to discard changes in all files.

1. Replace one word in the heading in `Pages/Index.cshtml`, save and view it in the browser. This time, **do not Stage or Commit**.
2. Open the file's Diff and check that it contains only the experimental change.
3. In VS Code, right-click the file and choose **Discard Changes**. In Visual Studio, choose **Undo Changes** for that same file in Git Changes. Confirm undoing the change in this file only.
4. Run again and check that the heading has returned to the last version you committed.

[Help: discard an edit in VS Code](https://code.visualstudio.com/docs/sourcecontrol/staging-commits) · [Undo changes in Visual Studio](https://learn.microsoft.com/en-us/azure/devops/repos/git/undo?view=azure-devops)

{: .box-success}
You have versions on your computer and know how to inspect a change and return from an experiment to your last version. Now we will upload them to GitHub.

## Part two: upload the versions to GitHub

**Commit saves on your computer; Push uploads to GitHub.** Publishing for the first time creates an online repository and connects your local repository to it. Afterwards, upload additional versions using Push.

### Create an account and sign in

Open [GitHub](https://github.com/) and sign up with your personal Gmail address. Complete email verification. If you already have an account, use it. You do not need to create a repository on the website before publishing from the editor.

In Visual Studio, you can sign in through **File → Account Settings** and add your GitHub account. In VS Code, you will be asked to sign in while publishing. Check that you are using the correct personal account.

### Publish a private repository — choose your editor

In the repository name field, enter your personal name in the `FirstNameLastNameRazor` pattern, such as `NoaCohenRazor`. If you already have a connected repository with a different name, ask the teacher to help update its name and local connection without losing history; do not create a replacement repository.

<div class="two-columns">
<div markdown="1" class="column box-note">

#### VS Code

Open **View → Command Palette → Publish to GitHub**. Sign in if prompted, enter your personal repository name and choose **Publish to GitHub private repository**. Wait for the upload to finish.

</div>
<div markdown="1" class="column box-note">

#### Visual Studio

In **Git Changes**, click **Push** (the upward arrow). If there is no remote repository, continue to publishing on GitHub. Check the account and repository name, choose **Private** and confirm **Create and Push**.

If the repository is already connected, Push uploads versions to it; do not create another repository.

</div>
</div>

<!-- המעבר ממאגר Local only לפרסום ב־Visual Studio דורש בדיקת ממשק במעבדה. מסלול VS Code עם Initialize ואז Publish הצליח בבדיקת המורה; בדיקות מחשבים נוספים עדיין מתוכננות. -->

{: .box-warning}
If **Repository already exists** appears or the upload fails, show the message to the teacher. Do not try creating a repository with the same name again and do not delete your work.

[Help: publish from VS Code](https://code.visualstudio.com/docs/sourcecontrol/repos-remotes) · [Push from Visual Studio](https://learn.microsoft.com/en-us/visualstudio/version-control/git-push-remote?view=visualstudio)

### Check that the versions arrived and share with the teacher

1. Open the repository in GitHub and check that the **Private** label appears.
2. Open `Pages/Index.cshtml` inside the project and check that the latest content is there. Open the Commits list and view the messages for your saved versions.
3. Inside the repository, choose **Settings → Collaborators → Add people**. If GitHub asks for additional verification, complete it.
4. Search for `3strategy@gmail.com`, select the `3strategy` account and confirm sending the invitation. A Collaborator is someone who receives access to the private repository; sending the repository address alone does not grant access.
5. Send the repository address where the teacher requested and include your full name. The teacher's access becomes active after they accept the invitation.
6. Check with the teacher that they accepted the invitation and can open and Clone the repository. If the invitation is still pending, let them know; project registration is complete once access is confirmed.

[Help: invite collaborators to a private repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository)

Uploading code does not run the website on the internet. Continue running it on your computer from the editor.

### Upload another change

Change a paragraph, save and check the browser. Inspect the Diff, Stage and Commit. Then choose **Source Control → … → Push** in VS Code or **Git → Push** in Visual Studio. Refresh the repository in GitHub and make sure the new change arrived too.

After checking the upload, use the editor to restore the paragraph to your chosen wording before the experiment. Save, Stage and Commit, then Push. Check in GitHub that the restored version is also in the history. This lets us continue to the next lesson with the same content and styling, after practising saving and uploading changes.

## Continue on this computer or another one

**Pull** receives versions uploaded to GitHub. **Clone** creates a copy of the repository and its history on another computer.

<details markdown="1"><summary>Moving to another computer? Clone once</summary>

After uploading your work from the first computer, sign in to the same GitHub account on the other computer. **Clone** downloads the repository and its history into a local folder; do not create a new project there.

- In VS Code: choose **View → Command Palette → Git: Clone**, paste your private repository address, choose a parent folder such as `WebProjects`, then open the folder created.
- In Visual Studio: on the start screen, choose **Clone a repository**, paste the address, choose a save location and click **Clone**. Open the solution file in the repository.

Install the development tools from your setup guide on this computer too. Afterwards, open the same copy and Pull each session; you do not need another Clone.

</details>

## Your work routine from the next lesson onwards

- At the start of a session, once your previous work is committed: open the correct repository and **Pull**. In VS Code: **Source Control → … → Pull**; in Visual Studio: **Git → Pull**.
- After a meaningful change: save, run, inspect the Diff, Stage and Commit with a clear message describing what changed.
- At the end: Push and check in GitHub that the change arrived, even if you always work on the same laptop.
- If you see a conflict or synchronisation error, ask the teacher without deleting work or using Force Push.

At least 50 meaningful commits are required throughout the year. Start accumulating them now; there is no need to recreate versions of earlier experiments or split a meaningless change just to increase a counter.

### Write Commit messages that make your progress clear

Write a short message in Hebrew or English describing your change. For example: `Add navigation links to home page` or `Fix missing image on home page`. Messages such as `update`, `stuff` or `final` do not explain what changed. Before committing, read the Diff and check that the message matches the changes you selected.

{: .box-note}
The teacher will look at your ongoing effort throughout the year and the clarity of your Commit messages, alongside the changes and your ability to explain them. A commit quota alone is not enough: save meaningful changes as you work and Push regularly.

## Understanding check

{: .box-note}
Before moving to the next lesson, check that the website's content and styling are back to your chosen state from the start of the lesson, that `.gitignore` is saved in the repository, and that there are no pending changes in Source Control or Git Changes. History remains and shows the experiments and their restoration.

Show a version saved on your computer and the same version in GitHub. Explain the difference between Save, Commit and Push, and which action restored the heading after the experiment.

{: .box-success}
Project registration is complete when you have a working website, a private repository named `FirstNameLastNameRazor` with your own details, up-to-date code and a commit history with clear messages, and the teacher has confirmed they can access and Clone it. From here, continue in the same repository throughout the year.

<!-- lesson-next:start -->
---

## Next steps

- [Continue: 07 — Space for another lesson]({{ '/taba/en/07-reserved/' | relative_url }})
<!-- lesson-next:end -->
