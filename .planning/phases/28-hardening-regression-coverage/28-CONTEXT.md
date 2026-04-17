# Phase 28: Hardening Regression Coverage - Context

**Gathered:** 2026-04-16
**Status:** Ready for planning
**Mode:** Auto-generated (discuss skipped via workflow.skip_discuss)

<domain>
## Phase Boundary

All v1.6 hardening behaviors are locked by tests so future changes cannot silently break crash safety, parsing, validation, preservation, or rewriting. This phase consolidates test coverage and adds any gaps that prior phases didn't cover.

**Requirements:** QA-05

**Success Criteria:**
1. Atomic write tests verify temp-file-then-rename + orphan cleanup (SAFE-01/02)
2. Frontmatter parsing tests cover colons, scope, multiline (PARSE-01/02/03)
3. Schema validation tests cover type errors, unknowns, migration (SCHEMA-01/02)
4. Preservation tests verify merge + content-hash backup (PRES-01/02)
5. Rewriting tests verify per-runtime syntax + code-block protection (REWRITE-01/02)

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
Review existing tests across phases 23-27 and ensure integration coverage exists. Each phase already added unit tests, but this phase should:
1. Audit test coverage for every v1.6 requirement
2. Add integration/smoke tests covering the full install flow with v1.6 hardening active
3. Ensure tests are discoverable by `npm test` and run in CI

Existing test files (from prior phases):
- test/install.test.js — atomic writes, orphan cleanup, frontmatter, rewriting
- test/phase25-schema-validation.test.js — schema validation
- test/phase26-settings-template-preservation.test.js — preservation

This phase should either consolidate or ensure all are wired into `npm test`.

</decisions>

<code_context>
## Existing Code Insights

Test files already exist from phases 23-27. Need to:
- Verify `npm test` discovers all phase test files
- Add any integration smoke test that exercises the full install flow end-to-end
- Lock the v1.6 behavior matrix with a concise integration test that simulates: fresh install → customize settings → customize template → reinstall → verify preservation + backup

</code_context>

<specifics>
## Specific Ideas

Single integration smoke test covering the v1.6 hardening contract end-to-end.

</specifics>

<deferred>
## Deferred Ideas

None — discuss phase skipped.

</deferred>
