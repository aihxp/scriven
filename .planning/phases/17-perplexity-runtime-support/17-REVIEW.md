---
phase: 17-perplexity-runtime-support
reviewed: 2026-04-09T11:33:34Z
depth: standard
files_reviewed: 8
files_reviewed_list:
  - bin/install.js
  - docs/runtime-support.md
  - docs/architecture.md
  - test/installer.test.js
  - README.md
  - docs/getting-started.md
  - commands/scr/troubleshoot.md
  - test/phase16-trust-regression.test.js
findings:
  critical: 0
  warning: 1
  info: 0
  total: 1
status: issues_found
---
# Phase 17: Code Review Report

**Reviewed:** 2026-04-09T11:33:34Z
**Depth:** standard
**Files Reviewed:** 8
**Status:** issues_found

## Summary

Reviewed the Perplexity Desktop installer path, the canonical runtime matrix, launch/onboarding docs, troubleshooting guidance, and the regression tests that protect this runtime boundary. The guided-MCP installer model is coherent overall, but the troubleshooting copy currently points users only at the project-local setup guide, so globally installed Perplexity users can be sent to a path that does not exist.

## Warnings

### WR-01: Perplexity recovery path only points to the project-local guide

**File:** `commands/scr/troubleshoot.md:24`
**Issue:** The Perplexity Desktop troubleshooting note tells users to open `.scriven/perplexity/SETUP.md`, but a global Perplexity install writes that guide to `~/.scriven/perplexity/SETUP.md`. If a writer chose Global scope, the recovery advice can send them to the wrong location even though the installer generated the correct guide elsewhere.
**Fix:**
```md
- **"Perplexity Desktop setup isn't working"** -- ... direct the writer to the generated setup guide (`~/.scriven/perplexity/SETUP.md` for global installs or `.scriven/perplexity/SETUP.md` for project installs) ...
```
Add a regression assertion so the troubleshooting guidance keeps both install scopes visible.

---

_Reviewed: 2026-04-09T11:33:34Z_
_Reviewer: Codex (gsd-code-review)_
_Depth: standard_
