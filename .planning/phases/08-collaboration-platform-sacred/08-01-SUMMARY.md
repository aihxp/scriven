---
phase: 08-collaboration-platform-sacred
plan: 01
subsystem: collaboration
tags: [revision-tracks, branching, merge, collaboration, writer-mode]
dependency_graph:
  requires: []
  provides: [track-command, tracks-json-format, revision-proposals, continuity-conflict-resolution]
  affects: [commands/scr/track.md, data/CONSTRAINTS.json]
tech_stack:
  added: []
  patterns: [label-to-branch-mapping, writer-friendly-git-abstraction, subcommand-routing, continuity-conflict-resolution]
key_files:
  created:
    - commands/scr/track.md
  modified:
    - data/CONSTRAINTS.json
decisions:
  - id: D-01
    summary: "Writer-friendly labels mapped to git branches via tracks.json with track/ prefix slug pattern"
  - id: D-02
    summary: "Continuity conflict resolution uses Keep mine / Keep theirs / Keep both with scene break concatenation for Keep both"
metrics:
  duration: 3min
  completed: "2026-04-07T14:24:07Z"
---

# Phase 08 Plan 01: Revision Track Management Summary

Revision track command with 6 subcommands (create, list, switch, compare, merge, propose) wrapping git branching in writer-friendly language via tracks.json label-to-branch mapping and continuity conflict resolution with Keep mine/theirs/both options.

## What Was Built

### Task 1: Track Command (commands/scr/track.md)
- **Commit:** 3afe85d
- Created single command file with subcommand routing for all 6 track operations
- **track create**: Creates named revision track with slugified git branch, initializes tracks.json mapping, enables collaboration in config
- **track list**: Shows all tracks with active indicator, ahead/behind canon counts, last activity dates, merged status
- **track switch**: Resolves writer-friendly label to branch, checks for unsaved changes, switches context
- **track compare**: Side-by-side passage comparison between any two tracks, reuses compare.md display pattern with "In [track name]:" labels
- **track merge**: Merges track into canon with D-02 continuity conflict resolution -- Keep mine (canon), Keep theirs (track), Keep both (scene break concatenation)
- **track propose**: Generates .manuscript/proposals/{slug}-proposal.md with diff summary, detailed changes, and editor notes section
- Writer-friendly language table mapping all git terms to creative writing equivalents
- Comprehensive error messages in plain English

### Task 2: CONSTRAINTS.json Update
- **Commit:** 3ff3737
- Added track command with `collaboration` category
- 6 subcommands registered: create, list, switch, compare, merge, propose
- Available for all 8 work type groups (universal collaboration)

## Decisions Made

1. **D-01: Label-to-branch mapping** -- tracks.json stores writer-friendly labels with slugified `track/` prefixed branch names. Slug: lowercase, spaces to hyphens, strip special chars.
2. **D-02: Continuity conflict resolution** -- Three options: Keep mine (canon version), Keep theirs (track version), Keep both (concatenate with scene break). Never uses git terminology like "ours/theirs".

## Deviations from Plan

None -- plan executed exactly as written.

## Known Stubs

None -- all subcommands fully specified with complete behavior, edge cases, and output formats.

## Verification Results

- All 6 subcommands present in track.md (24 occurrences across the file)
- tracks.json format documented with label-to-branch mapping (D-01)
- Keep mine / Keep theirs / Keep both conflict resolution present (D-02)
- CONSTRAINTS.json validated: track command with collaboration category, 6 subcommands
- All 12 acceptance criteria passed

## Self-Check: PASSED

- [x] commands/scr/track.md exists (FOUND)
- [x] data/CONSTRAINTS.json updated with track entry (FOUND)
- [x] Commit 3afe85d exists (FOUND)
- [x] Commit 3ff3737 exists (FOUND)
