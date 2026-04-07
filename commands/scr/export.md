---
description: Compile and export manuscript to publication-ready formats.
argument-hint: "--format <format> [--formatted] [--print-ready]"
---

# /scr:export -- Manuscript Export

Assemble the manuscript from OUTLINE.md and export to the specified format. Handles manuscript assembly, metadata generation, external tool detection, and format-specific Pandoc/Typst invocation.

## Usage

```
/scr:export --format <format> [--formatted] [--print-ready]
```

**Primary Formats:**

| Format | Flag | Output | Requires |
|--------|------|--------|----------|
| Markdown | `--format markdown` | `.manuscript/output/manuscript.md` | Nothing |
| DOCX (manuscript) | `--format docx` | `.manuscript/output/manuscript.docx` | Pandoc |
| DOCX (formatted) | `--format docx --formatted` | `.manuscript/output/manuscript-formatted.docx` | Pandoc |
| PDF (manuscript) | `--format pdf` | `.manuscript/output/manuscript.pdf` | Pandoc, Typst |
| PDF (print-ready) | `--format pdf --print-ready` | `.manuscript/output/manuscript-print.pdf` | Pandoc, Typst |
| EPUB | `--format epub` | `.manuscript/output/manuscript.epub` | Pandoc |

**Secondary Formats (Plan 02):**

| Format | Flag | Output | Requires |
|--------|------|--------|----------|
| Fountain | `--format fountain` | `.manuscript/output/screenplay.fountain` | Nothing |
| FDX | `--format fdx` | `.manuscript/output/screenplay.fdx` | Screenplain |
| LaTeX | `--format latex` | `.manuscript/output/manuscript.tex` | Pandoc |

**Packages (Plan 02):**

| Package | Flag | Output | Requires |
|---------|------|--------|----------|
| KDP | `--format kdp-package` | `.manuscript/output/kdp-package/` | Pandoc, Typst |
| IngramSpark | `--format ingram-package` | `.manuscript/output/ingram-package/` | Pandoc, Typst, Ghostscript |
| Query | `--format query-package` | `.manuscript/output/query-package/` | Pandoc |
| Submission | `--format submission-package` | `.manuscript/output/submission-package/` | Pandoc |

## Instruction

You are a **manuscript export specialist**. Your job is to assemble the complete manuscript from its component files and convert it to the requested format using external tools.

---

### STEP 1: LOAD CONTEXT

Load the following project files:

- `.manuscript/config.json` -- to get `work_type`, title, author, language, and project settings
- `data/CONSTRAINTS.json` -- to check `exports` section for format availability by work type group

**Check format availability:**

Look up the requested format in `CONSTRAINTS.json` under the `exports` section. Map the format flag to the constraint key:

| Flag | Constraint Key |
|------|---------------|
| `markdown` | `markdown` |
| `docx` | `docx_manuscript` |
| `docx --formatted` | `docx_formatted` |
| `pdf` | `pdf_manuscript` |
| `pdf --print-ready` | `pdf_print_ready` |
| `epub` | `epub` |
| `fountain` | `fountain` |
| `fdx` | `fdx` |
| `latex` | `latex` |

Find the current work type's group in `CONSTRAINTS.json` under `work_type_groups`. Check if the group is in the format's `available` list (or if `available` contains `"all"`).

If the format is **not available** for the current work type:
> This format is not available for [work_type] projects. Available export formats for [group] work types are: [list available formats].

Then **stop**.

---

### STEP 2: CHECK PREREQUISITES

Check for required external tools based on the requested format.

**For markdown:** No external tools needed. Skip to Step 3.

**For docx, epub, latex:** Check for Pandoc:

```bash
command -v pandoc >/dev/null 2>&1
```

If Pandoc is not found:

> **Pandoc is required for this export format but is not installed.**
>
> **Install Pandoc:**
> - macOS: `brew install pandoc`
> - Linux: `sudo apt install pandoc`
> - Windows: `choco install pandoc`
> - Or download from https://pandoc.org/installing.html
>
> After installing, run this export command again.

Then **stop** -- do not attempt export without the required tool.

**For pdf (both manuscript and print-ready):** Also check for Typst:

```bash
command -v typst >/dev/null 2>&1
```

If Typst is not found:

> **Typst is required for PDF export but is not installed.**
>
> **Install Typst:**
> - macOS: `brew install typst`
> - Linux: Download from https://github.com/typst/typst/releases
> - Windows: `winget install typst`
> - Or visit https://typst.app for installation options
>
> After installing, run this export command again.

Then **stop**.

**For fdx:** Check for Screenplain:

```bash
command -v screenplain >/dev/null 2>&1
```

If not found, provide install instructions (`pip install screenplain`) and stop.

**For fountain:** No external tools needed.

---

### STEP 3: ASSEMBLE MANUSCRIPT

This step builds the complete manuscript from its component files. All formats use this assembled file as input.

**3a. Read OUTLINE.md for document order:**

Read `.manuscript/OUTLINE.md` and parse the scene/chapter list. Extract the ordered list of body units (scenes, chapters, sections) with their file paths in `.manuscript/drafts/body/`.

**3b. Scan front matter:**

Read all files in `.manuscript/front-matter/` directory. Sort by numeric prefix to maintain Chicago Manual of Style order:

```
01-half-title.md
02-series-title.md
03-title-page.md
04-copyright.md
...
```

If no front matter files exist:
> **Note:** No front matter found. Consider running `/scr:front-matter` to generate title page, copyright, and other publishing elements.

Proceed with body content only.

**3c. Read body drafts:**

For each unit listed in OUTLINE.md, look for the corresponding draft file in `.manuscript/drafts/body/`. Read in OUTLINE.md order.

For any unit listed in OUTLINE.md that has no draft file:
> **Warning:** Missing draft for "[unit name]" -- skipping. Expected file: `.manuscript/drafts/body/[filename]`

Track all missing units for the final report.

**3d. Scan back matter:**

Read all files in `.manuscript/back-matter/` directory. Sort alphabetically.

If no back matter exists, proceed without -- back matter is optional.

**3e. Concatenate:**

Assemble the full manuscript in this order:

1. Front matter files (sorted by numeric prefix)
2. Body draft files (ordered by OUTLINE.md)
3. Back matter files (sorted alphabetically)

Insert `\newpage` page break markers between major sections (between each front matter element, between front matter and body, between chapters/sections, between body and back matter).

**3f. Create output directory and write assembled file:**

```bash
mkdir -p .manuscript/output
```

Write the assembled content to `.manuscript/output/assembled-manuscript.md`.

**3g. Generate metadata.yaml:**

Read `.manuscript/config.json` and `.manuscript/WORK.md` (if it exists) to generate Pandoc metadata:

```yaml
---
title: "[title from config.json]"
subtitle: "[subtitle if available]"
author:
  - name: "[author from config.json]"
language: "[language from config.json, default en-US]"
rights: "Copyright [year] [author]. All rights reserved."
date: "[current year]"
description: "[description if available]"
---
```

Write to `.manuscript/output/metadata.yaml`.

---

### STEP 4: EXPORT BY FORMAT

Execute the format-specific export command using the assembled manuscript and metadata.

---

#### FORMAT: markdown (EXP-01)

The assembled file IS the output. No external tools needed.

```bash
cp .manuscript/output/assembled-manuscript.md .manuscript/output/manuscript.md
```

---

#### FORMAT: docx (EXP-02)

Standard manuscript format DOCX (12pt Times New Roman, double-spaced, 1" margins).

```bash
pandoc .manuscript/output/assembled-manuscript.md \
  -o .manuscript/output/manuscript.docx \
  --reference-doc=data/export-templates/scriven-manuscript.docx \
  --metadata-file=.manuscript/output/metadata.yaml \
  --toc \
  --toc-depth=1
```

**Note:** The reference doc `scriven-manuscript.docx` controls all styling. If it does not exist, warn the writer and run Pandoc without `--reference-doc` (Pandoc will use its default styles).

---

#### FORMAT: docx --formatted (EXP-03)

Designed/typeset DOCX for review copies and ARCs.

```bash
pandoc .manuscript/output/assembled-manuscript.md \
  -o .manuscript/output/manuscript-formatted.docx \
  --reference-doc=data/export-templates/scriven-formatted.docx \
  --metadata-file=.manuscript/output/metadata.yaml \
  --toc \
  --toc-depth=2
```

---

#### FORMAT: pdf (EXP-04)

Manuscript-format PDF via Typst engine.

```bash
pandoc .manuscript/output/assembled-manuscript.md \
  -o .manuscript/output/manuscript.pdf \
  --pdf-engine=typst \
  --metadata-file=.manuscript/output/metadata.yaml \
  --toc \
  --toc-depth=1
```

---

#### FORMAT: pdf --print-ready (EXP-05)

Print-ready PDF with book interior formatting for KDP/IngramSpark.

Read trim size from `.manuscript/config.json` if set, otherwise use defaults (6in x 9in).

```bash
pandoc .manuscript/output/assembled-manuscript.md \
  -o .manuscript/output/manuscript-print.pdf \
  --pdf-engine=typst \
  --template=data/export-templates/scriven-book.typst \
  --metadata-file=.manuscript/output/metadata.yaml \
  --toc \
  --toc-depth=2 \
  -V paperwidth=6in \
  -V paperheight=9in \
  -V margin-inside=0.75in \
  -V margin-outside=0.5in \
  -V margin-top=0.75in \
  -V margin-bottom=0.75in
```

If `config.json` contains `trim_width` and `trim_height`, use those values instead of defaults for `paperwidth` and `paperheight`.

---

#### FORMAT: epub (EXP-06)

EPUB 3 with metadata, table of contents, cover image, and custom CSS.

```bash
pandoc .manuscript/output/assembled-manuscript.md \
  -o .manuscript/output/manuscript.epub \
  --metadata-file=.manuscript/output/metadata.yaml \
  --epub-cover-image=.manuscript/output/cover.jpg \
  --css=data/export-templates/scriven-epub.css \
  --toc \
  --toc-depth=2 \
  --split-level=1
```

**Cover image:** If `.manuscript/output/cover.jpg` (or `.png`) does not exist:
> **Note:** No cover image found at `.manuscript/output/cover.jpg`. EPUB will be generated without a cover. To add a cover, place your cover image at `.manuscript/output/cover.jpg` and re-run the export.

Run the command without the `--epub-cover-image` flag.

---

#### FORMAT: fountain (EXP-07)

Fountain is a plain-text screenplay format. The agent converts the assembled manuscript markdown directly to Fountain-formatted text -- no external tool needed.

**Work type check:** Look up `fountain` in `CONSTRAINTS.json` under `exports`. It is available only for `script` group work types (screenplay, stage_play, tv_pilot, tv_series_bible, audio_drama, libretto). If the current work type's group is not in the `available` list, inform the writer and **stop**.

**Conversion rules (Markdown to Fountain):**

1. **Scene headings:** Lines starting with `## ` or `### ` that contain location context become Fountain sluglines. Prefix with `INT.` or `EXT.` based on content. If ambiguous, use the heading text as-is prefixed with `.` (forced scene heading in Fountain).
2. **Character names:** Any line that is ALL CAPS followed by dialogue on the next line stays as-is (Fountain format).
3. **Dialogue:** Lines immediately following a CHARACTER NAME are dialogue. Wrap parenthetical directions in `()`.
4. **Action:** Regular prose paragraphs become action blocks (plain text with blank line separators).
5. **Transitions:** Lines ending with `TO:` (e.g., `CUT TO:`, `FADE TO:`) are transitions. Alternatively, prefix with `>`.
6. **Title page:** Generate from metadata:
   ```
   Title: [title from config.json]
   Credit: Written by
   Author: [author from config.json]
   Draft date: [current date]
   ```

Write the converted Fountain text to:

```bash
mkdir -p .manuscript/output
# Write Fountain-formatted content to:
# .manuscript/output/screenplay.fountain
```

**Optional screenplay PDF:** After generating the Fountain file, check if Afterwriting is available:

```bash
command -v afterwriting >/dev/null 2>&1
```

If Afterwriting is installed, offer to generate a screenplay PDF:

```bash
afterwriting \
  --source .manuscript/output/screenplay.fountain \
  --pdf .manuscript/output/screenplay.pdf \
  --overwrite
```

If Afterwriting is not installed:
> **Optional:** To generate a formatted screenplay PDF, install Afterwriting: `npm i -g afterwriting`
> Then run: `afterwriting --source .manuscript/output/screenplay.fountain --pdf .manuscript/output/screenplay.pdf --overwrite`

---

#### FORMAT: fdx (EXP-08)

Final Draft XML format via Screenplain, using Fountain as an intermediate.

**Work type check:** Look up `fdx` in `CONSTRAINTS.json` under `exports`. It is available only for `script` group work types with a `screenplay_or_tv_only` constraint. If the current work type is not eligible, inform the writer and **stop**.

**Step 1: Ensure Fountain export exists**

Check if `.manuscript/output/screenplay.fountain` exists. If not, run the Fountain export first (see FORMAT: fountain above). FDX export chains through Fountain as an intermediate format: markdown -> fountain -> fdx.

**Step 2: Check for Screenplain**

```bash
command -v screenplain >/dev/null 2>&1
```

If Screenplain is not found:

> **Screenplain is required for FDX export but is not installed.**
>
> **Install Screenplain:**
> ```
> pip install screenplain
> ```
>
> After installing, run this export command again.

Then **stop** -- do not attempt FDX export without Screenplain.

**Step 3: Convert Fountain to FDX**

```bash
screenplain --format fdx .manuscript/output/screenplay.fountain \
  .manuscript/output/screenplay.fdx
```

Output: `.manuscript/output/screenplay.fdx`

---

#### FORMAT: latex (EXP-09)

LaTeX source file for academic and sacred text work types, via Pandoc with the academic template.

**Work type check:** Look up `latex` in `CONSTRAINTS.json` under `exports`. It is available only for `academic` and `sacred` group work types. For sacred work types, LaTeX export is intended for critical editions. If the current work type's group is not in the `available` list, inform the writer and **stop**.

**Check for Pandoc** (same as other Pandoc-dependent formats -- see Step 2 above).

**Check for bibliography file:**

If `.manuscript/bibliography.bib` exists, include bibliography flags. If it does not exist:

> **Note:** No bibliography file found at `.manuscript/bibliography.bib`. LaTeX export will proceed without bibliography support. To add citations, create a BibTeX file at `.manuscript/bibliography.bib` and re-run the export.

**Export command (with bibliography):**

```bash
pandoc .manuscript/output/assembled-manuscript.md \
  -o .manuscript/output/manuscript.tex \
  --template=data/export-templates/scriven-academic.latex \
  --metadata-file=.manuscript/output/metadata.yaml \
  --toc \
  --bibliography=.manuscript/bibliography.bib \
  --citeproc
```

**Export command (without bibliography):**

```bash
pandoc .manuscript/output/assembled-manuscript.md \
  -o .manuscript/output/manuscript.tex \
  --template=data/export-templates/scriven-academic.latex \
  --metadata-file=.manuscript/output/metadata.yaml \
  --toc
```

Output: `.manuscript/output/manuscript.tex`

---

<!-- PACKAGES: Platform package formats follow -->

<!-- EXTENSION POINT: Package formats (kdp-package, ingram-package, query-package, submission-package) will be added below -->

---

### STEP 5: REPORT

After export completes, report:

1. **Output file path** and file size
2. **Assembly summary:**
   - Number of front matter elements included
   - Number of body units included (and any missing/skipped)
   - Number of back matter elements included
   - Total word count of assembled manuscript
3. **Warnings** from assembly (missing units, missing front matter, missing cover image)
4. **Format-specific notes:**
   - For EPUB: suggest validation with EPUBCheck if Java is available
     ```bash
     command -v java >/dev/null 2>&1
     ```
     If Java is available: "Consider validating your EPUB with EPUBCheck: `java -jar epubcheck.jar .manuscript/output/manuscript.epub`"
   - For DOCX: note that styling comes from the reference document
   - For PDF --print-ready: confirm the trim size and margins used

**Example output:**

> **Export complete!**
>
> **File:** `.manuscript/output/manuscript.epub` (1.2 MB)
>
> **Assembly:**
> - 8 front matter elements
> - 24 body units (2 missing: "Chapter 12", "Epilogue")
> - 3 back matter elements
> - 78,450 words
>
> **Warnings:**
> - Missing draft for "Chapter 12" -- skipped
> - Missing draft for "Epilogue" -- skipped
> - No cover image found -- EPUB generated without cover
>
> **Next steps:**
> - Add missing chapters and re-export
> - Validate EPUB: `java -jar epubcheck.jar .manuscript/output/manuscript.epub`
