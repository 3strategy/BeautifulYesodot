# Taba 01–12 Hebrew source control

Owner: comparative control agent. Fix owner: root/Hebrew integration agent. Updated: 2026-10-17.

## Scope

Record concrete ambiguities discovered while comparing the Hebrew teaching sequence with English/Russian editions. Keep repairs narrow, beginner-facing and compatible with the later course. This is authoring documentation. It does not certify a fresh-student execution, installed IDE compatibility or live GitHub workflow.

## Findings and repair ToDo

### HE-01 — project name and namespace mismatch

**Status: Resolved — source fix independently reviewed.** Files: `taba/11-razor-layout.md`, package commands and all new C# / Razor excerpts; `taba/12-first-dynamic-page.md`, new page pair.

**Evidence:** Lesson 02 permits arbitrary project names (`RazorPractice`, `GuysRazor`); lesson 06 requires a personal repository name and deliberately allows retaining an existing project name. Lesson 11 commands assume a root containing a folder `RazorTaba`, while the VS Code setup opens the `.csproj` directory directly. New files use `namespace RazorTaba.Pages`, `namespace RazorTaba.Services`, `using RazorTaba.Services`, `@model RazorTaba.Pages.GuideModel` and the service registration `RazorTaba.Services.MarkdownRenderer`. The template's generated `_ViewImports` and `IndexModel` belong to the student's actual namespace. Lesson 12 repeats a fully-qualified `RazorTaba` model.

**Student consequence:** A faithful student with a named project can run package commands in the wrong directory, create a nested `RazorTaba` folder, or introduce inconsistent namespace/model resolution and reach build errors before learning the intended concept.

**Needed fix:** State precisely that `RazorTaba` in these examples is a placeholder. For the learner's chosen project replace that prefix in paths, namespaces, using directives, fully-qualified `@model` names and service registration. Point to the namespace in the existing `Pages/Index.cshtml.cs` to find the actual prefix. Explain creating `Services`/`Content` if absent. Preserve shared sample code, but give an immediately usable command route from the directory containing the student's `.csproj` (commands without a hardcoded project folder), or explicitly describe selecting the actual folder from solution root. Repeat a brief reminder in lesson12 because the page can be entered directly.

**Check:** Trace lesson11 with a VS Code `RazorPractice.csproj` root and a Visual Studio outer solution / inner `NoaCohenRazor` layout. Every affected name and package-command working directory must be unambiguous. Translators port the clarification.

**Resolution evidence:** Root added a lesson11 section locating the actual namespace in existing `Pages/Index.cshtml.cs`, enumerating every replacement and distinguishing editor roots. Lesson12 repeats the short reminder. Commands now run from the actual `.csproj` folder as `dotnet add package ...`, retaining package versions. Root verified the omitted-project behavior against installed .NET10.0.400 command help. Reviewer traced both documented directory layouts against the final prose; no fresh project execution claimed.

### HE-02 — Rider learners lack a Git route

**Status: Resolved — source fix independently reviewed.** File: `taba/06-git-github.md`, before repository-folder / identity steps.

**Evidence:** Lesson02 offers Rider as a full supported setup. Lesson06 describes opening terminals, initializing, committing, publishing, discarding, history, cloning and Pull through only Visual Studio or VS Code; the repository-folder paragraph names only those editors. A Rider student reaches a fork without a matching route.

**Needed fix:** Add one explicit supported route, such as opening the same existing solution/repository folder in VS Code for this Git lesson while retaining Rider for editing/running. Include VS Code installation link if this route is chosen and clarify that opening the folder does not create or replace a project. This avoids unverified new Rider GUI instructions and requires no change to sample code.

**Check:** A student arriving from Rider can select a repository root, configure Git and follow one complete existing branch of every Git operation.

**Resolution evidence:** Before choosing the repository folder, root directs Rider learners through the VS Code Git route, links installation, identifies the existing same repository, and explains opening it neither creates nor replaces the project. The learner can continue all documented VS Code operations while using Rider to edit/run.

### HE-03 — “no unsaved changes” does not mean ready for Pull

**Status: Resolved — source fix independently reviewed.** Files: `taba/08-pages-and-forms.md` through `taba/12-first-dynamic-page.md`, “מתחילים מסונכרנים”.

**Evidence:** The repeated instruction says “בדקו שאין שינוי לא שמור והפעילו Pull”. A saved edit can still be an uncommitted Git change. Lesson06's more precise routine says the previous work should already be in Commit. The later compressed wording can therefore tell a student to Pull over saved pending edits.

**Needed fix:** Ask for saved previous work committed, and no pending changes in Source Control / Git Changes before Pull. Keep the instruction concise and direct students to teacher help on conflicts. No need to introduce advanced Git.

**Check:** The 08–12 reminder agrees with the lesson06 routine and does not equate Save with Commit. Translators port corrected meaning.

**Resolution evidence:** All five source reminders now require previous work saved in files and Commit, no pending changes in Source Control/Git Changes, then Pull. Conflict guidance remains unchanged.

### HE-04 — irrelevant blank-line requirement in project XML

**Status: Resolved — source fix independently reviewed.** File: `taba/11-razor-layout.md`, success note after `.csproj` block.

**Evidence:** The note requires `</ItemGroup>` and `</Project>` on consecutive lines “בלי שורה ריקה ביניהן”. XML permits blank lines; the meaningful requirement is two properly closed ItemGroups inside one Project. This adds a false syntax rule for beginners.

**Needed fix:** Keep the meaningful structure check, remove the blank-line prohibition. Preserve the literal code block.

**Check:** The note verifies both groups and correct closing tags without implying whitespace controls validity.

**Resolution evidence:** Note now checks two ItemGroups inside Project and their closing tags. The inaccurate blank-line prohibition is removed; example XML is unchanged.

## Checks completed and limitations

- Read all 12 numbered source slots, the three lesson02 wrappers, all three setup includes, and `docs/lesson-translations.md`.
- Confirmed reserved07 is intentionally empty, roadmap and 13 are scope boundaries, teacher notes are hidden comments, and shared Hebrew sample code is necessary for later continuity.
- No new source execution, package restore, live GitHub publication, Windows/macOS setup test, browser rendering or full tutorial reproducibility audit has been performed by this reviewer.
- These findings are based on repository source and internal consistency. They do not assert that package versions or external IDE UI are invalid.
