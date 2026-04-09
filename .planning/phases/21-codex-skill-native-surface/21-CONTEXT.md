# Phase 21: Codex Skill-Native Surface - Context

**Gathered:** 2026-04-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Codex should expose Scriven through native `$scr-*` skills while still treating the installed command markdown under `.codex/commands/scr/` as the execution source of truth. This phase covers skill naming, wrapper generation, and Codex-facing command-surface translation. It does not redefine the broader silent-install contract or user-facing docs.

</domain>

<decisions>
## Implementation Decisions

- **D-01:** Generate one Codex skill per Scriven command using a stable `scr-*` naming convention.
- **D-02:** Keep mirrored command markdown under `.codex/commands/scr/` so generated skills point at installed files instead of duplicating command logic.
- **D-03:** Translate Codex-facing references from `/scr:*` to `$scr-*` inside generated wrapper text.
- **D-04:** Preserve command and agent mirror paths alongside the new skill surface for compatibility and clean reinstall behavior.

</decisions>

<code_context>
## Existing Code Insights

- `bin/install.js` already owns runtime classification, file generation, and Codex-specific helper generation.
- `test/installer.test.js` already exercises runtime typing and can protect the Codex wrapper contract.
- The `commands/scr/` tree remains the behavior source of truth for all runtimes.

</code_context>

<specifics>
## Specific Ideas

- Codex users should discover Scriven through `$scr-help`, `$scr-new-work`, and the rest of the generated `$scr-*` surface.
- Wrapper generation should be derived from command metadata and installed file paths, not hand-maintained per command.
- Codex should be treated as skill-native without pretending it is a slash-command runtime.

</specifics>

<deferred>
## Deferred Ideas

- Host-runtime parity smoke tests inside live Codex sessions
- Any broader help-text rewrite inside the source command markdown itself

</deferred>

---

*Phase: 21-codex-skill-native-surface*
*Context gathered: 2026-04-09*
