---
phase: 02-writer-experience
plan: 01
subsystem: autopilot
tags: [autopilot, drafting-profiles, guided, supervised, full-auto, writer-mode]
dependency_graph:
  requires: []
  provides: [autopilot-command, custom-checkpoints-config]
  affects: [commands/scr/autopilot.md, templates/config.json]
tech_stack:
  added: []
  patterns: [loop-wrapper-around-next, profile-based-pause-conditions, structural-unit-boundary-detection]
key_files:
  created: [commands/scr/autopilot.md]
  modified: [templates/config.json]
decisions:
  - "Autopilot command is a single file handling all three profiles via --profile flag"
  - "Structural unit boundary detection uses CONSTRAINTS.json hierarchy.mid level"
  - "Custom checkpoints are natural-language strings matched by AI against OUTLINE.md"
metrics:
  duration: "2min"
  completed: "2026-04-07T05:28:30Z"
  tasks_completed: 2
  tasks_total: 2
  files_created: 1
  files_modified: 1
---

# Phase 02 Plan 01: Autopilot Command Summary

Autopilot command file with three drafting profiles (guided/supervised/full-auto), resume logic, custom checkpoints, and developer_mode-aware output formatting.

## What Was Built

### Task 1: Autopilot command file (commands/scr/autopilot.md)
Created the autopilot command following the established markdown skill file pattern with YAML frontmatter. The file defines:
- **Guided profile (D-01):** Pauses after every atomic unit, shows one-sentence summary + last 200 words + approve/revise/stop prompt
- **Supervised profile (D-04):** Batches by structural unit boundary using CONSTRAINTS.json hierarchy.mid level, shows completed units with word counts
- **Full-auto profile (D-02):** Runs until complete, pauses only on 4 built-in quality gates (continuity contradiction, voice drift, plot hole, missing info) plus writer-defined custom_checkpoints
- **Resume logic (D-03):** Reads STATE.md session handoff, outputs one-sentence explanation, re-enters loop from last position
- **State management:** Mandatory STATE.md updates after every action
- **Adaptive naming:** Uses work-type-specific terminology from CONSTRAINTS.json
- **Tone rules:** Writer-friendly output, developer_mode toggle for technical details (AUTO-05)

### Task 2: Config template update (templates/config.json)
Added `custom_checkpoints` empty array to the autopilot section. Verified `developer_mode` field exists and defaults to `false` (writer mode is default per AUTO-05). All other config sections unchanged. File validated as proper JSON.

## Commits

| Task | Commit | Message |
|------|--------|---------|
| 1 | 3478887 | feat(02-01): create autopilot command with guided/supervised/full-auto profiles |
| 2 | 8b0ec86 | feat(02-01): add custom_checkpoints array to autopilot config template |

## Verification

- All acceptance criteria met for both tasks
- Automated grep verification passed (6+ matches for key terms)
- Existing test suite: 86 tests pass, 0 failures
- config.json validated as proper JSON

## Deviations from Plan

None -- plan executed exactly as written.

## Decisions Made

1. **Autopilot as single file:** All three profiles handled in one command file via --profile flag, matching the product plan's single-command design
2. **Boundary detection via hierarchy.mid:** Supervised mode uses CONSTRAINTS.json work_type hierarchy.mid level to determine batch boundaries (chapter for novel, sequence for screenplay, etc.)
3. **Custom checkpoints as natural language:** Writer-defined checkpoints are stored as strings and matched by the AI agent against OUTLINE.md structure -- AI-native pattern matching, not regex

## Known Stubs

None -- all functionality is instruction-based (markdown skill files). No data wiring or UI rendering involved.

## Self-Check: PASSED

- [x] commands/scr/autopilot.md exists
- [x] templates/config.json contains custom_checkpoints
- [x] Commit 3478887 exists
- [x] Commit 8b0ec86 exists
- [x] All tests pass (86/86)
