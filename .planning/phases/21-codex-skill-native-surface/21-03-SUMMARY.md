---
phase: 21-codex-skill-native-surface
plan: "03"
subsystem: installer
tags: [codex, wrapper-copy, invocation]
requirements-completed: [RUNTIME-09]
completed: 2026-04-09
---

# Phase 21 Plan 03 Summary

## Accomplishments

- Generated wrapper content that points Codex users at `$scr-*` skills instead of `/scr:*` syntax
- Kept each generated wrapper anchored to the mirrored installed command markdown so wrapper text and execution truth do not diverge

## Files Modified

- `bin/install.js`
- `test/installer.test.js`
