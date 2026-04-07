# Phase 4: Quality & Manuscript Completion - Research

**Researched:** 2026-04-06
**Domain:** Markdown skill file authoring -- quality review commands + front/back matter generation
**Confidence:** HIGH

## Summary

Phase 4 is the largest phase (19 requirements), but architecturally the simplest. Every deliverable is a markdown skill file -- no compiled code, no new infrastructure, no external dependencies. The work splits into two domains: (1) quality review commands that analyze drafted prose and produce structured feedback, and (2) front/back matter plus marketing material generators that produce publication-ready content.

The project already has strong patterns to follow. Five existing commands serve as templates: `beta-reader.md`, `continuity-check.md`, `editor-review.md` (review pattern), and two agents (`voice-checker.md`, `continuity-checker.md`) that new commands will wrap. The Phase 3 command structure (YAML frontmatter with description, Usage section, Instruction section, structured output) is the canonical pattern.

**Primary recommendation:** Split into 4-5 plans grouping by functional cluster: quality review commands, the polish meta-command, front matter, back matter, and marketing materials. Each plan produces command files and corresponding CONSTRAINTS.json updates. Prioritize quality commands first since they are prerequisites for the polish meta-command.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Line-edit presents inline annotations with original -> suggested replacement, grouped by type (rhythm, word choice, redundancy)
- **D-02:** Originality-check scans for AI-generated patterns (hedging phrases, balanced lists, abstract language) + flags passages echoing known published works -- surfaces concerns, doesn't block
- **D-03:** Quality commands are chainable -- add `/scr:polish` meta-command that chains line-edit -> copy-edit -> voice-check in sequence
- **D-04:** Quality commands use adapted names per CONSTRAINTS.json: sacred (register-check, interfaith-review, doctrinal-check), academic (citation-check, ethics-review)
- **D-05:** Priority front matter elements: title page, copyright page, dedication, table of contents, epigraph -- the 5 a reader always sees
- **D-06:** Voice DNA (STYLE-GUIDE.md) loaded for narrative elements (dedication, acknowledgments, about-author) but not mechanical ones (copyright, TOC)
- **D-07:** `--element` flag generates one specific element on demand: `/scr:front-matter --element dedication`
- **D-08:** Front/back matter adapts for academic (abstract, bibliography) and sacred (imprimatur, concordance, maps) per CONSTRAINTS.json
- **D-09:** `/scr:blurb` generates 3 variations (short/punchy, standard, extended) -- writer picks
- **D-10:** `/scr:synopsis` supports `--length` flag: 1-page (agent queries), 2-page (editor), 5-page (detailed)
- **D-11:** `/scr:query-letter` adapts to genre conventions (romance, literary, thriller differ in tone, comp titles, market positioning)

### Claude's Discretion
- Exact AI-pattern detection heuristics for originality-check
- Front matter element ordering beyond the 5 priority elements
- Polish meta-command error handling between chained steps
- Discussion questions generation depth and focus areas

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| QUAL-01 | `/scr:line-edit` -- prose quality pass | Follow editor-review pattern; D-01 inline annotation format |
| QUAL-02 | `/scr:copy-edit` -- correctness pass | Follow editor-review pattern; grammar/spelling/punctuation focus |
| QUAL-03 | `/scr:dialogue-audit` -- character voice differentiation | Available for prose/script/interactive only per CONSTRAINTS.json |
| QUAL-04 | `/scr:pacing-analysis` -- structure-aware pacing report | Hidden from poetry/speech_song per CONSTRAINTS.json |
| QUAL-05 | `/scr:voice-check` -- compare prose vs STYLE-GUIDE.md | Wraps existing voice-checker agent; requires STYLE-GUIDE.md |
| QUAL-06 | `/scr:sensitivity-review` -- flag potential issues | Adapted: ethics-review (academic), interfaith-review (sacred) |
| QUAL-07 | `/scr:beta-reader` -- simulated first-reader feedback | Already exists -- verify meets requirements, enhance if needed |
| QUAL-08 | `/scr:continuity-check` -- verify facts/timelines | Already exists -- verify meets requirements, enhance if needed |
| QUAL-09 | Quality commands use adapted names | Already defined in CONSTRAINTS.json commands section |
| QUAL-10 | `/scr:originality-check` -- AI pattern + similarity scan | New command; not yet in CONSTRAINTS.json |
| PUB-01 | `/scr:front-matter` -- all 19 front matter elements | Product plan section 7.1 has full element list |
| PUB-02 | `/scr:back-matter` -- all 12+ back matter elements | Product plan section 7.2 has full element list |
| PUB-03 | `--element` flag for individual elements | D-07 locked decision |
| PUB-04 | `/scr:blurb` -- marketing blurb | D-09: 3 variations (short/standard/extended) |
| PUB-05 | `/scr:synopsis` -- variable length | D-10: --length 1p/2p/5p |
| PUB-06 | `/scr:query-letter` -- agent query | Requires blurb + synopsis; D-11 genre adaptation |
| PUB-07 | `/scr:book-proposal` -- nonfiction proposal | Requires synopsis; nonfiction_only constraint |
| PUB-08 | `/scr:discussion-questions` -- reading group questions | Adapted: study-questions (sacred) |
| PUB-09 | Front/back matter adapts for academic/sacred | CONSTRAINTS.json behavior adaptations already defined |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Architecture**: Pure skill/command system -- no compiled code, no runtime dependencies beyond Node.js installer
- **Voice fidelity**: Every feature must preserve Voice DNA pipeline -- STYLE-GUIDE.md loaded first
- **Backward compatibility**: Existing 28 commands must continue working
- **Plan authority**: Product plan is canonical (section 15 for command specs) -- command files must match
- **Progressive disclosure**: Onboarding asks 3 questions max
- **GSD workflow enforcement**: Use GSD entry points, not direct edits

## Architecture Patterns

### Command File Structure (Canonical Pattern)

Every command follows this structure, established across Phases 1-3:

```markdown
---
description: One-line description of what the command does.
---

# /scr:command-name -- Human-Readable Title

Brief description of purpose.

## Usage
\```
/scr:command-name [N] [--flag <value>]
\```

**Flags:**
- `--flag` -- what it does

## Instruction

You are a [role]. Load:
- `.manuscript/config.json` (to get `work_type`)
- `data/CONSTRAINTS.json` (to check command adaptations)
- [additional context files as needed]

Use adapted terminology throughout all output.

---

### STEP N: [Step Name]

[Detailed instructions for the agent]

### OUTPUT

[What to produce and where to save it]
```

**Confidence:** HIGH -- verified from 6 existing command files.

### Quality Command Pattern

Quality commands share a common structure:

1. **Load context**: `config.json` -> `CONSTRAINTS.json` -> `STYLE-GUIDE.md` (if voice-dependent) -> drafted prose from `.manuscript/drafts/`
2. **Accept scope parameter**: `[N]` for specific unit/act, or omit for full manuscript
3. **Analyze**: Run structured analysis with named check categories
4. **Output structured report**: Use severity indicators (pass/warning/fail or check/warning/x)
5. **Save report**: To `.manuscript/` with descriptive filename

Key patterns from existing commands:
- `beta-reader.md`: Spawns agent with persona, produces conversational feedback, saves to `.manuscript/{act_num}-BETA-READER-NOTES.md`
- `continuity-check.md`: Uses XML-style check blocks, produces structured report with severity levels
- `voice-checker.md` agent: Scores 0-100, has PASS/WARNING/FAIL thresholds, returns structured report format
- `editor-review.md`: Multi-step walkthrough with diagnostic agent spawning

### Front/Back Matter Pattern

Front/back matter commands are generators, not analyzers:

1. **Load context**: `config.json` -> `CONSTRAINTS.json` -> manuscript metadata (WORK.md, CHARACTERS.md, etc.)
2. **Load STYLE-GUIDE.md for narrative elements** (D-06): dedication, acknowledgments, about-author
3. **Skip STYLE-GUIDE.md for mechanical elements**: copyright, TOC, list of illustrations
4. **Generate element(s)**: Either all elements or specific via `--element` flag (D-07)
5. **Save to**: `.manuscript/front-matter/` or `.manuscript/back-matter/`
6. **Follow Chicago Manual of Style ordering** for front matter sequence

### Recommended Project Structure

New files this phase creates:

```
commands/scr/
  line-edit.md              # QUAL-01 (new)
  copy-edit.md              # QUAL-02 (new)
  dialogue-audit.md         # QUAL-03 (new)
  pacing-analysis.md        # QUAL-04 (new)
  voice-check.md            # QUAL-05 (new, wraps voice-checker agent)
  sensitivity-review.md     # QUAL-06 (new)
  beta-reader.md            # QUAL-07 (exists -- verify/enhance)
  continuity-check.md       # QUAL-08 (exists -- verify/enhance)
  originality-check.md      # QUAL-10 (new)
  polish.md                 # D-03 meta-command (new)
  front-matter.md           # PUB-01 (new)
  back-matter.md            # PUB-02 (new)
  blurb.md                  # PUB-04 (new)
  synopsis.md               # PUB-05 (new)
  query-letter.md           # PUB-06 (new)
  book-proposal.md          # PUB-07 (new)
  discussion-questions.md   # PUB-08 (new)
data/
  CONSTRAINTS.json          # Add originality-check, polish entries
```

### Anti-Patterns to Avoid

- **Over-engineering command files**: These are agent instruction documents, not code. Keep them clear and directive, not abstractly modular.
- **Missing CONSTRAINTS.json entries**: Every new command MUST have a corresponding entry in CONSTRAINTS.json with category, availability, adapted names, and prerequisites.
- **Forgetting `draft_exists` prerequisite**: Quality commands require drafted prose. Publishing commands require `complete-draft`. This is defined in CONSTRAINTS.json `prerequisites` section.
- **Loading STYLE-GUIDE.md for mechanical elements**: D-06 is explicit -- copyright pages and TOCs should not use voice DNA.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Voice checking | Custom voice analysis instructions | Existing `voice-checker.md` agent | Already built, tested, scored 0-100 with thresholds |
| Continuity checking | Custom continuity instructions | Existing `continuity-checker.md` agent | Already built with 6 check categories |
| Front matter ordering | Custom element ordering | Chicago Manual of Style standard ordering | Industry standard, already documented in product plan section 7.1 |
| AI-pattern detection | Complex NLP rules | Simple heuristic checklist in prompt | AI agent itself is the detector -- list the patterns to look for |
| Genre conventions for query letters | Hardcoded genre templates | Prompt instructions that reference genre | Agent adapts based on WORK.md genre field |

## Common Pitfalls

### Pitfall 1: Missing CONSTRAINTS.json Updates
**What goes wrong:** New commands are created but not registered in CONSTRAINTS.json, causing the existing validator test (`constraints.test.js`) to fail or commands to be invisible to the help system.
**Why it happens:** CONSTRAINTS.json is separate from the command files and easy to forget.
**How to avoid:** Every plan that creates a command file must also include a CONSTRAINTS.json update task. The existing test `commands.test.js` verifies files on disk are in CONSTRAINTS.json.
**Warning signs:** `npm test` fails on the commands test.

### Pitfall 2: Polish Meta-Command Error Handling
**What goes wrong:** The polish command chains line-edit -> copy-edit -> voice-check, but if one step fails or produces warnings, the chain stops or loses context.
**Why it happens:** Chaining is conceptual (agent instructions), not programmatic. The agent must be told what to do at each decision point.
**How to avoid:** Polish command instructions must specify: (1) always run all three steps, (2) accumulate findings, (3) present combined report at end, (4) let writer decide what to address.
**Warning signs:** Writer gets partial feedback or agent asks "should I continue?" between each step.

### Pitfall 3: Front Matter Element Count Mismatch
**What goes wrong:** Product plan lists 19 front matter elements (section 7.1), but the command only generates a subset without documenting the gap.
**Why it happens:** Some elements (foreword, preface) are author-written, not AI-generated. The command should scaffold/template them, not fabricate them.
**How to avoid:** Front-matter command should distinguish between generatable elements (copyright, TOC, title page) and scaffoldable elements (foreword template, preface template).
**Warning signs:** Writer asks for a foreword and gets AI-generated content pretending to be from another person.

### Pitfall 4: Sensitivity Review Overreach
**What goes wrong:** The sensitivity-review flags everything as potentially problematic, making it useless.
**Why it happens:** Over-cautious prompting.
**How to avoid:** D-06 from the product context notes it should "flag potential issues with context, suggest alternatives, note intentional craft." The "note intentional craft" part is critical -- it must distinguish between unintentional insensitivity and deliberate artistic choices.
**Warning signs:** A gritty crime novel gets flagged for depicting crime.

### Pitfall 5: Blurb Variations Are Too Similar
**What goes wrong:** The 3 blurb variations (D-09: short/punchy, standard, extended) read like the same text at different lengths rather than different marketing approaches.
**Why it happens:** Prompting only specifies length, not tone/strategy differences.
**How to avoid:** Each variation should have a distinct strategy: short/punchy = hook + stakes + tagline; standard = setup + conflict + stakes + tone; extended = detailed setup + character introduction + conflict + themes + comp positioning.
**Warning signs:** All three variations open with the same sentence.

## Code Examples

### Quality Review Command (line-edit pattern)

```markdown
---
description: Perform a line-level prose quality pass with inline annotations.
---

# /scr:line-edit -- Line-Level Prose Quality

Sentence-level refinement: rhythm, word choice, redundancy, cliches.

## Usage
\```
/scr:line-edit [N]
\```

If `N` is provided, edits only that unit. Otherwise edits all drafted units.

## Instruction

You are a line editor. Load:
- `.manuscript/config.json` (to get `work_type`)
- `data/CONSTRAINTS.json` (to check command adaptations)
- `.manuscript/STYLE-GUIDE.md` (voice profile -- preserve, don't flatten)
- Drafted prose from `.manuscript/drafts/`

---

### ANALYSIS

For each passage, identify issues grouped by type:

<line_edit_categories>
  <category name="rhythm">
    Sentence length variation, cadence, paragraph flow
  </category>
  <category name="word_choice">
    Weak verbs, imprecise nouns, register mismatches
  </category>
  <category name="redundancy">
    Repeated information, unnecessary modifiers, filler phrases
  </category>
  <category name="cliches">
    Dead metaphors, overused phrases, genre stock phrases
  </category>
</line_edit_categories>

### OUTPUT FORMAT

Present as inline annotations:

For each issue:
- **Original:** "[exact text]"
- **Suggested:** "[replacement]"
- **Type:** rhythm | word_choice | redundancy | cliche
- **Rationale:** [brief explanation]

Save to `.manuscript/{scope}-LINE-EDIT-REPORT.md`
```

**Confidence:** HIGH -- follows established patterns from editor-review.md and voice-checker.md.

### Meta-Command Pattern (polish)

```markdown
---
description: Chain line-edit, copy-edit, and voice-check for comprehensive prose polish.
---

# /scr:polish -- Comprehensive Prose Polish

Run line-edit, copy-edit, and voice-check in sequence. Accumulates all findings into a single report.

## Usage
\```
/scr:polish [N]
\```

## Instruction

You are running a three-pass polish pipeline. Execute ALL three passes regardless of findings in each:

### PASS 1: Line Edit
[Run /scr:line-edit instructions -- rhythm, word choice, redundancy, cliches]

### PASS 2: Copy Edit
[Run /scr:copy-edit instructions -- grammar, spelling, punctuation, consistency]

### PASS 3: Voice Check
[Run /scr:voice-check instructions -- compare against STYLE-GUIDE.md]

### COMBINED REPORT

Merge all findings into a single report:
- Section per pass with findings
- Overall assessment
- Priority ranking (what to fix first)
- Quick wins vs. structural issues

Save to `.manuscript/{scope}-POLISH-REPORT.md`
```

### Front Matter Command (--element flag pattern)

```markdown
## Usage
\```
/scr:front-matter [--element <name>]
\```

**Elements:** half-title, series-title, title, copyright, dedication,
epigraph, toc, illustrations-list, tables-list, abbreviations,
foreword, preface, acknowledgments, introduction, prologue,
note-to-reader, maps, cast, timeline

If `--element` is provided, generate only that element.
Otherwise, generate all applicable elements for this work type.
```

### CONSTRAINTS.json Entries to Add

```json
"originality-check": {
  "category": "review",
  "available": ["all"],
  "requires": ["draft_exists"]
},
"polish": {
  "category": "quality",
  "available": ["all"],
  "requires": ["draft_exists", "STYLE-GUIDE.md"]
}
```

Both must also be added to the `prerequisites` section.

## Front Matter Element Reference (Chicago Manual of Style Order)

Per product plan section 7.1 and Chicago Manual of Style conventions:

| Order | Element | Recto/Verso | Generatable | Voice DNA |
|-------|---------|-------------|-------------|-----------|
| 1 | Half-title | Recto | Yes (title only) | No |
| 2 | Series title / Also by | Verso | Yes | No |
| 3 | Title page | Recto | Yes (title, author, publisher) | No |
| 4 | Copyright page | Verso | Yes (template with ISBN, etc.) | No |
| 5 | Dedication | Recto | Scaffold only | Yes |
| 6 | Epigraph | Recto or verso | Suggest only | Yes |
| 7 | Table of contents | Recto | Yes (from outline) | No |
| 8 | List of illustrations | Recto | Yes (from content) | No |
| 9 | List of tables | Recto | Yes (from content) | No |
| 10 | List of abbreviations | Recto | Yes (from content) | No |
| 11 | Foreword | Recto | Scaffold (not author-written) | No |
| 12 | Preface | Recto | Scaffold | Yes |
| 13 | Acknowledgments | Recto | Yes (draft from context) | Yes |
| 14 | Introduction | Recto | Scaffold | Yes |
| 15 | Prologue | Recto | Scaffold (narrative) | Yes |
| 16 | Note to the reader | Variable | Yes | Yes |
| 17 | Maps / family trees | Variable | Scaffold / prompt | No |
| 18 | Cast of characters | Variable | Yes (from CHARACTERS.md) | No |
| 19 | Timeline | Variable | Yes (from TIMELINE data) | No |

**Key insight:** "Generatable" means the AI can produce a complete version. "Scaffold" means it provides a template or draft the writer must complete. The foreword, written by someone else, cannot be AI-generated -- only scaffolded with instructions for the writer.

## Back Matter Element Reference

Per product plan section 7.2:

| Element | Generatable | Voice DNA | Notes |
|---------|-------------|-----------|-------|
| Epilogue | Scaffold (narrative) | Yes | Writer's content |
| Afterword | Scaffold | Yes | Writer's reflection |
| Appendix(es) | Template | No | Content-dependent |
| Glossary | Yes (from content) | No | Extractable from manuscript |
| Endnotes | Template | No | Academic primarily |
| Bibliography / References | Template | No | Academic primarily |
| Suggested reading | Yes (curated) | Yes | From themes/research |
| Index | Template instructions | No | Typically professional indexer |
| About the author | Yes (from writer profile) | Yes | Key generatable element |
| Colophon | Template | No | Production details |
| Discussion questions | Yes | Yes | PUB-08 |
| Permissions / Credits | Template | No | Legal content |

## Existing Command Assessment

### beta-reader.md (QUAL-07)
**Status:** Exists, functional. Needs verification against requirements.
**Gaps identified:**
- Has good persona and feedback structure
- Missing: explicit `--focus` flag handling in instruction body (mentioned in usage but not detailed in instruction)
- Missing: CONSTRAINTS.json adaptation awareness (adapted names for sacred/academic)
- Otherwise meets QUAL-07 requirements

### continuity-check.md (QUAL-08)
**Status:** Exists, functional. Needs verification against requirements.
**Gaps identified:**
- Comprehensive check categories (6 categories, well-structured)
- Uses XML-style check blocks (established pattern)
- Missing: CONSTRAINTS.json adaptation loading (doesn't reference config.json or adapted terminology)
- Otherwise meets QUAL-08 requirements

### voice-checker.md agent (used by QUAL-05)
**Status:** Agent exists. No command wrapper yet (`voice-check.md` does not exist in commands/scr/).
**Action needed:** Create `voice-check.md` command that wraps this agent, accepting `[N]` scope parameter.

## Adapted Command Names Summary

From CONSTRAINTS.json, already defined:

| Base Command | Sacred Adaptation | Academic Adaptation |
|-------------|-------------------|---------------------|
| voice-check | register-check | -- |
| sensitivity-review | interfaith-review | ethics-review |
| dialogue-audit | -- (hidden) | -- (hidden) |
| beta-reader | theological-review | reviewer-simulation |
| discussion-questions | study-questions | -- (hidden) |
| front-matter | sacred_front_matter (behavior) | academic_front_matter (behavior) |
| back-matter | sacred_back_matter (behavior) | academic_back_matter (behavior) |

**Not yet in CONSTRAINTS.json (must add):**

| Command | Category | Availability | Prerequisites |
|---------|----------|-------------|---------------|
| originality-check | review | all | draft_exists |
| polish | quality | all | draft_exists, STYLE-GUIDE.md |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Node.js built-in test runner (node:test) |
| Config file | None -- uses `node --test` directly |
| Quick run command | `node --test test/phase4-quality-publishing.test.js` |
| Full suite command | `npm test` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| QUAL-01 | line-edit.md exists with inline annotation format | unit | `node --test test/phase4-quality-publishing.test.js` | No -- Wave 0 |
| QUAL-02 | copy-edit.md exists with grammar/spelling focus | unit | same | No -- Wave 0 |
| QUAL-03 | dialogue-audit.md exists, hidden from academic/poetry/sacred | unit | same | No -- Wave 0 |
| QUAL-04 | pacing-analysis.md exists, hidden from poetry/speech_song | unit | same | No -- Wave 0 |
| QUAL-05 | voice-check.md wraps voice-checker agent, requires STYLE-GUIDE.md | unit | same | No -- Wave 0 |
| QUAL-06 | sensitivity-review.md with adapted names | unit | same | No -- Wave 0 |
| QUAL-07 | beta-reader.md meets requirements (already exists) | unit | same | No -- Wave 0 |
| QUAL-08 | continuity-check.md meets requirements (already exists) | unit | same | No -- Wave 0 |
| QUAL-09 | CONSTRAINTS.json has adapted names for quality commands | unit | `node --test test/constraints.test.js` | Partially (existing test) |
| QUAL-10 | originality-check.md exists in commands + CONSTRAINTS.json | unit | same | No -- Wave 0 |
| PUB-01 | front-matter.md with 19 elements | unit | same | No -- Wave 0 |
| PUB-02 | back-matter.md with 12+ elements | unit | same | No -- Wave 0 |
| PUB-03 | --element flag in front-matter and back-matter | unit | same | No -- Wave 0 |
| PUB-04 | blurb.md with 3 variations | unit | same | No -- Wave 0 |
| PUB-05 | synopsis.md with --length flag | unit | same | No -- Wave 0 |
| PUB-06 | query-letter.md requires blurb + synopsis | unit | same | No -- Wave 0 |
| PUB-07 | book-proposal.md nonfiction constraint | unit | same | No -- Wave 0 |
| PUB-08 | discussion-questions.md with sacred adaptation | unit | same | No -- Wave 0 |
| PUB-09 | CONSTRAINTS.json behavior adaptations for academic/sacred | unit | same | Partially (existing test) |

### Sampling Rate
- **Per task commit:** `node --test test/phase4-quality-publishing.test.js`
- **Per wave merge:** `npm test`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `test/phase4-quality-publishing.test.js` -- covers QUAL-01..10, PUB-01..09
- [ ] Test follows Phase 3 pattern: file existence, YAML frontmatter, key content assertions, CONSTRAINTS.json cross-checks, decision traceability

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Separate agent files for each analysis | Command wraps existing agent | Phase 1 | voice-check wraps voice-checker agent |
| Flat command list | CONSTRAINTS.json-driven availability | Phase 1 | Commands are hidden/adapted per work type |
| Manual front matter assembly | Automated generation with element flag | Phase 4 (new) | Writers get industry-standard ordering |

## Open Questions

1. **Should polish meta-command literally include the instructions of all three sub-commands inline?**
   - What we know: It chains line-edit -> copy-edit -> voice-check (D-03)
   - What's unclear: Whether to duplicate instructions or reference sub-commands
   - Recommendation: Inline the core analysis criteria from each sub-command to keep the polish command self-contained. Reference sub-commands for full details but include enough to execute.

2. **How should front-matter handle elements that don't apply to the current work type?**
   - What we know: CONSTRAINTS.json has `behavior` adaptations for academic and sacred
   - What's unclear: Whether to silently skip inapplicable elements or list them as "not applicable"
   - Recommendation: When running without --element flag, only generate applicable elements for the work type. List skipped elements at the end with brief explanation.

3. **Should existing beta-reader.md and continuity-check.md be modified or left as-is?**
   - What we know: Both exist and are functional. Neither loads CONSTRAINTS.json or config.json.
   - What's unclear: Whether adding CONSTRAINTS.json awareness would break existing behavior
   - Recommendation: Add CONSTRAINTS.json loading to both for adapted terminology support. This is additive -- existing behavior is preserved when work type is standard prose.

## Sources

### Primary (HIGH confidence)
- Existing command files: `commands/scr/beta-reader.md`, `continuity-check.md`, `editor-review.md` -- verified patterns
- Existing agent files: `agents/voice-checker.md`, `agents/continuity-checker.md` -- verified structure
- `data/CONSTRAINTS.json` -- verified command entries, adapted names, prerequisites
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` section 7 -- front/back matter element lists, recto/verso rules
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` sections 15.4-15.6 -- command signatures

### Secondary (MEDIUM confidence)
- Chicago Manual of Style front matter ordering -- referenced in product plan and CONTEXT.md specifics
- Phase 3 test file pattern (`test/phase3-creative-toolkit.test.js`) -- verified test structure

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new libraries, pure markdown skill files
- Architecture: HIGH -- follows 3 phases of established patterns
- Pitfalls: HIGH -- derived from examining existing code and locked decisions
- Front/back matter specs: HIGH -- product plan section 7 is exhaustive

**Research date:** 2026-04-06
**Valid until:** 2026-05-06 (stable -- no external dependency changes expected)
