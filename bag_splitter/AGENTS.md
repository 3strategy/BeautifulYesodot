# PDF → Questions Splitter (Crop-based) – Spec

## Goal

This folder will contain a Python tool that processes PDF exam files inside a folder and **splits them into per question PDFs** by **cropping** page regions (so removed content is also removed from the PDF text layer). For each input PDF, it creates an output folder named after the file (without `.pdf`) and writes `q1.pdf`, `q2.pdf`, …

The tool is designed to be practical for iterative use during test creation and translation workflows:

- Skip irrelevant sections (opening cover page, specific chapters, question ranges).
- Handle questions that **span multiple pages**.
- Auto trim whitespace, header, footer.
- Resume from where it left off, or optionally start over.
- Works on an arbitrary folder path (not necessarily inside the project).

## Non goals

- OCR, image recognition, or "understanding" question content.
- Rewriting, reflowing, or editing PDF content beyond cropping and page assembly.
- Perfect fully automatic segmentation for every exam layout.

## User stories

1. As a teacher, I point the tool at a folder with PDFs and get one folder per file with `q#.pdf` outputs.
2. I can define rules like: skip cover, skip “Chapter X”, skip Q4–Q6.
3. When the tool is run repeatedly, I can either resume (continue with next files) or reset (overwrite outputs).
4. If a question starts at the bottom of a page and continues on the next page, I still get **one** `q#.pdf`.
5. If the PDF has a header/footer, the resulting question PDFs are clean and consistent.
6. I can use “hints” like “start after the string XYZ” to skip a chapter without manual page numbers.
7. You can write test cases that verify expected outputs for a known PDF. an example is q5.pdf under ..\bagruyot\2025.6.371\q5.pdf is a good crop of ..\bagruyot\2025.6.371.pdf.


## Interface choice

**Primary implementation: CLI-first** for fastest delivery and best automation.

Optional later: Tkinter wrapper can be added without changing core logic by calling the CLI module.

## Inputs

### Required

- `--input-dir <path>`: Folder with PDFs to process.
- `--limit <N>`: Max number of PDFs to process in this run.

### Optional

- `--config <path>`: Path to config file (YAML or JSON). Defaults to `<project>/config.yaml`.
- `--mode resume|reset`:
  - `resume` (default): process next unprocessed PDFs.
  - `reset`: reprocess from start and overwrite outputs.
- `--state-file <path>`: Override state file location. Defaults to `<input-dir>/.split_state.json`.
- `--include "glob"`: Include pattern, default `*.pdf`.
- `--exclude "glob"`: Exclude pattern(s), optional.
- `--dry-run`: Print what would happen, do not write PDFs.
- `--verbose`: More logs.

## Outputs

For each `ExamA.pdf` in the folder:

- Create output folder: `<input-dir>/ExamA/`
- Write per question PDFs: `q1.pdf`, `q2.pdf`, …
- Optionally write a manifest file: `<input-dir>/ExamA/manifest.json` containing:
  - source pdf path and hash
  - tool version
  - per question: pages used, crop rectangles (in PDF coordinates), detection method used

## Core behaviors

### 1. Skip opening page

Config supports:

- `skip_first_pages: 1` (default), can be 0+.
- Alternatively, `skip_until_text:` rules (see Hints).

### 2. Skip specific chapter

Two mechanisms:

1. **Text hint based**: “Skip everything from where text `CHAPTER: Geometry` appears until next chapter marker or next question marker.”
2. **Page range based fallback**: If hints fail, allow `skip_pages: [1,2,3]` or `skip_page_ranges: [[5,7]]`.

### 3. Skip question ranges

User may specify:

- `skip_questions: [4,5,6]`
- `skip_question_ranges: [[4,6],[10,12]]`

Important: skipped questions still affect numbering unless `renumber_after_skip: true` is set.

- Default: `renumber_after_skip: true` (so q numbers in outputs are contiguous).
- If false: keep original question numbers (q1, q2, q3, q7...).

### 4. Question spans across two pages

Rules:

- When a question starts on page N and does not end before bottom, continue accumulating regions from page N+1 until an end condition is met.
- End conditions (priority order):
  1. Next question marker detected.
  2. End-of-chapter marker detected.
  3. End-of-document.

Implementation detail: Each question is represented as an ordered list of **cropped page segments** (each segment is a crop rectangle on a specific page). The final `q#.pdf` is assembled by adding those cropped segments as pages.

### 5. Crop top/bottom empty spaces + header/footer

The tool must support two trimming layers:

1. **Static crop margins** (fast, reliable):
   - `crop_top_mm`, `crop_bottom_mm`, `crop_left_mm`, `crop_right_mm`.
2. **Content-based whitespace trim** (optional):
   - Analyze text bounding boxes and/or drawing objects to find tight top/bottom bounds.
   - Keep a small padding `trim_padding_mm`.

If content-based trim fails (e.g., scanned image-only PDF), fall back to static margins.

### 6. Resume where it left off

A state file is stored (default: `<input-dir>/.split_state.json`) containing:

- list of PDFs discovered (stable ordering)
- processed set
- last processed timestamp
- config hash

Resume behavior:

- When run in `resume`, process the next unprocessed PDFs in lexicographic order (or configurable ordering).
- If a processed PDF is missing outputs, it is treated as unprocessed.

### 7. Start over and overwrite previous work

In `reset` mode:

- Clear state file (or mark all as unprocessed).
- For each target PDF:
  - Delete existing output folder `<input-dir>/<pdf_name>/` (or overwrite files inside).
  - Recreate from scratch.

### 8. No rewrite, only crop

The tool must only:

- extract pages or partial page areas via cropping
- assemble those into new PDFs

No text rewriting, re-rendering, or OCR.

### 9. Crop must remove text logically

Cropping must be applied via PDF **CropBox**/page clipping (or equivalent), so removed header/footer text does not remain selectable/searchable in output.

### 10. Use hints: start after a string

The config supports hint rules:

- `start_after_text: "..."` (first occurrence across document)
- `skip_until_text: "..."` (skip all pages until found)
- `chapter_start_text: "..."`, `chapter_end_text: "..."`
- `question_marker_regex: "^שאלה\s+\d+"` (or English variants)

Hints rely on PDF text extraction. If the PDF is image-only, hints may fail. In that case the tool logs a clear warning and uses fallback rules.

## Detection model (how questions are found)

### Preferred: Text-based segmentation

- Extract text blocks with coordinates per page.
- Detect question starts via `question_marker_regex`.
- Compute crop rectangles:
  - For the first page of a question: crop from question-start y down to either next-question y or page bottom.
  - For middle pages: full content area (minus header/footer trimming).
  - For last page: crop from content top to question end y.

### Fallback: Page-based segmentation

If no question markers are detected:

- Use a manual recipe per PDF specified in config:
  - `manual_splits` list of (page_number, y_start, y_end) entries.

### Hybrid

Allow config “overrides” per file:

- `per_file_overrides["ExamA.pdf"]` can specify different regexes, crop margins, skip rules.

## Configuration

### Format

Use YAML by default (`config.yaml`) because it is readable for teachers.

### Schema (high level)

```yaml
global:
  ordering: lexicographic
  skip_first_pages: 1
  renumber_after_skip: true
  crop_margins_mm:
    top: 15
    bottom: 15
    left: 10
    right: 10
  trim_whitespace:
    enabled: true
    padding_mm: 2
  question_detection:
    marker_regexes:
      - "^(?:שאלה|ש\.)\\s*(\\d+)"
      - "^(?:Question)\\s*(\\d+)"
    min_marker_font_size: 0  # optional
  hints:
    start_after_text: null
    skip_until_text: null

skip_rules:
  chapters:
    - name: "Appendix"
      start_text: "נספח"
      end_text: "סוף נספח"
  question_ranges:
    - [4, 6]

per_file:
  "ExamA.pdf":
    skip_first_pages: 2
    hints:
      start_after_text: "פרק ב"  # start after chapter B title
    skip_rules:
      question_ranges:
        - [10, 12]
    crop_margins_mm:
      top: 20
      bottom: 10
```

## Logging and observability

- Console logs with file progress and question counts.
- For each PDF, write `debug.json` (optional flag) with detected markers and bounding boxes.
- If question detection fails, print actionable suggestions:
  - “No markers matched. Try adjusting marker regex or provide per-file manual splits.”

## Error handling

- A broken PDF should not stop the batch.
- Each file produces either outputs or an error report:
  - `<output-folder>/ERROR.txt` with stack trace summary and suggestions.

## Performance expectations

- Should handle typical school PDFs (1–50 pages) quickly.
- Use streaming where possible.
- Avoid rendering pages to images by default.

## Testing

### Philosophy

The tool includes deterministic tests using known sample PDFs stored under `tests/fixtures/`.

### Test types

1. **Unit tests**: config parsing, skip range normalization, state behavior.
2. **Golden tests**: run splitter on a fixture PDF and verify:
   - number of outputs
   - outputs exist and are non-empty
   - per output: expected page count
   - optionally compare extracted text snippets to expected strings

### Test case definition

`tests/cases.yaml`:

```yaml
- name: "ExamA basic split"
  input_pdf: "tests/fixtures/ExamA.pdf"
  args:
    mode: "reset"
    limit: 1
  expect:
    questions: 7
    q1_pages: 1
    q4_pages: 2
    must_contain_text:
      q1: "שאלה 1"
      q4: "שאלה 4"
```

## Proposed implementation approach

### Libraries

- Use a PDF library that supports:
  - text extraction with coordinates
  - page cropping via CropBox
  - writing a new PDF assembled from cropped pages

Candidates:

- `pypdf` (crop boxes, basic text extraction)
- `PyMuPDF` / `fitz` (stronger coordinate extraction, robust)

Preference: **PyMuPDF** for segmentation robustness. If licensing constraints appear, fall back to `pypdf`.

## File structure (simple and adequate)

```text
bag_splitter/
  AGENTS.md
  README.md
  pyproject.toml
  src/
    pdfqs/
      __init__.py
      cli.py
      config.py
      state.py
      split.py
      detect.py
      crop.py
      manifest.py
      util.py
  tests/
    fixtures/
      ExamA.pdf
    cases.yaml
    test_golden.py
    test_unit.py
  config.yaml
```

## CLI examples

```bash
# Run on a sister folder, process next 3 PDFs
python -m pdfqs --input-dir "../bagruyot" --limit 3

# Reset and reprocess first 2 PDFs
python -m pdfqs --input-dir "D:/Tests/ToSplit" --limit 2 --mode reset

# Use a custom config and verbose logs
python -m pdfqs --input-dir "D:/Tests/ToSplit" --limit 5 --config "C:/cfg/split.yaml" --verbose
```

## Operational notes

- The input directory may be anywhere (local drive, network drive). The tool must accept absolute paths.
- If permissions prevent writing into the input folder, support `--output-dir <path>` as an override.

## Acceptance criteria

A build is considered done when:

1. Running on a folder of PDFs creates per-file output folders with `q#.pdf`.
2. `resume` mode correctly skips already processed files.
3. `reset` mode overwrites outputs deterministically.
4. Cropping removes header/footer text from the output PDFs.
5. At least one golden test fixture passes in CI/local test.
6. Clear logs and error reports are produced when detection fails.
