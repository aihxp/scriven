---
phase: 14-runtime-credibility
plan: "02"
subsystem: docs
tags: [runtime, onboarding, launch, docs, trust]
requires: [14-01]
provides:
  - Launch and onboarding docs that point readers to the canonical runtime matrix
  - Root instruction docs locked to the Node 20+ installer baseline and runtime-evidence language
  - First-read wording that distinguishes installer targets from stronger host-runtime verification claims
affects: [launch, onboarding, planning-docs, trust]
tech-stack:
  added: []
  patterns: [matrix-linked launch copy, installer-target framing, mirrored root policy docs]
key-files:
  created: []
  modified: [README.md, docs/getting-started.md, AGENTS.md, CLAUDE.md]
key-decisions:
  - "Launch-facing docs should summarize runtime confidence, then defer detail to docs/runtime-support.md."
  - "Installer-target coverage must be described conservatively so it is not mistaken for host-runtime parity."
patterns-established:
  - "README and onboarding copy should use installer-target language and link to the canonical runtime matrix."
  - "AGENTS.md and CLAUDE.md should mirror the same runtime baseline and trust language to prevent future drift."
requirements-completed: [RUNTIME-03]
duration: 3min
completed: 2026-04-08
---

# Phase 14: Runtime Credibility Summary

**Launch-facing runtime framing propagated into README, onboarding, and root instruction docs**

## Performance

- **Duration:** 3 min
- **Started:** 2026-04-08T01:46:21Z
- **Completed:** 2026-04-08T01:48:00Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments

- Updated `README.md` so launch-facing runtime claims use installer-target language, surface the Node 20+ baseline, and link directly to `docs/runtime-support.md`
- Revised `docs/getting-started.md` to keep onboarding simple while pointing readers to the runtime matrix for install type, support level, and verification status
- Aligned `AGENTS.md` and `CLAUDE.md` to the same Node 20+ installer baseline and runtime-credibility policy so future planning inherits the same trust posture

## Task Commits

Each task was committed atomically:

1. **Task 1: Align README runtime claims to the canonical matrix** - `3c63d7d` (docs)
2. **Task 2: Rewrite onboarding language around runtime evidence instead of blanket support** - `2d287c8` (docs)
3. **Task 3: Lock future planning docs to the same runtime credibility language** - `963950b` (docs)

**Plan metadata:** pending with summary commit

## Files Created/Modified

- `README.md` - runtime overview now links to the canonical matrix and frames listed environments as installer targets
- `docs/getting-started.md` - onboarding now references installer targets and the runtime matrix without over-claiming uniform support
- `AGENTS.md` - root planning instructions now state the Node 20+ baseline as policy and point to the canonical matrix
- `CLAUDE.md` - mirrored root instructions now match the same runtime baseline and trust language

## Decisions Made

- Kept launch-facing runtime copy short and honest by treating `docs/runtime-support.md` as the detail layer
- Preserved `Claude Code` as the primary reference runtime only with explicit conservative wording around parity

## Deviations from Plan

None.

## Issues Encountered

None.

## User Setup Required

None - documentation-only propagation.

## Next Phase Readiness

Phase 15 can now build proof artifacts and positioning on top of a stable runtime-trust surface:

- launch docs already point to explicit runtime evidence
- root planning docs preserve the adopted runtime policy
- readers can distinguish installer targets from stronger verification claims before engaging deeper

---
*Phase: 14-runtime-credibility*
*Completed: 2026-04-08*
