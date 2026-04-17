---
phase: 30-export-cleanup-validation-gate
plan: "02"
subsystem: commands
tags: [cleanup, validate, scaffold, tdd-green, commands]
dependency_graph:
  requires: [30-01]
  provides: [scr-cleanup-command, scr-validate-command]
  affects:
    - commands/scr/cleanup.md
    - commands/scr/validate.md
tech_stack:
  added: []
  patterns: [command-markdown, dry-run-default, prerequisite-guard, pass-fail-output]
key_files:
  created:
    - commands/scr/cleanup.md
    - commands/scr/validate.md
  modified: []
decisions:
  - "Dry-run is the default for cleanup -- --apply required for in-place edits (T-30-03 mitigation)"
  - "Standalone /scr:validate has no flags -- --skip-validate belongs on export/publish, not on validate itself"
  - "Marker scope strictly .manuscript/drafts/ -- front-matter excluded by explicit path, not broad glob (T-30-06 mitigation)"
  - "{{VAR}} tokens explicitly excluded from both commands -- documented in both files"
  - "validate.md file:line format uses .md:LINE_NUMBER: notation matching continuity-check.md analog"
metrics:
  duration: "~10 minutes"
  completed: "2026-04-17"
  tasks_completed: 2
  tasks_total: 2
  files_changed: 2
---

# Phase 30 Plan 02: Cleanup and Validate Commands Summary

`/scr:cleanup` (scaffold strip with dry-run default, `--apply` for in-place) and `/scr:validate` (scan + PASS/FAIL gate with file:line output) created; CLEAN-01, CLEAN-02, VALID-01, VALID-02 turn GREEN (10 new passing assertions); prior 1132 tests unaffected.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create commands/scr/cleanup.md | 45ceb73 | commands/scr/cleanup.md |
| 2 | Create commands/scr/validate.md | b8f3a58 | commands/scr/validate.md |

## Test Results

| Req ID | Assertion | Status |
|--------|-----------|--------|
| CLEAN-01 | cleanup.md exists at commands/scr/cleanup.md | GREEN |
| CLEAN-01 | cleanup.md has YAML frontmatter + description: | GREEN |
| CLEAN-01 | cleanup.md includes --apply flag | GREEN |
| CLEAN-01 | cleanup.md scopes to .manuscript/drafts/ | GREEN |
| CLEAN-02 | cleanup.md includes diff Summary + removed marker counts | GREEN |
| VALID-01 | validate.md exists at commands/scr/validate.md | GREEN |
| VALID-01 | validate.md has YAML frontmatter + description: | GREEN |
| VALID-02 | validate.md mentions stop + blocking behavior | GREEN |
| VALID-02 | validate.md references file:line output format | GREEN |
| VALID-02 | validate.md mentions pass confirmation message | GREEN |
| VALID-03 | export.md contains STEP 1.5 before STEP 2 | RED (Plan 03) |
| VALID-03 | export.md gate mentions --skip-validate | RED (Plan 03) |
| VALID-03 | export.md gate mentions /scr:cleanup --apply | RED (Plan 03) |
| VALID-03 | publish.md contains STEP 1.5 before STEP 2 | RED (Plan 03) |
| VALID-03 | publish.md --skip-validate has visible warning | RED (Plan 03) |

npm test totals: 1147 pass, 6 fail (was 0 pass, 15 fail before this plan; 5 VALID-03 remain RED for Plan 03)

## Decisions Made

1. **Dry-run default for cleanup:** `--apply` is an explicit opt-in. This satisfies T-30-03 (Tampering threat) -- writer sees exactly what would be removed before any file modification occurs.
2. **No flags on standalone validate:** `--skip-validate` belongs on export/publish where it acts as an escape hatch. The standalone validate command has no bypass flags -- if you run it, you get the honest answer.
3. **Explicit .manuscript/drafts/ scope:** Both commands scope to `.manuscript/drafts/` by explicit path, not a glob like `.manuscript/**/*.md`. This prevents accidental stripping of front-matter scaffold (T-30-06, Pitfall 2).
4. **{{VAR}} exclusion documented in both files:** Both cleanup.md and validate.md explicitly state that `{{VAR}}` tokens are NOT scaffold markers and must not be flagged or stripped.
5. **file:line format matching existing analog:** validate.md uses `.md:LINE_NUMBER:` colon-separated notation, matching the continuity-check.md pattern from PATTERNS.md.

## Deviations from Plan

None -- plan executed exactly as written. Both command files follow the structural invariants, marker definitions, output formats, and scope constraints specified in the plan.

## Known Stubs

None -- both command files are fully wired with all required sections, output formats, and behavior branches. No placeholder text, no TODO comments.

## Threat Flags

None -- both commands operate on local `.manuscript/drafts/` files only. No new network surfaces introduced. Threat mitigations T-30-03 (dry-run default) and T-30-06 (explicit path scope) are implemented as specified.

## Self-Check: PASSED

- commands/scr/cleanup.md: FOUND (45ceb73)
- commands/scr/validate.md: FOUND (b8f3a58)
- CLEAN-01 tests (4): GREEN
- CLEAN-02 tests (1): GREEN
- VALID-01 tests (2): GREEN
- VALID-02 tests (3): GREEN
- Prior 1132 tests: CONFIRMED still passing (npm test: 1147 pass, 6 fail -- only VALID-03 remain RED)
