---
phase: 02-writer-experience
plan: 02
subsystem: writer-git-abstractions
tags: [git-wrapper, writer-mode, version-control, save, history, compare, undo]
dependency_graph:
  requires: []
  provides: [save-command, history-command, compare-command, versions-command, undo-command]
  affects: [writer-workflow, session-management]
tech_stack:
  added: []
  patterns: [git-abstraction-wrapper, developer-mode-toggle, state-md-context-reading]
key_files:
  created:
    - commands/scr/save.md
    - commands/scr/history.md
    - commands/scr/compare.md
    - commands/scr/versions.md
    - commands/scr/undo.md
  modified: []
decisions:
  - Used git revert instead of git reset for undo safety -- preserves history, allows undoing the undo
  - Grouped versions by date with relative labels (Current, Yesterday, day name) for scannability
key-decisions:
  - "undo uses git revert instead of git reset to preserve full history"
  - "versions grouped by relative date labels for writer-friendly scannability"
metrics:
  duration: 2min
  completed: "2026-04-07T05:29:00Z"
  tasks: 2
  files: 5
---

# Phase 02 Plan 02: Writer-Friendly Git Abstractions Summary

Five git wrapper commands that hide version control terminology behind plain-language abstractions writers understand -- save/history/compare/versions/undo with auto-generated messages from STATE.md context and developer_mode toggle for all output.

## What Was Done

### Task 1: Save and History Commands (ca3de35)

Created `commands/scr/save.md` implementing AUTO-06 (D-05):
- Auto-generates commit messages from STATE.md context (stage, unit, last command)
- Message patterns: "Saved after drafting {unit} {N}", "Saved after editor review", "Saved after revising", manual save fallback
- Writer provides optional message override
- Checks for .git/ and auto-inits silently in writer mode
- Writer mode output: "Saved." -- developer mode: full hash and message

Created `commands/scr/history.md` implementing AUTO-07 (D-06):
- Formats git log as markdown table with Date | Action | Details columns
- Date format: "Apr 6, 2:30 PM" (human-friendly, no year unless different)
- Parses commit messages into readable actions ("Saved after drafting chapter 3" -> "Drafted chapter 3")
- Default last 20 entries, --limit N for more
- No git hashes in writer mode; hashes column added in developer mode

### Task 2: Compare, Versions, and Undo Commands (321a37a)

Created `commands/scr/compare.md` implementing AUTO-08 (D-07):
- Shows prose changes as Before/After blockquote pairs
- NEVER shows: +, -, @@, line numbers, file paths, commit hashes
- Groups changes by unit with headings
- Handles new sections ("New:"), removed sections ("Removed:")
- Developer mode shows standard unified diff

Created `commands/scr/versions.md` implementing AUTO-09:
- Lists saves as numbered list with human-readable date groupings
- Relative dates: Current, Earlier today, Yesterday, day names, Mon D format
- Default last 10 versions, --all for complete list
- No git hashes in writer mode

Created `commands/scr/undo.md` implementing AUTO-10 (D-08):
- Checks for unsaved changes before proceeding (--force skips warning, not confirmation)
- Shows "You'll lose:" confirmation with description of what will be undone
- Uses git revert (not git reset) to preserve history safely
- Updates STATE.md after revert
- Guards against undoing past initial project creation

## Deviations from Plan

### Design Decisions

**1. [Rule 2 - Safety] Undo uses git revert instead of git reset**
- **Found during:** Task 2
- **Issue:** Plan specified `git reset --soft HEAD~1` + `git checkout -- .manuscript/` which destroys history
- **Fix:** Used `git revert HEAD --no-edit` instead, which creates a reversible commit and preserves full history
- **Rationale:** Writers should never lose the ability to recover. Revert is safer and allows "undoing the undo"
- **Files modified:** commands/scr/undo.md
- **Commit:** 321a37a

## Verification

- All 5 command files exist with proper YAML frontmatter
- No git terminology exposed in writer mode sections
- Test suite passes: 89 tests, 0 failures (new files auto-detected)

## Self-Check: PASSED

All 5 command files verified on disk. Both commits (ca3de35, 321a37a) verified in git history.
