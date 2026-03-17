# AGENTS Context Map

## Project scope

- This project teaches CS 101 for:
  - Highschool students.
  - Highschool teachers.

## Current status

- Active teaching project.
- Content and terminology should remain classroom-oriented and beginner-friendly.

## Sibling alignment (Jekyll infra)

- Keep Jekyll infrastructure reasonably aligned across the 3 sibling repos:
  - `BeautifulYesodot` (this repo)
  - `BeautifulMivney`
  - `mathBeautifulFork`
- Alignment targets usually include:
  - Front matter conventions.
  - Shared markdown style patterns.
  - Similar site-level configuration approach where practical.

## Cross-repo references

- BeautifulYesodot (this repo):
  - WSL: `/home/stra/repos/BeautifulYesodot`
  - Windows: `\\wsl.localhost\Ubuntu\home\stra\repos\BeautifulYesodot`

- BeautifulMivney:
  - WSL: `/home/stra/repos/BeautifulMivney`
  - Windows: `\\wsl.localhost\Ubuntu\home\stra\repos\BeautifulMivney`

- mathBeautifulFork:
  - WSL: `/home/stra/sites/mathBeautifulFork`
  - Windows: `\\wsl.localhost\Ubuntu\home\stra\sites\mathBeautifulFork`

- Shared utility often relevant for bagrut workflows:
  - `bag_splitter` (WSL): `/home/stra/repos/bag_splitter`

## Bagrut index maintenance (Codex)

- Refresh workflow for `cs2/Chapter9Ex9.3.md` (arrays/classes index):
  - [`docs/Chapter9Ex9.3-RefreshWorkflow.md`](docs/Chapter9Ex9.3-RefreshWorkflow.md)
- Reusable script used by that workflow:
  - `scripts/chapter9ex93_refresh.py`

## Cross-filesystem access fallback (important)

- When direct PowerShell access to sibling repos or `/mnt/c/...` paths fails with permission/IO errors, use direct WSL shell commands instead.
- Preferred pattern:
  - `wsl bash -lc "ls /mnt/c/Users/3stra/AndroidStudioProjects/Presence"`
  - `wsl bash -lc "sed -n '1,200p' /mnt/c/Users/3stra/AndroidStudioProjects/TasksONAlbertsFB/app/src/main/java/com/example/tasks/FBRef.java"`
  - `wsl bash -lc "find /mnt/c/Users/3stra/AndroidStudioProjects -name FBRef.java"`
- This fallback should be used for read/search operations across sibling projects when UNC or mounted-path access is blocked from the current shell context.

## WSL login-shell commands (important)

- When a command depends on the user's interactive Ubuntu shell environment or PATH setup, prefer:
  - `wsl.exe -d Ubuntu bash -lic "<command>"`
- This is especially important for Ruby/Bundler/Jekyll commands, because plain `wsl bash -lc` may not expose `bundle` even when it works in the Ubuntu terminal UI.
- Preferred Jekyll pattern for this repo:
  - `wsl.exe -d Ubuntu bash -lic "cd /home/stra/repos/BeautifulYesodot && bundle exec jekyll build"`
  - `wsl.exe -d Ubuntu bash -lic "cd /home/stra/repos/BeautifulYesodot && bundle exec jekyll serve --port 4000"`
- If port `4000` is already in use, try another explicit port such as `4001`.
- Practical rule:
  - Use `wsl bash -lc` for simple read/search filesystem operations.
  - Use `wsl.exe -d Ubuntu bash -lic` for commands that rely on shell init files, gem-installed binaries, or project dev environments.

## Tutorial language/style convention

- Default language direction should lean Hebrew unless explicitly decided otherwise for a specific page.
- For English markdown tutorials, add this block near the top (after frontmatter and initial note):

```html
<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>
```

- Do not retroactively rewrite in-progress tutorials between Hebrew/English unless explicitly requested.

## Tutorial layout pattern convention

- When a step and a visual (screenshot/diagram) are best understood side-by-side, prefer the `two-columns` pattern instead of stacking.
- Encourage this for GUI walkthroughs (step text on one side, screenshot on the other).
- Reusable pattern:

```html
<div class="two-columns">
<div markdown="1" class="column">
...step text...
</div>
<div markdown="1" class="column">
...image...
</div>
</div>
```

## Questionnaire layout convention

- In BeautifulYesodot, questionnaires currently live inside the relevant teaching folders (for example `cs3e/`) rather than in a single shared `interactive/` folder.
- Use the shared renderer at `/home/stra/repos/BeautifulYesodot/assets/js/questionnaire.js`.
- For bagrut-style or source-linked questionnaires, prefer linking directly to the relevant local or sibling PDF/page so students can inspect the source material.
- When the source question and the interactive quiz should be visible together, use the `two-columns` pattern with the PDF/source on the left and the quiz on the right.
- Important in this repo's RTL layout: inside `two-columns`, the first child renders on the right and the second child renders on the left.
- Therefore, for `quiz right / PDF left`, place the quiz as the first column and the PDF/source as the second column.
- If the side-by-side layout causes the question to start too low, prefer splitting the questionnaire rendering:
  - put the intro note / given code / questionnaire header above the two columns
  - render only the live question card inside the quiz column
  - keep ordinary single-column questionnaires on the default single `quiz-root` mount
- Shared split-render pattern:
  - add `quiz-header-root`, `quiz-main-root`, and a host `quiz-root`
  - call `window.renderQuestionnaire({ mountId: "quiz-root", headerMountId: "quiz-header-root", mainMountId: "quiz-main-root", ... })`
- Reusable questionnaire pattern:

```html
{: .box-note}
...intro note and given declarations...

<div id="quiz-header-root"></div>
<div id="quiz-root"></div>

<div class="two-columns questionnaire-source-layout">
<div markdown="1" class="column">

<div id="quiz-main-root"></div>
</div>
<div markdown="1" class="column">

{: .box-note}
מקור השאלה:
[PDF]({{ '/bagruyot/example.pdf' | relative_url }}#page=1)

<object
  class="questionnaire-source-viewer"
  data="{{ '/bagruyot/example.pdf' | relative_url }}#page=1"
  type="application/pdf">
  <p><a href="{{ '/bagruyot/example.pdf' | relative_url }}#page=1">פתחו את ה-PDF</a></p>
</object>

</div>
</div>
```
