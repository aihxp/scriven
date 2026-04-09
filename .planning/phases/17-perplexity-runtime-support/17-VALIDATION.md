---
phase: 17
slug: perplexity-runtime-support
status: verified
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-09T12:55:00Z
---

# Phase 17 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js built-in test runner |
| **Config file** | none |
| **Quick run command** | `node --test test/installer.test.js test/phase14-runtime-credibility.test.js test/phase16-trust-regression.test.js` |
| **Full suite command** | `npm test --silent` |
| **Estimated runtime** | ~1 second |

---

## Sampling Rate

- **After every task commit:** Run `node --test test/installer.test.js test/phase14-runtime-credibility.test.js test/phase16-trust-regression.test.js`
- **After every plan wave:** Run `npm test --silent`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 17-01-01 | 01 | 1 | RUNTIME-05 | T-17-01-01 | Installer exposes Perplexity Desktop as a guided target instead of misclassifying it as a file-copy runtime | unit | `node --test test/installer.test.js` | ✅ | ✅ green |
| 17-01-02 | 01 | 1 | RUNTIME-06 | T-17-01-02, T-17-01-03 | Runtime matrix and installer tests preserve the Perplexity Desktop row, evidence framing, and registry semantics | unit | `node --test test/installer.test.js test/phase16-trust-regression.test.js` | ✅ | ✅ green |
| 17-02-01 | 02 | 2 | RUNTIME-07 | T-17-02-01, T-17-02-02 | Launch, onboarding, and troubleshooting docs keep the Perplexity Desktop support boundary honest | unit | `node --test test/phase14-runtime-credibility.test.js test/phase16-trust-regression.test.js` | ✅ | ✅ green |
| 17-02-02 | 02 | 2 | RUNTIME-07 | T-17-02-03 | Regression tests fail if Perplexity wording drifts into broader unsupported parity claims | unit | `node --test test/installer.test.js test/phase14-runtime-credibility.test.js test/phase16-trust-regression.test.js` | ✅ | ✅ green |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements.

---

## Manual-Only Verifications

All phase behaviors have automated verification.

---

## Validation Audit 2026-04-09

| Metric | Count |
|--------|-------|
| Gaps found | 0 |
| Resolved | 0 |
| Escalated | 0 |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 5s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** verified 2026-04-09
