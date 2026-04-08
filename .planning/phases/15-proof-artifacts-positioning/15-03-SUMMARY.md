---
phase: 15-proof-artifacts-positioning
plan: "03"
subsystem: docs
tags: [proof, positioning, onboarding, launch, trust]
requires: [15-01, 15-02]
provides:
  - Launch-facing README copy that leads with Scriven's voice-preservation wedge
  - Proof-first onboarding path from README and Getting Started into the canonical proof hub
  - Launch examples framed around evidence before breadth
affects: [launch, onboarding, docs, trust]
tech-stack:
  added: []
  patterns: [proof-first launch copy, wedge-first framing, onboarding-to-proof routing]
key-files:
  created: []
  modified: [README.md, docs/getting-started.md, docs/proof-artifacts.md]
key-decisions:
  - "Lead with the voice-preservation wedge before breadth so skeptical users see the strongest claim first."
  - "Treat docs/proof-artifacts.md as the shortest proof-first route from both launch and onboarding surfaces."
patterns-established:
  - "README and onboarding should route skeptical readers to proof artifacts before expanding into the full feature surface."
  - "Scriven's top-level framing should describe it first as AI-native longform writing software built around voice preservation."
requirements-completed: [PROOF-03]
duration: 4min
completed: 2026-04-08
---

# Phase 15: Proof Artifacts & Positioning Summary

**Launch and onboarding docs reframed around proof and voice preservation**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-08T02:40:00Z
- **Completed:** 2026-04-08T02:44:00Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Reframed `README.md` so Scriven is introduced first as AI-native longform writing software built around voice preservation, with proof surfaced before breadth
- Added a proof-first path in `docs/getting-started.md` for users who want evidence before the full walkthrough
- Tightened `docs/proof-artifacts.md` into the canonical launch-and-onboarding destination for sample-flow and Voice DNA evidence

## Task Commits

Each task was committed atomically:

1. **Task 1: Reframe README around proof and wedge-first positioning** - `d55ce2b` (docs)
2. **Task 2: Add proof-first onboarding routing and proof-hub start path** - `f28f1f8` (docs)

**Plan metadata:** pending with summary commit

## Files Created/Modified

- `README.md` - launch framing now leads with voice preservation and points skeptical readers to proof artifacts early
- `docs/getting-started.md` - onboarding now includes a proof-first route before the deeper walkthrough
- `docs/proof-artifacts.md` - start-here section now supports launch and onboarding entry points

## Decisions Made

- Kept the new top-level positioning focused on one wedge instead of relisting every product area as the first impression
- Routed launch and onboarding copy to the existing proof hub instead of adding a second parallel entry surface

## Deviations from Plan

None.

## Issues Encountered

None.

## User Setup Required

None - docs-only positioning and routing updates.

## Next Phase Readiness

Phase 16 can now add regression coverage against a stable proof-first launch surface.

The next phase can assume:

- `README.md` foregrounds the voice-preservation wedge
- `docs/getting-started.md` includes a proof-first entry path
- `docs/proof-artifacts.md` is the canonical proof landing page

---
*Phase: 15-proof-artifacts-positioning*
*Completed: 2026-04-08*
