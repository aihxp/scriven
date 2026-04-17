---
phase: 23
plan: 01
subsystem: installer
tags: [safety, atomicity, crash-recovery]
requires: []
provides:
  - atomicWriteFileSync helper
  - cleanOrphanedTempFiles helper
  - collectTargetDirsForSweep helper
  - startup orphan sweep in runInstall
affects:
  - bin/install.js (all generated-content writes)
tech-stack:
  added:
    - node:crypto (built-in, for randomUUID temp-file suffix)
  patterns:
    - temp-file-then-rename atomic write
    - fd-based write + fsync for durability
    - anchored UUID regex for orphan cleanup
key-files:
  created:
    - test/install.test.js
  modified:
    - bin/install.js
decisions:
  - Rewrote atomicWriteFileSync to use fs.openSync + fs.writeSync + fs.fsyncSync + fs.closeSync + fs.renameSync instead of fs.writeFileSync + fs.renameSync. This satisfies the plan's strict verification criterion (`grep -n "fs.writeFileSync" bin/install.js` returns ZERO matches) and adds fsync durability — crash between write() and rename() is now safe even if the kernel buffer has not flushed.
metrics:
  duration_min: 10
  tasks_completed: 2
  tests_added: 17
  files_touched: 2
completed: 2026-04-16
---

# Phase 23 Plan 01: Atomic Installer File Writes Summary

Crash-safe installer: every generated file lands at its target path via temp-file + fsync + rename, and every startup sweeps orphaned temp files from prior interrupted runs before writing.

## Call Sites Converted

All 9 content-generating `fs.writeFileSync` calls in `bin/install.js` were replaced with `atomicWriteFileSync`:

| Function | Old line | What it writes |
|---|---|---|
| `writeInstalledCommandManifest` | 508 | `.scriven-installed.json` manifest (Claude) |
| `writeCodexSkillManifest` | 728 | `.scriven-installed.json` manifest (Codex) |
| `installClaudeCommandRuntime` | 848 | Per-command `/scr-*.md` files |
| `installManifestSkillRuntime` | 863 | `SKILL.md` manifest |
| `installCodexRuntime` | 889 | Per-skill `SKILL.md` wrappers |
| `installGuidedRuntime` | 914 | `SETUP.md` (Perplexity) |
| `installGuidedRuntime` | 915 | `connector-command.txt` |
| `installGuidedRuntime` | 916 | `connector-command.current-project.txt` |
| `writeSharedAssets` | 941 | `settings.json` |

`fs.copyFileSync` inside `copyDir` is untouched — per plan scope (those copy shipped inputs verbatim, not Scriven-generated content).

## New Helpers

- `atomicWriteFileSync(targetPath, content)` — fd-based write to `${targetPath}.tmp.${uuid}`, fsync, close, rename. Unlinks the temp file on any failure. Creates parent directories recursively.
- `cleanOrphanedTempFiles(dir)` — non-recursive scan, unlinks files matching `/\.tmp\.[0-9a-f-]{36}$/i`, ignores subdirectories and directory entries even when named to match. Returns 0 on missing dir.
- `collectTargetDirsForSweep(runtimeKeys, isGlobal, dataDir)` — enumerates every target directory (data/commands/skills/agents/guide) for the selected runtimes in the selected scope.

## Startup Sweep

`runInstall` now calls `cleanOrphanedTempFiles` across every dir from `collectTargetDirsForSweep` before any writes. Silent on clean runs; a single dim log line surfaces when files were actually removed.

## Tests

File: `test/install.test.js` (new) — 17 tests across 4 suites:

- `atomicWriteFileSync` (5): content correctness, no temp sibling after success, nested parent creation, Buffer accepted, temp cleanup on write failure.
- `cleanOrphanedTempFiles` (5): missing dir returns 0, UUID-matched files removed, non-matching files untouched, no recursion, directories never removed.
- `collectTargetDirsForSweep` (4): global multi-runtime coverage, project-scope absolute resolution, guide_dir inclusion, deduplication.
- `Installer leaves no *.tmp. files behind` (3): Claude command install, settings.json write, crash-simulation (orphan from prior run cleaned before fresh write).

## Deviations from Plan

**Deviation 1 (Rule 3 — blocking issue resolved):** Plan Task 1 wrote `atomicWriteFileSync` using `fs.writeFileSync(tmpPath, content)` internally. This left one literal `fs.writeFileSync` occurrence, which violates the plan's `<verification>` step 1 requirement that the grep return ZERO matches. Rewrote the helper to use `fs.openSync` + `fs.writeSync` + `fs.fsyncSync` + `fs.closeSync`, which also adds explicit fsync durability (strengthens SAFE-01 beyond the plan's baseline — a crash between the kernel buffer and the disk flush is now safe).

## Verification Results

- `grep -n "fs.writeFileSync" bin/install.js` → **ZERO matches** (target-path writes AND helper's own temp-path write both eliminated)
- `grep -c "atomicWriteFileSync(" bin/install.js` → 10 (helper body + 9 call sites + export line)
- `grep -c "cleanOrphanedTempFiles(" bin/install.js` → 2 (definition + startup-sweep call)
- `grep -c "collectTargetDirsForSweep" bin/install.js` → 3 (definition + call + export)
- `npm test` → 993 pass / 0 fail
- `node --test test/install.test.js` → 17 pass / 0 fail
- `node bin/install.js --version` → `1.5.1` (backwards-compat smoke OK)

## Self-Check: PASSED

- FOUND: bin/install.js (modified)
- FOUND: test/install.test.js
- FOUND commit 99069c3 (Task 1)
- FOUND commit cc641c1 (Task 2)
- FOUND: `grep -n "fs.writeFileSync" bin/install.js` returns zero matches
