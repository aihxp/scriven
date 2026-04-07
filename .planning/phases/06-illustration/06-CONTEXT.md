# Phase 6: Illustration - Context

**Gathered:** 2026-04-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Cover art, interior illustration, character reference, art direction, chapter header, map illustration, spread layout, panel layout, and storyboard commands. All generate structured prompts — not actual images (prompt-not-product pattern). 10 requirements (ILL-01..10).

</domain>

<decisions>
## Implementation Decisions

### Illustration Prompts
- **D-01:** Prompts use structured markdown with sections: Subject, Composition, Style, Color Palette, Mood, Technical Specs (dimensions, DPI) — copy-pasteable to any AI image tool
- **D-02:** Cover-art includes genre-specific conventions (romance: couple/warm tones, thriller: dark/high contrast, fantasy: sweeping landscape, literary: minimalist/typographic)
- **D-03:** Series consistency via art-direction.md visual style bible; cover-art references it with `--series` flag

### Specialized Formats
- **D-04:** Spread-layout uses ASCII grid showing page spread with labeled zones: [TEXT], [ILLUSTRATION], [BLEED]
- **D-05:** Storyboard includes camera direction: shot type, movement, transitions — matches screenplay conventions

### Claude's Discretion
- Specific prompt structure details beyond the section framework
- Genre convention details beyond the listed examples
- Panel-layout composition terminology
- Map illustration level of detail

</decisions>

<canonical_refs>
## Canonical References

- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §8 — Illustration & Cover Art Pipeline
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §15.7 — Illustration & Cover Art command list
- `data/CONSTRAINTS.json` — Illustration command availability by work type

</canonical_refs>

<code_context>
## Existing Code Insights

### Integration Points
- cover-art reads WORK.md for genre/premise, config.json for KDP trim size
- illustrate-scene reads drafted scene + ART-DIRECTION.md
- character-ref reads CHARACTERS.md
- map-illustration reads WORLD.md
- KDP spine width from export command (Phase 5)

</code_context>

<specifics>
## Specific Ideas

- All illustration commands produce markdown output saved to `.manuscript/illustrations/`
- Cover art prompt includes KDP dimensions calculated from page count + paper type
- Character-ref adapts to figure-ref for sacred work types

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 06-illustration*
*Context gathered: 2026-04-07*
