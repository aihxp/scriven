# Feature Landscape

**Domain:** CLI-based AI creative writing system (spec-driven skill system for AI coding agents)
**Researched:** 2026-04-06
**Scope:** Phases 2-10 features (post-MVP). Core workflow already built.

## Competitive Context

Scriven occupies a unique position: it is not a GUI app competing with Scrivener/Atticus/Vellum, nor a hosted AI writing platform competing with Sudowrite/NovelCrafter. It is a **CLI skill system** that runs inside AI coding agents. Its competition is "the writer's current workflow" -- typically some combination of Scrivener (organization), ProWritingAid (editing), Atticus/Vellum (formatting), and manual KDP upload.

**Key insight from research:** No existing tool covers the full pipeline from blank page to published book in a single system. Writers currently stitch together 3-5 tools. Scriven's differentiator is pipeline completeness with voice fidelity, not feature-by-feature superiority in any one area.

---

## Table Stakes

Features users expect from a system promising "blank page to published book." Missing = product feels incomplete or abandoned. These map primarily to Phases 2-5.

| Feature | Why Expected | Complexity | Phase | Notes |
|---------|--------------|------------|-------|-------|
| **Autopilot mode (guided)** | Every AI writing tool offers some form of "keep going." Sudowrite has Auto/Guided Write, NovelCrafter has AI chat. Writers expect to say "write the next chapter" and have it happen. | Medium | 2 | Guided profile (pause after each unit) is the minimum. Supervised and full-auto are differentiators. |
| **Writer mode (hide git)** | Non-technical writers are the primary audience for creative writing tools. Scrivener, Atticus, Vellum all hide file-system complexity. Exposing git = instant drop-off. | Low | 2 | Toggle between developer mode (shows git) and writer mode (shows save/history/compare). Critical for adoption by actual writers vs. developer-writers. |
| **Save/history/undo abstractions** | Every writing tool has versioning. Scrivener has snapshots, Google Docs has version history, Atticus auto-saves. Writers expect to undo mistakes without understanding git. | Medium | 2 | Wraps git commit/log/diff/reset in writer-friendly vocabulary: save, history, compare, versions, undo. |
| **Character management** | Scrivener has character sheets in the Binder. Sudowrite has structured character cards with pronouns, personality, background, dialogue style. NovelCrafter's Codex auto-indexes characters. This is table stakes for any fiction writing system. | Medium | 3 | new-character, character-sheet, cast-list. Must support the adapted forms (new-figure for sacred, new-concept for academic). |
| **Plot/structure visualization** | Scrivener has the corkboard and outliner. NovelCrafter has visual act/scene planning. Plottr exists solely for this. Writers expect to see their story structure at a glance. | Medium | 3 | plot-graph with multiple arc types (three-act, hero's journey, save the cat, kishotenketsu). Markdown-based since CLI, but structured and scannable. |
| **Line edit and copy edit** | ProWritingAid's entire value prop. Grammarly exists. Every serious writing tool has grammar/style checking. Without this, Scriven is "drafting only" and writers leave for the polish step. | Medium | 4 | Must go beyond grammar. Line edit = prose quality (sentence rhythm, word choice, redundancy). Copy edit = correctness (grammar, spelling, consistency). Two distinct passes. |
| **Beta reader simulation** | Sudowrite has feedback features. ProWritingAid has readability analysis. Writers want a "first reader" opinion before showing real humans. Already a command shell -- needs implementation depth. | Medium | 4 | Focus on actionable feedback: pacing issues, confusion points, emotional beats that land vs. miss. Not generic "this is good." |
| **Export to DOCX and PDF** | Every tool exports. Scrivener's Compile is its most powerful feature. Atticus and Vellum exist primarily for formatting. Without export, the manuscript is trapped in markdown. | High | 5 | Requires external tooling (likely Pandoc or similar) since Scriven is markdown-only architecture. DOCX manuscript format (12pt TNR, double-spaced) and PDF are the minimum. |
| **Front matter and back matter** | Vellum generates title pages, copyright, TOC automatically. Atticus includes front/back matter templates. Self-publishers expect professional book structure, not just the body text. | Medium | 5 | 19 front matter elements, 12+ back matter elements per the product plan. Start with the 5 most critical: title page, copyright, TOC, about author, also-by. |
| **Blurb and synopsis generation** | Reedsy and numerous online tools generate blurbs. It is one of the most-requested AI writing features. Self-publishers need this for KDP listings, query letters, marketing. | Low | 5 | Low complexity because it is summarization of existing manuscript -- the hard part (writing the book) is already done. |
| **KDP/EPUB export** | This is the literal endpoint of self-publishing. Atticus ($147) and Vellum ($250-$450) exist primarily for this. If Scriven cannot produce a KDP-ready package, the pipeline is broken. | High | 5 | KDP package = interior PDF (correct trim, margins, bleed) + cover template (calculated spine width) + metadata. EPUB 3.0 for ebook. This is the hardest export challenge. |

---

## Differentiators

Features that set Scriven apart. Not expected (competitors mostly lack these), but high-value when present. These map primarily to Phases 2, 3, 6-10.

| Feature | Value Proposition | Complexity | Phase | Notes |
|---------|-------------------|------------|-------|-------|
| **Autopilot supervised/full-auto modes** | Sudowrite has Auto Write but it is chapter-at-a-time. No tool offers "run the entire manuscript pipeline unattended with quality gates." Full-auto with voice drift detection and continuity checks is genuinely novel. | High | 2 | The pause conditions (voice drift, continuity contradiction, plot hole) are what make this valuable vs. "just keep generating." Without quality gates, full-auto produces slop. |
| **Session pause/resume with context** | No AI writing tool handles "I closed my laptop 3 days ago, where was I?" well. Sudowrite and NovelCrafter lose conversational context between sessions. Scriven's STATE.md-based resume is a real advantage. | Medium | 2 | Already partially built via STATE.md. Needs pause-work/resume-work commands that capture and restore full context including what the writer was thinking about. |
| **Relationship mapping** | Sudowrite tracks character relationships as text fields. NovelCrafter has Progressions for tracking changes. Neither generates visual relationship maps. | Medium | 3 | Markdown-based relationship graphs. Value increases with cast size. Prerequisite: 2+ characters in CHARACTERS.md. |
| **Character voice samples** | Sudowrite has "Dialogue Style" per character. No tool generates testable voice samples before drafting. This directly supports voice fidelity -- Scriven's core value. | Low | 3 | Generate 5-line dialogue sample per character for writer approval. Stored as voice anchors. Feeds into drafter agent for dialogue scenes. |
| **World-building command** | NovelCrafter's Codex has Locations and Lore categories. Scrivener has research folders. Neither offers structured world-building generation with consistency enforcement. | Medium | 3 | WORLD.md generation with geographic, cultural, technological, magical/scientific rules. Feeds into continuity checker to prevent contradictions. |
| **Dialogue audit** | ProWritingAid has basic dialogue analysis. No tool offers character-specific dialogue voice checking -- "does Character A sound different from Character B?" | Medium | 4 | Leverages character voice samples from Phase 3. Checks attribution, dialect consistency, subtext, talking-head detection. |
| **Pacing analysis** | ProWritingAid has a Pacing Report that identifies slow paragraphs. Scriven can go deeper because it understands story structure (which scene is a climax vs. a breather). | Medium | 4 | Structure-aware pacing: "Chapter 7 is your midpoint but reads like a transition. Chapter 12 is consecutive action with no recovery." |
| **Sensitivity review** | No mainstream writing tool offers this. Some writers hire sensitivity readers ($250-$500+). AI-powered sensitivity review is genuinely new and valuable. | Medium | 4 | Must be nuanced, not a keyword blocker. Flag potential issues with context, suggest alternatives, note where something might be intentional craft vs. accidental harm. |
| **Cover art prompt generation** | No writing tool generates cover art prompts calibrated to genre conventions and the actual story. This is usually a separate workflow (hire a designer, or use Canva/Midjourney separately). | Medium | 6 | Generate detailed AI image prompts (not actual images -- Scriven has no image generation). Includes genre conventions (romance = couple, thriller = dark tones), KDP specs (spine width calculation), series consistency. |
| **Interior illustration prompts** | Children's book and comic authors currently manage illustration direction entirely outside their writing tool. | Medium | 6 | Art direction document, character reference sheets, scene illustration prompts, spread layouts. Particularly valuable for children's books and comics where text-illustration coordination is critical. |
| **Translation pipeline** | No self-publishing tool offers integrated translation. Writers currently hire translators ($0.05-0.20/word) or use separate AI tools. A built-in pipeline with glossary management and cultural adaptation is genuinely novel. | High | 7 | Glossary management is the linchpin -- without consistent term translation, the output is unusable. Cultural adaptation flags (idioms, humor, customs) differentiate from raw machine translation. |
| **Back-translation verification** | Professional translation QA technique that no consumer tool offers. Translate the translation back to source language and compare. | Medium | 7 | Genuinely valuable for self-publishers entering non-English markets. Catches meaning drift that forward-only translation misses. |
| **Collaboration (revision tracks)** | Scrivener has basic revision modes. No AI writing tool offers git-backed collaboration with writer-friendly terminology. | High | 8 | Most solo authors will not use this immediately. But editor-writer workflow (revision proposals, editor notes, accept/reject) is valuable for anyone working with an editor. |
| **Sacred text support** | No writing tool, AI or otherwise, supports sacred/historical text creation with tradition-native vocabulary, voice registers, concordances, or cross-references. This is a genuinely unserved market. | Very High | 10 | 13 work types, 8 exclusive commands, 10 voice registers. Niche but deep. Pastors writing sermons, scholars producing commentaries, religious communities creating devotionals -- these users have zero tooling purpose-built for them. |
| **Sacred translation pipeline** | Formal vs. dynamic equivalence, canonical alignment, liturgical preservation -- these are specialized translation requirements that no tool addresses. | Very High | 10 | Depends on both the general translation pipeline (Phase 7) and the sacred text support. Unique selling point for religious publishing houses and mission organizations. |

---

## Anti-Features

Features to explicitly NOT build. Some are tempting but would violate Scriven's architecture or dilute its value.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Built-in image generation** | Scriven is a markdown-only skill system with no runtime dependencies. Bundling image generation (DALL-E, Midjourney, Stable Diffusion) would require API keys, cloud dependencies, and paid services. It would also couple Scriven to specific AI image providers. | Generate detailed, copy-pasteable prompts optimized for each AI image tool. The writer takes the prompt to their preferred image generator. Prompt quality is the value, not the rendering. |
| **Real-time collaborative editing** | Google Docs-style real-time co-editing requires a server, websockets, conflict resolution algorithms, and a fundamentally different architecture. Already listed as out of scope. | Git-based revision tracks with async collaboration. Editor-writer workflow through revision proposals. This matches how professional editing actually works (not real-time). |
| **GUI or web interface** | Scriven runs inside existing AI agents (Claude Code, Cursor, Gemini CLI). Building a separate GUI would split the codebase, require maintenance of a UI framework, and lose the context engineering advantages of running inside a coding agent. | Invest in the `/scr:next` and `/scr:do` natural language interfaces. Make the CLI experience so smooth that a GUI is unnecessary. Writer mode hides all terminal complexity. |
| **AI model fine-tuning** | Fine-tuning requires training infrastructure, datasets, GPU compute, and ongoing model maintenance. The product plan already rules this out. | Voice DNA via prompt engineering. STYLE-GUIDE.md loaded into every drafter invocation. Voice test calibration. This approach is model-agnostic and works as models improve. |
| **Hosting or cloud storage** | All files local. Adding cloud sync introduces authentication, storage costs, privacy concerns, and sync conflicts. | Git-based versioning. Writers can use GitHub, GitLab, or any remote for backup. The collaboration system (Phase 8) works through git remotes, not a proprietary cloud. |
| **Proprietary file format** | Locking writers into a custom format reduces trust and creates migration anxiety. Scrivener's .scrivx format is a common complaint. | Everything is markdown. The writer's manuscript is plain text files in a known directory structure. They can read, edit, and move their files without Scriven. |
| **Subscription pricing model** | Scrivener's one-time purchase and Atticus's one-time $147 are beloved by authors. Sudowrite's subscription model is frequently criticized. Writers resent recurring costs for tools. | npm package, one-time install, free. Scriven is a skill system, not a SaaS. No server costs to recover. The AI agent (Claude, etc.) has its own pricing -- Scriven adds no additional cost. |
| **Grammar checking engine** | ProWritingAid and Grammarly already do this extremely well. Building a grammar engine from scratch would be duplicative and inferior. | Leverage the AI agent's inherent language capabilities for line edit and copy edit commands. The AI model IS the grammar engine. Focus on creative writing-specific quality checks (voice, pacing, dialogue) that ProWritingAid cannot do. |
| **Word processor features** | Rich text editing, WYSIWYG formatting, font selection, pagination preview. This is Atticus/Vellum territory and requires a GUI. | Markdown authoring with export to formatted output. The writing experience is "write in your AI agent's terminal." The formatted result appears only at export time. |

---

## Feature Dependencies

```
Phase 2: Autopilot + Writer Mode
  autopilot (guided) ---- requires: core workflow (Phase 1) [DONE]
  autopilot (supervised) - requires: autopilot guided
  autopilot (full-auto) -- requires: autopilot supervised + voice-check + continuity-check
  writer-mode ------------ requires: git integration (Phase 1) [DONE]
  save/history/undo ------ requires: writer-mode
  session pause/resume --- requires: STATE.md (Phase 1) [DONE]

Phase 3: Structure & Character Tools
  new-character ---------- requires: WORK.md (Phase 1) [DONE]
  character-sheet -------- requires: CHARACTERS.md (from new-character)
  character-arc ---------- requires: CHARACTERS.md
  character-voice-sample - requires: CHARACTERS.md + STYLE-GUIDE.md (Phase 1) [DONE]
  relationship-map ------- requires: CHARACTERS.md with 2+ characters
  plot-graph ------------- requires: OUTLINE.md (Phase 1) [DONE]
  timeline --------------- requires: OUTLINE.md
  theme-tracker ---------- requires: THEMES.md (Phase 1) [DONE]
  subplot-map ------------ requires: OUTLINE.md with 2+ threads
  build-world ------------ requires: WORK.md

Phase 4: Quality & Review
  line-edit -------------- requires: draft_exists
  copy-edit -------------- requires: draft_exists
  dialogue-audit --------- requires: draft_exists + CHARACTERS.md (Phase 3 enhances this)
  pacing-analysis -------- requires: draft_exists + OUTLINE.md (structure awareness)
  voice-check ------------ requires: draft_exists + STYLE-GUIDE.md
  sensitivity-review ----- requires: draft_exists
  beta-reader ------------ requires: draft_exists
  continuity-check ------- requires: draft_exists

Phase 5: Publishing Pipeline
  front-matter ----------- requires: complete-draft
  back-matter ------------ requires: complete-draft
  blurb ------------------ requires: complete-draft
  synopsis --------------- requires: complete-draft
  query-letter ----------- requires: blurb + synopsis
  book-proposal ---------- requires: synopsis + sample chapter
  export markdown -------- requires: complete-draft
  export docx ------------ requires: complete-draft + Pandoc or equivalent
  export pdf ------------- requires: complete-draft + Pandoc/LaTeX or equivalent
  export epub ------------ requires: complete-draft + epub toolchain
  export kdp-package ----- requires: front-matter + back-matter + export + cover template
  export submission-pkg -- requires: query-letter + synopsis + manuscript export

Phase 6: Illustration
  art-direction ---------- requires: WORK.md + CHARACTERS.md (Phase 3)
  cover-art -------------- requires: WORK.md (ART-DIRECTION.md recommended)
  illustrate-scene ------- requires: ART-DIRECTION.md + scene drafted
  character-ref ---------- requires: CHARACTERS.md
  chapter-header --------- requires: WORK.md
  map-illustration ------- requires: WORLD.md (Phase 3)
  spread-layout ---------- requires: visual work types only
  panel-layout ----------- requires: comic work types only

Phase 7: Translation
  translate -------------- requires: complete-draft (Phase 5)
  translation-glossary --- requires: WORK.md (should build before translate)
  translation-memory ----- requires: existing translation
  cultural-adaptation ---- requires: translate
  back-translate --------- requires: translate
  multi-publish ---------- requires: translate + export pipeline (Phase 5)

Phase 8: Collaboration
  track create/switch ---- requires: git integration (Phase 1) [DONE]
  track compare/merge ---- requires: track with changes
  track propose ---------- requires: track with changes
  co-writing ------------- requires: collaboration system + continuity-check (Phase 4)

Phase 9: Multi-Runtime + Polish
  additional runtimes ---- requires: installer refactoring
  writer-profile system -- requires: profile-writer (Phase 1) [DONE]
  manager (command center) requires: all navigation commands
  academic features ------ requires: academic work types (Phase 1) [DONE]

Phase 10: Sacred Text Support
  sacred work types ------ requires: constraint system (Phase 1) [DONE]
  sacred voice registers - requires: STYLE-GUIDE.md system (Phase 1) [DONE]
  sacred commands -------- requires: sacred work types + draft_exists
  sacred translation ----- requires: translation pipeline (Phase 7) + sacred work types
  sacred front/back matter requires: publishing pipeline (Phase 5) + sacred work types
```

---

## MVP Recommendation (per Phase)

### Phase 2: Autopilot + Writer Mode -- Ship First
Prioritize:
1. **Writer mode toggle** -- Highest impact for non-technical writer adoption. Low complexity.
2. **Save/history/undo** -- Cannot have writer mode without this. The git abstraction layer.
3. **Autopilot guided** -- "Write the next chapter for me, but check in after." Most natural entry point.
4. **Session pause/resume** -- "Where was I?" is the #3 retention moment per the product plan.

Defer: Autopilot supervised and full-auto until voice-check and continuity-check are implemented (Phase 4). Without quality gates, full-auto produces garbage.

### Phase 3: Structure & Character -- Ship Second
Prioritize:
1. **new-character + character-sheet** -- Table stakes. Every competitor has this.
2. **plot-graph** -- Writers want to see their structure. High perceived value.
3. **character-voice-sample** -- Directly supports Scriven's core value (voice fidelity).
4. **build-world** -- High value for fantasy/sci-fi, the largest fiction genre segment.

Defer: relationship-map and subplot-map until after the core character and structure tools prove out. These require 2+ characters/threads respectively, so they are naturally gated.

### Phase 4: Quality & Review -- Ship Third
Prioritize:
1. **Line edit** -- The most-requested editing feature across all writing tools.
2. **Copy edit** -- Natural pair with line edit.
3. **Continuity check** -- Enables autopilot full-auto mode (Phase 2 dependency).
4. **Voice check** -- Enables autopilot full-auto mode and is core to Scriven's identity.

Defer: Dialogue audit and pacing analysis. Valuable but not blocking. Sensitivity review can come later as it requires careful implementation to avoid being either too aggressive or too permissive.

### Phase 5: Publishing Pipeline -- Ship Fourth
Prioritize:
1. **Export markdown** (clean compiled manuscript) -- Simplest, unblocks everything.
2. **Export DOCX manuscript format** -- What agents and editors expect for submissions.
3. **Blurb generation** -- Low complexity, high perceived value, needed for KDP.
4. **Front matter (title + copyright + TOC)** -- Minimum viable book structure.
5. **Export EPUB** -- Required for ebook publishing on all platforms.

Defer: KDP package (complex trim/bleed calculations), IngramSpark package, LaTeX export, FDX export. These are format-specific optimizations that can follow the core export pipeline. Query letter and book proposal depend on blurb + synopsis being solid.

### Phases 6-10: Order as Planned
The product plan's phase ordering for 6-10 is sound:
- **Phase 6 (Illustration)** depends on Phase 3 (characters, world) and Phase 5 (complete draft).
- **Phase 7 (Translation)** depends on Phase 5 (complete draft, export pipeline).
- **Phase 8 (Collaboration)** depends on Phase 4 (continuity check for merge validation).
- **Phase 9 (Multi-Runtime)** is independent but lower priority than user-facing features.
- **Phase 10 (Sacred)** depends on Phases 5 and 7 and is the most niche audience.

---

## Competitor Feature Matrix

| Feature | Scrivener | Atticus | Vellum | Sudowrite | NovelCrafter | ProWritingAid | Scriven (planned) |
|---------|-----------|---------|--------|-----------|-------------|---------------|-------------------|
| Manuscript organization | Strong | Basic | None | Basic | Good | None | Strong (file structure + OUTLINE.md) |
| Character management | Binder notes | None | None | Story Bible | Codex | None | Structured (CHARACTERS.md + voice samples) |
| Plot/structure planning | Corkboard | None | None | Story Engine | Visual planner | None | Plot graph + multiple arc types |
| AI drafting | None | None | None | Strong (Muse 1.5) | Strong (BYOK) | None | Strong (Voice DNA + fresh context) |
| Voice consistency | None | None | None | Basic | Basic | None | Core feature (Voice DNA, 15+ dimensions) |
| Grammar/style editing | None | None | None | Basic | None | Strong (25+ reports) | AI-powered (line edit + copy edit) |
| Book formatting | Compile | Strong | Strong | None | None | None | Export pipeline (markdown to DOCX/PDF/EPUB) |
| KDP-ready export | Indirect | Yes | Yes | None | None | None | Planned (KDP package) |
| Cover art | None | None | None | None | None | None | Prompt generation |
| Translation | None | None | None | None | None | None | Full pipeline (glossary, adaptation, verification) |
| Collaboration | Basic | None | None | None | None | None | Git-based revision tracks |
| Sacred text support | None | None | None | None | None | None | 13 work types, 8 exclusive commands |
| Price | $60 one-time | $147 one-time | $250-450 | $10/mo | $20-50/mo | $30/mo | Free (uses AI agent subscription) |
| Platform | Mac/Win/iPad | Web (all) | Mac only | Web | Web | Web + plugins | CLI (any OS with AI agent) |

---

## Sources

- [Scrivener Overview](https://www.literatureandlatte.com/scrivener/overview) -- Feature set and organizational approach
- [Vellum vs Atticus Comparison](https://entreresource.com/vellum-vs-atticus/) -- Formatting tool comparison
- [Atticus Review 2025](https://kindlepreneur.com/atticus-review/) -- Feature breakdown and pricing
- [Sudowrite Story Bible Documentation](https://docs.sudowrite.com/using-sudowrite/1ow1qkGqof9rtcyGnrWUBS/what-is-story-bible/jmWepHcQdJetNrE991fjJC) -- Character management features
- [Sudowrite Characters Documentation](https://docs.sudowrite.com/using-sudowrite/1ow1qkGqof9rtcyGnrWUBS/characters/a7tdE1ZB8KvAwMD3Mopwpd) -- Structured character data
- [NovelCrafter Codex](https://www.novelcrafter.com/features/codex) -- Story bible and world builder
- [NovelCrafter Features](https://www.novelcrafter.com/features) -- Full feature set
- [ProWritingAid Review 2025](https://doindigital.com/prowritingaid-review/) -- Editing tool capabilities
- [Best AI Writing Tools for Fiction 2026](https://blog.mylifenote.ai/the-11-best-ai-tools-for-writing-fiction-in-2026/) -- Market overview
- [Draft2Digital for Indie Authors](https://scribecount.com/author-resource/publishing-wide/draft2digital-for-indie-authors) -- Distribution platform features
- [KDP Formatting Requirements 2026](https://bookbeam.io/blog/kdp-formatting-requirements/) -- Technical specs
- [Writing Software Compared 2026](https://www.laterpress.com/comparisons/writing-software-compared/) -- Multi-tool comparison
