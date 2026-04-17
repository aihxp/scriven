---
phase: 25-schema-validation
plan: 01
subsystem: installer / settings schema
tags: [schema, validation, migration, settings, installer]
requires: []
provides:
  - SETTINGS_SCHEMA
  - validateSettings
  - migrateSettings
  - readSettings
affects:
  - bin/install.js
tech-stack:
  added: []
  patterns:
    - hand-written open-schema validator
    - migration-before-validation pipeline
    - warning-vs-hard-error separation
key-files:
  created:
    - test/phase25-schema-validation.test.js
  modified:
    - bin/install.js
decisions:
  - Open schema (unknown fields warn, not fail) so forward-compat settings survive older installers
  - Hand-written validator rather than adding ajv/zod — zero new dependencies
  - migrateSettings returns null for null input instead of synthesizing defaults — caller decides
  - Hard errors and warnings share the `errors` array; `valid` is driven by non-warning count
metrics:
  duration_minutes: 2
  completed: 2026-04-17
requirements:
  - SCHEMA-01
  - SCHEMA-02
---

# Phase 25 Plan 01: Settings Schema Validation Infrastructure Summary

Hand-written schema, migrator, validator, and read pipeline for `settings.json` inside `bin/install.js`, exported for Phase 26 to wire into the install flow.

## Objective

Build `SETTINGS_SCHEMA` plus `migrateSettings`, `validateSettings`, and `readSettings` helpers so misconfigured settings fail loudly with field-level messages, while old-format settings upgrade cleanly before validation runs. Prevents the bootstrap deadlock where a validator would reject the very config migration was meant to fix (PITFALLS.md §8).

## What Was Built

- **`SETTINGS_SCHEMA`** — array of 8 field descriptors (`version`, `runtime`, `runtimes`, `scope`, `developer_mode`, `data_dir`, `install_mode`, `installed_at`) each declaring `type`, `required`, optional `enum`, optional `allow_empty`.
- **`migrateSettings(raw)`** — clones input with `{ ...raw }`, fills in `runtimes` (derived from `runtime` or `[]`), defaults `scope` to `'global'`, defaults `install_mode` to `'interactive'`. Returns `null` for `null`/`undefined` input. Does not invent `version`, `data_dir`, or `installed_at`.
- **`validateSettings(settings)`** — returns `{ valid, errors }`. Rejects non-object input. For each schema field: flags missing-required, type mismatch, empty string when `allow_empty=false`, array-of-string element type, and enum violation. Unknown top-level keys produce `"<key>: unknown field (warning)"` strings but do not flip `valid=false` (open schema). `valid` is driven by a separate hard-error counter.
- **`readSettings(dataDir)`** — `readJsonIfExists` → throw on null with "not found" message → `migrateSettings` → `validateSettings` → throw on invalid with hard errors joined by `; ` (warning lines filtered out). Returns the migrated object on success.

All four helpers added to the existing `module.exports` block; no existing exports removed. `runInstall` and `writeSharedAssets` untouched.

## Key Decisions

1. **Hand-written over ajv/zod**: Scriven's architecture constraint is zero runtime dependencies. Hand-rolling ~90 lines of validator is cheaper than adding a schema library.
2. **Open schema**: Unknown fields warn but pass. Lets forward-compat settings survive older installers — important because Phase 26 will add settings preservation.
3. **Migration-first pipeline**: `readSettings` runs `migrateSettings` *before* `validateSettings`. Old-format settings (no `runtimes`, `scope`, `install_mode`) migrate cleanly, then pass validation. This is the PITFALLS.md §8 deadlock fix baked into the contract.
4. **Warnings live alongside errors**: Single `errors` array with `(warning)` suffix convention. `readSettings` filters them out when composing thrown messages so users only see real failures.
5. **Non-mutation**: `migrateSettings` clones via spread; test asserts caller input unchanged.

## Deviations from Plan

None — plan executed exactly as written. Added 3 extra tests beyond the 12 specified (non-object input, allow_empty empty-string flag, array-of-string element-type flag, install_mode enum, warning-exclusion in thrown message) for defensive coverage of trust-boundary T-25-01/T-25-02/T-25-03.

## Verification

- `node --test test/phase25-schema-validation.test.js` → **27 pass / 0 fail**
- `node --test test/*.test.js` (full suite) → **1036 pass / 0 fail** (no regressions)
- `node -e "…"` confirms all four names exported from `bin/install.js`
- `git diff --stat bin/install.js` → `125 ++` (pure additions, no edits to `runInstall`/`writeSharedAssets`/`main`)
- `git diff package.json` → unchanged (zero new dependencies)

## Commits

- `be3a9f5` — test(25-01): add failing tests for settings schema validation (RED)
- `fada866` — feat(25-01): implement settings schema validation infrastructure (GREEN)

## TDD Gate Compliance

- **RED**: `be3a9f5` (test commit with failing tests)
- **GREEN**: `fada866` (feat commit makes tests pass)
- **REFACTOR**: not needed — implementation was clean on first pass

## Threat Surface

Mitigations in place for threat register entries:

- **T-25-01 (Tampering)**: `validateSettings` rejects type mismatches / enum violations with field-level messages; `readSettings` throws on invalid config.
- **T-25-02 (DoS)**: Malformed JSON handled by existing `readJsonIfExists` (returns null, no throw); `readSettings` treats null as not-found and throws a clear error.
- **T-25-03 (Info Disclosure)**: Error messages contain field names and `typeof`; raw values appear only in enum messages (where value is a controlled enum key).
- **T-25-04 (EoP via unknown fields)**: Open-schema policy emits warnings without granting behavioral effect; unknown keys are inert.

No new threat flags introduced.

## Known Stubs

None. This plan builds infrastructure only — Phase 26 will consume it.

## Self-Check: PASSED

- FOUND: `bin/install.js` (modified, +125 lines)
- FOUND: `test/phase25-schema-validation.test.js` (created)
- FOUND: commit `be3a9f5` (RED test commit)
- FOUND: commit `fada866` (GREEN feat commit)
- CONFIRMED: all four helpers exported
- CONFIRMED: full test suite passes (1036/1036)
- CONFIRMED: `package.json` unchanged (zero new deps)
- CONFIRMED: `runInstall` / `writeSharedAssets` / `main` unmodified
