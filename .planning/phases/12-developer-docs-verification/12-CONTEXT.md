# Phase 12: Developer Docs & Verification - Context

**Gathered:** 2026-04-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Contributor guide, architecture overview, and codebase verification pass. Contributors can extend Scriven and all docs are verified accurate.

</domain>

<decisions>
## Implementation Decisions

- **D-01:** Same tone — friendly, practical, example-driven
- **D-02:** Contributor guide shows step-by-step patterns: "Here's how to add a command" with a real example
- **D-03:** Architecture overview covers: skill system design, CONSTRAINTS.json schema, file structure (.manuscript/), agent orchestration, fresh-context-per-unit
- **D-04:** Verification pass uses grep/read to check every command/flag/file reference in all docs against the live codebase

### Claude's Discretion
- Level of detail in architecture diagrams (ASCII vs prose)
- Which example command to use as the contributor walkthrough
- Verification script approach (test file vs manual grep)

</decisions>

<canonical_refs>
## Canonical References

- `bin/install.js` — Installer architecture
- `data/CONSTRAINTS.json` — Schema structure
- `agents/drafter.md` — Agent pattern
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §16 — File structure
- All docs created in Phases 10-11

</canonical_refs>

<code_context>
## Existing Code Insights

- The command pattern is well-established: YAML frontmatter + markdown instructions
- CONSTRAINTS.json schema is the central extension point
- Agent pattern: YAML frontmatter (name, description, tools) + markdown instructions

</code_context>

<specifics>
## Specific Ideas

- Verification should produce a report of any stale references found and fix them
- The GSD doc-writer and doc-verifier agent types exist and can be used

</specifics>

<deferred>
## Deferred Ideas

None.

</deferred>
