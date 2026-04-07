# Phase 3: Creative Toolkit - Research

**Researched:** 2026-04-06
**Domain:** Markdown skill file commands for character, world-building, and narrative structure tools
**Confidence:** HIGH

## Summary

Phase 3 adds 13 new command files and enhances 1 existing command (plot-graph), plus creates 2 new templates (WORLD.md, RELATIONSHIPS.md). The domain is purely markdown skill files -- no compiled code, no runtime dependencies. The command pattern is thoroughly established: YAML frontmatter with `description` field, a `# Title` heading, `## Usage` section, `## Instruction` section with structured prompts, and integration points with manuscript context files.

The primary complexity lies in structure management commands (STRUCT-06: add/split/merge/reorder units) which must update OUTLINE.md, STATE.md, and handle existing draft files safely. These commands are work-type-polymorphic -- they use the hierarchy from CONSTRAINTS.json (e.g., novel uses chapter/scene, screenplay uses act/sequence/scene, scripture uses book/verse). All character commands must support sacred adaptations (new-figure, figure-sheet, etc.) and academic adaptations (new-concept, concept-sheet) per CONSTRAINTS.json.

**Primary recommendation:** Implement in three waves -- (1) character tools that extend the existing new-character pattern, (2) world-building and visualization tools, (3) structure management commands that are the most complex due to draft-safety requirements.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Character voice anchors include 5-8 concrete attributes per character: speech patterns, vocabulary register, sentence length, verbal tics, internal monologue style -- matches STYLE-GUIDE.md dimension granularity
- **D-02:** Relationship-map renders as ASCII graph with labeled edges (e.g., "Elias --[father]--> Petra") -- works in any terminal
- **D-03:** Character-arc cross-references PLOT-GRAPH.md so character arcs align with story beats
- **D-04:** WORLD.md structured in 5 sections: Geography, Culture, Technology/Magic, Rules/Laws, History -- covers all genres
- **D-05:** build-world is progressive: ask 3-5 seed questions, generate initial WORLD.md, then refine incrementally via `--area` flag
- **D-06:** plot-graph `--type` flag selects arc template; default detects from OUTLINE.md length/structure (three-act for short, hero's journey for epic, kishotenketsu for literary)
- **D-07:** add/split/merge/reorder units warn if drafted content is affected, require confirmation, auto-update STATE.md and OUTLINE.md -- never silently move or delete drafted prose
- **D-08:** theme-tracker auto-detects themes from drafted prose and suggests additions to THEMES.md, but never auto-adds without writer approval

### Claude's Discretion
- Arc type detection heuristics from OUTLINE.md
- ASCII graph layout algorithm for relationship-map
- Specific seed questions for build-world progressive flow
- How subplot-map handles intersection visualization

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CHAR-01 | `/scr:new-character` creates structured character profile | Already built in Phase 1 MVP. Needs verification it meets D-01 voice anchor spec |
| CHAR-02 | `/scr:character-sheet` displays/edits a specific character's full profile | New command file. Follows display/edit pattern from plot-graph.md |
| CHAR-03 | `/scr:character-arc` visualizes character's emotional/growth arc | New command. Cross-references PLOT-GRAPH.md per D-03 |
| CHAR-04 | `/scr:character-voice-sample` generates 5-line dialogue sample | New command. Reads CHARACTERS.md + STYLE-GUIDE.md per prerequisites |
| CHAR-05 | `/scr:relationship-map` generates markdown relationship graph | New command. ASCII graph per D-02. Requires 2+ characters |
| CHAR-06 | `/scr:cast-list` displays roster of all characters | New command. Reads CHARACTERS.md |
| CHAR-07 | `/scr:build-world` generates WORLD.md | New command + new WORLD.md template. Progressive flow per D-05 |
| CHAR-08 | Character commands adapt names for sacred/academic | CONSTRAINTS.json already defines all adaptations. Commands must read and respect them |
| STRUCT-01 | `/scr:plot-graph` supports multiple arc types | Existing command. Needs `--type` flag enhancement per D-06 |
| STRUCT-02 | `/scr:timeline` generates chronological event timeline | New command. Reads OUTLINE.md |
| STRUCT-03 | `/scr:theme-tracker` tracks thematic threads | New command. Auto-detect per D-08, never auto-add |
| STRUCT-04 | `/scr:subplot-map` visualizes subplot threads | New command. Requires 2+ threads |
| STRUCT-05 | `/scr:outline` displays/edits structural outline | New command. Reads/writes OUTLINE.md |
| STRUCT-06 | Structure management: add/insert/remove/split/merge/reorder units | 6 new commands. Draft-safe per D-07. Work-type polymorphic via CONSTRAINTS.json hierarchy |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Architecture**: Pure skill/command system -- no compiled code, no runtime dependencies beyond Node.js installer
- **Voice fidelity**: Every feature must preserve Voice DNA pipeline -- fresh context per atomic unit, STYLE-GUIDE.md loaded first
- **Backward compatibility**: Existing 28 commands and templates must continue working
- **Plan authority**: Product plan (section 15) is canonical for command specs
- **Progressive disclosure**: Onboarding asks 3 questions max; depth is optional and additive
- **GSD Workflow**: Use GSD entry points for all repo edits

## Standard Stack

### Core
| Component | Type | Purpose | Why Standard |
|-----------|------|---------|--------------|
| Markdown skill files | `.md` in `commands/scr/` | Command definitions | Established pattern from 28 existing commands |
| YAML frontmatter | `description:` field | Command metadata | Required by commands.test.js validation |
| CONSTRAINTS.json | JSON in `data/` | Work-type routing, adaptations, prerequisites | Runtime constraint system -- every command checks this |
| Template files | `.md` in `templates/` | Manuscript file scaffolds | Used by new-work to populate `.manuscript/` |

### Supporting
| Component | Purpose | When to Use |
|-----------|---------|-------------|
| `config.json` | Developer/writer mode toggle | Output format selection per command |
| `STATE.md` | Progress tracking | Structure commands must update after modifications |
| `OUTLINE.md` | Structural outline | Read by structure commands, modified by add/split/merge/reorder |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| ASCII relationship graphs | Mermaid diagrams | ASCII works in any terminal/agent; Mermaid requires renderer. D-02 locks ASCII |
| Work-type polymorphic commands | Separate commands per type | Polymorphism via CONSTRAINTS.json keeps command count manageable |

## Architecture Patterns

### Recommended Project Structure
```
commands/scr/
  character-sheet.md      # New
  character-arc.md        # New
  character-voice-sample.md # New
  relationship-map.md     # New
  cast-list.md           # New
  build-world.md         # New
  timeline.md            # New
  theme-tracker.md       # New
  subplot-map.md         # New
  outline.md             # New
  add-unit.md            # New (polymorphic via CONSTRAINTS.json hierarchy)
  insert-unit.md         # New
  remove-unit.md         # New
  split-unit.md          # New
  merge-units.md         # New
  reorder-units.md       # New
  plot-graph.md          # Enhanced (already exists)
  new-character.md       # Verified (already exists)
templates/
  WORLD.md               # New
  RELATIONSHIPS.md       # New
```

### Pattern 1: Command File Structure
**What:** Every command follows the established markdown skill file pattern
**When to use:** Every new command in this phase
**Example:**
```markdown
---
description: One-line description of what the command does.
argument-hint: "[optional arguments]"
---

# /scr:command-name -- Human-Readable Title

Brief intro sentence.

## Usage
\```
/scr:command-name [args]
\```

## Instruction

You are [role]. Load:
- `WORK.md` (genre context)
- `CHARACTERS.md` (if character-related)
- [other context files]

---

### SECTION NAME

<structured_prompt>
  [XML-structured instructions for the AI agent]
</structured_prompt>

## Writer mode output / Developer mode output

[Mode-appropriate output formatting]

## Edge cases

[Boundary conditions]

## Tone

[Brief tone guidance]
```

### Pattern 2: Work-Type Adaptation Pattern
**What:** Commands read CONSTRAINTS.json to determine adapted names and file mappings
**When to use:** Every character/world/structure command that has sacred or academic adaptations
**Example:**
```markdown
## Instruction

You are displaying the character roster. First, load:
- `.manuscript/config.json` (to get `work_type`)
- `data/CONSTRAINTS.json` (to check command adaptations and file mappings)

Determine the correct file name:
- Default: `CHARACTERS.md`
- Academic work types: `CONCEPTS.md`
- Sacred work types: `FIGURES.md`

Use the adapted terminology throughout output:
- Default: "characters", "character sheet", "cast list"
- Academic: "concepts", "concept sheet"
- Sacred: "figures", "figure sheet", "figures list"
```

### Pattern 3: Display/Edit Mode Pattern
**What:** Commands support `--edit` flag for modification mode vs. default display mode
**When to use:** character-sheet, outline, timeline, theme-tracker, subplot-map, relationship-map
**Example:**
```markdown
## Usage
\```
/scr:command-name [name] [--edit]
\```

### DISPLAY MODE (default)
Present information in a formatted, readable view.

### EDIT MODE (--edit)
Allow the writer to modify the data interactively.
Update the source file(s) and commit.
```

### Pattern 4: Draft-Safe Structure Modification
**What:** Structure management commands check for existing drafts before modifying OUTLINE.md
**When to use:** add-unit, insert-unit, remove-unit, split-unit, merge-units, reorder-units (STRUCT-06)
**Example:**
```markdown
## Instruction

Before modifying the structure:

1. **Load hierarchy from CONSTRAINTS.json** -- determine what "unit" means for this work type
   (novel: chapter, screenplay: act, short_story: section, etc.)

2. **Check for affected drafts** -- scan `.manuscript/drafts/` for any files corresponding
   to units being moved, split, merged, or removed

3. **If drafts exist:**
   - List all affected files with their current content summary
   - Warn the writer: "This will affect [N] drafted files: [list]"
   - Ask for explicit confirmation before proceeding
   - NEVER silently move or delete drafted prose (D-07)

4. **Execute the modification:**
   - Update OUTLINE.md with new structure
   - Rename/move draft files as needed (with confirmation)
   - Update STATE.md progress tracking
   - Update PLOT-GRAPH.md if arc positions changed

5. **Commit:** `structure: {operation} {unit_type} {details}`
```

### Anti-Patterns to Avoid
- **Silent draft deletion:** Structure commands must NEVER delete or overwrite drafted prose without explicit confirmation (D-07)
- **Hard-coded unit names:** Never write "chapter" directly -- always read the hierarchy from CONSTRAINTS.json for the current work type
- **Ignoring file adaptations:** Character commands that reference "CHARACTERS.md" literally instead of checking file_adaptations in CONSTRAINTS.json will break for sacred/academic types
- **Auto-adding to THEMES.md:** Theme-tracker must suggest, not auto-add (D-08)

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Work-type vocabulary | Hard-coded "chapter"/"scene" strings | CONSTRAINTS.json `hierarchy` lookup | 50+ work types with different unit names |
| File name adaptations | Hard-coded "CHARACTERS.md" | CONSTRAINTS.json `file_adaptations` | Sacred uses FIGURES.md, academic uses CONCEPTS.md |
| Command name adaptations | Separate command files per work type | CONSTRAINTS.json `commands[x].adapted` | Already defined for all commands |
| Arc type templates | Custom arc structure definitions | Plot-graph arc type library (in the command file) | Product plan defines 9 arc types; keep them in one place |

**Key insight:** CONSTRAINTS.json is the single source of truth for all polymorphism. Every command must read it at runtime rather than embedding work-type-specific logic.

## Common Pitfalls

### Pitfall 1: Forgetting CONSTRAINTS.json Prerequisites
**What goes wrong:** Command runs without required context files, produces garbage output
**Why it happens:** CONSTRAINTS.json defines prerequisites (e.g., relationship-map requires CHARACTERS.md + min 2 characters) but command file doesn't check
**How to avoid:** Every command instruction must begin with loading prerequisites and checking them. If missing, direct the writer to run the prerequisite command
**Warning signs:** Command produces empty or template-only output

### Pitfall 2: Structure Commands Breaking Draft Files
**What goes wrong:** Reordering chapters moves file references but not the actual draft files, or removes a chapter that has been drafted
**Why it happens:** OUTLINE.md is updated but draft files in `.manuscript/drafts/` aren't checked or reconciled
**How to avoid:** All structure modification commands must scan the drafts directory, identify affected files, warn, and confirm before proceeding (D-07)
**Warning signs:** STATE.md shows units as drafted but the draft files are missing or in wrong locations

### Pitfall 3: ASCII Art Rendering Inconsistency
**What goes wrong:** Relationship map ASCII graph breaks in narrow terminals or with long character names
**Why it happens:** No width awareness in the layout
**How to avoid:** Keep edge labels short, truncate names if needed, use a simple layout algorithm that handles 2-10 characters gracefully
**Warning signs:** Graph edges cross or overlap, labels extend past reasonable terminal width

### Pitfall 4: Plot-Graph Arc Type Detection Ambiguity
**What goes wrong:** Auto-detection picks wrong arc type, confusing the writer
**Why it happens:** Heuristic based on OUTLINE.md length is inherently fuzzy
**How to avoid:** Always show the detected type and offer to change: "Detected: three-act structure (5 scenes). Change with `--type`"
**Warning signs:** Writer complaints about wrong arc mapping

### Pitfall 5: Theme-Tracker False Positives
**What goes wrong:** Auto-detection suggests themes that aren't really there, annoying the writer
**Why it happens:** Pattern matching on prose is imprecise
**How to avoid:** Present detected themes as suggestions with evidence quotes, never auto-add (D-08), let writer confirm/reject
**Warning signs:** Low-quality theme suggestions that miss the actual thematic content

### Pitfall 6: Missing Sacred/Academic Adaptations
**What goes wrong:** Command works for prose but crashes or uses wrong terminology for sacred/academic work types
**Why it happens:** Developer tests only with novel work type
**How to avoid:** Test file must verify that CONSTRAINTS.json adaptations exist for every new command, and that file_adaptations are referenced correctly
**Warning signs:** Running `/scr:figure-sheet` in a sacred project and getting "CHARACTERS.md not found"

## Code Examples

### Example 1: Character-Sheet Command Structure
```markdown
---
description: Display or edit a specific character's full profile.
argument-hint: "[name] [--edit]"
---

# /scr:character-sheet -- View or Edit Character Profile

Display or edit a specific character's complete profile.

## Usage
\```
/scr:character-sheet [name] [--edit]
\```

## Instruction

You are presenting a character's profile. Load:
- `.manuscript/config.json` (work type, developer mode)
- `data/CONSTRAINTS.json` (file adaptations, command adaptations)
- The appropriate characters file (CHARACTERS.md / FIGURES.md / CONCEPTS.md per file_adaptations)
- `STYLE-GUIDE.md` (voice dimension context)

Determine adapted terminology from CONSTRAINTS.json:
- Default: "character", "character sheet"
- Sacred: "figure", "figure sheet"
- Academic: "concept", "concept sheet"

---

### DISPLAY MODE (default)

Find the character by name (case-insensitive match). Present their complete profile
with all sections from CHARACTERS.md template: identity, psychology, arc, voice anchor,
speech patterns, relationships, backstory.

Highlight voice anchor attributes (D-01): speech patterns, vocabulary register,
sentence length, verbal tics, internal monologue style.

### EDIT MODE (--edit)

Walk through each section interactively, showing current values and asking what to change.
Update the characters file and commit.

Commit: `character: update {name} profile`
```

### Example 2: WORLD.md Template Structure (D-04)
```markdown
# World

*The setting rules that constrain everything. If it's not in here, don't assume it exists.*

---

## Geography

**Scale:** {{SCALE}} (city, region, continent, planet, multiverse)
**Key locations:**
{{LOCATIONS}}

**Maps/spatial notes:**
{{SPATIAL_NOTES}}

---

## Culture

**Societies:** {{SOCIETIES}}
**Social structure:** {{SOCIAL_STRUCTURE}}
**Languages:** {{LANGUAGES}}
**Customs and traditions:** {{CUSTOMS}}
**Religion/belief systems:** {{BELIEFS}}

---

## Technology / Magic

**Tech level:** {{TECH_LEVEL}}
**Key technologies:** {{KEY_TECH}}
**Magic system (if applicable):** {{MAGIC_SYSTEM}}
**Rules/limitations:** {{RULES}}
**Cost of magic/tech:** {{COST}}

---

## Rules and Laws

**Governing systems:** {{GOVERNMENT}}
**Laws that matter to the story:** {{LAWS}}
**Enforcement:** {{ENFORCEMENT}}
**What's forbidden:** {{FORBIDDEN}}
**What's common but surprising to outsiders:** {{SURPRISING}}

---

## History

**Timeline of events relevant to the story:** {{TIMELINE}}
**Key historical events:** {{EVENTS}}
**How the past shapes the present:** {{PAST_TO_PRESENT}}
**Historical conflicts still active:** {{ACTIVE_CONFLICTS}}

---
*Update this file as the world develops. Build progressively -- seed questions first, then refine with `/scr:build-world --area <area>`.*
```

### Example 3: Structure Command Unit-Type Resolution
```markdown
## Instruction

First, determine what "unit" means for this work type:

1. Load `.manuscript/config.json` to get `work_type`
2. Load `data/CONSTRAINTS.json` and find `work_types[work_type].hierarchy`
3. The `mid` level is typically the "unit" for structure operations:
   - Novel: `chapter` (mid), with `scene` as atomic
   - Screenplay: `sequence` (mid), with `scene` as atomic
   - Short story: `section` (mid), with `beat` as atomic
   - Scripture (Biblical): `book` (mid), with `verse` as atomic
4. Use the `command_unit` field for display names in output

The command name adapts: `/scr:add-chapter` for novels, `/scr:add-scene` for screenplays,
etc. But internally all use the same logic -- only the label changes.
```

### Example 4: ASCII Relationship Graph (D-02)
```
Characters: Elias, Petra, Maren (deceased), Lena

  Elias ----[father]----> Petra
    |                       |
  [husband]             [daughter]
    |                       |
  Maren                   Lena
  (deceased)           (Petra's mother)

  Elias ---[ex-partner]---> Lena
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Separate command files per work type | Single polymorphic command + CONSTRAINTS.json | Phase 1 design | 1 command file serves 50+ work types |
| Template-only CHARACTERS.md | new-character interactive interview | Phase 1 MVP | Characters created through guided dialogue, not blank templates |

**Already established in Phase 1:**
- new-character.md: Full interactive interview pattern with XML-structured prompts
- plot-graph.md: Display/edit mode with `--type` flag and 9 arc types already listed
- CONSTRAINTS.json: Complete command availability, adaptations, prerequisites, file_adaptations for sacred/academic

## Open Questions

1. **Structure command naming convention**
   - What we know: Product plan shows `/scr:add-{unit}` where `{unit}` varies by work type
   - What's unclear: Should command files be named `add-unit.md` (generic) or should there be routing logic? The product plan shows `add-{unit}` as polymorphic.
   - Recommendation: Use generic names (`add-unit.md`, `split-unit.md`, etc.) and have the command resolve the unit type from CONSTRAINTS.json at runtime. The command name in usage can show the adapted form.

2. **RELATIONSHIPS.md template existence**
   - What we know: new-character.md references RELATIONSHIPS.md, but no template exists in `templates/`. The demo project also has no RELATIONSHIPS.md.
   - What's unclear: Should Phase 3 create this template, or is relationship data kept solely within CHARACTERS.md?
   - Recommendation: Create `templates/RELATIONSHIPS.md` as a structured file since relationship-map needs a data source. Alternatively, relationship-map can derive relationships from the "Relationships" section within CHARACTERS.md entries. The latter is simpler and avoids a new file.

3. **Existing new-character.md voice anchor completeness**
   - What we know: D-01 requires 5-8 concrete voice attributes. The existing new-character.md already captures speech patterns, vocabulary, rhythm, internal monologue, and mannerisms.
   - What's unclear: Does the existing command fully satisfy D-01 or does it need enhancement?
   - Recommendation: The existing command's voice section and speech patterns section together cover D-01 well. The CHARACTERS.md template already has the right structure. Mark CHAR-01 as already complete or needing only verification.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Node.js built-in test runner (node:test) |
| Config file | None -- invoked via `node --test test/*.test.js` |
| Quick run command | `node --test test/phase3-creative-toolkit.test.js` |
| Full suite command | `node --test test/*.test.js` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CHAR-01 | new-character.md exists with voice anchor sections | unit | `node --test test/phase3-creative-toolkit.test.js` | No -- Wave 0 |
| CHAR-02 | character-sheet.md exists with frontmatter, display/edit sections | unit | same | No -- Wave 0 |
| CHAR-03 | character-arc.md exists, references PLOT-GRAPH.md | unit | same | No -- Wave 0 |
| CHAR-04 | character-voice-sample.md exists, requires CHARACTERS.md + STYLE-GUIDE.md | unit | same | No -- Wave 0 |
| CHAR-05 | relationship-map.md exists, includes ASCII graph pattern | unit | same | No -- Wave 0 |
| CHAR-06 | cast-list.md exists with character roster format | unit | same | No -- Wave 0 |
| CHAR-07 | build-world.md exists, WORLD.md template has 5 sections (D-04) | unit | same | No -- Wave 0 |
| CHAR-08 | CONSTRAINTS.json has adapted entries for all new commands | unit | `node --test test/constraints.test.js` | Yes (partial) |
| STRUCT-01 | plot-graph.md has all 9 arc types listed | unit | same | No -- Wave 0 |
| STRUCT-02 | timeline.md exists with OUTLINE.md prerequisite | unit | same | No -- Wave 0 |
| STRUCT-03 | theme-tracker.md exists, includes suggest-not-auto-add pattern | unit | same | No -- Wave 0 |
| STRUCT-04 | subplot-map.md exists, requires 2+ threads | unit | same | No -- Wave 0 |
| STRUCT-05 | outline.md exists with display/edit pattern | unit | same | No -- Wave 0 |
| STRUCT-06 | 6 structure commands exist with draft-safety checks | unit | same | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `node --test test/phase3-creative-toolkit.test.js`
- **Per wave merge:** `node --test test/*.test.js`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `test/phase3-creative-toolkit.test.js` -- covers CHAR-01 through CHAR-08, STRUCT-01 through STRUCT-06
- [ ] Existing `test/commands.test.js` will automatically pick up new command files (it scans `commands/scr/`)
- [ ] Existing `test/constraints.test.js` will validate CONSTRAINTS.json entries for new commands

## Sources

### Primary (HIGH confidence)
- `/Users/hprincivil/Projects/scriven/commands/scr/new-character.md` -- Existing character command pattern
- `/Users/hprincivil/Projects/scriven/commands/scr/plot-graph.md` -- Existing structure command with --type flag
- `/Users/hprincivil/Projects/scriven/commands/scr/save.md` -- Writer/developer mode output pattern
- `/Users/hprincivil/Projects/scriven/data/CONSTRAINTS.json` -- Complete command adaptations, prerequisites, file_adaptations
- `/Users/hprincivil/Projects/scriven/templates/CHARACTERS.md` -- Character profile template structure
- `/Users/hprincivil/Projects/scriven/templates/THEMES.md` -- Theme tracking template
- `/Users/hprincivil/Projects/scriven/templates/OUTLINE.md` -- Outline template with arc positions
- `/Users/hprincivil/Projects/scriven/SCRIVEN-PRODUCT-PLAN-v0.3.md` sections 15.2, 15.3, 15.12 -- Canonical command specs
- `/Users/hprincivil/Projects/scriven/data/demo/.manuscript/CHARACTERS.md` -- Live example of character profiles
- `/Users/hprincivil/Projects/scriven/data/demo/.manuscript/PLOT-GRAPH.md` -- Live example of plot graph

### Secondary (MEDIUM confidence)
- Demo project structure as reference implementation for expected output formats

### Tertiary (LOW confidence)
- None -- this phase is entirely internal to the project with no external library dependencies

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all patterns directly observable from 28 existing commands
- Architecture: HIGH -- exact same file types and directory structure as Phase 1 and 2
- Pitfalls: HIGH -- derived from locked decisions (D-07 draft safety, D-08 no auto-add) and existing CONSTRAINTS.json structure

**Research date:** 2026-04-06
**Valid until:** 2026-06-06 (stable -- no external dependencies, all patterns internal)
