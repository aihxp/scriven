# Phase 16: Trust Regression Coverage - Context

**Gathered:** 2026-04-08
**Status:** Ready for planning
**Mode:** Autonomous defaults applied

<domain>
## Phase Boundary

Phase 16 closes the trust loop opened in Phases 13-15. The repo now has a canonical shipped-asset inventory, a runtime-support matrix, and packaged proof artifacts. This phase must make trust drift fail fast by turning those surfaces into release-time checks.

The goal is not to add new launch copy or new proof artifacts. The goal is to encode the current trust posture into deterministic tests that run under `npm test` and validate packaged output via `npm pack --dry-run`.

</domain>

<decisions>
## Implementation Decisions

### Default choices locked for planning

- Use the existing Node test suite as the release-time enforcement layer so `prepublishOnly: npm test` blocks regressions automatically.
- Keep trust-regression coverage local and deterministic: file existence, doc wiring, stale-phrase checks, runtime-matrix shape checks, and package dry-run assertions.
- Treat `docs/shipped-assets.md` as the canonical inventory for trust-critical launch files and shipped export templates.
- Treat `docs/proof-artifacts.md` and `docs/runtime-support.md` as canonical link hubs whose referenced asset files must remain present.
- Split execution into two plans:
  - one plan for trust-critical doc and link regression tests (`QA-01`)
  - one plan for packaged-content coverage (`QA-02`)

</decisions>

<code_context>
## Existing Code Insights

- `test/package.test.js` already runs `npm pack --dry-run` and asserts inclusion of a few critical package entries.
- `test/installer.test.js` already validates the installer runtime registry and exports `RUNTIMES` from `bin/install.js`, which Phase 16 can reuse for runtime-support drift checks.
- `docs/shipped-assets.md` lists current bundled export templates and trust-critical launch files.
- `docs/runtime-support.md` defines the canonical Node baseline, runtime labels, and support-confidence vocabulary.
- `docs/proof-artifacts.md` indexes the packaged proof bundle under `data/proof/`.

</code_context>

<specifics>
## Specific Ideas

- Add a dedicated `test/phase16-trust-regression.test.js` file to check:
  - trust-critical doc links resolve to existing files
  - shipped export-template truth still matches the filesystem
  - forbidden launch phrases do not reappear
  - runtime-support matrix rows stay aligned with installer runtime labels
  - proof hub artifacts still exist
- Extend `test/package.test.js` so `npm pack --dry-run` explicitly covers:
  - `data/proof/watchmaker-flow/README.md`
  - the full `data/proof/voice-dna/` bundle
  - the three currently shipped export templates in `data/export-templates/`

</specifics>

<deferred>
## Deferred Ideas

- Runtime-specific end-to-end smoke tests across host agents remain out of scope for this milestone.
- CI matrix automation for release validation remains future work if the project later adds hosted CI/CD.

</deferred>
