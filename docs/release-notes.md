# Release Notes

This document is the public-facing summary of what changed between package releases. For package history, see the root [CHANGELOG](../CHANGELOG.md).

## 1.4.1 - 2026-04-09

### What changed

- Normalized npm publish metadata for the `scriven` installer command and repository URL
- Marked the packaged installer entrypoint as executable
- Updated package-level regression coverage so the publish-safe bin path stays locked in

### Why it matters

`1.4.1` does not add new writer-facing features. It makes the npm package cleaner and less surprising after the `1.4.0` release by aligning the published metadata with what npm actually expects.

### Affected areas

- npm packaging metadata
- installer entrypoint permissions
- package-time regression checks

### Verification

- `npm test`
- `npm pack --dry-run`
