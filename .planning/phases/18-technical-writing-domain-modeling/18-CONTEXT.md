# Phase 18: Technical Writing Domain Modeling - Context

**Gathered:** 2026-04-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 18 adds a first-pass **technical-writing family** to Scriven. The goal is not to turn Scriven into a docs-site generator or an enterprise documentation suite. The goal is to let a writer start a technical guide, runbook, API reference, or design spec and immediately get vocabulary, files, review names, and command availability that feel native to that job.

</domain>

<decisions>
## Implementation Decisions

### Taxonomy
- **D-01:** Create a dedicated `technical` work-type group instead of hiding technical docs inside `academic` or `prose`.
- **D-02:** Start with four work types only: `technical_guide`, `runbook`, `api_reference`, and `design_spec`.

### Scaffolding
- **D-03:** Technical-writing projects need their own file adaptations for audience, system, procedures, dependencies, and references.
- **D-04:** `/scr:new-work` should present technical writing as a first-class onboarding choice and explain the technical template set explicitly.

### Command behavior
- **D-05:** Keep the core workflow (`discuss`, `plan`, `draft`, `editor-review`) and the structure workflow (`outline`, unit management, `track`) available.
- **D-06:** Hide publishing-marketplace outputs and fiction-specific tools rather than pretending they fit technical docs.
- **D-07:** Prefer adapted names where the old metaphor is actively misleading (`map-system`, `procedure-map`, `technical-review`, `usability-review`, `consistency-check`).

### Trust
- **D-08:** Keep technical-writing support narrow and research-backed. Do not claim docs-site publishing, portal generation, or a broad business-doc catalog in this phase.

</decisions>

<canonical_refs>
## Canonical References

- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `.planning/research/v1.4-perplexity-technical-writing/SUMMARY.md`
- `.planning/research/v1.4-perplexity-technical-writing/FEATURES.md`
- `.planning/research/v1.4-perplexity-technical-writing/PITFALLS.md`
- `data/CONSTRAINTS.json`
- `commands/scr/new-work.md`
- `docs/work-types.md`

</canonical_refs>

<code_context>
## Existing Code Insights

- `data/CONSTRAINTS.json` already has a strong adaptation model for academic and sacred work. Technical writing should reuse that pattern rather than inventing a parallel system.
- `/scr:new-work` is the critical experience surface because that is where file scaffolding and default vocabulary are established.
- Most core review commands are already available to all work types; the technical gap is mostly naming, file adaptations, and export gating.

</code_context>

<deferred>
## Deferred Ideas

- docs-site or portal publishing
- release notes / knowledge-base / compliance pack expansion
- a larger technical-doc catalog beyond the first four work types

</deferred>
