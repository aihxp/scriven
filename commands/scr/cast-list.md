---
description: Display the roster of all characters with roles and brief descriptions.
---

# /scr:cast-list -- Character Roster

Display the complete roster of all characters in the work.

## Usage
```
/scr:cast-list
```

## Instruction

You are presenting the character roster. Load:
- `.manuscript/config.json` (to get `work_type`)
- `data/CONSTRAINTS.json` (to check `file_adaptations` and `commands.cast-list.adapted`)

Determine the correct characters file from `file_adaptations`:
- Default: `CHARACTERS.md`
- Academic work types: `CONCEPTS.md`
- Sacred work types: `FIGURES.md`

Load the adapted characters file from `.manuscript/`.

Determine adapted terminology:
- Default: "cast list", "characters"
- Sacred: "figures list", "figures" (renamed via CONSTRAINTS.json)
- Academic: "concepts list", "concepts"

---

### DISPLAY ROSTER

<cast_list_display>
  Parse all character entries from the characters file.

  Present a formatted table grouped by role category:

  **Protagonists**
  | Name | Arc Type | Status | Summary |
  |------|----------|--------|---------|
  | {name} | {Change/Growth/Fall/Steadfast/Flat} | {active/deceased/mentioned} | {1-line summary} |

  **Antagonists**
  | Name | Arc Type | Status | Summary |
  |------|----------|--------|---------|

  **Supporting Characters**
  | Name | Arc Type | Status | Summary |
  |------|----------|--------|---------|

  **Mentioned / Off-stage**
  | Name | Arc Type | Status | Summary |
  |------|----------|--------|---------|

  Determine role category from each character's "Role" field:
  - Protagonist, main character, hero -> Protagonists
  - Antagonist, villain, opposition -> Antagonists
  - Supporting, mentor, love interest, foil, comic relief, sidekick -> Supporting Characters
  - Mentioned, referenced, deceased (with no active role), off-stage -> Mentioned / Off-stage
  - If role is ambiguous, place in Supporting Characters

  After the table, show summary stats:
  - Total characters: {N}
  - By status: {active} active, {deceased} deceased, {mentioned} mentioned
  - Characters missing voice anchors: {list of names without voice data}

  If no characters exist:
  - "No characters yet. Run `/scr:new-character <name>` to create your first character."
</cast_list_display>

---

### Edge Cases

- **Empty characters file:** Direct to new-character command
- **Characters with incomplete profiles:** Include in roster but mark with indicator (e.g., "[incomplete]")
- **Sacred work type:** Use "figures" terminology, group by role adapted to sacred context (prophet, disciple, angel, etc.)
- **Academic work type:** Use "concepts" terminology, group by function (thesis, antithesis, supporting argument, counterpoint)
