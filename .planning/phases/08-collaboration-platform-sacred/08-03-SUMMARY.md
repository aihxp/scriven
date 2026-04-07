---
phase: 08-collaboration-platform-sacred
plan: 03
subsystem: runtime-expansion-utilities
tags: [installer, runtimes, utility-commands, profile-persistence, academic-adaptations]
dependency_graph:
  requires: []
  provides: [multi-runtime-installer, writer-profile-persistence, utility-commands, academic-adaptations]
  affects: [bin/install.js, commands/scr/*, data/CONSTRAINTS.json]
tech_stack:
  added: []
  patterns: [command-markdown-pattern, RUNTIMES-object-pattern]
key_files:
  created:
    - commands/scr/manager.md
    - commands/scr/health.md
    - commands/scr/fast.md
    - commands/scr/add-note.md
    - commands/scr/check-notes.md
    - commands/scr/plant-seed.md
    - commands/scr/troubleshoot.md
    - commands/scr/thread.md
  modified:
    - bin/install.js
    - commands/scr/profile-writer.md
    - data/CONSTRAINTS.json
decisions:
  - id: D-03
    summary: "New runtimes follow exact RUNTIMES object pattern from install.js (label, dirs, detect)"
  - id: D-04
    summary: "Manager scans for .manuscript/ subdirectories to discover projects"
metrics:
  duration: 3min
  completed: "2026-04-07T14:25:00Z"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 11
---

# Phase 08 Plan 03: Multi-Runtime Installer, Profile Persistence & Utility Commands Summary

Expanded installer to 8 runtimes (Codex CLI, OpenCode, GitHub Copilot, Windsurf, Antigravity), added cross-project voice profile persistence via ~/.scriven/profile.json, and created 8 utility commands (manager, health, fast, add-note, check-notes, plant-seed, troubleshoot, thread) with academic command adaptations.

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | `8890c1c` | Extend installer with 5 new runtimes and add profile persistence |
| 2 | `e7de231` | Create 8 utility commands and update CONSTRAINTS.json |

## What Was Built

### Task 1: Installer expansion + profile persistence
- Added 5 new runtime entries to `bin/install.js` RUNTIMES object: codex, opencode, copilot, windsurf, antigravity
- Each follows the existing pattern with label, commands_dir_global/project, agents_dir_global/project, and detect()
- Updated `commands/scr/profile-writer.md` with --export and --import flags
- Added "Profile Persistence" section for auto-detection of existing profiles on new projects
- Profile stored at `~/.scriven/profile.json` with voice_dimensions, reference_authors, updated date, and projects list

### Task 2: Utility commands + CONSTRAINTS.json
- **manager.md**: Multi-project command center with --list (table of projects), --switch, --status
- **health.md**: 6-point diagnostic (files, config, state, orphans, git, constraints) with --repair mode
- **fast.md**: Inline edits without discuss/plan/draft cycle, 500-word/2-file limit
- **add-note.md**: Quick timestamped notes to .manuscript/NOTES.md
- **check-notes.md**: Display notes with --clear archiving
- **plant-seed.md**: Creative seed capture with auto-category detection (character, scene, dialogue, theme, world)
- **troubleshoot.md**: Problem diagnosis reading STATE.md, config.json, git log, CONSTRAINTS.json
- **thread.md**: Focused conversation threads stored in .manuscript/threads/
- Added all 8 commands to CONSTRAINTS.json as utility category, available for all work types
- Added academic command_adaptations: citation-check, peer-review, journal-submit with additional_focus/presets

## Requirements Covered

| Requirement | Description | Status |
|-------------|-------------|--------|
| RUNTIME-01 | Multi-runtime installer (Codex, OpenCode, Copilot, Windsurf, Antigravity) | Done |
| RUNTIME-02 | Writer profile persistence via ~/.scriven/profile.json | Done |
| RUNTIME-03 | Manager command center for multiple works | Done |
| RUNTIME-04 | Academic-specific command adaptations | Done |
| RUNTIME-05 | Health check and repair command | Done |
| RUNTIME-06 | Utility commands (add-note, check-notes, plant-seed, troubleshoot, thread) | Done |
| RUNTIME-07 | Fast inline edit command | Done |

## Deviations from Plan

None -- plan executed exactly as written.

## Known Stubs

None. All commands are complete markdown specifications. No placeholder data or TODO markers.

## Self-Check: PASSED

All 11 files verified on disk. Both commits (8890c1c, e7de231) confirmed in git history.
