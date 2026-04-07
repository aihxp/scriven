# Phase 1: MVP Polish - Context

**Gathered:** 2026-04-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Ship a polished npm package with a compelling demo, test suite, and working `npx scriven@latest` experience. This is the first impression for every new user — install-to-explore must take under 5 minutes. No new commands or features beyond what Phase 1 MVP already built; this phase is about finishing and packaging.

</domain>

<decisions>
## Implementation Decisions

### Demo Story Content
- **D-01:** Demo ships with full drafted scenes (~800-1200 words each) of actual literary prose — 4 drafted scenes plus 1 planned-but-not-drafted scene. Real prose, not placeholders.
- **D-02:** STYLE-GUIDE.md is hand-crafted to showcase every voice dimension at its best — demonstrates what a great style guide looks like as a teaching tool.
- **D-03:** Ship only the default watchmaker story ("A retired watchmaker in a coastal town receives a letter from a daughter he never knew he had"). Genre alternatives deferred to future work.
- **D-04:** Demo includes all context files fully populated: WORK.md, BRIEF.md, OUTLINE.md, STATE.md, STYLE-GUIDE.md, CHARACTERS.md (Elias + Petra), PLOT-GRAPH.md, THEMES.md, plus editor notes on scene 2.

### Test Strategy
- **D-05:** Use Node.js built-in test runner (`node:test`) — zero dependencies, ships with Node 18+, matches the project's no-deps philosophy.
- **D-06:** Test suite validates four areas: (1) CONSTRAINTS.json schema integrity and internal consistency, (2) command file structure (frontmatter, required sections, naming), (3) installer dry-run (file copying works for all 3 runtimes), (4) demo file completeness (all expected files exist and are non-empty).

### npm Publishing
- **D-07:** Unscoped package name: `scriven` — clean `npx scriven@latest` invocation.
- **D-08:** Node.js minimum version: >=18.0.0 (current LTS, `node:test` available).
- **D-09:** Package needs: correct shebang (`#!/usr/bin/env node`), `publishConfig` with access=public, `files` array verified, `engines` field, prepublish test hook.

### Demo Architecture
- **D-10:** Demo files ship pre-baked in the npm package under `data/demo/` — instant setup, no AI generation needed, consistent experience every time.
- **D-11:** `/scr:demo` creates the demo project at `./scriven-demo/` (sibling directory) by copying from `data/demo/`. Stays out of the writer's project, easy to find and delete.

### Claude's Discretion
- Prose style for the watchmaker story scenes — Claude writes these in a literary fiction voice following the hand-crafted STYLE-GUIDE.md
- Exact test assertions and error messages
- Package.json field ordering and metadata details
- Demo directory internal structure (how files are organized under data/demo/)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product Plan (source of truth)
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §15 — Complete command list (specs for all commands)
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §16 — File structure (.manuscript/ layout)
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §19.4 — Demo mode specification

### Runtime Artifacts
- `data/CONSTRAINTS.json` — Command availability, work types, dependencies, exports
- `commands/scr/demo.md` — Demo command specification (watchmaker story details, genre alternatives)
- `bin/install.js` — Installer implementation (runtime detection, file copying)
- `package.json` — Current package configuration

### Templates
- `templates/STYLE-GUIDE.md` — Voice DNA template (demo STYLE-GUIDE.md should be a filled-in version)
- `templates/CHARACTERS.md` — Character profile template
- `templates/OUTLINE.md` — Outline template

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `bin/install.js`: Fully functional installer with `copyDir()` utility, runtime detection for Claude Code/Cursor/Gemini, and interactive CLI prompts
- `commands/scr/demo.md`: Complete spec for demo behavior including watchmaker premise, character names (Elias + Petra), file list, and genre alternatives
- All template files in `templates/`: Ready to be filled in for demo content

### Established Patterns
- Commands are markdown files with YAML frontmatter (`description`, `argument-hint`)
- Agents are markdown files with YAML frontmatter (`name`, `description`, `tools`)
- Templates use markdown with placeholder sections
- No build step, no transpilation, no bundler — pure Node.js and markdown

### Integration Points
- `data/demo/` directory needs to be created and added to `package.json` `files` array
- Demo command reads from wherever `data/demo/` is installed (installer copies `data/` to `.scriven/data/`)
- `npm test` script needs to be added to `package.json`

</code_context>

<specifics>
## Specific Ideas

- Demo STATE.md should be set to "4 of 5 scenes drafted" so `/scr:next` recommends drafting scene 5
- Editor notes on scene 2 enable trying `/scr:editor-review 2`
- Scene 5 has a PLAN.md but no DRAFT.md — enables trying `/scr:draft-scene 5`
- The demo is often the writer's FIRST experience of what Scriven can do — quality of prose directly affects trust and adoption

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-mvp-polish*
*Context gathered: 2026-04-06*
