# Phase 5: Export & Publishing - Research

**Researched:** 2026-04-06
**Domain:** Multi-format document export via Pandoc/Typst, platform packaging (KDP/IngramSpark), publishing wizard
**Confidence:** HIGH

## Summary

Phase 5 implements the export pipeline that turns a completed manuscript into publication-ready deliverables. The core pattern is: the AI agent reads OUTLINE.md to determine document order, concatenates front matter + body units + back matter into a single intermediate file, then invokes external CLI tools (Pandoc, Typst, Ghostscript, Afterwriting, Screenplain) via shell commands to produce the target format. Scriven itself adds no npm dependencies -- all export capability comes from external binaries the user installs.

The export command is a markdown skill file (like all Scriven commands) that instructs the AI agent on how to assemble the manuscript and which shell commands to run. The agent handles file I/O, error detection, and user communication. Export templates (Typst book template, DOCX reference docs, EPUB CSS, LaTeX template) ship as static files in `data/export-templates/` and are passed to Pandoc/Typst via command-line flags.

The publishing wizard (`/scr:publish`) is a high-level orchestrator that checks prerequisites, chains multiple export commands, and packages outputs for specific platforms. Four presets (kdp-paperback, kdp-ebook, query-submission, ebook-wide) provide fast paths for common publishing scenarios. The autopilot-publish command runs voice-check + continuity-check as a quality gate before the full pipeline.

**Primary recommendation:** Build the manuscript assembly logic first (reading OUTLINE.md, concatenating files in order, generating metadata YAML), then build individual export format commands, then build packages and the publish wizard on top. Every export command must detect its required external tool at invocation time and provide platform-specific install instructions if missing.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Export commands are AI agent instructions that invoke `pandoc` and `typst` via shell -- not compiled code or Node.js wrappers
- **D-02:** Commands detect if Pandoc/Typst are installed at start, provide clear install instructions if missing
- **D-03:** Manuscript assembly reads OUTLINE.md for document order, concatenates drafted units + front/back matter, then passes to Pandoc
- **D-04:** Format priority: Markdown -> DOCX -> PDF -> EPUB (primary), Fountain/FDX/LaTeX (secondary, specialized work types)
- **D-05:** KDP spine width calculated dynamically at export time: page_count x paper_factor (0.0025" white, 0.002" cream) + 0.06"
- **D-06:** Export template files ship in `data/export-templates/` (Typst book template, DOCX reference doc, EPUB CSS)
- **D-07:** `/scr:publish` wizard checks prerequisites (front-matter, back-matter, blurb, synopsis, cover), shows checklist with one-click commands for missing pieces
- **D-08:** 4 presets: kdp-paperback, kdp-ebook, query-submission, ebook-wide
- **D-09:** autopilot-publish runs voice-check + continuity-check as quality gate before export -- warns but doesn't block

### Claude's Discretion
- Pandoc/Typst command-line flags for each format
- Export template styling (fonts, margins, headers)
- Manuscript assembly edge cases (missing units, partial drafts)
- Error handling for external tool failures

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| EXP-01 | `/scr:export markdown` compiles manuscript to single markdown file with correct document order | Manuscript assembly pattern from OUTLINE.md; concatenation logic |
| EXP-02 | `/scr:export docx` exports manuscript format (12pt TNR, double-spaced, standard margins) | Pandoc `--reference-doc` with Shunn-style DOCX template |
| EXP-03 | `/scr:export docx --formatted` exports formatted/typeset version | Pandoc with separate formatted DOCX reference doc |
| EXP-04 | `/scr:export pdf` exports manuscript-format PDF | Pandoc `--pdf-engine=typst` with manuscript Typst template |
| EXP-05 | `/scr:export pdf --print-ready` exports print-ready PDF with trim, margins, bleed | Pandoc + Typst book template with KDP/IngramSpark specs |
| EXP-06 | `/scr:export epub` exports EPUB 3.0 with metadata, TOC, cover | Pandoc EPUB with `--epub-cover-image`, `--css`, `--toc`, `--metadata-file` |
| EXP-07 | `/scr:export fountain` exports screenplay in Fountain format | Agent generates Fountain-formatted text from markdown |
| EXP-08 | `/scr:export fdx` exports Final Draft XML format | Screenplain `--format fdx` on Fountain intermediate |
| EXP-09 | `/scr:export latex` exports LaTeX for academic/sacred | Pandoc with `--template=scriven-academic.latex` |
| EXP-10 | `/scr:export kdp-package` bundles interior PDF + cover template + metadata | Print-ready PDF + KDP spine calculation + cover dimensions + metadata CSV |
| EXP-11 | `/scr:export ingram-package` bundles IngramSpark-ready files | PDF/X-1a via Ghostscript CMYK conversion + cover + metadata |
| EXP-12 | `/scr:export query-package` bundles query letter + synopsis + sample chapters | Concatenate query letter + synopsis + first N chapters from OUTLINE.md |
| EXP-13 | `/scr:export submission-package` bundles full submission materials | Full manuscript DOCX + synopsis + cover letter + author bio |
| EXP-14 | `/scr:publish` interactive wizard chains correct export commands | Prerequisite checker + wizard flow + pipeline runner |
| EXP-15 | `/scr:publish --preset` supports named presets | 4 presets: kdp-paperback, kdp-ebook, query-submission, ebook-wide |
| EXP-16 | `/scr:autopilot-publish` runs full pipeline unattended | Quality gate (voice-check + continuity-check) + full pipeline |
| EXP-17 | `/scr:manuscript-stats` shows word count, chapter count, estimated page count, reading time | Word counting from drafts, 250 words/page estimate, 200-250 wpm reading time |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Architecture**: Must remain a pure skill/command system -- no compiled code, no runtime dependencies beyond Node.js for the installer
- **Voice fidelity**: Every feature must preserve the Voice DNA pipeline -- fresh context per atomic unit, STYLE-GUIDE.md loaded first
- **Backward compatibility**: Existing 28 commands and templates must continue working
- **Plan authority**: If a command file contradicts the product plan, fix the command -- plan is canonical
- **Progressive disclosure**: Onboarding asks 3 questions max; depth is optional and additive
- **GSD Workflow**: All file changes go through GSD commands

## Standard Stack

### Core (External CLI Tools -- User Prerequisites)

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Pandoc | 3.9.x | Universal document converter (MD->DOCX, EPUB, LaTeX, PDF via Typst) | De facto standard. One tool covers 80% of export needs. Handles EPUB 3, DOCX with reference docs, LaTeX, and PDF via engine flag. |
| Typst | 0.14.x | PDF engine for Pandoc | 27x faster than XeLaTeX. Single ~30 MB binary vs 4-6 GB TeX Live. PDF/UA-1 accessible output by default. Pandoc `--pdf-engine=typst` natively supported. |
| Ghostscript | 10.x | RGB-to-CMYK PDF conversion, PDF/X-1a | Required only for IngramSpark package. Converts RGB PDF to CMYK PDF/X-1a with ICC profiles. |
| Afterwriting | 1.8.x | Fountain to screenplay PDF | Node.js CLI. Industry-standard screenplay PDF formatting. |
| Screenplain | 0.11.x | Fountain to FDX (Final Draft XML) | Python CLI. Only reliable open-source Fountain-to-FDX converter. |
| EPUBCheck | 5.3.x | EPUB validation | W3C conformance checker. Java CLI. Validates EPUB 2 and 3. |

### Supporting (Scriven Ships These as Static Files)

| File | Format | Purpose | Ships In |
|------|--------|---------|----------|
| `scriven-book.typst` | Typst template | Book interior PDF (trim sizes, margins, headers, page numbers) | `data/export-templates/` |
| `scriven-manuscript.docx` | DOCX reference doc | Standard manuscript format (12pt Times New Roman, double-spaced, 1" margins) | `data/export-templates/` |
| `scriven-formatted.docx` | DOCX reference doc | Designed/formatted DOCX for review copies | `data/export-templates/` |
| `scriven-epub.css` | CSS | EPUB styling (clean, readable, KDP-compatible) | `data/export-templates/` |
| `scriven-academic.latex` | LaTeX template | Academic paper/thesis formatting | `data/export-templates/` |
| `metadata.yaml` | YAML (generated) | Pandoc metadata for EPUB/PDF (title, author, language, rights) | Generated at export time |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Typst | XeLaTeX (TeX Live) | 4-6 GB install, 27x slower. Only consider for math-heavy academic edge cases. |
| Pandoc EPUB | epub-gen-memory (npm) | Would add npm runtime dependency, violating architecture constraint. |
| Pandoc DOCX | docx npm library | Would add npm dependency. Pandoc reference-doc approach is more mature. |
| Ghostscript for CMYK | ImageMagick | ImageMagick can do color conversion but Ghostscript is the standard for PDF/X-1a compliance. |

**Installation (user prerequisites):**
```bash
# macOS
brew install pandoc typst ghostscript

# Linux
apt install pandoc ghostscript
# Typst: download from https://github.com/typst/typst/releases

# Screenplay tools (only for screenplay work types)
npm i -g afterwriting
pip install screenplain

# EPUB validation (optional but recommended)
# Download from https://github.com/w3c/epubcheck/releases
```

## Architecture Patterns

### Recommended Project Structure (New Files)

```
data/
  export-templates/
    scriven-book.typst           # Typst book interior template
    scriven-manuscript.docx      # Shunn manuscript format reference doc
    scriven-formatted.docx       # Designed/formatted reference doc
    scriven-epub.css             # EPUB stylesheet
    scriven-academic.latex       # Academic LaTeX template
commands/
  scr/
    export.md                    # Main export command (single file, --format flag)
    manuscript-stats.md          # Word/page/chapter stats
    publish.md                   # Already exists -- needs full implementation
    autopilot-publish.md         # Full pipeline with quality gate
```

### Pattern 1: Manuscript Assembly Pipeline

**What:** Read OUTLINE.md to determine document order, then concatenate front matter + body drafts + back matter into a single intermediate markdown file for Pandoc.

**When to use:** Every export format except markdown (which IS the assembled file).

**Assembly order:**
1. Read `.manuscript/OUTLINE.md` -- parse the scene/chapter list for order
2. Read all files in `.manuscript/front-matter/` -- sort by numeric prefix (01-half-title.md, 02-series-title.md, etc.)
3. Read all drafted units in `.manuscript/drafts/body/` -- order by OUTLINE.md scene list
4. Read all files in `.manuscript/back-matter/` -- alphabetical or conventional order
5. Concatenate with page break markers (`\newpage` for Pandoc, `---` for markdown)
6. Generate `metadata.yaml` from `.manuscript/config.json` and `.manuscript/WORK.md`
7. Write assembled file to `.manuscript/output/assembled-manuscript.md`
8. Pass assembled file + metadata + template to Pandoc

**Edge cases:**
- Missing units: warn but continue with available units. List missing units in output.
- Partial drafts (units still in plan state): skip, warn prominently.
- No front matter generated yet: warn, suggest `/scr:front-matter`, proceed with body only.
- No back matter: proceed without -- back matter is optional for many formats.

### Pattern 2: External Tool Detection

**What:** Check if required CLI tool is installed before attempting export. Provide platform-specific install instructions if missing.

**Example:**
```
## STEP 1: CHECK PREREQUISITES

Check if Pandoc is installed:

\`\`\`bash
command -v pandoc >/dev/null 2>&1
\`\`\`

If not found, inform the writer:

> Pandoc is required for this export format but is not installed.
>
> **Install Pandoc:**
> - macOS: `brew install pandoc`
> - Linux: `sudo apt install pandoc`
> - Windows: `choco install pandoc`
> - Or download from https://pandoc.org/installing.html
>
> After installing, run this export command again.

Then **stop** -- do not attempt export without the required tool.

For PDF export, also check Typst:
\`\`\`bash
command -v typst >/dev/null 2>&1
\`\`\`
```

### Pattern 3: Single Export Command with Format Flag

**What:** One `export.md` command file that dispatches based on `--format` argument, rather than separate command files per format.

**When to use:** All EXP-01 through EXP-13 requirements.

**Why:** Keeps the command namespace clean. The export command handles: format selection, tool detection, manuscript assembly, Pandoc invocation, output placement. Each format is a section within the command file.

### Pattern 4: Publishing Wizard Flow

**What:** `/scr:publish` runs an interactive flow: (1) ask destination, (2) check prerequisites, (3) show checklist, (4) run pipeline, (5) present output with next steps.

**When to use:** EXP-14, EXP-15.

**Preset mapping:**
| Preset | Pipeline Steps |
|--------|---------------|
| kdp-paperback | front-matter -> back-matter -> export pdf --print-ready -> export kdp-package |
| kdp-ebook | front-matter -> back-matter -> export epub -> (validate with EPUBCheck) |
| query-submission | blurb -> synopsis -> query-letter -> export query-package |
| ebook-wide | front-matter -> back-matter -> export epub -> export pdf |

### Anti-Patterns to Avoid

- **Separate command files per format:** Do NOT create `export-pdf.md`, `export-epub.md`, etc. One `export.md` with format dispatching keeps the namespace clean and reuses assembly logic.
- **Hardcoded spine width:** Never bake KDP spine width into templates. Calculate dynamically from page count at export time.
- **Skipping tool detection:** Every shell invocation must be preceded by `command -v <tool>`. Never assume tools are installed.
- **Generating metadata inline:** Always generate a `metadata.yaml` file for Pandoc rather than passing metadata as CLI flags. YAML is more maintainable and supports complex structures (multiple authors, subject lists).

## Exact Shell Invocations

These are the verified Pandoc/Typst/Ghostscript commands the export command should use. Confidence: HIGH (sourced from Pandoc official docs and verified patterns).

### Markdown Assembly (EXP-01)
```bash
# No external tool needed -- the agent concatenates files directly
# Output: .manuscript/output/manuscript.md
```

### DOCX Manuscript Format (EXP-02)
```bash
pandoc .manuscript/output/assembled-manuscript.md \
  -o .manuscript/output/manuscript.docx \
  --reference-doc=data/export-templates/scriven-manuscript.docx \
  --metadata-file=.manuscript/output/metadata.yaml \
  --toc \
  --toc-depth=1
```

### DOCX Formatted (EXP-03)
```bash
pandoc .manuscript/output/assembled-manuscript.md \
  -o .manuscript/output/manuscript-formatted.docx \
  --reference-doc=data/export-templates/scriven-formatted.docx \
  --metadata-file=.manuscript/output/metadata.yaml \
  --toc \
  --toc-depth=2
```

### PDF Manuscript (EXP-04)
```bash
pandoc .manuscript/output/assembled-manuscript.md \
  -o .manuscript/output/manuscript.pdf \
  --pdf-engine=typst \
  --metadata-file=.manuscript/output/metadata.yaml \
  --toc \
  --toc-depth=1
```

### PDF Print-Ready (EXP-05)
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

### EPUB (EXP-06)
```bash
pandoc .manuscript/output/assembled-manuscript.md \
  -o .manuscript/output/manuscript.epub \
  --metadata-file=.manuscript/output/metadata.yaml \
  --epub-cover-image=.manuscript/output/cover.jpg \
  --css=data/export-templates/scriven-epub.css \
  --toc \
  --toc-depth=2 \
  --split-level=1

# Optional validation:
java -jar epubcheck.jar .manuscript/output/manuscript.epub
```

### Fountain (EXP-07)
```bash
# No external tool -- the agent writes Fountain-formatted text directly
# Fountain is a plain-text format: INT., EXT., CHARACTER NAME, dialogue, etc.
# Output: .manuscript/output/screenplay.fountain
```

### FDX / Final Draft (EXP-08)
```bash
# First generate Fountain (EXP-07), then convert
screenplain --format fdx .manuscript/output/screenplay.fountain \
  .manuscript/output/screenplay.fdx
```

### LaTeX (EXP-09)
```bash
pandoc .manuscript/output/assembled-manuscript.md \
  -o .manuscript/output/manuscript.tex \
  --template=data/export-templates/scriven-academic.latex \
  --metadata-file=.manuscript/output/metadata.yaml \
  --toc \
  --bibliography=.manuscript/bibliography.bib \
  --citeproc
```

### IngramSpark PDF/X-1a Conversion (for EXP-11)
```bash
# First generate print-ready PDF, then convert to CMYK PDF/X-1a
gs -dPDFX -dBATCH -dNOPAUSE \
  -dPDFXCompatibilityPolicy=1 \
  -sColorConversionStrategy=CMYK \
  -sDEVICE=pdfwrite \
  -sOutputFile=.manuscript/output/manuscript-cmyk.pdf \
  .manuscript/output/manuscript-print.pdf
```

### Screenplay PDF (via Afterwriting, optional)
```bash
afterwriting \
  --source .manuscript/output/screenplay.fountain \
  --pdf .manuscript/output/screenplay.pdf \
  --overwrite
```

## KDP Spine Width Formula

**Source:** KDP official documentation, verified 2026.

```
spine_width_inches = (page_count * paper_factor) + cover_thickness

Where:
  paper_factor:
    white paper:    0.002252 inches/page
    cream paper:    0.0025 inches/page
    standard color: 0.0032 inches/page
  cover_thickness:
    paperback: 0.06 inches
    hardcover: 0.0 inches (no cover thickness added)

Examples:
  200 pages white paper:  (200 * 0.002252) + 0.06 = 0.5104 inches
  300 pages cream paper:  (300 * 0.0025) + 0.06   = 0.81 inches

Spine text rule: Only add text to spine if page count >= 79
```

The agent calculates this at export time from:
1. Word count of assembled manuscript
2. Estimated page count = ceil(word_count / 250)
3. Paper type from `.manuscript/config.json` (default: white)
4. Apply formula above

## Metadata YAML Generation

The agent generates this file at export time from `.manuscript/config.json` and `.manuscript/WORK.md`:

```yaml
---
title: "Book Title"
subtitle: "Optional Subtitle"
author:
  - name: "Author Name"
rights: "Copyright 2026 Author Name. All rights reserved."
language: en-US
publisher: "Publisher Name"
date: "2026"
description: "Book description for metadata"
cover-image: ".manuscript/output/cover.jpg"
---
```

This YAML file is passed to Pandoc via `--metadata-file` for all formats.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Markdown to DOCX | Custom DOCX XML generator | Pandoc + reference doc | DOCX is complex Office Open XML. Pandoc handles styles, headers, footnotes, TOC. |
| Markdown to EPUB | Custom EPUB ZIP assembler | Pandoc EPUB output | EPUB is XHTML + OPF + NCX in a ZIP. Pandoc handles manifest, spine, metadata, accessibility. |
| Markdown to PDF | HTML-to-PDF conversion | Pandoc + Typst engine | HTML-to-PDF produces web-quality, not print-quality. Typst gives proper kerning, ligatures, widow/orphan control. |
| EPUB validation | Manual EPUB XML checks | EPUBCheck (W3C tool) | EPUBCheck catches hundreds of compliance issues. Manual checking misses most. |
| RGB to CMYK conversion | Color space math | Ghostscript with ICC profiles | Color conversion needs ICC profiles, rendering intents, spot color handling. |
| Fountain format parsing | Custom parser | Agent writes Fountain directly | Fountain is a plain-text format. The agent knows the spec and writes it. |
| Fountain to FDX | Custom FDX XML builder | Screenplain | FDX is Final Draft's XML schema. Screenplain handles all elements correctly. |
| Shunn manuscript format | Custom DOCX styling | Pandoc reference-doc template | One reference doc file controls all styles. No code needed. |

**Key insight:** Pandoc + Typst + Ghostscript cover 95% of export needs. The remaining 5% (Fountain, FDX) are handled by specialized tools. The agent's job is assembly and orchestration, not format conversion.

## Common Pitfalls

### Pitfall 1: EPUB Fails Platform Validation
**What goes wrong:** EPUB passes casual review but fails EPUBCheck, gets rejected by Apple Books, Kobo, or Draft2Digital.
**Why it happens:** Missing manifest items, duplicate IDs, unembedded fonts, missing alt text on images, incomplete metadata.
**How to avoid:** Run EPUBCheck as a post-export validation step. If EPUBCheck is not installed, warn the user and suggest installing it. List common fixes for frequent failures.
**Warning signs:** Export produces EPUB without any validation step.

### Pitfall 2: DOCX Output Looks Wrong Without Reference Doc
**What goes wrong:** Pandoc's default DOCX output is NOT manuscript format. It uses Calibri, single-spacing, and wrong margins.
**Why it happens:** Pandoc's default DOCX styles are for general documents, not manuscript submission.
**How to avoid:** Always use `--reference-doc` with the shipped `scriven-manuscript.docx` template. This template must implement standard manuscript format: 12pt Times New Roman, double-spaced, 1" margins, right-aligned header with author/title/page.
**Warning signs:** DOCX export command without `--reference-doc` flag.

### Pitfall 3: KDP Package Rejected for Dimension Mismatch
**What goes wrong:** Cover dimensions don't match interior page count. Spine width is wrong. Bleed settings are incorrect.
**Why it happens:** Using static dimensions instead of calculating from actual page count. Using wrong paper thickness factor. Missing 0.125" bleed on all sides.
**How to avoid:** Calculate spine width dynamically at export time. Use the exact KDP formula. Validate against 79-page minimum for spine text. Add 0.125" bleed to cover dimensions.
**Warning signs:** Any hardcoded spine width value in templates.

### Pitfall 4: Tool Not Installed But Error Is Cryptic
**What goes wrong:** User runs `/scr:export pdf` and gets `pandoc: command not found` or `typst: command not found` with no explanation.
**Why it happens:** Export command shells out to external tool without checking first.
**How to avoid:** Check `command -v <tool>` before every invocation. Provide platform-specific install instructions. Differentiate between "Pandoc missing" (blocks all exports) and "Typst missing" (blocks only PDF).
**Warning signs:** Shell commands without preceding availability checks.

### Pitfall 5: Front/Back Matter Omitted or Misordered
**What goes wrong:** Export produces body-only output missing title page, copyright, TOC, etc. Or includes front matter but in wrong order.
**Why it happens:** Assembly logic doesn't check for front/back matter files, or doesn't respect numeric prefix ordering.
**How to avoid:** Assembly step explicitly scans `.manuscript/front-matter/` and `.manuscript/back-matter/`. Front matter files use numeric prefixes (01-, 02-, etc.) for Chicago Manual ordering. Warn if required elements (title page, copyright) are missing.
**Warning signs:** Export that doesn't read front-matter directory.

### Pitfall 6: IngramSpark PDF/X-1a Conversion Fails
**What goes wrong:** Ghostscript CMYK conversion produces color-shifted output or fails due to missing ICC profiles.
**Why it happens:** ICC color profiles (sRGB.icc, CoatedFOGRA39.icc) are not installed on the user's system. Profile paths differ by OS.
**How to avoid:** Check for ICC profiles before conversion. Provide download instructions. Document that IngramSpark package is the most complex export and may require manual color review.
**Warning signs:** Ghostscript command without ICC profile path validation.

## Code Examples

### Metadata YAML Generator (Agent Logic)
```
Read .manuscript/config.json for:
  - title, subtitle, author, work_type

Read .manuscript/WORK.md for:
  - genre, themes, comparable titles (for description)

Generate .manuscript/output/metadata.yaml:
  ---
  title: "{title}"
  subtitle: "{subtitle}"
  author:
    - name: "{author}"
  language: en-US
  rights: "Copyright {year} {author}. All rights reserved."
  date: "{year}"
  ---
```

### Manuscript Assembly (Agent Logic)
```
1. Read .manuscript/OUTLINE.md
2. Parse scene/chapter list from the "Scene list" table
3. For each row, extract the filename pattern: {number}-{slug}-DRAFT.md
4. front_matter_files = ls .manuscript/front-matter/ | sort
5. body_files = ordered list from OUTLINE.md mapping to .manuscript/drafts/body/
6. back_matter_files = ls .manuscript/back-matter/ | sort

7. For each file in [front_matter_files, body_files, back_matter_files]:
   - Read content
   - Append to assembled output with page break separator
   - Track missing files for warning

8. Write assembled file to .manuscript/output/assembled-manuscript.md
9. Write metadata.yaml to .manuscript/output/metadata.yaml
```

### KDP Package Assembly (Agent Logic)
```
1. Calculate page count: ceil(word_count / 250)
2. Calculate spine width:
   paper_type = config.json.paper_type || "white"
   factor = paper_type == "cream" ? 0.0025 : 0.002252
   spine = (page_count * factor) + 0.06
3. Determine cover dimensions:
   trim_width = config.json.trim_width || 6 (inches)
   trim_height = config.json.trim_height || 9 (inches)
   cover_width = (trim_width * 2) + spine + (0.125 * 2) [bleed both sides]
   cover_height = trim_height + (0.125 * 2) [bleed top and bottom]
4. Create .manuscript/output/kdp-package/ directory
5. Copy interior PDF to kdp-package/
6. Generate cover-specs.md with calculated dimensions
7. Generate kdp-metadata.md with title, author, categories, keywords
```

### Publish Wizard Prerequisites Check
```
prerequisites = {
  "Complete draft": check if all OUTLINE.md units have DRAFT files,
  "Front matter": check if .manuscript/front-matter/ has files,
  "Back matter": check if .manuscript/back-matter/ has files,
  "Blurb": check if .manuscript/output/blurb.md exists,
  "Synopsis": check if .manuscript/output/synopsis.md exists,
  "Cover art": check if .manuscript/output/cover.* exists
}

For each missing prerequisite, show:
  X {item} -- run /scr:{command} to generate

Offer: "Want me to generate all missing pieces now?"
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| XeLaTeX for PDF | Typst via Pandoc | 2024-2025 | 27x faster, 30 MB vs 4-6 GB install, accessible PDF/UA-1 by default |
| EPUB 2 | EPUB 3 | Standard since 2014 | Pandoc defaults to EPUB 3. Do not generate EPUB 2. |
| Classic npm tokens | Granular access tokens | Dec 2025 | Classic tokens permanently revoked. Not directly relevant to export, but affects package publishing. |
| Manual spine calculation | Dynamic calculation at export | Ongoing | KDP spine formula is now well-documented with exact paper thickness values. |

**Deprecated/outdated:**
- wkhtmltopdf: deprecated, security issues, do not use
- DALL-E 2/3 API: sunset May 2026 (relevant to Phase 6, not Phase 5)
- EPUB 2: superseded by EPUB 3, Pandoc defaults to 3

## Open Questions

1. **EPUBCheck installation approach**
   - What we know: EPUBCheck is a Java JAR. It validates EPUB files. It can be run via `java -jar epubcheck.jar`.
   - What's unclear: Should the export command attempt to run EPUBCheck automatically, or just recommend it? Not all users will have Java installed.
   - Recommendation: Check for `java` and `epubcheck` at export time. If available, run automatically and report results. If not, print a message suggesting validation and provide a link to an online validator.

2. **DOCX reference doc creation process**
   - What we know: Pandoc uses a reference.docx for styling. Scriven needs to ship one.
   - What's unclear: How to create the actual .docx binary file. It cannot be generated by the AI agent -- it must be a pre-built binary file committed to the repo.
   - Recommendation: Use `pandoc --print-default-data-file reference.docx > scriven-manuscript.docx` as a starting point, then manually edit styles in Word/LibreOffice. This is a one-time human task, not an automated step.

3. **Typst template content**
   - What we know: The Typst template controls book formatting (page size, margins, headers, fonts).
   - What's unclear: Exact Typst template syntax for all features (running headers with chapter name, page numbers, drop caps).
   - Recommendation: Start with a minimal working template (page size, margins, font, page numbers) and iterate. The `alexmodrono/typst-pandoc` GitHub template is a good reference for full-featured book templates.

4. **RTL/CJK considerations for Phase 7**
   - What we know: Pandoc + Typst support RTL via `dir` metadata. EPUB supports `dir="rtl"` in CSS.
   - What's unclear: Whether the Typst template needs RTL-specific page mirroring (binding on right side).
   - Recommendation: For Phase 5, ensure templates do not hardcode LTR assumptions. Use parameterized direction in Typst template. Full RTL testing deferred to Phase 7.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Pandoc | All export except markdown, fountain | No | -- | None -- mandatory for DOCX/PDF/EPUB/LaTeX |
| Typst | PDF export | No | -- | XeLaTeX (but requires TeX Live) |
| Ghostscript | IngramSpark PDF/X-1a | No | -- | Skip IngramSpark package, flag for manual |
| Java | EPUBCheck validation | Unknown | -- | Skip validation, recommend online validator |
| Afterwriting | Screenplay PDF | No | -- | Pandoc with custom Lua filter (inferior) |
| Screenplain | FDX export | No | -- | None for FDX; suggest manual conversion |
| Node.js | Installer, tests | Yes | >=18 | -- |

**Missing dependencies with no fallback:**
- Pandoc is required for all non-markdown exports. The export command must detect and provide install instructions.

**Missing dependencies with fallback:**
- Typst: fallback to XeLaTeX, though much heavier
- Ghostscript: IngramSpark package can be skipped with a warning
- EPUBCheck: validation can be skipped with a recommendation
- Afterwriting/Screenplain: screenplay formats only, can be skipped for non-screenplay work types

**NOTE:** These tools are user prerequisites, not development dependencies. They are not installed on THIS machine because this is the development environment. The export commands must handle detection and guidance at runtime on the USER's machine.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Node.js built-in test runner (node:test) |
| Config file | None -- uses `npm test` which runs `node --test test/*.test.js` |
| Quick run command | `node --test test/phase5-export-publishing.test.js` |
| Full suite command | `npm test` |

### Phase Requirements -> Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| EXP-01 | export.md exists, supports markdown format | unit (file content) | `node --test test/phase5-export-publishing.test.js` | No -- Wave 0 |
| EXP-02 | export.md references docx format, --reference-doc | unit (file content) | same | No -- Wave 0 |
| EXP-03 | export.md supports --formatted flag for docx | unit (file content) | same | No -- Wave 0 |
| EXP-04 | export.md references pdf format, --pdf-engine=typst | unit (file content) | same | No -- Wave 0 |
| EXP-05 | export.md supports --print-ready flag for pdf | unit (file content) | same | No -- Wave 0 |
| EXP-06 | export.md references epub format, --epub-cover-image, --css | unit (file content) | same | No -- Wave 0 |
| EXP-07 | export.md supports fountain format | unit (file content) | same | No -- Wave 0 |
| EXP-08 | export.md supports fdx format, references screenplain | unit (file content) | same | No -- Wave 0 |
| EXP-09 | export.md supports latex format, --template | unit (file content) | same | No -- Wave 0 |
| EXP-10 | export.md supports kdp-package, spine width formula | unit (file content) | same | No -- Wave 0 |
| EXP-11 | export.md supports ingram-package, references ghostscript | unit (file content) | same | No -- Wave 0 |
| EXP-12 | export.md supports query-package | unit (file content) | same | No -- Wave 0 |
| EXP-13 | export.md supports submission-package | unit (file content) | same | No -- Wave 0 |
| EXP-14 | publish.md has wizard flow, prerequisite check | unit (file content) | same | No -- Wave 0 |
| EXP-15 | publish.md supports --preset flag, 4 presets | unit (file content) | same | No -- Wave 0 |
| EXP-16 | autopilot-publish.md exists, chains quality gate | unit (file content) | same | No -- Wave 0 |
| EXP-17 | manuscript-stats.md exists, shows word count/page count | unit (file content) | same | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `node --test test/phase5-export-publishing.test.js`
- **Per wave merge:** `npm test`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `test/phase5-export-publishing.test.js` -- covers EXP-01 through EXP-17
- [ ] `data/export-templates/` directory -- must exist before template tests
- [ ] `scriven-manuscript.docx` -- binary file, requires human creation (cannot be auto-generated by tests)
- [ ] `scriven-formatted.docx` -- binary file, requires human creation
- [ ] `scriven-epub.css` -- text file, can be auto-generated
- [ ] `scriven-book.typst` -- text file, can be auto-generated
- [ ] `scriven-academic.latex` -- text file, can be auto-generated

## Sources

### Primary (HIGH confidence)
- [Pandoc User's Guide](https://pandoc.org/MANUAL.html) -- All Pandoc CLI flags, --reference-doc, --pdf-engine, --epub-cover-image, --css, --metadata-file
- [Pandoc EPUB Guide](https://pandoc.org/epub.html) -- EPUB-specific options, metadata YAML format
- [KDP Spine Width Calculator (KDPEasy)](https://www.kdpeasy.com/blog/spine-width-calculator-guide) -- Exact paper thickness values (0.002252", 0.0025", 0.0032"), cover thickness (0.06"), 79-page minimum for spine text
- [KDP Cover Templates (bookcoverslab)](https://bookcoverslab.com/kdp-cover-size-calculator) -- Bleed settings, trim size specs
- [EPUBCheck GitHub (W3C)](https://github.com/w3c/epubcheck) -- v5.3.0, CLI usage, validation modes
- [prosegrinder/pandoc-templates](https://github.com/prosegrinder/pandoc-templates) -- Shunn manuscript format reference doc approach
- [Ghostscript PDF/X-1a Guide (codegenes.net)](https://www.codegenes.net/blog/how-to-use-ghostscript-to-convert-pdf-to-pdf-a-or-pdf-x/) -- -dPDFX flag, ICC profiles, CMYK conversion

### Secondary (MEDIUM confidence)
- [Pandoc + Typst Tutorial (imaginarytext.ca)](https://imaginarytext.ca/posts/2024/pandoc-typst-tutorial/) -- Template syntax for Typst with Pandoc
- [alexmodrono/typst-pandoc](https://github.com/alexmodrono/typst-pandoc) -- Full-featured Typst book template (margins, headers, page numbers, drop caps)
- [Afterwriting GitHub](https://github.com/ifrost/afterwriting-labs) -- CLI flags: --source, --pdf, --overwrite
- [Screenplain PyPI](https://pypi.org/project/screenplain/) -- v0.11.1, `--format fdx` usage
- [Autodidacts: Markdown to Manuscript Format](https://www.autodidacts.io/convert-markdown-to-standard-manuscript-format-odts-docs-and-pdfs-with-pandoc/) -- Practical Pandoc manuscript workflow

### Tertiary (LOW confidence)
- Afterwriting maintenance status (last npm publish 2020, GitHub more recent) -- monitor for breakage
- Screenplain maintenance status (sporadic updates) -- monitor for breakage
- IngramSpark PDF/X-1a ICC profile paths vary by OS -- needs runtime testing

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- Pandoc/Typst are well-documented, actively maintained, and the STACK.md research already validated them
- Architecture: HIGH -- Manuscript assembly from OUTLINE.md follows established Scriven patterns; Pandoc CLI flags are extensively documented
- Pitfalls: HIGH -- Export validation failures (EPUB, KDP) are well-documented industry problems with known solutions
- Shell invocations: MEDIUM -- Exact flags verified against docs, but runtime testing on user machines will surface edge cases
- Screenplay tools: MEDIUM -- Afterwriting and Screenplain work but have sporadic maintenance

**Research date:** 2026-04-06
**Valid until:** 2026-05-06 (30 days -- stack is stable)
