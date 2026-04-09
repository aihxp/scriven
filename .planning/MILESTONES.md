# Project Milestones: Scriven

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
