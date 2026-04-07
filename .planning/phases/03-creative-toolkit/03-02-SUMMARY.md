---
phase: 03-creative-toolkit
plan: 02
subsystem: structure-visualization
tags: [commands, structure, plot-graph, timeline, theme-tracker, subplot-map, outline]
dependency_graph:
  requires: [CONSTRAINTS.json, OUTLINE.md, THEMES.md]
  provides: [plot-graph-enhanced, timeline-command, theme-tracker-command, subplot-map-command, outline-command]
  affects: [commands/scr/]
tech_stack:
  added: []
  patterns: [auto-detection-heuristic, suggest-not-auto-add, work-type-adaptation, display-edit-mode]
key_files:
  created:
    - commands/scr/timeline.md
    - commands/scr/outline.md
    - commands/scr/theme-tracker.md
    - commands/scr/subplot-map.md
  modified:
    - commands/scr/plot-graph.md
decisions:
  - "Arc auto-detection uses ordered heuristic rules (first match wins) with three-act as default fallback"
  - "Theme-tracker separates display mode (no flag) and detect mode (--detect flag) for clarity"
  - "Subplot-map uses ASCII horizontal tracks for visualization -- works in any terminal"
metrics:
  duration: 3min
  completed: "2026-04-07T06:04:03Z"
  tasks: 2
  files: 5
---

# Phase 03 Plan 02: Structure Visualization Commands Summary

**One-liner:** 4 new structure visualization commands (timeline, outline, theme-tracker, subplot-map) plus enhanced plot-graph with arc type auto-detection heuristic (D-06) and all 9 arc templates.

## What Was Done

### Task 1: Enhance plot-graph and create timeline + outline commands
- **plot-graph.md**: Added arc type auto-detection heuristic per D-06 -- detects save-the-cat (15 beats), hero-journey (12+ units), kishotenketsu (4 units with twist), and 6 others with ordered rules and three-act fallback. Always shows detected type with offer to change. Added full beat structure documentation for all 9 arc types. Added work-type adaptation (theological-arc for sacred, argument-map for academic).
- **timeline.md**: New command that extracts events from OUTLINE.md, sorts chronologically, handles non-linear narratives with both story-order and chronological-order views. Includes time span, pacing, and gap analysis. Adapts to "chronology" for sacred work types.
- **outline.md**: New command with display/edit modes. Display shows hierarchical outline with work-type-aware unit labels from CONSTRAINTS.json hierarchy (never hard-codes "chapter"). Edit mode supports add/remove/reorder/rename/nest operations with D-07 draft-safety checks.
- **Commit:** b352824

### Task 2: Create theme-tracker and subplot-map commands
- **theme-tracker.md**: New command with display mode (shows tracked themes with strength indicators and evidence quotes) and auto-detect mode (scans drafted prose for motifs/patterns). Implements D-08: NEVER auto-adds to THEMES.md, presents each detection as a suggestion with evidence and waits for individual writer approval. Adapts to doctrine-tracker (sacred) and research-questions (academic).
- **subplot-map.md**: New command that visualizes subplot threads as parallel horizontal ASCII tracks. Requires minimum 2 threads per CONSTRAINTS.json prerequisites. Shows intersection points, thread health (dormant > 3 units, unresolved, dangling), and convergence density. Adapts to narrative-threads for sacred work types.
- **Commit:** 75cdb68

## Deviations from Plan

None -- plan executed exactly as written.

## Requirements Fulfilled

| ID | Requirement | Status |
|----|-------------|--------|
| STRUCT-01 | Plot-graph supports multiple arc types with auto-detection | Complete |
| STRUCT-02 | Timeline generates chronological event list from OUTLINE.md | Complete |
| STRUCT-03 | Theme-tracker tracks thematic threads with suggest-not-auto-add | Complete |
| STRUCT-04 | Subplot-map visualizes subplot thread intersections | Complete |
| STRUCT-05 | Outline displays/edits with work-type-aware unit labels | Complete |

## Decisions Made

1. **Arc auto-detection ordering**: Heuristic rules are applied in specificity order (most specific first: save-the-cat requires 15 beats, then hero-journey requires 12+, etc.) with three-act as the universal fallback. This minimizes false positives.
2. **Theme-tracker mode separation**: Rather than always scanning prose on every invocation, auto-detection is gated behind `--detect` flag. This keeps default mode fast and avoids unwanted suggestions.
3. **Subplot-map ASCII visualization**: Used horizontal tracks with `*` markers and `----` continuation lines. This works in any terminal width and scales reasonably to 10+ units and 5+ threads.

## Self-Check: PASSED

All 5 command files verified on disk. Both commit hashes (b352824, 75cdb68) verified in git log.
