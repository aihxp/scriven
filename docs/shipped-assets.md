# Shipped Assets

Scriven's launch surface should point to what is actually bundled in this repo today. This document is the canonical inventory for shipped export templates and other trust-critical launch files.

## Export Templates Shipped Today

These are the only export templates currently bundled in `data/export-templates/`:

- `scriven-book.typst` — book interior and print-ready PDF template
- `scriven-epub.css` — EPUB styling and KDP-compatible ebook CSS
- `scriven-academic.latex` — academic and thesis LaTeX template

## Export Template Behaviors

- Manuscript DOCX export currently relies on Pandoc's default DOCX styling unless the user supplies a custom Pandoc reference document.
- Formatted DOCX export currently relies on Pandoc's default DOCX output unless the user supplies a custom Pandoc reference document for styled review copies.
- `scriven-manuscript.docx` is not shipped today.
- `scriven-formatted.docx` is not shipped today.
- `scriven-kdp-cover.typst` is not shipped today.
- `scriven-ingram-cover.typst` is not shipped today.

## Trust-Critical Launch Files

- `README.md` — primary launch narrative and status claims
- `commands/scr/export.md` — source of truth for export command behavior
- `docs/publishing.md` — user-facing explanation of export formats and publishing packages
- `docs/contributing.md` — contributor-facing guidance for extending export support
- `AGENTS.md` — project instructions that shape planning and implementation claims
- `CLAUDE.md` — mirrored project instructions and product-plan context
