# Taba student audit repair log

Coordinator: `01a08a05-c798-7db3-867c-ee6afbc0811d` (Improve Taba tutorials).
Student: `01a08a00-2d65-7b50-9256-fced4eb1d573` (Audit Taba tutorials as student).

**Current student working copy: `C:\Temp\taba-student-audit` (native Windows).**
The earlier `/home/stra/repos/taba-student-audit` path is a preserved backup after
the lesson-09 environment repair. Do not edit either copy as coordinator.

**User authorized resumption on 2026-09-10:** after the timestamp comparison
question, the user instructed: “and now unblock the student agent and continue
repairing on him.” Migration timestamps may be mapped for comparison only:
match each generated filename pair and its Migration attribute by migration name
and DbContext, preserving one-to-one correspondence and migration order. All
other source, migration operations, model snapshots and versions must still match.
Report the mapping; never rename student files or change database history to fit
the reference. Continue the sequential audit and repair new substantive blockers.

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
- Resolved: user subsequently instructed the coordinator to unblock the student
  and continue repairs. Narrow timestamp-ID mapping is authorized as described
  above. Retry/resume message sent; await independent student verification.

## 2026-09-10 — lesson 09: false collapsed-line comparison report

- After authorized resumption, the student reported the reference Designer was
  one line while its own file had 47 lines. Direct raw Git-blob inspection disproved
  this: both files have 1474 bytes and 47 LF bytes and match with approved ID/EOL
  mapping. No tutorial or application repair was warranted.
- Added neutral read-only evaluation tooling outside the site:
  `C:\Temp\taba-audit-compare.py`. Run through WSL Python, passing only the current
  lesson, `/mnt/c/Temp/taba-student-audit`, `/home/stra/repos/razortaba`, and
  `--map-migration-ids` for the authorized comparison. It derives the current pin
  from the supplied lesson and preserves raw bytes through subprocess output.
- Scope: RazorTaba, RazorTaba.Core, root .gitignore and tool manifest; exclude
  generated build output/local databases. Student must report any new taught
  project outside this scope. Missing/extra files and all other bytes remain strict.
- 100 reference and 100 student files match, with only the two recorded migration
  path mappings. Eight in-memory checks confirm genuine content/formatting,
  model-snapshot, missing-file and extra-file differences are rejected.
- Sent the student exact invocation to repeat independently, then resume on YES.
  No student files or database history were changed. Await its result.

## 2026-09-10 — lesson 10: reference-only trailing space

- Student passed 09 using the byte-preserving comparison, then reported one
  lesson-10 difference: reference Create.cshtml starts `@page ` while the correct
  lesson snippet and student output start `@page`. Checkpoint `c5215d7`.
- Confirmed all ten checkpoints from 10 through 18 inherited this byte. Created
  corrected checkpoints, removing only that ASCII space in each original snapshot.
  All ten application builds passed. No broad whitespace normalization was added.
- Published `codex/taba-create-page-checkpoints`, latest documentation commit
  `be75204`; existing branches/main/history preserved. Validation worktree now
  uses this branch. Updated current/previous references and all lesson mirrors;
  retained superseded pins in docs/taba-reference-checkpoints.json.
- New 10 pin `74695cb50e2a89e83e455430447e06233becc92d`. Comparator confirms all
  104 reference/student files match, mapping the two migration pairs by authorized
  IDs only. Jekyll and scoped whitespace checks passed.
- Retry sent for independent lesson-10 comparison. Student application/database
  untouched. Await new student report; no duplicate retries.
- 12:47 heartbeat: retry turn `01a08ab1-6d8f-7ae3-ac9b-65485afc2157` was
  completed/idle, but app readers returned no report text. Student HEAD remained
  `c5215d7`, with uncommitted lesson-11 CRUD files. Requested its missing outcome
  once, explicitly without replaying completed work. Await that response rather
  than inferring a pass or editing its project.
- Student response: 10 is **YES** against `74695cb` with the approved mapping.
  Lesson 11 has no valid verdict yet: the student noticed it condensed displayed
  snippets instead of reproducing them. It will redo those from the current
  lesson before building/comparing. This is a self-reported audit execution error,
  not an established tutorial defect; no tutorial repair or repeated retry needed.
- 12:50: the status-response turn ended idle, so sent one explicit instruction
  to perform lesson 11 now from checkpoint c5215d7, correcting its own
  transcription before build/runtime/comparison checks. Confirmed active turn
  01a08ab9-fa0f-7281-a207-16354686a650; wait cursor
  76a32c56-6455-41b8-8f21-48eabc164947:10. Heartbeat remains ACTIVE.

## 2026-09-10 — lessons 11 and 12 pass; continue 13

- 12:57 heartbeat found the 11 retry completed/idle (cursor :11). App readers
  again returned empty items; recovered the student assistant's report from its
  local session transcript, without replaying completed steps.
- Student reports 11 YES: build passes and all 110 scoped files match 5d8e921;
  local checkpoint 18a2175. Reports 12 YES for unchanged application scope at
  0c0c792. Lesson 12 teacher-only assessment/test files are outside that scope;
  this does not establish every personal, paired, remote or runtime exercise.
- Student had read linked lesson 13 but ended merely ready to apply it. Sent one
  concrete continuation instruction to execute 13 and subsequent linked lessons
  until a real NO or completion, and report blockers directly to this task.
- No tutorial defect established or tutorial source edited in this heartbeat.

## 2026-09-10 — lesson 13 passes; continue 13a

- 13:03 heartbeat: turn 01a08ac0-b78f-7393-bfab-fce7f40af15b completed/idle,
  cursor 76a32c56-6455-41b8-8f21-48eabc164947:13. Local session assistant
  report confirms 13 YES: build and 113/113 application files match 29e43eb,
  with six migration-file mappings under the already authorized rule.
- No new NO or tutorial defect reported. Student stopped on its YES report;
  sent one explicit continuation for linked lesson 13a and onward, explaining
  a passing step alone is not a stopping point. No tutorial source edits.

## 2026-09-10 — lesson 13a execution incomplete

- 13:10 heartbeat: turn 01a08ac6-5216-7803-b884-595cab394105 ended after 15s,
  cursor 76a32c56-6455-41b8-8f21-48eabc164947:15. Student explicitly reports
  reading 13a but not beginning its eight displayed files/layout-link change.
  No NO or tutorial defect is established.
- Sent one bounded task to finish 13a edits, build and comparison, requiring a
  concrete result or evidence of an actual execution limit. No source edits by
  coordinator; student constraints remain unchanged.

## 2026-09-10 — lessons 13a and 14 pass; continue 15

- 13:17 heartbeat: turn 01a08acc-3797-77a2-a702-425b697e6d51 completed/idle,
  cursor 76a32c56-6455-41b8-8f21-48eabc164947:17. Recovered assistant report
  from local transcript because compact snapshots omit its text.
- Student reports 13a YES (121 scoped files at b0ae120) and 14 YES (121 at
  5558a52); both builds passed with only established migration-ID mappings.
- Student read linked lesson 15 but did not implement/evaluate it. Sent one
  bounded continuation to complete Identity instructions, local checks and
  comparison, distinguishing unperformed runtime checks from source equality.
  No tutorial defect reported or source repair needed this heartbeat.

## 2026-09-10 — lesson 15 remains in progress

- 13:23 heartbeat: turn 01a08ad2-a3bc-7661-8384-383daf0e30ad completed/idle,
  cursor 76a32c56-6455-41b8-8f21-48eabc164947:19. Student reports packages,
  auth context/configuration, middleware and some account pages implemented.
  Registration/login pages and Identity migration remain; no valid verdict.
- Sent one continuation to finish existing partial work and reach a concrete
  comparison outcome. No new NO, tutorial defect, or coordinator source edit.
- Same heartbeat: initial continuation ended idle after 13s without implementation
  (turn 01a08ad8-19bc-7a90-8d6c-81126dfa9a25). Switched to small bounded
  execution instructions, still using only student-visible lesson snippets.
- Student confirms Register pair written in turn 01a08ad8-a555-7d22-976e-6e03f5062177,
  then Login pair, Logout code-behind and login partial in
  01a08ad9-4b32-7780-8e88-1e484c251f56. Coordinator supplied no implementation.
- Migration/database commands, build and comparison now running in
  01a08ada-08a5-7cf0-a03e-d2113cfb3016; cursor
  76a32c56-6455-41b8-8f21-48eabc164947:26. Await outcome before more dispatch.

## 2026-09-10 — lesson 17: authorization order and corrupt import prefix

- Student advanced through Identity/profile and reported 17 NO at 1109362:
  Keepers/Edit.cshtml.cs followed the lesson's later correction (ownership before
  validation) while the pin retained the earlier ordering; _ViewImports.cshtml
  pin had literal mojibake instead of the original UTF-8 BOM.
- Reproduced exactly those two differences across 140 application files. Both
  defects were inherited by lesson 18. Created corrected source checkpoints,
  changing only those two files per snapshot, with intact prior history:
  17 e5a7ef42c23879040e8c0d2398ecbc722a33ad36 (parent c764eef);
  18 bd465fe90d280abfd3242908fe3d39b12b306c5a (parent new 17).
- Lesson 17 now moves validation after ownership in the main contextual diff;
  replaces the redundant later correction with an explanation/test; the import
  diff preserves existing lines and appends only the blank line and using.
  Updated current/previous pins and historical map for 17/18.
- Both corrected application builds pass, zero warnings/errors. Isolated SQLite
  handler checks pass on both: non-owner valid/invalid -> Forbid, owner invalid
  -> Page without writes, owner valid -> redirect with update, missing record
  -> NotFound. Temporary harness C:\Temp\taba-auth-smoke uses reference worktree,
  never student data. Both displayed diffs reconstruct reference bytes with only
  permitted CRLF normalization. Jekyll build and scoped whitespace checks pass.
- Published codex/taba-authorization-checkpoints and mirror/docs commit c847fdd.
  Documentation differences versus previous mirror head be75204 are confined to
  docs/checkpoints.json and lesson mirrors 17/18. Main/history untouched.
- Coordinator comparator now matches all 140 student/reference files; no
  student source/database edited and no additional comparison normalization.
  Send independent 17 retry; continue to 18 only on student YES.

## 2026-09-10 — sequential student audit complete through lesson 18

- Student's direct completion report: repaired 17 YES at e5a7ef4, clean build,
  140/140 scoped files with no changed/missing/extra files. Existing student
  checkpoint bb013e6 already contained the exact result; no redundant commit.
- Lesson 18 YES at bd465fe, clean build and 141/141 scoped files with no
  differences; student checkpoint 138c7fa. Approved migration-ID and CRLF
  normalization only; source equality is scoped to application files.
- Student runtime check: /Account/Login renders without secrets and hides the
  Google button. No OAuth account/secrets were created and external callback
  remains untested. Earlier personal, paired and remote exercises likewise
  are not established by source matching alone.
- Student did not read the prohibited roadmap/teacher plan. Lesson 18's only
  next link is the prohibited roadmap, so the authorized sequential audit ends.
- Paused repair-taba-student-audit-blockers on completion. Tutorial changes remain
  local/uncommitted and undeployed; corrected companion checkpoints are published.
