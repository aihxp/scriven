---
description: Generate publication-ready back matter elements.
---

# /scr:back-matter -- Back Matter Generation

Generate all 12+ back matter elements for a publication-ready manuscript. Elements are classified as generatable, scaffoldable, or template-based depending on whether AI can produce complete content, a draft for writer revision, or a structural template.

## Usage

```
/scr:back-matter [--element <name>]
```

**Elements:**

| # | Element | Flag Name | Type |
|---|---------|-----------|------|
| 1 | Epilogue | `epilogue` | SCAFFOLD |
| 2 | Afterword | `afterword` | SCAFFOLD |
| 3 | Appendix(es) | `appendix` | TEMPLATE |
| 4 | Glossary | `glossary` | GENERATE |
| 5 | Endnotes | `endnotes` | TEMPLATE |
| 6 | Bibliography / References | `bibliography` | TEMPLATE |
| 7 | Suggested Reading | `suggested-reading` | GENERATE |
| 8 | Index | `index` | TEMPLATE |
| 9 | About the Author | `about-author` | GENERATE |
| 10 | Colophon | `colophon` | TEMPLATE |
| 11 | Discussion Questions | `discussion-questions` | GENERATE |
| 12 | Permissions / Credits | `permissions` | TEMPLATE |

If `--element` is provided, generate only that element. Otherwise, generate all elements applicable to the current work type.

## Instruction

You are a **publishing specialist** preparing back matter for a manuscript. Your output must follow industry conventions for element content and formatting.

---

### STEP 1: LOAD CONTEXT

Load the following project files:

- `.manuscript/config.json` -- to get `work_type`, title, author, and project settings
- `data/CONSTRAINTS.json` -- to check back-matter availability and adaptations for the current work type
- `.manuscript/WORK.md` -- title, author, publisher, and publication details
- `.manuscript/CHARACTERS.md` -- for glossary extraction (character names, terms)
- Drafted prose from `.manuscript/drafts/` -- for content extraction (glossary terms, endnotes, themes)

**Confirm the `back-matter` command is available** for the current work type by checking `CONSTRAINTS.json`. If the work type's group is in the `hidden` list, inform the writer and stop.

Check for adapted behavior:
- If work type group is `academic`: apply `academic_back_matter` behavior (see Academic Adaptation below)
- If work type group is `sacred`: apply `sacred_back_matter` behavior (see Sacred Adaptation below)

---

### STEP 2: VOICE DNA LOADING (CONDITIONAL)

**Load `.manuscript/STYLE-GUIDE.md` ONLY for narrative/voice-dependent elements:**
- Epilogue scaffold (1)
- Afterword scaffold (2)
- Suggested Reading (7)
- About the Author (9)
- Discussion Questions (11)

**Do NOT load STYLE-GUIDE.md for mechanical/structural elements:**
- Appendix (3)
- Glossary (4)
- Endnotes (5)
- Bibliography / References (6)
- Index (8)
- Colophon (10)
- Permissions / Credits (12)

This separation preserves voice fidelity for elements the reader experiences as authored prose, while keeping reference and structural elements clean and standardized.

---

### STEP 3: GENERATE ELEMENTS

Process each element in order. If `--element` was specified, skip to that element only.

#### Element 1: Epilogue -- SCAFFOLD

**Load STYLE-GUIDE.md for voice.**

```markdown
# Epilogue

<!-- WRITER ACTION REQUIRED -->
<!-- The epilogue is a narrative closing -- it's part of the story. -->
<!-- It should be written in the same voice as the manuscript. -->

<!-- Common epilogue approaches: -->
<!-- - A scene set after the main narrative's conclusion -->
<!-- - Resolution of a subplot left open in the final chapter -->
<!-- - A flash-forward showing long-term consequences -->
<!-- - A return to a framing device established in the prologue -->
<!-- - A different character's perspective on the events -->

<!-- Consider: Does this story need an epilogue? -->
<!-- Not every work benefits from one. If the final chapter provides -->
<!-- sufficient closure, an epilogue may weaken the ending. -->

[Write your epilogue here]
```

Save to `.manuscript/back-matter/epilogue.md`

#### Element 2: Afterword -- SCAFFOLD

**Load STYLE-GUIDE.md for voice.**

```markdown
# Afterword

<!-- WRITER ACTION REQUIRED -->
<!-- The afterword is your reflection on the work after it's complete. -->

## Suggested Structure

1. **The journey** -- how writing this work changed you or your understanding
2. **Behind the scenes** -- research, inspirations, or process insights readers would enjoy
3. **What's next** -- if part of a series or ongoing project, what comes next
4. **An invitation** -- connect with readers (website, newsletter, social media)

<!-- Write in your natural voice. Your style profile has been loaded -->
<!-- to help maintain consistency. -->
```

Save to `.manuscript/back-matter/afterword.md`

#### Element 3: Appendix(es) -- TEMPLATE

```markdown
# Appendix [A/B/C...]

<!-- TEMPLATE: Structured appendix for supplementary material. -->
<!-- Create one file per appendix if multiple are needed. -->

## [Appendix Title]

<!-- Include material that supports the main text but would -->
<!-- interrupt the narrative flow if placed inline: -->
<!-- - Technical details, data tables, or methodology notes -->
<!-- - Historical documents or primary sources -->
<!-- - Extended examples or case studies -->
<!-- - Glossary of specialized terms (if separate from main glossary) -->
<!-- - Maps, charts, or diagrams requiring extended explanation -->

[Appendix content here]
```

Save to `.manuscript/back-matter/appendix.md`

#### Element 4: Glossary -- GENERATE

Extract terms, names, and concepts from the manuscript and CHARACTERS.md. Generate definitions organized alphabetically.

Categories to extract:
- **Character names**: Brief identification (role, key traits)
- **Place names**: Location description and significance
- **Invented terms**: Made-up words, languages, technologies, or concepts with definitions
- **Technical terms**: Domain-specific vocabulary used in the text
- **Foreign words/phrases**: Translation and context

Present as:

```markdown
# Glossary

**[Term]** -- [Definition]. [Context of first/primary usage if helpful.]

**[Term]** -- [Definition].
```

Sort alphabetically. Exclude common words that need no definition.

Save to `.manuscript/back-matter/glossary.md`

#### Element 5: Endnotes -- TEMPLATE

```markdown
# Endnotes

<!-- TEMPLATE: Numbered endnote structure. -->
<!-- If the manuscript uses footnotes, they can be collected here -->
<!-- as endnotes for the published version. -->

## [Chapter/Section Title]

1. [Endnote text]
2. [Endnote text]

## [Chapter/Section Title]

1. [Endnote text]
```

Scan the manuscript for any existing footnote markers and extract them into this structure. If no footnotes exist, skip this element.

Save to `.manuscript/back-matter/endnotes.md`

#### Element 6: Bibliography / References -- TEMPLATE

```markdown
# Bibliography

<!-- TEMPLATE: Bibliographic entry format. -->
<!-- Format entries according to the style appropriate for this work type: -->
<!-- - Chicago Manual of Style (most prose) -->
<!-- - APA (social science, psychology) -->
<!-- - MLA (humanities, literary criticism) -->
<!-- - Turabian (general academic) -->

## Works Cited

[Author Last, First. *Title*. Publisher, Year.]

## Works Consulted

[Author Last, First. *Title*. Publisher, Year.]
```

If the manuscript references specific works, extract them and format appropriately. Otherwise, provide the template structure.

Save to `.manuscript/back-matter/bibliography.md`

#### Element 7: Suggested Reading -- GENERATE

**Load STYLE-GUIDE.md for tone.**

Generate a curated reading list based on the work's themes, influences, and subject matter. Organize by category:

```markdown
# Suggested Reading

<!-- Curated recommendations for readers who enjoyed this work. -->

## [Theme/Category 1]
- *[Title]* by [Author] -- [One-sentence description of why it's relevant]

## [Theme/Category 2]
- *[Title]* by [Author] -- [One-sentence description]
```

Include 8-15 recommendations. Focus on well-known, accessible works. Match the tone of the recommendations to the writer's voice per STYLE-GUIDE.md.

Save to `.manuscript/back-matter/suggested-reading.md`

#### Element 8: Index -- TEMPLATE

```markdown
# Index

<!-- Professional indexing is recommended for nonfiction. -->
<!-- This provides a starting framework with key term extraction. -->
<!-- A professional indexer will produce a far more comprehensive -->
<!-- and useful index than automated extraction alone. -->

## Key Terms Extracted

<!-- The following terms were identified as candidates for indexing. -->
<!-- This list is a starting point, not a finished index. -->

[Term], [page TBD]
[Term], [page TBD]
  [Subentry], [page TBD]

## Indexing Notes

- Consider hiring a professional indexer for nonfiction works
- Index entries should be finalized after page layout is complete
- Common indexing depth: 3-5 entries per page of text
```

Extract key terms, proper nouns, and concepts from the manuscript as index candidates.

Save to `.manuscript/back-matter/index.md`

#### Element 9: About the Author -- GENERATE

**Load STYLE-GUIDE.md for voice.**

Generate from the writer profile if available (check `.manuscript/WORK.md` for author bio or profile information). Write in third person unless the writer profile specifies otherwise.

```markdown
# About the Author

[Generated author bio in third person, matching the work's tone.
Include: credentials relevant to the work, previous publications,
personal details the author has shared, location, and a human touch.]

<!-- DRAFT -- Review and personalize. -->
<!-- This bio was generated from your project profile. -->
<!-- Update with current details and your preferred tone. -->
```

If no writer profile information is available, provide a template:

```markdown
# About the Author

<!-- WRITER ACTION REQUIRED -->
<!-- Write your author bio here. Tips: -->
<!-- - Third person is standard ("Jane Smith is...") -->
<!-- - Lead with credentials relevant to THIS work -->
<!-- - Include previous publications if applicable -->
<!-- - Add a personal detail (location, hobby, family) -->
<!-- - Keep to 100-200 words for most genres -->
```

Save to `.manuscript/back-matter/about-author.md`

#### Element 10: Colophon -- TEMPLATE

```markdown
# Colophon

<!-- TEMPLATE: Production details for the published work. -->
<!-- The colophon describes how the book was made. -->

This book was [typeset/designed/produced] using [tools].

**Body text:** [Font name], [size]
**Chapter headings:** [Font name]
**Design:** [Designer name or "the author"]

[Additional production notes -- paper type, printing method, etc.]

<!-- Fill in after final design decisions are made. -->
```

Save to `.manuscript/back-matter/colophon.md`

#### Element 11: Discussion Questions -- GENERATE

**Load STYLE-GUIDE.md for tone.**

Generate reading group discussion questions from the work's themes, plot, and character arcs. This element is also available as a standalone command via `/scr:discussion-questions`.

Create 10-15 questions organized by type:

```markdown
# Discussion Questions

## Characters
1. [Question about character motivations, growth, or relationships]
2. [Question about character choices and consequences]

## Themes
3. [Question connecting the work's themes to broader ideas]
4. [Question about the work's central message or argument]

## Craft
5. [Question about narrative structure, point of view, or style]
6. [Question about specific scenes or passages that stood out]

## Personal Response
7. [Question inviting readers to connect the work to their own experience]
8. [Question about what surprised, challenged, or moved the reader]

## Going Deeper
9. [Question connecting to other works, historical events, or current issues]
10. [Question that invites debate or multiple interpretations]
```

Match the tone and sophistication of questions to the work's target audience.

Save to `.manuscript/back-matter/discussion-questions.md`

#### Element 12: Permissions / Credits -- TEMPLATE

```markdown
# Permissions and Credits

<!-- TEMPLATE: Permissions acknowledgment for quoted or reproduced material. -->
<!-- Required if the work includes: -->
<!-- - Extended quotations from copyrighted works -->
<!-- - Song lyrics, poetry, or other literary excerpts -->
<!-- - Images, photographs, or artwork by others -->
<!-- - Maps or charts from external sources -->
<!-- - Data or tables reproduced from other publications -->

## Text Permissions

"[Quoted text]" from *[Source Title]* by [Author]. Copyright (c) [Year]
by [Copyright Holder]. Reprinted with permission of [Publisher/Agent].

## Image Credits

[Description of image]. Copyright (c) [Year] by [Photographer/Artist].
Used with permission.

## Additional Credits

[Any other credits -- cover designer, map illustrator, etc.]

<!-- IMPORTANT: Obtain all permissions BEFORE publication. -->
<!-- Keep copies of permission letters/emails for your records. -->
```

Save to `.manuscript/back-matter/permissions.md`

---

### ACADEMIC ADAPTATION (behavior: academic_back_matter)

When the work type group is `academic`, apply these modifications:

1. **Bibliography becomes primary element**: Move to prominent position. Format entries according to the citation style specified in config (APA, MLA, or Chicago). If no style is specified, default to Chicago Author-Date for sciences or Chicago Notes-Bibliography for humanities.

2. **Add Methodology Appendix template**: Include a structured appendix specifically for research methodology:
   ```markdown
   # Appendix: Methodology

   ## Research Design
   ## Data Collection
   ## Analysis Methods
   ## Limitations
   ## Ethics Approval
   ```

3. **Index gets enhanced term extraction**: Extract from manuscript with emphasis on technical terms, named theories, methodologies, key findings, and author citations.

4. **Epilogue and Afterword are skipped**: Not standard in academic works.

5. **Discussion Questions become Study Questions**: Reframe for academic context -- seminar discussion, exam preparation, research extension questions.

6. **Suggested Reading becomes Further Reading**: Academic tone, organized by subtopic, includes seminal works and recent contributions.

---

### SACRED ADAPTATION (behavior: sacred_back_matter)

When the work type group is `sacred`, apply these modifications:

1. **Add Concordance scaffold**: Provide a structure for cross-referencing key terms across the text with verse/passage references:
   ```markdown
   # Concordance

   <!-- A concordance lists key words and concepts with every -->
   <!-- passage reference where they appear. -->

   **[Term]**: [passage ref 1], [passage ref 2], [passage ref 3]
   ```

2. **Add Maps of Biblical/Historical Lands**: Scaffold for maps relevant to the tradition:
   ```markdown
   # Maps

   <!-- Suggested maps for this work based on geographic references: -->
   - [Location 1] -- referenced in [passages]
   - [Location 2] -- referenced in [passages]
   <!-- Commission from a cartographer familiar with the tradition. -->
   ```

3. **Add Chronological Tables**: Generate timeline tables of events, figures, or periods referenced in the text:
   ```markdown
   # Chronological Tables

   | Period | Dates | Key Events | References |
   |--------|-------|------------|------------|
   ```

4. **Glossary emphasizes theological/tradition terms**: Prioritize tradition-specific terminology, with attention to original language terms (Hebrew, Greek, Arabic, Sanskrit, Pali) and their nuanced meanings within the tradition.

5. **Discussion Questions become Study Questions**: Reframe for devotional or scholarly study groups, including textual analysis, theological reflection, and practical application questions.

---

### STEP 4: SKIPPED ELEMENTS REPORT

When running without `--element`, after generating all applicable elements, list any elements that were skipped:

```markdown
## Skipped Elements

The following back matter elements were not generated for this work:

- **[Element name]**: [Reason -- e.g., "No footnotes found in manuscript", "Not applicable to fiction", "Academic adaptation: epilogue not standard"]
```

Append this report to the final output displayed to the writer.

---

### OUTPUT

- Individual element files saved to `.manuscript/back-matter/{element-name}.md`
- Summary displayed to the writer listing all generated elements with file paths
- Skipped elements listed with explanations
- Any SCAFFOLD or TEMPLATE elements highlighted as requiring writer action
