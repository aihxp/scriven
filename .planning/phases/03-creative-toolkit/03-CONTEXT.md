# Phase 3: Creative Toolkit - Context

**Gathered:** 2026-04-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Create structured tools for building and visualizing characters, worlds, and narrative architecture. This is the creative data layer — downstream phases (quality review, illustration, translation) depend on the character profiles, world rules, and structural outlines produced here. 14 requirements covering character management (8), world-building (1), and narrative structure tools (6, including plot graph, timeline, themes, subplots, outline management, and structure operations).

</domain>

<decisions>
## Implementation Decisions

### Character Tools
- **D-01:** Character voice anchors include 5-8 concrete attributes per character: speech patterns, vocabulary register, sentence length, verbal tics, internal monologue style — matches STYLE-GUIDE.md dimension granularity
- **D-02:** Relationship-map renders as ASCII graph with labeled edges (e.g., "Elias --[father]--> Petra") — works in any terminal
- **D-03:** Character-arc cross-references PLOT-GRAPH.md so character arcs align with story beats

### World-Building
- **D-04:** WORLD.md structured in 5 sections: Geography, Culture, Technology/Magic, Rules/Laws, History — covers all genres
- **D-05:** build-world is progressive: ask 3-5 seed questions, generate initial WORLD.md, then refine incrementally via `--area` flag

### Structure Management
- **D-06:** plot-graph `--type` flag selects arc template; default detects from OUTLINE.md length/structure (three-act for short, hero's journey for epic, kishotenketsu for literary)
- **D-07:** add/split/merge/reorder units warn if drafted content is affected, require confirmation, auto-update STATE.md and OUTLINE.md — never silently move or delete drafted prose
- **D-08:** theme-tracker auto-detects themes from drafted prose and suggests additions to THEMES.md, but never auto-adds without writer approval

### Claude's Discretion
- Arc type detection heuristics from OUTLINE.md
- ASCII graph layout algorithm for relationship-map
- Specific seed questions for build-world progressive flow
- How subplot-map handles intersection visualization

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product Plan
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §15.2 — Character & World command list
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §15.3 — Narrative Structure command list
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §15.12 — Structure Management commands (add/insert/remove/split/merge/reorder)

### Runtime Artifacts
- `data/CONSTRAINTS.json` — Command availability, adapted names (new-figure for sacred, new-concept for academic), prerequisites
- `commands/scr/new-character.md` — Existing new-character command (already built in Phase 1 MVP)
- `commands/scr/plot-graph.md` — Existing plot-graph command (already built)
- `templates/CHARACTERS.md` — Character profile template
- `templates/THEMES.md` — Themes template

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `commands/scr/new-character.md`: Already built — creates character profile with voice anchors. Phase 3 extends with character-sheet, character-arc, character-voice-sample, relationship-map, cast-list
- `commands/scr/plot-graph.md`: Already built — basic plot graph. Phase 3 enhances with multiple arc types
- `templates/CHARACTERS.md`: Template ready for populating
- `templates/THEMES.md`: Template ready for populating

### Established Patterns
- Commands follow markdown skill file pattern with YAML frontmatter
- Commands read CONSTRAINTS.json for work-type adaptation (new-character → new-figure for sacred)
- Writer mode / developer mode output switching via config.json `developer_mode` flag

### Integration Points
- Character tools create/read CHARACTERS.md (or FIGURES.md for sacred)
- World-building creates WORLD.md (or COSMOLOGY.md for sacred)
- Structure tools read/write OUTLINE.md, PLOT-GRAPH.md, THEMES.md
- All tools update STATE.md with progress

</code_context>

<specifics>
## Specific Ideas

- new-character already exists — the remaining commands (character-sheet, character-arc, character-voice-sample, relationship-map, cast-list) extend it
- plot-graph already exists — Phase 3 adds multi-arc-type support and the `--type` flag
- Structure management (add/split/merge/reorder) is the most complex piece — it touches OUTLINE.md, STATE.md, and potentially existing draft files
- All character commands must support sacred adaptations (new-figure, figure-sheet, figure-arc, figures-list, lineage-map) and academic adaptations (new-concept, concept-sheet)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-creative-toolkit*
*Context gathered: 2026-04-07*
