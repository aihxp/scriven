---
phase: 07-translation-localization
plan: 03
subsystem: translation
tags: [autopilot-translate, rtl, cjk, bidi, typst, epub, constraints, i18n]

# Dependency graph
requires:
  - phase: 07-translation-localization plan 01
    provides: translate, translation-glossary, translation-memory commands
  - phase: 07-translation-localization plan 02
    provides: cultural-adaptation, back-translate, multi-publish commands
  - phase: 05-export-formats
    provides: export templates (scriven-book.typst, scriven-epub.css)
provides:
  - autopilot-translate command chaining all 6 translation phases per language
  - RTL text direction support in Typst PDF template (mirrored headers/margins)
  - CJK font fallback and line spacing in Typst template
  - RTL direction/bidi/list/blockquote rules in EPUB CSS
  - CJK word-break, line-break, writing-mode, justification rules in EPUB CSS
  - All 7 translation commands registered in CONSTRAINTS.json with prerequisites
affects: [07-translation-localization plan 04, 08-collaboration-runtime-sacred]

# Tech tracking
tech-stack:
  added: []
  patterns: [parallel-per-language-pipeline, rtl-header-mirroring, cjk-font-fallback, cjk-emphasis-dots]

key-files:
  created:
    - commands/scr/autopilot-translate.md
  modified:
    - data/export-templates/scriven-book.typst
    - data/export-templates/scriven-epub.css
    - data/CONSTRAINTS.json

key-decisions:
  - "CJK emphasis uses text-emphasis dots instead of italic per CJK typographic convention"
  - "CJK line height set to 1.8 (vs 1.5 LTR) for readability with dense ideographic characters"
  - "RTL header mirroring flips recto/verso alignment based on text-dir variable"

patterns-established:
  - "RTL detection: text-dir variable in Typst, dir attribute in EPUB HTML"
  - "CJK font selection: Noto Sans CJK with language-specific variants (SC/JP/KR)"
  - "Translation pipeline phases: glossary -> translate -> TM -> cultural-adaptation -> back-translate -> multi-publish"

requirements-completed: [TRANS-07, TRANS-08]

# Metrics
duration: 3min
completed: 2026-04-07
---

# Phase 07 Plan 03: Autopilot-Translate and RTL/CJK Support Summary

**Unattended multi-language translation pipeline with RTL bidi/margin mirroring and CJK line-break/font-fallback in PDF and EPUB templates**

## Performance

- **Duration:** 3 min
- **Started:** 2026-04-07T13:48:59Z
- **Completed:** 2026-04-07T13:52:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Created autopilot-translate command that chains 6 phases per language (glossary, translate, TM, cultural-adaptation, back-translate, multi-publish) with parallel per-language execution and resume support
- Added RTL support to Typst template (header alignment mirroring, text direction) and EPUB CSS (direction, unicode-bidi, mirrored padding/lists)
- Added CJK support to Typst template (Noto Sans CJK font fallback, wider line spacing, 2em indent) and EPUB CSS (word-break, line-break strict for Japanese, vertical writing-mode option, emphasis dots)
- Registered all 7 translation commands in CONSTRAINTS.json with correct categories, hard prerequisites, soft prerequisites, and descriptions

## Task Commits

Each task was committed atomically:

1. **Task 1: Create autopilot-translate and update RTL/CJK templates** - `bbdb82f` (feat)
2. **Task 2: Update CONSTRAINTS.json with all translation commands** - `c4de876` (feat)

## Files Created/Modified
- `commands/scr/autopilot-translate.md` - Unattended 6-phase per-language translation pipeline with RTL/CJK detection, resume, and parallel agents
- `data/export-templates/scriven-book.typst` - RTL header mirroring, CJK font fallback (Noto Sans CJK), CJK line spacing
- `data/export-templates/scriven-epub.css` - RTL direction/bidi/list/blockquote rules, CJK word-break/line-break/writing-mode/justification/emphasis rules
- `data/CONSTRAINTS.json` - All 7 translation commands with categories, descriptions, hard and soft prerequisites

## Decisions Made
- CJK emphasis uses `text-emphasis-style: filled dot` instead of italic, following CJK typographic convention where italic is not standard for emphasis
- CJK line height increased to 1.8 (from 1.5) and paragraph indent to 2em (from 1em) for readability with dense ideographic characters
- RTL header mirroring implemented via conditional alignment based on `is-rtl` flag rather than separate template, keeping a single template file for all languages

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All translation commands are now registered in CONSTRAINTS.json and discoverable
- RTL/CJK export support is wired into both PDF (Typst) and EPUB (CSS) templates
- Ready for plan 04 (tests) to verify translation pipeline integration

---
*Phase: 07-translation-localization*
*Completed: 2026-04-07*
