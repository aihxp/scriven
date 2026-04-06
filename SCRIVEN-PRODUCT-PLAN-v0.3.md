# SCRIVEN — Product Plan v0.3

**A spec-driven creative writing and publishing system for AI coding agents.**

**License:** MIT

---

## 1. Vision

Scriven is an end-to-end creative writing, publishing, and translation pipeline. It takes a writer from blank page to publication-ready manuscript in multiple languages — including front matter, back matter, cover art, KDP formatting, and multi-format export. It applies the same context engineering and subagent orchestration principles as GSD, but every concept is native to creative writing.

This is not a coding tool adapted for writing. This is a writing tool from the ground up.

**Five pipeline stages:**
1. **Create** — Define the work, characters, world, voice, structure
2. **Write** — Discuss → Plan → Draft → Review → Submit (per unit, loopable or autonomous)
3. **Polish** — Line edit, copy edit, beta read, sensitivity review, continuity check
4. **Publish** — Front/back matter, cover art, illustrations, export, translation, submission packages
5. **Collaborate** — Revision tracks, editor merge, co-writing, conflict resolution

All five stages can run in **autonomous mode** (unattended) or **interactive mode** (writer-in-the-loop).

---

## 2. Adaptive Structural Naming

The system adapts its terminology, hierarchy, and commands based on work type. The writer never sees coding terms — only terms native to their form.

### 2.1 Work Types and Structural Hierarchy

| Work Type | Top Level | Mid Level | Atomic Unit | Command Unit |
|-----------|-----------|-----------|-------------|--------------|
| **Novel** | Part | Chapter | Scene | `chapter` |
| **Novella** | — | Chapter | Scene | `chapter` |
| **Short Story** | — | Section | Beat | `section` |
| **Flash Fiction** | — | — | Beat | `beat` |
| **Screenplay** | Act | Sequence | Scene (INT/EXT) | `act` |
| **Stage Play** | Act | Scene | Beat | `act` |
| **TV Pilot** | Act (with breaks) | Scene | Beat | `act` |
| **TV Series Bible** | Season | Episode | Scene | `episode` |
| **Poetry Collection** | Section | — | Poem | `section` |
| **Single Poem** | — | Stanza | Line | `stanza` |
| **Essay** | — | Section | Paragraph Block | `section` |
| **Essay Collection** | Part | — | Essay | `part` |
| **Memoir** | Part | Chapter | Vignette | `chapter` |
| **Creative Nonfiction** | Part | Chapter | Scene | `chapter` |
| **Biography** | Part | Chapter | Scene | `chapter` |
| **Research Paper** | — | Section | Subsection | `section` |
| **Thesis / Dissertation** | Part | Chapter | Section | `chapter` |
| **Monograph** | Part | Chapter | Section | `chapter` |
| **Literature Review** | — | Section | Subsection | `section` |
| **Journal Article** | — | Section | Subsection | `section` |
| **White Paper** | — | Section | Subsection | `section` |
| **Comic / Graphic Novel** | Volume | Issue/Chapter | Page → Panel | `issue` |
| **Children's Book** | — | Spread | Page | `spread` |
| **Picture Book** | — | Spread (2-page) | Illustration + Text | `spread` |
| **Libretto / Musical** | Act | Scene | Number (song/dialogue) | `act` |
| **Audio Drama / Podcast Script** | Season | Episode | Scene | `episode` |
| **Interactive Fiction** | — | Node/Chapter | Choice Branch | `node` |
| **Game Narrative** | Act/Quest Line | Quest/Mission | Dialogue Tree | `quest` |
| **Speech** | — | Section | Beat | `section` |
| **Lyric / Song** | — | Section (verse/chorus/bridge) | Line | `section` |
| **Translation** | (mirrors source) | (mirrors source) | (mirrors source) | `segment` |
| **Anthology (editor)** | Section | — | Story/Poem | `section` |
| **Scripture (Biblical)** | Testament | Book → Chapter | Verse | `book` |
| **Scripture (Quranic)** | — | Surah | Ayah | `surah` |
| **Scripture (Torah)** | Chumash | Parashah → Chapter | Verse (Pasuk) | `parashah` |
| **Scripture (Vedic)** | Veda | Mandala / Kanda | Sukta / Hymn | `mandala` |
| **Scripture (Buddhist)** | Pitaka | Nikaya / Collection | Sutta | `sutta` |
| **Scripture (Generic)** | Testament / Part | Book / Section | Verse / Passage | `book` |
| **Commentary / Exegesis** | — | Source Text Section | Annotation Block | `section` |
| **Devotional** | — | Theme / Season | Entry (prayer/meditation/reflection) | `entry` |
| **Liturgical Text** | Rite / Service | Section (e.g., Liturgy of the Word) | Rubric / Prayer / Reading | `section` |
| **Historical Chronicle** | Era / Period | Chapter / Entry | Event / Passage | `chapter` |
| **Historical Account** | Part | Chapter | Scene / Passage | `chapter` |
| **Mythological Collection** | Cycle | — | Tale / Myth | `tale` |
| **Religious Epic** | Book / Parva | Canto / Chapter | Verse / Stanza | `canto` |
| **Sermon / Homily** | — | Movement | Beat | `sermon` |
| **Homiletic Collection** | Liturgical Year / Theme | — | Sermon / Homily | `sermon` |

### 2.2 Command Adaptation

Commands dynamically rename based on work type. Examples:

**Novel:**
```
/scr:discuss-chapter 3
/scr:plan-chapter 3
/scr:draft-chapter 3
/scr:editor-review 3
/scr:submit-chapter 3
```

**Screenplay:**
```
/scr:discuss-act 2
/scr:plan-act 2
/scr:draft-act 2
/scr:editor-review 2
```

**Research Paper:**
```
/scr:discuss-section "methodology"
/scr:plan-section "methodology"
/scr:draft-section "methodology"
/scr:peer-review "methodology"
```

The generic `/scr:discuss`, `/scr:plan`, `/scr:draft`, `/scr:review` also work and auto-detect the current unit.

### 2.3 Research Paper / Academic Adaptations

For academic work types, the system adapts:

| Creative Writing Concept | Academic Equivalent |
|--------------------------|---------------------|
| Brief (BRIEF.md) | Research Proposal (PROPOSAL.md) |
| Characters (CHARACTERS.md) | Key Concepts / Subjects (CONCEPTS.md) |
| World-building (WORLD.md) | Literature Context (CONTEXT.md) |
| Plot Graph (PLOT-GRAPH.md) | Argument Structure (ARGUMENT-MAP.md) |
| Style Guide (STYLE-GUIDE.md) | Citation Style + Voice Guide (STYLE-GUIDE.md) |
| Themes (THEMES.md) | Research Questions (QUESTIONS.md) |
| Editor Review | Peer Review |
| Beta Reader | Reviewer Simulation |
| Continuity Check | Citation Verification + Internal Consistency |
| Sensitivity Review | Ethics Review |
| Dialogue Audit | Source Voice Analysis (direct quotes vs. paraphrase) |
| Cover Art | — |
| Front/Back Matter | Front/Back Matter (academic variants) |

### 2.4 Sacred, Historical & Liturgical Adaptations

For sacred and historical work types, the system adapts with tradition-aware terminology:

| Creative Writing Concept | Sacred/Historical Equivalent |
|--------------------------|------------------------------|
| Brief (BRIEF.md) | Theological Framework / Historical Scope (FRAMEWORK.md) |
| Characters (CHARACTERS.md) | Figures (FIGURES.md) — prophets, saints, historical persons, deities, angels, patriarchs |
| Relationships (RELATIONSHIPS.md) | Lineages & Connections (LINEAGES.md) — genealogies, covenants, teacher-student, tribal affiliations |
| World-building (WORLD.md) | Setting & Cosmology (COSMOLOGY.md) — sacred geography, cosmological framework, heavenly/earthly realms |
| Plot Graph (PLOT-GRAPH.md) | Theological Arc (THEOLOGICAL-ARC.md) — covenant progression, salvation history, dharmic cycle, prophetic timeline |
| Themes (THEMES.md) | Doctrinal Threads (DOCTRINES.md) — theological themes, moral teachings, prophetic patterns |
| Style Guide (STYLE-GUIDE.md) | Voice & Register (STYLE-GUIDE.md) — with sacred-specific registers (see below) |
| Continuity Check | Doctrinal Consistency — theological contradictions, chronological accuracy, genealogical coherence |
| Editor Review | Scholarly / Pastoral Review — depending on context (academic study vs. devotional use) |
| Beta Reader | Theological Review — doctrinal soundness, interpretive faithfulness, pastoral sensitivity |
| Sensitivity Review | Interfaith Sensitivity — respectful treatment of traditions, scholarly neutrality |
| Dialogue Audit | Voice Register Audit — prophetic vs. wisdom vs. narrative register consistency |
| Timeline | Chronology — with era-appropriate dating (AM, AH, BCE/CE, regnal years) |

**Sacred voice registers** (replace standard fiction voice dimensions in STYLE-GUIDE.md):

| Register | Character | Used For |
|----------|-----------|----------|
| Prophetic | Urgent, declarative, "Thus says the Lord" | Prophetic books, revelation, divine speech |
| Wisdom | Aphoristic, reflective, balanced | Proverbs, Ecclesiastes, wisdom sutras |
| Legal / Halakhic | Precise, conditional, imperative | Law codes, commandments, rules of conduct |
| Liturgical | Formal, rhythmic, responsive | Prayers, blessings, liturgical instructions |
| Narrative-historical | Chronicle-like, temporal, factual | Historical books, hagiography, chronicles |
| Apocalyptic | Visionary, symbolic, cosmic | Revelation, Daniel, eschatological texts |
| Epistolary | Personal, didactic, pastoral | Letters, encyclicals, pastoral guidance |
| Poetic / Psalmic | Musical, metaphorical, parallelism | Psalms, hymns, devotional poetry |
| Parabolic | Story-within-story, allegorical, teaching | Parables, fables with moral teaching |
| Didactic | Instructional, systematic, expository | Catechisms, theological treatises, dharma talks |

**Sacred/historical-specific commands:**

```
/scr:concordance                      Build/search term concordance across text
/scr:cross-reference                  Map connections between passages (parallels, fulfillments, echoes)
/scr:genealogy [--verify]             Build and verify genealogical trees and lineages
/scr:chronology [--calendar <system>] Timeline with tradition-appropriate dating systems
/scr:annotation-layer [tradition]     Add commentary layer alongside primary text
/scr:verse-numbering [--system <s>]   Manage verse/ayah/pasuk numbering systems
/scr:source-tracking                  Track primary sources, oral traditions, manuscript variants
/scr:doctrinal-check                  Verify internal theological/doctrinal consistency
```

These commands are hidden for all non-sacred/historical work types via the constraint system.

---

## 3. Constraint System — Dependencies, Availability & Gating

Scriven enforces a three-layer constraint system that controls what's available, when, and for whom. This prevents irrelevant commands from cluttering the writer's experience and ensures workflow integrity.

### 3.1 Layer 1: Command Availability by Work Type

Every command has one of three states for each work type:

| State | Behavior |
|-------|----------|
| **Available** | Command works as designed |
| **Adapted** | Command exists but behavior/naming changes (e.g., `plot-graph` → `argument-map` for academic) |
| **Hidden** | Command doesn't appear in `/scr:help` and returns a friendly redirect if called directly |

#### 3.1.1 Command-to-Work-Type Matrix (Feature Groups)

**Character & World Commands:**

| Command | Prose | Script | Academic | Visual | Poetry | Interactive | Speech/Song | Sacred/Historical |
|---------|-------|--------|----------|--------|--------|-------------|-------------|-------------------|
| `new-character` | ✅ | ✅ | Adapted (→ `new-concept`) | ✅ | Hidden | ✅ | Hidden | Adapted (→ `new-figure`) |
| `character-sheet` | ✅ | ✅ | Adapted (→ `concept-sheet`) | ✅ | Hidden | ✅ | Hidden | Adapted (→ `figure-sheet`) |
| `relationship-map` | ✅ | ✅ | Hidden | ✅ | Hidden | ✅ | Hidden | Adapted (→ `lineage-map`) |
| `build-world` | ✅ | ✅ | Hidden | ✅ | Hidden | ✅ | Hidden | Adapted (→ `build-cosmology`) |
| `cast-list` | ✅ | ✅ | Hidden | ✅ | Hidden | ✅ | Hidden | Adapted (→ `figures-list`) |
| `character-arc` | ✅ | ✅ | Hidden | ✅ | Hidden | ✅ | Hidden | Adapted (→ `figure-arc`) |
| `character-voice-sample` | ✅ | ✅ | Hidden | ✅ | Hidden | ✅ | Hidden | Adapted (→ `register-sample`) |

**Sacred/Historical Exclusive Commands** (no equivalent in any other work type group):

| Command | Prose | Script | Academic | Visual | Poetry | Interactive | Speech/Song | Sacred/Historical |
|---------|-------|--------|----------|--------|--------|-------------|-------------|-------------------|
| `concordance` | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden | ✅ |
| `cross-reference` | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden | ✅ |
| `genealogy` | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden | ✅ |
| `chronology` | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden | ✅ |
| `annotation-layer` | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden | ✅ |
| `verse-numbering` | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden | ✅ |
| `source-tracking` | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden | ✅ |
| `doctrinal-check` | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden | ✅ |

**Work type groups:** Prose = Novel, Novella, Short Story, Flash Fiction, Memoir, Creative Nonfiction, Biography, Essay, Essay Collection. Script = Screenplay, Stage Play, TV Pilot, TV Series Bible, Audio Drama, Libretto/Musical. Academic = Research Paper, Thesis, Journal Article, White Paper. Visual = Comic/Graphic Novel, Children's Book, Picture Book. Poetry = Poetry Collection, Single Poem, Song/Lyric. Interactive = Interactive Fiction, Game Narrative. Sacred/Historical = Scripture (Biblical, Quranic, Torah, Vedic, Buddhist, Generic), Commentary/Exegesis, Devotional, Liturgical Text, Historical Chronicle, Historical Account, Mythological Collection, Religious Epic, Sermon/Homily, Homiletic Collection.

**Sacred/Historical group** has 8 exclusive commands (`concordance`, `cross-reference`, `genealogy`, `chronology`, `annotation-layer`, `verse-numbering`, `source-tracking`, `doctrinal-check`) — all hidden for other work type groups.

**Narrative Structure Commands:**

| Command | Prose | Script | Academic | Visual | Poetry | Interactive | Speech/Song | Sacred/Historical |
|---------|-------|--------|----------|--------|--------|-------------|-------------|-------------------|
| `plot-graph` | ✅ | ✅ | Adapted (→ `argument-map`) | ✅ | Hidden | ✅ | Hidden | Adapted (→ `theological-arc`) |
| `timeline` | ✅ | ✅ | ✅ | ✅ | Hidden | ✅ | Hidden | Adapted (→ `chronology`) |
| `theme-tracker` | ✅ | ✅ | Adapted (→ `research-questions`) | ✅ | ✅ | ✅ | Hidden | Adapted (→ `doctrine-tracker`) |
| `subplot-map` | ✅ | ✅ | Hidden | Hidden | Hidden | ✅ | Hidden | Adapted (→ `narrative-threads`) |

**Analysis & Review Commands:**

| Command | Prose | Script | Academic | Visual | Poetry | Interactive | Speech/Song | Sacred/Historical |
|---------|-------|--------|----------|--------|--------|-------------|-------------|-------------------|
| `continuity-check` | ✅ | ✅ | Adapted (→ `citation-check`) | ✅ | Hidden | ✅ | Hidden | Adapted (→ `doctrinal-check`) |
| `voice-check` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Adapted (→ `register-check`) |
| `sensitivity-review` | ✅ | ✅ | Adapted (→ `ethics-review`) | ✅ | ✅ | ✅ | ✅ | Adapted (→ `interfaith-review`) |
| `pacing-analysis` | ✅ | ✅ | ✅ | ✅ | Hidden | ✅ | Hidden | ✅ |
| `dialogue-audit` | ✅ | ✅ | Hidden | Adapted (incl. balloon text) | Hidden | ✅ | Hidden | Hidden |
| `beta-reader` | ✅ | ✅ | Adapted (→ `reviewer-simulation`) | ✅ | ✅ | ✅ | ✅ | Adapted (→ `theological-review`) |
| `editor-review` | ✅ | ✅ | Adapted (→ `peer-review`) | ✅ | ✅ | ✅ | ✅ | Adapted (→ `scholarly-review`) |

**Illustration & Cover Commands:**

| Command | Prose | Script | Academic | Visual | Poetry | Interactive | Speech/Song | Sacred/Historical |
|---------|-------|--------|----------|--------|--------|-------------|-------------|-------------------|
| `cover-art` | ✅ | Hidden | Hidden | ✅ | ✅ | Hidden | Hidden | ✅ |
| `illustrate-scene` | ✅ | Hidden | Hidden | ✅ (primary) | Hidden | ✅ | Hidden | ✅ |
| `character-ref` | ✅ | ✅ | Hidden | ✅ (primary) | Hidden | ✅ | Hidden | Adapted (→ `figure-ref`) |
| `art-direction` | ✅ | Hidden | Hidden | ✅ (primary) | Hidden | ✅ | Hidden | ✅ |
| `chapter-header` | ✅ | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden | ✅ |
| `map-illustration` | ✅ | Hidden | Hidden | ✅ | Hidden | ✅ | Hidden | ✅ (sacred geography) |
| `spread-layout` | Hidden | Hidden | Hidden | ✅ (primary) | Hidden | Hidden | Hidden | Hidden |
| `panel-layout` | Hidden | Hidden | Hidden | Comic only | Hidden | Hidden | Hidden | Hidden |
| `storyboard` | Hidden | ✅ | Hidden | ✅ | Hidden | Hidden | Hidden | Hidden |

**Front/Back Matter Commands:**

| Command | Prose | Script | Academic | Visual | Poetry | Interactive | Speech/Song | Sacred/Historical |
|---------|-------|--------|----------|--------|--------|-------------|-------------|-------------------|
| `front-matter` | ✅ | ✅ | Adapted (academic elements) | ✅ | Hidden | Hidden | Hidden | Adapted (imprimatur, nihil obstat, preface) |
| `back-matter` | ✅ | ✅ | Adapted (bibliography, index) | ✅ | Hidden | Hidden | Hidden | Adapted (glossary, concordance, maps) |
| `blurb` | ✅ | ✅ | Hidden | ✅ | ✅ | ✅ | Hidden | ✅ |
| `synopsis` | ✅ | ✅ | Hidden | ✅ | Hidden | Hidden | Hidden | Hidden |
| `query-letter` | ✅ | ✅ | Hidden | Hidden | Hidden | Hidden | Hidden | ✅ |
| `book-proposal` | ✅ (nonfiction) | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden | ✅ |
| `discussion-questions` | ✅ | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden | Adapted (→ `study-questions`) |

### 3.2 Layer 2: Export Availability by Work Type

| Export Format | Prose | Script | Academic | Visual | Poetry | Interactive | Speech/Song | Sacred/Historical |
|---------------|-------|--------|----------|--------|--------|-------------|-------------|-------------------|
| Markdown | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Word (manuscript) | ✅ | ✅ | ✅ | Hidden | ✅ | Hidden | ✅ | ✅ |
| Word (formatted) | ✅ | Hidden | ✅ | Hidden | ✅ | Hidden | ✅ | ✅ |
| PDF (manuscript) | ✅ | ✅ | ✅ | ✅ | ✅ | Hidden | ✅ | ✅ |
| PDF (print-ready) | ✅ | Hidden | Hidden | ✅ | ✅ | Hidden | Hidden | ✅ |
| Fountain | Hidden | ✅ | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden |
| Final Draft (.fdx) | Hidden | Screenplay/TV only | Hidden | Hidden | Hidden | Hidden | Hidden | Hidden |
| LaTeX | Hidden | Hidden | ✅ | Hidden | Hidden | Hidden | Hidden | ✅ (critical editions) |
| EPUB 3.0 | ✅ | Hidden | Hidden | ✅ | ✅ | ✅ | Hidden | ✅ |
| MOBI/KF8 | ✅ | Hidden | Hidden | ✅ | Hidden | Hidden | Hidden | ✅ |
| KDP package | ✅ | Hidden | Hidden | ✅ | ✅ | Hidden | Hidden | ✅ |
| IngramSpark package | ✅ | Hidden | Hidden | ✅ | ✅ | Hidden | Hidden | ✅ |
| Query package | ✅ | ✅ | Hidden | Hidden | Hidden | Hidden | Hidden | ✅ |
| Submission package | ✅ | ✅ | Hidden | Hidden | Hidden | Hidden | Hidden | ✅ |
| APA/MLA/Chicago | Hidden | Hidden | ✅ | Hidden | Hidden | Hidden | Hidden | Hidden |
| BibTeX | Hidden | Hidden | ✅ | Hidden | Hidden | Hidden | Hidden | Hidden |

### 3.3 Layer 3: Command Dependency Chain (Workflow Gating)

Commands enforce prerequisites. If a prerequisite isn't met, Scriven tells the writer what to run first — or offers to run it automatically.

#### 3.3.1 Core Workflow Chain (Strict Sequential)

```
new-work
  → discuss-{unit} [N]          Requires: OUTLINE.md
    → plan-{unit} [N]           Requires: {N}-CONTEXT.md
      → draft-{unit} [N]        Requires: {N}-*-PLAN.md files
        → editor-review [N]     Requires: {N}-*-DRAFT.md files
          → submit-{unit} [N]   Requires: {N}-EDITOR-NOTES.md (passed or revision done)
            → complete-draft     Requires: ALL units submitted
              → new-revision     Requires: Archived draft
```

Each step can be skipped with `--skip-discuss`, `--skip-research`, etc., but the prerequisite *files* must still exist (the skip flag means Scriven generates defaults rather than asking the writer).

#### 3.3.2 Feature Prerequisites

| Command | Requires |
|---------|----------|
| `relationship-map` | CHARACTERS.md with ≥2 characters |
| `subplot-map` | OUTLINE.md with ≥2 narrative threads |
| `character-arc [name]` | Character must exist in CHARACTERS.md |
| `character-voice-sample [name]` | Character must exist + STYLE-GUIDE.md |
| `plot-graph` | OUTLINE.md |
| `timeline` | OUTLINE.md (or ≥1 drafted unit) |
| `theme-tracker` | THEMES.md |
| `continuity-check` | ≥1 drafted unit |
| `voice-check` | ≥1 drafted unit + STYLE-GUIDE.md |
| `pacing-analysis` | ≥1 drafted unit |
| `dialogue-audit` | ≥1 drafted unit with dialogue |
| `beta-reader` | ≥1 drafted unit |
| `line-edit` | ≥1 drafted unit |
| `copy-edit` | ≥1 drafted unit |
| `sensitivity-review` | ≥1 drafted unit |
| `illustrate-scene` | ART-DIRECTION.md + scene must be drafted |
| `character-ref` | Character must exist in CHARACTERS.md |
| `cover-art` | WORK.md + CHARACTERS.md (optional but improves output) |
| `map-illustration` | WORLD.md with geographic content |
| `concordance` | ≥1 drafted unit (sacred/historical only) |
| `cross-reference` | ≥2 drafted units (sacred/historical only) |
| `genealogy` | FIGURES.md with ≥2 figures (sacred/historical only) |
| `chronology` | OUTLINE.md or ≥1 drafted unit (sacred/historical only) |
| `annotation-layer` | ≥1 drafted unit (sacred/historical only) |
| `verse-numbering` | ≥1 drafted unit (sacred/historical only) |
| `source-tracking` | WORK.md (sacred/historical only) |
| `doctrinal-check` | ≥1 drafted unit + DOCTRINES.md (sacred/historical only) |

#### 3.3.3 Publishing Prerequisites

| Command | Requires |
|---------|----------|
| `front-matter` | complete-draft (for TOC, page references) |
| `back-matter` | complete-draft (for index, endnotes) |
| `blurb` | complete-draft (needs full story to summarize) |
| `synopsis` | complete-draft |
| `query-letter` | blurb + synopsis |
| `book-proposal` | synopsis + ≥1 sample chapter |
| `discussion-questions` | complete-draft |
| `export` | complete-draft (for full manuscript formats) |
| `export` (per-unit) | submit-{unit} (for individual unit export) |
| `kdp-package` | front-matter + back-matter + export |
| `translate` | complete-draft (finalized text) |
| `cultural-adaptation` | translate (translation must exist) |
| `back-translate` | translate (translation must exist) |
| `multi-publish` | translate (≥1 language) + kdp-package or export |

#### 3.3.4 Soft Prerequisites (Recommended but Not Required)

Some commands work better with certain context but don't hard-block:

| Command | Recommended | Without It |
|---------|-------------|-----------|
| `draft-{unit}` | `discuss-{unit}` run first | Uses defaults from STYLE-GUIDE.md |
| `plan-{unit}` | Research enabled | Plans without genre research |
| `cover-art` | CHARACTERS.md, ART-DIRECTION.md | Generates from WORK.md alone |
| `translate` | translation-glossary built | Translates without term consistency |
| `autopilot` | profile-writer run first | Uses config defaults |

### 3.4 Implementation: CONSTRAINTS.json

All constraints live in a single `CONSTRAINTS.json` loaded by every command at runtime:

```json
{
  "work_type_groups": {
    "prose": ["novel", "novella", "short_story", "flash_fiction", "memoir", "creative_nonfiction", "biography", "essay", "essay_collection"],
    "script": ["screenplay", "stage_play", "tv_pilot", "tv_series_bible", "audio_drama", "libretto"],
    "academic": ["research_paper", "thesis", "journal_article", "white_paper"],
    "visual": ["comic", "childrens_book", "picture_book"],
    "poetry": ["poetry_collection", "single_poem", "song_lyric"],
    "interactive": ["interactive_fiction", "game_narrative"],
    "sacred": ["scripture_biblical", "scripture_quranic", "scripture_torah", "scripture_vedic", "scripture_buddhist", "scripture_generic", "commentary", "devotional", "liturgical", "historical_chronicle", "historical_account", "mythological_collection", "religious_epic"]
  },
  "commands": {
    "new-character": {
      "available": ["prose", "script", "visual", "interactive"],
      "adapted": {
        "academic": { "rename": "new-concept", "behavior": "academic_concept" },
        "sacred": { "rename": "new-figure", "behavior": "sacred_figure" }
      },
      "hidden": ["poetry", "speech"]
    },
    "concordance": {
      "available": ["sacred"],
      "hidden": ["prose", "script", "academic", "visual", "poetry", "interactive"]
    }
  },
  "exports": {
    "fountain": { "available": ["script"] },
    "kdp-package": { "available": ["prose", "visual", "poetry", "sacred"] },
    "latex": { "available": ["academic"] }
  },
  "dependencies": {
    "draft-unit": { "hard": ["plan-unit"], "soft": ["discuss-unit"] },
    "editor-review": { "hard": ["draft-unit"] },
    "front-matter": { "hard": ["complete-draft"] }
  }
}
```

When a command runs, it checks:
1. **Work type gate:** Is this command available/adapted/hidden for the configured `work_type`?
2. **Dependency gate:** Do the required prerequisite files/states exist?
3. **Adaptation gate:** Should this command's behavior or name change?

If a command is hidden, `/scr:help` omits it entirely. If called directly, it returns: *"The `panel-layout` command is designed for comics. Your novel uses `chapter-header` instead for visual elements."*

If a prerequisite is missing, it returns: *"You need to run `plan-chapter 3` before drafting. Want me to run it now?"*

---

## 4. Tool Support

### 4.1 Priority: Claude Code

Primary development target. Full command system, subagent orchestration, fresh-context execution.

### 4.2 Supported Runtimes

| Runtime | Install Target | Command Format | Priority |
|---------|---------------|----------------|----------|
| Claude Code (2.1.88+) | `~/.claude/skills/scr-*/` | `/scr:command` | Primary |
| Claude Code (legacy) | `~/.claude/commands/scr/` | `/scr:command` | Primary |
| Cursor | `~/.cursor/` | `/scr:command` | Tier 1 |
| Gemini CLI | `~/.gemini/` | `/scr:command` | Tier 1 |
| Antigravity | `~/.gemini/antigravity/` | `/scr:command` | Tier 1 |
| Codex (skills) | `~/.codex/skills/scr-*/` | `$scr-command` | Tier 1 |
| Codex CLI | `~/.codex/` | `$scr-command` | Tier 1 |
| OpenCode | `~/.config/opencode/` | `/scr-command` | Tier 1 |
| Copilot | `~/.github/` | `/scr:command` | Tier 2 |
| Windsurf | `~/.windsurf/` | `/scr:command` | Tier 2 |

### 4.3 Installer

```bash
npx scriven@latest
```

Interactive prompts for runtime selection (multi-select) and install location (global/local).

Non-interactive:
```bash
npx scriven --claude --global
npx scriven --all --local
npx scriven --claude --codex --gemini --global
```

Uninstall:
```bash
npx scriven --claude --global --uninstall
```

---

## 5. Autonomous Mode

### 5.1 Autopilot Command

```
/scr:autopilot [--from <stage>] [--to <stage>] [--unit N] [--profile <profile>]
```

Runs the pipeline (or a segment) without manual intervention. The writer sets preferences up front via `discuss` and `profile-writer`, then autopilot handles the rest.

### 5.2 Autopilot Profiles

| Profile | Behavior | Best For |
|---------|----------|----------|
| `guided` | Pauses after each unit for writer approval before continuing | Writers who want oversight with less typing |
| `supervised` | Runs continuously, generates review checkpoints. Writer reviews batch at end. | Working writers who check in periodically |
| `full-auto` | Runs entire manuscript start to finish. Only pauses on critical failures. Generates comprehensive review at completion. | Rapid prototyping, first draft generation, content at scale |

### 5.3 Autopilot Stages

```
/scr:autopilot                       Full pipeline: create → write → polish
/scr:autopilot --from write          Start from writing phase (assumes create is done)
/scr:autopilot --from polish         Polish existing manuscript
/scr:autopilot-publish               Compile → front/back matter → cover art → export → package
/scr:autopilot-translate <lang>      Translate → adapt → review → export for target language
/scr:autopilot-translate --all       All configured languages simultaneously
```

### 5.4 Autopilot Pause Conditions

Autopilot pauses only on:
- Continuity contradiction it cannot resolve automatically
- Voice drift exceeding configurable threshold
- Plot hole with no clear resolution path
- Missing critical information (character motivation gap, setting inconsistency)
- Writer-defined checkpoints (e.g., "pause after each act climax")

On pause, it generates a diagnostic report and waits for writer input. After resolution, `/scr:autopilot --resume` continues.

### 5.5 YOLO Mode (GSD Equivalent)

```
/scr:settings
  mode: "flow"        # (replaces GSD's "yolo") — auto-approve everything, zero pauses
  mode: "interactive"  # confirm at each step (default)
  mode: "supervised"   # run continuously, batch review
```

---

## 6. Voice DNA — The Style Guide System

The `STYLE-GUIDE.md` is the writer's voice captured as a referenceable document. Every drafter agent loads this. It's the single most important file for prose consistency.

### 6.1 Voice Profile Dimensions

**Narrative Perspective:**
- Point of view: first, second, third limited, third omniscient, third objective, multiple rotating, collective ("we"), epistolary, second-person imperative
- POV discipline: strict (never breaks), flexible (strategic breaks), fluid (deliberate drift)
- Narrative distance: intimate (deep interiority), close (selective interiority), middle (balanced), far (observational), cinematic (exterior only)
- Psychic distance shifts: when and how the narrative zooms in/out
- Reliability: fully reliable, subtly unreliable, overtly unreliable, uncertain

**Tense & Time:**
- Primary tense: past, present, future, mixed
- Tense shift rules: when shifts are permitted (flashbacks, memories, asides)
- Temporal flow: linear, nonlinear (flashback/flash-forward), fragmented, circular, reverse
- Time compression: how summary passages handle elapsed time
- Time markers: explicit (dates/times), implicit (contextual), absent (dreamlike)

**Sentence Architecture:**
- Average sentence length: short (≤10 words), medium (11-20), long (21-35), very long (36+), variable
- Sentence rhythm pattern: staccato, flowing, mixed, incantatory, accumulative
- Sentence variety: high (constant variation), medium (patterns with breaks), low (consistent)
- Fragment tolerance: none, rare, moderate, frequent
- Run-on tolerance: none, rare, moderate, frequent (intentional)
- Periodic vs. loose: left-branching (periodic) vs. right-branching (loose)
- Parallelism use: rare, moderate, frequent, signature style

**Paragraph Architecture:**
- Average paragraph length: short (1-3 sentences), medium (4-6), long (7+), variable
- Paragraph breaks: logical, emotional, rhythmic, visual (white space as device)
- One-line paragraphs: never, for emphasis only, frequently
- Block structure: consistent, varied, chapter-dependent

**Vocabulary & Diction:**
- Register: formal, semi-formal, conversational, colloquial, slang-heavy, archaic, technical
- Vocabulary range: restrained (simple words), moderate, expansive (rare/unusual words)
- Latinate vs. Anglo-Saxon lean: Latinate (elegant, abstract), Anglo-Saxon (concrete, visceral)
- Jargon use: none, explained inline, assumed familiar, domain-immersive
- Profanity level: none, mild, moderate, heavy, period-appropriate
- Neologism tolerance: none, sparingly, freely invented
- Word repetition: avoid (synonym variety), embrace (intentional echo), strategic

**Figurative Language:**
- Metaphor density: sparse, moderate, rich, saturated
- Metaphor type: conventional, original, extended, mixed (intentionally), synesthetic
- Simile frequency: rare, moderate, frequent
- Symbolism: absent, subtle, overt, allegorical
- Personification: none, light, frequent
- Irony deployment: absent, gentle, pervasive, savage
- Allusion style: literary, cultural, pop culture, historical, mythological, none

**Dialogue Style:**
- Attribution style: invisible ("said" only), varied (whispered, snapped), action beats, unattributed
- Dialect rendering: none, light (word choice), moderate (phonetic), heavy
- Subtext level: surface (characters say what they mean), moderate, deep (everything is unsaid)
- Dialogue-to-narration ratio: dialogue-heavy, balanced, narration-heavy
- Monologue tolerance: brief exchanges only, moderate passages, extended speeches
- Interior dialogue: italicized, integrated, absent
- Quotation style: double quotes, single quotes, em-dash (Continental), no marks

**Description & Sensory:**
- Sensory priority: visual-dominant, auditory, tactile, olfactory, synesthetic
- Description density: minimal (Carver-esque), selective, rich, lush (baroque)
- Integration style: woven into action, dedicated passages, character-filtered, objective
- Environmental awareness: background, atmospheric, character of its own
- Body language detail: absent, selective, granular

**Emotional Register:**
- Show/tell ratio: almost all showing, mostly showing, balanced, some telling, direct emotional naming
- Sentimentality threshold: austere (never), restrained, moderate, embraced
- Humor style: absent, dry/deadpan, witty, absurdist, dark, slapstick, satirical
- Darkness tolerance: light, moderate, unflinching, transgressive
- Catharsis approach: earned (gradual), sudden, withheld, ambiguous

**Pacing & Rhythm:**
- Scene-to-summary ratio: almost all scene, mostly scene, balanced, summary-heavy
- Chapter length preference: short (1-3K), medium (3-6K), long (6-12K), variable
- Scene length preference: short (500-1500), medium (1500-3000), long (3000+), variable
- Cliffhanger frequency: never, occasionally, every chapter, every scene
- White space use: minimal breaks, moderate, frequent section breaks
- Acceleration technique: shorter sentences, shorter paragraphs, cutting description, dialogue only

**Narrative Stance:**
- Authorial intrusion: never, rare (philosophical asides), frequent (essayistic)
- Reader address: never, implied, direct ("dear reader"), conspiratorial
- Self-awareness: transparent (fourth wall intact), occasional meta-moments, postmodern
- Moral positioning: neutral/observational, subtly guided, explicit, ambiguous/questioning

**Physicality & Explicitness:**
- Violence level: none, implied, moderate, graphic, unflinching
- Sexual content: none, fade-to-black, moderate, explicit, literary erotica
- Physical detail: minimal, selective, granular, forensic
- Aftermath focus: skip, brief, extended, central to narrative

**Transition Style:**
- Scene transitions: hard cut, fade, bridge (motif echo), temporal jump, spatial shift
- Chapter transitions: cliffhanger, quiet close, POV shift, time skip, thematic echo
- Section breaks: blank line, symbol (***), numbered, titled
- Callback technique: verbal echo, image echo, structural parallel, none

### 6.2 Voice Profile Generation

The `/scr:profile-writer` command generates a Voice DNA profile through:

1. **Questionnaire mode** (`--questionnaire`) — Interactive interview covering all dimensions
2. **Analysis mode** (`--analyze`) — Feed in a sample of existing writing and auto-detect the profile
3. **Reference mode** (`--reference`) — Name authors/works you want to evoke and extract their patterns
4. **Hybrid** (`--all`) — Combine all three
5. **Refine mode** (`--refine`) — Add 2-3 questions per session to incrementally deepen the profile

### 6.3 Sacred & Historical Voice Registers

When the work type is sacred/historical, the standard Voice DNA dimensions are supplemented (or replaced for some categories) by **voice registers** — distinct modes of address that scriptural and historical texts move between. The writer selects a primary register and any secondary registers used in the work. The drafter agent applies the right register based on the unit being drafted.

| Register | Character | Used For |
|----------|-----------|----------|
| **Prophetic** | Urgent, declarative, "Thus says the Lord" | Prophetic books, revelation, divine speech |
| **Wisdom** | Aphoristic, reflective, balanced | Proverbs, Ecclesiastes, wisdom sutras |
| **Legal / Halakhic** | Precise, conditional, imperative | Law codes, commandments, rules of conduct |
| **Liturgical** | Formal, rhythmic, responsive | Prayers, blessings, liturgical instructions |
| **Narrative-historical** | Chronicle-like, temporal, factual | Historical books, hagiography, chronicles |
| **Apocalyptic** | Visionary, symbolic, cosmic | Revelation, Daniel, eschatological texts |
| **Epistolary** | Personal, didactic, pastoral | Letters, encyclicals, pastoral guidance |
| **Poetic / Psalmic** | Musical, metaphorical, parallelism | Psalms, hymns, devotional poetry |
| **Parabolic** | Story-within-story, allegorical | Parables, fables with moral teaching |
| **Didactic** | Instructional, systematic, expository | Catechisms, theological treatises, dharma talks |

A single sacred work often uses multiple registers — Genesis moves between narrative-historical and poetic, the Quran between prophetic and legal, the Bhagavad Gita between dialogue and didactic. The STYLE-GUIDE.md captures which registers appear, where, and how transitions are handled.

Sacred works can still use the standard Voice DNA dimensions (sentence architecture, vocabulary, etc.) — registers add a layer on top, not a replacement.

---

## 7. Front Matter & Back Matter

### 7.1 Front Matter Elements

Scriven generates and manages all standard front matter components. Each is optional and configurable per work type.

| Element | Description | Typical Inclusion |
|---------|-------------|-------------------|
| **Half-title page** | Book title only, no author | Fiction: yes, Academic: no |
| **Series title page** | "Also by" or series list | If series |
| **Title page** | Full title, subtitle, author, publisher | Always |
| **Copyright page** | © notice, ISBN, edition, rights, printer, LCCN | Always |
| **Dedication** | Personal dedication | Optional |
| **Epigraph** | Opening quotation setting tone | Optional |
| **Table of contents** | Chapter/section listing with page numbers | Nonfiction: yes, Fiction: optional |
| **List of illustrations** | Figures, maps, plates | If applicable |
| **List of tables** | Tabular data | Academic: if applicable |
| **List of abbreviations** | Acronyms and shorthand | Academic/Technical |
| **Foreword** | Written by someone other than the author | Optional |
| **Preface** | Author's explanation of scope, methods, intent | Optional |
| **Acknowledgments** | Thanks to supporters, collaborators | Optional (front or back) |
| **Introduction** | Primer on subject (can be front or body) | Variable |
| **Prologue** | Narrative opening before Chapter 1 | Fiction: optional |
| **Note to the reader** | Content warnings, pronunciation, historical note | Optional |
| **Maps / family trees** | Visual reference material | Fantasy/Historical |
| **Cast of characters** | Dramatis personae | Plays, complex fiction |
| **Timeline** | Chronological reference | Historical, complex fiction |

**Page numbering:** Front matter uses lowercase Roman numerals (i, ii, iii...). Body text starts at Arabic 1.

**Recto/verso rules:** Half-title, title, dedication, part openers, and chapter openers start on recto (right/odd). Copyright and series title go on verso (left/even). Blank pages inserted as needed per Chicago Manual of Style.

### 7.2 Back Matter Elements

| Element | Description | Typical Inclusion |
|---------|-------------|-------------------|
| **Epilogue** | Narrative closing after final chapter | Fiction: optional |
| **Afterword** | Author's reflection on the work or its impact | Optional |
| **Appendix(es)** | Supplementary material (maps, documents, data) | If applicable |
| **Glossary** | Definition of terms, foreign words | If applicable |
| **Endnotes** | Detailed citations/commentary by chapter | Academic or annotated |
| **Bibliography / References** | All cited works | Academic: always |
| **Suggested reading** | Curated further reading list | Nonfiction |
| **Index** | Alphabetical subject/name index | Nonfiction |
| **About the author** | Bio, photo, credentials | Always |
| **Colophon** | Production details (typeface, paper, printing) | Optional (traditional) |
| **Discussion questions** | Book club or classroom questions | Commercial fiction/nonfiction |
| **Permissions / Credits** | Reprint permissions, photo credits | If applicable |

### 7.3 Self-Publishing / KDP Marketing Back Matter

| Element | Description |
|---------|-------------|
| **Also by [Author]** | Complete bibliography with links |
| **Sneak peek** | Sample chapter from next book |
| **Newsletter CTA** | Sign-up invitation with link |
| **Review request** | Polite request to leave a review |
| **Social media links** | Author's online presence |
| **Series reading order** | For series books |
| **Book club kit** | Discussion questions + author Q&A |
| **Free book offer** | Reader magnet / lead magnet |
| **QR codes** | Links to author site, newsletter, etc. |

### 7.4 Front/Back Matter Commands

```
/scr:front-matter                    Interactive front matter builder
/scr:front-matter --element <n>   Generate specific element
/scr:back-matter                     Interactive back matter builder
/scr:back-matter --element <n>    Generate specific element
/scr:copyright-page                  Generate copyright page with ISBN, edition info
/scr:about-author                    Generate author bio
/scr:also-by                         Generate bibliography / also-by page
/scr:discussion-questions            Generate book club questions from manuscript
/scr:blurb                           Generate back cover copy / book description
/scr:synopsis [--length 1p|2p|5p]   Generate query-ready synopsis
/scr:query-letter                    Generate agent query letter
/scr:book-proposal                   Nonfiction book proposal (overview, market, comp titles, chapter outline, sample)
```

---

## 8. Illustration & Cover Art Pipeline

### 8.1 Cover Art

```
/scr:cover-art                       Interactive cover design (front, spine, back)
/scr:cover-art --kdp <trim_size>     KDP-spec cover with calculated spine width
/scr:cover-art --series              Series-consistent cover design
/scr:cover-art --back-copy           Generate back cover blurb + layout
/scr:cover-art --prompt-only         Generate detailed AI image prompts without rendering
```

Cover generation includes:
- Front cover (title, author, tagline, imagery)
- Spine (title, author, publisher logo — width calculated from page count + paper type)
- Back cover (blurb, barcode placement, author photo area, endorsement quotes)
- Full wrap template (front + spine + back as single image, KDP/IngramSpark specs)

### 8.2 Interior Illustrations

```
/scr:illustrate-scene <ref>          Generate scene illustration prompt
/scr:character-ref <n>            Character reference sheet (visual description prompt)
/scr:art-direction                    Full visual style guide for illustrators/AI
/scr:chapter-header [style]           Decorative chapter opener art
/scr:map-illustration                 Generate world/location map
/scr:spot-illustration [desc]         Small inline illustrations (chapter breaks, section dividers)
```

### 8.3 Children's Book / Comic Specific

```
/scr:spread-layout <n>               Page spread layout (text placement + illustration direction)
/scr:page-thumbnail <n>              Rough page composition thumbnail
/scr:panel-layout <issue> <page>      Comic panel layout with composition notes
/scr:storyboard                       Full storyboard generation (thumbnail per spread/page)
```

### 8.4 Art Direction Document

The `/scr:art-direction` command generates `ART-DIRECTION.md`:
- Visual style (realistic, stylized, watercolor, ink, digital, etc.)
- Color palette (mood-based, season-based, character-coded)
- Composition preferences (dynamic, static, symmetrical, rule-of-thirds)
- Reference artists/styles
- Per-character visual specs (appearance, clothing, expressions)
- Per-setting visual specs (lighting, atmosphere, key details)
- Consistency rules (object proportions, recurring visual motifs)

---

## 9. Translation & Multi-Language Publishing

### 9.1 Translation Pipeline

```
/scr:translate <language> [--all]       Translate manuscript to target language
/scr:translate --languages              List configured target languages
/scr:translate --add-language <lang>    Add a target language
/scr:translation-glossary               Build/manage bilingual term glossary
/scr:translation-memory                 Build TM from existing translations
/scr:cultural-adaptation <lang>         Flag and adapt cultural references
/scr:translation-review <lang>          Quality review of translated text
/scr:back-translate <lang>              Back-translate to verify accuracy
/scr:multi-publish                      Export all language editions simultaneously
```

### 9.2 Translation Features

**Glossary Management (GLOSSARY-{lang}.md):**
- Character names: keep original, transliterate, or localize (configurable per name)
- Place names: keep, translate, or hybrid
- Invented terms: approved translations per language
- Titles and honorifics: cultural equivalents
- Recurring phrases / catchphrases: approved translations
- Brand names, real-world references: keep or adapt

**Cultural Adaptation:**
- Idioms and figures of speech: flag for manual adaptation
- Humor: flag culturally-specific jokes for reworking
- Food, customs, holidays: flag for cultural equivalents or explanation
- Measurements: metric/imperial conversion option
- Currency: localize or keep original
- Name order: respect target language conventions (family name first/last)
- Politeness levels: adapt for languages with formal/informal registers (Japanese, Korean, French, German)

**Technical Translation:**
- Right-to-left support: Arabic, Hebrew, Urdu, Persian
- CJK typesetting considerations: Chinese, Japanese, Korean line breaking and spacing
- Diacritics and special characters: full Unicode support
- Script-specific punctuation: «guillemets», 「brackets」, — dashes
- Vertical text support: traditional CJK layouts

**Translation Quality:**
- Back-translation verification (translate back to source to check meaning preservation)
- Consistency check across translated manuscript (same term translated same way)
- Style guide compliance for target language
- Native speaker review prompts (generates review checklist for human reviewers)

### 9.3 Multi-Language Export

Each language edition gets:
- Translated manuscript with cultural adaptations
- Localized front matter (copyright, about author)
- Localized back matter (also-by with local ISBNs if applicable)
- Language-specific formatting (quotation marks, punctuation spacing)
- Separate KDP/epub/print packages per language
- Language-specific cover text overlay (title, subtitle, author, blurb)
- Market-specific metadata (keywords, categories per Amazon marketplace)

### 9.4 Sacred Text Translation

Sacred text translation has unique requirements that go beyond standard translation:

**Translation philosophy:**
- **Formal equivalence** (literal, word-for-word — KJV, NASB, ESV approach) — preserves source structure, sometimes at the cost of readability
- **Dynamic equivalence** (thought-for-thought — NIV, NLT approach) — prioritizes meaning over form
- **Paraphrase** (The Message, contemporary devotional translations) — maximum readability, interpretive choices
- The writer selects philosophy per language; the system enforces consistency throughout

**Liturgical preservation:**
- Some passages are intentionally preserved in source language (Hebrew shema, Arabic basmala, Latin liturgical phrases, Sanskrit mantras)
- The glossary marks these as "preserve in source"
- Transliteration tables for languages with non-Latin scripts

**Canonical translation alignment:**
- For traditions with established canonical translations (KJV, RSV, JPS, Sahih International, etc.), the writer can specify "align with [canonical version]" so cross-references map correctly
- Verse numbering may need to convert between traditions (Masoretic vs. Septuagint, Quranic verse counting differences)

**Tradition-specific concerns:**
- **Christian translations:** Apocrypha inclusion/exclusion, divine name handling (LORD vs. YHWH vs. Yahweh), inclusive language decisions
- **Quranic translations:** Always considered "interpretation" not "translation" in classical Islamic thought; original Arabic always presented alongside
- **Jewish translations:** Tetragrammaton handling, traditional vs. modern, Ashkenazi vs. Sephardic transliteration
- **Buddhist/Hindu translations:** Sanskrit/Pali term preservation, technical philosophical vocabulary

**Multi-language sacred publishing** uses the same `/scr:multi-publish` flow but with sacred-aware glossary, register preservation, and tradition-appropriate front matter (imprimatur, hekhsher, etc.) per edition.

---

## 10. Collaboration System

### 10.1 Git-to-Creative-Writing Mapping

| Git Concept | Scriven Term | Description |
|-------------|----------|-------------|
| Branch | Revision track | Separate line of work |
| Main/trunk | Canon manuscript | The authoritative version |
| Pull request | Revision proposal | Suggested changes for review |
| Merge | Accept revisions | Incorporate changes into canon |
| Merge conflict | Continuity conflict | Same passage edited differently |
| Code review | Editor notes | Feedback on changes |
| Fork | Derivative work | Independent copy |
| Diff | Tracked changes | Visual comparison |
| Commit | Checkpoint | Saved state with description |
| Tag | Draft version | Named milestone (Draft 1, Draft 2) |
| Stash | Shelf | Temporarily set aside changes |
| Rebase | Reflow | Update track with latest canon changes |
| Cherry-pick | Lift passage | Take specific changes from another track |
| Blame | Attribution | Who wrote which passage |
| Bisect | Trace regression | Find where a problem was introduced |

### 10.2 Collaboration Commands

```
/scr:track create <n>           Create a revision track (branch)
/scr:track list                      List all tracks and status
/scr:track switch <n>            Switch active track
/scr:track compare [a] [b]          Show tracked changes between tracks
/scr:track merge <n>             Merge track into canon (with continuity check)
/scr:track propose <n>           Create revision proposal (PR) for review
/scr:track shelf                     Temporarily set aside current changes
/scr:track unshelf                   Restore shelved changes
```

### 10.3 Co-Writing Workflows

**Parallel Track Model:**
- Writer A takes A-plot track, Writer B takes B-plot track
- Scriven runs continuity checks when tracks merge
- Conflict resolution surfaces contradictions for human decision

**Editor-Writer Model:**
- Writer creates revision proposal
- Editor reviews, adds editor notes (comments)
- Writer accepts/rejects/modifies individual changes
- Scriven tracks all decisions for accountability

**Ghost-Writer Model:**
- Client provides brief, voice samples, outline notes
- Ghost-writer works in a draft track
- Client reviews revision proposals without seeing intermediate drafts
- Final merge produces clean canon manuscript

### 10.4 Developer Mode vs. Writer Mode

```
/scr:settings
  developer_mode: true|false
```

| Feature | Developer Mode (true) | Writer Mode (false) |
|---------|----------------------|---------------------|
| Git terminology | Visible (branch, commit, merge) | Hidden (track, checkpoint, accept) |
| Terminal commands | Available | Never shown |
| Commit messages | Writer can customize | Auto-generated from context |
| Branch management | Manual control | Automatic via track commands |
| Conflict resolution | Shows diff hunks | Shows side-by-side passages |
| History view | `git log` style | Visual timeline (`/scr:history`) |
| File system | Visible `.manuscript/` structure | Abstracted ("your chapters") |

**Writer Mode abstractions:**
```
/scr:save [message]                  Creates a checkpoint (git commit)
/scr:history                         Visual timeline of all changes
/scr:compare [version1] [version2]   Side-by-side passage comparison
/scr:undo                            Revert to last checkpoint
/scr:versions                        List all saved draft versions
```

---

## 11. Export & Publishing Formats

### 11.1 Manuscript Formats

| Format | Extension | Use Case |
|--------|-----------|----------|
| Markdown | `.md` | Universal, portable, version-control friendly |
| Word (manuscript format) | `.docx` | Agent/editor submission (12pt TNR, double-spaced, 1" margins) |
| Word (formatted) | `.docx` | Interior layout with styles, headers, page numbers |
| PDF (manuscript) | `.pdf` | Agent/editor submission |
| PDF (print-ready) | `.pdf` | Print-on-demand interior |
| Fountain | `.fountain` | Screenplay industry standard |
| Final Draft | `.fdx` | Screenplay (Final Draft software) |
| LaTeX | `.tex` | Academic papers, theses, dissertations |
| EPUB 3.0 | `.epub` | E-book (reflowable) |
| MOBI/KF8 | `.mobi` | Kindle legacy format |

### 11.2 KDP-Specific Formats

| Format | Specs |
|--------|-------|
| **KDP Print (paperback)** | PDF, trim sizes (5x8", 5.25x8", 5.5x8.5", 6x9", etc.), bleed/no-bleed, 300dpi, fonts embedded, CMYK covers |
| **KDP Print (hardcover)** | Same + case laminate or dust jacket specs |
| **KDP eBook** | EPUB 3.0 or DOCX, reflowable, TOC required, cover 2560x1600px |
| **KDP Cover** | PDF template, spine width = (page count × 0.0025" for white paper / 0.002" for cream) |

### 11.3 Other Publishing Platforms

| Platform | Format | Notes |
|----------|--------|-------|
| IngramSpark | PDF (print-ready) | Same as KDP, different metadata requirements |
| Draft2Digital | EPUB / DOCX | Auto-distributes to all retailers |
| Smashwords | EPUB / DOCX | Meatgrinder conversion requirements |
| Apple Books | EPUB 3.0 | Strict EPUB validation |
| Google Play Books | EPUB / PDF | |
| Barnes & Noble Press | EPUB / PDF | |
| Kobo Writing Life | EPUB | |
| Lulu | PDF / EPUB | |
| BookBaby | PDF / EPUB | |

### 11.4 Academic Publishing Formats

| Format | Use Case |
|--------|----------|
| LaTeX (journal template) | Journal submission (APA, IEEE, ACM, Springer, Elsevier, etc.) |
| LaTeX (thesis template) | University-specific thesis formatting |
| Word (APA 7th) | Psychology, social sciences |
| Word (MLA 9th) | Humanities |
| Word (Chicago/Turabian) | History, some humanities |
| Word (AMA) | Medical |
| Word (IEEE) | Engineering, CS |
| Word (Harvard) | Business, some social sciences |
| Word (Vancouver) | Biomedical |
| BibTeX / .bib | Bibliography database |

### 11.5 Export Commands

```
/scr:export markdown                 Clean markdown
/scr:export docx                     Formatted Word document
/scr:export docx --manuscript        Industry manuscript format (12pt TNR, double-spaced)
/scr:export pdf                      PDF
/scr:export pdf --kdp <trim_size>    KDP print-ready interior
/scr:export epub                     EPUB 3.0
/scr:export fountain                 Fountain (screenplay)
/scr:export fdx                      Final Draft (screenplay)
/scr:export latex                    LaTeX
/scr:export latex --template <n>  Journal/thesis LaTeX template
/scr:export kdp-package              Full KDP package (interior + cover template + metadata)
/scr:export ingram-package           IngramSpark-ready package
/scr:export query-package            Agent query (query letter + synopsis + first 3 chapters)
/scr:export submission-package       Full submission (manuscript + cover letter + synopsis + bio)
/scr:export d2d-package              Draft2Digital-ready package
/scr:export multi-format             All configured formats at once
```

---

## 12. Discuss Phase — Gray Area Categories

### 12.1 Creative Writing Categories

| # | Category | Triggers | Questions |
|---|----------|----------|-----------|
| 1 | **Pacing** | Action, chase, battle, time jump, montage | Scene length, compression, acceleration, breather placement |
| 2 | **Dialogue** | Confrontation, ensemble, interrogation, romance | Subtext, dialect, attribution, silence, overlap |
| 3 | **Interiority** | Revelation, decision, emotional turning point | Stream of consciousness, thought style, restraint, memory |
| 4 | **Description** | New settings, atmosphere-critical, world-heavy | Sensory priority, integration, metaphor density, movement |
| 5 | **Tension** | Mystery, horror, thriller, dramatic irony | Information control, foreshadowing, suspense technique |
| 6 | **Emotional register** | Grief, joy, trauma, romance, comedy | Sentimentality, humor, darkness, catharsis |
| 7 | **Structure** | Nonlinear, parallel, POV shifts, epistolary | Transitions, timeline indicators, section breaks |
| 8 | **Voice** | First person, unreliable narrator, distinctive style | Vocabulary, rhythm, irony, formality |
| 9 | **Physicality** | Sex, violence, injury, physical labor, sport | Explicitness level, choreography, aftermath, consent framing |
| 10 | **Power dynamics** | Authority, submission, negotiation, manipulation | Scene control, shifting balance, subtext, reader alignment |
| 11 | **Exposition** | Backstory-heavy, world-building reveals, lore | Integration technique, drip vs. dump, dialogue as vehicle |
| 12 | **Transition** | Between subplots, time periods, POV characters | Cut style, bridging motifs, echo techniques |
| 13 | **Revelation** | Plot twists, secrets exposed, identity reveals | Setup fairness, reader vs. character knowledge, aftermath weight |
| 14 | **Ensemble dynamics** | Group scenes, multi-character, crowd | Focus management, who speaks when, background vs. foreground |

### 12.2 Academic/Research Categories

| # | Category | Triggers | Questions |
|---|----------|----------|-----------|
| 1 | **Argumentation** | Thesis development, counterargument, evidence | Deductive/inductive, hedging language, claim strength |
| 2 | **Citation integration** | Literature review, evidence marshaling | Quote vs. paraphrase ratio, signal phrases, synthesis |
| 3 | **Methodology framing** | Methods section, research design | Technical depth, justification, limitation acknowledgment |
| 4 | **Data presentation** | Results, findings, analysis | Tables/figures integration, statistical reporting, narrative framing |
| 5 | **Scholarly voice** | Disciplinary conventions | Active/passive balance, first-person use, jargon calibration |
| 6 | **Theoretical framework** | Theory application, lens | Depth of engagement, positioning, originality claim |
| 7 | **Ethical framing** | Human subjects, sensitive topics | IRB language, positionality, harm considerations |

### 12.3 Sacred/Historical Categories

| # | Category | Triggers | Questions |
|---|----------|----------|-----------|
| 1 | **Doctrinal framing** | Theological assertions, moral teaching | Confessional vs. neutral stance, denominational alignment, hedging on disputed points |
| 2 | **Voice register** | Shifts between prophetic, wisdom, liturgical, narrative | Which register dominates this section, transition handling, multiple registers in one passage |
| 3 | **Intertextual density** | Cross-references, allusions, parallel passages | Quote vs. allude vs. echo, source attribution, reader's expected familiarity |
| 4 | **Supernatural / miraculous** | Divine intervention, prophecy, miracle accounts | Naturalistic framing vs. supernatural framing, narrator stance, faith assumptions |
| 5 | **Genealogical integration** | Lineage passages, "begats," tribal records | Compressed list vs. narrative weaving, theological significance vs. historical record |
| 6 | **Law vs. narrative** | Legal codes within narrative books | Where to embed laws, transition style, didactic vs. storytelling balance |
| 7 | **Historical claim weight** | Events with theological significance | Historical-critical vs. faith-affirming, hedging on disputed events, multiple traditions |
| 8 | **Liturgical rhythm** | Prayers, hymns, responsive readings | Meter, repetition, call-and-response, antiphonal structure |
| 9 | **Pastoral sensitivity** | Topics of suffering, sin, judgment, hope | Tone toward the reader, comfort vs. challenge, contextual nuance |
| 10 | **Translation stance** | Source language references, transliteration | When to preserve original terms, footnote density, audience assumptions |

---

## 13. Writer Profile System

### 13.1 Profile Dimensions

The `/scr:profile-writer` command generates a persistent profile covering:

- **Process preferences**: Pantser (discovery) vs. plotter (outline), revision habits, session length, sprint vs. marinate
- **Feedback sensitivity**: How direct, what format, comparative references welcome or not
- **Strength awareness**: What the writer does well (leverage it), what they struggle with (support it)
- **Influence map**: Authors and works that shape their aesthetic
- **Genre instincts**: Where they gravitate, subversion tendencies, genre-blending comfort
- **Working relationship**: How much autonomy to give the AI (scaffolding vs. ghostwriting vs. collaboration)
- **Revision style**: Top-down (structural first) vs. bottom-up (line-level first), single pass vs. multi-pass
- **Energy patterns**: When they write best, how long sessions last, warm-up needs

### 13.2 Profile Application

The profile adjusts system behavior:
- **Pantsers**: Lighter planning, more discovery in drafting, exploratory quick-write encouraged
- **Plotters**: Detailed scene plans, more structure, less improvisation
- **Revision-averse**: Higher quality first drafts, fewer revision cycles
- **Revision-loving**: Faster first drafts, emphasis on iterative polishing
- **Direct feedback**: Blunt editor notes, no hedging
- **Gentle feedback**: Sandwich method, emphasis on what works first

---

## 14. What We Keep / Cut / Adapt from GSD

| GSD Feature | Scriven Equivalent | Status |
|-------------|----------------|--------|
| Multi-agent orchestration | Same architecture, creative writing agents | ✅ Keep |
| Fresh context per task | Fresh context per scene/section | ✅ Keep |
| Atomic git commits | Commit per scene/section | ✅ Keep |
| Wave execution (parallel) | Wave execution for independent scenes | ✅ Keep |
| State tracking (STATE.md) | Same | ✅ Keep |
| Session pause/resume | Same | ✅ Keep |
| Seeds (future ideas) | Story ideas that surface at right moment | ✅ Keep |
| Threads (cross-session) | Narrative threads for continuity | ✅ Keep |
| Notes/todos | Same | ✅ Keep |
| Settings/config | Adapted for writing | ✅ Keep |
| Model profiles | Same (quality/balanced/budget/inherit) | ✅ Keep |
| Health check / repair | Manuscript health check | ✅ Keep |
| Quick mode | Quick-write | ✅ Keep |
| Forensics (post-mortem) | Same, for stuck workflows | ✅ Keep |
| Progress / next / help | Same | ✅ Keep |
| Manager (command center) | Same | ✅ Keep |
| Workstreams | Revision tracks + co-writing tracks | ✅ Adapted |
| Workspaces | Multi-project workspaces | ✅ Keep |
| Auto mode / yolo | Autopilot with profiles | ✅ Expanded |
| Map-codebase | Map-manuscript | ✅ Adapted |
| PR/ship | Submit / export | ✅ Adapted |
| Profile-user | Profile-writer | ✅ Adapted |
| Review | Beta-reader | ✅ Adapted |
| Debug | Troubleshoot (plot holes) | ✅ Adapted |
| Secure-phase | Sensitivity review | ✅ Adapted |
| Audit-UAT | Audit-reviews (find unreviewed units) | ✅ Adapted |
| Stats | Manuscript-stats | ✅ Adapted |
| Docs-update | — (not applicable) | ❌ Cut |
| UI-phase / UI-review | — (not a visual medium, except comics) | ❌ Cut |
| PR-branch (clean branch) | — (not needed for writers) | ❌ Cut |
| Crypto token ($GSD) | — | ❌ Cut |
| SDK (headless) | Autopilot full-auto mode covers this | ✅ Merged |

---

## 15. Complete Command List

### 15.1 Core Workflow

```
/scr:new-work [--auto] [--type <work_type>]
/scr:discuss-{unit} [N] [--auto] [--chain] [--batch] [--analyze]
/scr:plan-{unit} [N] [--auto] [--skip-research] [--skip-verify]
/scr:draft-{unit} [N]
/scr:editor-review [N]                  (or /scr:peer-review for academic)
/scr:submit-{unit} [N]
/scr:next
/scr:fast <text>                         Inline trivial edits, skip planning
/scr:complete-draft
/scr:new-revision [name]
/scr:autopilot [--from <stage>] [--to <stage>] [--profile guided|supervised|full-auto]
/scr:autopilot --resume
/scr:autopilot-publish
/scr:autopilot-translate <lang> [--all]
```

### 15.2 Character & World

```
/scr:new-character <n>
/scr:character-sheet [name]
/scr:character-arc [name]                View/edit specific character's arc
/scr:character-voice-sample [name]       Generate dialogue sample for character
/scr:relationship-map [--edit]
/scr:build-world [--area <area>]
/scr:cast-list
```

### 15.3 Narrative Structure

```
/scr:plot-graph [--edit] [--type <arc_type>]
/scr:timeline [--edit]
/scr:theme-tracker [--edit]
/scr:subplot-map [--edit]
/scr:outline [--edit]
/scr:argument-map [--edit]               Academic: argument structure
```

### 15.4 Analysis & Review

```
/scr:map-manuscript [area]
/scr:continuity-check [N]
/scr:voice-check [N]
/scr:sensitivity-review [N]
/scr:pacing-analysis [N]
/scr:dialogue-audit [N]
/scr:beta-reader [--focus <area>]
/scr:citation-check                      Academic: verify all citations
```

### 15.5 Writing Quality

```
/scr:line-edit [N]
/scr:copy-edit [N]
/scr:quick-write [--discuss] [--research] [--full]
/scr:rewrite-scene <scene_ref>           Targeted scene rewrite
```

### 15.6 Front & Back Matter

```
/scr:front-matter
/scr:front-matter --element <n>
/scr:back-matter
/scr:back-matter --element <n>
/scr:copyright-page
/scr:about-author
/scr:also-by
/scr:discussion-questions
/scr:blurb
/scr:synopsis [--length 1p|2p|5p]
/scr:query-letter
/scr:book-proposal
```

### 15.7 Illustration & Cover Art

```
/scr:cover-art [--kdp <trim>] [--series] [--prompt-only]
/scr:illustrate-scene <ref>
/scr:character-ref <n>
/scr:art-direction
/scr:chapter-header [style]
/scr:map-illustration
/scr:spot-illustration [desc]
/scr:spread-layout <n>                   Children's/picture book
/scr:page-thumbnail <n>                  Children's/picture book
/scr:panel-layout <issue> <page>         Comic
/scr:storyboard
```

### 15.8 Translation & Multi-Language

```
/scr:translate <language> [--all]
/scr:translate --languages
/scr:translate --add-language <lang>
/scr:translation-glossary
/scr:translation-memory
/scr:cultural-adaptation <lang>
/scr:translation-review <lang>
/scr:back-translate <lang>
/scr:multi-publish
```

### 15.9 Export & Publishing

```
/scr:export <format> [--options]
/scr:export kdp-package
/scr:export ingram-package
/scr:export query-package
/scr:export submission-package
/scr:export d2d-package
/scr:export multi-format
/scr:manuscript-stats
/scr:word-count [N]
```

### 15.10 Collaboration

```
/scr:track create <n>
/scr:track list
/scr:track switch <n>
/scr:track compare [a] [b]
/scr:track merge <n>
/scr:track propose <n>
/scr:track shelf / unshelf
```

### 15.11 Navigation & Session

```
/scr:progress
/scr:next
/scr:help
/scr:pause-work
/scr:resume-work
/scr:session-report
/scr:history                             Visual timeline (writer mode)
/scr:save [message]                      Create checkpoint (writer mode)
/scr:compare [v1] [v2]                  Side-by-side comparison (writer mode)
/scr:versions                            List draft versions (writer mode)
```

### 15.12 Structure Management

```
/scr:add-{unit}
/scr:insert-{unit} [N]
/scr:remove-{unit} [N]
/scr:split-{unit} [N]
/scr:merge-{units} [N] [M]
/scr:reorder-{units}
```

### 15.13 Utilities

```
/scr:settings
/scr:add-note [text]
/scr:check-notes
/scr:plant-seed <idea>
/scr:troubleshoot [desc]
/scr:thread [name]
/scr:profile-writer [--questionnaire] [--analyze] [--reference] [--all] [--refresh] [--refine]
/scr:health [--repair]
/scr:manager
/scr:update
/scr:demo [--clear] [--genre <genre>]    Pre-built sample project sandbox
/scr:do "<text>"                          Natural language router (free-text → command)
/scr:voice-test                           Voice calibration gate before first draft
/scr:import <file_path>                   Import existing manuscript and structure it
/scr:publish [--preset <preset>]          Publishing wizard or preset (kdp-paperback, query-submission, ebook-wide, etc.)
/scr:undo                                 Revert to last checkpoint (writer mode)
```

**`/scr:publish` vs `/scr:export`:** `publish` is the high-level interactive wizard or preset-driven pipeline that wraps multiple `export` commands plus front/back matter and cover generation. `export` is the direct/power-user path for individual format outputs. A non-technical writer uses `publish`, a technical writer uses `export`.

### 15.14 Sacred & Historical

**Exclusive commands** (no equivalent in other work types):
```
/scr:concordance                          Build/search term concordance
/scr:cross-reference                      Map passage connections (parallels, fulfillments, echoes)
/scr:genealogy [--verify]                 Build and verify genealogical trees
/scr:chronology [--calendar <s>]     Timeline with tradition-appropriate dating
/scr:annotation-layer [tradition]         Commentary layer alongside primary text
/scr:verse-numbering [--system <s>]  Manage numbering systems
/scr:source-tracking                      Track primary sources, oral traditions, variants
/scr:doctrinal-check                      Verify theological/doctrinal consistency
```

**Adapted commands** (auto-applied when work type is sacred/historical):
```
/scr:new-figure <n>                    Create figure profile (adapted new-character)
/scr:figure-sheet [name]                  View/edit figure profile
/scr:figure-arc [name]                    Spiritual/historical arc
/scr:figures-list                         Roster of all figures
/scr:lineage-map [--edit]                 Genealogical/covenantal relationships
/scr:build-cosmology [--area <area>]      Sacred geography, cosmological framework
/scr:register-sample [register]           Voice register sample (prophetic, wisdom, etc.)
/scr:register-check [N]                   Voice register consistency
/scr:theological-arc [--edit]             Salvation history or dharmic cycle
/scr:doctrine-tracker [--edit]            Doctrinal threads
/scr:narrative-threads [--edit]           Narrative threads across the text
/scr:figure-ref <n>                    Visual figure reference for sacred art
/scr:study-questions                      Generate study/reflection questions
/scr:scholarly-review [N]                 Academic review (adapted editor-review)
/scr:theological-review [N]               Doctrinal/pastoral review (adapted beta-reader)
/scr:interfaith-review [N]                Sensitivity across traditions
```

The adapted commands also work under their original names — `/scr:new-character` is automatically routed to `/scr:new-figure` when the work type is sacred. Use whichever feels natural.

### 15.15 Series Bible

```
/scr:series-bible                          View/edit the series bible
/scr:series-bible --init                   Initialize from current work
/scr:series-bible --import <work_path>     Import from another project
/scr:series-bible --check                  Verify current work against bible
/scr:series-bible --timeline               Cross-book timeline
/scr:series-bible --characters             Character states across books
```

---

## 16. File Structure

```
.manuscript/
├── WORK.md                     # Project overview, premise, genre, audience
├── BRIEF.md                    # Creative brief / Research proposal / Theological framework
├── OUTLINE.md                  # Full structural outline
├── STATE.md                    # Current progress, decisions, memory
├── CHARACTERS.md               # All character profiles
├── RELATIONSHIPS.md            # Character relationship map
├── WORLD.md                    # Setting, rules, world-building
├── STYLE-GUIDE.md              # Voice DNA (comprehensive)
├── PLOT-GRAPH.md               # Story arc / Argument structure
├── THEMES.md                   # Thematic threads / Research questions
├── FRONT-MATTER.md             # Front matter content and order
├── BACK-MATTER.md              # Back matter content and order
├── ART-DIRECTION.md            # Visual style guide
├── WRITER-PROFILE.md           # Writer's process/style preferences
├── config.json                 # Settings
│
├── research/                   # Research findings
│   ├── initial-research.md
│   └── {unit}-research.md
│
├── plans/                      # Scene/section plans
│   └── {unit}-{N}-PLAN.md
│
├── drafts/                     # Written drafts
│   ├── front-matter/
│   │   ├── half-title.md
│   │   ├── title-page.md
│   │   ├── copyright.md
│   │   ├── dedication.md
│   │   ├── epigraph.md
│   │   ├── toc.md
│   │   ├── foreword.md
│   │   ├── preface.md
│   │   ├── acknowledgments.md
│   │   ├── prologue.md
│   │   └── maps/
│   ├── body/
│   │   └── {unit}-{N}-DRAFT.md
│   └── back-matter/
│       ├── epilogue.md
│       ├── afterword.md
│       ├── appendix/
│       ├── glossary.md
│       ├── endnotes.md
│       ├── bibliography.md
│       ├── index.md
│       ├── about-author.md
│       ├── also-by.md
│       ├── discussion-questions.md
│       ├── sneak-peek.md
│       └── colophon.md
│
├── reviews/                    # Editor notes, beta reader feedback
│   └── {unit}-{N}-REVIEW.md
│
├── art/                        # Illustration prompts and assets
│   ├── ART-DIRECTION.md
│   ├── cover/
│   ├── interior/
│   ├── character-refs/
│   └── maps/
│
├── translations/               # Multi-language content
│   ├── GLOSSARY-{lang}.md
│   ├── {lang}/
│   │   ├── drafts/
│   │   ├── front-matter/
│   │   ├── back-matter/
│   │   └── metadata/
│   └── translation-memory.json
│
├── output/                     # Compiled, export-ready files
│   ├── manuscript-draft-{N}.md
│   ├── manuscript-draft-{N}.docx
│   ├── kdp-package/
│   ├── epub/
│   ├── submission/
│   └── translations/
│       └── {lang}/
│
├── notes/
├── threads/
├── seeds/
├── quick/
│
└── archive/
    └── draft-{N}/
```

**Sacred/Historical work types use adapted filenames:**

| Standard | Sacred/Historical |
|----------|-------------------|
| `BRIEF.md` | `FRAMEWORK.md` (theological framework / historical scope) |
| `CHARACTERS.md` | `FIGURES.md` (prophets, saints, deities, historical persons) |
| `RELATIONSHIPS.md` | `LINEAGES.md` (genealogies, covenants, teacher-student chains) |
| `WORLD.md` | `COSMOLOGY.md` (sacred geography, cosmological framework) |
| `PLOT-GRAPH.md` | `THEOLOGICAL-ARC.md` (salvation history, dharmic cycle) |
| `THEMES.md` | `DOCTRINES.md` (theological themes, moral teachings) |

Sacred work types also include additional files:
- `CONCORDANCE.md` — term/name index across the text
- `CROSS-REFERENCES.md` — passage connections, parallels, fulfillments
- `GENEALOGY.md` — family trees and lineages
- `CHRONOLOGY.md` — timeline with tradition-appropriate dating
- `SOURCES.md` — primary sources, oral traditions, manuscript variants
- `annotations/` — commentary layers (one per tradition/school)

---

## 17. Configuration Schema

```json
{
  "work_type": "novel",
  "mode": "interactive",
  "developer_mode": false,
  "granularity": "standard",

  "model_profile": "balanced",

  "workflow": {
    "research": true,
    "plan_check": true,
    "continuity": true,
    "voice_check": true,
    "auto_advance": false,
    "discuss_mode": "discuss",
    "skip_discuss": false
  },

  "autopilot": {
    "profile": "guided",
    "pause_on_voice_drift": true,
    "pause_on_continuity_error": true,
    "pause_on_plot_hole": true,
    "custom_checkpoints": []
  },

  "style": {
    "default_pov": "third_limited",
    "default_tense": "past",
    "chapter_naming": "numbered",
    "scene_break_style": "***"
  },

  "targets": {
    "total_word_count": null,
    "chapter_word_count": null,
    "scene_word_count": null
  },

  "export": {
    "default_format": "markdown",
    "kdp_trim_size": "6x9",
    "kdp_paper_type": "cream",
    "include_front_matter": true,
    "include_back_matter": true,
    "manuscript_format": {
      "font": "Times New Roman",
      "size": 12,
      "spacing": "double",
      "margins": "1in"
    }
  },

  "translation": {
    "source_language": "en",
    "target_languages": [],
    "name_handling": "keep_original",
    "measurement_system": "source"
  },

  "collaboration": {
    "tracks_enabled": false,
    "default_track": "canon"
  },

  "illustration": {
    "style": null,
    "cover_enabled": false,
    "interior_enabled": false
  },

  "git": {
    "auto_commit": true,
    "commit_message_style": "descriptive",
    "branching_strategy": "none"
  },

  "sacred": {
    "tradition": null,
    "verse_numbering_system": null,
    "calendar_system": null,
    "translation_philosophy": "formal_equivalence",
    "canonical_alignment": null,
    "annotation_traditions": [],
    "doctrinal_framework": null,
    "preserve_source_terms": [],
    "transliteration_style": null
  }
}
```

**Sacred config field reference:**
- `tradition` — `christian`, `jewish`, `islamic`, `buddhist`, `hindu`, `interfaith`, `historical_secular`, `custom`
- `verse_numbering_system` — `masoretic`, `septuagint`, `quranic_hafs`, `quranic_warsh`, `pali_canon`, `custom`
- `calendar_system` — `gregorian`, `hebrew`, `hijri`, `vikram_samvat`, `buddhist_era`, `regnal`, `multiple`
- `translation_philosophy` — `formal_equivalence`, `dynamic_equivalence`, `paraphrase`, `interlinear`
- `canonical_alignment` — name of canonical translation to align with (e.g., `kjv`, `nrsv`, `sahih_international`)
- `annotation_traditions` — array of commentary traditions to include (e.g., `["catholic", "reformed", "orthodox"]`)
- `doctrinal_framework` — confessional framework if any (e.g., `nicene_creed`, `westminster_confession`, `aqidah_tahawiyya`)

---

## 18. Build Phases

### Phase 1: Core System (MVP)
- Installer (Claude Code primary + Cursor + Gemini)
- Core workflow commands (new-work → discuss → plan → draft → review → submit → complete)
- Adaptive naming system (all 30+ work types)
- Context file templates (all .md files)
- Voice DNA system (STYLE-GUIDE.md generation, all dimensions)
- Agent prompts (drafter, researcher, continuity checker, voice checker, plan checker)
- Git integration (atomic commits)
- State management
- Help / progress / next

### Phase 2: Autonomous Mode + Writer Mode
- Autopilot command (guided, supervised, full-auto profiles)
- Developer mode vs. writer mode toggle
- Writer-friendly git abstractions (save, history, compare, versions)
- Flow mode (auto-approve)
- Session pause/resume/report

### Phase 3: Structure & Character Tools
- Character creation and management
- Relationship mapping
- Plot graph (all arc types: three-act, five-act, hero's journey, save the cat, kishotenketsu, etc.)
- Timeline
- Theme tracker
- Subplot mapping
- World-building

### Phase 4: Quality & Review
- Line edit, copy edit
- Dialogue audit
- Pacing analysis
- Voice check
- Sensitivity review
- Beta reader
- Continuity check
- Troubleshoot (plot hole debugger)

### Phase 5: Front/Back Matter + Publishing Pipeline
- All front matter elements (19 elements)
- All back matter elements (12+ elements)
- KDP marketing back matter
- Export: markdown, docx (manuscript + formatted), pdf
- Export: epub, fountain, fdx, latex
- Export: KDP package (interior + cover template + metadata)
- Export: IngramSpark, D2D packages
- Export: submission package, query package
- Blurb, synopsis, query letter, book proposal generators

### Phase 6: Illustration & Cover Art
- Cover art generation (front, spine, back, full wrap)
- KDP cover specs with calculated spine width
- Interior illustration prompts
- Character reference sheets
- Art direction document
- Chapter headers, spot illustrations
- Map illustration
- Children's book / comic specific tools (spread layout, storyboard, panel layout)

### Phase 7: Translation & Multi-Language
- Translation pipeline (per-language)
- Glossary management
- Translation memory
- Cultural adaptation
- Back-translation verification
- Multi-language export
- Per-market metadata and formatting
- RTL and CJK support

### Phase 8: Collaboration
- Revision tracks (branch abstraction)
- Track compare / merge / propose
- Continuity conflict resolution
- Editor-writer workflow
- Co-writing parallel tracks
- Writer mode visual timeline

### Phase 9: Multi-Runtime Expansion + Polish
- All remaining runtimes (Codex, OpenCode, Copilot, Windsurf, Antigravity)
- Writer profile system
- Manager (interactive command center)
- Academic-specific features (citation check, peer review simulation, journal templates)
- Health check and repair
- Full documentation and user guide
- Seeds, threads, notes
- Forensics (stuck workflow diagnosis)

### Phase 10: Sacred & Historical Texts
- 13 sacred/historical work types (Biblical, Quranic, Torah, Vedic, Buddhist, Generic, Commentary, Devotional, Liturgical, Chronicle, Account, Mythological, Religious Epic, Sermon, Homiletic Collection)
- Adapted file structure (FIGURES.md, LINEAGES.md, COSMOLOGY.md, THEOLOGICAL-ARC.md, DOCTRINES.md, FRAMEWORK.md)
- Sacred voice registers (10 registers: prophetic, wisdom, legal, liturgical, narrative-historical, apocalyptic, epistolary, psalmic, parabolic, didactic)
- Sacred-exclusive commands (concordance, cross-reference, genealogy, chronology, annotation-layer, verse-numbering, source-tracking, doctrinal-check)
- Sacred-adapted commands (new-figure, lineage-map, build-cosmology, theological-arc, doctrine-tracker, register-check, etc.)
- Sacred discuss-phase categories (10 categories specific to scriptural/historical writing)
- Sacred translation pipeline (formal vs. dynamic equivalence, canonical alignment, liturgical preservation)
- Tradition-aware front/back matter (imprimatur, nihil obstat, hekhsher, glossary, concordance, maps)
- Sacred config schema (tradition, verse numbering, calendar, translation philosophy, canonical alignment)
- Multi-tradition annotation layer support

---

## 19. User Journey & Retention

### 19.1 User Personas

| Persona | Description | Primary Path | Key Risk |
|---------|-------------|-------------|----------|
| **Solo novelist** | Writing their first or nth novel with AI | Full pipeline: create → write → polish → publish | First draft quality |
| **Screenwriter** | Writing screenplays, TV pilots, stage plays | Script-adapted pipeline with Fountain/FDX export | Script format accuracy |
| **Academic** | Research papers, theses, dissertations | Academic-adapted pipeline with LaTeX/citation management | Citation rigor |
| **Self-publisher** | Rapid production, series, multi-language | Autopilot + publishing presets + translation | Pipeline overwhelm |
| **Non-technical writer** | No terminal experience, memoir/personal projects | `/scr:next` as primary interface, writer mode | Every friction point |
| **Sacred/historical writer** | Pastors, scholars, religious communities producing devotionals, commentaries, critical editions, liturgical texts | Sacred-adapted pipeline with concordance, cross-reference, doctrinal-check, scholarly review | Doctrinal sensitivity, tradition fidelity |

### 19.2 Three "Aha" Moments That Determine Retention

1. **The Voice DNA moment** (during `new-work`) — Writer opens STYLE-GUIDE.md and sees their voice described in precise, usable terms. "This is what I sound like." If generic, trust is broken.

2. **The first draft moment** (during `draft-chapter 1`) — Drafted prose actually sounds like them. Not AI slop. The voice DNA, character samples, and style guide must all be loaded into every drafter agent.

3. **The resume moment** (returning after days away) — `resume-work` drops them back in with full context. No re-reading needed. If context is lost, they lose trust.

### 19.3 Drop-Off Risk Mitigations

#### Risk 1: Onboarding feels like a survey (HIGH)

| Strategy | Implementation |
|----------|---------------|
| **Progressive disclosure** | First run asks exactly 3 questions: What are you writing? Got a premise? Any existing material? Everything else is deferred to incremental refinement. |
| **Skip-to-writing fast path** | `/scr:new-work --quick` generates minimal context files (WORK.md, OUTLINE.md, STYLE-GUIDE.md) and drops the writer into `discuss-chapter 1`. Full character profiles, world-building, and plot graph are built lazily as writing demands them. |
| **Engagement detection** | If the writer gives one-word answers or skips optional questions 3x in a row, system says "Looks like you want to jump in" and switches to quick-start automatically. |
| **Anytime refinement** | `/scr:profile-writer --refine` asks 2-3 new questions per session. Writer never needs a big upfront session. Context files are always editable. |

#### Risk 2: First draft quality breaks trust (HIGH)

| Strategy | Implementation |
|----------|---------------|
| **Voice calibration gate** | Before the first full chapter, `/scr:voice-test` generates a 300-word passage and asks "Does this sound like you?" Up to 3 adjustment rounds before full drafting begins. |
| **Character voice samples** | Before drafting scenes with dialogue, system generates 5-line dialogue samples per character for approval. Stored as voice anchors in CHARACTERS.md. |
| **Reference passage loading** | If the writer provided sample text during `profile-writer --analyze`, drafter agents receive 500 words of the writer's own prose as voice evidence. |
| **First-chapter quality gate** | After Chapter 1, automatic voice-check runs. If drift exceeds threshold, flags and offers revision before proceeding. |
| **Immediate voice correction** | Writer says "this doesn't sound like me" → system asks 3 targeted questions ("too formal? too descriptive?") → updates STYLE-GUIDE.md → re-drafts the scene. Quick loop, not a restart. |

#### Risk 3: Non-technical writers hit friction (MEDIUM)

| Strategy | Implementation |
|----------|---------------|
| **`/scr:next` as universal interface** | A writer who only ever types `/scr:next` can complete an entire novel. Detects state, explains the next step in plain language, runs it. |
| **Natural language routing** | `/scr:do "I want to work on chapter 5"` → routes to the right command. Free-text input, structured execution. |
| **Writer-language errors** | Never "HANDOFF.json not found." Instead: "You haven't saved your place yet. Want me to save where you are?" Every error is a helpful nudge. |
| **Contextual hints** | After every command, one-line suggestion: "Next, you could discuss Chapter 3, or type /scr:next and I'll handle it." Trains workflow through use, not docs. |
| **Conversational help** | `/scr:help` asks "What are you trying to do?" and filters to 3-4 relevant commands, not a list of 120+. |

#### Risk 4: Publishing pipeline overwhelm (MEDIUM)

| Strategy | Implementation |
|----------|---------------|
| **Publishing presets** | `/scr:publish --preset kdp-paperback` or `--preset query-submission` or `--preset ebook-wide`. Named pipelines that chain the right commands. |
| **One-command publish** | `/scr:autopilot-publish` handles everything: front matter → back matter → compile → cover template → export → platform packages. |
| **Publishing wizard** | `/scr:publish` (no flags) starts interactive wizard: "Where do you want to publish?" → assembles pipeline from answers. |
| **Prerequisite checklist** | When publish starts, shows what's ready vs. missing with one-click commands to generate each missing piece. |

### 19.4 Demo Mode

```
/scr:demo                     Launch pre-built sample project
/scr:demo --clear              Remove demo project
/scr:demo --genre <genre>      Demo in a specific genre (if available)
```

Ships with a pre-built short story (~5 scenes) that showcases:
- Full `.manuscript/` structure with all context files populated
- Characters with distinct voice profiles
- Completed plot graph with arc positions
- Drafted scenes with continuity anchors
- Editor review notes

The writer can explore every command without risk: browse files, run `/scr:progress`, view the plot graph, try `/scr:editor-review`, run `/scr:export docx`. It's a sandbox. Delete with `/scr:demo --clear` when ready to start their own work.

### 19.5 `/scr:next` — The One Command Interface

For the majority of writers, `/scr:next` is the only command they need.

**Behavior:**
1. Inspects STATE.md to determine current workflow position
2. Explains what it's about to do in one plain-language sentence
3. Runs the appropriate command
4. After completion, suggests the next step

**Edge cases:**
- Nothing pending → Suggests options: "Your draft is complete. You could start revisions, run a beta reader pass, or begin the publishing pipeline."
- Multiple valid next steps → Presents choices: "Chapter 3 is ready to draft, but you also have editor notes on Chapter 2. Which first?"
- First run, no project → Runs `/scr:new-work`
- Revision plans exist → Prioritizes revisions over new drafting

**Power users** can override with specific commands anytime. `/scr:next` is the easy path, not the only path.

### 19.6 `/scr:do` — Natural Language Router

```
/scr:do "write the next chapter"          → /scr:draft-chapter N
/scr:do "check for plot holes"            → /scr:continuity-check
/scr:do "add a new villain"               → /scr:new-character
/scr:do "make a cover"                    → /scr:cover-art
/scr:do "how's the pacing?"              → /scr:pacing-analysis
/scr:do "I want to publish on KDP"        → /scr:publish --preset kdp-paperback
/scr:do "translate to French"             → /scr:translate french
/scr:do "what did I do last session?"     → /scr:session-report
```

Maps free-text intent to the right command. Covers the gap between `/scr:next` (fully automatic) and specific commands (fully manual).

### 19.7 Series Bible

For writers producing series (novel series, TV seasons, comic runs, sequel trilogies).

```
/scr:series-bible                          View/edit the series bible
/scr:series-bible --init                   Initialize from current work
/scr:series-bible --import <work_path>     Import from another project
/scr:series-bible --check                  Verify current work against bible
/scr:series-bible --timeline               Cross-book timeline
/scr:series-bible --characters             Character states across books
```

**The series bible stores:**
- Canonical character states (alive, dead, married, transformed) with book-of-change
- World rules that are locked (magic system, technology, geography, physics)
- Timeline of events across all books
- Relationship evolution across installments
- Unresolved threads that should carry forward (with expected resolution book)
- Reader knowledge state (what the reader knows at each book's endpoint)
- Series-level style guide (voice DNA that's consistent across books)
- Recurring motifs and symbols
- Terminology glossary (invented words, place names, proper nouns)

**When starting a new book in the series:** `/scr:new-work` detects the series bible and loads it automatically. The constraint system enforces consistency — drafters cannot contradict established facts without explicit writer override. Continuity checks run against the full series, not just the current book.

**Series bible lives at:** `~/.scriven/series/{series_name}/SERIES-BIBLE.md` (global, shared across projects).

---

## 20. Resolved Decisions

| Decision | Resolution |
|----------|-----------|
| Package name | `scriven` (npm), `scr` (command prefix) |
| License | MIT |
| Primary runtime | Claude Code, with all major AI coding agents supported |
| Structural naming | Adaptive per work type (48+ types mapped, including sacred/historical) |
| Voice DNA depth | Comprehensive (15+ dimensions, every option enumerated) |
| Front/back matter | Full support (19 front, 12+ back, KDP marketing extras) |
| Export formats | Manuscript, KDP, EPUB, LaTeX, Fountain, FDX + platform packages |
| Illustration | Full pipeline (cover, interior, character refs, maps, storyboards) |
| Translation | Deep (glossary, TM, cultural adaptation, back-translation, multi-publish) |
| Non-developers | Writer mode (hides git) + `/scr:next` as universal interface + `/scr:do` NL router |
| Autonomous mode | Autopilot with 3 profiles (guided, supervised, full-auto) |
| Collaboration | Git-based with creative writing terminology overlay |
| GSD features to cut | UI-phase, PR-branch, crypto token, docs-update |
| Co-writing | Parallel tracks with continuity merge checking |
| Onboarding | Skippable, progressive disclosure, 3-question quick start |
| Demo mode | Pre-built sample project, explorable sandbox |
| Primary interface | `/scr:next` for most writers, direct commands for power users |
| Series support | Series bible with cross-book continuity enforcement |
| Sacred/historical | 13 work types, 8 exclusive commands, 10 voice registers, tradition-native structure |

---

**Total commands: ~170+**
**Work types supported: 50+**
**Export formats: 15+**
**Translation: unlimited languages**
