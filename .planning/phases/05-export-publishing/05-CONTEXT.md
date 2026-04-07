# Phase 5: Export & Publishing - Context

**Gathered:** 2026-04-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Multi-format export pipeline (markdown, DOCX, PDF, EPUB, Fountain, FDX, LaTeX), platform packages (KDP, IngramSpark, query, submission), publishing wizard with presets, autopilot-publish, and manuscript stats. The AI agent invokes external tools (Pandoc, Typst) via shell commands — no compiled code. Export template files ship with the package.

</domain>

<decisions>
## Implementation Decisions

### Export Toolchain
- **D-01:** Export commands are AI agent instructions that invoke `pandoc` and `typst` via shell — not compiled code or Node.js wrappers
- **D-02:** Commands detect if Pandoc/Typst are installed at start, provide clear install instructions if missing
- **D-03:** Manuscript assembly reads OUTLINE.md for document order, concatenates drafted units + front/back matter, then passes to Pandoc

### Format Specifics
- **D-04:** Format priority: Markdown → DOCX → PDF → EPUB (primary), Fountain/FDX/LaTeX (secondary, specialized work types)
- **D-05:** KDP spine width calculated dynamically at export time: page_count × paper_factor (0.0025" white, 0.002" cream) + 0.06"
- **D-06:** Export template files ship in `data/export-templates/` (Typst book template, DOCX reference doc, EPUB CSS)

### Publishing Wizard
- **D-07:** `/scr:publish` wizard checks prerequisites (front-matter, back-matter, blurb, synopsis, cover), shows checklist with one-click commands for missing pieces
- **D-08:** 4 presets: kdp-paperback, kdp-ebook, query-submission, ebook-wide
- **D-09:** autopilot-publish runs voice-check + continuity-check as quality gate before export — warns but doesn't block

### Claude's Discretion
- Pandoc/Typst command-line flags for each format
- Export template styling (fonts, margins, headers)
- Manuscript assembly edge cases (missing units, partial drafts)
- Error handling for external tool failures

</decisions>

<canonical_refs>
## Canonical References

### Product Plan
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §11 — Export & Publishing Formats (complete format table)
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §15.9 — Export & Publishing command list
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §8 — Illustration & Cover Art (KDP cover specs, spine width formula)

### Research
- `.planning/research/STACK.md` — Pandoc 3.9.x, Typst, Afterwriting, Screenplain recommendations
- `.planning/research/PITFALLS.md` — RTL library choices, KDP validation, IngramSpark PDF/X-1a

### Runtime Artifacts
- `data/CONSTRAINTS.json` — Export availability by work type group
- `commands/scr/publish.md` — Existing publish command shell (needs full implementation)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `commands/scr/publish.md`: Shell exists from Phase 1 — needs full wizard implementation
- `commands/scr/map-manuscript.md`: Existing command for manuscript overview — can inform assembly logic

### Established Patterns
- Commands are markdown skill files with shell tool invocations
- External tool detection pattern: check with `which pandoc` or `command -v typst`

### Integration Points
- Export reads from `.manuscript/drafts/body/`, `.manuscript/front-matter/`, `.manuscript/back-matter/`
- Output writes to `.manuscript/output/` directory
- KDP package needs cover dimensions from config.json
- Publish wizard chains front-matter → back-matter → export → package

</code_context>

<specifics>
## Specific Ideas

- RTL/CJK export library decisions here MUST account for Phase 7 translation needs (research flag from project state)
- The export command is the `compile` step — it must handle the full document assembly, not just format conversion
- manuscript-stats can derive page count from word count using standard 250 words/page estimate
- Export templates are concrete deliverables that need to look professional — not just functional

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 05-export-publishing*
*Context gathered: 2026-04-07*
