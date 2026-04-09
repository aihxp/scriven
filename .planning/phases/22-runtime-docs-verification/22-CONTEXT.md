# Phase 22: Runtime Docs & Verification - Context

**Gathered:** 2026-04-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Public runtime docs, onboarding, architecture notes, and regression coverage must describe the same Codex and Claude install surfaces the installer actually writes. This phase covers doc alignment and automated verification, not new installer behavior.

</domain>

<decisions>
## Implementation Decisions

- **D-01:** `docs/runtime-support.md` remains the canonical runtime matrix and verification-status document.
- **D-02:** README and onboarding copy should show Codex through `$scr-*` skills and Claude Code through `/scr:*` commands.
- **D-03:** Runtime claims stay narrow: installer targets and registry evidence do not imply host-runtime parity.
- **D-04:** Existing trust suites from prior milestones can be reused as verification inputs when they already enforce the correct runtime framing.

</decisions>

<code_context>
## Existing Code Insights

- README, Getting Started, Runtime Support, and Architecture already contain the runtime-surface wording that users will see first.
- `test/installer.test.js` protects installer-registry and Codex-wrapper behavior directly.
- `test/phase14-runtime-credibility.test.js` and `test/phase16-trust-regression.test.js` already enforce parts of the runtime-doc truth surface.

</code_context>

<specifics>
## Specific Ideas

- Keep Codex and Claude examples concrete rather than implying all runtimes share the same surface.
- Prefer one truthful quick-start sentence over broad parity language.
- Use existing trust tests where possible instead of inventing a separate doc-only suite.

</specifics>

<deferred>
## Deferred Ideas

- Runtime-specific smoke tests inside every host environment
- Broader runtime documentation beyond the installer-supported surface

</deferred>

---

*Phase: 22-runtime-docs-verification*
*Context gathered: 2026-04-09*
