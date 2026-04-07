# Requirements: Scriven v1.2 — Documentation

**Defined:** 2026-04-07
**Core Value:** Drafted prose sounds like the writer, not like AI -- Voice DNA system loaded into every agent invocation.

## v1.2 Requirements

### Core Documentation

- [x] **DOC-01**: Enhanced README.md with complete feature overview, quick start (3 commands), supported runtimes, philosophy, and links to all guides
- [x] **DOC-02**: Getting Started guide -- install to first draft in 10 minutes, covering `npx scriven@latest`, `/scr:new-work`, `/scr:discuss`, `/scr:draft`
- [ ] **DOC-03**: Complete command reference -- all 96+ commands organized by category with usage, flags, examples, prerequisites, and work-type adaptations

### Feature Guides

- [ ] **DOC-04**: Work type guide -- how each of 50+ work types adapts Scriven's vocabulary, hierarchy, commands, and context files
- [ ] **DOC-05**: Voice DNA guide -- how STYLE-GUIDE.md works, 15+ dimensions, how to tune voice, voice-test calibration, sacred registers
- [ ] **DOC-06**: Publishing pipeline guide -- export formats (13), publish wizard, presets, KDP/IngramSpark packages, submission packages
- [ ] **DOC-07**: Sacred text guide -- 13 work types, 10 voice registers, 8 exclusive commands, sacred translation, tradition-aware front/back matter
- [ ] **DOC-08**: Translation guide -- translation pipeline, glossary management, translation memory, cultural adaptation, back-translation, RTL/CJK

### Developer Documentation

- [ ] **DOC-09**: Contributor guide -- how to add commands (pattern), agents (pattern), work types (CONSTRAINTS.json), templates, and export formats
- [ ] **DOC-10**: Architecture overview -- skill system design, CONSTRAINTS.json schema, file structure, agent orchestration, fresh-context-per-unit pattern

### Quality

- [ ] **DOC-11**: All documentation verified against live codebase -- no references to nonexistent commands, flags, or files

## Out of Scope

| Feature | Reason |
|---------|--------|
| API documentation | Scriven has no API -- it's a skill system |
| Video tutorials | Text-first, videos can come later |
| Internationalized docs | English-first, translations can follow |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DOC-01 | Phase 10 | Complete |
| DOC-02 | Phase 10 | Complete |
| DOC-03 | Phase 10 | Pending |
| DOC-04 | Phase 11 | Pending |
| DOC-05 | Phase 11 | Pending |
| DOC-06 | Phase 11 | Pending |
| DOC-07 | Phase 11 | Pending |
| DOC-08 | Phase 11 | Pending |
| DOC-09 | Phase 12 | Pending |
| DOC-10 | Phase 12 | Pending |
| DOC-11 | Phase 12 | Pending |

**Coverage:**
- v1.2 requirements: 11 total
- Mapped to phases: 11
- Unmapped: 0

---
*Requirements defined: 2026-04-07*
*Last updated: 2026-04-07 after v1.2 roadmap creation*
