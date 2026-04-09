---
phase: 17-perplexity-runtime-support
plan: "01"
subsystem: installer
tags: [runtime, installer, perplexity, mcp, trust]
requires: []
provides:
  - Perplexity Desktop installer target with a guided local-MCP setup model
  - Runtime-registry support for a third install type beyond commands and skills
  - Installer and runtime-matrix coverage for the new Perplexity Desktop target
affects: [installer, runtime, docs, tests]
tech-stack:
  added: []
  patterns: [guided runtime target, filesystem MCP recipe generation, runtime-matrix-to-installer alignment]
key-files:
  created: []
  modified: [bin/install.js, docs/runtime-support.md, docs/architecture.md, test/installer.test.js]
key-decisions:
  - "Model Perplexity Desktop as a guided-mcp target instead of pretending it is a command-directory or SKILL.md runtime."
  - "Generate setup assets and filesystem MCP connector recipes directly from the installer so the documented path matches what users actually receive."
patterns-established:
  - "Installer targets may use guided setup assets when the host runtime exposes a documented integration surface but not a writable slash-command registry."
requirements-completed: [RUNTIME-05, RUNTIME-06]
duration: 18min
completed: 2026-04-09
---

# Phase 17 Plan 01 Summary

**Perplexity Desktop now exists as a truthful installer target**

## Accomplishments

- Added `perplexity-desktop` to the installer registry as a `guided-mcp` runtime with app detection and dedicated guide paths
- Added setup-guide generation and filesystem MCP command recipes so Perplexity Desktop gets a real guided install flow instead of fake command copying
- Extended `docs/runtime-support.md` and `docs/architecture.md` so the runtime matrix and installer architecture both explain the new install type
- Extended `test/installer.test.js` so the new runtime type, registry shape, and generated setup guide are protected by automated tests

## Files Created/Modified

- `bin/install.js` - adds guided-mcp runtime support, setup guide generation, and Perplexity Desktop next steps
- `docs/runtime-support.md` - adds the Perplexity Desktop matrix row plus the guided setup/support terminology
- `docs/architecture.md` - documents the third installer strategy and the Perplexity detection/setup model
- `test/installer.test.js` - validates the new runtime type and generated MCP setup guidance

## Decisions Made

- Kept Perplexity Desktop scoped to a guided local-MCP target on macOS
- Preserved the trust rule that installer target evidence is not the same thing as host-runtime parity
- Reused the existing runtime matrix as the canonical policy surface rather than introducing a Perplexity-only support doc

## Deviations from Plan

- Updated `docs/architecture.md` in addition to the planned installer and runtime-matrix files so the new runtime could honestly claim `repo-documented` evidence in the canonical matrix

## Issues Encountered

None.

## User Setup Required

Users choosing Perplexity Desktop still need to finish the in-app connector setup inside Perplexity Desktop on macOS using the generated `SETUP.md` guide and connector command files.

---
*Phase: 17-perplexity-runtime-support*
*Completed: 2026-04-09*
