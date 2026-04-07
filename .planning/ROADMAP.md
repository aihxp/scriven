# Roadmap: Scriven

## Milestones

- [x] **v1.0 MVP** - Phases 1-8 (shipped 2026-04-07)
- [x] **v1.1 Generic Platform Support** - Phase 9 (shipped 2026-04-07)
- [ ] **v1.2 Documentation** - Phases 10-12 (in progress)

## Phases

<details>
<summary>v1.0 MVP (Phases 1-8) - SHIPPED 2026-04-07</summary>

- [x] **Phase 1: MVP Polish** - Ship installable npm package with demo, tests, and working npx experience
- [x] **Phase 2: Writer Experience** - Autopilot drafting modes, writer-friendly git, and session management
- [x] **Phase 3: Creative Toolkit** - Character management, world-building, and narrative structure tools
- [x] **Phase 4: Quality & Manuscript Completion** - Editing tools, quality gates, and front/back matter generation
- [x] **Phase 5: Export & Publishing** - Multi-format export pipeline with Pandoc/Typst and publishing wizard
- [x] **Phase 6: Illustration** - Cover art, interior illustration, and visual asset prompt generation
- [x] **Phase 7: Translation & Localization** - Multi-language translation pipeline with glossary, memory, and RTL/CJK support
- [x] **Phase 8: Collaboration, Platform & Sacred** - Revision tracks, multi-runtime support, and sacred text features

### Phase 1: MVP Polish
**Goal**: Writers can discover, install, and try Scriven in under 5 minutes with a compelling demo experience
**Depends on**: Nothing (first phase -- MVP already built)
**Requirements**: MVP-01, MVP-02, MVP-03, MVP-04, MVP-05, MVP-06
**Success Criteria** (what must be TRUE):
  1. Running `npx scriven@latest` on a clean machine installs and launches successfully
  2. Demo project shows a complete watchmaker story with voice profile, scenes, and editor notes that a new user can explore
  3. Test suite catches broken constraints, invalid command structure, and installer failures before publishing
  4. Package publishes to npm without errors and meets registry standards
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md -- Create pre-baked demo project (watchmaker story with 4 drafted scenes, context files, editor notes)
- [x] 01-02-PLAN.md -- Test suite for CONSTRAINTS.json, command structure, and installer dry-run
- [x] 01-03-PLAN.md -- Demo completeness tests, package publishability tests, and human verification

### Phase 2: Writer Experience
**Goal**: Non-technical writers can use Scriven without encountering git terminology, and the AI can draft autonomously with appropriate human checkpoints
**Depends on**: Phase 1
**Requirements**: AUTO-01, AUTO-02, AUTO-03, AUTO-04, AUTO-05, AUTO-06, AUTO-07, AUTO-08, AUTO-09, AUTO-10, AUTO-11, AUTO-12, AUTO-13
**Success Criteria** (what must be TRUE):
  1. Writer in guided autopilot sees their manuscript grow chapter-by-chapter with review pauses after each unit
  2. Writer in full-auto autopilot gets a complete draft that only stopped where voice drift or continuity issues were detected
  3. Writer can save, view history, compare versions, and undo changes without ever seeing git commands or terminology
  4. Writer can pause a session, close their computer, return days later, and resume exactly where they left off with full context
  5. Writer can see a session report showing what was accomplished (units drafted, words written)
**Plans**: 4 plans

Plans:
- [x] 02-01-PLAN.md -- Autopilot command with guided/supervised/full-auto profiles and config template update
- [x] 02-02-PLAN.md -- Writer-friendly git commands (save, history, compare, versions, undo)
- [x] 02-03-PLAN.md -- Session management commands (pause-work, resume-work, session-report) and template updates
- [x] 02-04-PLAN.md -- Phase 2 test suite validating all commands, config schema, and template updates

### Phase 3: Creative Toolkit
**Goal**: Writers have structured tools for building and visualizing their story's characters, world, and narrative architecture
**Depends on**: Phase 2
**Requirements**: CHAR-01, CHAR-02, CHAR-03, CHAR-04, CHAR-05, CHAR-06, CHAR-07, CHAR-08, STRUCT-01, STRUCT-02, STRUCT-03, STRUCT-04, STRUCT-05, STRUCT-06
**Success Criteria** (what must be TRUE):
  1. Writer can create character profiles with voice anchors and see a cast list, and character commands adapt names for sacred/academic work types
  2. Writer can generate a dialogue sample for any character and approve it before drafting begins
  3. Writer can visualize their plot structure (three-act, hero's journey, etc.) and track themes and subplots across the work
  4. Writer can build a world document with geographic, cultural, and rule systems that downstream commands reference
  5. Writer can restructure their outline by adding, splitting, merging, and reordering units
**Plans**: 4 plans

Plans:
- [x] 03-01-PLAN.md -- Character profile and world-building commands (character-sheet, voice-sample, cast-list, character-arc, relationship-map, build-world + WORLD.md template)
- [x] 03-02-PLAN.md -- Structure visualization commands (plot-graph enhancement, timeline, theme-tracker, subplot-map, outline)
- [x] 03-03-PLAN.md -- Structure management commands (add/insert/remove/split/merge/reorder-unit) + CONSTRAINTS.json updates
- [x] 03-04-PLAN.md -- Phase 3 test suite validating all commands, templates, and CONSTRAINTS.json entries

### Phase 4: Quality & Manuscript Completion
**Goal**: Writers can polish their manuscript to professional quality and generate all publication-ready front and back matter
**Depends on**: Phase 3 (character data needed for dialogue audit, world data for continuity)
**Requirements**: QUAL-01, QUAL-02, QUAL-03, QUAL-04, QUAL-05, QUAL-06, QUAL-07, QUAL-08, QUAL-09, QUAL-10, PUB-01, PUB-02, PUB-03, PUB-04, PUB-05, PUB-06, PUB-07, PUB-08, PUB-09
**Success Criteria** (what must be TRUE):
  1. Writer can run line edit and copy edit passes that catch prose quality issues, grammar errors, and inconsistencies
  2. Writer can audit dialogue for character voice differentiation and detect talking-head scenes
  3. Writer can verify voice fidelity against their style guide and check continuity across all drafted units
  4. Writer can generate complete front matter (19 elements) and back matter (12+ elements), individually or all at once
  5. Writer can generate marketing materials (blurb, synopsis, query letter, book proposal) from their completed manuscript
**Plans**: 6 plans

Plans:
- [x] 04-01-PLAN.md -- Core quality commands: line-edit, copy-edit, voice-check
- [x] 04-02-PLAN.md -- Specialized quality commands: dialogue-audit, pacing-analysis, sensitivity-review
- [x] 04-03-PLAN.md -- Quality completions: beta-reader/continuity-check enhancement, originality-check, polish meta-command, CONSTRAINTS.json updates
- [x] 04-04-PLAN.md -- Front matter and back matter generation commands
- [x] 04-05-PLAN.md -- Marketing materials: blurb, synopsis, query-letter, book-proposal, discussion-questions
- [x] 04-06-PLAN.md -- Phase 4 test suite validating all commands and CONSTRAINTS.json entries

### Phase 5: Export & Publishing
**Goal**: Writers can export their manuscript to any standard publishing format and package it for major platforms
**Depends on**: Phase 4 (manuscript must be complete with front/back matter before export)
**Requirements**: EXP-01, EXP-02, EXP-03, EXP-04, EXP-05, EXP-06, EXP-07, EXP-08, EXP-09, EXP-10, EXP-11, EXP-12, EXP-13, EXP-14, EXP-15, EXP-16, EXP-17
**Success Criteria** (what must be TRUE):
  1. Writer can export to markdown, DOCX (manuscript and formatted), and PDF (standard and print-ready) with correct formatting
  2. Writer can export to EPUB 3.0 that passes EPUBCheck validation, and to Fountain/FDX for screenplays and LaTeX for academic work
  3. Writer can generate KDP and IngramSpark packages with calculated spine width, correct trim sizes, and platform-compliant files
  4. Writer can bundle query and submission packages with all required materials
  5. Writer can run the publish wizard or autopilot-publish to chain the entire export pipeline with presets
**Plans**: 5 plans

Plans:
- [x] 05-01-PLAN.md -- Export templates (Typst, EPUB CSS, LaTeX) and export command with primary formats (markdown, docx, pdf, epub)
- [x] 05-02-PLAN.md -- Export command extended with secondary formats (fountain, fdx, latex) and platform packages (kdp, ingram, query, submission)
- [x] 05-03-PLAN.md -- manuscript-stats command and CONSTRAINTS.json updates for export-phase commands
- [x] 05-04-PLAN.md -- Publish wizard rewrite with presets and autopilot-publish command
- [x] 05-05-PLAN.md -- Phase 5 test suite validating all commands, templates, and CONSTRAINTS.json entries

### Phase 6: Illustration
**Goal**: Writers can generate detailed, consistent visual asset prompts for covers, interiors, and specialized formats
**Depends on**: Phase 3 (character and world data), Phase 5 (KDP dimensions for cover specs)
**Requirements**: ILL-01, ILL-02, ILL-03, ILL-04, ILL-05, ILL-06, ILL-07, ILL-08, ILL-09, ILL-10
**Success Criteria** (what must be TRUE):
  1. Writer can generate cover art prompts (front, spine, back, full wrap) with KDP trim sizes and calculated spine width
  2. Writer can create an art direction document and character reference sheets that ensure visual consistency across all illustrations
  3. Writer can generate scene-specific illustration prompts and chapter header/ornament designs
  4. Writer working on children's books, comics, or scripts can generate spread layouts, panel layouts, and storyboard frames
**Plans**: 4 plans

Plans:
- [x] 06-01-PLAN.md -- Art direction visual style bible and cover art prompt generator with KDP specs
- [x] 06-02-PLAN.md -- Character reference sheets, chapter header ornaments, and world map illustration prompts
- [x] 06-03-PLAN.md -- Scene illustration prompts, spread layouts, panel layouts, and storyboard frames
- [x] 06-04-PLAN.md -- Phase 6 test suite validating all commands, CONSTRAINTS.json entries, and decisions D-01 through D-05

### Phase 7: Translation & Localization
**Goal**: Writers can translate their manuscript into other languages with quality controls, glossary management, and proper text direction support
**Depends on**: Phase 5 (export pipeline for multi-language output), Phase 4 (voice-check pattern for translation quality)
**Requirements**: TRANS-01, TRANS-02, TRANS-03, TRANS-04, TRANS-05, TRANS-06, TRANS-07, TRANS-08
**Success Criteria** (what must be TRUE):
  1. Writer can translate their manuscript unit-by-unit with consistent terminology via glossary and translation memory
  2. Writer can flag cultural adaptation needs and verify translation quality through back-translation
  3. Writer can export translated editions in all target formats including RTL (Arabic, Hebrew) and CJK (Chinese, Japanese, Korean)
  4. Writer can run the full translation pipeline unattended via autopilot-translate
**Plans**: 4 plans

Plans:
- [x] 07-01-PLAN.md -- Translator agent and core translation commands (translate, translation-glossary, translation-memory)
- [x] 07-02-PLAN.md -- Translation quality and publishing commands (cultural-adaptation, back-translate, multi-publish)
- [x] 07-03-PLAN.md -- Autopilot-translate, RTL/CJK template support, and CONSTRAINTS.json updates
- [x] 07-04-PLAN.md -- Phase 7 test suite validating all commands, CONSTRAINTS.json entries, and decisions D-01 through D-05

### Phase 8: Collaboration, Platform & Sacred
**Goal**: Scriven supports team workflows, runs on all major AI coding agents, and provides deep sacred/historical text capabilities
**Depends on**: Phase 7 (sacred translation depends on translation pipeline), Phase 5 (collaboration needs export for comparison)
**Requirements**: COLLAB-01, COLLAB-02, COLLAB-03, COLLAB-04, COLLAB-05, COLLAB-06, COLLAB-07, COLLAB-08, RUNTIME-01, RUNTIME-02, RUNTIME-03, RUNTIME-04, RUNTIME-05, RUNTIME-06, RUNTIME-07, SACRED-01, SACRED-02, SACRED-03, SACRED-04, SACRED-05, SACRED-06, SACRED-07, SACRED-08, SACRED-09
**Success Criteria** (what must be TRUE):
  1. Writer can create, switch, compare, and merge revision tracks with writer-friendly conflict resolution
  2. Editor-writer workflow supports notes, proposals, and accept/reject changes; co-writing tracks merge with continuity checking
  3. Scriven installs and runs on Codex CLI, OpenCode, GitHub Copilot, Windsurf, and Antigravity in addition to existing runtimes
  4. Writer profile persists across sessions, manager command center handles multi-work management, and utility commands (health, fast, notes) work
  5. Sacred work types (13 types) function with tradition-native vocabulary, 10 voice registers, sacred-exclusive commands, and sacred translation pipeline
**Plans**: 5 plans

Plans:
- [x] 08-01-PLAN.md -- Revision track command with 6 subcommands (create, list, switch, compare, merge, propose)
- [x] 08-02-PLAN.md -- Editor-writer workflow and co-writing parallel track support
- [x] 08-03-PLAN.md -- Multi-runtime installer, writer profile persistence, manager, health, and utility commands
- [x] 08-04-PLAN.md -- Sacred-exclusive commands, voice registers, discuss categories, and command adaptations
- [x] 08-05-PLAN.md -- Sacred translation pipeline, tradition-aware front/back matter, sacred config schema, and test suite

</details>

<details>
<summary>v1.1 Generic Platform Support (Phase 9) - SHIPPED 2026-04-07</summary>

- [x] **Phase 9: Generic Platform Support** - SKILL.md installer path for platforms without command directories

### Phase 9: Generic Platform Support
**Goal**: Scriven installs and runs on any AI agent platform, including those without dedicated command directories, via a consolidated SKILL.md manifest
**Depends on**: Phase 8 (extends existing multi-runtime installer)
**Requirements**: PLAT-01, PLAT-02, PLAT-03, PLAT-04, PLAT-05, PLAT-06
**Success Criteria** (what must be TRUE):
  1. User on a skill-file platform (Manus or unknown agent) can install Scriven and receive a working SKILL.md manifest that lists all available `/scr:*` commands with descriptions and trigger patterns
  2. Installer automatically detects the user's platform type and routes to the correct strategy (command-directory or skill-file) without requiring manual configuration beyond selecting "Generic" for unrecognized platforms
  3. Tests validate the generic SKILL.md installer path produces correct output alongside existing command-directory tests
**Plans**: 2 plans

Plans:
- [x] 09-01-PLAN.md -- Installer refactor: type classification, SKILL.md generator, Manus skill-file path, Generic option
- [x] 09-02-PLAN.md -- Test suite for generic SKILL.md installer path

</details>

### v1.2 Documentation (In Progress)

**Milestone Goal:** Create complete documentation suite -- README, guides, command reference, and contributor docs -- verified against the live codebase.

- [x] **Phase 10: Core Documentation** - README, getting started guide, and complete command reference (completed 2026-04-07)
- [x] **Phase 11: Feature & Domain Guides** - Work types, Voice DNA, publishing, sacred text, and translation guides (completed 2026-04-07)
- [x] **Phase 12: Developer Docs & Verification** - Contributor guide, architecture overview, and codebase verification pass (completed 2026-04-07)

## Phase Details

### Phase 10: Core Documentation
**Goal**: A new user can find Scriven, understand what it does, install it, and look up any command without leaving the docs
**Depends on**: Phase 9 (all features must be built before documenting them)
**Requirements**: DOC-01, DOC-02, DOC-03
**Success Criteria** (what must be TRUE):
  1. README.md explains what Scriven is, lists supported runtimes and key features, and links to every guide -- a visitor understands the project in under 60 seconds
  2. Getting Started guide walks a user from zero to a drafted scene in 10 minutes using `npx scriven@latest`, `/scr:new-work`, `/scr:discuss`, and `/scr:draft`
  3. Command reference documents all 96+ commands organized by category with usage, flags, examples, prerequisites, and work-type adaptations
**Plans**: 3 plans

Plans:
- [x] 10-01-PLAN.md — Rewrite README.md as documentation hub
- [x] 10-02-PLAN.md — Getting Started guide (install to first draft in 10 minutes)
- [x] 10-03-PLAN.md — Complete command reference (101 commands across 14 categories)

### Phase 11: Feature & Domain Guides
**Goal**: Users working with specific Scriven capabilities have dedicated guides that explain concepts, workflows, and configuration for each feature domain
**Depends on**: Phase 10 (README and command reference provide the foundation that guides link back to)
**Requirements**: DOC-04, DOC-05, DOC-06, DOC-07, DOC-08
**Success Criteria** (what must be TRUE):
  1. A user choosing a work type can look up how it adapts Scriven's vocabulary, hierarchy, available commands, and context files across all 50+ work types
  2. A user tuning their voice profile can follow the Voice DNA guide to understand the 15+ dimensions, run voice-test calibration, and configure sacred voice registers
  3. A user ready to publish can follow the publishing guide through all 13 export formats, platform-specific packages (KDP, IngramSpark), and the publish wizard presets
  4. A user working with sacred texts or translations can find dedicated guides covering sacred work types, voice registers, translation pipeline, glossary management, and RTL/CJK support
**Plans**: 3 plans

Plans:
- [x] 11-01-PLAN.md — Work Types Guide and Voice DNA Guide
- [x] 11-02-PLAN.md — Publishing Pipeline Guide and Translation Guide
- [x] 11-03-PLAN.md — Sacred Text Guide

### Phase 12: Developer Docs & Verification
**Goal**: Contributors know how to extend Scriven, understand its architecture, and all documentation is verified accurate against the live codebase
**Depends on**: Phase 11 (all user-facing docs must exist before the verification pass can check them)
**Requirements**: DOC-09, DOC-10, DOC-11
**Success Criteria** (what must be TRUE):
  1. A contributor can follow the contributor guide to add a new command, agent, work type, or export format by following documented patterns with examples
  2. A developer can read the architecture overview and understand the skill system design, CONSTRAINTS.json schema, file structure, agent orchestration, and fresh-context-per-unit pattern
  3. Every documentation file has been verified against the live codebase -- no references to nonexistent commands, flags, files, or stale information
**Plans**: 2 plans

Plans:
- [x] 12-01-PLAN.md -- Contributor guide and architecture overview (DOC-09, DOC-10)
- [x] 12-02-PLAN.md -- Codebase verification pass for all documentation (DOC-11)

## Progress

**Execution Order:**
Phases execute in numeric order: 10 -> 11 -> 12

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. MVP Polish | v1.0 | 3/3 | Complete | 2026-04-07 |
| 2. Writer Experience | v1.0 | 4/4 | Complete | 2026-04-07 |
| 3. Creative Toolkit | v1.0 | 4/4 | Complete | 2026-04-07 |
| 4. Quality & Manuscript Completion | v1.0 | 6/6 | Complete | 2026-04-07 |
| 5. Export & Publishing | v1.0 | 5/5 | Complete | 2026-04-07 |
| 6. Illustration | v1.0 | 4/4 | Complete | 2026-04-07 |
| 7. Translation & Localization | v1.0 | 4/4 | Complete | 2026-04-07 |
| 8. Collaboration, Platform & Sacred | v1.0 | 5/5 | Complete | 2026-04-07 |
| 9. Generic Platform Support | v1.1 | 2/2 | Complete | 2026-04-07 |
| 10. Core Documentation | v1.2 | 3/3 | Complete    | 2026-04-07 |
| 11. Feature & Domain Guides | v1.2 | 3/3 | Complete    | 2026-04-07 |
| 12. Developer Docs & Verification | v1.2 | 2/2 | Complete    | 2026-04-07 |
