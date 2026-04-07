# Phase 7: Translation & Localization - Context

**Gathered:** 2026-04-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Translation pipeline commands (translate, translation-glossary, translation-memory, cultural-adaptation, back-translate, multi-publish, autopilot-translate) with RTL/CJK support. New translator agent follows fresh-context-per-unit pattern. 8 requirements (TRANS-01..08).

</domain>

<decisions>
## Implementation Decisions

### Translation Pipeline
- **D-01:** New `translator.md` agent follows drafter's fresh-context-per-unit pattern — receives source text + glossary + translation memory per unit, preventing translation drift
- **D-02:** Translation glossary persists as markdown table in `.manuscript/translation/GLOSSARY-{lang}.md` — human-readable, version-controlled
- **D-03:** Back-translate shows side-by-side: original → translation → back-translation with drift annotations highlighting meaning changes

### RTL/CJK & Multi-Language
- **D-04:** RTL detection is automatic by language — sets appropriate Pandoc flags and Typst `text-dir` parameter
- **D-05:** autopilot-translate spawns parallel translation agents per language, each with own glossary/memory

### Claude's Discretion
- Translation memory storage format and lookup strategy
- Cultural adaptation flag categories and severity levels
- Language detection heuristics for RTL
- Multi-publish format selection per language/market

</decisions>

<canonical_refs>
## Canonical References

- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §9 — Translation & Multi-Language Publishing
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §15.8 — Translation command list
- `agents/drafter.md` — Fresh-context-per-unit pattern (translator agent follows this)
- `.planning/research/PITFALLS.md` — RTL/CJK pitfalls and library constraints

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `agents/drafter.md` — Pattern for fresh-context-per-unit (translator mirrors this)
- `commands/scr/export.md` — Export pipeline translator feeds into
- `data/export-templates/scriven-book.typst` — Already has `text-dir` parameter ready for RTL

### Integration Points
- Translator agent writes to `.manuscript/translation/{lang}/`
- Translation glossary at `.manuscript/translation/GLOSSARY-{lang}.md`
- Multi-publish chains to export command with language-specific metadata
- autopilot-translate extends autopilot pattern

</code_context>

<specifics>
## Specific Ideas

- Translator agent is the second "heart of Scriven" alongside the drafter — voice fidelity in another language
- Cultural adaptation should flag idioms, humor, customs with context and alternatives
- Translation memory grows over the project — earlier translations inform later ones

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 07-translation-localization*
*Context gathered: 2026-04-07*
