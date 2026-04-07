---
phase: 03-creative-toolkit
plan: 03
subsystem: structure
tags: [outline, structure-management, draft-safety, constraints, polymorphic]

requires:
  - phase: 03-creative-toolkit/03-02
    provides: "Plot-graph, timeline, theme-tracker, subplot-map commands and CONSTRAINTS.json structure entries"
provides:
  - "6 structure management commands: add-unit, insert-unit, remove-unit, split-unit, merge-units, reorder-units"
  - "CONSTRAINTS.json entries for outline and all 6 structure management commands"
  - "feature_prerequisites entries for all new structure commands"
affects: [04-quality-publishing, structure-commands, constraints-system]

tech-stack:
  added: []
  patterns: [draft-safe-structure-modification, work-type-polymorphic-unit-naming, archive-before-delete]

key-files:
  created:
    - commands/scr/add-unit.md
    - commands/scr/insert-unit.md
    - commands/scr/remove-unit.md
    - commands/scr/split-unit.md
    - commands/scr/merge-units.md
    - commands/scr/reorder-units.md
  modified:
    - data/CONSTRAINTS.json

key-decisions:
  - "Structure commands use archive-before-delete pattern for remove-unit to protect writer prose"
  - "All 6 structure commands hidden from poetry and speech_song work types (no outline structure)"

patterns-established:
  - "Draft-safe modification: scan .manuscript/drafts/, warn, confirm before any structural change (D-07)"
  - "Structure management category in CONSTRAINTS.json for outline manipulation commands"

requirements-completed: [STRUCT-06, CHAR-08]

duration: 3min
completed: 2026-04-07
---

# Phase 03 Plan 03: Structure Management Commands Summary

**6 draft-safe structure management commands (add/insert/remove/split/merge/reorder) with work-type polymorphism via CONSTRAINTS.json hierarchy**

## Performance

- **Duration:** 3 min
- **Started:** 2026-04-07T06:06:08Z
- **Completed:** 2026-04-07T06:09:31Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- Created 6 structure management commands covering all outline manipulation operations (STRUCT-06)
- All commands implement draft-safety per D-07: scan for affected drafts, warn, require confirmation before modifying
- Updated CONSTRAINTS.json with 7 new command entries (outline + 6 management commands) and feature_prerequisites
- All existing tests pass (137 command tests, 7 constraint tests, 0 failures)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create 6 structure management commands with draft-safety** - `a9571ff` (feat)
2. **Task 2: Update CONSTRAINTS.json with entries for all new Phase 3 commands** - `a6738ed` (feat)

## Files Created/Modified
- `commands/scr/add-unit.md` - Add new unit to end of outline
- `commands/scr/insert-unit.md` - Insert unit at specific position with renumbering
- `commands/scr/remove-unit.md` - Remove unit with archive option for drafted content
- `commands/scr/split-unit.md` - Split one unit into two with draft content allocation
- `commands/scr/merge-units.md` - Merge two adjacent units with draft concatenation
- `commands/scr/reorder-units.md` - Move unit to new position with before/after comparison
- `data/CONSTRAINTS.json` - Added outline, add-unit, insert-unit, remove-unit, split-unit, merge-units, reorder-units entries

## Decisions Made
- Structure commands use archive-before-delete pattern in remove-unit: writer can move draft to `.manuscript/archive/` instead of permanent deletion
- All 6 structure management commands hidden from poetry and speech_song work types since those lack outline structure
- Adapted field left empty (`{}`) for structure commands since unit terminology is already handled by CONSTRAINTS.json hierarchy lookup

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all commands are fully specified with complete instruction sections.

## Next Phase Readiness
- All 13 new Phase 3 commands are now built (character tools from 03-01, visualization from 03-02, structure from 03-03)
- CONSTRAINTS.json has entries for all new commands
- Phase 3 plan 04 (tests) can proceed to validate all Phase 3 work

## Self-Check: PASSED

All 8 files verified on disk. Both task commits (a9571ff, a6738ed) confirmed in git log.

---
*Phase: 03-creative-toolkit*
*Completed: 2026-04-07*
