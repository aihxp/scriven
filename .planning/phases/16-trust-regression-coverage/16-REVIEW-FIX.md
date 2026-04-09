---
phase: 16-trust-regression-coverage
fixed_at: 2026-04-09T09:07:58Z
review_path: .planning/phases/16-trust-regression-coverage/16-REVIEW.md
iteration: 1
scope: warning
findings_in_scope: 3
fixed: 3
deferred: 0
status: all_fixed
---
# Phase 16: Review Fix Summary

**Scope:** Warning findings only
**Source review:** `.planning/phases/16-trust-regression-coverage/16-REVIEW.md`

## Fixed Warnings

### WR-01: Engine-baseline assertion allows unsupported Node floors

Fixed in `test/package.test.js`. The engine assertion now pins `pkg.engines.node` to `>=20.0.0` instead of merely checking that the string starts with `>=`.

### WR-02: Forbidden-claim guard ignores onboarding copy

Fixed in `test/phase16-trust-regression.test.js`. The forbidden-claim scan now checks both `README.md` and `docs/getting-started.md`.

### WR-03: Runtime-matrix coverage only verifies labels, not canonical claims

Fixed in `test/phase16-trust-regression.test.js`. The runtime support test now matches each runtime's label, install type, documented path shape, support-level text, and verification-status text against `docs/runtime-support.md`.

## Deferred Warnings

None.

## Verification

- `npm test --silent` was run in the current workspace and completed with `925` passing tests and `0` failures.
- The most relevant checks are `test/package.test.js` and `test/phase16-trust-regression.test.js`, both exercised by that run.
- Manual review confirmed the new assertions are anchored to the current `RUNTIMES` metadata and the documented runtime matrix wording.

---
_Fixed at: 2026-04-09T09:07:58Z_
