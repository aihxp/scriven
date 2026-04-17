---
phase: 26-settings-template-preservation
plan: 01
subsystem: installer
tags: [installer, settings, templates, preservation, hash, merge, atomic-write]
requires:
  - Phase 23 (atomicWriteFileSync, cleanOrphanedTempFiles)
  - Phase 25 (SETTINGS_SCHEMA, readJsonIfExists, migrateSettings, validateSettings)
provides:
  - sha256File helper
  - copyDirWithPreservation helper (hash-based, timestamped backups)
  - mergeSettings helper (installer-owned vs user-owned field policy)
  - INSTALLER_OWNED_FIELDS constant
  - Non-destructive writeSharedAssets refactor
affects:
  - bin/install.js (writeSharedAssets no longer removePathIfExists templates/ or data/)
tech-stack:
  added:
    - Node built-in crypto.createHash('sha256') for content-hash comparison
  patterns:
    - Raw readJsonIfExists before merge (avoid PITFALL #8 validate-before-migrate deadlock)
    - Same-directory fs.renameSync for atomic backup (PITFALL #6 never cross-filesystem)
    - Injectable timestamp option for deterministic backup filename tests
key-files:
  created:
    - test/phase26-settings-template-preservation.test.js
  modified:
    - bin/install.js
decisions:
  - developer_mode is USER-owned — installer passes it in `incoming`, but existing file value wins via mergeSettings
  - Installer-owned fields (version, runtime, runtimes, scope, data_dir, install_mode, installed_at) always refresh from incoming
  - Unknown user-added settings keys pass through untouched (forward-compat for user annotations)
  - Backup filename format `<dest>.backup.<ISO-timestamp-colons-dots-to-dashes>` — colons replaced with dashes so macOS/Linux/Windows all accept it
  - Corrupt existing settings.json → readJsonIfExists returns null → merge degenerates to fresh-install (incoming only). No crash, no loss of installer progress.
metrics:
  tasks_completed: 3
  tests_added: 10
  tests_passing: 70  # phase 23 + phase 25 + phase 26 combined
  completed_at: 2026-04-16
---

# Phase 26 Plan 01: Settings + Template Preservation Summary

Non-destructive reinstalls: user-modified settings fields and template files now survive a second install.

## What shipped

Three helpers added to `bin/install.js` and exported:

- `sha256File(path)` — hex SHA-256 via Node built-in crypto; returns `null` on ENOENT, rethrows other errors.
- `copyDirWithPreservation(src, dest, { timestamp } = {})` — recursive copy with per-file hash comparison. Three branches: `fresh` (dest missing), `replaced` (src hash === dest hash), `backedUp` (hashes differ → rename existing to `<dest>.backup.<timestamp>` then copy). Returns aggregated `{ fresh, replaced, backedUp }`.
- `mergeSettings(existing, incoming)` — shallow-clones incoming, overlays every non-INSTALLER_OWNED key from existing. Never mutates arguments.

`writeSharedAssets` refactor:

- Removed both `removePathIfExists` calls for `templates/` and `data/` (the destructive pattern flagged as PITFALL #3).
- `copyDir` replaced with `copyDirWithPreservation` for both trees.
- `settings.json` now read raw via `readJsonIfExists` (bypassing `readSettings`/`validateSettings` per PITFALL #8), merged, then atomically written.
- Log line reports backup count when any user-modified templates are preserved.

## Test coverage

`test/phase26-settings-template-preservation.test.js` — 10 tests:

1. `sha256File` returns null for missing files.
2. `sha256File` returns stable 64-char hex digest for identical content.
3. `copyDirWithPreservation` fresh install: `{ fresh: 3, replaced: 0, backedUp: 0 }` across nested dirs.
4. `copyDirWithPreservation` second run on unchanged tree: all replaced silently; no `.backup.` files on disk.
5. `copyDirWithPreservation` user edit: backup written with user bytes; dest now contains shipped bytes.
6. `mergeSettings` preserves `developer_mode=true` while refreshing `version`.
7. `mergeSettings` preserves unknown user fields (`my_custom_key`, etc.).
8. `mergeSettings(null | undefined, incoming)` returns incoming.
9. `mergeSettings` does not mutate frozen inputs.
10. Every field in `INSTALLER_OWNED_FIELDS` resolves to incoming value.

Full suite (phase 23 + 25 + 26): **70/70 passing**. No regressions in prior phases.

## Deviations from Plan

Minor — added `writeSharedAssets` to `module.exports` so the Task 2 verify smoke test (and future regression tests) can drive it without invoking the interactive installer. The plan's verify command imports `writeSharedAssets` from the module, which required the export. Rule 3 (auto-fix blocking issue).

Also exported `readJsonIfExists` so downstream callers/tests can use the same raw-read path `writeSharedAssets` relies on. No behavior change.

No other deviations.

## Edge cases documented

- **Corrupt existing settings.json**: `readJsonIfExists` catches `JSON.parse` errors and returns null. `mergeSettings(null, incoming)` returns incoming unchanged — the reinstall cleanly overwrites the corrupt file.
- **Backup filename collisions across files in same call**: Timestamp is per-call (one ISO timestamp captured at the top of `copyDirWithPreservation`). Per-file disambiguation comes from the destination filename itself (`<filename>.backup.<timestamp>`). Two files modified in the same reinstall get distinct backup paths because their base names differ.
- **Backup filename collisions across reinstalls within the same second**: ISO timestamp includes milliseconds (`.replace(/[:.]/g, '-')` preserves them), so collisions would require sub-millisecond reinstall rate — not a realistic concern for a CLI installer.
- **Orphan dest files (files in dest but not in src)**: Left untouched. Consistent with "installer does not own this file" — users may add project notes or custom templates.
- **Windows compatibility**: Backup filename uses `-` instead of `:` and `.`; Node's `fs.renameSync` for same-directory rename is atomic on all supported platforms.

## Success criteria

- [x] PRES-01: `developer_mode` and unknown user keys preserved across reinstall; installer-owned fields refreshed.
- [x] PRES-02: Modified templates backed up to `.backup.<timestamp>`; unmodified replaced silently; missing fresh-copied.
- [x] `writeSharedAssets` no longer calls `removePathIfExists` on `templates/` or `data/`.
- [x] `sha256File`, `copyDirWithPreservation`, `mergeSettings` exported from `bin/install.js`.
- [x] `node --test test/phase26-settings-template-preservation.test.js` — 10/10 pass.
- [x] No regression in phase 23 or phase 25 suites — 70/70 combined pass.

## Self-Check: PASSED

- `bin/install.js` FOUND (has sha256File, copyDirWithPreservation, mergeSettings, INSTALLER_OWNED_FIELDS, refactored writeSharedAssets)
- `test/phase26-settings-template-preservation.test.js` FOUND (10 passing tests)
- Commit `7090afd` FOUND — feat(26-01): add sha256File, copyDirWithPreservation, mergeSettings helpers
- Commit `81da3c7` FOUND — refactor(26-01): writeSharedAssets preserves user work
- Commit `9424f40` FOUND — test(26-01): regression tests for PRES-01 and PRES-02
