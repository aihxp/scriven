# Requirements: Scriven v1.3 — Trust & Proof

**Defined:** 2026-04-07
**Core Value:** Drafted prose sounds like the writer, not like AI -- Voice DNA system loaded into every agent invocation.

## v1.3 Requirements

### Launch Surface Integrity

- [x] **TRUST-01**: User sees only top-level product claims that are supported by the current repo surface and shipped assets
- [x] **TRUST-02**: User can follow export documentation and command guidance without encountering missing template files or undocumented fallbacks
- [x] **TRUST-03**: User can inspect a canonical shipped-asset inventory for export templates and trust-critical launch materials

### Runtime Credibility

- [x] **RUNTIME-01**: User sees a single, consistent minimum supported Node.js version across package metadata, installer guidance, and planning/docs
- [x] **RUNTIME-02**: User can inspect a runtime compatibility matrix that states install path, support level, and verification status for each claimed runtime
- [x] **RUNTIME-03**: User can distinguish verified runtime support from best-effort or generic compatibility

### Proof Artifacts

- [x] **PROOF-01**: User can inspect one end-to-end sample flow that demonstrates Scriven from setup through a credible writing or publishing outcome
- [x] **PROOF-02**: User can inspect a Voice DNA proof artifact that clearly shows how style guidance changes draft output
- [x] **PROOF-03**: User can inspect launch-facing examples that reinforce Scriven's wedge as voice-preserving, AI-native longform writing software

### Quality Gates

- [x] **QA-01**: Maintainer can run tests that catch missing trust-critical files, stale launch claims, and doc-to-asset mismatches before publish
- [x] **QA-02**: Maintainer can verify that packaged npm contents include the proof artifacts and shipped assets promised on the launch surface

## v2 Requirements

### Proof Expansion

- **PROOF-04**: User can inspect multiple genre-specific end-to-end demos beyond the core sample flow
- **RUNTIME-04**: Maintainer can run runtime-specific smoke verification automatically across supported AI agent platforms
- **TRUST-04**: User can inspect public launch evidence such as screenshots, walkthroughs, or case studies for each major workflow area

## Out of Scope

| Feature | Reason |
|---------|--------|
| New major writing features | This milestone is about credibility and proof, not breadth expansion |
| GUI or hosted dashboard for proof artifacts | Must preserve the pure skill/command architecture |
| Full CI automation across every claimed runtime | Valuable, but too large for this credibility-first milestone |
| Reworking Voice DNA fundamentals | Core value is established; this milestone proves it more clearly rather than redesigning it |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| TRUST-01 | Phase 13 | Complete (2026-04-08) |
| TRUST-02 | Phase 13 | Complete (2026-04-08) |
| TRUST-03 | Phase 13 | Complete (2026-04-08) |
| RUNTIME-01 | Phase 14 | Complete (2026-04-08) |
| RUNTIME-02 | Phase 14 | Complete (2026-04-08) |
| RUNTIME-03 | Phase 14 | Complete (2026-04-08) |
| PROOF-01 | Phase 15 | Complete (2026-04-08) |
| PROOF-02 | Phase 15 | Complete (2026-04-08) |
| PROOF-03 | Phase 15 | Complete (2026-04-08) |
| QA-01 | Phase 16 | Complete (2026-04-08) |
| QA-02 | Phase 16 | Complete (2026-04-08) |

**Coverage:**
- v1.3 requirements: 11 total
- Mapped to phases: 11
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-07*
*Last updated: 2026-04-08 after Phase 16 completion*
