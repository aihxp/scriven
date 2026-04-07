# Phase 8: Collaboration, Platform & Sacred - Context

**Gathered:** 2026-04-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Three domains: (1) Collaboration — revision tracks with writer-friendly abstractions, editor-writer workflow, co-writing. (2) Multi-runtime — installer expansion to 5 additional runtimes, writer profile, manager, utility commands. (3) Sacred text — 13 work types fully functional, 10 voice registers, sacred-exclusive commands fully implemented, sacred translation pipeline, tradition-aware front/back matter. 24 requirements total (COLLAB-01..08, RUNTIME-01..07, SACRED-01..09).

</domain>

<decisions>
## Implementation Decisions

### Collaboration
- **D-01:** Revision track names are writer-friendly labels ("Editor's suggestions") mapped to git branches internally — writer never sees branch names
- **D-02:** Track merge shows conflicting passages side-by-side with "keep mine / keep theirs / keep both" in writer-friendly language

### Multi-Runtime & Polish
- **D-03:** Extend `bin/install.js` RUNTIMES object with new entries (Codex, OpenCode, Copilot, Windsurf, Antigravity) — same copyDir pattern
- **D-04:** `/scr:manager` lists all `.manuscript/` projects in subdirectories, shows status, allows switching

### Sacred Text Features
- **D-05:** Sacred voice registers defined in STYLE-GUIDE.md "Sacred Registers" section with 10 register definitions; drafter reads active register from plan file
- **D-06:** Sacred translation extends translator agent with `sacred_mode` section: formal/dynamic equivalence, canonical alignment, liturgical preservation — same agent, additional instructions

### Claude's Discretion
- Git branch naming convention for revision tracks
- Runtime directory detection patterns for new runtimes
- Utility command depth (health, fast, notes, troubleshoot, thread)
- Sacred discuss-phase category details
- Sacred config schema field validation

</decisions>

<canonical_refs>
## Canonical References

- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §10 — Collaboration System
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §15.10 — Collaboration command list
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §15.13 — Utilities command list
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §15.14 — Sacred & Historical command list
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §4 — Tool Support (runtime list)
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §6 — Voice DNA (sacred registers)
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §12 — Discuss Phase sacred categories
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §17 — Configuration Schema (sacred config)
- `data/CONSTRAINTS.json` — Sacred work types, command adaptations, file adaptations
- `agents/drafter.md` — Sacred/historical work type rules (voice registers, doctrinal consistency)
- `agents/translator.md` — Base translator to extend with sacred mode
- `templates/sacred/` — All 6 sacred templates already exist

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `bin/install.js` — RUNTIMES object pattern for adding new runtimes
- `agents/drafter.md` — Already has sacred/historical rules section
- `agents/translator.md` — Base for sacred translation extension
- `templates/sacred/` — FIGURES.md, LINEAGES.md, COSMOLOGY.md, THEOLOGICAL-ARC.md, DOCTRINES.md, FRAMEWORK.md all exist
- `commands/scr/sacred/` — 8 sacred commands already exist as shells from Phase 1
- All writer-mode git commands (save, history, compare, versions, undo) — revision tracks extend these

### Integration Points
- Track commands wrap git branch/merge/diff with writer-friendly abstractions
- Sacred commands already have CONSTRAINTS.json entries with availability and adaptations
- Sacred file adaptations (CHARACTERS→FIGURES, WORLD→COSMOLOGY, etc.) already defined in CONSTRAINTS.json

</code_context>

<specifics>
## Specific Ideas

- The 8 sacred-exclusive commands exist as shells from Phase 1 — Phase 8 gives them full implementation
- Sacred-adapted commands (new-figure, lineage-map, build-cosmology, etc.) auto-route via CONSTRAINTS.json — the routing is already built
- Writer profile system persists voice preferences across sessions and projects
- The `/scr:fast` command is a lightweight inline edit without full planning — useful for quick fixes

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 08-collaboration-platform-sacred*
*Context gathered: 2026-04-07*
