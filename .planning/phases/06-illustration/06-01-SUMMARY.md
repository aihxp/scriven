---
phase: 06-illustration
plan: 01
subsystem: illustration
tags: [cover-art, art-direction, kdp, prompts, visual-style]

requires:
  - phase: 05-export
    provides: KDP spine width formula and paper thickness factors
provides:
  - art-direction command generating ART-DIRECTION.md visual style bible
  - cover-art command generating front/spine/back/full-wrap cover prompts with KDP dimensions
affects: [06-illustration plans 02-04, cover-art references ART-DIRECTION.md for series consistency]

tech-stack:
  added: []
  patterns: [prompt-not-product illustration commands, D-01 structured prompt format]

key-files:
  created:
    - commands/scr/art-direction.md
    - commands/scr/cover-art.md
  modified: []

key-decisions:
  - "Art-direction uses 4 seed questions (art style, mood/tone, color preferences, reference artists) for initial mode"
  - "Cover-art applies genre-specific conventions table with 10 genres plus default/other fallback"
  - "Spine width reuses Phase 5 paper factors exactly (white=0.002252, cream=0.0025, color=0.0032, cover=0.06)"

patterns-established:
  - "D-01 structured prompt format: Subject, Composition, Style, Color Palette, Mood, Technical Specs"
  - "Illustration output directory: .manuscript/illustrations/ with subdirectories per command"
  - "Prompt-not-product: commands generate structured markdown prompts, not actual images"

requirements-completed: [ILL-01, ILL-02, ILL-03]

duration: 4min
completed: 2026-04-07
---

# Phase 6 Plan 1: Art Direction & Cover Art Summary

**Art-direction visual style bible generator and cover-art prompt generator with KDP spine width calculation, genre conventions, and series consistency**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-07T08:52:07Z
- **Completed:** 2026-04-07T08:56:09Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Art-direction command with 7-section visual style bible (visual style, color palette, composition, reference artists, per-character specs, per-setting specs, consistency rules)
- Cover-art command with front/spine/back/full-wrap prompt generation and KDP dimensional calculations
- Genre-specific cover conventions for 10+ genres per D-02
- Series consistency via --series flag referencing ART-DIRECTION.md per D-03

## Task Commits

Each task was committed atomically:

1. **Task 1: Create art-direction command** - `08bc0e3` (feat)
2. **Task 2: Create cover-art command** - `3d7b371` (feat)

## Files Created/Modified
- `commands/scr/art-direction.md` - Visual style bible generator with initial/refine modes, reads CHARACTERS.md and WORLD.md
- `commands/scr/cover-art.md` - Cover art prompt generator with KDP spine width calculation, genre conventions, series consistency

## Decisions Made
- Art-direction uses 4 seed questions for initial mode (art style, mood/tone, color preferences, reference artists) -- follows build-world pattern of progressive questioning
- Cover-art genre conventions table covers 10 specific genres (romance, thriller, fantasy, sci-fi, literary, children's, horror, memoir, poetry, sacred) plus default/other fallback
- Spine width formula and paper factors reused exactly from Phase 5 export command for consistency

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - both commands are complete prompt-generating instructions with no placeholder data.

## Next Phase Readiness
- ART-DIRECTION.md visual style bible is now referenceable by all remaining illustration commands (illustrate-scene, character-ref, chapter-header, map-illustration)
- Cover-art prompts save to .manuscript/illustrations/cover/ ready for AI image generation
- D-01 structured prompt format established as pattern for all Phase 6 illustration commands

---
*Phase: 06-illustration*
*Completed: 2026-04-07*
