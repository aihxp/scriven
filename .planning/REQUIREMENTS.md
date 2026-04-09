# Requirements: Scriven v1.4 — Perplexity & Technical Writing

**Defined:** 2026-04-09
**Core Value:** Drafted prose sounds like the writer, not like AI.

## v1 Requirements

### Perplexity Runtime Support

- [ ] **RUNTIME-05**: User can choose Perplexity Desktop as an installer target with a documented install strategy that matches the real platform surface
- [ ] **RUNTIME-06**: User can see Perplexity Desktop support level, evidence, and verification status without it being overstated as host-runtime parity
- [ ] **RUNTIME-07**: User can distinguish Perplexity Desktop support from broader Perplexity support, with unsupported or not-yet-proven surfaces stated explicitly

### Technical Writing Work Types

- [ ] **TECHDOC-01**: User can start a project with a first-pass technical-writing work type chosen from a research-backed document family
- [ ] **TECHDOC-02**: User sees technical-writing-native hierarchy terms, file names, and command adaptations instead of fiction-centric defaults
- [ ] **TECHDOC-03**: User gets templates and planning context that fit technical-writing workflows such as guides, runbooks, references, or design specs
- [ ] **TECHDOC-04**: User can tell which current Scriven commands apply to technical-writing projects and which are hidden or renamed

### Verification & Docs

- [ ] **QA-03**: Maintainer can run tests that cover the Perplexity runtime additions and the technical-writing work-type surface
- [ ] **TRUST-04**: User can inspect docs that explain the new Perplexity support and technical-writing scope without stale counts or overclaims

## v2 Requirements

### Runtime Expansion

- **RUNTIME-04**: Maintainer can run runtime-specific smoke verification automatically across supported AI agent platforms
- **RUNTIME-08**: User can install Scriven into broader non-desktop Perplexity surfaces once an official supported runtime path exists

### Technical Writing Expansion

- **TECHDOC-05**: User can publish technical-writing projects to a docs-site or portal-oriented output beyond the current document exports
- **TECHDOC-06**: User can choose from a broader technical-writing catalog such as release notes, knowledge-base articles, onboarding courses, and compliance-heavy document packs

### Proof & Launch

- **PROOF-04**: User can inspect multiple genre-specific end-to-end demos beyond the core sample flow
- **TRUST-05**: User can inspect public launch evidence such as screenshots, walkthroughs, or case studies for each major workflow area

## Out of Scope

| Feature | Reason |
|---------|--------|
| Full docs-site generator | Too large for the first technical-writing milestone; document creation comes first |
| Perplexity parity claims across all surfaces | Current official evidence does not justify that claim |
| New npm runtime dependencies for Perplexity integration | Conflicts with Scriven's zero-runtime-dependency architecture |
| One generic `technical_writing` type with no subtypes | Too vague to produce good adaptive behavior |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| RUNTIME-05 | Phase 17 | Pending |
| RUNTIME-06 | Phase 17 | Pending |
| RUNTIME-07 | Phase 17 | Pending |
| TECHDOC-01 | Phase 18 | Pending |
| TECHDOC-02 | Phase 18 | Pending |
| TECHDOC-03 | Phase 18 | Pending |
| TECHDOC-04 | Phase 18 | Pending |
| QA-03 | Phase 19 | Pending |
| TRUST-04 | Phase 19 | Pending |

**Coverage:**
- v1 requirements: 9 total
- Mapped to phases: 9
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-09*
*Last updated: 2026-04-09 after milestone v1.4 definition*
