# Phase 4: Quality & Manuscript Completion - Context

**Gathered:** 2026-04-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Quality review tools (line-edit, copy-edit, dialogue-audit, pacing-analysis, voice-check, sensitivity-review, beta-reader, continuity-check, originality-check) and front/back matter generation (19 front matter elements, 12+ back matter elements, blurb, synopsis, query letter, book proposal, discussion questions). This phase completes the manuscript from "drafted" to "publication-ready" — the input to Phase 5's export pipeline.

</domain>

<decisions>
## Implementation Decisions

### Quality Review
- **D-01:** Line-edit presents inline annotations with original → suggested replacement, grouped by type (rhythm, word choice, redundancy)
- **D-02:** Originality-check scans for AI-generated patterns (hedging phrases, balanced lists, abstract language) + flags passages echoing known published works — surfaces concerns, doesn't block
- **D-03:** Quality commands are chainable — add `/scr:polish` meta-command that chains line-edit → copy-edit → voice-check in sequence
- **D-04:** Quality commands use adapted names per CONSTRAINTS.json: sacred (register-check, interfaith-review, doctrinal-check), academic (citation-check, ethics-review)

### Front/Back Matter
- **D-05:** Priority front matter elements: title page, copyright page, dedication, table of contents, epigraph — the 5 a reader always sees
- **D-06:** Voice DNA (STYLE-GUIDE.md) loaded for narrative elements (dedication, acknowledgments, about-author) but not mechanical ones (copyright, TOC)
- **D-07:** `--element` flag generates one specific element on demand: `/scr:front-matter --element dedication`
- **D-08:** Front/back matter adapts for academic (abstract, bibliography) and sacred (imprimatur, concordance, maps) per CONSTRAINTS.json

### Marketing Materials
- **D-09:** `/scr:blurb` generates 3 variations (short/punchy, standard, extended) — writer picks
- **D-10:** `/scr:synopsis` supports `--length` flag: 1-page (agent queries), 2-page (editor), 5-page (detailed)
- **D-11:** `/scr:query-letter` adapts to genre conventions (romance, literary, thriller differ in tone, comp titles, market positioning)

### Claude's Discretion
- Exact AI-pattern detection heuristics for originality-check
- Front matter element ordering beyond the 5 priority elements
- Polish meta-command error handling between chained steps
- Discussion questions generation depth and focus areas

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product Plan
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §7 — Front Matter & Back Matter (19 front elements, 12+ back elements, recto/verso rules, page numbering)
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §15.4 — Analysis & Review command list
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §15.5 — Writing Quality command list
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §15.6 — Front & Back Matter command list

### Runtime Artifacts
- `data/CONSTRAINTS.json` — Command availability, adapted names, prerequisites (draft_exists, complete-draft)
- `commands/scr/beta-reader.md` — Already built (Phase 1 MVP)
- `commands/scr/continuity-check.md` — Already built
- `commands/scr/editor-review.md` — Already built
- `agents/voice-checker.md` — Voice check agent already exists
- `agents/continuity-checker.md` — Continuity check agent already exists

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `commands/scr/beta-reader.md`: Already exists — may need enhancement but basic structure works
- `commands/scr/continuity-check.md`: Already exists — may need enhancement
- `commands/scr/editor-review.md`: Already exists — pattern for review-style commands
- `agents/voice-checker.md`: Agent prompt exists — voice-check command wraps this
- `agents/continuity-checker.md`: Agent prompt exists — continuity-check command wraps this

### Established Patterns
- Review commands read drafted prose, analyze, produce structured feedback
- Quality commands adapt names via CONSTRAINTS.json
- All commands use the markdown skill file pattern

### Integration Points
- Quality tools read from `.manuscript/drafts/`
- Front/back matter writes to `.manuscript/front-matter/` and `.manuscript/back-matter/`
- Marketing materials (blurb, synopsis) write to `.manuscript/marketing/`
- Autopilot full-auto (Phase 2) hooks into voice-check and continuity-check as quality gates

</code_context>

<specifics>
## Specific Ideas

- beta-reader.md and continuity-check.md already exist from Phase 1 — verify they meet requirements, enhance if needed
- voice-check wraps the existing voice-checker agent
- The polish meta-command is genuinely useful for writers who just want "make it better"
- Front matter ordering must follow Chicago Manual of Style conventions (half-title, series title, title, copyright, dedication, etc.)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 04-quality-manuscript-completion*
*Context gathered: 2026-04-07*
