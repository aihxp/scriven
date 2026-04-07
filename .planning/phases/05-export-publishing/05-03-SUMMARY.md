---
phase: 05-export-publishing
plan: 03
subsystem: commands
tags: [manuscript-stats, constraints, publishing, word-count, export]

# Dependency graph
requires:
  - phase: 01-mvp-polish
    provides: CONSTRAINTS.json structure and command patterns
provides:
  - manuscript-stats command for writer metrics (word count, pages, reading time)
  - export and autopilot-publish command entries in CONSTRAINTS.json
affects: [05-export-publishing, publishing pipeline]

# Tech tracking
tech-stack:
  added: []
  patterns: [stats-display-command, publishing-command-registration]

key-files:
  created:
    - commands/scr/manuscript-stats.md
  modified:
    - data/CONSTRAINTS.json

key-decisions:
  - "manuscript-stats reads from .manuscript/drafts/body/ for body count and separate front/back matter directories"
  - "250 words/page standard and 250/200 wpm reading speeds for average/careful estimates"

patterns-established:
  - "Stats command pattern: load context, count, calculate, display with optional --detail"

requirements-completed: [EXP-17]

# Metrics
duration: 2min
completed: 2026-04-07
---

# Phase 05 Plan 03: Manuscript Stats & CONSTRAINTS Update Summary

**manuscript-stats command showing word count, page count, reading time, and draft completion; CONSTRAINTS.json updated with export and autopilot-publish command entries**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-07T08:23:41Z
- **Completed:** 2026-04-07T08:25:20Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Created manuscript-stats command with word count, chapter count, estimated page count, and reading time metrics
- Added export and autopilot-publish command entries to CONSTRAINTS.json with proper category and prerequisites
- Preserved all existing entries (publish, manuscript-stats) in CONSTRAINTS.json

## Task Commits

Each task was committed atomically:

1. **Task 1: Create manuscript-stats command** - `3dfbe9c` (feat)
2. **Task 2: Update CONSTRAINTS.json with export-phase commands** - `9615727` (feat)

## Files Created/Modified
- `commands/scr/manuscript-stats.md` - Manuscript statistics display command with word count, page count, reading time, draft completion, and --detail per-unit breakdown
- `data/CONSTRAINTS.json` - Added export (publishing, requires complete-draft) and autopilot-publish (publishing, requires complete-draft) command entries

## Decisions Made
- manuscript-stats uses 250 words/page for page estimation (industry standard)
- Two reading speed tiers: 250 wpm (average) and 200 wpm (careful) for different reading contexts
- Body word count separated from full word count (body + front/back matter) for clearer metrics
- --detail flag shows per-unit breakdown matching outline structure

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- manuscript-stats command ready for use alongside other navigation commands
- CONSTRAINTS.json now has all Phase 5 command entries registered
- Export and autopilot-publish commands can be implemented in subsequent plans with proper prerequisite gating

## Self-Check: PASSED

- commands/scr/manuscript-stats.md: FOUND
- 05-03-SUMMARY.md: FOUND
- Commit 3dfbe9c: FOUND
- Commit 9615727: FOUND

---
*Phase: 05-export-publishing*
*Completed: 2026-04-07*
