# Scriven

## What This Is

Scriven is a spec-driven writing, publishing, and translation pipeline that runs inside AI coding agents. It takes writers from blank page to publication-ready manuscript or technical document set with voice profiling, adaptive work types, autonomous drafting, illustration, translation, and multi-format export. It currently supports 50 work types with tradition-native vocabulary such as chapters, acts, procedures, and surahs.

## Core Value

**Drafted prose sounds like the writer, not like AI.** The Voice DNA system profiles the writer across 15+ dimensions and loads that profile into every drafter agent invocation. If voice fidelity breaks, trust breaks, and no other feature matters.

## Requirements

### Validated

- ✓ Core workflow commands (new-work → discuss → plan → draft → editor-review → submit → complete) — v0.3.0
- ✓ Adaptive naming system across 50 work types with structural hierarchy — v0.3.0
- ✓ Voice DNA system (STYLE-GUIDE.md generation, 15+ dimensions) — v0.3.0
- ✓ Drafter agent with fresh-context-per-atomic-unit architecture — v0.3.0
- ✓ 5 agent prompts (drafter, researcher, continuity checker, voice checker, plan checker) — v0.3.0
- ✓ Context file templates (WORK.md, OUTLINE.md, CHARACTERS.md, THEMES.md, etc.) — v0.3.0
- ✓ Constraint system (CONSTRAINTS.json) with command availability, gating, dependencies — v0.3.0
- ✓ Installer for Claude Code, Cursor, Gemini CLI — v0.3.0
- ✓ Help / progress / next navigation commands — v0.3.0
- ✓ Natural language router (/scr:do) — v0.3.0
- ✓ Sacred text templates (FIGURES.md, LINEAGES.md, COSMOLOGY.md, etc.) — v0.3.0
- ✓ 8 sacred-exclusive commands (concordance, cross-reference, genealogy, etc.) — v0.3.0
- ✓ Import existing manuscript command — v0.3.0
- ✓ Series bible command — v0.3.0
- ✓ Publish wizard command (shell) — v0.3.0
- ✓ Profile-writer and voice-test commands — v0.3.0
- ✓ Beta reader, continuity check, editor review commands — v0.3.0
- ✓ Generic SKILL.md installer path for skill-file platforms — v1.1
- ✓ Core documentation suite, feature guides, contributor docs, and architecture docs — v1.2
- ✓ Launch-facing shipped-asset inventory and export docs aligned to actual repo surface — v1.3 Phase 13
- ✓ Launch-facing root docs narrowed to repo-provable claims and shipped-template truth — v1.3 Phase 13
- ✓ Node 20+ installer baseline unified across package metadata, installer UX, runtime docs, and planning docs — v1.3 Phase 14
- ✓ Canonical runtime support matrix and support-evidence framing shipped for claimed runtimes — v1.3 Phase 14
- ✓ Canonical watchmaker sample-flow proof artifact and proof hub shipped — v1.3 Phase 15
- ✓ Voice DNA before/after proof bundle shipped under packaged contents — v1.3 Phase 15
- ✓ Launch and onboarding docs now foreground the voice-preservation wedge and proof layer — v1.3 Phase 15
- ✓ Trust-critical launch, proof, and runtime surfaces now have release-time regression tests — v1.3 Phase 16
- ✓ Packaged proof bundles and shipped export templates are enforced in npm pack dry-run coverage — v1.3 Phase 16
- ✓ Perplexity Desktop ships as a guided local-MCP runtime target with explicit support framing — v1.4 Phase 17
- ✓ Technical-writing family adds guide, runbook, API reference, and design spec work types with technical-native scaffolding — v1.4 Phase 18
- ✓ Perplexity and technical-writing trust surfaces now have count and packaging regression coverage — v1.4 Phase 19

### Active

- None — v1.4 shipped on 2026-04-09 and no new milestone is defined yet.

### Out of Scope

- Real-time collaborative editing (Google Docs style) — complexity outweighs value for CLI tool
- GUI/web interface — Scriven runs inside existing AI agents, not as a standalone app
- AI model fine-tuning — Voice DNA works via prompt engineering, not model training
- Hosting/cloud storage — all files are local, writer owns everything

## Context

Scriven is built as a markdown-first skill system. Commands, agents, templates, and constraints are all file-based; the installer (`bin/install.js`) copies those assets into supported AI runtimes. There is no compiled runtime library; the host agent reads the markdown instructions and executes them with its own tools.

The product plan (`SCRIVEN-PRODUCT-PLAN-v0.3.md`) is the canonical source of truth. `data/CONSTRAINTS.json` is the runtime constraint system that governs work type availability, prerequisites, and adaptations.

Milestones v1.0 through v1.2 shipped the core product surface, multi-runtime installer expansion, and a complete documentation suite. The docs verification pass also exposed a new class of product problem: trust gaps between what the product promises and what the repo can prove today.

The most visible gaps were in the export stack and launch proof layer. Phase 13 aligned shipped-asset truth, Phase 14 standardized the Node 20+ installer baseline while making runtime evidence explicit, Phase 15 added the canonical proof layer that makes Scriven's voice-preservation wedge tangible, and Phase 16 turned those trust surfaces into release-time regression gates. Milestone v1.4 then extended that posture into Perplexity Desktop support and a first-pass technical-writing family without weakening the existing trust model.

## Constraints

- **Architecture**: Must remain a pure skill/command system — no compiled code, no runtime dependencies beyond Node.js for the installer
- **Voice fidelity**: Every feature must preserve the Voice DNA pipeline — fresh context per atomic unit, STYLE-GUIDE.md loaded first
- **Backward compatibility**: Existing 28 commands and templates must continue working as new features are added
- **Plan authority**: If a command file contradicts the product plan, fix the command — plan is canonical (section 15 for command specs)
- **Progressive disclosure**: Onboarding asks 3 questions max; depth is optional and additive

## Current State

**Latest shipped milestone:** v1.4 Perplexity & Technical Writing  
**Status:** Shipped 2026-04-09; no active milestone is currently defined

**Current product surface:**
- Perplexity Desktop is supported as a guided local-MCP runtime target with explicit trust framing
- Technical writing is a first-pass family with four work types and technical-native scaffolding
- Release-time tests protect packaging, counts, runtime wording, and technical-writing scope against drift

## Next Milestone Goals

- Choose the next product focus and define a fresh milestone with `/gsd-new-milestone`
- Decide whether the next expansion should deepen runtime verification, broaden public proof assets, or expand technical-writing outputs
- Keep the trust-first standard: new support claims should stay source-backed, narrow, and testable

<details>
<summary>Archived milestone context: v1.4 Perplexity & Technical Writing</summary>

**Goal:** Extend Scriven's runtime surface to Perplexity while defining a research-backed technical-writing expansion that fits the existing adaptive work-type system.

**Target features:**
- Add installer support for Perplexity as a named runtime target with support-level framing consistent with `docs/runtime-support.md`
- Add installer support for Perplexity Desktop if its path model differs from the CLI/runtime entry
- Research the technical-writing document families Scriven should support before implementing new work types or command adaptations
- Translate that research into scoped requirements for technical-writing work types, context files, and publishing/export expectations

**Key context:**
- The milestone should preserve the markdown-first, zero-runtime-dependency architecture
- Runtime additions must follow the same "installer target, not parity proof" discipline established in v1.3
- Technical-writing support should be research-first so document taxonomy and table-stakes are based on real technical-writing workflows rather than guessed from adjacent prose types

</details>

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Fresh context per atomic unit (drafter) | Prevents voice drift, context bloat; keeps each unit at its best | ✓ Good |
| Markdown-only architecture (no compiled code) | Maximum portability across AI agents; no build step needed | ✓ Good |
| CONSTRAINTS.json as single source for command availability | One file controls all work type adaptations; easy to extend | ✓ Good |
| Ship npm + polish in parallel | Get npx working early for feedback while improving experience | ✓ Good |
| GSD-derived phase decomposition | Product plan has 10 phases but GSD regrouped into 8 for standard granularity | ✓ Good |
| Generic SKILL.md installer for platforms without command directories | Manus and future platforms can use Scriven without needing a proprietary command system | ✓ Good |
| Trust beats breadth on the launch surface | Narrow, provable claims create more confidence than ambitious but weakly evidenced breadth | ✓ Good |
| Guided runtime targets can be first-class when their setup model is explicit | Some host surfaces are real but do not expose writable command registries; guided setup is better than fake parity | ✓ Good |
| Technical writing should start as a small, domain-native family | A narrow set of real document types produces better adaptive behavior than one vague catch-all type | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition:**
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone:**
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-09 after shipping milestone v1.4*
