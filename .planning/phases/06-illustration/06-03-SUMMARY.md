---
phase: 06-illustration
plan: 03
subsystem: illustration
tags: [illustrate-scene, storyboard, spread-layout, panel-layout, prompts, visual-layout]

requires:
  - phase: 06-illustration
    plan: 01
    provides: ART-DIRECTION.md visual style bible and D-01 structured prompt format
provides:
  - illustrate-scene command generating scene-specific illustration prompts with character visuals and mood
  - storyboard command generating frame-by-frame sequences with camera direction per D-05
  - spread-layout command generating ASCII grid page spreads with labeled zones per D-04
  - panel-layout command generating comic panel layouts with composition and gutter specs
affects: [illustration pipeline completeness, visual work type support]

tech-stack:
  added: []
  patterns: [D-04 ASCII grid spread layout, D-05 storyboard camera direction, scene-analysis-to-prompt pipeline]

key-files:
  created:
    - commands/scr/illustrate-scene.md
    - commands/scr/storyboard.md
    - commands/scr/spread-layout.md
    - commands/scr/panel-layout.md
  modified: []

key-decisions:
  - "illustrate-scene identifies the single most visually compelling beat (illustratable moment) rather than illustrating the entire scene"
  - "storyboard includes shot distribution and pacing analysis summaries for production value"
  - "panel-layout supports 5 style presets (traditional-grid, dynamic, manga, european, splash-heavy) with manga auto-switching to RTL reading order"
  - "spread-layout defaults to 30/70 text-to-illustration ratio for picture books with configurable --text-ratio flag"

patterns-established:
  - "Scene illustration output directory: .manuscript/illustrations/scenes/"
  - "Storyboard output directory: .manuscript/illustrations/storyboards/"
  - "Spread layout output directory: .manuscript/illustrations/spreads/"
  - "Panel layout output directory: .manuscript/illustrations/panels/"

requirements-completed: [ILL-04, ILL-08, ILL-09, ILL-10]

duration: 4min
completed: 2026-04-07
---

# Phase 6 Plan 3: Scene Illustration & Format-Specific Layouts Summary

**Core scene illustration prompt generator plus three specialized format commands for children's books, comics, and scripts -- all following prompt-not-product pattern**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-07T08:58:08Z
- **Completed:** 2026-04-07T09:02:28Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- illustrate-scene command with full scene analysis pipeline: extracts characters, setting, key moment, mood, then generates D-01 structured prompt with ART-DIRECTION.md integration
- storyboard command with D-05 camera direction: shot types (12 options), camera movement (10 options), transitions (8 options), ASCII composition sketches, and pacing analysis
- spread-layout command with D-04 ASCII grid: labeled [TEXT], [ILLUSTRATION], [BLEED], [GUTTER] zones, configurable text ratio, narrative-function-aware layout variations
- panel-layout command with comic_only constraint: 5 style presets, gutter specs, balloon/caption placement zones, composition notes per panel, reading order support (LTR and RTL for manga)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create illustrate-scene and storyboard commands** - `62e09e8` (feat)
2. **Task 2: Create spread-layout and panel-layout commands** - `4643afc` (feat)

## Files Created/Modified
- `commands/scr/illustrate-scene.md` - Scene illustration prompt generator requiring ART-DIRECTION.md and drafted scene, cross-references CHARACTERS.md for visual descriptions
- `commands/scr/storyboard.md` - Storyboard frame generator for script/visual work types with shot types, camera direction, transitions, ASCII composition
- `commands/scr/spread-layout.md` - Children's book page spread layout with ASCII grid, text/illustration/bleed zones, typography notes
- `commands/scr/panel-layout.md` - Comic panel layout generator with 5 style presets, gutter specs, balloon placement, composition notes

## Decisions Made
- illustrate-scene picks the single "illustratable moment" (most visually compelling beat) rather than trying to illustrate everything in a scene
- storyboard includes shot distribution summary table and pacing analysis for production-level utility
- panel-layout supports 5 style presets (traditional-grid, dynamic, manga, european, splash-heavy) -- manga automatically switches to right-to-left reading order and manga page dimensions
- spread-layout defaults to 30% text / 70% illustration for picture books, with layout variations keyed to narrative function (opening, action, quiet, climax, denouement)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all four commands are complete prompt-generating instructions with no placeholder data.

## Next Phase Readiness
- All 4 commands from this plan are complete, bringing Phase 6 illustration command total to 6 of 10 (art-direction, cover-art from Plan 01; character-ref, chapter-header from Plan 02; plus these 4)
- illustrate-scene integrates with ART-DIRECTION.md (Plan 01) for visual consistency
- All output directories follow the established .manuscript/illustrations/{type}/ pattern

## Self-Check: PASSED

All 4 command files exist. Both task commits verified (62e09e8, 4643afc).

---
*Phase: 06-illustration*
*Completed: 2026-04-07*
