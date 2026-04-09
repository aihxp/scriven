# Release Notes

This document is the public-facing summary of what changed between package releases. For package history, see the root [CHANGELOG](../CHANGELOG.md).

## 1.5.1 - 2026-04-09

### What changed

- Switched Claude Code installs to flat `/scr-*` commands such as `/scr-next` and `/scr-help`
- Rewrote installed Claude command references so in-command guidance matches the new slash syntax
- Added safe Claude cleanup so stale Scriven-owned `scr-*.md` files and the old `scr/` folder are removed without touching unrelated commands
- Updated runtime docs and installer regression coverage around the Claude command surface

### Why it matters

`1.5.1` makes Claude Code feel native instead of carrying forward the older nested `/scr:*` shape. Writers now get one consistent command style in Claude, and reinstalling Scriven stays clean without being destructive in the shared command directory.

### Affected areas

- Claude Code installer path and command layout
- installed command rewriting for Claude help text
- runtime-facing docs and onboarding
- installer and trust-regression tests

### Verification

- `node --check bin/install.js`
- `node --test test/installer.test.js test/phase14-runtime-credibility.test.js test/phase16-trust-regression.test.js`
- temporary HOME smoke install for `--runtime claude-code --global --writer --silent`

## 1.5.0 - 2026-04-09

### What changed

- Added explicit non-interactive installer flags for runtime selection, scope, mode, help, and version output
- Added one-run multi-runtime installs so Codex and Claude Code can be targeted together
- Generated native Codex `$scr-*` skills backed by mirrored installed command markdown
- Tightened reinstall cleanup so stale Scriven-owned Codex skill wrappers are removed without touching unrelated user files
- Updated runtime docs and onboarding copy so Codex and Claude examples match the installer contract now shipped in the package

### Why it matters

`1.5.0` turns the installer into a more dependable real-world surface instead of a prompt-only setup path. Codex users now get native `$scr-*` discovery, Claude Code users keep a clean command-directory install, and the package ships tests and docs that keep those claims honest.

### Affected areas

- installer CLI and runtime registry
- Codex skill generation and runtime cleanup
- runtime-facing docs and onboarding
- installer and trust-regression tests

### Verification

- `node --test test/installer.test.js test/phase14-runtime-credibility.test.js test/phase16-trust-regression.test.js`
- `npm test`
- `npm pack --dry-run`

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
