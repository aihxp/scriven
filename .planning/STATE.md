---
gsd_state_version: 1.0
milestone: v1.8
milestone_name: Command Surface Coherence
status: requirements
stopped_at: Defining v1.8 requirements and roadmap
last_updated: "2026-04-18T02:45:58.000Z"
last_activity: 2026-04-18
progress:
  total_phases: 3
  completed_phases: 0
  total_plans: 7
  completed_plans: 0
  percent: 0
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-18)

**Core value:** Drafted prose sounds like the writer, not like AI -- Voice DNA system loaded into every agent invocation.
**Current focus:** v1.8 Command Surface Coherence — defining requirements and roadmap

## Current Position

Phase: Not started (defining requirements)
Plan: —
Status: Defining requirements
Last activity: 2026-04-18 — Milestone v1.8 started

Progress: [----------] 0%

## Performance Metrics

**Velocity:**

- Total plans completed: 104 (37 from v1.0, 2 from v1.1, 8 from v1.2, 9 from v1.3, 7 from v1.4, 2 unrecorded from v1.5, 6 from v1.6, 13 from v1.7)
- Latest shipped milestone v1.7: 7 phases, 26 plans, 1510 regression tests, zero new dependencies

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [v1.6 closeout]: Installer hardening + 1067 regression tests lock the reliability baseline v1.7 builds on
- [v1.7 research]: Cross-domain platform research at `.planning/tmp/cross-domain-platforms-research.md` is the canonical input for requirements
- [v1.7 architecture]: Introduce `templates/sacred/` and `templates/platforms/` as drop-in extension points; replace hard-coded Bible/KDP assumptions with `tradition:` and `platform:` spec keys
- [v1.7 scope]: Publisher LaTeX classes (IEEEtran/acmart/llncs/elsarticle/apa7) stay user-installed — Scriven ships only thin wrappers to preserve zero-dependency architecture
- [v1.7 sequencing]: Architectural shift (Phase 29) lands first so build pipelines, tradition profiles, and platform-aware templates can plug into the new structure without core-template edits
- [Phase 29]: Placeholder manifests declare full schema shape with null values + status: placeholder so Plan 03 validator can target a stable shape without waiting for Phase 32/33 content
- [Phase 29]: Legacy sacred-scaffold markdown files (COSMOLOGY.md etc.) coexist with new tradition subdirectories — distinct purposes (project-scaffold templates vs tradition profiles), documented in README
- [Phase 29]: Plan 29-02: OLD sacred_config_schema.tradition.values taxonomy preserved byte-identical alongside new architectural_profiles.traditions (lineage profiles); they coexist — collapse deferred
- [Phase 29]: Plan 29-03: lib/architectural-profiles.js uses directory-listing intersection with manifest.yaml presence (not _seeded whitelist) — contributor drop-ins extend accepted tradition/platform set at runtime with zero code/data edit
- [Phase 29]: Plan 29-04: Fixture slugs use 'zzz-test-' prefix (not '__test-...__') to satisfy SLUG_PATTERN ^[a-z][a-z0-9-]*$ from Plan 03 — Rule 1 auto-fix documented in SUMMARY
- [Phase 29]: Plan 29-04: 54-test regression suite locks ARCH-01..ARCH-05 as machine-executable contracts; downstream Phases 30-35 can only break Phase 29 by failing npm test
- [Phase 30]: Cleanup dry-run by default; `--apply` for in-place; whole .manuscript/drafts/ scope; in-session diff summary
- [Phase 30]: Validate blocking markers: [Fill in + Alternate N only (not {{VAR}}); file:line output; explicit pass confirmation
- [Phase 30]: Export gate injected as STEP 1.5 in export.md and publish.md; fail-fast before tool detection; --skip-validate with visible warning
- [Phase 30]: Alternate block boundary: any blank line stops the block (not just blank lines before another Alternate header)
- [Phase 31]: 5 personalization elements (dedication, epigraph, foreword, preface, acknowledgments) get scaffold: true YAML frontmatter; 4 GENERATE elements (half-title, title-page, copyright, TOC) do not
- [Phase 31]: Export/publish STEP 1.6 silently excludes scaffold:true files + shows note; STEP 1.6b auto-refreshes GENERATE elements when WORK.md is newer
- [Phase 31]: 1.6b guards against missing front-matter/ directory before attempting timestamp comparison

### Pending Todos

- Author detailed plans for Phases 36-38
- Resolve sacred command namespace policy before runtime/doc rewrites begin
- Decide whether adapted names become real runtime wrappers or display-only vocabulary

### Blockers/Concerns

None.

## Session Continuity

Last session: 2026-04-18T02:45:58.000Z
Stopped at: Defining v1.8 requirements and roadmap
Resume file: None
