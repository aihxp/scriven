# Architecture Patterns

**Domain:** CLI creative writing tool — export, illustration, translation, and collaboration pipelines
**Researched:** 2026-04-06

## Existing Architecture Summary

Scriven is a **pure markdown skill system** — no compiled code, no runtime dependencies beyond Node.js for the installer. Each command is a markdown file in `commands/scr/` with frontmatter and instructions. The AI agent (Claude Code, Cursor, Gemini CLI) reads the markdown and executes accordingly. Five agents (drafter, researcher, continuity-checker, voice-checker, plan-checker) live in `agents/`. The drafter uses fresh-context-per-atomic-unit to prevent voice drift. `CONSTRAINTS.json` is the single source of truth for command availability, work type adaptations, and gating.

**Key constraint:** All new architecture must remain within this pattern. No compiled code. No runtime library. The AI agent is the runtime.

## Recommended Architecture

### The Orchestrator-Delegate Pattern

Every new pipeline (export, illustration, translation, collaboration) follows the same structural pattern that already works for drafting:

```
Command markdown (orchestrator)
  -> Reads context files (.manuscript/*)
  -> Determines what to do based on CONSTRAINTS.json + config.json
  -> Delegates to either:
     a) An agent markdown file (for AI-generated content)
     b) A shell command via the AI agent's Bash tool (for external tools)
     c) Another command markdown file (for sub-pipelines)
```

This is how `publish.md` already works — it wraps multiple lower-level commands into a single pipeline. The new pipelines extend this pattern.

### System Architecture Diagram

```
                          .manuscript/
                    (canonical data layer)
                              |
            +-----------------+-----------------+
            |                 |                 |
     Context Files      config.json      CONSTRAINTS.json
     (WORK.md, etc)    (project cfg)    (command gating)
            |                 |                 |
            +--------+--------+---------+-------+
                     |                  |
              Command Layer          Agent Layer
           (commands/scr/*.md)    (agents/*.md)
                     |                  |
         +-----------+-----------+      |
         |           |           |      |
      Export      Illustrate  Translate |
      Pipeline    Pipeline    Pipeline  |
         |           |           |      |
         v           v           v      v
    External      Prompt       Glossary  Drafter
    Tools         Files        + TM      (existing)
    (pandoc,      (.manuscript  (.manuscript
     wkhtmltopdf)  /art/)       /translations/)
         |
         v
    .manuscript/output/
    (final deliverables)
```

### Component Boundaries

| Component | Responsibility | Communicates With | Files It Owns |
|-----------|---------------|-------------------|---------------|
| **Export Pipeline** | Assembles manuscript from drafts, converts to target format via external tools | Context files, config.json, CONSTRAINTS.json, external CLI tools (pandoc) | `.manuscript/output/*` |
| **Illustration Pipeline** | Generates detailed image prompts, manages art direction, organizes visual assets | Context files (CHARACTERS.md, WORLD.md), ART-DIRECTION.md | `.manuscript/art/*` |
| **Translation Pipeline** | Translates manuscript unit-by-unit preserving voice, manages glossary and TM | Context files, STYLE-GUIDE.md, GLOSSARY-{lang}.md, translation-memory.json | `.manuscript/translations/{lang}/*` |
| **Collaboration System** | Wraps git operations in writer-friendly abstractions, manages revision tracks | Git CLI, STATE.md, config.json (developer_mode flag) | Git branches, `.manuscript/reviews/*` |
| **Publish Orchestrator** | Coordinates multi-step publishing workflows using presets or wizard | All pipelines above, CONSTRAINTS.json for preset availability | `.manuscript/output/*` (final packages) |

### Critical Boundary Rule

**The AI agent is the runtime. Commands are instructions, not code.** Every command markdown file tells the AI agent what to do. When external tools are needed (pandoc, git), the command instructs the AI to invoke them via the Bash tool. This means:

- Export commands do NOT contain Node.js code that calls pandoc
- Export commands contain instructions that tell the AI agent to run `pandoc` via Bash
- The AI agent reads the command, understands the intent, runs the shell commands, and reports results
- This preserves the "no compiled code" constraint completely

## Pipeline Architectures

### 1. Export Pipeline

**Data Flow:**

```
.manuscript/drafts/body/*.md
  + .manuscript/drafts/front-matter/*.md
  + .manuscript/drafts/back-matter/*.md
       |
       v
  [Assembly Step]
  Command: export.md reads config.json for work_type,
  determines document order from OUTLINE.md + FRONT-MATTER.md + BACK-MATTER.md,
  concatenates drafts into single manuscript markdown
       |
       v
  .manuscript/output/manuscript-assembled.md
       |
       +---> [Markdown export] copy as-is
       |
       +---> [DOCX export] pandoc --to docx with reference-doc for styling
       |          (manuscript format: 12pt TNR, double-spaced, 1" margins)
       |          (formatted: custom styles, headers, page numbers)
       |
       +---> [PDF export] pandoc --to pdf via LaTeX engine (xelatex)
       |          (manuscript: same as DOCX manuscript styling)
       |          (print-ready: trim size, bleed, embedded fonts, CMYK)
       |
       +---> [EPUB export] pandoc --to epub3 with metadata.yaml + cover image
       |          (reflowable, TOC, CSS for typography)
       |
       +---> [LaTeX export] pandoc --to latex with template
       |          (journal templates, thesis templates)
       |
       +---> [Fountain export] custom markdown-to-fountain transform
       |          (screenplay-specific, simpler than pandoc)
       |
       +---> [FDX export] fountain-to-fdx XML transform
       |
       +---> [Package exports] combine interior + cover + metadata
                (KDP, IngramSpark, D2D, submission, query packages)
```

**Assembly is the hard part, not conversion.** Pandoc handles format conversion well. The real complexity is:
1. Knowing the correct document order (front matter elements vary by work type and tradition)
2. Applying the right styling per format (manuscript vs. formatted vs. print-ready)
3. Handling platform-specific requirements (KDP spine width calculation, IngramSpark bleed specs)
4. Generating metadata files (OPF for EPUB, metadata.yaml for pandoc)

**External tool dependency: Pandoc.** This is the only external tool the export pipeline needs. It handles markdown-to-DOCX, markdown-to-PDF (via LaTeX), markdown-to-EPUB, and markdown-to-LaTeX. The command markdown instructs the AI agent to check for pandoc availability and guide installation if missing.

**Pandoc is not a compiled dependency of Scriven** — it is a system tool the AI agent invokes via Bash, the same way it invokes `git`. The export command markdown contains the pandoc invocation patterns. If pandoc is not installed, the command tells the user how to install it (brew install pandoc, apt install pandoc, etc.).

**For PDF print-ready output**, pandoc needs a LaTeX engine (xelatex or lualatex). The command should detect this and guide installation. For simpler PDF needs, wkhtmltopdf or weasyprint are lighter alternatives, but pandoc+xelatex produces publication-quality output with proper typesetting.

**Suggested command structure:**

```
commands/scr/
  export.md              # Main export router (reads --format flag, dispatches)
  export/
    _assemble.md         # Internal: assembles manuscript from drafts (shared step)
    _metadata.md         # Internal: generates metadata for target format
    docx.md              # DOCX-specific pandoc options and reference-doc
    pdf.md               # PDF-specific: manuscript vs. print-ready
    epub.md              # EPUB-specific: metadata, CSS, cover
    latex.md             # LaTeX-specific: journal/thesis templates
    fountain.md          # Screenplay: markdown-to-fountain rules
    fdx.md               # Final Draft XML generation
    kdp-package.md       # KDP assembly: interior + cover template + metadata
    ingram-package.md    # IngramSpark assembly
    query-package.md     # Agent query: letter + synopsis + chapters
    submission-package.md # Full publisher submission
```

Prefixing internal commands with `_` signals they are not user-facing — they are invoked by other commands.

### 2. Illustration Pipeline

**Data Flow:**

```
CHARACTERS.md / FIGURES.md    (character descriptions)
WORLD.md / COSMOLOGY.md       (setting descriptions)
STYLE-GUIDE.md                (tone, aesthetic sensibility)
ART-DIRECTION.md              (visual style guide — generated or manual)
       |
       v
  [Prompt Generation Step]
  Agent: illustrator.md generates detailed image prompts
  from character/setting/scene data + art direction
       |
       v
  .manuscript/art/
    cover/
      front-cover-prompt.md      # Detailed prompt for front cover
      spine-specs.md             # Calculated dimensions, text placement
      back-cover-prompt.md       # Blurb layout + imagery prompt
      full-wrap-prompt.md        # Combined template prompt
    interior/
      {unit}-{N}-illustration-prompt.md
    character-refs/
      {character-name}-ref-prompt.md
    maps/
      {location}-map-prompt.md
```

**This pipeline generates prompts, not images.** Scriven is a CLI tool running inside AI coding agents. It does not call image generation APIs directly (that would require API keys, billing, compiled dependencies). Instead, it generates richly detailed prompts that the writer can use with:

- The AI agent's built-in image generation (Claude, Gemini have native image capabilities)
- External tools (Midjourney, DALL-E, Stable Diffusion, Flux)
- Human illustrators (the prompts serve as detailed art briefs)

The `--prompt-only` flag on `cover-art` already signals this design intent in the product plan.

**The illustrator agent** is a new agent (`agents/illustrator.md`) that understands:
- Visual composition (rule of thirds, focal points, color theory)
- Genre conventions for cover art (thriller = dark tones, romance = warm tones, etc.)
- Platform specs (KDP cover dimensions, EPUB thumbnail requirements)
- Character visual consistency across multiple prompts (reference sheets anchor this)

**ART-DIRECTION.md is the visual equivalent of STYLE-GUIDE.md.** It anchors visual consistency the same way STYLE-GUIDE.md anchors voice consistency. It should be generated once via `/scr:art-direction` and loaded into every illustration prompt generation.

**Cover art has a calculated component:** KDP spine width = page count x paper factor (0.0025" white, 0.002" cream). The cover command must read STATE.md for page count, config.json for paper type, and compute dimensions. This is arithmetic the AI agent can do — no compiled code needed.

### 3. Translation Pipeline

**Data Flow:**

```
.manuscript/drafts/body/{unit}-{N}-DRAFT.md   (source text, unit by unit)
STYLE-GUIDE.md                                 (voice DNA for source)
CHARACTERS.md / FIGURES.md                     (names, speech patterns)
       |
       v
  [Glossary Build Step]
  Command: translation-glossary.md
  Scans manuscript for proper nouns, invented terms,
  recurring phrases. Writer approves translations.
       |
       v
  .manuscript/translations/GLOSSARY-{lang}.md
  .manuscript/translations/translation-memory.json
       |
       v
  [Translation Step — per atomic unit]
  Agent: translator.md (new agent)
  Fresh context per unit (same pattern as drafter)
  Receives: source unit + glossary + TM + cultural adaptation notes
       |
       v
  .manuscript/translations/{lang}/drafts/{unit}-{N}-DRAFT.md
       |
       v
  [Cultural Adaptation Step]
  Command: cultural-adaptation.md
  Flags idioms, humor, measurements, customs for review
       |
       v
  [Back-Translation Verification]
  Agent: translator.md in reverse mode
  Translates back to source language for meaning verification
       |
       v
  [Quality Review]
  Command: translation-review.md
  Consistency check, style guide compliance, glossary adherence
       |
       v
  [Multi-Language Export]
  Export pipeline runs per-language with localized metadata
  .manuscript/output/translations/{lang}/
```

**The translator agent follows the drafter pattern exactly:** fresh context per atomic unit, loaded with the source unit text + glossary + translation memory + target language style notes. This prevents the same problems the drafter avoids — drift, context bloat, inconsistency.

**Translation memory (TM)** is a JSON file mapping source phrases to approved target-language phrases. It grows over the project lifetime. Each translated unit's approved segments get added to the TM. This is standard practice in professional translation (tools like SDL Trados and MemoQ use this pattern).

**Sacred text translation adds a register layer.** The translator agent must respect the translation philosophy (formal equivalence, dynamic equivalence, paraphrase) configured per language, and preserve liturgical phrases marked as "preserve in source" in the glossary.

**RTL and CJK support** is primarily an export concern, not a translation concern. The translator produces markdown. The export pipeline must apply correct directionality (HTML `dir="rtl"` for EPUB, appropriate LaTeX packages for PDF). This is handled in export templates, not in the translation agent.

### 4. Collaboration System

**Data Flow:**

```
Writer issues /scr:track create "editor-pass"
       |
       v
  [Git Branch Operation]
  Command: track.md instructs AI to run:
  git checkout -b scriven/editor-pass
  (scriven/ prefix namespaces branches)
       |
       v
  Writer/editor works normally (all commands work on current branch)
       |
       v
  Writer issues /scr:track compare main
       |
       v
  [Diff Generation]
  Command reads git diff, formats as side-by-side passage comparison
  In writer mode: shows prose passages, not diff hunks
  In developer mode: shows standard diff output
       |
       v
  Writer issues /scr:track merge editor-pass
       |
       v
  [Pre-Merge Continuity Check]
  Runs continuity-checker agent on merged result
  Flags contradictions as "continuity conflicts"
       |
       v
  [Git Merge]
  If clean: git merge scriven/editor-pass
  If conflicts: present as side-by-side passages for human resolution
       |
       v
  [Post-Merge State Update]
  STATE.md updated with merge record
```

**Git is the engine, Scriven is the dashboard.** The collaboration system does not reinvent version control — it wraps git with writer-friendly terminology and presentation. The `developer_mode` flag in config.json determines whether the writer sees git terminology or Scriven abstractions.

**Branch naming convention:** `scriven/{track-name}` keeps Scriven branches visually separate from any development branches in the same repo.

**The writer-mode git abstractions** (`/scr:save`, `/scr:history`, `/scr:compare`, `/scr:undo`, `/scr:versions`) are thin wrappers:

| Writer Command | Git Operation |
|----------------|---------------|
| `/scr:save "finished ch3"` | `git add .manuscript/ && git commit -m "finished ch3"` |
| `/scr:history` | `git log --oneline .manuscript/` formatted as timeline |
| `/scr:compare draft-1 draft-2` | `git diff draft-1..draft-2 -- .manuscript/` formatted as passages |
| `/scr:undo` | `git revert HEAD` (safe, creates new commit) |
| `/scr:versions` | `git tag -l "draft-*"` formatted as version list |

**Conflict resolution in writer mode** must NEVER show raw diff markers (`<<<<<<<`, `=======`, `>>>>>>>`). The command formats conflicts as:

```
Continuity conflict in Chapter 3, Scene 2:

  VERSION A (your edit):
  "Marcus set the letter on the kitchen table and poured himself coffee."

  VERSION B (editor's edit):
  "Marcus crumpled the letter and dropped it in the wastebasket."

  Which version do you prefer? (a/b/edit)
```

## Component Dependencies (Build Order)

```
                    [Writer-Mode Git Abstractions]
                              |
                    (depends on git being initialized)
                              |
              +---------------+---------------+
              |                               |
    [Collaboration System]          [Export Pipeline]
              |                          |
              |                    (depends on assembly)
              |                          |
              |               [Assembly Command]
              |                    |         |
              |              [Front Matter] [Back Matter]
              |                               |
              |                    [Illustration Pipeline]
              |                    (cover art for packages)
              |                               |
              +-------------------------------+
                              |
                    [Translation Pipeline]
                    (translates assembled + exported content)
                              |
                    [Multi-Language Export]
                    (export pipeline per language)
```

### Suggested Build Order

**Phase A: Export Foundation** (build first — everything else depends on output)

1. Assembly command (`_assemble.md`) — concatenates drafts into single manuscript
2. Metadata generation (`_metadata.md`) — creates pandoc metadata.yaml
3. Markdown export — trivial (copy assembled file)
4. DOCX export — pandoc with reference-doc templates
5. PDF export — pandoc via xelatex with templates
6. EPUB export — pandoc with CSS and cover placeholder

**Rationale:** Export is the foundation. Publishing presets, illustration (cover for packages), translation (multi-language export), and collaboration (comparing versions) all need export to exist. Start here.

**Phase B: Illustration Pipeline** (build second — covers needed for export packages)

1. Art direction command (`art-direction.md`) + ART-DIRECTION.md template
2. Illustrator agent (`agents/illustrator.md`)
3. Cover art command with KDP dimension calculations
4. Character reference sheet command
5. Interior illustration prompt command
6. Children's book / comic specific tools

**Rationale:** Cover art prompts are needed before KDP/IngramSpark package exports can be complete. Art direction document anchors visual consistency for all subsequent illustration work.

**Phase C: Export Packages** (build third — now covers exist)

1. KDP package export (interior PDF + cover + metadata)
2. IngramSpark package
3. Query package (letter + synopsis + chapters)
4. Submission package
5. D2D package
6. Screenplay exports (Fountain, FDX)
7. Academic exports (LaTeX templates, BibTeX)

**Rationale:** Packages combine export + illustration + front/back matter. All dependencies now exist.

**Phase D: Collaboration System** (build fourth — independent of export)

1. Writer-mode git abstractions (`save`, `history`, `compare`, `undo`, `versions`)
2. Track commands (create, list, switch, compare, merge)
3. Writer-mode conflict resolution (prose-formatted, not diff-formatted)
4. Revision proposal workflow (propose, review, accept/reject)
5. Co-writing parallel track support

**Rationale:** Collaboration requires git fluency in the command layer but no dependency on export or illustration. It can be built in parallel with Phase C if resources allow, but sequentially it makes sense after export since it is lower priority for solo writers.

**Phase E: Translation Pipeline** (build fifth — depends on export + potentially illustration)

1. Translation glossary command + GLOSSARY-{lang}.md template
2. Translator agent (`agents/translator.md`) — fresh context per unit
3. Cultural adaptation command
4. Translation review command
5. Back-translation verification
6. Translation memory system
7. Multi-language export (runs export pipeline per language)
8. Sacred text translation extensions (formal/dynamic equivalence, canonical alignment)

**Rationale:** Translation is the most complex pipeline and depends on both export (for multi-language output) and potentially illustration (for localized cover text). It also has the smallest initial user base. Build last.

**Phase F: Multi-Runtime Expansion** (build alongside any phase)

Multi-runtime support is an installer concern, not an architecture concern. The markdown commands are runtime-agnostic. The installer (`bin/install.js`) already supports Claude Code, Cursor, and Gemini CLI. Adding Codex, OpenCode, Copilot, Windsurf, and Antigravity means adding entries to the `RUNTIMES` object in the installer with the correct directory paths for each platform. No command or agent files need to change.

**The only risk:** Some runtimes may have different Bash tool names, different agent invocation patterns, or different file system conventions. Each new runtime needs a compatibility check against the command patterns (does it support `Read`, `Write`, `Bash`? Does it support agent delegation?).

## Patterns to Follow

### Pattern 1: Fresh Context Per Unit (extend to translation)

**What:** Each atomic unit gets its own agent invocation with clean context. No carryover between units.

**When:** Any time the AI agent generates creative content that must be consistent with a style reference (drafting, translating, illustrating).

**Why it works for translation:** Translation drift is analogous to voice drift. A translator working on chapter 20 should not be influenced by phrasing decisions from chapter 3 that were not captured in the glossary/TM. Fresh context + glossary + TM gives the translator exactly what it needs, nothing more.

### Pattern 2: Prompt-Not-Product (illustration pipeline)

**What:** Generate detailed, structured prompts rather than calling image generation APIs directly.

**When:** Any visual asset generation (covers, illustrations, character refs, maps).

**Why:** Keeps Scriven dependency-free. Works with any image generation tool (including human illustrators). Prompt files are version-controllable, reviewable, and editable. The writer retains full control over the visual direction.

### Pattern 3: External Tool as Optional Dependency

**What:** Commands instruct the AI agent to invoke external CLI tools (pandoc, git) but gracefully handle their absence.

**When:** Export (pandoc), collaboration (git), PDF generation (xelatex).

**How:**
```
Step 1: Check if tool exists (which pandoc / git --version)
Step 2: If missing, explain what it does and how to install it
Step 3: If present, invoke it with the correct flags
Step 4: Verify output (check file exists, non-zero size)
```

**This is NOT a compiled dependency.** The command markdown contains the instructions. The AI agent executes them. If pandoc is not installed, the export command explains the situation and offers alternatives (e.g., "I can export to clean markdown now, and you can convert to DOCX/PDF once pandoc is installed").

### Pattern 4: Namespace Prefixing (collaboration branches)

**What:** All Scriven-managed git branches use `scriven/` prefix.

**When:** Any branch created by track commands.

**Why:** Prevents collision with development branches. Makes it trivial to list all Scriven tracks (`git branch --list "scriven/*"`). Signals to the writer that these are manuscript branches, not code branches.

### Pattern 5: Config-Driven Behavior (developer mode vs. writer mode)

**What:** `config.json.developer_mode` (boolean) controls terminology, visibility, and abstraction level across all commands.

**When:** Collaboration commands, history commands, any command that touches git or filesystem concepts.

**Why:** Writers should never see `git checkout -b`, `merge conflict`, or `.manuscript/drafts/body/`. They should see "create a revision track", "continuity conflict", and "your chapters". Developers can opt into the raw view.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Compiling Markdown to JavaScript

**What:** Creating a build step that compiles command markdown files into executable JavaScript.

**Why bad:** Destroys the core value proposition. Commands must remain human-readable markdown that any AI agent can interpret. A build step adds complexity, breaks portability, and makes contributions harder.

**Instead:** Keep commands as pure markdown instructions. The AI agent is the interpreter.

### Anti-Pattern 2: Embedding API Keys in Commands

**What:** Having illustration or translation commands call external APIs directly (OpenAI image API, Google Translate API, etc.).

**Why bad:** Requires API key management, billing, network dependencies, error handling for rate limits/failures. Violates "no runtime dependencies beyond Node.js for the installer."

**Instead:** Generate prompts (illustration) or use the AI agent's native capabilities (translation). The AI agent already has API access — Scriven does not need its own.

### Anti-Pattern 3: Monolithic Export Command

**What:** One massive `export.md` that handles every format in a single file.

**Why bad:** Becomes unreadable at 500+ lines. Different formats have different concerns. Changes to EPUB export should not risk breaking PDF export.

**Instead:** Use the router pattern — `export.md` reads the `--format` flag and delegates to format-specific sub-commands in `commands/scr/export/`.

### Anti-Pattern 4: Storing Binary Assets in Git

**What:** Committing generated images, PDFs, EPUBs to the git repository.

**Why bad:** Bloats the repository. Binary diffs are meaningless. Merge conflicts on binaries are irrecoverable.

**Instead:** Add `.manuscript/output/` and `.manuscript/art/*.png` (etc.) to `.gitignore`. Store only the prompts, templates, and source markdown. Generated outputs are reproducible from source.

### Anti-Pattern 5: Real-Time Translation (Translate-As-You-Draft)

**What:** Automatically translating each unit as it is drafted, before the full manuscript is stable.

**Why bad:** Translations become stale as the manuscript undergoes editor review, continuity fixes, voice adjustments. The writer ends up with N languages worth of drift to manage during revision.

**Instead:** Translation happens after the manuscript is finalized (post-editor-review, post-beta-reader). The product plan already positions translation in Phase 7, after quality review (Phase 4) and export foundation (Phase 5).

## Scalability Considerations

| Concern | Solo Writer | Small Team (2-4) | Translation Team (5+) |
|---------|-------------|-------------------|----------------------|
| File system | Single .manuscript/ | Same repo, branch-per-person | Same repo OR fork-per-language |
| Git history | Linear, simple | Branching, periodic merges | Heavy branching, managed merges |
| Export | Run once per format | Same | Per-language, potentially automated |
| Conflict resolution | Rare (single author) | Occasional (passage-level) | Frequent (terminology alignment) |
| Translation memory | N/A | N/A | Critical — must be shared and up-to-date |
| Performance concern | None | None | Glossary/TM lookup at scale (1000+ entries) |

For the solo writer (primary user), this architecture adds zero overhead. For teams, the git-based collaboration system scales naturally. The only scaling concern is translation memory at very large document sizes, which is managed by the per-unit fresh context pattern (load only relevant TM entries per unit, not the full TM).

## New Files and Agents Summary

### New Agents

| Agent | Purpose | Pattern |
|-------|---------|---------|
| `agents/illustrator.md` | Generates image prompts from character/setting/scene data + art direction | Like drafter: receives context files, produces structured output |
| `agents/translator.md` | Translates one atomic unit in target language preserving voice | Exactly like drafter: fresh context per unit, glossary replaces STYLE-GUIDE as anchor |
| `agents/assembler.md` | Assembles manuscript from drafts in correct document order | New pattern: reads OUTLINE.md + front/back matter config, produces single file |

### New Command Directories

| Path | Purpose |
|------|---------|
| `commands/scr/export/` | Format-specific export sub-commands |
| `commands/scr/track.md` | Collaboration: revision track management |
| `commands/scr/save.md` | Writer-mode: git commit abstraction |
| `commands/scr/history.md` | Writer-mode: visual timeline |
| `commands/scr/compare.md` | Writer-mode: passage comparison |
| `commands/scr/undo.md` | Writer-mode: safe revert |
| `commands/scr/versions.md` | Writer-mode: draft version list |
| `commands/scr/translate.md` | Translation pipeline entry point |
| `commands/scr/translation-glossary.md` | Glossary build and manage |
| `commands/scr/cultural-adaptation.md` | Flag cultural references for review |
| `commands/scr/back-translate.md` | Verification via back-translation |
| `commands/scr/translation-review.md` | Quality review of translated text |
| `commands/scr/multi-publish.md` | Multi-language simultaneous export |
| `commands/scr/cover-art.md` | Cover generation prompt pipeline |
| `commands/scr/art-direction.md` | Visual style guide generation |
| `commands/scr/illustrate-scene.md` | Scene illustration prompts |
| `commands/scr/character-ref.md` | Character reference sheet prompts |

### New Templates

| Template | Purpose |
|----------|---------|
| `templates/ART-DIRECTION.md` | Visual style guide template |
| `templates/GLOSSARY-{lang}.md` | Translation glossary template |
| `templates/export/reference.docx` | Pandoc reference doc for DOCX styling |
| `templates/export/epub.css` | EPUB typography stylesheet |
| `templates/export/metadata.yaml` | Pandoc metadata template |

## Sources

- [Pandoc User's Guide](https://pandoc.org/MANUAL.html) — universal document converter, handles md-to-DOCX/PDF/EPUB/LaTeX
- [Pandoc EPUB documentation](https://pandoc.org/epub.html) — EPUB-specific options and metadata
- [node-pandoc npm package](https://www.npmjs.com/package/node-pandoc) — Node.js wrapper (reference only; Scriven invokes pandoc directly via Bash)
- [Git for Authors](https://d.moonfire.us/garden/git-for-authors/) — patterns for using git with creative writing
- [Upwelling: Real-time collaboration with version control for writers](https://www.inkandswitch.com/upwelling/) — research on writer-friendly version control
- [OpenAI Image Generation API](https://developers.openai.com/api/docs/guides/image-generation) — reference for prompt structure (Scriven generates prompts, not API calls)
- [@lesjoursfr/html-to-epub](https://www.npmjs.com/package/@lesjoursfr/html-to-epub) — actively maintained EPUB generation (alternative reference if pandoc is unavailable)
