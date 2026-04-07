# Requirements: Scriven

**Defined:** 2026-04-06
**Core Value:** Drafted prose sounds like the writer, not like AI — Voice DNA system loaded into every agent invocation.

## v1 Requirements

Requirements for full product release. Each maps to roadmap phases.

### MVP Polish

- [x] **MVP-01**: Demo sample project ships with pre-baked watchmaker story (5 scenes, full context files, voice profile, plot graph, editor notes)
- [x] **MVP-02**: CONSTRAINTS.json validator test ensures schema integrity and all referenced commands exist
- [x] **MVP-03**: Installer dry-run test verifies file copying across Claude Code, Cursor, Gemini CLI
- [x] **MVP-04**: Command structure tests verify frontmatter, required sections, and naming conventions
- [x] **MVP-05**: npm package is publishable — correct bin entry, shebang, publishConfig, engines field
- [x] **MVP-06**: `npx scriven@latest` installs and runs successfully on a clean machine

### Autopilot & Writer Mode

- [x] **AUTO-01**: Autopilot guided profile pauses after each atomic unit for writer review
- [x] **AUTO-02**: Autopilot supervised profile batches through several units, pauses for review
- [x] **AUTO-03**: Autopilot full-auto runs until complete, only pausing on quality gate failures (voice drift, continuity contradiction)
- [x] **AUTO-04**: Autopilot resume picks up from last completed unit after interruption
- [x] **AUTO-05**: Writer mode toggle hides git terminology — commit→save, branch→version, diff→compare, merge→accept changes
- [x] **AUTO-06**: `/scr:save` creates git commit with writer-friendly message
- [x] **AUTO-07**: `/scr:history` shows visual timeline of saves without git jargon
- [x] **AUTO-08**: `/scr:compare` shows side-by-side diff in writer-friendly format
- [x] **AUTO-09**: `/scr:versions` lists draft versions with human-readable labels
- [x] **AUTO-10**: `/scr:undo` reverts to last checkpoint with confirmation
- [x] **AUTO-11**: `/scr:pause-work` captures full context (current unit, what writer was thinking, next steps) to STATE.md
- [x] **AUTO-12**: `/scr:resume-work` restores context and explains where writer left off
- [x] **AUTO-13**: `/scr:session-report` shows work completed in current session (units drafted, words written, time)

### Character & World

- [x] **CHAR-01**: `/scr:new-character` creates structured character profile with voice anchor, speech patterns, emotional state
- [x] **CHAR-02**: `/scr:character-sheet` displays/edits a specific character's full profile
- [x] **CHAR-03**: `/scr:character-arc` visualizes character's emotional/growth arc across the work
- [x] **CHAR-04**: `/scr:character-voice-sample` generates 5-line dialogue sample per character for approval
- [x] **CHAR-05**: `/scr:relationship-map` generates markdown relationship graph (requires 2+ characters)
- [x] **CHAR-06**: `/scr:cast-list` displays roster of all characters with brief descriptions
- [x] **CHAR-07**: `/scr:build-world` generates WORLD.md with geographic, cultural, technological, magical/scientific rules
- [x] **CHAR-08**: Character commands adapt names for sacred (new-figure, figures-list) and academic (new-concept) work types

### Narrative Structure

- [x] **STRUCT-01**: `/scr:plot-graph` generates story arc visualization supporting three-act, five-act, hero's journey, save the cat, kishotenketsu
- [x] **STRUCT-02**: `/scr:timeline` generates chronological event timeline from OUTLINE.md
- [x] **STRUCT-03**: `/scr:theme-tracker` tracks thematic threads across the work
- [x] **STRUCT-04**: `/scr:subplot-map` visualizes subplot threads and their intersections (requires 2+ threads)
- [x] **STRUCT-05**: `/scr:outline` displays/edits the structural outline
- [x] **STRUCT-06**: Structure management commands: add-unit, insert-unit, remove-unit, split-unit, merge-units, reorder-units

### Quality & Review

- [x] **QUAL-01**: `/scr:line-edit` performs prose quality pass (sentence rhythm, word choice, redundancy, cliches)
- [x] **QUAL-02**: `/scr:copy-edit` performs correctness pass (grammar, spelling, punctuation, consistency)
- [x] **QUAL-03**: `/scr:dialogue-audit` checks character voice differentiation, attribution, dialect consistency, talking-head detection
- [x] **QUAL-04**: `/scr:pacing-analysis` provides structure-aware pacing report (climax vs breather, scene length patterns)
- [x] **QUAL-05**: `/scr:voice-check` compares drafted prose against STYLE-GUIDE.md for drift
- [x] **QUAL-06**: `/scr:sensitivity-review` flags potential issues with context, suggests alternatives, notes intentional craft
- [x] **QUAL-07**: `/scr:beta-reader` simulates first-reader feedback — confusion points, pacing issues, emotional beats
- [x] **QUAL-08**: `/scr:continuity-check` verifies facts, timelines, character details across all drafted units
- [x] **QUAL-09**: Quality commands use adapted names for sacred (register-check, interfaith-review, doctrinal-check) and academic (citation-check, ethics-review)
- [x] **QUAL-10**: `/scr:originality-check` scans drafted prose for unintentional similarity to published works, flags AI-generated patterns, and verifies copyright compliance

### Front & Back Matter

- [x] **PUB-01**: `/scr:front-matter` generates all 19 front matter elements (title page, copyright, dedication, epigraph, TOC, etc.)
- [x] **PUB-02**: `/scr:back-matter` generates all 12+ back matter elements (about author, also-by, acknowledgments, etc.)
- [x] **PUB-03**: Front/back matter elements individually addressable via `--element` flag
- [x] **PUB-04**: `/scr:blurb` generates marketing blurb from complete draft
- [x] **PUB-05**: `/scr:synopsis` generates synopsis at specified length (1-page, 2-page, 5-page)
- [x] **PUB-06**: `/scr:query-letter` generates agent query letter (requires blurb + synopsis)
- [x] **PUB-07**: `/scr:book-proposal` generates nonfiction book proposal (requires synopsis)
- [x] **PUB-08**: `/scr:discussion-questions` generates reading group discussion questions
- [x] **PUB-09**: Front/back matter adapts for academic (abstract, bibliography) and sacred (imprimatur, concordance, maps)

### Export & Publishing

- [x] **EXP-01**: `/scr:export markdown` compiles manuscript to single markdown file with correct document order
- [x] **EXP-02**: `/scr:export docx` exports manuscript format (12pt TNR, double-spaced, standard margins)
- [x] **EXP-03**: `/scr:export docx --formatted` exports formatted/typeset version
- [x] **EXP-04**: `/scr:export pdf` exports manuscript-format PDF
- [x] **EXP-05**: `/scr:export pdf --print-ready` exports print-ready PDF with trim, margins, bleed
- [x] **EXP-06**: `/scr:export epub` exports EPUB 3.0 with metadata, TOC, cover
- [ ] **EXP-07**: `/scr:export fountain` exports screenplay in Fountain format
- [ ] **EXP-08**: `/scr:export fdx` exports Final Draft XML format
- [ ] **EXP-09**: `/scr:export latex` exports LaTeX for academic/sacred critical editions
- [ ] **EXP-10**: `/scr:export kdp-package` bundles interior PDF + cover template (calculated spine width) + metadata
- [ ] **EXP-11**: `/scr:export ingram-package` bundles IngramSpark-ready files (PDF/X-1a, cover, metadata)
- [ ] **EXP-12**: `/scr:export query-package` bundles query letter + synopsis + sample chapters
- [ ] **EXP-13**: `/scr:export submission-package` bundles full submission materials
- [x] **EXP-14**: `/scr:publish` interactive wizard chains correct export commands based on destination
- [x] **EXP-15**: `/scr:publish --preset` supports named presets (kdp-paperback, query-submission, ebook-wide)
- [x] **EXP-16**: `/scr:autopilot-publish` runs full publishing pipeline unattended (front/back matter → compile → cover → export → packages)
- [x] **EXP-17**: `/scr:manuscript-stats` shows word count, chapter count, estimated page count, reading time

### Illustration & Cover Art

- [ ] **ILL-01**: `/scr:cover-art` generates detailed cover art prompts (front, spine, back, full wrap) calibrated to genre conventions
- [ ] **ILL-02**: Cover art includes KDP trim size specs with calculated spine width based on page count
- [ ] **ILL-03**: `/scr:art-direction` generates ART-DIRECTION.md with visual style, color palette, typography, mood board
- [ ] **ILL-04**: `/scr:illustrate-scene` generates scene-specific illustration prompts with character descriptions, setting, mood
- [ ] **ILL-05**: `/scr:character-ref` generates character reference sheet prompts for visual consistency
- [ ] **ILL-06**: `/scr:chapter-header` generates chapter header/ornament design prompts
- [ ] **ILL-07**: `/scr:map-illustration` generates world map illustration prompts from WORLD.md
- [ ] **ILL-08**: `/scr:spread-layout` generates children's book/picture book spread layouts (text placement + illustration zones)
- [ ] **ILL-09**: `/scr:panel-layout` generates comic panel layouts with composition notes
- [ ] **ILL-10**: `/scr:storyboard` generates storyboard frames for script work types

### Translation & Multi-Language

- [ ] **TRANS-01**: `/scr:translate <language>` translates manuscript per-unit using fresh-context-per-unit pattern
- [ ] **TRANS-02**: `/scr:translation-glossary` creates/manages term glossary for consistent translation
- [ ] **TRANS-03**: `/scr:translation-memory` builds and references translation memory from prior translations
- [ ] **TRANS-04**: `/scr:cultural-adaptation` flags idioms, humor, customs that need localization
- [ ] **TRANS-05**: `/scr:back-translate` translates the translation back to source language for verification
- [ ] **TRANS-06**: `/scr:multi-publish` exports translated editions in all target formats
- [ ] **TRANS-07**: RTL (Arabic, Hebrew) and CJK (Chinese, Japanese, Korean) text direction support in all exports
- [ ] **TRANS-08**: `/scr:autopilot-translate` runs multi-language translation pipeline unattended

### Collaboration

- [ ] **COLLAB-01**: `/scr:track create` creates named revision track (git branch with writer-friendly abstraction)
- [ ] **COLLAB-02**: `/scr:track list` shows all revision tracks
- [ ] **COLLAB-03**: `/scr:track switch` switches between revision tracks
- [ ] **COLLAB-04**: `/scr:track compare` shows side-by-side comparison between tracks
- [ ] **COLLAB-05**: `/scr:track merge` merges revision track with continuity conflict resolution
- [ ] **COLLAB-06**: `/scr:track propose` creates revision proposal for editor review
- [ ] **COLLAB-07**: Editor-writer workflow: editor adds notes, writer reviews and accepts/rejects changes
- [ ] **COLLAB-08**: Co-writing parallel tracks with continuity merge checking

### Multi-Runtime & Polish

- [ ] **RUNTIME-01**: Installer supports Codex CLI, OpenCode, GitHub Copilot, Windsurf, Antigravity
- [ ] **RUNTIME-02**: Writer profile system persists across sessions and projects
- [ ] **RUNTIME-03**: `/scr:manager` interactive command center for multi-work management
- [ ] **RUNTIME-04**: Academic-specific features: citation-check, peer-review simulation, journal submission templates
- [ ] **RUNTIME-05**: `/scr:health` diagnoses and repairs project state issues
- [ ] **RUNTIME-06**: Utility commands: add-note, check-notes, plant-seed, troubleshoot, thread
- [ ] **RUNTIME-07**: `/scr:fast` inline trivial edits without full planning overhead

### Sacred & Historical

- [ ] **SACRED-01**: 13 sacred/historical work types fully functional with tradition-native vocabulary
- [ ] **SACRED-02**: Sacred voice registers (prophetic, wisdom, legal, liturgical, narrative-historical, apocalyptic, epistolary, psalmic, parabolic, didactic) loaded into drafter
- [ ] **SACRED-03**: Adapted context files (FIGURES.md, LINEAGES.md, COSMOLOGY.md, THEOLOGICAL-ARC.md, DOCTRINES.md, FRAMEWORK.md) fully functional
- [ ] **SACRED-04**: Sacred-exclusive commands (concordance, cross-reference, genealogy, chronology, annotation-layer, verse-numbering, source-tracking, doctrinal-check) fully implemented
- [ ] **SACRED-05**: Sacred-adapted commands (new-figure, lineage-map, build-cosmology, theological-arc, doctrine-tracker, etc.) auto-route correctly
- [ ] **SACRED-06**: Sacred discuss-phase with 10 tradition-specific categories
- [ ] **SACRED-07**: Sacred translation pipeline: formal vs. dynamic equivalence, canonical alignment, liturgical preservation
- [ ] **SACRED-08**: Tradition-aware front/back matter (imprimatur, nihil obstat, hekhsher, concordance, maps)
- [ ] **SACRED-09**: Sacred config schema (tradition, verse numbering, calendar system, translation philosophy, canonical alignment)

## v2 Requirements

### Advanced Features

- **ADV-01**: MOBI export format (Kindle-specific)
- **ADV-02**: D2D (Draft2Digital) package export
- **ADV-03**: APA/MLA/Chicago formatted export for academic
- **ADV-04**: BibTeX export for academic
- **ADV-05**: Anthology editor tools (managing submissions, ordering pieces)
- **ADV-06**: AI model selection per agent (use different models for different tasks)
- **ADV-07**: Custom work type definition (user creates their own structural hierarchy)
- **ADV-08**: Plugin system for community-contributed commands

## Out of Scope

| Feature | Reason |
|---------|--------|
| Built-in image generation | Generate prompts, not images — stays dependency-free |
| Real-time collaborative editing | Requires server/websockets — git-based async collaboration instead |
| GUI or web interface | Runs inside existing AI agents — invest in /scr:next and writer mode |
| AI model fine-tuning | Voice DNA via prompt engineering — model-agnostic |
| Cloud storage/hosting | All files local, writer owns everything |
| Grammar checking engine | AI agent IS the grammar engine — focus on creative-writing-specific quality |
| Word processor features | Markdown authoring → formatted export at export time |
| Proprietary file format | Everything is markdown — no lock-in |
| Subscription pricing | Free npm package, no server costs |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| MVP-01 | Phase 1 | Complete |
| MVP-02 | Phase 1 | Complete |
| MVP-03 | Phase 1 | Complete |
| MVP-04 | Phase 1 | Complete |
| MVP-05 | Phase 1 | Complete |
| MVP-06 | Phase 1 | Complete |
| AUTO-01 | Phase 2 | Complete |
| AUTO-02 | Phase 2 | Complete |
| AUTO-03 | Phase 2 | Complete |
| AUTO-04 | Phase 2 | Complete |
| AUTO-05 | Phase 2 | Complete |
| AUTO-06 | Phase 2 | Complete |
| AUTO-07 | Phase 2 | Complete |
| AUTO-08 | Phase 2 | Complete |
| AUTO-09 | Phase 2 | Complete |
| AUTO-10 | Phase 2 | Complete |
| AUTO-11 | Phase 2 | Complete |
| AUTO-12 | Phase 2 | Complete |
| AUTO-13 | Phase 2 | Complete |
| CHAR-01 | Phase 3 | Complete |
| CHAR-02 | Phase 3 | Complete |
| CHAR-03 | Phase 3 | Complete |
| CHAR-04 | Phase 3 | Complete |
| CHAR-05 | Phase 3 | Complete |
| CHAR-06 | Phase 3 | Complete |
| CHAR-07 | Phase 3 | Complete |
| CHAR-08 | Phase 3 | Complete |
| STRUCT-01 | Phase 3 | Complete |
| STRUCT-02 | Phase 3 | Complete |
| STRUCT-03 | Phase 3 | Complete |
| STRUCT-04 | Phase 3 | Complete |
| STRUCT-05 | Phase 3 | Complete |
| STRUCT-06 | Phase 3 | Complete |
| QUAL-01 | Phase 4 | Complete |
| QUAL-02 | Phase 4 | Complete |
| QUAL-03 | Phase 4 | Complete |
| QUAL-04 | Phase 4 | Complete |
| QUAL-05 | Phase 4 | Complete |
| QUAL-06 | Phase 4 | Complete |
| QUAL-07 | Phase 4 | Complete |
| QUAL-08 | Phase 4 | Complete |
| QUAL-09 | Phase 4 | Complete |
| QUAL-10 | Phase 4 | Complete |
| PUB-01 | Phase 4 | Complete |
| PUB-02 | Phase 4 | Complete |
| PUB-03 | Phase 4 | Complete |
| PUB-04 | Phase 4 | Complete |
| PUB-05 | Phase 4 | Complete |
| PUB-06 | Phase 4 | Complete |
| PUB-07 | Phase 4 | Complete |
| PUB-08 | Phase 4 | Complete |
| PUB-09 | Phase 4 | Complete |
| EXP-01 | Phase 5 | Complete |
| EXP-02 | Phase 5 | Complete |
| EXP-03 | Phase 5 | Complete |
| EXP-04 | Phase 5 | Complete |
| EXP-05 | Phase 5 | Complete |
| EXP-06 | Phase 5 | Complete |
| EXP-07 | Phase 5 | Pending |
| EXP-08 | Phase 5 | Pending |
| EXP-09 | Phase 5 | Pending |
| EXP-10 | Phase 5 | Pending |
| EXP-11 | Phase 5 | Pending |
| EXP-12 | Phase 5 | Pending |
| EXP-13 | Phase 5 | Pending |
| EXP-14 | Phase 5 | Complete |
| EXP-15 | Phase 5 | Complete |
| EXP-16 | Phase 5 | Complete |
| EXP-17 | Phase 5 | Complete |
| ILL-01 | Phase 6 | Pending |
| ILL-02 | Phase 6 | Pending |
| ILL-03 | Phase 6 | Pending |
| ILL-04 | Phase 6 | Pending |
| ILL-05 | Phase 6 | Pending |
| ILL-06 | Phase 6 | Pending |
| ILL-07 | Phase 6 | Pending |
| ILL-08 | Phase 6 | Pending |
| ILL-09 | Phase 6 | Pending |
| ILL-10 | Phase 6 | Pending |
| TRANS-01 | Phase 7 | Pending |
| TRANS-02 | Phase 7 | Pending |
| TRANS-03 | Phase 7 | Pending |
| TRANS-04 | Phase 7 | Pending |
| TRANS-05 | Phase 7 | Pending |
| TRANS-06 | Phase 7 | Pending |
| TRANS-07 | Phase 7 | Pending |
| TRANS-08 | Phase 7 | Pending |
| COLLAB-01 | Phase 8 | Pending |
| COLLAB-02 | Phase 8 | Pending |
| COLLAB-03 | Phase 8 | Pending |
| COLLAB-04 | Phase 8 | Pending |
| COLLAB-05 | Phase 8 | Pending |
| COLLAB-06 | Phase 8 | Pending |
| COLLAB-07 | Phase 8 | Pending |
| COLLAB-08 | Phase 8 | Pending |
| RUNTIME-01 | Phase 8 | Pending |
| RUNTIME-02 | Phase 8 | Pending |
| RUNTIME-03 | Phase 8 | Pending |
| RUNTIME-04 | Phase 8 | Pending |
| RUNTIME-05 | Phase 8 | Pending |
| RUNTIME-06 | Phase 8 | Pending |
| RUNTIME-07 | Phase 8 | Pending |
| SACRED-01 | Phase 8 | Pending |
| SACRED-02 | Phase 8 | Pending |
| SACRED-03 | Phase 8 | Pending |
| SACRED-04 | Phase 8 | Pending |
| SACRED-05 | Phase 8 | Pending |
| SACRED-06 | Phase 8 | Pending |
| SACRED-07 | Phase 8 | Pending |
| SACRED-08 | Phase 8 | Pending |
| SACRED-09 | Phase 8 | Pending |

**Coverage:**
- v1 requirements: 101 total
- Mapped to phases: 101
- Unmapped: 0

---
*Requirements defined: 2026-04-06*
*Last updated: 2026-04-06 after roadmap creation*
