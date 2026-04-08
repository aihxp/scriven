---
phase: 14-runtime-credibility
plan: "01"
subsystem: docs
tags: [runtime, node, installer, docs, trust]
requires: []
provides:
  - Canonical runtime support matrix with evidence, support-level, and verification-status framing
  - Unified Node 20+ installer baseline across package metadata and installer UX
  - Trust inventory, architecture docs, and planning docs aligned to the same runtime policy
affects: [launch, onboarding, installer, planning-docs, trust]
tech-stack:
  added: []
  patterns: [canonical runtime matrix, explicit support-evidence language, Node 20+ installer baseline]
key-files:
  created: [docs/runtime-support.md, .planning/codebase/STACK.md]
  modified: [package.json, bin/install.js, docs/architecture.md, docs/shipped-assets.md, .planning/PROJECT.md, .planning/research/SUMMARY.md, .planning/research/PITFALLS.md, test/phase5-export-publishing.test.js]
key-decisions:
  - "Treat installer-path coverage as different from host-runtime parity, and document that distinction explicitly."
  - "Standardize the installer baseline on Node 20+ in both metadata and user-facing guidance."
patterns-established:
  - "Runtime claims should resolve through docs/runtime-support.md rather than being restated independently in multiple docs."
  - "Trust-critical launch inventories must list new canonical evidence docs as they are introduced."
requirements-completed: [RUNTIME-01, RUNTIME-02]
duration: 6min
completed: 2026-04-08
---

# Phase 14: Runtime Credibility Summary

**Canonical runtime matrix, Node 20+ installer baseline, and trust-document alignment for runtime claims**

## Performance

- **Duration:** 6 min
- **Started:** 2026-04-08T01:39:00Z
- **Completed:** 2026-04-08T01:45:08Z
- **Tasks:** 3
- **Files modified:** 10

## Accomplishments
- Added `docs/runtime-support.md` as the canonical runtime support matrix with explicit evidence, support-level, and verification-status language
- Aligned `package.json` and `bin/install.js` on a `Node 20+` / `>=20.0.0` installer baseline, including an early installer guard
- Wired runtime credibility into `docs/shipped-assets.md`, `docs/architecture.md`, and active planning docs so the old Node 18 baseline no longer survives as live guidance

## Task Commits

Each task was committed atomically:

1. **Task 1: Create the canonical runtime policy and compatibility matrix** - `6f9867b` (docs)
2. **Task 2: Align package metadata and installer guidance to the chosen Node baseline** - `d88b2f2` (docs)
3. **Task 3: Align architecture, trust inventory, and planning docs to the canonical runtime policy** - `b5c9f71` (docs)

**Plan metadata:** pending with summary commit

## Files Created/Modified
- `docs/runtime-support.md` - canonical runtime matrix and support-confidence reference
- `package.json` - minimum Node engine raised to `>=20.0.0`
- `bin/install.js` - early Node version guard and credibility-aware installer copy
- `docs/architecture.md` - installer mechanics now defer policy and confidence to the runtime matrix
- `docs/shipped-assets.md` - trust-critical launch inventory now lists `docs/runtime-support.md`
- `.planning/PROJECT.md` - active milestone language now references the Node 20+ baseline explicitly
- `.planning/codebase/STACK.md` - planning stack summary now matches the Node 20+ installer baseline
- `.planning/research/SUMMARY.md` - research summary now reflects the adopted runtime baseline
- `.planning/research/PITFALLS.md` - npx/install pitfall guidance now targets Node 20 and 22
- `test/phase5-export-publishing.test.js` - stale DOCX-reference-doc assertions updated to match shipped Phase 13 behavior

## Decisions Made

- Chose `docs/runtime-support.md` as the single runtime-confidence source of truth instead of spreading support-level language across README, architecture, and planning docs
- Kept runtime support wording conservative by distinguishing installer targets from verified host-runtime parity

## Deviations from Plan

### Auto-fixed Issues

**1. [Blocking] Updated stale export assertions to preserve green verification**
- **Found during:** Task 3 (Align architecture, trust inventory, and planning docs to the canonical runtime policy)
- **Issue:** `npm test` failed because `test/phase5-export-publishing.test.js` still expected bundled DOCX reference docs that Phase 13 had intentionally removed from the shipped surface
- **Fix:** Updated the Phase 5 export tests to assert current shipped behavior: Pandoc default DOCX output plus optional user-supplied reference docs
- **Files modified:** `test/phase5-export-publishing.test.js`
- **Verification:** `npm test` passed after the assertion update
- **Committed in:** `b5c9f71` (part of Task 3 commit)

---

**Total deviations:** 1 auto-fixed (stale verification expectation)
**Impact on plan:** Necessary to satisfy the plan's required `npm test` gate without changing Phase 14 scope.

## Issues Encountered

- A historical research-summary note still contained the phrase `Node 18`, which caused the plan's strict stale-baseline grep to fail. The note was rewritten to describe the adopted Node 20+ baseline without preserving the obsolete string.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

`14-02` can now propagate runtime credibility language through README, getting-started, `AGENTS.md`, and `CLAUDE.md` against a concrete source of truth instead of inferred installer behavior.

The next plan can assume:
- `docs/runtime-support.md` is the canonical matrix
- `docs/shipped-assets.md` already inventories it as trust-critical
- the installer and package metadata already agree on Node 20+

---
*Phase: 14-runtime-credibility*
*Completed: 2026-04-08*
