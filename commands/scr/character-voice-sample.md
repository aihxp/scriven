---
description: Generate a dialogue sample to preview a character's voice before drafting.
argument-hint: "[name]"
---

# /scr:character-voice-sample -- Preview Character Voice

Generate a dialogue sample to preview how a character sounds before drafting scenes with them.

## Usage
```
/scr:character-voice-sample <name>
```

## Instruction

You are generating a voice sample for a character. Load:
- `.manuscript/config.json` (to get `work_type`)
- `data/CONSTRAINTS.json` (to check `file_adaptations`, `commands.character-voice-sample.adapted`, and `feature_prerequisites`)
- `STYLE-GUIDE.md` (writer's voice dimensions -- the sample must feel like this writer's prose)

Determine the correct characters file from `file_adaptations`:
- Default: `CHARACTERS.md`
- Academic work types: `CONCEPTS.md`
- Sacred work types: `FIGURES.md`

Load the adapted characters file from `.manuscript/`.

**Prerequisites check** (from CONSTRAINTS.json `feature_prerequisites`):
- The characters file must exist with at least one character entry
- `STYLE-GUIDE.md` must exist
- If either is missing: "This command requires {missing_file}. Run {generator_command} first."

Determine adapted terminology:
- Default: "character voice sample"
- Sacred: "register sample" (renamed via CONSTRAINTS.json)
- Academic: "concept voice" (adapted tone)

---

### GENERATE VOICE SAMPLE

<voice_sample_generation>
  Find the character by name (case-insensitive match).

  Read the character's existing profile, focusing on:
  - Voice anchor attributes (speech patterns, vocabulary register, sentence length, verbal tics, internal monologue style)
  - Speech patterns section (register, tics, vocabulary, sentence length, avoidances)
  - Psychology (want, need, lie -- these shape HOW they speak)
  - Key relationships (they may speak differently to different people)

  Generate exactly 5 lines of dialogue that showcase:
  1. Their vocabulary register and sentence length
  2. At least one verbal tic or catchphrase
  3. Their emotional expression style
  4. A moment of subtext (saying one thing, meaning another)
  5. Their unique rhythm distinct from other characters

  Include brief stage direction / action beats between lines to ground the dialogue in physical reality:
  ```
  "[Dialogue line 1.]" Character does something physical.

  "[Dialogue line 2.]" Brief internal beat or reaction.

  "[Dialogue line 3.]" Action or gesture.

  "[Dialogue line 4.]" Beat.

  "[Dialogue line 5.]"
  ```

  After presenting the sample, ask:
  - "Does this sound like {name}? You can:"
  - **Approve** -- save this as the voice anchor in the characters file
  - **Adjust** -- tell me what to change (too formal, needs more humor, wrong tic, etc.)
  - **Regenerate** -- try a completely fresh sample
</voice_sample_generation>

---

### Edge Cases

- **Character has no voice data yet:** Generate based on psychology and role, then note the sample is speculative and should be refined
- **Character not found:** Show partial matches or direct to cast-list
- **STYLE-GUIDE.md missing:** Warn that voice consistency cannot be verified without the style guide
- **Sacred work type:** Use "register sample" terminology; voice attributes map to sacred registers (prophetic, wisdom, legal, etc.)
