---
phase: 11-feature-domain-guides
plan: 02
subsystem: docs
tags: [publishing, translation, export, pandoc, typst, deepl, epub, kdp, ingram]

# Dependency graph
requires:
  - phase: 10-core-documentation
    provides: "Command reference and getting-started guide for cross-linking"
provides:
  - "Publishing pipeline guide covering 13 export formats and platform packages"
  - "Translation guide covering full pipeline, glossary, memory, RTL/CJK"
affects: [12-developer-docs-verification]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Feature guide structure: intro, concepts, commands, workflows, see-also"]

key-files:
  created:
    - docs/publishing.md
    - docs/translation.md
  modified: []

key-decisions:
  - "Organized publishing formats into logical groups (core, ebook, screenplay, academic) rather than listing all 13 flat"
  - "Included sacred text translation as a separate section rather than weaving it throughout"

patterns-established:
  - "Feature guides follow: overview -> prerequisites/engines -> step-by-step workflow -> advanced features -> automation -> see-also"

requirements-completed: [DOC-06, DOC-08]

# Metrics
duration: 3min
completed: 2026-04-07
---

# Phase 11 Plan 02: Publishing & Translation Guides Summary

**Publishing pipeline guide covering 13 export formats with KDP/IngramSpark/submission packages, and translation guide covering the full pipeline from glossary through back-translation with RTL/CJK support**

## Performance

- **Duration:** 3 min
- **Started:** 2026-04-07T20:05:36Z
- **Completed:** 2026-04-07T20:09:14Z
- **Tasks:** 2
- **Files created:** 2

## Accomplishments
- Publishing guide covers all 13 export formats organized into logical groups with exact command syntax from export.md
- Translation guide covers the complete 7-command translation pipeline from glossary setup through back-translation verification
- Both guides cross-link to command-reference.md, getting-started.md, and each other
- Both match the friendly, direct tone established in Phase 10 docs

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Publishing Pipeline Guide** - `dd7ee70` (feat)
2. **Task 2: Create Translation Guide** - `96befd1` (feat)

## Files Created/Modified
- `docs/publishing.md` - Publishing pipeline guide: 13 formats, KDP/IngramSpark/submission packages, publish wizard presets, autopilot, template customization
- `docs/translation.md` - Translation guide: 3 engines, glossary management, translation memory, cultural adaptation, back-translation, RTL/CJK, multi-publish, autopilot, sacred text

## Decisions Made
- Organized publishing formats into logical groups (core, ebook, screenplay, academic) rather than a flat list of 13 -- improves scannability
- Included sacred text translation as a separate section at the end rather than weaving through the guide -- keeps the common path simple while honoring the feature
- Referenced `/scr:publish` (actual command name) instead of `/scr:publish-wizard` since the command file is `publish.md` not `publish-wizard.md`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected publish-wizard command reference**
- **Found during:** Task 1 (Publishing Guide)
- **Issue:** Plan referenced `/scr:publish-wizard` but the actual command file is `commands/scr/publish.md` with command name `/scr:publish`
- **Fix:** Used `/scr:publish` throughout the guide, matching the actual command
- **Files modified:** docs/publishing.md
- **Committed in:** dd7ee70 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Command name corrected to match codebase. No scope creep.

## Issues Encountered
None

## User Setup Required
None - documentation-only plan.

## Next Phase Readiness
- Both feature guides complete and cross-linked
- Ready for Phase 11 Plan 03 (if exists) or Phase 12 developer docs and verification

---
*Phase: 11-feature-domain-guides*
*Completed: 2026-04-07*

## Self-Check: PASSED
