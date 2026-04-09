# Phase 21 Discussion Log

**Date:** 2026-04-09
**Mode:** Autonomous retrospective discuss

## Decisions Captured

- Codex is treated as a skill-native runtime surface, not a slash-command clone.
- Installed command markdown remains the source of truth even when Codex users invoke generated `$scr-*` skills.
- Skill generation, invocation translation, and compatibility path wiring all stay in `bin/install.js` with test coverage in `test/installer.test.js`.

## Open Questions

- None. Existing implementation already matched the accepted phase direction.
