# Phase 9: Generic Platform Support - Context

**Gathered:** 2026-04-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Refactor the installer to distinguish "command-directory platforms" (Claude Code, Cursor, Gemini, Codex, OpenCode, Copilot, Windsurf, Antigravity) from "skill-file platforms" (Manus Desktop, future agents). Create a generic SKILL.md installation strategy for platforms that don't have `.claude/commands/`-style directories. Add a "Generic (SKILL.md)" option for unrecognized platforms. 6 requirements (PLAT-01..06).

</domain>

<decisions>
## Implementation Decisions

### Platform Architecture
- **D-01:** Installer classifies each runtime as either `type: "commands"` (existing pattern — copies command files to a directory) or `type: "skills"` (new pattern — generates consolidated SKILL.md + copies files to a skills directory)
- **D-02:** Manus Desktop uses the `type: "skills"` path — detects via `~/.manus/` or `Manus.app`
- **D-03:** A "Generic (SKILL.md)" option appears last in the runtime list for users whose platform isn't detected
- **D-04:** The generic SKILL.md manifest lists all `/scr:*` commands with name, description, and trigger pattern so the AI agent can discover and invoke them
- **D-05:** Individual command files are still copied alongside the manifest — the SKILL.md is a discovery layer, not a replacement for the full command instructions

### Claude's Discretion
- SKILL.md manifest format and trigger pattern syntax
- How to handle the existing Manus entry in install.js (refactor into the generic path)
- Whether to generate SKILL.md at install time or ship it pre-built

</decisions>

<canonical_refs>
## Canonical References

- `bin/install.js` — Current installer with 9 RUNTIMES entries including Manus
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §4 — Tool Support (runtime list)
- `test/installer.test.js` — Existing installer tests (9 runtimes validated)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `bin/install.js` — RUNTIMES object pattern, `copyDir()` utility, runtime detection
- All existing command files in `commands/scr/` — content for SKILL.md manifest generation
- `data/CONSTRAINTS.json` — Command descriptions for manifest generation

### Established Patterns
- Each runtime has: label, commands_dir_global, commands_dir_project, agents_dir_global, agents_dir_project, detect()
- Installer copies commands + agents + templates + data to target directories
- Tests validate RUNTIMES entries have required properties

### Integration Points
- Manus entry already exists in RUNTIMES — needs refactoring to use generic skill-file path
- CONSTRAINTS.json has descriptions for all commands — can auto-generate SKILL.md manifest
- `package.json` `files` array must include any new install artifacts

</code_context>

<specifics>
## Specific Ideas

- The SKILL.md manifest should be auto-generated from CONSTRAINTS.json command descriptions — single source of truth
- Skill-file platforms get: root SKILL.md manifest + individual command .md files in a subdirectory + agents + templates + data (same content, different packaging)
- The generic option makes Scriven future-proof for any new AI agent platform

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 09-generic-platform-support*
*Context gathered: 2026-04-07*
