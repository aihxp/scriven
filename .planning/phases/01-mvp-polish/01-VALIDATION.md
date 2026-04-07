---
phase: 1
slug: mvp-polish
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-07
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | node:test (built-in, Node 18+) |
| **Config file** | none — Wave 0 creates test files |
| **Quick run command** | `node --test test/` |
| **Full suite command** | `node --test test/` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `node --test test/`
- **After every plan wave:** Run `node --test test/`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | MVP-02 | unit | `node --test test/constraints.test.js` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 1 | MVP-04 | unit | `node --test test/commands.test.js` | ❌ W0 | ⬜ pending |
| 01-02-01 | 02 | 1 | MVP-01 | integration | `ls data/demo/.manuscript/` | ❌ W0 | ⬜ pending |
| 01-02-02 | 02 | 1 | MVP-01 | unit | `node --test test/demo.test.js` | ❌ W0 | ⬜ pending |
| 01-03-01 | 03 | 2 | MVP-03 | unit | `node --test test/installer.test.js` | ❌ W0 | ⬜ pending |
| 01-03-02 | 03 | 2 | MVP-05 | integration | `npm pack --dry-run` | n/a | ⬜ pending |
| 01-03-03 | 03 | 2 | MVP-06 | integration | `npm pack --dry-run` | n/a | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `test/constraints.test.js` — CONSTRAINTS.json schema validation stubs
- [ ] `test/commands.test.js` — command file structure validation stubs
- [ ] `test/demo.test.js` — demo file completeness stubs
- [ ] `test/installer.test.js` — installer dry-run stubs
- [ ] `package.json` test script — `"test": "node --test test/"`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| `npx scriven@latest` works on clean machine | MVP-06 | Requires clean npm environment | Publish to npm, run `npx scriven@latest` in clean directory |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
