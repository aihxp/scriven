# Release Notes

This document is the public-facing summary of what changed between package releases. For package history, see the root [CHANGELOG](../CHANGELOG.md).

## 1.4.0 - 2026-04-09

### What changed

- Added guided Perplexity Desktop support with explicit runtime-support framing instead of overstating parity
- Added four technical-writing work types: technical guide, runbook, API reference, and design spec
- Added technical-native scaffolding for audience, environment, procedures, and references during `/scr:new-work`
- Added verification and trust-surface coverage so the new runtime and work-type claims stay aligned with the package and docs

### Why it matters

`1.4.0` turns the already-shipped `v1.4` milestone into the package a user actually installs. It expands Scriven into technical writing and Perplexity Desktop without weakening the trust posture that `v1.3` established.

### Affected areas

- runtime support and installation guidance
- work-type modeling and technical-writing templates
- onboarding and generated project config
- trust-surface regression checks

### Verification

- `npm test`
- `npm pack --dry-run`
