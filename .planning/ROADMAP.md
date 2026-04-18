# Roadmap: Scriven

## Current Status

- Active milestone: **v2.0 Publishing Cover Packaging**
- Latest shipped milestone: **v1.9 Workflow Contract Integrity** (completed 2026-04-18)
- Current repo state: **post-v1.9 hardening merged, 1580/1580 tests passing**
- Next step: plan and execute **Phase 42**

## Milestones

- [x] **v1.0 MVP** - Phases 1-8 (shipped 2026-04-07)
- [x] **v1.1 Generic Platform Support** - Phase 9 (shipped 2026-04-07)
- [x] **v1.2 Documentation** - Phases 10-12 (shipped 2026-04-07)
- [x] **v1.3 Trust & Proof** - Phases 13-16 (shipped 2026-04-09)
- [x] **v1.4 Perplexity & Technical Writing** - Phases 17-19 (shipped 2026-04-09) — [details](MILESTONES.md)
- [x] **v1.5 Runtime Install Reliability** - Phases 20-22 (shipped 2026-04-09)
- [x] **v1.6 Installer Hardening** - Phases 23-28 (shipped 2026-04-16) — [archive](milestones/v1.6-ROADMAP.md)
- [x] **v1.7 Last Mile** - Phases 29-35 (shipped 2026-04-17) — [archive](milestones/v1.7-ROADMAP.md)
- [x] **v1.8 Command Surface Coherence** - Phases 36-38 (shipped 2026-04-18) — [archive](milestones/v1.8-ROADMAP.md)
- [x] **v1.9 Workflow Contract Integrity** - Phases 39-41 (shipped 2026-04-18) — [archive](milestones/v1.9-ROADMAP.md)
- [ ] **v2.0 Publishing Cover Packaging** - Phases 42-44 (active)

## Archive Notes

- Detailed milestone summaries live in [MILESTONES.md](MILESTONES.md).
- Detailed archived roadmap snapshots live under `.planning/milestones/`.
- Archived phase artifacts now live under `.planning/milestones/v1.7-phases/`, `.planning/milestones/v1.8-phases/`, and `.planning/milestones/v1.9-phases/`.
- Additional post-archive hardening landed directly on the shipped v1.9 baseline; the new milestone starts from that hardened 1580-test baseline.

## Active Milestone: v2.0 Publishing Cover Packaging

### Phase 42: Cover Asset Contract

**Status:** Planned

**Goal:** Define the canonical `.manuscript/build/` cover asset layout and designer handoff contract for ebook, paperback, and hardcover deliverables.

**Requirements:** COV-01, COV-02, COV-03

### Phase 43: Print Template Truth

**Status:** Planned

**Goal:** Make Scriven's publishing guidance truthful for ebook, paperback, and hardcover specs, including PDF/X-1a, CMYK, bleed, and template-driven spine handling.

**Requirements:** COV-04, COV-05, COV-06, COV-07

### Phase 44: Build Integration and Validation

**Status:** Planned

**Goal:** Wire the cover deliverables into the build/export surface, align docs with the live contract, and add regression coverage so the packaging model stays honest.

**Requirements:** COV-08, COV-09, COV-10, COV-11
