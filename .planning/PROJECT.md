# Scriven

## What This Is

Scriven is a spec-driven creative writing, publishing, and translation pipeline that runs inside AI coding agents (Claude Code, Cursor, Gemini CLI). It covers the full lifecycle from blank page to publication-ready manuscript — including voice profiling, adaptive work types, autonomous drafting, illustration, translation, and multi-format export. Supports 50+ work types with tradition-native vocabulary (novels use chapters, screenplays use acts, Quran commentaries use surahs).

## Core Value

**Drafted prose sounds like the writer, not like AI.** The Voice DNA system profiles the writer across 15+ dimensions and loads that profile into every drafter agent invocation. If voice fidelity breaks, trust breaks, and no other feature matters.

## Requirements

### Validated

- ✓ Core workflow commands (new-work → discuss → plan → draft → editor-review → submit → complete) — v0.3.0
- ✓ Adaptive naming system across 50+ work types with structural hierarchy — v0.3.0
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

### Active

- [ ] Demo sample project with pre-baked watchmaker story (5 scenes, full context files)
- [ ] Test suite (CONSTRAINTS.json validator, installer dry-run, command structure tests)
- [ ] npm publish readiness (package.json, bin setup, npx scriven@latest works)
- [ ] Autopilot mode (guided, supervised, full-auto profiles)
- [ ] Writer mode vs developer mode toggle
- [ ] Writer-friendly git abstractions (save, history, compare, versions, undo)
- [ ] Session management (pause-work, resume-work)
- [ ] Character creation and management tools
- [ ] Relationship mapping, character arcs, character voice samples
- [ ] Plot graph (three-act, five-act, hero's journey, kishotenketsu, etc.)
- [ ] Timeline, theme tracker, subplot mapping
- [ ] World-building command
- [ ] Line edit, copy edit commands
- [ ] Dialogue audit, pacing analysis
- [ ] Sensitivity review
- [ ] Full front matter (19 elements) and back matter (12+ elements)
- [ ] Blurb, synopsis, query letter, book proposal generators
- [ ] Export: markdown, docx (manuscript + formatted), PDF
- [ ] Export: EPUB, Fountain, FDX, LaTeX
- [ ] Export: KDP package, IngramSpark package, submission/query packages
- [ ] Cover art generation (front, spine, back, full wrap)
- [ ] Interior illustration prompts, character reference sheets
- [ ] Art direction document, chapter headers, map illustration
- [ ] Children's book / comic tools (spread layout, storyboard, panel layout)
- [ ] Translation pipeline (per-language)
- [ ] Glossary management, translation memory, cultural adaptation
- [ ] Back-translation verification, multi-language export
- [ ] RTL and CJK support
- [ ] Collaboration: revision tracks, compare/merge, editor-writer workflow
- [ ] Co-writing parallel tracks
- [ ] Multi-runtime expansion (Codex, OpenCode, Copilot, Windsurf, Antigravity)
- [ ] Writer profile system, manager (interactive command center)
- [ ] Academic-specific features (citation check, peer review, journal templates)
- [ ] Sacred voice registers (10 registers: prophetic, wisdom, legal, etc.)
- [ ] Sacred-adapted commands (new-figure, lineage-map, build-cosmology, etc.)
- [ ] Sacred translation pipeline (formal/dynamic equivalence, canonical alignment)
- [ ] Tradition-aware front/back matter

### Out of Scope

- Real-time collaborative editing (Google Docs style) — complexity outweighs value for CLI tool
- GUI/web interface — Scriven runs inside existing AI agents, not as a standalone app
- AI model fine-tuning — Voice DNA works via prompt engineering, not model training
- Hosting/cloud storage — all files are local, writer owns everything

## Context

Scriven is built as a Claude Code skill system — markdown files that define slash commands, agents, and templates. The installer (`bin/install.js`) copies these into the user's `.claude/` directory. There's no runtime library; the AI agent reads the command markdown and executes accordingly.

The product plan (`SCRIVEN-PRODUCT-PLAN-v0.3.md`) is the canonical source of truth at 1,887 lines across 20 sections. It went through 17 gap-fixes and is comprehensive. `data/CONSTRAINTS.json` is the runtime constraint system — every command checks it for work type availability, prerequisites, and adaptations.

Phase 1 MVP has 28 commands built, 5 agents, templates for all context files, and a working installer. The demo command exists but needs sample project content. Tests don't exist yet. npm publishing is not yet configured.

The previous developer established clear patterns for adding commands — each is a markdown file in `commands/scr/` with frontmatter and instructions. Adding new commands is mechanical work following these patterns.

## Constraints

- **Architecture**: Must remain a pure skill/command system — no compiled code, no runtime dependencies beyond Node.js for the installer
- **Voice fidelity**: Every feature must preserve the Voice DNA pipeline — fresh context per atomic unit, STYLE-GUIDE.md loaded first
- **Backward compatibility**: Existing 28 commands and templates must continue working as new features are added
- **Plan authority**: If a command file contradicts the product plan, fix the command — plan is canonical (section 15 for command specs)
- **Progressive disclosure**: Onboarding asks 3 questions max; depth is optional and additive

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Fresh context per atomic unit (drafter) | Prevents voice drift, context bloat; keeps each unit at its best | ✓ Good |
| Markdown-only architecture (no compiled code) | Maximum portability across AI agents; no build step needed | ✓ Good |
| CONSTRAINTS.json as single source for command availability | One file controls all work type adaptations; easy to extend | ✓ Good |
| Ship npm + polish in parallel | Get npx working early for feedback while improving experience | — Pending |
| GSD-derived phase decomposition | Product plan has 10 phases but GSD may regroup for better execution flow | — Pending |

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
*Last updated: 2026-04-06 after initialization*
