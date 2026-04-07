---
phase: 05-export-publishing
plan: 01
subsystem: export
tags: [pandoc, typst, epub, docx, pdf, latex, export-templates]

# Dependency graph
requires:
  - phase: 04-quality-publishing-prep
    provides: front-matter and back-matter commands for manuscript assembly
provides:
  - Export template files for Typst (book PDF), EPUB CSS, and LaTeX (academic)
  - Main export command with 6 primary format dispatching (markdown, docx, docx --formatted, pdf, pdf --print-ready, epub)
  - Manuscript assembly pipeline from OUTLINE.md with front/body/back matter concatenation
  - Metadata YAML generation from config.json for Pandoc
affects: [05-02-secondary-formats, 05-03-publishing-wizard, 07-translation]

# Tech tracking
tech-stack:
  added: [pandoc, typst]
  patterns: [external-tool-detection, manuscript-assembly, format-dispatching]

key-files:
  created:
    - data/export-templates/scriven-book.typst
    - data/export-templates/scriven-epub.css
    - data/export-templates/scriven-academic.latex
    - commands/scr/export.md
  modified: []

key-decisions:
  - "Typst template uses parameterized text direction for Phase 7 RTL compatibility"
  - "EPUB CSS uses em/rem units exclusively for KDP compatibility (no px for font sizes)"
  - "Export command uses single-file format dispatching pattern per research Pattern 3"

patterns-established:
  - "External tool detection: command -v <tool> with platform-specific install instructions before invocation"
  - "Manuscript assembly: OUTLINE.md for order, front-matter/ by numeric prefix, back-matter/ alphabetically"
  - "Extension point comments for Plan 02 secondary formats and packages"

requirements-completed: [EXP-01, EXP-02, EXP-03, EXP-04, EXP-05, EXP-06]

# Metrics
duration: 2min
completed: 2026-04-07
---

# Phase 5 Plan 1: Export Templates & Primary Formats Summary

**Typst/EPUB/LaTeX export templates plus main export command with manuscript assembly and 6-format Pandoc dispatching**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-07T08:23:51Z
- **Completed:** 2026-04-07T08:26:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Three professional export templates: Typst book interior (parameterized dimensions, running headers, RTL-ready), EPUB CSS (KDP-compatible relative units, accessibility comments), LaTeX academic (biblatex/biber, abstract, citeproc)
- Main export command with full manuscript assembly pipeline reading OUTLINE.md for document order, concatenating front/body/back matter with page breaks
- Format dispatching for 6 primary formats: markdown, docx, docx --formatted, pdf, pdf --print-ready, epub with exact Pandoc invocations from research
- External tool detection for Pandoc and Typst with platform-specific install instructions

## Task Commits

Each task was committed atomically:

1. **Task 1: Create export template files** - `d6701c3` (feat)
2. **Task 2: Create export command with primary formats** - `dc11f60` (feat)

## Files Created/Modified
- `data/export-templates/scriven-book.typst` - Typst book interior template with parameterized page dimensions, margins, running headers, widow/orphan control
- `data/export-templates/scriven-epub.css` - EPUB stylesheet with KDP-compatible relative units, chapter breaks, image handling, scene break styling
- `data/export-templates/scriven-academic.latex` - LaTeX academic template with biblatex bibliography, abstract, TOC, citeproc compatibility
- `commands/scr/export.md` - Main export command with OUTLINE.md assembly, tool detection, metadata YAML generation, and 6-format Pandoc dispatching

## Decisions Made
- Typst template uses parameterized `text-dir` variable (defaults to `ltr`) so Phase 7 RTL support can set it without template changes
- EPUB CSS uses `em`/`rem` units exclusively for font sizes per KDP requirement (no `px`)
- Export command follows single-file format-dispatching pattern (research Pattern 3) with extension point comments for Plan 02
- LaTeX template supports both `biblatex` (native) and `citeproc` (Pandoc) citation approaches

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required. Export templates are static files. External tools (Pandoc, Typst) are detected at runtime with install instructions if missing.

## Known Stubs

- **DOCX reference docs not yet created:** `data/export-templates/scriven-manuscript.docx` and `data/export-templates/scriven-formatted.docx` are referenced by the export command but are binary files that require manual creation (noted in research as a human task). The export command handles their absence gracefully with a warning.

## Next Phase Readiness
- Primary export formats ready for use
- Plan 02 will add secondary formats (fountain, fdx, latex) and packages (kdp, ingram, query, submission)
- DOCX reference docs need manual creation (binary .docx files) before docx export works with proper manuscript styling

## Self-Check: PASSED

All 4 created files verified on disk. Both task commits (d6701c3, dc11f60) verified in git log.

---
*Phase: 05-export-publishing*
*Completed: 2026-04-07*
