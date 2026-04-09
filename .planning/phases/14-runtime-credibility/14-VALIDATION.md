---
phase: 14
slug: runtime-credibility
status: verified
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-09T14:08:00Z
---

# Phase 14 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js built-in test runner |
| **Config file** | none |
| **Quick run command** | `node --test test/phase14-runtime-credibility.test.js test/installer.test.js test/phase16-trust-regression.test.js test/package.test.js` |
| **Full suite command** | `npm test --silent` |
| **Estimated runtime** | ~1 second |

---

## Sampling Rate

- **After every task commit:** Run `node --test test/phase14-runtime-credibility.test.js test/installer.test.js test/phase16-trust-regression.test.js test/package.test.js`
- **After every plan wave:** Run `npm test --silent`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 14-01-01 | 01 | 1 | RUNTIME-01 | T-14-01-01 | Package metadata and installer copy preserve the exact `>=20.0.0` / `Node 20+` baseline | unit | `node --test test/phase14-runtime-credibility.test.js test/package.test.js` | ✅ | ✅ green |
| 14-01-02 | 01 | 1 | RUNTIME-02 | T-14-01-02 | Runtime matrix keeps every installer target represented and grounded in installer-registry evidence | unit | `node --test test/phase14-runtime-credibility.test.js test/installer.test.js test/phase16-trust-regression.test.js` | ✅ | ✅ green |
| 14-01-03 | 01 | 1 | RUNTIME-02 | T-14-01-03 | Architecture docs defer runtime-policy truth to `docs/runtime-support.md` instead of restating conflicting claims | unit | `node --test test/phase14-runtime-credibility.test.js` | ✅ | ✅ green |
| 14-02-01 | 02 | 2 | RUNTIME-03 | T-14-02-01 | README and onboarding preserve the canonical runtime-matrix links and the Node 20+ baseline | unit | `node --test test/phase14-runtime-credibility.test.js` | ✅ | ✅ green |
| 14-02-02 | 02 | 2 | RUNTIME-03 | T-14-02-02 | Launch docs use installer-target wording instead of blanket runtime-support claims | unit | `node --test test/phase14-runtime-credibility.test.js` | ✅ | ✅ green |
| 14-02-03 | 02 | 2 | RUNTIME-03 | T-14-02-03 | `AGENTS.md` and `CLAUDE.md` keep runtime credibility as explicit project policy and preserve the host-parity caveat | unit | `node --test test/phase14-runtime-credibility.test.js` | ✅ | ✅ green |

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
| Gaps found | 3 |
| Resolved | 3 |
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
