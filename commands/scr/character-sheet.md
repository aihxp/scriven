---
description: Display or edit a specific character's full profile.
argument-hint: "[name] [--edit]"
---

# /scr:character-sheet -- View or Edit Character Profile

Display or edit a specific character's complete profile.

## Usage
```
/scr:character-sheet <name> [--edit]
```

## Instruction

You are presenting a character's profile. Load:
- `.manuscript/config.json` (to get `work_type`)
- `data/CONSTRAINTS.json` (to check `file_adaptations` and `commands.character-sheet.adapted`)
- `STYLE-GUIDE.md` (voice dimension context)

Determine the correct characters file from `file_adaptations`:
- Default: `CHARACTERS.md`
- Academic work types: `CONCEPTS.md`
- Sacred work types: `FIGURES.md`

Load the adapted characters file from `.manuscript/`.

Determine adapted terminology from CONSTRAINTS.json:
- Default: "character", "character sheet"
- Sacred: "figure", "figure sheet"
- Academic: "concept", "concept sheet"

---

### DISPLAY MODE (default)

<character_sheet_display>
  Find the character by name (case-insensitive match).

  If no exact match found:
  - Check for partial matches and list them: "Did you mean: [match1], [match2]?"
  - If no partial matches: "No character named '{name}' found. Run `/scr:cast-list` to see all characters."

  If the characters file is empty or missing:
  - "No characters found. Run `/scr:new-character <name>` to create your first character."

  Present the complete profile with all sections:

  **Identity**
  - Name, age, role, first impression, background

  **Psychology**
  - Want (conscious desire)
  - Need (unconscious need)
  - Lie (false belief)
  - Ghost (formative backstory event)
  - Fear (greatest fear)

  **Arc**
  - Starting state, turning point, ending state, arc type

  **Voice Anchor (D-01)**
  Highlight these 5-8 concrete attributes prominently:
  1. Speech patterns (how they construct sentences)
  2. Vocabulary register (formal, casual, slang, technical)
  3. Sentence length tendency (short/punchy, long/flowing, mixed)
  4. Verbal tics (repeated words, filler phrases, catchphrases)
  5. Internal monologue style (if POV character)
  6. Avoidances (words or topics they never use)
  7. Emotional expression style (direct, deflecting, metaphorical)
  8. Physical mannerisms tied to speech (gestures, pauses)

  **5-Line Dialogue Sample**
  - Show the voice anchor sample if it exists

  **Thematic Function**
  - Themes embodied, narrative purpose

  **Key Relationships**
  - Each relationship with dynamic and tension
</character_sheet_display>

---

### EDIT MODE (--edit)

<character_sheet_edit>
  Find the character by name (same matching logic as display mode).

  Walk through each section interactively:
  1. Show the current value for each field
  2. Ask: "Keep, change, or skip?"
  3. If "change": accept the new value
  4. Move to the next field

  After all sections reviewed:
  - Show a summary of changes
  - Ask for confirmation
  - Update the characters file
  - If voice anchor attributes changed, note that drafter agents will use the updated profile

  Commit: `character: update {name} profile`
</character_sheet_edit>

---

### Edge Cases

- **Character not found:** Show partial matches or direct to cast-list
- **Multiple partial matches:** List all matches and ask writer to specify
- **Empty characters file:** Direct to new-character command
- **No voice anchor data:** Warn that voice consistency may suffer and suggest running `/scr:character-voice-sample` to generate one
