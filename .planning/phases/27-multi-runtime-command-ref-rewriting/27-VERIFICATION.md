---
status: passed
phase: 27
phase_name: Multi-Runtime Command-Ref Rewriting
verified_at: 2026-04-16
---

# Phase 27 Verification

## must_haves truths

- ✅ Codex command files now contain `$scr-*` in prose (REWRITE-01)
- ✅ Code blocks (``` and ~~~) preserve refs unchanged (REWRITE-02)
- ✅ Mixed prose/code-block files rewrite only prose
- ✅ Claude Code path unchanged (no regression)
- ✅ All Codex writes go through atomicWriteFileSync

## Tests

- 13 new tests in test/install.test.js
- Full suite: 49/49 passing

## Requirements

- REWRITE-01 ✅
- REWRITE-02 ✅

## Notes

`installCodexRuntime` refactored to use per-entry `atomicWriteFileSync(generateCodexCommandContent(...))` instead of raw `copyDir`. Manual smoke confirmed Codex install has `$scr-help` in prose, `/scr:help` preserved only inside fenced code blocks.
