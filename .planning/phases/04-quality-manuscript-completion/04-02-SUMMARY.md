---
phase: 04-quality-manuscript-completion
plan: 02
subsystem: quality-review
tags: [dialogue, pacing, sensitivity, review-commands, constraints-aware]

# Dependency graph
requires:
  - phase: 01-mvp-polish
    provides: command file pattern (YAML frontmatter, Usage, Instruction, Output)
provides:
  - dialogue-audit command for character voice and attribution analysis
  - pacing-analysis command for structure-aware tempo mapping
  - sensitivity-review command with intentional craft awareness
affects: [04-quality-manuscript-completion]

# Tech tracking
tech-stack:
  added: []
  patterns: [constraints-aware hidden/adapted commands, intentional-craft assessment pattern]

key-files:
  created:
    - commands/scr/dialogue-audit.md
    - commands/scr/pacing-analysis.md
    - commands/scr/sensitivity-review.md
  modified: []

key-decisions:
  - "Sensitivity review explicitly positions itself as thoughtful reader not censor, per research pitfall 4"
  - "Dialogue audit references CHARACTERS.md voice anchors for comparison baseline"
  - "Pacing analysis uses text-based visual tempo maps (block characters) for CLI-friendly output"

patterns-established:
  - "Intentional craft pattern: sensitivity-aware commands classify findings as 'potentially unintentional' vs 'likely intentional craft'"
  - "Structure-aware analysis: commands cross-reference context files (OUTLINE.md, CHARACTERS.md) rather than analyzing prose in isolation"

requirements-completed: [QUAL-03, QUAL-04, QUAL-06]

# Metrics
duration: 2min
completed: 2026-04-07
---

# Phase 04 Plan 02: Quality Review Commands Summary

**Dialogue audit, pacing analysis, and sensitivity review commands with CONSTRAINTS.json awareness and intentional craft recognition**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-07T06:45:47Z
- **Completed:** 2026-04-07T06:48:00Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Created dialogue-audit command checking voice differentiation, attribution clarity, dialect consistency, and talking-head detection with CHARACTERS.md voice anchor comparison
- Created pacing-analysis command with visual tempo mapping, saggy middle detection, and OUTLINE.md structural cross-referencing
- Created sensitivity-review command that distinguishes unintentional insensitivity from deliberate artistic choices, with adapted names (ethics-review for academic, interfaith-review for sacred)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create dialogue-audit and pacing-analysis commands** - `ae22d1c` (feat)
2. **Task 2: Create sensitivity-review command** - `1b73c3b` (feat)

## Files Created/Modified
- `commands/scr/dialogue-audit.md` - Character dialogue quality audit with 4 check categories
- `commands/scr/pacing-analysis.md` - Structure-aware pacing report with 5 analysis dimensions
- `commands/scr/sensitivity-review.md` - Sensitivity review with intentional craft recognition

## Decisions Made
- Sensitivity review explicitly states "You are a thoughtful reader, not a censor" per research pitfall 4 guidance on overreach prevention
- Dialogue audit uses voice consistency scoring (STRONG/ADEQUATE/WEAK) per character for actionable feedback
- Pacing analysis uses text-based block character visualization for tempo maps (CLI-compatible, no external dependencies)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all three commands are complete skill files with full instruction sets.

## Next Phase Readiness
- Three quality review commands ready for use
- dialogue-audit, pacing-analysis, and sensitivity-review all follow established command patterns
- CONSTRAINTS.json already has entries for all three commands (availability, adaptations, prerequisites)

---
*Phase: 04-quality-manuscript-completion*
*Completed: 2026-04-07*
