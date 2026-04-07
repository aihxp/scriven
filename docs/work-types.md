# Work Types Guide

Scriven adapts itself to what you're writing. When you run `/scr:new-work` and tell Scriven you're writing a novel, a screenplay, a Quran commentary, or a research paper, it changes its vocabulary, commands, file names, and available features to match your tradition. A novel has chapters and scenes. A screenplay has acts and sequences. A Quranic text has surahs and ayahs. You never have to force your work into someone else's structure.

This guide covers all 46 work types Scriven supports, organized into 8 groups.

## How Work Types Adapt Scriven

When you set a work type (via `/scr:new-work --type <work_type>` or during onboarding), Scriven adapts in four ways:

### 1. Hierarchy vocabulary

Every work type defines a three-level structural hierarchy: **top level**, **mid level**, and **atomic unit**. A novel's hierarchy is part > chapter > scene. A screenplay's is act > sequence > scene. A Torah project's is chumash > parashah > pasuk. Scriven uses these terms everywhere -- in commands, outlines, progress reports, and file names.

### 2. Command names

Commands rename themselves to match your domain. `/scr:draft-chapter` becomes `/scr:draft-surah` for Quranic work, `/scr:draft-act` for screenplays, `/scr:draft-section` for research papers. Some commands get entirely different names for specific groups -- for example, `/scr:character-sheet` becomes `/scr:figure-sheet` for sacred work types, and `/scr:plot-graph` becomes `/scr:argument-map` for academic work. See the [Command Adaptations](#command-adaptations) section below.

### 3. File names

Context files rename per group. The default `CHARACTERS.md` becomes `FIGURES.md` for sacred work types and `CONCEPTS.md` for academic work. `PLOT-GRAPH.md` becomes `THEOLOGICAL-ARC.md` for sacred and `ARGUMENT-MAP.md` for academic. See [File Adaptations](#file-adaptations) below.

### 4. Available commands

Not every command makes sense for every work type. Poetry collections don't need `/scr:subplot-map`. Academic papers don't need `/scr:dialogue-audit`. Scriven hides irrelevant commands and shows only what applies to your work type. Sacred work types get 8 exclusive commands (concordance, cross-reference, genealogy, etc.) that don't appear for other groups.

## Work Type Groups

Scriven organizes its 46 work_types into 8 groups. Each group shares command adaptations and file naming conventions.

### Prose

Traditional narrative and nonfiction forms. This is the largest group, covering everything from novels to essays.

**Members:** Novel, Novella, Short Story, Flash Fiction, Memoir, Creative Nonfiction, Biography, Essay, Essay Collection

Prose work types use the default command names and file names. Most Scriven features are available to prose.

### Script

Performance-oriented writing where formatting and structure follow industry conventions.

**Members:** Screenplay, Stage Play, TV Pilot, TV Series Bible, Audio Drama / Podcast Script, Libretto / Musical

Script work types use act-based hierarchies. Screenplays and TV scripts can export to Fountain and FDX formats.

### Academic

Research and scholarly writing with emphasis on argumentation, citation, and peer review.

**Members:** Research Paper, Thesis / Dissertation, Journal Article, White Paper, Literature Review, Monograph

Academic work types rename several commands: `/scr:editor-review` becomes `/scr:peer-review`, `/scr:plot-graph` becomes `/scr:argument-map`, `/scr:beta-reader` becomes `/scr:reviewer-simulation`. Context files also adapt -- `CHARACTERS.md` becomes `CONCEPTS.md`, `THEMES.md` becomes `QUESTIONS.md`.

### Visual

Works where text and image are co-equal. Layout, illustration, and visual pacing matter as much as prose.

**Members:** Comic / Graphic Novel, Graphic Novel, Children's Book, Picture Book

Visual work types unlock illustration-specific commands like `/scr:spread-layout`, `/scr:panel-layout`, and `/scr:storyboard`.

### Poetry

Verse-based forms where line, rhythm, and musicality drive structure.

**Members:** Poetry Collection, Single Poem, Lyric / Song

Poetry work types use stanza/line hierarchies. Many structural commands (plot-graph, subplot-map, timeline) are hidden since they don't apply to verse.

### Interactive

Branching narrative forms for games and interactive fiction.

**Members:** Interactive Fiction, Game Narrative

Interactive work types use node/quest/dialogue_tree hierarchies to handle branching story paths.

### Speech and Song

Performed spoken-word forms.

**Members:** Speech

Speech uses section/beat hierarchy. Most structural and illustration commands are hidden.

### Sacred and Historical

Sacred texts, historical chronicles, and religious literature. This is the most heavily adapted group, with exclusive commands, voice registers, and tradition-specific configurations.

**Members:** Scripture (Biblical), Scripture (Quranic), Scripture (Torah), Scripture (Vedic), Scripture (Buddhist), Scripture (Generic), Commentary / Exegesis, Devotional, Liturgical Text, Historical Chronicle, Historical Account, Mythological Collection, Religious Epic, Sermon / Homily, Homiletic Collection

Sacred work types rename most character/world commands (character becomes figure, world becomes cosmology), unlock 8 exclusive commands (concordance, cross-reference, genealogy, chronology, annotation-layer, verse-numbering, source-tracking, doctrinal-check), and support 10 voice registers in STYLE-GUIDE.md.

## Complete Work Type Table

Every work type Scriven supports, with its group and structural hierarchy. Data sourced from `data/CONSTRAINTS.json`.

| Work Type | Group | Top Level | Mid Level | Atomic Unit | Command Unit |
|-----------|-------|-----------|-----------|-------------|--------------|
| novel | Prose | part | chapter | scene | chapter |
| novella | Prose | -- | chapter | scene | chapter |
| short_story | Prose | -- | section | beat | section |
| flash_fiction | Prose | -- | -- | beat | beat |
| memoir | Prose | part | chapter | vignette | chapter |
| creative_nonfiction | Prose | part | chapter | scene | chapter |
| biography | Prose | part | chapter | scene | chapter |
| essay | Prose | -- | section | paragraph_block | section |
| essay_collection | Prose | part | -- | essay | essay |
| screenplay | Script | act | sequence | scene | act |
| stage_play | Script | act | scene | beat | act |
| tv_pilot | Script | act | scene | beat | act |
| tv_series_bible | Script | season | episode | scene | episode |
| audio_drama | Script | season | episode | scene | episode |
| libretto | Script | act | scene | number | act |
| research_paper | Academic | -- | section | subsection | section |
| thesis | Academic | part | chapter | section | chapter |
| journal_article | Academic | -- | section | subsection | section |
| white_paper | Academic | -- | section | subsection | section |
| literature_review | Academic | -- | section | subsection | section |
| monograph | Academic | part | chapter | section | chapter |
| comic | Visual | volume | issue | panel | issue |
| graphic_novel | Visual | volume | chapter | panel | chapter |
| childrens_book | Visual | -- | spread | page | spread |
| picture_book | Visual | -- | spread | illustration_text | spread |
| poetry_collection | Poetry | section | -- | poem | section |
| single_poem | Poetry | -- | stanza | line | stanza |
| song_lyric | Poetry | -- | section | line | section |
| interactive_fiction | Interactive | -- | node | choice_branch | node |
| game_narrative | Interactive | act | quest | dialogue_tree | quest |
| speech | Speech & Song | -- | section | beat | section |
| scripture_biblical | Sacred & Historical | testament | book | verse | book |
| scripture_quranic | Sacred & Historical | -- | surah | ayah | surah |
| scripture_torah | Sacred & Historical | chumash | parashah | pasuk | parashah |
| scripture_vedic | Sacred & Historical | veda | mandala | sukta | mandala |
| scripture_buddhist | Sacred & Historical | pitaka | nikaya | sutta | sutta |
| scripture_generic | Sacred & Historical | testament | book | verse | book |
| commentary | Sacred & Historical | -- | section | annotation_block | section |
| devotional | Sacred & Historical | -- | theme | entry | entry |
| liturgical | Sacred & Historical | rite | section | rubric | section |
| historical_chronicle | Sacred & Historical | era | chapter | event | chapter |
| historical_account | Sacred & Historical | part | chapter | scene | chapter |
| mythological_collection | Sacred & Historical | cycle | -- | tale | tale |
| religious_epic | Sacred & Historical | book | canto | verse | canto |
| sermon | Sacred & Historical | -- | movement | beat | sermon |
| homiletic_collection | Sacred & Historical | liturgical_year | -- | sermon | sermon |

## File Adaptations

Context files rename based on your work type group. This keeps the vocabulary natural -- a sacred text project has FIGURES.md instead of CHARACTERS.md, because you're writing about historical and religious figures, not fictional characters.

| Default File | Academic | Sacred & Historical |
|-------------|----------|-------------------|
| BRIEF.md | PROPOSAL.md | FRAMEWORK.md |
| CHARACTERS.md | CONCEPTS.md | FIGURES.md |
| RELATIONSHIPS.md | RELATIONSHIPS.md | LINEAGES.md |
| WORLD.md | CONTEXT.md | COSMOLOGY.md |
| PLOT-GRAPH.md | ARGUMENT-MAP.md | THEOLOGICAL-ARC.md |
| THEMES.md | QUESTIONS.md | DOCTRINES.md |

All other groups (Prose, Script, Visual, Poetry, Interactive, Speech & Song) use the default file names.

## Command Adaptations

Certain commands rename themselves for academic and sacred work type groups. Both the original and adapted names work -- Scriven recognizes either.

### Academic Adaptations

| Original Command | Adapted Name | Focus |
|-----------------|--------------|-------|
| copy-edit | citation-check | Citation format, bibliography consistency |
| beta-reader | peer-review | Methodology critique, argument strength |
| export | journal-submit | APA, MLA, Chicago presets |

Additional adaptations defined in the commands section of CONSTRAINTS.json: `editor-review` becomes `peer-review`, `plot-graph` becomes `argument-map`, `theme-tracker` becomes `research-questions`, `continuity-check` becomes `citation-check`, `sensitivity-review` becomes `ethics-review`, `new-character` becomes `new-concept`, `character-sheet` becomes `concept-sheet`.

### Sacred Adaptations

| Original Command | Adapted Name | Description |
|-----------------|--------------|-------------|
| new-character | new-figure | Create figure profile |
| character-sheet | figure-sheet | View/edit figure profile |
| character-arc | figure-arc | Spiritual/historical arc |
| cast-list | figures-list | Roster of all figures |
| relationship-map | lineage-map | Genealogical/covenantal relationships |
| build-world | build-cosmology | Sacred geography, cosmological framework |
| character-voice-sample | register-sample | Voice register sample |
| voice-check | register-check | Voice register consistency |
| plot-graph | theological-arc | Salvation history or dharmic cycle |
| theme-tracker | doctrine-tracker | Doctrinal threads |
| subplot-map | narrative-threads | Narrative threads across text |
| character-ref | figure-ref | Visual figure reference for sacred art |
| discussion-questions | study-questions | Study/reflection questions |
| editor-review | scholarly-review | Academic review |
| beta-reader | theological-review | Doctrinal/pastoral review |
| sensitivity-review | interfaith-review | Sensitivity across traditions |

## Choosing Your Work Type

When you run `/scr:new-work`, Scriven asks what you're writing and picks the best work type from your answer. You can also set it explicitly:

```
/scr:new-work --type screenplay
/scr:new-work --type scripture_quranic
/scr:new-work --type research_paper
```

If you're not sure which type fits:

- **Writing fiction?** Start with `novel`, `novella`, `short_story`, or `flash_fiction` depending on length.
- **Writing for performance?** Use `screenplay`, `stage_play`, `tv_pilot`, or `audio_drama`.
- **Writing scholarship?** Use `research_paper`, `thesis`, or `journal_article`.
- **Writing sacred or religious text?** Pick the tradition-specific type (e.g., `scripture_biblical`, `scripture_quranic`) or use `scripture_generic`.
- **Writing poetry?** Use `poetry_collection` for a book of poems, `single_poem` for one poem, or `song_lyric` for lyrics.
- **Writing for children?** Use `childrens_book` or `picture_book` -- these unlock illustration and spread layout tools.

Your work type is stored in `.manuscript/config.json` and can be changed later by editing the file directly or starting a new project with `/scr:new-work`.

## See Also

- [Getting Started](getting-started.md) -- Install Scriven and write your first draft
- [Command Reference](command-reference.md) -- Full list of all 101 commands with usage and examples
- [Voice DNA Guide](voice-dna.md) -- How Scriven profiles and preserves your writing voice
