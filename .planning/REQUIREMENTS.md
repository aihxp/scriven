# Requirements: Scriven v1.5 Runtime Install Reliability

**Status:** Milestone shipped on 2026-04-09.
**Last archived milestone:** [v1.4 requirements archive](/Users/hprincivil/Projects/scriven/.planning/milestones/v1.4-REQUIREMENTS.md)

## Active Requirements

- [x] **RUNTIME-08**: User can install Scriven non-interactively by selecting runtimes, scope, and writer/developer mode through CLI flags instead of prompts
- [x] **RUNTIME-09**: Codex installs generate native `$scr-*` skills that map to Scriven commands and route users through the installed command files
- [x] **RUNTIME-10**: Claude Code installs cleanly replace stale Scriven command files while preserving unrelated user files in the host runtime directories
- [x] **RUNTIME-11**: Runtime path handling and prerequisite guidance remain OS-agnostic and avoid hard-coded shell or platform assumptions
- [x] **QA-04**: Automated tests cover silent install parsing, Codex skill generation, and runtime support documentation for the new install surface

## Notes

- Keep new support claims source-backed, narrow, and testable
- Preserve the zero-runtime-dependency installer architecture
- Preserve Voice DNA as the non-negotiable drafting anchor
- Preserve existing `/scr:*` command files and other runtime installers while expanding Codex-specific delivery
- Favor clean install semantics for Scriven-owned files only; never wipe unrelated runtime content

---
*Defined: 2026-04-09 for milestone v1.5*
*Completed: 2026-04-09*
