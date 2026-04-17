# Project Milestones: Scriven

## v1.7 Last Mile (Shipped: 2026-04-17)

**Delivered:** Closed the production edge — shipped real build pipelines, cross-domain templates, sacred tradition profiles, and academic LaTeX wrappers so Scriven reaches publication-ready output for any supported work type, not just book prose.

**Phases completed:** 29-35 (7 phases, 23 plans)

**Key accomplishments:**

- Shipped `templates/sacred/<tradition>/` + `templates/platforms/<platform>/` drop-in extension points with tradition/platform spec keys (Phase 29)
- Shipped `/scr:cleanup` scaffold-stripping and `/scr:validate` pre-export gate blocking unresolved markers (Phase 30)
- Shipped staged front-matter: auto-computable elements refresh on metadata change; scaffold:true elements excluded until writer opts in (Phase 31)
- Shipped `/scr:build-ebook` (Pandoc EPUB, EAA accessible) + `/scr:build-print` (Pandoc+Typst PDF, KDP/IngramSpark guardrails) with 8 platform manifests (Phase 32)
- Shipped 10 sacred tradition profiles (Catholic, Orthodox, Tewahedo, Protestant, Jewish, Islamic-Hafs/Warsh, Pali, Tibetan, Sanskrit) with approval blocks, font stacks, RTL, verse numbering (Phase 33)
- Shipped 6 cross-domain templates: stage play (Samuel French), picture book (8.75×8.75 bleed), fixed-layout EPUB, Smashwords DOCX, chapbook (saddle-stitch), poetry submission DOCX (Phase 34)
- Shipped 5 academic LaTeX wrappers (IEEEtran, acmart, llncs, elsarticle, apa7) with kpsewhich pre-flight detection and tlmgr install guidance (Phase 35)

**Stats:**

- 166 files changed, 26,275 insertions, 3,248 deletions
- 7 phases, 23 plans, 1510 regression tests (from 1067 baseline)
- Zero new npm dependencies
- Milestone completed 2026-04-17 (single day)

---

## v1.6 Installer Hardening (Shipped: 2026-04-16)

**Delivered:** Correctness pass on the Scriven installer based on cross-referencing GSD releases v1.33–v1.36. Fixed frontmatter parsing fragility, non-atomic writes, destructive reinstall behavior, incomplete command-ref rewriting, and lack of settings validation — all while preserving the zero-dependency architecture.

**Phases completed:** 23-28 (6 plans total)

**Key accomplishments:**

- Shipped `atomicWriteFileSync` + `cleanOrphanedTempFiles` with fsync durability — no more truncated files on SIGKILL
- Rewrote `readFrontmatterValue` as a line-based parser scoped to the `---` block with first-colon splitting
- Built settings schema infrastructure (`SETTINGS_SCHEMA`, `validateSettings`, `migrateSettings`, `readSettings`) with migration-before-validation ordering
- Replaced destructive template/settings wipe with `sha256File` + `copyDirWithPreservation` + `mergeSettings` — user customizations survive reinstall
- Added code-block-aware rewriter and `generateCodexCommandContent` — Codex command files now use `$scr-*` with code blocks preserved
- Locked all hardening behaviors with 88 new regression tests + end-to-end smoke test + 12-row traceability matrix

**Stats:**

- 38 files changed, 6049 insertions, 1211 deletions
- 6 phases, 6 plans, 12 milestone requirements
- Full test suite: 1067/1067 passing
- Zero new npm dependencies

**Git range:** `55caac8` → `3f4daff`

**What's next:** No new milestone is defined yet. The next step is to choose the next product focus and start a fresh milestone.

---

## v1.4 Perplexity & Technical Writing (Shipped: 2026-04-09)

**Delivered:** A trust-first expansion that added Perplexity Desktop as a guided runtime target, introduced a first-pass technical-writing family, and locked both surfaces into docs, packaging, and regression coverage.

**Phases completed:** 17-19 (7 plans total)

**Key accomplishments:**

- Shipped Perplexity Desktop as a guided local-MCP installer target instead of overclaiming slash-command parity
- Extended `docs/runtime-support.md`, onboarding, and troubleshooting to explain the Perplexity Desktop boundary clearly
- Added a dedicated `technical` group with four work types: technical guide, runbook, API reference, and design spec
- Shipped technical-native scaffolding through `templates/technical/`, `/scr:new-work`, and adapted command names
- Updated launch, guide, contributor, and instruction docs to the new 50-work-type and 9-group truth surface
- Added regression and package checks that protect technical template shipping, count alignment, and the Perplexity trust surface

**Stats:**

- 64 files changed, 2758 insertions, 141 deletions
- 3 phases, 7 plans, 9 milestone requirements
- Milestone work landed on 2026-04-09

**Git range:** `5385856` → `3b514c4`

**What's next:** No new milestone is defined yet. The next step is to choose the next product focus and start a fresh milestone.

---

## v1.3 Trust & Proof (Shipped: 2026-04-09)

**Delivered:** A trust-first hardening pass that aligned launch claims, runtime policy, proof artifacts, release-time regression coverage, and post-ship closeout work around Scriven's voice-preservation wedge.

**Phases completed:** 13-16 (9 plans total)

**Key accomplishments:**

- Shipped `docs/shipped-assets.md` as the canonical inventory for bundled export templates and trust-critical launch files
- Shipped `docs/runtime-support.md` and unified the installer baseline at Node 20+ / `>=20.0.0`
- Shipped packaged proof artifacts for the watchmaker flow and Voice DNA before/after bundle
- Reframed launch and onboarding docs around proof-first, voice-preserving longform writing
- Added automated trust-regression and package dry-run checks that now gate release through `npm test`
- Fixed review findings across the v1.3 trust surface and historical publishing/runtime command paths without regressing the shipped state
- Closed the milestone with full phase-level validation and retroactive security records across phases 13-16, then prepared `scriven-cli@1.3.4` from that hardened baseline

**Stats:**

- 265 files changed, 5993 insertions, 22680 deletions
- 4 phases, 9 plans, 21 tasks
- Milestone work and closeout landed across 2026-04-07 → 2026-04-09

**Git range:** `b3ca8ca` → `d0f93d1`

**What's next:** No new milestone is defined yet. The next step is to choose the next product focus and start a fresh milestone.

---
