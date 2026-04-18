# Phase 38: Documentation & Regression Guardrails - Context

**Gathered:** 2026-04-17
**Status:** Completed

<domain>
## Phase Boundary

Sweep the docs to the canonical command contract and add regression coverage so command-surface drift fails in CI instead of in user workflows.

</domain>

<decisions>
## Implementation Decisions

### Documentation contract
- Sacred-exclusive commands use `/scr:sacred:*` in source docs.
- Adapted names appear as labels, not runnable `/scr:*` aliases.

### Regression coverage
- Test nested sacred command structure recursively.
- Add source-doc scans for invalid sacred and adapted command references.

</decisions>
