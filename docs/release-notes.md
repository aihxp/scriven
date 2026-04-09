# Release Notes

This document is the public-facing summary of what changed between package releases. For package history, see the root [CHANGELOG](../CHANGELOG.md).

## 1.3.4 - 2026-04-09

### What changed

- Folded post-`1.3.3` review fixes back into the shipped baseline so export, runtime, and publishing guidance line up with the current command surface
- Added explicit validation and security records across phases 13-16 of the `v1.3 Trust & Proof` milestone
- Added missing Nyquist coverage for phases 13-15 and strengthened phase 16 trust-regression/package assertions
- Reconciled planning-health drift, finalized the v1.3 archive, and released from that cleaned-up state

### Why it matters

`1.3.4` is not a feature-breadth release. It is a confidence release. It makes the shipped trust story more internally consistent by tightening the gap between what Scriven claims, what its docs say, what its tests enforce, and what the npm package actually contains.

### Affected areas

- export and publishing command paths
- runtime/install messaging and guardrails
- package-time trust checks
- milestone closeout and planning-health records

### Verification

- `npm test`
- `npm pack --dry-run`
- `npm publish`
