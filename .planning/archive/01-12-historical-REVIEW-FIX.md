---
phase: historical-01-12
fixed_at: 2026-04-09T09:20:02Z
review_path: historical phases 1-12 sweep
iteration: 1
scope: listed historical findings
findings_in_scope: 4
fixed: 4
deferred: 0
status: all_fixed
---
# Historical Phases 1-12: Review Fix Summary

## Scope

This artifact records a historical phases 1-12 review-fix pass. It is not a normal phase-directory `REVIEW-FIX.md` file and does not correspond to a single local phase folder.

## Fixed Findings

### Installed commands depending on repo-local `CONSTRAINTS.json` paths

Addressed in the historical fix pass. Installed commands now avoid assuming repo-local `CONSTRAINTS.json` paths when run from an installed command context.

### `draft.md` hardcoded to a Claude agent path

Addressed in the historical fix pass. The draft flow no longer depends on a Claude-specific agent path assumption and is documented as a portable command-path fix.

### `publish` / `autopilot-publish` still checking pre-phase-13 marketing outputs

Addressed in the historical fix pass. The publish flows now track the current marketing output expectations instead of the retired pre-phase-13 outputs.

### `multi-publish` using the retired `about-the-author` slug

Addressed in the historical fix pass. The multi-publish flow now references the current back-matter slug instead of the retired `about-the-author` variant.

## Deferred Findings

None in this historical artifact.

## Verification

- `node --test test/phase5-export-publishing.test.js test/phase7-translation-localization.test.js test/phase8-collaboration-platform-sacred.test.js` passed in the current workspace.
- `npm test --silent` passed in the current workspace with `930` passing tests and `0` failures.
- The targeted coverage above exercises the publish/autopilot-publish marketing-output checks, the multi-publish back-matter slug, and the runtime/install-path regressions for command portability.

---
_Fixed at: 2026-04-09T09:20:02Z_
