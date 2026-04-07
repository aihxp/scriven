---
phase: 05-export-publishing
plan: 04
subsystem: publishing
tags: [publish-wizard, presets, autopilot-publish, quality-gate, voice-check, continuity-check]

# Dependency graph
requires:
  - phase: 05-01
    provides: Export command with primary format dispatching and manuscript assembly
  - phase: 05-02
    provides: Secondary formats and packages (kdp-package, query-package, etc.)
provides:
  - Publishing wizard with prerequisite checking and 8 preset pipelines
  - Autopilot-publish command with voice-check + continuity-check quality gate
  - Interactive wizard flow guiding first-time publishers through destination selection
affects: [05-05-manuscript-stats]

# Tech tracking
tech-stack:
  added: []
  patterns: [prerequisite-checking, preset-pipeline-chaining, quality-gate-warn-not-block]

key-files:
  created:
    - commands/scr/autopilot-publish.md
  modified:
    - commands/scr/publish.md

key-decisions:
  - "Quality gate warns but does not block per D-09 -- even FAIL scores proceed to export"
  - "8 presets total: 4 locked (D-08) plus 4 additional (ingram, academic, thesis, screenplay)"

patterns-established:
  - "Prerequisite checking: check file/directory existence, show checklist with /scr: fix commands"
  - "Preset pipeline: conditional step execution (skip if output exists, run if missing)"
  - "Quality gate pattern: run checks, log warnings, always proceed"

requirements-completed: [EXP-14, EXP-15, EXP-16]

# Metrics
duration: 2min
completed: 2026-04-07
---

# Phase 5 Plan 4: Publish Wizard & Autopilot-Publish Summary

**Publishing wizard with prerequisite checklist and 8 preset pipelines, plus autopilot-publish with voice/continuity quality gate**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-07T08:29:11Z
- **Completed:** 2026-04-07T08:31:11Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Publish wizard rewritten with prerequisite checking (draft, front-matter, back-matter, blurb, synopsis, cover art) showing missing items with /scr: commands to fix them
- 4 locked presets (kdp-paperback, kdp-ebook, query-submission, ebook-wide) plus 4 additional presets (ingram-paperback, academic-submission, thesis-defense, screenplay-query)
- Autopilot-publish command runs voice-check + continuity-check as quality gate before export pipeline, warns but never blocks per D-09
- Interactive wizard guides first-time publishers through prerequisite resolution and destination selection

## Task Commits

Each task was committed atomically:

1. **Task 1: Rewrite publish wizard with presets and prerequisite checking** - `45fe99c` (feat)
2. **Task 2: Create autopilot-publish command** - `f5ce57f` (feat)

## Files Created/Modified
- `commands/scr/publish.md` - Rewritten publish wizard with prerequisite checker, 8 presets, interactive wizard flow
- `commands/scr/autopilot-publish.md` - Unattended publishing pipeline with quality gate, auto-prerequisite generation, progress reporting

## Decisions Made
- Quality gate warns but does not block per D-09 -- even voice-check FAIL scores or major continuity contradictions proceed to export; the gate is advisory only
- Kept 4 additional presets (ingram-paperback, academic-submission, thesis-defense, screenplay-query) beyond the 4 locked presets from D-08, following the plan note to preserve them from the existing shell

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None - both commands are complete instruction files that chain existing commands.

## Next Phase Readiness
- Publishing wizard and autopilot-publish ready for use
- Plan 05 (manuscript-stats) can proceed independently
- All export pipeline components are now in place: templates (Plan 01), formats/packages (Plan 02), stats (Plan 03), and publishing orchestration (this plan)

## Self-Check: PASSED

All 2 files verified on disk. Both task commits (45fe99c, f5ce57f) verified in git log.

---
*Phase: 05-export-publishing*
*Completed: 2026-04-07*
