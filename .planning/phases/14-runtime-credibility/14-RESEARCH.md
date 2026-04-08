---
phase: 14-runtime-credibility
researched: 2026-04-08
status: complete
requirements:
  - RUNTIME-01
  - RUNTIME-02
  - RUNTIME-03
---

# Phase 14 Research: Runtime Credibility

## Question

What does Scriven need in order to make its Node.js baseline and runtime claims explicit, consistent, and evidence-backed?

## Current Repo Truth

### Node baseline is inconsistent

- `package.json` still declares `"engines": { "node": ">=18.0.0" }`.
- `docs/getting-started.md` already tells users they need `Node.js 20+`.
- `AGENTS.md` and `CLAUDE.md` both recommend bumping the minimum to `>=20.0.0` and explicitly say not to use Node `< 20`.

**Planning implication:** Phase 14 needs one authoritative Node floor and must push it through package metadata, installer UX, and docs at the same time. Leaving one source behind would fail RUNTIME-01 immediately.

### Runtime inventory exists, but proof framing does not

- `bin/install.js` defines install targets for 10 entries:
  - command runtimes: Claude Code, Cursor, Gemini CLI, Codex CLI, OpenCode, GitHub Copilot, Windsurf, Antigravity
  - skill runtimes: Manus Desktop, Generic
- `docs/architecture.md` documents those same detection rules and installation types.
- `test/installer.test.js` verifies the runtime registry shape and that the expected runtime keys exist.

**What this proves today:** Scriven has installer paths and configuration targets for these runtimes.

**What this does not prove today:** end-to-end runtime parity, validated slash-command behavior inside each host, or whether each target is "fully supported" versus "best effort."

**Planning implication:** Phase 14 should not overclaim runtime support. It should expose a compatibility matrix that distinguishes:

- installer target present
- detection/install path documented
- installer test coverage exists
- host runtime manually verified
- best-effort or generic compatibility only

That is the clearest path to RUNTIME-02 and RUNTIME-03 without inventing proof that the repo does not yet have.

### Launch docs still use stronger runtime language than the proof layer supports

- `README.md` now uses `Installer Targets`, which is better than `full support`, but it still lacks a runtime credibility document or verification legend.
- `docs/getting-started.md` still says "any of the 9 supported runtimes," which reads stronger than the current evidence.
- `docs/getting-started.md` says the installer auto-detects the platform and places everything where the agent expects it; that is partly supported by `bin/install.js`, but not by a user-facing compatibility matrix.
- `docs/architecture.md` explains detection and installation mechanics, but not support levels or verification status.

**Planning implication:** one plan should create the canonical runtime matrix and verification language, and another should push that framing into README/getting-started/architecture so users see it without reading code.

## Existing Evidence and Limits

### Evidence already in repo

- `bin/install.js` is the canonical source for runtime keys, labels, directory paths, detection rules, and type (`commands` vs `skills`).
- `test/installer.test.js` proves:
  - runtime registry entries exist for the named runtimes
  - each runtime has the expected directory properties for its type
  - `generic` remains a skills fallback
  - skill manifest generation and copy behavior work in simulation
- `docs/architecture.md` already documents the runtime detection table and install strategies.

### Evidence currently missing

- No runtime compatibility matrix document
- No explicit support-level vocabulary such as `verified`, `reference`, `tested installer target`, or `best effort`
- No central place that states which runtimes have only installer-path evidence versus manual verification
- No installer output or docs that explain the chosen Node floor as a product policy
- No tests yet guarding drift between the runtime registry and runtime-facing docs

**Planning implication:** tests that enforce matrix drift are better suited to Phase 16 (`QA-01`, `QA-02`). Phase 14 should establish the truth surface those tests will later protect.

## Recommended Planning Split

### Plan 14-01: Canonical runtime policy and evidence matrix

Own:

- `RUNTIME-01`
- the source-of-truth artifact for `RUNTIME-02`
- the terminology needed for `RUNTIME-03`

Likely files:

- `package.json`
- `bin/install.js`
- new doc such as `docs/runtime-support.md`
- possibly `docs/architecture.md`

Must-haves:

- choose one minimum Node version and align package metadata with it
- add explicit installer/runtime support policy to docs
- create a runtime compatibility matrix with columns like runtime, install type, detection/install path, evidence, support level, verification status
- document the difference between installer target coverage and validated runtime support

### Plan 14-02: Launch-surface and onboarding alignment

Own:

- the user-facing doc propagation of `RUNTIME-01..03`

Likely files:

- `README.md`
- `docs/getting-started.md`
- `docs/architecture.md`
- `AGENTS.md`
- `CLAUDE.md`

Must-haves:

- remove or soften any wording that implies all listed runtimes are equivalently supported
- link readers to the canonical runtime support matrix
- make the same Node floor appear in onboarding and planning docs
- preserve the improved Phase 13 launch-trust posture

## Risks to Plan Around

- If the phase changes `package.json` to Node 20+, any installer or test instructions that still imply Node 18 will become instant trust regressions.
- If the matrix invents verification levels without explaining what they mean, the docs may look polished but still fail RUNTIME-03.
- If the phase tries to prove real host-runtime behavior for every runtime, scope will balloon. Phase 14 should classify evidence honestly, not simulate certainty.

## Validation Strategy

Phase 14 should be considered well planned only if the final plans require verification of:

- exact Node floor consistency across metadata and docs
- one canonical runtime support document
- at least one user-facing doc linking to that matrix
- runtime labels/support levels that map to present repo evidence instead of aspiration

## Recommendation

Plan Phase 14 as **two plans**:

1. Build the canonical runtime policy surface: choose Node baseline, add matrix, define evidence/support terminology.
2. Propagate that truth through launch and onboarding docs so first-time users can understand runtime confidence without reading source code.

This split keeps the source of truth separate from launch-facing cleanup, mirrors the successful Phase 13 structure, and maps cleanly to `RUNTIME-01..03`.

## RESEARCH COMPLETE
