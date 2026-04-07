---
phase: 09-generic-platform-support
plan: 01
subsystem: installer
tags: [skill-file, SKILL.md, platform-support, installer, manus, generic]

requires:
  - phase: 08-sacred-translation
    provides: CONSTRAINTS.json with 101 commands including sacred exclusives
provides:
  - type field on all RUNTIMES entries classifying commands vs skills platforms
  - generateSkillManifest() function producing markdown command index from CONSTRAINTS.json
  - Skill-file install path writing SKILL.md + command files to skills subdirectory
  - Generic (SKILL.md) fallback runtime for unknown platforms
  - Manus Desktop using skill-file path instead of command-directory path
affects: [09-02-testing, future-platform-additions]

tech-stack:
  added: []
  patterns: [type-based-routing, skill-file-install-path, manifest-generation]

key-files:
  created: []
  modified: [bin/install.js]

key-decisions:
  - "Sacred subcommands listed as /scr:sacred:name entries alongside top-level commands for discoverability"
  - "Skill-file platforms get SKILL.md manifest + full command/agent files in skills subdirectory"
  - "Generic runtime uses ~/.scriven/skills as default location, never auto-detected"

patterns-established:
  - "Runtime type classification: type 'commands' for directory-based, type 'skills' for manifest-based"
  - "generateSkillManifest reads CONSTRAINTS.json and produces sorted markdown table of all /scr:* commands"

requirements-completed: [PLAT-01, PLAT-02, PLAT-03, PLAT-04, PLAT-05]

duration: 3min
completed: 2026-04-07
---

# Phase 09 Plan 01: Generic Platform Support Summary

**Type-based install routing with SKILL.md manifest generation for Manus and generic AI agent platforms**

## Performance

- **Duration:** 3 min
- **Started:** 2026-04-07T15:53:58Z
- **Completed:** 2026-04-07T15:56:58Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- Added `type` field to all 10 RUNTIMES entries (8 commands, 2 skills) enabling install path routing
- Created `generateSkillManifest()` that reads CONSTRAINTS.json and produces a 109-entry markdown command index
- Refactored Manus to use skill-file path with `skills_dir_global`/`skills_dir_project` instead of commands dirs
- Added Generic (SKILL.md) fallback runtime as last entry for unknown platforms
- Branched install flow: commands path unchanged, skills path writes SKILL.md + copies commands/agents to skills subdir

## Task Commits

Each task was committed atomically:

1. **Task 1: Add type classification, SKILL.md generator, and skill-file install path** - `12e2f0b` (feat)
2. **Task 2: Verify SKILL.md generation produces correct output** - `d5df565` (fix)

## Files Created/Modified
- `bin/install.js` - Added type field to RUNTIMES, generateSkillManifest function, skill-file install branch, generic runtime entry

## Decisions Made
- Sacred subcommands are included as `/scr:sacred:name` entries in the manifest alongside their top-level counterparts for maximum discoverability
- Skill-file platforms receive the full command file tree alongside SKILL.md so agents can read individual command instructions
- Generic runtime defaults to `~/.scriven/skills` and is never auto-detected (user selects manually)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed sacred subcommand deduplication logic**
- **Found during:** Task 2 (verification)
- **Issue:** Sacred subcommands from `commands/scr/sacred/` were being excluded from the manifest because dedup logic filtered them out when a matching top-level command existed in CONSTRAINTS.json
- **Fix:** Removed dedup filter so sacred subcommands always appear as `/scr:sacred:name` entries alongside top-level entries
- **Files modified:** bin/install.js
- **Verification:** Manifest now contains 109 entries including `/scr:sacred:concordance`
- **Committed in:** d5df565 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Bug fix necessary for correct sacred command discovery. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Installer now supports both command-directory and skill-file platforms
- Ready for Plan 02 test suite covering type routing, manifest generation, and generic runtime

## Self-Check: PASSED

- bin/install.js: FOUND
- Commit 12e2f0b: FOUND
- Commit d5df565: FOUND

---
*Phase: 09-generic-platform-support*
*Completed: 2026-04-07*
