---
phase: 21-codex-skill-native-surface
plan: "01"
subsystem: installer
tags: [codex, skills, generation]
requirements-completed: [RUNTIME-09]
completed: 2026-04-09
---

# Phase 21 Plan 01 Summary

## Accomplishments

- Added Codex helper logic that maps Scriven command refs to stable `scr-*` skill names and `$scr-*` invocations
- Kept the skill-generation path derived from the command tree instead of a hand-maintained Codex command list

## Files Modified

- `bin/install.js`
