---
phase: 38-documentation-regression-guardrails
fixed_at: 2026-04-18T03:49:33Z
review_path: .planning/milestones/v1.8-phases/38-documentation-regression-guardrails/38-REVIEW.md
iteration: 1
findings_in_scope: 3
fixed: 3
skipped: 0
status: all_fixed
---

# Phase 38: Code Review Fix Report

**Fixed at:** 2026-04-18T03:49:33Z
**Source review:** .planning/milestones/v1.8-phases/38-documentation-regression-guardrails/38-REVIEW.md
**Iteration:** 1

**Summary:**
- Findings in scope: 3
- Fixed: 3
- Skipped: 0

## Fixed Issues

### WR-01: Command reference is stale, but the new tests do not verify completeness

**Files modified:** `docs/command-reference.md`, `test/command-surface-coherence.test.js`
**Commit:** `6f8e223`
**Applied fix:** Updated the command reference to the live 108-command inventory, added the missing build/cleanup/validate/sacred entries, removed the inaccurate "auto-generated" claim, and added regression coverage that compares the documented command refs and headline count directly against `collectCommandEntries(...)`.

---

### WR-02: Sacred and academic adaptation docs advertise commands that the registry marks unavailable

**Files modified:** `docs/command-reference.md`, `docs/work-types.md`, `docs/sacred-texts.md`, `commands/scr/help.md`, `commands/scr/do.md`
**Commit:** `6f8e223`
**Applied fix:** Rewrote the adaptation guidance to distinguish canonical runnable commands from descriptive labels, removed dead sacred/academic alias examples, and pointed sacred-only flows like chronology, doctrinal review, concordance, and verse numbering at the dedicated `/scr:sacred:*` command family.

---

### IN-01: Contributing guide inventory counts are already stale

**Files modified:** `docs/contributing.md`
**Commit:** `6f8e223`
**Applied fix:** Replaced brittle hard-coded repo inventory counts with durable descriptive labels so the contributing guide no longer drifts every time the command or template tree changes.

## Verification

- `npm test` -> 1539/1539 passing
- `node --test test/command-surface-coherence.test.js test/commands.test.js` -> passing during fix development
- `rg` audit across `README.md`, `docs/`, `commands/`, and `test/` found no remaining dead adapted `/scr:*` alias references in the reviewed command-surface docs

---

_Fixed: 2026-04-18T03:49:33Z_
_Fixer: Codex (gsd-code-review-fix)_
_Iteration: 1_
