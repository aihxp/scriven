---
phase: 14-runtime-credibility
fixed_at: 2026-04-09T09:07:58Z
review_path: .planning/phases/14-runtime-credibility/14-REVIEW.md
iteration: 1
scope: warning
findings_in_scope: 2
fixed: 2
deferred: 0
status: all_fixed
---
# Phase 14: Review Fix Summary

**Scope:** Warning findings only
**Source review:** `.planning/phases/14-runtime-credibility/14-REVIEW.md`

## Fixed Warnings

### WR-01: Runtime selection is not range-checked before the installer dereferences it

Fixed in `bin/install.js`. The installer now parses the selection defensively, validates that it falls within the runtime menu, and falls back to option `1` with a warning when the input is out of range.

### WR-02: Installer ends with a non-canonical repository/docs URL

Fixed in `bin/install.js`. The post-install docs link now comes from `package.json` metadata (`homepage` or `repository.url`) instead of the stale `https://github.com/scriven/scriven` URL.

## Deferred Warnings

None.

## Verification

- `npm test --silent` was run in the current workspace and completed with `925` passing tests and `0` failures.
- Relevant coverage in that run includes the installer/runtime assertions in `test/install.test.js`, `test/runtime-targets.test.js`, and `test/phase16-trust-regression.test.js`.
- Manual review confirmed `package.json` points to `https://github.com/aihxp/scriven` and `bin/install.js` now reuses that canonical metadata.

---
_Fixed at: 2026-04-09T09:07:58Z_
