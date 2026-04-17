---
phase: 35-academic-latex-wrappers
reviewed: 2026-04-17T00:00:00Z
depth: standard
files_reviewed: 8
files_reviewed_list:
  - data/export-templates/scriven-ieee.latex
  - data/export-templates/scriven-acm.latex
  - data/export-templates/scriven-lncs.latex
  - data/export-templates/scriven-elsevier.latex
  - data/export-templates/scriven-apa7.latex
  - commands/scr/build-print.md
  - data/CONSTRAINTS.json
  - test/phase35-academic-latex-wrappers.test.js
findings:
  critical: 0
  warning: 7
  info: 4
  total: 11
status: issues_found
---

# Phase 35: Code Review Report

**Reviewed:** 2026-04-17
**Depth:** standard
**Files Reviewed:** 8
**Status:** issues_found

## Summary

Phase 35 delivers five academic LaTeX wrapper templates (IEEE, ACM, Springer LNCS, Elsevier, APA7) and integrates them into the `build-print` command. The test suite and CONSTRAINTS.json are internally consistent and cover the right assertions. The primary issues are LaTeX-correctness problems in the templates — two publisher classes (`acmart`, `apa7`) are sensitive to how their required packages are loaded, and three templates use `\author{}` syntax that departs from the publisher class expectations in ways that produce structurally incomplete output. The command also checks for Typst prerequisites on academic builds where Typst is never used, which will incorrectly block academic LaTeX output on machines that lack Typst.

No security issues were found. No hardcoded secrets. The test suite is well-structured.

---

## Warnings

### WR-01: Typst prerequisite check blocks academic LaTeX builds unnecessarily

**File:** `commands/scr/build-print.md:244-258`
**Issue:** STEP 2 always checks for Typst and stops if it is not found, regardless of platform. Academic platforms (`ieee`, `acm`, `lncs`, `elsevier`, `apa7`) set `TYPST_TEMPLATE` to null and produce `.tex` output only — Typst is never invoked. A researcher on a machine with TeX Live but not Typst will be incorrectly blocked from building academic output.
**Fix:** Gate the Typst check behind a condition that excludes academic platforms:

```markdown
**If `--platform` is NOT one of `ieee`, `acm`, `lncs`, `elsevier`, `apa7`, check for Typst:**

```bash
command -v typst >/dev/null 2>&1
```
```

---

### WR-02: ACM template loads packages already bundled by `acmart.cls`

**File:** `data/export-templates/scriven-acm.latex:12-16`
**Issue:** `acmart.cls` internally loads `amsmath`, `amssymb`, and `graphicx`. Lines 12–16 and 19–23 load them again with `\usepackage`. With modern TeX Live this triggers "LaTeX Warning: You have requested package X, but the package provides Y" or silent option conflicts. The `\setkeys{Gin}` call at line 23 may shadow acmart's own image sizing configuration.
**Fix:** Remove the duplicate package loads from the ACM template. If custom `Gin` key sizing is desired, wrap it in a conditional that checks whether `acmart` has already set those keys:

```latex
% acmart.cls already loads amsmath, amssymb, and graphicx internally.
% Do NOT add \usepackage{amsmath,amssymb} or \usepackage{graphicx} here.
% Math support and graphics are available without additional declarations.
```

---

### WR-03: APA7 template requires `biblatex` but provides no injection hook

**File:** `data/export-templates/scriven-apa7.latex:7, 35-48`
**Issue:** The `apa7` class requires `biblatex` with the `apa` style for bibliography support. The comment at line 7 instructs users to add this "in your local preamble additions," but there is no `$header-includes$` variable in the template to inject it through Pandoc YAML front matter. Users who attempt `\printbibliography` in their document will get a LaTeX error because `biblatex` was never loaded and `\printbibliography` is undefined.
**Fix:** Add `$header-includes$` support AND provide a commented default that users can activate:

```latex
% Pandoc: allow preamble additions via header-includes in metadata YAML
$for(header-includes)$
$header-includes$
$endfor$

% APA7 requires biblatex-apa. Uncomment if using bibliography:
% \usepackage[style=apa,sortcites=true,sorting=nyt,backend=biber]{biblatex}
% \addbibresource{references.bib}
```

---

### WR-04: IEEE keywords use plain text instead of `IEEEkeywords` environment

**File:** `data/export-templates/scriven-ieee.latex:65-67`
**Issue:** IEEE papers require keywords inside `\begin{IEEEkeywords}...\end{IEEEkeywords}`. The current template renders keywords as `\noindent\textbf{Keywords:} $keywords$` (lines 65–67), which is plain bold text outside the designated environment. This will produce non-compliant output for IEEE Transactions and conference submissions; reviewers using IEEE PDF checkers will flag it.
**Fix:**
```latex
$if(keywords)$
\begin{IEEEkeywords}
$keywords$
\end{IEEEkeywords}
$endif$
```

---

### WR-05: LNCS template omits `\institute{}` — required for author affiliations

**File:** `data/export-templates/scriven-lncs.latex:52`
**Issue:** The `llncs` class requires `\institute{}` alongside `\author{}` to render author affiliations. Without `\institute{}`, Springer LNCS papers compile silently but produce an author block with no institutional affiliation — a mandatory field for camera-ready Springer submission. The `\and` separator (line 52) is correct but incomplete without the corresponding institute block.
**Fix:** Extend the author metadata block to include an institute field:

```latex
\author{$if(author)$$for(author)$$if(it.name)$$it.name$$else$$it$$endif$$sep$ \and $endfor$$else$~$endif$}
\institute{$if(author)$$for(author)$$if(it.affiliation)$$it.affiliation$$endif$$sep$ \and $endfor$$else$~$endif$}
```

This maps to the Pandoc YAML field `affiliation:` nested under each author entry.

---

### WR-06: Elsevier template uses wrong `\author{}` syntax for `elsarticle`

**File:** `data/export-templates/scriven-elsevier.latex:52-53`
**Issue:** `elsarticle.cls` expects authors declared with `\author[label]{name}` and addresses with `\address[label]{affiliation}` (or `\affiliation{}` in newer versions). The generic `\author{...}` with `\and` separators (line 53) is standard article-class syntax and not the `elsarticle` convention. This compiles but produces an author block without affiliation linkage — structurally non-compliant for Elsevier submission.
**Fix:** Add an address/affiliation block after the author declaration:

```latex
\author{$if(author)$$for(author)$$if(it.name)$$it.name$$else$$it$$endif$$sep$ \and $endfor$$else$~$endif$}
$if(author)$$for(author)$$if(it.affiliation)$
\address{$it.affiliation$}
$endif$$endfor$$endif$
```

---

### WR-07: STEP 5 general report block runs unconditionally before the academic-specific block

**File:** `commands/scr/build-print.md:545-548`
**Issue:** The STEP 5 report shows a general `print-{platform}.pdf` line and `ls` command for file size before the academic-specific block (lines 554–564). The general block is formatted as if it always executes, meaning for academic platforms it would attempt to report on a `.pdf` that was never created (`print-ieee.pdf`, `print-acm.pdf`, etc.), producing a misleading or empty report line. The academic block does override this, but the phrasing of the general block ("Show:") is unconditional.
**Fix:** Make the general block explicitly conditional on non-academic platforms:

```markdown
**If `--platform` is NOT one of `ieee`, `acm`, `lncs`, `elsevier`, `apa7`:**

Show:
```
✓ PDF built → .manuscript/output/print-{platform}.pdf ({file_size})
```
```

---

## Info

### IN-01: All five templates are missing `$header-includes$` Pandoc variable

**File:** `data/export-templates/scriven-ieee.latex`, `data/export-templates/scriven-acm.latex`, `data/export-templates/scriven-lncs.latex`, `data/export-templates/scriven-elsevier.latex`, `data/export-templates/scriven-apa7.latex`
**Issue:** None of the five templates include the `$for(header-includes)$` Pandoc variable. This is the standard mechanism for injecting arbitrary LaTeX into the preamble via the `header-includes:` YAML field. Without it, users cannot add custom packages (extra math fonts, hyperref options, booktabs for tables) without editing the template directly.
**Fix:** Add after the last `\usepackage` block in each template:

```latex
% Pandoc: allow preamble additions via header-includes in metadata YAML
$for(header-includes)$
$header-includes$
$endfor$
```

---

### IN-02: `CONSTRAINTS.json` — `pdf_print_ready` omits `academic` while `build_print` includes it

**File:** `data/CONSTRAINTS.json:1257, 1263`
**Issue:** `"pdf_print_ready": { "available": ["prose", "visual", "poetry", "sacred"] }` (line 1257) does not include `"academic"`, while `"build_print": { "available": ["prose", "visual", "poetry", "sacred", "academic"] }` (line 1263) does. These two keys describe overlapping capability — a consumer querying `pdf_print_ready` for academic work types would get a false negative. The discrepancy could cause silent mis-routing in export commands that check `pdf_print_ready` rather than `build_print`.
**Fix:** Either add `"academic"` to `pdf_print_ready.available`, or add a note that academic output produces `.tex` not `.pdf`:

```json
"pdf_print_ready": { "available": ["prose", "visual", "poetry", "sacred"], "_note": "Academic uses build_print with .tex output via LaTeX wrapper templates" }
```

---

### IN-03: STEP 2.5 platform validation runs after STEP 1.8 template resolution

**File:** `commands/scr/build-print.md:174-194, 350-383`
**Issue:** STEP 1.8 (lines 174–194) resolves the LaTeX template path and checks whether the file exists, but STEP 2.5 (lines 350–383) is where the platform slug is formally validated as a valid value. If an invalid slug is passed, STEP 1.8 will silently produce a nonsense path (`data/export-templates/scriven-badplatform.latex`) and then report "template missing" instead of "platform not recognised." The diagnostic message is misleading.
**Fix:** Move the platform slug validation to happen immediately after argument parsing — before STEP 1.8 — or add a guard at the top of STEP 1.8 that skips the file-existence check for unrecognised slugs.

---

### IN-04: Test suite redundant null guard in every `it()` block

**File:** `test/phase35-academic-latex-wrappers.test.js`
**Issue:** Every test case calls `readFile()` and then asserts `content !== null` as a guard before the primary assertion. If `content` is null (file missing), both assertions fail independently with different messages — the first with a generic guard message, the second with the more descriptive primary message. The first assert is redundant noise that doubles the failure count. Example: lines 34–39 produce two failures when the file is absent, when one is sufficient.
**Fix:** Remove the guard assert from each test case. The primary assertion's message already identifies the missing file clearly. Alternatively, consolidate by returning early with a skip if the file is absent (requires a `beforeEach` setup):

```js
it('scriven-ieee.latex contains \\documentclass with IEEEtran — TPL-07', () => {
  const content = readFile(TPLFILE);
  assert.ok(
    content !== null && content.includes('\\documentclass') && content.includes('IEEEtran'),
    'scriven-ieee.latex must exist and contain \\documentclass with IEEEtran — TPL-07'
  );
});
```

---

_Reviewed: 2026-04-17_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
