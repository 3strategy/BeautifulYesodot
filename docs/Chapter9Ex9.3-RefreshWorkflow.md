# Chapter9Ex9.3 Refresh Workflow (Codex)

This document explains how to refresh `cs2/Chapter9Ex9.3.md` when new bagruyot arrive (typically one new year at a time).

## Purpose

`cs2/Chapter9Ex9.3.md` is now a curated index of:

- CS101 array questions
- CS101 class questions

It excludes:

- Data Structures questions (already indexed in `BeautifulMivney`)
- Graphs / models / assembly tracks
- OOP track ("תמ\"ע") questions

It also checks for class questions using a `private static int` running-ID style pattern and marks `static` only when relevant.

## Source Of Truth / Dependencies

- This repo (BeautifulYesodot): `bagruyot/<year>.<season>.<code>/`
- Sibling repo (BeautifulMivney), used for exclusion parsing:
  - `../BeautifulMivney/bagruyot/index.md` (Data Structures table)
  - `../BeautifulMivney/bagruyot/IndexQuestionsByTopicOOP.md` (OOP table)
- Split exam folders must already contain:
  - `full.pdf`
  - `q1.pdf`, `q2.pdf`, ...
  - `manifest.json` (page mappings)

## Script To Use

- `scripts/chapter9ex93_refresh.py`

This is the reusable version of the original temporary builder script used to create the current tables.

## One-Time Setup (machine / environment)

Install Python dependency:

```powershell
python -m pip install pypdf
```

## Yearly Refresh Procedure

1. Add/split the new bagrut PDFs in `bagruyot/<new-folder>/`.
2. Verify the new folder contains `full.pdf`, `q*.pdf`, and `manifest.json`.
3. If `BeautifulMivney` was updated with new DS/OOP indexes, pull/update that sibling repo first.
4. Run:

```powershell
python scripts/chapter9ex93_refresh.py
```

5. Review the generated page:
   - `cs2/Chapter9Ex9.3.md`
6. Review helper outputs (not intended for commit by default):
   - `tmp_chapter9ex93_generated.md`
   - `tmp_chapter9ex93_candidates.tsv`
   - `tmp_chapter9ex93_static_scan.md`

## Fast Iteration On One New Year (`--year`)

For quick review while adding a new year, use:

```powershell
python scripts/chapter9ex93_refresh.py --year 2026
```

Behavior of `--year`:

- Processes only folders from that year (for example `2026.6.371`, `2026.6.381`, etc.)
- Writes the tmp review files (`tmp_*`)
- Generates `tmp_chapter9ex93_generated.md` for that year subset
- **Does not overwrite** `cs2/Chapter9Ex9.3.md` (safe preview mode)

After you finish adjusting mappings/titles for the new year:

```powershell
python scripts/chapter9ex93_refresh.py
```

Run the full command (without `--year`) before commit so the page is regenerated with all years.

## What The Script Does

High-level flow in `scripts/chapter9ex93_refresh.py`:

- Reads all `bagruyot/*/manifest.json` folders and extracts exact `full.pdf#page=` start pages.
- Extracts text from each `q*.pdf` using `pypdf`.
- Builds exclusion sets by parsing the two sibling `BeautifulMivney` markdown tables.
- Filters out DS / graphs / models / assembly / OOP-track questions.
- Classifies remaining questions into `arrays` / `classes`.
- Applies manual fixes for noisy/legacy split PDFs and known yearly mappings.
- Rewrites the body of `cs2/Chapter9Ex9.3.md` while preserving front matter and the bottom links section.

## Where To Edit When A New Year Arrives

Most new work is in `scripts/chapter9ex93_refresh.py`, usually in these places:

- `allowed_381_questions(...)`
  - Controls which `381` question numbers are even considered CS101 candidates.
- `manual_fixes(...)`
  - Main place for human curation.
  - Contains:
    - explicit exclusions
    - `custom` titles/topics (human-friendly names)
    - `forced_table` classification overrides (`arrays` / `classes`)

For a new exam year:

1. Run the script once.
2. Inspect `tmp_chapter9ex93_candidates.tsv`.
3. Add/adjust entries in `custom` and `forced_table` for the new folder(s), starting from newest year.
4. Run again and confirm table rows/titles are correct.

## Recommended Editing Pattern For New Year

When adding a new year (for example `2026.6.371` or `2026.6.381`):

1. Start with newest year only (`--year YYYY`).
2. Check whether the split `q*.pdf` includes spillover text from neighboring questions.
3. Add explicit entries in `forced_table` and `custom` for the new year.
4. Re-run with `--year YYYY` and validate links/titles in the tmp outputs.
5. Run once without `--year` to regenerate the real page.

This is faster and safer than relying only on automatic heuristics.

## Exclusion Data (Persisted vs Dynamic)

Current behavior:

- Exclusions are **derived dynamically** from `BeautifulMivney` on every run.
- No committed exclusion snapshot is required.

Why this is preferred:

- `BeautifulMivney` remains the source of truth for DS/OOP coverage.
- No duplicate exclusion-maintenance burden in this repo.

If needed later:

- A snapshot JSON can be added, but only if sibling-repo access becomes unreliable.

## Static Search Rule (Important)

The script intentionally uses a strict rule for marking `static`:

- It tries to detect `private static int` in class questions
- And only marks when it looks like a running-ID/counter pattern

This avoids false positives from generic `public static int` helper functions in array/fundamentals questions.

## Validation Checklist Before Commit

- `cs2/Chapter9Ex9.3.md` updated and renders two tables (arrays + classes).
- New rows use `full.pdf#page=` links (not `q*.pdf` links).
- DS/OOP questions are not duplicated from `BeautifulMivney`.
- Graphs/models/assembly/OOP track questions are excluded.
- `static` note is still accurate.
- Front matter title/subtitle/tags still match page scope.

## Notes About Old `899222` Exams

- Split PDFs in older exams sometimes contain partial text from adjacent questions.
- The script uses conservative heuristics plus manual fixes.
- Some `נושא השאלה` labels may remain short/general on purpose unless manually curated.

## Optional Follow-Up Improvements

- Add more manual titles for old `899222` rows (improves readability only).
- Add a snapshot export for exclusions if sibling repo is unavailable during a run.
