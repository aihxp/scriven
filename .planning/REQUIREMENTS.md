# Requirements: Scriven v1.8 Command Surface Coherence

**Status:** Defined 2026-04-18 — planning.

**Goal:** Make Scriven's command surface truthful and runtime-native so every documented command name is runnable in the host that advertises it.

**Research input:** Review findings from 2026-04-17 plus command-surface precedent from [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done), which documents Claude-facing commands as flat `/gsd-*` names such as `/gsd-help`, `/gsd-progress`, and `/gsd-autonomous`.

---

## v1.8 Requirements

### Canonical Command Surface

- [ ] **CMD-01**: Sacred-exclusive commands must expose one canonical installed runtime name per host surface, and all command files, docs, and generated manifests must reference that real installed name
- [ ] **CMD-02**: Installer/runtime inventory generation must come from one canonical command-source model so sacred commands cannot appear both as phantom top-level commands and namespaced commands in the same runtime
- [ ] **CMD-03**: Cross-file validation must detect command references that do not resolve against the installed runtime surface for the target host

### Adapted Alias Truthfulness

- [ ] **CMD-04**: Adapted command names shown to writers (`/scr:new-figure`, `/scr:procedure-map`, `/scr:peer-review`, `/scr:scholarly-review`, etc.) must either install runnable wrappers/aliases or be reframed as descriptive adaptations rather than direct invocation strings
- [ ] **CMD-05**: Help, router, sacred docs, work-type docs, and command reference must stay aligned on whether adapted names are runnable commands, conceptual renames, or display-only vocabulary

### Claude Flat Command Surface

- [ ] **CMD-06**: Claude Code must use one flat `/scr-*` command surface consistently across installer output, docs, examples, and upgrade guidance
- [ ] **CMD-07**: Claude-facing command examples for autopilot/autonomous-style flows must use the flat `/scr-*` surface consistently, matching the runtime-native pattern Scriven already claims in README/getting-started
- [ ] **CMD-08**: Any remaining Claude-specific `/scr:*` examples in launch, guide, or reference docs must be normalized or explicitly marked as non-Claude surfaces

### Regression and Contributor Guidance

- [ ] **CMD-09**: Regression tests must cover nested sacred command discovery plus dead-reference detection across `commands/`, `docs/`, and installer-generated manifests
- [ ] **CMD-10**: Contributor/runtime docs must clearly explain the naming contract by host: Claude uses `/scr-*`, Codex uses `$scr-*`, and any namespaced or adapted forms must specify whether they are installed or conceptual

---

## Out of Scope

- Rewriting command behavior itself beyond what is required to make the advertised invocation surface truthful
- Introducing a compiled command dispatcher or runtime dependency to solve naming indirection
- Broad new product features unrelated to command-surface consistency
- Cross-runtime parity claims beyond the install surfaces Scriven can actually verify

## Traceability

REQ-ID → planned phase mapping (v1.8 Command Surface Coherence, Phases 36-38):

| Requirement | Phase | Status |
|-------------|-------|--------|
| CMD-01 | Phase 36 | Pending |
| CMD-02 | Phase 36 | Pending |
| CMD-03 | Phase 38 | Pending |
| CMD-04 | Phase 37 | Pending |
| CMD-05 | Phase 38 | Pending |
| CMD-06 | Phase 37 | Pending |
| CMD-07 | Phase 37 | Pending |
| CMD-08 | Phase 38 | Pending |
| CMD-09 | Phase 38 | Pending |
| CMD-10 | Phase 38 | Pending |

**Coverage:** 10/10 v1.8 requirements mapped. No orphans, no duplicates.

---

*Defined: 2026-04-18*
