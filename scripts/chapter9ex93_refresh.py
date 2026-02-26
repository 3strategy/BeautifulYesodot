from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from pypdf import PdfReader


REPO_ROOT = Path(__file__).resolve().parent.parent
BAGRUYOT_DIR = REPO_ROOT / "bagruyot"
MIVNEY_DIR = REPO_ROOT.parent / "BeautifulMivney" / "bagruyot"


HE_ARRAY = "\u05de\u05e2\u05e8\u05da"
HE_MATRIX = "\u05de\u05d8\u05e8\u05d9\u05e6\u05d4"
HE_CLASS = "\u05de\u05d7\u05dc\u05e7\u05d4"
HE_CLASSES = "\u05de\u05d7\u05dc\u05e7\u05d5\u05ea"
HE_CTOR = "\u05e4\u05e2\u05d5\u05dc\u05d4 \u05d1\u05d5\u05e0\u05d4"
HE_MODELS = "\u05de\u05d5\u05d3\u05dc\u05d9\u05dd \u05d7\u05d9\u05e9\u05d5\u05d1\u05d9\u05d9\u05dd"
HE_OOP = "\u05ea\u05db\u05e0\u05d5\u05ea \u05de\u05d5\u05e0\u05d7\u05d4 \u05e2\u05e6\u05de\u05d9\u05dd"
HE_ASM = "\u05d0\u05e1\u05de\u05d1\u05dc\u05d9"
HE_TURING = "\u05de\u05db\u05d5\u05e0\u05ea \u05d8\u05d9\u05d5\u05e8\u05d9\u05e0\u05d2"
HE_AUTOMAT = "\u05d0\u05d5\u05d8\u05d5\u05de\u05d8"
HE_GRAPH = "\u05d2\u05e8\u05e3"
HE_ALGO = "\u05d0\u05dc\u05d2\u05d5\u05e8\u05d9\u05ea\u05de\u05d9\u05dd"
HE_KODKOD = "\u05e7\u05d5\u05d3\u05e7\u05d5\u05d3"
HE_PUBLIC_TRANSPORT = "\u05ea\u05d7\u05d1\u05d5\u05e8\u05d4 \u05e6\u05d9\u05d1\u05d5\u05e8\u05d9\u05ea"
HE_PRIVATE_CAR = "\u05e4\u05e8\u05d8\u05d9"


FOLDER_RE = re.compile(r"^(?P<year>\d{4})\.(?P<season>\d+)\.(?P<code>\d+)$")
QFILE_RE = re.compile(r"q(\d+)\.pdf$")


def norm_space(s: str) -> str:
    s = s.replace("\u00a0", " ")
    s = re.sub(r"\s+", " ", s)
    return s.strip()


def first_nonempty_lines(text: str, limit: int = 12) -> list[str]:
    out: list[str] = []
    for raw in text.splitlines():
        line = norm_space(raw)
        if not line:
            continue
        if line in {"/", "/\u05d4\u05de\u05e9\u05da \u05d1\u05e2\u05de\u05d5\u05d3"}:
            continue
        out.append(line)
        if len(out) >= limit:
            break
    return out


def clean_title(text: str) -> str:
    t = norm_space(text)
    t = re.sub(r"^\.?\s*\d+[אב]?\s*", "", t)
    t = re.sub(r"^\d+\s*[-–]\s*", "", t)
    t = t.strip(" .:-")
    return t


def head_text(text: str, chars: int = 1400) -> str:
    return text[:chars]


def parse_markdown_exclusion(md_text: str) -> set[tuple[str, int]]:
    """
    Parse all question links from sibling tables.
    Handles rows with multiple links in one cell (e.g. 205/381 mapped rows).
    """
    ex: set[tuple[str, int]] = set()
    for m in re.finditer(
        r"\[(?P<q>\d+[אב]?)\]\(/bagruyot/(?P<folder>\d{4}\.\d+\.\d+)/full\.pdf#page=\d+\)",
        md_text,
    ):
        q_text = m.group("q")
        q_num_text = re.sub(r"[אב]$", "", q_text)
        try:
            q_num = int(q_num_text)
        except ValueError:
            continue
        ex.add((m.group("folder"), q_num))
    return ex


def extract_question_text(pdf_path: Path) -> str:
    reader = PdfReader(str(pdf_path))
    parts = []
    for page in reader.pages:
        try:
            parts.append(page.extract_text() or "")
        except Exception as exc:  # pragma: no cover - best effort extraction
            parts.append(f" __EXTRACT_ERROR__ {exc} ")
    return "\n".join(parts)


@dataclass
class Row:
    folder: str
    year: int
    season: int
    exam_code: str
    q_file: str
    q_output_num: int
    q_number: int
    start_page: int
    pages_used: list[int]
    text: str
    snippet: str
    ex_ds: bool = False
    ex_oop: bool = False
    is_special: bool = False
    is_array_kw: bool = False
    is_class_kw: bool = False
    table: str | None = None  # "arrays", "classes"
    topic: str = ""
    subject: str = ""
    static_marker: bool = False
    notes: str = ""

    @property
    def link(self) -> str:
        return f"/bagruyot/{self.folder}/full.pdf#page={self.start_page}"


def classify_special(text: str) -> bool:
    if any(k in text for k in (HE_MODELS, HE_OOP, HE_ASM, HE_TURING, HE_AUTOMAT)):
        return True
    # Graphs: avoid false positives on "נתיב תחבורה ציבורית" that uses "גרף" rarely.
    if HE_ALGO in text and (HE_KODKOD in text or HE_GRAPH in text):
        return True
    if HE_GRAPH in text and ("BFS" in text or "DFS" in text or "MST" in text):
        return True
    return False


def classify_ds_topic(text: str) -> bool:
    """
    Data-structures style prompts that should be excluded from the CS101 arrays/classes tables.
    We keep this heuristic conservative and mostly useful for 381 leakage (and rare legacy rows).
    """
    ds_terms = [
        "\u05ea\u05d5\u05e8",  # queue
        "\u05de\u05d7\u05e1\u05e0\u05d9\u05ea",  # stack
        "\u05e9\u05e8\u05e9\u05e8\u05ea",  # linked list
        "\u05d7\u05d5\u05dc\u05d9\u05d4",  # node
        "\u05e2\u05e5",  # tree
        "Queue<",
        "Queue ",
        "Node<",
        "Node ",
        "BinNode",
        "PriorQueue",
    ]
    hits = sum(1 for t in ds_terms if t in text)
    return hits >= 1


def allowed_381_questions(folder: str) -> set[int]:
    """
    CS101-relevant block in 381 is the early questions only.
    2024 (newer format) still has a CS101 q7 before the specialty tracks begin.
    """
    if folder == "2024.6.381":
        return {1, 2, 3, 7}
    if folder == "2021.6.381":
        return {1, 2, 3}  # q3 later excluded by sibling DS table
    # All other 381 exams in this repo: keep only q1-q3 and let other filters remove false positives.
    return {1, 2, 3}


def classify_keywords(text: str) -> tuple[bool, bool]:
    has_array = any(
        k in text
        for k in (
            HE_ARRAY,
            HE_MATRIX,
            "int[]",
            "int []",
            "double[]",
            "char[]",
            "char []",
            "String[]",
            "String []",
        )
    )
    has_class = any(
        k in text
        for k in (
            HE_CLASS,
            HE_CLASSES,
            HE_CTOR,
            "public class ",
            "class ",
            "extends ",
            "interface ",
            "set/Get",
            "get/Get",
            "פעולה פנימית",
        )
    )
    return has_array, has_class


def pick_topic_subject(row: Row) -> tuple[str, str]:
    text = row.text
    head = head_text(text)
    lines = first_nonempty_lines(text, limit=20)
    snippet = row.snippet

    # Topic
    if row.table == "arrays":
        topic = HE_ARRAY if HE_ARRAY in text else ("\u05de\u05d8\u05e8\u05d9\u05e6\u05d4" if HE_MATRIX in text else "\u05de\u05e2\u05e8\u05db\u05d9\u05dd")
    else:
        # Distinguish if this is a "class + array of objects" style question.
        if HE_ARRAY in text or "[]" in text:
            topic = f"{HE_CLASSES} + {HE_ARRAY}"
        else:
            topic = HE_CLASSES if HE_CLASS in text or HE_CLASSES in text else HE_CLASS

    # Subject heuristic (ordered)
    candidates: list[str] = []

    # 0) Strong prompt openings in Hebrew (better than random identifiers).
    if row.table == "arrays":
        for pat in [
            r"((?:\u05ea\u05ea[-\u05be])?\u05de\u05e2\u05e8\u05da[^\.:\n]{0,120})",
            r"(\u05de\u05d8\u05e8\u05d9\u05e6\u05d4[^\.:\n]{0,120})",
        ]:
            m = re.search(pat, head)
            if m:
                candidates.append(m.group(1))
    elif row.table == "classes":
        for pat in [
            r"(?:\u05e0\u05ea\u05d5\u05e0\u05d4|\u05d4\u05d5\u05d2\u05d3\u05e8\u05d4)\s+\u05de\u05d7\u05dc\u05e7\u05d4(?:\s+\u05d1\u05e9\u05dd)?\s+([A-Za-z_][A-Za-z0-9_]*)",
            r"public class\s+([A-Za-z_][A-Za-z0-9_]*)",
        ]:
            m = re.search(pat, head)
            if m:
                candidates.append(m.group(1))

    # 1) Quoted term definitions often contain the question concept.
    for m in re.finditer(r"[\u201c\"]([^\"\u201d]{2,80})[\u201d\"]", text):
        val = clean_title(m.group(1))
        if val and not re.search(r"^[A-Za-z]$", val):
            candidates.append(val)

    # 2) Class declarations / "נתונה המחלקה X"
    for m in re.finditer(
        r"(?:\u05e0\u05ea\u05d5\u05e0\u05d4\s+\u05d4\u05de\u05d7\u05dc\u05e7\u05d4|public class)\s*([A-Za-z_][A-Za-z0-9_]*)",
        text,
    ):
        name = m.group(1)
        if name:
            candidates.append(name)

    # 3) Function names in prompt
    for m in re.finditer(r"\b([A-Za-z_][A-Za-z0-9_]*)\s*\(", text):
        name = m.group(1)
        if name.lower() in {
            "main",
            "write",
            "read",
            "print",
            "println",
            "scanner",
            "math",
            "system",
            "console",
            "if",
            "for",
            "while",
            "return",
        }:
            continue
        candidates.append(name)

    # 4) First informative line.
    for line in lines:
        if any(skip in line for skip in ("מדעי המחשב", "המשך בעמוד", "נקודות", "פרק")):
            continue
        if len(line) >= 6:
            candidates.append(line)
            break

    # Normalize / dedupe while preserving order.
    seen: set[str] = set()
    cleaned: list[str] = []
    for c in candidates:
        c = clean_title(c)
        c = norm_space(c)
        if not c:
            continue
        c = re.sub(r"^(נתונה|לפניכם)\s+", "", c)
        c = c.strip()
        if c in seen:
            continue
        seen.add(c)
        cleaned.append(c)

    subject = ""

    # Prefer richer candidates with Hebrew/English identifiers over single words.
    for c in cleaned:
        if len(c) < 2:
            continue
        if row.table == "arrays":
            if any(k in c for k in (HE_ARRAY, HE_MATRIX)):
                subject = c
                break
            if re.search(r"\b(arr|matrix|sort|sum|max|min|shuffle|filter|digits?)\b", c, re.I):
                subject = c
                break
        else:
            if re.search(r"[A-Za-z]", c) and (HE_CLASS in snippet or "class" in snippet.lower()):
                subject = c
                break
            if HE_CLASS in c or HE_CLASSES in c:
                subject = c
                break

    if not subject and cleaned:
        subject = cleaned[0]

    # Final cleanup to avoid giant extracted paragraphs.
    subject = re.split(r"(?<=[\.\!\?])\s", subject, maxsplit=1)[0]
    subject = subject[:120].rstrip(" ,;:")

    bad_exact = {
        "",
        "\u05d4\u05e9\u05d0\u05dc\u05d5\u05ea",
        "\u05d4 \u05e9 \u05d0 \u05dc \u05d5 \u05ea",
        "\u05d1\u05d4\u05e6\u05dc\u05d7\u05d4",
        "public",
        "new",
        "yes",
        "no",
        "max",
        "k",
        "do",
    }
    if subject in bad_exact or re.fullmatch(r"[A-Za-z]{1,3}", subject or ""):
        subject = ""

    if not subject:
        if row.table == "arrays":
            if "maxArr" in head or "MaxArr" in head:
                subject = "MaxArr"
            elif "sumArr" in head or "SumArr" in head:
                subject = "sumArr"
            elif "DUP" in head:
                subject = "DUP"
            elif HE_MATRIX in head or "\u05de\u05e2\u05e8\u05da \u05d3\u05d5" in head:
                subject = "\u05e9\u05d0\u05dc\u05ea \u05de\u05e2\u05e8\u05da \u05d3\u05d5-\u05de\u05de\u05d3\u05d9"
            elif HE_ARRAY in head:
                subject = "\u05e9\u05d0\u05dc\u05ea \u05de\u05e2\u05e8\u05da"
        elif row.table == "classes":
            m = re.search(r"(?:\u05e0\u05ea\u05d5\u05e0\u05d4|\u05d4\u05d5\u05d2\u05d3\u05e8\u05d4)\s+\u05de\u05d7\u05dc\u05e7\u05d4(?:\s+\u05d1\u05e9\u05dd)?\s+([A-Za-z_][A-Za-z0-9_]*)", head)
            if m:
                subject = m.group(1)
            else:
                m = re.search(r"public class\s+([A-Za-z_][A-Za-z0-9_]*)", head)
                if m:
                    subject = m.group(1)
                elif HE_CLASS in head or HE_CLASSES in head:
                    subject = "\u05e9\u05d0\u05dc\u05ea \u05de\u05d7\u05dc\u05e7\u05d5\u05ea"

    return topic, subject or ("?" if row.table is None else ("\u05e9\u05d0\u05dc\u05ea " + (HE_ARRAY if row.table == "arrays" else HE_CLASSES)))


def infer_table(row: Row) -> str | None:
    text = row.text
    head = head_text(text)
    if row.is_special or row.ex_ds or row.ex_oop:
        return None

    if row.exam_code == "381":
        # Prevent leakage from DS + specialty-track questions.
        if row.q_number not in allowed_381_questions(row.folder):
            return None

    array_kw, class_kw = row.is_array_kw, row.is_class_kw

    # Strong class indicators
    strong_class = (
        f"\u05e0\u05ea\u05d5\u05e0\u05d4 {HE_CLASS}" in head
        or HE_CTOR in head
        or "public class " in head
        or "extends " in head
    )
    if strong_class:
        return "classes"

    # For 371 question 4-5 are class questions in recent exams; q1-3 are fundamentals; q6 often numeric.
    if row.exam_code == "371":
        if row.q_number in (4, 5):
            return "classes"
        if row.q_number in (1, 2, 3, 6):
            # include only explicit arrays to keep focus
            return "arrays" if array_kw else None

    # 381: exclude DS/OOP/special tracks already. Remaining CS101 often arrays/classes.
    if row.exam_code == "381":
        if strong_class or (class_kw and not row.ex_oop):
            return "classes"
        if array_kw:
            return "arrays"
        return None

    # 222 legacy: keyword-based only (to keep scope to arrays/classes as requested).
    if row.exam_code == "222":
        # Legacy split PDFs sometimes include spillover from the next question.
        # Decide by the beginning of the question only.
        h = head
        strong_legacy_class = (
            f"\u05e0\u05ea\u05d5\u05e0\u05d4 {HE_CLASS}" in h
            or "\u05d4\u05d5\u05d2\u05d3\u05e8\u05d4 \u05de\u05d7\u05dc\u05e7\u05d4" in h
            or "public class " in h
            or HE_CTOR in h
        )
        strong_legacy_array = (
            "\u05e0\u05ea\u05d5\u05df \u05de\u05e2\u05e8\u05da" in h
            or "\u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05e9\u05e0\u05d9 \u05de\u05e2\u05e8\u05db\u05d9\u05dd" in h
            or "\u05de\u05e2\u05e8\u05da \u05d3\u05d5" in h
            or "\u05de\u05e2\u05e8\u05da \u05d7\u05d3" in h
            or HE_MATRIX in h
        )
        if strong_legacy_class or (class_kw and (HE_CLASS in h or "class " in h.lower())):
            return "classes"
        if strong_legacy_array or (array_kw and HE_ARRAY in h):
            return "arrays"
        return None

    return None


def season_label(folder: str) -> str:
    year, season, code = folder.split(".")
    if season == "6":
        return year
    if season == "5":
        return f"{year}\u05d1"
    if season == "8":
        return f"{year}\u05d1"
    return f"{year}.{season}"


def exam_code_label(code: str) -> str:
    return f"899{code}"


def build_rows(year_filter: int | None = None) -> list[Row]:
    md_ds = (MIVNEY_DIR / "index.md").read_text(encoding="utf-8")
    md_oop = (MIVNEY_DIR / "IndexQuestionsByTopicOOP.md").read_text(encoding="utf-8")
    ex_ds = parse_markdown_exclusion(md_ds)
    ex_oop = parse_markdown_exclusion(md_oop)

    rows: list[Row] = []

    folders = [p for p in BAGRUYOT_DIR.iterdir() if p.is_dir() and FOLDER_RE.match(p.name)]
    if year_filter is not None:
        folders = [p for p in folders if int(p.name.split(".")[0]) == year_filter]
    folders.sort(
        key=lambda p: tuple(int(x) for x in p.name.split(".")),
        reverse=True,
    )

    for folder in folders:
        manifest_path = folder / "manifest.json"
        if not manifest_path.exists():
            continue

        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        qmap = {q["output_name"]: q for q in manifest.get("questions", [])}
        m = FOLDER_RE.match(folder.name)
        assert m is not None
        year = int(m.group("year"))
        season = int(m.group("season"))
        code = m.group("code")

        qpdfs = sorted(
            folder.glob("q*.pdf"),
            key=lambda p: int(QFILE_RE.match(p.name).group(1)),  # type: ignore[union-attr]
        )
        for qpdf in qpdfs:
            qinfo = qmap.get(qpdf.name)
            if not qinfo:
                continue
            q_output_num = int(QFILE_RE.match(qpdf.name).group(1))  # type: ignore[union-attr]
            q_number = int(qinfo.get("original_number", qinfo.get("output_number", q_output_num)))
            pages_used = [int(p) for p in (qinfo.get("pages_used") or [])]
            start_page = min(pages_used) if pages_used else int(qinfo["segments"][0]["page"])
            text = extract_question_text(qpdf)
            snippet = norm_space(text)[:1200]
            row = Row(
                folder=folder.name,
                year=year,
                season=season,
                exam_code=code,
                q_file=qpdf.name,
                q_output_num=q_output_num,
                q_number=q_number,
                start_page=start_page,
                pages_used=pages_used,
                text=text,
                snippet=snippet,
            )
            row.ex_ds = (row.folder, row.q_number) in ex_ds
            row.ex_oop = (row.folder, row.q_number) in ex_oop
            h = head_text(text)
            row.is_special = classify_special(h)
            row.is_array_kw, row.is_class_kw = classify_keywords(h)
            row.static_marker = bool(
                re.search(r"\bprivate\s+static\s+int\b", text)
                and re.search(r"\b(count|id|serial|next)\b", text, flags=re.I)
            )
            row.table = infer_table(row)
            if row.table:
                row.topic, row.subject = pick_topic_subject(row)
            rows.append(row)

    return rows


def manual_fixes(rows: list[Row]) -> None:
    """
    Hand-tuned corrections for readability and false positives.
    Keep this list short and only where heuristics produce noisy titles/classification.
    """

    # Explicit exclusions: fundamentals without arrays/classes despite generic "class" keywords in preface or helper code.
    for key in [
        ("2025.6.371", 3),
        ("2025.6.371", 6),
        ("2024.6.371", 6),
        ("2023.6.371", 6),
    ]:
        for r in rows:
            if (r.folder, r.q_number) == key:
                r.table = None

    # 2023/2024/2025 371 manual titles
    custom = {
        ("2025.6.371", 1): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "What - \u05de\u05e2\u05e7\u05d1 \u05e2\u05dc \u05e4\u05e2\u05d5\u05dc\u05d4 \u05e2\u05dc \u05de\u05e2\u05e8\u05da"),
        ("2025.6.371", 2): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "Arrange - \u05e1\u05d9\u05d3\u05d5\u05e8 \u05d7\u05d9\u05d5\u05d1\u05d9\u05d9\u05dd/\u05e9\u05dc\u05d9\u05dc\u05d9\u05d9\u05dd \u05d1\u05de\u05e2\u05e8\u05da"),
        ("2025.6.371", 4): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "Transport - \u05d4\u05e1\u05e2\u05d5\u05ea \u05dc\u05d1\u05d9\u05ea \u05e1\u05e4\u05e8"),
        ("2025.6.371", 5): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "User / SocialNetwork - \u05d7\u05d1\u05e8\u05d9\u05dd \u05de\u05e9\u05d5\u05ea\u05e4\u05d9\u05dd"),
        ("2024.6.371", 1): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "\u05de\u05e2\u05e7\u05d1 \u05e2\u05dc \u05e4\u05e2\u05d5\u05dc\u05d4 \u05e2\u05dc \u05de\u05e2\u05e8\u05da"),
        ("2024.6.371", 2): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "\u05de\u05e2\u05e8\u05da \u05e1\u05d9\u05e1\u05de\u05d0\u05d5\u05ea"),
        ("2024.6.371", 3): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "\u05de\u05e2\u05e8\u05da \u05de\u05e2\u05d5\u05e8\u05d1\u05dc (\u05d0\u05ea\u05d7\u05d5\u05dc/\u05e2\u05e8\u05d1\u05d5\u05dc)"),
        ("2024.6.371", 4): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea", "TourPackage - \u05d7\u05d1\u05d9\u05dc\u05ea \u05e1\u05dc\u05d5\u05dc\u05e8 \u05dc\u05d8\u05e1\u05d9\u05dd"),
        ("2024.6.371", 5): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "Lesson - \u05de\u05e2\u05e8\u05da \u05e9\u05d9\u05e2\u05d5\u05e8\u05d9\u05dd \u05d1\u05d9\u05d5\u05dd \u05dc\u05d9\u05de\u05d5\u05d3\u05d9\u05dd"),
        ("2023.6.371", 1): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "\u05de\u05e2\u05e7\u05d1 \u05e2\u05dc \u05e4\u05e2\u05d5\u05dc\u05d4 \u05e2\u05dc \u05de\u05e2\u05e8\u05da"),
        ("2023.6.371", 2): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "\u05de\u05e9\u05d7\u05e7 \u05e7\u05dc\u05d9\u05e2\u05d4 \u05dc\u05de\u05d8\u05e8\u05d4"),
        ("2023.6.371", 3): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "\u05de\u05d5\u05e2\u05e6\u05ea \u05d4\u05e2\u05d9\u05e8"),
        ("2023.6.371", 4): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "\u05de\u05e2\u05e8\u05db\u05d9 \u05e4\u05d5\u05d0\u05d4 / \u05de\u05d5\u05d1\u05d9\u05dc\u05d4"),
        ("2023.6.371", 5): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "\u05de\u05d0\u05d2\u05e8 \u05de\u05d7\u05e9\u05d1\u05d9\u05dd - Computer"),
    }

    # 381 manual map (q1-q3 and 2024 q7) + additional recent fixes
    custom.update(
        {
            ("2024.6.381", 1): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "BiggestSum - \u05d4\u05e1\u05db\u05d5\u05dd \u05d4\u05d2\u05d3\u05d5\u05dc \u05d1\u05d9\u05df \u05e9\u05e0\u05d9 \u05d0\u05e4\u05e1\u05d9\u05dd"),
            ("2024.6.381", 2): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "Member / Committee - \u05e9\u05d9\u05d1\u05d5\u05e5 \u05d7\"\u05db\u05d9\u05dd \u05d1\u05d5\u05d5\u05e2\u05d3\u05d5\u05ea"),
            ("2024.6.381", 3): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "\u05de\u05e2\u05e8\u05da \u05de\u05db\u05d5\u05e0\u05d5\u05ea \u05dc\u05d9\u05d9\u05e6\u05d5\u05e8 \u05d1\u05e8\u05d2\u05d9\u05dd"),
            ("2024.6.381", 7): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "BusStation - \u05ea\u05d7\u05e0\u05d5\u05ea \u05d0\u05d5\u05d8\u05d5\u05d1\u05d5\u05e1 \u05d1\u05e2\u05d9\u05e8"),
            ("2023.6.381", 1): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "\u05de\u05e2\u05e8\u05da \u05de\u05de\u05d5\u05d9\u05df \u05d1\u05d7\u05d9\u05d5\u05d1\u05d9\u05d9\u05dd"),
            ("2023.6.381", 2): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "\u05de\u05e2\u05e8\u05da \u05d4\u05e4\u05e8\u05e9\u05d9\u05dd"),
            ("2023.6.381", 3): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "CarInfo / CameraInfo - \u05de\u05e6\u05dc\u05de\u05d5\u05ea \u05ea\u05e0\u05d5\u05e2\u05d4"),
            ("2022.6.381", 1): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "Multiply - \u05db\u05e4\u05dc \u05d0\u05d9\u05d1\u05e8\u05d9 \u05e9\u05e0\u05d9 \u05de\u05e2\u05e8\u05db\u05d9\u05dd"),
            ("2022.6.381", 2): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "\u05de\u05e2\u05e8\u05da \u05de\u05d5\u05e9\u05dc\u05dd (\u05e1\u05e8\u05d9\u05e7\u05d4 \u05dc\u05e4\u05d9 \u05ea\u05d0\u05d9\u05dd)"),
            ("2022.6.381", 3): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "Pixel - \u05e6\u05d1\u05e2\u05d9 \u05e4\u05d9\u05e7\u05e1\u05dc"),
            ("2021.6.381", 1): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "Filter - \u05de\u05e1\u05e0\u05df \u05e2\u05e8\u05db\u05d9 \u05de\u05e2\u05e8\u05da"),
            ("2021.6.381", 2): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "Subject / ReportCard - \u05ea\u05e2\u05d5\u05d3\u05ea \u05ea\u05dc\u05de\u05d9\u05d3"),
            ("2021.5.381", 1): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "\u05de\u05d7\u05e8\u05d5\u05d6\u05ea \u05db\u05e4\u05d5\u05dc\u05d4"),
            ("2021.5.381", 2): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "PairOfNums - \u05d6\u05d5\u05d2 \u05e1\u05d5\u05e3-\u05d4\u05ea\u05d7\u05dc\u05d4"),
            ("2021.5.381", 3): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "\u05de\u05e2\u05e8\u05da \u05e4\u05d9\u05e0\u05d4 (\u05d3\u05d5-\u05de\u05de\u05d3\u05d9)"),
            ("2020.6.381", 1): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "Above - \u05d0\u05d9\u05e0\u05d3\u05e7\u05e1 \u05e8\u05d0\u05e9\u05d5\u05df \u05e9\u05e1\u05db\u05d5\u05dd \u05de\u05e7\u05d3\u05d9\u05dd \u05d2\u05d3\u05d5\u05dc \u05de-num"),
            ("2020.6.381", 2): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "Weight / AllWeights - \u05de\u05e9\u05e7\u05dc\u05d9\u05dd"),
            ("2020.6.381", 3): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "Room / Hostel - \u05d4\u05d6\u05de\u05e0\u05ea \u05d7\u05d3\u05e8\u05d9\u05dd"),
            ("2020.5.381", 1): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea", "Pencil - \u05de\u05d9\u05de\u05d5\u05e9 \u05d5\u05de\u05e2\u05e7\u05d1"),
            ("2020.5.381", 2): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "Doctor - \u05d3\u05d9\u05e8\u05d5\u05d2 \u05e8\u05d5\u05e4\u05d0\u05d9\u05dd"),
            ("2020.5.381", 3): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "\u05d0\u05d9\u05d1\u05e8 \u05e9\u05d5\u05d5\u05d9\u05d5\u05df / \u05de\u05e2\u05e8\u05da \u05e9\u05d5\u05d5\u05d9\u05d5\u05e0\u05d9"),
            ("2019.6.381", 1): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "Exact - \u05e1\u05e4\u05d9\u05e8\u05ea \u05de\u05d7\u05e8\u05d5\u05d6\u05d5\u05ea \u05d1\u05d0\u05d5\u05e8\u05da num"),
            ("2019.6.381", 2): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "Flashlight - \u05e9\u05dc\u05d5\u05e9\u05d4 \u05e4\u05e0\u05e1\u05d9\u05dd"),
            ("2019.6.381", 3): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "Car / AllCars - \u05de\u05db\u05d5\u05e0\u05d9\u05d5\u05ea \u05de\u05e9\u05d5\u05de\u05e9\u05d5\u05ea"),
            ("2018.6.381", 1): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "AllNumbers - \u05d4\u05de\u05e1\u05e4\u05e8 \u05d4\u05d0\u05d9-\u05d6\u05d5\u05d2\u05d9 \u05d4\u05d0\u05d7\u05e8\u05d5\u05df"),
            ("2018.6.381", 2): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "Vote - \u05d4\u05d6\u05d5\u05db\u05d4 \u05d1\u05de\u05e6\u05e2\u05d3"),
            ("2018.6.381", 3): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "Time / Flight / Airport - \u05d8\u05d9\u05e1\u05d5\u05ea Sky"),
            ("2017.6.381", 1): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "Big - \u05d0\u05d9\u05e0\u05d3\u05e7\u05e1 \u05d4\u05e2\u05e8\u05da \u05d4\u05d2\u05d3\u05d5\u05dc \u05d1\u05de\u05e2\u05e8\u05da"),
            ("2017.6.381", 2): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "Game / Country - \u05de\u05e9\u05d7\u05e7\u05d9\u05dd \u05d5\u05de\u05d3\u05d9\u05e0\u05d5\u05ea"),
            ("2017.6.381", 3): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "\u05de\u05e2\u05e7\u05d1 \u05de\u05e2\u05e8\u05da a (\u05d4\u05d3\u05e4\u05e1\u05ea \u05de\u05e1\u05e4\u05e8\u05d9\u05dd \u05e8\u05d0\u05e9\u05d5\u05e0\u05d9\u05d9\u05dd)"),
            ("2016.8.381", 1): ("\u05de\u05e2\u05e8\u05db\u05d9\u05dd", "\u05e1\u05db\u05d5\u05dd \u05d0\u05d9\u05d1\u05e8\u05d9 \u05de\u05e2\u05e8\u05da \u05d4\u05e7\u05d8\u05e0\u05d9\u05dd \u05de-num"),
            ("2016.8.381", 2): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea", "A - ToString / Add"),
            ("2016.8.381", 3): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea", "Button - \u05db\u05e4\u05ea\u05d5\u05e8"),
            ("2016.6.381", 1): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "Student - \u05de\u05de\u05d5\u05e6\u05e2 \u05e6\u05d9\u05d5\u05e0\u05d9\u05dd"),
            ("2016.6.381", 2): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea", "Actor - \u05e9\u05d7\u05e7\u05df"),
            ("2016.6.381", 3): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "TvProgram / TvWeek - \u05ea\u05db\u05e0\u05d9\u05d5\u05ea \u05d4\u05e9\u05d1\u05d5\u05e2"),
            # Additional 371 cleanup
            ("2023.6.371", 4): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "Results - \u05d6\u05de\u05e0\u05d9 \u05e9\u05d7\u05d9\u05d9\u05d4 (\u05e9\u05d9\u05e4\u05d5\u05e8/\u05d4\u05e8\u05e2\u05d4)"),
            ("2023.6.371", 5): ("\u05de\u05d7\u05dc\u05e7\u05d5\u05ea + \u05de\u05e2\u05e8\u05da", "MyTime / Parking - \u05d7\u05e0\u05d9\u05d5\u05df"),
        }
    )

    forced_table = {
        ("2024.6.381", 1): "arrays",
        ("2024.6.381", 2): "classes",
        ("2024.6.381", 3): "arrays",
        ("2024.6.381", 7): "classes",
        ("2023.6.381", 1): "arrays",
        ("2023.6.381", 2): "arrays",
        ("2023.6.381", 3): "classes",
        ("2022.6.381", 1): "arrays",
        ("2022.6.381", 2): "arrays",
        ("2022.6.381", 3): "classes",
        ("2021.6.381", 1): "arrays",
        ("2021.6.381", 2): "classes",
        ("2021.5.381", 1): "arrays",
        ("2021.5.381", 2): "classes",
        ("2021.5.381", 3): "arrays",
        ("2020.6.381", 1): "arrays",
        ("2020.6.381", 2): "classes",
        ("2020.6.381", 3): "classes",
        ("2020.5.381", 1): "classes",
        ("2020.5.381", 2): "classes",
        ("2020.5.381", 3): "arrays",
        ("2019.6.381", 1): "arrays",
        ("2019.6.381", 2): "classes",
        ("2019.6.381", 3): "classes",
        ("2018.6.381", 1): "classes",
        ("2018.6.381", 2): "classes",
        ("2018.6.381", 3): "classes",
        ("2017.6.381", 1): "arrays",
        ("2017.6.381", 2): "classes",
        ("2017.6.381", 3): "arrays",
        ("2016.8.381", 1): "arrays",
        ("2016.8.381", 2): "classes",
        ("2016.8.381", 3): "classes",
        ("2016.6.381", 1): "classes",
        ("2016.6.381", 2): "classes",
        ("2016.6.381", 3): "classes",
        # 371 recent manual classification
        ("2025.6.371", 1): "arrays",
        ("2025.6.371", 2): "arrays",
        ("2025.6.371", 4): "classes",
        ("2025.6.371", 5): "classes",
        ("2024.6.371", 1): "arrays",
        ("2024.6.371", 2): "arrays",
        ("2024.6.371", 3): "arrays",
        ("2024.6.371", 4): "classes",
        ("2024.6.371", 5): "classes",
        ("2023.6.371", 1): "arrays",
        ("2023.6.371", 2): "arrays",
        ("2023.6.371", 3): "classes",
        ("2023.6.371", 4): "classes",
        ("2023.6.371", 5): "classes",
    }

    # Mark clearly out-of-scope OOP-like questions that slipped through keyword classification.
    for r in rows:
        if r.exam_code == "381" and r.table == "classes":
            # 381 later questions in OOP tracks should already be excluded via sibling map,
            # but keep a heading-based safety net.
            if any(k in r.text for k in (HE_OOP, HE_MODELS, HE_ASM)):
                r.table = None

    for r in rows:
        key = (r.folder, r.q_number)
        if key in forced_table:
            r.table = forced_table[key]
        if key in custom:
            r.topic, r.subject = custom[key]


def add_static_notes(rows: list[Row]) -> None:
    for r in rows:
        if r.table != "classes":
            continue
        if r.static_marker:
            r.notes = "static"


def build_markdown(rows: list[Row]) -> str:
    kept = [r for r in rows if r.table in {"arrays", "classes"}]
    arrays = sorted(
        [r for r in kept if r.table == "arrays"],
        key=lambda r: (r.year, r.season, int(r.exam_code), r.q_number),
        reverse=True,
    )
    classes = sorted(
        [r for r in kept if r.table == "classes"],
        key=lambda r: (r.year, r.season, int(r.exam_code), r.q_number),
        reverse=True,
    )

    static_count = sum(1 for r in classes if r.notes == "static")

    def table_block(title: str, rows_: list[Row]) -> str:
        out = [f"## {title}", "", "{: .table-he}", ""]
        out.append("| שנה | שאלון מס' | מס' שאלה | נושא | נושא השאלה |")
        out.append("|-----|----------|----------|------|------------|")
        for r in rows_:
            year_label = season_label(r.folder)
            exam_label = exam_code_label(r.exam_code)
            q_link = f"[{r.q_number}]({r.link})"
            topic = r.topic
            subject = r.subject
            if r.notes == "static":
                subject = f"{subject} (`static`)"
            out.append(f"| {year_label} | {exam_label} | {q_link} | {topic} | {subject} |")
        out.append("")
        return "\n".join(out)

    note_lines = [
        "{: .box-note}",
        "טבלת שאלות בגרות לפי נושא לתרגול מערכים/מחלקות (CS101), עם קישורים לעמוד השאלה בתוך `full.pdf`.",
        "",
        "- שאלות שמופיעות כבר בטבלת **מבני נתונים** הושמטו.",
        "- שאלות ממסלולי **אלגוריתמים בגרפים / מודלים חישוביים / אסמבלי / תמ\"ע** הושמטו.",
        "- סימון `static` מופיע רק אם נמצאה בשאלת מחלקות הופעה של `private static int` (או מונה מזהים רץ דומה).",
    ]
    if static_count == 0:
        note_lines.append("- בבדיקה הנוכחית לא נמצאה שאלת מחלקות עם `private static int` בסגנון מונה מזהים רץ.")

    return "\n".join(
        [
            "\n".join(note_lines),
            "",
            table_block("שאלות מערכים (CS101)", arrays),
            table_block("שאלות מחלקות (CS101, לא תמ\"ע)", classes),
        ]
    ).strip() + "\n"


def write_review_files(rows: list[Row]) -> None:
    kept = [r for r in rows if r.table in {"arrays", "classes"}]
    review_path = REPO_ROOT / "tmp_chapter9ex93_candidates.tsv"
    with review_path.open("w", encoding="utf-8", newline="") as f:
        headers = [
            "folder",
            "exam_code",
            "q_number",
            "start_page",
            "table",
            "ex_ds",
            "ex_oop",
            "special",
            "array_kw",
            "class_kw",
            "static_marker",
            "topic",
            "subject",
            "snippet",
        ]
        f.write("\t".join(headers) + "\n")
        for r in kept:
            vals = [
                r.folder,
                r.exam_code,
                str(r.q_number),
                str(r.start_page),
                r.table or "",
                "1" if r.ex_ds else "",
                "1" if r.ex_oop else "",
                "1" if r.is_special else "",
                "1" if r.is_array_kw else "",
                "1" if r.is_class_kw else "",
                "1" if r.static_marker else "",
                r.topic,
                r.subject,
                r.snippet[:500].replace("\t", " "),
            ]
            f.write("\t".join(vals).replace("\n", " ") + "\n")

    # Also write a compact list of class questions with static markers for manual verification.
    static_path = REPO_ROOT / "tmp_chapter9ex93_static_scan.md"
    static_rows = [r for r in kept if r.table == "classes" and r.static_marker]
    lines = ["# Static Scan", ""]
    if not static_rows:
        lines.append("No class questions with `static int` matched.")
    else:
        for r in static_rows:
            lines.append(f"- {r.folder} q{r.q_number} p{r.start_page} -> {r.subject}")
            # keep a short excerpt around 'static'
            low = r.text.lower()
            idx = low.find("static")
            if idx >= 0:
                excerpt = norm_space(r.text[max(0, idx - 140) : idx + 220])
                lines.append(f"  - `{excerpt}`")
    static_path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def replace_chapter_content(generated_block: str) -> None:
    path = REPO_ROOT / "cs2" / "Chapter9Ex9.3.md"
    text = path.read_text(encoding="utf-8")
    # Keep front matter and the "קישורים" section at the bottom intact.
    m_start = re.search(r"\n\{\: \.box-note\}\n", text)
    m_links = re.search(r"\n## קישורים\n", text)
    if not m_start or not m_links:
        raise RuntimeError("Could not locate replace boundaries in Chapter9Ex9.3.md")
    new_text = text[: m_start.start() + 1] + generated_block + "\n" + text[m_links.start() + 1 :]
    path.write_text(new_text, encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Refresh cs2/Chapter9Ex9.3.md (arrays/classes bagrut index)."
    )
    parser.add_argument(
        "--year",
        type=int,
        help=(
            "Process only bagrut folders from one year (e.g. 2026). "
            "Writes tmp review files but does not overwrite cs2/Chapter9Ex9.3.md."
        ),
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    rows = build_rows(args.year)
    if not rows:
        year_msg = f" for year {args.year}" if args.year is not None else ""
        raise SystemExit(f"No split bagrut folders found{year_msg}.")
    manual_fixes(rows)
    # Recompute topics/subjects for rows that survived and still lack a subject after manual exclusions.
    for r in rows:
        if r.table in {"arrays", "classes"} and (not r.topic or not r.subject):
            r.topic, r.subject = pick_topic_subject(r)
    add_static_notes(rows)
    write_review_files(rows)
    generated = build_markdown(rows)
    (REPO_ROOT / "tmp_chapter9ex93_generated.md").write_text(generated, encoding="utf-8")
    if args.year is None:
        replace_chapter_content(generated)
    else:
        print(
            f"Preview mode (--year {args.year}): wrote tmp_* review files and "
            "tmp_chapter9ex93_generated.md; skipped updating cs2/Chapter9Ex9.3.md"
        )

    kept = [r for r in rows if r.table in {"arrays", "classes"}]
    print(f"Kept rows: {len(kept)} (arrays={sum(r.table=='arrays' for r in kept)}, classes={sum(r.table=='classes' for r in kept)})")
    print(f"Static-marked class rows: {sum(r.notes=='static' for r in kept if r.table=='classes')}")


if __name__ == "__main__":
    main()
