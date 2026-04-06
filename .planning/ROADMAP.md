# Roadmap: Scriven

## Overview

Scriven goes from a working MVP (28 commands, 5 agents, installer) to a complete creative writing, publishing, and translation pipeline. The journey moves through eight phases: finishing the installable package, making it writer-friendly, building the creative data layer, polishing manuscripts to professional quality, exporting to every publishing format, adding visual assets, reaching new language markets, and finally extending to collaboration, additional runtimes, and sacred text support. Each phase delivers a coherent capability that unblocks the next.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: MVP Polish** - Ship installable npm package with demo, tests, and working npx experience
- [ ] **Phase 2: Writer Experience** - Autopilot drafting modes, writer-friendly git, and session management
- [ ] **Phase 3: Creative Toolkit** - Character management, world-building, and narrative structure tools
- [ ] **Phase 4: Quality & Manuscript Completion** - Editing tools, quality gates, and front/back matter generation
- [ ] **Phase 5: Export & Publishing** - Multi-format export pipeline with Pandoc/Typst and publishing wizard
- [ ] **Phase 6: Illustration** - Cover art, interior illustration, and visual asset prompt generation
- [ ] **Phase 7: Translation & Localization** - Multi-language translation pipeline with glossary, memory, and RTL/CJK support
- [ ] **Phase 8: Collaboration, Platform & Sacred** - Revision tracks, multi-runtime support, and sacred text features

## Phase Details

### Phase 1: MVP Polish
**Goal**: Writers can discover, install, and try Scriven in under 5 minutes with a compelling demo experience
**Depends on**: Nothing (first phase -- MVP already built)
**Requirements**: MVP-01, MVP-02, MVP-03, MVP-04, MVP-05, MVP-06
**Success Criteria** (what must be TRUE):
  1. Running `npx scriven@latest` on a clean machine installs and launches successfully
  2. Demo project shows a complete watchmaker story with voice profile, scenes, and editor notes that a new user can explore
  3. Test suite catches broken constraints, invalid command structure, and installer failures before publishing
  4. Package publishes to npm without errors and meets registry standards
**Plans**: TBD

Plans:
- [ ] 01-01: TBD
- [ ] 01-02: TBD
- [ ] 01-03: TBD

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
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD
- [ ] 02-03: TBD
- [ ] 02-04: TBD

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
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD
- [ ] 03-03: TBD

### Phase 4: Quality & Manuscript Completion
**Goal**: Writers can polish their manuscript to professional quality and generate all publication-ready front and back matter
**Depends on**: Phase 3 (character data needed for dialogue audit, world data for continuity)
**Requirements**: QUAL-01, QUAL-02, QUAL-03, QUAL-04, QUAL-05, QUAL-06, QUAL-07, QUAL-08, QUAL-09, PUB-01, PUB-02, PUB-03, PUB-04, PUB-05, PUB-06, PUB-07, PUB-08, PUB-09
**Success Criteria** (what must be TRUE):
  1. Writer can run line edit and copy edit passes that catch prose quality issues, grammar errors, and inconsistencies
  2. Writer can audit dialogue for character voice differentiation and detect talking-head scenes
  3. Writer can verify voice fidelity against their style guide and check continuity across all drafted units
  4. Writer can generate complete front matter (19 elements) and back matter (12+ elements), individually or all at once
  5. Writer can generate marketing materials (blurb, synopsis, query letter, book proposal) from their completed manuscript
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD
- [ ] 04-03: TBD
- [ ] 04-04: TBD

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
**Plans**: TBD

Plans:
- [ ] 05-01: TBD
- [ ] 05-02: TBD
- [ ] 05-03: TBD
- [ ] 05-04: TBD

### Phase 6: Illustration
**Goal**: Writers can generate detailed, consistent visual asset prompts for covers, interiors, and specialized formats
**Depends on**: Phase 3 (character and world data), Phase 5 (KDP dimensions for cover specs)
**Requirements**: ILL-01, ILL-02, ILL-03, ILL-04, ILL-05, ILL-06, ILL-07, ILL-08, ILL-09, ILL-10
**Success Criteria** (what must be TRUE):
  1. Writer can generate cover art prompts (front, spine, back, full wrap) with KDP trim sizes and calculated spine width
  2. Writer can create an art direction document and character reference sheets that ensure visual consistency across all illustrations
  3. Writer can generate scene-specific illustration prompts and chapter header/ornament designs
  4. Writer working on children's books, comics, or scripts can generate spread layouts, panel layouts, and storyboard frames
**Plans**: TBD
**UI hint**: yes

Plans:
- [ ] 06-01: TBD
- [ ] 06-02: TBD
- [ ] 06-03: TBD

### Phase 7: Translation & Localization
**Goal**: Writers can translate their manuscript into other languages with quality controls, glossary management, and proper text direction support
**Depends on**: Phase 5 (export pipeline for multi-language output), Phase 4 (voice-check pattern for translation quality)
**Requirements**: TRANS-01, TRANS-02, TRANS-03, TRANS-04, TRANS-05, TRANS-06, TRANS-07, TRANS-08
**Success Criteria** (what must be TRUE):
  1. Writer can translate their manuscript unit-by-unit with consistent terminology via glossary and translation memory
  2. Writer can flag cultural adaptation needs and verify translation quality through back-translation
  3. Writer can export translated editions in all target formats including RTL (Arabic, Hebrew) and CJK (Chinese, Japanese, Korean)
  4. Writer can run the full translation pipeline unattended via autopilot-translate
**Plans**: TBD

Plans:
- [ ] 07-01: TBD
- [ ] 07-02: TBD
- [ ] 07-03: TBD

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
**Plans**: TBD

Plans:
- [ ] 08-01: TBD
- [ ] 08-02: TBD
- [ ] 08-03: TBD
- [ ] 08-04: TBD
- [ ] 08-05: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. MVP Polish | 0/3 | Not started | - |
| 2. Writer Experience | 0/4 | Not started | - |
| 3. Creative Toolkit | 0/3 | Not started | - |
| 4. Quality & Manuscript Completion | 0/4 | Not started | - |
| 5. Export & Publishing | 0/4 | Not started | - |
| 6. Illustration | 0/3 | Not started | - |
| 7. Translation & Localization | 0/3 | Not started | - |
| 8. Collaboration, Platform & Sacred | 0/5 | Not started | - |
