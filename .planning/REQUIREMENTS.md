# Requirements: Scriven v2.0 Publishing Cover Packaging

**Status:** Defined 2026-04-18. Not started yet.

**Goal:** Make Scriven's cover workflow production-ready by defining truthful asset contracts for ebook, paperback, and hardcover covers, wiring those assets into the manuscript build surface, and documenting the exact print-platform deliverables writers and designers need.

**Research input:** User-provided production spec covering Kindle-standard ebook covers, IngramSpark paperback full wraps, hardcover case wraps, barcode/blurb requirements, template-generator dependency, and source-file handoff expectations.

---

## v2.0 Requirements

### Cover Asset Contracts

- [ ] **COV-01**: Scriven defines one canonical `.manuscript/build/` cover-asset contract for ebook front covers, paperback full wraps, and hardcover case wraps
- [ ] **COV-02**: The cover contract distinguishes front-only ebook assets from print wrap assets that require back cover, spine, bleed, and barcode zones
- [ ] **COV-03**: Scriven documents the required source-file handoff for future revisions so designer deliverables are not limited to export-ready flats

### Format Truthfulness

- [ ] **COV-04**: Ebook guidance locks the shipped front-cover deliverable to `1600x2560`, RGB, front-only JPG/PNG without implying print-surface requirements
- [ ] **COV-05**: Paperback guidance locks the shipped print-cover deliverable to PDF/X-1a:2001, CMYK, embedded fonts, flattened transparency, `300 DPI`, and `0.125"` bleed
- [ ] **COV-06**: Hardcover guidance locks the shipped case-wrap deliverable to PDF/X-1a:2001, CMYK, embedded fonts, flattened transparency, `300 DPI`, and board-wrap allowances
- [ ] **COV-07**: Print-cover guidance treats spine width and exact wrap dimensions as template-driven values from IngramSpark's cover template generator rather than hard-coded constants

### Build Integration

- [ ] **COV-08**: Scriven's build/export surface can point at the three cover deliverables from `.manuscript/build/` without manual guesswork about file names or locations
- [ ] **COV-09**: Build docs and commands clearly separate what Scriven can validate locally from what must come from platform templates, ISBN/barcode inputs, or designer-provided CMYK assets

### Trust Surface and Validation

- [ ] **COV-10**: Public publishing docs, shipped-asset inventories, and release-facing trust surfaces describe the same cover workflow contract the commands and templates expect
- [ ] **COV-11**: Regression coverage locks the cover contract so future doc or command edits cannot silently collapse ebook, paperback, and hardcover requirements back into one vague "cover file" model

---

## Out of Scope

- Generating finished cover art automatically inside Scriven
- Replacing IngramSpark's template generator with an internal spine-width calculator for every paper/binding combination
- Barcode purchasing, ISBN assignment, or direct platform upload automation
- Building a GUI cover designer or asset editor

## Traceability

REQ-ID -> planned phase mapping (v2.0 Publishing Cover Packaging, Phases 42-44):

| Requirement | Phase | Status |
|-------------|-------|--------|
| COV-01 | Phase 42 | Planned |
| COV-02 | Phase 42 | Planned |
| COV-03 | Phase 42 | Planned |
| COV-04 | Phase 43 | Planned |
| COV-05 | Phase 43 | Planned |
| COV-06 | Phase 43 | Planned |
| COV-07 | Phase 43 | Planned |
| COV-08 | Phase 44 | Planned |
| COV-09 | Phase 44 | Planned |
| COV-10 | Phase 44 | Planned |
| COV-11 | Phase 44 | Planned |

**Coverage:** 11/11 v2.0 requirements mapped. No orphans, no duplicates.

---

*Defined: 2026-04-18*
