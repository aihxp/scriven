---
phase: 13-launch-surface-integrity
reviewed: 2026-04-09T09:10:00Z
depth: standard
files_reviewed: 7
files_reviewed_list:
  - docs/shipped-assets.md
  - commands/scr/export.md
  - docs/publishing.md
  - docs/contributing.md
  - README.md
  - AGENTS.md
  - CLAUDE.md
findings:
  critical: 0
  warning: 6
  info: 2
  total: 8
status: issues_found
---
# Phase 13: Code Review Report

**Reviewed:** 2026-04-09T09:10:00Z
**Depth:** standard
**Files Reviewed:** 7
**Status:** issues_found

## Summary

Phase 13 successfully narrowed the launch story, but the export and publishing docs still contain several contract mismatches that would send users down broken paths. The highest-risk issues are in `/scr:export`, where several advertised package formats are either not validated correctly up front or point to filenames and back-matter flags that other commands do not actually produce.

## Warnings

### WR-01: Package formats are advertised but missing from the export availability map

**File:** `commands/scr/export.md:59-71`
**Issue:** Step 1 says every requested export must be mapped to a `CONSTRAINTS.json` key before availability is checked, but the mapping table stops at `latex`. The later package formats (`kdp-package`, `ingram-package`, `query-package`, `submission-package`) are documented in the command but omitted from the central dispatch table, leaving the promised gate undefined for four advertised formats.

### WR-02: Query and submission package prerequisites point to files other commands never create

**Files:** `commands/scr/export.md:638-639`, `commands/scr/export.md:691-693`, `commands/scr/query-letter.md:33-40`, `commands/scr/query-letter.md:136`, `commands/scr/synopsis.md:100-102`
**Issue:** The export command checks for `.manuscript/output/query-letter.md` and `.manuscript/output/synopsis.md`, but `/scr:query-letter` writes `.manuscript/marketing/QUERY-LETTER.md` and `/scr:synopsis` writes `.manuscript/marketing/SYNOPSIS-{length}.md`. A user who follows the documented recovery steps will still fail the prerequisite check.

### WR-03: Submission-package uses the wrong back-matter slug and filename

**Files:** `commands/scr/export.md:694-704`, `commands/scr/back-matter.md:27`, `commands/scr/back-matter.md:314`
**Issue:** The submission-package flow tells users to run `/scr:back-matter --element about-the-author` and expects `.manuscript/back-matter/about-the-author.md`. The back-matter command defines the element as `about-author` and writes `about-author.md`, so the documented fix path cannot satisfy the prerequisite.

### WR-04: Query-package shells out to Pandoc without first checking for Pandoc

**Files:** `commands/scr/export.md:88-106`, `commands/scr/export.md:667-670`
**Issue:** The preflight gate only checks Pandoc for `docx`, `epub`, and `latex`, but `query-package` later invokes `pandoc` to build `query-package.docx`. Users can reach a hidden tool dependency after passing the initial prerequisites step.

### WR-05: Manuscript DOCX export promises formatting that the shipped path does not provide

**Files:** `commands/scr/export.md:237-247`, `docs/publishing.md:39-46`, `docs/shipped-assets.md:15-18`
**Issue:** The command and guide describe manuscript DOCX as "12pt Times New Roman, double-spaced, 1-inch margins," while also acknowledging that Scriven ships no DOCX reference document and uses Pandoc defaults. That creates a visible mismatch between the documented output and the actual shipped behavior.

### WR-06: Publishing guide recommends `/scr:health` for tool checks it does not perform

**Files:** `docs/publishing.md:19`, `commands/scr/health.md:14-59`
**Issue:** The guide tells users to run `/scr:health` to see which export tools are installed, but the command only checks manuscript files, config/state consistency, git state, and constraint integrity. The recommended diagnostic cannot answer the question the docs send users there to ask.

## Info

### IN-01: README installer-target count is stale

**File:** `README.md:156-178`
**Issue:** The README lists 9 installer targets but later says Scriven ships 10 installer targets. On a trust-focused launch surface, even count drift weakens credibility.

### IN-02: Contributing guide understates the size of the docs surface

**File:** `docs/contributing.md:21`
**Issue:** The file-structure overview says `docs/` contains 9 guides, but the repo currently has 12 top-level docs. That does not break runtime behavior, but it gives contributors an outdated picture of the surface area.

---
_Reviewed: 2026-04-09T09:10:00Z_
_Reviewer: Codex + gsd-code-reviewer_
_Depth: standard_
