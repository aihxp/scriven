# Phase 11: Feature & Domain Guides - Context

**Gathered:** 2026-04-07
**Status:** Ready for planning

<domain>
## Phase Boundary

5 feature guides: work types, Voice DNA, publishing pipeline, sacred text, and translation. Each covers concepts, workflows, and configuration for its domain.

</domain>

<decisions>
## Implementation Decisions

- **D-01:** Same tone as Phase 10 — friendly, practical, example-driven
- **D-02:** Each guide is a standalone doc in `docs/` — can be read independently
- **D-03:** Guides link back to README and command reference where relevant
- **D-04:** Work type guide should include a complete table of all 50+ work types with their hierarchy and command adaptations

### Claude's Discretion
- Guide depth per domain (proportional to feature complexity)
- Example work type to use in each guide's walkthrough
- Whether to split sacred and translation into sub-guides

</decisions>

<canonical_refs>
## Canonical References

- `data/CONSTRAINTS.json` — Work types, hierarchies, command adaptations, file adaptations
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §2 (adaptive naming), §6 (voice DNA), §7 (front/back matter), §8 (illustration), §9 (translation), §11 (export)
- `agents/drafter.md` — Sacred voice registers section
- `agents/translator.md` — Translation pipeline details
- `templates/STYLE-GUIDE.md` — Voice DNA dimensions

</canonical_refs>

<code_context>
## Existing Code Insights

- CONSTRAINTS.json `work_types` object has all 50+ types with labels, groups, hierarchies
- CONSTRAINTS.json `file_adaptations` shows how context files rename per group
- Product plan section 2 has the complete work type table

</code_context>

<specifics>
## Specific Ideas

None beyond requirements.

</specifics>

<deferred>
## Deferred Ideas

None.

</deferred>
