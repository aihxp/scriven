# Phase 10: Core Documentation - Context

**Gathered:** 2026-04-07
**Status:** Ready for planning

<domain>
## Phase Boundary

README.md rewrite, Getting Started guide, and complete command reference. A new user can find Scriven, understand it, install it, and look up any command.

</domain>

<decisions>
## Implementation Decisions

- **D-01:** Tone is friendly, practical, example-driven — matches progressive disclosure philosophy. Not academic, not casual.
- **D-02:** Docs live in `docs/` directory as individual .md files — GitHub renders them, easy to link from README
- **D-03:** Command reference: one entry per command with description, usage, flags, example, prerequisites, work-type adaptations. Auto-generate from CONSTRAINTS.json where possible.
- **D-04:** README links to all guides in docs/ — serves as the hub

### Claude's Discretion
- Command reference organization (by category vs alphabetical)
- Getting started guide pacing and which commands to highlight
- README section ordering

</decisions>

<canonical_refs>
## Canonical References

- `data/CONSTRAINTS.json` — All commands, descriptions, categories, prerequisites, adaptations
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §15 — Complete command list with specs
- `README.md` — Current README to enhance
- `commands/scr/*.md` — All command files for accurate documentation

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `data/CONSTRAINTS.json` has descriptions for every command — can auto-generate reference
- Current README.md has good structure but lists Phase 9 runtimes as incomplete
- `commands/scr/*.md` frontmatter has `description` and `argument-hint` fields

</code_context>

<specifics>
## Specific Ideas

- Command reference should be organized by the same categories as CONSTRAINTS.json (core, navigation, quality, etc.)
- Getting Started should use the demo project as a "try before you commit" step

</specifics>

<deferred>
## Deferred Ideas

None.

</deferred>
