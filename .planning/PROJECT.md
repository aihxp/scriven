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
- ✓ Silent multi-runtime installer flags shipped for Codex and Claude Code without prompt-only fallback — v1.5 Phase 20
- ✓ Codex installs now expose native `$scr-*` skills backed by mirrored installed command markdown — v1.5 Phase 21
- ✓ Runtime docs and regression coverage now describe the same Codex and Claude install surfaces the installer writes — v1.5 Phase 22
- ✓ Installer file writes are crash-safe via temp-file-then-rename with orphan cleanup — v1.6 Phase 23
- ✓ Frontmatter parser handles colons in values and scopes extraction to the `---` block — v1.6 Phase 24
- ✓ Settings validated against hand-written schema with migration-before-validation — v1.6 Phase 25
- ✓ User-customized settings and templates survive reinstall via field-level merge and content-hash backup — v1.6 Phase 26
- ✓ Installed command files use correct invocation syntax per runtime with code-block preservation — v1.6 Phase 27
- ✓ All v1.6 hardening behaviors locked by 88 regression tests with requirement-to-test traceability — v1.6 Phase 28

### Active

- **CMD-01**: Sacred-exclusive commands must expose one canonical installed runtime name per host surface, and every command file or doc that references them must use that real surface
- **CMD-02**: Installer/runtime inventory generation must come from one canonical command-source model so sacred commands cannot appear both as phantom top-level commands and namespaced commands in the same runtime
- **CMD-03**: Cross-file validation must detect command references that do not resolve against the installed runtime surface for the target host
- **CMD-04**: Adapted command names shown to writers (`/scr:new-figure`, `/scr:procedure-map`, `/scr:peer-review`, etc.) must either install runnable wrappers/aliases or be reframed as descriptive adaptations rather than direct invocation strings
- **CMD-05**: Help, router, sacred docs, work-type docs, and command reference must stay aligned on whether adapted names are runnable commands, conceptual renames, or display-only vocabulary
- **CMD-06**: Claude Code must use one flat `/scr-*` command surface consistently across installer output, docs, examples, and upgrade guidance
- **CMD-07**: Claude-facing command examples for autopilot/autonomous-style flows must use the flat `/scr-*` surface consistently, matching the runtime-native pattern Scriven already claims in README/getting-started
- **CMD-08**: Any remaining Claude-specific `/scr:*` examples in launch, guide, or reference docs must be normalized or explicitly marked as non-Claude surfaces
- **CMD-09**: Regression tests must cover nested sacred command discovery plus dead-reference detection across `commands/`, `docs/`, and installer-generated manifests
- **CMD-10**: Contributor/runtime docs must clearly explain the naming contract by host: Claude uses `/scr-*`, Codex uses `$scr-*`, and any namespaced or adapted forms must specify whether they are installed or conceptual

### Validated (v1.7 so far)

- ✓ `templates/sacred/<tradition>/` + `templates/platforms/<platform>/` drop-in extension points — v1.7 Phase 29 (ARCH-01, ARCH-02)
- ✓ `architectural_profiles` schema in `data/CONSTRAINTS.json` with tradition/platform taxonomies + inference map — v1.7 Phase 29 (ARCH-03)
- ✓ `lib/architectural-profiles.js` runtime validator + default-inference (listTraditions, listPlatforms, validateTradition, validatePlatform, inferTradition, inferPlatform) — v1.7 Phase 29 (ARCH-04, ARCH-05)
- ✓ Phase 29 locked by 54 regression tests (1132 total) — zero new dependencies
- ✓ Export cleanup dry-run/--apply, validate gate (STEP 1.5) in export.md/publish.md — v1.7 Phase 30 (VG-01..VG-05)
- ✓ Staged front-matter generation: scaffold:true YAML, STEP 1.6 gate, GENERATE auto-refresh — v1.7 Phase 31 (FM-01..FM-04)
- ✓ `/scr:build-ebook` EPUB pipeline (Pandoc, accessibility lang/alt/nav, platform manifests) — v1.7 Phase 32 (BUILD-01..BUILD-03)
- ✓ `/scr:build-print` print PDF pipeline (Pandoc+Typst, KDP/Ingram trim sizes, page-count guardrail) — v1.7 Phase 32 (BUILD-04, BUILD-05)
- ✓ Platform manifests (KDP, IngramSpark, Apple, B&N, D2D, Kobo, Google, Smashwords) — v1.7 Phase 32 (PLATFORM-01..PLATFORM-03)
- ✓ Phase 32 locked by 90 regression tests (1266 total) — zero new dependencies
- ✓ All 10 sacred tradition manifests populated with book_order, approval_block, font_stack, rtl, numbering, script — v1.7 Phase 33 (TRAD-01..TRAD-04)
- ✓ STEP 1.7 (TRADITION LOADING) added to build-ebook.md and build-print.md — v1.7 Phase 33 (TRAD-05)
- ✓ front-matter.md STEP 3.5 approval block scaffold for traditions requiring ecclesiastical approval — v1.7 Phase 33 (TRAD-03-behavioral)
- ✓ `/scr:sacred-verse-numbering` command for tradition verse citation reference — v1.7 Phase 33 (TRAD-04-behavioral)
- ✓ Phase 33 locked by 161 regression tests (1427 total) — zero new dependencies
- ✓ Stage play Typst template (Samuel French format, 8.5×11, centered ALLCAPS character names, italic stage directions) — v1.7 Phase 34 (TPL-01)
- ✓ Picture book Typst template (8.75×8.75 with 0.125" bleed + 0.25" safe zone, spread pagination) — v1.7 Phase 34 (TPL-02)
- ✓ Fixed-layout EPUB CSS + OPF stub (`-epub-layout: pre-paginated`, `rendition:layout`, auto-detect for picture_book) — v1.7 Phase 34 (TPL-03)
- ✓ Smashwords DOCX reference doc + companion style spec + `/scr:build-smashwords` command — v1.7 Phase 34 (TPL-04)
- ✓ Chapbook Typst template (5.5×8.5, saddle-stitch page-count constraint) — v1.7 Phase 34 (TPL-05)
- ✓ Poetry submission DOCX reference doc + companion style spec + `/scr:build-poetry-submission` command (title page, conditional TOC for 5+ poems) — v1.7 Phase 34 (TPL-06)
- ✓ STEP 1.8 (work-type template routing) added to build-print.md; `--fixed-layout` flag added to build-ebook.md — v1.7 Phase 34
- ✓ Phase 34 locked by 44 regression tests (1471 total) — zero new dependencies
- ✓ Five academic LaTeX wrapper templates (IEEEtran, acmart, llncs, elsarticle, apa7) as minimal publisher-class routing wrappers — v1.7 Phase 35 (TPL-07)
- ✓ `--platform ieee|acm|lncs|elsevier|apa7` route in build-print producing `.tex` output with two-level kpsewhich pre-flight detection and per-class tlmgr guidance — v1.7 Phase 35 (TPL-07)
- ✓ Phase 35 locked by 39 regression tests (1510 total) — zero new dependencies

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

## Current Milestone: v1.8 Command Surface Coherence

**Goal:** Make Scriven's command surface truthful and runtime-native so every documented command name is runnable in the host that advertises it.

**Target features:**
- Sacred-exclusive command naming repair so command files, docs, manifests, and installer output agree on the real installed names
- Adapted command alias policy: either generate runnable aliases for renamed commands or stop presenting them as invokable commands
- Claude Code flat `/scr-*` surface audit and completion, including autopilot/autonomous-style commands and example snippets
- Canonical command inventory generation for installer manifests and documentation
- Dead-command reference detection across `commands/`, `docs/`, and installer-generated surfaces
- Runtime naming policy docs that explain Claude flat slash commands, Codex `$scr-*` skills, and namespaced surfaces where applicable

**Key context:**
- Triggered by live review findings showing that sacred workflows, help surfaces, and generic manifests can currently advertise command names the installer never creates
- User requested Claude refactor guidance aligned with the flat GSD pattern used in `gsd-build/get-shit-done`, where commands are documented as `/gsd-help`, `/gsd-progress`, and `/gsd-autonomous`
- Must preserve zero-dependency architecture and keep command behavior file-backed; surface changes should come from installer/runtime contracts, not a compiled dispatcher
- Voice DNA pipeline must not regress while command names, aliases, or runtime wrappers are normalized

## Current State

**Latest shipped milestone:** v1.7 Last Mile (complete 2026-04-17)
**Status:** v1.8 planning active. v1.7 is shipped; 1510 regression tests currently pass.

**Current product surface:**
- Installer writes are crash-safe via atomic temp-file-then-rename with orphan cleanup on startup
- Frontmatter parser handles real-world content correctly (colons in values, body content isolation, multiline/array)
- Settings validated against hand-written schema with migration-before-validation to avoid bootstrap deadlocks
- User customizations to settings.json and templates survive reinstall via field-level merge and SHA-256 content-hash backup
- Codex command files now use `$scr-*` invocation syntax, code blocks preserved unchanged
- Full export stack: EPUB (Pandoc, accessible), print PDF (Pandoc+Typst, KDP/Ingram trim sizes), academic LaTeX (.tex via 5 publisher wrapper templates), Smashwords DOCX, poetry submission DOCX
- Sacred tradition profiles for 10 traditions with book-order, approval-block, font stack, RTL, numbering
- Cross-domain templates: stage play, picture book, fixed-layout EPUB, chapbook, poetry submission, academic (IEEE/ACM/LNCS/Elsevier/APA7)
- 1510 regression tests lock all behavior with requirement-to-test traceability

## Latest Milestone: v1.7 Last Mile

**Goal:** Close the production edge — ship real build pipelines, cross-domain templates, and per-platform awareness so Scriven reaches publication-ready output for any supported work type, not just book prose.

**Outcome shipped:**
- `/scr:cleanup` + validate gate — scaffold bracket stripping and placeholder lint before export
- `/scr:build-ebook` — Pandoc EPUB 3 pipeline with accessibility (lang, alt, nav), platform manifests for 8 retailers
- `/scr:build-print` — Pandoc+Typst PDF pipeline with KDP/IngramSpark trim sizes and page-count guardrail
- Staged front-matter generation (auto vs scaffold-only vs personalize) with STEP 1.6 gate
- Sacred tradition profiles for 10 traditions (Catholic, Orthodox, Tewahedo, Protestant, Jewish, Islamic-Hafs, Islamic-Warsh, Pali, Tibetan, Sanskrit)
- Stage play Typst template (Samuel French), picture book Typst template (8.75×8.75 with bleed)
- Fixed-layout EPUB CSS + OPF stub, Smashwords DOCX reference doc, chapbook Typst template
- Poetry submission DOCX reference doc with title page and conditional TOC
- Five academic LaTeX wrapper templates (IEEEtran, acmart, llncs, elsarticle, apa7) with kpsewhich pre-flight detection
- Architectural extension points: `templates/sacred/<tradition>/` + `templates/platforms/<platform>/`

**Stats:** 7 phases, 18 plans, 39 new tests in Phase 35 alone (1510 total), zero new dependencies

## Next Milestone Goals

- v1.8 Command Surface Coherence — fix sacred command name breakage, resolve adapted alias truthfulness, and finish the Claude flat `/scr-*` contract
- Defer broader product expansion until the command surface is internally consistent across installer output, docs, and runtime manifests

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
| Codex should be treated as a skill-native runtime, not a slash-command clone | Match the host's real discovery surface while keeping installed command markdown as the behavior source of truth | ✓ Good |
| Silent installs must clean only Scriven-owned runtime outputs | Reliability gains are not worth risking user-managed host files | ✓ Good |
| Runtime command names must only advertise installable surfaces | A guide that points at dead command names erodes trust faster than a missing feature | In progress in v1.8 |
| Claude Code should follow a flat `/scr-*` surface, mirroring GSD's runtime-native style | Flat slash commands are easier to discover and match the upstream host conventions Scriven now claims to support | In progress in v1.8 |

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
*Last updated: 2026-04-18 — v1.8 Command Surface Coherence started; requirements and roadmap definition in progress*
