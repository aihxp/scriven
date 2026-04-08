# Scriven

## What This Is

Scriven is a spec-driven creative writing, publishing, and translation pipeline that runs inside AI coding agents. It takes writers from blank page to publication-ready manuscript with voice profiling, adaptive work types, autonomous drafting, illustration, translation, and multi-format export. It currently supports 46 work types with tradition-native vocabulary such as chapters, acts, and surahs.

## Core Value

**Drafted prose sounds like the writer, not like AI.** The Voice DNA system profiles the writer across 15+ dimensions and loads that profile into every drafter agent invocation. If voice fidelity breaks, trust breaks, and no other feature matters.

## Requirements

### Validated

- ✓ Core workflow commands (new-work → discuss → plan → draft → editor-review → submit → complete) — v0.3.0
- ✓ Adaptive naming system across 46 work types with structural hierarchy — v0.3.0
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

### Active

- [ ] Installation guidance and platform requirements must stay internally consistent around the Node.js 20+ installer baseline and runtime evidence model
- [ ] Product positioning should lead with the strongest wedge: AI-native longform writing with voice preservation
- [ ] Scriven needs proof artifacts that make trust tangible: end-to-end sample flow, runtime support matrix, and Voice DNA before/after demo
- [ ] Trust-critical claims must be regression-tested so shipped surface and docs do not drift apart again

### Out of Scope

- Real-time collaborative editing (Google Docs style) — complexity outweighs value for CLI tool
- GUI/web interface — Scriven runs inside existing AI agents, not as a standalone app
- AI model fine-tuning — Voice DNA works via prompt engineering, not model training
- Hosting/cloud storage — all files are local, writer owns everything

## Context

Scriven is built as a markdown-first skill system. Commands, agents, templates, and constraints are all file-based; the installer (`bin/install.js`) copies those assets into supported AI runtimes. There is no compiled runtime library; the host agent reads the markdown instructions and executes them with its own tools.

The product plan (`SCRIVEN-PRODUCT-PLAN-v0.3.md`) is the canonical source of truth. `data/CONSTRAINTS.json` is the runtime constraint system that governs work type availability, prerequisites, and adaptations.

Milestones v1.0 through v1.2 shipped the core product surface, multi-runtime installer expansion, and a complete documentation suite. The docs verification pass also exposed a new class of product problem: trust gaps between what the product promises and what the repo can prove today.

The most visible gaps are in the export stack and launch proof layer. Some docs and commands reference export templates that are not present in `data/export-templates/`, and runtime support claims are broader than the current proof artifacts. This milestone is tightening those seams by standardizing on a Node 20+ installer baseline and making runtime evidence explicit enough that first impressions match reality.

## Constraints

- **Architecture**: Must remain a pure skill/command system — no compiled code, no runtime dependencies beyond Node.js for the installer
- **Voice fidelity**: Every feature must preserve the Voice DNA pipeline — fresh context per atomic unit, STYLE-GUIDE.md loaded first
- **Backward compatibility**: Existing 28 commands and templates must continue working as new features are added
- **Plan authority**: If a command file contradicts the product plan, fix the command — plan is canonical (section 15 for command specs)
- **Progressive disclosure**: Onboarding asks 3 questions max; depth is optional and additive

## Current Milestone: v1.3 Trust & Proof

**Goal:** Make Scriven's launch surface feel fully earned by aligning shipped assets, claims, requirements, and proof artifacts around the product's strongest differentiator.

**Target features:**
- Resolve export-template truth gaps by either shipping missing templates or narrowing claims and command paths to the files that actually exist
- Align Node.js support policy, installer messaging, and package metadata on the `Node 20+` / `>=20.0.0` installer baseline
- Add runtime support proof so "full support" claims are backed by an explicit compatibility matrix and verification guidance
- Reposition top-level messaging around voice-preserving longform writing, with breadth framed as expansion rather than the first impression
- Add proof artifacts such as an end-to-end sample publishing flow and a Voice DNA before/after demonstration
- Add regression coverage for trust-critical docs, templates, and packaging claims

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
*Last updated: 2026-04-08 after Phase 13 completion*
