# v1.6 Hardening Regression Coverage

**Phase:** 28 — Hardening Regression Coverage
**Requirement:** QA-05
**Generated:** 2026-04-16

This document maps every v1.6 hardening requirement to at least one named
regression test. Future refactors that drift any hardened behavior will fail
the mapped test case.

## Requirement → Test Mapping

| Requirement | Test File | Test Name(s) | Status |
|---|---|---|---|
| SAFE-01 (atomic writes — no partial files on crash) | `test/install.test.js` | `atomicWriteFileSync > writes the expected content to the target path`; `atomicWriteFileSync > leaves no *.tmp.<uuid> sibling after successful write`; `atomicWriteFileSync > creates missing parent directories recursively`; `atomicWriteFileSync > accepts Buffer content`; `atomicWriteFileSync > cleans up the temp file and rethrows when write fails`; `Installer leaves no *.tmp. files behind > installClaudeCommandRuntime leaves zero .tmp. siblings`; `Installer leaves no *.tmp. files behind > atomicWriteFileSync to settings.json leaves zero .tmp. siblings` | covered |
| SAFE-02 (orphan temp-file cleanup on next run) | `test/install.test.js` | `cleanOrphanedTempFiles > returns 0 when directory does not exist (no throw)`; `cleanOrphanedTempFiles > removes *.tmp.<uuid> files and returns the count`; `cleanOrphanedTempFiles > leaves non-matching files untouched`; `cleanOrphanedTempFiles > does not recurse into subdirectories`; `cleanOrphanedTempFiles > ignores directory entries even if their name matches`; `Installer leaves no *.tmp. files behind > crash-simulation: orphan from prior run is cleaned before fresh write succeeds`; `collectTargetDirsForSweep > *` (4 tests) | covered |
| PARSE-01 (colons preserved in frontmatter values) | `test/install.test.js` | `readFrontmatterValue > PARSE-01: preserves colons in quoted values`; `readFrontmatterValue > PARSE-01: preserves colons in unquoted values (splits on first colon only)`; `readFrontmatterValue > preserves # inside a quoted value`; `readFrontmatterValue > strips an unquoted trailing inline comment` | covered |
| PARSE-02 (scope parsing to frontmatter block only) | `test/install.test.js` | `readFrontmatterValue > PARSE-02: ignores body text that looks like a key line`; `readFrontmatterValue > PARSE-02: key that exists only in body returns empty string`; `readFrontmatterValue > file without frontmatter returns empty string`; `readFrontmatterValue > malformed frontmatter (no closing fence) returns empty`; `readFrontmatterValue > readFrontmatterValues returns a full object with every key` | covered |
| PARSE-03 (multiline/array-style values preserved) | `test/install.test.js` | `readFrontmatterValue > PARSE-03: array-style value returned intact as string`; `readFrontmatterValue > PARSE-03: bracketed value containing colons is preserved` | covered |
| SCHEMA-01 (settings schema validation) | `test/phase25-schema-validation.test.js` | `SETTINGS_SCHEMA > is exported and contains all canonical fields`; `validateSettings > Test 1: valid settings pass validation without errors`; `validateSettings > Test 2: missing required field (version) fails with field-named error`; `validateSettings > Test 3: wrong-typed field names expected and received types`; `validateSettings > Test 4: unknown field produces warning but remains valid`; `validateSettings > Test 5: enum violation names allowed values and received value`; `validateSettings > rejects non-object settings input`; `validateSettings > rejects null settings input`; `validateSettings > allows empty string for runtime (allow_empty=true)`; `validateSettings > flags empty string for a non-allow_empty string field`; `validateSettings > flags array-of-string when element is wrong type`; `validateSettings > flags install_mode enum violation` | covered |
| SCHEMA-02 (migrate-then-validate read pipeline) | `test/phase25-schema-validation.test.js` | `migrateSettings > Test 6: migrates runtime → runtimes when runtimes missing`; `migrateSettings > Test 7: fills in default scope and install_mode when missing`; `migrateSettings > Test 8: old-format settings migrate + validate cleanly`; `migrateSettings > defaults runtimes to [] when runtime is missing/empty`; `migrateSettings > does not mutate the caller input`; `migrateSettings > preserves existing runtimes if already present`; `readSettings > Test 9: happy path returns parsed+migrated object`; `readSettings > Test 10: invalid settings throw with failing field name in message`; `readSettings > Test 11: missing file throws with "not found" in message`; `readSettings > Test 12: migration precedes validation — old-format file succeeds`; `readSettings > thrown error message does not include "(warning)" lines` | covered |
| PRES-01 (settings merge preserves user fields) | `test/phase26-settings-template-preservation.test.js` | `mergeSettings: developer_mode preserved, version updated`; `mergeSettings: unknown user fields preserved`; `mergeSettings: null or undefined existing returns incoming`; `mergeSettings: does not mutate inputs`; `mergeSettings: every INSTALLER_OWNED_FIELDS value comes from incoming` | covered |
| PRES-02 (template backup on user modification) | `test/phase26-settings-template-preservation.test.js` | `sha256File returns null for missing file`; `sha256File returns stable hex digest for existing file`; `copyDirWithPreservation: fresh install copies everything`; `copyDirWithPreservation: unmodified files replaced silently`; `copyDirWithPreservation: modified file is backed up with timestamp` | covered |
| REWRITE-01 (per-runtime command-ref syntax) | `test/install.test.js` | `rewriteInstalledCommandRefs code-block awareness > rewrites a prose reference (Codex transform)`; `generateCodexCommandContent > rewrites prose /scr:help to $scr-help and inserts codex marker`; `generateCodexCommandContent > inserts marker after frontmatter when present`; `generateClaudeCommandContent regression (code-block aware) > rewrites prose to /scr- but leaves code block /scr:help intact`; `installCodexRuntime rewrites command files > writes installed Codex command files with $scr- in prose, preserves code blocks, inserts marker`; `installCodexRuntime rewrites command files > preserves nested command paths (sacred/concordance.md)`; `installCodexRuntime rewrites command files > re-running the installer is idempotent (marker appears once, no tmp files)` | covered |
| REWRITE-02 (code blocks preserved byte-for-byte) | `test/install.test.js` | `rewriteInstalledCommandRefs code-block awareness > leaves triple-backtick code blocks unchanged byte-for-byte`; `rewriteInstalledCommandRefs code-block awareness > leaves tilde-fenced code blocks unchanged byte-for-byte`; `rewriteInstalledCommandRefs code-block awareness > mixed file: rewrites prose, preserves code blocks`; `rewriteInstalledCommandRefs code-block awareness > empty code block passes through unchanged`; `rewriteInstalledCommandRefs code-block awareness > info-string fence opener (\`\`\`bash) is treated as code-block opener`; `rewriteInstalledCommandRefs code-block awareness > consecutive code blocks separated by prose still rewrites prose`; `rewriteInstalledCommandRefs code-block awareness > indented (4-space) lines are NOT treated as code blocks (out of scope)`; `rewriteInstalledCommandRefs code-block awareness > unterminated fence: rest of file is treated as code (fail-safe)`; `rewriteInstalledCommandRefs code-block awareness > mixed fences do not close each other (\`\`\` opens, ~~~ does not close)` | covered |
| QA-05 (end-to-end integration) | `test/v1.6-hardening-integration.test.js` | `v1.6 hardening integration > fresh install leaves no .tmp.<uuid> orphans (SAFE-01/02)`; `v1.6 hardening integration > user-set developer_mode survives reinstall; version + installed_at refreshed (PRES-01, SCHEMA-01/02)`; `v1.6 hardening integration > modified shipped template is backed up with .backup.<timestamp> (PRES-02)`; `v1.6 hardening integration > unmodified shipped template is replaced silently (PRES-02)`; `v1.6 hardening integration > installed Codex command uses $scr-* in prose and preserves /scr: inside code blocks (REWRITE-01/02)` | covered |

## Discovery

The `npm test` script is `node --test test/*.test.js`. The shell glob
`test/*.test.js` expands to every file in `test/` whose name ends in
`.test.js`, which includes all of:

- `test/install.test.js`
- `test/phase25-schema-validation.test.js`
- `test/phase26-settings-template-preservation.test.js`
- `test/v1.6-hardening-integration.test.js` (new — phase 28)

Baseline run at time of this audit: **1062 tests pass, 0 fail** across all
phase test files before phase 28 additions.

No discovery gaps observed. No requirement is missing a test.

## Integration Smoke Test

See `test/v1.6-hardening-integration.test.js`. It exercises the end-to-end
install → customize → reinstall flow against an isolated temp directory and
asserts no hardening behavior has drifted. The integration test is the
canonical QA-05 regression: if any of the five hardening dimensions (atomic
writes, frontmatter parsing, schema validation, settings/template
preservation, per-runtime rewriting) regresses in real composition, the
smoke test will fail even if every unit test still passes.

## Isolation Strategy

The integration test runs entirely inside `os.mkdtempSync(os.tmpdir(), ...)`.
It uses project-scope installs (`isGlobal = false`) and `process.chdir()` to
the tmp directory, because `RUNTIMES.*.*_dir_global` paths are captured at
module-load time from `os.homedir()` and cannot be repointed via `$HOME`
override. This guarantees zero contact with the user's real `~/.claude`,
`~/.codex`, or `~/.scriven` trees.
