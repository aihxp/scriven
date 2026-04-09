---
phase: 16-trust-regression-coverage
reviewed: 2026-04-09T08:44:24Z
depth: standard
files_reviewed: 2
files_reviewed_list:
  - test/phase16-trust-regression.test.js
  - test/package.test.js
findings:
  critical: 0
  warning: 3
  info: 0
  total: 3
status: issues_found
---
# Phase 16: Code Review Report

**Reviewed:** 2026-04-09T08:44:24Z
**Depth:** standard
**Files Reviewed:** 2
**Status:** issues_found

## Summary

Reviewed the new trust-regression and packaging tests against the current repo state, including the canonical docs and installer registry they reference. The tests pass today, but three assertions are too weak for the trust/runtime guarantees this phase is meant to protect, so important regressions can slip through while the suite stays green.

## Warnings

### WR-01: Engine-baseline assertion allows unsupported Node floors

**File:** `test/package.test.js:19-25`
**Issue:** The test only checks that `pkg.engines.node` starts with `>=`. A regression from `>=20.0.0` to `>=14.0.0` or `>=18.0.0` would still pass even though project guidance, installer enforcement, and `docs/runtime-support.md` all require a Node 20+ baseline.
**Fix:**
```js
it('pins the documented Node 20+ baseline', () => {
  assert.equal(pkg.engines.node, '>=20.0.0');
});
```

### WR-02: Forbidden-claim guard ignores onboarding copy

**File:** `test/phase16-trust-regression.test.js:89-97`
**Issue:** The “launch-surface regression” check only scans `README.md`, even though the suite also treats `docs/getting-started.md` as launch/onboarding surface. Absolute claims can reappear in onboarding docs without tripping this test, which weakens the trust-regression coverage this phase is adding.
**Fix:**
```js
for (const [name, doc] of [['README.md', readme], ['docs/getting-started.md', gettingStarted]]) {
  for (const pattern of forbiddenPhrases) {
    assert.ok(!pattern.test(doc), `${name} should not contain forbidden phrase: ${pattern}`);
  }
}
```

### WR-03: Runtime-matrix coverage only verifies labels, not canonical claims

**File:** `test/phase16-trust-regression.test.js:131-137`
**Issue:** This assertion proves only that each runtime label appears somewhere in `docs/runtime-support.md`. If the matrix drifts on install type, install-path shape, support level, or verification status, the test still passes even though those fields are the canonical trust claims for runtime support.
**Fix:**
```js
for (const runtime of Object.values(RUNTIMES)) {
  assert.match(
    runtimeSupport,
    new RegExp(`\\| ${runtime.label} \\| ${runtime.type} \\|`)
  );
}
```
Add targeted assertions for the documented path-shape/support-level text for each runtime class instead of checking label presence alone.

---

_Reviewed: 2026-04-09T08:44:24Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
