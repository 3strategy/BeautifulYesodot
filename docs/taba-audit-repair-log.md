# Taba student audit repair log

Coordinator: `01a08a05-c798-7db3-867c-ee6afbc0811d` (Improve Taba tutorials).
Student: `01a08a00-2d65-7b50-9256-fced4eb1d573` (Audit Taba tutorials as student).

**Current student working copy: `C:\Temp\taba-student-audit` (native Windows).**
The earlier `/home/stra/repos/taba-student-audit` path is a preserved backup after
the lesson-09 environment repair. Do not edit either copy as coordinator.

**Pending user decision:** lesson 09 generates date/time migration IDs. The
coordinator has prepared/verified a narrowly scoped comparison normalization but
has NOT authorized it under the original perfect-match criterion. Do not resume
the student or repeat the question until the user answers. Monitor quietly.

The user authorizes this coordinator to repair reported tutorial defects and request
student retries after validation. Preserve the student's sequential reading and
stop-on-NO constraints. The coordinator edits lessons, not the student project.
Do not change either task's model settings or disclose future steps to the student.

## 2026-09-10 — lesson 01a: missing initial CSS

- Student blocked after `01-first-page` YES and `01a-development-git` NO.
- Last handled blocker turn: `01a08a06-27df-77c0-9987-7c64ac7e6e43`.
- Reference: `979d543d83d7d7c9e4f722b5400c60c4253b78a2` in
  `/home/stra/repos/razortaba`.
- Evidence: the generated `wwwroot/css/site.css` retained template rules. The
  reference contains a comment and an Arial body font rule; the lesson omitted
  any instruction to replace this file.
- Repair: added a visible section before `Program.cs` in
  `taba/01a-development-git.md`, with exact whole-file replacement, a short
  explanation, and a save/refresh check. Removed the file from the hidden list
  of generated infrastructure files.
- Validation: snippet compared successfully with pinned reference; Jekyll build
  passed; generated HTML contains the section and highlighted CSS; scoped
  `git -c core.whitespace=cr-at-eol diff --check` passed.
- Retry sent in turn `01a08a07-8595-7df2-b70b-16d6161fe299`.
- Student result: **YES**. It independently applied the revised lesson, built
  successfully, and compared all 80 reference files with `--ignore-cr-at-eol`:
  zero substantive differences, with remaining raw differences only CRLF/LF.
  It has proceeded to the explicit next link, `taba/02-my-theme.md`.
- Student working copy: `/home/stra/repos/taba-student-audit`.
- Comparison caution: initial report included CRLF/LF differences. Student was
  asked to distinguish those using ignore-CR-at-EOL comparison, retain exact
  substantive differences, and preserve the user's match rule.

Existing unrelated modifications at coordination start: three caption files
under `cs3e/` and `cs3e/classes/Drawing.cs`, `cs3e/classes/Point.cs`. Leave them alone.

Heartbeat `repair-taba-student-audit-blockers` is active every five minutes on the
coordinator task. Student was also asked to send this task new blocker/completion
reports directly. Pause the heartbeat when the audit completes or the user stops it.

## 2026-09-10 — lesson 04: contrast fix missing from checkpoint

- Student passed 02 and 03, then reported 04 NO in the same audit turn
  `01a08a07-8595-7df2-b70b-16d6161fe299`; student checkpoint `87c6c55`.
- The lesson explicitly required a three-line contrast addition, absent from
  pinned commit `98aeb85bf53ca294a7a42f6f9b75eec36f054250`. Its appended diff used
  future Markdown/Mermaid CSS context from late fix `6d9c5e4`.
- Fixed the student instructions to append after `.btn-primary:hover`, with
  matching current-lesson context and a save/refresh/button-target check.
- IMPORTANT: `/home/stra/repos/razortaba/AGENTS.md` explicitly authorizes
  non-destructive Git commits and pushes in the companion repository. This is
  specific to razortaba; BeautifulYesodot remains read-only for Git mutations.
- Created an isolated worktree `/home/stra/repos/razortaba-lesson04-repair` from
  original 04 checkpoint. Applied only the three taught CSS lines, verified
  student CSS equality ignoring CRLF, built successfully, and checked the home
  page and served stylesheet over HTTP. Stopped the temporary server afterward.
- Published corrected commit `e0870b94577d330d3609d697d4a16c8c19c754ab` on new
  branch `codex/taba-04-contrast-checkpoint`. Existing history/main untouched.
- Updated 04 frontmatter and code/compare/correction links to that commit.
  Jekyll and scoped whitespace checks passed. Student independently reported
  **YES**, then stopped at 04a. Last handled turn for this result:
  `01a08a0f-47f2-70e2-8dc4-bf21ed59bd72`.
- Carry-forward issue to check when later lessons are audited: later historical
  checkpoints may also lack this valid contrast rule. Preserve the taught rule;
  repair affected reference checkpoints, without copying future application code
  or weakening comparison. Never repin a lesson to the entire late fix commit.

## 2026-09-10 — lesson 04a: no reference checkpoint

- Student reported NO because the Git lesson had no companion metadata/reference.
  Checkpoint remains `87c6c55`; blocker turn
  `01a08a0f-47f2-70e2-8dc4-bf21ed59bd72`.
- Added pinned checkpoint `fd6683d2c183607a7a808b053c0887256179d66e`, parent
  `e0870b94577d330d3609d697d4a16c8c19c754ab`, and private reference links.
- Clarified that text-editing exercises end by restoring and committing the
  learner's chosen starting text, leaving the application ready for the next step.
- Extended the taught .gitignore to retain the companion repository's local
  secrets/artifact protections alongside the lesson's environment/SQLite rules.
  Tested 14 ignored examples and three source files that must remain included.
- Reference checkpoint changes only .gitignore; application source is identical
  to the already built and HTTP-checked 04 repair. Published on
  `codex/taba-04a-git-checkpoint` using the same repair worktree. No history rewrite.
- Jekyll build and scoped whitespace validation passed. Student reported **YES
  for the declared source checkpoint**: 80 application files plus .gitignore,
  zero substantive differences after EOL normalization. It completed a local
  practice commit and restoration commit, then proceeded to 05-pages-and-forms.
- External GitHub creation/publication, invitations, and remote workflow outcomes
  remain explicitly **unverified**; the source YES does not establish those.
- Mirrored all three repaired lessons (01a, 04, 04a) under companion docs/lessons
  on the 04a repair branch in a separate documentation commit after the code pin.

## 2026-09-10 — lesson 05: inherited reference-chain omission

- Student checkpoint `404186c` passed build but reported 05 NO: old pin `4519e73`
  dropped the valid three-line contrast fix. The 81 application files otherwise
  matched. The student stopped before 05a.
- Inspected the known inherited CSS defect across checkpoint metadata: all 17
  historical snapshots from 05 through 18 lacked it. Repaired that common defect
  together, without pre-solving later student exercises or copying future code
  into an earlier snapshot.
- Created a new chain from corrected 04a: each original snapshot plus exactly
  the taught CSS insertion after `.btn-primary:hover` and the taught .gitignore.
  Verified these are the only two paths differing from each original snapshot,
  and checked each old previous reference matched the preceding application state.
- All 17 corrected checkpoints built with zero warnings and zero errors.
  Build logs: `C:\Temp\taba-build-*.log`; results `C:\Temp\taba-build-results.json`.
- Published branch `codex/taba-audit-checkpoints`; current documentation head
  `760745a`. Main and historical commits remain unchanged.
- Updated each lesson's current/previous pins and reference links. Updated lesson
  06 CSS diff context to preserve the inherited contrast rule before new additions.
  Validated the CSS diff reproduces the corrected reference, and Jekyll/scoped
  whitespace checks passed. Companion lesson mirrors/checkpoints.json synchronized.
- Persistent map: `docs/taba-reference-checkpoints.json` records original and
  corrected commits. Validation worktree: `/home/stra/repos/razortaba-checkpoint-validation`.
- 05 corrected pin: `9e759fba10f1ec17fe4b851ed53e8703d06b644b`. Coordinator checked
  all 82 application-plus-ignore files against the student checkpoint successfully.
  Student subsequently reported 05, 05a and 05b passed; it reached 06.
- Remaining later lesson quality has NOT been certified by these reference builds.
  Continue repairing new substantive student blockers normally. Do not disclose
  future steps or weaken comparison because of the reference-chain repair.

## 2026-09-10 — lesson 06: missing student Mermaid resource

- Student stopped before completing 06 because “copy from attached code” had no
  student-visible attachment; only private reference links existed. It correctly
  refused to source implementation files from the reference project. Its last
  verified 05b checkpoint is `7103c8e`.
- Added `assets/downloads/taba/mermaid-11.17.2.zip`: exactly `mermaid/LICENSE`,
  `mermaid/VERSION.txt`, `mermaid/mermaid.min.js`, byte-identical to the pinned
  third-party files. The MIT license and bundled notices are preserved.
- Added an unconditional lesson download link, Windows/macOS extraction steps,
  target-folder tree, no-double-nesting check, and version check. Clarified that
  `/Guide` is opened only after the subsequent code changes are complete.
- ZIP size 980599 bytes; SHA256
  `ab2cbc25ec34048ced9b80de5574d429888bf11a4e76b74ff9a35432288f43b5`.
- Verified ZIP integrity, exact entries/content, Jekyll build, rendered link
  outside private-link conditions, built asset equality, and scoped whitespace.
- Mirrored lesson 06 on `codex/taba-audit-checkpoints`. The Jekyll site changes
  remain local/uncommitted under its Git restrictions; not deployed to production.
- Retry sent with the lesson-provided resource path; reference pin unchanged.
  Student successfully used the bundle, completed the code, and built; its next
  report found only the project-file formatting difference described below.

## 2026-09-10 — lesson 06: applying project-file changes after NuGet

- Student checkpoint `f61bb7e`; 89 project files, one difference: an extra blank
  line before `</Project>`. It incorrectly attributed that blank to the lesson.
- Coordinator verified that the existing diff's added lines already exactly
  matched the reference. The student had inserted the extra blank while applying
  a whole-file diff after NuGet commands changed the file's starting state.
- Improved the instructions: explicit full-file replacement after the package
  commands, a 17-line final XML block, and a structural/end-of-file check.
  The code content remains identical to the pinned reference; no pin changes.
- Exact snippet comparison, Jekyll build, and whitespace checks passed. Mirrored
  in companion documentation commit `0c68aa6` on `codex/taba-audit-checkpoints`.
- Student subsequently passed 06, 07 and 08 and reached the lesson-09 environment
  blocker below. Last handled result turn: `01a08a20-ade5-7451-b2f6-45d929ad19c8`.

## 2026-09-10 — lesson 09: Windows .NET rejects the UNC tool manifest

- Windows dotnet refused to install EF from the `\\wsl.localhost` audit folder,
  despite Unblock-File. Native WSL has no dotnet. Student correctly identified
  this as an environment limitation, not a tutorial defect or source NO.
- Copied the entire repository to previously absent `C:\Temp\taba-student-audit`,
  including Git history, current edits, generated files and the tool manifest.
  SHA256-verified equality for all 555 files; HEAD remains `924070f`.
- `dotnet tool list --local` succeeds from the Windows copy without trust error.
  The original WSL copy remains untouched as a backup.
- Instructed student to use the Windows folder and native Windows tools for all
  further audit work, retry the documented EF installation, then complete and
  compare lesson 09 independently. Coordinator did not install EF, run migrations,
  or change source/tutorial instructions. Await retry result.

## 2026-09-10 — lesson 09: generated migration timestamps

- Local Windows retry succeeded: EF tool install, migration creation, database
  update. Student checkpoint `3d37e3a`, preserving generated `App.db` outside Git.
- Raw NO: reference migration ID `20260905065453_InitialAnimals`, actual generated
  ID `20260910070957_InitialAnimals`, affecting two filenames and one Designer
  `[Migration(...)]` attribute. No later lesson was read by the student.
- Coordinator compared 100 application/ignore/tool-manifest files after only
  mapping these two paths and this exact attribute ID, plus existing EOL
  normalization. Zero other differences; model snapshot and migration operations
  match exactly. No student source/database mutation was performed.
- Added a learner note in 09 explaining generated timestamps, preserving names,
  the model snapshot, and what is saved in Git. Jekyll/whitespace checks passed.
- Asking the user to approve this narrow comparison normalization rather than
  silently changing the requested perfect-match criterion. Student told to remain
  halted pending the answer; no repeated prompts or retries while pending.
