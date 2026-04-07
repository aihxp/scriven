---
description: Generate or refine the world document through progressive questioning.
argument-hint: "[--area <area>]"
---

# /scr:build-world -- Progressive World Building

Generate or refine the world document through structured progressive questioning.

## Usage
```
/scr:build-world [--area <area>]
```

**Areas:** `geography`, `culture`, `technology`, `rules`, `history`

## Instruction

You are building the world document. Load:
- `.manuscript/config.json` (to get `work_type`)
- `data/CONSTRAINTS.json` (to check `file_adaptations` and `commands.build-world.adapted`)
- `WORK.md` (genre, tone, setting context)
- Existing world file from `.manuscript/` if it exists (WORLD.md / COSMOLOGY.md / CONTEXT.md per `file_adaptations`)

Determine adapted terminology from CONSTRAINTS.json:
- Default: "build world", generates `WORLD.md`
- Sacred: "build cosmology" (renamed via CONSTRAINTS.json), generates `COSMOLOGY.md`
- Academic: generates `CONTEXT.md`

---

### INITIAL MODE (no existing world file)

<world_build_initial>
  The writer has no world document yet. Ask 3-5 seed questions (D-05) to establish the foundation:

  1. **Scale:** "What's the scale of your world? A single city, a region, a continent, a planet, or something larger?"

  2. **Key conflict:** "What is the central tension or conflict that shapes this world? (War, scarcity, class division, magical imbalance, technological disruption, etc.)"

  3. **Distinguishing feature:** "What makes this world different from the real world (or from a typical setting in this genre)? What's the one thing a reader would remember?"

  4. **Time period feel:** "What era or time period does this world feel like? (Medieval, industrial, modern, far-future, timeless, or a specific blend?)"

  5. **Tone of the world:** "Is this world fundamentally hopeful, bleak, ambiguous, whimsical, or gritty?"

  Wait for answers. Do not proceed until the writer responds.

  After receiving answers, generate an initial WORLD.md using the template from `templates/WORLD.md`. Populate each section with what can be inferred from the seed answers:
  - Geography: scale, key locations implied by the setting
  - Culture: social dynamics implied by the conflict
  - Technology/Magic: tech level from time period, any magic from distinguishing feature
  - Rules/Laws: governance implied by conflict and culture
  - History: backstory that would lead to the current state

  Mark sections that need more detail with `<!-- needs refinement -->` comments.

  Save the file to `.manuscript/WORLD.md` (or adapted name).

  Commit: `world: create initial world document`

  After saving, suggest: "Your world document is started. Refine any section with `/scr:build-world --area <area>`."
</world_build_initial>

---

### REFINE MODE (--area flag)

<world_build_refine>
  The writer wants to deepen one section. Load the existing world file.

  Based on the `--area` value, drill deeper into that section with targeted questions:

  **geography:**
  - "Describe the terrain around {key location}. Mountains, rivers, forests, deserts?"
  - "How do people travel between locations? What routes are dangerous?"
  - "What natural resources exist? What's scarce?"

  **culture:**
  - "What social classes exist? How rigid are the boundaries?"
  - "What do people celebrate? What rituals mark major life events?"
  - "What languages or dialects exist? Any that are forbidden or dying?"

  **technology:**
  - "What's the most advanced technology/magic in common use?"
  - "What's rare or forbidden? Who controls access?"
  - "What are the costs or consequences of using it?"

  **rules:**
  - "Who enforces the laws? How corrupt or fair is the system?"
  - "What crimes are punished harshly? What's tolerated that shouldn't be?"
  - "Are there different laws for different classes or regions?"

  **history:**
  - "What event in the last 100 years most shaped the current world?"
  - "What ancient conflict is still unresolved?"
  - "What does the general population believe about their history vs. what's actually true?"

  After the writer answers, update the relevant section in the world file with richer detail. Preserve existing content -- add to it, don't replace.

  Commit: `world: refine {area} section`
</world_build_refine>

---

### Edge Cases

- **Invalid --area value:** List valid areas: geography, culture, technology, rules, history
- **Sacred work type:** Use "build cosmology" terminology; questions adapt to cosmological themes (divine geography, spiritual hierarchy, sacred history)
- **Academic work type:** Use "build context" terminology; questions focus on intellectual landscape, institutional setting, field dynamics
- **World file already comprehensive:** Acknowledge it looks thorough and ask if there's a specific aspect to explore further
