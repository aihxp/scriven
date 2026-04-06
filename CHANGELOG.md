# Changelog

All notable changes to Scriven are documented here.

## [0.3.0] — 2026-04-06

### Added
- 13 sacred/historical work types (Biblical, Quranic, Torah, Vedic, Buddhist scripture; commentary, devotional, liturgical, historical chronicle, mythological collection, religious epic, sermon, homiletic collection)
- 8 sacred-exclusive commands (concordance, cross-reference, genealogy, chronology, annotation-layer, verse-numbering, source-tracking, doctrinal-check)
- 10 sacred voice registers (prophetic, wisdom, legal, liturgical, narrative-historical, apocalyptic, epistolary, psalmic, parabolic, didactic)
- Sacred file adaptations: FIGURES.md, LINEAGES.md, COSMOLOGY.md, THEOLOGICAL-ARC.md, DOCTRINES.md, FRAMEWORK.md
- `/scr:next` universal interface — one command that always knows what to do next
- `/scr:do` natural language router — free-text to command mapping
- `/scr:demo` sandbox mode — explore a pre-built sample project
- `/scr:voice-test` voice calibration gate before first draft
- `/scr:import` existing manuscript ingestion
- `/scr:publish` interactive wizard with presets (kdp-paperback, query-submission, ebook-wide)
- Series bible with cross-book continuity enforcement
- Progressive disclosure onboarding (3 questions max)
- Drop-off risk mitigations for onboarding, first draft, non-technical friction, and publishing overwhelm
- 6 user personas including sacred/historical writer
- `CONSTRAINTS.json` — runtime constraint system governing command availability, work-type adaptation, and dependency gating

### Changed
- Command list expanded to ~170 commands across 15 categories
- Work type count expanded from 35 to 50+
- Constraint matrices now include sacred/historical column
- Voice DNA section expanded with sacred register system (section 6.3)
- Translation section expanded with sacred text translation (section 9.4, formal vs dynamic equivalence, canonical alignment, liturgical preservation)
- Discuss phase categories expanded with 10 sacred categories (section 12.3)
- Build phases expanded to 10 (sacred/historical as dedicated phase)
- Config schema expanded with sacred config block (tradition, verse numbering, calendar, translation philosophy, canonical alignment)

### Fixed
- Section numbering drift after insertions
- 16 adapted sacred command names now in command list
- Sermon/Homily duplication resolved (moved to sacred group)
- `/scr:publish` vs `/scr:export` relationship clarified

## [0.1.0] — Initial

- Initial project structure
- GSD-inspired command system
- Core workflow (new-work, discuss, plan, draft, editor-review, submit)
- 35 initial work types
- Writer mode / developer mode toggle
