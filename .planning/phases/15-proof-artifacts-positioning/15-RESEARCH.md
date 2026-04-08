---
phase: 15-proof-artifacts-positioning
researched: 2026-04-08
status: complete
requirements:
  - PROOF-01
  - PROOF-02
  - PROOF-03
---

# Phase 15 Research: Proof Artifacts & Positioning

## Question

What proof artifacts should Scriven ship so prospective users can inspect concrete evidence of voice preservation, and how should launch-facing docs frame those artifacts around Scriven's wedge?

## Current Repo Truth

### The repo already contains a strong sample corpus

- `data/demo/.manuscript/` already ships a credible watchmaker short-story sample:
  - `WORK.md`, `OUTLINE.md`, `STYLE-GUIDE.md`, `CHARACTERS.md`, `THEMES.md`, `PLOT-GRAPH.md`, and `config.json`
  - four drafted scenes in `data/demo/.manuscript/drafts/body/`
  - one editor review in `data/demo/.manuscript/reviews/`
  - one planned-but-undrafted next scene in `data/demo/.manuscript/plans/`
- `commands/scr/demo.md` already describes that sample as the first hands-on proof experience.
- `docs/getting-started.md` already tells users the demo includes 4 drafted scenes, a full voice profile, one review, and one planned next scene.

**What this proves today:** Scriven already ships enough material to show a real writing workflow with setup context, voice profile, drafted output, review, and a clear next step.

**What is missing:** there is no single proof-oriented walkthrough that turns those scattered artifacts into one inspectable end-to-end story.

**Planning implication:** PROOF-01 should build on `data/demo/` rather than inventing a second showcase project.

### Voice DNA is well documented, but not yet demonstrated side by side

- `docs/voice-dna.md` explains the 15+ dimensions, calibration flow, and fresh-context architecture in detail.
- `commands/scr/voice-test.md` explains how Scriven should generate a 300-word calibration passage and ask whether it sounds like the writer.
- `agents/drafter.md` and `agents/voice-checker.md` strongly reinforce that `STYLE-GUIDE.md` is the first and most important input.
- The shipped watchmaker `STYLE-GUIDE.md` is concrete and specific enough to drive a useful proof artifact.

**What this proves today:** the repo can explain the Voice DNA pipeline and provide a real style guide.

**What is missing:** a before/after or unguided/guided artifact using one fixed brief so a skeptical reader can see the difference instead of inferring it.

**Planning implication:** PROOF-02 should ship a compact artifact bundle, not just another explanatory paragraph in docs.

### Launch docs still lead with breadth before the proof layer

- `README.md` clearly states the core value and links to the Voice DNA guide, but much of the first impression is still driven by command count, work-type breadth, and pipeline surface area.
- `docs/getting-started.md` includes the demo, but frames it mostly as optional exploration rather than as proof of Scriven's wedge.
- No launch-facing doc currently links to a canonical proof hub.

**Planning implication:** PROOF-03 should not create more abstract positioning language by itself. It should wire concrete proof artifacts into the README and onboarding flow so the wedge is visible before the breadth list becomes the main story.

### Packaging constraints matter now, even if package verification is Phase 16

- `package.json` ships `data/`, `commands/`, `agents/`, `templates/`, `README.md`, and `LICENSE`, but not `docs/`.
- `test/package.test.js` already verifies that `data/demo/.manuscript/STYLE-GUIDE.md` is included in `npm pack`.

**Planning implication:** canonical proof artifacts should live under `data/` if possible, with `docs/` acting as the explanatory layer. That keeps Phase 15 aligned with Phase 16's future packaged-contents verification (`QA-02`) instead of forcing a later relocation.

## Evidence and Gaps

### Evidence already in repo

- Shipped demo manuscript with real context, drafts, review, and next-step plan
- Concrete watchmaker `STYLE-GUIDE.md`
- Voice-focused command and agent instructions (`profile-writer`, `voice-test`, `voice-check`, drafter, voice-checker)
- Launch docs that already mention the demo and Voice DNA

### Missing proof surfaces

- No canonical proof index or walkthrough doc
- No curated proof bundle under a package-shipped path
- No side-by-side Voice DNA artifact
- No README/getting-started path that says "see the proof first"

## Recommended Planning Split

### Plan 15-01: End-to-end sample flow artifact

Own:

- `PROOF-01`

Likely files:

- `data/proof/watchmaker-flow/README.md`
- `docs/proof-artifacts.md`
- `docs/shipped-assets.md`

Must-haves:

- one canonical walkthrough from setup context through a credible writing outcome
- direct links to shipped files, not implied screenshots or missing exports
- proof bundle anchored to `data/demo/` rather than duplicating the full sample unnecessarily
- proof artifact registered as trust-critical launch material

### Plan 15-02: Voice DNA before/after proof bundle

Own:

- `PROOF-02`

Likely files:

- `data/proof/voice-dna/README.md`
- `data/proof/voice-dna/STYLE-GUIDE-EXCERPT.md`
- `data/proof/voice-dna/UNGUIDED-SAMPLE.md`
- `data/proof/voice-dna/GUIDED-SAMPLE.md`
- `docs/voice-dna.md`
- `docs/proof-artifacts.md`

Must-haves:

- one fixed brief or micro-scene used for both samples
- explicit explanation of what changed once the style guide was applied
- conservative framing: artifact demonstrates Scriven's intended voice pipeline, not universal model benchmarking

### Plan 15-03: Launch-facing positioning and proof wiring

Own:

- `PROOF-03`

Likely files:

- `README.md`
- `docs/getting-started.md`
- `docs/proof-artifacts.md`

Must-haves:

- README opens with voice-preserving, AI-native longform writing as the first story
- proof artifacts are visible from launch and onboarding docs
- breadth remains present, but reads as expansion after the wedge is established

## Risks to Plan Around

- If proof artifacts live only in `docs/`, Phase 16 may need an unnecessary relocation to satisfy packaged-contents verification.
- If the sample flow implies export outcomes the repo does not actually ship, Phase 13's trust gains will be undone.
- If the before/after proof bundle reads like synthetic marketing copy rather than inspectable evidence, it will not satisfy skeptical users.
- If README positioning is rewritten without concrete proof links, the phase will improve rhetoric but not trust.

## Validation Strategy

Phase 15 should be considered well planned only if the resulting plans require verification of:

- one canonical proof walkthrough rooted in shipped files
- one concrete unguided/guided Voice DNA comparison
- launch-facing docs that link to those artifacts and foreground the wedge
- artifact paths that are compatible with packaged shipping later via `data/`

## Recommendation

Plan Phase 15 as **three plans**:

1. Build a canonical sample-flow proof artifact from the shipped watchmaker demo.
2. Build a Voice DNA before/after proof bundle using a fixed brief and real style-guide dimensions.
3. Reposition launch/onboarding docs so the proof layer leads and the broader feature surface reads as expansion.

This keeps each proof requirement independently auditable, preserves the trust-first posture established in Phases 13-14, and sets up Phase 16 to verify packaged proof artifacts without redesigning them.

## RESEARCH COMPLETE
