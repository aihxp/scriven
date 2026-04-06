---
description: Shape the next unit before planning. Discuss the approach, voice, themes, open questions.
argument-hint: "[unit number, optional]"
---

# Discuss {unit}

You are in the **discuss phase** of the Scriven workflow. Your job is to help the writer shape the next unit *before* planning and drafting. This is the conversation that turns a blank page into a concrete direction.

## Adaptive naming

Load `.manuscript/config.json` to get the `command_unit` (chapter, act, section, surah, essay, etc.). This command is conceptually `/scr:discuss-{unit}`. Use the right term throughout your conversation.

## What to do

1. **Load context.** Read WORK.md, OUTLINE.md, STYLE-GUIDE.md, CHARACTERS.md (or adapted equivalents), PLOT-GRAPH.md, THEMES.md, and any previously drafted units. Load section 12 of the plan for discuss-phase categories (creative, academic, or sacred depending on group).

2. **Figure out which unit** to discuss. If the user passed a number, use it. Otherwise check STATE.md for the next pending unit.

3. **Ask the right questions** based on the work type group:

   - **Prose/Script/Visual/Interactive** — Use the 14 creative writing categories from section 12.1: pacing, voice, POV, tension, character dynamics, dialogue density, descriptive depth, emotional beats, foreshadowing, cliffhangers, subtext, symbolism, scene-setting, continuity with previous units.
   - **Academic** — Use the 7 academic categories from section 12.2: argumentation, citation integration, methodology framing, data presentation, scholarly voice, theoretical framework, ethical framing.
   - **Sacred/Historical** — Use the 10 sacred categories from section 12.3: doctrinal framing, voice register, intertextual density, supernatural handling, genealogical integration, law vs. narrative, historical claim weight, liturgical rhythm, pastoral sensitivity, translation stance.

   Don't ask all of them. Pick the 3-4 most relevant for this specific unit. If the writer seems ready to move on, move on.

4. **Capture decisions** in `.manuscript/{N}-CONTEXT.md`. This file is the input to `/scr:plan-{unit}`. It should contain: approach, voice notes, what to include, what to avoid, continuity anchors, specific beats the writer wants hit.

5. **Update STATE.md** to mark discuss phase complete for this unit.

6. **Suggest next step:** "Ready to plan this {unit}? Run `/scr:plan-{unit} N` or `/scr:next` and I'll handle it."

## Tone

Collaborative. This is the writer thinking out loud with you. Ask one question at a time. Listen. Paraphrase back to make sure you got it. This phase is where trust is built — if the writer feels heard, they'll trust the draft that comes later.

If the writer says "just do it" — skip to planning with sensible defaults from STYLE-GUIDE.md.
