# AGENTS Context Map

## Quick WSL locations

- BeautifulYesodot: `/home/stra/repos/BeautifulYesodot`
- BeautifulMivney: `/home/stra/repos/BeautifulMivney`
- mathBeautifulFork: `/home/stra/sites/mathBeautifulFork`

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

## Multi-menu navigation

- The navigation supports several named menu views. Configure them with
  `navbar-menu-sets` in `_config.yml`; each set lists the exact top-level
  `navbar-links` labels that should be visible in that view.
- Keep shared top-level links (for example submission systems, external links,
  and settings) out of every set so they remain visible in all views.
- Add a `בחירת תפריט` submenu under `הגדרות` with
  `javascript:setMenuSet('<set-id>');` links, and set a valid
  `navbar-default-menu-set`.
- The selected menu is stored in the `menu-set` cookie. The common
  `_includes/nav.html` and `assets/js/custom-script.js` implement the behavior;
  do not duplicate it in page-local JavaScript.
- A course may have an empty `items: []` view temporarily. It still provides a
  selectable course context and keeps only the shared navigation visible until
  course-specific top-level links are ready.

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

## Notification command (important)

- The notification script is in the user-level Codex folder, not this repo.
- At the end of each user prompt, run it from PowerShell with:
  - `Set-Location C:\Users\3stra\.codex; .\notify.ps1 -Title "Codex - BeautifulYesodot - " -Message "<prompt title> Finished"`
- If the task fails, still run the same script and make the message reflect failure:
  - `Set-Location C:\Users\3stra\.codex; .\notify.ps1 -Title "Codex - BeautifulYesodot - " -Message "<prompt title> Failed"`
- Do not first search for a project-local `.codex` folder; BeautifulYesodot does not normally contain one.

## Tutorial language/style convention

- All rendered site content is student-facing, including introductions, summaries,
  navigation labels, titles, and subtitles. Address what students will build,
  do, observe, and explain.
- Keep teacher planning, time estimates, pacing decisions, assessment rationale,
  and authoring/verification notes in HTML comments in the Markdown source.
  Do not expose these in visible prose or justify curriculum/design decisions to students.
- Start each lesson immediately after frontmatter with a short student-oriented
  `{: .box-note}` synopsis, followed by its previous-lesson link. End with next-step links.

- Default language direction should lean Hebrew unless explicitly decided otherwise for a specific page.
- In Markdown tables, right-align every Hebrew/RTL column with `---:`. Use
  `:---` only for genuinely LTR columns, and `:---:` only for deliberate
  centering.
- For Hebrew lettered sub-question lists, use a real ordered list with
  `{: .alefbet}` and ordinary Markdown numbering rather than manually writing
  `א.`, `ב.`, and so on.
- Mermaid diagrams default to LTR rendering through `assets/js/custom-script.js`; do not wrap diagrams in `.english` just to fix transition order. Use `mermaid-rtl` or `%% dir: rtl %%` only for diagrams whose labels intentionally need RTL rendering.
- For English markdown tutorials, add this block near the top (after frontmatter and initial note):

```html
<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>
```

- For a short English block inside a Hebrew or mixed-language page, do not apply page-wide LTR styling. Wrap only that block with the shared `.english` class so its direction and alignment remain readable:

```html
<div markdown="1" class="english">

1. English list item.
2. Another English list item.

</div>
```

  Use this for English lists, prompts, quotations, and multi-paragraph examples. When writing mixed content, keep language changes visually contained in an appropriate wrapper instead of relying on inline `direction` or `text-align` styles. This keeps Hebrew pages clean and prevents LTR content from disrupting the surrounding RTL layout.

- Do not retroactively rewrite in-progress tutorials between Hebrew/English unless explicitly requested.

## Tutorial diff presentation convention

- Treat each chapter as a transition from the preceding runnable state. For an
  existing file, show a focused contextual diff; show a complete file only when
  it is new or a genuine whole-file rewrite is clearer.
- Use ordinary fenced `diff` blocks for simple changes. For complex diffs, or
  when the request is to improve or clarify a diff, use Jekyll's Liquid
  highlighter with `mark_lines` so important unchanged context is visible.
- In paired `לפני` / `אחרי` comparisons on Hebrew pages, keep source order as
  `לפני` then `אחרי`, and use `<div class="two-columns before-after">`.
  On narrow screens that preserves the logical reading order.
- In diff highlighter blocks, `+` and `-` markers must be the first character
  of their lines. Use a standalone Unicode vertical ellipsis (`⁞`) at an exact
  omission point; do not use `...` as if it were copyable source.

## Important content highlighting and visual flow

- Keep lesson pages visually engaging and easy to scan. Use the repository's design classes to emphasize important guidance, decisions, warnings, successful outcomes, and reusable prompts:
  - `{: .box-note}` for a short, single-paragraph note;
  - `{: .box-success}` for a short, single-paragraph positive instruction or completed outcome;
  - `{: .box-warning}` for risks, guardrails, or caution;
  - `{: .box-error}` for a failure condition or prohibition that must stand out.
- When highlighted content contains a list, multiple paragraphs, Markdown structure, or another section, use a block wrapper instead of the short syntax:

```html
<div markdown="1" class="box-note">

...content with lists, paragraphs, or Markdown...

</div>
```

- Do not use a `text` code fence merely to emphasize ordinary prose or a prompt instruction; reserve code fences for literal commands, code, or text the reader should copy exactly. Prefer an appropriate design box when the content is instructional or presentation-oriented.
- Use `<details markdown="1"><summary>…</summary>` for secondary reference material so that the main presentation flow stays focused. Keep primary explanations and decisions visible.
- Prefer relative CSS units (`rem` for type scale and `em` for local proportional adjustments) over `px`, especially for text and spacing. Use `px` only when a fixed rendering unit is materially more appropriate, such as an SVG stroke width or a one-pixel border.

## Media include convention

- Prefer the repo's shared Jekyll includes for embedded media instead of hand-writing iframe/embed markup in lesson pages.
- YouTube videos:

```liquid
{% include youtube.html id="VIDEO_ID" %}
```

- Looping/autoplaying YouTube background-style embeds:

```liquid
{% include youtube_loop.html id="VIDEO_ID" %}
```

- Instagram reels/posts:

```liquid
{% include instagram.html id="REEL_OR_POST_ID" %}
```

  If a full Instagram URL is more reliable, use:

```liquid
{% include instagram.html url="https://www.instagram.com/reel/..." %}
```

- Local MP4 files under `assets/video/`:

```liquid
{% include mp4.html id="filename.mp4" %}
```

- For lesson companion videos, place the YouTube include near the start of the page body, immediately after front matter or the opening note, unless the lesson has a stronger local placement.

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
  data="https://xn--7dbdbn4b5c.xn--eebf2b.com/assets/pdfjs/web/viewer2.html?file=https%3A%2F%2Fxn--7dbdbn4b5c.xn--eebf2b.com%2Fbagruyot%2Fexample.pdf"
  type="text/html">
  <p>
    אם התצוגה לא נטענת בתוך הדף, פתחו את
    <a href="https://xn--7dbdbn4b5c.xn--eebf2b.com/assets/pdfjs/web/viewer2.html?file=https%3A%2F%2Fxn--7dbdbn4b5c.xn--eebf2b.com%2Fbagruyot%2Fexample.pdf" target="_blank" rel="noopener">viewer2</a>
    או את <a href="{{ '/bagruyot/example.pdf' | relative_url }}">ה-PDF</a>.
  </p>
</object>

</div>
</div>
```
