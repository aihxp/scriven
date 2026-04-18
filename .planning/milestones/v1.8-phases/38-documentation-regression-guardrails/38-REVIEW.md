---
phase: 38-documentation-regression-guardrails
reviewed: 2026-04-18T04:20:00Z
depth: standard
files_reviewed: 26
files_reviewed_list:
  - README.md
  - bin/install.js
  - commands/scr/autopilot.md
  - commands/scr/back-matter.md
  - commands/scr/demo.md
  - commands/scr/discuss.md
  - commands/scr/do.md
  - commands/scr/draft.md
  - commands/scr/editor-review.md
  - commands/scr/help.md
  - commands/scr/new-work.md
  - commands/scr/next.md
  - commands/scr/plan.md
  - commands/scr/resume-work.md
  - commands/scr/submit.md
  - docs/architecture.md
  - docs/command-reference.md
  - docs/configuration.md
  - docs/contributing.md
  - docs/sacred-texts.md
  - docs/testing.md
  - docs/voice-dna.md
  - docs/work-types.md
  - test/command-surface-coherence.test.js
  - test/commands.test.js
  - test/installer.test.js
findings:
  critical: 1
  warning: 3
  info: 1
  total: 5
status: issues_found
---

# Phase 38: Code Review Report

**Reviewed:** 2026-04-18T04:20:00Z
**Depth:** standard
**Files Reviewed:** 26
**Status:** issues_found

## Summary

Reviewed the current command-surface docs, command specs, and regression tests against the live command tree and installer helpers. The earlier command-surface drift is fixed, but the refreshed review still found a small set of contract and safety gaps in the editorial workflow docs, one draft-path mismatch in back matter, and stale trust-surface numbers in README.

## Critical

### CR-01: Proposal paths and commit guidance use unsanitized proposal names

**Files:** `/Users/hprincivil/Projects/scriven/commands/scr/editor-review.md:124-187`, `/Users/hprincivil/Projects/scriven/commands/scr/editor-review.md:251-339`

**Issue:** The collaboration workflow interpolates `{slug}` and `<name>` directly into proposal paths and an example `git commit -m "Editor review: <name>"` shell command without any slug-sanitization contract. If an agent follows this spec literally, a malicious or malformed proposal name can cause path traversal or shell-injection risk.

**Fix:** Add an explicit slug-normalization step before any file access, constrain proposal artifact paths to `.manuscript/proposals/`, and remove raw shell command examples that interpolate user-controlled names. If developer-mode git guidance remains, require sanitized slug-only commit messages and never expose shell snippets in writer mode.

## Warnings

### WR-01: Back matter loads a draft directory that the rest of Scriven no longer uses

**File:** `/Users/hprincivil/Projects/scriven/commands/scr/back-matter.md:42-48`

**Issue:** The command still tells the agent to load drafted prose from `.manuscript/drafts/`, but the current workflow and docs use `.manuscript/{N}-*-DRAFT.md` files directly. Following this stale path contract can make back-matter generation miss manuscript content.

**Fix:** Read drafted prose from the canonical `.manuscript/*-DRAFT.md` surface (or explicitly support both locations if legacy compatibility matters).

### WR-02: Editor-review and submit disagree on the editor notes contract

**Files:** `/Users/hprincivil/Projects/scriven/commands/scr/editor-review.md:78-80`, `/Users/hprincivil/Projects/scriven/commands/scr/submit.md:16-22`

**Issue:** `editor-review.md` describes writing `{act_num}-EDITOR-NOTES.md`, while `submit.md` checks for `{N}-EDITOR-NOTES.md`. The mismatch is subtle but enough to break workflow chaining if the spec is followed literally.

**Fix:** Standardize both command specs on the same `{N}-EDITOR-NOTES.md` contract and terminology.

### WR-03: Writer mode still exposes file paths and git operations in editor-review

**Files:** `/Users/hprincivil/Projects/scriven/commands/scr/editor-review.md:48-52`, `/Users/hprincivil/Projects/scriven/commands/scr/editor-review.md:187`, `/Users/hprincivil/Projects/scriven/commands/scr/editor-review.md:241`

**Issue:** The command loads `developer_mode` but still instructs the agent to reference file paths during read-through and to run explicit git add/commit operations in collaboration subflows regardless of that flag. That leaks developer-mode details into writer mode.

**Fix:** Gate file-path and git-bookkeeping guidance behind `developer_mode`, and keep writer-mode output focused on manuscript units and saved notes/proposals rather than filesystem or git internals.

## Info

### IN-01: README trust-surface counts and version text are stale

**File:** `/Users/hprincivil/Projects/scriven/README.md:157-202`

**Issue:** The README still says “101 commands,” “13 sacred work types,” and `Version: 1.5.1`, which no longer matches the current command inventory, sacred grouping, or package version. This is lower risk than the workflow-spec issues, but it weakens trust in the documented surface.

**Fix:** Refresh the counts/version or replace brittle exact counts with durable wording where precision is not important.

---

_Reviewed: 2026-04-18T04:20:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
