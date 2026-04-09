---
phase: 17-perplexity-runtime-support
plan: "02"
subsystem: docs
tags: [runtime, docs, troubleshooting, trust, perplexity]
requires: ["17-01"]
provides:
  - Launch and onboarding docs that distinguish Perplexity Desktop from full slash-command runtimes
  - Troubleshooting guidance for Perplexity Desktop setup failures
  - Trust-regression coverage aligned to the new runtime type and current proof-doc linking style
affects: [launch, onboarding, runtime, tests, troubleshooting]
tech-stack:
  added: []
  patterns: [guided-target launch framing, conservative runtime wording, flexible trust-doc path assertions]
key-files:
  created: []
  modified: [README.md, docs/getting-started.md, commands/scr/troubleshoot.md, test/phase14-runtime-credibility.test.js, test/phase16-trust-regression.test.js]
key-decisions:
  - "Describe Perplexity Desktop as a guided local-MCP target in writer-facing docs instead of implying slash-command parity."
  - "Keep onboarding truthful by distinguishing file-copy runtimes from guided setup runtimes."
patterns-established:
  - "Trust-regression tests should validate the canonical doc path regardless of whether the markdown uses inline code or relative links."
requirements-completed: [RUNTIME-07]
duration: 12min
completed: 2026-04-09
---

# Phase 17 Plan 02 Summary

**Launch and troubleshooting surfaces now explain the Perplexity boundary clearly**

## Accomplishments

- Updated `README.md` so the installer-target list includes Perplexity Desktop with explicit guided local-MCP framing
- Updated `docs/getting-started.md` so guided targets are described honestly instead of being treated as slash-command installs
- Added a Perplexity-specific failure mode to `commands/scr/troubleshoot.md`
- Extended phase 14 and phase 16 trust tests so the new runtime type and current proof-doc link style are covered without overclaiming

## Files Created/Modified

- `README.md` - adds Perplexity Desktop to installer targets and updates support wording and counts
- `docs/getting-started.md` - distinguishes command/skills installs from guided targets
- `commands/scr/troubleshoot.md` - adds Perplexity Desktop setup diagnostics
- `test/phase14-runtime-credibility.test.js` - protects launch-facing runtime framing
- `test/phase16-trust-regression.test.js` - protects the expanded runtime row and current proof-doc path style

## Decisions Made

- Kept the launch surface conservative: Perplexity Desktop is named, but broader Perplexity support is still not implied
- Treated troubleshooting and onboarding as trust-critical surfaces, not optional documentation
- Preserved the existing proof-artifact doc style by making the regression test validate canonical references rather than one markdown formatting choice

## Deviations from Plan

None.

## Issues Encountered

- Existing trust-regression assertions assumed one markdown style for proof-artifact references; the test was updated to validate the canonical paths regardless of whether docs use inline-code paths or relative links

## User Setup Required

Perplexity Desktop users still need to open the generated guide and paste the connector command into the Perplexity Desktop Connectors UI.

---
*Phase: 17-perplexity-runtime-support*
*Completed: 2026-04-09*
