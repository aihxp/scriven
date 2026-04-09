---
phase: 14-runtime-credibility
reviewed: 2026-04-09T09:10:00Z
depth: standard
files_reviewed: 10
files_reviewed_list:
  - docs/runtime-support.md
  - package.json
  - bin/install.js
  - docs/architecture.md
  - docs/shipped-assets.md
  - test/phase5-export-publishing.test.js
  - README.md
  - docs/getting-started.md
  - AGENTS.md
  - CLAUDE.md
findings:
  critical: 0
  warning: 2
  info: 1
  total: 3
status: issues_found
---
# Phase 14: Code Review Report

**Reviewed:** 2026-04-09T09:10:00Z
**Depth:** standard
**Files Reviewed:** 10
**Status:** issues_found

## Summary

Phase 14 tightened the documented runtime story, but two installer-facing issues still undermine that credibility in practice. One is a real input-validation gap in the interactive installer, and the other sends newly installed users to the wrong repository URL. There is also a smaller trust issue in the README's runtime count.

## Warnings

### WR-01: Runtime selection is not range-checked before the installer dereferences it

**File:** `bin/install.js:243-245`, `bin/install.js:265`
**Issue:** The runtime prompt turns the user's selection directly into an array lookup and then reads `runtime.type` later without validating that the chosen index exists. An out-of-range interactive selection can leave `runtime` undefined and push the installer into an invalid state instead of recovering with a friendly prompt.

### WR-02: Installer ends with a non-canonical repository/docs URL

**Files:** `bin/install.js:326`, `package.json:10-13`
**Issue:** The installer sends users to `https://github.com/scriven/scriven`, but the package metadata points to `https://github.com/aihxp/scriven`. That misroutes users immediately after install and weakens the runtime-credibility story the phase is trying to establish.

## Info

### IN-01: README runtime count drifts from the actual installer-target list

**File:** `README.md:156-178`
**Issue:** The runtime list shows 9 named installer targets, but the status block says 10 installer targets. This is a smaller issue than the installer defects above, but it is still visible drift on a trust-critical page.

---
_Reviewed: 2026-04-09T09:10:00Z_
_Reviewer: Codex + gsd-code-reviewer_
_Depth: standard_
