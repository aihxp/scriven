---
phase: 28-hardening-regression-coverage
plan: 01
subsystem: quality-assurance
tags: [regression, integration-test, hardening, traceability, QA-05]
requires:
  - bin/install.js (writeSharedAssets, installCodexRuntime, readSettings, copyDirWithPreservation, RUNTIMES)
  - test/install.test.js (baseline atomic-write, parse, rewrite coverage)
  - test/phase25-schema-validation.test.js (schema validation coverage)
  - test/phase26-settings-template-preservation.test.js (preservation coverage)
provides:
  - end-to-end v1.6 hardening regression test (QA-05)
  - canonical requirement → test traceability map
affects:
  - npm test suite (+5 tests; 1062 → 1067, all passing)
tech-stack:
  added: []
  patterns:
    - "hermetic integration test via os.mkdtempSync + project-scope install + process.chdir"
key-files:
  created:
    - test/v1.6-hardening-integration.test.js
    - .planning/phases/28-hardening-regression-coverage/28-COVERAGE.md
  modified: []
decisions:
  - "Use project-scope install with process.chdir() for isolation instead of HOME override, because RUNTIMES.*.*_dir_global paths are captured at module-load time from os.homedir() and cannot be retargeted via env var"
  - "Integration test is purely additive — zero changes to bin/install.js"
  - "REWRITE-02 code-block preservation is asserted when an installed command actually contains a /scr: example inside a fence; if not, the integration test falls back to the runtime marker check and relies on the exhaustive per-function locks in test/install.test.js's rewriteInstalledCommandRefs suite"
metrics:
  duration: ~12 minutes
  completed: 2026-04-16
tasks-completed: 2
tasks-total: 2
commits:
  - 45f2237 docs(28-01): add v1.6 hardening requirement-to-test traceability map
  - bdb46a3 test(28-01): add end-to-end v1.6 hardening integration smoke test
---

# Phase 28 Plan 01: Hardening Regression Coverage Summary

Locked every v1.6 hardening behavior (atomic writes, frontmatter parsing, schema validation, settings/template preservation, per-runtime command rewriting) with a requirement → test traceability map plus a hermetic end-to-end smoke test that exercises the full install → customize → reinstall contract in one run.

## Requirement → Test Mapping

Authoritative mapping lives in `.planning/phases/28-hardening-regression-coverage/28-COVERAGE.md`. Summary:

| Requirement | Primary Coverage |
|---|---|
| SAFE-01 (atomic writes) | `test/install.test.js` — `atomicWriteFileSync` suite + `Installer leaves no *.tmp. files behind` |
| SAFE-02 (orphan cleanup) | `test/install.test.js` — `cleanOrphanedTempFiles` suite + crash-simulation test |
| PARSE-01 (colons in values) | `test/install.test.js` — `readFrontmatterValue > PARSE-01: *` |
| PARSE-02 (frontmatter scope) | `test/install.test.js` — `readFrontmatterValue > PARSE-02: *` |
| PARSE-03 (arrays) | `test/install.test.js` — `readFrontmatterValue > PARSE-03: *` |
| SCHEMA-01 (validation) | `test/phase25-schema-validation.test.js` — `validateSettings` suite |
| SCHEMA-02 (migrate-then-validate) | `test/phase25-schema-validation.test.js` — `migrateSettings` + `readSettings` |
| PRES-01 (settings merge) | `test/phase26-settings-template-preservation.test.js` — `mergeSettings: *` |
| PRES-02 (template backup) | `test/phase26-settings-template-preservation.test.js` — `copyDirWithPreservation: *` |
| REWRITE-01 ($scr-* in prose) | `test/install.test.js` — `rewriteInstalledCommandRefs` + `generateCodexCommandContent` + `installCodexRuntime` |
| REWRITE-02 (code-block preserved) | `test/install.test.js` — `rewriteInstalledCommandRefs code-block awareness` suite |
| QA-05 (integration) | `test/v1.6-hardening-integration.test.js` — new in this plan |

## Gaps Discovered

None. Every v1.6 requirement ID already had at least one dedicated, named test case before this phase. Phase 28 added the integration smoke test (QA-05) that composes all five behaviors in a single realistic install → customize → reinstall flow. If any hardened behavior drifts in composition (even where each unit still passes in isolation), the smoke test fails.

## Integration Test Isolation Strategy

`test/v1.6-hardening-integration.test.js` is hermetic by construction:

1. Every test creates its own `os.mkdtempSync(os.tmpdir(), 'scriven-v16-*')` directory and cleans it in `finally`.
2. Installs run with `isGlobal=false` (project scope) and `process.chdir(tmp)` to force relative paths (`.scriven/`, `.codex/...`) to resolve inside the tmp dir.
3. `RUNTIMES.codex.*_dir_global` paths (which are captured at module-load time from `os.homedir()` and cannot be retargeted via env var) are never invoked.
4. `process.cwd()` is restored in `finally`.

Net effect: the real `~/.claude`, `~/.codex`, and `~/.scriven` trees are never touched even on test failure.

## What the Integration Test Asserts

- **SAFE-01/02** — after a fresh install there are zero `*.tmp.<uuid>` orphans anywhere under the install root.
- **PRES-01, SCHEMA-01/02** — user sets `developer_mode: true` on the installed `settings.json`, reinstall preserves it; `version` matches `package.json`, `installed_at` is refreshed; `readSettings()` passes migrate+validate end-to-end.
- **PRES-02 (backup branch)** — user edits a shipped template, reinstall backs the edit up as `<name>.backup.<timestamp>` and restores shipped content.
- **PRES-02 (silent branch)** — reinstalling with no user edits produces no `.backup.*` siblings anywhere under `templates/`.
- **REWRITE-01/02** — an installed Codex command contains `$scr-*` in prose; when a shipped command has a `/scr:` example inside a fenced code block, the fence is preserved byte-for-byte.

## Deviations from Plan

None — plan executed exactly as written. No `bin/install.js` changes; this phase is purely additive test and documentation coverage.

## Verification

- `node --test test/v1.6-hardening-integration.test.js` — 5/5 pass, ~2.4s.
- `npm test` — 1067 tests pass, 0 fail (baseline was 1062; +5 new integration tests).
- No `.tmp.*` orphans in repo after the full suite.
- No changes to `bin/install.js`.
- 28-COVERAGE.md contains rows for all 12 v1.6 requirement IDs.

## Follow-ups

- None required to satisfy QA-05.
- A future optional enhancement: loosen `RUNTIMES.*.*_dir_global` to accept an override function/env var so a single end-to-end test could exercise the `isGlobal=true` install path too. Not blocking — the `isGlobal=false` path exercises every hardened code path (writeSharedAssets, installCodexRuntime, copyDirWithPreservation, mergeSettings, atomicWriteFileSync, cleanOrphanedTempFiles) with identical semantics.

## Self-Check: PASSED

- FOUND: test/v1.6-hardening-integration.test.js
- FOUND: .planning/phases/28-hardening-regression-coverage/28-COVERAGE.md
- FOUND commit: 45f2237 (docs(28-01): add v1.6 hardening requirement-to-test traceability map)
- FOUND commit: bdb46a3 (test(28-01): add end-to-end v1.6 hardening integration smoke test)
- VERIFIED: npm test → 1067 pass / 0 fail
