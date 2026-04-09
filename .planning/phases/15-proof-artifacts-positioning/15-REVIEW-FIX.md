---
phase: 15-proof-artifacts-positioning
fixed_at: 2026-04-09T09:07:58Z
review_path: .planning/phases/15-proof-artifacts-positioning/15-REVIEW.md
iteration: 1
scope: warning
findings_in_scope: 4
fixed: 4
deferred: 0
status: all_fixed
---
# Phase 15: Review Fix Summary

**Scope:** Warning findings only
**Source review:** `.planning/phases/15-proof-artifacts-positioning/15-REVIEW.md`

## Fixed Warnings

### WR-01: Voice DNA guide points new users to a command that does not create the voice profile

Fixed in `docs/voice-dna.md`. The setup flow now points new users to `/scr:profile-writer` for both questionnaire and sample-analysis paths, and explicitly places `/scr:discuss` later in the workflow.

### WR-02: Voice DNA guide’s section numbering no longer matches the template

Fixed in `docs/voice-dna.md`. The guide now labels Reference Influences as Part 7 and keeps Sacred Voice Registers tied to Part 8, matching `templates/STYLE-GUIDE.md`.

### WR-03: Getting Started routes users straight to drafting before a real voice profile exists

Fixed in `docs/getting-started.md`. The onboarding flow now inserts a dedicated voice-calibration step with `/scr:profile-writer` followed by `/scr:voice-test` before `/scr:discuss` and `/scr:draft`.

### WR-04: README hard-codes a passing test count that is currently false

Resolved in the current workspace. `README.md` still says `925 tests pass`, and `npm test --silent` now returns `925` passing tests with `0` failures after the fixes in `test/package.test.js`, so the reviewed mismatch is no longer present.

## Deferred Warnings

None.

## Verification

- `npm test --silent` was run in the current workspace and completed with `925` passing tests and `0` failures.
- Relevant coverage in that run includes `test/package.test.js`, plus the trust-regression assertions that read `README.md` and `docs/getting-started.md`.
- Manual review confirmed the onboarding and Voice DNA docs now route profile creation and calibration in the intended order.

## Follow-up Note

- The reviewed warning is fixed because the count now matches, but the README still uses a hard-coded test total and can drift again if the suite size changes.

---
_Fixed at: 2026-04-09T09:07:58Z_
