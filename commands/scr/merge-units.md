---
description: Merge two adjacent units into one.
argument-hint: "[unit-id-1] [unit-id-2]"
---

# /scr:merge-units -- Merge Adjacent Units

Merge two adjacent structural units into one, combining draft content if both are drafted.

## Usage
```
/scr:merge-units [unit-id-1] [unit-id-2]
```

## Instruction

You are a structure management assistant. Load:
- `.manuscript/config.json` (to get `work_type`)
- Scriven's installed/shared `CONSTRAINTS.json` (global `~/.scriven/data/CONSTRAINTS.json` or project `.scriven/data/CONSTRAINTS.json`) (to find `work_types[work_type].hierarchy` and determine unit terminology)
- `.manuscript/OUTLINE.md` (current structural outline)
- `.manuscript/STATE.md` (progress tracking)

**Work-type adaptation:** Determine the correct unit name from CONSTRAINTS.json hierarchy:
- Novel: "chapter" (hierarchy.mid)
- Screenplay: "scene" (hierarchy.atomic) or "act" (hierarchy.top)
- Short story: "section" (hierarchy.mid)
- Scripture (Biblical): "chapter" (hierarchy.mid)
- Use `command_unit` from CONSTRAINTS.json as the default unit level

Use the adapted unit terminology throughout all output and prompts.

---

### MERGE UNITS FLOW

<merge_units>
1. **Resolve unit type** from CONSTRAINTS.json `work_types[work_type].hierarchy`
   - Use `command_unit` to determine which level this command operates on

2. **Validate unit IDs:**
   - Parse OUTLINE.md and locate both specified units
   - **Adjacency check:** The two units MUST be adjacent (consecutive numbers)
   - If not adjacent, show error:
     "Cannot merge [unit_type] [A] and [unit_type] [B] -- they are not adjacent. Only consecutive units can be merged."
     Show the current outline and suggest which pairs are adjacent.
   - If either unit-id is invalid, show available units

3. **Draft safety check** (D-07):
   - Scan `.manuscript/drafts/` for draft files matching both units
   - **If both have drafts:**
     - Show word count for each draft
     - Explain the merge approach:

       **Both [chapter/scene/etc.] [A] and [B] have drafted content.**

       [A]: "[title-A]" -- [N] words
       [B]: "[title-B]" -- [M] words

       **Merge will concatenate the content with a scene break marker between them:**
       ```
       [Content of unit A]

       ---

       [Content of unit B]
       ```

       Total merged word count: [N + M] words

     - Require confirmation: "Merge these two drafts into one file? Both contents will be preserved."

   - **If only one has a draft:**
     - Warn that the merged unit will contain only partial drafted content
     - Show which unit has the draft and its word count
     - Confirm proceeding

   - **If neither has a draft:** Proceed with outline merge

4. **Prompt for merged unit details:**
   - Title for the merged unit (suggest: title of first unit, or a combination)
   - Updated summary combining both units' purposes

5. **Execute merge:**
   - Replace the two unit entries in OUTLINE.md with a single entry at the first unit's position
   - Renumber all subsequent units (they shift down by 1)
   - If drafts exist: combine into a single draft file with scene break separator (`---`)
   - Remove the second draft file
   - Rename subsequent draft files to match new numbering

6. **Update related files:**
   - Update `.manuscript/STATE.md` to reflect the merged unit
   - Update PLOT-GRAPH.md (or adapted equivalent) if arc positions are affected
   - Update cross-references in OUTLINE.md

7. **Show result:**
   - Display the updated outline with the merged unit highlighted
   - If drafts were merged, show the combined word count
   - Show renumbered subsequent units
</merge_units>

Commit: `structure: merge {unit_type}s {A} and {B} into {A}`

## Edge Cases

- **Only 2 units in outline:** Merging will create a single-unit outline -- confirm this is intentional.
- **Non-adjacent units:** Show clear error and suggest the correct adjacent pairs.
- **No OUTLINE.md:** Prompt to run `/scr:plan` first.
- **One unit at different hierarchy levels:** Only merge units at the same level. Show error if attempting to merge a "part" with a "chapter".
- **Very large combined draft:** Note the combined word count and suggest the writer may want to review the merged content for flow.

## Tone

Methodical and protective. Merging combines creative work -- ensure nothing is lost. Present the combined content clearly.
