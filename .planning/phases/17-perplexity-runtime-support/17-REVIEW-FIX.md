---
phase: 17-perplexity-runtime-support
fixed_at: 2026-04-09T11:34:15Z
review_path: .planning/phases/17-perplexity-runtime-support/17-REVIEW.md
iteration: 1
scope: warning
findings_in_scope: 1
fixed: 1
deferred: 0
status: all_fixed
---
# Phase 17: Review Fix Summary

**Scope:** Warning findings only
**Source review:** `.planning/phases/17-perplexity-runtime-support/17-REVIEW.md`

## Fixed Warnings

### WR-01: Perplexity recovery path only points to the project-local guide

Fixed in `commands/scr/troubleshoot.md` and `test/phase14-runtime-credibility.test.js`. The troubleshooting guidance now names both supported guide locations: `~/.scriven/perplexity/SETUP.md` for global installs and `.scriven/perplexity/SETUP.md` for project installs. A runtime-credibility regression assertion now protects both paths and the canonical runtime-support reference.

## Deferred Warnings

None.

## Verification

- `node --test test/phase14-runtime-credibility.test.js test/phase16-trust-regression.test.js`

---
_Fixed at: 2026-04-09T11:34:15Z_
