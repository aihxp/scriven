# Phase 19: Verification & Trust Surface Updates - Context

**Gathered:** 2026-04-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 19 turns the Perplexity and technical-writing additions into a maintained truth surface. This phase is about counts, docs, package contents, and regression coverage staying aligned with the live repo.

</domain>

<decisions>
## Implementation Decisions

- **D-01:** Put technical-writing verification into targeted tests rather than relying on broad snapshots.
- **D-02:** Keep root docs, onboarding docs, and instruction docs aligned on counts and scope.
- **D-03:** Reuse the v1.3 trust model: narrow claims, explicit counts, and package-level checks where shipping matters.

</decisions>

<canonical_refs>
## Canonical References

- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `README.md`
- `docs/getting-started.md`
- `docs/work-types.md`
- `docs/architecture.md`
- `AGENTS.md`
- `CLAUDE.md`
- `test/package.test.js`
- `test/phase13-launch-surface-integrity.test.js`
- `test/phase14-runtime-credibility.test.js`
- `test/phase16-trust-regression.test.js`

</canonical_refs>
