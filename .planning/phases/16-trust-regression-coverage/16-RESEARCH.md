---
phase: 16-trust-regression-coverage
researched: 2026-04-08
status: complete
requirements:
  - QA-01
  - QA-02
---

# Phase 16 Research: Trust Regression Coverage

## Question

What is the smallest reliable test surface that will catch trust-critical drift across launch claims, shipped assets, proof artifacts, and packaged npm contents before release?

## Current Repo Truth

### Trust-critical truth is now centralized

- `docs/shipped-assets.md` is the canonical inventory for shipped export templates and trust-critical launch files.
- `docs/runtime-support.md` is the canonical runtime policy and support-confidence document.
- `docs/proof-artifacts.md` is the canonical proof hub for the watchmaker flow and Voice DNA bundle.
- `README.md` and `docs/getting-started.md` now route readers into those canonical docs instead of carrying standalone trust claims.

**Implication:** Phase 16 should test those canonical surfaces directly instead of duplicating their contents across more docs.

### The package already has one dry-run test hook

- `test/package.test.js` already runs `npm pack --dry-run`.
- `package.json` uses `prepublishOnly: npm test`, so any new package-coverage assertions will automatically become release gates.

**Implication:** `QA-02` can be satisfied by extending the existing dry-run coverage rather than inventing a second packaging workflow.

### The repo already exposes the runtime registry for reuse

- `bin/install.js` exports `RUNTIMES`.
- `test/installer.test.js` already asserts runtime-key shape and install-type properties.

**Implication:** Phase 16 can cheaply add a drift check that runtime-support docs still mention the same runtime labels the installer exports.

## Gaps Still Open

- No automated test currently fails if `docs/shipped-assets.md` drifts away from the actual bundled export templates.
- No automated test fails if `README.md` or `docs/getting-started.md` lose their proof/runtime routing or reintroduce stale absolute claims.
- No automated test currently verifies that the new proof bundles under `data/proof/` stay included in `npm pack --dry-run`.

## Recommended Planning Split

### Plan 16-01: Trust-critical doc and link regression tests

Own:

- `QA-01`

Likely files:

- `test/phase16-trust-regression.test.js`

Must-haves:

- assert trust-critical linked files still exist
- assert shipped-template truth matches the repo
- assert proof-hub canonical artifacts remain wired
- assert launch docs do not regress to stale phrases
- assert runtime-support doc still covers installer runtime labels

### Plan 16-02: Packaged-content regression checks

Own:

- `QA-02`

Likely files:

- `test/package.test.js`

Must-haves:

- `npm pack --dry-run` includes all package-shipped proof artifacts
- `npm pack --dry-run` includes the three currently shipped export templates
- packaging assertions remain narrow and deterministic so they are stable in local and publish workflows

## Risks to Plan Around

- If tests duplicate too much doc prose, Phase 16 will become brittle and expensive to maintain.
- If package assertions reference docs that are not included in `package.json` `files`, they will fail for the wrong reason.
- If runtime-support checks hardcode the whole table layout, harmless formatting edits could create noisy failures.

## Validation Strategy

Phase 16 should be considered complete only if:

- `npm test` fails when trust-critical files disappear or canonical links go stale
- `npm test` fails when stale forbidden claims reappear on the launch surface
- `npm pack --dry-run` is asserted to include the proof bundles and shipped export templates promised on the launch surface

## Recommendation

Plan Phase 16 as **two plans**:

1. Add a dedicated trust-regression test suite for canonical docs, links, and shipped-asset truth.
2. Extend the existing package dry-run tests to cover proof artifacts and shipped export templates.

This keeps the phase small, deterministic, and directly wired into the existing release gate (`prepublishOnly: npm test`).

## RESEARCH COMPLETE
