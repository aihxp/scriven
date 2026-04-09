---
phase: 22-runtime-docs-verification
review_fix_created: 2026-04-09T17:28:00Z
source_review: 22-REVIEW.md
status: fixed
fixes_applied: 2
---

# Phase 22 Review Fix Summary

## Fixes Applied

### WR-01: Silent installs now require explicit runtime selection

- Added `resolveInstallRequest()` in `bin/install.js` so `--silent` only enters non-interactive install mode when a runtime directive is present.
- Modifier-only invocations such as `--project` or `--developer` now stay interactive, and `--silent` without `--runtime`, `--runtimes`, or `--detected` exits with a usage error instead of defaulting to Claude Code.
- Added regression coverage in `test/installer.test.js` for modifier-only interactive behavior and silent-without-runtime rejection.

### WR-02: Codex reinstall cleanup now removes stale Scriven-owned skills

- Added Scriven-owned Codex skill tracking via `.codex/skills/.scriven-installed.json`.
- Added cleanup logic that removes stale Scriven-generated skill directories from both the manifest and wrapper-signature detection before writing the fresh skill set.
- Added regression coverage in `test/installer.test.js` for manifest-based cleanup and stale-wrapper cleanup while preserving unrelated directories.

## Verification

- `node --check bin/install.js`
- `node --test test/installer.test.js`
- `node --test test/installer.test.js test/phase14-runtime-credibility.test.js test/phase16-trust-regression.test.js`
- TTY repro now fails correctly: `node bin/install.js --project --developer --silent`
- Codex reinstall smoke check removes a seeded stale `scr-removed` skill and rewrites the Scriven-owned manifest

## Files Modified

- `bin/install.js`
- `test/installer.test.js`
