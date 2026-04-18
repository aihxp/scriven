# Shipped Assets

Scriven's launch surface should point to what is actually bundled in this repo today. This document is the canonical inventory for shipped export templates and other trust-critical launch files.

## Export Templates Shipped Today

These export templates are currently bundled in `data/export-templates/`:

- `scriven-book.typst` — default book interior and print-ready PDF template
- `scriven-stageplay.typst` — stage play interior template
- `scriven-picturebook.typst` — picture-book interior template
- `scriven-chapbook.typst` — chapbook and poetry-collection interior template
- `scriven-epub.css` — standard EPUB styling and KDP-compatible ebook CSS
- `scriven-fixed-layout-epub.css` — fixed-layout EPUB stylesheet
- `scriven-fixed-layout.opf` — fixed-layout EPUB OPF stub
- `scriven-academic.latex` — generic academic/thesis LaTeX template
- `scriven-ieee.latex` — IEEE wrapper template
- `scriven-acm.latex` — ACM wrapper template
- `scriven-lncs.latex` — LNCS wrapper template
- `scriven-elsevier.latex` — Elsevier wrapper template
- `scriven-apa7.latex` — APA7 wrapper template
- `scriven-smashwords.docx` — Smashwords reference DOCX
- `scriven-smashwords-styles.md` — Smashwords style guide companion
- `scriven-poetry-submission.docx` — poetry-submission reference DOCX
- `scriven-poetry-submission-styles.md` — poetry-submission style guide companion

## Export Template Behaviors

- Manuscript DOCX export currently relies on Pandoc's default DOCX styling unless the user supplies a custom Pandoc reference document.
- Formatted DOCX export currently relies on Pandoc's default DOCX output unless the user supplies a custom Pandoc reference document for styled review copies.
- `scriven-manuscript.docx` is not shipped today.
- `scriven-formatted.docx` is not shipped today.
- `scriven-kdp-cover.typst` is not shipped today.
- `scriven-ingram-cover.typst` is not shipped today.
- Cover deliverables are manuscript build assets, not bundled export templates:
  - Ebook front cover: `.manuscript/build/ebook-cover.jpg` (or `.png`)
  - Paperback full wrap: `.manuscript/build/paperback-cover.pdf`
  - Hardcover case wrap: `.manuscript/build/hardcover-cover.pdf`
- Those cover files are designer-provided or externally produced assets that Scriven's build/export commands reference; exact paperback and hardcover wrap geometry still comes from the active platform cover template generator.

## Trust-Critical Launch Files

- `README.md` — primary launch narrative and status claims
- `docs/proof-artifacts.md` — canonical proof hub for sample-flow and voice-preservation evidence
- `docs/runtime-support.md` — canonical runtime matrix, Node baseline, and support-confidence framing
- `data/proof/watchmaker-flow/README.md` — canonical sample-flow proof bundle rooted in shipped demo files
- `commands/scr/export.md` — source of truth for export command behavior
- `docs/publishing.md` — user-facing explanation of export formats and publishing packages
- `docs/contributing.md` — contributor-facing guidance for extending export support
- `AGENTS.md` — project instructions that shape planning and implementation claims
- `CLAUDE.md` — mirrored project instructions and product-plan context
