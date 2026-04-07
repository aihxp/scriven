---
phase: 3
slug: creative-toolkit
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-07
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | node:test (built-in, Node 18+) |
| **Config file** | none — Plan 04 creates test file |
| **Quick run command** | `node --test test/phase3-creative-toolkit.test.js` |
| **Full suite command** | `node --test test/` |
| **Estimated runtime** | ~3 seconds |

---

## Sampling Rate

- **After every task commit:** Run `node --test test/phase3-creative-toolkit.test.js`
- **After every plan wave:** Run `node --test test/`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | CHAR-01..04,07 | unit | `ls commands/scr/character-sheet.md commands/scr/build-world.md` | ❌ W0 | ⬜ pending |
| 03-01-02 | 01 | 1 | CHAR-05,06 | unit | `ls commands/scr/relationship-map.md commands/scr/cast-list.md` | ❌ W0 | ⬜ pending |
| 03-02-01 | 02 | 1 | STRUCT-01..03 | unit | `ls commands/scr/timeline.md commands/scr/theme-tracker.md` | ❌ W0 | ⬜ pending |
| 03-02-02 | 02 | 1 | STRUCT-04,05 | unit | `ls commands/scr/subplot-map.md commands/scr/outline.md` | ❌ W0 | ⬜ pending |
| 03-03-01 | 03 | 2 | STRUCT-06 | unit | `ls commands/scr/add-unit.md` | ❌ W0 | ⬜ pending |
| 03-03-02 | 03 | 2 | CHAR-08 | unit | `grep -c "character-sheet\|cast-list" data/CONSTRAINTS.json` | n/a | ⬜ pending |
| 03-04-01 | 04 | 3 | ALL | integration | `node --test test/phase3-creative-toolkit.test.js` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `test/phase3-creative-toolkit.test.js` — stubs for all 14 requirements (created by Plan 04)

*Plan 04 is the Wave 0 equivalent — it creates the comprehensive test file.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| ASCII relationship graph readability | CHAR-05 | Visual layout quality is subjective | Run `/scr:relationship-map` with 3+ characters, verify labeled edges render correctly |
| Plot graph arc type auto-detection | STRUCT-01 | Depends on OUTLINE.md content | Create varied outlines, verify correct arc type selection |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
