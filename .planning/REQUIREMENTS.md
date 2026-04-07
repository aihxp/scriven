# Requirements: Scriven v1.1 — Generic Platform Support

**Defined:** 2026-04-07
**Core Value:** Drafted prose sounds like the writer, not like AI — Voice DNA system loaded into every agent invocation.

## v1.1 Requirements

### Platform Support

- [x] **PLAT-01**: Installer distinguishes "command-directory platforms" (Claude Code, Cursor, Gemini, Codex, OpenCode, Copilot, Windsurf, Antigravity) from "skill-file platforms" (Manus, future agents) with different installation strategies
- [x] **PLAT-02**: Generic SKILL.md installer creates a consolidated SKILL.md manifest plus individual command/agent files in a skills subdirectory
- [x] **PLAT-03**: Manus Desktop runtime uses the generic SKILL.md path — detects via `~/.manus/` directory or `Manus.app` application bundle
- [x] **PLAT-04**: Installer offers "Generic (SKILL.md)" option for unrecognized platforms alongside the 9 named runtimes
- [x] **PLAT-05**: Generic install creates a root SKILL.md manifest listing all available `/scr:*` commands with descriptions and trigger patterns
- [ ] **PLAT-06**: Tests validate generic SKILL.md installer path alongside existing command-directory tests

## Out of Scope

| Feature | Reason |
|---------|--------|
| Runtime-specific behavior differences | All runtimes get identical command content — only install locations differ |
| SKILL.md auto-discovery testing on live Manus | Requires Manus Desktop installed — manual verification item |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| PLAT-01 | Phase 9 | Complete |
| PLAT-02 | Phase 9 | Complete |
| PLAT-03 | Phase 9 | Complete |
| PLAT-04 | Phase 9 | Complete |
| PLAT-05 | Phase 9 | Complete |
| PLAT-06 | Phase 9 | Pending |

**Coverage:**
- v1.1 requirements: 6 total
- Mapped to phases: 6
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-07*
*Last updated: 2026-04-07 after milestone v1.1 definition*
