---
phase: 05-export-publishing
plan: 02
subsystem: export
tags: [fountain, fdx, screenplain, latex, citeproc, kdp, ingram, ghostscript, query-package, submission-package]

# Dependency graph
requires:
  - phase: 05-01
    provides: export command with 6 primary formats and manuscript assembly pipeline
provides:
  - Secondary format exports (fountain, fdx, latex) with work type gating
  - Platform packages (kdp-package, ingram-package, query-package, submission-package)
  - Dynamic spine width calculation for KDP and IngramSpark
  - CMYK PDF/X-1a conversion via Ghostscript for IngramSpark
affects: [05-03-publishing-wizard, 06-illustration]

# Tech tracking
tech-stack:
  added: [screenplain, afterwriting, ghostscript]
  patterns: [format-chaining, dynamic-spine-calculation, prerequisite-bundling, tool-detection]

key-files:
  created: []
  modified:
    - commands/scr/export.md

key-decisions:
  - "Fountain export writes Fountain-formatted text directly without external tools"
  - "FDX export chains through Fountain intermediate (markdown -> fountain -> fdx via screenplain)"
  - "KDP spine width uses exact paper factors: white=0.002252, cream=0.0025, color=0.0032"
  - "IngramSpark CMYK conversion warns about ICC profile dependency for color accuracy"

patterns-established:
  - "Format chaining: fdx requires fountain as intermediate, packages require primary format outputs"
  - "Prerequisite checking: packages verify required outputs exist and suggest generation commands"
  - "Dynamic calculation: spine width and cover dimensions computed at export time from word count and config"

requirements-completed: [EXP-07, EXP-08, EXP-09, EXP-10, EXP-11, EXP-12, EXP-13]

# Metrics
duration: 2min
completed: 2026-04-07
---

# Phase 5 Plan 2: Secondary Formats & Platform Packages Summary

**Fountain/FDX/LaTeX secondary exports plus KDP, IngramSpark, query, and submission platform packages with dynamic spine width calculation**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-07T08:29:10Z
- **Completed:** 2026-04-07T08:31:10Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- Three secondary format sections added to export.md: Fountain (direct write with scene heading/dialogue conversion rules), FDX (chained through Fountain via screenplain with tool detection), LaTeX (Pandoc with scriven-academic.latex template, optional bibliography, citeproc)
- Four platform package sections: KDP package with dynamic spine width formula per D-05 (three paper factors + 0.06 cover thickness), IngramSpark with Ghostscript CMYK PDF/X-1a conversion, query package bundling query letter + synopsis + sample chapters into combined DOCX, submission package with full manuscript + checklist
- Work type availability gating from CONSTRAINTS.json for all new formats (fountain/fdx: script only, latex: academic/sacred, packages: per constraint definitions)
- External tool detection for screenplain, afterwriting, and ghostscript with platform-specific install instructions

## Task Commits

Each task was committed atomically:

1. **Task 1: Add secondary formats to export command** - `48fd01e` (feat)
2. **Task 2: Add platform packages to export command** - `76eacc0` (feat)

## Files Created/Modified
- `commands/scr/export.md` - Extended with 7 new format/package sections (fountain, fdx, latex, kdp-package, ingram-package, query-package, submission-package), now contains all 13 export formats

## Decisions Made
- Fountain export writes Fountain text directly (agent converts markdown to Fountain format rules) rather than using an external tool -- Fountain is a plain-text format the agent understands
- FDX chains through Fountain as intermediate (markdown -> fountain -> fdx) since screenplain only accepts Fountain input
- KDP spine width uses three paper factors from verified KDP documentation: white (0.002252), cream (0.0025), color (0.0032)
- IngramSpark package includes ICC color profile warning since CMYK conversion quality depends on system profiles

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required. Export tools (screenplain, afterwriting, ghostscript) are detected at runtime with install instructions if missing.

## Known Stubs

None - all format sections contain complete instructions for the AI agent to execute.

## Next Phase Readiness
- All 13 export formats/packages now implemented in export.md
- Plan 03 (publishing wizard) can chain these formats via presets
- KDP cover dimensions available for Phase 6 illustration (cover art generation)

## Self-Check: PASSED

All files verified on disk. Both task commits (48fd01e, 76eacc0) verified in git log.

---
*Phase: 05-export-publishing*
*Completed: 2026-04-07*
